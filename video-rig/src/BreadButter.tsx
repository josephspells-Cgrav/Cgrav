import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import chunksData from '../public/chunks.json';

// ── brand tokens (from the plate factory) ─────────────────────────────
const RED = '#cf2027';
const NAVY = '#12283f';
const NAVY_DEEP = '#0c1b2e';
const GOLD = '#ffd34d';
const WHITE = '#ffffff';
const MUTE = '#aab6c4';

const FONT = '"Segoe UI", "Arial", sans-serif';
const BLACK900: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 900,
  letterSpacing: '0.5px',
};

// ── geometry ──────────────────────────────────────────────────────────
const VID_W = 800;
const VID_H = Math.round((VID_W * 1920) / 1080); // 1422
const VID_X = (1080 - VID_W) / 2;
const VID_Y = 292;
const CAP_TOP = VID_Y + VID_H + 26; // ~1740

type Chunk = {start: number; end: number; words: {t: string; s: number; e: number}[]};
const CHUNKS = chunksData as Chunk[];

const MONEY_RE = /\$|zero down|month|payments|12 months/i;

// ══ captions ══════════════════════════════════════════════════════════
const Captions: React.FC<{t: number}> = ({t}) => {
  if (t > 54.1) return null; // end card owns the frame
  const chunk = CHUNKS.find((c) => t >= c.start && t < c.end);
  if (!chunk) return null;
  const appear = Math.min(1, (t - chunk.start) / 0.1);
  return (
    <div
      style={{
        position: 'absolute',
        top: CAP_TOP,
        left: 40,
        right: 40,
        bottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        columnGap: 18,
        rowGap: 2,
        textAlign: 'center',
        transform: `scale(${0.96 + 0.04 * appear})`,
        opacity: appear,
      }}
    >
      {chunk.words.map((w, i) => {
        const active = t >= w.s && (i === chunk.words.length - 1 ? true : t < chunk.words[i + 1].s);
        const isMoney = MONEY_RE.test(w.t);
        return (
          <span
            key={i}
            style={{
              ...BLACK900,
              fontSize: 74,
              lineHeight: '86px',
              color: active ? (isMoney ? GOLD : RED) : WHITE,
              textShadow: '0 4px 18px rgba(0,0,0,0.55)',
              transform: active ? 'scale(1.06)' : 'scale(1)',
              display: 'inline-block',
              transition: 'none',
            }}
          >
            {w.t.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};

// ══ top-zone shells ═══════════════════════════════════════════════════
const TopZone: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: VID_Y - 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
    }}
  >
    {children}
  </div>
);

const Pill: React.FC<{
  bg: string;
  color: string;
  size?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({bg, color, size = 54, style, children}) => (
  <div
    style={{
      ...BLACK900,
      background: bg,
      color,
      fontSize: size,
      lineHeight: 1.15,
      padding: '14px 34px',
      borderRadius: 18,
      boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

// ══ 1. hook bar (0 – 3.6s) ════════════════════════════════════════════
const HookBar: React.FC<{frame: number; fps: number; t: number}> = ({frame, fps, t}) => {
  if (t > 3.9) return null;
  const in1 = spring({frame, fps, config: {damping: 12, stiffness: 160}});
  const in2 = spring({frame: frame - 10, fps, config: {damping: 12, stiffness: 160}});
  const out = interpolate(t, [3.5, 3.85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  return (
    <TopZone>
      <div style={{transform: `translateX(${(1 - in1) * -1200}px) rotate(-1.5deg) scale(${1 - 0.3 * out})`, opacity: 1 - out}}>
        <Pill bg={RED} color={WHITE} size={58}>
          DON&apos;T OVERPAY FOR YOUR ROOF
        </Pill>
      </div>
      <div style={{transform: `translateX(${(1 - in2) * 1200}px) rotate(1.2deg) scale(${1 - 0.3 * out})`, opacity: 1 - out}}>
        <Pill bg={GOLD} color={NAVY} size={50}>
          DON&apos;T GO CHEAP EITHER
        </Pill>
      </div>
    </TopZone>
  );
};

// ══ 2. money card (18.4 – 29s) ════════════════════════════════════════
const MoneyCard: React.FC<{frame: number; fps: number; t: number}> = ({frame, fps, t}) => {
  const T0 = 18.6;
  const T_BANNER = 25.6;
  const T_OUT = 28.9;
  if (t < T0 || t > T_OUT + 0.4) return null;
  const f0 = frame - Math.round(T0 * fps);
  const drop = spring({frame: f0, fps, config: {damping: 11, stiffness: 130}});
  const fb = frame - Math.round(T_BANNER * fps);
  const banner = fb > 0 ? spring({frame: fb, fps, config: {damping: 12, stiffness: 150}}) : 0;
  const out = interpolate(t, [T_OUT, T_OUT + 0.35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wobble = Math.sin(t * 2.2) * 1.2;
  return (
    <TopZone>
      <div
        style={{
          display: 'flex',
          gap: 18,
          transform: `translateY(${(1 - drop) * -320}px) rotate(${wobble * 0.25}deg) scale(${1 - 0.25 * out})`,
          opacity: 1 - out,
        }}
      >
        <Pill bg={WHITE} color={NAVY} size={64}>
          $0 DOWN
        </Pill>
        <Pill bg={RED} color={WHITE} size={64}>
          $98/MO
        </Pill>
      </div>
      <div
        style={{
          transform: `translateY(${(1 - banner) * 140}px) scale(${banner * (1 - 0.25 * out)})`,
          opacity: banner * (1 - out),
        }}
      >
        <Pill bg={GOLD} color={NAVY} size={44}>
          NO PAYMENTS FOR 12 MONTHS
        </Pill>
      </div>
    </TopZone>
  );
};

// ══ 3. proof chips (29.2 – 41.6s) ═════════════════════════════════════
const PROOF = ['20+ YEARS', 'VETERAN OWNED', 'RALEIGH–DURHAM', '$50M+ INSTALLED'];
const ProofChips: React.FC<{frame: number; fps: number; t: number}> = ({frame, fps, t}) => {
  const T0 = 29.2;
  const T_OUT = 41.5;
  if (t < T0 || t > T_OUT + 0.4) return null;
  const out = interpolate(t, [T_OUT, T_OUT + 0.35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <TopZone>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          justifyContent: 'center',
          maxWidth: 980,
          transform: `scale(${1 - 0.25 * out})`,
          opacity: 1 - out,
        }}
      >
        {PROOF.map((p, i) => {
          const fi = frame - Math.round((T0 + i * 0.55) * fps);
          const s = fi > 0 ? spring({frame: fi, fps, config: {damping: 13, stiffness: 170}}) : 0;
          const float = Math.sin(t * 1.8 + i) * 3;
          return (
            <div key={p} style={{transform: `translateY(${(1 - s) * 90 + float}px) scale(${0.6 + 0.4 * s})`, opacity: s}}>
              <Pill bg={i % 2 ? WHITE : RED} color={i % 2 ? NAVY : WHITE} size={42} style={{borderRadius: 999, padding: '12px 30px'}}>
                {i === 0 ? '✔ ' : ''}
                {p}
              </Pill>
            </div>
          );
        })}
      </div>
    </TopZone>
  );
};

// ══ 4. satellite chip (42 – 46.6s) ════════════════════════════════════
const SatChip: React.FC<{frame: number; fps: number; t: number}> = ({frame, fps, t}) => {
  const T0 = 42.0;
  const T_OUT = 46.4;
  if (t < T0 || t > T_OUT + 0.4) return null;
  const f0 = frame - Math.round(T0 * fps);
  const s = spring({frame: f0, fps, config: {damping: 12, stiffness: 150}});
  const out = interpolate(t, [T_OUT, T_OUT + 0.35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);
  return (
    <TopZone>
      <div style={{transform: `translateY(${(1 - s) * -200}px) scale(${1 - 0.25 * out})`, opacity: (1 - out) * s}}>
        <Pill
          bg={NAVY_DEEP}
          color={WHITE}
          size={44}
          style={{border: `4px solid rgba(207,32,39,${0.45 + 0.55 * pulse})`}}
        >
          🛰 SATELLITE-MEASURED PRICE
        </Pill>
      </div>
    </TopZone>
  );
};

// ══ 5. idle brand watermark (fills top-zone gaps) ═════════════════════
const BrandIdle: React.FC<{t: number}> = ({t}) => {
  const show = (t > 4.2 && t < 18.2) || (t > 46.9 && t < 53.8);
  if (!show) return null;
  return (
    <TopZone>
      <div style={{...BLACK900, fontSize: 40, color: MUTE, letterSpacing: 6, opacity: 0.8}}>
        MABREY ROOFING
      </div>
      <div style={{width: 130, height: 6, background: RED, borderRadius: 3}} />
    </TopZone>
  );
};

// ══ 6. end card (54.2 → end) ══════════════════════════════════════════
const EndCard: React.FC<{frame: number; fps: number; t: number}> = ({frame, fps, t}) => {
  const T0 = 54.2;
  if (t < T0) return null;
  const f0 = frame - Math.round(T0 * fps);
  const fade = interpolate(t, [T0, T0 + 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s1 = spring({frame: f0 - 6, fps, config: {damping: 12, stiffness: 130}});
  const s2 = spring({frame: f0 - 16, fps, config: {damping: 11, stiffness: 130}});
  const btnPulse = 1 + 0.03 * Math.sin(t * 4.5);
  return (
    <AbsoluteFill style={{background: `rgba(12,27,46,${0.92 * fade})`, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        <div style={{...BLACK900, fontSize: 86, color: WHITE, textAlign: 'center', lineHeight: 1.06, transform: `scale(${s1})`, maxWidth: 900}}>
          SCHEDULE YOUR
          <br />
          <span style={{color: GOLD}}>FREE QUOTE</span>
        </div>
        <div
          style={{
            ...BLACK900,
            transform: `scale(${s2 * btnPulse})`,
            background: RED,
            color: WHITE,
            fontSize: 54,
            padding: '26px 60px',
            borderRadius: 999,
            boxShadow: '0 16px 50px rgba(207,32,39,0.5)',
          }}
        >
          GET MY FREE QUOTE →
        </div>
        <div style={{...BLACK900, fontSize: 34, color: MUTE, letterSpacing: 4, opacity: s2}}>
          MABREY ROOFING · RALEIGH-DURHAM
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══ composition ═══════════════════════════════════════════════════════
export const BreadButter: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = frame / fps;
  const progress = frame / durationInFrames;

  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`}}>
      {/* video card */}
      <div
        style={{
          position: 'absolute',
          left: VID_X,
          top: VID_Y,
          width: VID_W,
          height: VID_H,
          borderRadius: 26,
          overflow: 'hidden',
          boxShadow: `0 0 0 5px ${RED}, 0 24px 70px rgba(0,0,0,0.55)`,
        }}
      >
        <OffthreadVideo src={staticFile('take-cfr.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      <Captions t={t} />
      <HookBar frame={frame} fps={fps} t={t} />
      <MoneyCard frame={frame} fps={fps} t={t} />
      <ProofChips frame={frame} fps={fps} t={t} />
      <SatChip frame={frame} fps={fps} t={t} />
      <BrandIdle t={t} />
      <EndCard frame={frame} fps={fps} t={t} />

      {/* retention progress bar */}
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 10, width: `${progress * 100}%`, background: RED}} />
    </AbsoluteFill>
  );
};
