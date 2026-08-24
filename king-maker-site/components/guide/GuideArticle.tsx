import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { Block, ChartKey, GuideContent } from "@/lib/content-blocks";
import { GuideSectionHeader } from "@/components/guide/GuideSectionHeader";
import { AuditPrompt } from "@/components/guide/AuditPrompt";
import { KeyTakeaway } from "@/components/resource/KeyTakeaway";
import { ComparisonTable } from "@/components/resource/ComparisonTable";
import { DefinitionBlock } from "@/components/resource/DefinitionBlock";
import { DebunkBlock } from "@/components/resource/DebunkBlock";
import { PriceRangeCard } from "@/components/resource/PriceRangeCard";
import { SpecBlock } from "@/components/resource/SpecBlock";
import { AntiDoorway } from "@/components/resource/AntiDoorway";
import { CompoundingCurve } from "@/components/charts/CompoundingCurve";
import { BarCompare } from "@/components/charts/BarCompare";
import { TradeTable } from "@/components/charts/TradeTable";
import { GapStatWall } from "@/components/charts/GapStatWall";
import { LongTailCurve } from "@/components/charts/LongTailCurve";
import { StackedShareBar } from "@/components/charts/StackedShareBar";
import { MatrixGrid } from "@/components/charts/MatrixGrid";
import { MechanismDiagram } from "@/components/charts/MechanismDiagram";
import { EnterprisePageAnatomy } from "@/components/charts/EnterprisePageAnatomy";

/* Renders a GuideContent (data) into the on-convention article: answer-first
 * sections, narrow prose runs, full-bleed data modules. Charts are referenced by
 * key. The single renderer for guides, playbook chapters, and trade pages. */

const CHART: Record<ChartKey, ReactNode> = {
  compounding: <CompoundingCurve />,
  "page-count": <BarCompare />,
  "trade-table": <TradeTable />,
  "gap-wall": <GapStatWall />,
  "long-tail": <LongTailCurve />,
  "page-age": <StackedShareBar />,
  matrix: <MatrixGrid />,
  "mechanism-tie": <MechanismDiagram variant="tie" />,
  "mechanism-ledger": <MechanismDiagram variant="ledger" />,
  "enterprise-anatomy": <EnterprisePageAnatomy />,
};

/** Inline markdown: **bold** and [text](/href). */
function parseInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else
      out.push(
        <Link key={k++} href={m[3]}>
          {m[2]}
        </Link>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const isProse = (b: Block) => b.kind === "p" || b.kind === "list";

function ProseRun({ blocks }: { blocks: Block[] }) {
  return (
    <div className="km-prose">
      {blocks.map((b, i) => {
        if (b.kind === "p") return <p key={i}>{parseInline(b.text)}</p>;
        if (b.kind === "list") {
          const items = b.items.map((it, j) => <li key={j}>{parseInline(it)}</li>);
          return b.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>;
        }
        return null;
      })}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "takeaway":
      return <KeyTakeaway label={block.label}>{parseInline(block.text)}</KeyTakeaway>;
    case "comparison":
      return <ComparisonTable rows={block.rows} leftLabel={block.leftLabel} rightLabel={block.rightLabel} />;
    case "chart":
      return <>{CHART[block.chart]}</>;
    case "definition":
      return (
        <dl>
          <DefinitionBlock term={block.term}>{parseInline(block.def)}</DefinitionBlock>
        </dl>
      );
    case "debunk":
      return <DebunkBlock myth={block.myth} reality={block.reality} why={block.why} />;
    case "priceRange":
      return <PriceRangeCard title={block.title} rows={block.rows} note={block.note} />;
    case "spec":
      return <SpecBlock label={block.label} lines={block.lines} />;
    case "antiDoorway":
      return <AntiDoorway />;
    case "auditPrompt":
      return <AuditPrompt />;
    default:
      return null;
  }
}

export function GuideArticle({ content }: { content: GuideContent }) {
  return (
    <>
      {content.sections.map((s, i) => {
        // group consecutive prose blocks into one narrow run; data blocks break full-bleed
        const groups: { prose: boolean; blocks: Block[] }[] = [];
        for (const b of s.blocks) {
          const prose = isProse(b);
          const last = groups[groups.length - 1];
          if (last && last.prose === prose) last.blocks.push(b);
          else groups.push({ prose, blocks: [b] });
        }
        return (
          <section key={s.id} id={s.id} className="scroll-mt-28 py-7">
            <GuideSectionHeader index={i + 1}>{s.h2}</GuideSectionHeader>
            {groups.map((g, gi) =>
              g.prose ? (
                <ProseRun key={gi} blocks={g.blocks} />
              ) : (
                <Fragment key={gi}>
                  {g.blocks.map((b, bi) => (
                    <BlockView key={bi} block={b} />
                  ))}
                </Fragment>
              ),
            )}
          </section>
        );
      })}
    </>
  );
}
