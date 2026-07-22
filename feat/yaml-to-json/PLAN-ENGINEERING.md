# YAML to JSON Converter — Engineering Plan

> **slug:** `yaml-to-json`
> **repo:** `/home/penson/code/dlsome-top`
> **branch:** `feat/yaml-to-json`
> **策略文档:** `feat/yaml-to-json/STRATEGY.md`
> **规划撰写:** 2026-07-22
> **目标上线:** STRATEGY §12 检查清单全部勾选

---

## 0. 顶层概览

| 项目 | 值 |
|---|---|
| **架构** | Hugo shortcode + 自包含 HTML/CSS/JS(参考 `json-to-typescript.html`) |
| **YAML 解析库** | **js-yaml v4.x**(浏览器 ESM/UMD,~24KB minified,成熟稳定) |
| **JSON 序列化** | 原生 `JSON.stringify` + 缩进选项 |
| **CSS namespace** | `y2j-*`(`yaml → json` 三个字母,**已按任务指令**) |
| **JS data-attr** | `data-y2j-*` |
| **代码风格** | 沿用 `json-to-typescript.html`(IIFE 包装、零外部 CDN、纯前端) |
| **暗色模式** | PaperMod `.dark` class 兼容(沿用 jtsc 模式) |

---

## 1. 功能规格(Tool Spec)

### 1.1 核心功能(必须做)

#### A. YAML → JSON 转换

- **输入:** 左侧 textarea 粘贴 YAML(任意复杂度,支持 K8s / GitHub Actions / Docker Compose 场景)
- **输出:** 右侧 `<pre><code>` 渲染格式化 JSON
- **触发:**
  - 实时(input 事件 + 150ms debounce)
  - 手动 `Ctrl/⌘ + Enter` 立即触发
- **处理:**
  - 用 `jsyaml.load(input)` 解析(支持 YAML 1.2 spec,包括 `!!timestamp` / `!!binary` 等类型标签)
  - 用 `JSON.stringify(parsed, null, indent)` 序列化(indent 默认 2,可切 4)
  - 错误立即显示在输入框下方红色错误条 + 行号(js-yaml 错误对象自带 `linePos` / `mark` 信息)

#### B. JSON → YAML 反向转换

- **方向切换器** (toolbar 显著位置): `YAML → JSON` ⇄ `JSON → YAML` (toggle button 或 radio)
- **JSON 解析:**
  - `JSON.parse(input)` — 解析失败时显示红色错误条 + 行号(原生 `SyntaxError` 通常含位置信息)
- **YAML 序列化:**
  - 用 `jsyaml.dump(parsed, { indent: 2, lineWidth: -1, noRefs: false })` 输出
  - 默认 `lineWidth: -1`(不折行,K8s manifest 长字符串不被截断)
  - 默认 `noRefs: false`(保留 anchor / alias 引用 — K8s & Docker Compose 常用 `&default` / `*default`)

#### C. YAML 语法校验(独立开关)

- **toggle:** `Validate YAML` (默认开启)
- **行为:**
  - 解析成功 → 绿色 ✓ "Valid YAML"
  - 解析失败 → 红色 ✗ + 错误类型 + 行号 + **友好中文提示**
- **错误友好化映射表(js-yaml → 中文):**

| js-yaml 错误标识 | 友好中文提示 |
|---|---|
| `YAMLException: end of the stream or a document separator is expected` | 文档结束位置异常,检查缩进或多余字符 |
| `expecting 'map' but got 'seq'` | 此处应为对象(键值对),但写成了数组(列表) |
| `duplicate key` | 同一个层级有重复的 key |
| `bad indentation of a mapping entry` | 缩进错误(常见:tab 和空格混用,或不规则缩进) |
| `expected the node content` | 该位置期望有值,检查 `:` 后是否有空格 |
| `unknown tag !<tag:yaml.org,2002:str>` | 不支持的 YAML 类型标签,改用普通字符串 |

### 1.2 场景预设(4 大场景)

