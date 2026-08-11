---
title: "JSONPath 测试器 — JSONPath / JSONata / JMESPath 在线工具"
description: "免费 JSONPath 测试器 — JSONPath / JSONata / JMESPath 三语法实时切换。树视图 + 路径高亮 + preset + 分享 URL + Worker 处理大 JSON。无需注册。"
slug: "json-path-tester"
date: "2026-08-11T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "json_path_tester"
url: "/zh/tools/json-path-tester/"
tools:
  - "jsonpath"
  - "jsonata"
  - "jmespath"
  - "json-query"
  - "json-path"
  - "xpath-inspired"
  - "stefan-gossner"
  - "ibm-jsonata"
  - "aws-jmespath"
  - "browser-tool"
  - "no-signup"
  - "free"
categories:
  - "开发者工具"
  - "JSON 工具"
  - "查询工具"
tags:
  - "jsonpath"
  - "jsonata"
  - "jmespath"
  - "json-query"
  - "tree-view"
  - "path-highlight"
  - "shareable-url"
  - "worker-thread"
keywords:
  - "JSONPath 测试器"
  - "JSONPath 在线"
  - "JSONPath 表达式"
  - "JSONPath 评估"
  - "JSONPath 工具"
  - "JSONPath 过滤"
  - "JSONPath 递归"
  - "JSONPath 通配"
  - "JSONPath 正则"
  - "JSONata 工具"
  - "JMESPath 测试"
  - "JSON 查询"
  - "JSON 路径"
  - "提取 JSON 字段"
  - "JSON 树视图"
  - "大 JSON 查看"
  - "JSON 路径查找"
  - "JSON 路径查询"
  - "JSONPath 过滤数组"
  - "JSONPath 切片"
  - "JSONPath 和 JSONata 区别"
  - "JSONPath 和 JMESPath 区别"
og:
  title: "JSONPath 测试器 — JSONPath / JSONata / JMESPath 在线"
  description: "免费 JSONPath 测试器 — JSONPath / JSONata / JMESPath 三语法实时切换。树视图 + 路径高亮 + preset + 分享 URL + Worker 处理大 JSON。无需注册。"
  image: "/tools/json-path-tester/img/og.png"
  image_alt: "JSONPath 测试器含语法 tabs (JSONPath/JSONata/JMESPath)、JSON 输入、表达式输入、树视图和路径高亮"
  type: "website"
  url: "https://dlsome.top/zh/tools/json-path-tester/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "JSONPath 测试器 — 三语法 · 树视图高亮"
  description: "在线测试 JSONPath / JSONata / JMESPath。实时预览、树视图、可分享 URL。无需注册。"
  image: "/tools/json-path-tester/img/og.png"
canonical: "https://dlsome.top/zh/tools/json-path-tester/"
---

JSONPath / JSONata / JMESPath 是三种用于从 JSON 提取数据的查询语言。JSONPath 测试器让你粘贴任意 JSON、编写表达式、单击切换语法,并实时查看匹配结果 — 附带树视图、路径高亮、可分享 URL。一切在浏览器内运行; 无需注册、无服务器往返。

## 1. 什么是 JSONPath 测试器?— JSONPath / JSONata / JMESPath 对比

JSONPath 测试器是浏览器端工具, 用于评估 JSON 查询表达式对你的 JSON 并实时显示匹配结果。三种最常见的 JSON 查询语言是 **JSONPath** (Stefan Gössner, 2007 — 仿 XPath 的路径语言, `$..price` 找每个 price 字段)、**JSONata** (IBM, Apache-2.0 — 函数式转换语言, `$sum(items.price)` 做聚合)、**JMESPath** (AWS, Apache-2.0 — AWS 事实标准, 用于 Step Functions / CLI `--query`)。多数在线测试器只支持其中一种, 切换生态时就得换工具。本测试器三者并列支持, 共享同一输入区、同一树视图、同一可分享 URL — 选择语法 tab 后引擎在后台 lazy load。用它来调试 API 响应 (GitHub / Shopify / Stripe / k8s)、查询 JSON Schema fixture, 或提取 LLM 结构化输出中的字段。

{{< json-path-tester >}}

## 2. 如何使用 JSONPath 测试器 — 语法指南

把 JSON 粘贴到左侧 textarea, 在右侧输入框输入表达式, 结果在 250ms debounce 后更新。顶部 5 个 preset chip 插入常用模式: `$..*` (递归下降 — 每个叶子)、`$.*` (通配 — 顶层所有键)、`$[?(@.price > 10)]` (过滤 — 数组元素满足条件)、`$[0:5]` (切片 — 前 5 个数组元素)、`$..price` (按 key 搜索 — 每个深度的 price 字段)。点击 JSONPath / JSONata / JMESPath tab 切换语法。工具栏显示匹配数 (`✓ 4 matches`), 查询前用 Validate 按钮检查 JSON 合法性并显示行号错误。点 Share 按钮复制 base64 编码的 URL 含 JSON + 表达式 (URL fragment 按规范永不发送至服务器 — PII / 契约 / 密钥 可放心用)。

## 3. JSONPath 快速参考 — 递归 / 通配 / 过滤 / 切片

