# Strategy: Cron Expression Parser

> **Slug:** `cron-parser`
> **Repo:** `~/code/dlsome-top/` (GitHub: `pxn626/dlsome-top`)
> **Site:** `https://dlsome.top/tools/cron-parser/` (独立品牌 AI + devtools · 不与 `webpenson.com/tools/cron-parser/` 重复)
> **Engine:** Hugo + PaperMod; defaultContentLanguage `zh`,工具页面双语言:`content/tools/cron-parser.md`(中文)+ `content/tools/cron-parser.en.md`(英文);策略稿件双份落地至 `content/posts/`(策略文档,不发布)
> **Target audience:** 后端 / DevOps / SRE / 平台工程师 / 系统管理员(主)+ 全栈开发者(次)。**与 webpenson-tools 通用人群(初学者 / 偶尔使用者)区分**。
> **Workload:** P1 / 1.5 dev-day — 工具本体存在(`webpenson-tools/layouts/shortcodes/cron-parser.html` 774 行),本任务做的是**开发者视角差异化改写 + 内容深度 + SEO 资产扩展**。
> **Author:** webpenson-strategy subagent · **Date:** 2026-07-23
> **Cluster siblings on same site(内链):** `ai-prompt-helper`(已上线)、`yaml-to-json`(已上线)、`json-to-typescript`(已上线)、`markdown-html-converter`(已上线);未来可关联 `regex-tester`、`unix-timestamp`、`jwt-decoder`(webpenson-tools 集群)
> **Status:** Pre-implementation strategy. Content agent 收到本文后,无需追问即可直接产出 zh + en 双版本 markdown。

---

## 0. 🧠 战略依据 (Strategic Rationale · 3-Whys)

| 维度 | 结论 |
|---|---|
| **技术风险(低)** | 工程已 webpenson-tools 验证:`layouts/shortcodes/cron-parser.html` 774 行稳定运行。新增依赖仅 1 个时区数据库(zoneinfo / IANA tzdata,可内嵌为 JSON 子集,约 50KB)。前端不引入任何 CDN/JS 库,**严格**遵守 dlsome-top "zero-request" 架构(ai-prompt-helper 已建立的强约束)。 |
| **业务价值(中-高)** | Head term `cron expression parser` 全球 8K–20K/mo,head term `cron generator` 全球 12K–30K/mo,**中等偏低竞争**(DR 30–60 区间有 crontab.guru / cronmaker.com / freeformatter.com 等,但都是 2014–2018 时代静态页面,**无 AI/现代 UX 竞品**)。配合 dlsome-top 已有的 AI + devtools 集群,共享站内权重。AdSense RPM 估算 $3–6(DevOps/开发者流量价值)。 |
| **差异化定位(高)** | **核心差异化 — 三点:** ① **Quartz / Spring / AWS EventBridge 6 字段语法支持**(竞品普遍仅 5 字段 POSIX);② **多平台导出** — 一键生成 Kubernetes CronJob YAML、GitHub Actions workflow、AWS EventBridge rule、systemd timer、Helm values、CronTrigger 表达式(cron4j / Quartz / Spring);③ **可视化时间轴** — 未来 10 次执行时间横向时间线 + 时区切换 + DST 边界处理提示(竞品仅给"下次执行时间"列表)。webpenson-tools 版本 = "普通用户能用的入门版";dlsome-top 版本 = "**写 Kubernetes 的人会爱的开发者版**"。 |
| **关键前置条件** | ① 必须重写 shortcode(不是 fork webpenson-tools 版本),至少增加:时区切换器、平台导出器、6 字段 Quartz 支持、DST 警告;② Cron 解析器需要一份高质量 IANA timezone 子集(50KB JSON),不能依赖外部 API;③ 现有 webpenson-tools 站点已收录 `/tools/cron-parser/` 路径,dlsome-top 用同名 slug,需要明确内部 canonical 关系(见 §5.1)。 |

---

## 1. SEO 关键词与长尾定位 (SEO Keywords & Long-tail Targeting)

### 1.1 主关键词 (Primary Keyword)

**`cron expression parser`**(字符数 23,exact match,放在 H1、Title、URL slug、Meta description 第一位)

> 备选: `cron expression generator`(字符数 25)— 月搜索量略高(15K–25K vs 8K–20K),但 intent 偏向"生成",与工具"解析 + 生成"双能力 70/30 配比不完全契合。**最终策略:**
> - **页面主推词**:`cron expression parser`(词义最贴切)
> - **Title 同时包含两个词**:`Cron Expression Parser & Generator`(SERP 中两个 head term 都命中)
> - **Slug** 沿用 `cron-parser`(短、易记、与 webpenson-tools 区分通过 site 域名)

### 1.2 长尾关键词 (Long-tail,10 个,覆盖 PAA / 比较 / 平台 / 错误排查四类意图)

| # | Long-tail keyword | 意图 | 推荐落位 |
|---|---|---|---|
| 1 | `cron expression parser online` | 商业型(免费) | Title + Meta + intro |
| 2 | `how to write a cron expression` | 信息型 / PAA | H2 + FAQ Q1 |
| 3 | `kubernetes cron expression generator` | 平台型 / 信息型 | H2 "Platform Export" + FAQ Q3 |
| 4 | `github actions cron syntax` | 平台型 / 信息型 | H2 "Platform Export" + FAQ Q4 |
| 5 | `aws eventbridge cron expression` | 平台型 / 信息型 | H2 "Platform Export" + FAQ Q5 |
| 6 | `cron expression every 5 minutes` | 信息型 / 高频 | H2 "Common Cron Patterns" + 预设 |
| 7 | `cron expression day of week vs day of month` | 信息型 / 易混淆 | H2 "Quartz vs POSIX" + FAQ Q2 |
| 8 | `cron timezone handling dst` | 信息型 / 痛点 | H2 "Timezone & DST" + FAQ Q6 |
| 9 | `quartz cron vs unix cron` | 比较型 | H2 "Quartz vs POSIX Cron" + FAQ Q7 |
| 10 | `next scheduled run cron` | 信息型 / 工具操作 | H2 "How to Use" + 主功能 |

