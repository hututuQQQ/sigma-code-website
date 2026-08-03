/* eslint-disable @next/next/no-img-element -- vinext does not reliably optimize Next image shims. */

import type { Metadata } from "next";
import {
  CONTENT_SLUGS,
  getContentPage,
  type ContentPageData,
} from "./content-pages";
import { SITE_ORIGIN } from "./site-config";
import { siteIcons } from "./site-metadata";

const githubUrl = "https://github.com/hututuQQQ/sigma";
const releaseUrl = githubUrl + "/releases/tag/v0.1.4";

function absoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN);
}

function languagePaths(page: ContentPageData) {
  return page.locale === "zh"
    ? { zh: page.path, en: page.alternatePath }
    : { zh: page.alternatePath, en: page.path };
}

export function createContentMetadata(page: ContentPageData): Metadata {
  const paths = languagePaths(page);
  const canonical = absoluteUrl(page.path);
  const ogImage = absoluteUrl("/og-v2.png");

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: page.title + " | Sigma Code",
    description: page.description,
    alternates: {
      canonical,
      languages: {
        "zh-CN": absoluteUrl(paths.zh),
        en: absoluteUrl(paths.en),
        "x-default": absoluteUrl(paths.zh),
      },
    },
    icons: siteIcons,
    openGraph: {
      type: "article",
      url: canonical,
      locale: page.locale === "zh" ? "zh_CN" : "en_US",
      title: page.title + " | Sigma Code",
      description: page.description,
      siteName: "Sigma Code",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Sigma Code — Work survives. Proof closes the task.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title + " | Sigma Code",
      description: page.description,
      images: [ogImage],
    },
  };
}

export function ContentPage({ page }: { page: ContentPageData }) {
  const isChinese = page.locale === "zh";
  const homePath = isChinese ? "/" : "/en";
  const paths = languagePaths(page);
  const relatedPages = CONTENT_SLUGS.filter((slug) => slug !== page.slug)
    .map((slug) => getContentPage(page.locale, slug));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: page.title,
        description: page.description,
        inLanguage: isChinese ? "zh-CN" : "en",
        mainEntityOfPage: absoluteUrl(page.path).toString(),
        author: { "@type": "Organization", name: "Sigma Code" },
        publisher: {
          "@type": "Organization",
          name: "Sigma Code",
          url: SITE_ORIGIN,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isChinese ? "首页" : "Home",
            item: absoluteUrl(homePath).toString(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: absoluteUrl(page.path).toString(),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <div className="site-shell content-site" lang={isChinese ? "zh-CN" : "en"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="topbar content-topbar">
        <a className="brand" href={homePath} aria-label={isChinese ? "Sigma Code 首页" : "Sigma Code home"}>
          <img className="brand-mark" src="/sigma-code-mark.png" alt="" width={36} height={36} />
          <span className="brand-name">Sigma Code</span>
          <span className="version">v0.1.4</span>
        </a>
        <nav className="main-nav" aria-label={isChinese ? "内容导航" : "Content navigation"}>
          <a href={homePath + "#workflow"}>{isChinese ? "工作方式" : "How it works"}</a>
          <a href={homePath + "#guides"}>{isChinese ? "指南" : "Guides"}</a>
          <a href={homePath + "#download"}>{isChinese ? "下载" : "Download"}</a>
        </nav>
        <div className="header-actions">
          <div className="locale-switch" aria-label={isChinese ? "切换语言" : "Switch language"}>
            <a href={paths.zh} aria-current={isChinese ? "page" : undefined}>中</a>
            <span aria-hidden="true">/</span>
            <a href={paths.en} aria-current={!isChinese ? "page" : undefined}>EN</a>
          </div>
          <a className="header-github" href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <main className="content-main">
        <nav className="breadcrumbs" aria-label={isChinese ? "面包屑" : "Breadcrumb"}>
          <a href={homePath}>{isChinese ? "首页" : "Home"}</a>
          <span aria-hidden="true">/</span>
          <span>{page.slug === "getting-started" ? (isChinese ? "入门" : "Getting started") : (isChinese ? "功能" : "Features")}</span>
        </nav>

        <article className="content-article">
          <header className="content-hero">
            <p className="overline">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.lead}</p>
          </header>

          <div className="content-layout">
            <aside className="content-toc">
              <strong>{isChinese ? "本页内容" : "On this page"}</strong>
              <ol>
                {page.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a href={"#section-" + (index + 1)}>{section.heading}</a>
                  </li>
                ))}
                <li><a href="#faq">{isChinese ? "常见问题" : "Frequently asked questions"}</a></li>
              </ol>
            </aside>

            <div className="content-body">
              {page.sections.map((section, index) => (
                <section id={"section-" + (index + 1)} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                  {section.code ? <pre><code>{section.code}</code></pre> : null}
                </section>
              ))}

              <section id="faq" className="content-faq">
                <p className="overline">FAQ</p>
                <h2>{isChinese ? "常见问题" : "Frequently asked questions"}</h2>
                {page.faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}<span aria-hidden="true">+</span></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </section>
            </div>
          </div>
        </article>

        <section className="related-guides" aria-labelledby="related-guides-title">
          <p className="overline">{isChinese ? "继续了解" : "KEEP READING"}</p>
          <h2 id="related-guides-title">{isChinese ? "Sigma Code 指南" : "Sigma Code guides"}</h2>
          <div className="resource-grid">
            {relatedPages.map((related) => (
              <a href={related.path} key={related.path}>
                <span>{related.eyebrow}</span>
                <h3>{related.title}</h3>
                <p>{related.description}</p>
                <b>{isChinese ? "阅读指南 →" : "Read guide →"}</b>
              </a>
            ))}
          </div>
        </section>

        <section className="content-cta">
          <div>
            <p className="overline overline-dark">OPEN SOURCE · MIT</p>
            <h2>{page.ctaTitle}</h2>
            <p>{page.ctaBody}</p>
          </div>
          <div>
            <a className="button button-primary" href={releaseUrl} target="_blank" rel="noreferrer">
              {isChinese ? "下载 v0.1.4" : "Download v0.1.4"} <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">
              {isChinese ? "查看 GitHub" : "View on GitHub"} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/sigma-code-mark.png" alt="" width={34} height={34} />
          <div><strong>Sigma Code</strong><span>{isChinese ? "工作可以中断，证据不会缺席。" : "Work may stop. Evidence should not."}</span></div>
        </div>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={githubUrl + "/issues"} target="_blank" rel="noreferrer">Issues</a>
          <a href={githubUrl + "/blob/main/LICENSE"} target="_blank" rel="noreferrer">MIT License</a>
        </div>
        <span className="footer-note">sigmacode.biz</span>
      </footer>
    </div>
  );
}
