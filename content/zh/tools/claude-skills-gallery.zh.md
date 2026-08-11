---
title: "Claude Skills 模板库 — 50+ 即用技能模板 (Anthropic Skills v1.0)"
description: "50+ Claude Skills 模板浏览、预览、复制、创作。5 大类:代码 / 写作 / 数据 / SEO / 通用,基于 Anthropic Skills v1.0 规范。100% 浏览器端,无需登录,完全免费。"
slug: "claude-skills-gallery"
date: "2026-08-08T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "claude_skills_gallery"
url: "/zh/tools/claude-skills-gallery/"
tools:
  - "claude"
  - "claude-skills"
  - "claude-code"
  - "anthropic"
  - "skills"
  - "skills-framework"
  - "yaml"
  - "prompt-engineering"
  - "developer-tools"
  - "ai-tools"
categories:
  - "AI 工具"
  - "开发者工具"
  - "Claude 生态"
tags:
  - "claude-skills"
  - "anthropic-skills"
  - "skills-framework"
  - "skills-yaml"
  - "claude-projects"
  - "claude-code"
  - "yaml-frontmatter"
  - "prompt-template"
keywords:
  - "Claude Skills 模板"
  - "Anthropic Skills"
  - "Claude Skills YAML"
  - "Claude Skills 中文"
  - "Claude Skills 教程"
  - "Claude Code 技能"
og:
  title: "Claude Skills 模板库 — 50+ 即用技能模板"
  description: "浏览 50+ Claude Skills 模板,预览 YAML,一键复制,或用 Composer 创作自己的技能。"
  image: "/tools/claude-skills-gallery/img/og.png"
  image_alt: "Claude Skills 模板库 — 5 大类,50 个模板"
  type: "website"
  url: "https://dlsome.top/zh/tools/claude-skills-gallery/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "Claude Skills 模板库 — 50+ 技能模板"
  description: "浏览 / 预览 / 复制 / 创作,基于 Anthropic Skills v1.0。无需登录。"
  image: "/tools/claude-skills-gallery/img/og.png"
canonical: "https://dlsome.top/zh/tools/claude-skills-gallery/"
outputs:
  - html
  - json
---

{{< claude-skills-gallery >}}

# Claude Skills 模板库 — 50+ 即用技能模板

