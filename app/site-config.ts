export const SITE_ORIGIN = "https://sigmacode.biz";

export const SITE_HOST = new URL(SITE_ORIGIN).hostname;

export const SITE_URLS = {
  zh: `${SITE_ORIGIN}/`,
  en: `${SITE_ORIGIN}/en`,
} as const;

export const INDEXABLE_PATHS = [
  { zh: "/", en: "/en" },
  {
    zh: "/features/durable-sessions",
    en: "/en/features/durable-sessions",
  },
  {
    zh: "/features/native-sandbox",
    en: "/en/features/native-sandbox",
  },
  {
    zh: "/features/evidence-backed-completion",
    en: "/en/features/evidence-backed-completion",
  },
  { zh: "/docs/getting-started", en: "/en/docs/getting-started" },
] as const;
