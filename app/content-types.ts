export const FEATURE_SLUGS = [
  "durable-sessions",
  "native-sandbox",
  "evidence-backed-completion",
] as const;

export const DOC_SLUGS = [
  "getting-started",
  "cli-and-configuration",
  "architecture",
  "security-and-recovery",
  "evaluation",
] as const;

export const CONTENT_SLUGS = [...FEATURE_SLUGS, ...DOC_SLUGS] as const;

export const BASE_CONTENT_SLUGS = [
  ...FEATURE_SLUGS,
  "getting-started",
] as const;

export type ContentSlug = (typeof CONTENT_SLUGS)[number];
export type BaseContentSlug = (typeof BASE_CONTENT_SLUGS)[number];
export type TechnicalContentSlug = Exclude<ContentSlug, BaseContentSlug>;
export type ContentLocale = "zh" | "en";

export type ContentSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  code?: string;
};

export type ContentPageData = {
  slug: ContentSlug;
  locale: ContentLocale;
  path: string;
  alternatePath: string;
  eyebrow: string;
  title: string;
  description: string;
  lead: string;
  sections: readonly ContentSection[];
  faqs: readonly (readonly [string, string])[];
  ctaTitle: string;
  ctaBody: string;
};

export function isDocSlug(slug: ContentSlug) {
  return (DOC_SLUGS as readonly ContentSlug[]).includes(slug);
}
