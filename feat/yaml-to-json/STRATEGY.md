# YAML to JSON Converter — SEO 策略文档

> **工具名:** YAML to JSON Converter
> **slug:** `yaml-to-json`
> **文件位置:** `content/tools/yaml-to-json.md`
> **shortcode:** `layouts/shortcodes/yaml-to-json.html`
> **主站方向:** dlsome.top — AI + devtools 混合(独立开发者品牌)
> **目标市场:** 开发者、DevOps、CI/CD 用户
> **策略撰写:** 2026-07-22
> **状态:** 规划完成,待开发

---

## 1. 核心关键词(主标 + 长尾)

### 主关键词(3 个,按搜索量从高到低)

| 关键词 | 英文搜索量估算 | 中文搜索量估算 | 难度 | 备注 |
|---|---|---|---|---|
| **yaml to json** | ~40,000/月 | 极低 | 中-高 | "转换器"型主词,codebeautify / convertjson 主导 |
| **json to yaml** | ~22,000/月 | 极低 | 中 | 反向,常一同搜索 |
| **yaml validator** | ~14,000/月 | 极低 | 中 | 配套工具,跟 converter 强关联 |

### 长尾关键词(8 个,按工具差异化定位筛选)

| 长尾词 | 搜索量估算 | 商业意图 | 内容落地位置 |
|---|---|---|---|
| `yaml to json converter online` | ~9,000/月 | 工具型 | 标题/H1 |
| `yaml to json kubernetes` | ~3,500/月 | 工具型 | K8s 章节(主打) |
| `yaml formatter online` | ~6,500/月 | 工具型 | 美化/格式化开关 |
| `yaml linter online` | ~4,200/月 | 工具型 | 验证/lint 开关 |
| `yaml to json converter python` | ~2,800/月 | 程序向 | CI/CD 章节 |
| `online yaml to json converter free` | ~1,900/月 | 工具型 | Meta description |
| `convert yaml to json github actions` | ~1,200/月 | DevOps | GitHub Actions 章节 |
| `yaml schema validator` | ~1,800/月 | 高级 | Schema 校验 toggle(可选) |

> 搜索量为 2026 Q2 估算(基于同类工具竞争密度推断),不作为承诺指标,仅作优先级参考。
> 关键词总搜索量级 ~105K/月,竞争集中在通用 YAML 工具站,DevOps 细分场景有空间。

### 中文目标词(辅助,流量小但精准)

- `yaml 转 json 在线`
- `yaml 校验工具`
- `json 转 yaml 在线`
- `kubernetes yaml 转 json`

---

## 2. 页面标题(title tag,≤60 字符)

### 推荐版本

```
YAML to JSON Converter — Free Online Validator & Formatter
```

**字符数:** 57 字符(含空格)
**关键词覆盖:** `YAML to JSON Converter` + `Validator` + `Formatter`
**点击诱因:** `Free` + `Online`

### 备选

| 备选标题 | 字符数 | 适用场景 |
|---|---|---|
| `YAML to JSON Converter — Free, No Upload, Kate Schema` | 57 | 上线 Kate Schema 校验后 |
| `YAML to JSON Online — Free DevOps Tool` | 44 | 强调 DevOps 定位 |
| `Free YAML to JSON Converter — K8s Manifest Ready` | 52 | 强调 K8s 场景 |

### ❌ 不推荐

- ~~`YAML to JSON`~~(13 字符,太短,浪费 SERP 空间)
- ~~`YAML to JSON Converter | Best Free Online Tool for DevOps & Kubernetes Manifest 2026`~~(超 60,会截断)

---

## 3. Meta Description(≤160 字符)

### 推荐版本

```
Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.
```

**字符数:** 141 字符
**关键词覆盖:** `YAML to JSON converter` + `validator` + `formatter` + `K8s manifests` + `Docker Compose`
**CTA:** `100% browser-based, no upload`(隐私 + 性能双卖点)

### 中文站备用描述(若 i18n 启用)

```
免费 YAML 转 JSON 工具,内置校验与格式化。支持 Kubernetes manifest、GitHub Actions、Docker Compose 等场景。纯前端运行,数据 0 上传。
```

