"""
composite_proof.py -- compose behind-subject proof frames from RVM RGBA output.
out = fgr*alpha + bg*(1-alpha), fgr/alpha read straight from the RVM RGBA PNGs
(B,G,R,A order as written by matte_test.py via cv2.imwrite).

Also writes paranoia-skim aids (not proof deliverables): raw alpha-only PNGs
and a checkerboard composite, so edge/halo artifacts are visually obvious.
"""
import argparse
import sys
from pathlib import Path

import cv2
import numpy as np


def checkerboard(w, h, cell=24):
    board = np.zeros((h, w, 3), dtype=np.uint8)
    c1, c2 = 200, 120
    for y in range(0, h, cell):
        for x in range(0, w, cell):
            v = c1 if ((x // cell) + (y // cell)) % 2 == 0 else c2
            board[y:y + cell, x:x + cell] = v
    return board


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rgba-dir", required=True)
    ap.add_argument("--bg", required=True)
    ap.add_argument("--frames", required=True, help="comma-separated frame indices, e.g. 30,150,270")
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--prefix", default="matte-proof")
    args = ap.parse_args()

    rgba_dir = Path(args.rgba_dir)
    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)

    bg = cv2.imread(args.bg, cv2.IMREAD_COLOR)
    if bg is None:
        print(f"ERROR: could not read bg {args.bg}", flush=True)
        sys.exit(2)

    frame_ids = [int(x) for x in args.frames.split(",")]
    for i, fid in enumerate(frame_ids, start=1):
        p = rgba_dir / f"frame_{fid:05d}.png"
        rgba = cv2.imread(str(p), cv2.IMREAD_UNCHANGED)
        if rgba is None:
            print(f"ERROR: could not read {p}", flush=True)
            continue
        h, w = rgba.shape[:2]
        bg_r = cv2.resize(bg, (w, h), interpolation=cv2.INTER_CUBIC)

        fgr = rgba[:, :, :3].astype(np.float32)
        alpha = rgba[:, :, 3].astype(np.float32) / 255.0
        alpha3 = np.dstack([alpha, alpha, alpha])

        comp = fgr * alpha3 + bg_r.astype(np.float32) * (1 - alpha3)
        comp = comp.clip(0, 255).astype(np.uint8)
        out_path = outdir / f"{args.prefix}-{i}.jpg"
        cv2.imwrite(str(out_path), comp, [cv2.IMWRITE_JPEG_QUALITY, 92])
        print(f"wrote {out_path} (frame {fid})", flush=True)

        # paranoia-skim aids, written next to proof frames' source dir (scratch), not the deliverable dir
        alpha_u8 = (alpha * 255).astype(np.uint8)
        cv2.imwrite(str(outdir / f"alpha-{i}.png"), alpha_u8)

        check = checkerboard(w, h)
        comp_check = fgr * alpha3 + check.astype(np.float32) * (1 - alpha3)
        comp_check = comp_check.clip(0, 255).astype(np.uint8)
        cv2.imwrite(str(outdir / f"checker-{i}.jpg"), comp_check, [cv2.IMWRITE_JPEG_QUALITY, 92])


if __name__ == "__main__":
    main()