最常用的 JSONPath 运算符: **`$`** 表示根、**`.key`** 访问子字段、**`..`** 递归下降 (遍历每条路径)、**`[n]`** 索引数组、**`[start:end]`** 半开切片、**`*`** 通配 (任何 key 或元素)、**`[?(condition)]`** 用 `@` 引用当前元素做过滤。比较运算符 `==` `!=` `<` `>` `<=` `>=`; 逻辑 `&&` `||` `!`; 正则 `=~ /pattern/flags` (jsonpath-plus 扩展)。示例: `$..price` 找每个深度的 price; `$[?(@.active)]` 过滤有 active 字段的项; `$.users[*].email` 取所有用户的邮箱; `$.store.book[0:3]` 返回前三本书。JSONata 语法不同 — 写 `$sum(items.price)` 而不是 `$..price`, 用 `$filter()` / `$map()` / `$reduce()` / `$sort()` / `$count()` 做转换。

## 4. JSONPath 实战示例 — GitHub API / Shopify / REST / Redis / GraphQL

JSONPath 在真实 API payload 上大放异彩。 **GitHub REST API**: `$.items[*].full_name` 列出 `/search/repositories` 每个仓库的 `full_name`; `$.items[?(@.stargazers_count > 1000)].html_url` 返回 >1000 star 的仓库 URL。 **Shopify Order API**: `$.line_items[?(@.quantity > 1)].title` 列出多数量 line item 的标题; `$.total_price` 取订单总额。 **REST paginated**: `$.data[?(@.status == "active")]` 过滤 active 记录; `$.meta.next` 读分页游标。 **Redis INFO dump** (JSON 包裹): `$.redis.*.used_memory_human` 显示每个 db 的内存。 **GraphQL JSON 响应**: `$.data.repository.issues.edges[*].node.title` 扁平化 connection 模式。 点击测试器顶部 "Sample Store" / "User Profile" / "API Response" / "Shopify Order" preset chip 加载真实示例, 直接试这些表达式。

## 5. 大 JSON 树视图 + 路径高亮

右侧面板把你的 JSON 渲染成可折叠树, 带**路径高亮** — 每个匹配节点获得浅黄色背景 (`#fef3c7`) + 左侧边框强调色。高亮使用两阶段预计算: **路径索引** 用 `Map<path, HTMLElement>` O(n) 构建每个节点, **高亮遍历** O(1) 每次匹配切换 CSS 类 — 100K 节点 JSON 也流畅。树顶部**可点击复制的 breadcrumb** 显示当前滚动位置 (`$ > store > book[2] > author`)。**"只显示匹配项"** 切换折叠非匹配分支, 只看命中项。100KB 以上的 JSON, 索引和匹配都在 Worker 线程内运行以保持 UI 响应 — 你可以随意输入, worker 同时解析 10MB+ payload。 用 "Tree" / "Raw" / "Compact" 视图模式 tab 切换显示密度。

## 6. 可分享 URL — Base64 编码 JSON + 表达式

点工具栏 **Share** 复制含 JSON + 表达式 + 语法模式的可分享 URL。编码按 payload 大小分三层: **小 JSON (< 2KB 编码后)** — `base64(URL-encoded JSON.stringify({j, e, s}))` 放入 URL fragment `#data=<base64>` (按 RFC 3986 fragment 永不发送至服务器); **中等 JSON (2-10KB)** — payload 先用 `pako` gzip 压缩, 再 base64 (典型 3-5 倍压缩); **大 JSON (> 10KB)** — 超 URL 安全限制, 测试器显示 "下载为 .json 文件" 按钮。Share 按钮显示编码后字符数 + 交通灯颜色 (绿 < 1KB / 黄 1-2KB / 红 > 2KB)。他人打开你的 URL 时, 测试器自动解码 fragment, 还原 JSON、表达式、语法 tab, 立即跑查询 — 零服务器往返, 零账户要求。URL 可安全粘贴到聊天 / 邮件 / GitHub issues。

## 7. JSONPath vs JSONata vs JMESPath — 何时用哪个

按任务选语言。 **JSONPath** 支持最广泛 — 每个主要 API / 库 / 文档站点都用它; 先学它。 用它来**提取特定字段** (`$.user.email`) 或**过滤数组** (`$[?(@.active)]`)。 **JSONata** 更适合**复杂转换** — 聚合 (`$sum(items.price)`)、重塑 (`{total: $sum(items.price), count: $count(items)}`)、跨嵌套数组 join。 简单 extract 不够用、本来要写 50 行 JavaScript 时用它。 **JMESPath** 是 AWS 事实标准 — 集成 AWS Step Functions / AWS CLI `--query` / AWS SDK config 时用它。 三者在本测试器一个 tab 切换; 切换引擎 ~50ms (lazy load)。

## 8. 常见 JSONPath 错误与修复方法

五大常见 JSONPath 错误: ① **漏写 `$` 根** — `store.book` 无返回; 改为 `$.store.book`。 ② **用 `and`/`or` 而不是 `&&`/`||`** — JSONPath 用 C 风格运算符, 不是 Python 风格; `$[?(@.a and @.b)]` 失败, 改 `$[?(@.a && @.b)]`。 ③ **特殊字符未加引号** — `$['key with spaces'` 可用, `$.key with spaces` 不行; 含空格 / 横线 / 点的 key 用方括号记法。 ④ **期望单值却收到数组** — JSONPath 总是返回数组; 取首个匹配用 `$[0]` 或 `$.key[0]`。 ⑤ **大 JSON 上递归下降** — `$..*` 在 10MB+ JSON 上可能跑几秒; 缩小范围 (`$.users..email` 而不是 `$..email`)。 Validate 按钮显示行号错误; 测试器的 stderr 面板显示引擎特定错误信息; `Debug` 切换打印中间 token。

