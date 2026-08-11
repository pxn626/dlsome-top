---
title: "JSONPath Tester — JSONPath / JSONata / JMESPath Online"
description: "Free JSONPath tester online — JSONPath, JSONata, JMESPath. Live preview, tree view + path highlight, presets, shareable URL, worker thread for large JSON. No signup."
slug: "json-path-tester"
date: "2026-08-11T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "json_path_tester"
url: "/tools/json-path-tester/"
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
  - "Developer Tools"
  - "JSON Tools"
  - "Query Tools"
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
  - "JSONPath tester"
  - "JSONPath online"
  - "JSONPath playground"
  - "JSONPath evaluator"
  - "JSONPath expression tester"
  - "JSONPath filter example"
  - "JSONPath recursive descent"
  - "JSONPath wildcard"
  - "JSONPath regex match"
  - "JSONata playground"
  - "JMESPath tester"
  - "JSON query tool"
  - "JSON path expression"
  - "extract data from JSON"
  - "JSON tree view online"
  - "large JSON viewer"
  - "JSON path finder"
  - "JSON path query language"
  - "JSONPath filter array"
  - "JSONPath slice array"
  - "JSONPath vs JSONata"
  - "JSONPath vs JMESPath"
og:
  title: "JSONPath Tester — JSONPath / JSONata / JMESPath Online"
  description: "Free JSONPath tester online — JSONPath, JSONata, JMESPath. Live preview, tree view + path highlight, presets, shareable URL, worker thread for large JSON. No signup."
  image: "/tools/json-path-tester/img/og.png"
  image_alt: "JSONPath Tester with syntax tabs (JSONPath/JSONata/JMESPath), JSON input, expression input, tree view with highlighted matches"
  type: "website"
  url: "https://dlsome.top/tools/json-path-tester/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "JSONPath Tester — 3 Syntaxes · Tree Highlight"
  description: "Test JSONPath / JSONata / JMESPath online. Live preview, tree view, shareable URL. No signup."
  image: "/tools/json-path-tester/img/og.png"
canonical: "https://dlsome.top/tools/json-path-tester/"
---

JSONPath / JSONata / JMESPath are three query languages for extracting data from JSON. JSONPath Tester lets you paste any JSON, write an expression, switch syntaxes with a single tab click, and see live matches — with a tree view, path highlighting, and shareable URLs. Everything runs in your browser; no signup, no server round-trips.

## 1. What Is a JSONPath Tester? — JSONPath vs JSONata vs JMESPath

A JSONPath tester is a browser-based tool that evaluates JSON query expressions against your JSON and shows the matches in real time. The three most common JSON query languages are **JSONPath** (Stefan Gössner, 2007 — the XPath-inspired path language, `$..price` to find every `price`), **JSONata** (IBM, Apache-2.0 — the functional transformation language, `$sum(items.price)` to aggregate), and **JMESPath** (AWS, Apache-2.0 — the de-facto AWS standard used in Step Functions / CLI `--query`). Most online testers support only one of the three, forcing you to switch tools whenever you change ecosystem. This tester supports all three side-by-side with the same input area, the same tree view, and the same shareable URL — pick a syntax tab and the engine lazy-loads in the background. Use it to debug API responses (GitHub / Shopify / Stripe / k8s), query JSON Schema fixtures, or extract fields from LLM structured outputs.

{{< json-path-tester >}}

## 2. How to Use JSONPath Tester — Syntax Guide

Paste your JSON in the left textarea, type an expression in the right input box, and the result updates after a 250 ms debounce. The 5 preset chips at the top insert common patterns: `$..*` (recursive descent — every leaf), `$.*` (wildcard — top-level keys), `$[?(@.price > 10)]` (filter — array elements matching a condition), `$[0:5]` (slice — first five array elements), `$..price` (key search — every `price` field at any depth). Click the JSONPath / JSONata / JMESPath tab to switch syntaxes. The toolbar shows the match count (`✓ 4 matches`), and a Validate button checks JSON legality with line-number errors before querying. Use the Share button to copy a base64-encoded URL containing your JSON + expression (URL fragments are never sent to the server — safe for PII / contracts / secrets).

## 3. JSONPath Quick Reference — Recursive / Wildcard / Filter / Slice

The most-used JSONPath operators: **`$`** is the root, **`.key`** accesses a child field, **`..`** is recursive descent (walks every path), **`[n]`** indexes an array, **`[start:end]`** slices (half-open), **`*`** is wildcard (any key or any element), **`[?(condition)]`** filters with `@` referring to the current element. Comparison operators are `==` `!=` `<` `>` `<=` `>=`; logical operators are `&&` `||` `!`; regex match is `=~ /pattern/flags` (jsonpath-plus extension). Example patterns: `$..price` finds every price at any depth; `$[?(@.active)]` filters items with an `active` field; `$.users[*].email` extracts every user's email; `$.store.book[0:3]` returns the first three books. For JSONata the syntax differs — write `$sum(items.price)` instead of `$..price`, and use `$filter()` / `$map()` / `$reduce()` / `$sort()` / `$count()` for transforms.

