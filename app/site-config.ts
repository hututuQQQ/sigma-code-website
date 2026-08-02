const DEFAULT_SITE_ORIGIN =
  "https://sigma-code-agent.a962950733.chatgpt.site";

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN
).replace(/\/+$/, "");

export const SITE_URLS = {
  zh: `${SITE_ORIGIN}/`,
  en: `${SITE_ORIGIN}/en`,
} as const;