| 预设 | 输入示例 | 特殊校验 |
|---|---|---|
| **Generic** | 任意 YAML | 仅 YAML 语法校验 |
| **Kubernetes** | `apiVersion: v1`, `kind: Pod`, `metadata:`, `spec:` | 校验 `apiVersion` / `kind` / `metadata.name` 三段必备;`spec` 推荐存在 |
| **GitHub Actions** | `on:`, `jobs:`, `steps:` | 校验 `name` / `on` / `jobs` 必备 |
| **Docker Compose** | `services:`, `version:` | 校验 `services` 必备且非空;顶层 key 应在白名单(`version` / `services` / `networks` / `volumes` / `configs` / `secrets`) |

**UI:** 工具栏下拉 `Preset: [Generic ▼]`,切换后:
1. 自动加载对应示例(可选,首次切换给按钮 `Load Sample` 二次确认)
2. 输入框下方出现对应校验规则的提示
3. 输出 JSON 顶部加注释(可选,折行 JSON.stringify hack)

### 1.3 辅助功能

- **缩进切换:** `Indent: [2 ▼] [4] [Tab]`
- **Key 排序:** `Sort keys: [off ▼] [on]`(按字母序,适合做 diff)
- **格式化 YAML 输入:** `Format YAML`(重写,修正 indent、补空格)
- **复制输出:** `Copy`(clipboard API)
- **下载文件:**
  - YAML 模式 → `download.yaml`
  - JSON 模式 → `download.json`
- **示例加载:** `Sample`(按当前 preset 加载不同示例)
- **清空:** `Clear`(双 panel 一起清)
- **字符计数:** 输入框右上角 `N chars / M lines`
- **状态行:** footer `Ready` / `Valid YAML ✓` / `Error: ...`

### 1.4 键盘快捷键(沿用 jtsc 风格)

| 快捷键 | 行为 |
|---|---|
| `Ctrl/⌘ + Enter` | 立即转换 |
| `Ctrl/⌘ + L` | 加载示例 |
| `Ctrl/⌘ + K` | 清空 |
| `Ctrl/⌘ + C`(输出面板 focus 时) | 复制输出 |
| `Tab` | 在 textarea 插入 tab 字符 |

### 1.5 响应式 + 暗色模式

- **桌面端(>900px):** 左右 split-pane,可拖拽 divider 调整宽度
- **移动端(≤900px):** 顶部 tab 切换 `Input` / `Output`(沿用 jtsc `.jtsc-viewtabs`)
- **暗色模式:** PaperMod `.dark` class 切换;CSS 变量覆盖(参考 jtsc 的 `body:not(.dark) .jtsc` 模式)

---

## 2. 文件清单

### 2.1 必须创建(2 个)

| 路径 | 大小估算 | 说明 |
|---|---|---|
| `content/tools/yaml-to-json.md` | ~12-15 KB(参考 jtsc.md 19.8KB,但内容点更聚焦 YAML/JSON,稍短) | Hugo markdown 内容页 |
| `layouts/shortcodes/yaml-to-json.html` | ~900-1100 行(jtsc 是 724 行,本工具功能更多:双向 + 校验 + 4 预设) | 自包含 shortcode |

### 2.2 需要修改(3 个 — 内链加固)

| 路径 | 修改内容 |
|---|---|
| `content/tools/json-to-typescript.md` | Related Tools 区块 + Configuration Files 段落加入 yaml-to-json 内链(STRATEGY §6A、§6B) |
| `content/_index.md` | 工具列表新增 `### 格式转换` 分类(STRATEGY §6C) |
| `layouts/index.html`(若有) 或 `_index.md` | 同上 |

### 2.3 不需要创建

- ❌ `static/js/yaml-to-json.js` — shortcode 已自包含,无需拆出
- ❌ `static/css/yaml-to-json.css` — CSS 内联在 shortcode 头部
- ❌ `assets/` 目录 — Hugo PaperMod 主题不需要;若用需要 `{{ $style := resources.Get "css/..." | minify }}`,复杂度高
- ❌ `static/lib/js-yaml.min.js` — js-yaml 内联在 shortcode 内(IIFE 内 `const jsyaml = ...`),**确保无 CDN 依赖**(`json-to-typescript` 已示范)

### 2.4 CDN 决策