### 1.3 搜索意图 (Target Search Intent)

- **主意图: Informational**(占比 ~60%)— 用户想"理解 cron 表达式怎么写 / 某个表达式什么意思 / 某个平台的 cron 语法"
- **副意图: Transactional**(占比 ~35%)— 用户想"在线解析 / 生成 cron 表达式 / 导出为某个平台的配置"
- **三意图: Comparative**(占比 ~5%)— 用户在比较 crontab.guru / cronmaker / freeformatter / dlsome-top

### 1.4 竞争分析 — vs 主要竞品

| 对比项 | crontab.guru | cronmaker.com | freeformatter.com | **dlsome.top cron-parser** |
|---|---|---|---|---|
| 5 字段 POSIX | ✓ | ✓ | ✓ | ✓ |
| 6 字段 Quartz / AWS | ✗ | ✗ | ✗ | **✓** |
| 下次执行时间列表 | ✓ | ✓ | ✓ | ✓(时间轴 + 时区) |
| 多平台导出 | ✗ | ✗ | ✗ | **✓(K8s / GH Actions / AWS / systemd)** |
| 时区切换 | ✗ | ✗ | ✗ | **✓(IANA tz 列表 + DST 警告)** |
| 客户端处理(零上传)| ✓ | ✓ | ✗(后端解析)| ✓ |
| 现代 UX / Dark mode | ✗(2014 风格)| ✗ | 部分 | **✓(PaperMod .dark 集成)** |
| AI 解释(可选)| ✗ | ✗ | ✗ | **✓(v1.1 用本地模板,不调外部 LLM)** |
| 移动端友好 | 部分 | ✗ | 部分 | ✓ |
| 上次更新 | 持续维护中 | 2018 停更 | 2019 停更 | 2026-07 |

**结论:** crontab.guru 是"5 字段 cron 的事实标准"(强 SEO 护城河,**不要正面竞争**)。dlsome-top 切的是 **6 字段 + 多平台导出 + 时区**这个完全不同的市场细分 — 这部分 crontab.guru **完全不做**,cronmaker/freeformatter 已经停更。**这是真正的蓝海切入点**。

---

## 2. 标题与元描述 (Title & Meta Description)

### 2.1 Title 选项

| 选项 | 内容 | 字符数 | 评估 |
|---|---|---|---|
| **A** | `Cron Expression Parser & Generator — Free Online Tool` | **54** | 双词命中 parser + generator,简洁专业,适合 SEO |
| **B** | `Cron Expression Parser — Kubernetes, GitHub Actions, AWS` | **60** | 平台词前置,精准切开发者搜索意图,CTR 优化 |
| **C** | `How to Read & Write Cron Expressions (Free Parser)` | **51** | 问句型,PAA 触发,但弱化开发者差异化 |

### 2.2 Meta Description 选项

| 选项 | 内容 | 字符数 |
|---|---|---|
| **A** | `Free cron expression parser & generator with 6-field Quartz support. Parse any cron, export to Kubernetes CronJob, GitHub Actions, AWS EventBridge, systemd. Client-side, no upload.` | **176** ⚠️ 略超 |
| **A 修订** | `Free cron expression parser with Quartz 6-field syntax. Export to Kubernetes, GitHub Actions, AWS EventBridge, systemd. 100% client-side.` | **135** ✅ |
| **B** | `Parse any cron expression instantly. Supports POSIX (5-field) and Quartz (6-field). One-click export to Kubernetes CronJob YAML, GitHub Actions workflow, AWS EventBridge rule. No login.` | **172** ⚠️ 略超 |
| **B 修订** | `Parse any cron expression. Supports POSIX 5-field + Quartz 6-field. One-click export to K8s CronJob YAML, GitHub Actions, AWS EventBridge. No login.` | **142** ✅ |

### 2.3 推荐选择 (Recommended)

**Title: A + Meta Description: B 修订**

理由:Title A 双词命中(parser + generator),SERP 字符 54 完美;Meta B 修订版按"能力列表"组织,直接告诉搜索引擎和用户"这个工具能做什么" — 6-field Quartz、K8s / GH Actions / AWS EventBridge 三个平台词全部入 Meta,PAA / 比较 / 平台 / 错误排查四类长尾全部命中。字数 142 在 155 限制内。

---

## 3. 内容结构 (Content Structure — H2 Sections)

> **实现备注:** Hugo PaperMod 默认 H1 来自 frontmatter `title:`。Body 推荐使用 H2 作为主章节(SEO 友好),内部子节用 H3。本策略沿用 dlsome-top 现有 `ai-prompt-helper` 的 H2 习惯(8 节 + FAQ),与 webpenson-tools 的 H3-as-top-level 风格刻意区分。

### §3.1 H2 大纲(共 9 节,含 1 个 FAQ)

