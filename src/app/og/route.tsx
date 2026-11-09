import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { getSeoCopy } from "@/i18n/seo/copy";
import { parseOgImageQuery } from "@/lib/seo/og";
import { getSiteUrl } from "@/lib/seo/site";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: NextRequest) {
  const parsed = parseOgImageQuery(request.nextUrl.searchParams);
  if (!parsed) {
    return new Response("Invalid parameters", { status: 400 });
  }

  const { locale, page } = parsed;
  const copy = getSeoCopy(page, locale);
  const host = getSiteUrl().replace(/^https?:\/\//, "");

  const title =
    copy.title.length > 110 ? `${copy.title.slice(0, 107)}…` : copy.title;
  const description =
    copy.description.length > 200
      ? `${copy.description.slice(0, 197)}…`
      : copy.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "linear-gradient(145deg, #0B0F17 0%, #0F172A 48%, #111827 100%)",
          color: "#F8FAFC",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#93C5FD",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 22, fontWeight: 600, color: "#CBD5E1" }}>
            PureSign
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#94A3B8",
              maxWidth: 1040,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#64748B",
          }}
        >
          <span>{host}</span>
          <span style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {locale} · client-side PDF
          </span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
