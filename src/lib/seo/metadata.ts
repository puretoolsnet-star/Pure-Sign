import type { Metadata } from "next";

import type { Locale, ToolId } from "@/i18n/locales";
import { LOCALES } from "@/i18n/locales";
import { getSeoCopy, type SeoPageId } from "@/i18n/seo/copy";
import { localizedPath } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import {
  absoluteUrl,
  buildLanguageAlternates,
  getSiteUrl,
  OPEN_GRAPH_LOCALE,
} from "@/lib/seo/site";

function pathForPage(page: SeoPageId): string {
  if (page === "home") return "/";
  return `/tools/${page}`;
}

export function buildPageMetadata(page: SeoPageId, locale: Locale): Metadata {
  const copy = getSeoCopy(page, locale);
  const path = pathForPage(page);
  const canonical = absoluteUrl(localizedPath(locale, path));
  const ogImage = absoluteUrl(buildOgImageUrl(locale, page));

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: "PureSign" }],
    creator: "PureSign",
    publisher: "PureSign",
    category: "utilities",
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.title,
      description: copy.description,
      siteName: "PureSign",
      locale: OPEN_GRAPH_LOCALE[locale],
      alternateLocale: LOCALES.filter((item) => item !== locale).map(
        (item) => OPEN_GRAPH_LOCALE[item],
      ),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: copy.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "content-language": locale,
    },
  };
}

export function buildToolMetadata(toolId: ToolId, locale: Locale): Metadata {
  return buildPageMetadata(toolId, locale);
}

export function buildHomeMetadata(locale: Locale): Metadata {
  return buildPageMetadata("home", locale);
}

export function siteMetadataBase(): Metadata {
  const siteUrl = getSiteUrl();
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "PureSign",
    creator: "PureSign",
    publisher: "PureSign",
    title: {
      default: "PureSign",
      template: "%s",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}
