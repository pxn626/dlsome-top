---
title: "AI 图像提示词构造器 — SD/MJ/Flux/DALL-E"
description: "一键构造 SD / MJ / Flux / DALL-E 提示词。60+ 模板,4 大模型语法切换,负向词库,纯浏览器免费。"
slug: "ai-image-prompt-builder"
date: "2026-08-08T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "ai_image_prompt_builder"
url: "/zh/tools/ai-image-prompt-builder/"
tools:
  - "stable-diffusion"
  - "midjourney"
  - "flux"
  - "dall-e"
  - "ai-图像生成"
  - "提示词工程"
  - "负向词"
  - "浏览器工具"
  - "无需注册"
  - "免费"
categories:
  - "AI 工具"
  - "图像生成"
  - "开发者工具"
tags:
  - "ai-图像提示词"
  - "midjourney-提示词"
  - "stable-diffusion-提示词"
  - "flux-提示词"
  - "dall-e-提示词"
  - "负向词"
  - "提示词模板"
  - "图像生成"
  - "浏览器工具"
  - "无需注册"
keywords:
  - "AI 绘画提示词生成器"
  - "AI 生图提示词"
  - "Midjourney 提示词"
  - "Stable Diffusion 提示词"
  - "Flux 提示词"
  - "DALL-E 提示词"
  - "SD 负向词"
  - "AI 画图提示词"
og:
  title: "AI 图像提示词构造器 — 60+ 模板 (SD/MJ/Flux/DALL-E)"
  description: "一键构造 AI 绘画提示词。60+ 模板,4 大模型语法切换,负向词库,纯浏览器免费。"
  image: "/tools/ai-image-prompt-builder/img/og.png"
  image_alt: "AI 图像提示词构造器,60+ 模板,4 模型切换"
  type: "website"
  url: "https://dlsome.top/tools/ai-image-prompt-builder/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "AI 图像提示词构造器 — 60+ 模板"
  description: "SD/MJ/Flux/DALL-E 提示词一键构造,纯浏览器免费。"
  image: "/tools/ai-image-prompt-builder/img/og.png"
canonical: "https://dlsome.top/tools/ai-image-prompt-builder/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "BreadcrumbList"
  - "HowTo"
outputs:
  - html
  - json
---

{{< ai-image-prompt-builder >}}

# AI 图像提示词构造器 — SD / MJ / Flux / DALL-E

## TL;DR

免费、纯浏览器运行的 **Stable Diffusion / Midjourney v6 / Flux / DALL-E 3** 提示词构造器。从 **60+ 模板** 中选一个 (人物肖像 / 自然风景 / 产品电商 / 抽象艺术 / 标识品牌 / 界面线框),按 **5 维结构** 自定义 (主体 + 风格 + 光照 + 镜头 + 后期),一键切换 4 大模型语法,从 **40+ 负向词** 中选择要排除的瑕疵,6 种比例预设任选。**100% 客户端运行,无 API 调用,无需注册,数据不离开浏览器**。仅供参考, 各模型行为可能不同, 请以目标模型官方文档为准。

## 什么是 AI 图像提示词?

### 定义

**AI 图像提示词** 是驱动生成模型 (Stable Diffusion / Midjourney / Flux / DALL-E) 的文本描述。与普通自然语言不同, 一条结构化的提示词遵循 **5 维结构** — **主体 + 风格 + 光照 + 镜头 + 后期** — 在所有主流模型上都能稳定产出更高质量的图像。

### 为什么提示词很重要?

提示词质量是产出质量的**最大单一因素**。同一模型、同样的硬件, 两个创作者因提示词差异可以产出截然不同的结果。通用提示词 ("一只猫") 产出通用结果; 结构化提示词 ("虎斑猫, 影棚光, 85mm 镜头, f/1.4 虚化, 8K 超清") 产出专业级结果。

### 4 大模型对比

- **Stable Diffusion (SDXL / SD 1.5)** — 开源, 逗号分隔 token, 支持 `(权重)` 强调和 `Negative prompt:` 字段。最适合技术控制和 LoRA 微调。
- **Midjourney v6** — 自然语言友好, 支持 `--ar` `--v` `--s` `--stylize` `--style raw` 参数。最适合艺术 / 电影感产出。
- **Flux (Pro / Dev)** — 自然语言 + 句号分隔句子。最适合照片写实和文字渲染。
- **DALL-E 3 / GPT Image** — 对话式, 长描述句, **不支持负向词**。最适合精确指令遵循。

