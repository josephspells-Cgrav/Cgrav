/* ═══════════════════════════════════════════════════════════════════════════
 * ElsieTen — pipeline test: recreate the first 10.3s of the _k.elsie realtor
 * reel's GRAPHICS LAYER, timed to the ripped audio (word-level whisper stamps,
 * public/elsie/words10.json — timings baked below).
 *
 * TWO RENDERS, ONE COMP (bg prop):
 *   ElsieTenBlack   — graphics + audio on black: the pure engine read.
 *   ElsieTenFootage — same graphics over the cropped source clip: the
 *                     legibility read. NO behind-subject matte (deliberate
 *                     scope cut — that's the 23-min RVM lane, not this test).
 *
 * Treatment classes under test: iridescent chrome serif ("secret,"), purple
 * gradient caps ("CLIENTS"), cyan glow numerals ("2026,"), big-white + PiP
 * house-card pops ("50 HOMES"), insert-card cutaway w/ bg dim, purple-accent
 * pivot ("about how."). SFX from assets/sfx (first real audition — the 7 cues
 * are verified-valid, never verified-good; this render is Joseph's ear test).
 * ASR repair per the house STT law: "winter contract" → "went under contract".
 * INTERNAL TEST ONLY — source audio/footage are _k.elsie's. Never ships.
 * ═══════════════════════════════════════════════════════════════════════ */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: playfair } = loadPlayfair();
const { fontFamily: inter } = loadInter();

const FPS = 30;
const f = (t: number) => Math.round(t * FPS);

/* ── word entrance: spring scale/rise; fancy = overshoot ────────────────── */
const useWordIn = (startF: number, fancy = false) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - startF,
    fps,
    config: fancy ? { damping: 9, stiffness: 160 } : { damping: 14, stiffness: 190 },
  });
  return {
    visible: frame >= startF,
    scale: 0.8 + 0.2 * s,
    y: (1 - s) * 16,
    opacity: interpolate(frame - startF, [0, 3], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  };
};

type WordStyle = React.CSSProperties;

const Word: React.FC<{
  at: number; // seconds
  until: number; // group clear time, seconds
  style: WordStyle;
  fancy?: boolean;
  children: React.ReactNode;
}> = ({ at, until, style, fancy, children }) => {
  const frame = useCurrentFrame();
  const w = useWordIn(f(at), fancy);
  if (!w.visible || frame >= f(until)) return null;
  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${w.scale}) translateY(${w.y}px)`,
        opacity: w.opacity,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/* ── treatment palette ──────────────────────────────────────────────────── */
const shadowSoft = "0 2px 24px rgba(0,0,0,0.55), 0 0 4px rgba(0,0,0,0.35)";

const stWhiteSerif: WordStyle = {
  fontFamily: playfair,
  fontWeight: 600,
  color: "#fff",
  textShadow: shadowSoft,
};
const stPlain: WordStyle = {
  fontFamily: inter,
  fontWeight: 600,
  color: "#fff",
  textShadow: shadowSoft,
};
const stBigWhite: WordStyle = {
  fontFamily: inter,
  fontWeight: 900,
  color: "#fff",
  letterSpacing: "-0.01em",
  textShadow: shadowSoft,
};
const stCyan: WordStyle = {
  fontFamily: inter,
  fontWeight: 800,
  color: "#8df4ff",
  textShadow:
    "0 0 24px rgba(34,211,238,0.9), 0 0 70px rgba(14,165,233,0.7), 0 2px 20px rgba(0,0,0,0.5)",
};
const stPurpleCaps: WordStyle = {
  fontFamily: inter,
  fontWeight: 900,
  letterSpacing: "0.01em",
  backgroundImage: "linear-gradient(180deg,#f0abfc 0%,#c084fc 45%,#8b5cf6 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 0 26px rgba(168,85,247,0.55)) drop-shadow(0 2px 14px rgba(0,0,0,0.5))",
};
const stPurpleGlow: WordStyle = {
  fontFamily: inter,
  fontWeight: 800,
  color: "#e9d5ff",
  textShadow:
    "0 0 22px rgba(168,85,247,0.95), 0 0 60px rgba(124,58,237,0.7), 0 2px 18px rgba(0,0,0,0.5)",
};

/* iridescent chrome — animated sheen via backgroundPosition */
const Iridescent: React.FC<{ at: number; until: number; size: number; children: string }> = ({
  at,
  until,
  size,
  children,
}) => {
  const frame = useCurrentFrame();
  const w = useWordIn(f(at), true);
  if (!w.visible || frame >= f(until)) return null;
  const sheen = ((frame - f(at)) * 1.6) % 300;
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: playfair,
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: size,
        backgroundImage:
          "linear-gradient(105deg,#eaf4ff 0%,#9fb8d8 16%,#ffffff 30%,#7f9fd0 46%,#e6eeff 60%,#a8c4e8 76%,#f4f9ff 100%)",
        backgroundSize: "300% 100%",
        backgroundPosition: `${sheen}% 0%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        transform: `scale(${w.scale}) translateY(${w.y}px)`,
        opacity: w.opacity,
        filter:
          "drop-shadow(0 0 18px rgba(200,225,255,0.5)) drop-shadow(0 2px 16px rgba(0,0,0,0.55))",
      }}
    >
      {children}
    </span>
  );
};

