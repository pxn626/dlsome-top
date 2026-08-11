---
title: "JSON Schema 在线验证器 — Draft 4/6/7/2019-09/2020-12"
description: "免费 JSON Schema 在线验证器, 支持 Draft 4/6/7/2019-09/2020-12, 中英双语错误提示, 行号定位, 树视图, 10+ 内置 Schema, 报告导出。"
slug: "json-schema-validator"
date: "2026-08-10T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "json_schema_validator"
url: "/zh/tools/json-schema-validator/"
tools:
  - "json-schema"
  - "openapi"
  - "swagger"
  - "ajv"
  - "api-契约"
  - "schema-验证"
  - "draft-2020-12"
  - "draft-7"
  - "数据验证"
  - "浏览器工具"
  - "无需注册"
  - "免费"
categories:
  - "开发者工具"
  - "API 工具"
  - "Schema 验证器"
tags:
  - "json-schema"
  - "openapi-3-1"
  - "draft-2020-12"
  - "schema-验证"
  - "ajv"
  - "api-契约"
  - "树视图"
  - "双语错误"
keywords:
  - "JSON Schema 验证 在线"
  - "JSON Schema 在线 工具"
  - "OpenAPI 3.1 校验"
  - "JSON Schema 中文 错误"
  - "JSON Schema 树视图"
  - "ajv 在线"
  - "JSON Schema 报告导出"
  - "验证 JSON 符合 Schema"
  - "OpenAPI 规范 验证"
  - "package.json 校验"
  - "JSON Schema 教程 中文"
  - "tsconfig.json 校验"
  - "JSON Schema Draft 4 2020-12 区别"
  - "OpenAPI 3.0 转 3.1"
  - "JSON Schema 错误 本地化"
  - "大 Schema 验证 性能"
  - "definitions 与 defs 区别"
  - "JSON Schema preset 常用"
  - "JSON Schema 折叠 树"
  - "Schema 元数据 验证"
  - "OpenAPI 规范 校验 工具"
  - "JSON Schema 客户端 验证"
og:
  title: "JSON Schema 在线验证器 — Draft 4/6/7/2019-09/2020-12"
  description: "免费 JSON Schema 在线验证器, 支持 5 个 Draft 版本, 中英双语错误, 树视图, 10+ 内置 Schema, 报告导出。"
  image: "/tools/json-schema-validator/img/og.png"
  image_alt: "JSON Schema 在线验证器, Draft 选择器, Schema + JSON 文本框, 错误列表, 树视图"
  type: "website"
  url: "https://dlsome.top/zh/tools/json-schema-validator/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "JSON Schema 在线验证器 — 5 个 Draft 版本"
  description: "JSON Schema 在线验证, Draft 4/6/7/2019-09/2020-12。中英双语错误。无需注册。"
  image: "/tools/json-schema-validator/img/og.png"
canonical: "https://dlsome.top/zh/tools/json-schema-validator/"
---

{{< json-schema-validator >}}

# JSON Schema 在线验证器 — Draft 4/6/7/2019-09/2020-12

> **TL;DR** — 一款浏览器端 JSON Schema 在线验证器, 支持 W3C 全部 5 个 Draft (Draft 4 / 6 / 7 / 2019-09 / 2020-12) 同表切换。实时错误定位, 含行号、JSON Pointer 路径 (如 `/users/2/address/0/city`)、中英双语错误描述 (基于 ajv-i18n + 15% 关键词手工补全)。大 schema 用可折叠树视图查看 (> 500 节点启用虚拟滚动, 关键词搜索 `email` / `$ref` / `enum`)。内置 10+ preset (OpenAPI 3.0/3.1 petstore、GitHub issue、package.json、tsconfig.json、.eslintrc、docker-compose、GitLab CI、VS Code launch.json), 验证报告可导出 JSON / Markdown / HTML 供 PR 和 CI 使用。零网络请求 — ajv 8.x 完全在浏览器端运行。无需注册, 数据不出本地设备。

## A. 什么是 JSON Schema 验证器?

