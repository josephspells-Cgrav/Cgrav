/* ═══════════════════════════════════════════════════════════════════════════
 * ElsieRepro — MAXIMALIST 1:1 reproduction of the first 10.45s of the
 * _k.elsie realtor reel's graphics layer. Built from MEASUREMENTS, not memory:
 *
 *   content rect      1080x2038 @ y=48 in the 1080x2340 screen recording
 *   cuts (PySceneDetect) 2.899 · 5.899 · 6.799 · 8.398 · 10.133
 *   word timings      whisper word-level stamps off the ripped audio
 *   chrome gradients  sampled per-pixel down a letter stroke (probe.py)
 *   CLIENTS purple    hi #ca94d1 / mid #a672af / lo #7e557f (hue-isolated)
 *   type              heavy geometric sans (Poppins) display,
 *                     light geometric sans small — matches the circular
 *                     bowls + flat-top 't' in the reference letterforms
 *
 * ⚠️ INTERNAL PIPELINE TEST ONLY. Audio + footage belong to _k.elsie.
 *    This is a capability benchmark and never ships to a client.
 * ═══════════════════════════════════════════════════════════════════════ */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

const { fontFamily: poppins } = loadPoppins();

const FPS = 30;
const f = (t: number) => Math.round(t * FPS);
const W = 1080;
const H = 2038;

/* ── CHROME MATERIALS — stops sampled down real letter strokes ─────────── */
const chromeCyan =
  "linear-gradient(178deg,#16332f 0%,#63b3ba 12%,#8fe9f2 20%,#86dfed 31%,#2b6f75 40%,#1e2c2e 50%,#3d7d7f 62%,#2ca5a5 76%,#4fb8c0 90%,#7fd8e0 100%)";
const chromeSteel =
  "linear-gradient(178deg,#dfe9f2 0%,#7fa0b5 13%,#4b7684 26%,#35596b 40%,#2b4a5a 50%,#547f92 61%,#6f93a6 74%,#9fbdd0 88%,#e2edf5 100%)";
const chromeMoney =
  "linear-gradient(178deg,#dff3e4 0%,#8fc79b 14%,#4f9a63 30%,#2f6b45 44%,#274f38 55%,#5a9a6d 70%,#9ed0ae 84%,#e6f6ea 100%)";
const chromeSilver =
  "linear-gradient(178deg,#f4f6f8 0%,#c3ccd4 14%,#8d99a4 30%,#5f6b76 44%,#4c5661 55%,#909ba6 70%,#ccd4db 84%,#f6f8fa 100%)";
const chromePurple =
  "linear-gradient(178deg,#f0d2f4 0%,#ca94d1 14%,#a672af 30%,#7e557f 44%,#6b4670 55%,#a377ad 70%,#c78fd0 84%,#ecc9f0 100%)";

/* ── the reference's motion: fade in + continuous scale push + drift ───── */
type Beat = {
  text: string;
  at: number;
  out: number;
  cx?: number; // 0..1 across width
  cy: number; // 0..1 down height
  size: number; // px at scale 1
  grow?: number; // scale multiplier across life
  drift?: number; // px vertical drift across life
  kind?: "light" | "display";
  italic?: boolean;
  countTo?: number;
  countFrom?: number;
  chrome?: string;
};

const Txt: React.FC<{ b: Beat }> = ({ b }) => {
  const frame = useCurrentFrame();
  const a = f(b.at);
  const z = f(b.out);
  if (frame < a || frame >= z) return null;

  const p = (frame - a) / Math.max(1, z - a); // 0..1 life
  const grow = b.grow ?? 1.02;
  const scale = interpolate(p, [0, 1], [1, grow]);
  const drift = interpolate(p, [0, 1], [0, b.drift ?? -26]);
  // fast fade in, hold, quick fade out
  const life = Math.max(2, z - a);
  // strictly increasing knots even for sub-3-frame beats
  const fin = Math.max(1, Math.min(3, Math.floor(life / 3)));
  const hold = Math.max(fin + 1, life - fin);
  const end = Math.max(hold + 1, life);
  const op = interpolate(frame - a, [0, fin, hold, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let label = b.text;
  if (b.countTo !== undefined) {
    const from = b.countFrom ?? b.countTo - 12;
    const q = interpolate(p, [0, 0.62], [from, b.countTo], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    label = String(Math.round(q));
  }
  const display = b.kind === "display";
  const base: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: b.cy * H + drift,
    textAlign: "center",
    fontFamily: poppins,
    fontSize: b.size,
    lineHeight: 1.0,
    transform: `translateY(-50%) scale(${scale})`,
    opacity: op,
    whiteSpace: "nowrap",
  };

  if (display) {
    return (
      <div style={base}>
        <span
          style={{
            fontWeight: 700,
            letterSpacing: "-0.015em",
            backgroundImage: b.chrome,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.35))",
          }}
        >
          {label}
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        ...base,
        fontStyle: b.italic ? "italic" : "normal",
        fontWeight: 200,
        color: "rgba(255,255,255,0.86)",
        textShadow: "0 2px 12px rgba(0,0,0,0.42)",
        letterSpacing: "-0.005em",
      }}
    >
      {label}
    </div>
  );
};

