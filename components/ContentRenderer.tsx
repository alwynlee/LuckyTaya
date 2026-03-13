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
        el = (
          <code key={key} className="bg-dark/8 text-dark px-1.5 py-0.5 rounded text-[0.8em] font-mono">
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
            className="text-teal underline underline-offset-2 hover:text-teal/80 transition-colors"
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
  red:      "bg-red/12 text-red border-red/25",
  critical: "bg-red/12 text-red border-red/25",
  orange:   "bg-orange/12 text-orange border-orange/25",
  warning:  "bg-orange/12 text-orange border-orange/25",
  teal:     "bg-teal/12 text-teal border-teal/25",
  yellow:   "bg-yellow/35 text-dark border-yellow/50",
  gold:     "bg-gold/12 text-gold border-gold/25",
};

function Badge({ label, color = "teal" }: { label: string; color?: string }) {
  const style = BADGE_STYLES[color.toLowerCase()] ?? BADGE_STYLES.teal;
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold",
      "uppercase tracking-wide border align-middle",
      style
    )}>
      {label}
    </span>
  );
}

// ── Callout / alert block ─────────────────────────────────────────────────────

function Callout({ variant, children }: { variant?: string; children: React.ReactNode }) {
  const isCritical = variant === "critical" || variant === "error";
  return (
    <div className={cn(
      "border-l-4 rounded-r-lg px-4 py-3 my-4 text-sm",
      isCritical
        ? "border-red bg-red/8 text-red"
        : "border-orange bg-orange/8 text-orange"
    )}>
      {children}
    </div>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-dark/12 rounded-xl overflow-hidden my-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-dark/4 hover:bg-dark/8 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-dark">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-dark/40 shrink-0 transition-transform duration-200",
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
        <div className="px-4 py-3">{children}</div>
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
          <h2 key={key} className="text-[1.2rem] font-semibold text-teal mt-8 mb-3 first:mt-0 leading-snug">
            {text}
          </h2>
        );
      }
      return (
        <h3 key={key} className="text-base font-semibold text-teal mt-6 mb-2 first:mt-0 leading-snug">
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
            // Unwrap single paragraphs in list items to avoid double spacing
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
          className="border-l-4 border-dark/20 pl-4 my-4 italic text-dark/60"
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
        <div key={key} className="overflow-x-auto my-5 rounded-xl border border-dark/10">
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
        <tr key={key} className="even:bg-dark/4 odd:bg-white">
          {kids.map((c, i) => renderNode(c, i))}
        </tr>
      );

    case "tableHeader":
      return (
        <th
          key={key}
          className="border-b border-dark/10 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-dark/50 bg-dark/6"
        >
          {kids.map((c, i) => renderNode(c, i))}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="border-b border-dark/6 px-4 py-2.5 text-dark/80">
          {kids.map((c, i) => renderNode(c, i))}
        </td>
      );

    case "horizontalRule":
      return <hr key={key} className="my-6 border-dark/12" />;

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
    return (
      <p className="text-dark/30 italic text-sm">No content yet.</p>
    );
  }

  const root = content as unknown as JSONNode;
  const nodes = root.type === "doc" ? (root.content ?? []) : [root];

  return (
    <div className={cn("wiki-content", className)}>
      {nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
