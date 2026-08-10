---
title: "LLM Token 成本计算器 — 13 模型对比"
description: "LLM Token 成本计算器。对比 GPT-4o / Claude / Gemini / DeepSeek / 通义千问价格,美元人民币切换,月度成本预估,Anthropic 缓存节省。无需注册。"
slug: "llm-token-cost-estimator"
date: "2026-08-10T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "llm_token_cost_estimator"
url: "/zh/tools/llm-token-cost-estimator/"
tools:
  - "openai"
  - "anthropic"
  - "google-gemini"
  - "deepseek"
  - "通义千问"
  - "智谱-glm"
  - "meta-llama"
  - "llm-api"
  - "成本计算器"
  - "prompt-caching"
  - "浏览器工具"
  - "无需注册"
  - "免费"
categories:
  - "AI 工具"
  - "开发者工具"
  - "成本计算器"
tags:
  - "llm-成本"
  - "gpt-4o-价格"
  - "claude-价格"
  - "gemini-价格"
  - "deepseek-价格"
  - "通义千问-价格"
  - "anthropic-缓存"
  - "成本对比"
  - "月度成本"
  - "浏览器工具"
keywords:
  - "LLM token 成本计算器"
  - "GPT-4o 价格"
  - "Claude API 成本"
  - "DeepSeek 价格 对比 GPT"
  - "通义千问 价格"
  - "智谱 GLM 定价"
  - "Anthropic 缓存 节省"
og:
  title: "LLM Token 成本计算器 — 13 模型对比"
  description: "对比 GPT-4o、Claude、Gemini、DeepSeek、通义千问 API 价格。美元人民币切换、月度成本预估、Anthropic 缓存节省。"
  image: "/tools/llm-token-cost-estimator/img/og.png"
  image_alt: "LLM Token 成本计算器,13 模型同表对比"
  type: "website"
  url: "https://dlsome.top/zh/tools/llm-token-cost-estimator/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "LLM Token 成本计算器 — 13 模型"
  description: "GPT-4o vs Claude vs Gemini vs DeepSeek API 价格对比。无需注册。"
  image: "/tools/llm-token-cost-estimator/img/og.png"
canonical: "https://dlsome.top/zh/tools/llm-token-cost-estimator/"
---

{{< llm-token-cost-estimator >}}

# LLM Token 成本计算器 — 13 模型同表对比

## TL;DR

一款**纯浏览器**的 LLM API 成本计算器,实时对比 **13 个主流模型**(OpenAI / Anthropic / Google / DeepSeek / 通义千问 / 智谱 GLM / Meta Llama)的**每百万 token 价格**。输入平均 input / output tokens,勾选模型,即可看到按"**最便宜→最贵**"排序的对比表格。支持**美元/人民币**切换、**月度与年度**成本预估、**Anthropic Prompt Caching 节省**计算。所有计算在浏览器端完成 — **无需注册, 无 API 调用, 数据不出本地设备**。价格数据来源各厂商官方定价页,顶部 banner 显示"最后更新: YYYY-MM-DD"。

## 什么是 LLM Token 成本计算器?

### 定义

**LLM Token 成本计算器**是一款工具,给定一个模型的每 token 定价 + 你预期的 input/output token 量,计算出**单次 API 调用的实际美元/人民币成本**(或一批调用的总成本)。它超越了官方定价页上仅显示的"每 token 单价"——这一数字并不是大多数开发者在做决策时实际参照的数字——通过组合三方面:**模型定价、工作负载形态(input-heavy vs output-heavy)、调用量(日 / 月 / 年)**。

### 为什么不同模型价差巨大

同样的 1000 token 输入 + 500 token 输出,在 **GPT-4o** 上 **$0.0075**,**Claude Sonnet 4.5** 上 **$0.013**,**DeepSeek V3** 上 **$0.00048**,**Gemini 2.0 Flash** 上 **$0.0005**。主流 API 中**最便宜和最贵之间价差达 ~30 倍**(截至 2026-08)。本工具让你无需访问 10+ 个定价页就能同表看到全部。

### 本工具**不做**什么

本工具用于**估算, 非计费**。**不调用任何 LLM API**,无法访问你的真实账单,不考虑企业折扣、定制合同或量级分层。做预算决策前,请永远与你的服务商的计费仪表盘交叉核对。

