type TurnstileRenderOptions = {
  sitekey: string;
  size?: "normal" | "compact" | "flexible" | "invisible";
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  action?: string;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

interface Window {
  turnstile?: TurnstileApi;
}