## 60 个模板 — 6 大场景

### 👤 人物肖像 (10 个模板)

`studio-portrait` · `outdoor-portrait` · `fashion-editorial` · `vintage-portrait` · `cyberpunk-character` · `anime-character` · `chibi-style` · `elderly-portrait` · `children-portrait` · `silhouette`

### 🏔️ 自然风景 (10 个模板)

`mountain-mist` · `ocean-sunset` · `forest-foggy` · `desert-dunes` · `aurora-night` · `waterfall-flowing` · `city-skyline` · `rural-village` · `tropical-beach` · `snow-glacier`

### 📦 产品电商 (10 个模板)

`white-bg-product` · `lifestyle-product` · `food-photography` · `jewelry-macro` · `car-commercial` · `fashion-flatlay` · `tech-gadget` · `perfume-bottle` · `furniture-interior` · `apparel-model`

### 🎨 抽象艺术 (10 个模板)

`geometric-pattern` · `fluid-art` · `fractal-art` · `generative-art` · `minimal-abstract` · `gradient-flow` · `op-art` · `cubist-style` · `surreal-collage` · `glitch-art`

### 🎯 标识品牌 (10 个模板)

`minimalist-logo` · `mascot-logo` · `wordmark-logo` · `emblem-logo` · `3d-logo` · `isometric-logo` · `vintage-logo` · `tech-logo` · `monogram` · `abstract-icon`

### 🖥️ 界面线框 (10 个模板)

`app-screen-mockup` · `dashboard-ui` · `wireframe-lowfi` · `landing-page` · `dark-mode-ui` · `glassmorphism-ui` · `neumorphism-ui` · `mobile-app-icon` · `web-error-page` · `settings-panel`

## 创作面板 — 构建你的提示词

### 主体 (文本输入)

自由文本描述主体对象。每个模板自带多语言默认主体和占位符,可直接修改或保留默认。Quality Gate 在主体为空时会自动回退到模板默认。

### 风格 (多选 chip)

每个模板 4–8 个风格选项 (照片写实 / 电影感 / 动漫 / 油画 / 赛博朋克 / 水彩 / 3D 渲染 / 像素风)。每个 chip 映射到模型专属关键词。

### 光照 (多选 chip)

影棚灯 / 柔光箱 / 轮廓光 / 低调光 / 高调光 / 黄金时刻 / 体积光 / 霓虹 / 阴天。光照对电影感产出至关重要 — 永远不要跳过。

### 镜头 (多选 chip)

85mm 镜头 / 50mm 定焦 / 广角 / 微距 / 鱼眼 / 移轴 / 航拍 / f/1.4 虚化 / 浅景深。镜头关键词对电影感产出的贡献比任何风格词都大。

### 后期 (多选 chip)

高细节 / 8K 超清 / RAW 照片 / 胶片颗粒 / HDR / 调色 / 去饱和。控制最终画质与美学感受。

## 模型适配 — 一键切换语法

### Stable Diffusion (SDXL / SD 1.5)

语法: `{主体}, {风格}, {光照}, {镜头}, {后期}` 用逗号连接。支持末尾追加 `Negative prompt:` 字段 (每行一个负向词)。

### Midjourney v6

语法: 自然语言 + `--ar <比例> --v 6 --s 250 --style raw` 参数。支持 `--no <关键词>` 表示负向词。比例参数自动追加。

### Flux (Pro / Dev)

语法: 句号分隔的自然句子。支持 `Avoid: <关键词>` (Flux Pro 完整支持; Flux Dev 仅基础否定)。

### DALL-E 3 / GPT Image

语法: 长描述句。**不支持负向词** — 切换到此模型时, UI 自动灰显负向词区, `buildPrompt()` 函数会从输出中剥离任何 `Avoid:` 或 `Negative prompt:` 行。

## 负向词 — 规避常见瑕疵

### 5 大分类 (40+ 预设短语)