**采用内联 js-yaml v4.1.0**:
- js-yaml UMD minified ≈ 24KB
- 内联后整个 shortcode 约 35-40KB(HTML+CSS+JS+yaml lib)
- 优点:零外链、零 CORS、离线可用、首屏一次加载
- 缺点:页面体积略增(参考 jtsc.html 是 19KB → 本工具 ~40KB),仍在 PageSpeed 90+ 范围内

**替代方案(若体积敏感):**
- 用 `yaml` v2.x(esm-only,browser bundle ~80KB) — 不推荐,体积过大
- 自实现 YAML 子集解析器 — 不推荐,需大量边界测试,js-yaml 是社区共识

---

## 3. 实现步骤(按优先级排序)

> **预估总工时:** ~6-8 小时(含测试 / FAQ 撰写 / 内链)

### Step 1: shortcode HTML 结构 + CSS 基础(1.5h) ⭐ 优先级最高

**任务:**
1. 创建 `layouts/shortcodes/yaml-to-json.html`
2. 顶部 IIFE 注释 + 用途说明(沿用 jtsc 模式)
3. 写出完整 HTML 骨架:
   - Toolbar 1: action 按钮(Sample / Clear / Format YAML / Convert / Copy / Download)
   - Toolbar 2: 4 个 toggle(direction / indent / validate / sortKeys)
   - Preset 下拉(4 个场景)
   - View tabs(移动端)
   - Split pane(input + divider + output)
   - Error strip(输入框下方)
   - Footer(status + hint)
4. 写出 CSS:
   - `.y2j` 根容器 + CSS 变量(`--y2j-bg` / `--y2j-fg` / `--y2j-border` / `--y2j-accent` / `--y2j-code-bg` / `--y2j-radius` / `--y2j-pad` / `--y2j-font-mono` / `--y2j-font-ui`)
   - PaperMod `.dark` 兼容(light 模式变量覆盖)
   - Toolbar / Toggle / Viewtab / Split / Pane / Divider / Footer 基础样式
   - 响应式断点:`@media (max-width: 900px) { ... }`

**关键参考:** 直接对照 `layouts/shortcodes/json-to-typescript.html` 121-300 行

**验收:**
- HTML 在 Hugo `hugo server` 下渲染正确
- dark/light 切换正常
- 移动端 tab 切换正常

### Step 2: YAML → JSON 核心逻辑(1h)

**任务:**
1. 在 shortcode 末尾添加 `<script>` IIFE
2. 引入 js-yaml v4.1.0 UMD 内联代码(粘贴到 IIFE 顶部)
3. 实现 `convertYamlToJson(input, opts)`:
   ```js
   function convertYamlToJson(input, indent = 2) {
     const parsed = jsyaml.load(input);          // YAML 1.2 spec
     return JSON.stringify(parsed, null, indent);
   }
   ```
4. 绑定 input 事件 + debounce(~150ms)
5. 绑定 `Ctrl/⌘ + Enter` 立即触发
6. 显示字符 / 行计数

**验收:**
- 粘贴简单 YAML → 立即看到 JSON
- 粘贴 K8s manifest → 正确解析嵌套
- 缩进切换 2 ↔ 4 立即生效

### Step 3: JSON → YAML 反向(0.5h)

**任务:**
1. 添加 direction toggle `data-y2j-direction`(值 `"yaml2json"` 或 `"json2yaml"`,默认 `"yaml2json"`)
2. 实现 `convertJsonToYaml(input, indent = 2)`:
   ```js
   function convertJsonToYaml(input, indent = 2) {
     const parsed = JSON.parse(input);
     return jsyaml.dump(parsed, {
       indent,
       lineWidth: -1,    // 不折行
       noRefs: false,    // 保留 anchor
       sortKeys: false   // 跟 sortKeys toggle 联动
     });
   }
   ```
3. Toggle 切换时:
   - 切换 placeholder
   - 切换 output pane 标题(`JSON output` ⇄ `YAML output`)
   - 切换 download 文件扩展名(`.json` ⇄ `.yaml`)
4. 复用同一个 debounce 事件

**验收:**
- 切换方向后输入框 placeholder 正确切换
- 输入 JSON 后输出 YAML,K8s manifest 格式正常
- `noRefs: false` 时 anchor/alias 正确保留(`&default` + `*default`)