## 9. 相关开发工具 — JSON Schema / JSON→TS / YAML→JSON

JSONPath 是完整 JSON 工作流的一环。 配对用: **[JSON Schema 在线验证器](/zh/tools/json-schema-validator/)** — 用 Draft 4 / 6 / 7 / 2019-09 / 2020-12 schema 验证 JSON, 双语错误 + 树视图 + 10+ preset (JSON 来源不可信时先用); **[JSON 转 TypeScript 生成器](/zh/tools/json-to-typescript/)** — 从任意 JSON 结构生成 TS `interface` / `type` (JSONPath 提取完的自然下一步); **[YAML 转 JSON 转换器](/zh/tools/yaml-to-json/)** — 把 YAML 配置 (OpenAPI / k8s / docker-compose) 转 JSON 后再用 JSONPath 查询。 API 调试: **[JWT 检查器](/zh/tools/jwt-inspector/)** 解码 JWT header / payload / signature — 用 `$.payload.scope` 提取特定 claim。 LLM 工作流: **[AI Prompt 助手](/zh/tools/ai-prompt-helper/)** 优化 prompt 以输出结构化 JSON。

## 10. 数据源与规范参考

JSONPath 由 Stefan Gössner 在 2007 年首次定义 ([goessner.net/articles/JsonPath](https://goessner.net/articles/JsonPath/)), 由 jsonpath-plus 库实现 (Apache-2.0, 10.4.0, 本测试器使用)。 JSONata 由 IBM 定义, 维护在 [docs.jsonata.org](https://docs.jsonata.org/) (Apache-2.0, 1.8.9)。 JMESPath 由 AWS 定义, 维护在 [jmespath.org](https://jmespath.org/specification.html) (Apache-2.0, jmespath.js 0.16.0)。 三个引擎都作为本地 ES module 打包在本工具 — 无 CDN 调用、无 analytics。 Shopify Order API 参考 [shopify.dev/docs/api/admin-rest](https://shopify.dev/docs/api/admin-rest/2023-04/resources/order); GitHub REST API [docs.github.com/en/rest](https://docs.github.com/en/rest)。 XPath 对比参考: [W3C XPath 3.1 规范](https://www.w3.org/TR/xpath-31/)。

## 11. 常见问题 (FAQ)

### Q1. JSONPath 和 JSONata 有什么区别?

JSONPath (2007, Stefan Gössner) 和 JSONata (IBM, Apache-2.0) 都是 JSON 查询语言, 但解决的问题不同。 **JSONPath** 是*面向路径*的只读语言: `$` 表示根, `.` / `[]` 访问子节点, `..` 递归下降, `[?(condition)]` 过滤, `*` 通配, `[start:end]` 半开切片, 结果总是包装为数组 — 即使单值也返回数组。 JSONPath 擅长**简单字段提取** (GitHub API / Shopify / k8s 配置 / Redux state), 学习曲线 5 分钟。 **JSONata** 是*面向转换*的函数式语言: 表达式不写 `$` (根隐式), 自动展开数组, 支持 100+ 内置函数 (`$sum()` / `$map()` / `$filter()` / `$reduce()` / `$sort()` / `$count()`), 返回类型随表达式变化 (单值或数组)。 JSONata 擅长**复杂数据转换** (聚合 / 重塑 / 联接), 这些场景用 JavaScript 需 50 行。 **何时选哪个**: "我要从 JSON 取字段 X" 用 JSONPath, "我要把 JSON 变成全新形状" 用 JSONata。 两者不互斥 — 许多 pipeline 先用 JSONPath *定位* 数据, 再用 JSONata *转换* 数据。 上方测试器单个 tab 即可切换两者, 立即看到差异。

### Q2. JSONPath 和 JMESPath 有什么区别?

JSONPath (2007) 和 JMESPath (AWS, Apache-2.0, Step Functions 标准) 范围相似 — 都瞄准*字段提取* — 但语法约定不同。 **根符号**: JSONPath 必填 `$` (根标记强制), JMESPath 无根标记 (表达式直接开始, 如 `store.book[0].title`)。 **字符串字面量**: JMESPath 在过滤 predicate 中用反引号包裹字符串 (`` `10` ``, `` `active` ``), JSONPath 用普通引号 (`"10"`)。 **通配符**: 两者都用 `*`。 **切片**: JSONPath 用 `[start:end:step]` (半开), JMESPath 用 `[start:stop:step]` (也是半开 — 同样语义)。 **过滤**: 两者都用 `[?(condition)]`。 **函数库**: JMESPath ~50 个内置函数 (`to_string` / `keys` / `values` / `sort` / `reverse` / `length` / `map` / `filter`), JSONPath (经 jsonpath-plus) 函数集较小 (`length` / `keys` / `concat`)。 **返回类型**: 两者都自适应 — 单值或数组随表达式而定。 **何时选哪个**: 通用 / 跨平台兼容性用 JSONPath (最常见), AWS Step Functions / AWS CLI `--query` / AWS SDK 配置集成用 JMESPath (AWS 事实标准)。 上方测试器可切换到 JMESPath tab 看同一查询的不同写法 — 跨生态迁移时很有用。

### Q3. JSONPath 中递归 `..` 运算符如何使用?

**递归下降** `..` 运算符是 JSONPath 最强大的特性: 它遍历 JSON 树中**每一条路径**, 直到找到匹配项, 不管嵌套深度。 最简形式 `$..<key>` 找到**任意深度的所有 `<key>` 出现**, 返回所有匹配值的数组。 对输入 `{ "store": {"book": {"price": 18.9}}, "warehouse": {"shelf": {"price": 9.99}} }`, 表达式 `$..price` 返回 `[18.9, 9.99]` — 两个 price 都被返回, 即使在不同深度。 常见变体: `$..*` 返回树中**每个叶子值** (大 JSON 上慎用 — 可能产生百万匹配); `$..book` 找任意深度的所有 `book` 对象; `$..[?(@.price < 10)]` **递归过滤** — 任意位置的 `price < 10` 值。 **性能提示**: 递归下降是 O(n) 遍历整树, 10MB+ JSON 上可能 >100ms。 可能时缩小范围 (`$.store..price` 只递归 store 下的 price); 全局递归搜索时, 本测试器的 Worker 线程 + 250ms debounce 防止 UI 卡顿。 **可与其他运算符组合**: `$.users..friends[0].name` 找每个用户的首个朋友名字, 任意位置 — 社交图查询的强大工具。 点击顶部 **"Recursive descent"** chip 一键插入 `$..*`。

### Q4. 如何在 JSONPath 中过滤数组元素?

JSONPath 过滤用 `[?(condition)]` predicate 语法, 支持这些运算符: **比较** `==` / `!=` / `<` / `>` / `<=` / `>=`; **逻辑** `&&` / `||` / `!` (注意: *不是* `and` / `or` / `not`); **算术** `+` / `-` / `*` / `/` / `%`; **正则** `=~ /pattern/flags` (jsonpath-plus 扩展)。 predicate 中的 `@` 符号指**当前数组元素**。 对输入 `[{price: 18.9}, {price: 12.99}, {price: 8.99}, {price: 22.99}]`, 表达式 `$[?(@.price < 10)]` 返回 `[{price: 8.99}]`; `$[?(@.price > 10 && @.price < 20)]` 返回 `[{price: 12.99}]`; `$[?(@.title == "Moby Dick")]` 按 title 精确匹配。 **取反**: `$[?(!(@.active))]` 返回非 active 项。 **存在性检查**: `$[?(@.email)]` 返回含非空 `email` 字段的项。 **正则匹配** (jsonpath-plus): `$[?(@.name =~ /^A/)]` 匹配 A 开头的 name。 点击测试器顶部的 **"Filter"** chip 一键插入 `$[?(@.price > 10)]`, 然后修改字段名和阈值 — 大多数 JSONPath 过滤表达式遵循此模板。

### Q5. 树视图中路径高亮是如何工作的?

本测试器的路径高亮使用**两阶段预计算**, 在 JSON 加载时跑一次: ① **路径索引** — 树中每个节点获得字符串化路径 (`$`, `$.store`, `$.store.book[0]`, `$.store.book[0].title` 等) 并加入 `Map<path, HTMLElement>`。 ② **高亮遍历** — 引擎返回匹配路径时, 高亮代码在 map 中查找每个路径, **O(1) 每次匹配** 切换 `.jpt-tree-match` CSS 类, 不管树大小。 匹配节点获得浅黄色背景 (`#fef3c7`) + 左侧边框强调色, 树顶部出现 **breadcrumb** 显示当前滚动位置 (如 `$ > store > book[2] > author`), 可点击复制。 工具栏显示匹配数 (`✓ 4 matches`), 树顶 **"只显示匹配项"** 切换折叠所有非匹配分支, 只看命中项。 **性能**: 索引 100K 节点 JSON ~80ms; 高亮 500 个匹配 ~5ms; 两者都在 Worker 线程中运行 (JSON > 100KB 时) 保持 UI 响应。 breadcrumb 对每段路径用 `CSS.escape()`, 所以含特殊字符的路径 (`$.a["key.with.dots"]`) 也正确工作。

### Q6. 我的 JSON 数据是否存储在你们的服务器上?

**不会 — 零网络请求。** 本测试器**完全在浏览器内运行**。 你的 JSON 数据绝不离开本地设备: 无 `fetch()`, 无 `XMLHttpRequest`, 无 analytics, 除首次页面加载外无 CDN 调用。 三个引擎 (jsonpath-plus / jsonata / jmespath.js) 作为本地 ES module 打包在 `/tools/json-path-tester/lib/*.js`, 同源加载。 preset chips 和示例 JSON 是从 `dlsome.top/tools/json-path-tester/data/*.json` 服务的静态文件 — 仅在页面加载时加载一次, 之后页面发出**零出站网络请求**。 无注册、无 Cookie、无 AI API 调用、无 telemetry。 你可在 DevTools 验证: 打开 Network 标签, 跑一个查询 — 你将看到**首次页面加载后 0 个请求**。 localStorage 历史只存最近 10 条查询 *本地* (一键清除), 可分享 URL 将数据编码进 **URL fragment** (`#data=...`), 按规范 fragment *永不发送至服务器*。 这让工具可安全用于生产 API 契约、客户 PII payload、内部 schema 文件, 以及任何需要查询的敏感 JSON。

### Q7. 如何与他人分享 JSONPath 表达式?

点击工具栏的 **"Share"** 按钮 — 测试器把你的 JSON + 表达式 + 语法模式压缩成一个可分享 URL。 编码按 payload 大小分三层: ① **小 JSON (< 2KB 编码后)** — payload 是 `base64(URL-encoded JSON.stringify({j, e, s}))`, `j` 是 JSON 字符串, `e` 是表达式, `s` 是语法模式, 结果放入 URL **fragment** `#data=<base64>` (按 RFC 3986 fragment 永不发送至服务器)。 ② **中等 JSON (2-10KB)** — payload 先用 `pako` gzip 压缩, 再 base64 (典型 3-5 倍压缩比压到 < 2KB)。 ③ **大 JSON (> 10KB)** — 超浏览器 URL 安全限制; 测试器显示 "下载为 .json 文件" 按钮 + 解释原因的 tooltip。 **加载分享 URL**: 页面加载时, 若 URL hash 以 `#data=` 开头, 测试器自动解码, 还原 JSON 到输入区, 还原表达式到表达式框, 选对应语法 tab, 立即执行查询。 **隐私提示**: 因为数据在 fragment 内, 你的分享 JSON 从不接触任何服务器 — 只有你发送 URL 的人能解码。 **Share 按钮**显示当前编码后字符数 + 交通灯颜色 (绿 < 1KB / 黄 1-2KB / 红 > 2KB)。

### Q8. JSONPath 和 XPath 有什么区别?

**JSONPath 对 JSON 就像 XPath 对 XML** — 两者都是面向树结构数据的路径查询语言。 Stefan Gössner 2007 年设计 JSONPath 时明确要镜像 XPath 的语法 (在合理处)。 **相似点**: `$` (根) ≈ `/` (XPath 根); `.key` / `..` (递归下降) ≈ `/key` / `//` (descendant axis); `[n]` (数组索引) ≈ `[position()=n]` (XPath predicate); `[?(condition)]` (过滤) ≈ `[predicate]`; `*` (通配) ≈ `*` (XPath 元素通配)。 **关键差异**: ① **返回类型** — JSONPath 总是返回数组 (即使单值), XPath 返回 node-set; ② **无 axis 支持** — JSONPath 缺少 XPath 完整 axis 模型 (`ancestor` / `following-sibling` / `preceding`); 必须用显式路径 ③ **无函数** — JSONPath 内置函数很少 vs XPath 丰富库 (`string()` / `count()` / `contains()` / `substring()`); jsonpath-plus 加了 `length` / `keys` ④ **无命名空间** — JSON 无命名空间, JSONPath 省略 namespace axis ⑤ **无节点类型** — XPath 区分 element / attribute / text / comment 节点; JSONPath 处理 object / array / value (number / string / boolean / null) ⑥ **引号** — JSONPath `['key with spaces']` 可用 (XPath 无此问题)。 **实战**: 如果你会 XPath, JSONPath 30 分钟上手 — 把 `/` 换成 `$`, 再翻译 predicate。 如果觉得 JSONPath 太弱, JSONata 和 JMESPath 是功能升级。

## 12. 相关工具与互链

JSONPath / JSONata / JMESPath 测试只是 dlsome.top JSON 工具链的一环。这些互补的开发者工具构成完整的 "**解析 → 验证 → 查询 → 生成**" 工作流:

- **[JSON Schema 在线验证器](/zh/tools/json-schema-validator/)** — 用 JSON Schema (Draft 4 / 6 / 7 / 2019-09 / 2020-12) 验证 JSON 后再用本工具查询路径 — 中英双语错误 + 树视图 + 10+ preset (JSON 来源不可信时先用这个)
- **[JSON 转 TypeScript 生成器](/zh/tools/json-to-typescript/)** — 从任意 JSON 结构生成 TypeScript `interface` / `type` (查询完后的自然下一步)
- **[YAML 转 JSON 转换器](/zh/tools/yaml-to-json/)** — 把 YAML 配置 (OpenAPI / k8s / docker-compose) 转 JSON 后再用 JSONPath 查询
- **[JWT 检查器](/zh/tools/jwt-inspector/)** — 检查 JWT header / payload / signature, 用 JSONPath 提取具体 claim (如 `$.payload.scope`)
- **[Cron 表达式解析器](/zh/tools/cron-parser/)** — 解析和解释配置文件 (k8s / GitLab CI / crontab) 中的 cron 表达式
- **[AI Prompt 助手](/zh/tools/ai-prompt-helper/)** — 优化 LLM prompt + 验证 LLM 输出的结构化 JSON
- **[Claude Skills 模板库](/zh/tools/claude-skills-gallery/)** — 50+ Anthropic Skills YAML 模板 (许多 skill 读取 JSONPath 配置)
- **[LLM Token 成本计算器](/zh/tools/llm-token-cost-estimator/)** — 13 个 LLM 模型 API 价格对比 + 月度成本预估 (AI 工程师用 JSONPath 解析结构化输出必备)
- **[dlsome.top 首页](/zh/)** — 浏览 dlsome.top 全部开发者工具

---

*最后更新:2026-08-11 · JSONPath 测试器 · 基于 [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) (Apache-2.0)、[JSONata](https://jsonata.org/) (Apache-2.0 © IBM) 和 [jmespath.js](https://github.com/jmespath/jmespath.js) (Apache-2.0)*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSONPath 测试器",
  "alternateName": "JSONPath Tester",
  "description": "免费 JSONPath 测试器 — JSONPath / JSONata / JMESPath 三语法实时切换。树视图 + 路径高亮 + preset + 分享 URL + Worker 处理大 JSON。无需注册。",
  "url": "https://dlsome.top/zh/tools/json-path-tester/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "JSON 查询工具",
  "operatingSystem": "Any (Web Browser)",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+).",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "三种 JSON 查询语法 (JSONPath / JSONata / JMESPath) tab 切换, 引擎 lazy load",
    "实时预览匹配结果 (250ms debounce, 输入不卡 UI)",
    "大 JSON 树视图 lazy expand (默认展开 3 层, > 100 节点自动折叠)",
    "树视图路径高亮 (浅黄色 #fef3c7) + 可点击复制 breadcrumb",
    "5 个常用模式 preset chip: 递归 ($..*) / 通配 ($.*) / 过滤 ($[?(@.price>10)]) / 切片 ($[0:5]) / 按 key ($..price)",
    "localStorage 历史 (最近 10 条, FIFO) + 无痕模式 fallback 提示",
    "可分享 URL (base64 编码 + 可选 pako gzip 压缩, 3 层大小处理: < 2KB / 2-10KB / > 10KB 下载)",
    "Worker 线程处理 > 100KB JSON (UI 保持响应, 10MB+ payload 不卡)",
    "零网络请求 — 三引擎 (jsonpath-plus / jsonata / jmespath.js) 本地化 ES module, 无注册, 无 analytics"
  ]
}
</script>