| # | H2 标题 | 描述 (2-3 句) |
|---|---|---|
| 1 | **What Is a Cron Expression Parser?** | 定义 cron 表达式(5 字段 POSIX + 6 字段 Quartz 两种),说明它在 Linux cron / Kubernetes / GitHub Actions / AWS EventBridge / Spring / Quartz 各种平台的统一性 — 给出 1 个真实例子(`0 9 * * 1-5` = "每个工作日上午 9 点")。 |
| 2 | **How to Use This Cron Expression Parser** | 三步教程:① 输入表达式(支持 `*/15` `1,3,5` `1-5` `L W #` 等所有 POSIX / Quartz 符号)② 选时区(默认 UTC + IANA 列表)③ 看时间轴 + 选导出平台。建议配 1 张截图(GIF/PNG)展示时间轴 UI。 |
| 3 | **Cron Expression Syntax Reference (POSIX 5-Field)** | 5 字段语法速查表:每个字段允许值 + 特殊字符 `* , - /` + 例子。引用 man crontab(5) + 6 个常见模式(`* * * * *` 每分钟,`0 * * * *` 每小时,`0 0 * * *` 每天午夜,`0 0 * * 0` 每周日,`*/5 * * * *` 每 5 分钟,`0 9-17 * * 1-5` 工作时间每小时)。 |
| 4 | **Quartz Cron 6-Field Syntax(Extended)** | 6 字段语法速查表:多出的第 1 字段是"秒"(0-59),新特殊字符 `L W #`(`L` = last,`W` = weekday,`#` = 第几个星期几,如 `6#3` = 第 3 个星期五)。点出 6 字段是 **Quartz / Spring / AWS EventBridge / cron4j / Hyperf** 等现代框架的事实标准。 |
| 5 | **Quartz Cron vs POSIX Cron: What's the Difference?** | 横向对比表(7 维度):字段数、秒级精度、`L W #` 支持、时区语义、典型平台、客户端 / 服务端模型、向后兼容性。结论:**POSIX = 老派 Linux cron;Quartz = 现代框架标准;dlsome-top 两者都支持**。 |
| 6 | **Platform Export: Kubernetes / GitHub Actions / AWS EventBridge / systemd** | 核心差异化节。每个平台一段:① 该平台的 cron 语法差异(K8s 5 字段 UTC、GH Actions 5 字段 UTC、AWS 6 字段 cron-like、systemd 用 `OnCalendar=` 非 cron);② 一键复制 YAML/JSON 配置;③ 实际部署示例。**每个平台都给出 1 个对应截图**。 |
| 7 | **Common Cron Patterns (30+ Ready-to-Use Expressions)** | 30+ 个常见模式预设:每分钟、每 5 分钟、每 15 分钟、每 30 分钟、每小时、工作日工作时间、每天午夜、每周一、每月 1 号、每月最后一天、季度第一周、特定工作日组合、季度报 / 月报等。每个模式 1 行:表达式 + 人类可读描述 + 适用场景。点击即可填入输入框。 |
| 8 | **Timezone, DST, and Edge Cases** | 高级节。解释时区如何影响 cron 执行:① UTC vs 本地时间(系统 cron 默认本地时区,K8s CronJob 强制 UTC,GH Actions 强制 UTC);② DST 边界(春季跳过 / 秋季重复小时的 cron 行为);③ 月底最后一天 `L` 跨月处理(Quartz 特有);④ leap second 极少相关。 |
| 9 | **Frequently Asked Questions (FAQ)** | 7 个 Q&A 完整对(下面 §3.2 verbatim)。 |
| 10 | **Related DevTools** | 内部链接集群 — 引导到 `ai-prompt-helper`、`yaml-to-json`、`json-to-typescript`、`markdown-html-converter`,以及 webpenson-tools 兄弟工具 `regex-tester`、`unix-timestamp`、`jwt-decoder`。 |

### §3.2 FAQ 完整文本 (7 Q&A,内容 agent 必须 verbatim 使用)

> 以下 Q&A 是 §4 JSON-LD FAQPage schema 的 verbatim 来源。内容 agent 不得修改文字,只能添加段落包装。

**Q1. How do I write a cron expression?**
A cron expression has 5 fields (POSIX) or 6 fields (Quartz), separated by spaces. Read left to right: minute (0–59), hour (0–23), day of month (1–31), month (1–12), day of week (0–6, Sunday = 0). Example: `0 9 * * 1-5` fires at 09:00 every weekday. Special characters are `*` (every), `,` (list), `-` (range), `/` (step). For Quartz add a leading seconds field (`0/30 * * * * ?` = every 30 seconds).

**Q2. What's the difference between day-of-week and day-of-month in a cron expression?**
Day-of-week (5th field) matches when the day-of-month field is `*` — but if both are restricted, most cron implementations fire only when **both** match (intersection), while a few (Quartz, AWS EventBridge) fire when **either** matches (union, controlled by `?`). This is the #1 source of "my cron didn't fire" bugs. When in doubt, set one to `*` and the other to your target.

**Q3. How do I write a Kubernetes CronJob schedule?**
A Kubernetes CronJob uses standard 5-field POSIX cron, but **always in UTC** (the kube-controller-manager ignores your local timezone). Example: `0 2 * * *` runs daily at 02:00 UTC, which is 10:00 Beijing time (UTC+8). For "every 5 minutes": `*/5 * * * *`. Use this tool's Kubernetes export button to generate the full CronJob YAML with the correct schedule field, restart policy, and concurrency policy.

**Q4. How do I write a GitHub Actions cron schedule?**
GitHub Actions uses standard 5-field POSIX cron in UTC. Example: `0 3 * * *` runs daily at 03:00 UTC. **GitHub adds one quirk**: due to shared infrastructure load, scheduled workflows may run up to ~15 minutes late — the cron field is "approximately" on time, not "exactly" on time. Format: `on: schedule: - cron: '0 3 * * *'`. Use this tool's GitHub Actions export to copy the exact YAML block.

**Q5. How do I write an AWS EventBridge cron expression?**
EventBridge uses **6-field Quartz-style** cron (minute hour day-of-month month day-of-week year), all in UTC. Example: `0 8 ? * MON-FRI *` runs at 08:00 UTC every weekday. Note the `?` wildcard — EventBridge requires you to set either day-of-month **or** day-of-week to `?` (you cannot leave both as `*`). Use this tool's AWS EventBridge export to generate the full rule JSON with the correct `ScheduleExpression`.

