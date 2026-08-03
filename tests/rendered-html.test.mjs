import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(
  pathname = "/",
  accept = "text/html",
  origin = "http://localhost",
) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const requestUrl = new URL(pathname, origin);

  return worker.fetch(
    new Request(requestUrl, {
      headers: {
        accept,
        "x-forwarded-host": requestUrl.host,
        "x-forwarded-proto": requestUrl.protocol.replace(":", ""),
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function assertAlternate(html, hrefLang, href) {
  const alternateLinks = html.match(/<link\b[^>]*rel="alternate"[^>]*>/gi) ?? [];
  assert.ok(
    alternateLinks.some(
      (link) =>
        new RegExp(`hrefLang="${hrefLang}"`, "i").test(link) &&
        link.includes(`href="${href}"`),
    ),
    `Expected an alternate link for ${hrefLang} pointing to ${href}`,
  );
}

test("server-renders the Sigma Code landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(
    html,
    /<title>Sigma Code — 可恢复、可验证的开源 Coding Agent<\/title>/,
  );
  assert.match(html, /让任务越过中断/);
  assert.match(html, /带着证据完成/);
  assert.match(html, /耐久事件流/);
  assert.match(html, /完成必须留下证据/);
  assert.match(html, /Terminal-Bench 2\.1/);
  assert.match(html, /https:\/\/github\.com\/hututuQQQ\/sigma/);
  assert.match(html, /href="https:\/\/github\.com\/hututuQQQ\/sigma\/releases\/tag\/v0\.1\.5"/);
  assert.match(html, /下载 v0\.1\.5/);
  assert.match(html, /"softwareVersion":"0\.1\.5"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /sigma-code-demo\.webp/);
  assert.match(html, /sigma-code-demo\.gif/);
  assert.match(html, /href="\/en"/);
  assert.match(html, /\/og-v2\.png/);
  assertAlternate(html, "zh-CN", "https://sigmacode.biz/");
  assertAlternate(html, "en", "https://sigmacode.biz/en");
  assertAlternate(html, "x-default", "https://sigmacode.biz/");
  assert.match(html, /href="\/features\/durable-sessions"/);
  assert.match(html, /href="\/docs\/getting-started"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("server-renders the English landing page", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Sigma Code — Durable, verifiable coding agent<\/title>/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /Work survives the interruption/);
  assert.match(html, /Proof closes the task/);
  assert.match(html, /Completion requires evidence/);
  assert.match(html, /Terminal-Bench 2\.1/);
  assert.match(html, /Download v0\.1\.5/);
  assertAlternate(html, "zh-CN", "https://sigmacode.biz/");
  assertAlternate(html, "en", "https://sigmacode.biz/en");
  assertAlternate(html, "x-default", "https://sigmacode.biz/");
  assert.match(html, /href="\/en\/features\/native-sandbox"/);
});

test("redirects non-canonical hosts and HTTP to the primary origin", async () => {
  const www = await render(
    "/en/features/durable-sessions?source=www",
    "text/html",
    "https://www.sigmacode.biz",
  );
  assert.equal(www.status, 301);
  assert.equal(
    www.headers.get("location"),
    "https://sigmacode.biz/en/features/durable-sessions?source=www",
  );

  const oldHost = await render(
    "/docs/getting-started",
    "text/html",
    "https://sigma-code-agent.a962950733.chatgpt.site",
  );
  assert.equal(oldHost.status, 301);
  assert.equal(
    oldHost.headers.get("location"),
    "https://sigmacode.biz/docs/getting-started",
  );

  const http = await render("/en", "text/html", "http://sigmacode.biz");
  assert.equal(http.status, 301);
  assert.equal(http.headers.get("location"), "https://sigmacode.biz/en");
});

test("server-renders distinct bilingual product guides", async () => {
  const paths = [
    "/features/durable-sessions",
    "/features/native-sandbox",
    "/features/evidence-backed-completion",
    "/docs/getting-started",
    "/en/features/durable-sessions",
    "/en/features/native-sandbox",
    "/en/features/evidence-backed-completion",
    "/en/docs/getting-started",
  ];

  for (const pathname of paths) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /<h1>/, pathname);
    assert.match(html, /application\/ld\+json/, pathname);
    assert.match(html, /rel="canonical"/, pathname);
    assert.match(html, /Sigma Code/, pathname);
    if (pathname.endsWith("/docs/getting-started")) {
      assert.match(html, /0\.1\.5/, pathname);
      assert.doesNotMatch(html, /0\.1\.4/, pathname);
    }
  }
});

test("serves crawler policy with the production sitemap URL", async () => {
  const response = await render("/robots.txt", "text/plain");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain\b/i);

  const robots = await response.text();
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(
    robots,
    /^Sitemap: https:\/\/sigmacode\.biz\/sitemap\.xml$/m,
  );
});

