"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { HomeToolCard } from "@/components/home/HomeToolCard";
import { useI18n } from "@/i18n/context";
import type { ToolCategoryKey } from "@/lib/tools/catalog";
import type { HomeToolMeta } from "@/lib/tools/catalog";
import { cn } from "@/lib/cn";

type HomeToolCategoryProps = {
  categoryKey: ToolCategoryKey;
  tools: HomeToolMeta[];
  defaultExpanded?: boolean;
};

export function HomeToolCategory({
  categoryKey,
  tools,
  defaultExpanded = true,
}: HomeToolCategoryProps) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const headingId = useId();
  const panelId = useId();
  const copy = t.home.toolCategories[categoryKey];

  return (
    <section
      className="w-full min-w-0 rounded-2xl border border-slate-800/70 bg-gray-950/40"
      aria-labelledby={headingId}
    >
      <button
        type="button"
        id={headingId}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full min-w-0 items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-900/50 sm:px-5 sm:py-5"
      >
        <span
          className={cn(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 ring-1 ring-cyan-500/30 transition-transform",
            expanded && "rotate-0",
          )}
          aria-hidden
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 text-cyan-400 transition-transform duration-200",
              !expanded && "-rotate-90",
            )}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold text-white sm:text-lg">
            {copy.title}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-gray-400">
            {copy.subtitle}
          </span>
        </span>
        <span className="sr-only">
          {expanded ? t.home.collapseCategory : t.home.expandCategory}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!expanded}
        className={cn(
          "grid w-full min-w-0 grid-cols-1 gap-4 border-t border-slate-800/60 px-4 pb-4 pt-4 sm:grid-cols-2 sm:px-5 sm:pb-5 lg:grid-cols-3",
          !expanded && "hidden",
        )}
      >
        {tools.map((tool) => (
          <HomeToolCard
            key={tool.id}
            toolId={tool.id}
            icon={tool.icon}
            accent={tool.accent}
          />
        ))}
      </div>
    </section>
  );
}
