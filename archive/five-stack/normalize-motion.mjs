#!/usr/bin/env node
/**
 * normalize-motion.mjs · 5-stack experiment AST normalization (stack 3)
 *
 * Deterministic post-generation rewriter. Scans generated JSX, identifies
 * known patterns where compression typically drops motion specs, inserts
 * the missing clauses.
 *
 * Status: SCAFFOLD. Implementations marked [DONE], [PARTIAL], or [TODO].
 * Priority order (impact-weighted):
 *   1. [DONE]    Add ENTER_EASE constant if missing
 *   2. [DONE]    Wrap bare ◆ markers in 2.4s pulse motion.span
 *   3. [PARTIAL] Normalize cascade timing values to canonical ladder
 *   4. [TODO]    Complete hover catalog on group-parent elements
 *   5. [TODO]    Inject useReducedMotion guards
 *   6. [TODO]    Append duration class to bare transition-all
 *   7. [TODO]    Convert alert-dot candidates to 1.8s motion.span
 *
 * Usage:
 *   node web/scripts/normalize-motion.mjs --section hero --file path/to/Hero.tsx
 *   node web/scripts/normalize-motion.mjs --section hero --file path/to/Hero.tsx --dry-run
 *   node web/scripts/normalize-motion.mjs --all --dir web/app/<project>/
 *   node web/scripts/normalize-motion.mjs --help
 *
 * Canonical values referenced (MOTION_DOCTRINE §03):
 *   ENTER_EASE  = [0.16, 1, 0.3, 1]
 *   Diamond ◆   = 2.4s easeInOut opacity [0.65, 1, 0.65] scale [1, 1.18, 1]
 *   Alert dot   = 1.8s easeInOut opacity [0.6, 1, 0.6] scale [1, 1.3, 1]
 *   Cascade     = eyebrow 0.00, H2 0.50, subhead 0.45, CTAs 3.2/3.4, stats 3.8
 *   Hover card  = -translate-y-1 transition-all duration-300
 *   Hover nudge = group-hover:translate-x-1 transition-transform duration-200
 *   Phone       = group-hover:rotate-[-12deg] transition-transform duration-200
 *   Springs     = 260/18 pop, 380/32 layoutId
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { parseArgs } from "node:util";

// ───────────────────────────────────────────────────────────────────────
// CLI

const { values, positionals } = parseArgs({
  options: {
    section: { type: "string" },
    file:    { type: "string" },
    dir:     { type: "string" },
    all:     { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
    json:    { type: "boolean", default: false },
    help:    { type: "boolean", default: false },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(`normalize-motion.mjs — 5-stack experiment AST normalization

Usage:
  --section <name>    Section name (hero, services, reviews, etc.) for role inference
  --file <path>       Single JSX/TSX file to normalize
  --dir <path>        Directory of section files (used with --all)
  --all               Process all .tsx files in --dir
  --dry-run           Print what would change; do not write
  --json              Output report as JSON (for tooling integration)
  --help              Show this message

Examples:
  node web/scripts/normalize-motion.mjs --section hero --file web/app/cedar/Hero.tsx
  node web/scripts/normalize-motion.mjs --section hero --file web/app/cedar/Hero.tsx --dry-run
  node web/scripts/normalize-motion.mjs --all --dir web/app/cedar/components/sections/
`);
  process.exit(0);
}

const SECTION = values.section ?? "unknown";
const DRY_RUN = values["dry-run"];
const JSON_OUT = values.json;

// ───────────────────────────────────────────────────────────────────────
// Canonical values (from MOTION_DOCTRINE §03)

const CANONICAL = {
  ENTER_EASE: "[0.16, 1, 0.3, 1]",
  CASCADE_LADDER: {
    eyebrow:   { delay: 0.00, duration: 0.70 },
    h2:        { delay: 0.50, duration: 0.60, typeInDelay: 0.10 },
    subhead:   { delay: 0.45, duration: 0.70, y: 20 },
    rightCol:  { delay: 0.55, duration: 0.70, y: 24 },
    cards:     { delay: 0.20, childDelay: 0.08 },
    hero: {
      eyebrow:  { delay: 0.20, duration: 1.10 },
      h1:       { delay: 1.00, charStagger: 0.022, duration: 0.60 },
      subhead:  { delay: 2.60, duration: 1.00 },
      ctaA:     { delay: 3.20, duration: 0.85 },
      ctaB:     { delay: 3.40, duration: 0.85 },
      stats:    { delay: 3.80, duration: 0.80 },
    },
  },
  AMBIENT: {
    diamond:    { duration: 2.4, opacity: "[0.65, 1, 0.65]", scale: "[1, 1.18, 1]" },
    alertDot:   { duration: 1.8, opacity: "[0.6, 1, 0.6]",   scale: "[1, 1.3, 1]" },
    vignette:   { duration: 9,   opacity: "[0.55, 0.7, 0.55]" },
    zoom:       { duration: 18,  scaleFrom: 1.08, scaleTo: 1 },
  },
  HOVER: {
    cardLift:    "hover:-translate-y-1 transition-all duration-300",
    cardLiftHvy: "hover:-translate-y-1.5 transition-all duration-300",
    arrowNudge:  "group-hover:translate-x-1 transition-transform duration-200",
    phoneRotate: "group-hover:rotate-[-12deg] transition-transform duration-200",
    iconRotate:  "group-hover:rotate-[-4deg] transition-all duration-300",
    chipDotBloom:"group-hover:scale-125 transition-all duration-200",
    photoScale:  "group-hover:scale-105 transition-transform duration-[450ms] ease-out",
  },
  SPRINGS: {
    pop:      { type: "spring", stiffness: 260, damping: 18 },
    layoutId: { type: "spring", stiffness: 380, damping: 32 },
  },
};

// ───────────────────────────────────────────────────────────────────────
// File processing

function loadFile(filePath) {
  if (!existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
  return readFileSync(filePath, "utf-8");
}

function saveFile(filePath, content) {
  if (DRY_RUN) return;
  writeFileSync(filePath, content, "utf-8");
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 1 · ENTER_EASE declaration [DONE]
//
// If file imports from framer-motion but lacks ENTER_EASE declaration,
// inject const ENTER_EASE = [0.16, 1, 0.3, 1] as const; after imports.

function ensureEnterEase(source, report) {
  const usesFramerMotion = /from\s+["']framer-motion["']/.test(source);
  const hasEnterEase = /const\s+ENTER_EASE\s*=\s*\[\s*0\.16\s*,\s*1\s*,\s*0\.3\s*,\s*1\s*\]/.test(source);

  if (!usesFramerMotion || hasEnterEase) return source;

  // Find the last import statement
  const importRegex = /^import\s+.+?from\s+["'][^"']+["'];?\s*$/gm;
  let lastImportEnd = 0;
  let match;
  while ((match = importRegex.exec(source)) !== null) {
    lastImportEnd = match.index + match[0].length;
  }

  if (lastImportEnd === 0) return source;

  const insertion = `\n\nconst ENTER_EASE = [0.16, 1, 0.3, 1] as const;\n`;
  report.transforms.push({ transform: "ENTER_EASE injection", details: "added after final import" });
  return source.slice(0, lastImportEnd) + insertion + source.slice(lastImportEnd);
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 2 · Wrap bare ◆ markers in 2.4s pulse [DONE]
//
// Detect any literal ◆ inside JSX text content that is not already
// wrapped in motion.span. Wrap with pulsing animation.
//
// Heuristic: look for ">◆<" or ">{" + a string containing ◆.
// Wrapping pattern preserves the original text node structure.

function wrapBareDiamonds(source, report) {
  // Detect literal ◆ in JSX text not already inside a motion.span
  // Pattern: >◆< (between JSX tags) OR ◆ inside a {"..."} string expression
  const bareDiamondPattern = />\s*◆\s*</g;
  let count = 0;

  const transformed = source.replace(bareDiamondPattern, (match, offset) => {
    // Look back ~200 chars to see if this is inside an existing motion.span
    const context = source.slice(Math.max(0, offset - 200), offset);
    if (/motion\.span[^<]*$/.test(context)) return match;

    count++;
    return `>{<motion.span aria-hidden className="text-[--color-accent]" animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.18, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: ${count} * 0.3 }}>◆</motion.span>}<`;
  });

  if (count > 0) {
    report.transforms.push({ transform: "Bare ◆ pulse wrap", details: `wrapped ${count} bare ◆ markers in 2.4s pulse` });
    // Ensure motion is imported
    if (!/import\s+\{[^}]*\bmotion\b[^}]*\}\s+from\s+["']framer-motion["']/.test(transformed)) {
      const fmImportMatch = transformed.match(/import\s+\{([^}]*)\}\s+from\s+["']framer-motion["']/);
      if (fmImportMatch) {
        const existing = fmImportMatch[1];
        if (!existing.includes("motion")) {
          return transformed.replace(fmImportMatch[0], `import { ${existing.trim()}, motion } from "framer-motion"`);
        }
      } else {
        return `import { motion } from "framer-motion";\n` + transformed;
      }
    }
  }

  return transformed;
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 3 · Cascade timing normalization [PARTIAL]
//
// Detect FadeUp / HeadingWithUnderline / motion.X components with delay
// values that don't match the canonical cascade ladder.
//
// Heuristic: infer element role from surrounding context (eyebrow / h2 /
// subhead / etc.) and replace delay value with canonical.
//
// TODO: Full role inference requires AST parsing (jscodeshift or
// ts-morph). The regex-based approach below catches the most common
// cases — eyebrow above HeadingWithUnderline, subhead below — but
// misses contextual ambiguity.

function normalizeCascadeTiming(source, report) {
  let transformed = source;
  let count = 0;

  // Match Eyebrow followed by FadeUp with wrong delay
  // (eyebrow should be delay 0.0)
  const eyebrowPattern = /<FadeUp\s+delay\s*=\s*\{?([\d.]+)\}?[^>]*>[\s\S]{0,300}?<(?:Eyebrow|p[^>]*eyebrow)/g;
  transformed = transformed.replace(eyebrowPattern, (match, currentDelay) => {
    if (parseFloat(currentDelay) > 0.05) {
      count++;
      return match.replace(`delay={${currentDelay}}`, `delay={0.0}`).replace(`delay=${currentDelay}`, `delay=0.0`);
    }
    return match;
  });

  // TODO: Add patterns for H2 delay (should be 0.50), subhead delay (0.45), etc.
  // TODO: Hero-section-specific cascade (different values per MOTION §03.4)
  // TODO: Deep-depth cascade (shift ~0.4s later for sections 5+)

  if (count > 0) {
    report.transforms.push({ transform: "Cascade timing", details: `normalized ${count} eyebrow delays to 0.00s` });
  }

  return transformed;
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 4 · Complete hover catalog on group parents [TODO]
//
// Detect elements with className containing "group" that lack the
// expected child hover behaviors. Add missing utilities.
//
// TODO patterns:
//   - className contains "group" + has <button> child without group-hover:translate-x-1
//     → add arrow nudge to button
//   - className contains "group" + has photo <Image> child without group-hover:scale-105
//     → add photo scale to Image className
//   - className contains "group" + has bottom rule div without scale-x transition
//     → add bottom accent rule reveal
//
// Implementation requires AST parsing to find children of group parents.
// Regex-based detection unreliable.

function completeHoverCatalog(source, report) {
  // SCAFFOLD ONLY — not yet implemented
  // TODO: Use ts-morph or jscodeshift for reliable child detection
  return source;
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 5 · Inject useReducedMotion guards [TODO]
//
// Detect files using motion.X without useReducedMotion check.
// If file is a primitive (likely components/motion/*), inject
// useReducedMotion at top and conditional render at bottom.
//
// TODO: Detect primitive files vs section files (primitives need full
// guard, sections need motion-reduce: utility added).

function injectReducedMotionGuards(source, report) {
  // SCAFFOLD ONLY
  return source;
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 6 · transition-all duration fix [TODO]
//
// Detect className strings containing "transition-all" without an
// adjacent duration-* utility. Append duration-300 for cards, duration-200
// for nudges/icons.
//
// Heuristic: if className also contains "translate-x" / "rotate" / icon
// keywords → duration-200. Otherwise duration-300.

function fixTransitionDurations(source, report) {
  let count = 0;
  // Match className strings (single or double quoted) containing transition-all
  // without an accompanying duration-* utility
  const transitionAllPattern = /className\s*=\s*["']([^"']*transition-all[^"']*)["']/g;

  const transformed = source.replace(transitionAllPattern, (match, cn) => {
    if (/\bduration-\d+/.test(cn)) return match;
    // Heuristic: nudges/icons get 200ms, cards get 300ms
    const isNudge = /(translate-x|rotate-|scale-\d{2,3})/.test(cn);
    const dur = isNudge ? "duration-200" : "duration-300";
    count++;
    const newCn = cn.replace("transition-all", `transition-all ${dur}`);
    return match.replace(cn, newCn);
  });

  if (count > 0) {
    report.transforms.push({ transform: "transition-all duration", details: `appended explicit duration to ${count} elements` });
  }

  return transformed;
}

// ───────────────────────────────────────────────────────────────────────
// Transformation 7 · Convert alert-dot candidates [TODO]
//
// Detect rounded-full + bg-{accent} + small size elements that should
// pulse but don't. Convert to motion.span with 1.8s loop.
//
// TODO: Reliable detection requires distinguishing decorative dots from
// other small rounded elements (badges, indicators that already animate).

function convertAlertDots(source, report) {
  // SCAFFOLD ONLY
  return source;
}

// ───────────────────────────────────────────────────────────────────────
// Pipeline

function normalizeFile(filePath, sectionName) {
  const source = loadFile(filePath);
  const report = {
    file: filePath,
    section: sectionName,
    transforms: [],
    dryRun: DRY_RUN,
  };

  let transformed = source;
  transformed = ensureEnterEase(transformed, report);
  transformed = wrapBareDiamonds(transformed, report);
  transformed = normalizeCascadeTiming(transformed, report);
  transformed = completeHoverCatalog(transformed, report);
  transformed = injectReducedMotionGuards(transformed, report);
  transformed = fixTransitionDurations(transformed, report);
  transformed = convertAlertDots(transformed, report);

  if (transformed !== source) {
    saveFile(filePath, transformed);
    report.modified = true;
  } else {
    report.modified = false;
  }

  return report;
}

function normalizeDir(dir) {
  if (!existsSync(dir)) throw new Error(`Directory not found: ${dir}`);
  const files = readdirSync(dir, { withFileTypes: true });
  const reports = [];

  for (const entry of files) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      reports.push(...normalizeDir(fullPath));
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      const inferredSection = basename(entry.name, extname(entry.name)).toLowerCase();
      reports.push(normalizeFile(fullPath, inferredSection));
    }
  }

  return reports;
}

// ───────────────────────────────────────────────────────────────────────
// Main

function main() {
  const reports = [];

  if (values.all) {
    if (!values.dir) {
      console.error("ERROR: --all requires --dir <path>");
      process.exit(1);
    }
    reports.push(...normalizeDir(values.dir));
  } else if (values.file) {
    reports.push(normalizeFile(values.file, SECTION));
  } else {
    console.error("ERROR: provide --file or --all + --dir. Use --help for usage.");
    process.exit(1);
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(reports, null, 2));
  } else {
    for (const r of reports) {
      const modBadge = r.modified ? (r.dryRun ? "[DRY-RUN-WOULD-MODIFY]" : "[MODIFIED]") : "[unchanged]";
      console.log(`${modBadge} ${r.file} (section: ${r.section})`);
      for (const t of r.transforms) {
        console.log(`    · ${t.transform}: ${t.details}`);
      }
    }
    const totalModified = reports.filter(r => r.modified).length;
    const totalTransforms = reports.reduce((s, r) => s + r.transforms.length, 0);
    console.log(`\nAST normalize summary: ${totalTransforms} transforms across ${totalModified}/${reports.length} files${DRY_RUN ? " (dry run)" : ""}.`);
  }
}

main();
