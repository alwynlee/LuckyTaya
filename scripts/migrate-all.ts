#!/usr/bin/env node
// Run: npx ts-node --skipProject --transpile-only scripts/migrate-all.ts
import * as fs from "fs";
import * as path from "path";

// ── Config ───────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, "..");

function parseEnv(filePath: string): Record<string, string> {
  return Object.fromEntries(
    fs.readFileSync(filePath, "utf8")
      .split("\n")
      .filter((l) => l.includes("=") && !l.startsWith("#"))
      .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
  );
}

const env = parseEnv(path.join(ROOT, ".env.local"));
const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"]?.replace(/\/$/, "");
const SERVICE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

// ── File → Page mappings ─────────────────────────────────────────────────────

interface PageDef {
  pageId: string;   // HTML div id (without "page-" prefix)
  slug: string;
  title: string;
}

interface FileDef {
  file: string;
  sectionSlug: string;
  pages: PageDef[];
}

const FILES: FileDef[] = [
  {
    file: "migration/kyc-escalation-workflow.html",
    sectionSlug: "kyc",
    pages: [
      { pageId: "flow",     slug: "escalation-flow",  title: "Escalation Flow" },
      { pageId: "matrix",   slug: "decision-matrix",  title: "Decision Matrix" },
      { pageId: "sla",      slug: "sla-timers",       title: "SLA & Timers" },
      { pageId: "glossary", slug: "glossary",          title: "Glossary" },
    ],
  },
  {
    file: "migration/vip-workflow.html",
    sectionSlug: "vip",
    pages: [
      { pageId: "lifecycle",  slug: "player-lifecycle",    title: "Player Lifecycle" },
      { pageId: "escalation", slug: "escalation-matrix",   title: "Escalation Matrix" },
      { pageId: "tiers",      slug: "tiers-benefits",      title: "Tiers & Benefits" },
      { pageId: "sla",        slug: "sla-touchpoints",     title: "SLA Touchpoints" },
      { pageId: "glossary",   slug: "glossary",             title: "Glossary" },
    ],
  },
  {
    file: "migration/fraud-payments-workflow.html",
    sectionSlug: "fraud-payments",
    pages: [
      { pageId: "fraud",    slug: "fraud-detection", title: "Fraud Detection" },
      { pageId: "payments", slug: "payments-flow",   title: "Payments Flow" },
      { pageId: "matrix",   slug: "decision-matrix", title: "Decision Matrix" },
      { pageId: "sla",      slug: "sla-timers",      title: "SLA & Timers" },
      { pageId: "glossary", slug: "glossary",         title: "Glossary" },
    ],
  },
  {
    file: "migration/igaming-org-chart.html",
    sectionSlug: "organisation",
    pages: [
      { pageId: "org",      slug: "org-chart",       title: "Org Chart" },
      { pageId: "timeline", slug: "hiring-timeline",  title: "Hiring Timeline" },
    ],
  },
];

// ── HTML → TipTap converter ──────────────────────────────────────────────────

type TipTapNode =
  | { type: "doc"; content: TipTapNode[] }
  | { type: "heading"; attrs: { level: number }; content: TipTapNode[] }
  | { type: "paragraph"; content: TipTapNode[] }
  | { type: "text"; text: string; marks?: Array<{ type: string }> }
  | { type: "bulletList"; content: TipTapNode[] }
  | { type: "orderedList"; content: TipTapNode[] }
  | { type: "listItem"; content: TipTapNode[] }
  | { type: "table"; content: TipTapNode[] }
  | { type: "tableRow"; content: TipTapNode[] }
  | { type: "tableHeader"; attrs: { colspan: number; rowspan: number; colwidth: null }; content: TipTapNode[] }
  | { type: "tableCell"; attrs: { colspan: number; rowspan: number; colwidth: null }; content: TipTapNode[] }
  | { type: "blockquote"; content: TipTapNode[] }
  | { type: "hardBreak" };

function textNode(text: string): TipTapNode {
  return { type: "text", text };
}

function para(text: string): TipTapNode {
  const t = text.trim();
  if (!t) return { type: "paragraph", content: [] };
  return { type: "paragraph", content: [textNode(t)] };
}

