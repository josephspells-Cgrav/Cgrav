import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import chunksData from '../public/take2-chunks.json';
import {HookSpectacle, hookBackground, hookSuppressesCaptions, ANTON, INTER} from './HookSpectacle';

// ── REAL BB v6 — v5 (RealBBRoll) with the type-as-spectacle hook layered
// over 0–8.6s. WO_HOOK_SPECTACLE.
//
// v5 IS THE BLESSED CUT and is copied here verbatim: same cut list, same
// captions, same four 2A graphics, same end card. Three additions only:
//   · <HookSpectacle> — T1/T2/T3/T5, the new hook treatments.
//   · T4, the brand moment, which is the EXISTING Hi2A doing its normal job
//     at 4.58–5.56. Hi2A gained one optional `font` prop so the hook can be
//     typographically consistent (Anton); the four v5 graphics pass nothing
//     and render byte-identical to v5.
//   · The take is pushed to 130% + dimmed 40% during T3's sanctioned
//     full-frame moment, and the bottom captions stand down for that window.
// src/RealBBRoll.tsx is untouched and still renders.

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const NAVY = '#0c1b2e';
const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';

// ── TWO ZONES, PERMANENTLY SPLIT (Joseph, 11:52pm) ────────────────────
const CAP_TOP = '72%'; // bottom third — the v1 value he already shipped with
const GFX_TOP = '5.5%'; // above the CROWN — at 8% the sub-line sat on his hat

type Chunk = {start: number; end: number; words: {t: string; s: number; e: number}[]};
const CHUNKS = chunksData as Chunk[];
const MONEY_RE = /\$|zero|down|payment|month|year|98|12|50|financ|million/i;

// the four graphic windows
const G1: [number, number] = [20.6, 24.4]; // ZERO DOWN FINANCING
const G2: [number, number] = [24.6, 27.2]; // AS LOW AS $98 A MONTH
const G3: [number, number] = [27.3, 30.9]; // NO PAYMENTS FOR 12 MONTHS
const G4: [number, number] = [37.4, 40.2]; // $50 MILLION
const T4: [number, number] = [4.58, 5.56]; // v6 — "Here at Mabrey Roofing"
const CTA_T = 43.5; // end card takeover

// ══ THE CUT LIST ══════════════════════════════════════════════════════
type Cut = {
  id: string;
  src?: string;
  kind?: 'bill' | 'map' | 'billboard';
  // v6.1 — a cut whose plate is a MOVING clip rather than a still.
  video?: boolean;
  srcFrom?: number; // seconds into the source clip where the cut opens
  from: number;
  to: number;
  s: [number, number];
  x: [number, number];
  y: [number, number];
};

