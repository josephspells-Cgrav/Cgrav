/* ═══════════════════════════════════════════════════════════════════════════
 * GrooveeAd2 — v2 after Joseph's notes. PRACTICE BUILD, never ships.
 *   ⚖️ TEXT IS NEVER BEHIND THE SUBJECT. No matte layer at all — every caption
 *      and card renders on top of the plate, always legible. (v1 imported the
 *      reference's behind-subject move; he locked it off: "probably ever".)
 *   ⚖️ FEWER CAPTIONS. v1 ran ~30 text elements; this runs 13. The graphics
 *      carry the beats the captions used to.
 *   ⚖️ CARDS ON HIS GESTURES. Gesture map read off the assembled cut:
 *      2.2 open palm R · 3.4 raised R hand · 6.6 hands together ·
 *      11.0 both hands open · 16.0 raised L hand · 19-21 presenting
 *   Plate is GRADED (raw was YAVG ~139/255 blown, SATAVG ~4 washed):
 *      curves highlight recovery + contrast 1.16 + sat 1.62 + warm balance.
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

const warm =
  "linear-gradient(178deg,#fff3d0 0%,#ffd984 13%,#f7b23c 27%,#c9781a 42%,#8a4d12 53%,#e79f2c 66%,#ffcf72 80%,#fff6dc 100%)";
const neon =
  "linear-gradient(178deg,#f0d9ff 0%,#c39bff 14%,#9a5cf5 30%,#6d2fd0 45%,#4d1d9c 56%,#8f52e8 70%,#c6a0ff 85%,#f4e6ff 100%)";
const AMBER = "#ffc24d";

/* ── text ──────────────────────────────────────────────────────────────── */
type Beat = {
  text: string; at: number; out: number; cy: number; size: number;
  kind?: "display"; chrome?: string; weight?: number;
  countTo?: number; countFrom?: number; suffix?: string; drift?: number;
};

