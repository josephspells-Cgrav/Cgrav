/**
 * MoGraph01 — "THE OFFER" · pure motion-graphics ad, NO FACE, 32s
 * ─────────────────────────────────────────────────────────────────────────
 * Joseph, 2026-08-16 7:39pm: "the motion graphic color palette is basically
 * the Mabrey roofing motion palette that you did for both the electrical bill
 * going up and then also the closing graphics... if we can turn that into an
 * entire ad basically is what I'm thinking where it's basically just going
 * from thing to thing that I'm talking about in that Navy blue aesthetic."
 *
 * So this is the BillboardCard/MapGraphic language extended to a whole ad:
 * full-frame NAVY, ANTON display type, INTER letter-spaced labels, the RED
 * rule that wipes in, staged spring builds, radial glow behind each hero.
 * Nothing here is new vocabulary — it is the locked ad's graphic system with
 * the face removed and the cards promoted from interruptions to the ad itself.
 *
 * ⚖️ HOUSE LAW: "motion graphics" = TYPE IN MOTION (OS54). Every beat below
 * is type that lands/strikes/counts/wipes. No generated b-roll, no stock.
 *
 * WHY THIS CONCEPT FIRST (2026-08-16 account inventory): only 3 Mabrey
 * concepts have ever run, and the one that produced 9 of ~11 leads ever
 * ("$0 down, proof-stack, veteran-owned, NC GC #84804", GET_QUOTE) was
 * abandoned. Its shape is rebuilt here as beats 6-7 — the proof stack is not
 * decoration, it is the measured winner.
 *
 * AUDIO: this comp is SILENT by design, exactly like RealBBv6. The audio lane
 * (bed + SFX + two-pass loudnorm to -13.9 LUFS) is muxed in post via ffmpeg.
 * VO drops on the same way — the beat timings below ARE the contract, so a
 * later Joseph/AI voice track can be cut to them without touching this file.
 *
 * Render:
 *   npx remotion render src/index.ts MoGraph01 out/mograph01.mp4 --codec h264
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ANTON, INTER} from './HookSpectacle';
import {
  IconHouse,
  IconHandshake,
  IconHammers,
  IconCalendar,
  IconHouseRow,
  IconMapPin,
  IconPointer,
  countdownValue,
} from './MoIcons';

const WHITE = '#ffffff';
const RED = '#cf2027';
const GOLD = '#ffd60a';
const NAVY = '#0c1b2e';
const STEEL = '#8fa6c0'; // the label blue from BillboardCard
const DIM = '#6b8099'; // the footer blue from BillboardCard

const H: React.CSSProperties = {fontWeight: 900, letterSpacing: '-0.5px', textAlign: 'center'};

// ── THE BEAT SHEET (seconds) — the VO contract ────────────────────────
// Any voice track laid over this must hit these marks.
const B = {
  hook: [0.0, 3.4],
  turn: [3.4, 6.0],
  down: [6.0, 10.2],
  month: [10.2, 14.6],
  year: [14.6, 19.2],
  proof: [19.2, 24.6],
  local: [24.6, 28.2],
  cta: [28.2, 32.0],
} as const;

const FPS = 30;
export const MOGRAPH01_FRAMES = Math.round(B.cta[1] * FPS); // 960

/** Shared card shell: navy field, vignette, and a clean 0.22s out-fade. */
const Card: React.FC<{
  t: number;
  span: readonly [number, number];
  glow?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({t, span, glow = RED, icon, children}) => {
  const [from, to] = span;
  if (t < from || t >= to) return null;
  const out = interpolate(t, [to - 0.22, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{background: NAVY, opacity: out, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 34% at 50% 46%, ${glow}22 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,.45) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          flexDirection: 'column',
        }}
      >
        {icon ? <div style={{marginBottom: 30}}>{icon}</div> : null}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** The red rule that wipes in — the system's signature separator. */
const Rule: React.FC<{p: number; color?: string; w?: number}> = ({p, color = RED, w = 62}) => (
  <div
    style={{
      height: 9,
      width: `${Math.max(0, p) * w}%`,
      background: color,
      borderRadius: 5,
      marginTop: 20,
      boxShadow: `0 0 26px ${color}77`,
    }}
  />
);

/** INTER label — letter-spaced small caps sitting above a hero. */
const Label: React.FC<{o: number; size?: number; color?: string; mt?: number; children: React.ReactNode}> = ({
  o,
  size = 44,
  color = STEEL,
  mt = 0,
  children,
}) => (
  <div
    style={{
      ...H,
      fontFamily: INTER,
      fontSize: size,
      color,
      letterSpacing: 12,
      marginTop: mt,
      opacity: o,
    }}
  >
    {children}
  </div>
);

// ══ 1. HOOK — the number people think a roof costs, then killed ═══════
const Hook: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.hook[0] * fps);
  const line = spring({frame: k - 2, fps, config: {damping: 16, stiffness: 190}});
  const num = spring({frame: k - 18, fps, config: {damping: 11, stiffness: 160}});
  // the strike rips left-to-right across the number
  const strike = interpolate(k, [46, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ip = interpolate(k, [0, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.hook} icon={<IconHouse p={ip} t={k / fps} f={k} fps={fps} size={300} />}>
      <Label o={line} size={48}>
        A NEW ROOF COSTS
      </Label>
      <div style={{position: 'relative', marginTop: 14}}>
        <div
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 176,
            lineHeight: '178px',
            color: WHITE,
            textShadow: '0 8px 0 rgba(0,0,0,.45)',
            transform: `scale(${0.84 + 0.16 * Math.min(1, num)})`,
            opacity: Math.min(1, num * 1.4),
          }}
        >
          $20,000
        </div>
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '-3%',
            height: 18,
            width: `${strike * 106}%`,
            background: RED,
            borderRadius: 9,
            boxShadow: `0 0 34px ${RED}aa`,
          }}
        />
      </div>
    </Card>
  );
};

