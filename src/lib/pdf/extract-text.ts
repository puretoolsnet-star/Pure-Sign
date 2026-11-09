import { openPdfDocument } from "@/lib/pdf/pdfjs-client";

export async function extractPdfText(file: File): Promise<{
  text: string;
  pages: number;
}> {
  const pdf = await openPdfDocument(file);
  const chunks: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    chunks.push(line ? `--- ${pageNumber} ---\n${line}` : `--- ${pageNumber} ---`);
  }

  const pages = pdf.numPages;
  await pdf.destroy();
  return {
    text: chunks.join("\n\n").trim(),
    pages,
  };
}
