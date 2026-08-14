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
import chunksData from '../public/chunks.json';

// ── MOTION-HEAVY STYLE — the "AI employees" ad language, roofing-cast ──
// notification cards as receipts · kinetic word-pops · rolling counters ·
// pinned hook banner · per-beat push-zoom. Captions deliberately minimal.

const WHITE = '#ffffff';
const YELLOW = '#ffd60a';
const GREEN = '#30d158';
const REDW = '#ff453a';
const BRAND = '#cf2027';
const NAVY = '#12283f';

const F: React.CSSProperties = {fontFamily: '"Segoe UI","Arial",sans-serif'};
const HEAVY: React.CSSProperties = {
  ...F,
  fontWeight: 900,
  textShadow: '0 3px 0 rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.65), 0 10px 30px rgba(0,0,0,0.55)',
};

type Word = {t: string; s: number; e: number};
type Chunk = {start: number; end: number; words: Word[]};
const RAW = chunksData as Chunk[];

// minimal word-pops: 1-2 words, replace at speech speed
const POPS: Chunk[] = [];
for (const c of RAW) {
  for (let i = 0; i < c.words.length; i += 2) {
    const ws = c.words.slice(i, i + 2);
    POPS.push({start: ws[0].s, end: ws[ws.length - 1].e + 0.05, words: ws});
  }
}
const MONEY_RE = /\$|98|zero|down|payment|financ/i;
const NEG_RE = /don't|overpay|cheap|leak|worry/i;

// ══ minimal kinetic captions (deliberately small — not the star) ══════
const WordPop: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t > 54.1) return null;
  const idx = POPS.findIndex((c) => t >= c.start && t < c.end);
  if (idx < 0) return null;
  const ch = POPS[idx];
  const f0 = frame - Math.round(ch.start * fps);
  const pop = spring({frame: f0, fps, config: {damping: 14, stiffness: 400}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top: '66%',
        display: 'flex',
        justifyContent: 'center',
        columnGap: 16,
        transform: `scale(${0.85 + 0.15 * pop})`,
        opacity: pop,
      }}
    >
      {ch.words.map((w, i) => {
        const col = MONEY_RE.test(w.t) ? GREEN : NEG_RE.test(w.t) ? REDW : i === ch.words.length - 1 && idx % 3 === 0 ? YELLOW : WHITE;
        return (
          <span key={i} style={{...HEAVY, fontSize: 66, lineHeight: '74px', color: col, whiteSpace: 'pre'}}>
            {w.t.toUpperCase() + (i < ch.words.length - 1 ? ' ' : '')}
          </span>
        );
      })}
    </div>
  );
};

// ══ pinned hook banner (0 – 5s) ═══════════════════════════════════════
const HookBanner: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  if (t > 5.2) return null;
  const s = spring({frame, fps, config: {damping: 13, stiffness: 200}});
  const out = interpolate(t, [4.8, 5.2], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `translateY(${(1 - s) * -160}px)`, opacity: out}}>
      <div style={{...HEAVY, background: BRAND, color: WHITE, fontSize: 42, lineHeight: 1.18, textAlign: 'center', padding: '18px 36px', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.5)'}}>
        RALEIGH-DURHAM HOMEOWNERS
        <br />
        <span style={{fontSize: 34}}>WITH A ROOF OVER 15 YEARS OLD — WATCH THIS</span>
      </div>
    </div>
  );
};

