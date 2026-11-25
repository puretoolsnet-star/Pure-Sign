"use client";

import { ChevronLeft, ChevronRight, Copy, Eye, EyeOff, Layers, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";

import { useI18n } from "@/i18n/context";
import type { PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay } from "@/lib/pdf/pick-pdf";
import { cn } from "@/lib/cn";

type Interaction = "place" | "draw-rect" | "none";

type GestureState = {
  pointerId: number;
  mode: "drag" | "resize";
  startClientX: number;
  startClientY: number;
  origin: Pick<PdfOverlay, "x" | "y" | "width" | "height">;
  aspect: number;
};

type PdfPageCanvasProps = {
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  overlays: PdfOverlay[];
  onPageChange: (index: number) => void;
  onPlace?: (x: number, y: number) => void;
  onDrawRect?: (rect: { x: number; y: number; width: number; height: number }) => void;
  onRemoveOverlay?: (id: string) => void;
  onOverlayChange?: (id: string, patch: Partial<Pick<PdfOverlay, "x" | "y" | "width" | "height">>) => void;
  onOverlayDuplicate?: (id: string) => void;
  onOverlayAllPages?: (id: string) => void;
  interaction?: Interaction;
  loading?: boolean;
  editableOverlays?: boolean;
  selectedOverlayId?: string | null;
  onSelectOverlay?: (id: string | null) => void;
  placeHint?: string;
  selectedOverlay?: PdfOverlay | null;
  onSelectedOverlayResize?: (relativeWidth: number) => void;
  numPagesForAll?: number;
  desktopDragHint?: boolean;
  overlayToolbar?: "full" | "minimal";
  draftRectColor?: string;
  draftRectStyle?: "fill" | "select";
  selectionRect?: { x: number; y: number; width: number; height: number } | null;
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
  onOverlayChange,
  onOverlayDuplicate,
  onOverlayAllPages,
  interaction = "place",
  loading = false,
  editableOverlays = false,
  selectedOverlayId = null,
  onSelectOverlay,
  placeHint,
  selectedOverlay,
  onSelectedOverlayResize,
  numPagesForAll = numPages,
  desktopDragHint = false,
  overlayToolbar = "full",
  draftRectColor = "#000000",
  draftRectStyle = "fill",
  selectionRect = null,
}: PdfPageCanvasProps) {
  const { t } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const activeGesture = useRef<GestureState & { overlayId: string } | null>(null);
  const suppressStageDeselectUntil = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const [draft, setDraft] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [overlayChromeVisible, setOverlayChromeVisible] = useState(true);

  const cancelActiveGesture = useCallback(() => {
    activeGesture.current = null;
  }, []);

  useEffect(() => {
    const stop = () => cancelActiveGesture();
    window.addEventListener("blur", stop);
    window.addEventListener("mouseup", stop);
    return () => {
      window.removeEventListener("blur", stop);
      window.removeEventListener("mouseup", stop);
    };
  }, [cancelActiveGesture]);

  const pageOverlays = overlays.filter((item) => item.pageIndex === pageIndex);
  const selectedOnPage = pageOverlays.find((item) => item.id === selectedOverlayId);

  return (
    <div className="w-full min-w-0 space-y-2">
      {placeHint ? (
        <p className="text-xs text-gray-500 lg:hidden">{placeHint}</p>
      ) : null}
      {editableOverlays ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {desktopDragHint ? (
            <p className="hidden min-w-0 flex-1 text-xs text-gray-500 lg:block">{t.sign.desktopDragHint}</p>
          ) : (
            <span className="hidden lg:block lg:flex-1" />
          )}
          <button
            type="button"
            className="btn-secondary inline-flex items-center gap-1.5 text-xs"
            aria-pressed={overlayChromeVisible}
            onClick={() => setOverlayChromeVisible((current) => !current)}
          >
            {overlayChromeVisible ? (
              <EyeOff className="h-3.5 w-3.5 shrink-0" aria-hidden />
            ) : (
              <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden />
            )}
            {overlayChromeVisible ? t.sign.overlayHideFrames : t.sign.overlayShowFrames}
          </button>
        </div>
      ) : null}
      {desktopDragHint && editableOverlays ? (
        <p className="text-xs text-gray-500 lg:hidden">{t.sign.desktopDragHint}</p>
      ) : null}
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
          if (!stageRef.current) return;
          if ((event.target as HTMLElement).closest("[data-overlay]")) return;
          if ((event.target as HTMLElement).closest("[data-overlay-toolbar]")) return;
          if (interaction === "none" && editableOverlays) {
            if (activeGesture.current) return;
            if (performance.now() < suppressStageDeselectUntil.current) return;
            cancelActiveGesture();
            onSelectOverlay?.(null);
            return;
          }
          if (interaction === "none") return;

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
          if (interaction === "draw-rect" && dragStart.current && stageRef.current) {
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
          }
        }}
        onPointerUp={(event) => {
          if ((event.target as HTMLElement).closest("[data-overlay]")) {
            if (interaction !== "place") {
              dragStart.current = null;
              setDraft(null);
            }
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
          <MotionOverlay
            key={overlay.id}
            overlay={overlay}
            stageRef={stageRef}
            editable={editableOverlays}
            selected={selectedOverlayId === overlay.id}
            chromeVisible={overlayChromeVisible}
            dragOverlayHint={t.sign.dragOverlay}
            onSelect={() => onSelectOverlay?.(overlay.id)}
            activeGesture={activeGesture}
            onGestureRelease={() => {
              suppressStageDeselectUntil.current = performance.now() + 400;
            }}
            onOverlayChange={onOverlayChange}
          />
        ))}

        {selectedOnPage && editableOverlays && overlayChromeVisible ? (
          <OverlayToolbar
            overlay={selectedOnPage}
            mode={overlayToolbar}
            onDuplicate={() => onOverlayDuplicate?.(selectedOnPage.id)}
            onAllPages={() => onOverlayAllPages?.(selectedOnPage.id)}
            onRemove={() => onRemoveOverlay?.(selectedOnPage.id)}
            showAllPages={numPagesForAll > 1}
            labels={{
              duplicate: t.sign.duplicateOverlay,
              allPages: t.sign.overlayAllPages,
              remove: t.sign.removeSelected,
            }}
          />
        ) : null}

        {selectionRect ? (
          <div
            className="pointer-events-none absolute rounded-sm border-2 border-dashed border-cyan-400/80 bg-cyan-500/10"
            style={{
              left: `${selectionRect.x * 100}%`,
              top: `${selectionRect.y * 100}%`,
              width: `${selectionRect.width * 100}%`,
              height: `${selectionRect.height * 100}%`,
            }}
          />
        ) : null}
        {draft ? (
          <div
            className={cn(
              "pointer-events-none absolute rounded-sm",
              draftRectStyle === "select"
                ? "border-2 border-solid border-cyan-400/90 bg-cyan-500/15"
                : "opacity-90",
            )}
            style={{
              left: `${draft.x * 100}%`,
              top: `${draft.y * 100}%`,
              width: `${draft.width * 100}%`,
              height: `${draft.height * 100}%`,
              ...(draftRectStyle === "fill" ? { backgroundColor: draftRectColor } : undefined),
            }}
          />
        ) : null}
      </div>

      {selectedOverlay && onSelectedOverlayResize ? (
        <label className="block text-xs text-gray-500">
          <span className="lg:hidden">{t.sign.sizeOnDocument}</span>
          <span className="hidden lg:inline">{t.sign.sizeOnDocumentDesktop}</span>
          <input
            type="range"
            min={0.06}
            max={0.55}
            step={0.005}
            value={selectedOverlay.width}
            onChange={(event) => onSelectedOverlayResize(Number(event.target.value))}
            className="mt-1 w-full touch-none"
          />
        </label>
      ) : null}

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

