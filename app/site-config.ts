export const SITE_ORIGIN = "https://sigmacode.biz";

export const SITE_HOST = new URL(SITE_ORIGIN).hostname;

export const GITHUB_URL = "https://github.com/hututuQQQ/sigma";

export const RELEASE_VERSION = "0.1.5";

export const RELEASE_TAG = `v${RELEASE_VERSION}`;

export const RELEASE_URL = `${GITHUB_URL}/releases/tag/${RELEASE_TAG}`;

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
  {
    zh: "/docs/cli-and-configuration",
    en: "/en/docs/cli-and-configuration",
  },
  { zh: "/docs/architecture", en: "/en/docs/architecture" },
  {
    zh: "/docs/security-and-recovery",
    en: "/en/docs/security-and-recovery",
  },
  { zh: "/docs/evaluation", en: "/en/docs/evaluation" },
] as const;
