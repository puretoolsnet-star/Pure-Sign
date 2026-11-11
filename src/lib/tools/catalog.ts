import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  Eraser,
  Files,
  Hash,
  Lock,
  LockOpen,
  PenTool,
  ScanText,
  Stamp,
  TextCursorInput,
} from "lucide-react";

import type { ToolId } from "@/i18n/locales";

export type ToolCategoryKey =
  | "signaturesStamps"
  | "formsLayout"
  | "analysisSecurity"
  | "proBatch";

export type HomeToolMeta = {
  id: ToolId;
  icon: LucideIcon;
  accent: string;
};

export const HOME_TOOL_CATALOG: Array<{
  categoryKey: ToolCategoryKey;
  tools: HomeToolMeta[];
}> = [
  {
    categoryKey: "signaturesStamps",
    tools: [
      {
        id: "sign",
        icon: PenTool,
        accent: "from-cyan-500/25 to-cyan-500/5",
      },
      {
        id: "stamp",
        icon: Stamp,
        accent: "from-cyan-400/20 to-slate-500/5",
      },
      {
        id: "date-stamp",
        icon: CalendarClock,
        accent: "from-sky-500/20 to-cyan-500/5",
      },
    ],
  },
  {
    categoryKey: "formsLayout",
    tools: [
      {
        id: "fill-form",
        icon: TextCursorInput,
        accent: "from-violet-500/20 to-cyan-500/5",
      },
      {
        id: "page-numbers",
        icon: Hash,
        accent: "from-amber-500/20 to-cyan-500/5",
      },
      {
        id: "redact",
        icon: Eraser,
        accent: "from-slate-400/20 to-cyan-500/5",
      },
    ],
  },
  {
    categoryKey: "analysisSecurity",
    tools: [
      {
        id: "extract-text",
        icon: ScanText,
        accent: "from-emerald-500/20 to-cyan-500/5",
      },
      {
        id: "protect-pdf",
        icon: Lock,
        accent: "from-cyan-600/25 to-cyan-500/5",
      },
      {
        id: "unlock-pdf",
        icon: LockOpen,
        accent: "from-teal-500/20 to-cyan-500/5",
      },
    ],
  },
  {
    categoryKey: "proBatch",
    tools: [
      {
        id: "batch-sign",
        icon: Files,
        accent: "from-cyan-500/30 to-cyan-400/10",
      },
    ],
  },
];
