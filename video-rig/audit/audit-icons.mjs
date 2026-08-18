/**
 * audit-icons.mjs — renders the blind audit artifacts for MoIcons (AUDIT.md §1).
 *
 *   node audit/audit-icons.mjs render   # three-phase blind sheets -> out/audit/
 *   node audit/audit-icons.mjs intent   # print the number->intent contract
 *
 * The INTENT map lives HERE, outside the images, so the blind vision pass
 * cannot be led. Cell order must match src/IconLabBlind.tsx's CELLS array.
 */
import {execSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

export const INTENT = {
  1: {name: 'house with a red roof', accept: ['house', 'home']},
  2: {name: 'price tag reading $0', accept: ['price tag', 'tag', 'label', '$0']},
  3: {name: 'hammer striking a roof', accept: ['hammer']},
  4: {name: 'calendar with 12 filled months', accept: ['calendar']},
  5: {name: 'row of houses, roofs installing in sequence', accept: ['houses', 'row of houses', 'neighborhood']},
  6: {name: 'map with a location pin', accept: ['map', 'pin', 'location']},
  7: {name: 'arrow pointing down', accept: ['arrow', 'down arrow']},
};

// Three phases: mid-build, settle, idle. Frames chosen against the 90-frame
// shared progress in IconLabBlind (p = frame/90).
const PHASES = [
  {label: 'p35', frame: 32},
  {label: 'p75', frame: 68},
  {label: 'p100', frame: 95},
];

const cmd = process.argv[2];

if (cmd === 'intent') {
  for (const [n, v] of Object.entries(INTENT)) console.log(`${n}. ${v.name}`);
  process.exit(0);
}

if (cmd === 'render') {
  mkdirSync('out/audit', {recursive: true});
  for (const p of PHASES) {
    const out = `out/audit/blind-${p.label}.png`;
    execSync(
      `npx remotion still src/index.ts IconLabBlind ${out} --frame=${p.frame}`,
      {stdio: 'inherit'},
    );
  }
  console.log('\nArtifacts in out/audit/. Next (AUDIT.md §2): give the sheets');
  console.log('to a FRESH vision agent, ask "what is cell N?", diff vs `intent`.');
  process.exit(0);
}

console.log('usage: node audit/audit-icons.mjs [render|intent]');