## 如何使用本计算器

### 第一步 — 选择模型

勾选想要对比的**模型 chip**。默认预选 **5 个**(Claude Sonnet 4.5 / GPT-4o / Gemini 2.0 Flash / DeepSeek V3 / Qwen Turbo)— 覆盖典型的跨厂商对比场景。点"**全选**"启用全部 13 个,"**清空**"重置。

### 第二步 — 输入 Token 数

两个大号数字输入框:**Input tokens** + **Output tokens**,每次调用。默认值 **1,000 / 500**(典型对话场景)。快速按钮(**+1K / +10K / +100K**)方便处理长 prompt。或用底部的 **Token 估算辅助** 粘贴 prompt 文本获得粗略估算。

### 第三步 — 查看对比表格

右侧面板**实时更新**。最便宜一行**绿色高亮 + 🏆 角标**。点击任一行展开明细(Anthropic 的 cache 费用 / OpenAI 与 Anthropic 的 batch 折扣 / Llama 自托管估算)。

### 第四步 — 设置调用量(可选,在"高级设置"中)

点击输入区底部的"**高级设置**"。输入**日均 API 调用次数**(默认 100),底部三张大卡片自动计算:**单次成本 / 月度成本 / 年度成本**。

### 第五步 — 美元 ⇄ 人民币切换

"高级设置" 中切换 **USD ($)** / **CNY (¥)**。默认汇率 **1 USD = 7.20 CNY** — 用户**可手动改**。默认值**故意不 fetch 任何 API**(零网络承诺);实际交易以你的支付通道汇率为准。

### 第六步 — Anthropic 缓存(可选)

若勾选了 Anthropic 模型(Sonnet 4.5 / Haiku 4.5 / Opus 4.1),**Cache 面板自动展开**。输入**缓存命中率**(input tokens 中命中 cache 的百分比)+ 选 TTL(**5 分钟默认** / **1 小时** — 2× write cost)。Cache ROI 区显示对比 no-cache 的月度节省。

## 价格口径与数据来源

### 单位约定

所有价格以 **USD per 1,000,000 tokens**(即"每 1M tokens 几美元")为单位。这是每个官方定价页都使用的单位 — 计算器内部保持此单位以保证精度,然后再转换为你选的显示货币。

### 数据来源

价格取自各厂商官方定价页:

- **OpenAI**: <https://openai.com/api/pricing/>
- **Anthropic**: <https://www.anthropic.com/pricing>
- **Google Gemini**: <https://ai.google.dev/pricing>
- **DeepSeek**: <https://api-docs.deepseek.com/quick_start/pricing>
- **通义千问 (阿里云)**: <https://help.aliyun.com/zh/model-studio/getting-started/models>
- **智谱 GLM**: <https://open.bigmodel.cn/pricing>
- **Meta Llama**: 自托管,价格随 host 而变 — 标注为 "Self-hosted: varies"

顶部"**价格最后更新: YYYY-MM-DD**" banner 显示 JSON 数据文件最近刷新时间。若访问距该日期超过 60 天,banner 转黄色软提示。

### JSON 中包含什么

每条模型记录包含:

- `inputPrice` / `outputPrice` — 基础 per-1M 价格
- `cacheWritePrice` / `cacheReadPrice` — 仅 Anthropic(其他为 null)
- `batchInputPrice` / `batchOutputPrice` — 比 real-time 便宜 50%,异步 24h
- `contextWindow` — 单次调用最大 tokens
- `tier` — flagship / mini / reasoning / self_hosted

### 刷新频率

定价数据 **每月** 由 main agent 手动刷新(cron 风格)。服务商定价通常每 3–6 月调整一次 — 期间可点 UI 中 model chip 旁的来源 URL 在厂商官网核对。

## 模型对比: GPT-4o vs Claude vs Gemini vs DeepSeek

### 价格快照表 (2026-08)