### Step 4: YAML 验证 + 错误提示(1h)

**任务:**
1. 实现 `validateYaml(input)`:
   ```js
   function validateYaml(input) {
     try {
       jsyaml.load(input);
       return { ok: true };
     } catch (e) {
       return { ok: false, error: e.message, line: e.mark?.line, column: e.mark?.column };
     }
   }
   ```
2. 实现友好错误映射 `friendlyError(yamlError)`:
   - 关键字匹配 → 中文提示
   - 显示: `❌ 第 N 行: <友好提示>` + `原文: <错误片段>`
3. 错误条 `.y2j-error`:
   - 红色背景(`--y2j-error-bg` CSS 变量)
   - 显示错误类型 + 行号 + 原始 js-yaml 消息(可折叠 `<details>`)
4. 验证 toggle `data-y2j-validate`(默认 on):
   - off → 不做验证,只 catch 解析异常
   - on → 即使解析成功也显示绿色 ✓

**验收:**
- 输入错误 YAML(例如 tab 和空格混用)→ 看到友好中文提示
- 行号显示正确
- 折叠 / 展开原始错误正常工作

### Step 5: 场景预设(1h)

**任务:**
1. 定义预设配置对象:
   ```js
   const PRESETS = {
     generic:     { name: 'Generic',     sample: '...', rules: [] },
     kubernetes:  { name: 'Kubernetes',  sample: '...', rules: [
                      { path: '$',        required: ['apiVersion', 'kind', 'metadata'] }
                    ] },
     github:      { name: 'GitHub Actions', sample: '...', rules: [...] },
     compose:     { name: 'Docker Compose',  sample: '...', rules: [...] }
   };
   ```
2. 下拉 `data-y2j-preset` 绑定 change 事件
3. 切换时:
   - 更新提示文案(`.y2j-preset-hint`)
   - 可选:`Load sample` 按钮(避免自动覆盖用户输入)
4. JSON 模式下 preset 只影响 "Load Sample",不影响校验规则

**4 个示例(预设内置):**
- **K8s:** `apiVersion: v1 / kind: Pod / metadata: { name: ... } / spec: { containers: [...] }`
- **GitHub Actions:** `name: CI / on: [push] / jobs: { test: { runs-on: ubuntu-latest, steps: [...] } }`
- **Docker Compose:** `version: '3.8' / services: { web: { image: nginx, ports: [...] } }`
- **Generic:** 简单 `key: value` 列表

**验收:**
- 切换预设 → 提示文案更新
- 点 Load Sample → 输入框填充对应示例
- 切换到 K8s 后输入缺 `kind` → 显示预设校验警告

### Step 6: 响应式 + 暗色模式 + Copy/Download(0.5h)

**任务:**
1. **Copy:** `navigator.clipboard.writeText(output)`,显示 `Copied ✓` 1.5s
2. **Download:** `Blob([text], { type: 'text/plain' })` + `URL.createObjectURL` + 临时 `<a download>`
3. **移动端:** `@media (max-width: 900px)` 下 split-pane 切换为单 pane + viewtab
4. **暗色模式:** 沿用 jtsc 的 `body:not(.dark) .y2j` 模式,变量覆盖
5. **Divider 拖拽:** 沿用 jtsc 实现,resize 时存到 `localStorage`(`y2j-divider-ratio`)

**验收:**
- 复制 / 下载按钮在桌面 + 移动端正常
- 暗 / 亮模式切换无视觉残留
- 刷新页面后 divider 比例保留(localStorage)

### Step 7: 内容页 markdown(1.5h)

**任务:** 创建 `content/tools/yaml-to-json.md`

**frontmatter(沿用 STRATEGY §11):**
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