/* PiP house card */
const HouseCard: React.FC<{
  at: number;
  until: number;
  src: string;
  x: number;
  y: number;
  rot: number;
  w: number;
}> = ({ at, until, src, x, y, rot, w }) => {
  const frame = useCurrentFrame();
  const s = useWordIn(f(at), true);
  if (!s.visible || frame >= f(until)) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        transform: `rotate(${rot}deg) scale(${s.scale})`,
        opacity: s.opacity,
        borderRadius: 18,
        overflow: "hidden",
        border: "5px solid #fff",
        boxShadow: "0 14px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
};

/* the "under contract" insert-card cutaway */
const InsertCard: React.FC<{ at: number; until: number }> = ({ at, until }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - f(at), fps, config: { damping: 12, stiffness: 130 } });
  if (frame < f(at) || frame >= f(until)) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 480 + (1 - s) * 260,
        width: 900,
        opacity: Math.min(1, (frame - f(at)) / 4),
        transform: `rotate(${(1 - s) * -3 - 1}deg)`,
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
        padding: 28,
        fontFamily: inter,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#c084fc,#818cf8)",
          }}
        />
        <div>
          <div style={{ fontWeight: 800, fontSize: 30, color: "#111" }}>Kelsie Blevins</div>
          <div style={{ fontWeight: 500, fontSize: 22, color: "#888" }}>July 19</div>
        </div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 600, color: "#222", margin: "20px 0 18px" }}>
        Twelve properties. All under contract. Swipe left.
      </div>
      <div style={{ borderRadius: 14, overflow: "hidden", height: 420 }}>
        <Img src={staticFile("br8-aerialstill.png")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
};

/* rows: centered flex line at a fixed y */
const Line: React.FC<{ y: number; gap?: number; children: React.ReactNode }> = ({
  y,
  gap = 18,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      gap,
      padding: "0 40px",
      textAlign: "center",
      flexWrap: "wrap",
    }}
  >
    {children}
  </div>
);

