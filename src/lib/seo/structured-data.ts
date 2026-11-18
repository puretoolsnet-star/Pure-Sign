import { dictionaries, TOOL_IDS, type Locale, type ToolId } from "@/i18n/locales";
import { getSeoPageContent } from "@/i18n/seo/content";
import { getSeoCopy, type SeoPageId } from "@/i18n/seo/copy";
import { homeRoute, toolRoute } from "@/lib/i18n/routing";
import { buildOgImageUrl } from "@/lib/seo/og";
import { canonicalAbsoluteUrl, HREFLANG_REGIONAL } from "@/lib/seo/site";

function pageUrl(locale: Locale, page: SeoPageId) {
  return page === "home"
    ? canonicalAbsoluteUrl(homeRoute(locale))
    : canonicalAbsoluteUrl(toolRoute(locale, page));
}

function buildFaqStructuredData(page: SeoPageId, locale: Locale) {
  const content = getSeoPageContent(page, locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHomeStructuredData(locale: Locale) {
  const copy = getSeoCopy("home", locale);
  const t = dictionaries[locale];
  const url = pageUrl(locale, "home");
  const inLanguage = HREFLANG_REGIONAL[locale];
  const homeUrl = pageUrl(locale, "home");

  const toolList = TOOL_IDS.map((toolId, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: t.tools[toolId].title,
    url: pageUrl(locale, toolId),
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
        url: homeUrl,
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
      screenshot: canonicalAbsoluteUrl(buildOgImageUrl(locale, "home")),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.home.toolsHeading,
      itemListElement: toolList,
      numberOfItems: toolList.length,
    },
    buildFaqStructuredData("home", locale),
  ];
}

export function buildToolStructuredData(toolId: ToolId, locale: Locale) {
  const t = dictionaries[locale];
  const tool = t.tools[toolId];
  const seo = getSeoCopy(toolId, locale);
  const url = pageUrl(locale, toolId);
  const homeUrl = pageUrl(locale, "home");
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
      screenshot: canonicalAbsoluteUrl(buildOgImageUrl(locale, toolId)),
      provider: {
        "@type": "Organization",
        name: "PureSign",
        url: homeUrl,
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
          item: homeUrl,
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
        url: homeUrl,
      },
    },
    buildFaqStructuredData(toolId, locale),
  ];
}
