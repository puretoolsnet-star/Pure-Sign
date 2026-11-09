import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F17",
        surface: "#0F172A",
        "surface-hover": "#1E293B",
        primary: "#3B82F6",
        accent: "#10B981",
      },
    },
  },
};

export default config;
