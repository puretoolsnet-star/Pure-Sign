import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PureSign",
    short_name: "PureSign",
    description:
      "Sign, stamp, fill, and number PDFs locally in your browser. Private client-side PDF tools.",
    start_url: "/uk",
    display: "standalone",
    background_color: "#0B0F17",
    theme_color: "#0B0F17",
    lang: "uk",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
