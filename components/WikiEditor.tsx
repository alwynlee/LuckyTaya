"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  AlertTriangle,
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Loader2,
  Pencil,
  Quote,
  X,
} from "lucide-react";

import ContentRenderer from "@/components/ContentRenderer";
import { Callout } from "@/lib/tiptap-extensions";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";
import type { Database, Document } from "@/types";

// ── Toolbar button ────────────────────────────────────────────────────────────

function ToolBtn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "flex items-center justify-center w-8 h-8 text-sm transition-colors",
        active
          ? "bg-dark text-offwhite"
          : "text-dark/60 hover:text-dark hover:bg-dark/8",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

// ── Editor toolbar ────────────────────────────────────────────────────────────

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const toggleCallout = () => {
    if (editor.isActive("callout")) {
      editor.chain().focus().lift("callout").run();
    } else {
      editor.chain().focus().wrapIn("callout", { variant: "warning" }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-stroke bg-surface">
      <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
        <Bold className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
        <Italic className="w-3.5 h-3.5" />
      </ToolBtn>
      <div className="w-px h-5 bg-stroke mx-1" />
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <Heading2 className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <Heading3 className="w-3.5 h-3.5" />
      </ToolBtn>
      <div className="w-px h-5 bg-stroke mx-1" />
      <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
        <List className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolBtn>
      <div className="w-px h-5 bg-stroke mx-1" />
      <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
        <Quote className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn onClick={toggleCallout} active={editor.isActive("callout")} title="Alert block">
        <AlertTriangle className="w-3.5 h-3.5" />
      </ToolBtn>
    </div>
  );
}

// ── Last updated line ─────────────────────────────────────────────────────────

function LastUpdated({ updatedAt, updatedBy }: { updatedAt: string; updatedBy: string }) {
  const date = new Date(updatedAt).toLocaleDateString("en-PH", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
  return (
    <p className="mt-8 pt-4 border-t border-stroke text-xs text-muted font-medium">
      Last updated by <span className="text-dark/60">{updatedBy}</span> on {date}
    </p>
  );
}

// ── Section name formatter ────────────────────────────────────────────────────

const SECTION_NAMES: Record<string, string> = {
  "kyc":            "KYC",
  "vip":            "VIP",
  "fraud-payments": "Fraud & Payments",
  "affiliate":      "Affiliate",
  "organisation":   "Organisation",
};

function formatSectionName(slug: string, title?: string): string {
  if (title) return title;
  return SECTION_NAMES[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Main component ────────────────────────────────────────────────────────────

interface WikiEditorProps {
  document: Document;
  sectionTitle?: string;
}

export default function WikiEditor({ document: doc, sectionTitle }: WikiEditorProps) {
  const { role, user, session } = useAuth();
  const { showToast } = useToast();
  const isAdmin = role === "admin";

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localDoc, setLocalDoc] = useState(doc);

  const supabase = createClientComponentClient<Database>();

  const editor = useEditor({
    extensions: [StarterKit, Typography, Callout],
    content: localDoc.content,
    editable: isEditing,
    editorProps: {
      attributes: {
        class: "min-h-[320px] outline-none px-8 py-6 text-dark/85 leading-relaxed",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(isEditing);
    if (isEditing) setTimeout(() => editor.commands.focus("end"), 50);
  }, [editor, isEditing]);

  const handleEdit = () => {
    editor?.commands.setContent(localDoc.content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    editor?.commands.setContent(localDoc.content);
    setIsEditing(false);
  };

  const handleSave = useCallback(async () => {
    if (!editor) return;
    setSaving(true);

    const newContent = editor.getJSON();
    const now = new Date().toISOString();
    const authorEmail = user?.email ?? session?.user.email ?? "unknown";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("documents")
      .update({ content: newContent, updated_at: now, updated_by: authorEmail })
      .eq("id", localDoc.id);

    if (error) {
      showToast("Failed to save. Please try again.", "error");
      setSaving(false);
      return;
    }

    setLocalDoc((prev) => ({
      ...prev,
      content: newContent as Record<string, unknown>,
      updated_at: now,
      updated_by: authorEmail,
    }));

    setIsEditing(false);
    setSaving(false);
    showToast("Changes saved", "success");
  }, [editor, supabase, localDoc.id, user, session, showToast]);

  const eyebrow = formatSectionName(localDoc.section_slug, sectionTitle);

  return (
    <div>
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <div
        className="border-b border-white/15 shrink-0"
        style={{ backgroundColor: "var(--section-colour, #0B704E)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {/* Eyebrow */}
          <p
            className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {eyebrow}
          </p>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-[1.75rem] font-bold text-white leading-tight">
              {localDoc.title}
            </h1>

            {isAdmin && !isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 shrink-0 px-3.5 py-2 bg-yellow text-dark text-sm font-bold hover:brightness-95 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content area ──────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Save / Cancel bar — edit mode only */}
        {isAdmin && isEditing && (
          <div className="flex items-center justify-end gap-2 mb-6 pb-4 border-b border-stroke">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-stroke text-dark/70 text-sm font-semibold hover:bg-surface disabled:opacity-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-yellow text-dark text-sm font-bold hover:brightness-95 disabled:opacity-60 transition-colors"
            >
              {saving ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving…</>
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}

        {/* View mode */}
        {!isEditing && <ContentRenderer content={localDoc.content} />}

        {/* Edit mode */}
        {isEditing && (
          <div className="border border-stroke bg-white shadow-sm">
            <EditorToolbar editor={editor} />
            <div className="wiki-editor-content">
              <EditorContent editor={editor} />
            </div>
          </div>
        )}

        {/* Last updated */}
        {localDoc.updated_at && localDoc.updated_by && (
          <LastUpdated updatedAt={localDoc.updated_at} updatedBy={localDoc.updated_by} />
        )}
      </div>
    </div>
  );
}
