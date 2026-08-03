import { INDEXABLE_PATHS, SITE_ORIGIN } from "../site-config";

function absoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString();
}

function alternates(zhPath: string, enPath: string) {
  return [
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${absoluteUrl(zhPath)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(enPath)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(zhPath)}" />`,
  ].join("\n");
}

function sitemapEntry(path: string, zhPath: string, enPath: string) {
  return [
    "  <url>",
    `    <loc>${absoluteUrl(path)}</loc>`,
    alternates(zhPath, enPath),
    "  </url>",
  ].join("\n");
}

export function GET() {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...INDEXABLE_PATHS.flatMap(({ zh, en }) => [
      sitemapEntry(zh, zh, en),
      sitemapEntry(en, zh, en),
    ]),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
