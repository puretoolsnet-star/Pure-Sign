"use client";

import { Lock, ServerOff, ShieldCheck } from "lucide-react";

import { HomeToolCategory } from "@/components/home/HomeToolCategory";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import { HOME_TOOL_CATALOG } from "@/lib/tools/catalog";

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
                <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden />
                <span className="min-w-0 [overflow-wrap:anywhere]">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools-heading" className="w-full min-w-0 space-y-4 sm:space-y-5">
          <h2
            id="tools-heading"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            {t.home.toolsHeading}
          </h2>
          <p className="max-w-2xl text-sm text-gray-400">{t.home.toolsCatalogHint}</p>
          <div className="flex flex-col gap-4 sm:gap-5">
            {HOME_TOOL_CATALOG.map((category) => (
              <HomeToolCategory
                key={category.categoryKey}
                categoryKey={category.categoryKey}
                tools={category.tools}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
