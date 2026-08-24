import type { ReactNode } from "react";

/* Native <details> for depth-on-demand (methodology, "show the math", edge
 * cases) — keeps the main scan clean, proof one click away. */
export function ExpandableDetail({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group my-6 border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-[14px] font-semibold text-ink marker:hidden">
        <span>{summary}</span>
        <span aria-hidden className="text-blue transition-transform duration-200 group-open:rotate-180">&#9662;</span>
      </summary>
      <div className="km-prose border-t border-line-soft px-5 py-4 text-[14.5px]">{children}</div>
    </details>
  );
}
