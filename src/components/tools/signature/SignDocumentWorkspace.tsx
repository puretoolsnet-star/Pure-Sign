"use client";

import { useCallback, useState, type Dispatch, type SetStateAction } from "react";

import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { DesktopSavedSignaturesRail } from "@/components/tools/signature/DesktopSavedSignaturesRail";
import { DateCreatorDialog } from "@/components/tools/signature/DateCreatorDialog";
import { DocumentSelectedQuickEdit } from "@/components/tools/signature/DocumentSelectedQuickEdit";
import { DocumentSignActionBar } from "@/components/tools/signature/DocumentSignActionBar";
import {
  SignatureCreatorDialog,
  type CreatorIntent,
} from "@/components/tools/signature/SignatureCreatorDialog";
import type { DocumentTextFontId } from "@/lib/document-text/fonts";
import { renderDocumentTextPng } from "@/lib/document-text/render-text-png";
import { useI18n } from "@/i18n/context";
import { useDocumentPreview } from "@/lib/document/use-document-preview";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { loadImageSize } from "@/lib/signatures/load-image-size";
import { signatureHasVisibleInk } from "@/lib/signatures/validate-signature-asset";

type SignDocumentWorkspaceProps = {
  file: File;
  overlays: PdfOverlay[];
  setOverlays: Dispatch<SetStateAction<PdfOverlay[]>>;
  onError: (message: string | null) => void;
  onDownload: () => void;
  processing: boolean;
};