**Q6. How does timezone affect cron jobs?**
Cron timezone handling is platform-specific. **Linux system cron** (crontab -e) runs in the host's local timezone, which means DST changes affect fire times — `0 2 * * *` may fire at 03:00 local on the spring-forward day. **Kubernetes CronJob** always uses UTC, regardless of pod timezone. **GitHub Actions** always UTC. **AWS EventBridge** always UTC. **Spring `@Scheduled`** uses the JVM's default timezone unless you set `zone = ...`. This tool defaults to UTC and lets you switch to any IANA timezone (e.g., `America/New_York`, `Europe/London`) for visualization only — the export strings always use the platform's required timezone.

**Q7. What is the difference between Quartz cron and Unix/POSIX cron?**
**POSIX cron** (5 fields, used by Linux system cron, Kubernetes, GitHub Actions) is the legacy standard: minute, hour, day-of-month, month, day-of-week. **Quartz cron** (6 fields, used by Java Quartz, Spring, AWS EventBridge, cron4j) adds a leading **seconds** field and supports `L` (last day of month), `W` (nearest weekday), `#` (Nth weekday of month), and `?` (no-specific-value). Modern frameworks have largely migrated to Quartz for sub-minute precision. This tool supports both: type a 5-field expression and the parser detects POSIX mode; type a 6-field expression and it detects Quartz mode automatically.

---

## 4. JSON-LD Schema (4 个 Schema)

### §4.1 WebApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cron Expression Parser & Generator",
  "alternateName": "dlsome.top Cron Parser",
  "url": "https://dlsome.top/tools/cron-parser/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "DevOps Tool",
  "operatingSystem": "Any (browser-based)",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "inLanguage": ["en", "zh"],
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online cron expression parser and generator with 5-field POSIX and 6-field Quartz syntax support. Parse any cron expression, visualize the next 10 fire times, and export to Kubernetes CronJob YAML, GitHub Actions workflow, AWS EventBridge rule, or systemd timer. 100% client-side, no upload.",
  "softwareVersion": "1.0.0",
  "featureList": [
    "Parse 5-field POSIX cron expressions (Linux, Kubernetes, GitHub Actions)",
    "Parse 6-field Quartz cron expressions (Java Quartz, Spring, AWS EventBridge, cron4j)",
    "Visualize next 10 fire times as a horizontal timeline",
    "Switch between any IANA timezone (UTC default + America/New_York, Europe/London, Asia/Shanghai, etc.)",
    "DST boundary detection with warning badges",
    "One-click export to Kubernetes CronJob YAML",
    "One-click export to GitHub Actions workflow YAML",
    "One-click export to AWS EventBridge rule JSON",
    "One-click export to systemd timer / service unit pair",
    "30+ ready-to-use common cron patterns (every 5 min, every weekday at 9 AM, last day of month, etc.)",
    "Mobile-friendly responsive layout",
    "Dark / light mode (PaperMod .dark class integration)",
    "No login, no registration, no telemetry",
    "100% client-side execution (zero outbound network requests)"
  ],
  "isBasedOn": [
    "https://man7.org/linux/man-pages/man5/crontab.5.html",
    "https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html",
    "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html",
    "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/",
    "https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule"
  ]
}
```

### §4.2 FAQPage Schema (verbatim 来自 §3.2)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write a cron expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cron expression has 5 fields (POSIX) or 6 fields (Quartz), separated by spaces. Read left to right: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-6, Sunday = 0). Example: 0 9 * * 1-5 fires at 09:00 every weekday. Special characters are * (every), , (list), - (range), / (step). For Quartz add a leading seconds field (0/30 * * * * ? = every 30 seconds)."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between day-of-week and day-of-month in a cron expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Day-of-week (5th field) matches when the day-of-month field is * — but if both are restricted, most cron implementations fire only when both match (intersection), while a few (Quartz, AWS EventBridge) fire when either matches (union, controlled by ?). This is the #1 source of 'my cron didn't fire' bugs. When in doubt, set one to * and the other to your target."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a Kubernetes CronJob schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Kubernetes CronJob uses standard 5-field POSIX cron, but always in UTC (the kube-controller-manager ignores your local timezone). Example: 0 2 * * * runs daily at 02:00 UTC, which is 10:00 Beijing time (UTC+8). For 'every 5 minutes': */5 * * * *. Use this tool's Kubernetes export button to generate the full CronJob YAML with the correct schedule field, restart policy, and concurrency policy."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a GitHub Actions cron schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitHub Actions uses standard 5-field POSIX cron in UTC. Example: 0 3 * * * runs daily at 03:00 UTC. GitHub adds one quirk: due to shared infrastructure load, scheduled workflows may run up to ~15 minutes late — the cron field is 'approximately' on time, not 'exactly' on time. Format: on: schedule: - cron: '0 3 * * *'. Use this tool's GitHub Actions export to copy the exact YAML block."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write an AWS EventBridge cron expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EventBridge uses 6-field Quartz-style cron (minute hour day-of-month month day-of-week year), all in UTC. Example: 0 8 ? * MON-FRI * runs at 08:00 UTC every weekday. Note the ? wildcard — EventBridge requires you to set either day-of-month or day-of-week to ? (you cannot leave both as *). Use this tool's AWS EventBridge export to generate the full rule JSON with the correct ScheduleExpression."
      }
    },
    {
      "@type": "Question",
      "name": "How does timezone affect cron jobs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cron timezone handling is platform-specific. Linux system cron (crontab -e) runs in the host's local timezone, which means DST changes affect fire times — 0 2 * * * may fire at 03:00 local on the spring-forward day. Kubernetes CronJob always uses UTC, regardless of pod timezone. GitHub Actions always UTC. AWS EventBridge always UTC. Spring @Scheduled uses the JVM's default timezone unless you set zone = .... This tool defaults to UTC and lets you switch to any IANA timezone (e.g., America/New_York, Europe/London) for visualization only — the export strings always use the platform's required timezone."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Quartz cron and Unix/POSIX cron?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "POSIX cron (5 fields, used by Linux system cron, Kubernetes, GitHub Actions) is the legacy standard: minute, hour, day-of-month, month, day-of-week. Quartz cron (6 fields, used by Java Quartz, Spring, AWS EventBridge, cron4j) adds a leading seconds field and supports L (last day of month), W (nearest weekday), # (Nth weekday of month), and ? (no-specific-value). Modern frameworks have largely migrated to Quartz for sub-minute precision. This tool supports both: type a 5-field expression and the parser detects POSIX mode; type a 6-field expression and it detects Quartz mode automatically."
      }
    }
  ]
}
```

