import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, Sequence, spring, interpolate} from 'remotion';

// ── CAPTION LAB — 10 numbered treatments of the SAME line, over the SAME
// footage, so Joseph can point at a number instead of hunting for words.
// Everything here is TYPE IN MOTION. No b-roll, no generated footage.

const FPS = 30;
const SEG = 4 * FPS; // 4s per treatment
const SEG_START = 21.5; // "...start as low as 98 dollars a month"

const WHITE = '#ffffff';
const GOLD = '#ffd60a';
const RED = '#cf2027';
const GREEN = '#30d158';
const NAVY = '#12283f';

const F = '"Segoe UI","Arial Black",Arial,sans-serif';
const H: React.CSSProperties = {fontFamily: F, fontWeight: 900, letterSpacing: '-0.5px'};
const SHADOW = '0 4px 0 rgba(0,0,0,.75), 0 0 26px rgba(0,0,0,.6)';

const Label: React.FC<{n: number; name: string; note: string}> = ({n, name, note}) => (
  <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', fontFamily: F}}>
    <div style={{display: 'inline-block', background: 'rgba(8,14,22,.88)', border: '2px solid rgba(255,255,255,.2)', borderRadius: 14, padding: '10px 24px'}}>
      <div style={{fontWeight: 900, fontSize: 38, color: WHITE}}>{n}. {name}</div>
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

const CENTER: React.CSSProperties = {position: 'absolute', top: '52%', left: 40, right: 40, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 14};

// 1 — WORD POP (baseline, what we have)
const T1: React.FC = () => {
  const f = useCurrentFrame();
  const words = ['AS', 'LOW', 'AS', '$98', 'A', 'MONTH'];
  const per = 9;
  return (
    <div style={CENTER}>
      {words.map((w, i) => {
        const s = spring({frame: f - i * per, fps: FPS, config: {damping: 14, stiffness: 400}});
        return <span key={i} style={{...H, fontSize: 82, color: w.startsWith('$') ? GOLD : WHITE, textShadow: SHADOW, transform: `scale(${s})`, opacity: s}}>{w}</span>;
      })}
    </div>
  );
};

// 2 — HIGHLIGHTER SWEEP (the marker fills behind the key words)
const T2: React.FC = () => {
  const f = useCurrentFrame();
  const grow = interpolate(f, [14, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 300}});
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 4}}>
      <span style={{...H, fontSize: 74, color: WHITE, textShadow: SHADOW, transform: `scale(${s})`}}>AS LOW AS</span>
      <span style={{position: 'relative', display: 'inline-block'}}>
        <span style={{position: 'absolute', left: -14, top: 14, height: '72%', width: `${grow * 100}%`, background: RED, borderRadius: 6, transformOrigin: 'left'}} />
        <span style={{...H, position: 'relative', fontSize: 96, color: WHITE, textShadow: SHADOW}}>$98 A MONTH</span>
      </span>
    </div>
  );
};

// 3 — BOXED / BADGE (key phrase in a solid slab that snaps in)
const T3: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: FPS, config: {damping: 11, stiffness: 200}});
  const s2 = spring({frame: f - 10, fps: FPS, config: {damping: 9, stiffness: 180}});
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 12}}>
      <span style={{...H, fontSize: 66, color: WHITE, textShadow: SHADOW, opacity: s}}>AS LOW AS</span>
      <span style={{...H, fontSize: 104, color: NAVY, background: GOLD, padding: '10px 30px', borderRadius: 14, transform: `scale(${s2}) rotate(-2deg)`, boxShadow: '0 14px 40px rgba(0,0,0,.5)'}}>$98/MO</span>
    </div>
  );
};

// 4 — COUNT-UP (the number rolls to its value)
const T4: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const v = Math.round((1 - Math.pow(1 - p, 3)) * 98);
  const s = spring({frame: f, fps: FPS, config: {damping: 12, stiffness: 160}});
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 2}}>
      <span style={{...H, fontSize: 62, color: WHITE, textShadow: SHADOW, opacity: s}}>AS LOW AS</span>
      <span style={{...H, fontSize: 150, color: GREEN, textShadow: SHADOW, fontVariantNumeric: 'tabular-nums', transform: `scale(${s})`}}>${v}</span>
      <span style={{...H, fontSize: 54, color: WHITE, textShadow: SHADOW, opacity: interpolate(f, [34, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>A MONTH</span>
    </div>
  );
};

// 5 — SCALE PUNCH (the money word slams huge, rest stays small)
const T5: React.FC = () => {
  const f = useCurrentFrame();
  const hit = spring({frame: f - 12, fps: FPS, config: {damping: 8, stiffness: 260}});
  const shake = f > 12 && f < 22 ? Math.sin(f * 2.4) * (1 - (f - 12) / 10) * 8 : 0;
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 0}}>
      <span style={{...H, fontSize: 58, color: WHITE, textShadow: SHADOW, opacity: spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 300}})}}>AS LOW AS</span>
      <span style={{...H, fontSize: 168, color: GOLD, textShadow: SHADOW, transform: `scale(${0.3 + hit * 0.7}) translateX(${shake}px)`}}>$98</span>
      <span style={{...H, fontSize: 58, color: WHITE, textShadow: SHADOW, opacity: hit}}>A MONTH</span>
    </div>
  );
};

