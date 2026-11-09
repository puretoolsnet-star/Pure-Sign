export type EcosystemProjectId = "purepdf" | "pureQr" | "pureSign" | "pureTable";

export type EcosystemProjectStatus = "active" | "comingSoon";

export type EcosystemProjectMeta = {
  id: EcosystemProjectId;
  status: EcosystemProjectStatus;
  href?: string;
  external?: boolean;
  current?: boolean;
};

const purepdfOrigin =
  process.env.NEXT_PUBLIC_ECOSYSTEM_PUREPDF_URL?.trim() ||
  "http://localhost:3000";

const pureqrOrigin =
  process.env.NEXT_PUBLIC_ECOSYSTEM_PUREQR_URL?.trim() ||
  "http://localhost:3001";

const pureTableOrigin =
  process.env.NEXT_PUBLIC_ECOSYSTEM_PURETABLE_URL?.trim() ||
  "https://puretable.app";

export const ECOSYSTEM_PROJECTS: EcosystemProjectMeta[] = [
  {
    id: "purepdf",
    status: "active",
    href: purepdfOrigin,
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
];

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
