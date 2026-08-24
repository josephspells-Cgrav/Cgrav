import fs from 'node:fs';
const dir = 'C:/Users/josep/Claude Gravity/ad-swipe/ig-batch-2026-06-20/_work';
const files = fs.readdirSync(dir).filter(f => f.endsWith('_transcript.txt')).sort();
for (const f of files) {
  const raw = fs.readFileSync(`${dir}/${f}`, 'utf8').split(/\r?\n/).filter(l => l.startsWith('['));
  const text = raw.map(l => l.replace(/^\[[^\]]*\]\s*/, '')).join(' ').trim();
  const tag = f.replace('_transcript.txt', '').replace('Screen_Recording_', '');
  console.log(`\n===== ${tag} =====`);
  console.log(text || '(no speech detected — likely text/music-only)');
}
