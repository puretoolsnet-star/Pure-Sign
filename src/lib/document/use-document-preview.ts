"use client";

import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";
import { documentKind } from "@/lib/document/pick-document";
import { useEffect, useState } from "react";

export function useDocumentPreview(file: File | null) {
  const pdf = usePdfPreview(file && documentKind(file) === "pdf" ? file : null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (!file || documentKind(file) !== "image") {
      setImageUrl(null);
      return;
    }
    let cancelled = false;
    setImageLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (cancelled) return;
      const url = String(reader.result);
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setImageUrl(url);
        setImageSize({ width: img.width, height: img.height });
        setImageLoading(false);
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
    return () => {
      cancelled = true;
    };
  }, [file]);

  if (!file) {
    return {
      kind: null as null,
      numPages: 0,
      pageIndex: 0,
      pageImage: null as string | null,
      pageSize: { width: 1, height: 1 },
      loading: false,
      error: null as string | null,
      setPageIndex: (_n: number) => undefined,
    };
  }

  const kind = documentKind(file);
  if (kind === "pdf") {
    return {
      kind: "pdf" as const,
      numPages: pdf.numPages,
      pageIndex: pdf.pageIndex,
      pageImage: pdf.pageImage,
      pageSize: pdf.pageSize,
      loading: pdf.loading,
      error: pdf.error,
      setPageIndex: pdf.setPageIndex,
    };
  }

  return {
    kind: "image" as const,
    numPages: 1,
    pageIndex: 0,
    pageImage: imageUrl,
    pageSize: imageSize,
    loading: imageLoading,
    error: null,
    setPageIndex: (_n: number) => undefined,
  };
}