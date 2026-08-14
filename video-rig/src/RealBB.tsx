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
import chunksData from '../public/take2-chunks.json';

// ── REAL BB v1 — Joseph's outdoor take (2897.mp4, 45.8s, beats 1-5+7).
// House style: 2A HIGHLIGHTER (brand red, fast sweep, straight) at the four
// ordered moments. Captions everywhere else. End card = the liked v2.1 close.

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';

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

// ══ captions (v2.1 style — bottom third, active word red, money gold) ══
const Captions: React.FC<{t: number}> = ({t}) => {
  if (inGraphic(t)) return null;
  const chunk = CHUNKS.find((c) => t >= c.start && t < c.end);
  if (!chunk) return null;
  const appear = Math.min(1, (t - chunk.start) / 0.1);
  return (
    <div
      style={{
        position: 'absolute',
        top: '72%',
        left: 36,
        right: 36,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 16,
        rowGap: 2,
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
        top: '46%',
        left: 34,
        right: 34,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
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
export const RealBB: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{background: '#000'}}>
      <OffthreadVideo src={staticFile('take2-cfr.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />

      <Captions t={t} />

      {/* the four ordered graphics — 2A house style */}
      <Hi2A t={t} frame={frame} fps={fps} from={G1[0]} to={G1[1]} lead="WE OFFER" keyText="ZERO DOWN" sub="FINANCING" />
      <Hi2A t={t} frame={frame} fps={fps} from={G2[0]} to={G2[1]} lead="AS LOW AS" keyText="$98 A MONTH" />
      <Hi2A t={t} frame={frame} fps={fps} from={G3[0]} to={G3[1]} lead="NO PAYMENTS" keyText="FOR 12 MONTHS" keySize={88} />
      <Hi2A t={t} frame={frame} fps={fps} from={G4[0]} to={G4[1]} lead="WE'VE INSTALLED OVER" keyText="$50 MILLION" sub="OF ROOFS" leadSize={54} keySize={104} />

      <EndCard t={t} frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