- 🖐️ **解剖学 (10 项):** `手指多余` / `手部变形` / `解剖错误` / `多肢体` / `畸形` / `比例失调` / `缺手指` / `手指粘连` 等
- 🎨 **画质 (8 项):** `模糊` / `低质量` / `低分辨率` / `像素化` / `JPEG 伪影` / `噪点` / `质量最差` / `压缩伪影`
- 👁️ **面部 (8 项):** `眼睛错误` / `斜视` / `眼睛不对称` / `嘴部错误` / `多牙齿` / `面部变形` / `脸绘制差` / `脸突变`
- 🌀 **风格污染 (8 项):** `写实混入卡通` / `2D 混入 3D` / `水印` / `签名` / `文字` / `Logo 覆盖` / `用户名` / `网址`
- 🚫 **内容 (8 项):** `NSFW` / `暴力` / `恐怖` / `名人肖像` / `政治` / `宗教符号` / `武器` / `毒品`

### 自定义负向词

底部逗号分隔的文本框 — 自定义短语追加到预设选择后面。合成输出展示在 SD 的 `Negative prompt:` 字段、MJ 的 `--no` 参数或 Flux 的 `Avoid:` 行。Quality Gate 建议至少勾选 "解剖 + 画质" 入门组合。

## 比例预设

- **1:1 (方形)** — 朋友圈、头像
- **16:9 (宽屏)** — 桌面壁纸、YouTube 缩略图
- **9:16 (竖屏)** — 抖音 / 朋友圈视频号
- **4:3 (标准)** — 经典照片比例
- **3:2 (照片)** — 单反格式
- **21:9 (影院)** — 超宽屏, 电影场景

**模型行为说明:** MJ 支持全部 6 种比例; SDXL 支持其中 5 种 (部分 checkpoint 不支持 21:9); Flux 支持全部; DALL-E 3 仅支持 1:1 / 16:9 / 9:16 — 切换到 DALL-E 时 UI 会标记不支持的比例。

## 如何使用本工具

### 第一步 — 选择模板

点击左侧网格的任意**模板卡片**,或按类目筛选 (`全部` / `👤 人物` / `🏔️ 风景` / `📦 产品` / `🎨 抽象` / `🎯 Logo` / `🖥️ UI`)。模板区顶部搜索框支持按关键词检索。每张卡片显示模板名、emoji 与类目标签。

### 第二步 — 自定义字段

Composer 表单自动加载模板默认的主体 + 风格 / 光照 / 镜头 / 后期选项。编辑主体文本, 点击 chip 切换选项, 点击比例按钮切换比例。任一字段变化, 右侧输出实时更新 — 输出下方的 Quality Gate 面板显示模型信息、字符数与警告 (主体为空 / 未选负向词等)。

### 第三步 — 选择目标模型

点击顶部 **SD / MJ / Flux / DALL-E**。右侧输出切换为该模型专属语法, 含模型专属参数 (`--ar`, `--v 6`, `Negative prompt:` 等)。切换到 DALL-E 时, 负向词区自动禁用。

### 第四步 — 添加负向词

在 **负向词** 区, 点击任意短语切换。5 大分类覆盖解剖、画质、面部、风格污染、内容。自定义短语输入底部文本框。

### 第五步 — 复制 / 下载 / 分享

- **📋 复制** — 组装好的提示词 + 负向词区复制到剪贴板。
- **⬇ 下载 .txt** — 保存为 `<模型>-<模板>-<时间戳>.txt`。
- **🔗 分享 URL** — 把模板 ID + 自定义字段 + 模型编码进 URL 哈希 (`#prompt=<模板>&subject=<文本>&model=<模型>`)。打开链接在客户端还原精确状态 (无服务端)。

## 提示词工程最佳实践

### 5 维结构

每条好提示词都有 5 维: **主体** (是什么)、**风格** (看起来怎样)、**光照** (氛围)、**镜头** (摄影角度 / 焦距)、**后期** (最终画质)。任意一维缺失都会产出通用结果。Composer 在全部 60 个模板中强制这一结构。

### 权重语法 — SD vs MJ

