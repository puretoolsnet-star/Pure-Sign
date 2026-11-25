import { decryptPDF, isEncrypted } from "@pdfsmaller/pdf-decrypt";
import { PDFDocument } from "pdf-lib";

export class PdfPasswordRequiredError extends Error {
  constructor() {
    super("password_required");
    this.name = "PdfPasswordRequiredError";
  }
}

export class PdfWrongPasswordError extends Error {
  constructor() {
    super("wrong_password");
    this.name = "PdfWrongPasswordError";
  }
}

export type UnlockScenario = "already_open" | "decrypted" | "restrictions_removed";

export type UnlockPdfResult = {
  bytes: Uint8Array;
  scenario: UnlockScenario;
};

export async function inspectPdfEncryption(file: File): Promise<{
  encrypted: boolean;
  algorithm?: "AES-256" | "RC4";
}> {
  const raw = new Uint8Array(await file.arrayBuffer());
  const info = await isEncrypted(raw);
  return { encrypted: info.encrypted, algorithm: info.algorithm };
}

function isIncorrectPasswordError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes("Incorrect password")
  );
}

export async function unlockPdf(
  file: File,
  password?: string,
): Promise<UnlockPdfResult> {
  const raw = new Uint8Array(await file.arrayBuffer());
  const info = await isEncrypted(raw);
  const trimmed = password?.trim() ?? "";

  if (!info.encrypted) {
    const pdfDoc = await PDFDocument.load(raw, { ignoreEncryption: true });
    return {
      bytes: await pdfDoc.save(),
      scenario: "already_open",
    };
  }

  const tryDecrypt = async (candidate: string) => {
    const decrypted = await decryptPDF(raw, candidate);
    const pdfDoc = await PDFDocument.load(decrypted, { ignoreEncryption: true });
    return pdfDoc.save();
  };

  if (trimmed) {
    try {
      const bytes = await tryDecrypt(trimmed);
      return { bytes, scenario: "decrypted" };
    } catch (error) {
      if (isIncorrectPasswordError(error)) {
        throw new PdfWrongPasswordError();
      }
      throw error;
    }
  }

  try {
    const bytes = await tryDecrypt("");
    return { bytes, scenario: "restrictions_removed" };
  } catch (error) {
    if (isIncorrectPasswordError(error)) {
      throw new PdfPasswordRequiredError();
    }
    throw error;
  }
}