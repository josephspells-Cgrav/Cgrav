import React from 'react';
import {interpolate, spring, Img, staticFile} from 'remotion';

// ── LITERAL SHINGLE GRAPHICS — two treatments of "curling shingles" ───
// B: real photo in a torn-edge polaroid-ish plate
// C: animated vector shingle whose tab physically peels up in the wind

const CHAR = '#2f3339';
const CHAR_DK = '#1d2126';
const CHAR_LT = '#464c54';
const UNDER = '#8a6a4a'; // exposed mat under a lifted tab
const WARN = '#ffb020';

// ══ C — ANIMATED VECTOR SHINGLE ═══════════════════════════════════════
export const CurlingShingleAnim: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  size?: number;
}> = ({t, frame, fps, from, to, size = 470}) => {
  if (t < from || t > to + 0.4) return null;
  const f0 = frame - Math.round(from * fps);
  const enter = spring({frame: f0, fps, config: {damping: 11, stiffness: 150}});
  const out = interpolate(t, [to, to + 0.35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const local = t - from;

  // curl rises, then breathes in the wind
  const lift = interpolate(local, [0.2, 1.15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wind = Math.sin(local * 2.5) * 0.5 + Math.sin(local * 5.3) * 0.2;
  const c = lift * (1 + wind * 0.2); // 0..~1.2

  // SIDE-PROFILE geometry — the curl is a silhouette, readable at any size
  const deckY = 150;
  const tipX = 232 - c * 34;
  const tipY = deckY - c * 96;
  const shingle = `M 40 ${deckY} L 150 ${deckY} C ${186 + c * 4} ${deckY - c * 8}, ${226 - c * 10} ${deckY - c * 46}, ${tipX} ${tipY}
                   L ${tipX - 20} ${tipY + 22} C ${212 - c * 12} ${deckY - c * 40}, ${180 + c * 2} ${deckY + 16}, 150 ${deckY + 20} L 40 ${deckY + 20} Z`;
  const pulse = 0.5 + 0.5 * Math.sin(local * 4.4);

  return (
    <div
      style={{
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${(0.7 + 0.3 * enter) * (1 - 0.18 * out)}) rotate(${-2.5 + wind * 1.4}deg)`,
        opacity: Math.min(1, enter * 1.3) * (1 - out),
      }}
    >
      <div
        style={{
          width: size,
          background: 'linear-gradient(180deg,#fdfdfe 0%,#e9eef4 100%)',
          borderRadius: 44,
          padding: '26px 22px 20px',
          boxShadow: '0 26px 60px rgba(0,0,0,0.6)',
          border: '6px solid #fff',
        }}
      >
        <svg width="100%" viewBox="0 0 300 210">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b636e" />
              <stop offset="100%" stopColor="#343a43" />
            </linearGradient>
          </defs>
          {/* sky band + deck */}
          <rect x="0" y="0" width="300" height="210" rx="22" fill="#dbe6f2" />
          <rect x="0" y={deckY + 20} width="300" height={210 - deckY - 20} fill="#b48a63" />
          <rect x="0" y={deckY + 20} width="300" height="7" fill="#8f6a49" />
          {/* flat healthy courses */}
          <rect x="0" y={deckY} width="150" height="20" fill="url(#sg)" />
          <rect x="0" y={deckY - 20} width="120" height="20" fill="url(#sg)" opacity="0.92" />
          <line x1="0" y1={deckY} x2="150" y2={deckY} stroke="#20252c" strokeWidth="2.5" />
          {/* THE CURL */}
          <path d={shingle} fill="url(#sg)" stroke="#20252c" strokeWidth="3" strokeLinejoin="round" />
          {/* gap shadow under the lifted tip */}
          <ellipse cx={tipX - 26} cy={deckY + 16} rx={26 + c * 16} ry={5 + c * 3} fill="#000" opacity={0.16 * c} />
          {/* wind ticks */}
          <g opacity={Math.min(1, c) * (0.3 + 0.7 * pulse)} stroke="#ffb020" strokeWidth="5" strokeLinecap="round">
            <line x1={tipX + 16} y1={tipY + 6} x2={tipX + 48} y2={tipY - 2} />
            <line x1={tipX + 16} y1={tipY + 30} x2={tipX + 40} y2={tipY + 24} />
          </g>
        </svg>
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontFamily: '"Segoe UI",Arial,sans-serif',
            fontWeight: 900,
            fontSize: 38,
            color: '#15171a',
            letterSpacing: 0.3,
          }}
        >
          CURLING <span style={{color: '#c8871a'}}>SHINGLES</span>
        </div>
      </div>
    </div>
  );
};

// ══ B — REAL PHOTO PLATE ══════════════════════════════════════════════
export const CurlingShinglePhoto: React.FC<{
  t: number;
  frame: number;
  fps: number;
  from: number;
  to: number;
  src?: string;
  size?: number;
}> = ({t, frame, fps, from, to, src = 'shingle.jpg', size = 520}) => {
  if (t < from || t > to + 0.4) return null;
  const f0 = frame - Math.round(from * fps);
  const enter = spring({frame: f0, fps, config: {damping: 13, stiffness: 160}});
  const out = interpolate(t, [to, to + 0.35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const local = t - from;
  const kb = 1 + local * 0.035; // slow ken-burns push
  const tilt = -3.5 + Math.sin(local * 1.4) * 0.9;

  return (
    <div
      style={{
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `translateY(${(1 - enter) * -70}px) scale(${(0.8 + 0.2 * enter) * (1 - 0.18 * out)}) rotate(${tilt}deg)`,
        opacity: Math.min(1, enter * 1.3) * (1 - out),
      }}
    >
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: 22,
          overflow: 'hidden',
          border: '10px solid #fff',
          boxShadow: '0 26px 60px rgba(0,0,0,0.62)',
        }}
      >
        <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${kb})`,
            }}
          />
        </div>
        {/* scanning reticle that snaps onto the curl */}
        <div
          style={{
            position: 'absolute',
            left: '18%',
            top: '30%',
            width: '46%',
            height: '38%',
            border: `5px solid ${WARN}`,
            borderRadius: 12,
            boxShadow: '0 0 0 3px rgba(0,0,0,.35), 0 0 24px rgba(255,176,32,.55)',
            opacity: interpolate(local, [0.45, 0.85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            transform: `scale(${interpolate(local, [0.45, 0.85], [1.35, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '46px 20px 16px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 70%)',
            fontFamily: '"Segoe UI",Arial,sans-serif',
            fontWeight: 900,
            fontSize: 38,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          CURLING <span style={{color: WARN}}>SHINGLES</span>
        </div>
      </div>
    </div>
  );
};