## 4. Real-World JSONPath Examples — GitHub API / Shopify / REST / Redis / GraphQL

JSONPath shines on real API payloads. **GitHub REST API**: `$.items[*].full_name` lists every repository's `full_name` from `/search/repositories`; `$.items[?(@.stargazers_count > 1000)].html_url` returns the URL of repos with >1000 stars. **Shopify Order API**: `$.line_items[?(@.quantity > 1)].title` lists titles of multi-quantity line items; `$.total_price` extracts the order total. **REST paginated**: `$.data[?(@.status == "active")]` filters active records; `$.meta.next` reads the pagination cursor. **Redis INFO dump** (JSON-wrapped): `$.redis.*.used_memory_human` shows memory for each database. **GraphQL JSON response**: `$.data.repository.issues.edges[*].node.title` flattens the connection pattern. Click "Sample Store" / "User Profile" / "API Response" / "Shopify Order" preset chips at the top of the tester to load real-world examples and try these expressions directly.

## 5. Large JSON Tree View + Path Highlighting

The right panel renders your JSON as a collapsible tree with **path highlighting** — every matched node gets a soft yellow background (`#fef3c7`) and a left-border accent. Highlighting uses a two-stage pre-computation: a **path index** builds a `Map<path, HTMLElement>` for every node in O(n), then the **highlight pass** looks up each matched path in O(1) per match — works smoothly on 100 K-node JSON. A click-to-copy breadcrumb at the top of the tree shows the current scroll position (`$ > store > book[2] > author`). A "Show only matches" toggle collapses non-matching branches so you see only the hits. For JSON over 100 KB, both indexing and matching run inside a Worker thread to keep the UI responsive — type freely while the worker parses 10 MB+ payloads. Use the "Tree" / "Raw" / "Compact" view-mode tabs to switch display density.

## 6. Shareable URL — Encode JSON + Expression in Base64

Click **Share** in the toolbar to copy a shareable URL containing your JSON + expression + syntax mode. The encoding has three tiers based on payload size: **small JSON (< 2 KB encoded)** — `base64(URL-encoded JSON.stringify({j, e, s}))` goes into the URL fragment `#data=<base64>` (fragments are never sent to the server per RFC 3986); **medium JSON (2–10 KB)** — the payload is gzip-compressed with `pako` first, then base64 (3-5× compression); **large JSON (> 10 KB)** — exceeds safe URL limits, the tester shows a "Download as .json file" button instead. The Share button displays the encoded length with a traffic-light color (green < 1 KB / yellow 1-2 KB / red > 2 KB). When someone opens your shared URL, the tester auto-decodes the fragment, restores the JSON, the expression, the syntax tab, and runs the query immediately — zero server round-trips, zero account needed. URLs are safe to paste in chat / email / GitHub issues.

## 7. JSONPath vs JSONata vs JMESPath — When to Use Which

Pick the language based on your task. **JSONPath** is the most widely supported — every major API / library / docs site uses it; learn it first. Use it when you need to **extract specific fields** (`$.user.email`) or **filter arrays** (`$[?(@.active)]`). **JSONata** is more powerful for **complex transformations** — aggregate (`$sum(items.price)`), reshape (`{total: $sum(items.price), count: $count(items)}`), join across nested arrays. Use it when a simple `extract` won't cut it and you would otherwise write 50 lines of JavaScript. **JMESPath** is the de-facto AWS standard — use it when integrating with AWS Step Functions / AWS CLI `--query` / AWS SDK config. All three are supported in this tester with a single tab click; switching engines takes ~50 ms thanks to lazy loading.

## 8. Common JSONPath Errors & How to Fix

The five most common JSONPath mistakes: ① **Missing `$` root** — `store.book` returns nothing; fix to `$.store.book`. ② **Using `and`/`or` instead of `&&`/`||`** — JSONPath uses C-style operators, not Python-style; `$[?(@.a and @.b)]` fails, fix to `$[?(@.a && @.b)]`. ③ **Quoting special characters** — `$['key with spaces']` works but `$.key with spaces` does not; use bracket notation for keys with spaces / dashes / dots. ④ **Expecting single value but getting array** — JSONPath always returns an array; to get the first match use `$[0]` or `$.key[0]`. ⑤ **Recursive descent on huge JSON** — `$..*` on 10 MB+ JSON can take seconds; scope it tightly (`$.users..email` not `$..email`). The Validate button shows line-number errors; the Tester's stderr panel displays engine-specific error messages; the `Debug` toggle prints intermediate tokens.

