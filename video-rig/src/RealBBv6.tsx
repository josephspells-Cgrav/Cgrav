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
} from 'remotion';
import chunksData from '../public/take2-chunks.json';
import {HookSpectacle, hookBackground, hookSuppressesCaptions, ANTON} from './HookSpectacle';

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
  kind?: 'bill' | 'map';
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
  // 1 — "we offer the highest quality roof replacements" (5.48-7.80)
  {id: 'drone', src: 'br2-dronehouse.png', from: 5.5, to: 7.75, s: [1.11, 1.01], x: [0, 0], y: [-1, 1]},
  // 2 — "is over 15 years old" (9.80-11.24)
  //     v6.1 — the still is retired for the WO_BROLL v2 CLIP. Camera-move
  //     lerps go NEUTRAL: the clip carries a real move, and a synthetic push
  //     on top of it would double-move.
  {
    id: 'old',
    src: 'broll-v2/br3-oldroof-v2.mp4',
    video: true,
    srcFrom: 0.2,
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
  {id: 'new', src: 'br7-newroof.png', from: 18.02, to: 19.9, s: [1.14, 1.03], x: [1.5, -1.5], y: [0, 0]},
  {id: 'map', kind: 'map', from: 32.95, to: 37.35, s: [1, 1], x: [0, 0], y: [0, 0]},
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
    <AbsoluteFill style={{background: '#e8ecea', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
          <rect width="1080" height="1920" fill="#eef1ee" />
          <path d="M -40 1500 Q 260 1430 470 1560 T 1120 1520 L 1120 1980 L -40 1980 Z" fill="#cfe0e8" />
          <ellipse cx="200" cy="620" rx="210" ry="150" fill="#dbe7d6" />
          <ellipse cx="900" cy="1180" rx="180" ry="140" fill="#dbe7d6" />
          {Array.from({length: 16}).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={120 * i + 60} x2="1080" y2={120 * i + 60} stroke="#dfe4e0" strokeWidth="3" />
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <line key={`v${i}`} x1={120 * i + 40} y1="0" x2={120 * i + 40} y2="1920" stroke="#dfe4e0" strokeWidth="3" />
          ))}
          <circle cx={CX} cy={CY} r="290" fill="none" stroke="#ffffff" strokeWidth="26" />
          <circle cx={CX} cy={CY} r="290" fill="none" stroke="#f4c95d" strokeWidth="16" />
          <circle cx={CX} cy={CY} r="560" fill="none" stroke="#ffffff" strokeWidth="24" />
          <circle cx={CX} cy={CY} r="560" fill="none" stroke="#f0d48a" strokeWidth="13" />
          {[-70, -20, 35, 110, 160, 215, 260, 310].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={CX + Math.cos(r) * 120}
                y1={CY + Math.sin(r) * 120}
                x2={CX + Math.cos(r) * 1200}
                y2={CY + Math.sin(r) * 1200}
                stroke="#ffffff"
                strokeWidth="18"
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
  // in over 8 frames from the mount, out over the 8 frames ending 40.4.
  const env = interpolate(f, [0, 8, G4C_DUR - 8, G4C_DUR], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drift = -(f / fps) * 12; // ~12px/s upward

  return (
    <>
      {/* 2 — scrim */}
      <AbsoluteFill style={{background: `rgba(12,27,46,${0.85 * env})`}} />

      {/* 3 — behind-graphics: 20% ceiling, slow drift. Texture, not
              competition — it must never pull the eye off the headline. */}
      <AbsoluteFill style={{opacity: 0.2 * env, overflow: 'hidden'}}>
        <BigNumeral top={470} left={-46} dy={drift} />
        <BigNumeral top={1160} left={238} dy={drift - 26} />
        <div style={{position: 'absolute', inset: 0, opacity: 0.75}}>
          <RoofSilhouette />
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

      {/* G4 — the behind-subject composite. It sits UNDER the two-zone scrim
          on purpose: the matted speaker has to take the same top/bottom
          darkening the base take takes, or he brightens the instant the
          layer mounts. */}
      <Sequence from={G4C_FROM} durationInFrames={G4C_DUR} layout="none">
        <G4Composite />
      </Sequence>

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
      <Hi2A t={t} frame={frame} fps={fps} from={G2[0]} to={G2[1]} lead="AS LOW AS" keyText="$98 A MONTH" />
      <Hi2A t={t} frame={frame} fps={fps} from={G3[0]} to={G3[1]} lead="NO PAYMENTS" keyText="FOR 12 MONTHS" keySize={88} />
      <Hi2A
        t={t}
        frame={frame}
        fps={fps}
        from={G4[0]}
        to={G4[1]}
        lead="WE'VE INSTALLED OVER"
        keyText="$50 MILLION"
        sub="OF ROOFS"
        leadSize={54}
        keySize={104}
      />

      <EndCard t={t} frame={frame} fps={fps} />

      {/* the hook — T1/T2/T3/T5 */}
      <HookSpectacle t={t} frame={frame} fps={fps} />

      {/* LAST in the tree on purpose — "captions on the bottom the entire
          time" means they stay readable even across the end-card takeover. */}
      <Captions t={t} />
    </AbsoluteFill>
  );
};
