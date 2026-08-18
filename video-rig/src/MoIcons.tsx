/**
 * MoIcons — the animated icon layer for the navy motion-graphics system
 * ─────────────────────────────────────────────────────────────────────────
 * Joseph, 2026-08-16 8:18pm: "when I say motion graphic you need a visual
 * motion graphic that's not text on every single section... little favicon
 * animations that would fit the color palette."
 *
 * So: hand-drawn SVG, animated with spring/interpolate, one per beat, sitting
 * ABOVE the type. No AI generation, no stock, no external assets — these are
 * drawn in code, which means they re-render at any size for any future ad and
 * can never garble the way generated art does (the standing law: composited
 * type/vector, never AI-rendered).
 *
 * House style: 200-unit viewBox, round caps/joins, stroke ~8, WHITE lines with
 * RED fills as the accent. Every icon takes `p` = 0..1 local progress so the
 * caller controls timing, plus `loop` seconds for idle motion. Nothing is ever
 * static — the ad breathes even when a beat holds.
 *
 * Each export is used by MoGraph01. Reuse freely; this is factory inventory.
 */
import React from 'react';
import {interpolate, spring} from 'remotion';

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const STEEL = '#8fa6c0';
const NAVY = '#0c1b2e'; // used for negative-space cut-outs (fingers, windows)

type IconProps = {
  /** 0..1 build progress for the icon's entrance/draw */
  p: number;
  /** seconds elapsed inside the beat — drives idle loops */
  t: number;
  fps: number;
  /** frames elapsed inside the beat — drives springs */
  f: number;
  size?: number;
};

const svgBase = (size: number): React.CSSProperties => ({
  width: size,
  height: size,
  overflow: 'visible',
  display: 'block',
});

/** stroke-draw helper: returns dasharray/offset for a path of length L */
const draw = (L: number, p: number) => ({
  strokeDasharray: L,
  strokeDashoffset: L * (1 - Math.max(0, Math.min(1, p))),
});