- **Stable Diffusion:** `(关键词:1.3)` 强调; `[关键词:0.7]` 弱化。范围 0.0–2.0。
- **Midjourney v6:** `关键词::2` 强调; v6 滑块上限 1.5 (过权重会产生伪影)。
- **Flux / DALL-E:** 无权重语法 (仅自然语言)。

### 常见错误

1. **主体太模糊** — "一个人" vs "红发蓝眼带雀斑的年轻女性"。具体才出彩。
2. **关键词过载** — 30+ 关键词互相争抢注意力; 8–15 个是甜蜜点。
3. **风格冲突** — "照片写实" + "油画" + "像素风" 产出混乱。
4. **忽略镜头** — 镜头关键词 (`85mm f/1.4`) 对电影感产出的贡献比任何风格词都大。
5. **比例不匹配** — 竖屏主体配 16:9 会拉伸。比例要跟主体匹配。

### 迭代工作流

模板默认 → 调整主体 → 改 1–2 个 chip → 生成 → 看出错模式 → 加负向词定向排除 → 重复。3 轮迭代通常从通用提升到作品级。

## 实操示例

### 示例 1 — 影棚人像 (SD 语法)

模板 `studio-portrait`, 主体 "红发蓝眼带雀斑的年轻女性", 风格照片写实, 光照影棚柔光箱, 镜头 85mm f/1.4 虚化, 后期 8K 超清 RAW 照片, 负向词 解剖 + 画质。

输出:
```
红发蓝眼带雀斑的年轻女性, 照片写实, 影棚柔光箱, 85mm f/1.4 虚化, 8K 超清, RAW 照片
Negative prompt: 手指多余, 手部变形, 解剖错误, 多肢体, 畸形, 比例失调, 缺手指, 手指粘连, 模糊, 低质量, 低分辨率, 像素化, JPEG 伪影, 噪点, 质量最差, 压缩伪影
```

### 示例 2 — 雪山晨雾 (MJ 语法)

模板 `mountain-mist`, 主体 "黎明时分的雪峰", 风格电影感, 光照 黄金时刻 体积光, 镜头 航拍广角, 后期 HDR 调色, 比例 21:9。

输出:
```
雪峰在黎明时分, 电影感, 黄金时刻, 体积光, 航拍广角, HDR, 调色 --ar 21:9 --v 6 --s 250 --style raw --no 手指多余, 手部变形, 解剖错误, 多肢体, 畸形, 比例失调, 缺手指, 手指粘连, 模糊, 低质量
```

### 示例 3 — 极简 Logo (Flux 语法)

模板 `minimalist-logo`, 主体 "一颗咖啡豆", 风格 极简抽象, 光照 影棚, 镜头 微距, 后期 高细节。

输出:
```
极简风格的咖啡豆 Logo。极简抽象风格。影棚光照。微距镜头。高细节。白底。

Avoid: 手指多余, 手部变形, 解剖错误, 多肢体, 畸形, 比例失调, 缺手指, 手指粘连, 模糊, 低质量, 低分辨率, 像素化, JPEG 伪影, 噪点, 质量最差, 压缩伪影
```

### 示例 4 — 仪表盘 UI (DALL-E 语法)

模板 `dashboard-ui`, 主体 "一个带 4 个图表和侧栏导航的分析仪表盘", 风格 玻璃拟态 UI, 光照 深色模式, 后期 8K。

输出:
```
一个分析仪表盘 UI 模型, 带 4 个图表和侧栏导航。玻璃拟态 UI。深色模式 UI。影棚级 8K 渲染。正面。
```

### 示例 5 — 分享 URL

哈希: `#prompt=portrait-studio&subject=cat&model=mj&style=cinematic&lighting=studio&ratio=16:9`

打开构造器时自动还原: 模板 `studio-portrait`, 主体 "cat", 模型 Midjourney, 风格 cinematic, 光照 studio, 比例 16:9。纯哈希路由, 无服务端。

## 5 个常见问题

### Q1: 怎么写好 AI 绘画提示词?

用 **5 维结构**: 主体 + 风格 + 光照 + 镜头 + 后期。具体描述 (如 "红发雀斑年轻女性" 而非 "一个人")。8–15 个关键词是甜蜜点, 过多会互相争抢注意力。本构造器全部 60 个模板强制此结构, 选一个作为起点再迭代。