## 9. Related Developer Tools — JSON Schema / JSON→TS / YAML→JSON

JSONPath is one piece of a complete JSON workflow. Pair it with: **[JSON Schema Validator](/tools/json-schema-validator/)** — validate JSON against Draft 4 / 6 / 7 / 2019-09 / 2020-12 schemas with bilingual errors before running JSONPath queries; **[JSON to TypeScript Generator](/tools/json-to-typescript/)** — generate TS `interface` / `type` from any JSON structure (the natural step *after* extracting with JSONPath); **[YAML to JSON Converter](/tools/yaml-to-json/)** — convert YAML configs (OpenAPI / k8s / docker-compose) to JSON first, then run JSONPath on the converted output. For API debugging: **[JWT Inspector](/tools/jwt-inspector/)** decodes JWT header / payload / signature — extract specific claims with `$.payload.scope`. For LLM workflows: **[AI Prompt Helper](/tools/ai-prompt-helper/)** optimizes prompts for structured JSON output.

## 10. Data Sources & Specification References

JSONPath was originally specified by Stefan Gössner in 2007 ([goessner.net/articles/JsonPath](https://goessner.net/articles/JsonPath/)) and is implemented by the jsonpath-plus library (Apache-2.0, 10.4.0 used in this tester). JSONata is specified by IBM and maintained at [docs.jsonata.org](https://docs.jsonata.org/) (Apache-2.0, 1.8.9). JMESPath is specified by AWS and maintained at [jmespath.org](https://jmespath.org/specification.html) (Apache-2.0, jmespath.js 0.16.0). All three engines are bundled as local ES modules in this tool — no CDN call, no analytics. The Shopify Order API reference is at [shopify.dev/docs/api/admin-rest](https://shopify.dev/docs/api/admin-rest/2023-04/resources/order); GitHub REST API at [docs.github.com/en/rest](https://docs.github.com/en/rest). XPath comparison reference: [W3C XPath 3.1 spec](https://www.w3.org/TR/xpath-31/).

## 11. Frequently Asked Questions (FAQ)

### Q1. What is the difference between JSONPath and JSONata?

JSONPath (2007, Stefan Gössner) and JSONata (IBM, Apache-2.0) are both JSON query languages but solve different problems. **JSONPath** is a *path-oriented* read-only language: `$` denotes the root, `.` / `[]` access children, `..` is recursive descent, `[?(condition)]` filters, `*` is wildcard, `[start:end]` is half-open slicing, and the result is always wrapped in an array — even for single matches. JSONPath excels at **simple field extraction** (GitHub API / Shopify / k8s config / Redux state) with a 5-minute learning curve. **JSONata** is a *transform-oriented* functional language: expressions are written without `$` (root is implicit), it auto-flattens arrays, supports 100+ built-in functions (`$sum()` / `$map()` / `$filter()` / `$reduce()` / `$sort()` / `$count()`), and the return type adapts to the expression (single value or array). JSONata excels at **complex data transformation** (aggregate / reshape / join) that would otherwise require 50 lines of JavaScript. **When to use which**: pick JSONPath for "I need field X from this JSON", pick JSONata for "I need a totally new shape from this JSON". They are not mutually exclusive — many pipelines use JSONPath to *locate* data and JSONata to *transform* it. The tester above lets you switch between both with a single tab click and see the difference immediately.

### Q2. What is the difference between JSONPath and JMESPath?

JSONPath (2007) and JMESPath (AWS, Apache-2.0, Step Functions standard) are similar in scope — both target *field extraction* — but differ in syntax conventions. **Root symbol**: JSONPath requires `$` (root marker is mandatory), JMESPath has no root marker (expressions start directly, e.g. `store.book[0].title`). **String literals**: JMESPath wraps strings in backticks inside filter predicates (`` `10` ``, `` `active` ``), JSONPath uses regular quotes (`"10"`). **Wildcard**: both use `*`. **Slicing**: JSONPath uses `[start:end:step]` (half-open), JMESPath uses `[start:stop:step]` (also half-open — same semantics). **Filter**: both use `[?(condition)]`. **Function library**: JMESPath has ~50 built-in functions (`to_string` / `keys` / `values` / `sort` / `reverse` / `length` / `map` / `filter`), JSONPath (via jsonpath-plus) has a smaller set (`length` / `keys` / `concat`). **Return type**: both adapt — single value or array depending on expression. **When to use which**: pick JSONPath for general-purpose / cross-platform compatibility (most common), pick JMESPath when integrating with AWS Step Functions / AWS CLI `--query` / AWS SDK config (it's the de-facto AWS standard). The tester above lets you toggle the syntax tab to JMESPath and see how the same query looks different — useful when migrating between ecosystems.

### Q3. How does the recursive `..` operator work in JSONPath?

The **recursive descent** `..` operator is JSONPath's most powerful feature: it walks **every path in the JSON tree** until it finds matches, regardless of nesting depth. The simplest form, `$..<key>`, finds **every occurrence of `<key>` at any depth** and returns all matching values as an array. For input `{ "store": {"book": {"price": 18.9}}, "warehouse": {"shelf": {"price": 9.99}} }`, the expression `$..price` returns `[18.9, 9.99]` — both prices are returned even though they live at different depths. Common variations: `$..*` returns **every leaf value** in the tree (use with care on large JSON — can produce millions of matches); `$..book` finds all `book` objects at any depth; `$..[?(@.price < 10)]` filters **recursively** — every `price < 10` value anywhere. **Performance tip**: recursive descent is O(n) over the whole tree, so on 10 MB+ JSON it can take >100 ms. Scope it tightly when possible (`$.store..price` only descends into `store`); for global recursive searches, the Worker thread + 250 ms debounce in this tester prevent UI jank. **Combinable with other operators**: `$.users..friends[0].name` finds the first friend name of every user, anywhere — powerful for social-graph queries. Click the **"Recursive descent"** chip at the top to insert `$..*` instantly.

### Q4. How to filter array elements in JSONPath?

JSONPath filtering uses the `[?(condition)]` predicate syntax with these operators: **comparison** `==` / `!=` / `<` / `>` / `<=` / `>=`; **logical** `&&` / `||` / `!` (note: *not* `and` / `or` / `not`); **arithmetic** `+` / `-` / `*` / `/` / `%`; **regex** `=~ /pattern/flags` (jsonpath-plus extension). The `@` symbol inside the predicate refers to **the current array element**. For input `[{price: 18.9}, {price: 12.99}, {price: 8.99}, {price: 22.99}]`, the expression `$[?(@.price < 10)]` returns `[{price: 8.99}]`; `$[?(@.price > 10 && @.price < 20)]` returns `[{price: 12.99}]`; `$[?(@.title == "Moby Dick")]` matches by exact title. **Negation**: `$[?(!(@.active))]` returns inactive ones. **Existence check**: `$[?(@.email)]` returns items that have a non-null `email` field. **Regex match** (jsonpath-plus): `$[?(@.name =~ /^A/)]` matches names starting with "A". Click the **"Filter"** chip at the top of the tester to insert `$[?(@.price > 10)]` instantly, then edit the field name and threshold — most JSONPath filter expressions follow this template.

### Q5. How does the path highlighting work in tree view?

Path highlighting in this tester uses a **two-stage pre-computation** that runs once per JSON load: ① **Path index** — every node in the tree gets a stringified path (`$`, `$.store`, `$.store.book[0]`, `$.store.book[0].title`, etc.) and is added to a `Map<path, HTMLElement>`. ② **Highlight pass** — when the engine returns matched paths, the highlight code looks up each path in the map and toggles the `.jpt-tree-match` CSS class in **O(1) per match**, regardless of tree size. The matched nodes get a soft yellow background (`#fef3c7`) and a left border accent, plus a **breadcrumb** appears at the top of the tree showing the current scroll position (e.g. `$ > store > book[2] > author`) which you can click to copy. The match count is shown in the toolbar (`✓ 4 matches`), and a top-of-tree **"Show only matches"** toggle collapses all non-matching branches so you see just the hits. **Performance**: indexing a 100 K-node JSON takes ~80 ms; highlighting 500 matches takes ~5 ms; both run inside the Worker thread for JSON > 100 KB to keep the UI responsive. The breadcrumb uses `CSS.escape()` on every path segment, so paths with special characters (`$.a["key.with.dots"]`) work correctly.

### Q6. Is my JSON data stored on your server?

**No — zero network requests.** This tester runs **entirely in your browser**. Your JSON data never leaves your device: no `fetch()`, no `XMLHttpRequest`, no analytics, no CDN call beyond the initial page load. The three engines (jsonpath-plus / jsonata / jmespath.js) are bundled as local ES modules in `/tools/json-path-tester/lib/*.js`, loaded from the same origin. The preset chips and example JSON are static files served from `dlsome.top/tools/json-path-tester/data/*.json` at page load only — after that, the page makes **zero outbound network requests**. There is no signup, no cookie, no AI API call, no telemetry. You can verify this in DevTools: open the Network tab and run a query — you will see **0 requests after the initial page load**. The localStorage history stores the last 10 queries *locally* (you can clear it with one click), and the shareable URL encodes the data in the **URL fragment** (`#data=...`), which by spec is *never sent to the server*. This makes the tool safe for production API contracts, customer PII payloads, internal schema files, and any sensitive JSON you need to query.

### Q7. How to share a JSONPath expression with someone?

Click the **"Share"** button in the toolbar — the tester compresses your JSON + expression + syntax mode into a single shareable URL. The encoding has three tiers based on payload size: ① **Small JSON (< 2 KB encoded)** — the payload is `base64(URL-encoded JSON.stringify({j, e, s}))`, where `j` is JSON string, `e` is expression, `s` is syntax mode, and the result goes into the URL **fragment** `#data=<base64>` (URL fragments are never sent to the server per RFC 3986). ② **Medium JSON (2–10 KB)** — the payload is first compressed with `pako` gzip, then base64-encoded (typically 3-5× compression ratio brings it under 2 KB). ③ **Large JSON (> 10 KB)** — exceeds browser URL safe limits; the tester shows a "Download as .json file" button instead and a tooltip explaining why. **Loading a shared URL**: when the page loads, if the URL hash starts with `#data=`, the tester auto-decodes, restores the JSON in the input area, restores the expression in the expression box, selects the right syntax tab, and executes the query immediately. **Privacy note**: because the data lives in the URL fragment, your shared JSON never touches any server — only people you send the URL to can decode it. **Character counter** in the Share button shows current encoded length with a traffic-light color (green < 1 KB / yellow 1-2 KB / red > 2 KB).

### Q8. What is the difference between JSONPath and XPath?

**JSONPath is to JSON what XPath is to XML** — both are path-oriented query languages for tree-structured data. Stefan Gössner explicitly designed JSONPath in 2007 to mirror XPath's syntax where it made sense. **Similarities**: `$` (root) ≈ `/` (XPath root); `.key` / `..` (recursive descent) ≈ `/key` / `//` (descendant axis); `[n]` (array index) ≈ `[position()=n]` (XPath predicate); `[?(condition)]` (filter) ≈ `[predicate]`; `*` (wildcard) ≈ `*` (XPath element wildcard). **Key differences**: ① **Return type** — JSONPath always returns an array (even single values), XPath returns node-sets; ② **No axis support** — JSONPath lacks XPath's full axis model (`ancestor` / `following-sibling` / `preceding`); you must use explicit paths ③ **No functions** — JSONPath has very few built-in functions vs XPath's rich library (`string()` / `count()` / `contains()` / `substring()`); jsonpath-plus adds `length` / `keys` ④ **No namespaces** — JSON has no namespaces, so JSONPath omits the namespace axis ⑤ **No node types** — XPath distinguishes element / attribute / text / comment nodes; JSONPath works on object / array / value (number / string / boolean / null) ⑥ **Quoting** — JSONPath `['key with spaces']` works (XPath has no equivalent problem). **Practical**: if you know XPath, JSONPath will feel natural in 30 minutes — start with `$` instead of `/`, then translate predicates. JSONata and JMESPath are the next step up in power if you find JSONPath too limited.

## 12. Related Tools & Cross-links

JSONPath / JSONata / JMESPath testing is one piece of the JSON toolchain on dlsome.top. These complementary developer tools form a complete "**parse → validate → query → generate**" workflow:

- **[JSON Schema Validator](/tools/json-schema-validator/)** — validate JSON against any JSON Schema (Draft 4 / 6 / 7 / 2019-09 / 2020-12) before querying paths — bilingual errors + tree view + 10+ presets (use this first when the JSON is untrusted)
- **[JSON to TypeScript Generator](/tools/json-to-typescript/)** — generate TypeScript `interface` / `type` from any JSON structure (the natural next step after querying)
- **[YAML to JSON Converter](/tools/yaml-to-json/)** — convert YAML configs (OpenAPI / k8s / docker-compose) to JSON before running JSONPath queries
- **[JWT Inspector](/tools/jwt-inspector/)** — inspect JWT header / payload / signature, then use JSONPath to extract specific claims (e.g. `$.payload.scope`)
- **[Cron Expression Parser](/tools/cron-parser/)** — parse and explain cron expressions in config files (k8s / GitLab CI / crontab)
- **[AI Prompt Helper](/tools/ai-prompt-helper/)** — optimize LLM prompts and validate structured JSON outputs from LLMs
- **[Claude Skills Gallery](/tools/claude-skills-gallery/)** — 50+ Anthropic Skills YAML templates for AI-powered API workflows (many skills read JSONPath configs)
- **[LLM Token Cost Estimator](/tools/llm-token-cost-estimator/)** — compare API prices across 13 LLM models and estimate monthly cost (essential for AI engineers using JSONPath with structured outputs)
- **[dlsome.top Home](/)** — browse all developer tools in the dlsome.top ecosystem

---

*Last updated: 2026-08-11 · JSONPath Tester · Built with [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) (Apache-2.0), [JSONata](https://jsonata.org/) (Apache-2.0 © IBM), and [jmespath.js](https://github.com/jmespath/jmespath.js) (Apache-2.0)*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSONPath Tester",
  "alternateName": "JSONPath 测试器",
  "description": "Free online JSONPath tester — switch between JSONPath, JSONata, and JMESPath. Live preview, tree view + path highlight, recursive / filter / slice presets, shareable URL, worker thread for large JSON. No signup.",
  "url": "https://dlsome.top/tools/json-path-tester/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "JSON Query Tool",
  "operatingSystem": "Any (Web Browser)",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+).",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Three JSON query syntaxes (JSONPath / JSONata / JMESPath) tab switcher with lazy-loaded engines",
    "Live preview of matches with 250 ms debounce (no UI jank while typing)",
    "Large JSON tree view with lazy expand (default 3 levels, auto-collapse > 100 nodes)",
    "Path highlighting in tree view with soft yellow background (#fef3c7) and click-to-copy breadcrumb",
    "5 common-pattern preset chips: recursive descent ($..*), wildcard ($.*), filter ($[?(@.price>10)]), slice ($[0:5]), key-search ($..price)",
    "LocalStorage history (last 10 queries, FIFO) with incognito fallback warning",
    "Shareable URL with base64 encoding + optional pako gzip compression (3-tier size handling: < 2KB / 2-10KB / > 10KB download)",
    "Worker thread for JSON > 100 KB (UI stays responsive on 10 MB+ payloads)",
    "Zero network requests — three engines (jsonpath-plus / jsonata / jmespath.js) bundled as local ES modules, no signup, no analytics"
  ]
}
</script>

<!-- JSON-LD: SoftwareApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSONPath Tester",
  "alternateName": "JSONPath 测试器",
  "description": "Browser-based tool for testing JSONPath, JSONata, and JMESPath expressions on live JSON data. Includes tree view, path highlighting, presets, shareable URL, and worker thread for large JSON.",
  "url": "https://dlsome.top/tools/json-path-tester/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "JSON Query Tester",
  "operatingSystem": "Any (Web Browser)",
  "softwareRequirements": "JavaScript ES2020+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "license": "https://www.apache.org/licenses/LICENSE-2.0",
  "featureList": [
    "JSONPath (Stefan Gössner 2007) — path-based field extraction with $ root, .. recursive descent, [?(condition)] filter, * wildcard",
    "JSONata (IBM Apache-2.0) — functional transformation with $sum(), $map(), $filter(), $reduce(), $sort(), $count()",
    "JMESPath (AWS Apache-2.0, Step Functions standard) — AWS-ecosystem query language",
    "Live preview with 250ms debounce + Worker thread for > 100KB JSON",
    "Tree view with path highlighting + breadcrumb + match count + filter-only toggle",
    "5 preset chips (recursive / wildcard / filter / slice / key-search) with bilingual tooltips",
    "LocalStorage history (10 entries FIFO) + shareable URL with 3-tier encoding"
  ]
}
</script>

