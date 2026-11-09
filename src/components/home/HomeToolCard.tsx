"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { toolRoute } from "@/lib/i18n/routing";

type HomeToolCardProps = {
  toolId: ToolId;
  icon: LucideIcon;
  accent: string;
};

export function HomeToolCard({ toolId, icon: Icon, accent }: HomeToolCardProps) {
  const { locale, t } = useI18n();
  const copy = t.tools[toolId];

  return (
    <Link
      href={toolRoute(locale, toolId)}
      aria-label={`${copy.title}. ${copy.description}`}
      className="glass-card group flex h-full w-full min-w-0 flex-col rounded-2xl border-slate-800/60 p-4 text-left transition-colors hover:border-slate-700 hover:bg-surface-hover/80 sm:p-5"
    >
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} ring-1 ring-white/10`}
        aria-hidden
      >
        <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-white">{copy.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
        {copy.description}
      </p>
      <span className="mt-4 text-sm font-medium text-primary transition-colors group-hover:text-blue-300">
        {t.home.openTool}
      </span>
    </Link>
  );
}
