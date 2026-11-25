"use client";

import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { DocumentTextEditor } from "@/components/tools/signature/DocumentTextEditor";
import { SignatureSourcePanel } from "@/components/tools/signature/SignatureSourcePanel";
import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import type { DocumentTextFontId } from "@/lib/document-text/fonts";
import type { SignaturePadHandle } from "@/components/tools/SignaturePad";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";
import { useNarrowViewport } from "@/lib/use-narrow-viewport";
import { signatureHasVisibleInk } from "@/lib/signatures/validate-signature-asset";

export type CreatorIntent = "signature" | "initials" | "text";

type SignatureCreatorDialogProps = {
  open: boolean;
  intent: CreatorIntent;
  onClose: () => void;
  onInsert: (
    asset:
      | { kind: "image"; dataUrl: string; relativeWidth: number }
      | {
          kind: "text";
          text: string;
          color: string;
          fontId: DocumentTextFontId;
          relativeWidth: number;
        },
  ) => void;
};

export function SignatureCreatorDialog({
  open,
  intent,
  onClose,
  onInsert,
}: SignatureCreatorDialogProps) {
  const { t } = useI18n();
  const narrow = useNarrowViewport();
  const padRef = useRef<SignaturePadHandle | null>(null);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [size, setSize] = useState(intent === "initials" ? 0.16 : 0.28);
  const [textValue, setTextValue] = useState("");
  const [textColor, setTextColor] = useState<string>(DATE_STAMP_INK_PRESETS[0].color);
  const [textFontId, setTextFontId] = useState<DocumentTextFontId>("sans");
  const [textSize, setTextSize] = useState(0.28);
  const [busy, setBusy] = useState(false);
  const [insertError, setInsertError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const title =
    intent === "initials"
      ? t.sign.addInitials
      : intent === "text"
        ? t.sign.addText
        : t.sign.addSignature;

  const handleInsert = () => {
    void (async () => {
      setInsertError(null);
      if (intent === "text") {
        if (!textValue.trim()) return;
        onInsert({
          kind: "text",
          text: textValue.trim(),
          color: textColor,
          fontId: textFontId,
          relativeWidth: textSize,
        });
        onClose();
        return;
      }
      const dataUrl = padRef.current?.toDataURL() ?? assetUrl;
      if (!dataUrl) {
        setInsertError(t.sign.emptyPad);
        return;
      }
      setBusy(true);
      const visible = await signatureHasVisibleInk(dataUrl);
      setBusy(false);
      if (!visible) {
        setInsertError(t.sign.insertNoVisibleInk);
        return;
      }
      onInsert({ kind: "image", dataUrl, relativeWidth: size });
      onClose();
    })();
  };

  const panel = (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2">
      {intent === "text" ? (
        <DocumentTextEditor
          text={textValue}
          onTextChange={setTextValue}
          fontId={textFontId}
          onFontIdChange={setTextFontId}
          color={textColor}
          onColorChange={setTextColor}
          size={textSize}
          onSizeChange={setTextSize}
        />
      ) : (
        <SignatureSourcePanel
          key={intent}
          padRef={padRef}
          compact
          size={size}
          onSizeChange={setSize}
          onAssetChange={setAssetUrl}
          placeAllPages={false}
          onPlaceAllPagesChange={() => undefined}
          showPlaceAllPages={false}
          showQuickMarks={false}
          defaultMode={intent === "initials" ? "type" : "draw"}
        />
      )}
    </div>
  );

  const footer = (
    <div className="shrink-0 space-y-2 border-t border-slate-800/60 px-4 py-3">
      {insertError ? <p className="text-xs text-rose-400">{insertError}</p> : null}
      <button
        type="button"
        className="btn-primary w-full"
        disabled={busy || (intent === "text" ? !textValue.trim() : !assetUrl)}
        onClick={handleInsert}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {t.sign.insertIntoDocument}
      </button>
    </div>
  );

  const header = (
    <div className="relative shrink-0 border-b border-slate-800/60 px-4 py-3">
      {narrow ? (
        <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-600/80" />
      ) : null}
      <div className={cn("flex items-start gap-3", narrow && "pt-2")}>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 text-xs text-gray-500">{t.sign.creatorSheetHint}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.ecosystem.close}
          className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );

  if (narrow) {
    return (
      <BodyPortal open={open}>
        <button
          type="button"
          aria-label={t.ecosystem.close}
          className="pointer-events-auto fixed inset-0 bg-black/75 backdrop-blur-sm"
          style={{ zIndex: Z.modalBackdrop }}
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="glass-card pointer-events-auto fixed bottom-0 left-1/2 flex w-full max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-t-3xl border border-slate-800/60 shadow-2xl"
          style={{
            zIndex: Z.bottomSheet,
            maxHeight: "min(88dvh, 36rem)",
            paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          }}
        >
          {header}
          {panel}
          {footer}
        </div>
      </BodyPortal>
    );
  }

  return (
    <BodyPortal open={open}>
      <button
        type="button"
        aria-label={t.ecosystem.close}
        className="pointer-events-auto fixed inset-0 bg-black/70 backdrop-blur-sm"
        style={{ zIndex: Z.modalBackdrop }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="glass-card pointer-events-auto fixed left-1/2 top-1/2 flex max-h-[min(88vh,40rem)] w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-slate-800/60 shadow-2xl"
        style={{ zIndex: Z.modalPanel }}
      >
        {header}
        {panel}
        {footer}
      </div>
    </BodyPortal>
  );
}