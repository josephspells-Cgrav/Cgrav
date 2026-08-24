import type { Flag } from "./claims";

/* Content-as-data model. Guides, playbook chapters, and trade pages are authored
 * as GuideContent objects (data, not JSX) and rendered by <GuideArticle>. This
 * keeps content composable + iterable and removes compile risk from authored
 * content. Charts are referenced by KEY (the renderer maps key → component;
 * charts pull their own data from lib/claims). */

export type ChartKey =
  | "compounding"
  | "page-count"
  | "trade-table"
  | "gap-wall"
  | "long-tail"
  | "page-age"
  | "matrix"
  | "mechanism-tie"
  | "mechanism-ledger"
  | "enterprise-anatomy";

export type Block =
  | { kind: "p"; text: string } // paragraph; supports **bold** and [text](/href)
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "takeaway"; label?: string; text: string }
  | { kind: "comparison"; leftLabel?: string; rightLabel?: string; rows: { label: string; brochure: string; system: string; flag: Flag }[] }
  | { kind: "chart"; chart: ChartKey }
  | { kind: "definition"; term: string; def: string }
  | { kind: "debunk"; myth: string; reality: string; why: string }
  | { kind: "priceRange"; title: string; rows: { label: string; range: string; detail?: string }[]; note?: string }
  | { kind: "spec"; label?: string; lines: string[] }
  | { kind: "antiDoorway" }
  | { kind: "auditPrompt" }; // the Cat 10 copy-paste AI audit prompt (WO_09 §3)

export type GuideSection = {
  id: string;
  h2: string;
  navLabel: string;
  speakable?: boolean;
  blocks: Block[];
};

export type GuideContent = {
  sections: GuideSection[];
};

/** Derive the StickyTOC items from the content sections. */
export function tocFor(content: GuideContent): { id: string; label: string }[] {
  return content.sections.map((s) => ({ id: s.id, label: s.navLabel }));
}

/** Derive the speakable cssSelectors (answer-first sections). */
export function speakableFor(content: GuideContent): string[] {
  return content.sections.filter((s) => s.speakable).map((s) => `#${s.id} h2`);
}
