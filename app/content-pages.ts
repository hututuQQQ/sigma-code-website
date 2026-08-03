export const CONTENT_SLUGS = [
  "durable-sessions",
  "native-sandbox",
  "evidence-backed-completion",
  "getting-started",
] as const;

export type ContentSlug = (typeof CONTENT_SLUGS)[number];
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

export const contentPages = {
  zh: {
    "durable-sessions": {
      slug: "durable-sessions",
      locale: "zh",
      path: "/features/durable-sessions",
      alternatePath: "/en/features/durable-sessions",
      eyebrow: "DURABLE CODING AGENT SESSIONS",
      title: "可恢复 Coding Agent：让长任务越过中断",
      description:
        "了解 Sigma Code 如何用耐久事件流、检查点与可重放状态保存 Coding Agent 现场，让长时间代码任务在终端关闭或进程重启后继续。",
      lead:
        "普通对话把工作状态留在一个进程里。Sigma Code 把计划、工具调用、结果与检查点写入耐久事件流，让任务现场成为可恢复的数据，而不是一段随时可能消失的上下文。",
      sections: [
        {
          heading: "为什么 Coding Agent 需要耐久会话",
          paragraphs: [
            "真实的软件任务很少能在一次模型回复里结束。依赖安装、测试、构建、代码审查和环境排障都可能跨越很长时间，也可能被网络波动、终端关闭、系统重启或上下文窗口压缩打断。",
            "如果 Agent 只保存最终聊天文本，恢复时就必须猜测已经执行过什么、哪些文件被修改、验证进行到哪一步。Sigma Code 保存结构化执行事件，使恢复建立在实际记录上。",
          ],
          bullets: [
            "计划、工具调用与工具结果进入同一条事件流。",
            "关键阶段生成检查点，恢复时从最近的可信状态继续。",
            "会话历史可以重放和审计，而不依赖模型重新讲述现场。",
          ],
        },
        {
          heading: "恢复时会保留什么",
          paragraphs: [
            "Sigma Code 的恢复目标不是简单地重新打开聊天窗口，而是重新建立执行状态。任务目标、当前计划、已经观察到的工具结果、检查点和完成状态都由运行时管理。",
            "外部系统已经产生的副作用不会被神奇地撤销，因此恢复后的第一步仍然是核对工作区和相关服务的当前状态。耐久会话减少重复劳动，但不会把不确定性藏起来。",
          ],
        },
        {
          heading: "适合哪些长时间代码任务",
          paragraphs: [
            "耐久会话尤其适合需要多轮验证的迁移、跨包重构、CI 故障排查、依赖升级和大型仓库分析。它也适合必须等待构建、测试或人工反馈后再继续的工作。",
            "对于只需修改一行文本的任务，恢复能力不一定显眼；当任务跨越几十次工具调用时，可追踪状态才会成为可靠性的核心。",
          ],
          bullets: [
            "大型重构与跨模块迁移",
            "需要长时间测试或构建的修复",
            "需要多次中断、恢复和审查的协作任务",
          ],
        },
      ],
      faqs: [
        [
          "关闭终端后，Sigma Code 还能继续吗？",
          "可以。已持久化的会话会从最近检查点恢复；恢复后仍会检查工作区当前状态，避免把过期假设当成事实。",
        ],
        [
          "恢复是否等于回滚？",
          "不等于。恢复会重建 Agent 的执行状态，但不会自动撤销外部服务或已经提交的副作用。",
        ],
        [
          "耐久会话会替代 Git 吗？",
          "不会。Git 管理源码历史；耐久会话管理 Agent 的计划、工具结果、检查点与任务生命周期，两者解决的问题不同。",
        ],
      ],
      ctaTitle: "让下一次长任务从现场继续",
      ctaBody:
        "下载 Sigma Code 0.1.4，或查看开源运行时如何记录、恢复并验证一次完整任务。",
    },
    "native-sandbox": {
      slug: "native-sandbox",
      locale: "zh",
      path: "/features/native-sandbox",
      alternatePath: "/en/features/native-sandbox",
      eyebrow: "NATIVE CODING AGENT SANDBOX",
      title: "Coding Agent 沙箱：明确 Windows 与 Linux 执行边界",
      description:
        "了解 Sigma Code 如何通过 Windows AppContainer 与 Linux namespace 原生沙箱约束 Coding Agent 的命令、文件与网络访问。",
      lead:
        "Coding Agent 能运行命令，也意味着它必须有清晰的权限边界。Sigma Code 把任意进程执行集中到原生 Broker，并在 Windows 与 Linux 上使用平台隔离能力，而不是让 Agent 直接裸跑在宿主机。",
      sections: [
        {
          heading: "原生沙箱解决什么问题",
          paragraphs: [
            "一个可靠的 Agent 需要知道自己能访问哪些文件、能否启动进程、是否允许联网，以及某项操作会产生什么影响。只有提示模型“请小心”并不能形成安全边界。",
            "Sigma Code 将命令执行放进明确的运行时边界：Windows 使用 AppContainer，Linux 使用 namespace。工具还会描述读写、进程与网络影响，让授权和审查围绕实际能力展开。",
          ],
          bullets: [
            "把任意进程启动集中到单一执行边界。",
            "按任务范围约束文件、进程和网络能力。",
            "在需要宿主机能力时显式授权，而不是静默扩大权限。",
          ],
        },
        {
          heading: "Windows 与 Linux 的隔离方式",
          paragraphs: [
            "Windows 构建通过原生 sigma-exec Broker 使用 AppContainer；Linux 构建使用 namespace 隔离。两端共享相同的上层工具协议和结果语义，但底层实现遵循各自操作系统的安全模型。",
            "平台差异不会被隐藏。Windows x64 当前仍是未签名预览版，可能触发 SmartScreen 或 Smart App Control；Linux x64 是 0.1.4 的稳定发布目标。安装前应核对发布页提供的 SHA-256 与来源证明。",
          ],
        },
        {
          heading: "沙箱不是一句“绝对安全”",
          paragraphs: [
            "沙箱会缩小攻击面并限制能力，但不能替代代码审查、最小权限配置和对第三方内容的怀疑。被允许的网络请求、工作区写入和用户批准的高影响操作仍然可能改变真实系统。",
            "因此 Sigma Code 同时记录工具影响、授权与结果。隔离负责限制边界，审计负责说明发生了什么，验证负责判断结果是否可信。",
          ],
        },
      ],
      faqs: [
        [
          "Sigma Code 在 Windows 上使用什么沙箱？",
          "Windows 运行时使用 AppContainer，并通过原生 sigma-exec Broker 统一承载命令执行。",
        ],
        [
          "Linux 版本如何隔离命令？",
          "Linux 运行时使用 namespace 隔离，并通过同一套执行协议返回结构化结果。",
        ],
        [
          "使用沙箱后还需要确认高风险操作吗？",
          "需要。沙箱限制能力范围，但用户授权、最小权限和结果审查仍然是安全工作流的一部分。",
        ],
      ],
      ctaTitle: "先看清边界，再把任务交给 Agent",
      ctaBody:
        "阅读 Sigma Code 的开源实现与安全策略，了解命令如何进入原生执行 Broker。",
    },
    "evidence-backed-completion": {
      slug: "evidence-backed-completion",
      locale: "zh",
      path: "/features/evidence-backed-completion",
      alternatePath: "/en/features/evidence-backed-completion",
      eyebrow: "EVIDENCE-BACKED COMPLETION",
      title: "Coding Agent 如何验证完成：让证据关闭任务",
      description:
        "了解 Sigma Code 的证据式完成协议：测试、语义验证与必要审查没有通过时，Coding Agent 不会只凭一段总结宣称任务完成。",
      lead:
        "“代码已经改好”不是可验证的结果。Sigma Code 把测试、验证与审查结果纳入完成协议；当前改动没有足够证据时，任务会保持未完成状态。",
      sections: [
        {
          heading: "从自然语言承诺到运行时协议",
          paragraphs: [
            "模型很擅长生成听起来完整的总结，但总结无法证明代码可以构建、测试覆盖了关键路径，或修改没有偏离用户目标。Sigma Code 把完成判断放在模型回复之外，由运行时汇总当前状态和验证证据。",
            "这并不要求每个项目使用同一条测试命令。验证来自用户给出的命令、仓库约定和任务需要的审查，而完成协议负责确保这些结果属于当前改动。",
          ],
          bullets: [
            "测试证据：相关自动化检查实际运行并返回结果。",
            "验证证据：构建、类型检查或任务专属验证与当前状态一致。",
            "审查证据：高风险或复杂改动经过必要的独立检查。",
          ],
        },
        {
          heading: "为什么证据必须和当前状态绑定",
          paragraphs: [
            "在测试通过后继续修改文件，旧测试结果就不再足以证明新状态。Sigma Code 追踪工作区变化与验证生命周期，避免把过期的绿色结果当作当前证据。",
            "如果验证失败，Agent 可以继续诊断和修复；如果环境阻塞，也应明确报告阻塞条件。无论哪种情况，都不能用一句乐观总结绕过未完成状态。",
          ],
        },
        {
          heading: "审计记录对团队有什么价值",
          paragraphs: [
            "证据式完成让交接更具体：下一位开发者可以看到运行了什么、哪些结果通过、哪些边界尚未覆盖。对于长任务，它还与耐久会话结合，让恢复后的 Agent 能分辨已完成的步骤和必须重跑的验证。",
            "最终目标不是堆积日志，而是让“为什么可以交付”变得可检查。证据越贴近风险，完成结论就越有意义。",
          ],
        },
      ],
      faqs: [
        [
          "Sigma Code 会自动选择所有测试吗？",
          "不会假装存在通用答案。它根据用户命令、仓库约定和改动范围组织验证，并明确报告没有覆盖的部分。",
        ],
        [
          "测试通过就一定完成吗？",
          "不一定。复杂任务还可能需要构建、类型检查、人工或独立审查，以及对用户验收条件的核对。",
        ],
        [
          "验证失败时会怎样？",
          "任务保持未完成。Agent 可以继续修复，或者在无法推进时清楚说明失败证据与阻塞条件。",
        ],
      ],
      ctaTitle: "让每个“完成”都有可检查的依据",
      ctaBody:
        "在 GitHub 查看 Sigma Code 的完成协议、测试体系与可审计运行时。",
    },
    "getting-started": {
      slug: "getting-started",
      locale: "zh",
      path: "/docs/getting-started",
      alternatePath: "/en/docs/getting-started",
      eyebrow: "SIGMA CODE GETTING STARTED",
      title: "Sigma Code 入门：安装、配置并运行第一个任务",
      description:
        "Sigma Code 中文入门指南：下载 Linux 稳定版或 Windows 预览版，配置 DeepSeek Provider，检查环境并启动 TUI。",
      lead:
        "Sigma Code 0.1.4 提供 Linux x64 稳定版、Windows x64 未签名预览版，以及可审计的源码构建路径。下面的最短流程会先验证安装和模型连接，再进入真实仓库。",
      sections: [
        {
          heading: "1. 选择并核对发行包",
          paragraphs: [
            "从 GitHub Release 下载与你的平台匹配的 0.1.4 产物。Linux x64 是当前稳定目标；Windows x64 是未签名预览版，可能出现系统安全警告。",
            "解压或运行安装程序前，核对发布页中的 SHA-256 侧文件与签名来源证明。Windows 桌面安装包同时包含 Sigma Code UI 和经过验证的 Runtime，不需要额外安装 Node.js 或 Agent CLI。",
          ],
        },
        {
          heading: "2. 初始化 Linux 工作区",
          paragraphs: [
            "设置 Provider 密钥后，对目标仓库执行 init 和 doctor。doctor 会检查本地运行环境，并可验证模型 API 连接。",
          ],
          code: [
            "SIGMA=\"$HOME/.local/share/sigma-code\"",
            "WORKSPACE=\"/path/to/your/repository\"",
            "",
            "export DEEPSEEK_API_KEY=\"your-api-key\"",
            "",
            "\"$SIGMA/bin/agent\" init --workspace \"$WORKSPACE\" --provider deepseek",
            "\"$SIGMA/bin/agent\" doctor --workspace \"$WORKSPACE\" --check-api",
            "\"$SIGMA/bin/agent\" tui --workspace \"$WORKSPACE\"",
          ].join("\n"),
        },
        {
          heading: "3. 初始化 Windows 终端版",
          paragraphs: [
            "纯终端或便携场景可以使用 agent-cli-win32-x64.zip。当前 Windows 用户第一次使用时先完成沙箱设置，再初始化工作区并运行 doctor。",
          ],
          code: [
            "$Sigma = \"C:\\\\Tools\\\\sigma-code\"",
            "$Workspace = \"D:\\\\path\\\\to\\\\your\\\\repository\"",
            "",
            "$env:DEEPSEEK_API_KEY = \"your-api-key\"",
            "",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" sandbox setup",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" init --workspace \"$Workspace\" --provider deepseek",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" doctor --workspace \"$Workspace\" --check-api",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" tui --workspace \"$Workspace\"",
          ].join("\n"),
        },
        {
          heading: "4. 从一个可验证任务开始",
          paragraphs: [
            "第一次使用时，选择一个范围清楚、已有测试或明确验收条件的仓库任务。让 Agent 先读取项目约束并给出计划，再授权必要的命令和文件修改。",
            "任务结束前检查实际运行过的验证、未覆盖的风险和工作区 diff。这样你能同时体验耐久会话、原生沙箱和证据式完成，而不是只观察一段代码生成。",
          ],
        },
      ],
      faqs: [
        [
          "Windows 安装包需要 Node.js 吗？",
          "桌面安装包不需要额外安装 Node.js 或 Agent CLI；便携终端包也包含固定版本的运行时资源。",
        ],
        [
          "除了 DeepSeek，还支持其他模型吗？",
          "支持多 Provider 接入，包括统一 Pi Provider 网关。具体认证方式和模型能力以项目 README 为准。",
        ],
        [
          "遇到问题应该去哪里反馈？",
          "请在 GitHub Issues 提交可复现步骤、平台信息和相关日志，并避免公开 API Key 等敏感信息。",
        ],
      ],
      ctaTitle: "下载 0.1.4，开始第一个可恢复任务",
      ctaBody:
        "先核对发行产物，再用 doctor 验证环境与模型连接。",
    },
  },
  en: {
    "durable-sessions": {
      slug: "durable-sessions",
      locale: "en",
      path: "/en/features/durable-sessions",
      alternatePath: "/features/durable-sessions",
      eyebrow: "DURABLE CODING AGENT SESSIONS",
      title: "Durable coding agent sessions for long-running work",
      description:
        "See how Sigma Code uses an event stream, checkpoints, and replayable state so coding agent tasks can resume after a closed terminal, restart, or interruption.",
      lead:
        "A normal chat leaves working state inside one process. Sigma Code records plans, tool calls, results, and checkpoints in a durable event stream, turning the task itself into recoverable data.",
      sections: [
        {
          heading: "Why coding agents need durable sessions",
          paragraphs: [
            "Real software work rarely ends in one model response. Dependency installs, tests, builds, reviews, and environment debugging can run for a long time and can be interrupted by network failures, a closed terminal, a restart, or context compaction.",
            "If an agent preserves only the final chat text, it must guess which commands ran, which files changed, and where validation stopped. Sigma Code restores from structured execution records instead.",
          ],
          bullets: [
            "Plans, tool calls, and tool results share one event stream.",
            "Checkpoints preserve trustworthy state at important task boundaries.",
            "Session history can be replayed and audited without asking the model to reconstruct it.",
          ],
        },
        {
          heading: "What a resumed task keeps",
          paragraphs: [
            "Resuming means more than reopening a conversation. The runtime restores the task goal, active plan, observed tool results, checkpoints, and completion state.",
            "External side effects are not magically rolled back. A resumed run still checks the current workspace and relevant services before acting. Durable state reduces repeated work without hiding uncertainty.",
          ],
        },
        {
          heading: "Where durable sessions matter most",
          paragraphs: [
            "Durable sessions are useful for migrations, cross-package refactors, CI diagnosis, dependency upgrades, and large-repository analysis. They also fit work that pauses for builds, tests, or human feedback.",
            "The benefit may be small for a one-line edit. It becomes central when a task crosses dozens of tool calls and multiple interruptions.",
          ],
          bullets: [
            "Large refactors and multi-module migrations",
            "Fixes with long build or test cycles",
            "Collaborative tasks that pause, resume, and undergo review",
          ],
        },
      ],
      faqs: [
        [
          "Can Sigma Code continue after I close the terminal?",
          "Yes. A persisted session resumes from its latest checkpoint and then checks the current workspace before continuing.",
        ],
        [
          "Is resume the same as rollback?",
          "No. Resume restores agent state; it does not automatically undo side effects in external systems.",
        ],
        [
          "Does a durable session replace Git?",
          "No. Git records source history. Durable sessions record plans, tool results, checkpoints, and the agent task lifecycle.",
        ],
      ],
      ctaTitle: "Continue the next long task from where it stopped",
      ctaBody:
        "Download Sigma Code 0.1.4 or inspect the open-source runtime that records, resumes, and verifies a task.",
    },
    "native-sandbox": {
      slug: "native-sandbox",
      locale: "en",
      path: "/en/features/native-sandbox",
      alternatePath: "/features/native-sandbox",
      eyebrow: "NATIVE CODING AGENT SANDBOX",
      title: "Native coding agent sandboxing on Windows and Linux",
      description:
        "Learn how Sigma Code constrains coding agent commands, files, processes, and network access with Windows AppContainer and Linux namespace isolation.",
      lead:
        "A coding agent can run commands, so it needs explicit permission boundaries. Sigma Code routes arbitrary process execution through a native broker and uses platform isolation instead of running the agent directly on the host.",
      sections: [
        {
          heading: "What native sandboxing is for",
          paragraphs: [
            "A dependable agent should know which files it may reach, whether it can launch processes, when network access is available, and what impact an operation can have. Telling a model to be careful does not create a security boundary.",
            "Sigma Code uses AppContainer on Windows and namespaces on Linux. Tools also describe file, process, and network effects so approval and review correspond to real capabilities.",
          ],
          bullets: [
            "Route arbitrary process launch through one execution boundary.",
            "Scope file, process, and network capabilities to the task.",
            "Request explicit authority when host capabilities are required.",
          ],
        },
        {
          heading: "How isolation differs by platform",
          paragraphs: [
            "The Windows build uses the native sigma-exec broker with AppContainer. The Linux build uses namespace isolation. Both expose the same upper-level tool and result protocol while following the security model of each operating system.",
            "Platform differences remain visible. Windows x64 is currently an unsigned preview and may trigger SmartScreen or Smart App Control. Linux x64 is the stable 0.1.4 release target. Verify the published SHA-256 files and provenance before installation.",
          ],
        },
        {
          heading: "A sandbox is not a claim of absolute safety",
          paragraphs: [
            "Sandboxing narrows capabilities and reduces attack surface, but it does not replace review, least-privilege configuration, or skepticism toward third-party content. Allowed network requests, workspace writes, and approved high-impact actions can still change real systems.",
            "Sigma Code therefore records tool effects, approvals, and results. Isolation limits the boundary; auditing explains what happened; validation checks whether the outcome is trustworthy.",
          ],
        },
      ],
      faqs: [
        [
          "Which sandbox does Sigma Code use on Windows?",
          "The Windows runtime uses AppContainer and routes command execution through the native sigma-exec broker.",
        ],
        [
          "How are commands isolated on Linux?",
          "The Linux runtime uses namespace isolation and returns results through the same structured execution protocol.",
        ],
        [
          "Do risky operations still require approval?",
          "Yes. Sandboxing constrains capabilities, while user approval, least privilege, and result review remain part of the safety model.",
        ],
      ],
      ctaTitle: "See the boundary before delegating the task",
      ctaBody:
        "Read the open-source implementation and security policy behind Sigma Code's native execution broker.",
    },
    "evidence-backed-completion": {
      slug: "evidence-backed-completion",
      locale: "en",
      path: "/en/features/evidence-backed-completion",
      alternatePath: "/features/evidence-backed-completion",
      eyebrow: "EVIDENCE-BACKED COMPLETION",
      title: "How a coding agent proves that a task is complete",
      description:
        "Learn how Sigma Code uses tests, semantic validation, and required review evidence so a coding agent cannot close a task with an unsupported summary.",
      lead:
        "“The code is fixed” is not a verifiable result. Sigma Code includes tests, validation, and review in its completion protocol. Without evidence for the current change, the task remains open.",
      sections: [
        {
          heading: "From a language-model promise to a runtime protocol",
          paragraphs: [
            "Models can generate confident summaries, but a summary cannot prove that code builds, tests cover the important path, or the change satisfies the user's goal. Sigma Code keeps completion outside the model response and lets the runtime evaluate current state and evidence.",
            "This does not force every repository to use the same test command. Validation comes from user-provided commands, repository conventions, and task-specific review. The completion protocol ensures the results belong to the current change.",
          ],
          bullets: [
            "Test evidence: relevant automated checks actually ran and returned a result.",
            "Validation evidence: builds, types, or task-specific checks match the current state.",
            "Review evidence: risky or complex changes receive the required independent inspection.",
          ],
        },
        {
          heading: "Why evidence must match the current state",
          paragraphs: [
            "If files change after tests pass, the old green result may no longer prove the new state. Sigma Code tracks workspace changes and the validation lifecycle instead of treating stale evidence as current.",
            "When validation fails, the agent can keep diagnosing and fixing. When the environment blocks progress, it should report the blocking condition. In neither case can an optimistic summary bypass an unfinished task.",
          ],
        },
        {
          heading: "What an audit trail gives a team",
          paragraphs: [
            "Evidence makes handoff concrete: another developer can see which checks ran, which results passed, and which boundaries remain untested. Combined with durable sessions, it also helps a resumed agent distinguish completed work from validation that must run again.",
            "The goal is not to accumulate logs. It is to make the reason a change is deliverable easy to inspect. Evidence is most useful when it follows the actual risk.",
          ],
        },
      ],
      faqs: [
        [
          "Does Sigma Code automatically know every test to run?",
          "No universal command exists. It uses user instructions, repository conventions, and change scope, then reports any uncovered areas.",
        ],
        [
          "Do passing tests always mean the task is complete?",
          "Not necessarily. Complex work may also require a build, type checking, review, and explicit user acceptance criteria.",
        ],
        [
          "What happens when validation fails?",
          "The task stays open. The agent can continue fixing it or report the failed evidence and blocking condition clearly.",
        ],
      ],
      ctaTitle: "Give every “done” an inspectable reason",
      ctaBody:
        "Explore Sigma Code's completion protocol, test system, and auditable runtime on GitHub.",
    },
    "getting-started": {
      slug: "getting-started",
      locale: "en",
      path: "/en/docs/getting-started",
      alternatePath: "/docs/getting-started",
      eyebrow: "SIGMA CODE GETTING STARTED",
      title: "Get started with Sigma Code",
      description:
        "Install Sigma Code on Linux or Windows, configure the DeepSeek provider, check the environment, and launch your first durable coding agent task.",
      lead:
        "Sigma Code 0.1.4 ships a stable Linux x64 release, an unsigned Windows x64 preview, and an auditable source-build path. This short path verifies the install and model connection before entering a real repository.",
      sections: [
        {
          heading: "1. Choose and verify a release",
          paragraphs: [
            "Download the 0.1.4 artifact for your platform from GitHub Releases. Linux x64 is the current stable target. Windows x64 is an unsigned preview and may produce an operating-system security warning.",
            "Before extracting or installing, verify the published SHA-256 sidecar and provenance. The Windows desktop installer includes the Sigma Code UI and verified runtime, so it does not require a separate Node.js or Agent CLI installation.",
          ],
        },
        {
          heading: "2. Initialize a Linux workspace",
          paragraphs: [
            "Set the provider key, then run init and doctor against the target repository. Doctor checks the local runtime and can verify the model API connection.",
          ],
          code: [
            "SIGMA=\"$HOME/.local/share/sigma-code\"",
            "WORKSPACE=\"/path/to/your/repository\"",
            "",
            "export DEEPSEEK_API_KEY=\"your-api-key\"",
            "",
            "\"$SIGMA/bin/agent\" init --workspace \"$WORKSPACE\" --provider deepseek",
            "\"$SIGMA/bin/agent\" doctor --workspace \"$WORKSPACE\" --check-api",
            "\"$SIGMA/bin/agent\" tui --workspace \"$WORKSPACE\"",
          ].join("\n"),
        },
        {
          heading: "3. Initialize the Windows terminal build",
          paragraphs: [
            "For terminal-only or portable use, choose agent-cli-win32-x64.zip. Run sandbox setup once for the current Windows user, then initialize the workspace and run doctor.",
          ],
          code: [
            "$Sigma = \"C:\\\\Tools\\\\sigma-code\"",
            "$Workspace = \"D:\\\\path\\\\to\\\\your\\\\repository\"",
            "",
            "$env:DEEPSEEK_API_KEY = \"your-api-key\"",
            "",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" sandbox setup",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" init --workspace \"$Workspace\" --provider deepseek",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" doctor --workspace \"$Workspace\" --check-api",
            "& \"$Sigma\\\\bin\\\\agent.cmd\" tui --workspace \"$Workspace\"",
          ].join("\n"),
        },
        {
          heading: "4. Start with a verifiable task",
          paragraphs: [
            "For the first run, choose a scoped repository task with existing tests or explicit acceptance criteria. Ask the agent to read project constraints and propose a plan before approving commands or file changes.",
            "Before handoff, inspect the checks that actually ran, uncovered risks, and the workspace diff. That demonstrates durable sessions, native sandboxing, and evidence-backed completion instead of only code generation.",
          ],
        },
      ],
      faqs: [
        [
          "Does the Windows installer require Node.js?",
          "No. The desktop installer includes the UI and verified runtime. The portable terminal archive also bundles its pinned runtime resources.",
        ],
        [
          "Are providers other than DeepSeek supported?",
          "Yes. Sigma Code supports multiple providers through the unified Pi provider gateway. See the project README for current authentication details.",
        ],
        [
          "Where should I report a problem?",
          "Open a GitHub issue with reproducible steps, platform details, and relevant logs. Never include API keys or other secrets.",
        ],
      ],
      ctaTitle: "Download 0.1.4 and start a recoverable task",
      ctaBody:
        "Verify the artifact first, then use doctor to check the runtime and model connection.",
    },
  },
} satisfies Record<ContentLocale, Record<ContentSlug, ContentPageData>>;

export function getContentPage(locale: ContentLocale, slug: ContentSlug) {
  return contentPages[locale][slug];
}
