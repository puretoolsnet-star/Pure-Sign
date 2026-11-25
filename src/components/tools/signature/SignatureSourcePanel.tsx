"use client";

import { BookmarkPlus, Check, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type MutableRefObject } from "react";

import { INK_PRESETS, SignaturePad } from "@/components/tools/SignaturePad";
import { PadSurfaceSwitch } from "@/components/tools/signature/PadSurfaceSwitch";

import type { SignaturePadHandle, SignaturePadLabels } from "@/components/tools/SignaturePad";
import { ImageSignatureEditor } from "@/components/tools/signature/ImageSignatureEditor";
import {
  notifySavedSignaturesChanged,
  SavedSignaturesStrip,
} from "@/components/tools/signature/SavedSignaturesStrip";
import { TypedSignatureEditor } from "@/components/tools/signature/TypedSignatureEditor";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { renderMarkPng } from "@/lib/signatures/marks";
import {
  resolvePadSurface,
  type PadSurfaceMode,
} from "@/lib/signatures/paper-surface";
import { saveSignature, type SavedSignatureSource } from "@/lib/signatures/storage";
import type { TypedSignatureStyle } from "@/lib/pdf/stamp-image";

export type SignatureMode = "draw" | "type" | "image";

type SignatureSourcePanelProps = {
  padRef: MutableRefObject<SignaturePadHandle | null>;
  compact?: boolean;
  size: number;
  onSizeChange: (value: number) => void;
  onAssetChange: (dataUrl: string | null) => void;
  onPlaceMark?: (dataUrl: string) => void;
  placeAllPages: boolean;
  onPlaceAllPagesChange: (value: boolean) => void;
  showPlaceAllPages?: boolean;
  showQuickMarks?: boolean;
  defaultMode?: SignatureMode;
};