const Txt: React.FC<{ b: Beat }> = ({ b }) => {
  const frame = useCurrentFrame();
  const a = f(b.at), z = f(b.out);
  if (frame < a || frame >= z) return null;
  const life = Math.max(2, z - a);
  const p = (frame - a) / life;
  const fin = Math.max(1, Math.min(3, Math.floor(life / 3)));
  const hold = Math.max(fin + 1, life - fin);
  const end = Math.max(hold + 1, life);
  const op = interpolate(frame - a, [0, fin, hold, end], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drift = interpolate(p, [0, 1], [0, b.drift ?? -7]);
  let label = b.text;
  if (b.countTo !== undefined) {
    label = String(Math.round(interpolate(p, [0, 0.55], [b.countFrom ?? 0, b.countTo],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))) + (b.suffix ?? "");
  }
  const base: React.CSSProperties = {
    position: "absolute", left: 0, right: 0, top: b.cy * H + drift, textAlign: "center",
    fontFamily: poppins, fontSize: b.size, lineHeight: 1.0,
    transform: "translateY(-50%)", opacity: op, whiteSpace: "nowrap",
  };
  if (b.kind === "display") {
    return (
      <div style={base}>
        <span style={{
          fontWeight: b.weight ?? 700, letterSpacing: "-0.02em",
          backgroundImage: b.chrome, WebkitBackgroundClip: "text", backgroundClip: "text",
          color: "transparent", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.75))",
        }}>{label}</span>
      </div>
    );
  }
  return <div style={{ ...base, fontWeight: b.weight ?? 600, color: "#fff",
    textShadow: "0 3px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}>{label}</div>;
};

/* ── icon set (Tabler-style paths, drawn inline) ───────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  bulb: (<><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.6v.6h5.6v-.6c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" /></>),
  shield: (<><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>),
  palette: (<><path d="M12 21a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.2-1.8 4-4 4h-2a2 2 0 0 0-1.4 3.4A1.9 1.9 0 0 1 12 21z" /><circle cx="7.5" cy="10.5" r="1.2" /><circle cx="12" cy="7.5" r="1.2" /><circle cx="16.5" cy="10.5" r="1.2" /></>),
  tag: (<><path d="M3 12V6a3 3 0 0 1 3-3h6l9 9-9 9-9-9z" /><circle cx="8" cy="8" r="1.4" /></>),
  pin: (<><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  home: (<><path d="M3 11l9-7 9 7" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-6h4v6" /></>),
};

const IconCard: React.FC<{
  icon: keyof typeof ICONS; label: string; at: number; out: number;
  x: number; y: number; rot?: number; accent?: string;
}> = ({ icon, label, at, out, x, y, rot = 0, accent = AMBER }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const pop = interpolate(frame - a, [0, 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out_ = interpolate(frame, [z - 6, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sc = 0.72 + 0.28 * pop;
  const float = Math.sin((frame - a) / 16) * 7;
  return (
    <div style={{
      position: "absolute", left: x * W, top: y * H + float,
      transform: `scale(${sc}) rotate(${rot}deg)`, opacity: pop * out_,
      width: 250, padding: "22px 18px 18px", borderRadius: 26,
      background: "rgba(12,10,14,0.86)", border: `3px solid ${accent}`,
      boxShadow: `0 0 40px ${accent}55, 0 16px 44px rgba(0,0,0,0.6)`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      fontFamily: poppins,
    }}>
      <svg width={92} height={92} viewBox="0 0 24 24" fill="none" stroke={accent}
        strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 12px ${accent}bb)` }}>
        {ICONS[icon]}
      </svg>
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 30, textAlign: "center", lineHeight: 1.1 }}>{label}</span>
    </div>
  );
};

/* Groovee's scene-switching colours — brand-specific device */
const ColorChips: React.FC<{ at: number; out: number; x: number; y: number }> = ({ at, out, x, y }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const fade = interpolate(frame, [z - 6, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chips = [["#ffe6c0", "Warm"], ["#3aa0ff", "Game Day"], ["#ff8a1f", "Halloween"], ["#37d67a", "Holiday"]] as const;
  return (
    <div style={{ position: "absolute", left: x * W, top: y * H, display: "flex", flexDirection: "column", gap: 14 }}>
      {chips.map(([c, n], i) => {
        const sa = a + i * 4;
        const p = interpolate(frame - sa, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={n} style={{
            display: "flex", alignItems: "center", gap: 14, opacity: p * fade,
            transform: `translateX(${(1 - p) * -30}px)`,
          }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: c,
              boxShadow: `0 0 26px ${c}, 0 0 8px rgba(0,0,0,0.5)`, border: "3px solid rgba(255,255,255,0.85)" }} />
            <span style={{ fontFamily: poppins, fontWeight: 600, fontSize: 30, color: "#fff",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>{n}</span>
          </div>
        );
      })}
    </div>
  );
};

const Pill: React.FC<{ label: string; at: number; out: number; cx: number; cy: number; wide: number }> =
({ label, at, out, cx, cy, wide }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const grow = interpolate(frame - a, [0, 5, 13], [0, 0, 1], { extrapolateRight: "clamp" });
  const dia = 112;
  const w = dia + (wide - dia) * grow;
  const op = interpolate(frame - a, [0, 4], [0, 1], { extrapolateRight: "clamp" })
    * interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: cx * W - w / 2, top: cy * H - dia / 2,
      width: w, height: dia, borderRadius: dia / 2, background: "rgba(10,8,6,0.92)",
      border: `4px solid ${AMBER}`, boxShadow: `0 0 44px ${AMBER}66`, opacity: op,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <span style={{ fontFamily: poppins, fontWeight: 700, fontSize: 52, color: "#fff",
        opacity: interpolate(grow, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
};

const Stars: React.FC<{ at: number; out: number; cy: number }> = ({ at, out, cy }) => {
  const frame = useCurrentFrame();
  const a = f(at), z = f(out);
  if (frame < a || frame >= z) return null;
  const fade = interpolate(frame, [z - 5, z], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const S = 96, GAP = 16, total = 5 * S + 4 * GAP;
  return (
    <div style={{ position: "absolute", left: W / 2 - total / 2, top: cy * H, display: "flex", gap: GAP }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const p = interpolate(frame - (a + i * 3), [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <svg key={i} width={S} height={S} viewBox="0 0 24 24"
            style={{ opacity: p * fade, transform: `scale(${0.55 + 0.45 * p})`,
              filter: `drop-shadow(0 0 16px ${AMBER})` }}>
            <path fill={AMBER} d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9z" />
          </svg>
        );
      })}
    </div>
  );
};

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
            <path d="M2 2 L12 10 L22 2" fill="none" stroke={AMBER} strokeWidth={3.4}
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 12px ${AMBER})` }} />
          </svg>
        );
      })}
    </div>
  );
};

/* ── 13 text beats total (v1 had ~30) ──────────────────────────────────── */
const BEATS: Beat[] = [
  /* S1 HOOK */
  { text: "Attention", at: 0.00, out: 0.70, cy: 0.205, size: 104 },
  { text: "NORTH CAROLINA", at: 0.68, out: 1.58, cy: 0.208, size: 112, weight: 800 },
  { text: "homeowners", at: 1.22, out: 1.62, cy: 0.278, size: 104 },
  { text: "it's time for you to", at: 1.60, out: 2.60, cy: 0.240, size: 96 },
  { text: "finally get the", at: 2.58, out: 3.40, cy: 0.240, size: 100 },
  { text: "LIGHTS", at: 3.36, out: 5.433, cy: 0.640, size: 250, kind: "display", chrome: warm, drift: -12 },
  { text: "you've always wanted", at: 3.90, out: 5.433, cy: 0.735, size: 92 },

  /* S2 SPECIALTY */
  { text: "Here at", at: 5.84, out: 6.30, cy: 0.180, size: 96 },
  { text: "GROOVEE", at: 6.22, out: 7.20, cy: 0.180, size: 156, kind: "display", chrome: neon },
  { text: "we specialize in", at: 6.80, out: 7.60, cy: 0.775, size: 92 },
  { text: "outdoor lighting", at: 7.58, out: 8.44, cy: 0.775, size: 100 },
  { text: "that lasts a", at: 8.42, out: 9.08, cy: 0.775, size: 92 },
  { text: "LIFETIME", at: 9.02, out: 9.567, cy: 0.855, size: 166, kind: "display", chrome: warm },

  /* S3 FINANCING */
  { text: "We offer", at: 9.96, out: 10.60, cy: 0.200, size: 100 },
  { text: "financing", at: 11.12, out: 12.00, cy: 0.200, size: 104 },
  { text: "payment options", at: 12.18, out: 12.80, cy: 0.700, size: 96 },
  { text: "starting as low as", at: 12.78, out: 13.80, cy: 0.700, size: 100 },
  { text: "$49.99", at: 13.78, out: 15.60, cy: 0.790, size: 232, kind: "display", chrome: warm, drift: -10 },
  { text: "per month", at: 14.30, out: 15.60, cy: 0.880, size: 88 },
  { text: "to get the lights", at: 15.66, out: 16.30, cy: 0.700, size: 96 },
  { text: "you've always wanted", at: 16.28, out: 17.20, cy: 0.700, size: 96 },

  /* S4 PROOF */
  { text: "working right here", at: 17.40, out: 18.50, cy: 0.195, size: 96 },
  { text: "LOCALLY", at: 18.48, out: 19.50, cy: 0.195, size: 144, weight: 800 },
  { text: "Raleigh–Durham", at: 19.48, out: 20.70, cy: 0.700, size: 100 },
  { text: "for over", at: 20.68, out: 20.94, cy: 0.700, size: 92 },
  { text: "", countFrom: 1, countTo: 5, suffix: " YEARS", at: 20.92, out: 21.90, cy: 0.790, size: 174, kind: "display", chrome: warm },
  { text: "and we have over", at: 21.86, out: 22.30, cy: 0.700, size: 92 },
  { text: "", countFrom: 0, countTo: 30, suffix: "+", at: 22.00, out: 23.767, cy: 0.640, size: 216, kind: "display", chrome: warm },
  { text: "five-star reviews", at: 23.10, out: 23.767, cy: 0.845, size: 92 },

  /* S5 CTA */
  { text: "if you're looking for a", at: 24.54, out: 25.60, cy: 0.190, size: 92 },
  { text: "company to do the", at: 25.58, out: 26.18, cy: 0.190, size: 96 },
  { text: "PERMANENT", at: 26.16, out: 27.30, cy: 0.680, size: 144, kind: "display", chrome: neon },
  { text: "LIGHTING", at: 26.40, out: 27.30, cy: 0.760, size: 144, kind: "display", chrome: warm },
  { text: "CLICK BELOW", at: 27.32, out: 29.30, cy: 0.208, size: 124, weight: 800 },
  { text: "See you soon.", at: 29.62, out: 30.32, cy: 0.700, size: 108 },
];

const SfxAt: React.FC<{ at: number; src: string; vol: number }> = ({ at, src, vol }) => (
  <Sequence from={f(at)} durationInFrames={70}><Audio src={staticFile(src)} volume={vol} /></Sequence>
);

export const GrooveeAd2: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = frame >= f(23.767) ? 1.10 : 1.0;
  return (
    <AbsoluteFill style={{ background: "#000", width: W, height: H }}>
      <AbsoluteFill style={{ transform: `scale(${punch})` }}>
        <OffthreadVideo muted src={staticFile("groovee/graded.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.14) 24%,rgba(0,0,0,0) 44%,rgba(0,0,0,0) 62%,rgba(0,0,0,0.34) 80%,rgba(0,0,0,0.66) 100%)" }} />

      {/* ── cards, anchored to his gestures ── */}
      <IconCard icon="bulb"     label="Permanent LED"   at={3.40}  out={5.433} x={0.690} y={0.400} rot={3} />
      <IconCard icon="shield"   label="Lasts a lifetime" at={6.60} out={9.100} x={0.045} y={0.400} rot={-3} />
      <ColorChips at={7.60} out={9.567} x={0.680} y={0.400} />
      <IconCard icon="tag"      label="$0 down"          at={10.30} out={12.90} x={0.045} y={0.455} rot={-2} accent="#8fd694" />
      <IconCard icon="home"     label="Any home"         at={15.90} out={17.20} x={0.690} y={0.455} rot={2} />
      <IconCard icon="pin"      label="Raleigh–Durham"   at={19.50} out={21.90} x={0.045} y={0.445} rot={-3} />
      <IconCard icon="calendar" label="Free estimate"    at={28.30} out={30.32} x={0.690} y={0.440} rot={3} />

      <Pill label="$0 DOWN" at={10.20} out={12.60} cx={0.50} cy={0.330} wide={470} />
      <Stars at={22.65} out={23.767} cy={0.735} />
      <Chevrons at={27.70} out={29.45} cy={0.300} />
      {BEATS.map((b, i) => <Txt key={i} b={b} />)}

      <Audio src={staticFile("groovee/base.m4a")} />
      {CUTS.map((t, i) => (
        <SfxAt key={i} at={t} src={i % 2 ? "sfx/whoosh-slow.wav" : "sfx/whoosh-fast.wav"} vol={0.16} />
      ))}
      <SfxAt at={3.30} src="sfx/impact-hit.wav" vol={0.14} />
      <SfxAt at={6.60} src="sfx/pop-card.wav" vol={0.16} />
      <SfxAt at={10.20} src="sfx/pop-card.wav" vol={0.17} />
      <SfxAt at={13.70} src="sfx/impact-hit.wav" vol={0.13} />
      <SfxAt at={19.50} src="sfx/pop-card.wav" vol={0.15} />
      <SfxAt at={22.65} src="sfx/pop-card.wav" vol={0.15} />
      <SfxAt at={28.30} src="sfx/pop-card.wav" vol={0.16} />
    </AbsoluteFill>
  );
};