免费、纯浏览器运行的 **Claude Skills 模板库**,共 **50+ 个模板**,可直接粘贴到 [Claude Projects](https://docs.claude.com/en/docs/projects/overview) 或 [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) 使用。无需注册、无 API 调用、无追踪。

## 一句话定位

- **50 个模板**覆盖 5 大类(代码工程 / 写作文案 / 数据分析 / SEO 站长 / 通用生产力)
- **一键复制** — 把 YAML 粘贴到 Claude Project 即可
- **分享链接** — 把技能 ID 编入 URL 哈希(`#skill=slug`),零服务器
- **Composer** — 用表单构建自己的技能,实时 YAML 校验
- **100% 浏览器** — 数据留在本地,无任何网络请求

## 什么是 Claude Skill?

**Claude Skill** 是一个结构化指令包,包含 YAML frontmatter + Markdown 正文,遵循 [Anthropic Skills v1.0](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) 框架。与普通提示词不同,Skill 具备:

- **结构化 name + description** — 让 Claude 知道何时调用
- **`allowed-tools`** — 声明 Claude 可使用的工具范围
- **version + license** — 版本追溯和许可声明
- **Example invocation** — 调用示例,降低使用门槛

## 5 大类别

| 类别 | Emoji | 数量 | 示例技能 |
|---|---|---|---|
| **代码工程** | 🔍 | 10 | code-review, git-commit-message, sql-optimizer, regex-builder |
| **写作文案** | ✍️ | 10 | blog-outline, seo-meta, translation, proofreading |
| **数据分析** | 📊 | 10 | csv-profiler, json-analyzer, log-explainer, chart-recommender |
| **SEO 站长** | 🔬 | 10 | meta-description-auditor, sitemap-qa, og-validator, schema-ld-generator |
| **通用生产力** | 📦 | 10 | meeting-summarizer, decision-matrix, rca-investigator, okr-drafter |

## 如何使用

### 第一步:浏览

点击 **浏览** 标签(默认)。用分类胶囊筛选,或在上方搜索框输入关键词。每张卡片显示技能名称、一句话描述和分类色标。

### 第二步:预览

点击 **预览**,切换 **代码 / 分屏 / 预览** 标签查看:

- **代码** — 原始 YAML frontmatter + Markdown 正文
- **分屏** — 左 YAML / 右渲染结果
- **预览** — 格式化 Markdown 输出

### 第三步:复制 / 下载 / 分享

- **📋 复制** — 复制完整 `.skill.md` 内容到剪贴板
- **⬇ 下载** — 保存为 `<slug>.skill.md` 文件
- **🔗 分享链接** — 把技能 ID 编入 URL 哈希(如 `#skill=code-review`)

### 第四步:粘贴到 Claude

打开 Claude Projects → 创建或打开项目 → 把 `.skill.md` 内容粘贴到 Skills 面板。完成。

## 如何构建自己的 Skill

点击 **创作**。填写:

| 字段 | 必填 | 约束 |
|---|---|---|
| `name` | ✅ | 小写 + 连字符,≤64 字符 |
| `description` | ✅ | ≤1024 字符 |
| `allowed-tools` | 可选 | 每行一个工具名 |
| `version` | 可选 | 语义化版本(如 1.0.0) |
| `license` | 可选 | MIT、Apache-2.0 等 |

点击 **校验** 检查 YAML 合法性。合法后 **复制** 或 **下载** 文件。

## Claude Skills 规范参考

每个技能遵循此 YAML frontmatter 结构(Anthropic Skills v1.0):

```yaml
---
name: my-skill          # 必填:唯一 slug,小写 + 连字符
description: |          # 必填:何时使用此技能
  当用户询问 X 时使用。
  若 Y 则跳过。
allowed-tools:           # 可选:允许使用的工具列表
  - Read
  - Bash
version: 1.0.0          # 可选:语义化版本
license: MIT            # 可选
---

# My Skill

## When invoked
...

## Output format
...
```

## 常见问题

### Q1: 什么是 Claude Skill?

Claude Skill 是遵循 Anthropic Skills 框架的可复用指令包,包含 YAML frontmatter(name、description、allowed-tools、version、license)和 Markdown 正文。正文定义何时调用该技能以及输出格式。Skills 以 `.skill.md` 文件形式存储在 Claude Project 中。

### Q2: 如何把 Skill 安装到 Claude Projects?

打开 Claude Projects → 设置 → Skills → 点击 **Import** → 粘贴 `.skill.md` 内容(或拖入下载的文件)。技能会出现在项目技能库中。也可使用 **分享链接** 功能:打开带有 `#skill=<slug>` 的画廊链接,复制内容后粘贴到项目技能面板。

### Q3: Claude Skills 与 Custom GPTs 有什么区别?

Claude Skills 使用 Anthropic 原生 YAML+Markdown 框架,有正式的工具限制模型(allowed-tools)、版本字段和结构化调用模式。Custom GPTs(OpenAI)使用可视化构建器,无标准化技能格式,也无与 Claude allowed-tools 可比工具限制模型。Skills 面向开发者;Custom GPTs 面向终端用户。

### Q4: Claude Skill 的 YAML 必须有哪些字段?

只有两个必填字段:**`name`**(小写 slug,≤64 字符)和 **`description`**(≤1024 字符)。可选字段包括`allowed-tools`(工具名列表)、`version`(语义化版本字符串)和`license`(字符串)。YAML frontmatter 分隔符`---`之后的 Markdown 正文为自由格式。

### Q5: Claude Skill 能在不同 Projects 间共享吗?

可以。导出方式:下载 `.skill.md` 文件或使用 **分享链接** 哈希(`#skill=<id>`)。导入方式:把内容粘贴到任何其他 Claude Project 的技能面板。没有中心化技能库——技能存储在各个项目中。

## dlsome.top 同站工具

- [JSON-to-TypeScript 转换器](/zh/tools/json-to-typescript/) — 从 JSON Schema 生成 TypeScript 接口
- [YAML-JSON 转换器](/zh/tools/yaml-to-json/) — 校验并转换 YAML 为 JSON
- [JWT 检测器](/zh/tools/jwt-inspector/) — 解码并验证 JWT(HS256/RS256/ES256)
- [Cron 解析器](/zh/tools/cron-parser/) — 跨 4 平台解析 cron 表达式
- [AI Prompt Helper](/zh/tools/ai-prompt-helper/) — 带语气控制的多模板 Prompt 构建器
- [JSON Schema 校验器](/zh/tools/json-schema-validator/) — 用 JSON Schema 校验 JSON
- [JSONPath 测试器](/zh/tools/json-path-tester/) — 在线测试 JSONPath / JSONata / JMESPath 表达式,实时树视图 + 路径高亮

---

*最后更新:2026-08-11 · Claude Skills 模板库 · 基于 [Anthropic Skills v1.0](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Claude Skills Template Gallery",
  "description": "Browse, preview, copy, and customize 50+ Claude Skills templates for Anthropic Claude Projects and Claude Code.",
  "url": "https://dlsome.top/zh/tools/claude-skills-gallery/",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>

<!-- JSON-LD: FAQPage (5 questions) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "什么是 Claude Skill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Skill 是遵循 Anthropic Skills 框架的可复用指令包,包含 YAML frontmatter (name、description、allowed-tools、version、license) 和 Markdown 正文。正文定义何时调用该技能以及输出格式。Skills 以 .skill.md 文件形式存储在 Claude Project 中。"
      }
    },
    {
      "@type": "Question",
      "name": "如何把 Skill 安装到 Claude Projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "打开 Claude Projects → 设置 → Skills → Import → 粘贴 .skill.md 内容(或拖入文件)。技能会出现在项目技能库中。也可使用分享链接功能:打开带有 #skill=<slug> 的画廊链接,复制内容后粘贴到项目技能面板。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Skills 与 Custom GPTs 有什么区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Skills 使用 Anthropic 原生 YAML+Markdown 框架,有正式的工具限制模型(allowed-tools)、版本字段和结构化调用模式。Custom GPTs(OpenAI)使用可视化构建器,无标准化技能格式,也无与 Claude allowed-tools 可比工具限制模型。Skills 面向开发者;Custom GPTs 面向终端用户。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Skill 的 YAML 必须有哪些字段?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "只有两个必填字段:name (小写 slug,≤64 字符)和 description (≤1024 字符)。可选字段包括 allowed-tools (工具名列表)、version (语义化版本字符串)和 license (字符串)。YAML frontmatter 分隔符 --- 之后的 Markdown 正文为自由格式。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude Skill 能在不同 Projects 间共享吗?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "可以。导出方式:下载 .skill.md 文件或使用分享链接哈希(#skill=<id>)。导入方式:把内容粘贴到任何其他 Claude Project 的技能面板。没有中心化技能库——技能存储在各个项目中。"
      }
    }
  ]
}
</script>