// ══ 2. TURN — the correction ══════════════════════════════════════════
const Turn: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.turn[0] * fps);
  const a = spring({frame: k - 1, fps, config: {damping: 13, stiffness: 170}});
  const b = spring({frame: k - 16, fps, config: {damping: 14, stiffness: 165}});
  return (
    <Card t={t} span={B.turn}>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 156,
          lineHeight: '158px',
          color: WHITE,
          opacity: a,
          transform: `translateY(${(1 - a) * -30}px)`,
        }}
      >
        NOT
      </div>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 156,
          lineHeight: '158px',
          color: RED,
          opacity: b,
          transform: `translateY(${(1 - b) * 30}px)`,
          textShadow: `0 0 40px ${RED}55`,
        }}
      >
        ANYMORE.
      </div>
    </Card>
  );
};

// ══ 3. $0 DOWN ════════════════════════════════════════════════════════
const Down: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.down[0] * fps);
  const lab = interpolate(k, [4, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hero = spring({frame: k - 12, fps, config: {damping: 12, stiffness: 155}});
  const rule = interpolate(k, [30, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ip = interpolate(k, [0, 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // the number dumps from ~$9,850 to 0 in ~0.75s — his "counts down super fast"
  const cd = interpolate(k, [10, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const val = countdownValue(cd, 9850);
  const settled = cd >= 1;
  return (
    <Card t={t} span={B.down} icon={<IconHandshake p={ip} t={k / fps} f={k} fps={fps} size={276} />}>
      <Label o={lab}>TO GET STARTED</Label>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: settled ? 226 : 150,
          lineHeight: settled ? '228px' : '154px',
          color: WHITE,
          marginTop: 10,
          textShadow: '0 10px 0 rgba(0,0,0,.45)',
          transform: `scale(${(0.82 + 0.18 * Math.min(1, hero)) * (settled ? 1 : 0.96)})`,
          opacity: Math.min(1, hero * 1.4),
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{color: RED}}>$</span>
        {val.toLocaleString()}
      </div>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 92,
          color: WHITE,
          letterSpacing: 8,
          marginTop: -6,
          opacity: Math.min(1, hero) * (settled ? 1 : 0.35),
        }}
      >
        DOWN
      </div>
      <Rule p={rule} />
    </Card>
  );
};

// ══ 4. $98 / MONTH — the editorial number (2nd card grammar) ══════════
const Month: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.month[0] * fps);
  const lab = interpolate(k, [3, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hero = spring({frame: k - 10, fps, config: {damping: 12, stiffness: 150}});
  const per = spring({frame: k - 26, fps, config: {damping: 15, stiffness: 170}});
  const rule = interpolate(k, [40, 56], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ip = interpolate(k, [0, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.month} icon={<IconHammers p={ip} t={k / fps} f={k} fps={fps} size={272} />}>
      <Label o={lab}>FULL REPLACEMENT FROM</Label>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginTop: 8,
          transform: `scale(${0.84 + 0.16 * Math.min(1, hero)})`,
          opacity: Math.min(1, hero * 1.4),
        }}
      >
        <span
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 104,
            lineHeight: '118px',
            color: RED,
            marginRight: 6,
          }}
        >
          $
        </span>
        <span
          style={{
            ...H,
            fontFamily: ANTON,
            fontSize: 208,
            lineHeight: '208px',
            color: WHITE,
            textShadow: '0 10px 0 rgba(0,0,0,.45)',
          }}
        >
          98
        </span>
      </div>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 88,
          color: WHITE,
          letterSpacing: 7,
          marginTop: -4,
          opacity: per,
          transform: `translateY(${(1 - per) * 22}px)`,
        }}
      >
        A MONTH
      </div>
      <Rule p={rule} />
    </Card>
  );
};

