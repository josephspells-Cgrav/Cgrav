import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import chunksData from '../public/chunks.json';

// ── GOLD STYLE — the "First Class Comfort" edit language ──────────────
// full-bleed footage · mid-frame 2-3 word captions with per-phrase color ·
// HUGE hero money numbers · emoji bombs · no frame, no progress bar.

const WHITE = '#ffffff';
const GOLDC = '#ffd34d';
const RED = '#ff3b30';
const CYAN = '#4fc3f7';
const ORANGE = '#ff8a3d';

const FONT = '"Segoe UI", "Arial", sans-serif';
const CAP: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 900,
  fontStyle: 'italic',
  letterSpacing: '0px',
  textShadow:
    '0 3px 0 rgba(0,0,0,0.85), 0 0 26px rgba(0,0,0,0.7), 0 10px 34px rgba(0,0,0,0.6)',
  WebkitTextStroke: '2px rgba(0,0,0,0.35)',
} as React.CSSProperties;

type Word = {t: string; s: number; e: number};
type Chunk = {start: number; end: number; words: Word[]};
const RAW = chunksData as Chunk[];

// re-chunk to max 3 words (gold standard cadence)
const CHUNKS: Chunk[] = [];
for (const c of RAW) {
  for (let i = 0; i < c.words.length; i += 3) {
    const ws = c.words.slice(i, i + 3);
    CHUNKS.push({start: ws[0].s, end: ws[ws.length - 1].e + 0.06, words: ws});
  }
}

const MONEY_RE = /\$|zero|down|payment|month|year|98|12|50|financ/i;
const NEG_RE = /don't|overpay|cheap|leak|curl|worry/i;
const BRAND_RE = /mabrey|roofing|veteran|raleigh|durham/i;

const accentFor = (txt: string, idx: number): string => {
  if (MONEY_RE.test(txt)) return GOLDC;
  if (NEG_RE.test(txt)) return RED;
  if (BRAND_RE.test(txt)) return CYAN;
  return [WHITE, CYAN, ORANGE, WHITE][idx % 4];
};

// hero moments OWN the frame — captions yield
const HERO_WINDOWS: [number, number][] = [
  [21.9, 25.9], // $98/MO
  [25.9, 29.0], // 12 months
  [36.9, 41.9], // $50M
];
const inHero = (t: number) => HERO_WINDOWS.some(([a, b]) => t >= a && t < b);

// ══ captions — mid-frame, jittered, per-phrase color ═════════════════
const GoldCaptions: React.FC<{t: number; fps: number; frame: number}> = ({t, fps, frame}) => {
  if (t > 54.1 || inHero(t)) return null;
  const idx = CHUNKS.findIndex((c) => t >= c.start && t < c.end);
  if (idx < 0) return null;
  const chunk = CHUNKS[idx];
  const f0 = frame - Math.round(chunk.start * fps);
  const pop = spring({frame: f0, fps, config: {damping: 13, stiffness: 300}});
  const rot = ((idx * 7919) % 5) - 2; // deterministic -2..2deg
  const yBase = 58 + ((idx * 104729) % 3) * 4; // 58/62/66% height
  const joined = chunk.words.map((w) => w.t).join(' ');
  const accent = accentFor(joined, idx);
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top: `${yBase}%`,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        columnGap: 20,
        transform: `scale(${0.7 + 0.3 * pop}) rotate(${rot}deg)`,
        opacity: Math.min(1, pop * 1.4),
      }}
    >
      {chunk.words.map((w, i) => {
        // gold standard colors KEYWORDS within phrases, no per-word karaoke
        const hot = MONEY_RE.test(w.t) || NEG_RE.test(w.t) || BRAND_RE.test(w.t);
        return (
          <span
            key={i}
            style={{
              ...CAP,
              fontSize: 88,
              lineHeight: '98px',
              color: hot ? accent : WHITE,
              display: 'inline-block',
              whiteSpace: 'pre',
            }}
          >
            {w.t.toUpperCase() + (i < chunk.words.length - 1 ? ' ' : '')}
          </span>
        );
      })}
    </div>
  );
};

