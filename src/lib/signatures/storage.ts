export type SavedSignatureSource = "draw" | "type" | "image";

export type SavedSignature = {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: number;
  source: SavedSignatureSource;
};

const STORAGE_KEY = "puresign-signatures-v1";
const MAX_ITEMS = 16;

function readAll(): SavedSignature[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedSignature[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: SavedSignature[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function listSavedSignatures(): SavedSignature[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function saveSignature(entry: Omit<SavedSignature, "id" | "createdAt">): SavedSignature {
  const item: SavedSignature = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const next = [item, ...readAll()].slice(0, MAX_ITEMS);
  writeAll(next);
  return item;
}

export function deleteSavedSignature(id: string) {
  writeAll(readAll().filter((item) => item.id !== id));
}