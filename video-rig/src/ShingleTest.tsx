import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, Sequence} from 'remotion';
import {CurlingShingleAnim, CurlingShinglePhoto} from './ShingleGraphic';

// A/B/C bake-off on the SAME beat (the qualifier line, ~8.6-13.2s of the take).
// Each variant gets 5s of identical footage so only the graphic differs.

const SEG_START = 8.6; // seconds into the source take
const SEG_LEN = 5; // seconds shown per variant
const FPS = 30;
const SEG_FRAMES = SEG_LEN * FPS;

const Label: React.FC<{text: string; sub: string}> = ({text, sub}) => (
  <div style={{position: 'absolute', top: 44, left: 0, right: 0, textAlign: 'center', fontFamily: '"Segoe UI",Arial,sans-serif'}}>
    <div style={{display: 'inline-block', background: 'rgba(8,14,22,0.86)', border: '2px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '12px 26px'}}>
      <div style={{fontWeight: 900, fontSize: 40, color: '#fff', letterSpacing: 1}}>{text}</div>
      <div style={{fontWeight: 700, fontSize: 24, color: '#9fb3c8', marginTop: 2}}>{sub}</div>
    </div>
  </div>
);

const Clip: React.FC<{children: React.ReactNode; label: React.ReactNode}> = ({children, label}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <OffthreadVideo
      src={staticFile('take-cfr.mp4')}
      startFrom={Math.round(SEG_START * FPS)}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
    {children}
    {label}
  </AbsoluteFill>
);

// variant wrappers get a LOCAL clock so each graphic animates from its own 0
const LocalA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <CurlingShingleAnim t={frame / fps} frame={frame} fps={fps} from={0.25} to={SEG_LEN - 0.3} />;
};
const LocalB: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <CurlingShinglePhoto t={frame / fps} frame={frame} fps={fps} from={0.25} to={SEG_LEN - 0.3} src={src} />;
};

// the CRM card, reproduced here for a fair side-by-side
const CardVariant: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const s = Math.min(1, t / 0.35);
  return (
    <div style={{position: 'absolute', top: 170, left: 64, right: 64, display: 'flex', justifyContent: 'center', transform: `translateY(${(1 - s) * -300}px) rotate(-2.5deg)`, opacity: s}}>
      <div style={{display: 'flex', gap: 18, alignItems: 'flex-start', background: 'rgba(252,252,253,0.98)', borderRadius: 22, padding: '20px 26px', boxShadow: '0 18px 55px rgba(0,0,0,0.5)', maxWidth: 900}}>
        <div style={{width: 72, height: 72, minWidth: 72, borderRadius: 18, background: '#12283f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>🏠</div>
        <div style={{fontFamily: '"Segoe UI",Arial,sans-serif', textAlign: 'left'}}>
          <div style={{fontSize: 26, fontWeight: 700, color: '#8a8f98'}}>Roof Check · now</div>
          <div style={{fontSize: 36, fontWeight: 800, color: '#15171a', marginTop: 2}}>Curling shingles detected</div>
          <div style={{fontSize: 29, fontWeight: 600, color: '#4a5058', marginTop: 4}}>South face · wear pattern ⚠️</div>
        </div>
      </div>
    </div>
  );
};

export const ShingleTest: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Sequence durationInFrames={SEG_FRAMES}>
        <Clip label={<Label text="A — CRM CARD" sub="what we have now" />}>
          <CardVariant />
        </Clip>
      </Sequence>
      <Sequence from={SEG_FRAMES} durationInFrames={SEG_FRAMES}>
        <Clip label={<Label text="B — REAL PHOTO" sub="photo plate + scan reticle" />}>
          <LocalB src="shingle_c.png" />
        </Clip>
      </Sequence>
      <Sequence from={SEG_FRAMES * 2} durationInFrames={SEG_FRAMES}>
        <Clip label={<Label text="C — ANIMATED" sub="vector shingle, peels in the wind" />}>
          <LocalA />
        </Clip>
      </Sequence>
    </AbsoluteFill>
  );
};