/* ── THE BEAT SHEET — one word/phrase at a time, per the reference ─────── */
const BEATS: Beat[] = [
  // scene 1 — bench (0 → 2.899)
  { text: "It's", at: 0.00, out: 0.46, cy: 0.262, size: 150, grow: 1.26, drift: -12 },
  { text: "It's no", at: 0.46, out: 0.98, cy: 0.268, size: 168, grow: 1.22, drift: -14 },
  { text: "secret,", at: 0.58, out: 0.98, cy: 0.556, size: 292, grow: 1.16, drift: -8, kind: "display", chrome: chromeSteel },
  { text: "CLIENTS", at: 0.98, out: 1.72, cy: 0.238, size: 208, grow: 1.24, drift: 46, kind: "display", chrome: chromePurple },
  { text: "come", at: 1.30, out: 1.54, cy: 0.500, size: 138, grow: 1.16, drift: -12 },
  { text: "come to me,", at: 1.54, out: 1.94, cy: 0.500, size: 140, grow: 1.14, drift: -14 },
  { text: "to", at: 1.94, out: 2.06, cy: 0.500, size: 126, grow: 1.16, drift: -12 },
  { text: "get", at: 2.06, out: 2.17, cy: 0.500, size: 126, grow: 1.02, drift: -5 },
  { text: "the", at: 2.17, out: 2.24, cy: 0.500, size: 120, grow: 1.02, drift: -5 },
  { text: "job", at: 2.24, out: 2.44, cy: 0.500, size: 134, grow: 1.16, drift: -12 },
  { text: "done.", at: 2.44, out: 2.899, cy: 0.500, size: 142, grow: 1.20, drift: -16 },

  // scene 2 — suspension bridge (2.899 → 5.899)
  { text: "so far in", at: 3.04, out: 4.20, cy: 0.350, size: 118, grow: 1.12, drift: -10 },
  { text: "2026,", at: 3.58, out: 4.20, cy: 0.500, size: 250, grow: 1.10, drift: -8, kind: "display", chrome: chromeCyan },
  { text: "I sold over", at: 4.22, out: 5.899, cy: 0.481, size: 108, grow: 1.02, drift: -5, italic: true },
  { text: "", countFrom: 42, countTo: 50, at: 4.55, out: 5.32, cy: 0.547, size: 218, grow: 1.02, drift: -5, kind: "display", chrome: chromeMoney },
  { text: "50", at: 5.32, out: 5.899, cy: 0.547, size: 218, grow: 1.02, drift: -5, kind: "display", chrome: chromeSilver },
  { text: "HOMES", at: 4.55, out: 5.899, cy: 0.600, size: 155, grow: 1.02, drift: -5, kind: "display", chrome: chromeSilver },

  // scene 3 — bridge closer (5.899 → 6.799)
  { text: "Over half", at: 6.00, out: 6.46, cy: 0.350, size: 118, grow: 1.12, drift: -10 },
  { text: "of those", at: 6.46, out: 6.799, cy: 0.350, size: 118, grow: 1.12, drift: -10 },

  // scene 4 — insert card (6.799 → 8.398)
  { text: "went", at: 6.82, out: 7.00, cy: 0.505, size: 118, grow: 1.02, drift: -5 },
  { text: "under", at: 7.00, out: 7.14, cy: 0.505, size: 118, grow: 1.02, drift: -5 },
  { text: "contract", at: 7.14, out: 7.60, cy: 0.505, size: 140, grow: 1.02, drift: -5 },
  { text: "in under", at: 7.60, out: 7.74, cy: 0.505, size: 118, grow: 1.02, drift: -5 },
  { text: "two", at: 7.74, out: 7.94, cy: 0.505, size: 124, grow: 1.02, drift: -5 },
  { text: "weeks.", at: 7.94, out: 8.398, cy: 0.505, size: 132, grow: 1.02, drift: -5 },

  // scene 5 — forest (8.398 → 10.133)
  { text: "So,", at: 8.98, out: 10.133, cy: 0.340, size: 214, grow: 1.02, drift: -8 },
  { text: "let's talk", at: 9.26, out: 10.133, cy: 0.538, size: 130, grow: 1.02, drift: -6 },

  // scene 6 — railing (10.133 → )
  { text: "about how.", at: 9.44, out: 10.45, cy: 0.588, size: 134, grow: 1.02, drift: -6, kind: "display", chrome: chromePurple },
];


