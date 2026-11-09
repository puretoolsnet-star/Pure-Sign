"use client";

import {
  Eraser,
  PenTool,
  TextCursorInput,
  Hash,
  Lock,
  ScanText,
  ServerOff,
  ShieldCheck,
  Stamp,
} from "lucide-react";

import { HomeToolCard } from "@/components/home/HomeToolCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";

const TOOL_META = [
  {
    id: "sign" as const,
    icon: PenTool,
    accent: "from-primary/20 to-primary/5",
  },
  {
    id: "stamp" as const,
    icon: Stamp,
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    id: "fill-form" as const,
    icon: TextCursorInput,
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    id: "page-numbers" as const,
    icon: Hash,
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: "redact" as const,
    icon: Eraser,
    accent: "from-slate-400/20 to-slate-400/5",
  },
  {
    id: "extract-text" as const,
    icon: ScanText,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
] satisfies Array<{ id: ToolId; icon: typeof PenTool; accent: string }>;

export function HomePage() {
  const { t } = useI18n();

  const badges = [
    { icon: Lock, text: t.security.pointLocal },
    { icon: ServerOff, text: t.security.pointNoUpload },
    { icon: ShieldCheck, text: t.security.pointPrivate },
  ];

  return (
    <div className="puresign-page-shell relative flex min-h-dvh w-full max-w-full flex-1 flex-col bg-background font-sans text-gray-100">
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 md:px-8 md:pb-16">
        <section className="mb-8 w-full min-w-0 max-w-3xl sm:mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:mt-4 sm:text-lg">
            {t.home.heroSubtitle}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {badges.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-800/60 bg-surface/70 px-3 py-1.5 text-xs font-medium text-gray-200 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                <span className="min-w-0 [overflow-wrap:anywhere]">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools-heading" className="w-full min-w-0">
          <h2
            id="tools-heading"
            className="mb-4 text-lg font-semibold tracking-tight text-white sm:mb-5 sm:text-xl"
          >
            {t.home.toolsHeading}
          </h2>
          <div className="grid w-full min-w-0 shrink-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOOL_META.map((tool) => (
              <HomeToolCard
                key={tool.id}
                toolId={tool.id}
                icon={tool.icon}
                accent={tool.accent}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
