import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const candidates = [
  join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"),
  join(root, "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs"),
];

const source = candidates.find((path) => existsSync(path));
if (!source) {
  console.warn("pdf.js worker not found — skip copy");
  process.exit(0);
}

const destDir = join(root, "public");
mkdirSync(destDir, { recursive: true });
copyFileSync(source, join(destDir, "pdf.worker.min.mjs"));
console.log("Copied pdf.worker.min.mjs to public/");
