"use client";

import { Undo2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent,
} from "react";

import { SignaturePaperSurface } from "@/components/tools/signature/SignaturePaperSurface";
import { cn } from "@/lib/cn";
import type { PadSurfaceMode } from "@/lib/signatures/paper-surface";
import { trimSignatureCanvasToPng } from "@/lib/signatures/validate-signature-asset";

type Point = { x: number; y: number };

export const INK_PRESETS = [
  { id: "black", color: "#111111", ring: "ring-white/30" },
  { id: "ballpoint", color: "#0f296a", ring: "ring-blue-400/50" },
  { id: "blue", color: "#1d4ed8", ring: "ring-sky-400/45" },
  { id: "graphite", color: "#374151", ring: "ring-slate-400/50" },
  { id: "red", color: "#b91c1c", ring: "ring-red-400/45" },
  { id: "light", color: "#e2e8f0", ring: "ring-slate-400/40" },
] as const;

export type SignaturePadLabels = {
  clearPad: string;
  undo: string;
  lineWidth: string;
  inkColor: string;
  canvasHint: string;
  inkBlack: string;
  inkBlue: string;
  inkLight: string;
  inkGraphite: string;
  inkRed: string;
  inkBallpoint: string;
};

type SignaturePadProps = {
  className?: string;
  onEmptyChange?: (empty: boolean) => void;
  ariaLabel?: string;
  labels?: SignaturePadLabels;
  /** Shorter canvas on compact layouts (tool side-by-side preview). */
  compact?: boolean;
  displaySurface?: PadSurfaceMode;
  onInkColorChange?: (color: string) => void;
  onStrokeComplete?: () => void;
};

export type SignaturePadHandle = {
  clear: () => void;
  undo: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string | null;
};

const MAX_UNDO = 32;

