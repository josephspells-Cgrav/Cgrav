import re, glob, os
os.chdir(r"C:/Users/josep/Claude Gravity/yt-research")
for f in sorted(glob.glob("*.vtt")):
    raw = open(f, encoding="utf-8", errors="ignore").read().splitlines()
    out, recent = [], []
    for ln in raw:
        if "-->" in ln:
            continue
        s = ln.strip()
        if not s or s.startswith(("WEBVTT", "Kind:", "Language:")):
            continue
        s = re.sub(r"<[^>]+>", "", s)
        s = re.sub(r"&nbsp;| ", " ", s).strip()
        if not s or s in recent:
            continue
        out.append(s); recent.append(s); recent = recent[-5:]
    text = re.sub(r"\s+", " ", " ".join(out)).strip()
    base = re.sub(r"\.(en[^.]*)?$", "", f.rsplit(".vtt", 1)[0])
    open(base + ".txt", "w", encoding="utf-8").write(text)
    print(f"{base}.txt: {len(text.split())} words")