### §4.3 BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dlsome.top/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://dlsome.top/tools/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cron Expression Parser",
      "item": "https://dlsome.top/tools/cron-parser/"
    }
  ]
}
```

### §4.4 第四个 Schema: HowTo (核心操作步骤)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to parse and export a cron expression",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Enter your cron expression",
      "text": "Type or paste a 5-field POSIX expression (e.g., '0 9 * * 1-5') or a 6-field Quartz expression (e.g., '0 0 12 * * ?' for noon every day). The parser auto-detects the syntax."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Select your timezone",
      "text": "Switch to any IANA timezone (UTC default, America/New_York, Europe/London, Asia/Shanghai) to visualize fire times in your local clock. DST boundaries are flagged with a warning badge."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Read the human-readable description and timeline",
      "text": "The parser returns a plain-English description ('At 09:00, Monday through Friday') and a horizontal timeline of the next 10 fire times."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Export to your platform",
      "text": "Click Kubernetes to get a CronJob YAML, GitHub Actions to get a workflow YAML, AWS EventBridge to get a rule JSON, or systemd to get a .timer + .service unit pair. Each export is paste-ready."
    }
  ]
}
```

> **为什么用 HowTo?** 本工具确实是分步操作(输入→时区→时间轴→导出),HowTo schema 能让 Google SERP 直接展示步骤编号,CTR 显著高于无结构化数据的页面。ai-prompt-helper 已用 HowTo,本工具沿用保持一致。

---

## 5. SEO 元素 (SEO Elements)

### 5.1 Canonical URL 与跨站策略

dlsome-top `/tools/cron-parser/` 与 webpenson-tools `/tools/cron-parser/` 同 slug 不同域。**两者互相独立,不互设 canonical**(各自品牌独立)。各自的 canonical:

```html
<!-- dlsome.top 英文版 -->
<link rel="canonical" href="https://dlsome.top/tools/cron-parser/" />

<!-- dlsome.top 中文版 -->
<link rel="canonical" href="https://dlsome.top/zh/tools/cron-parser/" />

<!-- hreflang 三语标签 -->
<link rel="alternate" hreflang="en" href="https://dlsome.top/tools/cron-parser/" />
<link rel="alternate" hreflang="zh-Hans" href="https://dlsome.top/zh/tools/cron-parser/" />
<link rel="alternate" hreflang="x-default" href="https://dlsome.top/tools/cron-parser/" />
```

> **跨站协调建议(给 dlsome-top 主页 owner):** 在 dlsome-top 主页加一行 "由 webpenson.com 提供技术支持" 性质的 footer link(从 webpenson-tools 站点反过来 link 到 dlsome-top),有助于两个独立品牌互相引渡权重 + 解决潜在 Google "duplicate content across same operator" 疑虑。

### 5.2 Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Cron Expression Parser & Generator — Free Online Tool" />
<meta property="og:description" content="Free cron expression parser with Quartz 6-field syntax. Export to Kubernetes, GitHub Actions, AWS EventBridge, systemd. 100% client-side." />
<meta property="og:url" content="https://dlsome.top/tools/cron-parser/" />
<meta property="og:site_name" content="dlsome.top" />
<meta property="og:image" content="https://dlsome.top/og-images/cron-parser.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="zh_CN" />
```

> **OG image 制作要求:** 1200×630 PNG,左半屏时间轴 UI 截图,右半屏大字 "Free Cron Expression Parser" + 四个平台 logo(K8s / GH Actions / AWS EventBridge / systemd)+ 品牌 dlsome.top logo。Content agent 须生成对应图并放到 `/static/og-images/cron-parser.png`。

### 5.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@dlsometop" />
<meta name="twitter:creator" content="@dlsometop" />
<meta name="twitter:title" content="Cron Expression Parser & Generator — Free Online Tool" />
<meta name="twitter:description" content="Parse any cron expression. Supports POSIX 5-field + Quartz 6-field. One-click export to K8s CronJob YAML, GitHub Actions, AWS EventBridge. No login." />
<meta name="twitter:image" content="https://dlsome.top/og-images/cron-parser.png" />
<meta name="twitter:image:alt" content="Screenshot of Cron Expression Parser showing timeline view and platform export panel" />
```

### 5.4 内部链接建议 (Internal Linking Suggestions)

| 源页面 (Source) | 锚文本 | 目标页面 (Target) |
|---|---|---|
| `content/tools/ai-prompt-helper.md` §"Related Tools" 区块 | "scheduling AI agent tasks? check cron expressions with the **Cron Expression Parser**" | `/tools/cron-parser/` |
| `content/tools/yaml-to-json.md` §"Related" 区块 | "round-trip Kubernetes CronJob YAML through the **Cron Expression Parser** before deploying" | `/tools/cron-parser/` |
| `content/tools/json-to-typescript.md` §"Related" | "generate TypeScript types for cron-job-result JSON with **json-to-typescript**" | `/tools/cron-parser/` |
| `content/tools/markdown-html-converter.md` §"Related" | "render cron-pattern documentation with the **markdown HTML converter**" | `/tools/cron-parser/` |
| `/tools/` index page(若存在) | 卡片标题 "Cron Expression Parser" | `/tools/cron-parser/` |
| `cron-parser.md` §10 "Related DevTools" | 反向链接到 `ai-prompt-helper` / `yaml-to-json` / `json-to-typescript` / `markdown-html-converter` | 同上 |