const HOUSES: {src:string;x:number;y:number;w:number;at:number;rot:number}[] = [
  { src:"br2-dronehouse.png", x:0.020, y:0.300, w:0.152, at:4.62, rot:-2 },
  { src:"br7-newroof.png",    x:0.812, y:0.300, w:0.150, at:4.76, rot: 2 },
  { src:"br8-aerialstill.png",x:0.468, y:0.212, w:0.140, at:4.90, rot: 0 },
  { src:"br2-quality.png",    x:0.022, y:0.442, w:0.145, at:5.04, rot: 1 },
  { src:"new-b.png",          x:0.828, y:0.442, w:0.150, at:5.18, rot:-1 },
];

const HouseCards: React.FC = () => {
  const frame = useCurrentFrame();
  const z = f(5.899);
  if (frame >= z) return null;
  return (
    <>
      {HOUSES.map((h, i) => {
        const a = f(h.at);
        if (frame < a) return null;
        const op = interpolate(frame - a, [0, 5], [0, 1], { extrapolateRight: "clamp" })
          * interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const sc = interpolate(frame - a, [0, 6], [0.86, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute", left: h.x * W, top: h.y * H, width: h.w * W,
            transform: `rotate(${h.rot}deg) scale(${sc})`, opacity: op,
            borderRadius: 14, overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
          }}>
            <div style={{ width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
              <Img src={staticFile(h.src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        );
      })}
    </>
  );
};

/* the "under contract" post-card insert (scene 4) — matches the reference:
 * FB post header -> portrait block -> two house photos side by side. The
 * portrait is a STAND-IN (we don't have her studio shot); noted in the report. */
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

const SfxAt: React.FC<{ at: number; src: string; vol: number }> = ({ at, src, vol }) => (
  <Sequence from={f(at)} durationInFrames={70}>
    <Audio src={staticFile(src)} volume={vol} />
  </Sequence>
);

export const ElsieRepro: React.FC<{ mode: "black" | "footage" | "matte" }> = ({ mode }) => {
  return (
    <AbsoluteFill style={{ background: "#000", width: W, height: H }}>
      {/* base plate */}
      {mode !== "black" && (
        <OffthreadVideo
          muted
          src={staticFile("elsie/content10.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* graphics */}
      <HouseCards />
      <PostCard />
      {BEATS.map((b, i) => (
        <Txt key={i} b={b} />
      ))}

      {/* matted subject on top => text passes BEHIND her */}
      {mode === "matte" && (
        <OffthreadVideo
          transparent
          muted
          src={staticFile("elsie/subject10.webm")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      <Audio src={staticFile("elsie/elsie10.m4a")} />
      <SfxAt at={1.03} src="sfx/pop-card.wav" vol={0.16} />
      <SfxAt at={2.899} src="sfx/whoosh-fast.wav" vol={0.18} />
      <SfxAt at={5.00} src="sfx/impact-hit.wav" vol={0.14} />
      <SfxAt at={5.899} src="sfx/whoosh-fast.wav" vol={0.18} />
      <SfxAt at={6.799} src="sfx/whoosh-slow.wav" vol={0.16} />
      <SfxAt at={8.398} src="sfx/whoosh-fast.wav" vol={0.18} />
      <SfxAt at={10.133} src="sfx/whoosh-fast.wav" vol={0.16} />
    </AbsoluteFill>
  );
};