function heading(level: number, text: string): TipTapNode {
  return { type: "heading", attrs: { level }, content: [textNode(text.trim())] };
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#[0-9]+;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPageHtml(html: string, pageId: string): string {
  // Match <div id="page-{pageId}" ...> ... </div> (the outermost div)
  const startRe = new RegExp(`<div[^>]+id=["']page-${pageId}["'][^>]*>`, "i");
  const startMatch = html.match(startRe);
  if (!startMatch) return "";
  const startIdx = html.indexOf(startMatch[0]);
  if (startIdx === -1) return "";

  // Walk forward counting div depth to find the matching close
  let depth = 0;
  let i = startIdx;
  while (i < html.length) {
    const openIdx = html.indexOf("<div", i);
    const closeIdx = html.indexOf("</div>", i);
    if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
      depth++;
      i = openIdx + 4;
    } else if (closeIdx !== -1) {
      depth--;
      i = closeIdx + 6;
      if (depth === 0) return html.slice(startIdx, i);
    } else {
      break;
    }
  }
  return html.slice(startIdx);
}

function parseTableRow(rowHtml: string, isHeader: boolean): TipTapNode {
  const cellTag = isHeader ? "th" : "td";
  const cellRe = new RegExp(`<${cellTag}[^>]*>([\\s\\S]*?)<\\/${cellTag}>`, "gi");
  const cells: TipTapNode[] = [];
  let m: RegExpExecArray | null;
  while ((m = cellRe.exec(rowHtml)) !== null) {
    const cellText = stripTags(m[1]);
    const cellType = isHeader ? "tableHeader" : "tableCell";
    cells.push({
      type: cellType as "tableHeader" | "tableCell",
      attrs: { colspan: 1, rowspan: 1, colwidth: null },
      content: [para(cellText)],
    });
  }
  return { type: "tableRow", content: cells };
}

function htmlToTipTap(html: string): TipTapNode[] {
  const nodes: TipTapNode[] = [];

  // Remove script and style blocks
  html = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");

  // Process tables first (replace with placeholder, process inline)
  const tableNodes: TipTapNode[] = [];
  const PLACEHOLDER = "%%TABLE_PLACEHOLDER_%%";

  html = html.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
    const rows: TipTapNode[] = [];
    // Header rows
    const theadMatch = tableHtml.match(/<thead[\s\S]*?<\/thead>/i);
    if (theadMatch) {
      const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let m: RegExpExecArray | null;
      while ((m = trRe.exec(theadMatch[0])) !== null) {
        const row = parseTableRow(m[1], true);
        if ((row.content as TipTapNode[]).length > 0) rows.push(row);
      }
    }
    // Body rows
    const tbodyMatch = tableHtml.match(/<tbody[\s\S]*?<\/tbody>/i);
    const bodyHtml = tbodyMatch ? tbodyMatch[0] : tableHtml;
    const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let m: RegExpExecArray | null;
    while ((m = trRe.exec(bodyHtml)) !== null) {
      // Skip if this row is inside thead (already processed)
      if (theadMatch && theadMatch[0].includes(m[0])) continue;
      const row = parseTableRow(m[1], false);
      if ((row.content as TipTapNode[]).length > 0) rows.push(row);
    }
    if (rows.length > 0) tableNodes.push({ type: "table", content: rows });
    return PLACEHOLDER;
  });

  // Process blockquotes / notes / alerts
  html = html.replace(/<(?:blockquote|div)[^>]*class="[^"]*(?:ph-note|alert-box|note|callout|warning)[^"]*"[^>]*>([\s\S]*?)<\/(?:blockquote|div)>/gi, (_, inner) => {
    const text = stripTags(inner);
    if (text) nodes.push({ type: "blockquote", content: [para(text)] });
    return "";
  });

  // Ordered lists
  html = html.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    const items: TipTapNode[] = [];
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let m: RegExpExecArray | null;
    while ((m = liRe.exec(inner)) !== null) {
      const text = stripTags(m[1]);
      if (text) items.push({ type: "listItem", content: [para(text)] });
    }
    if (items.length > 0) nodes.push({ type: "orderedList", content: items });
    return "";
  });

  // Unordered lists
  html = html.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    const items: TipTapNode[] = [];
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let m: RegExpExecArray | null;
    while ((m = liRe.exec(inner)) !== null) {
      const text = stripTags(m[1]);
      if (text) items.push({ type: "listItem", content: [para(text)] });
    }
    if (items.length > 0) nodes.push({ type: "bulletList", content: items });
    return "";
  });

  // Split remaining HTML into tokens and process line by line
  const lines = html.split(/\n/);
  let tableIdx = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.includes(PLACEHOLDER)) {
      if (tableIdx < tableNodes.length) nodes.push(tableNodes[tableIdx++]);
      continue;
    }

    // Headings h1-h6
    const hMatch = trimmed.match(/^<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/i);
    if (hMatch) {
      const text = stripTags(hMatch[2]);
      if (text) nodes.push(heading(parseInt(hMatch[1]), text));
      continue;
    }

    // Paragraphs
    const pMatch = trimmed.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const text = stripTags(pMatch[1]);
      if (text) nodes.push(para(text));
      continue;
    }

    // dt/dd (definition lists)
    const dtMatch = trimmed.match(/^<dt[^>]*>([\s\S]*?)<\/dt>/i);
    if (dtMatch) {
      const text = stripTags(dtMatch[1]);
      if (text) nodes.push(heading(3, text));
      continue;
    }
    const ddMatch = trimmed.match(/^<dd[^>]*>([\s\S]*?)<\/dd>/i);
    if (ddMatch) {
      const text = stripTags(ddMatch[1]);
      if (text) nodes.push(para(text));
      continue;
    }

    // Divs with text-only content (catch-all for class-based text containers)
    const divMatch = trimmed.match(/^<div[^>]*>([\s\S]*?)<\/div>$/i);
    if (divMatch) {
      const text = stripTags(divMatch[1]);
      if (text && text.length < 500) nodes.push(para(text));
    }
  }

  // Filter empty nodes and deduplicate consecutive identical paragraphs
  const filtered = nodes.filter((n) => {
    if (n.type === "paragraph") return (n.content as TipTapNode[]).length > 0;
    if (n.type === "heading") return (n.content as TipTapNode[]).length > 0 && ((n.content[0] as any).text || "").trim().length > 0;
    if (n.type === "bulletList" || n.type === "orderedList") return (n.content as TipTapNode[]).length > 0;
    if (n.type === "table") return (n.content as TipTapNode[]).length > 0;
    return true;
  });

  return filtered;
}

