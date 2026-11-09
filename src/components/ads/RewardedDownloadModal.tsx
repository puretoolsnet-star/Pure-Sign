"use client";

import { Download, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { useI18n } from "@/i18n/context";
import {
  ADSTERRA_WATCH_MS,
  adsterraNative,
  loadAdsterraNative,
  triggerAdsterraReward,
} from "@/lib/ads/adsterra";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";

type Phase = "idle" | "watching" | "ready";

type RewardedDownloadModalProps = {
  open: boolean;
  sessionKey: number;
  onClose: () => void;
  onUnlocked: () => void | Promise<void>;
};

function RewardedDownloadPanel({
  sessionKey,
  onClose,
  onUnlocked,
}: {
  sessionKey: number;
  onClose: () => void;
  onUnlocked: () => void | Promise<void>;
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const autoStarted = useRef(false);

  useEffect(() => {
    setPhase("idle");
    setProgress(0);
    autoStarted.current = false;
    loadAdsterraNative();
  }, [sessionKey]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (phase !== "watching") return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / ADSTERRA_WATCH_MS);
      setProgress(next);
      if (next >= 1) {
        setPhase("ready");
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [phase, sessionKey]);

  useEffect(() => {
    if (phase !== "ready" || autoStarted.current) return;
    autoStarted.current = true;
    void onUnlocked();
  }, [phase, onUnlocked]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase !== "watching") onClose();
    };
    const onAdComplete = () => setPhase("ready");
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("adsterra-reward-complete", onAdComplete);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("adsterra-reward-complete", onAdComplete);
    };
  }, [phase, onClose]);

  const secondsLeft = Math.max(0, Math.ceil((1 - progress) * (ADSTERRA_WATCH_MS / 1000)));

  const startWatching = () => {
    if (phase !== "idle") return;
    triggerAdsterraReward();
    setPhase("watching");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rewarded-download-title"
      className="pointer-events-auto fixed inset-0 flex items-end justify-center overflow-x-hidden bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      style={{ zIndex: Z.modalPanel }}
    >
      <div
        className="relative w-[92vw] max-w-md overflow-x-hidden overflow-y-auto rounded-t-3xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:max-w-lg sm:rounded-2xl"
        style={{
          maxHeight: "min(92dvh, 40rem)",
          paddingBottom: "max(0.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-300/80">
              {t.rewardedAd.sponsored}
            </p>
            <h2
              id="rewarded-download-title"
              className="mt-1 text-base font-semibold text-white sm:text-lg"
            >
              {t.rewardedAd.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 [overflow-wrap:anywhere]">
              {t.rewardedAd.message}
            </p>
          </div>
          {phase !== "watching" && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t.rewardedAd.close}
              className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5">
          <div
            id={adsterraNative.containerId || undefined}
            data-adsterra-slot="reward"
            className="flex min-h-[7.5rem] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/80 px-4 py-5 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t.rewardedAd.slotLabel}
            </p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-gray-400">
              Adsterra
            </p>
          </div>

          {phase === "watching" && (
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-100"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {t.rewardedAd.watching} {t.rewardedAd.progress(secondsLeft)}
              </p>
            </div>
          )}

          {phase === "idle" && (
            <p className="text-sm text-gray-400">{t.rewardedAd.waitHint}</p>
          )}
          {phase === "ready" && (
            <p className="text-sm text-emerald-200/90">{t.rewardedAd.thanks}</p>
          )}
        </div>

        <div className="border-t border-slate-800 bg-slate-950/40 px-4 py-4 sm:px-5">
          {phase === "ready" ? (
            <button
              type="button"
              onClick={() => void onUnlocked()}
              className="btn-primary w-full"
            >
              <Download className="h-4 w-4" aria-hidden />
              {t.rewardedAd.download}
            </button>
          ) : (
            <button
              type="button"
              onClick={startWatching}
              disabled={phase === "watching"}
              className={cn(
                "btn-primary w-full",
                phase === "watching" && "cursor-not-allowed opacity-60",
              )}
            >
              <Play className="h-4 w-4 fill-current" aria-hidden />
              {t.rewardedAd.watch}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function RewardedDownloadModal({
  open,
  sessionKey,
  onClose,
  onUnlocked,
}: RewardedDownloadModalProps) {
  if (!open) return null;

  return (
    <BodyPortal open={open}>
      <RewardedDownloadPanel
        key={sessionKey}
        sessionKey={sessionKey}
        onClose={onClose}
        onUnlocked={onUnlocked}
      />
    </BodyPortal>
  );
}