<!-- JSON-LD: SoftwareApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSONPath 测试器",
  "alternateName": "JSONPath Tester",
  "description": "浏览器端工具, 用于测试 JSONPath / JSONata / JMESPath 表达式作用于实时 JSON 数据。 含树视图、路径高亮、preset、可分享 URL、Worker 线程处理大 JSON。",
  "url": "https://dlsome.top/zh/tools/json-path-tester/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "JSON 查询测试器",
  "operatingSystem": "Any (Web Browser)",
  "softwareRequirements": "JavaScript ES2020+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "license": "https://www.apache.org/licenses/LICENSE-2.0",
  "featureList": [
    "JSONPath (Stefan Gössner 2007) — 面向路径的字段提取, $ 根, .. 递归, [?(条件)] 过滤, * 通配",
    "JSONata (IBM Apache-2.0) — 函数式转换, $sum() / $map() / $filter() / $reduce() / $sort() / $count()",
    "JMESPath (AWS Apache-2.0, Step Functions 标准) — AWS 生态查询语言",
    "实时预览 (250ms debounce) + Worker 线程处理 > 100KB JSON",
    "树视图 + 路径高亮 + breadcrumb + 匹配数 + 只看匹配 toggle",
    "5 个 preset chip (递归 / 通配 / 过滤 / 切片 / 按 key) + 双语 tooltip",
    "localStorage 历史 (10 条 FIFO) + 3 层大小处理的可分享 URL"
  ]
}
</script>

