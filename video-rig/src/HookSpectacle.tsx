import React from 'react';
import {Img, staticFile, interpolate, spring, Easing} from 'remotion';
import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

// ══ HOOK SPECTACLE — the type-as-spectacle rebuild of 0–8.6s ═══════════
// WO_HOOK_SPECTACLE. Five treatments in eight seconds, fighting the
// muted-autoplay war entirely with type. Every window below is read off the
// REAL word timestamps in public/take2-chunks.json — never an approximation.
//
//   0.50 Don't · 0.94 overpay · 1.32 for · 1.48 your · 1.62 roof
//   2.56 with · 2.70 the · 2.80 cheapest · 3.04 option · 3.52 you
//   3.66 can · 3.78 find. · 4.58 Here · 4.72 at · 4.84 Mabrey · 5.16 Roofing
//   6.06 highest · 6.42 quality · 7.72 affordable · 8.08 prices.
//
// Fonts are narrowed to the one weight/subset each treatment needs —
// the unnarrowed Inter load fires 126 font requests per render worker.

export const ANTON = loadAnton('normal', {weights: ['400'], subsets: ['latin']}).fontFamily;
export const INTER = loadInter('normal', {weights: ['900'], subsets: ['latin']}).fontFamily;

const WHITE = '#ffffff';
const RED = '#cf2027';
const DARKRED = '#7e1216';
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';

// ── windows ───────────────────────────────────────────────────────────
const T1_IN = 0.5; // "Don't"
const T2_IN = 0.94; // "overpay"
const T12_OUT = 1.75; // T1+T2 leave together on a 4-frame whip-up
const WHIP = 4 / 30;

const T3_IN = 2.56; // "with" — the background push starts here
const T3_A = 2.7; // "the"      → THE CHEAPEST
const T3_B = 3.04; // "option"  → OPTION
const T3_C = 3.52; // "you"     → YOU CAN FIND
const T3_OUT = 4.12; // sentence ended at 4.02
const T3_GONE = 4.29; // clean before T4 opens at 4.58

const T5_A = 6.06; // "highest"
const T5_B = 6.42; // "quality"
const T5_C = 7.72; // "affordable"
const T5_OUT = 8.35;
const T5_GONE = 8.55;

// Consumed by RealBBv6: T3 is the one sanctioned full-frame moment, so the
// take gets pushed + dimmed behind it and the bottom captions stand down.
export const hookSuppressesCaptions = (t: number) => t >= T3_IN && t < T3_GONE;

export const hookBackground = (t: number) => {
  if (t < T3_IN || t >= T3_GONE) return {scale: 1, dim: 0};
  const push = interpolate(t, [T3_IN, T3_IN + 2 / 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rel = interpolate(t, [T3_OUT, T3_GONE], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p = Math.min(push, rel);
  return {scale: 1 + 0.3 * p, dim: 0.4 * p};
};

// ══ T1 — the caption-stack punch ══════════════════════════════════════
// "DON'T" slams into the top zone and STAYS, joined a beat later by T2.
const T1: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t < T1_IN) return null;
  const s = spring({
    frame: frame - Math.round(T1_IN * fps),
    fps,
    config: {damping: 12, stiffness: 280},
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: '8%',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: ANTON,
        fontSize: 120,
        lineHeight: 1.05,
        color: WHITE,
        WebkitTextStroke: '3px #000',
        paintOrder: 'stroke fill',
        textShadow: SHADOW,
        transform: `scale(${0.68 + 0.32 * s})`,
        opacity: Math.min(1, s * 3),
      }}
    >
      DON&rsquo;T
    </div>
  );
};

// ══ T2 — the takeover word ════════════════════════════════════════════
// "OVERPAY" is our $400,000 — the emotional money word at second one, at
// full frame width. Width is pinned with SVG textLength rather than measured
// in a layout effect: Remotion renders frames statelessly, so a measure pass
// that hasn't settled yet is a silent clipping bug.
//
// lengthAdjust is "spacing", NOT "spacingAndGlyphs". The first pass used
// spacingAndGlyphs and stretched the glyphs ~13% to reach the target width —
// OVERPAY's O came out visibly rounder than the true Anton O in DON'T right
// above it, which defeats the point of using a condensed face. fontSize 320
// puts Anton's natural width for OVERPAY at ~1014px, so the 1030 target is
// reached with ~2.7px of extra tracking per gap and zero glyph distortion.
const OVERPAY_W = 1030;

