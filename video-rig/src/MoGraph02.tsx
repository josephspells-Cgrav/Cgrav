/**
 * MoGraph02 — THE SCRIPT AS PURE TYPE · 10s experiment (frames 0-324)
 * ─────────────────────────────────────────────────────────────────────────
 * Joseph, 2026-08-16 ~7:45pm: "use our current script... pull from our
 * current video and try to make that into an entire motion graphic video —
 * text motion graphics, heavily animated, very stimulating, go all out.
 * For the test, just do the first 10 seconds."
 *
 * So: the LOCKED ad's first 10.8s (hook + positioning + qualifier open),
 * word-timed to the REAL take2 transcript — every word lands at the exact
 * frame Joseph says it, so his actual VO muxes straight under this render
 * with zero re-timing. The beat sheet IS chunks.json.
 *
 * Language: the navy system (NAVY/RED/GOLD, ANTON+INTER, red rule, radial
 * glows) driven through his three picked treatments from CapLab —
 * #2 HIGHLIGHTER sweep, #7 STRIKE+REPLACE, #9 STACK BUILD — plus the 2A
 * red-slab brand moment and per-beat background pulses for the "stimulating"
 * register. Overshoot deliberately (water-bottle law): he trims, I pour.
 *
 * Render (test):
 *   npx remotion render src/index.ts MoGraph02 out/mograph02-10s.mp4 --codec h264
 * Mux his VO:
 *   ffmpeg -i out/mograph02-10s.mp4 -i public/take2-cfr.mp4 -map 0:v -map 1:a -t 10.8 -c:v copy out/mograph02-vo.mp4
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ANTON, INTER} from './HookSpectacle';

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const NAVY = '#0c1b2e';
const STEEL = '#8fa6c0';

export const MOGRAPH02_FRAMES = Math.round(10.8 * 30); // 324

// ── word kinds ────────────────────────────────────────────────────────
type Kind =
  | 'pop' // standard: spring up + in
  | 'slam' // impact: overshoot scale + jitter on land + red flash
  | 'strike' // lands, then a red bar rips through it and it degrades
  | 'slab' // the 2A treatment: white type on a red slab sliding in
  | 'sweep' // gold highlighter sweeps behind the word
  | 'drop'; // heavy word: falls in from above with weight

type W = {t: string; s: number; e?: number; kind?: Kind; size?: number; color?: string; br?: boolean};

// ── the phrase boards (each fully replaces the frame) ─────────────────
// Word times are VERBATIM from public/chunks.json (take2, CFR-30).
type Board = {from: number; to: number; glow?: string; words: W[]};

const BOARDS: Board[] = [
  // 1 ── "Don't OVERPAY for your ROOF" ── the anti-hook
  {
    from: 0.4,
    to: 1.9,
    glow: RED,
    words: [
      {t: "DON'T", s: 0.48, kind: 'pop', size: 96},
      {t: 'OVERPAY', s: 0.92, kind: 'slam', size: 210, color: RED, br: true},
      {t: 'FOR', s: 1.32, kind: 'pop', size: 66},
      {t: 'YOUR', s: 1.5, kind: 'pop', size: 66},
      {t: 'ROOF', s: 1.64, kind: 'pop', size: 130, br: true},
    ],
  },
  // 2 ── "and don't go with the CHEAPEST thing you can find" ── strike it
  {
    from: 1.9,
    to: 3.9,
    glow: RED,
    words: [
      {t: 'AND', s: 1.9, kind: 'pop', size: 56},
      {t: "DON'T", s: 2.08, kind: 'pop', size: 84},
      {t: 'GO', s: 2.38, kind: 'pop', size: 84},
      {t: 'WITH', s: 2.5, kind: 'pop', size: 56},
      {t: 'THE', s: 2.64, kind: 'pop', size: 56, br: true},
      {t: 'CHEAPEST', s: 2.72, e: 3.55, kind: 'strike', size: 172, br: true},
      {t: 'THING', s: 2.94, kind: 'pop', size: 64},
      {t: 'YOU', s: 3.16, kind: 'pop', size: 64},
      {t: 'CAN', s: 3.28, kind: 'pop', size: 64},
      {t: 'FIND', s: 3.38, kind: 'pop', size: 64},
    ],
  },
  // 3 ── "Here at MABREY ROOFING" ── the brand slab
  {
    from: 3.9,
    to: 4.8,
    words: [
      {t: 'HERE', s: 3.9, kind: 'pop', size: 64},
      {t: 'AT', s: 4.0, kind: 'pop', size: 64, br: true},
      {t: 'MABREY ROOFING', s: 4.1, kind: 'slab', size: 92},
    ],
  },
  // 4 ── "we offer the HIGHEST QUALITY roof replacements" ── gold sweep
  {
    from: 4.8,
    to: 7.26,
    glow: GOLD,
    words: [
      {t: 'WE', s: 4.8, kind: 'pop', size: 58},
      {t: 'OFFER', s: 5.0, kind: 'pop', size: 58},
      {t: 'THE', s: 5.24, kind: 'pop', size: 58, br: true},
      {t: 'HIGHEST', s: 5.42, kind: 'drop', size: 132, br: true},
      {t: 'QUALITY', s: 5.74, kind: 'sweep', size: 148, br: true},
      {t: 'ROOF', s: 6.16, kind: 'pop', size: 74},
      {t: 'REPLACEMENTS', s: 6.44, kind: 'pop', size: 74},
    ],
  },
  // 5 ── "at AFFORDABLE PRICES" ── the money landing
  {
    from: 7.26,
    to: 8.7,
    glow: GOLD,
    words: [
      {t: 'AT', s: 7.26, kind: 'pop', size: 60, br: true},
      {t: 'AFFORDABLE', s: 7.4, kind: 'slam', size: 150, br: true},
      {t: 'PRICES', s: 7.62, kind: 'slam', size: 150, color: GOLD},
    ],
  },
  // 6 ── "so if your roof is over 15 YEARS OLD" ── the qualifier number
  {
    from: 8.7,
    to: 10.8,
    glow: RED,
    words: [
      {t: 'SO', s: 8.8, kind: 'pop', size: 56},
      {t: 'IF', s: 8.9, kind: 'pop', size: 56},
      {t: 'YOUR', s: 9.02, kind: 'pop', size: 56},
      {t: 'ROOF', s: 9.12, kind: 'pop', size: 88},
      {t: 'IS', s: 9.34, kind: 'pop', size: 56},
      {t: 'OVER', s: 9.46, kind: 'pop', size: 56, br: true},
      {t: '15', s: 9.58, kind: 'slam', size: 260, color: RED},
      {t: 'YEARS', s: 9.9, kind: 'pop', size: 96, br: true},
      {t: 'OLD', s: 10.16, kind: 'drop', size: 130},
    ],
  },
];

// ── single word renderer ──────────────────────────────────────────────
const Word: React.FC<{w: W; t: number; f: number; fps: number}> = ({w, t, f, fps}) => {
  const k = f - Math.round(w.s * fps);
  if (k < 0) return null;
  const kind = w.kind ?? 'pop';
  const size = w.size ?? 72;
  const color = w.color ?? WHITE;

  const base: React.CSSProperties = {
    fontFamily: ANTON,
    fontWeight: 900,
    fontSize: size,
    lineHeight: `${Math.round(size * 1.04)}px`,
    color,
    textShadow: '0 6px 0 rgba(0,0,0,.45)',
    display: 'inline-block',
    margin: '0 14px',
    whiteSpace: 'nowrap',
  };

  if (kind === 'pop') {
    const sp = spring({frame: k, fps, config: {damping: 14, stiffness: 200}});
    return (
      <span style={{...base, opacity: Math.min(1, sp * 1.5), transform: `translateY(${(1 - sp) * 26}px)`}}>
        {w.t}
      </span>
    );
  }

  if (kind === 'slam') {
    const sp = spring({frame: k, fps, config: {damping: 10, stiffness: 190}});
    // 3-frame landing jitter — the impact
    const jit = k >= 3 && k <= 6 ? (k % 2 === 0 ? 3 : -3) : 0;
    return (
      <span
        style={{
          ...base,
          opacity: Math.min(1, sp * 1.6),
          transform: `scale(${0.6 + 0.4 * Math.min(1.08, sp * 1.08)}) translate(${jit}px, ${-jit}px)`,
          textShadow: `0 8px 0 rgba(0,0,0,.5), 0 0 44px ${color === WHITE ? RED : color}66`,
        }}
      >
        {w.t}
      </span>
    );
  }

  if (kind === 'drop') {
    const sp = spring({frame: k, fps, config: {damping: 12, stiffness: 150}});
    return (
      <span style={{...base, opacity: Math.min(1, sp * 1.5), transform: `translateY(${(1 - sp) * -60}px)`}}>
        {w.t}
      </span>
    );
  }

  if (kind === 'strike') {
    const sp = spring({frame: k, fps, config: {damping: 11, stiffness: 180}});
    // strike rips through 0.35s after the word lands; word tilts + dims after
    const strikeK = k - Math.round(0.35 * fps);
    const strike = interpolate(strikeK, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const dead = strike >= 1;
    return (
      <span
        style={{
          ...base,
          position: 'relative',
          opacity: Math.min(1, sp * 1.5) * (dead ? 0.62 : 1),
          transform: `scale(${0.7 + 0.3 * Math.min(1, sp)}) rotate(${strike * -3.5}deg) translateY(${strike * 8}px)`,
        }}
      >
        {w.t}
        <span
          style={{
            position: 'absolute',
            left: '-4%',
            top: '50%',
            height: Math.max(10, size * 0.09),
            width: `${strike * 108}%`,
            background: RED,
            borderRadius: 6,
            boxShadow: `0 0 30px ${RED}aa`,
            transform: 'rotate(-2deg)',
          }}
        />
      </span>
    );
  }

  if (kind === 'slab') {
    const sp = spring({frame: k, fps, config: {damping: 13, stiffness: 160}});
    const slide = interpolate(sp, [0, 1], [-110, 0]);
    return (
      <span
        style={{
          display: 'inline-block',
          background: RED,
          padding: '18px 44px 12px',
          borderRadius: 10,
          boxShadow: `0 10px 0 rgba(0,0,0,.4), 0 0 60px ${RED}55`,
          transform: `translateX(${slide}px) skewX(-4deg)`,
          opacity: Math.min(1, sp * 1.4),
        }}
      >
        <span
          style={{
            fontFamily: ANTON,
            fontWeight: 900,
            fontSize: size,
            lineHeight: `${Math.round(size * 1.1)}px`,
            color: WHITE,
            letterSpacing: 3,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            transform: 'skewX(4deg)',
          }}
        >
          {w.t}
        </span>
      </span>
    );
  }

  // sweep — gold highlighter block wipes behind the word
  const sp = spring({frame: k, fps, config: {damping: 12, stiffness: 170}});
  const wipe = interpolate(k, [4, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span style={{...base, position: 'relative', opacity: Math.min(1, sp * 1.5), color: NAVY}}>
      <span
        style={{
          position: 'absolute',
          left: '-3%',
          top: '4%',
          bottom: '2%',
          width: `${wipe * 106}%`,
          background: GOLD,
          borderRadius: 8,
          transform: 'skewX(-5deg)',
          boxShadow: `0 0 44px ${GOLD}55`,
          zIndex: -1,
        }}
      />
      <span style={{position: 'relative'}}>{w.t}</span>
    </span>
  );
};

// ── a phrase board ────────────────────────────────────────────────────
const PhraseBoard: React.FC<{b: Board; t: number; f: number; fps: number}> = ({b, t, f, fps}) => {
  if (t < b.from || t >= b.to) return null;
  const out = interpolate(t, [b.to - 0.14, b.to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // slow live zoom on the whole board — nothing ever sits still
  const drift = 1 + Math.min(0.05, (t - b.from) * 0.016);
  // 2-frame glow flash whenever a slam word lands
  const slams = b.words.filter((w) => w.kind === 'slam');
  let flash = 0;
  for (const w of slams) {
    const k = f - Math.round(w.s * fps);
    if (k >= 1 && k <= 4) flash = Math.max(flash, 0.16);
  }
  // group words into rows on br flags
  const rows: W[][] = [[]];
  for (const w of b.words) {
    rows[rows.length - 1].push(w);
    if (w.br) rows.push([]);
  }
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 40% at 50% 46%, ${b.glow ?? RED}26 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <AbsoluteFill style={{background: WHITE, opacity: flash}} />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          transform: `scale(${drift})`,
        }}
      >
        <div style={{textAlign: 'center'}}>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexWrap: 'nowrap'}}
            >
              {row.map((w) => (
                <Word key={w.t + w.s} w={w} t={t} f={f} fps={fps} />
              ))}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MoGraph02: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{background: NAVY, overflow: 'hidden'}}>
      {/* vignette lives under everything */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,.45) 100%)',
        }}
      />
      {BOARDS.map((b) => (
        <PhraseBoard key={b.from} b={b} t={t} f={frame} fps={fps} />
      ))}
    </AbsoluteFill>
  );
};
