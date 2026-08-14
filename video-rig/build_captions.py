# v1 caption rig — word-level ASS from whisper word timestamps.
# Brand: #cf2027 red, #12283f navy, white. ASS colors are &HBBGGRR&.
import json, io, sys

TRANSCRIPT = sys.argv[1] if len(sys.argv) > 1 else "bb-take/transcript.json"
OUT = sys.argv[2] if len(sys.argv) > 2 else "rig/captions.ass"

# --- brand-name repair (the house STT law: ASR garbles proper nouns) ---
FIXES = [
    (["maybe", "your", "roofing"], ["Mabrey", "Roofing"]),
    (["maybe", "roofing"], ["Mabrey", "Roofing"]),
    (["currently", "shingles"], ["curling", "shingles"]),
    (["mabry"], ["Mabrey"]),
]

def clean(w):
    return w.strip()

segs = json.load(io.open(TRANSCRIPT, encoding="utf-8"))
words = []
for s in segs:
    for w in s["words"]:
        t = clean(w["w"])
        if t:
            words.append({"t": t, "s": w["s"], "e": w["e"]})

# apply multi-word fixes
i = 0
fixed = []
while i < len(words):
    matched = False
    for pat, rep in FIXES:
        n = len(pat)
        if i + n <= len(words):
            window = [words[i + k]["t"].lower().strip(".,!?") for k in range(n)]
            if window == pat:
                start, end = words[i]["s"], words[i + n - 1]["e"]
                step = (end - start) / max(len(rep), 1)
                for j, r in enumerate(rep):
                    fixed.append({"t": r, "s": round(start + j * step, 2),
                                  "e": round(start + (j + 1) * step, 2)})
                i += n
                matched = True
                break
    if not matched:
        fixed.append(words[i])
        i += 1
words = fixed

# whisper splits hyphenates ("veteran" + "-owned") — rejoin onto the previous token
rejoined = []
for w in words:
    if rejoined and w["t"].startswith("-"):
        rejoined[-1]["t"] = rejoined[-1]["t"] + w["t"]
        rejoined[-1]["e"] = w["e"]
    else:
        rejoined.append(dict(w))
words = rejoined

# --- money atoms: "$98 a month" / "zero down" never split, and highlight as a unit ---
def _b(t):
    return t.lower().strip(".,!?\"'")

atoms, i = [], 0
while i < len(words):
    t = _b(words[i]["t"])
    took = 0
    if t.startswith("$") and i + 2 < len(words) and _b(words[i + 1]["t"]) in ("a", "per") \
       and _b(words[i + 2]["t"]) in ("month", "mo", "year"):
        took = 3
    elif t == "zero" and i + 1 < len(words) and _b(words[i + 1]["t"]) == "down":
        took = 2
    elif t.isdigit() and i + 1 < len(words) and _b(words[i + 1]["t"]) in ("months", "years", "million"):
        took = 2
    if took:
        grp = words[i:i + took]
        atoms.append({"t": " ".join(w["t"].strip() for w in grp),
                      "s": grp[0]["s"], "e": grp[-1]["e"]})
        i += took
    else:
        atoms.append(words[i]); i += 1
words = atoms

# --- phrase-aware chunking ---
# Money/number phrases must never split ("$98 a month", "zero down", "12 months").
# Prefer breaking after punctuation or a real pause; never orphan a leading article.
CHUNK_MAX = 4
GAP = 0.42
GLUE_AFTER = {"$", "as", "low", "a", "an", "the", "for", "over", "zero", "no", "your", "of", "and"}

def bare(t):
    return t.lower().strip(".,!?\"'")

def ends_phrase(t):
    return t.rstrip().endswith((".", ",", "!", "?"))

chunks, cur = [], []
for i, w in enumerate(words):
    if cur:
        gap = w["s"] - cur[-1]["e"]
        last = bare(cur[-1]["t"])
        # never break right after a glue word (article/preposition/number-lead)
        glued = last in GLUE_AFTER or last.replace("$", "").isdigit()
        over = len(cur) >= CHUNK_MAX
        natural = ends_phrase(cur[-1]["t"]) or gap > GAP
        hard = len(cur) >= 4          # glue may delay a break, never prevent one
        if hard or ((over or natural) and not glued):
            chunks.append(cur); cur = []
    cur.append(w)
if cur:
    chunks.append(cur)

# absorb 1-word orphans into the previous chunk when it has room
merged = []
for c in chunks:
    if merged and len(c) == 1 and len(merged[-1]) < CHUNK_MAX + 1:
        merged[-1].extend(c)
    else:
        merged.append(c)
chunks = merged

HDR = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Segoe UI Black,84,&H00FFFFFF,&H00FFFFFF,&H00201810,&H00000000,-1,0,0,0,100,100,1,0,1,7,0,2,44,44,150,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

def ts(t):
    h = int(t // 3600); m = int((t % 3600) // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"

RED = r"{\c&H2720CF&}"   # #cf2027 -> BGR
WHITE = r"{\c&HFFFFFF&}"

lines = []
for ch in chunks:
    c_start, c_end = ch[0]["s"], ch[-1]["e"] + 0.08
    for k, w in enumerate(ch):
        seg_s = w["s"] if k == 0 else ch[k]["s"]
        seg_e = ch[k]["e"] if k < len(ch) - 1 else c_end
        parts = []
        for j, ww in enumerate(ch):
            col = RED if j == k else WHITE
            parts.append(col + ww["t"].upper())
        txt = " ".join(parts)
        lines.append(f"Dialogue: 0,{ts(seg_s)},{ts(seg_e)},Cap,,0,0,0,,{txt}")

io.open(OUT, "w", encoding="utf-8").write(HDR + "\n".join(lines) + "\n")
print(f"words={len(words)} chunks={len(chunks)} events={len(lines)} -> {OUT}")
print("first 3 chunks:", " | ".join(" ".join(w["t"] for w in c) for c in chunks[:3]))
