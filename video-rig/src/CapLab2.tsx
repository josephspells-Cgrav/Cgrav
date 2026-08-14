import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, Sequence, spring, interpolate} from 'remotion';

// ── CAPTION LAB v2 — Joseph's picks (2 HIGHLIGHTER · 7 STRIKE+REPLACE ·
// 9 STACK BUILD), each shown in 3 dial settings so he can tune the feel.
// Type in motion only. No b-roll.

const FPS = 30;
const SEG = 4 * FPS;
const SEG_START = 21.5;

const WHITE = '#ffffff';
const GOLD = '#ffd60a';
const RED = '#cf2027';
const GREEN = '#30d158';
const NAVY = '#12283f';
const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';
const CENTER: React.CSSProperties = {position: 'absolute', top: '50%', left: 36, right: 36, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'};

const Label: React.FC<{code: string; name: string; note: string}> = ({code, name, note}) => (
  <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', fontFamily: F}}>
    <div style={{display: 'inline-block', background: 'rgba(8,14,22,.88)', border: '2px solid rgba(255,255,255,.2)', borderRadius: 14, padding: '10px 24px'}}>
      <div style={{fontWeight: 900, fontSize: 38, color: WHITE}}>{code} · {name}</div>
      <div style={{fontWeight: 700, fontSize: 21, color: '#9fb3c8', marginTop: 2}}>{note}</div>
    </div>
  </div>
);

const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <OffthreadVideo src={staticFile('take-cfr.mp4')} startFrom={Math.round(SEG_START * FPS)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    {children}
  </AbsoluteFill>
);

// ══ 2 · HIGHLIGHTER — sweep behind the key phrase ═════════════════════
const Highlighter: React.FC<{color: string; speed: number; skew: boolean; capSize?: number}> = ({color, speed, skew, capSize = 96}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 300}});
  const grow = interpolate(f, [10, 10 + speed], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{...CENTER, gap: 6}}>
      <span style={{...H, fontSize: 70, color: WHITE, textShadow: SHADOW, transform: `scale(${s})`}}>AS LOW AS</span>
      <span style={{position: 'relative', display: 'inline-block', padding: '0 10px'}}>
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: '16%',
            height: '70%',
            width: `${grow * 100}%`,
            background: color,
            borderRadius: 8,
            transform: skew ? 'skewX(-8deg)' : 'none',
            boxShadow: `0 0 26px ${color}66`,
          }}
        />
        <span style={{...H, position: 'relative', fontSize: capSize, color: WHITE, textShadow: SHADOW}}>$98 A MONTH</span>
      </span>
    </div>
  );
};