| 模型 | 厂商 | 输入 $/M | 输出 $/M | 最适合 |
|---|---|---|---|---|
| Gemini 2.0 Flash | Google | 0.10 | 0.40 | 超廉价批量调用 |
| DeepSeek V3 | DeepSeek | 0.14 | 0.28 | 最便宜长上下文 |
| GPT-4o mini | OpenAI | 0.15 | 0.60 | OpenAI 生态, 低量 |
| Qwen Turbo | 阿里云 | 0.30 | 0.60 | 中文场景, 低成本 |
| DeepSeek R1 | DeepSeek | 0.55 | 2.19 | 推理, 便宜 |
| Claude Haiku 4.5 | Anthropic | 1.00 | 5.00 | 快速 Anthropic, 中价 |
| Gemini 1.5 Pro | Google | 1.25 | 5.00 | 长上下文 (1M tokens) |
| GPT-4o | OpenAI | 2.50 | 10.00 | 通用多模态旗舰 |
| Claude Sonnet 4.5 | Anthropic | 3.00 | 15.00 | 编程 + 推理旗舰 |
| GLM-4-Plus | 智谱 | 7.00 | 7.00 | 中文推理 |
| o3-mini | OpenAI | 1.10 | 4.40 | 推理, 中价 |
| o3 | OpenAI | 10.00 | 40.00 | 推理, 旗舰 |
| Claude Opus 4.1 | Anthropic | 15.00 | 75.00 | 顶级 Anthropic |
| Llama 3.1 405B *(自托管)* | Meta | varies | varies | 自托管: 随 host 变 |

### 从最便宜到最贵排序

1,000 token input + 500 token output:

- **最便宜**: Gemini 2.0 Flash ≈ $0.0003
- **+9 倍**: DeepSeek V3 ≈ $0.0005
- **+15 倍**: GPT-4o mini ≈ $0.0005(并列)
- **最贵**: Claude Opus 4.1 ≈ $0.0525(比最贵 ~150 倍)

用计算器看到你的工作负载下的实时排序。

### 何时选哪个(成本 vs 能力矩阵)

- **最便宜无脑**: DeepSeek V3 / Gemini Flash — 用于批量分类、embeddings-lite 场景
- **OpenAI 生态**: GPT-4o mini(低量);GPT-4o(多模态 / 视觉)
- **Anthropic 生态**: Sonnet 4.5(编程 / 推理);≥40% 命中率时启用 prompt caching
- **长上下文**(≥500K tokens): Gemini 1.5 Pro 或自托管 Llama 3.1 405B
- **中文场景**: Qwen Turbo(最便宜)或 GLM-4-Plus(更强推理)

## OpenAI、Anthropic、Google、DeepSeek 价格细分

### OpenAI (4 个模型)

- **GPT-4o**: $2.50/M 输入 + $10/M 输出 — 多模态旗舰, 128K 上下文
- **GPT-4o mini**: $0.15/M 输入 + $0.60/M 输出 — 便宜 17 倍, 128K 上下文
- **o3**: $10/M 输入 + $40/M 输出 — 推理旗舰
- **o3-mini**: $1.10/M 输入 + $4.40/M 输出 — 推理入门

### Anthropic (3 个模型 + cache)

- **Claude Sonnet 4.5**: $3/M 输入 + $15/M 输出 + cache_write $3.75 + cache_read $0.30
- **Claude Haiku 4.5**: $1/M 输入 + $5/M 输出 + cache_write $1.25 + cache_read $0.10
- **Claude Opus 4.1**: $15/M 输入 + $75/M 输出 + cache_write $18.75 + cache_read $1.50

### Google (2 个模型)

- **Gemini 2.0 Flash**: $0.10/M 输入 + $0.40/M 输出 — 主流 API 最便宜
- **Gemini 1.5 Pro**: $1.25/M 输入 + $5/M 输出 — 1M token 上下文窗口

### DeepSeek (2 个模型)

- **DeepSeek V3**: $0.14/M 输入 + $0.28/M 输出 — 比 GPT-4o 便宜 ~18 倍
- **DeepSeek R1**: $0.55/M 输入 + $2.19/M 输出 — 推理, 有竞争力

### 中国厂商 (2 个模型)

- **Qwen Turbo**(阿里云): $0.30/M 输入 + $0.60/M 输出 — 最便宜中国 API
- **GLM-4-Plus**(智谱): $7/M 输入 + $7/M 输出 — 等比定价, 强推理

