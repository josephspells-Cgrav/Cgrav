import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import chunksData from '../public/take2-chunks.json';

// ── REAL BB v3 — the b-roll experiment, Joseph's pass 1 applied.
//
// CHANGES FROM v2 (his review, 08-14 11:30pm):
//  · cut 1 (cheap patch @2.6s) KILLED — "way too early, that's wrong".
//  · cut 2 → a DRONE shot of a whole house with a fresh roof.
//  · attic → an ENERGY BILL graphic that climbs through the summer.
//  · neighborhood aerial → a MAP with a pin dropping on Raleigh-Durham.
//  · ⭐ ALL TYPE MOVED TO THE TOP ZONE — captions and 2A graphics were landing
//    on his mouth/nose. He said it twice; it is the biggest note in the pass.
//  · every cut got longer. His note: "my words per minute is probably too fast
//    for the cuts... I'm not giving you enough time." So each image gets air,
//    and each one has to READ INSTANTLY — no detail-rich plates.
// KEPT EXACTLY AS HE LIKED THEM: old roof · curling shingles · the leak · the
// new roof. Same plates, same moves, only more time on each.

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const NAVY = '#0c1b2e';
const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';

// ── TWO ZONES, PERMANENTLY SPLIT (Joseph, 11:52pm) ────────────────────
// The word captions belong on the BOTTOM and run THE ENTIRE TIME. Only the
// 2A action graphics — the red-strip ones — go above his head. My earlier
// pass moved both up; only the middle-of-frame graphics were ever the
// problem. His hat brim sits at ~28%, so the graphics live above that and
// the captions live below his chin. Nothing ever crosses his face again.
const CAP_TOP = '72%'; // bottom third — the v1 value he already shipped with
const GFX_TOP = '5.5%'; // above the CROWN — at 8% the sub-line sat on his hat

type Chunk = {start: number; end: number; words: {t: string; s: number; e: number}[]};
const CHUNKS = chunksData as Chunk[];
const MONEY_RE = /\$|zero|down|payment|month|year|98|12|50|financ|million/i;

// the four graphic windows — captions yield inside them
const G1: [number, number] = [20.6, 24.4]; // ZERO DOWN FINANCING
const G2: [number, number] = [24.6, 27.2]; // AS LOW AS $98 A MONTH
const G3: [number, number] = [27.3, 30.9]; // NO PAYMENTS FOR 12 MONTHS
const G4: [number, number] = [37.4, 40.2]; // $50 MILLION
const CTA_T = 43.5; // end card takeover
const WINDOWS = [G1, G2, G3, G4];
const inGraphic = (t: number) => t >= CTA_T || WINDOWS.some(([a, b]) => t >= a && t < b);

// ══ THE CUT LIST ══════════════════════════════════════════════════════
type Cut = {
  id: string;
  src?: string;
  kind?: 'bill' | 'map';
  from: number;
  to: number;
  s: [number, number];
  x: [number, number];
  y: [number, number];
};

