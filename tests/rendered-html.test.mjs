import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
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

test("server-renders the Sigma Code landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(
    html,
    /<title>Sigma Code — 不会因中断丢进度的开源 Coding Agent<\/title>/,
  );
  assert.match(html, /不会因中断丢进度/);
  assert.match(html, /不会在没有验证时宣称完成/);
  assert.match(html, /原生沙箱执行/);
  assert.match(html, /中断后继续/);
  assert.match(html, /用证据证明完成/);
  assert.match(html, /Terminal-Bench 2\.1/);
  assert.match(html, /https:\/\/github\.com\/hututuQQQ\/sigma/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /sigma-code-og-1200\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps production assets and responsive source in place", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await Promise.all([
    access(new URL("../public/sigma-code-mark.png", import.meta.url)),
    access(new URL("../public/sigma-code-tui.png", import.meta.url)),
    access(new URL("../public/sigma-code-desktop.webp", import.meta.url)),
    access(new URL("../public/sigma-code-og-1200.png", import.meta.url)),
  ]);

  assert.match(page, /"@type": "SoftwareApplication"/);
  assert.match(page, /id="capabilities"/);
  assert.match(page, /id="download"/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});
