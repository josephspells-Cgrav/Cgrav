/* ═══════════════════════════════════════════════════════════════════════════
 * GrooveeAd — PRACTICE BUILD. Raw continuous take (3:24) → 30.3s ad.
 * Source cuts (from the raw file, keepers identified by Joseph's own slate calls):
 *   A hook      45.99–51.40    B specialty 88.88–92.95
 *   C financing 127.30–130.58 + 131.06–135.30  (internal "as low" stumble removed)
 *   D proof     186.90–193.42  E cta       193.42–199.90
 * Assembled base = 30.32s @ 1080x1920. Cut points in AD time:
 *   5.433 · 9.567 · 12.900 · 17.200 · 23.767
 * Style transplanted from the _k.elsie teardown: static type + drift, chrome
 * display words, pill device, count-up, matted subject so type sits behind him.
 * Palette moved to Groovee: warm amber (the product) + neon violet accent.
 * ⚠️ PRACTICE ONLY — placeholder claims, never ships.
 * ═══════════════════════════════════════════════════════════════════════ */
import React from "react";
import {
  AbsoluteFill, Audio, OffthreadVideo, Sequence,
  interpolate, staticFile, useCurrentFrame,
} from "remotion";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

const { fontFamily: poppins } = loadPoppins();
const FPS = 30;
const f = (t: number) => Math.round(t * FPS);
const W = 1080, H = 1920;
const CUTS = [5.433, 9.567, 12.9, 17.2, 23.767];

/* ── chrome materials, Groovee palette ─────────────────────────────────── */
const warm =
  "linear-gradient(178deg,#fff3d0 0%,#ffd984 13%,#f7b23c 27%,#c9781a 42%,#8a4d12 53%,#e79f2c 66%,#ffcf72 80%,#fff6dc 100%)";
const neon =
  "linear-gradient(178deg,#f0d9ff 0%,#c39bff 14%,#9a5cf5 30%,#6d2fd0 45%,#4d1d9c 56%,#8f52e8 70%,#c6a0ff 85%,#f4e6ff 100%)";
const silver =
  "linear-gradient(178deg,#ffffff 0%,#dfe4ea 14%,#a9b3bd 30%,#78838e 45%,#5d6771 56%,#9aa4ae 70%,#d3d9df 85%,#ffffff 100%)";

type Beat = {
  text: string; at: number; out: number; cy: number; size: number;
  drift?: number; kind?: "light" | "display"; chrome?: string;
  weight?: number; countTo?: number; countFrom?: number; suffix?: string;
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
    const from = b.countFrom ?? 0;
    label = String(Math.round(interpolate(p, [0, 0.55], [from, b.countTo],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))) + (b.suffix ?? "");
  }

  const base: React.CSSProperties = {
    position: "absolute", left: 0, right: 0, top: b.cy * H + drift,
    textAlign: "center", fontFamily: poppins, fontSize: b.size,
    lineHeight: 1.0, transform: "translateY(-50%)", opacity: op, whiteSpace: "nowrap",
  };
  if (b.kind === "display") {
    return (
      <div style={base}>
        <span style={{
          fontWeight: b.weight ?? 700, letterSpacing: "-0.02em",
          backgroundImage: b.chrome, WebkitBackgroundClip: "text",
          backgroundClip: "text", color: "transparent",
          filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.5))",
        }}>{label}</span>
      </div>
    );
  }
  return (
    <div style={{ ...base, fontWeight: b.weight ?? 300,
      color: "rgba(255,255,255,0.94)",
      textShadow: "0 3px 10px rgba(0,0,0,0.85), 0 0 34px rgba(0,0,0,0.55)" }}>{label}</div>
  );
};

