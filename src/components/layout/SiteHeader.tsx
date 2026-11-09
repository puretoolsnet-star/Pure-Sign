"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";

import { EcosystemMenu } from "@/components/layout/EcosystemMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/i18n/context";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { cn } from "@/lib/cn";

type SiteHeaderProps = {
  className?: string;
  maxWidth?: "6xl" | "4xl";
};

export function SiteHeader({ className, maxWidth = "6xl" }: SiteHeaderProps) {
  const { t } = useI18n();
  const href = useLocalizedPath();

  return (
    <header
      className={cn(
        "relative z-20 mx-auto w-full min-w-0 shrink-0 px-4 py-3 sm:px-6 sm:py-5 md:px-8 md:py-6",
        maxWidth === "6xl" ? "max-w-6xl" : "max-w-4xl",
        className,
      )}
    >
      <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3">
        <Link
          href={href("/")}
          className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
          aria-label={`${t.brand.name} — ${t.brand.tagline}`}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30 sm:h-10 sm:w-10"
            aria-hidden
          >
            <PenTool className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden />
          </div>
          <div className="min-w-0 overflow-hidden">
            <p className="truncate text-sm font-semibold tracking-tight text-white sm:text-lg">
              {t.brand.name}
            </p>
            <p className="hidden truncate text-xs text-gray-400 sm:block">
              {t.brand.tagline}
            </p>
          </div>
          <span className="ml-1 hidden max-w-[min(100%,14rem)] truncate items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent lg:inline-flex">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {t.security.badge}
          </span>
        </Link>

        <div className="relative z-30 flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          <EcosystemMenu />
          <LanguageSwitcher />
        </div>
      </div>

      <span className="mt-2 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent lg:hidden">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
        <span className="truncate">{t.security.badge}</span>
      </span>
    </header>
  );
}