function mid(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function SignaturePad({
  className,
  onEmptyChange,
  handleRef,
  ariaLabel = "Signature canvas",
  labels,
  compact = false,
  displaySurface = "paper",
  onInkColorChange,
  onStrokeComplete,
}: SignaturePadProps & {
  handleRef: MutableRefObject<SignaturePadHandle | null>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const empty = useRef(true);
  const lastPoint = useRef<Point | null>(null);
  const strokeStart = useRef<Point | null>(null);
  const undoStack = useRef<ImageData[]>([]);
  const strokeCount = useRef(0);
  const lineWidthRef = useRef(2.4);
  const strokeColorRef = useRef<string>(INK_PRESETS[0].color);

  const [lineWidth, setLineWidth] = useState(2.4);
  const [strokeColor, setStrokeColor] = useState<string>(INK_PRESETS[0].color);
  const [canUndo, setCanUndo] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(true);

  useEffect(() => {
    lineWidthRef.current = lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    strokeColorRef.current = strokeColor;
    onInkColorChange?.(strokeColor);
  }, [strokeColor, onInkColorChange]);

  const applyCtxDefaults = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColorRef.current;
    ctx.lineWidth = lineWidthRef.current;
  }, []);

  const pushUndoSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || canvas.width < 1 || canvas.height < 1) return;
    try {
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      undoStack.current.push(snap);
      if (undoStack.current.length > MAX_UNDO) {
        undoStack.current.shift();
      }
      setCanUndo(true);
    } catch {
      /* canvas may be tainted — ignore */
    }
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = wrapper.getBoundingClientRect();
    const cssW = Math.max(rect.width, 1);
    const cssH = Math.max(rect.height, 1);

    const snapshot =
      !empty.current && canvas.width > 0 && canvas.height > 0
        ? canvas.toDataURL()
        : null;

    canvas.width = Math.floor(cssW * ratio);
    canvas.height = Math.floor(cssH * ratio);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    applyCtxDefaults(ctx);

    if (snapshot) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, cssW, cssH);
        applyCtxDefaults(ctx);
      };
      image.src = snapshot;
    }
  }, [applyCtxDefaults, compact]);

  useEffect(() => {
    resize();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(resize);
    });
    ro.observe(wrapper);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(resize);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("resize", resize);

    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  const pointFromEvent = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const strokeTo = useCallback(
    (from: Point, to: Point) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      applyCtxDefaults(ctx);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [applyCtxDefaults],
  );

  const strokeCurve = useCallback(
    (from: Point, control: Point, to: Point) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      applyCtxDefaults(ctx);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(control.x, control.y, to.x, to.y);
      ctx.stroke();
    },
    [applyCtxDefaults],
  );

  const markNonempty = useCallback(() => {
    if (empty.current) {
      empty.current = false;
      setIsEmptyState(false);
      onEmptyChange?.(false);
    }
  }, [onEmptyChange]);

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pushUndoSnapshot();
    strokeCount.current += 1;
    drawing.current = true;
    const point = pointFromEvent(event);
    strokeStart.current = point;
    lastPoint.current = point;
    strokeTo(
      { x: point.x - 0.01, y: point.y },
      point,
    );
    markNonempty();
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    const from = lastPoint.current;
    const start = strokeStart.current;
    if (!from || !start) return;
    const point = pointFromEvent(event);
    const endMid = mid(from, point);
    strokeCurve(start, from, endMid);
    strokeStart.current = endMid;
    lastPoint.current = point;
    markNonempty();
  };

  const stopDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const from = lastPoint.current;
    const start = strokeStart.current;
    if (from && start) {
      strokeTo(start, from);
    }
    drawing.current = false;
    lastPoint.current = null;
    strokeStart.current = null;
    onStrokeComplete?.();
  };

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    applyCtxDefaults(ctx);
    empty.current = true;
    setIsEmptyState(true);
    undoStack.current = [];
    strokeCount.current = 0;
    setCanUndo(false);
    onEmptyChange?.(true);
  }, [applyCtxDefaults, onEmptyChange]);

  const undoStroke = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const snap = undoStack.current.pop();
    if (!canvas || !ctx || !snap) return;
    strokeCount.current = Math.max(0, strokeCount.current - 1);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(snap, 0, 0);
    ctx.restore();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    applyCtxDefaults(ctx);
    const hasUndo = undoStack.current.length > 0;
    setCanUndo(hasUndo);
    if (strokeCount.current === 0) {
      empty.current = true;
      setIsEmptyState(true);
      onEmptyChange?.(true);
    }
  }, [applyCtxDefaults, onEmptyChange]);

  useEffect(() => {
    handleRef.current = {
      clear: clearCanvas,
      undo: undoStroke,
      isEmpty: () => empty.current,
      toDataURL: () => {
        const canvas = canvasRef.current;
        if (!canvas || empty.current) return null;
        return trimSignatureCanvasToPng(canvas) ?? canvas.toDataURL("image/png");
      },
    };
    return () => {
      handleRef.current = null;
    };
  }, [handleRef, clearCanvas, undoStroke, onEmptyChange]);

  const inkLabel = (id: (typeof INK_PRESETS)[number]["id"]) => {
    if (!labels) return id;
    if (id === "black") return labels.inkBlack;
    if (id === "ballpoint") return labels.inkBallpoint;
    if (id === "blue") return labels.inkBlue;
    if (id === "graphite") return labels.inkGraphite;
    if (id === "red") return labels.inkRed;
    return labels.inkLight;
  };

  return (
    <div className={cn("min-w-0 space-y-3", className)}>
      <div
        ref={wrapperRef}
        data-signature-pad
        className={cn("relative w-full min-w-0", compact ? "h-28 sm:h-32" : "h-32 sm:h-36")}
      >
        <SignaturePaperSurface
          mode={displaySurface}
          compact={compact}
          className={cn("h-full", compact ? "h-28 sm:h-32" : "h-32 sm:h-36")}
        >
          {labels && isEmptyState && (
            <p
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 text-center text-sm select-none",
                displaySurface === "dark" ? "text-slate-400/90" : "text-slate-500/85",
              )}
            >
              {labels.canvasHint}
            </p>
          )}
          <canvas
            ref={canvasRef}
            className="signature-canvas relative z-10 block h-full min-h-[inherit] w-full cursor-crosshair touch-none select-none bg-transparent"
            style={{
              touchAction: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            aria-label={ariaLabel}
          />
        </SignaturePaperSurface>
      </div>

      {labels ? (
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="w-full text-xs text-gray-500 sm:w-auto sm:shrink-0">
              {labels.inkColor}
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label={labels.inkColor}>
              {INK_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  title={inkLabel(preset.id)}
                  aria-label={inkLabel(preset.id)}
                  aria-pressed={strokeColor === preset.color}
                  onClick={() => setStrokeColor(preset.color)}
                  className={cn(
                    "h-8 w-8 rounded-full border border-slate-700/80 ring-2 ring-offset-2 ring-offset-slate-900 transition",
                    strokeColor === preset.color ? preset.ring : "ring-transparent",
                  )}
                  style={{ backgroundColor: preset.color }}
                />
              ))}
            </div>
          </div>

          <label className="block min-w-0 text-xs text-gray-500">
            {labels.lineWidth}
            <input
              type="range"
              min={1}
              max={6}
              step={0.25}
              value={lineWidth}
              onChange={(event) => setLineWidth(Number(event.target.value))}
              className="mt-1.5 w-full min-w-0"
            />
          </label>

          <div className="flex min-w-0 flex-wrap gap-2">
            <button
              type="button"
              className="btn-secondary min-w-0 flex-1 sm:flex-none"
              disabled={!canUndo}
              onClick={() => undoStroke()}
            >
              <Undo2 className="h-4 w-4 shrink-0" aria-hidden />
              {labels.undo}
            </button>
            <button
              type="button"
              className="btn-secondary min-w-0 flex-1 sm:flex-none"
              onClick={() => clearCanvas()}
            >
              {labels.clearPad}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}