字符数:~67 字

---

## 4. Canonical URL 建议

### 推荐路径

```
https://dlsome.top/tools/yaml-to-json/
```

### slug 候选

| slug | 理由 | 推荐度 |
|---|---|---|
| `yaml-to-json` | ✅ 任务指定 / 短 / 含 2 个主关键词 | **首推** |
| `yaml-json-converter` | 主关键词字面匹配,但字符更碎 | 备选 |
| `yaml-converter` | 太泛,失去 json 关键词 | ❌ |

### i18n 配套

如果后续加英文版(`/en/tools/yaml-to-json/`),frontmatter 用:

```yaml
translationKey: "yaml_to_json"
```

参考 `json-to-typescript.md` 现有惯例。

---

## 5. 目标搜索意图分析

### 主意图:**Transactional(交易型,~70%)**

- 搜索者**立即**想转换或验证 YAML
- 期望:粘贴 YAML → 立即看到 JSON 或错误信息,不要注册、不要上传
- 转化漏斗:搜索 → 进入工具 → 粘贴 → 看到结果(成功 = 跳出率低 + 停留时间长)

### 次要意图:**Informational(信息型,~20%)**

- 想了解 YAML 语法 / K8s manifest 怎么写 / YAML 跟 JSON 区别
- 期望:FAQ 章节 + 实操示例
- 落地:`核心功能` + `YAML vs JSON` 区块

### 第三意图:**Navigational(导航型,~10%)**

- 直接搜 `dlsome yaml` / `dlsome.top yaml converter`
- 通过 brand 名 + 工具名,信任本站

### 反例(不相关意图,不要做)

- ❌ 想做"YAML <-> XML / TOML 转换"的(本期先聚焦 YAML↔JSON,YAML↔TOML 留二期)
- ❌ 想做"YAML diff / patch"的(那是 git/diff 工具的活)

### 落地策略

- 首页首屏必须**直接看到输入框**(不要折叠)
- 方向切换器(YAML→JSON / JSON→YAML)放在输入框显著位
- 错误提示立刻出在输入框下方,不要弹窗
- FAQ 区解释 "YAML 跟 JSON 区别" / "indent 跟 tab 区别" / "anchor 引用怎么保留"

---

## 6. 内部链接建议

### 强内链(必须做)

**A. 从 `json-to-typescript.md` 内链过来** ⭐⭐⭐(任务指定)

> 在 `json-to-typescript.md` 的 "Related Tools" 区块加入:
> 
> "YAML <-> JSON 转换?试试 **YAML to JSON Converter**([链接](/tools/yaml-to-json/)) — 支持 K8s manifest、GitHub Actions、Docker Compose,纯前端。常见的开发者链路是 **YAML → JSON → TypeScript interface** — 现在一条工作流搞定。"

理由:本工具上线后形成「YAML → JSON → TypeScript」三件套闭环,搜索者经常三个都要。该内链同时给 `yaml-to-json` 导流 + 强化 `json-to-typescript` 的 "完整链路" 叙事。

**B. 从 `json-to-typescript.md` 正文 "Configuration Files" 段落加入** ⭐⭐

> "Configuration files (`package.json`, `tsconfig.json`, `app config`) 通常以 JSON 形式存储 — 但 K8s manifest、GitHub Actions、Ansible playbooks 是 YAML。**YAML ↔ JSON Converter**([链接](/tools/yaml-to-json/)) 让两者无缝切换,转换后可直接生成 TypeScript interface。"

理由:命中 "configuration files" 关键词,跟 YAML 工具自然衔接。

**C. 从首页 `_index.md` 工具列表加入**

新分类 `### 格式转换`(目前只有 `### Developer Tools`):

```markdown
### Developer Tools
- [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) — Convert JSON to TypeScript interfaces with 6 toggle options.

### 格式转换
- [YAML to JSON Converter](/tools/yaml-to-json/) — Convert YAML ↔ JSON, validate & format, supports K8s manifests, GitHub Actions, Docker Compose. Pure frontend.
```

### 弱内链(可做)

**D. 从本工具反向链回 `json-to-typescript.md`**

在 yaml-to-json 工具页面 Related Tools 区块:

