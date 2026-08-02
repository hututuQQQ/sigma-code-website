import { SITE_URLS } from "../site-config";

function alternates() {
  return [
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE_URLS.zh}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URLS.en}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URLS.zh}" />`,
  ].join("\n");
}

export function GET() {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    "  <url>",
    `    <loc>${SITE_URLS.zh}</loc>`,
    alternates(),
    "  </url>",
    "  <url>",
    `    <loc>${SITE_URLS.en}</loc>`,
    alternates(),
    "  </url>",
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
