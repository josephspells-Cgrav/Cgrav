/**
 * IconLabBlind — the UNLABELED audit instrument (see AUDIT.md).
 *
 * Identical grid to IconLab but with numbers instead of names, so a fresh
 * vision agent can be asked "what IS cell #3?" without the label leaking the
 * intended answer. The number→intent map lives in audit/audit-icons.mjs —
 * deliberately OUTSIDE the image.
 *
 * Render (three phases; the audit script drives this):
 *   npx remotion still src/index.ts IconLabBlind out/audit/blind-35.png --frame=32
 *   npx remotion still src/index.ts IconLabBlind out/audit/blind-75.png --frame=68
 *   npx remotion still src/index.ts IconLabBlind out/audit/blind-100.png --frame=95
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

// ⚠️ ORDER IS THE CONTRACT with audit/audit-icons.mjs's INTENT map.
const CELLS = [IconHouse, IconHandshake, IconHammers, IconCalendar, IconHouseRow, IconMapPin, IconPointer];

export const ICONLABBLIND_FRAMES = 120;

export const IconLabBlind: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
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
        {CELLS.map((C, i) => (
          <div
            key={i}
            style={{
              border: `2px solid ${STEEL}44`,
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 8,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 16,
                fontFamily: 'Arial, sans-serif',
                fontWeight: 900,
                fontSize: 30,
                color: STEEL,
              }}
            >
              {i + 1}
            </div>
            <C p={p} t={frame / fps} f={frame} fps={fps} size={330} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