<!-- JSON-LD: FAQPage (8 questions) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "zh-CN",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "JSONPath 和 JSONata 有什么区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath (2007, Stefan Gössner) 和 JSONata (IBM, Apache-2.0) 都是 JSON 查询语言, 但解决的问题不同。 JSONPath 是面向路径的只读语言: $ 表示根, . / [] 访问子节点, .. 递归下降, [?(condition)] 过滤, * 通配, [start:end] 半开切片, 结果总是包装为数组 — 即使单值也返回数组。 JSONPath 擅长简单字段提取 (GitHub API / Shopify / k8s 配置 / Redux state), 学习曲线 5 分钟。 JSONata 是面向转换的函数式语言: 表达式不写 $ (根隐式), 自动展开数组, 支持 100+ 内置函数 ($sum() / $map() / $filter() / $reduce() / $sort() / $count()), 返回类型随表达式变化 (单值或数组)。 JSONata 擅长复杂数据转换 (聚合 / 重塑 / 联接), 这些场景用 JavaScript 需 50 行。 何时选哪个: \"我要从 JSON 取字段 X\" 用 JSONPath, \"我要把 JSON 变成全新形状\" 用 JSONata。 两者不互斥 — 许多 pipeline 先用 JSONPath 定位数据, 再用 JSONata 转换数据。 上方测试器单个 tab 即可切换两者, 立即看到差异。"
      }
    },
    {
      "@type": "Question",
      "name": "JSONPath 和 JMESPath 有什么区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath (2007) 和 JMESPath (AWS, Apache-2.0, Step Functions 标准) 范围相似 — 都瞄准字段提取 — 但语法约定不同。 根符号: JSONPath 必填 $ (根标记强制), JMESPath 无根标记 (表达式直接开始, 如 store.book[0].title)。 字符串字面量: JMESPath 在过滤 predicate 中用反引号包裹字符串 (`10`, `active`), JSONPath 用普通引号 (\"10\")。 通配符: 两者都用 *。 切片: JSONPath 用 [start:end:step] (半开), JMESPath 用 [start:stop:step] (也是半开 — 同样语义)。 过滤: 两者都用 [?(condition)]。 函数库: JMESPath ~50 个内置函数 (to_string / keys / values / sort / reverse / length / map / filter), JSONPath (经 jsonpath-plus) 函数集较小 (length / keys / concat)。 返回类型: 两者都自适应 — 单值或数组随表达式而定。 何时选哪个: 通用 / 跨平台兼容性用 JSONPath (最常见), AWS Step Functions / AWS CLI --query / AWS SDK 配置集成用 JMESPath (AWS 事实标准)。 上方测试器可切换到 JMESPath tab 看同一查询的不同写法 — 跨生态迁移时很有用。"
      }
    },
    {
      "@type": "Question",
      "name": "JSONPath 中递归 .. 运算符如何使用?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "递归下降 .. 运算符是 JSONPath 最强大的特性: 它遍历 JSON 树中每一条路径, 直到找到匹配项, 不管嵌套深度。 最简形式 $..<key> 找到任意深度的所有 <key> 出现, 返回所有匹配值的数组。 对输入 { \"store\": {\"book\": {\"price\": 18.9}}, \"warehouse\": {\"shelf\": {\"price\": 9.99}} }, 表达式 $..price 返回 [18.9, 9.99] — 两个 price 都被返回, 即使在不同深度。 常见变体: $..* 返回树中每个叶子值 (大 JSON 上慎用 — 可能产生百万匹配); $..book 找任意深度的所有 book 对象; $..[?(@.price < 10)] 递归过滤 — 任意位置的 price < 10 值。 性能提示: 递归下降是 O(n) 遍历整树, 10MB+ JSON 上可能 >100ms。 可能时缩小范围 ($.store..price 只递归 store 下的 price); 全局递归搜索时, 本测试器的 Worker 线程 + 250ms debounce 防止 UI 卡顿。 可与其他运算符组合: $.users..friends[0].name 找每个用户的首个朋友名字, 任意位置 — 社交图查询的强大工具。 点击顶部 \"Recursive descent\" chip 一键插入 $..*。"
      }
    },
    {
      "@type": "Question",
      "name": "如何在 JSONPath 中过滤数组元素?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath 过滤用 [?(condition)] predicate 语法, 支持这些运算符: 比较 == / != / < / > / <= / >=; 逻辑 && / || / ! (注意: 不是 and / or / not); 算术 + / - / * / / / %; 正则 =~ /pattern/flags (jsonpath-plus 扩展)。 predicate 中的 @ 符号指当前数组元素。 对输入 [{price: 18.9}, {price: 12.99}, {price: 8.99}, {price: 22.99}], 表达式 $[?(@.price < 10)] 返回 [{price: 8.99}]; $[?(@.price > 10 && @.price < 20)] 返回 [{price: 12.99}]; $[?(@.title == \"Moby Dick\")] 按 title 精确匹配。 取反: $[?(!(@.active))] 返回非 active 项。 存在性检查: $[?(@.email)] 返回含非空 email 字段的项。 正则匹配 (jsonpath-plus): $[?(@.name =~ /^A/)] 匹配 A 开头的 name。 点击测试器顶部的 \"Filter\" chip 一键插入 $[?(@.price > 10)], 然后修改字段名和阈值 — 大多数 JSONPath 过滤表达式遵循此模板。"
      }
    },
    {
      "@type": "Question",
      "name": "树视图中路径高亮是如何工作的?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "本测试器的路径高亮使用两阶段预计算, 在 JSON 加载时跑一次: 路径索引 — 树中每个节点获得字符串化路径 ($, $.store, $.store.book[0], $.store.book[0].title 等) 并加入 Map<path, HTMLElement>。 高亮遍历 — 引擎返回匹配路径时, 高亮代码在 map 中查找每个路径, O(1) 每次匹配 切换 .jpt-tree-match CSS 类, 不管树大小。 匹配节点获得浅黄色背景 (#fef3c7) + 左侧边框强调色, 树顶部出现 breadcrumb 显示当前滚动位置 (如 $ > store > book[2] > author), 可点击复制。 工具栏显示匹配数 (✓ 4 matches), 树顶 \"只显示匹配项\" 切换折叠所有非匹配分支, 只看命中项。 性能: 索引 100K 节点 JSON ~80ms; 高亮 500 个匹配 ~5ms; 两者都在 Worker 线程中运行 (JSON > 100KB 时) 保持 UI 响应。 breadcrumb 对每段路径用 CSS.escape(), 所以含特殊字符的路径 ($.a[\"key.with.dots\"]) 也正确工作。"
      }
    },
    {
      "@type": "Question",
      "name": "我的 JSON 数据是否存储在你们的服务器上?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "不会 — 零网络请求。 本测试器完全在浏览器内运行。 你的 JSON 数据绝不离开本地设备: 无 fetch(), 无 XMLHttpRequest, 无 analytics, 除首次页面加载外无 CDN 调用。 三个引擎 (jsonpath-plus / jsonata / jmespath.js) 作为本地 ES module 打包在 /tools/json-path-tester/lib/*.js, 同源加载。 preset chips 和示例 JSON 是从 dlsome.top/tools/json-path-tester/data/*.json 服务的静态文件 — 仅在页面加载时加载一次, 之后页面发出零出站网络请求。 无注册、无 Cookie、无 AI API 调用、无 telemetry。 你可在 DevTools 验证: 打开 Network 标签, 跑一个查询 — 你将看到首次页面加载后 0 个请求。 localStorage 历史只存最近 10 条查询 本地 (一键清除), 可分享 URL 将数据编码进 URL fragment (#data=...), 按规范 fragment 永不发送至服务器。 这让工具可安全用于生产 API 契约、客户 PII payload、内部 schema 文件, 以及任何需要查询的敏感 JSON。"
      }
    },
    {
      "@type": "Question",
      "name": "如何与他人分享 JSONPath 表达式?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "点击工具栏的 \"Share\" 按钮 — 测试器把你的 JSON + 表达式 + 语法模式压缩成一个可分享 URL。 编码按 payload 大小分三层: 小 JSON (< 2KB 编码后) — payload 是 base64(URL-encoded JSON.stringify({j, e, s})), j 是 JSON 字符串, e 是表达式, s 是语法模式, 结果放入 URL fragment #data=<base64> (按 RFC 3986 fragment 永不发送至服务器)。 中等 JSON (2-10KB) — payload 先用 pako gzip 压缩, 再 base64 (典型 3-5 倍压缩比压到 < 2KB)。 大 JSON (> 10KB) — 超浏览器 URL 安全限制; 测试器显示 \"下载为 .json 文件\" 按钮 + 解释原因的 tooltip。 加载分享 URL: 页面加载时, 若 URL hash 以 #data= 开头, 测试器自动解码, 还原 JSON 到输入区, 还原表达式到表达式框, 选对应语法 tab, 立即执行查询。 隐私提示: 因为数据在 fragment 内, 你的分享 JSON 从不接触任何服务器 — 只有你发送 URL 的人能解码。 Share 按钮显示当前编码后字符数 + 交通灯颜色 (绿 < 1KB / 黄 1-2KB / 红 > 2KB)。"
      }
    },
    {
      "@type": "Question",
      "name": "JSONPath 和 XPath 有什么区别?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath 对 JSON 就像 XPath 对 XML — 两者都是面向树结构数据的路径查询语言。 Stefan Gössner 2007 年设计 JSONPath 时明确要镜像 XPath 的语法 (在合理处)。 相似点: $ (根) ≈ / (XPath 根); .key / .. (递归下降) ≈ /key / // (descendant axis); [n] (数组索引) ≈ [position()=n] (XPath predicate); [?(condition)] (过滤) ≈ [predicate]; * (通配) ≈ * (XPath 元素通配)。 关键差异: 返回类型 — JSONPath 总是返回数组 (即使单值), XPath 返回 node-set; 无 axis 支持 — JSONPath 缺少 XPath 完整 axis 模型 (ancestor / following-sibling / preceding); 必须用显式路径; 无函数 — JSONPath 内置函数很少 vs XPath 丰富库 (string() / count() / contains() / substring()); jsonpath-plus 加了 length / keys; 无命名空间 — JSON 无命名空间, JSONPath 省略 namespace axis; 无节点类型 — XPath 区分 element / attribute / text / comment 节点; JSONPath 处理 object / array / value (number / string / boolean / null); 引号 — JSONPath ['key with spaces'] 可用 (XPath 无此问题)。 实战: 如果你会 XPath, JSONPath 30 分钟上手 — 把 / 换成 $, 再翻译 predicate。 如果觉得 JSONPath 太弱, JSONata 和 JMESPath 是功能升级。"
      }
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
    { "@type": "ListItem", "position": 3, "name": "JSONPath 测试器", "item": "https://dlsome.top/zh/tools/json-path-tester/" }
  ]
}
</script>

<!-- JSON-LD: HowTo (4 steps) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "inLanguage": "zh-CN",
  "name": "如何在线测试 JSONPath 表达式",
  "description": "使用 dlsome.top JSONPath 测试器测试 JSONPath / JSONata / JMESPath 表达式的分步指南 — 粘贴 JSON、编写表达式、切换语法、用树视图和路径高亮查看实时结果。",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "粘贴 JSON",
      "text": "把任意 JSON 数据粘贴到左侧 textarea (或点击 preset chip 加载 Sample Store / User Profile / API Response / Shopify Order 示例数据)。 textarea 支持高达 10MB; JSON > 100KB 时自动在 Worker 线程解析保持 UI 响应。 开始查询前用 \"Validate\" 按钮检查 JSON 合法性并显示行号错误。"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "编写 JSONPath 表达式",
      "text": "在右侧输入框输入表达式 (默认语法 JSONPath)。 用 5 个 preset chip 快速使用常用模式: $..* (递归下降) / $.* (通配) / $[?(@.price > 10)] (过滤) / $[0:5] (切片) / $..price (按 key 搜索)。 每个 chip 都有 tooltip 解释何时使用。 表达式实时解析, 250ms debounce 后更新结果。"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "按需切换语法",
      "text": "点击顶部 JSONPath / JSONata / JMESPath tab 切换语法。 每个 tab lazy load 对应引擎 (jsonpath-plus / jsonata / jmespath.js 本地化)。 placeholder、preset 列表、结果渲染都适配当前语法。 JSONPath 必填 $ 根, 返回数组; JSONata 省 $ 且支持 100+ 函数 ($sum() / $map() / $filter()); JMESPath 字符串用反引号 (`active`) 且是 AWS Step Functions 标准。"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "用树视图 + 路径高亮查看结果",
      "text": "右侧面板实时更新。 三种显示模式可选: Raw JSON (紧凑) / Tree View (可折叠 + 路径高亮 — 匹配路径浅黄色 #fef3c7 背景 + 顶部可点击复制 breadcrumb) / Compact (单行摘要)。 工具栏显示匹配数 (如 ✓ 4 matches)。 用 \"Share\" 按钮复制 base64 编码 URL (含 JSON + 表达式); 用 \"History\" 从 localStorage 加载最近 10 条查询。"
    }
  ]
}
</script>