### Q2: AI 绘画提示词模板去哪里找?

本工具 **模板** 区提供 60+ 即用提示词, 覆盖 6 大场景 (人物 / 风景 / 产品 / 抽象 / Logo / UI)。点击任意卡片加载为当前模板, 然后自定义主体、风格、光照、镜头、后期字段。无需注册, 无 API 调用, 全部在浏览器内运行。数据文件是同源静态资源, **不会** 触碰任何 AI 服务。

### Q3: Midjourney 和 Stable Diffusion 提示词有什么区别?

**语法:** Stable Diffusion 用逗号分隔 token + `(权重)` 强调 + `Negative prompt:` 字段; Midjourney v6 用自然语言 + `--ar --v --s --stylize` 参数。**产出:** SD 偏技术控制 (LoRA / sampler / CFG); MJ 偏艺术 / 电影感。**负向词:** SD 支持完整列表; MJ 用 `--no <关键词>`。在本构造器切换模型 tab 看各模型精确语法。

### Q4: AI 绘画风格怎么选?

按场景匹配风格: **照片写实** 用于产品摄影和人像; **电影感** 用于叙事场景; **动漫** 用于角色; **油画** 用于古典和肖像; **赛博朋克** 用于科技和霓虹; **水彩** 用于柔和和插画。Composer 中的风格 chip 已按模板预标记, 先从那里开始, 再实验组合。避免混合 3+ 冲突风格 (如 照片写实 + 油画 + 像素风)。

### Q5: 什么是负向词 / negative prompt?怎么用?

负向词告诉模型**避免**什么。本工具预置 5 大分类 40+ 短语: **解剖学** (手指多余)、**画质** (模糊)、**面部** (眼睛错误)、**风格污染** (水印)、**内容** (NSFW)。SD 用 `Negative prompt:` 字段; MJ 用 `--no <关键词>`; Flux 用 `Avoid: <关键词>`; **DALL-E 不支持** (切换到 DALL-E 时 UI 自动灰显)。入门组合"解剖 + 画质"覆盖 80% 常见瑕疵。

## dlsome.top 同站工具

- [Claude Skills 模板库](/tools/claude-skills-gallery/) — 50+ Anthropic Skills YAML 模板 + Composer (与本工具组合使用, 编排结构化工作流)
- [AI Prompt Helper](/tools/ai-prompt-helper/) — 多模板文本 prompt 构造器, 带语气控制 (本工具的文本双胞胎)
- [JSON to TypeScript](/tools/json-to-typescript/) — 从 JSON 配置生成 TypeScript 接口 (导出本工具设置时使用)
- [YAML to JSON](/tools/yaml-to-json/) — 校验本工具产出的 YAML 模板
- [JWT 检测器](/tools/jwt-inspector/) — 解码验证 JWT (API 密钥相关 prompt 流程)
- [Cron 解析器](/tools/cron-parser/) — 解析 cron 表达式 (定时批量生图场景)
- [dlsome.top 首页](/) — 浏览 dlsome.top 全部开发者工具

---

