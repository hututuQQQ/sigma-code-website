# Sigma Code Website

The official website for [Sigma Code](https://github.com/hututuQQQ/sigma),
published at [sigmacode.biz](https://sigmacode.biz): the open-source coding
agent that survives interruptions and proves its changes.

The site turns Sigma Code's core runtime guarantees into a clear product story:

- native sandbox execution on Linux and Windows
- durable sessions that resume after interruptions
- evidence-backed completion through tests, validation, and review
- transparent Terminal-Bench 2.1 results and evaluation boundaries
- download paths for Linux, Windows, and source builds
- searchable technical content around DeepSeek, agent sandboxes, and recovery
- bilingual product guides for durable sessions, native sandboxing,
  evidence-backed completion, and getting started
- one canonical HTTPS origin with permanent redirects from legacy hosts

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm test
npm run lint
```

`npm test` runs a production vinext build and verifies the server-rendered home
page, SEO metadata, product content, responsive source, and required assets.

## Project structure

- `app/page.tsx` — landing-page content and structured product data
- `app/globals.css` — visual system and responsive layouts
- `app/layout.tsx` — title, description, icons, Open Graph, and Twitter metadata
- `public/` — Sigma Code product imagery and social sharing card
- `tests/` — rendered HTML and source integrity checks
- `.openai/hosting.json` — Sites hosting configuration

## Technology

- React 19
- Next.js-compatible app routing through [vinext](https://github.com/cloudflare/vinext)
- Tailwind CSS 4 entrypoint with a custom CSS design system
- Cloudflare Workers-compatible build output

## License

MIT. See [LICENSE](./LICENSE).