**JSON Schema 验证器**是一种工具, 用于检查一份 JSON 文档是否符合给定的 **JSON Schema** —— 由 [W3C](https://json-schema.org/) 标准化的声明式词汇, 用于描述任意 JSON payload 的预期形状、类型、必填字段、值约束和结构。验证器对输入数据逐条校验每条约束, 输出 `valid` 或一份带精确定位的错误列表 (instance path + 行号 + 人类可读描述)。

本工具由 **ajv 8.x** ([Another JSON Validator](https://github.com/ajv-validator/ajv)) 驱动 —— ajv 是 Node.js 和浏览器领域的事实参考实现, 也是 OpenAPI 工具链、Python `jsonschema` 库和大多数 CI/CD schema 流水线的底层引擎。我们把 ajv 与全部 5 个 draft meta-schema 打包为单个 ESM 模块 (~280 KB gzipped), 完全在客户端运行。同时支持 W3C 全部 5 个 draft —— Draft 4 (2013 遗留)、Draft 6 (2017, 加入 `const`)、Draft 7 (2018, 加入 `if/then/else`)、Draft 2019-09 (加入 `unevaluatedProperties`, 数组形式 `exclusiveMinimum/Maximum`)、Draft 2020-12 (最新 W3C 标准, OpenAPI 3.1 完全采用)。顶部 chip 选择器即时切换活动 meta-schema —— 无需刷新页面, 无需配置。

## B. 为什么用 JSON Schema 验证器?

不验证 JSON, 格式错误的 payload 会沿着调用链静默传播 —— 缺失的 `email` 字段变成 `null` 写入, 多余的 `user_id` 变成字符串型外键, 过期的 `created_at` 字符串让下游日期解析器崩溃。生产环境捕获这些问题的代价是写入时捕获的 10–100 倍 (典型 SRE 事后复盘数据)。JSON Schema 验证器让你在每一层做 **shift-left 验证** —— 编辑器预览、pre-commit 钩子、CI 流水线、API 网关、运行时中间件。

具体场景: ① **API 契约** —— 在请求进入 handler 之前, 按 OpenAPI 3.1 schema 校验请求/响应 body ② **配置文件** —— 在 build 之前, 用已知 schema 检查 `package.json`、`tsconfig.json`、`.eslintrc`、`docker-compose.yml` (Schemastore.org 托管 600+ 常用配置 schema) ③ **数据 pipeline** —— 对 ETL 流中每条记录断言其符合预期形状 ④ **OpenAPI 规范本身** —— lint spec 文件本身 (而非 spec 的实例), 在 3.0 迁移到 3.1 时捕获残留的 `nullable: true`。不像 `JSON.parse()` (只能捕获语法错误) 或 TypeScript 接口 (仅在编译期存在、不随 JSON 一起发布), JSON Schema 是 **运行时可校验** 且 **跨语言** 的。

## C. 支持的 Draft 版本(4 / 6 / 7 / 2019-09 / 2020-12)

JSON Schema 经过 5 个 W3C draft 迭代。每个 draft 都加入新特性并优化语义; 后版本并非前版本的严格超集。选对 draft 很关键, 因为工具链 (ajv、IDE 插件、OpenAPI 生成器) 只识别特定集合:

| Draft | 年份 | 主要新增 | 相对前一版的 breaking change |
|---|---|---|---|
| **Draft 4** | 2013 | `required`, `$ref`, `oneOf`/`anyOf`/`allOf`, hyper-schema | — (遗留基线) |
| **Draft 6** | 2017 | `const`, `examples`, `$id` (URI 形式), `propertyNames` | `id` → `$id` |
| **Draft 7** | 2018 | `if`/`then`/`else`, `contentEncoding`, `$comment` | 布尔形式 `exclusiveMinimum/Maximum` |
| **Draft 2019-09** | 2019 | `unevaluatedProperties`, `$defs`, `$anchor` | 数组形式 `exclusiveMinimum/Maximum`, `dependencies` 拆分 |
| **Draft 2020-12** | 2020 | `prefixItems` (元组), `dynamicRef`, `$dynamicAnchor` | `definitions` → `$defs`, `if`/`then`/`else` 细化 |

**推荐:** 任何新项目都用 **Draft 2020-12**。它语义最干净、工具支持最好, 也是 **OpenAPI 3.1 唯一接受的 Draft** (OpenAPI 3.0 用 Draft 5 extended / Draft 7 superset)。本工具支持全部 5 个, 你可以把遗留和现代 schema 并排验证 —— 试试把同一份 `package.json` schema 粘贴到每个 Draft 看差异。

## D. 使用步骤 5 步快速上手

{{< json-schema-validator >}}

60 秒内即可上手:

1. **选 Draft** —— 点击顶部 Draft 选择器的任一 chip: Draft 4 (遗留)、Draft 6、Draft 7、Draft 2019-09, 或 Draft 2020-12 (默认 —— W3C 标准, OpenAPI 3.1 采用)。活动 meta-schema 首次使用时加载并缓存。
2. **粘贴 Schema** —— 把 JSON Schema 拖到左侧 textarea (或点击下方 preset chip 行自动加载示例, 如 OpenAPI petstore 3.0/3.1、JSONPlaceholder users、GitHub issue、package.json、tsconfig.json、.eslintrc、docker-compose、GitLab CI、VS Code launch.json)。
3. **粘贴 JSON 数据** —— 把要验证的 JSON 文档拖到右侧 textarea。选 preset 时, sample data 与 Schema 一起自动加载, 你可立即看到工作示例。
4. **查看验证结果** —— 右侧面板实时更新。绿色 **Valid** 卡片表示 JSON 符合 Schema; 红色 **Invalid** 卡片列出每个错误, 含 3 个定位信息 —— instancePath (JSON Pointer 如 `/users/2/address/0/city`)、行号、中英双语错误描述。点击任一错误行, 自动滚动 textarea 到失败行并闪烁高亮 1 秒。
5. **导出报告** —— 点底部 3 个导出按钮之一 —— JSON (`validation-report.json`, 机器可读供 CI 使用)、Markdown (`validation-report.md`, 适配 GitHub PR 评论格式)、HTML (单文件 `validation-report.html`, 含内嵌语法高亮 + 可点击锚链接)。所有导出通过 Blob + `URL.createObjectURL` 客户端生成, 无服务器处理。

## E. 内置 Schema preset(10+ 常见配置文件)

Schema textarea 下方的 chip 行预置 **10+ 常见 preset**, 覆盖现代开发中最常被校验的 JSON 文件。点击任一 chip 同时加载 Schema 和匹配的 sample dataset:

- **OpenAPI 3.0 petstore** (~700 行) —— 经典的 OpenAPI 3.0 演示 spec (Apache 2.0)
- **OpenAPI 3.1 petstore** (~750 行) —— 3.1 迁移版, 用 `type: ["string", "null"]` 替代 `nullable: true`, 用 `$defs` 替代 `definitions`
- **JSONPlaceholder `users`** (~120 行) —— 热门 `/users` 接口的小巧 schema, 适合测试 Draft 选择
- **GitHub issue template** (~250 行) —— GitHub 用于 `*.github/ISSUE_TEMPLATE/*.yml` 校验的 schema
- **package.json** (~400 行) —— npm package 元数据 schema (Schemastore.org)
- **tsconfig.json** (~180 行) —— TypeScript 编译器配置 schema
- **.eslintrc** (~220 行) —— ESLint flat-config schema
- **docker-compose** (~600 行) —— Docker Compose v2 service 文件 schema
- **GitLab CI** (~350 行) —— `.gitlab-ci.yml` pipeline schema
- **VS Code launch.json** (~150 行) —— 调试启动配置 schema

Preset 让你 **一键体验验证器端到端工作**, 无需自带数据。它们也是学习工具: 对比 OpenAPI 3.0 vs 3.1 petstore, 直观理解 schema 层面的迁移影响。

## F. OpenAPI 3.0 ↔ 3.1 Schema 校验

**OpenAPI 3.1 完全采用 JSON Schema Draft 2020-12**, 而 OpenAPI 3.0 用 Draft 5 extended / Draft 7 superset。这意味着: 一份有效的 OpenAPI 3.1 spec 就是一份有效的 Draft 2020-12 Schema —— 但一份有效的 OpenAPI 3.0 spec **不会** 自动是 Draft 2020-12。迁移时要注意两个 breaking change:

① **`nullable: true` 替换为** `type: ["string", "null"]` (3.0 的 `nullable` keyword 从未进入 JSON Schema 正典 —— 它是 OpenAPI 扩展, 3.1 中以 JSON Schema 原生的"用类型数组表示 nullable"取代)
② **`$ref` 用 `#/components/schemas/...`** 与任何 JSON Schema 一致 —— 不再有 `example` 字段限制。OpenAPI 3.1 也接受 JSON Schema 的 `examples` (复数) 数组形式。

工具方面, **[Spectral](https://stoplight.io/open-source/spectral)** (Stoplight 出品) 可自动迁移 3.0 spec 到 3.1 (含 breaking change 的自定义 rulesets), **[openapi-typescript](https://openapi-ts.dev/)** 可从任一版本生成 TypeScript 类型。本工具让你把两个版本并排粘贴 —— 加载 OpenAPI 3.0 和 3.1 petstore preset, 然后运行验证, 看每个 spec 在哪个 Draft meta-schema 下有效 (以及 3.0 vs 3.1 分别暴露哪些验证错误)。

## G. 大 Schema 性能优化技巧(树视图)

典型 OpenAPI spec 500–3,000 行; 企业级 API 契约可达 10,000+ 行。用朴素 DOM 树渲染这种 Schema 会让浏览器卡顿数秒。本工具用 **3 层渐进增强** 处理大 schema:

① **< 100 行** —— 完整 DOM 渲染 **< 50 ms**, 所有 keyword 可见
② **100–500 行** —— 懒加载 `details/summary` 折叠, 首次渲染 **< 100 ms**, 节点展开 **< 30 ms**
③ **> 500 行** —— **虚拟滚动** —— 任意时刻 DOM 内只有可见节点, 关键词高亮 (试试 `email` / `$ref` / `enum`) debounce 200 ms

**> 5,000 行** 的 schema 显示警告 banner 建议拆成 `$ref` 链接文件 —— 也是 JSON Schema 最佳实践 (见 [json-schema.org/draft/2020-12/schema](https://json-schema.org/draft/2020-12/schema))。所有渲染**纯客户端 ajv 8.x** —— 无每次滚动的网络往返, 无 AI API 调用, 无 CDN 调用 (除首次页面加载外)。10+ 内置 preset 覆盖 50 到 3,000 行 —— 试试看完整性能谱。

## H. 中英双语错误本地化(zh-CN + EN)

验证错误来自 **[ajv-i18n](https://github.com/ajv-validator/ajv-i18n)** —— ajv 8.x 官方 i18n 包, 提供 **60+ locale**。默认英文 locale 内置于 ajv; 中文场景调用 `ajvI18n.zhCN(ajvInstance)`, 所有 keyword 错误信息切换到 zh-CN。

本工具打包了**手工补全的 zh-CN locale**, 填补官方包 ~15% 关键词缺失 —— 包括 `anyOf` / `oneOf` / `if-then-else` / `propertyNames` / `additionalProperties` / `dependencies` / `unevaluatedProperties`。EN→ZH 映射示例:

- `must be string` → `类型不匹配: 应为 string, 实际为 undefined`
- `must match pattern "^[a-z]+$"` → `字符串必须匹配正则表达式: ^[a-z]+$`
- `must have required property 'email'` → `缺少必填字段 email`
- `must NOT have additional properties` → `不允许有额外字段`

用顶部 banner 的 **`中文 / EN`** 切换语言。覆盖率透明显示为 **"翻译覆盖率: 92%"** —— 欢迎社区通过 GitHub PR 贡献填补剩余 8%。自有 ajv 项目的自定义 keyword 见 [ajv.js.org/i18n.html](https://ajv.js.org/i18n.html)。

## I. 常见问题 (FAQ)

### Q1. 什么是 JSON Schema?为什么用 Draft 2020-12?

JSON Schema 是一种声明式词汇, 用来标注和验证 JSON 文档 —— 描述任意 JSON payload 的预期形状、类型、必填字段、值约束和结构。它是 API 契约 (OpenAPI / Swagger)、配置文件 (package.json / tsconfig.json)、数据 pipeline schema 的事实标准。W3C 共认 5 个 Draft 版本: **Draft 4** (2013, 遗留)、**Draft 6** (2017, 加入 `const`)、**Draft 7** (2018, 加入 `if/then/else`)、**Draft 2019-09** (2019, 加入 `unevaluatedProperties`, 移除数值型 `exclusiveMinimum/Maximum`)、**Draft 2020-12** (2020, 最新 W3C 标准 —— `definitions` 改名为 `$defs`, 被 OpenAPI 3.1 完全采用)。任何新项目**都用 Draft 2020-12** —— 语义最干净、工具支持最好, 是 OpenAPI 3.1 唯一接受的 Draft。本工具支持全部 5 个, 方便你同时验证遗留和现代 schema。

### Q2. OpenAPI 3.0 怎么转 3.1?

OpenAPI 3.1 完全采用 **JSON Schema Draft 2020-12** (vs OpenAPI 3.0 用 Draft 5 extended / Draft 7 superset)。两个 breaking changes: ① **`nullable: true` 替换为** `type: ["string", "null"]` (3.0 的 `nullable` keyword 从未进入 JSON Schema 正典) ② **`$ref` 用 `#/components/schemas/...`** 与任何 JSON Schema 一致 (不再有 `example` 字段限制 —— OpenAPI 3.1 也接受 JSON Schema 的 `examples`)。工具方面, **Spectral** (Stoplight 出品) 可自动迁移 3.0 spec 到 3.1, **openapi-typescript** 可从任一版本生成类型。本工具让你把两个版本并排粘贴, 验证迁移产出是否有效 Draft 2020-12 schema —— 试试 chip 行的 OpenAPI 3.0 和 3.1 petstore preset。

### Q3. Draft 7 和 Draft 2020-12 区别?

从 **Draft 7** (2018) 到 **Draft 2020-12** (当前 W3C 标准) 有 5 个显著 breaking changes: ① **`definitions` → `$defs`** —— Draft 2020-12 把 schema 内 definitions 关键字改名为 `$defs`, 与 `$ref` / `$id` / `$schema` 一致 ② **`exclusiveMinimum/Maximum` 数组形式** —— Draft 2019-09 已将布尔形式 (`"exclusiveMinimum": true`) 改为数组形式 (`"exclusiveMinimum": [0, true]`); Draft 2020-12 保留数组形式 ③ **`$id` 替代 `id`** —— 标识 schema URI 的关键字现在是 `$id` 而非 `id` ④ **`items` 数组形式 (元组)** —— Draft 2020-12 加入 `prefixItems` 用于元组验证, 与现有 `items` 并存 ⑤ **`if/then/else` 细化** —— Draft 2020-12 加入多 `if` 支持, `dependentRequired` 关键字被改名。本工具 Draft chip 选择器即时切换活动 meta-schema —— 试试把同一份数据粘贴到每个 Draft 看差异。完整迁移指南见 https://json-schema.org/draft/2020-12/release-notes。

### Q4. 大 Schema (1000+ 行) 怎么高效验证?

本工具用 3 层渐进增强处理大 schema: ① **< 100 行** —— 完整 DOM 渲染 < 50 ms ② **100–500 行** —— 懒加载 `details/summary` 折叠, 首次渲染 < 100 ms, 展开 < 30 ms ③ **> 500 行** —— **虚拟滚动** —— 任意时刻 DOM 内只有可见节点, 关键词高亮 (试试 `email` / `$ref` / `enum`) debounce 200 ms。> 5,000 行的 schema 显示警告 banner 建议拆成 `$ref` 链接文件 (也是 JSON Schema 最佳实践)。所有渲染**纯客户端 ajv 8.x** —— 无每次滚动的网络往返。10+ 内置 preset (OpenAPI 3.0/3.1 petstore、GitHub issue、package.json、tsconfig.json 等) 覆盖 50 到 3,000 行 —— 试试看完整性能谱。

### Q5. 数据会上传服务器吗?(隐私)

**不会 —— 零网络请求。** 本工具**完全在浏览器端**运行, 通过 ajv 8.x 打包为 ESM module。你的 Schema 和 JSON 数据**绝不离开本地设备**: 无 `fetch()`、无 `XMLHttpRequest`、无 analytics、无 CDN 调用 (除首次页面加载外)。preset schema 数据 (10+ 内置) 在页面加载时一次性从同源静态 JSON 文件加载。无注册、无 Cookie、无 localStorage、无 AI API 调用。你可在浏览器 DevTools 验证 —— 打开 Network 标签验证一份 Schema, 看到 0 个外发请求。这让工具可安全用于验证生产 API 契约、客户 PII payload、内部 schema 文件。完整隐私 / 零网络承诺详见 H2-K 数据来源与免责声明。

### Q6. 怎么自定义错误信息?(ajv-i18n)

错误信息来自 **`ajv-i18n`** —— ajv 8.x 官方 i18n 包。默认英文 locale 内置于 ajv; 中文场景调用 `ajvI18n.zhCN(ajvInstance)`, 所有 keyword 错误信息切换到 zh-CN。本工具打包了**手工补全的 zh-CN locale**, 填补官方包 ~15% 缺失 (如 `anyOf` / `oneOf` / `if-then-else` / `propertyNames` / `additionalProperties` / `dependencies` / `unevaluatedProperties`)。示例: `must be string` → `类型不匹配:应为 string,实际为 undefined`, `must match pattern "^[a-z]+$"` → `字符串必须匹配正则表达式: ^[a-z]+$`, `must have required property 'email'` → `缺少必填字段 email`。用顶部 banner 的 `中文 / EN` 切换语言。覆盖率透明显示为 "翻译覆盖率: 92%" —— 欢迎社区通过 GitHub PR 贡献填补剩余 8%。自有 ajv 项目的自定义 keyword 见 https://ajv.js.org/i18n.html。

## J. 导出验证报告(JSON / Markdown / HTML)

运行完验证后, 点击结果面板底部 3 个导出按钮之一 —— 全部**通过 Blob + `URL.createObjectURL` 客户端生成** (无服务器处理):

- **JSON** —— `validation-report.json`。机器可读, 供 CI / pre-commit / pre-deploy 闸门使用。包含活动 Draft 版本、完整错误列表 (instancePath、行号、严重度、消息) 和 content hash。
- **Markdown** —— `validation-report.md`。适配 GitHub PR 评论、GitLab MR 线程、Slack/Discord 嵌入。在 markdown 预览中干净渲染表格和代码块。
- **HTML** —— `validation-report.html`。单文件自包含, 含内嵌语法高亮 (highlight.js inline) 和可点击锚链接回到每个错误。适合邮件 postmortem 或 wiki 归档。

导出按钮上方的隐私 checkbox 让你选择导出文件是否包含 Schema 和 Data (默认关闭 —— 报告仅含错误 + 定位信息, 不含 payload)。3 种格式都保留完整错误上下文 (instancePath、行号、中英双语消息、修复建议), 可直接替代 CI 仪表板或 PR 评论。

## 相关开发者工具

JSON Schema 验证只是 API / 数据契约工作流的一环。这些 dlsome.top 工具构成完整的 JSON 工具链:

- **[JSON 转 TypeScript 生成器](/zh/tools/json-to-typescript/)** —— 从任意 JSON Schema 生成 TypeScript `interface` / `type` (验证后的自然下一步)
- **[YAML 转 JSON 转换器](/zh/tools/yaml-to-json/)** —— 将 YAML 配置 (OpenAPI / k8s / docker-compose) 转为 JSON 后再做 Schema 验证
- **[JSONPath 在线查询](/zh/tools/json-path-tester/)** —— 用 JSONPath 表达式查询嵌套 JSON (验证后调试无效数据)
- **[JWT 解码器](/zh/tools/jwt-decoder/)** —— 检查 JWT header / payload / signature (API 契约调试)
- **[JWT 检查器](/zh/tools/jwt-inspector/)** —— 完整 JWT claim 检查 + 算法验证
- **[Cron 表达式解析器](/zh/tools/cron-parser/)** —— 解析和解释配置文件中的 cron 表达式
- **[Claude Skills 模板库](/zh/tools/claude-skills-gallery/)** —— 50+ Anthropic Skills YAML 模板 (AI 驱动 API 工作流)
- **[dlsome.top 首页](/zh/)** —— 浏览 dlsome.top 全部开发者工具

---

## K. 数据来源与免责声明

本工具基于 **开源、浏览器打包的依赖** 构建 —— 无运行时 API 调用:

- **[ajv 8.x](https://github.com/ajv-validator/ajv)** (MIT) —— 参考 JSON Schema 验证器
- **[ajv-draft-04](https://github.com/ajv-validator/ajv-draft-04)** (MIT) —— ajv 8.x 的 Draft 4 支持
- **[ajv-formats](https://github.com/ajv-validator/ajv-formats)** (MIT) —— `format` keyword (`email`、`uri`、`date-time` 等)
- **[ajv-i18n](https://github.com/ajv-validator/ajv-i18n)** (MIT) —— 60+ locale, 手工补全的 zh-CN
- **[W3C JSON Schema 规范](https://json-schema.org/)** —— 5 个 draft meta-schema, 公共领域
- **Preset schema** —— [SchemaStore.org](https://json.schemastore.org/) (MIT)、OpenAPI petstore (Apache 2.0)、JSONPlaceholder (公共领域)

ajv bundle 大小 **~280 KB gzipped** (含全部 5 个 draft meta-schema + ajv-formats)。顶部 banner 显示当前 Draft、AJV 版本、bundle 大小, 透明可查。**零网络请求承诺** —— 你的 Schema 和 JSON 数据绝不离开浏览器。价格 / preset 数据在数据文件 `lastUpdated` 字段时间点对官方源做核实。最后更新: **2026-08-10**。

## L. 参考资料

- W3C JSON Schema Draft 2020-12: <https://json-schema.org/draft/2020-12/schema>
- W3C JSON Schema Draft 2019-09: <https://json-schema.org/draft/2019-09/schema>
- W3C JSON Schema Draft 7: <https://json-schema.org/draft-07/schema>
- ajv 8.x (参考实现): <https://github.com/ajv-validator/ajv>
- ajv-i18n: <https://github.com/ajv-validator/ajv-i18n>
- OpenAPI 3.1 规范: <https://spec.openapis.org/oas/v3.1.0>
- SchemaStore (preset 来源): <https://json.schemastore.org/>
- JSONPlaceholder demo API: <https://jsonplaceholder.typicode.com/>

---

*最后更新: 2026-08-10 · JSON Schema 在线验证器 · 5 个 W3C Draft · 10+ preset · 零网络请求承诺。*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Schema 在线验证器",
  "alternateName": "JSON Schema Validator",
  "description": "免费 JSON Schema 在线验证器, 支持 Draft 4/6/7/2019-09/2020-12, 中英双语错误提示, 行号定位, 树视图, 10+ 内置 Schema, 报告导出。",
  "url": "https://dlsome.top/zh/tools/json-schema-validator/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "API Schema Validator",
  "operatingSystem": "Any (Web Browser)",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+).",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "5 个 JSON Schema Draft 版本 (Draft 4 / 6 / 7 / 2019-09 / 2020-12) 同表切换",
    "中英双语错误信息 (zh-CN + English), 基于 ajv-i18n + 15% 关键词手工补全",
    "实时错误定位 (行号 + JSON Pointer 路径, 如 /users/2/address/0/city)",
    "大 Schema 树视图 (折叠 + 搜索), > 500 节点启用虚拟滚动",
    "10+ 内置预设 (OpenAPI 3.0/3.1 petstore, GitHub issue, package.json, tsconfig.json, .eslintrc, docker-compose, GitLab CI, VS Code launch.json)",
    "JSON / Markdown / HTML 三格式验证报告导出",
    "零网络请求 (浏览器端 ajv 8.x ESM, 无需注册, 无 AI API 调用, 无 analytics)"
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
      "name": "什么是 JSON Schema?为什么用 Draft 2020-12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON Schema 是一种声明式词汇, 用来标注和验证 JSON 文档 —— 描述任意 JSON payload 的预期形状、类型、必填字段、值约束和结构。它是 API 契约 (OpenAPI / Swagger)、配置文件 (package.json / tsconfig.json)、数据 pipeline schema 的事实标准。W3C 共认 5 个 Draft 版本: Draft 4 (2013, 遗留)、Draft 6 (2017, 加入 const)、Draft 7 (2018, 加入 if/then/else)、Draft 2019-09 (2019, 加入 unevaluatedProperties, 移除数值型 exclusiveMinimum/Maximum)、Draft 2020-12 (2020, 最新 W3C 标准 —— definitions 改名为 $defs, 被 OpenAPI 3.1 完全采用)。任何新项目都用 Draft 2020-12 —— 语义最干净、工具支持最好, 是 OpenAPI 3.1 唯一接受的 Draft。本工具支持全部 5 个, 方便你同时验证遗留和现代 schema。"
      }
    },
    {
      "@type": "Question",
      "name": "OpenAPI 3.0 怎么转 3.1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAPI 3.1 完全采用 JSON Schema Draft 2020-12 (vs OpenAPI 3.0 用 Draft 5 extended / Draft 7 superset)。两个 breaking changes: nullable: true 替换为 type: [\"string\", \"null\"] (3.0 的 nullable keyword 从未进入 JSON Schema 正典); $ref 用 #/components/schemas/... 与任何 JSON Schema 一致 (不再有 example 字段限制 —— OpenAPI 3.1 也接受 JSON Schema 的 examples)。工具方面, Spectral (Stoplight 出品) 可自动迁移 3.0 spec 到 3.1, openapi-typescript 可从任一版本生成类型。本工具让你把两个版本并排粘贴, 验证迁移产出是否有效 Draft 2020-12 schema —— 试试 chip 行的 OpenAPI 3.0 和 3.1 petstore preset。"
      }
    },
    {
      "@type": "Question",
      "name": "Draft 7 和 Draft 2020-12 区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "从 Draft 7 (2018) 到 Draft 2020-12 (当前 W3C 标准) 有 5 个显著 breaking changes: definitions → $defs —— Draft 2020-12 把 schema 内 definitions 关键字改名为 $defs, 与 $ref / $id / $schema 一致; exclusiveMinimum/Maximum 数组形式 —— Draft 2019-09 已将布尔形式 (\"exclusiveMinimum\": true) 改为数组形式 (\"exclusiveMinimum\": [0, true]); Draft 2020-12 保留数组形式; $id 替代 id —— 标识 schema URI 的关键字现在是 $id 而非 id; items 数组形式 (元组) —— Draft 2020-12 加入 prefixItems 用于元组验证, 与现有 items 并存; if/then/else 细化 —— Draft 2020-12 加入多 if 支持, dependentRequired 关键字被改名。本工具 Draft chip 选择器即时切换活动 meta-schema —— 试试把同一份数据粘贴到每个 Draft 看差异。完整迁移指南见 https://json-schema.org/draft/2020-12/release-notes。"
      }
    },
    {
      "@type": "Question",
      "name": "大 Schema (1000+ 行) 怎么高效验证?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本工具用 3 层渐进增强处理大 schema: < 100 行 —— 完整 DOM 渲染 < 50 ms; 100–500 行 —— 懒加载 details/summary 折叠, 首次渲染 < 100 ms, 展开 < 30 ms; > 500 行 —— 虚拟滚动 —— 任意时刻 DOM 内只有可见节点, 关键词高亮 (试试 email / $ref / enum) debounce 200 ms。> 5,000 行的 schema 显示警告 banner 建议拆成 $ref 链接文件 (也是 JSON Schema 最佳实践)。所有渲染纯客户端 ajv 8.x —— 无每次滚动的网络往返。10+ 内置 preset (OpenAPI 3.0/3.1 petstore、GitHub issue、package.json、tsconfig.json 等) 覆盖 50 到 3,000 行 —— 试试看完整性能谱。"
      }
    },
    {
      "@type": "Question",
      "name": "数据会上传服务器吗?(隐私)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不会 —— 零网络请求。本工具完全在浏览器端运行, 通过 ajv 8.x 打包为 ESM module。你的 Schema 和 JSON 数据绝不离开本地设备: 无 fetch()、无 XMLHttpRequest、无 analytics、无 CDN 调用 (除首次页面加载外)。preset schema 数据 (10+ 内置) 在页面加载时一次性从同源静态 JSON 文件加载。无注册、无 Cookie、无 localStorage、无 AI API 调用。你可在浏览器 DevTools 验证 —— 打开 Network 标签验证一份 Schema, 看到 0 个外发请求。这让工具可安全用于验证生产 API 契约、客户 PII payload、内部 schema 文件。完整隐私 / 零网络承诺详见数据来源与免责声明章节。"
      }
    },
    {
      "@type": "Question",
      "name": "怎么自定义错误信息?(ajv-i18n)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "错误信息来自 ajv-i18n —— ajv 8.x 官方 i18n 包。默认英文 locale 内置于 ajv; 中文场景调用 ajvI18n.zhCN(ajvInstance), 所有 keyword 错误信息切换到 zh-CN。本工具打包了手工补全的 zh-CN locale, 填补官方包 ~15% 缺失 (如 anyOf / oneOf / if-then-else / propertyNames / additionalProperties / dependencies / unevaluatedProperties)。示例: must be string → 类型不匹配:应为 string,实际为 undefined; must match pattern \"^[a-z]+$\" → 字符串必须匹配正则表达式: ^[a-z]+$; must have required property 'email' → 缺少必填字段 email。用顶部 banner 的 中文 / EN 切换语言。覆盖率透明显示为 \"翻译覆盖率: 92%\" —— 欢迎社区通过 GitHub PR 贡献填补剩余 8%。自有 ajv 项目的自定义 keyword 见 https://ajv.js.org/i18n.html。"
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
  "name": "如何在线验证 JSON 是否符合 JSON Schema",
  "description": "使用 dlsome.top JSON Schema 在线验证器 (支持 Draft 4/6/7/2019-09/2020-12) 验证 JSON 是否符合 Schema 的分步指南。",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "选择 Draft 版本",
      "text": "用顶部 chip 选择器挑选 JSON Schema Draft 版本: Draft 4 (遗留)、Draft 6、Draft 7、Draft 2019-09, 或 Draft 2020-12 (默认 —— W3C 标准, OpenAPI 3.1 采用)。验证器首次使用时 lazy-load 各 meta-schema。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "粘贴 Schema",
      "text": "把 JSON Schema 粘贴到左侧 textarea (或从 chip 行选 preset —— OpenAPI petstore 3.0/3.1、JSONPlaceholder users、GitHub issue、package.json、tsconfig.json、.eslintrc、docker-compose、GitLab CI、VS Code launch.json, 或自实现简易 schema)。textarea 支持行号与语法高亮。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "粘贴 JSON 数据",
      "text": "把要验证的 JSON 文档粘贴到右侧 textarea。选 preset 时, sample data 与 Schema 一起自动加载, 你可立即看到工作示例。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "查看验证结果",
      "text": "右侧面板实时更新。绿色 Valid 卡片表示 JSON 符合 Schema; 红色 Invalid 卡片列出每个错误, 含 3 个定位信息 —— instancePath (JSON Pointer 如 /users/2/address/0/city)、行号、中英双语错误描述。点击任一错误行, 自动滚动 textarea 到失败行并闪烁高亮 1 秒。"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "导出报告",
      "text": "点底部 3 个导出按钮之一 —— JSON (validation-report.json, 机器可读供 CI 使用)、Markdown (validation-report.md, 适配 GitHub PR 评论格式)、HTML (单文件 validation-report.html, 含内嵌语法高亮 + 可点击锚链接回到每个错误)。所有导出通过 Blob + URL.createObjectURL 客户端生成, 无服务器处理。"
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
    { "@type": "ListItem", "position": 3, "name": "JSON Schema 在线验证器", "item": "https://dlsome.top/zh/tools/json-schema-validator/" }
  ]
}
</script>