// 6 — UNDERLINE DRAW (hand-drawn stroke sweeps under the phrase)
const T6: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: FPS, config: {damping: 14, stiffness: 300}});
  const draw = interpolate(f, [16, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 6}}>
      <span style={{...H, fontSize: 78, color: WHITE, textShadow: SHADOW, transform: `scale(${s})`}}>AS LOW AS</span>
      <div style={{position: 'relative'}}>
        <span style={{...H, fontSize: 104, color: GOLD, textShadow: SHADOW}}>$98 A MONTH</span>
        <svg width="100%" height="34" viewBox="0 0 600 34" style={{position: 'absolute', left: 0, bottom: -18}}>
          <path d="M8 20 C 160 6, 420 6, 592 18" fill="none" stroke={RED} strokeWidth="12" strokeLinecap="round"
            strokeDasharray="600" strokeDashoffset={600 * (1 - draw)} />
        </svg>
      </div>
    </div>
  );
};

// 7 — STRIKE + REPLACE (kill the objection, show the real number)
const T7: React.FC = () => {
  const f = useCurrentFrame();
  const strike = interpolate(f, [16, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const swap = spring({frame: f - 30, fps: FPS, config: {damping: 11, stiffness: 200}});
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 10}}>
      <div style={{position: 'relative', opacity: 1 - swap * 0.55}}>
        <span style={{...H, fontSize: 92, color: '#9fb3c8', textShadow: SHADOW}}>$20,000 UP FRONT</span>
        <div style={{position: 'absolute', top: '52%', left: 0, height: 10, width: `${strike * 100}%`, background: RED, borderRadius: 5}} />
      </div>
      <span style={{...H, fontSize: 118, color: GREEN, textShadow: SHADOW, transform: `scale(${swap})`, opacity: swap}}>$98/MO</span>
    </div>
  );
};

// 8 — TYPEWRITER + CURSOR
const T8: React.FC = () => {
  const f = useCurrentFrame();
  const full = 'AS LOW AS $98 A MONTH';
  const n = Math.min(full.length, Math.floor(interpolate(f, [4, 42], [0, full.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
  const shown = full.slice(0, n);
  const blink = Math.floor(f / 8) % 2 === 0;
  return (
    <div style={CENTER}>
      <span style={{...H, fontSize: 84, color: WHITE, textShadow: SHADOW, textAlign: 'center'}}>
        {shown.split('$').map((part, i) => (i === 0 ? part : <span key={i} style={{color: GOLD}}>${part}</span>))}
        {blink ? <span style={{color: RED}}>|</span> : null}
      </span>
    </div>
  );
};

// 9 — STACK BUILD (lines stack up and stay — the offer accumulates)
const T9: React.FC = () => {
  const f = useCurrentFrame();
  const rows = [
    {t: 'ZERO DOWN', c: WHITE},
    {t: '$98 A MONTH', c: GOLD},
    {t: 'NO PAYMENTS FOR 12 MONTHS', c: GREEN},
  ];
  return (
    <div style={{...CENTER, flexDirection: 'column', gap: 12}}>
      {rows.map((r, i) => {
        const s = spring({frame: f - i * 12, fps: FPS, config: {damping: 12, stiffness: 200}});
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, transform: `translateX(${(1 - s) * -420}px)`, opacity: s}}>
            <span style={{...H, fontSize: 46, color: GREEN}}>✓</span>
            <span style={{...H, fontSize: i === 2 ? 56 : 72, color: r.c, textShadow: SHADOW}}>{r.t}</span>
          </div>
        );
      })}
    </div>
  );
};

// 10 — KARAOKE BAR (bottom bar, active word fills — TikTok native)
const T10: React.FC = () => {
  const f = useCurrentFrame();
  const words = ['AS', 'LOW', 'AS', '$98', 'A', 'MONTH'];
  const active = Math.floor(f / 9);
  return (
    <div style={{position: 'absolute', bottom: '18%', left: 30, right: 30}}>
      <div style={{background: 'rgba(10,18,30,.82)', borderRadius: 20, padding: '20px 26px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12}}>
        {words.map((w, i) => (
          <span key={i} style={{...H, fontSize: 68, color: i === active ? GOLD : i < active ? WHITE : 'rgba(255,255,255,.42)', transform: i === active ? 'scale(1.08)' : 'scale(1)'}}>{w}</span>
        ))}
      </div>
    </div>
  );
};

const TREATMENTS: {n: number; name: string; note: string; C: React.FC}[] = [
  {n: 1, name: 'WORD POP', note: 'baseline — one word at a time', C: T1},
  {n: 2, name: 'HIGHLIGHTER', note: 'marker sweeps behind the key phrase', C: T2},
  {n: 3, name: 'BADGE SLAB', note: 'number snaps into a solid block', C: T3},
  {n: 4, name: 'COUNT-UP', note: 'the number rolls to its value', C: T4},
  {n: 5, name: 'SCALE PUNCH', note: 'money word slams huge + shakes', C: T5},
  {n: 6, name: 'UNDERLINE DRAW', note: 'hand-drawn stroke sweeps under', C: T6},
  {n: 7, name: 'STRIKE + REPLACE', note: 'kill the objection, show the real price', C: T7},
  {n: 8, name: 'TYPEWRITER', note: 'types out with a blinking cursor', C: T8},
  {n: 9, name: 'STACK BUILD', note: 'offer accumulates line by line', C: T9},
  {n: 10, name: 'KARAOKE BAR', note: 'bottom bar, active word lit', C: T10},
];

export const CapLab: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {TREATMENTS.map((t, i) => (
      <Sequence key={t.n} from={i * SEG} durationInFrames={SEG}>
        <Stage>
          <t.C />
          <Label n={t.n} name={t.name} note={t.note} />
        </Stage>
      </Sequence>
    ))}
  </AbsoluteFill>
);
