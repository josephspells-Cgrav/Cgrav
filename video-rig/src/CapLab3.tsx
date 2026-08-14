import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, Sequence, spring, interpolate} from 'remotion';

// ── CAPTION LAB v3 — 2A IS THE HOUSE STYLE. Does it carry a whole ad?
// Six real script lines in the surviving treatment (brand red, fast sweep,
// straight edge), then ONE honest rebuild each of strike + stack at proper
// scale (v2 shrank them; that's why they died).

const FPS = 30;
const SEG = 4 * FPS;

const WHITE = '#ffffff';
const RED = '#cf2027';
const GREEN = '#30d158';
const GOLD = '#ffd60a';
const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';
const CENTER: React.CSSProperties = {
  position: 'absolute', top: '48%', left: 34, right: 34,
  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
};

const Label: React.FC<{code: string; note: string}> = ({code, note}) => (
  <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', fontFamily: F}}>
    <div style={{display: 'inline-block', background: 'rgba(8,14,22,.88)', border: '2px solid rgba(255,255,255,.2)', borderRadius: 14, padding: '9px 22px'}}>
      <div style={{fontWeight: 900, fontSize: 34, color: WHITE}}>{code}</div>
      <div style={{fontWeight: 700, fontSize: 20, color: '#9fb3c8', marginTop: 2}}>{note}</div>
    </div>
  </div>
);

const Stage: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <OffthreadVideo src={staticFile('take-cfr.mp4')} startFrom={Math.round(at * FPS)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    {children}
  </AbsoluteFill>
);

/** THE HOUSE STYLE — 2A. Lead line plain, key phrase gets the red sweep. */
const Hi: React.FC<{lead?: string; key1: string; leadSize?: number; keySize?: number}> = ({
  lead, key1, leadSize = 68, keySize = 96,
}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 300}});
  const grow = interpolate(f, [10, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{...CENTER, gap: 8}}>
      {lead ? (
        <span style={{...H, fontSize: leadSize, color: WHITE, textShadow: SHADOW, transform: `scale(${s})`, textAlign: 'center'}}>{lead}</span>
      ) : null}
      <span style={{position: 'relative', display: 'inline-block', padding: '0 12px'}}>
        <span style={{position: 'absolute', left: 0, top: '15%', height: '72%', width: `${grow * 100}%`, background: RED, borderRadius: 8, boxShadow: `0 0 26px ${RED}55`}} />
        <span style={{...H, position: 'relative', fontSize: keySize, color: WHITE, textShadow: SHADOW, textAlign: 'center'}}>{key1}</span>
      </span>
    </div>
  );
};

/** REBUILD of 7 at v1 scale — killed line stays BOLD and readable. */
const Strike: React.FC = () => {
  const f = useCurrentFrame();
  const appear = spring({frame: f, fps: FPS, config: {damping: 13, stiffness: 240}});
  const strike = interpolate(f, [16, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const swap = spring({frame: f - 34, fps: FPS, config: {damping: 11, stiffness: 190}});
  return (
    <div style={{...CENTER, gap: 18}}>
      <div style={{position: 'relative', transform: `scale(${appear})`, opacity: 1 - swap * 0.3}}>
        <span style={{...H, fontSize: 96, color: WHITE, textShadow: SHADOW}}>$20,000 UP FRONT</span>
        <div style={{position: 'absolute', top: '48%', left: -10, height: 14, width: `${strike * 105}%`, background: RED, borderRadius: 7, boxShadow: `0 0 22px ${RED}aa`}} />
      </div>
      <span style={{...H, fontSize: 134, color: GREEN, textShadow: SHADOW, transform: `scale(${swap})`, opacity: swap}}>$98/MO</span>
    </div>
  );
};

/** REBUILD of 9 at v1 scale — big rows, no wrapping. */
const Stack: React.FC = () => {
  const f = useCurrentFrame();
  const rows = [
    {t: 'ZERO DOWN', c: WHITE, size: 76},
    {t: '$98 A MONTH', c: GOLD, size: 76},
    {t: 'NO PAYMENTS · 12 MONTHS', c: GREEN, size: 60},
  ];
  return (
    <div style={{...CENTER, gap: 16}}>
      {rows.map((r, i) => {
        const s = spring({frame: f - i * 13, fps: FPS, config: {damping: 12, stiffness: 200}});
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, transform: `translateX(${(1 - s) * -460}px)`, opacity: s, whiteSpace: 'nowrap'}}>
            <span style={{...H, fontSize: 50, color: GREEN, textShadow: SHADOW}}>✓</span>
            <span style={{...H, fontSize: r.size, color: r.c, textShadow: SHADOW}}>{r.t}</span>
          </div>
        );
      })}
    </div>
  );
};

const SHOTS: {code: string; note: string; at: number; C: React.FC}[] = [
  {code: 'HOOK', note: 'the house style on the opener', at: 0.8, C: () => <Hi lead="DON'T OVERPAY" key1="FOR YOUR ROOF" />},
  {code: 'SYMPTOM', note: 'on a qualifier line', at: 11.5, C: () => <Hi lead="STARTING TO SEE" key1="CURLING SHINGLES" keySize={86} />},
  {code: 'PRICE', note: 'the money line', at: 21.5, C: () => <Hi lead="AS LOW AS" key1="$98 A MONTH" />},
  {code: '12 MONTHS', note: 'the deferral', at: 26.5, C: () => <Hi lead="NO PAYMENTS FOR" key1="AN ENTIRE YEAR" keySize={88} />},
  {code: 'PROOF', note: 'the credibility line', at: 37.5, C: () => <Hi lead="OVER" key1="$50 MILLION" leadSize={58} keySize={104} />},
  {code: 'CTA', note: 'the close', at: 54.5, C: () => <Hi lead="SCHEDULE YOUR" key1="FREE QUOTE" />},
  {code: '7-REBUILT', note: 'strike at v1 scale — killed line stays bold', at: 21.5, C: Strike},
  {code: '9-REBUILT', note: 'stack at v1 scale — no wrapping', at: 18.5, C: Stack},
];

export const CapLab3: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map((s, i) => (
      <Sequence key={s.code} from={i * SEG} durationInFrames={SEG}>
        <Stage at={s.at}>
          <s.C />
          <Label code={s.code} note={s.note} />
        </Stage>
      </Sequence>
    ))}
  </AbsoluteFill>
);