**正文结构(参考 jtsc.md,约 250-330 行):**
1. H1 + shortcode 调用 `{{< yaml-to-json >}}`
2. 引言段(关键词密集:`YAML to JSON` / `YAML converter` / `K8s` / `GitHub Actions`)
3. ## What is YAML to JSON Converter
4. ### Core use cases(REST/K8s/CI-CD/Compose/OpenAPI)
5. ### How it differs from alternatives(竞品表)
6. ### Configuration toggles(4 个 toggle 介绍)
7. ### Four scene presets(K8s/GitHub Actions/Docker Compose/Generic)
8. ### Five technical highlights
9. ## How to Use This Tool(5 步 + 键盘快捷键)
10. ## Conversion Rules / Type Mapping Table(JSON value ↔ YAML 转换规则)
11. ## Example Use Cases(3-4 个,含 K8s manifest)
12. ## YAML → JSON → TypeScript:Complete Config Type Workflow(STRATEGY §10 重磅内容)
13. ## FAQ(6-8 条,见 STRATEGY §7)
14. ## Related Tools(链回 json-to-typescript + 跨站 webpenson-tools)
15. ## Schema.org JSON-LD(WebApplication + FAQPage + HowTo,STRATEGY §7)

**验收:**
- `hugo --gc --minify` 构建无错误
- 关键词密度合理(`yaml to json` 在前 200 字出现 ≥ 3 次)
- FAQ 区块 6-8 条,最后一条链回 json-to-typescript
- JSON-LD 三段齐全

### Step 8: 内链更新(0.5h)

**任务:**
1. 修改 `content/tools/json-to-typescript.md`:
   - Related Tools 区块:加入 yaml-to-json 链接(STRATEGY §6A 模板)
   - Configuration Files 段落:加入 yaml-to-json 链接(STRATEGY §6B)
2. 修改 `content/_index.md`:
   - 工具列表新增 `### 格式转换` 分类
   - 把 yaml-to-json 加入
3. **(可选)** 修改 webpenson-tools 的 `json-to-typescript.md` 加反向链

**验收:**
- 站内 3 个页面互相跳转可通
- 锚文本含目标关键词

---

## 4. 技术风险评估

### 4.1 YAML 解析库选型

| 候选库 | 大小 | 优点 | 缺点 | 推荐度 |
|---|---|---|---|---|
| **js-yaml v4.1.0** | ~24KB minified | 社区最广用、YAML 1.2 spec、API 简单、文档完整 | 浏览器 UMD 包略旧;无 ESM tree-shake | ⭐⭐⭐⭐⭐ **首推** |
| `yaml` v2.x | ~80KB | ESM-native、更现代 API、支持 JSON Schema | 体积大 3 倍多;对短工具过度 | ⭐⭐ |
| 自实现 YAML 子集 | 0 | 体积 0、完全可控 | 边界情况无数(K8s manifest 含 anchor / 复杂 merge key / multi-doc) | ❌ |

**决策:js-yaml v4.1.0 UMD 内联**(理由:成熟稳定 + 24KB 可接受 + 社区共识)

**注意:**
- js-yaml v3 vs v4 API 略有差异(默认 `JSON_SCHEMA` 改为 `FAILSAFE_SCHEMA` 行为差异),**用 v4.1.0**
- v4 默认 `loadAll` 返回数组;我们用 `load(input)` 返回单个文档,符合预期
- v4 默认 `noRefs: true`(v3 是 false)— 我们用 `dump({ noRefs: false })` 覆盖

### 4.2 安全风险(用户输入恶意 YAML)

**威胁建模:**
- **YAML 1.1 的 `!!python/object/apply` 攻击:** v4 已禁用(默认 schema 是 `DEFAULT_SCHEMA`,只支持基础类型,不会执行任意代码)
- **巨大输入 DoS:** 用户粘贴 100MB YAML → 浏览器卡死
- **XSS:** 用户在 YAML 注释里写 `<script>` → 我们不渲染 HTML,只渲染纯文本,天然免疫

**缓解措施:**
1. ✅ js-yaml v4 已天然防 type coercion 攻击
2. 加 **输入大小限制**(建议 `input.length > 500_000` → 显示警告 + 拒绝解析)
3. 加 **超时保护**(`Promise.race` 配合 `setTimeout`,超过 3 秒显示超时)
4. **不在 DOM 渲染用户输入为 HTML**(用 `textContent` 不用 `innerHTML`)
5. **不发送任何用户数据到外部** — STRATEGY §9 已承诺零上传,继续保持

