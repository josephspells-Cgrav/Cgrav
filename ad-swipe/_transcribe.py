#!/usr/bin/env python
"""Local timestamped transcription via faster-whisper. Reusable across the ad-swipe pipeline.
Usage: python _transcribe.py <audio_or_video_file> [model=small.en]"""
import sys
from faster_whisper import WhisperModel

fn = sys.argv[1]
model_size = sys.argv[2] if len(sys.argv) > 2 else "small.en"
model = WhisperModel(model_size, device="cpu", compute_type="int8")
segments, info = model.transcribe(fn, vad_filter=True, beam_size=5)
print(f"# transcript: {fn}")
print(f"# lang={info.language} dur={info.duration:.1f}s model={model_size}")
print("# ---")
for seg in segments:
    print(f"[{seg.start:6.1f}-{seg.end:6.1f}] {seg.text.strip()}")
