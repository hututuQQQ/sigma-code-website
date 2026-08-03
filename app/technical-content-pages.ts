import { RELEASE_VERSION } from "./site-config";
import type {
  ContentLocale,
  ContentPageData,
  TechnicalContentSlug,
} from "./content-types";

export const technicalContentPages = {
  zh: {
    "cli-and-configuration": {
      slug: "cli-and-configuration",
      locale: "zh",
      path: "/docs/cli-and-configuration",
      alternatePath: "/en/docs/cli-and-configuration",
      eyebrow: "CLI · CONFIGURATION · PROVIDERS",
      title: "CLI、配置与 Provider：从命令到模型连接",
      description:
        "Sigma Code CLI 与配置参考：运行、检查和恢复会话，设置权限与沙箱，并连接 ChatGPT/Codex、DeepSeek 和 Pi Provider。",
      lead:
        "Sigma Code 的桌面端、TUI 和自动化命令共用同一运行时。本页集中说明常用命令、配置优先级、权限默认值和 Provider 认证边界，避免把操作手册堆在项目 README 里。",
      sections: [
        {
          heading: "选择交互方式与核心命令",
          paragraphs: [
            "桌面客户端通过 ACP v1 连接 Sigma Runtime；终端用户可以进入 TUI，也可以用 run 执行会修改工作区的单次任务，或用 inspect 做只读分析。所有入口最终都使用同一套会话、工具、沙箱、验证和恢复协议。",
            "会话管理命令可以列出、查看、重放、恢复或取消耐久会话。doctor 用来检查配置、原生沙箱、工具链和 Provider 连接。",
          ],
          code: [
            "agent tui --workspace .",
            "agent run \"Fix the failing tests and explain the change\" --workspace .",
            "agent inspect \"Map the request path and identify risks\" --workspace .",
            "",
            "agent sessions --workspace . --json",
            "agent session show --latest --workspace .",
            "agent replay --latest --workspace . --timeline",
            "agent resume <session-id> --workspace .",
            "agent cancel <session-id> --workspace .",
            "agent doctor --workspace . --check-api",
          ].join("\n"),
        },
        {
          heading: "TUI 控制与进程结果",
          paragraphs: [
            "TUI 支持多行输入、运行中 steering、排队 follow-up、活动折叠和滚动。第一次 Ctrl+C 取消当前运行；1.5 秒内第二次按下才退出界面。",
            "自动化调用应读取稳定退出码：0 表示 Completed，2 表示 NeedsInput，130 表示 Cancelled，1 表示可恢复或致命失败。退出码描述的是运行时结果，而不是模型最后一段文字的语气。",
          ],
          bullets: [
            "Enter：空闲时发送，运行中追加 steering。",
            "Shift+Enter / Ctrl+J：插入换行；Alt+Enter：排队 follow-up。",
            "Ctrl+O：折叠或展开活动；PgUp / PgDn、Ctrl+U / Ctrl+D 或鼠标滚轮：滚动。",
            "/new、/mode analyze|change、/followup、/activity、/help、/quit：会话命令。",
          ],
        },
        {
          heading: "配置优先级与安全默认值",
          paragraphs: [
            "配置按 CLI 参数、环境变量、工作区 .agent/config.toml、用户目录 ~/.sigma/config.toml、内置默认值的顺序覆盖。未知参数和未知 TOML 字段会直接失败；工作区提供的 MCP Server 与可执行 Hook 需要显式、绑定摘要的信任授权。",
            "默认策略要求原生沙箱，只自动处理工作区范围内的读取和已声明写入。外部读取、完整网络能力和仓库元数据写入仍有独立授权边界。把 network 设为 none 或 loopback 会进一步缩小能力；required 隔离不会静默降级成宿主机执行。",
          ],
          code: [
            "schema_version = 1",
            "",
            "[model]",
            "provider = \"deepseek\"",
            "name = \"auto\"",
            "reasoning_effort = \"auto\"",
            "",
            "[permissions]",
            "mode = \"workspace-auto\"",
            "",
            "[security]",
            "sandbox = \"required\"",
            "read_scope = \"workspace\"",
            "network = \"full\"",
            "process_handoff = \"allow\"",
            "",
            "[web]",
            "mode = \"auto\"",
            "search_provider = \"exa\"",
          ].join("\n"),
        },
        {
          heading: "Provider、认证与 reasoning level",
          paragraphs: [
            "打包版本默认使用实验性的 openai-codex 订阅连接并自动选模。该连接使用 ChatGPT OAuth 和订阅额度，不读取 OPENAI_API_KEY，也不会静默回退到 DeepSeek、GLM 或 api.openai.com/v1。DeepSeek API 路径使用 DEEPSEEK_API_KEY。",
            "统一 Pi 网关提供固定版本的 Provider 与模型目录。认证凭据和动态模型缓存分别保存在 ~/.sigma/auth.json 与 ~/.sigma/models.json；目录与状态读取离线完成，只有显式刷新、登录完成或正常模型请求才访问网络。reasoning_effort 接受 auto、none、low、medium、high、xhigh 或 max。",
          ],
          code: [
            "sigma auth list --json",
            "sigma auth status openai-codex --json",
            "sigma auth login openai-codex --method browser --json",
            "sigma auth logout openai-codex --json",
            "",
            "sigma models list --json",
            "sigma models refresh <provider> --json",
          ].join("\n"),
        },
        {
          heading: "密钥、代理与费用语义",
          paragraphs: [
            "不要把 API Key 写入 .agent/config.toml 或版本控制。模型连接支持 HTTP_PROXY、HTTPS_PROXY、ALL_PROXY 和 NO_PROXY；Windows 桌面或 ACP 进程在没有显式代理环境变量时，也可以读取当前用户启用的静态系统代理。",
            "费用记录分为 metered、subscription 和 unpriced。订阅与未定价调用仍保留 token 使用量，但不会伪装成零成本 API 调用；未定价模型默认被拒绝，只有显式允许后才能用于任务。",
          ],
          bullets: [
            "ChatGPT 订阅认证与 OpenAI API Key 计费是两条独立路径。",
            "Provider、模型、预算和认证错误会直接呈现，不会靠隐藏回退掩盖。",
            "Web 搜索使用受限只读协议；可选的 EXA_API_KEY 应通过环境变量提供。",
          ],
        },
      ],
      faqs: [
        [
          "应该使用 run 还是 inspect？",
          "需要修改工作区时使用 run；只做分析时使用 inspect。inspect 会拒绝声明了文件写入、任意进程启动或破坏性影响的工具。",
        ],
        [
          "可以在同一任务里自动切换 Provider 吗？",
          "只有明确配置的路由与候选才会参与选择。内置 ChatGPT/Codex 订阅路由只有一个候选，不会静默切换到其他计费或认证方式。",
        ],
        [
          "为什么未知配置会直接报错？",
          "失败关闭可以避免拼写错误或旧字段被忽略后意外扩大能力。Sigma Code 只接受当前 schema。",
        ],
      ],
      ctaTitle: `用 ${RELEASE_VERSION} 建立一个可检查的运行环境`,
      ctaBody:
        "先选择交互入口和 Provider，再用 doctor 核对沙箱、工具链与模型连接。",
    },
    architecture: {
      slug: "architecture",
      locale: "zh",
      path: "/docs/architecture",
      alternatePath: "/en/docs/architecture",
      eyebrow: "RUNTIME ARCHITECTURE",
      title: "Sigma Runtime 架构：事件驱动的可恢复 Agent",
      description:
        "了解 Sigma Runtime 的单一组合根、事件循环、包职责、ACP v1 边界，以及桌面端与 TUI 如何共享同一运行时。",
      lead:
        "Sigma Code 不为每个界面重建一套 Agent。CLI 创建单一运行时，TUI 通过 RuntimeClient 驱动它，桌面客户端则经由稳定 ACP v1 投影同一套会话命令与事件。",
      sections: [
        {
          heading: "一个生产组合根，多种产品界面",
          paragraphs: [
            "agent-runtime.createConfiguredRuntime 是生产环境唯一的组合根。它装配模型路由、上下文、纯内核、带影响声明的工具、MCP 客户端、分段事件存储、检查点、审查器、Supervisor 和执行 Broker。",
            "TUI 接收 RuntimeClient，而不是自行复制 Agent Loop；sigma acp 把同一运行时暴露给 Sigma Code 桌面客户端。界面只负责呈现和用户交互，执行、权限、持久化、验证和恢复仍由 Runtime 掌握。",
          ],
          bullets: [
            "CLI / TUI：进程内调用 RuntimeClient。",
            "桌面、Web 与移动客户端：通过 ACP v1 的 JSON-RPC 连接。",
            "所有界面：消费同一事件语义与类型化运行结果。",
          ],
        },
        {
          heading: "事件循环如何推进任务",
          paragraphs: [
            "每个 CLI、TUI 或 ACP 操作先成为类型化会话命令与耐久事件。agent-kernel 只归约状态并决定下一个 Effect，不执行 I/O；agent-runtime 再通过模型、上下文、工具、存储、审查或监督端口执行决定。",
            "工具运行前，Runtime 会冻结读写根、网络模式、进程模式、幂等性和检查点范围，并对计划执行权限、审批、锁与信任检查。结果回写为新的事件，内核据此继续，直到产生 Completed、NeedsInput、Cancelled、RecoverableFailure 或 Fatal。",
          ],
          bullets: [
            "命令进入事件流，内核从耐久状态做决定。",
            "Runtime 执行 Effect，工具返回结构化 Receipt 与证据。",
            "事件持久化后再推进下一步，呈现层只投影状态。",
            "模型 stop 只是一个事件，不直接等于任务完成。",
          ],
        },
        {
          heading: "包职责与依赖边界",
          paragraphs: [
            "生产包依赖图必须保持无环，跨包协作通过公开导出与协议端口完成。这个边界让内核保持纯粹，让执行、存储和 Provider 可以独立测试与替换。",
          ],
          bullets: [
            "Contracts：agent-protocol、agent-config 定义事件、命令、结果、端口、工具影响和配置 schema。",
            "Decision engine：agent-kernel 负责纯状态归约、收敛与 Effect 选择。",
            "Intelligence：agent-model、agent-pi、agent-context、代码智能与扩展层负责模型策略和上下文。",
            "Capabilities：agent-tools、agent-web、agent-mcp 提供带影响声明的能力。",
            "Safety boundary：agent-execution、agent-platform、agent-checkpoint 与 sigma-exec 管理进程和恢复。",
            "Durability：agent-store、agent-supervisor、agent-runtime 管理事件、子会话、审查和组合。",
            "Product surfaces：agent-presentation、agent-tui、agent-cli 与下游 sigma-code 负责交互。",
          ],
        },
        {
          heading: "持久事件与呈现投影",
          paragraphs: [
            "模型文本、reasoning、计划、工具调用、审批、用量、上下文窗口状态、Hook 和子 Agent 生命周期都会变成结构化事件。agent-presentation 与 ACP Bridge 从事件增量构建界面，而不是把 UI 文本当作权威状态。",
            "这种设计让重放、恢复、取消、steering 和追加 follow-up 成为正常协议动作。即使界面重启，Runtime 也可以从已校验事件与快照恢复，而不必依赖一段模型总结重建现场。",
          ],
        },
        {
          heading: "当前 schema 与兼容策略",
          paragraphs: [
            "Sigma 自有序列化边界只接受当前 schema version 1。未知 schema、损坏的当前文档、其他存储布局或旧检查点日志会以类型化错误失败，拒绝的文件不会被自动重写、迁移或删除。",
            "Verified shell 统一承载前台、验证、后台和一次性环境执行。读写工具返回结果长度与 SHA-256，非 UTF-8 进程输出必须保存为字节安全 Artifact。严格协议减少了恢复时对模糊兼容逻辑的依赖。",
          ],
        },
      ],
      faqs: [
        [
          "桌面端是否有独立 Agent Loop？",
          "没有。第一方 Sigma Provider 启动长生命周期 sigma acp 服务，桌面端通过 ACP v1 使用与 CLI、TUI 相同的 Runtime。",
        ],
        [
          "为什么内核不直接执行工具？",
          "纯内核只决定 Effect，Runtime 在协议端口执行 I/O。这样状态转换可重放、可测试，权限与执行边界也更清楚。",
        ],
        [
          "旧存储会自动迁移吗？",
          "不会。未知或不兼容布局会只读拒绝，避免恢复过程悄悄改写用户状态。",
        ],
      ],
      ctaTitle: "从同一运行时理解每一种 Sigma Code 界面",
      ctaBody:
        "下载产品体验事件驱动工作流，或在 GitHub 中查看各包的公开边界。",
    },
    "security-and-recovery": {
      slug: "security-and-recovery",
      locale: "zh",
      path: "/docs/security-and-recovery",
      alternatePath: "/en/docs/security-and-recovery",
      eyebrow: "SECURITY · PERMISSIONS · RECOVERY",
      title: "安全、权限与恢复：Runtime 如何失败关闭",
      description:
        "Sigma Code 安全与恢复参考：原生沙箱、路径和网络边界、耐久事件存储、检查点以及证据式完成协议。",
      lead:
        "Sigma Code 把安全边界和恢复语义放在 Runtime，而不是交给提示词。命令必须通过原生执行 Broker，能力在运行前被冻结并检查；中断后的状态从可校验事件恢复。",
      sections: [
        {
          heading: "唯一的任意进程执行边界",
          paragraphs: [
            "agent-execution 是唯一允许启动任意进程的生产包，并通过带帧协议连接 Rust sigma-exec Broker。Windows 使用 AppContainer、范围化文件 ACL、kill-on-close Job Object 和 ConPTY；Linux 使用 namespace 沙箱与进程树清理 watchdog。",
            "required 沙箱不可用时，执行直接失败，不会降级到宿主机。路径包含检查与操作系统隔离是两层独立防线；.git 与 .agent 不会因为普通工作区写授权而失去保护。",
          ],
        },
        {
          heading: "文件、网络与外部输入",
          paragraphs: [
            "工具在运行前声明精确读写根、网络模式、进程模式和影响。工作区工具拒绝词法路径以及 symlink / junction 祖先逃逸；绝对外部输入使用稳定、no-follow 的遍历读取，并记录路径、摘要和大小证据。",
            "只读 Web 能力只在完整网络已授权、Web 模式开启且 Broker 支持受限协议时出现。Broker 只允许公开 HTTP(S) 80/443，将请求绑定到已批准的来源与方法，并拒绝本地、私有、保留、含凭据或主动浏览器内容。",
          ],
          bullets: [
            "network=none：禁止网络；network=loopback：只允许回环；network=full：仍受工具和授权边界约束。",
            "外部输入读取失败会留下未解决的完成义务，运行时创建的替代文件不能冒充原输入。",
            "工作区内可以创建链接对象，但不会因此获得链接目标的外部写权限。",
          ],
        },
        {
          heading: "耐久事件、快照与检查点",
          paragraphs: [
            "Runtime 状态存放在 Agent 无法写入的工作区之外。事件带校验和与单调序号；事件段达到 8 MiB 或 10,000 条后轮转，并每 250 条事件及轮转时写入快照。尾部撕裂记录可以在追加锁下修复。",
            "恢复会还原待审批请求、follow-up、已发现指令、预算和安全的幂等工作。被中断的非幂等 Effect 不会静默重放，而是进入 NeedsInput。",
          ],
          code: [
            "<user-state>/sigma/workspaces/<workspace-sha256>/stores/v1/sessions/<session-id>/",
            "  meta.json",
            "  events/000001.jsonl",
            "  snapshots/000000000250.json",
            "  artifacts/<sha256>",
          ].join("\n"),
        },
        {
          heading: "完成是协议动作，不是模型措辞",
          paragraphs: [
            "Provider stop 只会产生 model_stopped。Completion Coordinator 根据当前 mutation frontier 独立计算 assurance 与 review 要求，只有 model_stopped、assurance_satisfied 和 review_satisfied 同时成立才会发出 run.completed。",
            "所有净改动都需要当前状态上的语义验证。测试通过后又修改文件会使旧证据过期；标准 Profile 需要当前 frontier 的审查通过或用户一次性豁免，严格 Profile 不接受豁免并要求审查者执行检查。",
          ],
          bullets: [
            "活动中的非 detached 子 Agent 必须在完成前 join。",
            "未集成的 writer worktree 会让父任务保持未完成。",
            "失败、过期或不足的验证会产生修复指导或类型化阻塞，而不是被总结绕过。",
          ],
        },
        {
          heading: "进程交接与故障恢复",
          paragraphs: [
            "普通会话进程在失败、取消、超时或 Broker 丢失时被清理。Linux 只有在支持安全转移时才公布 processHandoff；deliverable 进程必须脱离 stdio、不能使用 PTY 或 stdin，并通过独立健康检查后才能交接。",
            "Windows 当前不公布该能力并失败关闭。对外部服务已经产生的副作用不会被耐久会话自动撤销，因此恢复后仍要核对工作区和相关服务的当前状态。",
          ],
        },
      ],
      faqs: [
        [
          "沙箱故障时会在宿主机继续吗？",
          "不会。sandbox=required 时，原生隔离不可用会直接阻止进程执行。",
        ],
        [
          "恢复会自动重跑被中断的命令吗？",
          "只有明确安全、幂等的工作可以恢复。被中断的非幂等 Effect 会变成 NeedsInput，等待用户确认当前状态。",
        ],
        [
          "模型说“完成了”是否足够？",
          "不够。Runtime 需要当前改动对应的验证与审查证据，才能发出完成事件。",
        ],
      ],
      ctaTitle: "先确认边界，再授权真实任务",
      ctaBody:
        "阅读安全策略并用 doctor 验证本机沙箱，再把工作区交给 Sigma Code。",
    },
    evaluation: {
      slug: "evaluation",
      locale: "zh",
      path: "/docs/evaluation",
      alternatePath: "/en/docs/evaluation",
      eyebrow: "TRANSPARENT EVALUATION",
      title: "评测方法：公开结果，也冻结边界",
      description:
        "Sigma Code 评测方法、预注册边界和 Terminal-Bench 2.1 诊断结果，包括任务数量、模型设置、重试规则与限制。",
      lead:
        "评测可以帮助发现产品问题，但不能成为 Agent 偷看答案的通道。Sigma 的正式运行在启动前冻结 Provider、模型、源码、任务选择与重试策略；验证器信息只在运行结束后供人审计。",
      sections: [
        {
          heading: "不可跨越的公平边界",
          paragraphs: [
            "外部 Runner 可以选择评测任务、启动打包后的产品，并在运行结束后收集日志、事件、结果与分数。求解 Agent 不会收到数据集名称、任务身份、隐藏检查、验证器输出、奖励或分数。",
            "验证器反馈不会触发另一次求解尝试。代码也不得根据 Benchmark、任务、Fixture、包名、已知输出或验证器身份选择 Prompt、重试、命令、清理或服务行为。",
          ],
          bullets: [
            "允许：选择任务、打包和启动 Agent、运行结束后收集审计材料。",
            "禁止：把任务身份、提示、验证器信息或得分反馈给求解会话。",
            "禁止：针对已知 Benchmark 调整默认 Agent、Harness、CLI 或 Runtime。",
          ],
        },
        {
          heading: "预注册如何固定一次正式运行",
          paragraphs: [
            "正式 Terminal-Bench 运行需要 SigmaFormalRunPreregistration。SHA 绑定清单在执行前固定 Provider、模型、源码 revision、发行归档、任务选择、网络、超时、并发、尝试次数和重试策略。",
            "Harness 不会因为模型名称相同就自动宣称两条 Lane 可比。跨 Provider 或跨配置比较只有在各自清单冻结了可比控制项时才有意义。",
          ],
        },
        {
          heading: "Terminal-Bench 2.1 诊断结果",
          paragraphs: [
            "2026 年 7 月 27–28 日的分阶段诊断使用 DeepSeek deepseek-v4-pro，在相同的 89 个 Terminal-Bench 2.1 任务上比较 Sigma Code 与 OpenCode。Sigma Lane 每个任务最多一次尝试、零重试、无验证器反馈。",
            "Sigma Code 完成 51/89（57.303%），OpenCode 完成 49/89（55.056%），差异为 +2 个任务、+2.247 个百分点。89 个任务全部留在分母中，包括 6 个由外部基础设施导致、按未通过计入的 Sigma 无效观察。",
          ],
          bullets: [
            "Sigma Code + DeepSeek：51/89，57.303%。",
            "OpenCode + DeepSeek：49/89，55.056%。",
            "差异：+2 个完成任务，+2.247 个百分点。",
          ],
        },
        {
          heading: "如何正确解释这组数字",
          paragraphs: [
            "不同源码 revision 只运行此前未消费的任务，因此这是混合源码的工程诊断，不是最终 PR Head 的单一分数。已消费任务没有重跑，最后一次观察后完成的通用生命周期修复也没有回填到结果。",
            "这组数据不支持“全面优于其他工具”或跨 Provider 的结论。它说明的是：在披露的固定边界下，两个产品完成了多少任务，以及哪些失败值得继续改进。",
          ],
        },
        {
          heading: "审计现有会话与正式清单",
          paragraphs: [
            "会话审计可以在不调用模型的情况下读取已有耐久记录。正式运行则先生成不可变清单，再用预期 SHA 启动 Runner；清单和产物留给人类复核。",
          ],
          code: [
            "pnpm eval:session -- --workspace . --latest 2",
            "",
            "pnpm bench:tb:preregister -- --draft formal-draft.json --output formal-run.json",
            "pnpm bench:tb:formal -- --preregistration-file formal-run.json --expected-preregistration-sha256 <sha256> --batch <batch-id>",
          ].join("\n"),
        },
      ],
      faqs: [
        [
          "Sigma 会把验证器失败发回 Agent 重试吗？",
          "不会。验证器信息只在求解运行结束后收集，不能触发新的求解尝试。",
        ],
        [
          "57.303% 是最终版本的正式得分吗？",
          "不是。这是明确披露限制的混合源码诊断结果，用来分析产品表现，不代表最终 PR Head 的单一正式分数。",
        ],
        [
          "相同模型就代表比较公平吗？",
          "不一定。源码、任务选择、网络、超时、并发、尝试和重试等控制项也必须在 SHA 绑定清单中保持可比。",
        ],
      ],
      ctaTitle: "用可审计边界看待每一个分数",
      ctaBody:
        "查看开源 Harness、预注册协议与运行记录，但不要把评测身份带入求解 Agent。",
    },
  },
  en: {
    "cli-and-configuration": {
      slug: "cli-and-configuration",
      locale: "en",
      path: "/en/docs/cli-and-configuration",
      alternatePath: "/docs/cli-and-configuration",
      eyebrow: "CLI · CONFIGURATION · PROVIDERS",
      title: "CLI, configuration, and model providers",
      description:
        "Sigma Code CLI and configuration reference: run, inspect, and resume sessions; set permissions and sandboxing; connect ChatGPT/Codex, DeepSeek, and Pi providers.",
      lead:
        "The desktop client, TUI, and automation commands all use the same Sigma Runtime. This page collects core commands, configuration precedence, permission defaults, and provider authentication boundaries so the repository README can stay focused.",
      sections: [
        {
          heading: "Choose a surface and core command",
          paragraphs: [
            "The desktop client connects to Sigma Runtime over ACP v1. Terminal users can open the TUI, use run for a workspace-changing one-shot task, or use inspect for read-only analysis. Every surface reaches the same session, tool, sandbox, validation, and recovery protocols.",
            "Session commands list, inspect, replay, resume, or cancel durable work. Doctor checks configuration, the native sandbox, toolchains, and provider connectivity.",
          ],
          code: [
            "agent tui --workspace .",
            "agent run \"Fix the failing tests and explain the change\" --workspace .",
            "agent inspect \"Map the request path and identify risks\" --workspace .",
            "",
            "agent sessions --workspace . --json",
            "agent session show --latest --workspace .",
            "agent replay --latest --workspace . --timeline",
            "agent resume <session-id> --workspace .",
            "agent cancel <session-id> --workspace .",
            "agent doctor --workspace . --check-api",
          ].join("\n"),
        },
        {
          heading: "TUI controls and process outcomes",
          paragraphs: [
            "The TUI supports multiline input, steering an active run, queued follow-ups, collapsible activity, and scrolling. The first Ctrl+C cancels the active run; a second press within 1.5 seconds exits.",
            "Automation should read stable exit codes: 0 for Completed, 2 for NeedsInput, 130 for Cancelled, and 1 for recoverable or fatal failure. The code describes the runtime outcome, not the confidence of the model's final prose.",
          ],
          bullets: [
            "Enter sends while idle or steers an active run.",
            "Shift+Enter / Ctrl+J inserts a line; Alt+Enter queues a follow-up.",
            "Ctrl+O toggles activity; PgUp / PgDn, Ctrl+U / Ctrl+D, or the mouse wheel scrolls.",
            "/new, /mode analyze|change, /followup, /activity, /help, and /quit are session commands.",
          ],
        },
        {
          heading: "Configuration precedence and safe defaults",
          paragraphs: [
            "Configuration precedence is CLI flags, environment variables, workspace .agent/config.toml, home ~/.sigma/config.toml, then built-in defaults. Unknown flags and TOML keys fail immediately. Workspace MCP servers and executable hooks need explicit digest-bound trust.",
            "The default policy requires native sandboxing and automatically handles only workspace-scoped reads and declared writes. External reads, full-network calls, and repository-metadata writes retain separate authorization boundaries. network=none or loopback narrows access further; required isolation never falls back to host execution.",
          ],
          code: [
            "schema_version = 1",
            "",
            "[model]",
            "provider = \"deepseek\"",
            "name = \"auto\"",
            "reasoning_effort = \"auto\"",
            "",
            "[permissions]",
            "mode = \"workspace-auto\"",
            "",
            "[security]",
            "sandbox = \"required\"",
            "read_scope = \"workspace\"",
            "network = \"full\"",
            "process_handoff = \"allow\"",
            "",
            "[web]",
            "mode = \"auto\"",
            "search_provider = \"exa\"",
          ].join("\n"),
        },
        {
          heading: "Providers, authentication, and reasoning level",
          paragraphs: [
            "Packaged builds default to the experimental openai-codex subscription connection with automatic model selection. It uses ChatGPT OAuth and subscription allowance, never reads OPENAI_API_KEY, and cannot silently fall back to DeepSeek, GLM, or api.openai.com/v1. The DeepSeek API path uses DEEPSEEK_API_KEY.",
            "The unified Pi gateway supplies a version-pinned provider and model directory. Credentials and the dynamic model cache live separately in ~/.sigma/auth.json and ~/.sigma/models.json. Directory and status reads are offline; only an explicit refresh, completed login, or normal model request uses the network. reasoning_effort accepts auto, none, low, medium, high, xhigh, or max.",
          ],
          code: [
            "sigma auth list --json",
            "sigma auth status openai-codex --json",
            "sigma auth login openai-codex --method browser --json",
            "sigma auth logout openai-codex --json",
            "",
            "sigma models list --json",
            "sigma models refresh <provider> --json",
          ].join("\n"),
        },
        {
          heading: "Secrets, proxies, and billing semantics",
          paragraphs: [
            "Keep API keys out of .agent/config.toml and source control. Model connections honor HTTP_PROXY, HTTPS_PROXY, ALL_PROXY, and NO_PROXY. A Windows desktop or ACP process without explicit proxy variables can also use the current user's enabled static system proxy.",
            "Billing is reported as metered, subscription, or unpriced. Subscription and unpriced calls retain token usage without pretending to be zero-cost API calls. Unpriced models are rejected by default and require an explicit task-level opt-in.",
          ],
          bullets: [
            "ChatGPT subscription authentication and OpenAI API-key billing are separate paths.",
            "Provider, model, budget, and authentication errors remain visible instead of being hidden by an implicit fallback.",
            "Web search uses a restricted read-only protocol; provide the optional EXA_API_KEY through the environment.",
          ],
        },
      ],
      faqs: [
        [
          "Should I use run or inspect?",
          "Use run when the task may change the workspace. Use inspect for analysis only; it rejects tools that declare filesystem writes, unrestricted process spawning, or destructive effects.",
        ],
        [
          "Can a task silently switch providers?",
          "Only explicitly configured routes and candidates participate. The built-in ChatGPT/Codex subscription route has one candidate and does not switch billing or authentication paths silently.",
        ],
        [
          "Why do unknown configuration keys fail?",
          "Failing closed prevents a typo or retired field from being ignored while capabilities expand unexpectedly. Sigma Code accepts only the current schema.",
        ],
      ],
      ctaTitle: `Build an inspectable environment with ${RELEASE_VERSION}`,
      ctaBody:
        "Choose a surface and provider, then use doctor to verify the sandbox, toolchains, and model connection.",
    },
    architecture: {
      slug: "architecture",
      locale: "en",
      path: "/en/docs/architecture",
      alternatePath: "/docs/architecture",
      eyebrow: "RUNTIME ARCHITECTURE",
      title: "Sigma Runtime architecture: a recoverable event-driven agent",
      description:
        "Understand Sigma Runtime's single composition root, event loop, package responsibilities, ACP v1 boundary, and shared desktop and TUI runtime.",
      lead:
        "Sigma Code does not rebuild an agent for every interface. The CLI creates one runtime, the TUI drives it through RuntimeClient, and the desktop client projects the same commands and events over stable ACP v1.",
      sections: [
        {
          heading: "One production composition root, multiple surfaces",
          paragraphs: [
            "agent-runtime.createConfiguredRuntime is the sole production composition root. It wires model routes, context, the pure kernel, effect-aware tools, MCP clients, segmented event storage, checkpoints, the reviewer, supervisor, and execution broker.",
            "The TUI receives RuntimeClient instead of recreating the agent loop. sigma acp exposes the same runtime to the Sigma Code desktop client. Interfaces own presentation and interaction; execution, permissions, persistence, validation, and recovery remain authoritative in the runtime.",
          ],
          bullets: [
            "CLI / TUI: call RuntimeClient in process.",
            "Desktop, Web, and mobile clients: connect over ACP v1 JSON-RPC.",
            "Every surface: consumes the same event semantics and typed outcomes.",
          ],
        },
        {
          heading: "How the event loop advances a task",
          paragraphs: [
            "Each CLI, TUI, or ACP action first becomes a typed session command and durable event. agent-kernel only reduces state and selects the next effect; it performs no I/O. agent-runtime executes the decision through model, context, tool, store, review, or supervision ports.",
            "Before a tool runs, the runtime freezes its read/write roots, network mode, process mode, idempotence, and checkpoint scope, then applies policy, approval, lock, and trust checks. Results return as new events until the runtime reaches Completed, NeedsInput, Cancelled, RecoverableFailure, or Fatal.",
          ],
          bullets: [
            "Commands enter the event stream and the kernel decides from durable state.",
            "The runtime executes effects; tools return structured receipts and evidence.",
            "State advances only after new events are persisted; presentation is a projection.",
            "A model stop is an event, not automatic task completion.",
          ],
        },
        {
          heading: "Package responsibilities and dependency boundaries",
          paragraphs: [
            "The production package graph must remain acyclic, and packages collaborate through public exports and protocol ports. This keeps the kernel pure while execution, storage, and providers remain independently testable and replaceable.",
          ],
          bullets: [
            "Contracts: agent-protocol and agent-config define events, commands, outcomes, ports, tool effects, and configuration schemas.",
            "Decision engine: agent-kernel owns pure reduction, convergence, and effect selection.",
            "Intelligence: agent-model, agent-pi, agent-context, code intelligence, and extensions own model policy and context.",
            "Capabilities: agent-tools, agent-web, and agent-mcp expose effect-declared operations.",
            "Safety boundary: agent-execution, agent-platform, agent-checkpoint, and sigma-exec own processes and recovery.",
            "Durability: agent-store, agent-supervisor, and agent-runtime own events, children, review, and composition.",
            "Product surfaces: agent-presentation, agent-tui, agent-cli, and downstream sigma-code own interaction.",
          ],
        },
        {
          heading: "Durable events and presentation projections",
          paragraphs: [
            "Model text, reasoning, plans, tool calls, approvals, usage, context-window status, hooks, and child-agent lifecycle updates become structured events. agent-presentation and the ACP bridge incrementally build interfaces from those events instead of treating UI text as authoritative state.",
            "Replay, recovery, cancellation, steering, and queued follow-ups are therefore normal protocol actions. After an interface restarts, the runtime restores from verified events and snapshots rather than asking a model summary to reconstruct the work.",
          ],
        },
        {
          heading: "Current schemas and compatibility policy",
          paragraphs: [
            "Sigma-owned serialized boundaries accept only current schema version 1. Unknown schemas, malformed current documents, another store layout, or old checkpoint journals fail with typed errors. Rejected files are never rewritten, migrated, or deleted automatically.",
            "One verified shell contract handles foreground, validation, background, and disposable execution. Write tools report resulting length and SHA-256; non-UTF-8 process output must be retained as a byte-safe artifact. Strict contracts reduce ambiguous compatibility logic during recovery.",
          ],
        },
      ],
      faqs: [
        [
          "Does the desktop client run a separate agent loop?",
          "No. The first-party Sigma provider starts the long-lived sigma acp service, and the desktop uses the same runtime as the CLI and TUI over ACP v1.",
        ],
        [
          "Why does the kernel not execute tools directly?",
          "The pure kernel selects effects, while the runtime performs I/O through protocol ports. State transitions stay replayable and testable, and permission boundaries remain explicit.",
        ],
        [
          "Are old stores migrated automatically?",
          "No. Unknown or incompatible layouts are rejected read-only so recovery cannot silently rewrite user state.",
        ],
      ],
      ctaTitle: "Understand every Sigma Code surface through one runtime",
      ctaBody:
        "Try the event-driven workflow in the product or inspect each package's public boundary on GitHub.",
    },
    "security-and-recovery": {
      slug: "security-and-recovery",
      locale: "en",
      path: "/en/docs/security-and-recovery",
      alternatePath: "/docs/security-and-recovery",
      eyebrow: "SECURITY · PERMISSIONS · RECOVERY",
      title: "Security, permissions, and recovery",
      description:
        "Sigma Code security and recovery reference: native sandboxing, path and network boundaries, durable event storage, checkpoints, and evidence-backed completion.",
      lead:
        "Sigma Code puts security boundaries and recovery semantics in the runtime, not in prompt instructions. Commands must pass through the native execution broker; capabilities are frozen and checked before execution; interrupted state returns from verified events.",
      sections: [
        {
          heading: "The only arbitrary-process boundary",
          paragraphs: [
            "agent-execution is the only production package allowed to start arbitrary processes. It talks to the Rust sigma-exec broker over a framed protocol. Windows uses AppContainer, scoped filesystem ACLs, a kill-on-close Job Object, and ConPTY. Linux uses namespace isolation and a process-tree cleanup watchdog.",
            "If required sandboxing is unavailable, execution fails instead of falling back to the host. Path containment and operating-system isolation are separate defenses. Ordinary workspace write grants do not remove protection from .git or .agent.",
          ],
        },
        {
          heading: "Files, networks, and external inputs",
          paragraphs: [
            "Tools declare exact read/write roots, network mode, process mode, and effects before execution. Workspace tools reject lexical and symlink or junction ancestor escapes. Absolute external inputs use stable no-follow traversal and record path, digest, and size evidence.",
            "Read-only Web access appears only when full networking is authorized, Web mode is enabled, and the broker supports the restricted protocol. The broker permits public HTTP(S) ports 80/443, binds requests to an approved origin and method, and rejects local, private, reserved, credential-bearing, or active browser content.",
          ],
          bullets: [
            "network=none blocks networking; loopback permits only loopback; full still remains inside tool and approval boundaries.",
            "A failed external-input read remains an unresolved completion obligation; a run-created substitute cannot impersonate the source.",
            "A link object may be created inside the workspace without granting write access to its external target.",
          ],
        },
        {
          heading: "Durable events, snapshots, and checkpoints",
          paragraphs: [
            "Runtime state lives outside the agent-writable workspace. Events carry checksums and monotonic sequence numbers. Segments rotate at 8 MiB or 10,000 events, with snapshots every 250 events and at rotation. A torn final record can be repaired under the append lock.",
            "Resume restores pending approvals, follow-ups, discovered instructions, budgets, and safe idempotent work. An interrupted non-idempotent effect becomes NeedsInput instead of being replayed silently.",
          ],
          code: [
            "<user-state>/sigma/workspaces/<workspace-sha256>/stores/v1/sessions/<session-id>/",
            "  meta.json",
            "  events/000001.jsonl",
            "  snapshots/000000000250.json",
            "  artifacts/<sha256>",
          ].join("\n"),
        },
        {
          heading: "Completion is a protocol action",
          paragraphs: [
            "A provider stop produces only model_stopped. The Completion Coordinator independently derives assurance and review requirements from the current mutation frontier. It emits run.completed only when model_stopped, assurance_satisfied, and review_satisfied are all true.",
            "Every net change needs semantic validation on the current state. Editing files after tests pass makes old evidence stale. The standard profile requires current-frontier review approval or an explicit one-time user waiver; the strict profile accepts no waiver and requires a reviewer-executed check.",
          ],
          bullets: [
            "Active non-detached child agents must join before completion.",
            "An unintegrated writer worktree keeps the parent task open.",
            "Failed, stale, or weak validation returns repair guidance or a typed blocker instead of being bypassed by a summary.",
          ],
        },
        {
          heading: "Process handoff and failure recovery",
          paragraphs: [
            "Ordinary session processes are cleaned up after failure, cancellation, timeout, or broker loss. Linux advertises processHandoff only when safe transfer is available. A deliverable process must use detached stdio, cannot use PTY or stdin, and must pass an independent health check before handoff.",
            "Windows currently does not advertise this capability and fails closed. Durable sessions do not undo side effects already committed to external services, so a resumed run still verifies the current workspace and service state.",
          ],
        },
      ],
      faqs: [
        [
          "Will Sigma continue on the host if sandboxing fails?",
          "No. With sandbox=required, unavailable native isolation blocks process execution.",
        ],
        [
          "Does resume automatically rerun an interrupted command?",
          "Only explicitly safe, idempotent work can resume. Interrupted non-idempotent effects become NeedsInput so the user can confirm current state.",
        ],
        [
          "Is the model saying “done” sufficient?",
          "No. The runtime needs validation and review evidence for the current changes before it can emit completion.",
        ],
      ],
      ctaTitle: "Verify the boundary before authorizing real work",
      ctaBody:
        "Read the security policy and use doctor to verify the native sandbox before assigning a workspace.",
    },
    evaluation: {
      slug: "evaluation",
      locale: "en",
      path: "/en/docs/evaluation",
      alternatePath: "/docs/evaluation",
      eyebrow: "TRANSPARENT EVALUATION",
      title: "Evaluation method: publish the result and freeze the boundary",
      description:
        "Sigma Code evaluation methodology, preregistration boundary, and Terminal-Bench 2.1 diagnostic result, including tasks, model settings, retries, and limitations.",
      lead:
        "Evaluation can expose product problems, but it must never become a channel for an agent to see benchmark answers. Formal Sigma runs freeze provider, model, source, task selection, and retry policy before launch. Verifier information is available only for human inspection after the run.",
      sections: [
        {
          heading: "The fairness boundary",
          paragraphs: [
            "An external runner may select an evaluation task, launch the packaged product, and collect logs, events, outcomes, and scores after the run. The solving agent never receives dataset names, task identity, hidden checks, verifier output, rewards, or scores.",
            "Verifier feedback never triggers another solving attempt. Code must not choose prompts, retries, commands, cleanup, or service behavior based on a benchmark, task, fixture, package, known output, or verifier identity.",
          ],
          bullets: [
            "Allowed: select a task, package and launch the agent, then collect audit material after the run.",
            "Forbidden: expose task identity, hints, verifier information, or scores to the solving session.",
            "Forbidden: tune the default agent, harness, CLI, or runtime for a known benchmark.",
          ],
        },
        {
          heading: "How preregistration freezes a formal run",
          paragraphs: [
            "A formal Terminal-Bench run requires SigmaFormalRunPreregistration. Its SHA-bound manifest fixes the provider, model, source revision, release archive, task selection, network, timeouts, concurrency, attempts, and retries before execution.",
            "The harness does not infer comparability from a shared model name. Cross-provider or cross-configuration comparisons are meaningful only when each manifest freezes comparable controls.",
          ],
        },
        {
          heading: "Terminal-Bench 2.1 diagnostic result",
          paragraphs: [
            "A staged diagnostic on July 27–28, 2026 compared Sigma Code and OpenCode with DeepSeek deepseek-v4-pro across the same 89 Terminal-Bench 2.1 tasks. The Sigma lane allowed one attempt per task, zero retries, and no verifier feedback.",
            "Sigma Code completed 51/89 (57.303%); OpenCode completed 49/89 (55.056%). The difference is +2 tasks and +2.247 percentage points. All 89 tasks remain in the denominator, including six externally caused Sigma infrastructure-invalid observations counted as non-passes.",
          ],
          bullets: [
            "Sigma Code + DeepSeek: 51/89, 57.303%.",
            "OpenCode + DeepSeek: 49/89, 55.056%.",
            "Difference: +2 completed tasks, +2.247 percentage points.",
          ],
        },
        {
          heading: "How to interpret the numbers",
          paragraphs: [
            "Each source revision ran only previously unconsumed tasks, so this is a mixed-source engineering diagnostic, not a single score for the final PR head. No consumed task was rerun, and a generic lifecycle fix made after the last observation is intentionally absent from the result.",
            "The data does not support a claim of universal superiority or a cross-provider conclusion. It reports how many tasks two products completed under the disclosed controls and which failures remain useful engineering evidence.",
          ],
        },
        {
          heading: "Audit sessions and formal manifests",
          paragraphs: [
            "Session audits can inspect existing durable records without a model call. A formal run first creates an immutable manifest, then starts the runner with the expected SHA. The manifest and resulting artifacts remain available for human review.",
          ],
          code: [
            "pnpm eval:session -- --workspace . --latest 2",
            "",
            "pnpm bench:tb:preregister -- --draft formal-draft.json --output formal-run.json",
            "pnpm bench:tb:formal -- --preregistration-file formal-run.json --expected-preregistration-sha256 <sha256> --batch <batch-id>",
          ].join("\n"),
        },
      ],
      faqs: [
        [
          "Does Sigma send verifier failures back to the agent for a retry?",
          "No. Verifier information is collected only after the solving run and cannot trigger another attempt.",
        ],
        [
          "Is 57.303% a final score for the current source head?",
          "No. It is a mixed-source diagnostic result with disclosed limitations, intended for product analysis rather than as one final-head score.",
        ],
        [
          "Does using the same model make a comparison fair?",
          "Not by itself. Source, task selection, network, timeouts, concurrency, attempts, and retries must also be comparable in SHA-bound manifests.",
        ],
      ],
      ctaTitle: "Read every score through an auditable boundary",
      ctaBody:
        "Inspect the open harness, preregistration protocol, and run records without exposing benchmark identity to the solving agent.",
    },
  },
} satisfies Record<
  ContentLocale,
  Record<TechnicalContentSlug, ContentPageData>
>;