**残余风险:** 都可接受;v4 js-yaml + 纯前端 = 无 RCE 风险

### 4.3 浏览器兼容

| 浏览器 | 最低版本 | 兼容性 |
|---|---|---|
| Chrome / Edge | 90+ | ✅ 完全支持(clipboard API / Blob / template) |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持(clipboard API Safari 13.4+) |
| 移动端 Safari iOS | 14+ | ✅ 完全支持 |
| 移动端 Chrome Android | 90+ | ✅ 完全支持 |
| IE 11 | — | ❌ 不支持(已放弃;Hugo + PaperMod 都不支持) |

**特性依赖清单(全支持):**
- `JSON.parse` / `JSON.stringify` — ES5+
- `String.prototype.includes` / `Array.from` / `Object.assign` — ES6+
- `navigator.clipboard.writeText` — Chrome 66+ / Firefox 63+ / Safari 13.1+
- `Blob` / `URL.createObjectURL` — 全支持
- `localStorage` — 全支持

### 4.4 Hugo 兼容性

- PaperMod 主题:`json-to-typescript.html` 已示范,本工具沿用同模式
- `hugo --gc --minify` 必须无错误
- `hugo.toml` 无需改动
- shortcode 调用 `{{< yaml-to-json >}}` 100% 兼容

### 4.5 性能风险

| 场景 | 性能预期 | 风险 |
|---|---|---|
| 粘贴 100 行 YAML | 解析 < 50ms,debounce 150ms,总响应 < 250ms | ✅ 无风险 |
| 粘贴 5000 行 YAML(K8s cluster yaml) | 解析 ~200ms,debounce 150ms,总响应 ~400ms | ⚠️ 略卡,可接受 |
| 粘贴 50000 行 YAML(超大文件) | 解析 ~3s,UI 卡顿 | ⚠️ 需要大小限制(500K 字符) |
| 实时切换 indent / sortKeys | 重新 stringify < 100ms | ✅ 无风险 |

**缓解:** 输入框加 `maxlength="500000"` 属性 + JS 层校验(>500K 警告)

---

## 5. 开发自测 checklist

### 5.1 功能测试

#### YAML → JSON
- [ ] 简单 `key: value` → 正确转换
- [ ] 嵌套对象 3 层 → 正确保留嵌套
- [ ] 数组(sequence)→ JSON 数组
- [ ] 混合列表 `[{a:1}, {b:2}]` → 正确数组
- [ ] 多文档 YAML(`---` 分隔)→ 取第一个文档 + 显示提示
- [ ] Anchor + Alias(`&a` + `*a`,默认 `noRefs: false`)→ JSON 中正确展开 + YAML 输出保留引用
- [ ] YAML 1.2 类型标签(`!!str 123`)→ 强制为字符串
- [ ] 空 YAML → 输出 `null`
- [ ] 注释行(`#`)→ 正确忽略

#### JSON → YAML
- [ ] 简单 JSON object → 正确 YAML
- [ ] 嵌套数组 → 正确 YAML 列表
- [ ] 含 null 值的 JSON → YAML 用 `null` 或 `~`
- [ ] 数字类型(int vs float)→ 正确区分(无 `.0` 后缀噪音)
- [ ] 长字符串(>80 字符)→ 不折行(`lineWidth: -1` 验证)

#### YAML 验证
- [ ] 合法 YAML → 绿色 ✓ "Valid YAML"
- [ ] Tab + 空格混用 → 红色错误 + 行号 + 中文提示 "缩进错误"
- [ ] 重复 key → 红色错误 + "重复 key" 中文提示
- [ ] 缺少冒号 → 红色错误 + "期望 key:value 格式"
- [ ] 错误信息折叠展开(`<details>`)正常工作
- [ ] Validate toggle off → 不做验证

#### 场景预设
- [ ] Generic preset → 示例为简单键值对
- [ ] Kubernetes preset → 示例含 `apiVersion` / `kind` / `metadata`
- [ ] GitHub Actions preset → 示例含 `on` / `jobs` / `steps`
- [ ] Docker Compose preset → 示例含 `version` / `services`
- [ ] 切换预设 → 提示文案更新
- [ ] K8s preset 下输入缺 `kind` → 警告