*最后更新: 2026-08-08 · AI 图像提示词构造器 · 60 模板 · 4 模型 · 零网络请求承诺。*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Image Prompt Builder",
  "alternateName": "AI 图像提示词构造器",
  "description": "一键构造 Stable Diffusion / Midjourney / Flux / DALL-E 提示词。60+ 模板, 4 大模型语法切换, 负向词库, 纯浏览器端免费。",
  "url": "https://dlsome.top/tools/ai-image-prompt-builder/",
  "applicationCategory": "MultimediaApplication",
  "applicationSubCategory": "Image Generation Helper",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+).",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": [
    "60+ 提示词模板 (人像 / 风景 / 产品 / 抽象 / Logo / UI)",
    "4 大模型语法切换 (SD / MJ / Flux / DALL-E)",
    "5 大类负向词库 (40+ 短语)",
    "比例预设 (1:1 / 16:9 / 9:16 / 4:3 / 3:2 / 21:9)",
    "关键词权重调节",
    "复制 / 下载 / 分享 URL 导出",
    "100% 浏览器端 — 零 AI API 调用"
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
      "name": "怎么写好 AI 绘画提示词?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "用 5 维结构: 主体 + 风格 + 光照 + 镜头 + 后期。具体描述 (如 '红发雀斑年轻女性' 而非 '一个人')。8–15 个关键词是甜蜜点, 过多会互相争抢注意力。本构造器全部 60 个模板强制此结构, 选一个作为起点再迭代。"
      }
    },
    {
      "@type": "Question",
      "name": "AI 绘画提示词模板去哪里找?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本工具'模板'区提供 60+ 即用提示词, 覆盖 6 大场景 (人物 / 风景 / 产品 / 抽象 / Logo / UI)。点击任意卡片加载为当前模板, 然后自定义主体、风格、光照、镜头、后期字段。无需注册, 无 API 调用, 全部在浏览器内运行。数据文件是同源静态资源, 不会触碰任何 AI 服务。"
      }
    },
    {
      "@type": "Question",
      "name": "Midjourney 和 Stable Diffusion 提示词有什么区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "语法: Stable Diffusion 用逗号分隔 token + (权重) 强调 + Negative prompt: 字段; Midjourney v6 用自然语言 + --ar --v --s --stylize 参数。产出: SD 偏技术控制 (LoRA / sampler / CFG); MJ 偏艺术 / 电影感。负向词: SD 支持完整列表; MJ 用 --no <关键词>。在本构造器切换模型 tab 看各模型精确语法。"
      }
    },
    {
      "@type": "Question",
      "name": "AI 绘画风格怎么选?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "按场景匹配风格: 照片写实用于产品摄影和人像; 电影感用于叙事场景; 动漫用于角色; 油画用于古典和肖像; 赛博朋克用于科技和霓虹; 水彩用于柔和和插画。Composer 中的风格 chip 已按模板预标记, 先从那里开始, 再实验组合。避免混合 3+ 冲突风格。"
      }
    },
    {
      "@type": "Question",
      "name": "什么是负向词 / negative prompt?怎么用?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "负向词告诉模型避免什么。本工具预置 5 大分类 40+ 短语: 解剖学 (手指多余)、画质 (模糊)、面部 (眼睛错误)、风格污染 (水印)、内容 (NSFW)。SD 用 Negative prompt: 字段; MJ 用 --no <关键词>; Flux 用 Avoid: <关键词>; DALL-E 不支持 (切换到 DALL-E 时 UI 自动灰显)。入门组合'解剖 + 画质'覆盖 80% 常见瑕疵。"
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
  "name": "如何构建 AI 图像提示词",
  "description": "为 Stable Diffusion / Midjourney / Flux / DALL-E 构建结构化提示词的分步指南。",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "选择模板",
      "text": "从 6 大场景 (人物 / 风景 / 产品 / 抽象 / Logo / UI) 中选一个, 模板区共 60+ 个。点击任意卡片加载为当前模板。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "自定义主体 + 风格 + 光照 + 镜头 + 后期",
      "text": "编辑主体文本, 勾选风格 / 光照 / 镜头 / 后期 chip。任一字段变化, 右侧预览实时更新。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "选择目标模型",
      "text": "在顶部 SD / MJ / Flux / DALL-E 之间切换, 每个模型有专属语法模板 (如 MJ 加 --ar --v --s 参数, SD 用 Negative prompt 字段)。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "添加负向词",
      "text": "勾选 5 大分类 (解剖 / 画质 / 面部 / 风格污染 / 内容), 共 40+ 预设负向短语。自定义短语通过文本框追加。DALL-E 禁用此区。"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "导出",
      "text": "复制到剪贴板、下载为 .txt 文件, 或通过 URL 哈希分享 (#prompt=<模板>&subject=<文本>&model=<sd|mj|flux|dalle>)。分享链接在客户端还原精确状态, 无服务端。"
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
    { "@type": "ListItem", "position": 1, "name": "首页", "item": "https://dlsome.top/" },
    { "@type": "ListItem", "position": 2, "name": "工具", "item": "https://dlsome.top/tools/" },
    { "@type": "ListItem", "position": 3, "name": "AI 图像提示词构造器", "item": "https://dlsome.top/tools/ai-image-prompt-builder/" }
  ]
}
</script>