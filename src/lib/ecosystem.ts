import type { Locale } from "@/i18n/locales";
import { LOCALES } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";

export type EcosystemProjectId =
  | "purepdf"
  | "pureConvert"
  | "pureImage"
  | "pureQr"
  | "pureSign"
  | "pureTable"
  | "pureText";

export type EcosystemProjectStatus = "active" | "comingSoon";

export type EcosystemProjectMeta = {
  id: EcosystemProjectId;
  status: EcosystemProjectStatus;
  /** In-app path (locale added by caller) or site origin without a locale segment. */
  href?: string;
  external?: boolean;
  current?: boolean;
};

function origin(value: string | undefined, fallback: string) {
  return (value?.trim() || fallback).replace(/\/$/, "");
}

const purepdfOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PUREPDF_URL,
  "https://pdf.kixt.net",
);

const pureConvertOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PURECONVERT_URL,
  "https://convert.kixt.net",
);

const pureImageOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PUREIMAGE_URL,
  "https://img.kixt.net",
);

const pureqrOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PUREQR_URL,
  "https://qr.kixt.net",
);

const pureTableOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PURETABLE_URL,
  "https://table.kixt.net",
);

const pureTextOrigin = origin(
  process.env.NEXT_PUBLIC_ECOSYSTEM_PURETEXT_URL,
  "https://text.kixt.net",
);

/**
 * Order: PurePDF → PureConvert → PureImage → PureQR → PureSign → PureTable → PureText.
 * PureSign is the current app.
 */
export const ECOSYSTEM_PROJECTS: EcosystemProjectMeta[] = [
  {
    id: "purepdf",
    status: "active",
    href: purepdfOrigin,
    external: true,
  },
  {
    id: "pureConvert",
    status: "active",
    href: pureConvertOrigin,
    external: true,
  },
  {
    id: "pureImage",
    status: "active",
    href: pureImageOrigin,
    external: true,
  },
  {
    id: "pureQr",
    status: "active",
    href: pureqrOrigin,
    external: true,
  },
  {
    id: "pureSign",
    status: "active",
    href: "/",
    current: true,
  },
  {
    id: "pureTable",
    status: "active",
    href: pureTableOrigin,
    external: true,
  },
  {
    id: "pureText",
    status: "active",
    href: pureTextOrigin,
    external: true,
  },
];

const localeSuffix = new RegExp(`/(${LOCALES.join("|")})$`);

/** Keep the selected locale when opening another ecosystem site. */
export function ecosystemHref(
  project: EcosystemProjectMeta,
  locale: Locale,
): string | undefined {
  if (!project.href) return undefined;
  if (!project.external) return localizedPath(locale, project.href);
  const base = project.href.replace(/\/$/, "").replace(localeSuffix, "");
  return `${base}/${locale}`;
}

export function withLocaleInUrl(href: string, locale: string): string {
  if (href.startsWith("/")) {
    return href === "/" ? `/${locale}` : `/${locale}${href}`;
  }

  try {
    const url = new URL(href);
    const alreadyHasLocale = new RegExp(`^/(${locale})(/|$)`).test(url.pathname);
    if (!alreadyHasLocale) {
      url.pathname =
        url.pathname === "/" || url.pathname === ""
          ? `/${locale}`
          : `/${locale}${url.pathname}`.replace(/\/{2,}/g, "/");
    }
    return url.toString();
  } catch {
    return href;
  }
}