#### 缩进 / Sort Keys
- [ ] 缩进 2 → JSON 输出 2 空格缩进
- [ ] 缩进 4 → JSON 输出 4 空格缩进
- [ ] Sort keys on → JSON key 按字母序
- [ ] Sort keys off → JSON key 保持原顺序

#### Copy / Download
- [ ] Copy → clipboard 写入正确
- [ ] 显示 "Copied ✓" 提示 1.5s
- [ ] YAML 模式下载 `.yaml` 文件
- [ ] JSON 模式下载 `.json` 文件
- [ ] 文件名含时间戳或预设名(避免覆盖)

#### 键盘快捷键
- [ ] `Ctrl+Enter` 立即转换
- [ ] `Ctrl+L` 加载示例
- [ ] `Ctrl+K` 清空
- [ ] `Tab` 在 textarea 插入 tab 字符(不切换焦点)

### 5.2 UI / 响应式

- [ ] 桌面端(>900px)左右分栏 + divider 可拖拽
- [ ] 移动端(≤900px)单栏 + viewtab 切换
- [ ] Divider 拖拽比例存 localStorage,刷新保留
- [ ] 暗色模式(`.dark`)CSS 变量正确覆盖
- [ ] 亮色模式无 `.dark` 时正确显示
- [ ] 工具栏按钮 hover / focus 状态
- [ ] Toggle 勾选状态视觉反馈
- [ ] 错误条颜色对比度足够(WCAG AA)

### 5.3 性能

- [ ] 100 行 YAML 输入 → 解析 < 50ms
- [ ] 5000 行 YAML 输入 → 解析 < 500ms,UI 不卡
- [ ] 50000 行 YAML 输入 → 显示 "文件过大" 警告
- [ ] debounce ~150ms 生效
- [ ] 切换 indent / sortKeys < 100ms

### 5.4 SEO / 内容

- [ ] title 字符数 ≤ 60
- [ ] meta description 字符数 ≤ 160
- [ ] H1 含主关键词 "YAML to JSON Converter"
- [ ] 前 200 字 `yaml to json` 出现 ≥ 3 次
- [ ] WebApplication JSON-LD 嵌入,Google Rich Results Test 通过
- [ ] FAQPage JSON-LD 嵌入(6-8 条)
- [ ] HowTo JSON-LD 嵌入(可选)
- [ ] og:title / og:description / og:image 设置正确(等 og:image 设计完成后)
- [ ] canonical URL = `https://dlsome.top/tools/yaml-to-json/`
- [ ] FAQ 区块 6-8 条,最后一条链回 json-to-typescript
- [ ] Related Tools 区块(链回 json-to-typescript + 跨站 webpenson-tools)

### 5.5 内链

- [ ] `content/tools/json-to-typescript.md` Related Tools 区块加 yaml-to-json 链接
- [ ] `content/tools/json-to-typescript.md` Configuration Files 段落加链接
- [ ] `content/_index.md` 工具列表新增 `### 格式转换` 分类
- [ ] `(可选)` webpenson-tools `json-to-typescript.md` 加反向链

### 5.6 构建 / 部署

- [ ] `hugo --gc --minify` 构建无错误
- [ ] `/tools/yaml-to-json/` 访问 200
- [ ] shortcode 渲染正常,无 HTML 残留
- [ ] PageSpeed Insights 分数 ≥ 90(纯前端)
- [ ] mobile Lighthouse 分数 ≥ 90
- [ ] 没有 404 链接(站内)

### 5.7 浏览器兼容(快速冒烟)

- [ ] Chrome 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版(若阿南有 Mac)
- [ ] 移动 Safari iOS
- [ ] 移动 Chrome Android

### 5.8 安全 / 隐私

- [ ] DevTools Network 面板:转换时 0 个 outbound request
- [ ] 粘贴 `<script>alert(1)</script>` 到 YAML → 不执行
- [ ] 粘贴 100MB 文本 → 警告而非卡死
- [ ] 关闭网络后页面仍可用(纯前端验证)

---

## 6. 上线后监控(STRATEGY §13)

