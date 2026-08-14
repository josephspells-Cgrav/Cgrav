// Composite the ad's real claims onto each Higgsfield plate, then concat to
// one reel. Text is ALWAYS composited — never AI-rendered (house law).
const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const FONT = 'C\\:/Windows/Fonts/segoeuib.ttf';
const OUT = path.join(__dirname, 'out');

const PLATES = [
  {src: 'plate_money.mp4', out: 'lab_money.mp4', l1: '$0 DOWN', l2: 'AS LOW AS $98/MO', c2: '0x7ade9a'},
  {src: 'plate_12mo.mp4', out: 'lab_12mo.mp4', l1: 'NO PAYMENTS', l2: 'FOR 12 MONTHS', c2: '0x4dd0ff'},
  {src: 'plate_aerial.mp4', out: 'lab_aerial.mp4', l1: '$50,000,000', l2: 'OF ROOFS INSTALLED', c2: '0xffffff', s1: 118, s2: 62},
  {src: 'plate_cta.mp4', out: 'lab_cta.mp4', l1: 'SCHEDULE YOUR', l2: 'FREE QUOTE', c2: '0x4dd3ff'},
];

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/:/g, '\\:').replace(/'/g, "\\'").replace(/\$/g, '\\$').replace(/,/g, '\\,');

for (const p of PLATES) {
  const s1 = p.s1 ?? 100;
  const s2 = p.s2 ?? 100;
  const vf = [
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    'fps=30',
    `drawtext=fontfile='${FONT}':text='${esc(p.l1)}':fontsize=${s1}:fontcolor=white:borderw=7:bordercolor=black@0.85:x=(w-text_w)/2:y=h*0.38`,
    `drawtext=fontfile='${FONT}':text='${esc(p.l2)}':fontsize=${s2}:fontcolor=${p.c2}:borderw=7:bordercolor=black@0.85:x=(w-text_w)/2:y=h*0.38+${s1 + 24}`,
  ].join(',');
  execFileSync('ffmpeg', ['-y', '-i', path.join(__dirname, 'public', p.src), '-vf', vf, '-an',
    '-c:v', 'libx264', '-crf', '20', '-preset', 'fast', '-pix_fmt', 'yuv420p', path.join(OUT, p.out)],
    {stdio: 'ignore'});
  console.log('labelled', p.out);
}

fs.writeFileSync(path.join(OUT, 'list.txt'), PLATES.map((p) => `file '${p.out}'`).join('\n') + '\n');
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', path.join(OUT, 'list.txt'),
  '-c:v', 'libx264', '-crf', '19', '-preset', 'medium', '-maxrate', '6M', '-bufsize', '12M',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, 'PLATES-reel.mp4')],
  {cwd: OUT, stdio: 'ignore'});
console.log('reel:', fs.statSync(path.join(OUT, 'PLATES-reel.mp4')).size, 'bytes');