### Meta Llama (1 条, 自托管)

- **Llama 3.1 405B**: input/output 价格 **null**(自托管);等效成本因 host 而异(AWS p5 ≈ $32/小时 → ~$0.001/1M tokens 等效)— 见计算器"高级设置"中的"自定义价格"选项手动覆盖

## 月度与年度成本预估

### 公式拆分

- **单次成本** = `(input/1M × input_price) + (output/1M × output_price)` [ + cache 组件 若 Anthropic + cache 命中 ]
- **月度成本** = `单次 × 日均调用 × 30`
- **年度成本** = `单次 × 日均调用 × 365`
- **年度节省** = `(最贵模型年度 - 最便宜模型年度)` 跨所选模型

### 算例

1,000 input + 500 output tokens, 100 calls/day:

- **GPT-4o**: $0.0075/次 → **$22.50/月** → **$273.75/年**
- **DeepSeek V3**: $0.00048/次 → **$1.44/月** → **$17.52/年**
- 切换 GPT-4o → DeepSeek V3 节省: **~$256/年**

三张成本卡片下方的"节省"卡片自动展示你勾选的最贵与最便宜模型的差额。

## Anthropic Prompt Caching 成本节省

### Cache 定价解读

Anthropic 对缓存 token 收 **3 种不同价格**:

- **Cache write**(1.25× 基础输入): cache 首次创建或刷新时一次性付费
- **Cache read**(0.1× 基础输入): 每次 cache 命中时付费
- **TTL 选择**: 5 分钟(默认)或 1 小时(2× cache_write 成本)

如果你的 prompt 有 **80% 缓存命中率**(例如系统 prompt + RAG 上下文在多次调用间复用),**有效输入成本从 $3/M 降至 ~$0.84/M**(假设 write 成本摊销到大量 read — 见工具内 disclaimer)。

### 80% 缓存命中率算例 (Sonnet 4.5)

- 1,000 input, 500 output, 100 calls/天
- **无 cache**: $0.0105/次 → **$31.50/月**
- **80% cache(摊销简化版)**: ~$0.0083/次 → **~$25.02/月**
- **节省: ~$6.48/月, ~$78/年**

实际节省取决于你的真实命中率 — 在 Cache 面板调滑块看实时数字。

### 保本缓存命中率

针对 Sonnet 4.5: 缓存命中率高于 **~30%** 时,启用 cache 开始省钱。工具根据你实际 input 量显示保本率。

### Cache TTL (5 分钟 vs 1 小时)

- **5 分钟**(默认): 标准 cache_write 成本 — 短窗口复用(对话场景)
- **1 小时**(2× cache_write 成本): 长窗口复用(每日批处理)— 仅在 read 数 > ~50/次 write 时划算

## 美元 ⇄ 人民币汇率换算

### 默认汇率 (7.20)

默认汇率 **1 USD = 7.20 CNY**,约 2026 Q3 水平。这是**参考值非实时汇率** — 我们刻意不 fetch 实时汇率(零网络承诺)。

### 自定义汇率

若你的实际交易使用不同汇率(Wise / Stripe / PayPal 都略有不同),在"高级设置"覆盖输入框。换算因子在内部全程使用,UI 即时更新。

### 免责声明

显示的汇率仅供参考。实际交易以你的支付通道结算汇率为准,可能含费。本工具用于估算,非开票。

## 隐私与数据免责

### 零网络请求

本工具**不调用任何 AI API, 不向任何服务端发送你的输入**。所有计算都在浏览器端完成。价格数据 JSON 在页面加载时一次性从同源静态 `/data/pricing.json` 文件 fetch。

### 无注册, 无 Cookie, 无 localStorage

- 无账户
- 无 Cookie
- 无 localStorage(你的输入不会在刷新间保留)

### 价格仅供参考

价格在 `lastUpdated` 字段时间(顶部 banner 显示)通过官方源核实。服务商定价可能随时更改。做关键定价决策时,在各服务商官网核对。

## 常见问题 (FAQ)

### Q1. GPT-4o 每 1M tokens 多少钱?

