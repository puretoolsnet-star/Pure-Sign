const NATIVE_SRC = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SRC?.trim() ?? "";
const NATIVE_ID = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ID?.trim() ?? "";
const SOCIAL_SRC = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_SRC?.trim() ?? "";
const POPUNDER_SRC = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC?.trim() ?? "";

export const ADSTERRA_BANNER = {
  width: 300,
  height: 250,
  key:
    process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY?.trim() ??
    "db35ee7e76678192a09a191969d00220",
  src:
    process.env.NEXT_PUBLIC_ADSTERRA_BANNER_SRC?.trim() ??
    "https://bauval.org/22/db35ee7e76678192a09a191969d00220",
} as const;

export const ADSTERRA_WATCH_MS = 5_000;

export const adsterraNative = {
  src: NATIVE_SRC,
  containerId: NATIVE_ID,
};

function ensureScript(src: string, id: string) {
  if (!src || typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.src = src.startsWith("//") ? `https:${src}` : src;
  document.body.appendChild(script);
}

export function loadAdsterraNative() {
  if (!NATIVE_SRC) return;
  ensureScript(NATIVE_SRC, "adsterra-native-invoke");
}

/** Mounts Adsterra 300×250 iframe banner inside `host` (client-only). */
export function mountAdsterraBanner(
  host: HTMLElement,
  instanceId: string,
): () => void {
  const { key, src, width, height } = ADSTERRA_BANNER;
  if (!key || !src || typeof document === "undefined") return () => {};

  host.replaceChildren();

  const optionsScript = document.createElement("script");
  optionsScript.type = "text/javascript";
  optionsScript.text = [
    "atOptions = {",
    `'key' : '${key}',`,
    `'format' : 'iframe',`,
    `'height' : ${height},`,
    `'width' : ${width},`,
    `'params' : {}`,
    "};",
  ].join("\n");

  const loadScript = document.createElement("script");
  loadScript.type = "text/javascript";
  loadScript.async = true;
  loadScript.setAttribute("data-cfasync", "false");
  loadScript.src = src;
  loadScript.id = `adsterra-banner-${instanceId}`;

  host.appendChild(optionsScript);
  host.appendChild(loadScript);

  return () => {
    host.replaceChildren();
  };
}

/** Fires Adsterra Social Bar / Popunder on the user gesture (mandatory interaction). */
export function triggerAdsterraReward() {
  if (typeof window === "undefined") return;

  const popunder = POPUNDER_SRC || SOCIAL_SRC;
  if (popunder) {
    ensureScript(popunder, "adsterra-reward-trigger");
  }

  const invoke = (
    window as Window & {
      invoke?: () => void;
      atOptions?: unknown;
    }
  ).invoke;
  if (typeof invoke === "function") {
    invoke();
  }

  window.dispatchEvent(new CustomEvent("puresign-adsterra-reward"));
}