/* ── pill: circle that expands into a label ────────────────────────────── */
const Pill: React.FC<{ label: string; at: number; out: number; cx: number; cy: number; wide: number; accent?: string }> =
({ label, at, out, cx, cy, wide, accent = "#ffc24d" }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const grow = interpolate(frame - a, [0, 5, 12], [0, 0, 1], { extrapolateRight: "clamp" });
  const dia = 108;
  const w = dia + (wide - dia) * grow;
  const op = interpolate(frame - a, [0, 4], [0, 1], { extrapolateRight: "clamp" })
    * interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: cx * W - w / 2, top: cy * H - dia / 2,
      width: w, height: dia, borderRadius: dia / 2,
      background: "rgba(10,8,6,0.90)", border: `3px solid ${accent}`,
      boxShadow: `0 0 34px ${accent}66`, opacity: op,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
    }}>
      <span style={{ fontFamily: poppins, fontWeight: 600, fontSize: 46, color: "#fff",
        opacity: interpolate(grow, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
};

/* ── five stars, popping in one at a time ──────────────────────────────── */
const Stars: React.FC<{ at: number; out: number; cy: number }> = ({ at, out, cy }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const fade = interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S = 92, GAP = 14;
  const total = 5 * S + 4 * GAP;
  return (
    <div style={{ position: "absolute", left: W / 2 - total / 2, top: cy * H, display: "flex", gap: GAP }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const sa = a + i * 3;
        const pop = interpolate(frame - sa, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <svg key={i} width={S} height={S} viewBox="0 0 24 24"
            style={{ opacity: pop * fade, transform: `scale(${0.6 + 0.4 * pop})`,
              filter: "drop-shadow(0 0 14px rgba(255,194,77,0.75))" }}>
            <path fill="#ffc24d" d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9z" />
          </svg>
        );
      })}
    </div>
  );
};

/* ── down-chevrons for the CTA ─────────────────────────────────────────── */
const Chevrons: React.FC<{ at: number; out: number; cy: number }> = ({ at, out, cy }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const fade = interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: cy * H, display: "flex",
      justifyContent: "center", gap: 10, flexDirection: "column", alignItems: "center" }}>
      {[0, 1, 2].map((i) => {
        const ph = ((frame - a) / 8 - i * 0.34) % 2;
        const o = interpolate(ph, [0, 0.35, 1.1, 2], [0.34, 1, 0.34, 0.34], { extrapolateRight: "clamp" });
        return (
          <svg key={i} width={104} height={54} viewBox="0 0 24 12" style={{ opacity: o * fade }}>
            <path d="M2 2 L12 10 L22 2" fill="none" stroke="#ffc24d" strokeWidth={3.4}
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,194,77,0.8))" }} />
          </svg>
        );
      })}
    </div>
  );
};

const BEATS: Beat[] = [
  /* S1 HOOK — wide, driveway */
  { text: "Attention", at: 0.00, out: 0.70, cy: 0.205, size: 104 },
  { text: "NORTH CAROLINA", at: 0.68, out: 1.58, cy: 0.208, size: 118, weight: 700 },
  { text: "homeowners", at: 1.22, out: 1.62, cy: 0.278, size: 104 },
  { text: "it's time for you to", at: 1.60, out: 2.60, cy: 0.240, size: 96 },
  { text: "finally get the", at: 2.58, out: 3.40, cy: 0.240, size: 100 },
  { text: "LIGHTS", at: 3.36, out: 5.433, cy: 0.300, size: 236, kind: "display", chrome: warm, drift: -10 },
  { text: "you've always wanted", at: 3.90, out: 5.433, cy: 0.372, size: 90 },

  /* S2 SPECIALTY — close-up */
  { text: "Here at", at: 5.84, out: 6.30, cy: 0.100, size: 96 },
  { text: "GROOVEE", at: 6.22, out: 7.20, cy: 0.108, size: 152, kind: "display", chrome: neon },
  { text: "we specialize in", at: 6.80, out: 7.60, cy: 0.775, size: 92 },
  { text: "outdoor lighting", at: 7.58, out: 8.44, cy: 0.775, size: 100 },
  { text: "that lasts a", at: 8.42, out: 9.08, cy: 0.775, size: 92 },
  { text: "LIFETIME", at: 9.06, out: 9.567, cy: 0.855, size: 168, kind: "display", chrome: warm },

  /* S3 FINANCING — medium, flag */
  { text: "We offer", at: 9.96, out: 10.60, cy: 0.118, size: 100 },
  { text: "financing", at: 11.12, out: 12.00, cy: 0.118, size: 104 },
  { text: "payment options", at: 12.18, out: 12.80, cy: 0.118, size: 96 },
  { text: "starting as low as", at: 12.78, out: 13.80, cy: 0.118, size: 100 },
  { text: "$49.99", at: 13.78, out: 15.60, cy: 0.212, size: 228, kind: "display", chrome: warm, drift: -9 },
  { text: "per month", at: 14.30, out: 15.60, cy: 0.296, size: 88 },
  { text: "to get the lights", at: 15.66, out: 16.30, cy: 0.118, size: 96 },
  { text: "you've always wanted", at: 16.28, out: 17.20, cy: 0.118, size: 96 },

  /* S4 PROOF — porch */
  { text: "working right here", at: 17.40, out: 18.50, cy: 0.118, size: 96 },
  { text: "LOCALLY", at: 18.48, out: 19.50, cy: 0.196, size: 146, weight: 700 },
  { text: "Raleigh–Durham", at: 19.48, out: 20.70, cy: 0.118, size: 108 },
  { text: "for over", at: 20.68, out: 20.94, cy: 0.118, size: 92 },
  { text: "", countFrom: 1, countTo: 5, suffix: " YEARS", at: 20.92, out: 21.90, cy: 0.196, size: 172, kind: "display", chrome: warm },
  { text: "and we have over", at: 21.86, out: 22.30, cy: 0.118, size: 92 },
  { text: "", countFrom: 0, countTo: 30, suffix: "+", at: 22.00, out: 23.767, cy: 0.196, size: 210, kind: "display", chrome: warm },
  { text: "five-star reviews", at: 23.10, out: 23.767, cy: 0.360, size: 90 },

  /* S5 CTA — porch, punched in */
  { text: "if you're looking for a", at: 24.54, out: 25.60, cy: 0.106, size: 92 },
  { text: "company to do the", at: 25.58, out: 26.18, cy: 0.106, size: 96 },
  { text: "PERMANENT", at: 26.16, out: 27.30, cy: 0.180, size: 146, kind: "display", chrome: neon },
  { text: "LIGHTING", at: 26.40, out: 27.30, cy: 0.268, size: 146, kind: "display", chrome: warm },
  { text: "CLICK BELOW", at: 27.32, out: 29.30, cy: 0.208, size: 126, weight: 700 },
  { text: "See you soon.", at: 29.62, out: 30.32, cy: 0.115, size: 108 },
];

