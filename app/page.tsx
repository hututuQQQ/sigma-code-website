/* eslint-disable @next/next/no-img-element -- vinext dev currently fails to optimize next/image. */

const githubUrl = "https://github.com/hututuQQQ/sigma";
const releaseUrl = "https://github.com/hututuQQQ/sigma/releases/tag/v0.1.4";

const features = [
  {
    number: "01",
    title: "原生沙箱执行",
    eyebrow: "NATIVE SANDBOX",
    body: "命令、文件与网络能力都在明确边界内运行。Windows 使用 AppContainer，Linux 使用 namespace，不让 Agent 裸跑。",
    proof: "权限可见 · 边界可审计",
  },
  {
    number: "02",
    title: "中断后继续",
    eyebrow: "DURABLE SESSIONS",
    body: "每一步都写入可恢复的事件流。关掉终端、重启进程，长任务仍能从检查点继续，不必重新解释现场。",
    proof: "Checkpoint · Event log",
  },
  {
    number: "03",
    title: "用证据证明完成",
    eyebrow: "EVIDENCE, NOT CLAIMS",
    body: "测试、验证与审查结果会进入完成协议。没有通过验证，就不会把“我改好了”当成任务完成。",
    proof: "Test · Validate · Review",
  },
];

const workflow = [
  {
    number: "1",
    title: "理解任务",
    body: "读取代码、约束与目标，生成可追踪的执行计划。",
    code: "PLAN",
  },
  {
    number: "2",
    title: "受控执行",
    body: "在原生沙箱内修改、运行命令，并持续记录事件。",
    code: "EXECUTE",
  },
  {
    number: "3",
    title: "随时恢复",
    body: "进程退出也不会抹去任务状态，从最近检查点继续。",
    code: "RESUME",
  },
  {
    number: "4",
    title: "验证交付",
    body: "测试、审查与证据全部满足后，才进入完成状态。",
    code: "PROVE",
  },
];

const searchTopics = [
  {
    tag: "DEEPSEEK",
    title: "用 DeepSeek 搭一个开源 Coding Agent",
    body: "从 Provider 配置、沙箱运行到第一个可验证任务。",
    href: `${githubUrl}/blob/main/README.zh-CN.md#配置`,
  },
  {
    tag: "RESUMABLE AGENT",
    title: "Coding Agent 为什么要支持中断恢复？",
    body: "看懂事件流、检查点和长任务恢复之间的关系。",
    href: `${githubUrl}/blob/main/README.zh-CN.md#检查点与持久状态`,
  },
  {
    tag: "AI SANDBOX",
    title: "为什么 AI Agent 必须跑在沙箱里",
    body: "Windows AppContainer、Linux namespace 与权限边界。",
    href: `${githubUrl}/blob/main/README.zh-CN.md#执行边界`,
  },
];

