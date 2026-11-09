"use client";

import { PenTool, QrCode, Sparkles, Table2 } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/context";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import {
  ECOSYSTEM_PROJECTS,
  type EcosystemProjectId,
} from "@/lib/ecosystem";
import { cn } from "@/lib/cn";

const PROJECT_ICONS: Record<EcosystemProjectId, typeof Sparkles> = {
  purepdf: Sparkles,
  pureQr: QrCode,
  pureSign: PenTool,
  pureTable: Table2,
};

type EcosystemProjectListProps = {
  onNavigate?: () => void;
  className?: string;
};

export function EcosystemProjectList({
  onNavigate,
  className,
}: EcosystemProjectListProps) {
  const { t } = useI18n();
  const toHref = useLocalizedPath();

  return (
    <ul
      className={cn(
        "grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2",
        className,
      )}
    >
      {ECOSYSTEM_PROJECTS.map((project) => {
        const copy = t.ecosystem.items[project.id];
        const Icon = PROJECT_ICONS[project.id];
        const isActive = project.status === "active";
        const isCurrent = Boolean(project.current);

        const cardClass = cn(
          "project-card glass-card flex h-full flex-col gap-3 rounded-xl border border-slate-800/60 p-4 transition-colors hover:border-slate-700",
          isActive
            ? "bg-primary/10 ring-1 ring-primary/25"
            : "bg-surface/40 hover:bg-surface-hover/50",
        );

        const badge = isActive ? (
          <span className="w-fit shrink-0 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {t.ecosystem.activeHere}
          </span>
        ) : (
          <span className="w-fit shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">
            {t.ecosystem.comingSoon}
          </span>
        );

        const inner = (
          <>
            <div className="flex items-start justify-between gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/10",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-white/5 text-gray-300",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              {badge}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold leading-snug text-white [overflow-wrap:anywhere]">
                {copy.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400 [overflow-wrap:anywhere]">
                {copy.tagline}
              </p>
            </div>
          </>
        );

        return (
          <li key={project.id} role="none" className="min-w-0">
            {isActive && project.href ? (
              project.external ? (
                <a
                  role="menuitem"
                  href={toHref(project.href)}
                  aria-label={`${copy.name}. ${copy.tagline}`}
                  className={cardClass}
                  onClick={onNavigate}
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  role="menuitem"
                  href={toHref(project.href)}
                  aria-label={`${copy.name}. ${copy.tagline}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cardClass}
                  onClick={onNavigate}
                >
                  {inner}
                </Link>
              )
            ) : (
              <div
                role="menuitem"
                aria-disabled="true"
                className={cn(cardClass, "cursor-default")}
              >
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
