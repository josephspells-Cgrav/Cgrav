import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, interpolate, spring} from 'remotion';

// ── TAKEOVER PLATES — Higgsfield bg clip full-frame + composited text ─────
// The composition law lives here: the AI clip carries ZERO text; every
// character is rendered by us on top. The talking-head take keeps playing
// underneath (its audio continues); the plate is a visual cutaway.

const F: React.CSSProperties = {fontFamily: '"Segoe UI","Arial",sans-serif'};
export const PLATE_HEAVY: React.CSSProperties = {
  ...F,
  fontWeight: 900,
  textShadow: '0 4px 0 rgba(0,0,0,0.55), 0 0 30px rgba(0,0,0,0.55), 0 14px 44px rgba(0,0,0,0.5)',
};

export const TakeoverPlate: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  clip: string; // file in public/
  children: React.ReactNode; // the composited text layer
  fadeSec?: number;
}> = ({t, frame, fps, from, to, clip, children, fadeSec = 0.35}) => {
  if (t < from || t > to + fadeSec) return null;
  const fadeIn = interpolate(t, [from, from + fadeSec], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(t, [to - fadeSec, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const alpha = Math.min(fadeIn, fadeOut);
  return (
    <AbsoluteFill style={{opacity: alpha, background: '#0c1b2e'}}>
      <OffthreadVideo
        src={staticFile(clip)}
        muted
        startFrom={0}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
      {/* subtle darkening so composited text always wins the contrast fight */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(6,12,20,0.12) 0%, rgba(6,12,20,0.42) 100%)'}} />
      {children}
    </AbsoluteFill>
  );
};

/** Big centered money line with spring-in, for use inside a TakeoverPlate. */
export const PlateText: React.FC<{
  frame: number;
  fps: number;
  from: number;
  lines: {text: React.ReactNode; size: number; color?: string; delay?: number}[];
  top?: string;
}> = ({frame, fps, from, lines, top = '38%'}) => {
  return (
    <div style={{position: 'absolute', top, left: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      {lines.map((l, i) => {
        const f0 = frame - Math.round(from * fps) - Math.round((l.delay ?? i * 0.18) * fps);
        const s = f0 > 0 ? spring({frame: f0, fps, config: {damping: 11, stiffness: 130}}) : 0;
        return (
          <div
            key={i}
            style={{
              ...PLATE_HEAVY,
              fontSize: l.size,
              lineHeight: 1.05,
              color: l.color ?? '#ffffff',
              textAlign: 'center',
              transform: `scale(${s})`,
              opacity: Math.min(1, s * 1.2),
            }}
          >
            {l.text}
          </div>
        );
      })}
    </div>
  );
};

/** Rolling dollar counter line for the $50M plate. */
export const PlateCounter: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  target: number;
  rollSec?: number;
  size?: number;
  color?: string;
}> = ({t, frame, fps, from, target, rollSec = 1.8, size = 130, color = '#30d158'}) => {
  const f0 = frame - Math.round(from * fps);
  const s = f0 > 0 ? spring({frame: f0, fps, config: {damping: 12, stiffness: 120}}) : 0;
  const p = interpolate(t, [from + 0.15, from + rollSec], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - p, 3);
  const val = Math.round(eased * target);
  return (
    <div style={{...PLATE_HEAVY, fontSize: size, color, textAlign: 'center', transform: `scale(${s})`, opacity: Math.min(1, s * 1.2), fontVariantNumeric: 'tabular-nums'}}>
      {'$' + val.toLocaleString('en-US')}
    </div>
  );
};
