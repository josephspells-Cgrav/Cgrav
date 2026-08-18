/**
 * IconLab — a contact sheet for MoIcons, so icons get EYEBALLED before shipping.
 *
 * Built 2026-08-16 after I shipped 7 icons having visually verified 3.
 * Joseph: "one of them looks like a fucking paintbrush." He was right, and the
 * only reason I didn't know is that I never rendered them in isolation — inside
 * a full ad frame at 260px, a broken silhouette hides.
 *
 * ⚖️ THE RULE THIS ENCODES: an icon is not done until it has been seen ALONE,
 * LARGE, at multiple points in its animation. A still of the composition is not
 * a still of the icon.
 *
 * Render a sheet:
 *   npx remotion still src/index.ts IconLab out/lab/p35.png --frame=30
 *   npx remotion still src/index.ts IconLab out/lab/p70.png --frame=60
 *   npx remotion still src/index.ts IconLab out/lab/p100.png --frame=95
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  IconHouse,
  IconHandshake,
  IconHammers,
  IconCalendar,
  IconHouseRow,
  IconMapPin,
  IconPointer,
} from './MoIcons';

const NAVY = '#0c1b2e';
const STEEL = '#8fa6c0';

const CELLS = [
  {name: 'HOUSE + WORKER', C: IconHouse},
  {name: 'HANDSHAKE', C: IconHandshake},
  {name: 'HAMMERS', C: IconHammers},
  {name: 'CALENDAR', C: IconCalendar},
  {name: 'HOUSE ROW', C: IconHouseRow},
  {name: 'MAP + PIN', C: IconMapPin},
  {name: 'POINTER', C: IconPointer},
];

export const ICONLAB_FRAMES = 120;

export const IconLab: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // the whole sheet shares one progress so a single still shows the same
  // build-state across every icon — that is what makes them comparable
  const p = Math.min(1, frame / 90);
  return (
    <AbsoluteFill style={{background: NAVY, padding: 40}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          width: '100%',
          height: '100%',
        }}
      >
        {CELLS.map(({name, C}) => (
          <div
            key={name}
            style={{
              border: `2px solid ${STEEL}44`,
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 8,
            }}
          >
            <C p={p} t={frame / fps} f={frame} fps={fps} size={330} />
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                fontWeight: 900,
                fontSize: 22,
                color: STEEL,
                letterSpacing: 3,
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
