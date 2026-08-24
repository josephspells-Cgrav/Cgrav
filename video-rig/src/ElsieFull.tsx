/* ═══════════════════════════════════════════════════════════════════════════
 * ElsieFull — full 38.65s 1:1 reproduction of the _k.elsie reel graphics layer.
 * Every beat READ OFF REFERENCE FRAMES (contact sheets A–L), not from memory.
 *
 *   content rect  1080x2038 @ y=48 of the 1080x2340 screen recording
 *   14 scenes / 13 cuts (PySceneDetect):
 *     2.899 5.899 6.799 8.398 10.133 14.398 18.965 19.931 20.998
 *     23.198 28.266 31.198 36.799
 *   type          static (PROVEN: cyan px count flat across a beat) + drift
 *   chrome        stops sampled per-pixel down real letter strokes
 *
 * ⚠️ INTERNAL PIPELINE BENCHMARK ONLY — audio, footage and art direction are
 *    _k.elsie's. Never ships to a client.
 * ═══════════════════════════════════════════════════════════════════════ */
import React from "react";
import {
  AbsoluteFill, Audio, Img, OffthreadVideo, Sequence,
  interpolate, staticFile, useCurrentFrame,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

const { fontFamily: poppins } = loadPoppins();
const FPS = 30;
const f = (t: number) => Math.round(t * FPS);
const W = 1080;
const H = 2038;

/* ── CHROME MATERIALS ──────────────────────────────────────────────────── */
const chromeSteel =
  "linear-gradient(178deg,#dfe9f2 0%,#7fa0b5 13%,#4b7684 26%,#35596b 40%,#2b4a5a 50%,#547f92 61%,#6f93a6 74%,#9fbdd0 88%,#e2edf5 100%)";
const chromeCyan =
  "linear-gradient(178deg,#16332f 0%,#63b3ba 12%,#8fe9f2 20%,#86dfed 31%,#2b6f75 40%,#1e2c2e 50%,#3d7d7f 62%,#2ca5a5 76%,#4fb8c0 90%,#7fd8e0 100%)";
const chromePurple =
  "linear-gradient(178deg,#f0d2f4 0%,#ca94d1 14%,#a672af 30%,#7e557f 44%,#6b4670 55%,#a377ad 70%,#c78fd0 84%,#ecc9f0 100%)";
const chromeMoney =
  "linear-gradient(178deg,#dff3e4 0%,#8fc79b 14%,#4f9a63 30%,#2f6b45 44%,#274f38 55%,#5a9a6d 70%,#9ed0ae 84%,#e6f6ea 100%)";
const chromeSilver =
  "linear-gradient(178deg,#f4f6f8 0%,#c3ccd4 14%,#8d99a4 30%,#5f6b76 44%,#4c5661 55%,#909ba6 70%,#ccd4db 84%,#f6f8fa 100%)";
const chromeDeepPurple =
  "linear-gradient(178deg,#c9a3e8 0%,#9b5fd0 16%,#7b35bd 34%,#5d1f96 50%,#4a1a7a 62%,#8a49c4 78%,#b98adf 100%)";

type Beat = {
  text: string; at: number; out: number; cy: number; size: number;
  drift?: number; kind?: "light" | "display"; chrome?: string;
  italic?: boolean; countTo?: number; countFrom?: number;
  color?: string; glow?: string; weight?: number;
};

const Txt: React.FC<{ b: Beat }> = ({ b }) => {
  const frame = useCurrentFrame();
  const a = f(b.at), z = f(b.out);
  if (frame < a || frame >= z) return null;
  const life = Math.max(2, z - a);
  const p = (frame - a) / life;
  const drift = interpolate(p, [0, 1], [0, b.drift ?? -8]);
  const fin = Math.max(1, Math.min(3, Math.floor(life / 3)));
  const hold = Math.max(fin + 1, life - fin);
  const end = Math.max(hold + 1, life);
  const op = interpolate(frame - a, [0, fin, hold, end], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  let label = b.text;
  if (b.countTo !== undefined) {
    const from = b.countFrom ?? b.countTo - 12;
    label = String(Math.round(interpolate(p, [0, 0.62], [from, b.countTo],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  }

  const base: React.CSSProperties = {
    position: "absolute", left: 0, right: 0, top: b.cy * H + drift,
    textAlign: "center", fontFamily: poppins, fontSize: b.size,
    lineHeight: 1.0, transform: "translateY(-50%)", opacity: op,
    whiteSpace: "nowrap",
  };

  if (b.kind === "display") {
    return (
      <div style={base}>
        <span style={{
          fontWeight: b.weight ?? 700, letterSpacing: "-0.015em",
          backgroundImage: b.chrome, WebkitBackgroundClip: "text",
          backgroundClip: "text", color: "transparent",
          filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.35))",
        }}>{label}</span>
      </div>
    );
  }
  return (
    <div style={{
      ...base, fontStyle: b.italic ? "italic" : "normal",
      fontWeight: b.weight ?? 200,
      color: b.color ?? "rgba(255,255,255,0.90)",
      textShadow: b.glow ?? "0 2px 12px rgba(0,0,0,0.42)",
      letterSpacing: "-0.005em",
    }}>{label}</div>
  );
};

/* ── SCENE 6: circle that expands into a labelled pill ─────────────────── */
const Pill: React.FC<{ label: string; at: number; out: number; cx: number; cy: number }> =
({ label, at, out, cx, cy }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const grow = interpolate(frame - a, [0, 7, 14], [0, 0, 1],
    { extrapolateRight: "clamp" });          // circle holds, then expands
  const dia = 92;
  const wide = 300;
  const w = dia + (wide - dia) * grow;
  const op = interpolate(frame - a, [0, 4], [0, 1], { extrapolateRight: "clamp" })
    * interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: cx * W - w / 2, top: cy * H - dia / 2,
      width: w, height: dia, borderRadius: dia / 2,
      background: "rgba(8,8,8,0.92)", border: "3px solid #f2c832",
      boxShadow: "0 0 26px rgba(242,200,50,0.45)", opacity: op,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <span style={{
        fontFamily: poppins, fontWeight: 500, fontSize: 46, color: "#fff",
        opacity: interpolate(grow, [0.55, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        whiteSpace: "nowrap",
      }}>{label}</span>
    </div>
  );
};

/* ── SCENE 10: fake incoming-call bar ──────────────────────────────────── */
const CallBar: React.FC<{ at: number; out: number }> = ({ at, out }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const p = (frame - a) / (z - a);
  const op = interpolate(frame - a, [0, 6], [0, 1], { extrapolateRight: "clamp" })
    * interpolate(frame, [z - 6, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(p, [0, 1], [0.40, 0.30]);
  return (
    <div style={{
      position: "absolute", left: x * W, top: 0.518 * H, width: 610, height: 112,
      borderRadius: 20, background: "rgba(28,28,30,0.90)", opacity: op,
      display: "flex", alignItems: "center", padding: "0 16px", gap: 14,
      boxShadow: "0 10px 34px rgba(0,0,0,0.5)", fontFamily: poppins,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 30, letterSpacing: "0.02em" }}>CLIENT</div>
        <div style={{ color: "#a8a8ad", fontWeight: 300, fontSize: 24 }}>Mobile</div>
      </div>
      <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#ff3b30",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 34, transform: "rotate(134deg)" }}>&#9742;</span>
      </div>
      <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#34c759",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 34 }}>&#9742;</span>
      </div>
    </div>
  );
};

/* ── SCENE 2: house cards around the count-up ──────────────────────────── */
const HOUSES = [
  { src: "br2-dronehouse.png", x: 0.020, y: 0.300, w: 0.152, at: 4.62, rot: -2 },
  { src: "br7-newroof.png",    x: 0.812, y: 0.300, w: 0.150, at: 4.76, rot: 2 },
  { src: "br8-aerialstill.png",x: 0.468, y: 0.212, w: 0.140, at: 4.90, rot: 0 },
  { src: "br2-quality.png",    x: 0.022, y: 0.442, w: 0.145, at: 5.04, rot: 1 },
  { src: "new-b.png",          x: 0.828, y: 0.442, w: 0.150, at: 5.18, rot: -1 },
];

/* ── SCENE 7: the marketing card cloud ─────────────────────────────────── */
const CLOUD = [
  { src: "br1-cheappatch.png", x: 0.020, y: 0.300, w: 0.190, at: 14.45, rot: -4 },
  { src: "new-a.png",          x: 0.790, y: 0.285, w: 0.195, at: 14.60, rot: 3 },
  { src: "br3-oldroof.png",    x: 0.205, y: 0.205, w: 0.170, at: 14.80, rot: 2 },
  { src: "br5-ceiling.png",    x: 0.630, y: 0.195, w: 0.175, at: 15.00, rot: -3 },
  { src: "br4-curl.png",       x: 0.015, y: 0.470, w: 0.180, at: 15.25, rot: 4 },
  { src: "old-a.png",          x: 0.805, y: 0.465, w: 0.180, at: 15.50, rot: -2 },
  { src: "br6-attic.png",      x: 0.150, y: 0.585, w: 0.165, at: 15.80, rot: -3 },
  { src: "br7-newroof.png",    x: 0.690, y: 0.595, w: 0.175, at: 16.10, rot: 3 },
  { src: "br2-quality.png",    x: 0.412, y: 0.140, w: 0.160, at: 16.45, rot: 1 },
  { src: "br8-aerialstill.png",x: 0.030, y: 0.660, w: 0.160, at: 16.80, rot: 2 },
];

const Cards: React.FC<{ items: typeof HOUSES; out: number }> = ({ items, out }) => {
  const frame = useCurrentFrame();
  const z = f(out);
  if (frame >= z) return null;
  return (<>
    {items.map((h, i) => {
      const a = f(h.at);
      if (frame < a) return null;
      const op = interpolate(frame - a, [0, 5], [0, 1], { extrapolateRight: "clamp" })
        * interpolate(frame, [z - 6, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const sc = interpolate(frame - a, [0, 6], [0.86, 1], { extrapolateRight: "clamp" });
      return (
        <div key={i} style={{
          position: "absolute", left: h.x * W, top: h.y * H, width: h.w * W,
          transform: `rotate(${h.rot}deg) scale(${sc})`, opacity: op,
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
        }}>
          <div style={{ width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
            <Img src={staticFile(h.src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      );
    })}
  </>);
};

/* ── SCENE 11: the yellow swoosh arc ───────────────────────────────────── */
const Swoosh: React.FC<{ at: number; out: number }> = ({ at, out }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const p = (frame - a) / (z - a);
  const dash = interpolate(p, [0, 0.45], [0, 1], { extrapolateRight: "clamp" });
  const op = interpolate(frame, [z - 8, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const LEN = 560;
  return (
    <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, opacity: op }}>
      <path d="M -40 1140 C 60 1010, 130 1130, 205 1035" fill="none"
        stroke="#f5c518" strokeWidth={16} strokeLinecap="round"
        strokeDasharray={LEN} strokeDashoffset={LEN * (1 - dash)}
        style={{ filter: "drop-shadow(0 0 18px rgba(245,197,24,0.55))" }} />
      <circle cx={205} cy={1035} r={17} fill="#ff9a1f"
        opacity={interpolate(dash, [0.9, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </svg>
  );
};

/* ── SCENE 4: the "under contract" post card ───────────────────────────── */
const PostCard: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(6.80), z = f(8.398);
  if (frame < a || frame >= z) return null;
  const p = (frame - a) / (z - a);
  const rot = interpolate(p, [0, 1], [-3.4, -0.6]);
  const sc = interpolate(p, [0, 1], [0.94, 1.06]);
  const op = interpolate(frame - a, [0, 4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: 40, top: 120, width: 1000,
      transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 40%",
      opacity: op, background: "#fff", boxShadow: "0 26px 70px rgba(0,0,0,0.55)",
      fontFamily: poppins, overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 22px 6px" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#3a3a3a" }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 22, color: "#111" }}>Kelsie Blevins</div>
          <div style={{ fontWeight: 300, fontSize: 17, color: "#8a8a8a" }}>July 15 at 1:36 AM · Jesus Be The Name</div>
        </div>
      </div>
      <div style={{ fontSize: 21, fontWeight: 400, color: "#1c1c1c", padding: "0 22px 14px" }}>
        Twelve properties. All under contract. Swipe left. 🏡 … See more
      </div>
      <div style={{ width: "100%", height: 700, background: "#1a1a1a", overflow: "hidden" }}>
        <Img src={staticFile("br8-aerialstill.png")} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9, display: "block" }} />
      </div>
      <div style={{ display: "flex", height: 430 }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Img src={staticFile("br2-dronehouse.png")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ width: 6, background: "#fff" }} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Img src={staticFile("new-b.png")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
    </div>
  );
};

/* ── THE FULL BEAT SHEET ───────────────────────────────────────────────── */
const MID = 0.505;
const TOP = 0.345;
const LOW = 0.565;

const BEATS: Beat[] = [
  /* S1 bench 0–2.899 */
  { text: "It's", at: 0.00, out: 0.46, cy: 0.262, size: 150, drift: -12 },
  { text: "It's no", at: 0.46, out: 0.98, cy: 0.268, size: 168, drift: -14 },
  { text: "secret,", at: 0.58, out: 0.98, cy: 0.556, size: 292, drift: -8, kind: "display", chrome: chromeSteel },
  { text: "CLIENTS", at: 0.98, out: 1.72, cy: 0.238, size: 208, drift: 46, kind: "display", chrome: chromePurple },
  { text: "come", at: 1.30, out: 1.54, cy: MID, size: 138 },
  { text: "come to me,", at: 1.54, out: 1.94, cy: MID, size: 140 },
  { text: "to", at: 1.94, out: 2.06, cy: MID, size: 126 },
  { text: "get", at: 2.06, out: 2.17, cy: MID, size: 126 },
  { text: "the", at: 2.17, out: 2.24, cy: MID, size: 120 },
  { text: "job", at: 2.24, out: 2.44, cy: MID, size: 134 },
  { text: "done.", at: 2.44, out: 2.899, cy: 0.500, size: 142, drift: -16 },

  /* S2 bridge 2.899–5.899 */
  { text: "so far in", at: 3.04, out: 4.20, cy: TOP, size: 118, drift: -10 },
  { text: "2026,", at: 3.58, out: 4.20, cy: 0.500, size: 250, drift: -8, kind: "display", chrome: chromeCyan },
  { text: "I sold over", at: 4.22, out: 5.899, cy: 0.481, size: 108, drift: -5, italic: true },
  { text: "", countFrom: 42, countTo: 50, at: 4.55, out: 5.32, cy: 0.547, size: 218, drift: -5, kind: "display", chrome: chromeMoney },
  { text: "50", at: 5.32, out: 5.899, cy: 0.547, size: 218, drift: -5, kind: "display", chrome: chromeSilver },
  { text: "HOMES", at: 4.55, out: 5.899, cy: 0.600, size: 155, drift: -5, kind: "display", chrome: chromeSilver },

  /* S3 5.899–6.799 */
  { text: "Over half", at: 6.00, out: 6.46, cy: TOP, size: 118, drift: -10 },
  { text: "of those", at: 6.46, out: 6.799, cy: TOP, size: 118, drift: -10 },

  /* S4 insert card 6.799–8.398 */
  { text: "went", at: 6.82, out: 7.00, cy: 0.505, size: 118 },
  { text: "under", at: 7.00, out: 7.14, cy: 0.505, size: 118 },
  { text: "contract", at: 7.14, out: 7.60, cy: 0.505, size: 140 },
  { text: "in under", at: 7.60, out: 7.74, cy: 0.505, size: 118 },
  { text: "two", at: 7.74, out: 7.94, cy: 0.505, size: 124 },
  { text: "weeks.", at: 7.94, out: 8.398, cy: 0.505, size: 132 },

  /* S5 forest 8.398–10.133 */
  { text: "So,", at: 8.98, out: 10.133, cy: 0.340, size: 214, drift: -8 },
  { text: "let's talk", at: 9.26, out: 10.133, cy: 0.538, size: 130 },
  { text: "about how.", at: 9.44, out: 10.133, cy: 0.588, size: 134, kind: "display", chrome: chromePurple },

  /* S6 path 10.133–14.398 */
  { text: "Fundamentally,", at: 10.20, out: 11.05, cy: 0.534, size: 132, drift: -10 },
  { text: "2 THINGS", at: 11.02, out: 12.50, cy: 0.369, size: 205, drift: -6, kind: "display",
    chrome: "linear-gradient(178deg,#fff6c2 0%,#ffd83d 22%,#f0a91b 48%,#c97c0c 66%,#f5c518 84%,#fff2ba 100%)" },
  { text: "2 THINGS", at: 12.50, out: 14.398, cy: 0.369, size: 205, drift: -6, kind: "display",
    chrome: "linear-gradient(178deg,#6a6a60 0%,#4e4e46 30%,#3b3b35 55%,#585850 80%,#707066 100%)" },
  { text: "real", at: 11.08, out: 11.30, cy: MID, size: 122 },
  { text: "estate", at: 11.30, out: 11.50, cy: MID, size: 122 },
  { text: "comes", at: 11.50, out: 11.72, cy: MID, size: 124 },
  { text: "down", at: 11.72, out: 11.90, cy: MID, size: 122 },
  { text: "to", at: 11.90, out: 12.02, cy: MID, size: 118 },
  { text: "two", at: 12.02, out: 12.18, cy: MID, size: 124 },
  { text: "things,", at: 12.18, out: 12.50, cy: MID, size: 128 },

  /* S7 railing + card cloud 14.398–18.965 */
  { text: "Marketing", at: 14.45, out: 14.90, cy: MID, size: 128 },
  { text: "content", at: 14.90, out: 15.30, cy: MID, size: 128 },
  { text: "is", at: 15.30, out: 15.45, cy: MID, size: 118 },
  { text: "absolutely", at: 15.45, out: 15.80, cy: MID, size: 130 },
  { text: "essential", at: 15.80, out: 16.30, cy: MID, size: 130 },
  { text: "on how I", at: 16.30, out: 16.85, cy: MID, size: 124 },
  { text: "every", at: 16.85, out: 17.35, cy: MID, size: 124 },
  { text: "listing,", at: 17.35, out: 17.88, cy: MID, size: 128 },
  { text: "but", at: 17.90, out: 18.965, cy: 0.192, size: 108 },
  { text: "what really", at: 18.02, out: 18.965, cy: 0.243, size: 130, drift: -5, weight: 500 },
  { text: "gets homes", at: 18.32, out: 18.965, cy: 0.549, size: 132 },
  { text: "SOLD,", at: 18.54, out: 18.965, cy: 0.622, size: 160, kind: "display", chrome: chromeDeepPurple },

  /* S8 18.965–19.931 */
  { text: "is market", at: 18.98, out: 19.931, cy: MID, size: 126 },
  { text: "knowledge,", at: 19.16, out: 19.931, cy: 0.568, size: 150, kind: "display", chrome: chromePurple },

  /* S9 19.931–20.998 */
  { text: "and negotiation", at: 19.96, out: 20.998, cy: MID, size: 110 },
  { text: "skills.", at: 20.28, out: 20.998, cy: 0.568, size: 158, kind: "display", chrome: chromePurple },

  /* S10 bench + call bar 20.998–23.198 */
  { text: "clients", at: 21.20, out: 21.72, cy: MID, size: 128 },
  { text: "me", at: 21.95, out: 22.36, cy: MID, size: 124 },
  { text: "because", at: 22.44, out: 23.02, cy: MID, size: 128 },

  /* S11 lake 23.198–28.266 */
  { text: "notice", at: 23.22, out: 23.78, cy: 0.565, size: 132 },
  { text: "results", at: 23.86, out: 24.46, cy: 0.565, size: 132 },
  { text: "to", at: 24.58, out: 24.96, cy: 0.565, size: 122 },
  { text: "deliver.", at: 25.08, out: 25.62, cy: 0.565, size: 132 },
  { text: "Transparency,", at: 25.86, out: 26.46, cy: 0.578, size: 126, kind: "display", chrome: chromeCyan },
  { text: "a deep", at: 26.52, out: 28.20, cy: 0.290, size: 122 },
  { text: "understanding", at: 26.74, out: 28.20, cy: 0.342, size: 138, kind: "display", chrome: chromeCyan },
  { text: "of this market,", at: 26.70, out: 28.20, cy: 0.545, size: 120 },

  /* S12 28.266–31.198 */
  { text: "the", at: 28.44, out: 28.92, cy: 0.565, size: 138 },
  { text: "that", at: 29.04, out: 29.56, cy: 0.560, size: 136 },
  { text: "your asset", at: 29.64, out: 30.96, cy: 0.505, size: 130 },
  { text: "the", at: 30.34, out: 30.78, cy: 0.560, size: 132 },
  { text: "investment.", at: 30.80, out: 31.198, cy: 0.562, size: 148 },

  /* S13 31.198–36.799 */
  { text: "I stand", at: 31.48, out: 31.98, cy: 0.505, size: 128 },
  { text: "your", at: 32.24, out: 32.68, cy: 0.505, size: 126 },
  { text: "deserves", at: 32.86, out: 33.32, cy: 0.505, size: 128 },
  { text: "the", at: 33.44, out: 33.88, cy: 0.505, size: 122 },
  { text: "have a", at: 34.14, out: 34.62, cy: 0.520, size: 126 },
  { text: "plan to", at: 34.70, out: 35.16, cy: 0.528, size: 128 },
  { text: "exactly", at: 35.24, out: 35.72, cy: 0.528, size: 130 },
  { text: "what", at: 35.84, out: 36.32, cy: 0.520, size: 126 },
  { text: "like.", at: 36.38, out: 36.799, cy: 0.520, size: 124 },

  /* S14 loop back to the bench 36.799–38.652 */
  { text: "It's no", at: 36.94, out: 37.62, cy: 0.268, size: 168, drift: -14 },
  { text: "secret,", at: 37.30, out: 38.06, cy: 0.556, size: 292, drift: -8, kind: "display", chrome: chromeSteel },
  { text: "CLIENTS", at: 38.02, out: 38.652, cy: 0.238, size: 208, drift: 40, kind: "display", chrome: chromePurple },
  { text: "come to me,", at: 38.24, out: 38.652, cy: MID, size: 140 },
];

const SfxAt: React.FC<{ at: number; src: string; vol: number }> = ({ at, src, vol }) => (
  <Sequence from={f(at)} durationInFrames={70}>
    <Audio src={staticFile(src)} volume={vol} />
  </Sequence>
);
const CUTS = [2.899, 5.899, 6.799, 8.398, 10.133, 14.398, 18.965, 19.931, 20.998, 23.198, 28.266, 31.198, 36.799];

export const ElsieFull: React.FC<{ mode: "black" | "matte" }> = ({ mode }) => (
  <AbsoluteFill style={{ background: "#000", width: W, height: H }}>
    {mode !== "black" && (
      <OffthreadVideo muted src={staticFile("elsie/contentFULL.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    )}

    <Cards items={HOUSES} out={5.899} />
    <Cards items={CLOUD} out={18.965} />
    <PostCard />
    <Swoosh at={23.70} out={25.30} />
    <CallBar at={21.24} out={23.10} />
    <Pill label="Pricing." at={12.52} out={14.398} cx={0.775} cy={0.472} />
    <Pill label="Presentation." at={13.28} out={14.398} cx={0.225} cy={0.472} />
    {BEATS.map((b, i) => <Txt key={i} b={b} />)}

    {mode === "matte" && (
      <OffthreadVideo transparent muted src={staticFile("elsie/subjectFULL.webm")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    )}

    <Audio src={staticFile("elsie/elsieFULL.m4a")} />
    {CUTS.map((t, i) => (
      <SfxAt key={i} at={t} src={i % 3 === 2 ? "sfx/whoosh-slow.wav" : "sfx/whoosh-fast.wav"} vol={0.15} />
    ))}
    <SfxAt at={4.55} src="sfx/impact-hit.wav" vol={0.13} />
    <SfxAt at={12.52} src="sfx/pop-card.wav" vol={0.16} />
    <SfxAt at={13.28} src="sfx/pop-card.wav" vol={0.16} />
    <SfxAt at={18.54} src="sfx/impact-hit.wav" vol={0.14} />
  </AbsoluteFill>
);
