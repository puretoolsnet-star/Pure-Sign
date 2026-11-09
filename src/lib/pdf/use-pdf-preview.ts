"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

import { openPdfDocument, renderPdfPage } from "@/lib/pdf/pdfjs-client";

export function usePdfPreview(file: File | null) {
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState({ width: 1, height: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      pdfRef.current?.destroy().catch(() => undefined);
      pdfRef.current = null;
      setPageImage(null);
      setNumPages(0);
      setPageIndex(0);

      if (!file) return;

      setLoading(true);
      setError(null);
      try {
        const pdf = await openPdfDocument(file);
        if (cancelled) {
          await pdf.destroy();
          return;
        }
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "PDF error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
      pdfRef.current?.destroy().catch(() => undefined);
      pdfRef.current = null;
    };
  }, [file]);

  useEffect(() => {
    const pdf = pdfRef.current;
    if (!pdf || numPages === 0) return;
    const documentProxy = pdf;
    let cancelled = false;

    async function render() {
      setLoading(true);
      try {
        const page = await renderPdfPage(documentProxy, pageIndex + 1);
        if (cancelled) return;
        setPageImage(page.dataUrl);
        setPageSize({ width: page.width, height: page.height });
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Render error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [file, numPages, pageIndex]);

  const goTo = useCallback(
    (next: number) => {
      setPageIndex(Math.min(Math.max(next, 0), Math.max(numPages - 1, 0)));
    },
    [numPages],
  );

  return {
    numPages,
    pageIndex,
    pageImage,
    pageSize,
    loading,
    error,
    setPageIndex: goTo,
  };
}