GPT-4o 价格 **$2.50 / 1M 输入 tokens** 和 **$10.00 / 1M 输出 tokens**(截至 2026-08)。典型 1,000 token prompt + 500 token 响应,为 $0.0025 + $0.005 = **$0.0075 / 次**(0.75 美分)。1,000 次/天,月度成本 = $225。GPT-4o mini 更便宜,$0.15/M 输入 + $0.60/M 输出 — 便宜约 17 倍。用上方的计算器对比 GPT-4o 与 Claude Sonnet、Gemini Flash、DeepSeek V3 等模型。

### Q2. 2026 年最便宜的 LLM API 是哪个?

截至 2026 年 8 月,最便宜的主流 API:① **DeepSeek V3** $0.14/M 输入 + $0.28/M 输出(比 GPT-4o 便宜约 18 倍)② **Gemini 2.0 Flash** $0.10/M 输入 + $0.40/M 输出 ③ **Mistral Small** $0.20/M 输入 + $0.60/M 输出 ④ **GPT-4o mini** $0.15/M 输入 + $0.60/M 输出。注意价格不是唯一因素 — DeepSeek 在非中文工作负载上延迟较高,Gemini Flash 有更紧的速率限制。本计算器可勾选/取消所有模型,找到你的工作负载下最佳性价比。

### Q3. Claude 比 GPT-4o 便宜吗?

**不便宜,典型工作负载 Claude 比 GPT-4o 贵约 4 倍**(截至 2026-08)。Claude Sonnet 4.5 价格 $3/M 输入 + $15/M 输出,GPT-4o 是 $2.50/M 输入 + $10/M 输出。但 Claude 提供 **prompt caching**,对重复 prompt 可将有效输入成本降低多达 90%。80% 缓存命中率下,Claude 有效输入成本降至 ~$0.60/M — 比 GPT-4o 还便宜。本计算器包含 Anthropic cache 节省面板,自动计入你的缓存命中率。上方设置缓存命中率 = 80% 试试真实成本。

### Q4. 怎么估算月度 LLM API 账单?

公式:**(平均 input tokens × input price + 平均 output tokens × output price) × 日均调用 × 30**。例如:2,000 input + 500 output tokens / 次 × 500 次/天 × 30 天 = 30M input + 7.5M output tokens / 月。GPT-4o:30 × $2.50 + 7.5 × $10 = $75 + $75 = **$150 / 月**。DeepSeek V3 同样工作负载:30 × $0.14 + 7.5 × $0.28 = $4.20 + $2.10 = **$6.30 / 月**(便宜 24 倍)。用上方"月度成本"面板,输入你的日均调用次数看精确数字。

### Q5. Anthropic Prompt Caching 真的省钱吗?

**是的,显著省钱 — 重复 prompt 的输入成本可降多达 90%。** Anthropic 对 cache 写入收 $3.75/M(1.25× 基础),cache 读取只收 $0.30/M(0.1× 基础)。若你的 prompt 有 80% 缓存命中率(比如系统 prompt + RAG 上下文被复用),有效输入成本从 $3/M 降至约 $0.60/M。1M 缓存 tokens / 月,即 $3,000 → $600 = **月节省 $2,400**。上方 cache 面板根据你的缓存命中率和 prompt 大小显示精确节省。注意:cache TTL 可选 5 分钟(默认)或 1 小时(扩展,写成本 2 倍)。

### Q6. 生产环境该用 OpenAI 还是 Anthropic?

取决于 3 个因素:① **成本** — 非缓存工作负载 GPT-4o 比 Claude Sonnet 4.5 便宜 20%,但启用 cache 后 Claude 反超 ② **能力** — Claude Sonnet 4.5 在编程 / 推理 benchmark 上更高(SWE-bench 70%+);GPT-4o 在多模态 / 视觉上更快 ③ **延迟** — GPT-4o mini TTFT ~300ms;Claude Sonnet ~500ms;DeepSeek V3 ~800ms。用本计算器根据你的特定 token 量对比成本,再权衡能力和延迟。成本敏感的高量工作负载,**DeepSeek V3 + GPT-4o mini** 是 2026 年的典型组合。

## 相关 AI 与开发者工具