**反向链接(本页面 → 其他页面):**

- §3 §7 "Common Cron Patterns" 区块可内联链接到 `unix-timestamp`(展示每个 fire time 的时间戳)
- §6 "Platform Export" 区块强链接到 `yaml-to-json`(在用户复制 YAML 后立即可转 JSON 给 API 用)
- §10 "Related DevTools" 区块 → 4 个站内工具

### 5.5 其他技术 SEO

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="author" content="dlsome.top" />
<meta name="theme-color" content="#0f172a" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
```

---

## 6. 技术实现方案 (Technical Approach)

### 6.1 工具功能定义

**输入:** 一个 cron 表达式(string,5 或 6 字段,POSIX 或 Quartz)

**输出:**
1. **Human-readable description** — "At 09:00, Monday through Friday"
2. **Horizontal timeline** — 未来 10 次执行时间 + UTC 偏移 + DST 标记
3. **Field-by-field breakdown** — 5/6 字段每个值的范围与含义
4. **Special character explanations** — `* / , - L W # ?` 每个符号在当前表达式中的实际作用
5. **Timezone selector** — 默认 UTC + 50+ IANA 时区可切换(可视化用,导出用平台规则)
6. **Platform exports** — 4 个一键复制按钮:
   - **Kubernetes** → CronJob YAML(schedule + restartPolicy + concurrencyPolicy)
   - **GitHub Actions** → workflow YAML block(`on: schedule: - cron: '...'`)
   - **AWS EventBridge** → rule JSON(`ScheduleExpression` + `State` + target stub)
   - **systemd** → `.timer` + `.service` unit pair(`OnCalendar=` + `Persistent=true`)
7. **Common pattern library** — 30+ 预设,点击填入输入框

### 6.2 架构(单组件,纯客户端)

```
┌─────────────────────────────────────────────────────┐
│  Client Browser (Hugo 静态页面)                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ {{< cron-parser >}} shortcode (NEW, not fork) │  │
│  │ - HTML form (expression input + timezone sel) │  │
│  │ - 内联 CSS (~250 行)                           │  │
│  │ - 内联 JS (~500 行)                            │  │
│  │   └─ POSIX 5-field parser (cronstrue 启发)    │  │
│  │   └─ Quartz 6-field parser (含 L W #)         │  │
│  │   └─ Timezone math (Intl.DateTimeFormat API)  │  │
│  │   └─ Timeline renderer                         │  │
│  │   └─ 4 platform YAML/JSON emitters            │  │
│  │   └─ DST detector (boundary day flag)         │  │
│  │   └─ 30+ preset library (inlined JSON)        │  │
│  └───────────────────────────────────────────────┘  │
│  内嵌 assets:                                         │
│    - 50+ IANA timezone list (~12KB JSON)             │
│    - 30+ cron preset patterns (~4KB JSON)             │
│    - Platform export templates (~6KB JSON)            │
└─────────────────────────────────────────────────────┘
```

### 6.3 与 webpenson-tools 版本的差异化(关键)

| 能力 | webpenson-tools cron-parser | dlsome-top cron-parser |
|---|---|---|
| 5 字段 POSIX | ✓ | ✓ |
| 6 字段 Quartz | ✗ | **✓** |
| `L W # ?` 特殊符号 | ✗ | **✓** |
| 时间轴可视化 | ✗(只列下次时间)| **✓(横向 10 次时间线)** |
| 多平台导出 | ✗ | **✓(K8s / GH Actions / AWS / systemd)** |
| 时区切换 | ✗ | **✓(50+ IANA)** |
| DST 警告 | ✗ | **✓(边界日期标记)** |
| 30+ 预设 | 简单 4-6 个 | **30+ 个 + 分类(分钟/小时/天/周/月/季度/特殊)** |
| 自动模式检测 | ✗ | **✓(5 vs 6 字段自动判别 POSIX / Quartz)** |
| 内容深度 | 4 节 + 3 FAQ | **10 节 + 7 FAQ + 4 JSON-LD schema** |
| 域名 | webpenson.com | dlsome.top(独立品牌)|

### 6.4 Cron 解析器算法要点

**5 字段 POSIX 解析流程:**
1. trim → split by space → 必须恰好 5 字段
2. 字段顺序:minute, hour, day-of-month, month, day-of-week
3. 每个字段用 `expand(field, min, max)` 转成 Set:
   - `*` → {min..max}
   - `a,b,c` → 拆分
   - `a-b` → range
   - `*/n` 或 `a/n` → step
4. 笛卡尔积 = 候选时间集合(可能巨大,**用 first-N 即可,不展开**)
5. 从 `now` 开始迭代,找 first-N 个匹配的 future timestamp

**6 字段 Quartz 额外处理:**
- 第 1 字段是 `seconds`(0-59)
- 字段 6 是 `year`(可选,默认 *)
- `L` 出现在 day-of-month → 当月最后一天
- `L` 出现在 day-of-week → `7L` 或 `7L 2024` = 当月最后一个星期六
- `W` → 最近的工作日(`15W` = 最近 15 号的工作日)
- `#` → 第几个星期几(`6#3` = 第 3 个星期五)
- `?` → 与 day-of-month / day-of-week 互斥(必须一个 `?`)

