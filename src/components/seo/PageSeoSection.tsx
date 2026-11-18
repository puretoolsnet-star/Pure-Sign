"use client";

import { ChevronDown, Lock, PenTool, ServerOff, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useI18n } from "@/i18n/context";
import type { SeoPageId } from "@/i18n/seo/copy";
import { getSeoPageContent } from "@/i18n/seo/content";

const BENEFIT_ICONS: LucideIcon[] = [ShieldCheck, PenTool, ServerOff, Lock];

type PageSeoSectionProps = {
  page: SeoPageId;
};

export function PageSeoSection({ page }: PageSeoSectionProps) {
  const { locale } = useI18n();
  const content = getSeoPageContent(page, locale);
  const headingId = `${page}-seo-heading`;
  const faqHeadingId = `${page}-faq-heading`;

  return (
    <section
      className="mt-10 w-full min-w-0 space-y-8 sm:mt-12 sm:space-y-10"
      aria-labelledby={headingId}
    >
      <div className="rounded-2xl border border-slate-800/70 bg-gray-950/40 px-4 py-5 sm:px-6 sm:py-6">
        <h2
          id={headingId}
          className="text-lg font-semibold tracking-tight text-white sm:text-2xl"
        >
          {content.heading}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
          {content.intro}
        </p>

        <h3 className="mt-6 text-base font-semibold text-white sm:mt-8 sm:text-lg">
          {content.benefitsHeading}
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {content.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
            return (
              <li
                key={benefit.title}
                className="glass-card rounded-2xl border-slate-800/60 p-4"
              >
                <div
                  className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 ring-1 ring-cyan-500/30"
                  aria-hidden
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="text-sm font-semibold text-white">{benefit.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {benefit.text}
                </p>
              </li>
            );
          })}
        </ul>

        {content.sections?.length ? (
          <div className="mt-6 space-y-5 border-t border-slate-800/60 pt-6 sm:mt-8">
            {content.sections.map((section) => (
              <article key={section.heading} className="min-w-0">
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {section.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-[0.9375rem]">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="rounded-2xl border border-slate-800/70 bg-gray-950/40 px-4 py-5 sm:px-6 sm:py-6"
        aria-labelledby={faqHeadingId}
      >
        <h2
          id={faqHeadingId}
          className="text-lg font-semibold tracking-tight text-white sm:text-2xl"
        >
          {content.faqHeading}
        </h2>
        <div className="mt-4 divide-y divide-slate-800/70">
          {content.faq.map((item) => (
            <details
              key={item.question}
              className="group py-3 first:pt-0 last:pb-0"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 text-left text-sm font-medium text-gray-100 marker:content-none [&::-webkit-details-marker]:hidden sm:text-base">
                <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
                <ChevronDown
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-2 pr-7 text-sm leading-relaxed text-gray-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
