# Teeth + sclera enhancement, mask-tracked per frame.
#
# Why masks and not a global filter: teeth-yellow overlaps skin tone and the
# tan hat, so any global desaturation hits his face and the cap too. MediaPipe
# gives 468 tracked landmarks per frame, so the adjustment lands ONLY inside
# the inner-lip and eye contours.
#
# Why a brightness gate inside those contours: the inner-lip polygon also
# contains tongue and dark mouth interior; the eye polygon contains iris and
# pupil. Weighting the effect by per-frame in-region brightness percentiles
# means teeth and sclera take the adjustment and the dark parts take ~none —
# no hand-tuned thresholds that drift when the light changes.
#
# Work is done in LAB: b = yellow/blue axis (teeth yellowing), a = red/green
# axis (eye redness), L = luminance. Pulling b and a toward neutral is exactly
# "whiten" without touching hue relationships elsewhere.
#
# NOTE: mediapipe 1.x removed the legacy `mp.solutions.face_mesh` API — this
# uses the Tasks API (vision.FaceLandmarker) with a downloaded .task model.
import cv2, numpy as np, mediapipe as mp, subprocess, sys, os
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision

SRC = sys.argv[1] if len(sys.argv) > 1 else 'public/take2-graded.mp4'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'public/take2-beauty.mp4'
# strength dials — deliberately conservative; see report
TEETH_DEYELLOW = float(os.environ.get('TEETH_DEYELLOW', 14))  # LAB b toward neutral
TEETH_LIFT     = float(os.environ.get('TEETH_LIFT', 11))      # LAB L lift
EYE_DERED      = float(os.environ.get('EYE_DERED', 7))        # LAB a toward neutral
EYE_LIFT       = float(os.environ.get('EYE_LIFT', 8))         # LAB L lift

INNER_LIP = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191]
LEFT_EYE  = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
RIGHT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]

cap = cv2.VideoCapture(SRC)
W  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
Hh = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
FPS = cap.get(cv2.CAP_PROP_FPS)
N  = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f'{W}x{Hh} @ {FPS:.3f}fps, {N} frames', flush=True)

ff = subprocess.Popen(
    ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24',
     '-s', f'{W}x{Hh}', '-r', f'{FPS}', '-i', 'pipe:0',
     '-i', SRC, '-map', '0:v', '-map', '1:a?', '-c:a', 'copy',
     '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', OUT],
    stdin=subprocess.PIPE)

mesh = vision.FaceLandmarker.create_from_options(
    vision.FaceLandmarkerOptions(
        base_options=mpp.BaseOptions(model_asset_path='face_landmarker.task'),
        running_mode=vision.RunningMode.VIDEO,
        num_faces=1,
        min_face_detection_confidence=0.4,
        min_tracking_confidence=0.4,
    )
)

def region_mask(pts, idxs, shape, feather):
    m = np.zeros(shape[:2], np.uint8)
    poly = np.array([pts[i] for i in idxs], np.int32)
    cv2.fillPoly(m, [poly], 255)
    k = feather | 1
    return cv2.GaussianBlur(m, (k, k), 0)

def apply(lab, mask, d_b, d_L, d_a, L):
    """Weight the adjustment by in-region brightness so teeth/sclera take it
    and tongue/pupil don't. Percentiles are per-frame: self-calibrating."""
    sel = mask > 8
    if not sel.any():
        return
    vals = L[sel]
    lo, hi = np.percentile(vals, 45), np.percentile(vals, 96)
    if hi - lo < 4:
        return
    w = np.clip((L - lo) / (hi - lo), 0, 1) * (mask / 255.0)
    w = w[..., None]
    adj = np.zeros_like(lab)
    if d_L: adj[..., 0] = d_L
    if d_a: adj[..., 1] = -np.clip(lab[..., 1] - 128, 0, None) * (d_a / 40.0)
    if d_b: adj[..., 2] = -np.clip(lab[..., 2] - 128, 0, None) * (d_b / 40.0)
    lab += adj * w

hits = 0
for i in range(N):
    ok, frame = cap.read()
    if not ok:
        break
    mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    res = mesh.detect_for_video(mp_img, int(i * 1000 / FPS))
    if res.face_landmarks:
        hits += 1
        lm = res.face_landmarks[0]
        pts = [(int(p.x * W), int(p.y * Hh)) for p in lm]
        lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB).astype(np.float32)
        L = lab[..., 0]
        apply(lab, region_mask(pts, INNER_LIP, frame.shape, 9), TEETH_DEYELLOW, TEETH_LIFT, 0, L)
        eyes = np.maximum(region_mask(pts, LEFT_EYE, frame.shape, 7),
                          region_mask(pts, RIGHT_EYE, frame.shape, 7))
        apply(lab, eyes, 0, EYE_LIFT, EYE_DERED, L)
        frame = cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
    ff.stdin.write(frame.tobytes())
    if i % 200 == 0:
        print(f'  {i}/{N}  face-detected {hits}', flush=True)

cap.release()
ff.stdin.close()
ff.wait()
print(f'DONE — {hits}/{N} frames had a tracked face ({100*hits/max(N,1):.1f}%) -> {OUT}', flush=True)