// ══ 7 · STRIKE + REPLACE ══════════════════════════════════════════════
const StrikeReplace: React.FC<{
  killText: string;
  newText: string;
  strikeAngle: number;
  dropOut: boolean;
}> = ({killText, newText, strikeAngle, dropOut}) => {
  const f = useCurrentFrame();
  const appear = spring({frame: f, fps: FPS, config: {damping: 13, stiffness: 260}});
  const strike = interpolate(f, [14, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const swap = spring({frame: f - 30, fps: FPS, config: {damping: 11, stiffness: 200}});
  const killY = dropOut ? swap * 90 : 0;
  const killOpacity = dropOut ? 1 - swap : 1 - swap * 0.55;
  return (
    <div style={{...CENTER, gap: 14}}>
      <div style={{position: 'relative', opacity: killOpacity, transform: `translateY(${killY}px) scale(${appear})`}}>
        <span style={{...H, fontSize: 84, color: '#b8c6d6', textShadow: SHADOW}}>{killText}</span>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: -8,
            height: 11,
            width: `${strike * 104}%`,
            background: RED,
            borderRadius: 6,
            transform: `rotate(${strikeAngle}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 18px rgba(207,32,39,.7)',
          }}
        />
      </div>
      <span style={{...H, fontSize: 124, color: GREEN, textShadow: SHADOW, transform: `scale(${swap})`, opacity: swap}}>{newText}</span>
    </div>
  );
};

// ══ 9 · STACK BUILD ═══════════════════════════════════════════════════
const StackBuild: React.FC<{
  rows: {t: string; c: string}[];
  fromSide: 'left' | 'up';
  chip: boolean;
  stagger: number;
}> = ({rows, fromSide, chip, stagger}) => {
  const f = useCurrentFrame();
  return (
    <div style={{...CENTER, gap: 14}}>
      {rows.map((r, i) => {
        const s = spring({frame: f - i * stagger, fps: FPS, config: {damping: 12, stiffness: 210}});
        const enter = fromSide === 'left' ? `translateX(${(1 - s) * -460}px)` : `translateY(${(1 - s) * 90}px)`;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transform: `${enter} scale(${chip ? 0.9 + 0.1 * s : 1})`,
              opacity: s,
              ...(chip
                ? {background: 'rgba(10,18,30,.82)', border: `3px solid ${r.c}`, borderRadius: 999, padding: '10px 26px'}
                : {}),
            }}
          >
            <span style={{...H, fontSize: 44, color: GREEN, textShadow: SHADOW}}>✓</span>
            <span style={{...H, fontSize: 58, color: r.c, textShadow: SHADOW}}>{r.t}</span>
          </div>
        );
      })}
    </div>
  );
};

const OFFER_ROWS = [
  {t: 'ZERO DOWN', c: WHITE},
  {t: '$98 A MONTH', c: GOLD},
  {t: 'NO PAYMENTS FOR 12 MONTHS', c: GREEN},
];

const VARIANTS: {code: string; name: string; note: string; C: React.FC}[] = [
  {code: '2A', name: 'HIGHLIGHTER', note: 'brand red · fast sweep · straight', C: () => <Highlighter color={RED} speed={14} skew={false} />},
  {code: '2B', name: 'HIGHLIGHTER', note: 'gold · slower sweep · marker skew', C: () => <Highlighter color="#e8a900" speed={22} skew />},
  {code: '2C', name: 'HIGHLIGHTER', note: 'navy block · fast · bigger type', C: () => <Highlighter color={NAVY} speed={13} skew capSize={110} />},

  {code: '7A', name: 'STRIKE + REPLACE', note: '$20,000 up front → $98/mo · flat strike', C: () => <StrikeReplace killText="$20,000 UP FRONT" newText="$98/MO" strikeAngle={0} dropOut={false} />},
  {code: '7B', name: 'STRIKE + REPLACE', note: 'angled strike · killed line drops away', C: () => <StrikeReplace killText="$20,000 UP FRONT" newText="$98/MO" strikeAngle={-4} dropOut />},
  {code: '7C', name: 'STRIKE + REPLACE', note: 'objection wording · "PAY ALL AT ONCE"', C: () => <StrikeReplace killText="PAY ALL AT ONCE" newText="$0 DOWN" strikeAngle={-3} dropOut />},

  {code: '9A', name: 'STACK BUILD', note: 'slides from left · plain rows', C: () => <StackBuild rows={OFFER_ROWS} fromSide="left" chip={false} stagger={12} />},
  {code: '9B', name: 'STACK BUILD', note: 'rises up · outlined chips', C: () => <StackBuild rows={OFFER_ROWS} fromSide="up" chip stagger={12} />},
  {code: '9C', name: 'STACK BUILD', note: 'chips · slower stagger (holds longer)', C: () => <StackBuild rows={OFFER_ROWS} fromSide="up" chip stagger={20} />},
];

export const CapLab2: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {VARIANTS.map((v, i) => (
      <Sequence key={v.code} from={i * SEG} durationInFrames={SEG}>
        <Stage>
          <v.C />
          <Label code={v.code} name={v.name} note={v.note} />
        </Stage>
      </Sequence>
    ))}
  </AbsoluteFill>
);