export const CUTS: Cut[] = [
  // 1 — "we offer the highest quality roof replacements" (5.48-7.80)
  {id: 'drone', src: 'br2-dronehouse.png', from: 5.50, to: 7.75, s: [1.11, 1.01], x: [0, 0], y: [-1, 1]},
  // 2 — "is over 15 years old" (9.80-11.24)   ✅ HE LIKED THIS
  {id: 'old', src: 'br3-oldroof.png', from: 9.80, to: 11.30, s: [1.12, 1.01], x: [0, 0], y: [-1.5, 1.5]},
  // ── SYMPTOM MONTAGE, contiguous 12.16 → 18.02 ──────────────────────
  // 3 — "curling shingles" (12.16-13.38)      ✅ HE LIKED THIS
  {id: 'curl', src: 'br4-curl.png', from: 12.16, to: 14.02, s: [1.01, 1.15], x: [2, -2], y: [0, 0]},
  // 4 — "some leaks" (14.02-15.38)            ✅ HE LIKED THIS
  {id: 'stain', src: 'br5-ceiling.png', from: 14.02, to: 15.55, s: [1.04, 1.12], x: [0, 0], y: [3, -1]},
  // 5 — "your energy bill keeps going up every single summer" (15.30-18.02)
  //     A GRAPHIC, not a photo — his call. Type in motion = the house style.
  {id: 'bill', kind: 'bill', from: 15.55, to: 18.02, s: [1, 1], x: [0, 0], y: [0, 0]},
  // 6 — "it's time for you to get a new roof" (18.30-19.88)  ✅ HE LIKED THIS
  //     Starts at 18.02, hard on the bill's out-point. It used to start at
  //     18.30, which left 0.28s of face flashing between the two cuts — the
  //     same flicker I killed inside the symptom montage and missed here.
  {id: 'new', src: 'br7-newroof.png', from: 18.02, to: 19.90, s: [1.14, 1.03], x: [1.5, -1.5], y: [0, 0]},
  // 7 — "veteran-owned and we operate right here locally in the Raleigh-Durham
  //     area" (32.70-36.94). Extended a full 2.0s (2.40s → 4.40s) on his call.
  //     Hard ceiling is 37.4 — the $50 MILLION graphic — so the extra time is
  //     taken on the front, opening under "veteran-owned and we".
  {id: 'map', kind: 'map', from: 32.95, to: 37.35, s: [1, 1], x: [0, 0], y: [0, 0]},
];

const activeCut = (t: number) => CUTS.find((c) => t >= c.from && t < c.to);

