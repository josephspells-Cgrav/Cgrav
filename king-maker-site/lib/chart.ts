/* Pure chart helpers — no React, no client JS. Imported by server-rendered SVG
 * charts so static charts ship zero JS (a "use client" motion leaf is added only
 * where a draw-in is wanted). The house style is hand-rolled SVG (NOT a charting
 * lib: libs fight SSG and bury text in <tspan> soup AI extractors can't read). */

export type Pt = { x: number; y: number };

/** Linear scale: maps a value in [domain] to a coordinate in [range]. */
export function scaleLinear(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);
}

/** Series values → an SVG path "M x y L x y …" given x/y scale fns. */
export function toPath(values: number[], sx: (i: number) => number, sy: (v: number) => number): string {
  return values.map((v, i) => `${i === 0 ? "M" : "L"} ${sx(i).toFixed(2)} ${sy(v).toFixed(2)}`).join(" ");
}

/** Closed area path under a line (line + drop to baseline + close). */
export function toArea(
  values: number[],
  sx: (i: number) => number,
  sy: (v: number) => number,
  baselineY: number,
): string {
  const line = toPath(values, sx, sy);
  const lastX = sx(values.length - 1).toFixed(2);
  const firstX = sx(0).toFixed(2);
  return `${line} L ${lastX} ${baselineY.toFixed(2)} L ${firstX} ${baselineY.toFixed(2)} Z`;
}

/** Horizontal bars: value → {y, width} given a band layout. */
export function toBars(
  values: number[],
  opts: { max: number; innerW: number; band: number; gap: number; top?: number },
): { y: number; w: number; h: number }[] {
  const { max, innerW, band, gap, top = 0 } = opts;
  return values.map((v, i) => ({
    y: top + i * (band + gap),
    w: (Math.min(v, max) / (max || 1)) * innerW,
    h: band,
  }));
}

/** "Nice" rounded tick values across [min,max] for axes. */
export function niceTicks(min: number, max: number, count = 4): number[] {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span / count)));
  const err = (span / count) / step;
  const mult = err >= 7.5 ? 10 : err >= 3 ? 5 : err >= 1.5 ? 2 : 1;
  const niceStep = mult * step;
  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;
  const out: number[] = [];
  for (let t = niceMin; t <= niceMax + 1e-9; t += niceStep) out.push(Math.round(t * 1000) / 1000);
  return out;
}

/** Compact number formatting for axis labels / counts (1,200 → "1.2k"). */
export function fmtCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}
