import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F17",
        surface: "#0F172A",
        "surface-hover": "#1E293B",
        primary: "#06B6D4",
        accent: "#22D3EE",
      },
    },
  },
};

export default config;