// ══ hero money numbers ════════════════════════════════════════════════
const Hero: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  children: React.ReactNode;
  size?: number;
}> = ({t, frame, fps, from, to, children, size = 170}) => {
  if (t < from || t > to) return null;
  const f0 = frame - Math.round(from * fps);
  const s = spring({frame: f0, fps, config: {damping: 10, stiffness: 120}});
  const out = interpolate(t, [to - 0.25, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <div
        style={{
          ...CAP,
          fontSize: size,
          lineHeight: 1.04,
          color: WHITE,
          textAlign: 'center',
          transform: `scale(${s})`,
          opacity: out,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// falling money emoji (deterministic)
const MoneyRain: React.FC<{t: number; from: number; to: number}> = ({t, from, to}) => {
  if (t < from || t > to) return null;
  const p = (t - from) / (to - from);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: 10}).map((_, i) => {
        const x = ((i * 9973) % 100);
        const delay = ((i * 31) % 10) / 10;
        const fall = Math.max(0, p * 1.6 - delay);
        if (fall <= 0 || fall > 1.1) return null;
        const rot = ((i * 7) % 60) - 30;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${-8 + fall * 108}%`,
              fontSize: 64 + ((i * 13) % 30),
              transform: `rotate(${rot + fall * 90}deg)`,
              opacity: 0.9,
            }}
          >
            {i % 3 === 0 ? '💵' : i % 3 === 1 ? '💰' : '🪙'}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// one-shot emoji pop
const EmojiPop: React.FC<{t: number; frame: number; fps: number; from: number; to: number; children: string; x?: string; size?: number}> = ({
  t, frame, fps, from, to, children, x = '50%', size = 150,
}) => {
  if (t < from || t > to) return null;
  const f0 = frame - Math.round(from * fps);
  const s = spring({frame: f0, fps, config: {damping: 9, stiffness: 140}});
  const out = interpolate(t, [to - 0.2, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bounce = Math.sin((t - from) * 6) * 8 * s;
  return (
    <div style={{position: 'absolute', left: x, top: '26%', transform: `translateX(-50%) translateY(${bounce}px) scale(${s})`, fontSize: size, opacity: out, filter: 'drop-shadow(0 8px 22px rgba(0,0,0,0.6))'}}>
      {children}
    </div>
  );
};

// ══ end card (lighter than v2 — footage stays visible) ═══════════════
const GoldEnd: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  const T0 = 54.2;
  if (t < T0) return null;
  const f0 = frame - Math.round(T0 * fps);
  const fade = interpolate(t, [T0, T0 + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s1 = spring({frame: f0 - 4, fps, config: {damping: 11, stiffness: 140}});
  const pulse = 1 + 0.035 * Math.sin(t * 4.5);
  return (
    <AbsoluteFill style={{background: `rgba(6,14,24,${0.62 * fade})`, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, transform: `scale(${s1})`}}>
        <div style={{...CAP, fontSize: 92, color: WHITE, textAlign: 'center', lineHeight: 1.05}}>
          MENTION THIS AD
          <br />
          <span style={{color: GOLDC}}>FREE QUOTE</span>
        </div>
        <div style={{...CAP, fontStyle: 'normal', transform: `scale(${pulse})`, background: '#cf2027', color: WHITE, fontSize: 52, padding: '24px 56px', borderRadius: 999, boxShadow: '0 16px 50px rgba(207,32,39,0.55)'}}>
          👇 GET MY FREE QUOTE
        </div>
        <div style={{...CAP, fontStyle: 'normal', fontSize: 30, color: '#cfd8e3', letterSpacing: 4}}>
          MABREY ROOFING · RALEIGH-DURHAM
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══ composition ═══════════════════════════════════════════════════════
export const GoldBB: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* FULL-BLEED footage */}
      <OffthreadVideo
        src={staticFile('take-cfr.mp4')}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />

      <GoldCaptions t={t} fps={fps} frame={frame} />

      {/* hero money moments */}
      <Hero t={t} frame={frame} fps={fps} from={21.9} to={25.9} size={190}>
        <span style={{color: GOLDC}}>$98</span>/MO
      </Hero>
      <MoneyRain t={t} from={21.9} to={25.9} />
      <Hero t={t} frame={frame} fps={fps} from={25.9} to={29.0} size={120}>
        NO PAYMENTS
        <br />
        <span style={{color: GOLDC}}>FOR 12 MONTHS</span>
      </Hero>
      <Hero t={t} frame={frame} fps={fps} from={36.9} to={41.9} size={150}>
        <span style={{color: GOLDC}}>$50,000,000</span>
        <br />
        <span style={{fontSize: 64}}>OF ROOFS INSTALLED</span>
      </Hero>

      {/* emoji bombs */}
      <EmojiPop t={t} frame={frame} fps={fps} from={2.2} to={4.2} size={130}>🤔</EmojiPop>
      <EmojiPop t={t} frame={frame} fps={fps} from={29.2} to={31.6} size={140}>🇺🇸</EmojiPop>
      <EmojiPop t={t} frame={frame} fps={fps} from={42.2} to={45.0} size={150}>🛰️</EmojiPop>

      <GoldEnd t={t} frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