<!-- JSON-LD: FAQPage (8 questions) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between JSONPath and JSONata?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath (2007, Stefan Gössner) and JSONata (IBM, Apache-2.0) are both JSON query languages but solve different problems. JSONPath is a path-oriented read-only language: $ denotes the root, . / [] access children, .. is recursive descent, [?(condition)] filters, * is wildcard, [start:end] is half-open slicing, and the result is always wrapped in an array — even for single matches. JSONPath excels at simple field extraction (GitHub API / Shopify / k8s config / Redux state) with a 5-minute learning curve. JSONata is a transform-oriented functional language: expressions are written without $ (root is implicit), it auto-flattens arrays, supports 100+ built-in functions ($sum() / $map() / $filter() / $reduce() / $sort() / $count()), and the return type adapts to the expression (single value or array). JSONata excels at complex data transformation (aggregate / reshape / join) that would otherwise require 50 lines of JavaScript. When to use which: pick JSONPath for \"I need field X from this JSON\", pick JSONata for \"I need a totally new shape from this JSON\". They are not mutually exclusive — many pipelines use JSONPath to locate data and JSONata to transform it. The tester above lets you switch between both with a single tab click and see the difference immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between JSONPath and JMESPath?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath (2007) and JMESPath (AWS, Apache-2.0, Step Functions standard) are similar in scope — both target field extraction — but differ in syntax conventions. Root symbol: JSONPath requires $ (root marker is mandatory), JMESPath has no root marker (expressions start directly, e.g. store.book[0].title). String literals: JMESPath wraps strings in backticks inside filter predicates (`10`, `active`), JSONPath uses regular quotes (\"10\"). Wildcard: both use *. Slicing: JSONPath uses [start:end:step] (half-open), JMESPath uses [start:stop:step] (also half-open — same semantics). Filter: both use [?(condition)]. Function library: JMESPath has ~50 built-in functions (to_string / keys / values / sort / reverse / length / map / filter), JSONPath (via jsonpath-plus) has a smaller set (length / keys / concat). Return type: both adapt — single value or array depending on expression. When to use which: pick JSONPath for general-purpose / cross-platform compatibility (most common), pick JMESPath when integrating with AWS Step Functions / AWS CLI --query / AWS SDK config (it's the de-facto AWS standard). The tester above lets you toggle the syntax tab to JMESPath and see how the same query looks different — useful when migrating between ecosystems."
      }
    },
    {
      "@type": "Question",
      "name": "How does the recursive .. operator work in JSONPath?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The recursive descent .. operator is JSONPath's most powerful feature: it walks every path in the JSON tree until it finds matches, regardless of nesting depth. The simplest form, $..<key>, finds every occurrence of <key> at any depth and returns all matching values as an array. For input { \"store\": {\"book\": {\"price\": 18.9}}, \"warehouse\": {\"shelf\": {\"price\": 9.99}} }, the expression $..price returns [18.9, 9.99] — both prices are returned even though they live at different depths. Common variations: $..* returns every leaf value in the tree (use with care on large JSON — can produce millions of matches); $..book finds all book objects at any depth; $..[?(@.price < 10)] filters recursively — every price < 10 value anywhere. Performance tip: recursive descent is O(n) over the whole tree, so on 10 MB+ JSON it can take >100 ms. Scope it tightly when possible ($.store..price only descends into store); for global recursive searches, the Worker thread + 250 ms debounce in this tester prevent UI jank. Combinable with other operators: $.users..friends[0].name finds the first friend name of every user, anywhere — powerful for social-graph queries. Click the \"Recursive descent\" chip at the top to insert $..* instantly."
      }
    },
    {
      "@type": "Question",
      "name": "How to filter array elements in JSONPath?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath filtering uses the [?(condition)] predicate syntax with these operators: comparison == / != / < / > / <= / >=; logical && / || / ! (note: not and / or / not); arithmetic + / - / * / / / %; regex =~ /pattern/flags (jsonpath-plus extension). The @ symbol inside the predicate refers to the current array element. For input [{price: 18.9}, {price: 12.99}, {price: 8.99}, {price: 22.99}], the expression $[?(@.price < 10)] returns [{price: 8.99}]; $[?(@.price > 10 && @.price < 20)] returns [{price: 12.99}]; $[?(@.title == \"Moby Dick\")] matches by exact title. Negation: $[?(!(@.active))] returns inactive ones. Existence check: $[?(@.email)] returns items that have a non-null email field. Regex match (jsonpath-plus): $[?(@.name =~ /^A/)] matches names starting with \"A\". Click the \"Filter\" chip at the top of the tester to insert $[?(@.price > 10)] instantly, then edit the field name and threshold — most JSONPath filter expressions follow this template."
      }
    },
    {
      "@type": "Question",
      "name": "How does the path highlighting work in tree view?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Path highlighting in this tester uses a two-stage pre-computation that runs once per JSON load: Path index — every node in the tree gets a stringified path ($, $.store, $.store.book[0], $.store.book[0].title, etc.) and is added to a Map<path, HTMLElement>. Highlight pass — when the engine returns matched paths, the highlight code looks up each path in the map and toggles the .jpt-tree-match CSS class in O(1) per match, regardless of tree size. The matched nodes get a soft yellow background (#fef3c7) and a left border accent, plus a breadcrumb appears at the top of the tree showing the current scroll position (e.g. $ > store > book[2] > author) which you can click to copy. The match count is shown in the toolbar (✓ 4 matches), and a top-of-tree \"Show only matches\" toggle collapses all non-matching branches so you see just the hits. Performance: indexing a 100 K-node JSON takes ~80 ms; highlighting 500 matches takes ~5 ms; both run inside the Worker thread for JSON > 100 KB to keep the UI responsive. The breadcrumb uses CSS.escape() on every path segment, so paths with special characters ($.a[\"key.with.dots\"]) work correctly."
      }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data stored on your server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — zero network requests. This tester runs entirely in your browser. Your JSON data never leaves your device: no fetch(), no XMLHttpRequest, no analytics, no CDN call beyond the initial page load. The three engines (jsonpath-plus / jsonata / jmespath.js) are bundled as local ES modules in /tools/json-path-tester/lib/*.js, loaded from the same origin. The preset chips and example JSON are static files served from dlsome.top/tools/json-path-tester/data/*.json at page load only — after that, the page makes zero outbound network requests. There is no signup, no cookie, no AI API call, no telemetry. You can verify this in DevTools: open the Network tab and run a query — you will see 0 requests after the initial page load. The localStorage history stores the last 10 queries locally (you can clear it with one click), and the shareable URL encodes the data in the URL fragment (#data=...), which by spec is never sent to the server. This makes the tool safe for production API contracts, customer PII payloads, internal schema files, and any sensitive JSON you need to query."
      }
    },
    {
      "@type": "Question",
      "name": "How to share a JSONPath expression with someone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click the \"Share\" button in the toolbar — the tester compresses your JSON + expression + syntax mode into a single shareable URL. The encoding has three tiers based on payload size: Small JSON (< 2 KB encoded) — the payload is base64(URL-encoded JSON.stringify({j, e, s})), where j is JSON string, e is expression, s is syntax mode, and the result goes into the URL fragment #data=<base64> (URL fragments are never sent to the server per RFC 3986). Medium JSON (2–10 KB) — the payload is first compressed with pako gzip, then base64-encoded (typically 3-5× compression ratio brings it under 2 KB). Large JSON (> 10 KB) — exceeds browser URL safe limits; the tester shows a \"Download as .json file\" button instead and a tooltip explaining why. Loading a shared URL: when the page loads, if the URL hash starts with #data=, the tester auto-decodes, restores the JSON in the input area, restores the expression in the expression box, selects the right syntax tab, and executes the query immediately. Privacy note: because the data lives in the URL fragment, your shared JSON never touches any server — only people you send the URL to can decode it. Character counter in the Share button shows current encoded length with a traffic-light color (green < 1 KB / yellow 1-2 KB / red > 2 KB)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between JSONPath and XPath?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSONPath is to JSON what XPath is to XML — both are path-oriented query languages for tree-structured data. Stefan Gössner explicitly designed JSONPath in 2007 to mirror XPath's syntax where it made sense. Similarities: $ (root) ≈ / (XPath root); .key / .. (recursive descent) ≈ /key / // (descendant axis); [n] (array index) ≈ [position()=n] (XPath predicate); [?(condition)] (filter) ≈ [predicate]; * (wildcard) ≈ * (XPath element wildcard). Key differences: Return type — JSONPath always returns an array (even single values), XPath returns node-sets; No axis support — JSONPath lacks XPath's full axis model (ancestor / following-sibling / preceding); you must use explicit paths; No functions — JSONPath has very few built-in functions vs XPath's rich library (string() / count() / contains() / substring()); jsonpath-plus adds length / keys; No namespaces — JSON has no namespaces, so JSONPath omits the namespace axis; No node types — XPath distinguishes element / attribute / text / comment nodes; JSONPath works on object / array / value (number / string / boolean / null); Quoting — JSONPath ['key with spaces'] works (XPath has no equivalent problem). Practical: if you know XPath, JSONPath will feel natural in 30 minutes — start with $ instead of /, then translate predicates. JSONata and JMESPath are the next step up in power if you find JSONPath too limited."
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
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dlsome.top/" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://dlsome.top/tools/" },
    { "@type": "ListItem", "position": 3, "name": "JSONPath Tester", "item": "https://dlsome.top/tools/json-path-tester/" }
  ]
}
</script>

<!-- JSON-LD: HowTo (4 steps) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to test JSONPath expressions online",
  "description": "Step-by-step guide to testing JSONPath / JSONata / JMESPath expressions with the dlsome.top JSONPath Tester — paste JSON, write expression, switch syntax, view live results with tree view and path highlighting.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Paste your JSON",
      "text": "Paste any JSON data into the left textarea (or click a preset chip to load Sample Store / User Profile / API Response / Shopify Order example data). The textarea supports up to 10 MB; JSON > 100 KB is automatically parsed in a Worker thread to keep the UI responsive. A 'Validate' button checks JSON legality with line-number errors before you start querying."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Write your JSONPath expression",
      "text": "Type your expression in the right input box (default syntax is JSONPath). Use the 5 preset chips for common patterns: $..* (recursive descent), $.* (wildcard), $[?(@.price > 10)] (filter), $[0:5] (slice), $..price (key search). Each chip has a tooltip explaining when to use it. The expression is parsed in real time and the result updates after a 250 ms debounce."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Switch syntax if needed",
      "text": "Click the JSONPath / JSONata / JMESPath tab at the top to switch syntax. Each tab lazy-loads its engine (jsonpath-plus / jsonata / jmespath.js bundled locally). The placeholder, preset list, and result rendering adapt to the active syntax. JSONPath requires $ root and returns arrays; JSONata omits $ and supports 100+ functions ($sum() / $map() / $filter()); JMESPath uses backtick string literals (`active`) and is the AWS Step Functions standard."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "View results with tree + path highlighting",
      "text": "The right panel updates in real time. Three display modes are available: Raw JSON (compact), Tree View (collapsible with path highlighting — matched paths get a soft yellow #fef3c7 background and a click-to-copy breadcrumb at the top), and Compact (single-line summary). The match count shows in the toolbar (e.g. ✓ 4 matches). Use the 'Share' button to copy a base64-encoded URL with JSON + expression; use 'History' to reload the last 10 queries from localStorage."
    }
  ]
}
</script>