- **[AI 图像提示词构造器](/zh/tools/ai-image-prompt-builder/)** — 一键构造 SD/MJ/Flux/DALL-E 提示词(本工具的"输出侧"孪生 — 估算 prompt 成本 + 图像生成成本)
- **[Claude Skills 模板库](/zh/tools/claude-skills-gallery/)** — 50+ Anthropic Skills YAML 模板(与本工具的 Anthropic cache ROI 功能天然配对)
- **[JSON Schema 校验器](/zh/tools/json-schema-validator/)** — 校验 JSON schema(在校验 pricing.json 更新时有用)
- **[Markdown Slug 生成器](/zh/tools/markdown-slug-generator/)** — slug 化标题(构建自己的成本计算器时,复用 Skill IDs)
- **[dlsome.top 首页](/zh/)** — 浏览 dlsome.top 全部开发者工具

## 免责声明

价格仅供参考 — 数据来源: 官方服务商定价页(见 §价格口径与数据来源)。价格变动频繁(各服务商平均 3–6 个月调整一次);做预算决策前在各服务商官网核对。本工具不调用任何 LLM API,无法访问你的账单数据。所有计算浏览器端完成。工具与任何 LLM 服务商无关联。

---

*最后更新: 2026-08-10 · LLM Token 成本计算器 · 13 模型 · 零网络请求承诺。*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LLM Token 成本计算器",
  "alternateName": "LLM Token Cost Calculator",
  "description": "免费 LLM token 成本计算器 — 对比 GPT-4o / Claude / Gemini / DeepSeek / 通义千问 价格,支持美元/人民币切换、月度成本预估、Anthropic 缓存节省计算。无需注册。",
  "url": "https://dlsome.top/zh/tools/llm-token-cost-estimator/",
  "applicationCategory": "FinanceApplication",
  "applicationSubCategory": "API Cost Calculator",
  "operatingSystem": "Any (Web Browser)",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+).",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "13 个 LLM 模型 (OpenAI / Anthropic / Google / DeepSeek / 通义千问 / GLM / Meta Llama)",
    "多模型同表成本对比 (实时按最便宜排序)",
    "USD ⇄ CNY 双汇率切换 (默认 7.20,用户可手动改)",
    "基于日均调用次数的月度 / 年度成本预估",
    "Anthropic Prompt Caching ROI 计算 (支持缓存命中率 + TTL)",
    "Token 估算辅助 (粘贴文本 → 粗略 token 数 + disclaimer)",
    "零网络请求 (纯浏览器, 无需注册, 无 AI API 调用)"
  ]
}
</script>

