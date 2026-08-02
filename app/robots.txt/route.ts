import { SITE_URLS } from "../site-config";

export function GET() {
  return new Response(
    ["User-agent: *", "Allow: /", `Sitemap: ${SITE_URLS.zh}sitemap.xml`, ""].join(
      "\n",
    ),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