const T2: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t < T2_IN) return null;
  const f0 = frame - Math.round(T2_IN * fps);
  const s = spring({frame: f0, fps, config: {damping: 10, stiffness: 200}});
  // 2-frame impact shake, vertical only — a horizontal shake on a word this
  // wide would push the Y off the right edge of the frame.
  const shake = f0 <= 1 ? (f0 === 0 ? -8 : 8) : 0;
  const drop = interpolate(s, [0, 1], [-70, 0]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 244,
          left: 0,
          width: 1080,
          // The overshoot lives in translateY and NOT in scale: at 96% of the
          // frame width a scale overshoot would push the Y past the right
          // edge. Vertical overshoot is where impact reads anyway.
          transform: `translateY(${drop + shake}px) rotate(-4deg) scale(${0.82 + 0.18 * Math.min(1, s)})`,
          transformOrigin: '50% 50%',
          filter: 'drop-shadow(0 12px 0 rgba(0,0,0,.42)) drop-shadow(0 0 34px rgba(0,0,0,.55))',
          opacity: Math.min(1, s * 4),
        }}
      >
        <svg width={1080} height={380} viewBox="0 0 1080 380" style={{overflow: 'visible'}}>
          <text
            x={540}
            y={307}
            textAnchor="middle"
            textLength={OVERPAY_W}
            lengthAdjust="spacing"
            style={{
              fontFamily: ANTON,
              fontSize: 320,
              fill: RED,
              stroke: WHITE,
              strokeWidth: 12,
              strokeLinejoin: 'round',
              paintOrder: 'stroke',
            }}
          >
            OVERPAY
          </text>
        </svg>
      </div>

      {/* "for your" — small, tucked under OVERPAY's right edge. The -4deg
          lifts the right side ~36px, so this rides correspondingly higher. */}
      <div
        style={{
          position: 'absolute',
          top: 570,
          left: 0,
          width: 1010,
          textAlign: 'right',
          fontFamily: ANTON,
          fontSize: 44,
          letterSpacing: 2,
          color: WHITE,
          textShadow: SHADOW,
          opacity: interpolate(t, [T2_IN + 0.16, T2_IN + 0.3], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        FOR YOUR
      </div>
    </>
  );
};

// ══ T3 — kinetic caps build, glyphs filled with the worn roof ═════════
// The treatment IS the sentence here, which is why the bottom captions stand
// down for this window only — running both reads as a bug.
const T3Line: React.FC<{
  t: number;
  frame: number;
  fps: number;
  at: number;
  tilt: number;
  children: React.ReactNode;
  style: React.CSSProperties;
}> = ({t, frame, fps, at, tilt, children, style}) => {
  // Every line is MOUNTED for the whole T3 window and hidden with opacity
  // rather than unmounted before its beat. Returning null made the flex
  // column re-centre each time a line landed, so the two lines already on
  // screen jumped ~80px upward when YOU CAN FIND arrived. Reserving the full
  // stack height from the first beat is what makes this a build instead of
  // a shuffle — each line now appears exactly where it will stay.
  const on = t >= at;
  const f0 = frame - Math.round(at * fps);
  // 2-frame scale-settle, 1.06 → 1.00
  const settle = interpolate(f0, [0, 2], [1.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        ...style,
        whiteSpace: 'nowrap',
        fontFamily: ANTON,
        lineHeight: 0.98,
        opacity: on ? 1 : 0,
        transform: `scale(${on ? settle : 1}) rotate(${tilt}deg)`,
      }}
    >
      {children}
    </div>
  );
};

const T3: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t < T3_A || t >= T3_GONE) return null;
  const out = interpolate(t, [T3_OUT, T3_GONE], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        paddingTop: 60,
        opacity: out,
        transform: `scale(${0.97 + 0.03 * out})`,
      }}
    >
      {/* The 29.9MB roof png is loaded through a TRACKED <Img> as well as the
          CSS background below. Remotion's delayRender only waits on assets it
          knows about; a bare CSS background-image is invisible to it and the
          frame gets captured before the bitmap decodes — which renders the
          glyphs fully transparent. Proven in wo/smoke-arsenal.png. */}
      <Img
        src={staticFile('br3-oldroof.png')}
        style={{position: 'absolute', width: 2, height: 2, opacity: 0.01, pointerEvents: 'none'}}
      />

      <T3Line
        t={t}
        frame={frame}
        fps={fps}
        at={T3_A}
        tilt={-1.5}
        style={{
          fontSize: 176,
          backgroundImage: `url(${staticFile('br3-oldroof.png')})`,
          // 1000px (was 1400) pulls the zoom back so several shingle courses
          // fall inside each glyph — at 1400 the letterforms read as generic
          // cracked stone rather than as a roof.
          backgroundSize: '1000px auto',
          backgroundPosition: 'center 56%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 6px 0 rgba(0,0,0,.7)) drop-shadow(0 0 30px rgba(0,0,0,.85))',
        }}
      >
        THE CHEAPEST
      </T3Line>

      <T3Line
        t={t}
        frame={frame}
        fps={fps}
        at={T3_B}
        tilt={1.5}
        style={{fontSize: 330, color: WHITE, textShadow: SHADOW}}
      >
        OPTION
      </T3Line>

      <T3Line
        t={t}
        frame={frame}
        fps={fps}
        at={T3_C}
        tilt={-1.5}
        style={{
          fontSize: 120,
          color: DARKRED,
          letterSpacing: 2,
          textShadow: '0 3px 0 rgba(0,0,0,.6), 0 0 26px rgba(0,0,0,.9)',
        }}
      >
        YOU CAN FIND
      </T3Line>
    </div>
  );
};

