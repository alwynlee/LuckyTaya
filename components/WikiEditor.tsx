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
import { cn } from "@/lib/utils";
import type { Database, Document } from "@/types";

// ── Toolbar button ────────────────────────────────────────────────────────────

function ToolBtn({
  onClick,
  active,
  disabled,
  title,
  children,
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
        "flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors",
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
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-dark/10 bg-white/50">
      <ToolBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </ToolBtn>

      <ToolBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-dark/15 mx-1" />

      <ToolBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="w-3.5 h-3.5" />
      </ToolBtn>

      <ToolBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-dark/15 mx-1" />

      <ToolBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        <List className="w-3.5 h-3.5" />
      </ToolBtn>

      <ToolBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-dark/15 mx-1" />

      <ToolBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Blockquote"
      >
        <Quote className="w-3.5 h-3.5" />
      </ToolBtn>

      <ToolBtn
        onClick={toggleCallout}
        active={editor.isActive("callout")}
        title="Alert block"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
      </ToolBtn>
    </div>
  );
}

// ── Last updated line ─────────────────────────────────────────────────────────

function LastUpdated({ updatedAt, updatedBy }: { updatedAt: string; updatedBy: string }) {
  const date = new Date(updatedAt).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <p className="mt-8 pt-4 border-t border-dark/8 text-xs text-dark/35 font-medium">
      Last updated by <span className="text-dark/50">{updatedBy}</span> on {date}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface WikiEditorProps {
  document: Document;
}

export default function WikiEditor({ document: doc }: WikiEditorProps) {
  const { role, user, session } = useAuth();
  const isAdmin = role === "admin";

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
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

  // Sync editor editable state
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(isEditing);
    if (isEditing) {
      setTimeout(() => editor.commands.focus("end"), 50);
    }
  }, [editor, isEditing]);

  const handleEdit = () => {
    setSaveError(null);
    editor?.commands.setContent(localDoc.content);
    setIsEditing(true);
  };

  const handleCancel = () => {
    editor?.commands.setContent(localDoc.content);
    setIsEditing(false);
    setSaveError(null);
  };

  const handleSave = useCallback(async () => {
    if (!editor) return;
    setSaving(true);
    setSaveError(null);

    const newContent = editor.getJSON();
    const now = new Date().toISOString();
    const authorEmail = user?.email ?? session?.user.email ?? "unknown";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("documents")
      .update({
        content: newContent,
        updated_at: now,
        updated_by: authorEmail,
      })
      .eq("id", localDoc.id);

    if (error) {
      setSaveError("Failed to save. Please try again.");
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
  }, [editor, supabase, localDoc.id, user, session]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark leading-tight">{localDoc.title}</h1>

        {/* Admin controls */}
        {isAdmin && !isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-lg bg-teal text-offwhite text-sm font-bold hover:bg-teal/85 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
        )}

        {isAdmin && isEditing && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-dark/20 text-dark/70 text-sm font-semibold hover:bg-dark/6 disabled:opacity-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow text-dark text-sm font-bold hover:brightness-95 disabled:opacity-60 transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Save error ────────────────────────────────────────────────────── */}
      {saveError && (
        <div className="mb-4 px-4 py-2.5 bg-red/10 border border-red/20 rounded-lg text-sm text-red font-medium">
          {saveError}
        </div>
      )}

      {/* ── View mode ─────────────────────────────────────────────────────── */}
      {!isEditing && (
        <ContentRenderer content={localDoc.content} />
      )}

      {/* ── Edit mode ─────────────────────────────────────────────────────── */}
      {isEditing && (
        <div className="border border-dark/15 rounded-xl overflow-hidden bg-white shadow-sm">
          <EditorToolbar editor={editor} />
          <div className="wiki-editor-content">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}

      {/* ── Last updated ──────────────────────────────────────────────────── */}
      {localDoc.updated_at && localDoc.updated_by && (
        <LastUpdated
          updatedAt={localDoc.updated_at}
          updatedBy={localDoc.updated_by}
        />
      )}
    </div>
  );
}