<!-- JSON-LD: FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "zh-CN",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "GPT-4o 每 1M tokens 多少钱?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPT-4o 价格 $2.50 / 1M 输入 tokens 和 $10.00 / 1M 输出 tokens (截至 2026-08)。典型 1,000 token prompt + 500 token 响应, 为 $0.0025 + $0.005 = $0.0075 / 次 (0.75 美分)。1,000 次/天, 月度成本 = $225。GPT-4o mini 更便宜, $0.15/M 输入 + $0.60/M 输出 — 便宜约 17 倍。用上方的计算器对比 GPT-4o 与 Claude Sonnet、Gemini Flash、DeepSeek V3 等模型。"
      }
    },
    {
      "@type": "Question",
      "name": "2026 年最便宜的 LLM API 是哪个?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "截至 2026 年 8 月, 最便宜的主流 API: DeepSeek V3 $0.14/M 输入 + $0.28/M 输出 (比 GPT-4o 便宜约 18 倍); Gemini 2.0 Flash $0.10/M 输入 + $0.40/M 输出; Mistral Small $0.20/M 输入 + $0.60/M 输出; GPT-4o mini $0.15/M 输入 + $0.60/M 输出。注意价格不是唯一因素 — DeepSeek 在非中文工作负载上延迟较高, Gemini Flash 有更紧的速率限制。本计算器可勾选/取消所有模型, 找到你的工作负载下最佳性价比。"
      }
    },
    {
      "@type": "Question",
      "name": "Claude 比 GPT-4o 便宜吗?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不便宜, 典型工作负载 Claude 比 GPT-4o 贵约 4 倍 (截至 2026-08)。Claude Sonnet 4.5 价格 $3/M 输入 + $15/M 输出, GPT-4o 是 $2.50/M 输入 + $10/M 输出。但 Claude 提供 prompt caching, 对重复 prompt 可将有效输入成本降低多达 90%。80% 缓存命中率下, Claude 有效输入成本降至 ~$0.60/M — 比 GPT-4o 还便宜。本计算器包含 Anthropic cache 节省面板, 自动计入你的缓存命中率。上方设置缓存命中率 = 80% 试试真实成本。"
      }
    },
    {
      "@type": "Question",
      "name": "怎么估算月度 LLM API 账单?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "公式: (平均 input tokens × input price + 平均 output tokens × output price) × 日均调用 × 30。例如: 2,000 input + 500 output tokens / 次 × 500 次/天 × 30 天 = 30M input + 7.5M output tokens / 月。GPT-4o: 30 × $2.50 + 7.5 × $10 = $75 + $75 = $150 / 月。DeepSeek V3 同样工作负载: 30 × $0.14 + 7.5 × $0.28 = $4.20 + $2.10 = $6.30 / 月 (便宜 24 倍)。用上方\"月度成本\"面板, 输入你的日均调用次数看精确数字。"
      }
    },
    {
      "@type": "Question",
      "name": "Anthropic Prompt Caching 真的省钱吗?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "是的, 显著省钱 — 重复 prompt 的输入成本可降多达 90%。Anthropic 对 cache 写入收 $3.75/M (1.25× 基础), cache 读取只收 $0.30/M (0.1× 基础)。若你的 prompt 有 80% 缓存命中率 (比如系统 prompt + RAG 上下文被复用), 有效输入成本从 $3/M 降至约 $0.60/M。1M 缓存 tokens / 月, 即 $3,000 → $600 = 月节省 $2,400。上方 cache 面板根据你的缓存命中率和 prompt 大小显示精确节省。注意: cache TTL 可选 5 分钟 (默认) 或 1 小时 (扩展, 写成本 2 倍)。"
      }
    },
    {
      "@type": "Question",
      "name": "生产环境该用 OpenAI 还是 Anthropic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "取决于 3 个因素: 成本 — 非缓存工作负载 GPT-4o 比 Claude Sonnet 4.5 便宜 20%, 但启用 cache 后 Claude 反超; 能力 — Claude Sonnet 4.5 在编程 / 推理 benchmark 上更高 (SWE-bench 70%+); GPT-4o 在多模态 / 视觉上更快; 延迟 — GPT-4o mini TTFT ~300ms; Claude Sonnet ~500ms; DeepSeek V3 ~800ms。用本计算器根据你的特定 token 量对比成本, 再权衡能力和延迟。成本敏感的高量工作负载, DeepSeek V3 + GPT-4o mini 是 2026 年的典型组合。"
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
  "inLanguage": "zh-CN",
  "name": "如何对比 LLM API 成本",
  "description": "使用 dlsome.top LLM Token 成本计算器对比 13 个模型 API 成本的分步指南。",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "选择模型",
      "text": "勾选想要对比的模型 chip (默认预选 5 个: Sonnet 4.5 / GPT-4o / Gemini 2.0 Flash / DeepSeek V3 / Qwen Turbo)。点\"全选\"启用全部 13 个, 或\"清空\"重置。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "输入 Token 数",
      "text": "输入平均输入 tokens 和输出 tokens / 次 (默认 1000 / 500)。用 +1K / +10K / +100K 快捷按钮, 或底部 Token 估算辅助粘贴 prompt 文本获得粗略估算。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "查看成本对比",
      "text": "右侧面板实时更新。最便宜一行绿色高亮 + 🏆 角标。用\"高级设置\"设置日均调用次数 (用于月度 / 年度成本卡片) 和 USD / CNY 切换。若勾选 Anthropic 模型, Cache 面板自动展开配置缓存命中率。"
    }
  ]
}
</script>

<!-- JSON-LD: BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "inLanguage": "zh-CN",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://dlsome.top/zh/" },
    { "@type": "ListItem", "position": 2, "name": "工具", "item": "https://dlsome.top/zh/tools/" },
    { "@type": "ListItem", "position": 3, "name": "LLM Token 成本计算器", "item": "https://dlsome.top/zh/tools/llm-token-cost-estimator/" }
  ]
}
</script>