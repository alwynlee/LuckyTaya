// =============================================================================
// Domain types — mirror the Supabase schema exactly.
// Keep in sync with: supabase/migrations or the Table Editor.
// =============================================================================

// -----------------------------------------------------------------------------
// Section
// Table: sections
// -----------------------------------------------------------------------------
export interface Section {
  /** UUID primary key */
  id: string;
  /** URL-safe identifier, unique (e.g. "rules", "faq") */
  slug: string;
  /** Display name shown in navigation */
  title: string;
  /** Lucide icon name (e.g. "BookOpen", "HelpCircle") */
  icon: string;
  /** Hex colour token for this section (e.g. "#0B704E") */
  colour: string;
  /** Integer controlling render order in navigation */
  display_order: number;
}

// -----------------------------------------------------------------------------
// Document
// Table: documents
// -----------------------------------------------------------------------------
export interface Document {
  /** UUID primary key */
  id: string;
  /** Foreign key → sections.slug */
  section_slug: string;
  /** URL-safe page identifier, unique within a section */
  page_slug: string;
  /** Display title of the page */
  title: string;
  /** TipTap / ProseMirror JSON document stored as JSONB */
  content: Record<string, unknown>;
  /** ISO 8601 timestamp of the last save */
  updated_at: string;
  /** UUID of the user who last saved the document */
  updated_by: string;
}

// -----------------------------------------------------------------------------
// User
// Table: users (typically the auth.users shadow table or a public profile table)
// -----------------------------------------------------------------------------
export type UserRole = "admin" | "viewer";

export interface User {
  /** UUID primary key — matches auth.users.id */
  id: string;
  /** User's email address */
  email: string;
  /** Access level for the application */
  role: UserRole;
}

// =============================================================================
// Supabase Database shape
// Plug these into createClient<Database>() in lib/supabase.ts once your
// schema is finalised, or replace with the generated types from:
//   npx supabase gen types typescript --project-id <your-project-id>
// =============================================================================
export interface Database {
  public: {
    Tables: {
      sections: {
        Row: Section;
        Insert: Omit<Section, "id"> & { id?: string };
        Update: Partial<Section>;
        Relationships: [];
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Document>;
        Relationships: [];
      };
      users: {
        Row: User;
        Insert: Omit<User, "id"> & { id?: string };
        Update: Partial<User>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