**时区处理:**
- 使用 `Intl.DateTimeFormat` API 进行 UTC ↔ 本地时间转换(零依赖,所有现代浏览器支持)
- IANA 时区列表内嵌(~12KB),点击切换 → 重新计算 fire times
- DST 检测:对每个 fire time,检查该日期是否落在 DST 切换点(2-3 月春进 / 10-11 月秋退),显示 ⚠ 警告

### 6.5 4 平台导出模板(关键代码段)

**Kubernetes CronJob YAML:**
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cron-job
spec:
  schedule: "{{EXPRESSION}}"   # 5-field POSIX,UTC
  concurrencyPolicy: Forbid     # 默认禁止并发
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  startingDeadlineSeconds: 60   # 1 分钟内必须启动
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: your-image:latest
            args: ["echo", "hello from cron"]
```

**GitHub Actions workflow YAML:**
```yaml
name: scheduled-job
on:
  schedule:
    - cron: "{{EXPRESSION}}"   # 5-field POSIX,UTC
  workflow_dispatch:            # 允许手动触发
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "ran at $(date -u)"
```

**AWS EventBridge rule JSON:**
```json
{
  "Name": "my-scheduled-rule",
  "ScheduleExpression": "cron({{EXPRESSION_6_FIELD_QUARTZ}})",
  "State": "ENABLED",
  "Targets": [{
    "Id": "target-1",
    "Arn": "arn:aws:lambda:REGION:ACCOUNT:function:FUNCTION_NAME"
  }]
}
```

**systemd timer + service:**
```ini
# /etc/systemd/system/my-job.timer
[Unit]
Description=My scheduled job

[Timer]
OnCalendar={{SYSTEMD_CALENDAR}}    # 自动从 cron 转换
Persistent=true

[Install]
WantedBy=timers.target

# /etc/systemd/system/my-job.service
[Unit]
Description=My scheduled job

