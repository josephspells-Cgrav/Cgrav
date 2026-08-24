"""
matte_test.py -- WO_MATTE spike: RobustVideoMatting (RVM) CPU throughput + alpha extraction.

Reads frames from a video starting at --start for --duration seconds (or --max-frames),
runs them through RVM (mobilenetv3 by default), and writes RGBA PNGs (color-decontaminated
foreground + alpha) to <outdir>/rgba/. Prints running it/s and writes manifest.json with
final throughput numbers.
"""
import argparse
import json
import sys
import time
from pathlib import Path

import cv2
import numpy as np
import torch


def auto_downsample_ratio(h, w):
    # RVM's own heuristic: downsample so the longest side is ~512px for the
    # recurrent encoder pass; decoder still refines at full res.
    return min(512 / max(h, w), 1.0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    ap.add_argument("--start", type=float, default=0.0, help="start time in seconds")
    ap.add_argument("--duration", type=float, default=None, help="duration in seconds (None = to end of video)")
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--downsample", type=float, default=None, help="override auto downsample_ratio")
    ap.add_argument("--variant", default="mobilenetv3", choices=["mobilenetv3", "resnet50"])
    ap.add_argument("--max-frames", type=int, default=None)
    ap.add_argument("--threads", type=int, default=None)
    ap.add_argument("--log-every", type=int, default=15)
    args = ap.parse_args()

    if args.threads:
        torch.set_num_threads(args.threads)
    torch.set_grad_enabled(False)
    print(f"[matte] torch={torch.__version__} threads={torch.get_num_threads()}", flush=True)

    outdir = Path(args.outdir)
    (outdir / "rgba").mkdir(parents=True, exist_ok=True)

    print(f"[matte] loading RVM {args.variant} via torch.hub ...", flush=True)
    t0 = time.time()
    model = torch.hub.load("PeterL1n/RobustVideoMatting", args.variant, pretrained=True, trust_repo=True)
    model = model.eval()
    load_s = time.time() - t0
    print(f"[matte] model loaded in {load_s:.1f}s", flush=True)

    cap = cv2.VideoCapture(args.input)
    if not cap.isOpened():
        print(f"[matte] ERROR: could not open {args.input}", flush=True)
        sys.exit(2)

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    src_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    src_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_src_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    start_frame = int(round(args.start * fps))
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    downsample = args.downsample if args.downsample is not None else auto_downsample_ratio(src_h, src_w)

    if args.duration is not None:
        n_frames = int(round(args.duration * fps))
    else:
        n_frames = total_src_frames - start_frame
    if args.max_frames is not None:
        n_frames = min(n_frames, args.max_frames)

    print(
        f"[matte] src={src_w}x{src_h} fps={fps} total_src_frames={total_src_frames} "
        f"start_frame={start_frame} n_frames={n_frames} downsample_ratio={downsample:.4f}",
        flush=True,
    )

    rec = [None, None, None, None]
    times = []
    idx = 0
    t_loop_start = time.time()
    while idx < n_frames:
        ok, frame_bgr = cap.read()
        if not ok:
            print(f"[matte] WARNING: read failed at frame {idx}, stopping early", flush=True)
            break
        frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        t = torch.from_numpy(frame_rgb).permute(2, 0, 1).float().div(255).unsqueeze(0)

        t_frame_start = time.time()
        fgr, pha, *rec = model(t, *rec, downsample_ratio=downsample)
        dt = time.time() - t_frame_start
        times.append(dt)

        fgr_np = fgr[0].clamp(0, 1).mul(255).byte().permute(1, 2, 0).numpy()
        pha_np = pha[0, 0].clamp(0, 1).mul(255).byte().numpy()
        rgba = np.dstack([cv2.cvtColor(fgr_np, cv2.COLOR_RGB2BGR), pha_np])
        cv2.imwrite(str(outdir / "rgba" / f"frame_{idx:05d}.png"), rgba)

        if idx % args.log_every == 0:
            elapsed = time.time() - t_loop_start
            avg = sum(times) / len(times)
            eta = avg * (n_frames - idx - 1)
            print(
                f"[matte] frame {idx}/{n_frames} avg={avg*1000:.0f}ms/frame "
                f"({1/avg:.3f} it/s) elapsed={elapsed:.1f}s eta_remaining={eta:.1f}s",
                flush=True,
            )
        idx += 1

    cap.release()
    total_elapsed = time.time() - t_loop_start
    avg = sum(times) / len(times) if times else float("nan")
    it_s = 1 / avg if avg else None
    print(
        f"[matte] DONE frames={len(times)} total={total_elapsed:.1f}s "
        f"avg={avg*1000:.1f}ms/frame ({it_s:.3f} it/s)",
        flush=True,
    )

    manifest = {
        "input": args.input,
        "variant": args.variant,
        "downsample_ratio": downsample,
        "src_w": src_w,
        "src_h": src_h,
        "fps": fps,
        "start_frame": start_frame,
        "n_frames_requested": n_frames,
        "n_frames_done": len(times),
        "avg_ms_per_frame": avg * 1000 if times else None,
        "it_per_sec": it_s,
        "total_elapsed_s": total_elapsed,
        "model_load_s": load_s,
        "threads": torch.get_num_threads(),
        "full_video_total_frames": total_src_frames,
        "projected_full_video_s": (avg * total_src_frames) if times else None,
    }
    with open(outdir / "manifest.json", "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"[matte] manifest written to {outdir / 'manifest.json'}", flush=True)


if __name__ == "__main__":
    main()