const SfxAt: React.FC<{ at: number; src: string; vol: number }> = ({ at, src, vol }) => (
  <Sequence from={f(at)} durationInFrames={70}>
    <Audio src={staticFile(src)} volume={vol} />
  </Sequence>
);

export const GrooveeAd: React.FC<{ mode: "matte" | "plain" }> = ({ mode }) => {
  const frame = useCurrentFrame();
  /* punch-in on the final segment so the contiguous D/E jump reads as a tighter angle */
  const punch = frame >= f(23.767) ? 1.10 : 1.0;
  return (
    <AbsoluteFill style={{ background: "#000", width: W, height: H }}>
      <AbsoluteFill style={{ transform: `scale(${punch})` }}>
        <OffthreadVideo muted src={staticFile("groovee/base.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* readability scrims top & bottom */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.74) 0%,rgba(0,0,0,0.18) 22%,rgba(0,0,0,0) 42%,rgba(0,0,0,0) 56%,rgba(0,0,0,0.30) 74%,rgba(0,0,0,0.72) 100%)" }} />

      <Pill label="$0 DOWN" at={10.18} out={12.00} cx={0.50} cy={0.208} wide={440} />
      <Stars at={22.70} out={23.767} cy={0.272} />
      <Chevrons at={27.60} out={29.40} cy={0.300} />
      {BEATS.map((b, i) => <Txt key={i} b={b} />)}

      {mode === "matte" && (
        <AbsoluteFill style={{ transform: `scale(${punch})` }}>
          <OffthreadVideo transparent muted src={staticFile("groovee/subject.webm")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
      )}

      <Audio src={staticFile("groovee/base.m4a")} />
      {CUTS.map((t, i) => (
        <SfxAt key={i} at={t} src={i % 2 ? "sfx/whoosh-slow.wav" : "sfx/whoosh-fast.wav"} vol={0.16} />
      ))}
      <SfxAt at={3.36} src="sfx/impact-hit.wav" vol={0.14} />
      <SfxAt at={10.18} src="sfx/pop-card.wav" vol={0.17} />
      <SfxAt at={13.78} src="sfx/impact-hit.wav" vol={0.13} />
      <SfxAt at={22.70} src="sfx/pop-card.wav" vol={0.15} />
    </AbsoluteFill>
  );
};