// ══ T5 — editorial colour stack over the drone cut ════════════════════
// Word-locked, so the stagger is set by his delivery rather than a fixed
// frame count. Lives in the TOP zone throughout: the drone cut ends at 7.75
// but the stack runs to 8.55, so its last 0.8s sits over his face.
const T5Line: React.FC<{
  t: number;
  frame: number;
  fps: number;
  at: number;
  children: React.ReactNode;
  style: React.CSSProperties;
  highlight?: boolean;
}> = ({t, frame, fps, at, children, style, highlight}) => {
  if (t < at) return null;
  const f0 = frame - Math.round(at * fps);
  const s = spring({frame: f0, fps, config: {damping: 14, stiffness: 170}});
  // Same grow window the house Hi2A uses: the bar starts 8 frames after the
  // word lands and draws left→right over 14 frames.
  const grow = interpolate(f0, [8, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const inner = highlight ? (
    <span style={{position: 'relative', display: 'inline-block', padding: '0 12px'}}>
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: '15%',
          height: '72%',
          width: `${grow * 100}%`,
          background: RED,
          borderRadius: 8,
          boxShadow: `0 0 26px ${RED}55`,
        }}
      />
      <span style={{position: 'relative'}}>{children}</span>
    </span>
  ) : (
    children
  );

  return (
    <div
      style={{
        ...style,
        whiteSpace: 'nowrap',
        textShadow: SHADOW,
        opacity: Math.min(1, s * 2.4),
        transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`,
      }}
    >
      {inner}
    </div>
  );
};

const T5: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t < T5_A || t >= T5_GONE) return null;
  const out = interpolate(t, [T5_OUT, T5_GONE], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: '7.5%',
        left: 34,
        right: 34,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        opacity: out,
        transform: `translateY(${interpolate(out, [0, 1], [-26, 0])}px)`,
      }}
    >
      <T5Line t={t} frame={frame} fps={fps} at={T5_A} style={{fontFamily: INTER, fontWeight: 900, fontSize: 54, color: WHITE}}>
        highest
      </T5Line>
      {/* WHITE caps on the 2A red highlighter sweep — Joseph's call, 08-15.
          T5 crosses two very different backgrounds (dark tree canopy on the
          drone cut 6.06–7.75, then his white hat once the cut returns to the
          take 7.75–8.55) and brand RED TEXT was low-contrast against both.
          The sweep is the house emphasis device for exactly this problem:
          white-on-red-bar reads on canopy and on hat. Same mechanics, size and
          position as the T4 brand moment. No stroke here — the bar is the
          separation, as in every other Hi2A instance. */}
      <T5Line
        t={t}
        frame={frame}
        fps={fps}
        at={T5_B}
        highlight
        style={{fontFamily: ANTON, fontSize: 96, color: WHITE, letterSpacing: 1}}
      >
        QUALITY
      </T5Line>
      <T5Line t={t} frame={frame} fps={fps} at={T5_C} style={{fontFamily: INTER, fontWeight: 900, fontSize: 54, color: WHITE}}>
        affordable prices
      </T5Line>
    </div>
  );
};

// ══ the hook layer ════════════════════════════════════════════════════
// T4 (the brand moment) is NOT here — it is the existing Hi2A component,
// rendered by RealBBv6 so the house accent keeps its blessed mechanics.
export const HookSpectacle: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t >= T5_GONE) return null;

  // T1 + T2 leave together on a 4-frame whip-up.
  const whip = interpolate(t, [T12_OUT, T12_OUT + WHIP], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <>
      {t < T12_OUT + WHIP ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${-520 * whip}px)`,
            opacity: 1 - whip,
            filter: whip > 0 ? `blur(${14 * whip}px)` : undefined,
          }}
        >
          <T1 t={t} frame={frame} fps={fps} />
          <T2 t={t} frame={frame} fps={fps} />
        </div>
      ) : null}

      <T3 t={t} frame={frame} fps={fps} />
      <T5 t={t} frame={frame} fps={fps} />
    </>
  );
};