export const ElsieTen: React.FC<{ bg: "black" | "footage" }> = ({ bg }) => {
  const frame = useCurrentFrame();

  /* cutaway dim over the footage during the insert card */
  const dim =
    bg === "footage"
      ? interpolate(frame, [f(6.4), f(6.7), f(8.4), f(8.6)], [0, 0.55, 0.55, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {bg === "footage" && (
        <OffthreadVideo muted src={staticFile("elsie/elsie10-bg.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {dim > 0 && <AbsoluteFill style={{ background: `rgba(0,0,0,${dim})` }} />}

      {/* ── G1 [0.05–1.01] It's no / secret, ── */}
      <Line y={210}>
        <Word at={0.05} until={1.01} style={{ ...stWhiteSerif, fontSize: 96 }}>It&apos;s</Word>
        <Word at={0.53} until={1.01} style={{ ...stWhiteSerif, fontSize: 96 }}>no</Word>
      </Line>
      <Line y={1100}>
        <Iridescent at={0.63} until={1.01} size={210}>secret,</Iridescent>
      </Line>

      {/* ── G2 [1.01–2.11] CLIENTS / come to me, ── */}
      <Line y={250}>
        <Word at={1.01} until={2.11} fancy style={{ ...stPurpleCaps, fontSize: 150 }}>CLIENTS</Word>
      </Line>
      <Line y={1130}>
        <Word at={1.37} until={2.11} style={{ ...stPlain, fontSize: 84 }}>come</Word>
        <Word at={1.59} until={2.11} style={{ ...stPlain, fontSize: 84 }}>to</Word>
        <Word at={1.71} until={2.11} style={{ ...stPlain, fontSize: 84 }}>me,</Word>
      </Line>

      {/* ── G3 [2.11–3.05] to get the job / done. ── */}
      <Line y={1050}>
        <Word at={2.11} until={3.05} style={{ ...stPlain, fontSize: 62 }}>to</Word>
        <Word at={2.23} until={3.05} style={{ ...stPlain, fontSize: 62 }}>get</Word>
        <Word at={2.31} until={3.05} style={{ ...stPlain, fontSize: 62 }}>the</Word>
        <Word at={2.49} until={3.05} style={{ ...stPlain, fontSize: 62 }}>job</Word>
      </Line>
      <Line y={1140}>
        <Word at={2.6} until={3.05} fancy style={{ ...stBigWhite, fontSize: 150 }}>done.</Word>
      </Line>

      {/* ── G4 [3.11–4.27] so far in / 2026, ── */}
      <Line y={250}>
        <Word at={3.11} until={4.35} style={{ ...stPlain, fontSize: 78 }}>so</Word>
        <Word at={3.19} until={4.35} style={{ ...stPlain, fontSize: 78 }}>far</Word>
        <Word at={3.63} until={4.35} style={{ ...stPlain, fontSize: 78 }}>in</Word>
      </Line>
      <Line y={1100}>
        <Word at={3.75} until={4.35} fancy style={{ ...stCyan, fontSize: 220 }}>2026,</Word>
      </Line>

      {/* ── G5 [4.27–6.05] I've sold over / 50 HOMES + house cards ── */}
      <Line y={250}>
        <Word at={4.27} until={6.05} style={{ ...stPlain, fontSize: 78 }}>I&apos;ve</Word>
        <Word at={4.53} until={6.05} style={{ ...stPlain, fontSize: 78 }}>sold</Word>
        <Word at={4.65} until={6.05} style={{ ...stPlain, fontSize: 78 }}>over</Word>
      </Line>
      <Line y={1120} gap={52}>
        <Word at={4.97} until={6.05} fancy style={{ ...stBigWhite, fontSize: 148, whiteSpace: "nowrap" }}>50</Word>
        <Word at={5.39} until={6.05} fancy style={{ ...stBigWhite, fontSize: 148, whiteSpace: "nowrap" }}>HOMES</Word>
      </Line>
      <HouseCard at={5.0} until={6.05} src="br2-dronehouse.png" x={60} y={330} rot={-8} w={330} />
      <HouseCard at={5.25} until={6.05} src="br7-newroof.png" x={660} y={310} rot={6} w={330} />
      <HouseCard at={5.5} until={6.05} src="br8-aerialstill.png" x={340} y={1420} rot={-3} w={380} />

      {/* ── G6 [6.07–8.57] insert card + went under contract ── */}
      <Line y={300}>
        <Word at={6.07} until={8.57} style={{ ...stPlain, fontSize: 64 }}>Over</Word>
        <Word at={6.21} until={8.57} style={{ ...stPlain, fontSize: 64 }}>half</Word>
        <Word at={6.41} until={8.57} style={{ ...stPlain, fontSize: 64 }}>of</Word>
        <Word at={6.53} until={8.57} style={{ ...stPlain, fontSize: 64 }}>those</Word>
      </Line>
      <InsertCard at={6.6} until={8.57} />
      {/* ASR repair: "winter contract" → went under contract */}
      <Line y={1330}>
        <Word at={6.71} until={8.57} style={{ ...stPlain, fontSize: 84 }}>went</Word>
        <Word at={6.9} until={8.57} style={{ ...stPlain, fontSize: 84 }}>under</Word>
        <Word at={7.01} until={8.57} fancy style={{ ...stBigWhite, fontSize: 100 }}>contract</Word>
      </Line>
      <Line y={1470}>
        <Word at={7.39} until={8.57} style={{ ...stPlain, fontSize: 62 }}>in</Word>
        <Word at={7.69} until={8.57} style={{ ...stPlain, fontSize: 62 }}>under</Word>
        <Word at={7.81} until={8.57} fancy style={{ ...stBigWhite, fontSize: 84 }}>two</Word>
        <Word at={7.97} until={8.57} fancy style={{ ...stBigWhite, fontSize: 84 }}>weeks.</Word>
      </Line>

      {/* ── G7 [8.75–10.3] So, / let's talk about how. ── */}
      <Line y={300}>
        <Word at={8.75} until={10.3} fancy style={{ ...stBigWhite, fontSize: 200 }}>So,</Word>
      </Line>
      <Line y={1120}>
        <Word at={9.13} until={10.3} style={{ ...stPlain, fontSize: 80 }}>let&apos;s</Word>
        <Word at={9.25} until={10.3} style={{ ...stPlain, fontSize: 80 }}>talk</Word>
      </Line>
      <Line y={1230} gap={44}>
        <Word at={9.41} until={10.3} fancy style={{ ...stPurpleGlow, fontSize: 110 }}>about</Word>
        <Word at={9.55} until={10.3} fancy style={{ ...stPurpleGlow, fontSize: 110 }}>how.</Word>
      </Line>

      {/* ── audio: ripped VO + SFX audition (low gains under the voice) ── */}
      <Audio src={staticFile("elsie/elsie10.m4a")} />
      <SfxAt at={1.01} src="sfx/pop-card.wav" vol={0.2} />
      <SfxAt at={3.05} src="sfx/whoosh-fast.wav" vol={0.2} />
      <SfxAt at={4.9} src="sfx/impact-hit.wav" vol={0.16} />
      <SfxAt at={5.0} src="sfx/pop-card.wav" vol={0.16} />
      <SfxAt at={5.25} src="sfx/pop-card.wav" vol={0.16} />
      <SfxAt at={5.5} src="sfx/pop-card.wav" vol={0.16} />
      <SfxAt at={6.5} src="sfx/whoosh-fast.wav" vol={0.2} />
      <SfxAt at={8.55} src="sfx/reverse-swell.wav" vol={0.16} />
    </AbsoluteFill>
  );
};

/* time-placed SFX: a Sequence window per cue, low gain under the VO */
const SfxAt: React.FC<{ at: number; src: string; vol: number }> = ({ at, src, vol }) => (
  <Sequence from={f(at)} durationInFrames={90}>
    <Audio src={staticFile(src)} volume={vol} />
  </Sequence>
);