function OverlayToolbar({
  overlay,
  mode,
  onDuplicate,
  onAllPages,
  onRemove,
  showAllPages,
  labels,
}: {
  overlay: PdfOverlay;
  mode: "full" | "minimal";
  onDuplicate: () => void;
  onAllPages: () => void;
  onRemove: () => void;
  showAllPages: boolean;
  labels: { duplicate: string; allPages: string; remove: string };
}) {
  const top = Math.max(0, overlay.y * 100 - 9);
  const left = overlay.x * 100;

  return (
    <div
      data-overlay-toolbar=""
      className="pointer-events-auto absolute z-30 flex max-w-[min(100%,14rem)] touch-none gap-0.5 rounded-lg border border-slate-700/80 bg-slate-950/95 p-0.5 shadow-lg"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        touchAction: "none",
      }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {mode === "full" && showAllPages ? (
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
          aria-label={labels.allPages}
          title={labels.allPages}
          onClick={onAllPages}
        >
          <Layers className="h-3.5 w-3.5" aria-hidden />
        </button>
      ) : null}
      {mode === "full" ? (
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-300 hover:bg-white/10 hover:text-white"
          aria-label={labels.duplicate}
          title={labels.duplicate}
          onClick={onDuplicate}
        >
          <Copy className="h-3.5 w-3.5" aria-hidden />
        </button>
      ) : null}
      <button
        type="button"
        className="rounded-md p-1.5 text-rose-300 hover:bg-rose-500/15"
        aria-label={labels.remove}
        title={labels.remove}
        onClick={onRemove}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

function MotionOverlay({
  overlay,
  stageRef,
  editable,
  selected,
  chromeVisible,
  dragOverlayHint,
  onSelect,
  activeGesture,
  onGestureRelease,
  onOverlayChange,
}: {
  overlay: PdfOverlay;
  stageRef: RefObject<HTMLDivElement | null>;
  editable: boolean;
  selected: boolean;
  chromeVisible: boolean;
  dragOverlayHint: string;
  onSelect: () => void;
  activeGesture: RefObject<(GestureState & { overlayId: string }) | null>;
  onGestureRelease: () => void;
  onOverlayChange?: (id: string, patch: Partial<Pick<PdfOverlay, "x" | "y" | "width" | "height">>) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const aspect = overlay.height / Math.max(overlay.width, 0.0001);
  const showChrome = editable && chromeVisible;

  const finishGesture = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const active = activeGesture.current;
      if (!active || active.overlayId !== overlay.id) return;
      if (active.pointerId !== event.pointerId) return;
      const el = rootRef.current;
      if (el?.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      activeGesture.current = null;
      onGestureRelease();
    },
    [activeGesture, onGestureRelease, overlay.id],
  );

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const active = activeGesture.current;
    if (!active || active.overlayId !== overlay.id || active.pointerId !== event.pointerId) {
      return;
    }
    if (!stageRef.current || !onOverlayChange) return;
    event.preventDefault();
    const rect = stageRef.current.getBoundingClientRect();
    const dx = (event.clientX - active.startClientX) / rect.width;
    const dy = (event.clientY - active.startClientY) / rect.height;

    if (active.mode === "drag") {
      onOverlayChange(
        overlay.id,
        clampOverlay(
          active.origin.x + dx,
          active.origin.y + dy,
          active.origin.width,
          active.origin.height,
        ),
      );
      return;
    }

    if (overlay.kind === "rect") {
      const width = Math.max(0.02, active.origin.width + dx);
      const height = Math.max(0.02, active.origin.height + dy);
      onOverlayChange(
        overlay.id,
        clampOverlay(active.origin.x, active.origin.y, width, height),
      );
      return;
    }
    const width = Math.max(0.04, active.origin.width + dx);
    const height = width * active.aspect;
    onOverlayChange(overlay.id, clampOverlay(active.origin.x, active.origin.y, width, height));
  };

  const startGesture = (
    mode: "drag" | "resize",
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    if (!editable || !rootRef.current) return;
    event.stopPropagation();
    event.preventDefault();
    onSelect();
    activeGesture.current = {
      overlayId: overlay.id,
      pointerId: event.pointerId,
      mode,
      startClientX: event.clientX,
      startClientY: event.clientY,
      origin: {
        x: overlay.x,
        y: overlay.y,
        width: overlay.width,
        height: overlay.height,
      },
      aspect,
    };
    rootRef.current.setPointerCapture(event.pointerId);
  };

  return (
    <div
      ref={rootRef}
      data-overlay=""
      title={editable ? dragOverlayHint : undefined}
      className={cn(
        "absolute overflow-visible rounded-sm select-none",
        editable ? "touch-none" : "pointer-events-none",
        showChrome && selected ? "z-20 ring-2 ring-cyan-400/80" : "z-10",
      )}
      style={{
        left: `${overlay.x * 100}%`,
        top: `${overlay.y * 100}%`,
        width: `${overlay.width * 100}%`,
        height: `${overlay.height * 100}%`,
        touchAction: "none",
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("[data-resize-handle]")) return;
        startGesture("drag", event);
      }}
      onPointerMove={onPointerMove}
      onPointerUp={finishGesture}
      onPointerCancel={finishGesture}
      onLostPointerCapture={finishGesture}
    >
      <div className="pointer-events-none h-full w-full overflow-hidden rounded-sm bg-transparent">
        {overlay.kind === "image" && overlay.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={overlay.dataUrl}
            alt=""
            className="signature-overlay-image h-full min-h-[4px] w-full min-w-[4px] object-contain opacity-100"
            style={{ filter: "none", mixBlendMode: "normal" }}
            draggable={false}
          />
        ) : overlay.kind === "text" ? (
          <span
            className="flex h-full w-full items-center truncate bg-transparent px-1 text-left text-[clamp(10px,2.5vw,14px)] font-semibold"
            style={{ color: overlay.color ?? "#111111" }}
          >
            {overlay.text}
          </span>
        ) : (
          <span
            className="block h-full w-full"
            style={{ backgroundColor: overlay.color ?? "#000000" }}
          />
        )}
      </div>
      {showChrome && selected ? (
        <div
          data-resize-handle=""
          className="absolute -bottom-1.5 -right-1.5 z-30 h-5 w-5 cursor-se-resize rounded-sm border-2 border-slate-900 bg-cyan-400"
          aria-hidden
          onPointerDown={(event) => startGesture("resize", event)}
        />
      ) : null}
    </div>
  );
}