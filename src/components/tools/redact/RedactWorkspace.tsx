"use client";

import { Download, Loader2, Pencil, SquareDashedMousePointer, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay } from "@/lib/pdf/pick-pdf";

const REDACT_COLORS = [
  { id: "black", color: "#000000" },
  { id: "graphite", color: "#374151" },
  { id: "navy", color: "#0f296a" },
] as const;

type RedactWorkspaceProps = {
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  loading: boolean;
  onPageChange: (index: number) => void;
  overlays: PdfOverlay[];
  setOverlays: React.Dispatch<React.SetStateAction<PdfOverlay[]>>;
  onDownload: () => void;
  downloading: boolean;
  downloadLabel: string;
};

export function RedactWorkspace({
  pageImage,
  pageIndex,
  numPages,
  loading,
  onPageChange,
  overlays,
  setOverlays,
  onDownload,
  downloading,
  downloadLabel,
}: RedactWorkspaceProps) {
  const { t } = useI18n();
  const [drawMode, setDrawMode] = useState(true);
  const [inkColor, setInkColor] = useState<string>(REDACT_COLORS[0].color);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);

  const pageOverlays = overlays.filter((item) => item.pageIndex === pageIndex);
  const selected = overlays.find((item) => item.id === selectedOverlayId) ?? null;

  const totals = useMemo(() => {
    const onPage = overlays.filter((item) => item.pageIndex === pageIndex).length;
    return { onPage, total: overlays.length };
  }, [overlays, pageIndex]);

  const resizeSelected = (relativeWidth: number) => {
    if (!selected) return;
    const aspect = selected.height / Math.max(selected.width, 0.0001);
    const nextH = relativeWidth * aspect;
    const patch = clampOverlay(selected.x, selected.y, relativeWidth, nextH);
    setOverlays((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)),
    );
  };

  const applyColorToSelection = (color: string) => {
    setInkColor(color);
    if (selected?.kind === "rect") {
      setOverlays((current) =>
        current.map((item) => (item.id === selected.id ? { ...item, color } : item)),
      );
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 flex-1 text-xs text-gray-500">{t.redact.workspaceHint}</p>
        <button
          type="button"
          className="btn-primary inline-flex shrink-0 items-center gap-1.5 text-sm"
          disabled={downloading || overlays.length === 0}
          onClick={onDownload}
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {downloadLabel}
        </button>
      </div>

      <div className="sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-2 sm:pb-2 sm:pt-2">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          <button
            type="button"
            className={cn(
              "btn-secondary inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs sm:flex-none sm:text-sm",
              drawMode && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
            )}
            onClick={() => {
              setDrawMode(true);
              setSelectedOverlayId(null);
            }}
          >
            <Pencil className="h-4 w-4 shrink-0" aria-hidden />
            {t.redact.drawMode}
          </button>
          <button
            type="button"
            className={cn(
              "btn-secondary inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs sm:flex-none sm:text-sm",
              !drawMode && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
            )}
            onClick={() => setDrawMode(false)}
          >
            <SquareDashedMousePointer className="h-4 w-4 shrink-0" aria-hidden />
            {t.redact.editMode}
          </button>
        </div>
        <p className="mt-1.5 px-0.5 text-xs text-cyan-400/90 lg:hidden">
          {drawMode ? t.redact.drawHintMobile : t.redact.editHintMobile}
        </p>
        <p className="mt-0.5 hidden px-0.5 text-xs text-gray-500 lg:block">
          {drawMode ? t.redact.drawHint : t.redact.editHint}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800/70 bg-slate-900/50 px-3 py-2 text-xs text-gray-400">
        <span>{t.redact.boxesOnPage(totals.onPage)}</span>
        <span>{t.redact.boxes(totals.total)}</span>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800/60 p-3">
        <span className="w-full text-xs font-medium uppercase tracking-wider text-gray-500 sm:w-auto">
          {t.redact.inkColor}
        </span>
        {REDACT_COLORS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-label={t.redact.inkPreset(preset.id)}
            onClick={() => applyColorToSelection(preset.color)}
            className={cn(
              "h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-slate-900",
              inkColor === preset.color ? "ring-cyan-400/70" : "ring-transparent",
            )}
            style={{ backgroundColor: preset.color }}
          />
        ))}
      </div>

      <PdfPageCanvas
        pageImage={pageImage}
        pageIndex={pageIndex}
        numPages={numPages}
        overlays={pageOverlays}
        interaction={drawMode ? "draw-rect" : "none"}
        editableOverlays={!drawMode}
        desktopDragHint={!drawMode}
        loading={loading}
        onPageChange={onPageChange}
        draftRectColor={inkColor}
        selectedOverlayId={selectedOverlayId}
        onSelectOverlay={setSelectedOverlayId}
        onDrawRect={(rect) =>
          setOverlays((current) => [
            ...current,
            {
              id: createOverlayId(),
              pageIndex,
              kind: "rect",
              color: inkColor,
              ...rect,
            },
          ])
        }
        onOverlayChange={(id, patch) =>
          setOverlays((current) =>
            current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          )
        }
        onRemoveOverlay={(id) => {
          setOverlays((current) => current.filter((item) => item.id !== id));
          setSelectedOverlayId((current) => (current === id ? null : current));
        }}
        selectedOverlay={selected?.kind === "rect" ? selected : null}
        onSelectedOverlayResize={selected?.kind === "rect" ? resizeSelected : undefined}
        placeHint={drawMode ? t.redact.drawHintMobile : undefined}
        overlayToolbar="minimal"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-secondary min-h-10 flex-1 sm:flex-none"
          disabled={pageOverlays.length === 0}
          onClick={() => {
            setOverlays((current) => current.filter((item) => item.pageIndex !== pageIndex));
            setSelectedOverlayId(null);
          }}
        >
          {t.redact.clearPage}
        </button>
        <button
          type="button"
          className="btn-secondary min-h-10 flex-1 sm:flex-none"
          disabled={overlays.length === 0}
          onClick={() => {
            setOverlays([]);
            setSelectedOverlayId(null);
          }}
        >
          {t.redact.clearAll}
        </button>
        {selected?.kind === "rect" ? (
          <button
            type="button"
            className="btn-secondary inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 sm:flex-none"
            onClick={() => {
              setOverlays((current) => current.filter((item) => item.id !== selected.id));
              setSelectedOverlayId(null);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {t.redact.deleteSelected}
          </button>
        ) : null}
      </div>
    </div>
  );
}