"use client";

import { useEffect, useId, useRef } from "react";

import { useI18n } from "@/i18n/context";
import {
  ADSTERRA_BANNER,
  mountAdsterraBanner,
} from "@/lib/ads/adsterra";
import { cn } from "@/lib/cn";

export type AdBannerLayout = "sidebar" | "inline";

type AdBannerProps = {
  className?: string;
  /** Sidebar: sticky column on lg; stacks under tool form on mobile. */
  layout?: AdBannerLayout;
  /** Value for `data-ad-slot` (analytics / ad network hooks). */
  slot?: string;
};

function applyBannerScale(
  viewport: HTMLDivElement,
  host: HTMLDivElement,
): void {
  const w = viewport.clientWidth;
  const scale = Math.min(1, w / ADSTERRA_BANNER.width);
  viewport.style.height = `${ADSTERRA_BANNER.height * scale}px`;
  host.style.transform = `translateX(-50%) scale(${scale})`;
}

export function AdBanner({
  className,
  layout = "sidebar",
  slot = "tool-sidebar",
}: AdBannerProps) {
  const { t } = useI18n();
  const isSidebar = layout === "sidebar";
  const viewportRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/:/g, "");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    return mountAdsterraBanner(host, `${instanceId}-${slot}`);
  }, [instanceId, slot]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const host = hostRef.current;
    if (!viewport || !host) return;

    const sync = () => applyBannerScale(viewport, host);
    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  return (
    <aside
      aria-label={t.toolAd.sponsored}
      data-ad-slot={slot}
      className={cn(
        "pointer-events-auto relative z-0 min-w-0 w-full max-w-full shrink-0",
        isSidebar &&
          "order-2 border-t border-white/10 pt-6 lg:order-none lg:border-t-0 lg:pt-0",
        className,
      )}
    >
      <p
        className={cn(
          "mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-500",
          isSidebar && "lg:text-left",
        )}
      >
        {t.toolAd.sponsored}
      </p>
      <div
        className={cn(
          "glass-card w-full max-w-full rounded-xl border border-white/10 bg-surface/30 px-3 py-3",
          isSidebar ? "lg:px-2.5" : "px-4 py-4",
        )}
      >
        <div className="mx-auto w-full min-w-0 max-w-[300px]">
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden rounded-lg bg-black/15"
          >
            <div
              ref={hostRef}
              className="absolute left-1/2 top-0 origin-top"
              style={{
                width: ADSTERRA_BANNER.width,
                height: ADSTERRA_BANNER.height,
              }}
            />
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500 lg:text-left">
          {t.toolAd.slotHint}
        </p>
      </div>
    </aside>
  );
}