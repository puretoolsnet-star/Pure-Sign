"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import type { ToolId } from "@/i18n/locales";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { cn } from "@/lib/cn";

type ToolShellProps = {
  toolId: ToolId;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function ToolShell({ toolId, icon: Icon, children, className }: ToolShellProps) {
  const { t } = useI18n();
  const href = useLocalizedPath();
  const copy = t.tools[toolId];

  return (
    <div className="puresign-page-shell relative flex min-h-dvh w-full max-w-full flex-1 flex-col bg-background font-sans text-gray-100">
      <SiteHeader maxWidth="4xl" />

      <main
        className={cn(
          "relative z-10 mx-auto w-full min-w-0 max-w-4xl flex-1 px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-0 sm:px-6 sm:pb-16 md:px-8",
          className,
        )}
      >
        <Link
          href={href("/")}
          aria-label={t.common.backToTools}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          {t.common.backToTools}
        </Link>

        <div className="mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span className="min-w-0 truncate">{t.security.toolNote}</span>
        </div>

        <div className="mt-6 flex min-w-0 items-start gap-3 sm:gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30 sm:h-12 sm:w-12"
            aria-hidden
          >
            <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-3xl">
              {copy.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
              {copy.description}
            </p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