// ══ THE SIGNATURE: notification cards ═════════════════════════════════
const NCard: React.FC<{
  t: number; frame: number; fps: number;
  from: number; to: number;
  icon: string; iconBg: string;
  app: string; title: string; body?: React.ReactNode;
  y: number; rot?: number; fromSide?: 'top' | 'left' | 'right'; delay?: number;
}> = ({t, frame, fps, from, to, icon, iconBg, app, title, body, y, rot = -2.5, fromSide = 'top', delay = 0}) => {
  const T0 = from + delay;
  if (t < T0 || t > to + 0.35) return null;
  const f0 = frame - Math.round(T0 * fps);
  const s = spring({frame: f0, fps, config: {damping: 12, stiffness: 150}});
  const out = interpolate(t, [to, to + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const drift = Math.sin((t - T0) * 1.6) * 5;
  const enter =
    fromSide === 'top'
      ? `translateY(${(1 - s) * -420}px)`
      : fromSide === 'left'
        ? `translateX(${(1 - s) * -700}px)`
        : `translateX(${(1 - s) * 700}px)`;
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 64,
        right: 64,
        display: 'flex',
        justifyContent: 'center',
        transform: `${enter} translateY(${drift}px) rotate(${rot}deg) scale(${1 - 0.2 * out})`,
        opacity: Math.min(1, s * 1.3) * (1 - out),
      }}
    >
      <div style={{display: 'flex', gap: 18, alignItems: 'flex-start', background: 'rgba(252,252,253,0.98)', borderRadius: 22, padding: '20px 26px', boxShadow: '0 18px 55px rgba(0,0,0,0.5)', maxWidth: 900}}>
        <div style={{...HEAVY, textShadow: 'none', width: 72, height: 72, minWidth: 72, borderRadius: 18, background: iconBg, color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>
          {icon}
        </div>
        <div style={{...F, textAlign: 'left'}}>
          <div style={{fontSize: 26, fontWeight: 700, color: '#8a8f98', letterSpacing: 0.5}}>
            {app} · <span style={{fontWeight: 600}}>now</span>
          </div>
          <div style={{fontSize: 36, fontWeight: 800, color: '#15171a', lineHeight: 1.15, marginTop: 2}}>{title}</div>
          {body ? <div style={{fontSize: 29, fontWeight: 600, color: '#4a5058', lineHeight: 1.2, marginTop: 4}}>{body}</div> : null}
        </div>
      </div>
    </div>
  );
};

// ══ rolling counter ($50M proof beat) ═════════════════════════════════
const Counter: React.FC<{t: number; frame: number; fps: number; from: number; to: number}> = ({t, frame, fps, from, to}) => {
  if (t < from || t > to + 0.3) return null;
  const f0 = frame - Math.round(from * fps);
  const s = spring({frame: f0, fps, config: {damping: 12, stiffness: 110}});
  const p = interpolate(t, [from + 0.15, from + 1.9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const eased = 1 - Math.pow(1 - p, 3);
  const val = Math.round(eased * 50_000_000);
  const out = interpolate(t, [to, to + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fmt = '$' + val.toLocaleString('en-US');
  return (
    <div style={{position: 'absolute', top: '20%', left: 0, right: 0, textAlign: 'center', transform: `scale(${s * (1 - 0.15 * out)})`, opacity: 1 - out}}>
      <div style={{...HEAVY, fontSize: 118, color: GREEN}}>{fmt}</div>
      <div style={{...HEAVY, fontSize: 46, color: WHITE, marginTop: 2}}>OF ROOFS INSTALLED</div>
    </div>
  );
};

// ══ per-beat push-zoom on the footage (fakes cut energy) ══════════════
const BEATS = [0, 3.9, 18.4, 28.96, 41.86, 54.3, 57.5];
const zoomFor = (t: number): number => {
  let i = 0;
  for (let k = 0; k < BEATS.length - 1; k++) if (t >= BEATS[k]) i = k;
  const p = (t - BEATS[i]) / (BEATS[i + 1] - BEATS[i]);
  const zIn = i % 2 === 0;
  const z0 = zIn ? 1.0 : 1.08;
  const z1 = zIn ? 1.08 : 1.0;
  return z0 + (z1 - z0) * Math.min(1, p);
};

// ══ end card ══════════════════════════════════════════════════════════
const EndCard: React.FC<{t: number; frame: number; fps: number}> = ({t, frame, fps}) => {
  const T0 = 54.2;
  if (t < T0) return null;
  const f0 = frame - Math.round(T0 * fps);
  const fade = interpolate(t, [T0, T0 + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s1 = spring({frame: f0 - 4, fps, config: {damping: 11, stiffness: 140}});
  const pulse = 1 + 0.035 * Math.sin(t * 4.5);
  return (
    <AbsoluteFill style={{background: `rgba(10,18,30,${0.7 * fade})`, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, transform: `scale(${s1})`}}>
        <div style={{...HEAVY, fontSize: 88, color: WHITE, textAlign: 'center', lineHeight: 1.06}}>
          SCHEDULE YOUR
          <br />
          <span style={{color: YELLOW}}>FREE QUOTE</span>
        </div>
        <div style={{...HEAVY, textShadow: 'none', transform: `scale(${pulse})`, background: BRAND, color: WHITE, fontSize: 50, padding: '24px 56px', borderRadius: 999, boxShadow: '0 16px 50px rgba(207,32,39,0.55)'}}>
          TAP BELOW — 60 SECONDS
        </div>
        <div style={{...F, fontWeight: 800, fontSize: 30, color: '#cfd8e3', letterSpacing: 4}}>MABREY ROOFING · RALEIGH-DURHAM</div>
      </div>
    </AbsoluteFill>
  );
};

// ══ composition ═══════════════════════════════════════════════════════
export const MotionBB: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const z = zoomFor(t);

  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${z})`}}>
        <OffthreadVideo src={staticFile('take-cfr.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>

      <WordPop t={t} frame={frame} fps={fps} />
      <HookBanner t={t} frame={frame} fps={fps} />

      {/* qualifier beats — inspection receipts */}
      <NCard t={t} frame={frame} fps={fps} from={8.6} to={13.2} y={170} icon="🏠" iconBg={NAVY} app="Roof Check" title="Curling shingles detected" body={<span>South face · <b style={{color: '#b45309'}}>wear pattern ⚠️</b></span>} fromSide="left" rot={-2.5} />
      <NCard t={t} frame={frame} fps={fps} from={11.4} to={15.2} y={352} icon="💧" iconBg="#0a84ff" app="Roof Check" title="Leak risk flagged" body="Attic moisture reading elevated" fromSide="right" rot={2} delay={0} />
      <NCard t={t} frame={frame} fps={fps} from={14.4} to={18.2} y={534} icon="⚡" iconBg="#b45309" app="Energy Monitor" title="Cooling bill trending up" body={<b style={{color: REDW}}>+$180/mo vs last summer</b>} fromSide="left" rot={-1.5} />

      {/* offer beats — financing receipts */}
      <NCard t={t} frame={frame} fps={fps} from={18.9} to={23.3} y={190} icon="✅" iconBg={GREEN} app="Financing" title="Approved — $0 down" body="No money due at signing" fromSide="top" rot={-2} />
      <NCard t={t} frame={frame} fps={fps} from={21.9} to={25.7} y={372} icon="💵" iconBg={GREEN} app="Financing" title={'First payment: $98/mo' as string} body={<span>Full roof replacement</span>} fromSide="right" rot={2.5} />
      <NCard t={t} frame={frame} fps={fps} from={25.9} to={28.9} y={554} icon="🗓" iconBg={NAVY} app="Financing" title="No payments until Aug 2027" body={<b style={{color: GREEN}}>12 months deferred</b>} fromSide="left" rot={-2} />

      {/* proof beat — the rolling counter + badge card */}
      <Counter t={t} frame={frame} fps={fps} from={36.8} to={41.7} />
      <NCard t={t} frame={frame} fps={fps} from={29.4} to={33.2} y={190} icon="🇺🇸" iconBg={NAVY} app="Mabrey Roofing" title="Veteran-owned & operated" body="Raleigh-Durham, NC" fromSide="top" rot={-2} />

      {/* how-it-works — satellite + in-writing receipts */}
      <NCard t={t} frame={frame} fps={fps} from={42.2} to={46.4} y={190} icon="🛰" iconBg="#5e5ce6" app="Measurements" title="Satellite measurement complete" body={<span>Roof mapped · <b>correct price the first time</b></span>} fromSide="top" rot={-2.5} />
      <NCard t={t} frame={frame} fps={fps} from={49.3} to={53.6} y={190} icon="✍️" iconBg={BRAND} app="Your Quote" title="Quote delivered — in writing" body="Every option explained, sit-down included" fromSide="right" rot={2} />

      {/* the real product moment on the CTA */}
      <NCard t={t} frame={frame} fps={fps} from={55.0} to={56.9} y={1460} icon="📅" iconBg={GREEN} app="Mabrey Roofing" title="Appointment confirmed" body={<b style={{color: '#15171a'}}>Sat 11:00 AM — see you then</b>} fromSide="top" rot={-1.5} />

      <EndCard t={t} frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
