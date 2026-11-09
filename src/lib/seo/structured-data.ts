import { dictionaries, TOOL_IDS, type Locale, type ToolId } from "@/i18n/locales";
import { getSeoCopy } from "@/i18n/seo/copy";
import { homeRoute, toolRoute } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import {
  absoluteUrl,
  buildLanguageAlternates,
  HREFLANG_REGIONAL,
} from "@/lib/seo/site";

export function buildSitemapLanguageAlternates(path: string) {
  return buildLanguageAlternates(path);
}

export function buildHomeStructuredData(locale: Locale) {
  const copy = getSeoCopy("home", locale);
  const t = dictionaries[locale];
  const url = absoluteUrl(homeRoute(locale));
  const inLanguage = HREFLANG_REGIONAL[locale];

  const toolList = TOOL_IDS.map((toolId, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: t.tools[toolId].title,
    url: absoluteUrl(toolRoute(locale, toolId)),
    description: t.tools[toolId].description,
  }));

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PureSign",
      url,
      description: copy.description,
      inLanguage,
      publisher: {
        "@type": "Organization",
        name: "PureSign",
        url: absoluteUrl(homeRoute(locale)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PureSign",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "PDF",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url,
      description: copy.description,
      inLanguage,
      isAccessibleForFree: true,
      featureList: TOOL_IDS.map((toolId) => t.tools[toolId].title),
      screenshot: absoluteUrl(buildOgImageUrl(locale, "home")),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.home.toolsHeading,
      itemListElement: toolList,
      numberOfItems: toolList.length,
    },
  ];
}

export function buildToolStructuredData(toolId: ToolId, locale: Locale) {
  const t = dictionaries[locale];
  const tool = t.tools[toolId];
  const seo = getSeoCopy(toolId, locale);
  const url = absoluteUrl(toolRoute(locale, toolId));
  const inLanguage = HREFLANG_REGIONAL[locale];

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "PDF",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url,
      description: seo.description,
      inLanguage,
      isAccessibleForFree: true,
      screenshot: absoluteUrl(buildOgImageUrl(locale, toolId)),
      provider: {
        "@type": "Organization",
        name: "PureSign",
        url: absoluteUrl(homeRoute(locale)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t.brand.name,
          item: absoluteUrl(homeRoute(locale)),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tool.title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url,
      inLanguage,
      isPartOf: {
        "@type": "WebSite",
        name: "PureSign",
        url: absoluteUrl(homeRoute(locale)),
      },
    },
  ];
}