| 指标 | 目标值 | 监测方式 |
|---|---|---|
| Google 收录 | ≤ 7 天收录 | `site:dlsome.top/tools/yaml-to-json/` |
| 自然点击 CTR | ≥ 4% | Google Search Console |
| 平均停留时间 | ≥ 75 秒 | GA4 / Umami |
| 跳出率 | ≤ 65% | GA4 / Umami |
| FAQ rich result | 出现 ≥ 3 条 | GSC 增强功能 |
| json-to-typescript 互链 CTR | +5% | 跨页面 referrer |
| 跟 json-to-typescript 组合使用率 | ≥ 8% 会话 | 站内 referrer |

---

## 7. 二期扩展预留(STRATEGY §14)

前端架构预留扩展点:
- **Preset 数组化:** 4 个预设 → 数组 `PRESETS`,未来加 YAML↔TOML / YAML↔XML / YAML Schema Validator 直接 push
- **Converter 抽象:** `converters = { yaml2json, json2yaml, yaml2toml, ... }` 字典,UI 切换即可
- **JSON-LD featureList:** 直接复用 STRATEGY §7 的列表,新功能追加无需重写

---

## 8. 实施时间表

| 步骤 | 工时 | 优先级 |
|---|---|---|
| Step 1: shortcode HTML + CSS | 1.5h | P0 |
| Step 2: YAML → JSON 核心 | 1.0h | P0 |
| Step 3: JSON → YAML 反向 | 0.5h | P0 |
| Step 4: YAML 验证 + 友好错误 | 1.0h | P0 |
| Step 5: 场景预设 4 个 | 1.0h | P1 |
| Step 6: Copy / Download / 响应式 / 暗色 | 0.5h | P0 |
| Step 7: markdown 内容页 | 1.5h | P0 |
| Step 8: 内链更新 | 0.5h | P1 |
| 自测 + 修复 | 1.0h | P0 |
| **总计** | **8.5h** | — |

---

## 9. 关键决策汇总(给阿南确认)

| 决策点 | 推荐 | 备选 |
|---|---|---|
| YAML 库 | **js-yaml v4.1.0 UMD 内联** | yaml v2.x(体积过大) |
| 文件组织 | **自包含 shortcode(零外链)** | 拆出 `static/js/`(增加请求) |
| 场景预设数量 | **4 个(K8s/GA/Compose/Generic)**本期就做 | 仅 Generic,二期加(工期 -1h) |
| 暗色模式 | **沿用 PaperMod `.dark` 兼容** | 强制暗色 |
| i18n | **中英同页(中文 UI + 英文关键词)** | 拆 `/en/`(复杂度 ↑) |
| og:image | **需 designer 出图(1200×630)** | 暂用占位(SEO 略受损) |
| 跨站 webpenson-tools 内链 | **建议加** | 不加 |

---

## 10. 附录:js-yaml v4 关键 API 速查

```js
// 解析(支持 YAML 1.2 spec)
const obj = jsyaml.load(inputString);          // 单文档
const docs = jsyaml.loadAll(inputString);      // 多文档(数组)

// 序列化
const yaml = jsyaml.dump(obj, {
  indent: 2,          // 缩进空格数(默认 2)
  lineWidth: -1,      // 不折行(默认 80)
  noRefs: false,      // 保留 anchor/alias(默认 true in v4,我们要 false)
  sortKeys: false,    // 不排序(默认 false)
  schema: jsyaml.JSON_SCHEMA  // 严格 JSON 兼容 schema
});

// 错误对象(YAMLException)
e.message    // 错误信息
e.mark       // { line: 0-index, column: 0-index, position: 字符偏移, buffer: 完整输入 }
e.reason     // 错误原因(更短)
e.toString() // 完整错误
```

**v3 → v4 关键差异(避免踩坑):**
- v3 `load()` 接受 `filename` 第二参数;v4 改用 options object
- v3 `dump()` 默认 `noRefs: false`;v4 默认 `true`(本工具必须显式 `false`)
- v3 schema 默认 `DEFAULT_FULL_SCHEMA`;v4 默认 `CORE_SCHEMA`(更严格,推荐保留默认)

---

**PLAN-ENGINEERING.md 结束。开发启动前请 main agent 确认 §9 关键决策。**