export function renderMarkPng(kind: "check" | "cross", color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (kind === "check") {
    ctx.beginPath();
    ctx.moveTo(22, 50);
    ctx.lineTo(40, 68);
    ctx.lineTo(74, 28);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(28, 28);
    ctx.lineTo(68, 68);
    ctx.moveTo(68, 28);
    ctx.lineTo(28, 68);
    ctx.stroke();
  }

  return canvas.toDataURL("image/png");
}