export const CUTS: Cut[] = [
  // ⚖️ v6.3 (Joseph, 08-15 9:53am): cuts 1, 2 and 6 are now REAL DRONE MOVES.
  // Cut 1 was a still; cut 2's old clip read as "a still with a shaky-cam
  // effect" (its motion WAS handheld micro-sway); cut 6's house was miscast —
  // golden-hour glamour brick instead of a traditional early-2000s suburban
  // home. All three regenerated as drone parallax — the ONE motion class that
  // survived the push-in law, because parallax reveals geometry instead of
  // inventing texture detail. Camera-move lerps stay NEUTRAL: the clips carry
  // real moves and a synthetic push on top would double-move.
  // 1 — "we offer the highest quality roof replacements" (5.48-7.80)
  {id: 'drone', src: 'broll-v2/drone-house.mp4', video: true, srcFrom: 0.15, from: 5.5, to: 7.75, s: [1, 1], x: [0, 0], y: [0, 0]},
  // 2 — "is over 15 years old" (9.80-11.24)
  {
    id: 'old',
    // v6.5 (Joseph's reference shot, 11:32am): the wide house is retired for a
    // ~50% crop of that overhead hip roof, drone-panned. Cropping BEFORE
    // generation means the model only has roof to animate — no street, no
    // trees, no lawn to get wrong.
    src: 'broll-v2/drone-oldroof2.mp4',
    video: true,
    srcFrom: 0.4,
    from: 9.8,
    to: 11.3,
    s: [1, 1],
    x: [0, 0],
    y: [0, 0],
  },
  // ── SYMPTOM MONTAGE, contiguous 12.16 → 18.02 ──────────────────────
  {
    id: 'curl',
    src: 'broll-v2/br4-curl-v2.mp4',
    video: true,
    srcFrom: 0.3,
    from: 12.16,
    to: 14.02,
    s: [1, 1],
    x: [0, 0],
    y: [0, 0],
  },
  {id: 'stain', src: 'br5-ceiling.png', from: 14.02, to: 15.55, s: [1.04, 1.12], x: [0, 0], y: [3, -1]},
  {id: 'bill', kind: 'bill', from: 15.55, to: 18.02, s: [1, 1], x: [0, 0], y: [0, 0]},
  // 6 — "it's time for you to get a new roof" (18.30-19.88) — THE WANT
  //     v6.4 (Joseph picked N2, 11:14am): the whole-house shot is retired for a
  //     TIGHT new-roof shot — slope + gutter + fascia + siding. Same distance
  //     band as the aging-roof cut at 9.80, so the two play as a before/after
  //     without the ad ever saying so. Fewer objects in frame = fewer AI tells,
  //     which is the law his cold-viewer test and the Z-ladder both landed on.
  {id: 'new', src: 'broll-v2/drone-newroof.mp4', video: true, srcFrom: 0.4, from: 18.02, to: 19.9, s: [1, 1], x: [0, 0], y: [0, 0]},
  {id: 'map', kind: 'map', from: 32.95, to: 37.35, s: [1, 1], x: [0, 0], y: [0, 0]},
  // "We've installed over $50 million of roofs" (37.26-39.92) — the brand
  // billboard. Out at 40.2 so his face carries "for homeowners just like
  // yourself", which is the warm line and belongs on a human.
  {id: 'billboard', kind: 'billboard', from: 37.35, to: 40.2, s: [1, 1], x: [0, 0], y: [0, 0]},
];

const activeCut = (t: number) => CUTS.find((c) => t >= c.from && t < c.to);