// ══ THE ENERGY BILL — it climbs through the summer ════════════════════
const BillGraphic: React.FC<{t: number; from: number; fps: number; frame: number}> = ({t, from, fps, frame}) => {
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
      {/* the trend arrow — says "up" before anyone reads a number */}
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
  // A slow continuous push so the map is never a still frame — the cut runs
  // 4.4s now and a static map would just be 2 more seconds of nothing.
  const push = 1 + 0.1 * p;
  const drop = spring({frame: f0 - 10, fps, config: {damping: 11, stiffness: 150}});
  const pinY = interpolate(drop, [0, 1], [-900, 0]);
  // three staggered pulses instead of one, spread across the longer cut
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
        {/* land + water + green space */}
        <rect width="1080" height="1920" fill="#eef1ee" />
        <path d="M -40 1500 Q 260 1430 470 1560 T 1120 1520 L 1120 1980 L -40 1980 Z" fill="#cfe0e8" />
        <ellipse cx="200" cy="620" rx="210" ry="150" fill="#dbe7d6" />
        <ellipse cx="900" cy="1180" rx="180" ry="140" fill="#dbe7d6" />
        {/* minor street grid */}
        {Array.from({length: 16}).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={120 * i + 60} x2="1080" y2={120 * i + 60} stroke="#dfe4e0" strokeWidth="3" />
        ))}
        {Array.from({length: 10}).map((_, i) => (
          <line key={`v${i}`} x1={120 * i + 40} y1="0" x2={120 * i + 40} y2="1920" stroke="#dfe4e0" strokeWidth="3" />
        ))}
        {/* the beltline + outer loop — reads as a mid-size Southern city */}
        <circle cx={CX} cy={CY} r="290" fill="none" stroke="#ffffff" strokeWidth="26" />
        <circle cx={CX} cy={CY} r="290" fill="none" stroke="#f4c95d" strokeWidth="16" />
        <circle cx={CX} cy={CY} r="560" fill="none" stroke="#ffffff" strokeWidth="24" />
        <circle cx={CX} cy={CY} r="560" fill="none" stroke="#f0d48a" strokeWidth="13" />
        {/* radiating highways */}
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
        {/* service ripples — three pulses across the longer cut */}
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

      {/* the pin */}
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

      {/* Composited label (never AI-rendered text) — BELOW the pin. It used to
          sit at the top and collided head-on with the word captions that now
          live there; one label per zone. */}
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

      {/* the map is the one LIGHT plate — the bottom captions need their own
          scrim here or white-on-pale disappears */}
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

  // 3-frame settle on entry — hides the cut seam the way a real edit does.
  const inFrames = (t - cut.from) * fps;
  const settle = interpolate(inFrames, [0, 3], [1.035, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <Img
        src={staticFile(cut.src as string)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${lerp(cut.s) * settle}) translate(${lerp(cut.x)}%, ${lerp(cut.y)}%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ══ captions — BOTTOM ZONE, running the ENTIRE time ═══════════════════
// No graphic-window suppression any more: the 2A graphics live up top, so
// the two layers can both be on screen without ever touching.
const Captions: React.FC<{t: number}> = ({t}) => {
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

// ══ 2A — the house highlighter, also moved up off his face ════════════
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
}> = ({t, frame, fps, from, to, lead, keyText, leadSize = 64, keySize = 92, sub}) => {
  if (t < from || t > to + 0.3) return null;
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
        <span style={{...H, fontSize: leadSize, color: WHITE, textShadow: SHADOW, textAlign: 'center', opacity: s}}>{lead}</span>
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
        <span style={{...H, position: 'relative', fontSize: keySize, color: WHITE, textShadow: SHADOW, textAlign: 'center'}}>{keyText}</span>
      </span>
      {sub ? (
        <span style={{...H, fontSize: 46, color: WHITE, textShadow: SHADOW, textAlign: 'center', opacity: grow}}>{sub}</span>
      ) : null}
    </div>
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
        <div style={{...H, fontSize: 84, color: WHITE, textAlign: 'center', lineHeight: 1.06, transform: `scale(${s1})`, textShadow: SHADOW}}>
          SCHEDULE YOUR
          <br />
          <span style={{position: 'relative', display: 'inline-block', padding: '0 10px'}}>
            <span style={{position: 'absolute', left: 0, top: '12%', height: '76%', width: `${Math.min(1, Math.max(0, (f0 - 14) / 14)) * 100}%`, background: RED, borderRadius: 8}} />
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
        <div style={{...H, fontSize: 32, color: '#cfd8e3', letterSpacing: 4, opacity: s2}}>MABREY ROOFING · RALEIGH-DURHAM</div>
      </div>
    </AbsoluteFill>
  );
};

// ══ composition ═══════════════════════════════════════════════════════
export const RealBBRoll: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const onGraphicCut = !!activeCut(t)?.kind;

  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* the face — audio lives here and never stops under a cut */}
      <OffthreadVideo src={staticFile('take2-cfr.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />

      <BRoll t={t} fps={fps} frame={frame} />

      {/* Two scrims, one per zone: the top protects the red-strip graphics
          against sky and trees, the bottom protects the captions. Off on full
          graphic cuts — those carry their own backgrounds. */}
      {onGraphicCut || t >= CTA_T ? null : (
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,.46) 0%, rgba(0,0,0,.22) 15%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 58%, rgba(0,0,0,.30) 74%, rgba(0,0,0,.62) 100%)',
          }}
        />
      )}

      {/* the four ordered graphics — 2A house style, TOP ZONE ONLY */}
      <Hi2A t={t} frame={frame} fps={fps} from={G1[0]} to={G1[1]} lead="WE OFFER" keyText="ZERO DOWN" sub="FINANCING" />
      <Hi2A t={t} frame={frame} fps={fps} from={G2[0]} to={G2[1]} lead="AS LOW AS" keyText="$98 A MONTH" />
      <Hi2A t={t} frame={frame} fps={fps} from={G3[0]} to={G3[1]} lead="NO PAYMENTS" keyText="FOR 12 MONTHS" keySize={88} />
      <Hi2A t={t} frame={frame} fps={fps} from={G4[0]} to={G4[1]} lead="WE'VE INSTALLED OVER" keyText="$50 MILLION" sub="OF ROOFS" leadSize={54} keySize={104} />

      <EndCard t={t} frame={frame} fps={fps} />

      {/* LAST in the tree on purpose — "captions on the bottom the entire
          time" means they stay readable even across the end-card takeover. */}
      <Captions t={t} />
    </AbsoluteFill>
  );
};