> "把 YAML 转成 JSON 后,下一步生成 TypeScript interface?**[JSON to TypeScript Interface Generator](/tools/json-to-typescript/)** — 6 个 toggle,粘进 JSON 立即出 TS 类型。"

锚文本:`JSON to TypeScript Interface Generator` → `/tools/json-to-typescript/`

**E. 跨站引流(webpenson-tools)**

在 yaml-to-json 页面 Related Tools 区块(底部):

> **Related Tools**
> - [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) — YAML 转 JSON 后,生成 TS interface。
> - [JSON Formatter (webpenson.com)](https://www.webpenson.com/tools/json-formatter/) — 格式化、校验、压缩 JSON。
> - [Base64 Encoder (webpenson.com)](https://www.webpenson.com/tools/base64/) — 编码 base64 字符串,常见 YAML secret 编解码。
> - [Hash Generator (webpenson.com)](https://www.webpenson.com/tools/hash-generator/) — 校验 YAML checksum 或 secret hash。

理由:沿用 `json-to-typescript.md` 已有的 "Related Tools" 模式(混合站内 + 跨站),保证 dlsome-top 跟 webpenson-tools 工具矩阵联动。

---

## 7. JSON-LD Schema 类型

### 主 schema:**WebApplication**(主推)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YAML to JSON Converter",
  "alternateName": ["YAML JSON Converter", "YAML Validator", "YAML Formatter"],
  "url": "https://dlsome.top/tools/yaml-to-json/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "Format Converter",
  "operatingSystem": "Any (Browser-based)",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online YAML to JSON converter with validator & formatter. Supports K8s manifests, GitHub Actions workflows, Docker Compose files. 100% browser-based, no upload.",
  "featureList": [
    "YAML to JSON conversion",
    "JSON to YAML conversion",
    "YAML syntax validation",
    "YAML formatter / beautifier",
    "Kubernetes manifest support",
    "GitHub Actions YAML support",
    "Docker Compose YAML support",
    "Custom indent (2 or 4 spaces)",
    "Custom key sort",
    "Download as .yaml / .json"
  ],
  "inLanguage": ["zh-CN", "en"]
}
```

### 辅助 schema:**FAQPage**(强烈建议,FAQ 区块底部)

参考 `json-to-typescript.md` 的 FAQ 写法,6-8 条常见问题:

1. 什么是 YAML to JSON Converter?
2. YAML 跟 JSON 有什么区别?什么时候用哪个?
3. 这个 YAML 校验器是免费的吗?需要注册吗?
4. 我的 YAML 数据会上传到服务器吗?
5. 能处理 Kubernetes manifest 吗?能保留 anchor 引用吗?
6. YAML 缩进错误 / Tab 报错怎么办?
7. 怎么把 JSON 转回 YAML?
8. 转换后的 JSON 怎么进一步生成 TypeScript 类型?

### 第三 schema:**HowTo**(可选,加分项)

如果工具有"3 步使用"区块,加 HowTo:

```json
{
  "@type": "HowTo",
  "name": "如何使用 YAML to JSON Converter 转换 K8s manifest",
  "step": [
    {"@type": "HowToStep", "name": "粘贴 YAML", "text": "把 K8s manifest / GitHub Actions / Docker Compose 粘到左输入框"},
    {"@type": "HowToStep", "name": "查看 JSON 输出", "text": "工具立即解析并显示格式化 JSON,缩进和 key 顺序可调"},
    {"@type": "HowToStep", "name": "复制或下载", "text": "点击 Copy 复制 JSON,或 Download 下载为 .json 文件"}
  ]
}
```

### ❌ 不推荐

- ~~`SoftwareApplication`~~ — 偏向桌面/手机应用,Web 工具用 `WebApplication` 更准
- ~~`Tool`~~ — Schema.org 无此类型,会被 Google 忽略

---

## 8. 社交分享预览文本建议(OG 自描述)

### 自我推荐(本工具自己的 og:* 标签)

```html
<!-- og:title (40-60 字符) -->
<meta property="og:title" content="YAML to JSON Converter — Free Online Validator & Formatter">

<!-- og:description (100-200 字符) -->
<meta property="og:description" content="Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.">

<!-- og:image (1200×630, < 8MB) -->
<meta property="og:image" content="https://dlsome.top/og-images/yaml-to-json.png">

<!-- og:image:alt -->
<meta property="og:image:alt" content="YAML to JSON Converter showing Kubernetes manifest input on left and formatted JSON output on right">

<!-- og:url -->
<meta property="og:url" content="https://dlsome.top/tools/yaml-to-json/">

<!-- og:type -->
<meta property="og:type" content="website">

<!-- og:site_name -->
<meta property="og:site_name" content="dlsome.top">
```

### 推荐 og:image 规格

| 维度 | 推荐值 | 备注 |
|---|---|---|
| 尺寸 | **1200 × 630 像素** | Facebook / LinkedIn 标准 |
| 格式 | PNG(无透明)或 JPG | Facebook 优先 PNG |
| 大小 | < 300 KB | < 8MB 硬性限制,小更快 |
| 内容 | 工具截图 + 标题 + K8s/GitHub/Docker 小图标 | **不要**纯文字,转化率低 |
| Alt 文本 | 描述截图内容 | 可访问性 + 备用显示 |

### 设计建议(给 designer)

- 左:大标题 "YAML to JSON Converter"
- 中:输入框 mockup,左侧 YAML(带 `apiVersion: v1` / `kind: Pod` 片段),右侧 JSON
- 右:三平台小图标(K8s wheel / GitHub octocat / Docker whale)
- 背景:`#0F172A`(深色,跟 `json-to-typescript` 视觉一致)

---

## 9. 竞品差异化分析

### 同类竞品(流量较高)

| 竞品 | 强项 | 弱点 | 我方机会 |
|---|---|---|---|
| **codebeautify.org/yaml-to-json-converter** | SEO 老站、流量大(DR ~70) | UI 老旧、广告多、上传服务端 | 纯前端、UI 现代 |
| **convertjson.com/yaml-to-json** | 主关键词字面命中 | UI 简陋、单功能、无 validator | 校验 + 格式化合一 |
| **jsonformatter.org/yaml-to-json** | 站内子页、流量大 | jQuery residue、注册墙 | 零注册、纯前端 |
| **transform.tools/yaml-to-json** | 视觉好、多 transformer | 站点泛、无 devtools 深度叙事 | DevOps 场景垂直 |
| **convertio.co/yaml-json** | 品牌强 | **强制上传**、有上传限制 | 100% 浏览器、零上传 |
| **onlineyamltools.com** | 套站工具齐全 | UI 套娃、banner 满天飞 | 干净、专注 |
| **browserling.com/tools/yaml-to-json** | 极客风 | 偏 CLI 演示、UI 复杂 | 简单直接 |

### webpenson-tools 现有竞品

- **截至 2026-07-22**:`webpenson-tools/content/tools/` 下有 base64 / binary-visualizer / color-converter / cron-parser / diff-checker / duplicate-remover / hash-generator / json-formatter / json-to-typescript / jwt / text-case-converter / unit-converter — **无 YAML 工具**
- 含义:**dlsome-top 首发 YAML 工具,跨站不存在重复**,但需要在 dlsome-top 本身定位上避开跟 webpenson-tools 通用工具的重复叙事

### 我方核心差异化(3 个卖点)

**1. DevOps / CI/CD 场景垂直(场景差异化)**

- 不只做"YAML 转 JSON",而是 **K8s manifest / GitHub Actions / Docker Compose / Ansible playbook** 4 大场景预设
- 工具栏内置 "Format: K8s / GitHub Actions / Docker Compose / Generic" 切换 → 切换后自动启用对应 lint 规则
- 例:K8s 模式 → 校验 `apiVersion` / `kind` / `metadata` 三段必备;Docker Compose 模式 → 校验 `services:` / `version:` 顶层
- 跟 `json-to-typescript` 形成「配置 → 类型」完整链路

**2. 双向 + 验证 + 格式化(功能差异化)**

- 大多数竞品只做 "YAML → JSON" 单向
- 我方:**3-in-1(双向转换 + 验证 + 格式化)**
- 例:`yaml validate` → 红色错误提示 + 行号;`yaml beautify` → 2 空格 / 4 空格 / tab 切换
- 错误信息比 js-yaml 默认信息更友好(显示 "Expecting 'map' but got 'seq'" + 中文提示)

**3. 纯前端 + 隐私 + 离线(技术差异化)**

- 100% 浏览器本地,无任何 server roundtrip
- 打开 DevTools → Network,粘贴 → 转换 → 0 个 outbound request
- **CI/CD 友好**:pipeline 里 YAML manifest 经常含 secret(token / password),零上传是刚需
- **离线可用**:首屏加载后可断网使用(PWA 友好,可选 v2)

### dlsome-top 定位 vs webpenson-tools 定位

| 维度 | webpenson-tools(通用工具站) | dlsome-top(独立开发者 + devtools) |
|---|---|---|
| 工具范围 | 通用(base64 / hash / json / unit / color / cron …) | 偏 developer + DevOps |
| 受众 | 站长、营销、白领 | 开发者、DevOps、CI/CD |
| 内容深度 | 中等(单页 200-400 字) | **深**(参考 `json-to-typescript.md` 330 行) |
| 工具密度 | 高(40+ 工具) | 起步阶段(1 个 + 本期 1 个) |
| 差异化主线 | 通用 + 中英双语 + 简单 | **开发者链路 + 纯前端 + 隐私** |

**dlsome-top 必须做的事:** 不跟 webpenson-tools 抢 "yaml formatter" 这种通用词,主打 **"devtools 工具链 + DevOps 场景"**。

### ❌ 不要做的事

- ❌ 做"YAML <-> XML / TOML / CSV 转换" — 范围失控,二期再说
- ❌ 做"在线 YAML 编辑器 + 协作" — 那是 Monaco / VS Code online 的活
- ❌ 后端验证 + 存储 — 纯前端故事破功,且有 GDPR / 隐私风险
- ❌ 收注册费 / 付费去广告 — 跟主线"零门槛开发者工具"冲突

---

## 10. 工具独特性(yaml-to-json vs json-to-typescript)

### 两者定位差异(防止站内自我竞争)

| 维度 | json-to-typescript | yaml-to-json |
|---|---|---|
| 核心动作 | JSON → TypeScript interface | YAML ↔ JSON |
| 输入内容 | JSON 响应 / 配置 | YAML 配置文件(K8s / GitHub Actions / Compose) |
| 输出内容 | TypeScript 代码 | JSON / YAML |
| 目标用户 | 前端 / 全栈(消费 API) | 后端 / DevOps / SRE(写配置) |
| 典型场景 | 调 API 后给 fetch 响应加类型 | 改 K8s manifest、CI pipeline |
| 工具深度 | 6 个 toggle(interface / type / optional / readonly / nullable / camelcase) | 4 个 toggle(方向 / 缩进 / 校验 / 格式化) |
| Schema 输出 | TypeScript interface | JSON / YAML |

### 受众重叠点(互相引流机会)

**重叠 1:Configuration Files**

- 配置文件可以是 JSON(`tsconfig.json`)或 YAML(`tsconfig.yaml` / K8s manifest)
- 用户用 `json-to-typescript` 时,可能也想把 YAML 转 JSON 后再生成 TS
- **互相引流位**:`json-to-typescript.md` 的 "Configuration Files" 段落加入 "YAML 转 JSON" 链接(见 §6B)

**重叠 2:API Response Type**

- 后端同学写完 YAML API spec → 转 JSON → 生成 TS 给前端
- 这条链路是"完整 backend-to-frontend" 类型定义流
- **互相引流位**:两个工具底部 "Related Tools" 都互相链(已设计,见 §6A、§6D)

**重叠 3:OpenAPI / Swagger**

- OpenAPI spec 本身是 YAML,转换给前端后用 `json-to-typescript` 生成 TS
- 在 yaml-to-json 工具页面 FAQ 加: "转换后的 JSON 怎么生成 TypeScript 类型? → [JSON to TypeScript Interface Generator](/tools/json-to-typescript/)"

### 站内怎么写"组合用法"段落

在 yaml-to-json 工具页面中间,加一节:

> ## YAML → JSON → TypeScript:完整配置类型定义工作流
> ```
> 1. 你有 K8s manifest / OpenAPI spec(`.yaml` 格式)
> 2. 用 [YAML to JSON Converter] 转成 `.json`
> 3. 再用 [JSON to TypeScript Interface Generator] 转成 TS interface
> 4. 粘贴到 TypeScript 项目,获得完整编译时类型安全
> ```
> 整个工作流 100% 浏览器完成,无数据上传。

**这是 dlsome-top 独有卖点** — 市场上没有工具站系统性地串联「YAML → JSON → TypeScript」,这是 dlsome-top 双工具的杠杆点。

---

## 11. Hugo 分类 / 标签建议

### Categories(顶层分类,跟现有工具保持一致)

参考 `json-to-typescript.md` 的 frontmatter 模式(无显式 categories,只有 `tools: [...]` 数组),但本期建议加入 categories 形成站内分组:

```yaml
categories:
  - "Developer Tools"     # 必备(跟 json-to-typescript 同类)
  - "Format Converters"   # 新分类(本期首发,后续 YAML↔JSON 双向可复用)
  - "DevOps"              # 新分类(场景维度,跟 K8s / CI/CD 联动)
```

**新增分类说明:**
- `Format Converters` — 跟 json-to-typescript 区分(json-to-typescript 是 "代码生成",不是 "格式转换")
- `DevOps` — 跟 json-to-typescript(纯前端)区分,本工具重点是 DevOps 场景

### Tags(自由添加,不在导航展示)

```yaml
tags:
  - "yaml"
  - "json"
  - "yaml-to-json"
  - "json-to-yaml"
  - "yaml-validator"
  - "yaml-formatter"
  - "yaml-linter"
  - "kubernetes"
  - "k8s"
  - "github-actions"
  - "docker-compose"
  - "devops"
  - "developer-tools"
  - "format-converter"
  - "browser-tool"
```

### frontmatter 完整示例

```yaml
---
title: "YAML to JSON Converter"
slug: "yaml-to-json"
description: "Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload."
tools: ["yaml", "json", "validator", "formatter", "kubernetes", "github-actions", "docker-compose", "developer-tools", "devops"]
categories:
  - "Developer Tools"
  - "Format Converters"
  - "DevOps"
tags:
  - "yaml"
  - "json"
  - "yaml-to-json"
  - "json-to-yaml"
  - "yaml-validator"
  - "yaml-formatter"
  - "yaml-linter"
  - "kubernetes"
  - "k8s"
  - "github-actions"
  - "docker-compose"
  - "devops"
  - "developer-tools"
  - "format-converter"
  - "browser-tool"
layout: "page"
translationKey: "yaml_to_json"
---
```

**`tools` 数组:** 沿用 `json-to-typescript.md` 的 `tools: [...]` 模式(参 [excerpt](https://dlsome.top/tools/json-to-typescript/) frontmatter),保证站内工具元数据一致。

**`translationKey`:** `yaml_to_json`(snake_case),跟 `json-to-typescript` 的隐式 `json-to-typescript` slug 区分;若未来加 `/en/tools/yaml-to-json/`,用同一个 translationKey 即可被 i18n 引擎识别。

---

## 12. 落地检查清单(开发自测)

- [ ] 文件创建:`content/tools/yaml-to-json.md`
- [ ] shortcode 创建:`layouts/shortcodes/yaml-to-json.html`
- [ ] 双向转换 UI(YAML → JSON / JSON → YAML)
- [ ] YAML 校验器(js-yaml 错误信息 → 友好中文提示)
- [ ] YAML 格式化(2 空格 / 4 空格 / tab 切换)
- [ ] 4 大场景预设(K8s / GitHub Actions / Docker Compose / Generic)
- [ ] 错误提示立即显示(行号 + 错误类型)
- [ ] Copy / Download 按钮(.json / .yaml)
- [ ] FAQ 区块(6-8 条,含 §10 的 "转换完怎么生成 TS" 链接)
- [ ] Related Tools 区块(链回 json-to-typescript + 跨站 webpenson-tools)
- [ ] WebApplication JSON-LD 嵌入
- [ ] FAQPage JSON-LD 嵌入(可选,HowTo 同)
- [ ] 自描述 og:title / og:description / og:image 设置
- [ ] 内链更新:`json-to-typescript.md` Related Tools + 正文 + `_index.md` 工具列表
- [ ] `hugo --gc --minify` 构建无错误
- [ ] `/tools/yaml-to-json/` 访问 200,FAQ 区块折叠正常
- [ ] PageSpeed Insights 分数 ≥ 90(纯前端天然高分)
- [ ] Schema 验证:`https://search.google.com/test/rich-results` 通过
- [ ] 关键搜索验证 1 周内:`site:dlsome.top/tools/yaml-to-json/` 已被 Google 收录

---

## 13. 上线后监控指标(30 天)

| 指标 | 目标值 | 监测方式 |
|---|---|---|
| Google 收录 | ≤ 7 天收录 | `site:dlsome.top/tools/yaml-to-json/` |
| 自然点击 CTR | ≥ 4% | Google Search Console |
| 平均停留时间 | ≥ 75 秒 | GA4 / Umami |
| 跳出率 | ≤ 65% | GA4 / Umami |
| FAQ rich result 展示 | 出现 ≥ 3 条 | GSC "增强功能" |
| `json-to-typescript` 互链 CTR | +5% | 跨页面 referrer |
| 跟 `json-to-typescript` 组合使用率 | ≥ 8% 会话 | 站内 referrer 链路 |

---

## 14. 备注 / 待确认事项

1. **dlsome-top 站点启用状态:** 当前 `_index.md` 写 "工具站矩阵第二极 · 暂未启用",但 `feat/yaml-to-json` 分支已存在,本策略默认站点已经(或即将)开放,后续 `_index.md` 需要跟随更新。
2. **场景预设的边界:** K8s / GitHub Actions / Docker Compose / Generic 4 大场景预设需要阿南确认是否本期就做,还是先做 Generic + 二期加场景。
3. **YAML 库选择:** js-yaml(浏览器端,5KB) vs yaml(更全但 80KB+) — 建议 js-yaml + 自己的 error friendliness 层,体积优先。
4. **是否做 PWA / 离线:** 离线可用是加分项,但 v1 可不做;v2 加 service worker + 缓存 + manifest。
5. **跨 i18n:** 现有 `json-to-typescript.md` 没看到 `/en/` 拆分,本工具可仿照,中英同页(中文 UI + 英文关键词覆盖);若后续统一做 `/en/`,translationKey 已就位。
6. **是否上线后立刻更新 `webpenson-tools` 首页/相关工具页:** 建议加 — 在 `webpenson-tools/content/tools/json-to-typescript.md` 也反向加一行 yaml-to-json 链接,跨站引流最大化(参 §6E)。
7. **是否纳入 daily-scout 调研范围:** 否(这是工具页,不是市场调研)。
8. **跟未来 YAML 工具的扩展空间:** 二期可考虑 YAML↔TOML / YAML↔XML / YAML Diff / YAML Schema Validator,本工具前端架构需要预留扩展点(preset 架构)。

---

## 附录:核心关键词 vs 内容落地映射

| 关键词 | 落地位置 |
|---|---|
| `yaml to json` | 标题 / H1 / URL / 第一段开头 |
| `json to yaml` | 标题 alt / 工具方向切换器旁标注 / FAQ |
| `yaml validator` | 标题 / 工具栏按钮 / FAQ |
| `yaml formatter` | 标题 / 工具栏按钮 / FAQ |
| `yaml to json kubernetes` | K8s 专门章节 / 场景预设 |
| `yaml to json converter online` | 标题 / Meta description |
| `yaml linter` | FAQ / 错误处理段落 |
| `kubernetes yaml` | K8s 章节 / og:description |
| `github actions yaml` | GitHub Actions 章节 / 场景预设 |
| `docker compose yaml` | Docker Compose 章节 / 场景预设 |
| `online yaml to json converter free` | Meta description / 工具栏 tagline |
| `YAML to JSON Converter` | 标题 / H1 / Schema 名称 / URL |

---

**STRATEGY.md 结束。开发启动前请 main agent 确认 §14 待办事项。**
