const DEFAULT_SITE_ORIGIN = "https://sigmacode.biz";

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN
).replace(/\/+$/, "");

export const SITE_URLS = {
  zh: `${SITE_ORIGIN}/`,
  en: `${SITE_ORIGIN}/en`,
} as const;
