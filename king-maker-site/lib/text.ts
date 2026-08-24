/* Plain text utilities — safe to import from BOTH server and client components
 * (no "use client", no React). */

const NBSP = String.fromCharCode(160);

/**
 * Bind the last two words of a heading with a non-breaking space so the final
 * line never strands a single word. text-wrap:balance evens the other lines;
 * this guarantees the >= 2-words-on-last-line rule (no-orphan-headlines).
 */
export function bindLastTwoWords(text: string): string {
  return text.replace(/ (\S+)\s*$/, NBSP + "$1");
}