// ══ 5. NO PAYMENTS FOR 12 MONTHS — gold, the differentiator ═══════════
const Year: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.year[0] * fps);
  const a = spring({frame: k - 2, fps, config: {damping: 15, stiffness: 175}});
  const hero = spring({frame: k - 16, fps, config: {damping: 11, stiffness: 150}});
  const foot = interpolate(k, [50, 66], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ip = interpolate(k, [0, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.year} glow={GOLD} icon={<IconCalendar p={ip} t={k / fps} f={k} fps={fps} size={268} />}>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 92,
          lineHeight: '96px',
          color: WHITE,
          opacity: a,
          transform: `translateY(${(1 - a) * -26}px)`,
        }}
      >
        AND NO PAYMENTS
      </div>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 118,
          lineHeight: '122px',
          color: GOLD,
          marginTop: 10,
          textShadow: '0 8px 0 rgba(0,0,0,.5)',
          transform: `scale(${0.86 + 0.14 * Math.min(1, hero)})`,
          opacity: Math.min(1, hero * 1.4),
        }}
      >
        FOR 12 MONTHS
      </div>
      <Label o={foot} size={34} color={DIM} mt={54}>
        NOTHING DUE UNTIL NEXT YEAR
      </Label>
    </Card>
  );
};

// ══ 6. PROOF STACK — the measured winner's shape ══════════════════════
const Proof: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.proof[0] * fps);
  const brand = spring({frame: k - 2, fps, config: {damping: 15, stiffness: 180}});
  const rule = interpolate(k, [10, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const over = interpolate(k, [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hero = spring({frame: k - 22, fps, config: {damping: 12, stiffness: 150}});
  const inst = spring({frame: k - 36, fps, config: {damping: 15, stiffness: 170}});
  const rows = [0, 1, 2].map((i) =>
    interpolate(k, [56 + i * 9, 68 + i * 9], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const ip = interpolate(k, [0, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.proof} icon={<IconHouseRow p={ip} t={k / fps} f={k} fps={fps} size={230} />}>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 70,
          color: WHITE,
          letterSpacing: 9,
          opacity: brand,
          transform: `translateY(${(1 - brand) * -30}px)`,
        }}
      >
        MABREY ROOFING
      </div>
      <Rule p={rule} />
      <Label o={over} size={42} mt={52}>
        OVER
      </Label>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 128,
          lineHeight: '130px',
          color: WHITE,
          marginTop: 4,
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
          fontSize: 80,
          color: RED,
          letterSpacing: 4,
          marginTop: 2,
          opacity: inst,
          transform: `translateY(${(1 - inst) * 24}px)`,
        }}
      >
        INSTALLED
      </div>
      <div style={{marginTop: 52, display: 'flex', flexDirection: 'column', gap: 14}}>
        {['VETERAN OWNED', 'LOCALLY OPERATED', 'NC LICENSE #84804'].map((s, i) => (
          <div
            key={s}
            style={{
              ...H,
              fontFamily: INTER,
              fontSize: 32,
              color: STEEL,
              letterSpacing: 6,
              opacity: rows[i],
              transform: `translateY(${(1 - rows[i]) * 14}px)`,
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </Card>
  );
};

// ══ 7. LOCALITY ═══════════════════════════════════════════════════════
const Local: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.local[0] * fps);
  const lab = interpolate(k, [4, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hero = spring({frame: k - 12, fps, config: {damping: 13, stiffness: 160}});
  const rule = interpolate(k, [34, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ip = interpolate(k, [0, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.local} icon={<IconMapPin p={ip} t={k / fps} f={k} fps={fps} size={286} />}>
      <Label o={lab} size={40}>
        SERVING
      </Label>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 104,
          lineHeight: '108px',
          color: WHITE,
          marginTop: 8,
          transform: `translateY(${(1 - hero) * 26}px)`,
          opacity: Math.min(1, hero * 1.3),
        }}
      >
        RALEIGH
        <br />
        DURHAM
      </div>
      <Rule p={rule} w={48} />
    </Card>
  );
};

// ══ 8. END CARD — the CTA ═════════════════════════════════════════════
const Cta: React.FC<{t: number; f: number; fps: number}> = ({t, f, fps}) => {
  const k = f - Math.round(B.cta[0] * fps);
  const a = spring({frame: k - 2, fps, config: {damping: 15, stiffness: 180}});
  const hero = spring({frame: k - 14, fps, config: {damping: 12, stiffness: 155}});
  const rule = interpolate(k, [30, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // a slow breathing pulse so the last frame is never static
  const pulse = 1 + 0.02 * Math.sin((k / fps) * 3.4);
  const ip = interpolate(k, [0, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Card t={t} span={B.cta} icon={<IconPointer p={ip} t={k / fps} f={k} fps={fps} size={244} />}>
      <Label o={a} size={40}>
        FIND OUT WHAT YOURS COSTS
      </Label>
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 150,
          lineHeight: '154px',
          color: WHITE,
          marginTop: 14,
          transform: `scale(${(0.88 + 0.12 * Math.min(1, hero)) * pulse})`,
          opacity: Math.min(1, hero * 1.4),
          textShadow: '0 8px 0 rgba(0,0,0,.45)',
        }}
      >
        GET YOUR
        <br />
        FREE QUOTE
      </div>
      <Rule p={rule} />
      <div
        style={{
          ...H,
          fontFamily: ANTON,
          fontSize: 58,
          color: WHITE,
          letterSpacing: 8,
          marginTop: 46,
          opacity: rule,
        }}
      >
        MABREY ROOFING
      </div>
      <Label o={rule} size={28} color={DIM} mt={16}>
        TAP BELOW · TAKES 30 SECONDS
      </Label>
    </Card>
  );
};

export const MoGraph01: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const p = {t, f: frame, fps};
  return (
    <AbsoluteFill style={{background: NAVY}}>
      <Hook {...p} />
      <Turn {...p} />
      <Down {...p} />
      <Month {...p} />
      <Year {...p} />
      <Proof {...p} />
      <Local {...p} />
      <Cta {...p} />
    </AbsoluteFill>
  );
};
