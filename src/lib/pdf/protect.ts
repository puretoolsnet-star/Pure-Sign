import { encryptPDF, AlreadyEncryptedError } from "@pdfsmaller/pdf-encrypt";
import { PDFDocument } from "pdf-lib";

export type ProtectPdfOptions = {
  allowPrinting?: boolean;
  allowCopying?: boolean;
  ownerPassword?: string;
};

export type ProtectPdfErrorCode = "already_encrypted" | "password_encoding" | "failed";

export class ProtectPdfError extends Error {
  readonly code: ProtectPdfErrorCode;

  constructor(code: ProtectPdfErrorCode, cause?: unknown) {
    super(code);
    this.name = "ProtectPdfError";
    this.code = code;
    if (cause instanceof Error) {
      this.cause = cause;
    }
  }
}

function randomOwnerPassword(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function protectPdfWithPassword(
  file: File,
  userPassword: string,
  options: ProtectPdfOptions = {},
): Promise<Uint8Array> {
  const allowPrinting = options.allowPrinting ?? true;
  const allowCopying = options.allowCopying ?? true;
  const restrictionsActive = !allowPrinting || !allowCopying;
  const ownerFromUser = options.ownerPassword?.trim();
  const ownerPassword =
    ownerFromUser || (restrictionsActive ? randomOwnerPassword() : userPassword);

  const raw = new Uint8Array(await file.arrayBuffer());
  let normalized: Uint8Array;
  try {
    const pdfDoc = await PDFDocument.load(raw, { ignoreEncryption: true });
    normalized = await pdfDoc.save();
  } catch {
    throw new ProtectPdfError("failed");
  }

  try {
    return await encryptPDF(normalized, userPassword, {
      ownerPassword,
      algorithm: "AES-256",
      allowPrinting,
      allowCopying,
      allowModifying: false,
      allowAnnotating: true,
      allowFillingForms: true,
      allowExtraction: allowCopying,
    });
  } catch (cause) {
    if (cause instanceof AlreadyEncryptedError) {
      throw new ProtectPdfError("already_encrypted", cause);
    }
    if (cause && typeof cause === "object" && "name" in cause) {
      const name = String((cause as { name: string }).name);
      if (name === "PasswordEncodingError") {
        throw new ProtectPdfError("password_encoding", cause);
      }
    }
    throw new ProtectPdfError("failed", cause);
  }
}