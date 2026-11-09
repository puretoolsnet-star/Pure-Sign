"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import type { PdfOverlay } from "@/lib/pdf/overlays";
import { cn } from "@/lib/cn";

type Interaction = "place" | "draw-rect" | "none";

type PdfPageCanvasProps = {
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  overlays: PdfOverlay[];
  onPageChange: (index: number) => void;
  onPlace?: (x: number, y: number) => void;
  onDrawRect?: (rect: { x: number; y: number; width: number; height: number }) => void;
  onRemoveOverlay?: (id: string) => void;
  interaction?: Interaction;
  loading?: boolean;
};

function relativeFromEvent(
  event: { clientX: number; clientY: number },
  el: HTMLElement,
) {
  const rect = el.getBoundingClientRect();
  return {
    x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
  };
}

export function PdfPageCanvas({
  pageImage,
  pageIndex,
  numPages,
  overlays,
  onPageChange,
  onPlace,
  onDrawRect,
  onRemoveOverlay,
  interaction = "place",
  loading = false,
}: PdfPageCanvasProps) {
  const { t } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const [draft, setDraft] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const pageOverlays = overlays.filter((item) => item.pageIndex === pageIndex);

  return (
    <div className="w-full min-w-0 space-y-3">
      <div
        ref={stageRef}
        data-draw-stage={interaction !== "none" ? "" : undefined}
        aria-label={t.common.pageLabel(pageIndex + 1, Math.max(numPages, 1))}
        className={cn(
          "relative w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950",
          interaction !== "none" && "signature-canvas touch-none",
        )}
        style={interaction !== "none" ? { touchAction: "none" } : undefined}
        onPointerDown={(event) => {
          if (!stageRef.current || interaction === "none") return;
          if (interaction === "draw-rect") {
            event.preventDefault();
            (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
            dragStart.current = relativeFromEvent(event, stageRef.current);
            setDraft({
              x: dragStart.current.x,
              y: dragStart.current.y,
              width: 0,
              height: 0,
            });
          }
        }}
        onPointerMove={(event) => {
          if (interaction !== "draw-rect" || !dragStart.current || !stageRef.current) return;
          event.preventDefault();
          const current = relativeFromEvent(event, stageRef.current);
          const x = Math.min(dragStart.current.x, current.x);
          const y = Math.min(dragStart.current.y, current.y);
          setDraft({
            x,
            y,
            width: Math.abs(current.x - dragStart.current.x),
            height: Math.abs(current.y - dragStart.current.y),
          });
        }}
        onPointerUp={(event) => {
          if ((event.target as HTMLElement).closest("[data-overlay]")) {
            dragStart.current = null;
            setDraft(null);
            return;
          }
          if (interaction === "place" && onPlace && stageRef.current) {
            const point = relativeFromEvent(event, stageRef.current);
            onPlace(point.x, point.y);
            return;
          }
          if (interaction === "draw-rect" && draft && onDrawRect) {
            if (draft.width > 0.01 && draft.height > 0.01) {
              onDrawRect(draft);
            }
          }
          dragStart.current = null;
          setDraft(null);
        }}
      >
        {pageImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pageImage}
            alt=""
            className="pointer-events-none block w-full select-none"
            draggable={false}
          />
        ) : (
          <div className="flex min-h-64 items-center justify-center text-sm text-gray-500">
            {loading ? t.common.processing : "PDF"}
          </div>
        )}

        {pageOverlays.map((overlay) => (
          <button
            key={overlay.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemoveOverlay?.(overlay.id);
            }}
            data-overlay=""
            className="absolute overflow-hidden rounded-sm ring-1 ring-primary/40"
            style={{
              left: `${overlay.x * 100}%`,
              top: `${overlay.y * 100}%`,
              width: `${overlay.width * 100}%`,
              height: `${overlay.height * 100}%`,
            }}
            aria-label={t.common.remove}
          >
            {overlay.kind === "image" && overlay.dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={overlay.dataUrl} alt="" className="h-full w-full object-contain" />
            ) : overlay.kind === "text" ? (
              <span className="block h-full w-full truncate bg-white/90 px-1 text-left text-[11px] text-slate-900">
                {overlay.text}
              </span>
            ) : (
              <span className="block h-full w-full bg-black" />
            )}
          </button>
        ))}

        {draft && (
          <div
            className="pointer-events-none absolute bg-black/80"
            style={{
              left: `${draft.x * 100}%`,
              top: `${draft.y * 100}%`,
              width: `${draft.width * 100}%`,
              height: `${draft.height * 100}%`,
            }}
          />
        )}
      </div>

      {numPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            className="btn-secondary min-w-0 flex-1 sm:flex-none"
            disabled={pageIndex <= 0}
            onClick={() => onPageChange(pageIndex - 1)}
            aria-label={t.common.prevPage}
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{t.common.prevPage}</span>
          </button>
          <p className="order-first w-full text-center text-sm text-gray-400 sm:order-none sm:w-auto">
            {t.common.pageLabel(pageIndex + 1, numPages)}
          </p>
          <button
            type="button"
            className="btn-secondary min-w-0 flex-1 sm:flex-none"
            disabled={pageIndex >= numPages - 1}
            onClick={() => onPageChange(pageIndex + 1)}
            aria-label={t.common.nextPage}
          >
            <span className="truncate">{t.common.nextPage}</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
