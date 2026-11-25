export type DateStampFormat = "date" | "time" | "datetime";

export function formatDateStampText(
  instant: Date,
  format: DateStampFormat,
  locale: string,
): string {
  if (format === "date") {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(instant);
  }
  if (format === "time") {
    return new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(instant);
  }
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(instant);
}

export function toDateInputValue(instant: Date) {
  const y = instant.getFullYear();
  const m = String(instant.getMonth() + 1).padStart(2, "0");
  const d = String(instant.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function toTimeInputValue(instant: Date) {
  const h = String(instant.getHours()).padStart(2, "0");
  const min = String(instant.getMinutes()).padStart(2, "0");
  return `${h}:${min}`;
}

export function mergeDateInput(instant: Date, value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return instant;
  const next = new Date(instant);
  next.setFullYear(y, m - 1, d);
  return next;
}

export function mergeTimeInput(instant: Date, value: string) {
  const [h, min] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(min)) return instant;
  const next = new Date(instant);
  next.setHours(h, min, 0, 0);
  return next;
}