const faqs = [
  {
    question: "Sigma Code 和普通 Coding Agent 最大的区别是什么？",
    answer:
      "它把恢复和验证做成运行时协议，而不是提示词约定。任务状态会持久化，完成状态需要测试、验证或审查证据支持。",
  },
  {
    question: "电脑重启或终端关闭后，任务还能继续吗？",
    answer:
      "可以。Sigma Code 会把会话写入耐久事件流，并从最近检查点恢复；实际恢复粒度取决于任务进行到的阶段。",
  },
  {
    question: "支持 DeepSeek 和其他模型吗？",
    answer:
      "支持多 Provider 接入，包括 DeepSeek 与统一 Pi Provider 网关。不同 Provider 的认证和能力范围请以项目配置文档为准。",
  },
  {
    question: "Windows 版本可以直接安装吗？",
    answer:
      "v0.1.4 提供 Windows x64 未签名预览版，安装时会出现系统提示；Linux x64 为当前稳定发行版。",
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sigma Code",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, Windows",
    description:
      "An open-source coding agent that survives interruptions and proves its changes.",
    softwareVersion: "0.1.4",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    codeRepository: githubUrl,
  };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sigma Code 首页">
          <img
            className="brand-mark"
            src="/sigma-code-mark.png"
            alt=""
            width={38}
            height={38}
          />
          <span className="brand-name">Sigma Code</span>
          <span className="version-pill">v0.1.4</span>
        </a>

        <nav className="main-nav" aria-label="主导航">
          <a href="#capabilities">核心能力</a>
          <a href="#workflow">工作方式</a>
          <a href="#proof">验证</a>
          <a href="#download">下载</a>
        </nav>

        <a
          className="header-cta"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="status-dot" aria-hidden="true" />
              OPEN SOURCE · BUILT FOR LONG RUNS
            </div>
            <p className="hero-kicker">THE AGENT THAT REMEMBERS THE JOB.</p>
            <h1>
              中断了，<span>继续跑。</span>
              <em>没验证，不算完。</em>
            </h1>
            <p className="hero-lead">
              不会因中断丢进度，也不会在没有验证时宣称完成。Sigma Code
              在原生沙箱里执行长任务，从检查点恢复，用测试与审查证据交付结果。
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={releaseUrl}
                target="_blank"
                rel="noreferrer"
              >
                下载 v0.1.4 <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                查看源代码 <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="hero-meta" aria-label="产品摘要">
              <span>Linux x64 · Stable</span>
              <span>Windows x64 · Preview</span>
              <span>DeepSeek · Multi-provider</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Sigma Code 桌面端真实任务演示">
            <span className="demo-orbit orbit-one" aria-hidden="true" />
            <span className="demo-orbit orbit-two" aria-hidden="true" />

            <div className="demo-shell">
              <div className="demo-toolbar">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="demo-session">sigma-code / durable-session</span>
                <span className="demo-live">
                  <i aria-hidden="true" /> LIVE DEMO
                </span>
              </div>

              <div className="demo-media">
                <img
                  className="demo-gif"
                  src="/sigma-code-demo.gif"
                  alt="Sigma Code 桌面端从任务指令到代码变更与验证完成的交互演示"
                  width={1280}
                  height={720}
                  fetchPriority="high"
                />
                <span className="demo-scanline" aria-hidden="true" />
                <span className="demo-vignette" aria-hidden="true" />
              </div>

              <div className="demo-footer">
                <span>AGENT RUN</span>
                <span className="demo-progress" aria-hidden="true"><i /></span>
                <strong>RESUME → PROVE</strong>
              </div>
            </div>

            <div className="demo-chip chip-resume">
              <span aria-hidden="true">↻</span>
              <div><strong>RESUMABLE</strong><small>从检查点继续</small></div>
            </div>
            <div className="demo-chip chip-evidence">
              <span aria-hidden="true">✓</span>
              <div><strong>PROVED</strong><small>测试与审查通过</small></div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Sigma Code 关键能力">
          <div><strong>57.303%</strong><span>Terminal-Bench 2.1</span></div>
          <div><strong>89</strong><span>完整任务 · 同一设置</span></div>
          <div><strong>Native</strong><span>Linux / Windows 沙箱</span></div>
          <div><strong>MIT</strong><span>开源 · 可审计</span></div>
        </section>

        <section className="section capabilities" id="capabilities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHY SIGMA CODE</p>
              <h2>一个更不容易骗过自己的 Coding Agent。</h2>
            </div>
            <p>
              模型能力只是起点。真正可靠的 Coding Agent，还需要受控执行、可恢复状态和可验证交付。
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-topline">
                  <span className="feature-number">{feature.number}</span>
                  <span className="feature-eyebrow">{feature.eyebrow}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <div className="feature-proof">
                  <span aria-hidden="true">+</span> {feature.proof}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="workflow-intro">
            <p className="eyebrow eyebrow-light">THE DURABLE LOOP</p>
            <h2>不是一次对话，<br />是一条可恢复的执行链。</h2>
            <p>
              Sigma Code 把计划、命令、结果、检查点和验证证据记录成事件。任何一步中断，下一次运行都知道从哪里继续。
            </p>
            <a href={`${githubUrl}/blob/main/README.zh-CN.md#核心事件循环`} target="_blank" rel="noreferrer">
              查看事件循环设计 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ol className="workflow-list">
            {workflow.map((step) => (
              <li key={step.number}>
                <span className="workflow-number">{step.number}</span>
                <div>
                  <span className="workflow-code">{step.code}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section interfaces-section" aria-labelledby="interfaces-title">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">ONE RUNTIME · MULTIPLE SURFACES</p>
              <h2 id="interfaces-title">在终端里专注，也能接入桌面工作流。</h2>
            </div>
            <p>
              同一套可恢复运行时，提供 TUI、Sigma Code Desktop 与 ACP v1 接入能力。
            </p>
          </div>

          <div className="interface-grid">
            <article className="interface-card tui-card">
              <div className="interface-label">
                <span>TUI</span>
                <span>Keyboard-first</span>
              </div>
              <div className="media-frame terminal-frame">
                <img
                  src="/sigma-code-tui.png"
                  alt="Sigma Code 终端界面"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="interface-card desktop-card">
              <div className="interface-label">
                <span>DESKTOP</span>
                <span>ACP v1</span>
              </div>
              <div className="media-frame desktop-frame">
                <img
                  src="/sigma-code-desktop.webp"
                  alt="Sigma Code 桌面应用界面"
                  width={1600}
                  height={871}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </div>
        </section>

        <section className="section benchmark-section" id="proof">
          <div className="benchmark-copy">
            <p className="eyebrow">TRANSPARENT EVALUATION</p>
            <h2>把证据放在首页，<br />也把边界写清楚。</h2>
            <p>
              在同一 Terminal-Bench 2.1、同一 DeepSeek 模型、完整 89 个任务的诊断性对比中，Sigma Code 完成 51 个任务。
            </p>
            <p className="benchmark-caveat">
              这是可复现的工程诊断，不是“全面优于其他工具”的营销结论。运行清单、失败分类与方法都可审计。
            </p>
            <a href={`${githubUrl}/blob/main/README.zh-CN.md#terminal-bench-21sigma-code--deepseek-对比-opencode--deepseek`} target="_blank" rel="noreferrer">
              阅读完整评估边界 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="benchmark-card" aria-label="Terminal-Bench 2.1 对比结果">
            <div className="benchmark-card-head">
              <div>
                <span className="benchmark-title">Terminal-Bench 2.1</span>
                <span>DeepSeek · 89 tasks · same setup</span>
              </div>
              <span className="audit-pill">AUDITABLE</span>
            </div>

            <div className="score-row primary-score">
              <div className="score-label">
                <strong>Sigma Code</strong>
                <span><b>51</b> / 89</span>
              </div>
              <div className="score-track"><span style={{ width: "57.303%" }} /></div>
              <span className="score-percent">57.303%</span>
            </div>

            <div className="score-row">
              <div className="score-label">
                <strong>OpenCode</strong>
                <span><b>49</b> / 89</span>
              </div>
              <div className="score-track"><span style={{ width: "55.056%" }} /></div>
              <span className="score-percent">55.056%</span>
            </div>

            <div className="benchmark-footer">
              <span>Δ +2 completed tasks</span>
              <span>Full 89-task run</span>
            </div>
          </div>
        </section>

        <section className="section content-section" aria-labelledby="learn-title">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">LEARN BY PROBLEM</p>
              <h2 id="learn-title">从你正在搜索的问题开始。</h2>
            </div>
            <p>
              官网不只展示产品，也会持续沉淀 DeepSeek、Agent 沙箱和中断恢复等可搜索的实战内容。
            </p>
          </div>

          <div className="topic-grid">
            {searchTopics.map((topic) => (
              <a className="topic-card" href={topic.href} target="_blank" rel="noreferrer" key={topic.title}>
                <span className="topic-tag">{topic.tag}</span>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
                <span className="topic-link">阅读技术说明 <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="faq-heading">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">先回答你最可能问的。</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-plus" aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="download-section" id="download">
          <div className="download-copy">
            <p className="eyebrow eyebrow-light">START WITH A REAL TASK</p>
            <h2>让下一个长任务，<br />不再从头开始。</h2>
            <p>
              免费、开源、MIT 许可。选择你的平台，下载 Sigma Code v0.1.4。
            </p>
          </div>

          <div className="download-options">
            <a href={releaseUrl} target="_blank" rel="noreferrer" className="download-card">
              <div>
                <span className="platform-status stable">STABLE</span>
                <h3>Linux x64</h3>
                <p>CLI + TUI · 推荐体验</p>
              </div>
              <span className="download-arrow" aria-hidden="true">↓</span>
            </a>
            <a href={releaseUrl} target="_blank" rel="noreferrer" className="download-card">
              <div>
                <span className="platform-status preview">PREVIEW</span>
                <h3>Windows x64</h3>
                <p>未签名预览版 · AppContainer</p>
              </div>
              <span className="download-arrow" aria-hidden="true">↓</span>
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="download-card source-card">
              <div>
                <span className="platform-status source">SOURCE</span>
                <h3>Build from source</h3>
                <p>Rust · 开发者构建</p>
              </div>
              <span className="download-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/sigma-code-mark.png" alt="" width={34} height={34} />
          <div>
            <strong>Sigma Code</strong>
            <span>Survives interruptions. Proves its changes.</span>
          </div>
        </div>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer">Issues</a>
          <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a>
        </div>
        <span className="footer-note">Built in the open.</span>
      </footer>
    </div>
  );
}