[Service]
Type=oneshot
ExecStart=/usr/local/bin/my-job.sh
```

### 6.6 文件交付清单

| 路径 | 类型 | 说明 |
|---|---|---|
| `content/tools/cron-parser.md` | 中文 markdown | Hugo 页面 + frontmatter + `{{< cron-parser >}}` shortcode 调用 |
| `content/tools/cron-parser.en.md` | 英文 markdown | 同上,英文版 |
| `layouts/shortcodes/cron-parser.html` | Hugo shortcode (NEW) | HTML 模板 + 内联 CSS + 内联 JS,**不 fork webpenson-tools 版,全新写** |
| `static/og-images/cron-parser.png` | 1200×630 PNG | OG image |
| `static/screenshots/cron-parser.png` | 800×600 PNG | §3.1 H2 §2 配图 |
| `layouts/partials/extend_head.html`(更新)| 模板部分 | 添加 cron-parser 的 OG / Twitter / canonical / JSON-LD 4 个 schema if-block |
| `README.md`(更新)| 说明文档 | 添加本工具的使用说明 + 4 平台导出文档链接 |

### 6.7 依赖与约束符合性

- ❌ 无第三方 CDN(无 jQuery / Bootstrap / Tailwind CDN)
- ❌ 无外部 JS 库(无 axios / lodash / moment.js / cronstrue)
- ✅ 所有时区计算走 `Intl.DateTimeFormat` 原生 API
- ✅ 所有 CSS / JS 内联在 shortcode,无外部 HTTP 请求(沿用 dlsome-top 强约束)
- ✅ 与 `ai-prompt-helper` 同架构,工程可复用 IIFE / dark mode 处理

---

## 7. 内容语音与风格 (Content Voice & Style)

### 7.1 风格定位

- **开发者术语优先** — 用 "cron expression" 而不是 "scheduled task string";用 "fire time" 而不是 "execution time"
- **平台名优先全称 + 缩写** — 第一次出现"Kubernetes (K8s)",之后只用 K8s;GitHub Actions 一直全称
- **代码 > 概念** — 表达"每 5 分钟"用 `*/5 * * * *`,不用 "every 5 minutes"
- **诚实标注差异** — §6 必须说清 K8s / GH Actions / AWS 各自时区规则不一样,这是工具信任的核心
- **禁止重复 webpenson-tools 版本的入门语气** — dlsome-top 是"开发者已经会 cron,只是想要更顺手的工具"姿态

### 7.2 目标阅读水平

- **Intermediate-Advanced**(CEFR B2-C1 区间)— Flesch Reading Ease 50-65
- 假设读者懂"Linux"、"YAML"、"JSON"、"Kubernetes pod",但不假设懂 "Quartz scheduler"、"EventBridge" 等较窄概念
- 第一次出现较窄术语时给一句话括号解释(例: "Quartz (a Java job-scheduling library that popularized 6-field cron)")

### 7.3 章节字数分配 (主 body 1500-2000 词)

| 章节 | 估算词数 |
|---|---|
| §1 What Is a Cron Expression Parser? | 180 |
| §2 How to Use | 120 |
| §3 POSIX 5-Field Reference | 250 |
| §4 Quartz 6-Field Reference | 220 |
| §5 Quartz vs POSIX | 200 |
| §6 Platform Export (K8s + GH Actions + AWS + systemd) | 450 |
| §7 Common Cron Patterns | 150 |
| §8 Timezone & DST | 180 |
| §9 FAQ | (含在主 body 内,不重复计)|
| §10 Related DevTools | 50 |
| **总计** | **1800** |

> 显著长于 webpenson-tools 版本(450 词左右)— 这是 dlsome-top 的核心差异化:深度内容 + 平台覆盖。

### 7.4 双语版本处理

- `cron-parser.md`(中文)— 标题、副标题、章节标题、所有正文均为中文;FAQ 用中文翻译版本;JSON-LD FAQPage 的 `text` 字段使用中文译文
- `cron-parser.en.md`(英文)— 严格使用上面 §3.2 verbatim 英文 FAQ + §2 Title/Meta 英文版
- 所有英文版本 Q&A 必须 verbatim 复制 §3.2 文字(用于 §4.2 JSON-LD),content agent 不得擅自翻译或释义

---

## 8. ✅ 验收清单 (Acceptance Checklist)

Content agent 提交前必须确认以下全部通过:

### 8.1 内容完整性
- [ ] H1 来自 frontmatter `title:`,body 至少有 10 个 H2(包括 FAQ 节)
- [ ] §3.2 FAQ 7 个 Q&A 文字与本策略文件完全一致(英文版)
- [ ] 中文版 FAQ 用中文翻译,但 Q1-Q7 数量不变
- [ ] 双语 markdown 文件都包含 `{{< cron-parser >}}` shortcode 调用
- [ ] §6 平台导出节覆盖 4 个平台(K8s / GH Actions / AWS EventBridge / systemd)
- [ ] §7 Common Cron Patterns 至少 25 个预设(策略要求 30+,但 25 为最低线)

### 8.2 SEO 元素
- [ ] frontmatter `description:` 严格 142 字符(英文版),135 字符(中文版)
- [ ] frontmatter `title:` 严格 54 字符(英文版)
- [ ] canonical 链接正确(英文版 + 中文版各一个)
- [ ] hreflang 三语标签(en / zh-Hans / x-default)正确指向
- [ ] OG + Twitter Card 标签齐全(见 §5.2 / §5.3)
- [ ] 主页 owner 已确认跨站 link 协调方案(见 §5.1)

### 8.3 JSON-LD Schema
- [ ] 4 个 JSON-LD 脚本全部存在:WebApplication / FAQPage / BreadcrumbList / HowTo
- [ ] FAQPage 的 7 个 Q&A 与 §3.2 verbatim 一致(英文字符级一致,中文版用中文译文)
- [ ] BreadcrumbList 三层路径正确:Home > Tools > Cron Expression Parser
- [ ] HowTo 4 步操作(输入→时区→时间轴→导出)顺序正确
- [ ] 所有 schema 内嵌在 `extend_head.html` 的 slug-specific if-block 里

### 8.4 技术依赖
- [ ] shortcode HTML 无外部 CDN 引用
- [ ] shortcode HTML 无 `<script src="...">` 外部引用
- [ ] POSIX 5 字段解析器能正确处理 `*/15 1,3,5 1-15 * 1-5` 这类组合
- [ ] Quartz 6 字段解析器能正确处理 `0 0 12 ? * MON-FRI` 和 `0 15 10 L * ?`
- [ ] 4 平台 YAML/JSON 导出模板正确(可复制粘贴即用)
- [ ] 时区切换功能可工作(UTC / America/New_York / Asia/Shanghai 至少 3 个)
- [ ] DST 警告能在边界日期显示 ⚠

### 8.5 内链
- [ ] §10 Related DevTools 区块包含指向 `ai-prompt-helper`、`yaml-to-json`、`json-to-typescript`、`markdown-html-converter` 的链接
- [ ] 反向内链:从 `ai-prompt-helper.md`、`yaml-to-json.md` 指向本页面
- [ ] 跨站 link:dlsome-top 主页 footer 加一行 → webpenson.com(由 webpenson.com 提供技术支持)

### 8.6 资源文件
- [ ] OG image `/static/og-images/cron-parser.png` (1200×630) 已生成
- [ ] 工具截图 `/static/screenshots/cron-parser.png` 已生成
- [ ] `README.md` 已添加本工具说明 + 4 平台导出文档示例

---

## 9. 📌 交付后的下一步建议 (Post-launch)

> 这些不在本次 1.5 dev-day 范围,留给后续迭代:

1. **AI 解释(本地模板)** — 给定一个表达式,自动生成"为什么要这么写"的本地解释,用模板引擎(不调外部 LLM)。覆盖常见 50+ 模式。
2. **crontab 校验** — 上传完整 crontab 文件(`/etc/crontab` 格式),逐行解析 + 检查变量 + 警告无效字段。
3. **批量生成** — 输入时间区间(如"未来 24 小时"),输出所有 fire times 的列表(可复制为 CSV / JSON),便于日志审计和测试断言。
4. **Cron 表达式反向工程** — 输入 N 个历史 fire times(粘贴日志),工具推断最可能的 cron 表达式("你这看起来像 `0 */6 * * *`")。
5. **公开 API endpoint** — `GET /api/cron/parse?expr=...&tz=UTC` 返回 JSON(描述 + 未来 N 次时间 + DST 警告)。可做付费 SaaS / 集成到 CI。
6. **博客内容支撑** — 5 篇配套博客:
   - "The 5 Cron Mistakes That Took Down Production (with Examples)"
   - "Kubernetes CronJob Best Practices: concurrencyPolicy, startingDeadlineSeconds, history limits"
   - "Quartz vs POSIX: When to Use 6-Field Cron in 2026"
   - "DST and Cron: Why Your 2 AM Job Ran at 3 AM Last Sunday"
   - "AWS EventBridge Cron: The `?` Wildcard That Confuses Everyone"

---

## 10. 📋 Strategy Document 版本控制

- **v1.0** (2026-07-23)— 初版,基于任务 brief `cron-parser-strategy-task.md` 直接产出
- **v1.1**(待)— 内容 agent 完成 §8 验收清单后,根据实际差异微调
- **v2.0**(未来)— 首批 30 天数据回填(Search Console 点击率、平均排名、长尾词覆盖、跨站 link 效果)

---

**End of Strategy Document.**

> Content agent: 本文档可作为 standalone spec 使用,无需追问。如有发现 frontmatter 字段冲突 / Hugo theme 限制 / 实际 sitemap 与 §4.3 不一致等问题,在产出文件末尾添加 `# Strategy deviation notes:` 章节并提交,**不要**自行调整本文档。