// ══ 1. HOUSE + NEW ROOF — the hook beat ═══════════════════════════════
// REDRAWN 2026-08-16. The first version put a stick-figure "worker" on the
// roof: head-circle + line-body + a gold rect that read as a flag on a pole,
// with the body clipping through the roof plane. Stick figures do not survive
// icon scale. The worker idea moved to IconHammers (where the work belongs);
// this beat is now just the ASSET — a bold house whose roof lands red.
export const IconHouse: React.FC<IconProps> = ({p, t, size = 340}) => {
  const roof = interpolate(p, [0, 0.5], [0, 1], {extrapolateRight: 'clamp'});
  const body = interpolate(p, [0.12, 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const courses = interpolate(p, [0.55, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breathe = 1 + 0.012 * Math.sin(t * 2.4);
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      <defs>
        <clipPath id="roofClip">
          <path d="M18 104 L100 40 L182 104 Z" />
        </clipPath>
      </defs>
      <g style={{transformOrigin: '100px 110px', transform: `scale(${breathe})`}}>
        {/* BODY — filled block, strong silhouette */}
        <g opacity={body} style={{transformOrigin: '100px 168px', transform: `scaleY(${0.5 + 0.5 * body})`}}>
          <rect x={44} y={104} width={112} height={64} rx={5} fill={WHITE} />
          {/* door + window punched out in navy so the block reads as a house */}
          <rect x={88} y={128} width={26} height={40} rx={3} fill={NAVY} />
          <rect x={58} y={120} width={22} height={20} rx={3} fill={NAVY} />
          <rect x={124} y={120} width={22} height={20} rx={3} fill={NAVY} />
        </g>
        {/* ROOF — the hero, lands red and heavy */}
        <g
          opacity={roof}
          style={{transformOrigin: '100px 104px', transform: `translateY(${(1 - roof) * -30}px)`}}
        >
          <path d="M18 104 L100 40 L182 104 Z" fill={RED} />
          {/* shingle courses, CLIPPED to the roof so nothing pokes out */}
          <g clipPath="url(#roofClip)" opacity={courses * 0.28}>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M10 ${62 + i * 15} L190 ${62 + i * 15}`}
                stroke={WHITE}
                strokeWidth={5}
              />
            ))}
          </g>
          {/* eave line grounds the roof on the body */}
          <path d="M12 104 L188 104" stroke={WHITE} strokeWidth={9} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

// ══ 2. THE $0 PRICE TAG — the "to get started" beat ══════════════════
// REPLACED 2026-08-16 after the handshake went 0-for-3 in blind audits
// (read as: a bar · a bow tie · a battery between blocks). AUDIT.md's own
// rule applied: when a figurative icon keeps losing to competing archetypes,
// use a shape that has none. A price tag is unmistakable at any size, and it
// carries this beat's literal message — the price to get started is $0.
// (If Joseph wants the handshake back it needs real sculpt time, not a 4th guess.)
export const IconHandshake: React.FC<IconProps> = ({p, t, f, fps, size = 340}) => {
  const inP = spring({frame: f - 2, fps, config: {damping: 12, stiffness: 150}});
  const text = spring({frame: f - Math.round(0.35 * fps), fps, config: {damping: 11, stiffness: 180}});
  const sway = Math.sin(t * 2.6) * 4 * Math.min(1, inP);
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      <g style={{transformOrigin: '100px 30px', transform: `rotate(${-8 + sway}deg)`}}>
        {/* string loop from the hang point down to the tag */}
        <path
          d="M100 26 Q118 34 112 52"
          fill="none"
          stroke={STEEL}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={inP}
        />
        <circle cx={100} cy={24} r={7} fill="none" stroke={STEEL} strokeWidth={6} opacity={inP} />
        {/* the tag — rounded, angled, red, with the punched hole */}
        <g
          opacity={inP}
          style={{transformOrigin: '104px 108px', transform: `scale(${0.7 + 0.3 * Math.min(1, inP)}) rotate(24deg)`}}
        >
          <rect x={44} y={62} width={120} height={92} rx={16} fill={RED} />
          {/* punched hole, navy negative space */}
          <circle cx={64} cy={82} r={9} fill={NAVY} />
          {/* $0 — composited type, the beat's literal message */}
          <text
            x={112}
            y={126}
            textAnchor="middle"
            style={{
              fontFamily: '"Arial Black", Arial, sans-serif',
              fontWeight: 900,
              fontSize: 54,
              fill: WHITE,
              opacity: Math.min(1, text),
            }}
          >
            $0
          </text>
        </g>
      </g>
    </svg>
  );
};

// ══ 3. HAMMER + NAIL — the $98 beat ═══════════════════════════════════
// v5, 2026-08-16. The four failed reads (lollipop, paw, broom, squeegee) all
// shared two sins the fix removes: (1) A BIG WHITE SLAB under the tool — every
// round the auditor decided the tool was holding/sweeping that slab; the slab
// is gone. (2) Clutter at the head joint (face patches, collars, separate
// claw parts). v5 is ONE pre-rotated group; inside it everything is
// axis-aligned; the head is a single capsule whose claw is a notch cut into
// its own outline. Emoji-canonical 45 degrees, nail beneath, nothing else.
export const IconHammers: React.FC<IconProps> = ({p, t, size = 340}) => {
  const hammerIn = interpolate(p, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'});
  const nailP = interpolate(p, [0.2, 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cyc = (t * 1.5) % 1;
  const lift = cyc < 0.45 ? interpolate(cyc, [0, 0.45], [26, 0]) : interpolate(cyc, [0.45, 1], [0, 26]);
  const struck = cyc >= 0.43 && cyc <= 0.55;
  const sink = nailP * (3 + 4 * Math.floor((t * 1.5) % 3));
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      {/* THE NAIL — head bar + shaft, being driven downward */}
      <g opacity={nailP} style={{transform: `translateY(${sink}px)`}}>
        <rect x={86} y={128} width={28} height={8} rx={4} fill={WHITE} />
        <rect x={97} y={136} width={6} height={24} fill={WHITE} />
        <path d="M96 160 L104 160 L100 172 Z" fill={WHITE} />
      </g>
      {/* THE HAMMER — one group, rotated 45deg, lifting and striking */}
      <g
        opacity={hammerIn}
        style={{
          transformOrigin: '100px 100px',
          transform: `translate(${lift * 0.6}px, ${-lift}px) rotate(45deg)`,
        }}
      >
        {/* handle — long, thinner than the head, gold wood */}
        <rect x={93} y={52} width={15} height={92} rx={7} fill={GOLD} />
        {/* head — ONE capsule with the claw notch cut into its silhouette */}
        <path
          d="M60 30
             L124 30
             Q140 30 140 44
             L140 46
             L128 40
             L132 56
             Q128 58 122 58
             L60 58
             Q46 58 46 44
             Q46 30 60 30 Z"
          fill={STEEL}
        />
        {/* striking face — the flat end, marked with a white edge */}
        <rect x={46} y={32} width={10} height={24} rx={4} fill={WHITE} />
      </g>
      {/* impact ticks at the nail head */}
      {struck && (
        <g opacity={0.95}>
          <path
            d="M78 120 L68 112 M122 120 L132 112 M100 116 L100 104"
            stroke={GOLD}
            strokeWidth={6}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};

// ══ 4. CALENDAR — 12 months ticking off ═══════════════════════════════
export const IconCalendar: React.FC<IconProps> = ({p, size = 340}) => {
  const shell = interpolate(p, [0, 0.35], [0, 1], {extrapolateRight: 'clamp'});
  // 12 cells fill in sequence across the beat
  const filled = interpolate(p, [0.3, 0.95], [0, 12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      {/* rings */}
      <path d="M68 34 L68 52 M132 34 L132 52" stroke={WHITE} strokeWidth={8} strokeLinecap="round" opacity={shell} />
      {/* body */}
      <rect x={34} y={46} width={132} height={124} rx={12} fill="none" stroke={WHITE} strokeWidth={8} {...draw(500, shell)} />
      {/* header bar */}
      <path d="M34 78 L166 78" stroke={RED} strokeWidth={16} opacity={shell} />
      {/* 12 cells, 4 cols x 3 rows */}
      {Array.from({length: 12}).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const on = filled > i;
        const pop = Math.max(0, Math.min(1, filled - i));
        return (
          <rect
            key={i}
            x={48 + col * 28}
            y={94 + row * 26}
            width={20}
            height={18}
            rx={4}
            fill={on ? GOLD : 'none'}
            stroke={on ? GOLD : STEEL}
            strokeWidth={4}
            opacity={shell * (on ? 1 : 0.4)}
            style={{transformOrigin: `${58 + col * 28}px ${103 + row * 26}px`, transform: `scale(${0.7 + 0.3 * pop})`}}
          />
        );
      })}
    </svg>
  );
};

// ══ 5. ROW OF HOUSES — installing like dominoes ═══════════════════════
export const IconHouseRow: React.FC<IconProps> = ({p, size = 340}) => {
  const N = 10;
  // the wave sweeps left->right across the beat
  const head = interpolate(p, [0.1, 0.92], [0, N + 2], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg viewBox="0 0 260 140" style={{...svgBase(size), width: size * 1.5, height: size * 0.72}}>
      {Array.from({length: N}).map((_, i) => {
        const x = 14 + i * 24;
        const hh = i % 2 === 0 ? 0 : 9; // alternating heights break the picket-fence gestalt
        const done = Math.max(0, Math.min(1, head - i));
        const pop = 1 + 0.08 * Math.max(0, 1 - Math.abs(head - i - 0.5) * 2);
        return (
          <g key={i} style={{transformOrigin: `${x + 8}px 110px`, transform: `scale(${pop})`}}>
            {/* body outline always present */}
            <path
              d={`M${x} ${92 - hh} L${x} 118 L${x + 15} 118 L${x + 15} ${92 - hh}`}
              fill="none"
              stroke={STEEL}
              strokeWidth={4}
              strokeLinejoin="round"
              opacity={0.55}
            />
            {/* door slot — the detail that says HOUSE, not fence picket */}
            <rect x={x + 5} y={107} width={5.5} height={11} fill={STEEL} opacity={0.5 + 0.5 * done} />
            {/* roof fills red as the wave passes */}
            <path d={`M${x - 3} ${92 - hh} L${x + 7.5} ${78 - hh} L${x + 18} ${92 - hh} Z`} fill={RED} opacity={done} />
            <path
              d={`M${x - 3} ${92 - hh} L${x + 7.5} ${78 - hh} L${x + 18} ${92 - hh}`}
              fill="none"
              stroke={WHITE}
              strokeWidth={4}
              strokeLinejoin="round"
              opacity={0.35 + 0.65 * done}
            />
          </g>
        );
      })}
    </svg>
  );
};

// ══ 6. MAP + PIN — the locality beat ══════════════════════════════════
export const IconMapPin: React.FC<IconProps> = ({p, t, f, fps, size = 340}) => {
  const blob = interpolate(p, [0, 0.45], [0, 1], {extrapolateRight: 'clamp'});
  const drop = spring({frame: f - Math.round(0.4 * fps), fps, config: {damping: 9, stiffness: 190}});
  const ring = (t - 0.75) % 1.2;
  const ringP = ring > 0 ? ring / 1.2 : 0;
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      {/* REDRAWN 2026-08-16: v1's region was a grey heptagon that read as a
          STOP SIGN. A map tile with roads running through it says "map"
          instantly; an abstract polygon says nothing. */}
      <defs>
        <clipPath id="tileClip">
          <rect x={28} y={44} width={144} height={124} rx={14} />
        </clipPath>
      </defs>
      <g opacity={blob}>
        <rect x={28} y={44} width={144} height={124} rx={14} fill={STEEL} opacity={0.14} />
        {/* roads */}
        <g clipPath="url(#tileClip)" opacity={0.5}>
          <path d="M28 96 L172 84" stroke={STEEL} strokeWidth={7} />
          <path d="M28 138 L172 130" stroke={STEEL} strokeWidth={5} />
          <path d="M76 44 L88 168" stroke={STEEL} strokeWidth={7} />
          <path d="M132 44 L140 168" stroke={STEEL} strokeWidth={5} />
        </g>
        <rect
          x={28}
          y={44}
          width={144}
          height={124}
          rx={14}
          fill="none"
          stroke={STEEL}
          strokeWidth={6}
        />
      </g>
      {/* pulse ring on landing */}
      {ringP > 0 && (
        <circle
          cx={100}
          cy={118}
          r={10 + ringP * 46}
          fill="none"
          stroke={RED}
          strokeWidth={5}
          opacity={(1 - ringP) * 0.8 * Math.min(1, drop)}
        />
      )}
      {/* the pin */}
      <g opacity={Math.min(1, drop)} style={{transform: `translateY(${(1 - drop) * -90}px)`}}>
        <path d="M100 62 C82 62 70 76 70 92 C70 112 100 132 100 132 C100 132 130 112 130 92 C130 76 118 62 100 62 Z" fill={RED} />
        <circle cx={100} cy={92} r={11} fill={WHITE} />
      </g>
    </svg>
  );
};

// ══ 7. ARROW DOWN — pulsing, the CTA beat ═════════════════════════════
// 🔴 REDRAWN 2026-08-16 — THIS WAS THE PAINTBRUSH. v1 tried a hand pointing
// down: a white vertical bar (index finger) on a white rounded block (fist)
// with a RED band across the wrist (cuff). That is, exactly and unavoidably,
// a paintbrush with a red ferrule. Joseph asked for an arrow; an arrow is
// also simply the more legible shape at this size. Lesson kept in the file:
// when a figurative icon can be misread as a common object, use the abstract
// shape — the arrow has no competing archetype.
export const IconPointer: React.FC<IconProps> = ({p, t, size = 340}) => {
  const inP = interpolate(p, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});
  const bob = Math.sin(t * 3.6) * 11;
  const r1 = (t % 1.1) / 1.1;
  return (
    <svg viewBox="0 0 200 200" style={svgBase(size)}>
      {/* ONE crisp pulse ring beneath the arrow (two staggered ellipses read
          as a muddy smudge in the blind audit — one bright ring reads as a
          deliberate target) */}
      <ellipse
        cx={100}
        cy={166}
        rx={22 + r1 * 62}
        ry={9 + r1 * 22}
        fill="none"
        stroke={GOLD}
        strokeWidth={8}
        opacity={(0.35 + (1 - r1) * 0.6) * inP}
      />
      <g opacity={inP} style={{transform: `translateY(${bob}px)`}}>
        {/* shaft */}
        <rect x={82} y={26} width={36} height={70} rx={8} fill={WHITE} />
        {/* head — a wide solid triangle, unmistakably an arrow */}
        <path d="M46 88 L154 88 L100 152 Z" fill={WHITE} />
        {/* gold inner chevron gives it depth and ties to the pulse rings */}
        <path d="M72 100 L128 100 L100 134 Z" fill={GOLD} opacity={0.9} />
      </g>
    </svg>
  );
};

/** Count a number down to zero fast — for the $0 DOWN beat. */
export const countdownValue = (p: number, from: number) => {
  // ease-out so it dumps most of the distance immediately, then settles on 0
  const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 3);
  return Math.max(0, Math.round(from * (1 - e)));
};