<!-- JSON-LD: HowTo -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "如何从画廊安装 Claude Skill",
  "step": [
    {
      "@type": "HowToStep",
      "name": "按类别浏览",
      "text": "打开浏览标签,通过类别(代码工程、写作、数据、SEO、通用)筛选或用关键词搜索。"
    },
    {
      "@type": "HowToStep",
      "name": "预览 YAML",
      "text": "点击预览,使用代码或分屏标签查看任意技能的 YAML frontmatter 和 Markdown 正文。"
    },
    {
      "@type": "HowToStep",
      "name": "复制或下载",
      "text": "点击复制按钮将完整 .skill.md 复制到剪贴板,或点击下载保存为文件。"
    },
    {
      "@type": "HowToStep",
      "name": "粘贴到 Claude Projects",
      "text": "打开 Claude Projects → 设置 → Skills → Import → 粘贴内容。技能即可在项目中使用了。"
    }
  ]
}
</script>

<!-- JSON-LD: BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://dlsome.top/" },
    { "@type": "ListItem", "position": 2, "name": "工具", "item": "https://dlsome.top/zh/tools/" },
    { "@type": "ListItem", "position": 3, "name": "Claude Skills 模板库", "item": "https://dlsome.top/zh/tools/claude-skills-gallery/" }
  ]
}
</script>