// ── Supabase helpers ─────────────────────────────────────────────────────────

async function getExisting(): Promise<Set<string>> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/documents?select=section_slug,page_slug`, {
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch existing docs: ${res.status} ${await res.text()}`);
  const rows = (await res.json()) as Array<{ section_slug: string; page_slug: string }>;
  return new Set(rows.map((r) => `${r.section_slug}/${r.page_slug}`));
}

async function upsertDocument(
  sectionSlug: string,
  pageSlug: string,
  title: string,
  content: object
): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ section_slug: sectionSlug, page_slug: pageSlug, title, content, updated_by: "system" }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching existing documents...");
  const existing = await getExisting();
  console.log(`Found ${existing.size} existing document(s). Skipping any that already exist.\n`);

  for (const fileDef of FILES) {
    const filePath = path.join(ROOT, fileDef.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠  File not found: ${fileDef.file} — skipping`);
      continue;
    }
    const html = fs.readFileSync(filePath, "utf8");
    console.log(`\n📄 ${fileDef.file} → section: ${fileDef.sectionSlug}`);

    for (const page of fileDef.pages) {
      const key = `${fileDef.sectionSlug}/${page.slug}`;
      if (existing.has(key)) {
        console.log(`  ⏭  ${key} — already exists, skipping`);
        continue;
      }

      const pageHtml = extractPageHtml(html, page.pageId);
      if (!pageHtml) {
        console.warn(`  ⚠  No HTML found for page-${page.pageId} — skipping`);
        continue;
      }

      const contentNodes = htmlToTipTap(pageHtml);
      const doc = { type: "doc", content: contentNodes };

      try {
        await upsertDocument(fileDef.sectionSlug, page.slug, page.title, doc);
        console.log(`  ✅ ${key} — "${page.title}" (${contentNodes.length} nodes)`);
      } catch (err) {
        console.error(`  ❌ ${key} — ${(err as Error).message}`);
      }
    }
  }

  console.log("\nDone.");
}

main().catch((err) => { console.error(err); process.exit(1); });
