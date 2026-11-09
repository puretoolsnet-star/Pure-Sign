"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MutableRefObject,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/cn";

type Point = { x: number; y: number };

type SignaturePadProps = {
  className?: string;
  onEmptyChange?: (empty: boolean) => void;
  ariaLabel?: string;
};

export type SignaturePadHandle = {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string | null;
};

export function SignaturePad({
  className,
  onEmptyChange,
  handleRef,
  ariaLabel = "Signature canvas",
}: SignaturePadProps & {
  handleRef: MutableRefObject<SignaturePadHandle | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const empty = useRef(true);
  const last = useRef<Point | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    const snapshot = canvas.toDataURL();
    canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2.4;
    if (!empty.current) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, rect.width, rect.height);
      image.src = snapshot;
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const pointFromEvent = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    last.current = pointFromEvent(event);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const from = last.current;
    if (!canvas || !ctx || !from) return;
    const point = pointFromEvent(event);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    last.current = point;
    if (empty.current) {
      empty.current = false;
      onEmptyChange?.(false);
    }
  };

  const stopDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drawing.current = false;
    last.current = null;
  };

  useEffect(() => {
    handleRef.current = {
      clear: () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        empty.current = true;
        onEmptyChange?.(true);
      },
      isEmpty: () => empty.current,
      toDataURL: () => {
        const canvas = canvasRef.current;
        if (!canvas || empty.current) return null;
        return canvas.toDataURL("image/png");
      },
    };
    return () => {
      handleRef.current = null;
    };
  }, [handleRef, onEmptyChange]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "signature-canvas h-40 w-full cursor-crosshair touch-none rounded-xl bg-slate-950/80",
        className,
      )}
      style={{ touchAction: "none" }}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      onPointerCancel={stopDrawing}
      aria-label={ariaLabel}
    />
  );
}
