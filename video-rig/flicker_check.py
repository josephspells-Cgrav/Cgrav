"""
flicker_check.py -- quantitative temporal-stability check over the RVM alpha
sequence (paranoia-skim aid, not a WO deliverable).

Reports, across consecutive frame pairs:
  - mean abs alpha diff over the whole frame (overall jitter)
  - mean abs alpha diff in fixed corner patches (should be ~pure background;
    near-zero unless the matte is flickering hard-edge noise into "empty" sky)
  - silhouette pixel-count (alpha>128) frame to frame, to catch the mask
    randomly growing/shrinking (a common RVM flicker failure mode)
  - worst single-frame jump for each metric, with its frame index
"""
import argparse
import glob
from pathlib import Path

import cv2
import numpy as np


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rgba-dir", required=True)
    ap.add_argument("--corner", type=int, default=120, help="corner patch size in px")
    args = ap.parse_args()

    files = sorted(glob.glob(str(Path(args.rgba_dir) / "frame_*.png")))
    if len(files) < 2:
        print("not enough frames")
        return

    alphas = []
    for f in files:
        rgba = cv2.imread(f, cv2.IMREAD_UNCHANGED)
        alphas.append(rgba[:, :, 3].astype(np.float32))
    h, w = alphas[0].shape
    cs = args.corner

    overall_diffs = []
    corner_diffs = []
    silhouette_counts = [float((a > 128).sum()) for a in alphas]
    silhouette_deltas = []

    for i in range(1, len(alphas)):
        d = np.abs(alphas[i] - alphas[i - 1])
        overall_diffs.append(d.mean())
        corners = np.concatenate([
            d[:cs, :cs].ravel(), d[:cs, -cs:].ravel(),
            d[-cs:, :cs].ravel(), d[-cs:, -cs:].ravel(),
        ])
        corner_diffs.append(corners.mean())
        silhouette_deltas.append(abs(silhouette_counts[i] - silhouette_counts[i - 1]))

    overall_diffs = np.array(overall_diffs)
    corner_diffs = np.array(corner_diffs)
    silhouette_deltas = np.array(silhouette_deltas)
    total_px = h * w

    print(f"frames={len(alphas)} size={w}x{h}")
    print(f"overall alpha frame-to-frame diff: mean={overall_diffs.mean():.3f} max={overall_diffs.max():.3f} (0-255 scale) at frame {overall_diffs.argmax()+1}")
    print(f"corner-patch (bg) frame-to-frame diff: mean={corner_diffs.mean():.4f} max={corner_diffs.max():.4f} at frame {corner_diffs.argmax()+1}")
    print(f"silhouette px-count: mean={np.mean(silhouette_counts):.0f} ({np.mean(silhouette_counts)/total_px*100:.1f}% of frame) min={min(silhouette_counts):.0f} max={max(silhouette_counts):.0f}")
    print(f"silhouette frame-to-frame delta: mean={silhouette_deltas.mean():.0f}px ({silhouette_deltas.mean()/total_px*100:.3f}% of frame) max={silhouette_deltas.max():.0f}px at frame {silhouette_deltas.argmax()+1}")

    # flag frames with outlier jumps (>3x median) as flicker candidates
    med = np.median(overall_diffs) if np.median(overall_diffs) > 0 else 1e-6
    outliers = np.where(overall_diffs > med * 4)[0]
    print(f"outlier frames (>4x median overall diff, median={med:.3f}): {len(outliers)} -> {list(outliers[:20]+1)}")


if __name__ == "__main__":
    main()
