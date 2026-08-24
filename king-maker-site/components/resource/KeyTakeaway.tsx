import type { ReactNode } from "react";

/* The primary scannability primitive. A flat, labeled callout (blue TOP hairline
 * + surface bg, NO left-stripe, NO glass). A contractor who reads only the
 * KeyTakeaways gets the whole argument. NOT a magazine pull-quote. */
export function KeyTakeaway({
  label = "Key takeaway",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 border border-line border-t-[3px] border-t-blue-action bg-surface px-7 py-6 shadow-[var(--shadow-card)]">
      <p className="km-mono mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">{label}</p>
      <div className="text-[17px] font-medium leading-relaxed text-ink [&_strong]:text-blue">{children}</div>
    </aside>
  );
}
