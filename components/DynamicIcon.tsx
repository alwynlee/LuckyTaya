import {
  AlertTriangle,
  BookOpen,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Code,
  Database,
  FileText,
  Flag,
  Globe,
  Hash,
  HelpCircle,
  Home,
  Info,
  Key,
  Lock,
  Mail,
  Phone,
  Settings,
  Shield,
  Star,
  Tag,
  Target,
  Terminal,
  Unlock,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  AlertTriangle,
  BookOpen,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Code,
  Database,
  FileText,
  Flag,
  Globe,
  Hash,
  HelpCircle,
  Home,
  Info,
  Key,
  Lock,
  Mail,
  Phone,
  Settings,
  Shield,
  Star,
  Tag,
  Target,
  Terminal,
  Unlock,
  Users,
  Zap,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

/** Renders a Lucide icon by its string name (as stored in sections.icon). Falls back to FileText. */
export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = ICON_MAP[name] ?? FileText;
  return <Icon {...props} />;
}
