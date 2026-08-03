/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- vinext dev currently fails to optimize Next image/link shims reliably. */

import {
  GITHUB_URL,
  RELEASE_TAG,
  RELEASE_URL,
  RELEASE_VERSION,
  SITE_URLS,
} from "./site-config";

const githubUrl = GITHUB_URL;
const releaseUrl = RELEASE_URL;

type Locale = "zh" | "en";

const copy = {
  zh: {
    lang: "zh-CN",
    homeLabel: "Sigma Code 首页",
    navLabel: "主导航",
    nav: [
      ["工作方式", "#workflow"],
      ["功能指南", "#guides"],
      ["验证", "#evidence"],
      ["下载", "#download"],
    ],
    languageLabel: "切换语言",
    heroLabel: "OPEN SOURCE · DURABLE BY DESIGN",
    headlineLead: "让任务越过中断，",
    headlineAccent: "带着证据完成。",
    heroBody:
      "Sigma Code 是为长任务设计的开源 Coding Agent。会话写入耐久事件流，命令运行在原生沙箱，只有测试、验证与审查证据齐全，任务才会进入完成状态。",
    download: `下载 ${RELEASE_TAG}`,
    source: "在 GitHub 查看",
    availability: ["Linux x64 · Stable", "Windows x64 · Preview", "MIT licensed"],
    demoLabel: "真实产品演示",
    demoAlt: "Sigma Code 从任务指令到代码修改、测试通过与任务封存的真实工作流",
    demoSession: "demo-repo / durable-session",
    demoStatus: [
      ["01 · DURABLE SESSION", "从最近检查点恢复"],
      ["02 · NATIVE SANDBOX", "Windows / Linux 原生隔离"],
      ["03 · EVIDENCE GATE", "4 tests passed · sealed"],
    ],
    statsLabel: "Sigma Code 公开证据",
    stats: [
      ["57.303%", "Terminal-Bench 2.1"],
      ["51 / 89", "完整任务 · 同一设置"],
      ["Native", "Windows / Linux 沙箱"],
      ["MIT", "免费、开源、可审计"],
    ],
    principlesEyebrow: "THREE OPERATING PRINCIPLES",
    principlesTitle: "可靠，不靠一句「完成了」。",
    principlesBody:
      "模型能力只是起点。真正可托付的 Agent，需要明确的执行边界、能恢复的状态，以及无法被一句话绕过的完成协议。",
    principles: [
      {
        number: "01",
        title: "执行边界看得见",
        body: "命令、文件与网络能力都在明确边界内运行。Windows 使用 AppContainer，Linux 使用 namespace，不让 Agent 裸跑。",
        meta: "AppContainer / namespaces",
      },
      {
        number: "02",
        title: "状态不跟进程一起消失",
        body: "计划、工具调用、结果与检查点写入耐久事件流。终端关闭或进程重启后，长任务仍能从现场继续。",
        meta: "Event log / checkpoints",
      },
      {
        number: "03",
        title: "完成必须留下证据",
        body: "测试、验证与审查结果进入完成协议。证据没有通过，任务就不会被标记为完成。",
        meta: "Test / validate / review",
      },
    ],
    workflowEyebrow: "THE DURABLE LOOP",
    workflowTitle: "每一步，都留下下一次能接住的状态。",
    workflowBody:
      "Sigma Code 把 Agent 的工作从一次性对话变成可恢复执行链。过程可以中断，现场不会消失。",
    workflowLink: "阅读运行时设计",
    workflow: [
      ["01", "PLAN", "理解", "读取代码、约束与目标，生成可追踪的执行计划。"],
      ["02", "EXECUTE", "执行", "在原生沙箱内修改文件、运行命令并记录结果。"],
      ["03", "RESUME", "恢复", "从最近检查点继续，不需要重新解释任务现场。"],
      ["04", "PROVE", "证明", "测试、验证与审查全部满足后才进入完成状态。"],
    ],
    surfacesEyebrow: "ONE RUNTIME · TWO SURFACES",
    surfacesTitle: "在终端里专注，在桌面端掌控全局。",
    surfacesBody:
      "同一套可恢复运行时，覆盖键盘优先的 TUI 和基于 ACP v1 的桌面工作流。",
    tui: "终端界面",
    desktop: "桌面界面",
    keyboardFirst: "Keyboard-first",
    acp: "ACP v1",
    evidenceEyebrow: "TRANSPARENT EVALUATION",
    evidenceTitle: "公开分数，也公开边界。",
    evidenceBody:
      "在 Terminal-Bench 2.1、同一 DeepSeek 模型和完整 89 个任务的诊断性对比中，Sigma Code 完成 51 个任务。",
    evidenceCaveat:
      "这是一组可复现的工程诊断，不是“全面优于其他工具”的营销结论。运行清单、失败分类与方法均可审计。",
    evidenceLink: "查看完整评估方法",
    audit: "AUDITABLE",
    sameSetup: "DeepSeek · 89 tasks · same setup",
    delta: "Δ +2 completed tasks",
    fullRun: "Full 89-task run",
    guidesEyebrow: "PRODUCT GUIDES",
    guidesTitle: "深入理解一个可靠 Coding Agent。",
    guidesBody:
      "从可恢复会话、原生沙箱到证据式完成，了解 Sigma Code 如何把可靠性做成运行时能力，并用入门指南完成第一次配置。",
    guidesRead: "阅读指南",
    guides: [
      {
        title: "可恢复 Coding Agent 会话",
        body: "了解事件流、检查点与中断恢复如何保存长任务现场。",
        href: "/features/durable-sessions",
      },
      {
        title: "Windows 与 Linux 原生沙箱",
        body: "了解 AppContainer、namespace 与显式执行边界。",
        href: "/features/native-sandbox",
      },
      {
        title: "证据式完成协议",
        body: "了解测试、验证与审查如何共同决定任务是否完成。",
        href: "/features/evidence-backed-completion",
      },
      {
        title: "Sigma Code 入门",
        body: "下载、配置 Provider、运行 doctor 并启动第一个真实任务。",
        href: "/docs/getting-started",
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "几个关键问题。",
    faqs: [
      ["Sigma Code 最大的区别是什么？", "它把恢复和验证做成运行时协议，而不是提示词约定。状态会持久化，完成需要证据。"],
      ["电脑重启后还能继续吗？", "可以。会话会写入耐久事件流，并从最近检查点恢复；恢复粒度取决于任务所处阶段。"],
      ["支持哪些模型？", "支持多 Provider 接入，包括 DeepSeek 与统一 Pi Provider 网关。具体认证和能力范围以项目文档为准。"],
      ["Windows 可以直接安装吗？", `${RELEASE_TAG} 提供 Windows x64 未签名预览版；Linux x64 是当前稳定发行版。`],
    ],
    ctaEyebrow: "START WITH A REAL TASK",
    ctaTitle: "让下一个长任务，不再从头开始。",
    ctaBody: "免费、开源、MIT 许可。选择平台，开始一个可以被验证的真实任务。",
    linuxBody: "CLI + TUI · 推荐体验",
    windowsBody: "未签名预览版 · AppContainer",
    sourceBody: "Rust · 开发者构建",
    footerLine: "工作可以中断，证据不会缺席。",
    builtOpen: "Built in the open.",
  },
  en: {
    lang: "en",
    homeLabel: "Sigma Code home",
    navLabel: "Main navigation",
    nav: [
      ["How it works", "#workflow"],
      ["Guides", "#guides"],
      ["Evidence", "#evidence"],
      ["Download", "#download"],
    ],
    languageLabel: "Switch language",
    heroLabel: "OPEN SOURCE · DURABLE BY DESIGN",
    headlineLead: "Work survives the interruption.",
    headlineAccent: "Proof closes the task.",
    heroBody:
      "Sigma Code is an open-source coding agent built for long-running work. Sessions live in a durable event stream, commands run inside native sandboxes, and a task completes only when tests, validation, and review evidence agree.",
    download: `Download ${RELEASE_TAG}`,
    source: "View on GitHub",
    availability: ["Linux x64 · Stable", "Windows x64 · Preview", "MIT licensed"],
    demoLabel: "Real product demo",
    demoAlt: "A real Sigma Code workflow from task instruction through code changes, passing tests, and a sealed task",
    demoSession: "demo-repo / durable-session",
    demoStatus: [
      ["01 · DURABLE SESSION", "Resume from the latest checkpoint"],
      ["02 · NATIVE SANDBOX", "Native Windows / Linux isolation"],
      ["03 · EVIDENCE GATE", "4 tests passed · sealed"],
    ],
    statsLabel: "Public Sigma Code evidence",
    stats: [
      ["57.303%", "Terminal-Bench 2.1"],
      ["51 / 89", "Full run · same setup"],
      ["Native", "Windows / Linux sandbox"],
      ["MIT", "Free, open, auditable"],
    ],
    principlesEyebrow: "THREE OPERATING PRINCIPLES",
    principlesTitle: "Reliability is more than saying “done.”",
    principlesBody:
      "Model capability is only the starting point. A dependable agent needs explicit execution boundaries, recoverable state, and a completion protocol that words alone cannot bypass.",
    principles: [
      {
        number: "01",
        title: "Visible execution boundaries",
        body: "Commands, files, and network access run inside explicit boundaries: AppContainer on Windows and namespaces on Linux.",
        meta: "AppContainer / namespaces",
      },
      {
        number: "02",
        title: "State outlives the process",
        body: "Plans, tool calls, results, and checkpoints enter a durable event stream. Close the terminal or restart the process—the task keeps its place.",
        meta: "Event log / checkpoints",
      },
      {
        number: "03",
        title: "Completion requires evidence",
        body: "Tests, validation, and review results are part of the completion protocol. Without passing evidence, the task stays open.",
        meta: "Test / validate / review",
      },
    ],
    workflowEyebrow: "THE DURABLE LOOP",
    workflowTitle: "Every step leaves state the next run can pick up.",
    workflowBody:
      "Sigma Code turns agent work from a one-off conversation into a recoverable execution chain. The process may stop; the working context remains.",
    workflowLink: "Read the runtime design",
    workflow: [
      ["01", "PLAN", "Understand", "Read the code, constraints, and goal; produce a traceable plan."],
      ["02", "EXECUTE", "Execute", "Edit files and run commands inside a native sandbox while recording results."],
      ["03", "RESUME", "Resume", "Continue from the latest checkpoint without reconstructing the task."],
      ["04", "PROVE", "Prove", "Complete only after tests, validation, and review all agree."],
    ],
    surfacesEyebrow: "ONE RUNTIME · TWO SURFACES",
    surfacesTitle: "Focus in the terminal. See the whole system on desktop.",
    surfacesBody:
      "The same recoverable runtime powers a keyboard-first TUI and an ACP v1 desktop workflow.",
    tui: "Terminal interface",
    desktop: "Desktop interface",
    keyboardFirst: "Keyboard-first",
    acp: "ACP v1",
    evidenceEyebrow: "TRANSPARENT EVALUATION",
    evidenceTitle: "Publish the score. Publish the boundary.",
    evidenceBody:
      "In a diagnostic comparison across Terminal-Bench 2.1, the same DeepSeek model, and all 89 tasks, Sigma Code completed 51 tasks.",
    evidenceCaveat:
      "This is a reproducible engineering diagnostic, not a claim of universal superiority. The run list, failure categories, and method are auditable.",
    evidenceLink: "Read the evaluation method",
    audit: "AUDITABLE",
    sameSetup: "DeepSeek · 89 tasks · same setup",
    delta: "Δ +2 completed tasks",
    fullRun: "Full 89-task run",
    guidesEyebrow: "PRODUCT GUIDES",
    guidesTitle: "Understand what makes a coding agent dependable.",
    guidesBody:
      "Explore durable sessions, native sandboxing, evidence-backed completion, and a practical path to your first Sigma Code task.",
    guidesRead: "Read guide",
    guides: [
      {
        title: "Durable coding agent sessions",
        body: "See how event streams, checkpoints, and recovery preserve long-running work.",
        href: "/en/features/durable-sessions",
      },
      {
        title: "Native sandboxing on Windows and Linux",
        body: "Understand AppContainer, namespaces, and explicit execution boundaries.",
        href: "/en/features/native-sandbox",
      },
      {
        title: "Evidence-backed completion",
        body: "Learn how tests, validation, and review determine whether a task is complete.",
        href: "/en/features/evidence-backed-completion",
      },
      {
        title: "Get started with Sigma Code",
        body: "Download, configure a provider, run doctor, and begin a real task.",
        href: "/en/docs/getting-started",
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "A few important questions.",
    faqs: [
      ["What makes Sigma Code different?", "Recovery and verification are runtime protocols, not prompt conventions. State persists, and completion needs evidence."],
      ["Can a task resume after a restart?", "Yes. Sessions are written to a durable event stream and resume from the latest checkpoint; granularity depends on the task stage."],
      ["Which models are supported?", "Sigma Code supports multiple providers, including DeepSeek and the unified Pi provider gateway. See the project docs for authentication details."],
      ["Is there a Windows build?", `${RELEASE_TAG} includes an unsigned Windows x64 preview. Linux x64 is the current stable release.`],
    ],
    ctaEyebrow: "START WITH A REAL TASK",
    ctaTitle: "Let the next long task continue where it left off.",
    ctaBody: "Free, open source, and MIT licensed. Choose a platform and start a task that can prove its result.",
    linuxBody: "CLI + TUI · Recommended",
    windowsBody: "Unsigned preview · AppContainer",
    sourceBody: "Rust · Developer build",
    footerLine: "Work may stop. Evidence should not.",
    builtOpen: "Built in the open.",
  },
} as const;

export function LandingPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const isChinese = locale === "zh";
  const readmeUrl = `${githubUrl}/blob/main/${isChinese ? "README.zh-CN.md" : "README.md"}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sigma Code",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, Windows",
    description: text.heroBody,
    softwareVersion: RELEASE_VERSION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: isChinese ? SITE_URLS.zh : SITE_URLS.en,
    codeRepository: githubUrl,
    sameAs: [githubUrl],
  };

  return (
    <div className="site-shell" lang={text.lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="topbar">
        <a className="brand" href={isChinese ? "/" : "/en"} aria-label={text.homeLabel}>
          <img className="brand-mark" src="/sigma-code-mark.png" alt="" width={36} height={36} />
          <span className="brand-name">Sigma Code</span>
          <span className="version">{RELEASE_TAG}</span>
        </a>

        <nav className="main-nav" aria-label={text.navLabel}>
          {text.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <div className="locale-switch" aria-label={text.languageLabel}>
            <a href="/" aria-current={isChinese ? "page" : undefined}>中</a>
            <span aria-hidden="true">/</span>
            <a href="/en" aria-current={!isChinese ? "page" : undefined}>EN</a>
          </div>
          <a className="header-github" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-intro">
            <div className="hero-heading">
              <p className="overline">{text.heroLabel}</p>
              <h1>
                <span>{text.headlineLead}</span>
                <em>{text.headlineAccent}</em>
              </h1>
            </div>

            <div className="hero-summary">
              <p>{text.heroBody}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={releaseUrl} target="_blank" rel="noreferrer">
                  {text.download} <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">
                  {text.source} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="availability">
                {text.availability.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>

          <div className="product-demo" aria-label={text.demoLabel}>
            <div className="demo-bar">
              <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
              <span>{text.demoSession}</span>
              <strong><i aria-hidden="true" /> LIVE</strong>
            </div>
            <picture className="demo-picture">
              <source srcSet="/sigma-code-demo.webp" type="image/webp" />
              <img
                src="/sigma-code-demo.gif"
                alt={text.demoAlt}
                width={1280}
                height={720}
                fetchPriority="high"
              />
            </picture>
            <div className="demo-status">
              {text.demoStatus.map(([label, value]) => (
                <div key={label}><strong>{label}</strong><span>{value}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label={text.statsLabel}>
          {text.stats.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>

        <section className="section principles" id="principles">
          <div className="section-intro">
            <div><p className="overline">{text.principlesEyebrow}</p><h2>{text.principlesTitle}</h2></div>
            <p>{text.principlesBody}</p>
          </div>

          <div className="principle-list">
            {text.principles.map((item) => (
              <article className="principle" key={item.number}>
                <span className="principle-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="principle-meta">{item.meta}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="workflow-inner">
            <div className="workflow-copy">
              <p className="overline overline-dark">{text.workflowEyebrow}</p>
              <h2>{text.workflowTitle}</h2>
              <p>{text.workflowBody}</p>
              <a href={readmeUrl} target="_blank" rel="noreferrer">{text.workflowLink} <span aria-hidden="true">↗</span></a>
            </div>

            <ol className="workflow-list">
              {text.workflow.map(([number, code, title, body]) => (
                <li key={number}>
                  <span className="workflow-number">{number}</span>
                  <div><span className="workflow-code">{code}</span><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section surfaces">
          <div className="section-intro">
            <div><p className="overline">{text.surfacesEyebrow}</p><h2>{text.surfacesTitle}</h2></div>
            <p>{text.surfacesBody}</p>
          </div>

          <div className="surface-grid">
            <figure className="surface surface-tui">
              <figcaption><strong>TUI</strong><span>{text.keyboardFirst}</span></figcaption>
              <div><img src="/sigma-code-tui.png" alt={`Sigma Code ${text.tui}`} width={1280} height={720} loading="lazy" decoding="async" /></div>
            </figure>
            <figure className="surface surface-desktop">
              <figcaption><strong>DESKTOP</strong><span>{text.acp}</span></figcaption>
              <div><img src="/sigma-code-desktop.webp" alt={`Sigma Code ${text.desktop}`} width={1600} height={871} loading="lazy" decoding="async" /></div>
            </figure>
          </div>
        </section>

        <section className="section evidence" id="evidence">
          <div className="evidence-copy">
            <p className="overline">{text.evidenceEyebrow}</p>
            <h2>{text.evidenceTitle}</h2>
            <p>{text.evidenceBody}</p>
            <p className="evidence-caveat">{text.evidenceCaveat}</p>
            <a href={readmeUrl} target="_blank" rel="noreferrer">{text.evidenceLink} <span aria-hidden="true">↗</span></a>
          </div>

          <div className="benchmark" aria-label="Terminal-Bench 2.1">
            <div className="benchmark-head"><div><strong>Terminal-Bench 2.1</strong><span>{text.sameSetup}</span></div><span>{text.audit}</span></div>
            <div className="benchmark-row benchmark-primary">
              <div><strong>Sigma Code</strong><span>51 / 89</span></div>
              <div className="benchmark-track"><i style={{ width: "57.303%" }} /></div>
              <b>57.303%</b>
            </div>
            <div className="benchmark-row">
              <div><strong>OpenCode</strong><span>49 / 89</span></div>
              <div className="benchmark-track"><i style={{ width: "55.056%" }} /></div>
              <b>55.056%</b>
            </div>
            <div className="benchmark-foot"><span>{text.delta}</span><span>{text.fullRun}</span></div>
          </div>
        </section>

        <section className="section resource-section" id="guides">
          <div className="section-intro">
            <div><p className="overline">{text.guidesEyebrow}</p><h2>{text.guidesTitle}</h2></div>
            <p>{text.guidesBody}</p>
          </div>
          <div className="resource-grid">
            {text.guides.map((guide, index) => (
              <a href={guide.href} key={guide.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{guide.title}</h3>
                <p>{guide.body}</p>
                <b>{text.guidesRead} →</b>
              </a>
            ))}
          </div>
        </section>

        <section className="section faq">
          <div className="faq-heading"><p className="overline">{text.faqEyebrow}</p><h2>{text.faqTitle}</h2></div>
          <div className="faq-list">
            {text.faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="download-inner">
            <div className="download-copy"><p className="overline overline-dark">{text.ctaEyebrow}</p><h2>{text.ctaTitle}</h2><p>{text.ctaBody}</p></div>
            <div className="download-list">
              <a href={releaseUrl} target="_blank" rel="noreferrer"><div><span>STABLE</span><strong>Linux x64</strong><p>{text.linuxBody}</p></div><b aria-hidden="true">↓</b></a>
              <a href={releaseUrl} target="_blank" rel="noreferrer"><div><span>PREVIEW</span><strong>Windows x64</strong><p>{text.windowsBody}</p></div><b aria-hidden="true">↓</b></a>
              <a href={githubUrl} target="_blank" rel="noreferrer"><div><span>SOURCE</span><strong>Build from source</strong><p>{text.sourceBody}</p></div><b aria-hidden="true">↗</b></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><img src="/sigma-code-mark.png" alt="" width={34} height={34} /><div><strong>Sigma Code</strong><span>{text.footerLine}</span></div></div>
        <div className="footer-links"><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer">Issues</a><a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a></div>
        <span className="footer-note">{text.builtOpen}</span>
      </footer>
    </div>
  );
}