export function SignatureSourcePanel({
  padRef,
  compact,
  size,
  onSizeChange,
  onAssetChange,
  onPlaceMark,
  placeAllPages,
  onPlaceAllPagesChange,
  showPlaceAllPages = true,
  showQuickMarks = true,
  defaultMode = "draw",
}: SignatureSourcePanelProps) {
  const { t } = useI18n();
  const [mode, setMode] = useState<SignatureMode>(defaultMode);
  const [typed, setTyped] = useState("");
  const [typeStyle, setTypeStyle] = useState<TypedSignatureStyle>("script");
  const [typeColor, setTypeColor] = useState("#111827");
  const [typedPreview, setTypedPreview] = useState<string | null>(null);
  const [imageRaw, setImageRaw] = useState<string | null>(null);
  const [imageProcessed, setImageProcessed] = useState<string | null>(null);
  const [savedLibrary, setSavedLibrary] = useState<string | null>(null);
  const [saveName, setSaveName] = useState("");
  const [padSurface, setPadSurface] = useState<PadSurfaceMode>("paper");
  const [drawInk, setDrawInk] = useState<string>(INK_PRESETS[0].color);
  const [imageInk, setImageInk] = useState<string>(INK_PRESETS[0].color);

  const activeInk =
    mode === "draw" ? drawInk : mode === "type" ? typeColor : imageInk;
  const { surface: displaySurface, autoDark } = useMemo(
    () => resolvePadSurface(padSurface, activeInk),
    [padSurface, activeInk],
  );

  const padLabels: SignaturePadLabels = {
    clearPad: t.sign.clearPad,
    undo: t.sign.undo,
    lineWidth: t.sign.lineWidth,
    inkColor: t.sign.inkColor,
    canvasHint: t.sign.canvasHint,
    inkBlack: t.sign.inkBlack,
    inkBlue: t.sign.inkBlue,
    inkBallpoint: t.sign.inkBallpoint,
    inkLight: t.sign.inkLight,
    inkGraphite: t.sign.inkGraphite,
    inkRed: t.sign.inkRed,
  };

  const refreshAsset = useCallback(async () => {
    if (savedLibrary) {
      onAssetChange(savedLibrary);
      return;
    }
    if (mode === "draw") {
      onAssetChange(padRef.current?.toDataURL() ?? null);
      return;
    }
    if (mode === "type") {
      onAssetChange(typedPreview);
      return;
    }
    onAssetChange(imageProcessed);
  }, [imageProcessed, mode, onAssetChange, padRef, savedLibrary, typedPreview]);

  useEffect(() => {
    void refreshAsset();
  }, [refreshAsset]);

  useEffect(() => {
    const handler = () => setSavedLibrary(null);
    window.addEventListener("puresign-signatures-changed", handler);
    return () => window.removeEventListener("puresign-signatures-changed", handler);
  }, []);

  const handleSave = () => {
    void (async () => {
      let dataUrl: string | null = null;
      let source: SavedSignatureSource = mode;
      if (mode === "draw") dataUrl = padRef.current?.toDataURL() ?? null;
      else if (mode === "type") dataUrl = typedPreview;
      else dataUrl = imageProcessed;
      if (!dataUrl) return;
      const name =
        saveName.trim() ||
        (mode === "type" && typed.trim()) ||
        t.sign.savedDefaultName(new Date().toLocaleDateString());
      saveSignature({ name, dataUrl, source });
      notifySavedSignaturesChanged();
      setSaveName("");
    })();
  };

  return (
    <div className="min-w-0 space-y-3">
      <SavedSignaturesStrip
        displaySurface={displaySurface}
        onApply={(dataUrl) => {
          setSavedLibrary(dataUrl);
          onAssetChange(dataUrl);
        }}
      />

      <PadSurfaceSwitch
        value={padSurface}
        onChange={setPadSurface}
        autoDark={autoDark}
      />

      <div className="flex w-full min-w-0 flex-wrap gap-2">
        {(["draw", "type", "image"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setSavedLibrary(null);
              setMode(item);
            }}
            className={cn(
              "min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-medium sm:flex-none",
              mode === item && !savedLibrary
                ? "bg-primary/20 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white",
            )}
          >
            {t.sign[item]}
          </button>
        ))}
      </div>

      {mode === "draw" && (
        <SignaturePad
          handleRef={padRef}
          ariaLabel={t.sign.canvasAria}
          labels={padLabels}
          compact={compact}
          displaySurface={displaySurface}
          onInkColorChange={setDrawInk}
          onStrokeComplete={() => void refreshAsset()}
          onEmptyChange={() => void refreshAsset()}
        />
      )}

      {mode === "type" && (
        <TypedSignatureEditor
          value={typed}
          onChange={setTyped}
          style={typeStyle}
          onStyleChange={setTypeStyle}
          color={typeColor}
          onColorChange={setTypeColor}
          onPreview={setTypedPreview}
          displaySurface={displaySurface}
        />
      )}

      {mode === "image" && (
        <ImageSignatureEditor
          rawDataUrl={imageRaw}
          onRawDataUrl={setImageRaw}
          onProcessed={setImageProcessed}
          onInkColorChange={setImageInk}
          displaySurface={displaySurface}
        />
      )}

      <div className="flex min-w-0 flex-wrap items-end gap-2">
        <label className="block min-w-0 flex-1 text-sm text-gray-400">
          {t.sign.saveAs}
          <input
            className="input-field mt-1.5"
            value={saveName}
            onChange={(event) => setSaveName(event.target.value)}
            placeholder={t.sign.saveAsPlaceholder}
          />
        </label>
        <button type="button" className="btn-secondary shrink-0" onClick={handleSave}>
          <BookmarkPlus className="h-4 w-4" aria-hidden />
          {t.sign.saveLocal}
        </button>
      </div>

      <label className="block text-sm text-gray-400">
        {t.sign.size}
        <input
          type="range"
          min={0.12}
          max={0.5}
          step={0.01}
          value={size}
          onChange={(event) => onSizeChange(Number(event.target.value))}
          className="mt-2 w-full min-w-0"
        />
      </label>

      {showPlaceAllPages ? (
        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input
            type="checkbox"
            checked={placeAllPages}
            onChange={(event) => onPlaceAllPagesChange(event.target.checked)}
          />
          {t.sign.placeAllPages}
        </label>
      ) : null}

      {onPlaceMark && showQuickMarks ? (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">{t.sign.quickMarks}</span>
          <button
            type="button"
            className="btn-secondary px-3"
            aria-label={t.sign.markCheck}
            onClick={() => onPlaceMark(renderMarkPng("check", "#059669"))}
          >
            <Check className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            className="btn-secondary px-3"
            aria-label={t.sign.markCross}
            onClick={() => onPlaceMark(renderMarkPng("cross", "#dc2626"))}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}