test("serves a bilingual sitemap with reciprocal alternates", async () => {
  const response = await render("/sitemap.xml", "application/xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/xml\b/i);

  const sitemap = await response.text();
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 10);
  assert.match(
    sitemap,
    /<loc>https:\/\/sigmacode\.biz\/<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/sigmacode\.biz\/en<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/sigmacode\.biz\/features\/durable-sessions<\/loc>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/sigmacode\.biz\/en\/docs\/getting-started<\/loc>/,
  );
  assert.equal((sitemap.match(/hreflang="zh-CN"/g) ?? []).length, 10);
  assert.equal((sitemap.match(/hreflang="en"/g) ?? []).length, 10);
  assert.equal((sitemap.match(/hreflang="x-default"/g) ?? []).length, 10);
});

test("keeps production assets and responsive source in place", async () => {
  const [
    page,
    landing,
    englishPage,
    chineseLayout,
    englishLayout,
    robotsRoute,
    sitemapRoute,
    siteConfig,
    contentPage,
    contentPages,
    css,
    packageJson,
  ] = await Promise.all([
    readFile(new URL("../app/(zh)/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/landing-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(en)/en/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(zh)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(en)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.txt/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content-pages.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await Promise.all([
    access(new URL("../public/sigma-code-mark.png", import.meta.url)),
    access(new URL("../public/sigma-code-tui.png", import.meta.url)),
    access(new URL("../public/sigma-code-desktop.webp", import.meta.url)),
    access(new URL("../public/sigma-code-og-1200.png", import.meta.url)),
    access(new URL("../public/sigma-code-demo.gif", import.meta.url)),
    access(new URL("../public/sigma-code-demo.webp", import.meta.url)),
    access(new URL("../public/favicon-16x16.png", import.meta.url)),
    access(new URL("../public/favicon-32x32.png", import.meta.url)),
    access(new URL("../public/favicon.ico", import.meta.url)),
    access(new URL("../public/apple-touch-icon.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/og-v2.png", import.meta.url)),
  ]);

  assert.match(page, /LandingPage/);
  assert.match(landing, /"@type": "SoftwareApplication"/);
  assert.match(landing, /id="principles"/);
  assert.match(landing, /id="download"/);
  assert.match(landing, /sigma-code-demo\.webp/);
  assert.match(englishPage, /locale="en"/);
  assert.match(chineseLayout, /openGraph:/);
  assert.match(chineseLayout, /twitter:/);
  assert.match(chineseLayout, /lang="zh-CN"/);
  assert.match(englishLayout, /lang="en"/);
  assert.match(robotsRoute, /Sitemap:/);
  assert.match(sitemapRoute, /x-default/);
  assert.match(siteConfig, /https:\/\/sigmacode\.biz/);
  assert.match(siteConfig, /INDEXABLE_PATHS/);
  assert.match(siteConfig, /RELEASE_VERSION = "0\.1\.5"/);
  assert.doesNotMatch(`${landing}\n${contentPage}\n${contentPages}`, /0\.1\.4/);
  assert.doesNotMatch(siteConfig, /chatgpt\.site|NEXT_PUBLIC_SITE_URL/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});