// ══ THE ENERGY BILL — it climbs through the summer ════════════════════
const BillGraphic: React.FC<{t: number; from: number; fps: number; frame: number}> = ({from, fps, frame}) => {
  const f0 = frame - Math.round(from * fps);
  const MONTHS = [
    {m: 'JUNE', v: 118, h: 0.42},
    {m: 'JULY', v: 167, h: 0.66},
    {m: 'AUGUST', v: 214, h: 1.0},
  ];
  const arrow = spring({frame: f0 - 26, fps, config: {damping: 13, stiffness: 130}});
  return (
    <AbsoluteFill style={{background: NAVY, alignItems: 'center', justifyContent: 'flex-end'}}>
      <div style={{position: 'absolute', top: '27%', ...H, fontSize: 48, color: '#8fa6c0', letterSpacing: 9}}>
        YOUR POWER BILL
      </div>
      <div
        style={{
          position: 'absolute',
          top: '36%',
          right: 96,
          ...H,
          fontSize: 132,
          color: RED,
          opacity: arrow,
          transform: `translateY(${(1 - arrow) * 40}px) rotate(-8deg)`,
        }}
      >
        ▲
      </div>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 58, paddingBottom: 210}}>
        {MONTHS.map((mo, i) => {
          const s = spring({frame: f0 - 4 - i * 7, fps, config: {damping: 15, stiffness: 120}});
          const last = i === MONTHS.length - 1;
          const amount = Math.round(mo.v * Math.min(1, s));
          return (
            <div key={mo.m} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
              <span style={{...H, fontSize: last ? 96 : 66, color: last ? WHITE : '#9fb4cb', opacity: s}}>
                ${amount}
              </span>
              <div
                style={{
                  width: 196,
                  height: 620 * mo.h * s,
                  borderRadius: 14,
                  background: last ? RED : '#2b4560',
                  boxShadow: last ? `0 0 60px ${RED}55` : 'none',
                }}
              />
              <span style={{...H, fontSize: 42, color: last ? WHITE : '#8fa6c0', letterSpacing: 3}}>{mo.m}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ══ THE BILLBOARD — the brand comes back ══════════════════════════════
// ⚖️ v6.6 (Joseph, 1:09pm). The behind-subject composite is GONE — scrim,
// rack-focus blur, ghost numerals, matted speaker, all of it. His read: too
// flashy, and the ghosting artefacts around his beard and the floating "$50"
// were the tell. Replaced with a BILLBOARD: a full-frame branded card, same
// grammar as the bill chart and the map, which the ad already established.
// His call and it's the right one — the ad hadn't shown the brand since the
// 5s mark, and the proof beat is exactly where identity should land.
const BillboardCard: React.FC<{from: number; to: number; t: number; fps: number; frame: number}> = ({
  from,
  to,
  t,
  fps,
  frame,
}) => {
  const f = frame - Math.round(from * fps);
  const out = interpolate(t, [to - 0.25, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // staged build — brand first, number as the hero, locality last
  const brand = spring({frame: f - 3, fps, config: {damping: 15, stiffness: 180}});
  const rule = interpolate(f, [10, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const over = interpolate(f, [16, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hero = spring({frame: f - 20, fps, config: {damping: 12, stiffness: 150}});
  const inst = spring({frame: f - 32, fps, config: {damping: 15, stiffness: 170}});
  const foot = interpolate(f, [44, 56], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: NAVY, opacity: out, overflow: 'hidden'}}>
      {/* depth: a soft red glow behind the hero number, and a subtle vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 34% at 50% 46%, ${RED}22 0%, rgba(0,0,0,0) 70%)`,
          opacity: hero,
        }}
      />
      <AbsoluteFill
        style={{background: 'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,.45) 100%)'}}
      />

      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 60px'}}>
        {/* BRAND */}
        <div
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 74,
            color: WHITE,
            letterSpacing: 9,
            opacity: brand,
            transform: `translateY(${(1 - brand) * -34}px)`,
          }}
        >
          MABREY ROOFING
        </div>
        <div
          style={{
            height: 9,
            width: `${rule * 62}%`,
            background: RED,
            borderRadius: 5,
            marginTop: 20,
            boxShadow: `0 0 26px ${RED}77`,
          }}
        />

        {/* THE CLAIM */}
        <div
          style={{
            ...H,
            fontFamily: INTER,
            fontSize: 46,
            color: '#8fa6c0',
            letterSpacing: 12,
            marginTop: 66,
            opacity: over,
          }}
        >
          OVER
        </div>
        <div
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 168,
            lineHeight: '172px',
            color: WHITE,
            marginTop: 6,
            textShadow: '0 8px 0 rgba(0,0,0,.45)',
            transform: `scale(${0.86 + 0.14 * Math.min(1, hero)})`,
            opacity: Math.min(1, hero * 1.4),
          }}
        >
          $50 MILLION
        </div>
        <div
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 88,
            color: RED,
            letterSpacing: 4,
            marginTop: 4,
            opacity: inst,
            transform: `translateY(${(1 - inst) * 26}px)`,
          }}
        >
          INSTALLED
        </div>

        {/* LOCALITY */}
        <div
          style={{
            ...H,
            fontFamily: INTER,
            fontSize: 34,
            color: '#6b8099',
            letterSpacing: 7,
            marginTop: 64,
            opacity: foot,
          }}
        >
          RALEIGH-DURHAM, NC
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══ THE MAP — a pin drops on Raleigh-Durham ═══════════════════════════
const MapGraphic: React.FC<{t: number; from: number; to: number; fps: number; frame: number}> = ({
  t,
  from,
  to,
  fps,
  frame,
}) => {
  const f0 = frame - Math.round(from * fps);
  const p = (t - from) / (to - from);
  const push = 1 + 0.1 * p;
  const drop = spring({frame: f0 - 10, fps, config: {damping: 11, stiffness: 150}});
  const pinY = interpolate(drop, [0, 1], [-900, 0]);
  const RIPPLES = [0, 30, 60].map((d) =>
    interpolate(f0, [26 + d, 64 + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  const label = spring({frame: f0 - 32, fps, config: {damping: 14, stiffness: 140}});
  const CX = 540;
  const CY = 900;

  return (
    // ⚖️ NAVY, not pale (Joseph, 08-15): the map was the ONLY bright full-frame
    // moment in an ad whose other takeovers (bill graphic, end card) are navy —
    // a tonal outlier. Same geometry, palette inverted: roads now GLOW on dark,
    // which also makes the gold beltlines and the red pin read harder.
    <AbsoluteFill style={{background: NAVY, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
          <rect width="1080" height="1920" fill="#0c1b2e" />
          <path d="M -40 1500 Q 260 1430 470 1560 T 1120 1520 L 1120 1980 L -40 1980 Z" fill="#102a3e" />
          <ellipse cx="200" cy="620" rx="210" ry="150" fill="#122c22" />
          <ellipse cx="900" cy="1180" rx="180" ry="140" fill="#122c22" />
          {Array.from({length: 16}).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={120 * i + 60} x2="1080" y2={120 * i + 60} stroke="#16304a" strokeWidth="3" />
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <line key={`v${i}`} x1={120 * i + 40} y1="0" x2={120 * i + 40} y2="1920" stroke="#16304a" strokeWidth="3" />
          ))}
          <circle cx={CX} cy={CY} r="290" fill="none" stroke="#24435f" strokeWidth="26" />
          <circle cx={CX} cy={CY} r="290" fill="none" stroke="#f4c95d" strokeWidth="16" />
          <circle cx={CX} cy={CY} r="560" fill="none" stroke="#24435f" strokeWidth="24" />
          <circle cx={CX} cy={CY} r="560" fill="none" stroke="#c9a24a" strokeWidth="13" />
          {[-70, -20, 35, 110, 160, 215, 260, 310].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={CX + Math.cos(r) * 120}
                y1={CY + Math.sin(r) * 120}
                x2={CX + Math.cos(r) * 1200}
                y2={CY + Math.sin(r) * 1200}
                stroke="#dce7f2"
                strokeWidth="18"
                opacity={0.92}
              />
            );
          })}
          {RIPPLES.map((r, i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={120 + r * 520}
              fill="none"
              stroke={RED}
              strokeWidth={7}
              opacity={r <= 0 || r >= 1 ? 0 : (1 - r) * 0.55}
            />
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            left: CX - 78,
            top: CY - 250 + pinY,
            width: 156,
            filter: 'drop-shadow(0 18px 22px rgba(0,0,0,.35))',
          }}
        >
          <svg width="156" height="212" viewBox="0 0 78 106">
            <path d="M39 0C17.5 0 0 17.5 0 39c0 28 39 67 39 67s39-39 39-67C78 17.5 60.5 0 39 0z" fill={RED} />
            <circle cx="39" cy="38" r="15" fill="#ffffff" />
          </svg>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          top: '54%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: label,
          transform: `translateY(${(1 - label) * 26}px)`,
        }}
      >
        <div
          style={{
            ...H,
            background: WHITE,
            color: NAVY,
            fontSize: 68,
            padding: '22px 46px',
            borderRadius: 18,
            boxShadow: '0 18px 46px rgba(0,0,0,.22)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <span style={{width: 22, height: 22, borderRadius: 999, background: RED, display: 'inline-block'}} />
          RALEIGH-DURHAM, NC
        </div>
      </div>

      <AbsoluteFill
        style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 58%, rgba(0,0,0,.30) 74%, rgba(0,0,0,.62) 100%)'}}
      />
    </AbsoluteFill>
  );
};

// ══ b-roll layer ══════════════════════════════════════════════════════
const BRoll: React.FC<{t: number; fps: number; frame: number}> = ({t, fps, frame}) => {
  const cut = activeCut(t);
  if (!cut) return null;

  if (cut.kind === 'bill') return <BillGraphic t={t} from={cut.from} fps={fps} frame={frame} />;
  if (cut.kind === 'map') return <MapGraphic t={t} from={cut.from} to={cut.to} fps={fps} frame={frame} />;
  if (cut.kind === 'billboard') return <BillboardCard from={cut.from} to={cut.to} t={t} fps={fps} frame={frame} />;

  const p = (t - cut.from) / (cut.to - cut.from);
  const lerp = ([a, b]: [number, number]) => a + (b - a) * p;

  const inFrames = (t - cut.from) * fps;
  const settle = interpolate(inFrames, [0, 3], [1.035, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const transform = `scale(${lerp(cut.s) * settle}) translate(${lerp(cut.x)}%, ${lerp(cut.y)}%)`;

  // ── MOVING plate ────────────────────────────────────────────────────
  // The clip has to be Sequence-mounted at the cut's own in-point: BRoll
  // renders at the composition root, so an unwrapped OffthreadVideo would
  // ask a 5s clip for its frame 294 and come back black. `from` restarts
  // the clip's clock at the cut, `trimBefore` picks the in-point inside it.
  if (cut.video) {
    return (
      <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
        <Sequence
          layout="none"
          from={Math.round(cut.from * fps)}
          durationInFrames={Math.ceil((cut.to - cut.from) * fps) + 2}
        >
          <OffthreadVideo
            src={staticFile(cut.src as string)}
            muted
            trimBefore={Math.round((cut.srcFrom ?? 0) * fps)}
            style={{width: '100%', height: '100%', objectFit: 'cover', transform}}
          />
        </Sequence>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <Img src={staticFile(cut.src as string)} style={{width: '100%', height: '100%', objectFit: 'cover', transform}} />
    </AbsoluteFill>
  );
};

// ══ captions — BOTTOM ZONE ════════════════════════════════════════════
// Verbatim from v5, with ONE addition: they stand down inside T3's window,
// where the full-frame type build IS the sentence.
const Captions: React.FC<{t: number}> = ({t}) => {
  if (hookSuppressesCaptions(t)) return null;
  const chunk = CHUNKS.find((c) => t >= c.start && t < c.end);
  if (!chunk) return null;
  const appear = Math.min(1, (t - chunk.start) / 0.1);
  return (
    <div
      style={{
        position: 'absolute',
        top: CAP_TOP,
        left: 36,
        right: 36,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 18,
        rowGap: 4,
        textAlign: 'center',
        transform: `scale(${0.96 + 0.04 * appear})`,
        opacity: appear,
      }}
    >
      {chunk.words.map((w, i) => {
        const active = t >= w.s && (i === chunk.words.length - 1 ? true : t < chunk.words[i + 1].s);
        const money = MONEY_RE.test(w.t);
        return (
          <span
            key={i}
            style={{
              ...H,
              fontSize: 64,
              lineHeight: '74px',
              color: active ? (money ? GOLD : RED) : WHITE,
              textShadow: SHADOW,
              transform: active ? 'scale(1.05)' : 'scale(1)',
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

// ══ 2A — the house highlighter ════════════════════════════════════════
// v5 verbatim + one optional `font` prop (defaults to the v5 stack, so the
// four v5 graphics are unchanged). T4 passes Anton to match the hook.
// ══ THE SECOND CARD GRAMMAR ═══════════════════════════════════════════
// Joseph's composition note (08-15 6:56am): the money block ran the SAME
// 2A lockup three times in ten seconds — small lead / red bar under a big
// key / small sub, identical geometry each time. By the third the eye stops
// reading it as an event. The reference alternated TWO card grammars; this
// is ours. $98 lands as a left-aligned editorial number: asymmetric, no bar,
// the $ carries the red instead. Rhythm across the ad becomes
// BAR → EDITORIAL → BAR → … → BAR.
const EditorialMoney: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  lead: string;
  amount: string;
  tail: string;
}> = ({t, frame, fps, from, to, lead, amount, tail}) => {
  if (t < from || t > to + 0.3) return null;
  const f0 = frame - Math.round(from * fps);
  const s = spring({frame: f0, fps, config: {damping: 13, stiffness: 220}});
  const sTail = spring({frame: f0 - 9, fps, config: {damping: 14, stiffness: 180}});
  const out = interpolate(t, [to, to + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // the rule slides out from under the number instead of a highlighter bar
  const rule = interpolate(f0, [10, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        top: GFX_TOP,
        left: 54,
        right: 54,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        opacity: out,
      }}
    >
      <span
        style={{
          ...H,
          fontFamily: INTER,
          fontSize: 44,
          letterSpacing: 8,
          color: WHITE,
          textShadow: SHADOW,
          opacity: s,
          transform: `translateX(${(1 - s) * -30}px)`,
        }}
      >
        {lead}
      </span>
      <span
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 232,
          lineHeight: '236px',
          color: WHITE,
          textShadow: '0 6px 0 rgba(0,0,0,.7), 0 0 34px rgba(0,0,0,.55)',
          transform: `translateY(${(1 - s) * 26}px)`,
          opacity: s,
        }}
      >
        <span style={{color: RED}}>$</span>
        {amount}
      </span>
      {/* red rule — the accent without repeating the highlighter */}
      <span
        style={{
          height: 12,
          width: `${rule * 62}%`,
          background: RED,
          borderRadius: 6,
          boxShadow: `0 0 22px ${RED}66`,
          marginTop: -6,
        }}
      />
      <span
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 68,
          color: WHITE,
          textShadow: SHADOW,
          marginTop: 8,
          marginLeft: '38%',
          opacity: sTail,
          transform: `translateX(${(1 - sTail) * 24}px)`,
        }}
      >
        {tail}
      </span>
    </div>
  );
};

const Hi2A: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  lead?: string;
  keyText: string;
  leadSize?: number;
  keySize?: number;
  sub?: string;
  font?: string;
}> = ({t, frame, fps, from, to, lead, keyText, leadSize = 64, keySize = 92, sub, font = F}) => {
  if (t < from || t > to + 0.3) return null;
  const T = {...H, fontFamily: font};
  const f0 = frame - Math.round(from * fps);
  const s = spring({frame: f0, fps, config: {damping: 14, stiffness: 300}});
  const grow = interpolate(f0, [8, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const out = interpolate(t, [to, to + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        top: GFX_TOP,
        left: 34,
        right: 34,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        opacity: out,
        transform: `scale(${0.9 + 0.1 * Math.min(1, s)})`,
      }}
    >
      {lead ? (
        <span style={{...T, fontSize: leadSize, color: WHITE, textShadow: SHADOW, textAlign: 'center', opacity: s}}>
          {lead}
        </span>
      ) : null}
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
        <span
          style={{...T, position: 'relative', fontSize: keySize, color: WHITE, textShadow: SHADOW, textAlign: 'center'}}
        >
          {keyText}
        </span>
      </span>
      {sub ? (
        <span style={{...T, fontSize: 46, color: WHITE, textShadow: SHADOW, textAlign: 'center', opacity: grow}}>
          {sub}
        </span>
      ) : null}
    </div>
  );
};

// ══ G4 COMPOSITE — the behind-subject device at the $50M beat ═════════
// WO_G4_COMPOSITE. The reference's trick, on exactly ONE beat: the world
// behind him is replaced with a built graphic while HE stays exactly where
// he is — matted out of the same take by <OffthreadVideo transparent>
// reading take2-alpha.webm (VP9+alpha, frame-for-frame the same timeline as
// take2-cfr.mp4). `trimBefore` = the mount frame, so alpha frame N lands on
// base frame N and his silhouette covers his base-video self exactly. Any
// offset here reads as ghosting, which is why the source time is pinned to
// the mount rather than restarted at 0.
//
// Mounted for 96 frames ONLY: `transparent` forces PNG frame extraction
// instead of BMP and costs ~40% render speed for every frame it is on.
// ⚠️ MOUNT IS 1121, NOT the WO's 1116. At 1116 (37.20s) the MAP cut is still
// on screen — it runs to 37.35 — so a 1116 mount put a cut-out speaker
// floating over the map graphic for 5 frames before the map cut out from
// under him. Caught in the t=37.3 still. 1121 (37.37s) is the first frame
// after the map's out-point, where the base take is underneath again and the
// matted speaker lands pixel-identical on his base-video self: the layer
// mounts invisibly, which is the whole premise. Out-point is unchanged.
// This rig has already killed one sub-0.3s face flash at a cut seam (v5,
// the 18.02 hand cut) — same class of artefact, same call.
const G4C_FROM = 1121; // 37.37s — one frame after the map cut ends
const G4C_DUR = 91; //    → 1212 (40.4s), the WO's out-point

// A skyline of gables rising off the bottom edge — texture at the depth the
// scrim opens up, never a subject. One path, no detail to read.
//
// 980 tall, not the 360 I built first. He fills the bottom of THIS frame
// edge to edge — shoulders across the full width below ~y1450 — so a
// short bottom strip was 100% occluded: dead paint, verified by a 1:1 crop
// of the t=38.5 still. Anchored at the bottom still, but the ridge line now
// crosses at screen y≈1115–1320, where there IS open frame either side of
// his neck. It reads as a neighborhood horizon behind him, which is the
// point of a behind-subject layer.
const RoofSilhouette: React.FC = () => (
  <svg width="1080" height="980" viewBox="0 0 1080 980" style={{position: 'absolute', left: 0, bottom: 0}}>
    <path
      d="M0 980 L0 380 L70 250 L210 380 L210 430 L330 430 L330 340 L470 190 L610 340 L610 400 L700 400 L700 320 L840 175 L980 320 L980 380 L1080 380 L1080 980 Z"
      fill="#050b14"
    />
  </svg>
);

const BigNumeral: React.FC<{top: number; left: number; dy: number}> = ({top, left, dy}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left,
      fontFamily: ANTON,
      fontSize: 140,
      lineHeight: 1,
      letterSpacing: 2,
      whiteSpace: 'nowrap',
      color: 'transparent',
      WebkitTextStroke: '2px #ffffff',
      transform: `translateY(${dy}px)`,
    }}
  >
    $50,000,000
  </div>
);

const G4Composite: React.FC = () => {
  const f = useCurrentFrame(); // sequence-relative: 0 … 95
  const {fps} = useVideoConfig();
  // ⚖️ v6.6 — RACK FOCUS, not lighting swap (Joseph, 11:56am: the navy scrim
  // "filter coming up" was jarring). Diagnosis: this was the only moment in
  // the ad where BASE REALITY changed — 37s of graphics-over-daylight, then
  // the world went 85% navy for 3s mid-sentence. New treatment: the yard
  // stays PRESENT but goes soft (blur + gentle dim), like a lens racking
  // focus onto him. His pixels never change; only the background softens.
  // A focus pull is a transition the brain already has a category for.
  // Mechanically: a second copy of the base take, filter-ramped. At env=0
  // the copy is pixel-identical to the sharp base beneath it, so the mount
  // is invisible — same property the scrim had, without the teleport.
  const env = interpolate(f, [0, 14, G4C_DUR - 12, G4C_DUR], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  const drift = -(f / fps) * 12; // ~12px/s upward

  return (
    <>
      {/* 2 — the world, racked soft: blur ramps 0→16px, brightness 1→0.72.
             scale(1.055) hides the dark edge-bleed blur sampling creates. */}
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <OffthreadVideo
          muted
          src={staticFile('take2-cfr.mp4')}
          trimBefore={G4C_FROM}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `blur(${16 * env}px) brightness(${1 - 0.28 * env})`,
            transform: `scale(${1 + 0.055 * env})`,
          }}
        />
      </AbsoluteFill>

      {/* 3 — ghost numerals in the mid-space between the soft world and him.
             Soft dark halo gives them separation on bright blurred patches.
             (Roof silhouette retired with the void — a fake skyline over a
             REAL blurred yard reads as a sticker. One-line restore if wanted.) */}
      <AbsoluteFill style={{opacity: 0.26 * env, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, textShadow: '0 2px 22px rgba(0,0,0,0.6)'}}>
          <BigNumeral top={470} left={-46} dy={drift} />
          <BigNumeral top={1160} left={238} dy={drift - 26} />
        </div>
      </AbsoluteFill>

      {/* 4 — the matted speaker, pixel-identical to the base take under it */}
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <OffthreadVideo
          transparent
          muted
          src={staticFile('take2-alpha.webm')}
          trimBefore={G4C_FROM}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>
    </>
  );
};

// ══ end card (the liked v2.1 close) ═══════════════════════════════════
const EndCard: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t < CTA_T) return null;
  const f0 = frame - Math.round(CTA_T * fps);
  const fade = interpolate(t, [CTA_T, CTA_T + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s1 = spring({frame: f0 - 4, fps, config: {damping: 12, stiffness: 130}});
  const s2 = spring({frame: f0 - 12, fps, config: {damping: 11, stiffness: 130}});
  const pulse = 1 + 0.03 * Math.sin(t * 4.5);
  return (
    <AbsoluteFill style={{background: `rgba(12,27,46,${0.9 * fade})`, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32}}>
        <div
          style={{
            ...H,
            fontSize: 84,
            color: WHITE,
            textAlign: 'center',
            lineHeight: 1.06,
            transform: `scale(${s1})`,
            textShadow: SHADOW,
          }}
        >
          SCHEDULE YOUR
          <br />
          <span style={{position: 'relative', display: 'inline-block', padding: '0 10px'}}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '12%',
                height: '76%',
                width: `${Math.min(1, Math.max(0, (f0 - 14) / 14)) * 100}%`,
                background: RED,
                borderRadius: 8,
              }}
            />
            <span style={{position: 'relative', color: WHITE}}>FREE QUOTE</span>
          </span>
        </div>
        <div
          style={{
            ...H,
            transform: `scale(${s2 * pulse})`,
            background: RED,
            color: WHITE,
            fontSize: 52,
            padding: '24px 58px',
            borderRadius: 999,
            boxShadow: '0 16px 50px rgba(207,32,39,0.5)',
          }}
        >
          GET MY FREE QUOTE →
        </div>
        <div style={{...H, fontSize: 32, color: '#cfd8e3', letterSpacing: 4, opacity: s2}}>
          MABREY ROOFING · RALEIGH-DURHAM
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ══ composition ═══════════════════════════════════════════════════════
export const RealBBv6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const onGraphicCut = !!activeCut(t)?.kind;
  const bg = hookBackground(t);

  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* the face — audio lives here and never stops under a cut. During T3
          it is pushed to 130% and dimmed so the face reads as texture, not
          as the anchor; the type is the anchor for that window. */}
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <OffthreadVideo
          src={staticFile('take2-cfr.mp4')}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${bg.scale})`}}
        />
      </AbsoluteFill>
      {bg.dim > 0 ? <AbsoluteFill style={{background: `rgba(0,0,0,${bg.dim})`}} /> : null}

      <BRoll t={t} fps={fps} frame={frame} />

      {/* Two scrims, one per zone. Off on full graphic cuts. */}
      {onGraphicCut || t >= CTA_T ? null : (
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,.46) 0%, rgba(0,0,0,.22) 15%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 58%, rgba(0,0,0,.30) 74%, rgba(0,0,0,.62) 100%)',
          }}
        />
      )}

      {/* T4 — the brand moment. The existing house accent, on the hook's font. */}
      <Hi2A
        t={t}
        frame={frame}
        fps={fps}
        from={T4[0]}
        to={T4[1]}
        lead="HERE AT"
        keyText="MABREY ROOFING"
        leadSize={40}
        keySize={84}
        font={ANTON}
      />

      {/* the four ordered v5 graphics — 2A house style, TOP ZONE ONLY */}
      <Hi2A t={t} frame={frame} fps={fps} from={G1[0]} to={G1[1]} lead="WE OFFER" keyText="ZERO DOWN" sub="FINANCING" />
      <EditorialMoney t={t} frame={frame} fps={fps} from={G2[0]} to={G2[1]} lead="AS LOW AS" amount="98" tail="A MONTH" />
      <Hi2A t={t} frame={frame} fps={fps} from={G3[0]} to={G3[1]} lead="NO PAYMENTS" keyText="FOR 12 MONTHS" keySize={88} />
      {/* G4's top-zone lockup is retired — the BILLBOARD cut carries the $50M
          claim full-frame now, and stacking a 2A lockup on top of it would be
          the same message twice in one frame. */}

      <EndCard t={t} frame={frame} fps={fps} />

      {/* the hook — T1/T2/T3/T5 */}
      <HookSpectacle t={t} frame={frame} fps={fps} />

      {/* LAST in the tree on purpose — "captions on the bottom the entire
          time" means they stay readable even across the end-card takeover. */}
      <Captions t={t} />
    </AbsoluteFill>
  );
};