export function SignDocumentWorkspace({
  file,
  overlays,
  setOverlays,
  onError,
  onDownload,
  processing,
}: SignDocumentWorkspaceProps) {
  const { t } = useI18n();
  const preview = useDocumentPreview(file);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [creatorIntent, setCreatorIntent] = useState<CreatorIntent>("signature");
  const [dateDialogOpen, setDateDialogOpen] = useState(false);

  const openCreator = (intent: CreatorIntent) => {
    setDateDialogOpen(false);
    setCreatorIntent(intent);
    setCreatorOpen(true);
  };

  const placeImageAtCenter = useCallback(
    async (dataUrl: string, relativeWidth: number) => {
      const image = await loadImageSize(dataUrl);
      const dims = overlaySizeFromImage(
        image.width,
        image.height,
        preview.pageSize.width,
        preview.pageSize.height,
        relativeWidth,
      );
      const box = clampOverlay(0.5 - dims.width / 2, 0.62 - dims.height / 2, dims.width, dims.height);
      const overlay: PdfOverlay = {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "image",
        dataUrl,
        ...box,
      };
      setOverlays((current) => [...current, overlay]);
      setSelectedOverlayId(overlay.id);
      onError(null);
    },
    [onError, preview.pageIndex, preview.pageSize.height, preview.pageSize.width, setOverlays],
  );

  const insertSaved = useCallback(
    async (dataUrl: string) => {
      const visible = await signatureHasVisibleInk(dataUrl);
      if (!visible) {
        onError(t.sign.insertNoVisibleInk);
        return;
      }
      await placeImageAtCenter(dataUrl, 0.24);
    },
    [onError, placeImageAtCenter, t.sign.insertNoVisibleInk],
  );

  const placeStampOverlay = useCallback(
    async (
      dataUrl: string,
      relativeWidth: number,
      extra: Partial<PdfOverlay> = {},
    ) => {
      const image = await loadImageSize(dataUrl);
      const dims = overlaySizeFromImage(
        image.width,
        image.height,
        preview.pageSize.width,
        preview.pageSize.height,
        relativeWidth,
      );
      const box = clampOverlay(0.5 - dims.width / 2, 0.62 - dims.height / 2, dims.width, dims.height);
      const overlay: PdfOverlay = {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "image",
        dataUrl,
        ...box,
        ...extra,
      };
      setOverlays((current) => [...current, overlay]);
      setSelectedOverlayId(overlay.id);
      onError(null);
    },
    [onError, preview.pageIndex, preview.pageSize.height, preview.pageSize.width, setOverlays],
  );

  const handleInsert = async (
    asset:
      | { kind: "image"; dataUrl: string; relativeWidth: number }
      | {
          kind: "text";
          text: string;
          color: string;
          fontId: DocumentTextFontId;
          relativeWidth: number;
        },
  ) => {
    if (asset.kind === "image") {
      const visible = await signatureHasVisibleInk(asset.dataUrl);
      if (!visible) {
        onError(t.sign.insertNoVisibleInk);
        return;
      }
      await placeImageAtCenter(asset.dataUrl, asset.relativeWidth);
      return;
    }
    const dataUrl = await renderDocumentTextPng({
      text: asset.text,
      color: asset.color,
      fontId: asset.fontId,
    });
    await placeStampOverlay(dataUrl, asset.relativeWidth, {
      textMeta: {
        text: asset.text,
        color: asset.color,
        fontId: asset.fontId,
      },
      color: asset.color,
    });
  };

  const handleInsertDate = useCallback(
    async (payload: {
      dataUrl: string;
      relativeWidth: number;
      meta: NonNullable<PdfOverlay["signDateMeta"]>;
    }) => {
      await placeStampOverlay(payload.dataUrl, payload.relativeWidth, {
        signDateMeta: payload.meta,
        color: payload.meta.color,
      });
    },
    [placeStampOverlay],
  );

  const selected = overlays.find((item) => item.id === selectedOverlayId) ?? null;
  const selectedQuickEdit =
    selected &&
    (selected.signDateMeta ||
      selected.stampMeta ||
      selected.textMeta ||
      selected.documentStampMeta ||
      selected.kind === "text");

  const resizeSelected = (relativeWidth: number) => {
    if (!selected) return;
    const aspect = selected.height / Math.max(selected.width, 0.0001);
    const nextH = relativeWidth * aspect;
    const patch = clampOverlay(selected.x, selected.y, relativeWidth, nextH);
    setOverlays((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)),
    );
  };

  return (
    <div className="sign-workspace grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-start lg:gap-4">
      <div className="flex min-h-0 min-w-0 flex-col gap-2 lg:max-h-[calc(100dvh-10.5rem)]">
        <DocumentSignActionBar
          className="lg:static lg:rounded-2xl lg:border lg:bg-slate-900/80"
          onAddSignature={() => openCreator("signature")}
          onAddInitials={() => openCreator("initials")}
          onAddDate={() => {
            setCreatorOpen(false);
            setDateDialogOpen(true);
          }}
          onAddText={() => openCreator("text")}
          onDownload={onDownload}
          downloadDisabled={overlays.length === 0}
          downloading={processing}
        />

        {selectedQuickEdit && selected ? (
          <DocumentSelectedQuickEdit
            overlay={selected}
            pageSize={preview.pageSize}
            onOverlayPatched={(id, patch) =>
              setOverlays((current) =>
                current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
              )
            }
          />
        ) : null}

        <div className="min-h-0 flex-1 overflow-x-clip overflow-y-auto lg:max-h-[calc(100dvh-13.5rem)]">
          <PdfPageCanvas
            pageImage={preview.pageImage}
            pageIndex={preview.pageIndex}
            numPages={preview.numPages}
            overlays={overlays}
            loading={preview.loading}
            onPageChange={preview.setPageIndex}
            interaction="none"
            editableOverlays
            desktopDragHint
            selectedOverlayId={selectedOverlayId}
            onSelectOverlay={setSelectedOverlayId}
            onOverlayChange={(id, patch) =>
              setOverlays((current) =>
                current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
              )
            }
            onRemoveOverlay={(id) => {
              setOverlays((current) => current.filter((item) => item.id !== id));
              setSelectedOverlayId((current) => (current === id ? null : current));
            }}
            overlayToolbar="minimal"
            selectedOverlay={selected}
            onSelectedOverlayResize={resizeSelected}
            numPagesForAll={preview.numPages}
          />
        </div>
      </div>

      <DesktopSavedSignaturesRail onApply={(url) => void insertSaved(url)} />

      <SignatureCreatorDialog
        open={creatorOpen}
        intent={creatorIntent}
        onClose={() => setCreatorOpen(false)}
        onInsert={(asset) => void handleInsert(asset)}
      />

      <DateCreatorDialog
        open={dateDialogOpen}
        onClose={() => setDateDialogOpen(false)}
        onInsert={(payload) => void handleInsertDate(payload)}
      />
    </div>
  );
}