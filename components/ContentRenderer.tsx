"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── ProseMirror / TipTap JSON types ──────────────────────────────────────────

interface Mark {
  type: "bold" | "italic" | "code" | "link" | string;
  attrs?: Record<string, unknown>;
}

interface JSONNode {
  type: string;
  text?: string;
  marks?: Mark[];
  attrs?: Record<string, unknown>;
  content?: JSONNode[];
}

// ── Inline text with marks ────────────────────────────────────────────────────

function renderInline(node: JSONNode, key: number): React.ReactNode {
  if (node.type !== "text") return renderNode(node, key);
  if (!node.marks?.length) return <span key={key}>{node.text}</span>;

  let el: React.ReactNode = node.text;
  for (const mark of node.marks) {
    switch (mark.type) {
      case "bold":
        el = <strong key={key} className="font-semibold text-dark">{el}</strong>;
        break;
      case "italic":
        el = <em key={key} className="italic">{el}</em>;
        break;
      case "code":
        // Outfit Regular (no monospace) per design system
        el = (
          <code key={key} className="bg-surface text-dark px-1.5 py-0.5 text-[0.82em] border border-stroke">
            {el}
          </code>
        );
        break;
      case "link":
        el = (
          <a
            key={key}
            href={mark.attrs?.href as string}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity"
            style={{ color: "var(--section-colour, #0B704E)" }}
          >
            {el}
          </a>
        );
        break;
    }
  }
  return el;
}

// ── Badge / status tag ────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  red:      "bg-red/8 text-red border-red/25",
  critical: "bg-red/8 text-red border-red/25",
  orange:   "bg-orange/8 text-orange border-orange/25",
  warning:  "bg-orange/8 text-orange border-orange/25",
  teal:     "bg-teal/8 text-teal border-teal/25",
  yellow:   "bg-yellow/35 text-dark border-yellow/50",
  gold:     "bg-gold/8 text-gold border-gold/25",
};

function Badge({ label, color = "teal" }: { label: string; color?: string }) {
  const style = BADGE_STYLES[color.toLowerCase()] ?? BADGE_STYLES.teal;
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 text-[11px] font-bold",
      "uppercase tracking-[0.08em] border align-middle",
      style
    )}>
      {label}
    </span>
  );
}

// ── Callout / alert block ─────────────────────────────────────────────────────

function Callout({ variant, children }: { variant?: string; children: React.ReactNode }) {
  const isCritical = variant === "critical" || variant === "error";
  const borderColor = isCritical ? "#CC0B1A" : "#E53C0E";
  const bgColor = isCritical ? "rgba(204,11,26,0.05)" : "rgba(229,60,14,0.05)";
  return (
    <div
      className="border border-stroke px-4 py-3 my-4 text-sm text-dark"
      style={{ borderLeftWidth: "4px", borderLeftColor: borderColor, backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-stroke overflow-hidden my-4"
      style={{ borderLeftWidth: "3px", borderLeftColor: "var(--section-colour, #0B704E)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-stroke/60 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-dark">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-3 bg-white">{children}</div>
      </div>
    </div>
  );
}

// ── Recursive node renderer ───────────────────────────────────────────────────

function renderNode(node: JSONNode, key: number): React.ReactNode {
  const kids = node.content ?? [];

  switch (node.type) {
    case "doc":
      return kids.map((c, i) => renderNode(c, i));

    case "paragraph":
      return (
        <p key={key} className="text-dark/85 leading-relaxed mb-4 last:mb-0">
          {kids.map((c, i) => renderInline(c, i))}
        </p>
      );

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2;
      const text = kids.map((c, i) => renderInline(c, i));
      if (level === 2) {
        return (
          <h2
            key={key}
            className="text-[1.15rem] font-semibold mt-8 mb-3 first:mt-0 leading-snug"
            style={{ color: "var(--section-colour, #0B704E)" }}
          >
            {text}
          </h2>
        );
      }
      return (
        <h3
          key={key}
          className="text-base font-semibold mt-5 mb-2 first:mt-0 leading-snug"
          style={{ color: "var(--section-colour, #0B704E)" }}
        >
          {text}
        </h3>
      );
    }

    case "bulletList":
      return (
        <ul key={key} className="list-disc pl-6 mb-4 space-y-1">
          {kids.map((c, i) => renderNode(c, i))}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="list-decimal pl-6 mb-4 space-y-1">
          {kids.map((c, i) => renderNode(c, i))}
        </ol>
      );

    case "listItem":
      return (
        <li key={key} className="text-dark/85 leading-relaxed pl-0.5">
          {kids.map((c, i) => {
            if (c.type === "paragraph") {
              return c.content?.map((t, j) => renderInline(t, j));
            }
            return renderNode(c, i);
          })}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="border-l-4 pl-4 my-4 italic text-dark/60"
          style={{ borderLeftColor: "var(--section-colour, #0B704E)" }}
        >
          {kids.map((c, i) => renderNode(c, i))}
        </blockquote>
      );

    case "callout":
      return (
        <Callout key={key} variant={node.attrs?.variant as string}>
          {kids.map((c, i) => renderNode(c, i))}
        </Callout>
      );

    case "badge":
      return (
        <Badge
          key={key}
          label={node.attrs?.label as string ?? ""}
          color={node.attrs?.color as string}
        />
      );

    case "accordion":
      return (
        <Accordion key={key} title={node.attrs?.title as string ?? ""}>
          {kids.map((c, i) => renderNode(c, i))}
        </Accordion>
      );

    // ── Tables ──────────────────────────────────────────────────────────────
    case "table":
      return (
        <div key={key} className="overflow-x-auto my-5 border border-stroke">
          <table className="w-full text-sm border-collapse">
            {kids.map((c, i) => renderNode(c, i))}
          </table>
        </div>
      );

    case "tableBody":
    case "tableHead":
      return <tbody key={key}>{kids.map((c, i) => renderNode(c, i))}</tbody>;

    case "tableRow":
      return (
        <tr key={key} className="hover:bg-surface transition-colors">
          {kids.map((c, i) => renderNode(c, i))}
        </tr>
      );

    case "tableHeader":
      return (
        <th
          key={key}
          className="border-b border-stroke px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-muted bg-surface"
        >
          {kids.map((c, i) => renderNode(c, i))}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="border-b border-stroke px-4 py-2.5 text-dark/85">
          {kids.map((c, i) => renderNode(c, i))}
        </td>
      );

    case "horizontalRule":
      return <hr key={key} className="my-6 border-stroke" />;

    case "hardBreak":
      return <br key={key} />;

    case "text":
      return renderInline(node, key);

    default:
      return null;
  }
}

// ── Public component ──────────────────────────────────────────────────────────

interface ContentRendererProps {
  content: Record<string, unknown>;
  className?: string;
}

export default function ContentRenderer({ content, className }: ContentRendererProps) {
  if (!content || Object.keys(content).length === 0) {
    return <p className="text-dark/30 italic text-sm">No content yet.</p>;
  }

  const root = content as unknown as JSONNode;
  const nodes = root.type === "doc" ? (root.content ?? []) : [root];

  return (
    <div className={cn("wiki-content", className)}>
      {nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
