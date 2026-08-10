---
title: "JSON Schema Validator — Draft 4/6/7/2019-09/2020-12 Online"
description: "Free online JSON Schema validator — Draft 4/6/7/2019-09/2020-12. Bilingual errors (zh/EN), line numbers, JSON Pointer, tree view, 10+ presets, exportable reports. No signup."
slug: "json-schema-validator"
date: "2026-08-10T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "json_schema_validator"
url: "/tools/json-schema-validator/"
tools:
  - "json-schema"
  - "openapi"
  - "swagger"
  - "ajv"
  - "api-contract"
  - "schema-validation"
  - "draft-2020-12"
  - "draft-7"
  - "data-validation"
  - "browser-tool"
  - "no-signup"
  - "free"
categories:
  - "Developer Tools"
  - "API Tools"
  - "Schema Validator"
tags:
  - "json-schema"
  - "openapi-3-1"
  - "draft-2020-12"
  - "schema-validation"
  - "ajv"
  - "api-contract"
  - "tree-view"
  - "bilingual-errors"
keywords:
  - "JSON Schema validator"
  - "JSON Schema validator online"
  - "validate JSON against schema online"
  - "OpenAPI 3.1 schema validator"
  - "JSON Schema draft 2020-12"
  - "JSON Schema error messages"
  - "JSON Schema tree view"
  - "ajv online validator"
  - "JSON Schema export report"
  - "validate openapi spec online"
  - "json schema $ref resolver"
  - "JSON Schema preset"
  - "JSON Schema Draft 4 vs 2020-12"
  - "OpenAPI 3.0 to 3.1 converter"
  - "ajv-i18n Chinese errors"
  - "validate large JSON Schema"
  - "JSON Schema definitions vs $defs"
  - "package.json schema validator"
  - "tsconfig.json schema validation"
  - "JSON Schema meta-schema validation"
  - "OpenAPI schema linting tool"
  - "JSON Schema client-side validator"
og:
  title: "JSON Schema Validator — Draft 4/6/7/2019-09/2020-12 Online"
  description: "Free JSON Schema validator with 5 Draft versions, bilingual errors (zh/EN), tree view, 10+ presets, exportable reports."
  image: "/tools/json-schema-validator/img/og.png"
  image_alt: "JSON Schema Validator with Draft selector, Schema + JSON textareas, error list, tree view"
  type: "website"
  url: "https://dlsome.top/tools/json-schema-validator/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "JSON Schema Validator — 5 Drafts + 10+ Presets"
  description: "Validate JSON against Schema online. Draft 4/6/7/2019-09/2020-12. Bilingual errors. No signup."
  image: "/tools/json-schema-validator/img/og.png"
canonical: "https://dlsome.top/tools/json-schema-validator/"
---

{{< json-schema-validator >}}

# JSON Schema Validator — Draft 4/6/7/2019-09/2020-12 Online

> **TL;DR** — A free, browser-based JSON Schema validator supporting all five W3C drafts (Draft 4 / 6 / 7 / 2019-09 / 2020-12) with a side-by-side switcher. Get real-time error localization with line numbers, JSON Pointer paths (e.g. `/users/2/address/0/city`), and bilingual messages (zh-CN + English) powered by ajv-i18n + hand-patched 15% keyword gaps. Inspect large schemas with the collapsible tree view (virtual scrolling for > 500 nodes, keyword search with `email` / `$ref` / `enum`). Load 10+ built-in presets (OpenAPI 3.0/3.1 petstore, GitHub issue, package.json, tsconfig.json, .eslintrc, docker-compose, GitLab CI, VS Code launch.json) and export validation reports as JSON / Markdown / HTML for PRs and CI. Zero network requests — ajv 8.x runs entirely in your browser. No signup, no data leaves your device.

## A. What Is a JSON Schema Validator?

A **JSON Schema validator** is a tool that checks whether a JSON document conforms to a given **JSON Schema** — a declarative vocabulary (standardized by [W3C](https://json-schema.org/)) for describing the expected shape, types, required fields, value constraints, and structure of any JSON payload. The validator runs each constraint against the input data and reports either `valid` or a list of errors with precise locations (instance path + line number + human-readable description).

This particular validator is powered by **ajv 8.x** ([Another JSON Validator](https://github.com/ajv-validator/ajv)), the de-facto reference implementation for Node.js and the browser. ajv is the same engine trusted by OpenAPI tooling, jsonschema (Python), and most CI/CD schema pipelines. We bundle ajv as a single ESM module (~280 KB gzipped, including all five draft meta-schemas) and run everything client-side. Five W3C-recognized drafts are supported in parallel — Draft 4 (legacy, 2013), Draft 6 (2017, added `const`), Draft 7 (2018, added `if/then/else`), Draft 2019-09 (added `unevaluatedProperties`, array-form `exclusiveMinimum/Maximum`), and Draft 2020-12 (the latest W3C standard, fully adopted by OpenAPI 3.1). The chip selector at the top of the page switches the active meta-schema on the fly — no page reload, no setup.

## B. Why Use a JSON Schema Validator?

Without validation, a malformed JSON payload can silently propagate through your stack — a missing `email` field becomes a `null` insert, an unexpected `user_id` becomes a string-typed foreign key, a stale `created_at` string breaks your date parser downstream. The cost of catching these issues in production is 10–100× higher than catching them at write time (per typical SRE incident postmortems). A JSON Schema validator gives you **shift-left validation** at every layer — editor preview, pre-commit hook, CI pipeline, API gateway, runtime middleware.

Concrete use cases: ① **API contracts** — validate request/response bodies against an OpenAPI 3.1 schema before they reach your handler ② **Config files** — check `package.json`, `tsconfig.json`, `.eslintrc`, `docker-compose.yml` against well-known schemas (Schemastore.org hosts 600+) before they reach the build ③ **Data pipelines** — assert each row in an ETL stream matches the expected record shape ④ **OpenAPI specs** — lint the spec itself, not just instances; catch `nullable: true` in 3.0 specs being migrated to 3.1. Unlike `JSON.parse()` (which only catches syntax errors) or TypeScript interfaces (which exist only at compile time and don't ship with your JSON), JSON Schema is **runtime-checkable** and **language-agnostic**.

## C. Supported Draft Versions (4 / 6 / 7 / 2019-09 / 2020-12)

JSON Schema has evolved through five W3C drafts. Each adds features and refines semantics; later drafts are not strict supersets of earlier ones. Picking the right draft matters because tooling (ajv, IDE plugins, OpenAPI generators) only knows a specific set:

| Draft | Year | Major additions | Breaking changes vs prior |
|---|---|---|---|
| **Draft 4** | 2013 | `required`, `$ref`, `oneOf`/`anyOf`/`allOf`, hyper-schema | — (legacy baseline) |
| **Draft 6** | 2017 | `const`, `examples`, `$id` (URI-based), `propertyNames` | `id` → `$id` |
| **Draft 7** | 2018 | `if`/`then`/`else`, `contentEncoding`, `$comment` | Boolean `exclusiveMinimum/Maximum` form |
| **Draft 2019-09** | 2019 | `unevaluatedProperties`, `$defs`, `$anchor` | Array-form `exclusiveMinimum/Maximum`, `dependencies` split |
| **Draft 2020-12** | 2020 | `prefixItems` (tuples), `dynamicRef`, `$dynamicAnchor` | `definitions` → `$defs`, `if`/`then`/`else` refinements |

**Recommendation:** use **Draft 2020-12** for any new project. It has the cleanest semantics, best tooling support, and is the only Draft that **OpenAPI 3.1 accepts** (OpenAPI 3.0 used a Draft 5 extension / Draft 7 superset). This validator supports all five so you can validate legacy and modern schemas side-by-side — try pasting the same `package.json` schema into each Draft to see the differences.

## D. How to Use — 5-Step Quickstart

{{< json-schema-validator >}}

Using the validator takes about 60 seconds:

1. **Pick a Draft** — Click any chip in the Draft selector at the top: Draft 4 (legacy), Draft 6, Draft 7, Draft 2019-09, or Draft 2020-12 (default — the W3C standard adopted by OpenAPI 3.1). The active meta-schema loads on first use and is cached for subsequent runs.
2. **Paste your Schema** — Drop your JSON Schema into the left textarea (or click a preset chip in the row below to auto-load an example like OpenAPI petstore 3.0/3.1, JSONPlaceholder users, GitHub issue, package.json, tsconfig.json, .eslintrc, docker-compose, GitLab CI, or VS Code launch.json).
3. **Paste your JSON data** — Drop the document you want to validate into the right textarea. When you pick a preset, sample data auto-loads alongside the Schema so you can see a working example immediately.
4. **Read the validation result** — The right panel updates in real time. A green **Valid** card confirms the JSON matches the Schema; a red **Invalid** card lists each error with three locators — instancePath (JSON Pointer like `/users/2/address/0/city`), line number, and a bilingual message (zh-CN + English). Click any error row to auto-scroll the textarea to the failing line and flash-highlight it for 1 second.
5. **Export the report** — Click any of the three export buttons at the bottom — JSON (`validation-report.json`, machine-readable for CI), Markdown (`validation-report.md`, formatted for GitHub PR comments), or HTML (single-file `validation-report.html` with embedded syntax highlighting and clickable anchor links). All exports are generated client-side via Blob + `URL.createObjectURL` — no server processing.

## E. Built-in Schema Presets (10+ Common Files)

The chip row below the Schema textarea ships with **10+ built-in presets** covering the most-validated JSON files in modern development. Click any chip to load both the Schema and a matching sample dataset:

- **OpenAPI 3.0 petstore** (~700 lines) — the canonical OpenAPI 3.0 demo spec (Apache 2.0)
- **OpenAPI 3.1 petstore** (~750 lines) — the 3.1 migration, using `type: ["string", "null"]` instead of `nullable: true` and `$defs` instead of `definitions`
- **JSONPlaceholder `users`** (~120 lines) — a small, clean schema for the popular `/users` endpoint, perfect for testing Draft selection
- **GitHub issue template** (~250 lines) — the schema GitHub uses for `*.github/ISSUE_TEMPLATE/*.yml` validation
- **package.json** (~400 lines) — the npm package metadata schema (Schemastore.org)
- **tsconfig.json** (~180 lines) — TypeScript compiler config schema
- **.eslintrc** (~220 lines) — ESLint flat-config schema
- **docker-compose** (~600 lines) — Docker Compose v2 service file schema
- **GitLab CI** (~350 lines) — `.gitlab-ci.yml` pipeline schema
- **VS Code launch.json** (~150 lines) — debug launch configuration schema

The presets let you **see the validator work end-to-end in one click** without needing your own data. They're also a learning tool: compare the OpenAPI 3.0 vs 3.1 petstore to understand the migration impact at the Schema level.

## F. OpenAPI 3.0 ↔ 3.1 Schema Validation

**OpenAPI 3.1 fully adopts JSON Schema Draft 2020-12**, while OpenAPI 3.0 used a Draft 5 extended / Draft 7 superset. This means a valid OpenAPI 3.1 spec is a valid Draft 2020-12 Schema — but a valid OpenAPI 3.0 spec is **not** automatically Draft 2020-12. Two breaking changes matter when migrating:

① **Replace `nullable: true`** with `type: ["string", "null"]` (3.0's `nullable` keyword was never part of JSON Schema proper — it was an OpenAPI extension, removed in 3.1 in favor of JSON Schema's native nullable-via-type-array).
② **Use `$ref` with `#/components/schemas/...`** the same way you would in any JSON Schema — no more `example` field restrictions. OpenAPI 3.1 also accepts JSON Schema's `examples` (plural) array form.

For tooling, **[Spectral](https://stoplight.io/open-source/spectral)** by Stoplight can auto-migrate a 3.0 spec to 3.1 (with custom rulesets for breaking changes), and **[openapi-typescript](https://openapi-ts.dev/)** generates TypeScript types from either version. This validator lets you paste both versions side-by-side — load the OpenAPI 3.0 and 3.1 petstore presets, then run validation to see which Draft meta-schema each validates against (and which validation errors surface in 3.0 vs 3.1).

## G. Large Schema Performance Tips (Tree View)

A typical OpenAPI spec runs 500–3,000 lines; an enterprise API contract can exceed 10,000. Rendering such a Schema in a naïve DOM tree would lock the browser for seconds. This validator handles large schemas with **three progressive enhancement tiers**:

① **< 100 lines** — full DOM render in **< 50 ms**, all keywords visible
② **100–500 lines** — lazy `details/summary` folding with first render **< 100 ms** and per-node expand **< 30 ms**
③ **> 500 lines** — **virtual scrolling** — only visible nodes are in the DOM at any time, with keyword highlighting (try `email` / `$ref` / `enum`) debounced at 200 ms

For schemas **> 5,000 lines**, a warning banner suggests splitting the schema into `$ref`-linked files — also a JSON Schema best practice (per [json-schema.org/draft/2020-12/schema#:~:text=recommended](https://json-schema.org/draft/2020-12/schema)). All rendering happens **client-side via ajv 8.x** — no network round-trip per scroll, no AI API call, no CDN call beyond the initial page load. The 10+ built-in presets range from 50 to 3,000 lines — try them to see the full performance spectrum.

## H. Bilingual Error Localization (zh-CN + EN)

Validation errors come from **[ajv-i18n](https://github.com/ajv-validator/ajv-i18n)** — the official i18n package for ajv 8.x, which ships with **60+ locales**. The default English locale is built into ajv; for Chinese, calling `ajvI18n.zhCN(ajvInstance)` switches all keyword error messages to zh-CN.

This tool bundles a **hand-patched zh-CN locale** that fills the ~15% keyword gaps in the official package — including `anyOf` / `oneOf` / `if-then-else` / `propertyNames` / `additionalProperties` / `dependencies` / `unevaluatedProperties`. Examples of the EN→ZH mappings:

- `must be string` → `类型不匹配: 应为 string, 实际为 undefined`
- `must match pattern "^[a-z]+$"` → `字符串必须匹配正则表达式: ^[a-z]+$`
- `must have required property 'email'` → `缺少必填字段 email`
- `must NOT have additional properties` → `不允许有额外字段`

Switch languages with the **`中文 / EN`** toggle in the top banner. Coverage is transparently displayed as **"Translation coverage: 92%"** — community contributions to fill the remaining 8% are welcome via GitHub PR. For custom keywords in your own ajv projects, see [ajv.js.org/i18n.html](https://ajv.js.org/i18n.html).

## I. Frequently Asked Questions (FAQ)

### Q1. What is JSON Schema and why use Draft 2020-12?

JSON Schema is a declarative vocabulary that lets you annotate and validate JSON documents — describing the expected shape, types, required fields, value constraints, and structure of any JSON payload. It's the de-facto standard for API contracts (OpenAPI / Swagger), config files (package.json / tsconfig.json), and data pipeline schemas. There are five W3C-recognized drafts: **Draft 4** (2013, legacy), **Draft 6** (2017, added `const`), **Draft 7** (2018, added `if/then/else`), **Draft 2019-09** (2019, added `unevaluatedProperties`, removed numeric `exclusiveMinimum/Maximum`), and **Draft 2020-12** (2020, the latest W3C standard — renamed `definitions` to `$defs`, fully adopted by OpenAPI 3.1). Use **Draft 2020-12** for any new project — it has the cleanest semantics, best tooling support, and is the only Draft OpenAPI 3.1 accepts. This validator supports all five so you can validate legacy and modern schemas side-by-side.

### Q2. How do I convert OpenAPI 3.0 to 3.1?

OpenAPI 3.1 fully adopts **JSON Schema Draft 2020-12** (vs OpenAPI 3.0 which uses Draft 5 extended / Draft 7 superset). The two breaking changes are: ① **Replace `nullable: true`** with `type: ["string", "null"]` (3.0's `nullable` keyword was never part of JSON Schema proper) ② **Use `$ref` with `#/components/schemas/...`** the same way you would in any JSON Schema (no more `example` field restrictions — OpenAPI 3.1 also accepts JSON Schema `examples`). For tooling, **Spectral** by Stoplight can auto-migrate a 3.0 spec to 3.1, and **openapi-typescript** generates types from either version. This validator lets you paste both versions side-by-side to verify the migration produces valid Draft 2020-12 schema — try the OpenAPI 3.0 and 3.1 petstore presets in the chip row.

### Q3. What's the difference between Draft 7 and Draft 2020-12?

There are five notable breaking changes from **Draft 7** (2018) to **Draft 2020-12** (current W3C standard): ① **`definitions` → `$defs`** — Draft 2020-12 renamed the in-schema definitions keyword to `$defs` for consistency with `$ref` / `$id` / `$schema` ② **`exclusiveMinimum/Maximum` array form** — Draft 2019-09 already changed this from a boolean (`"exclusiveMinimum": true`) to an array (`"exclusiveMinimum": [0, true]`); Draft 2020-12 keeps the array form ③ **`$id` replaces `id`** — the keyword to identify a schema URI is now `$id` not `id` ④ **`items` array form for tuples** — Draft 2020-12 added `prefixItems` for tuple validation alongside the existing `items` keyword ⑤ **`if/then/else` refinements** — Draft 2020-12 added support for multiple `if` keywords and the `dependentRequired` keyword was renamed. This validator's Draft chip selector switches the active meta-schema on the fly — try pasting the same data into each Draft to see the differences. Read the full migration guide at https://json-schema.org/draft/2020-12/release-notes.

### Q4. How do I validate a large JSON Schema (1000+ lines) efficiently?

This validator handles large schemas with three progressive enhancement tiers: ① **< 100 lines** — full DOM render in < 50 ms ② **100–500 lines** — lazy `details/summary` folding with first render < 100 ms and expand < 30 ms ③ **> 500 lines** — **virtual scrolling** — only visible nodes are in the DOM at any time, with keyword highlighting (try `email` / `$ref` / `enum`) debounced at 200 ms. For schemas > 5,000 lines, a warning banner suggests splitting the schema into `$ref`-linked files (also a JSON Schema best practice). All rendering happens **client-side via ajv 8.x** — no network round-trip per scroll. The 10+ built-in presets (OpenAPI 3.0/3.1 petstore, GitHub issue, package.json, tsconfig.json) range from 50 to 3,000 lines — try them to see the full performance spectrum.

### Q5. Is my JSON data sent to a server? (privacy)

**No — zero network requests.** This validator runs **entirely in your browser** via ajv 8.x bundled as an ESM module. Your Schema and JSON data never leave your device: no `fetch()`, no `XMLHttpRequest`, no analytics, no CDN call beyond the initial page load. The preset schema data (10+ built-ins) is loaded once from a same-origin static JSON file at page load. There is no signup, no cookie, no localStorage, and no AI API call. You can verify this in your browser DevTools — open the Network tab and validate a Schema; you'll see zero outbound requests. This makes the tool safe for validating production API contracts, customer PII payloads, and internal schema files. The full privacy / zero-network commitment is documented in §H2-K Data Sources & Disclaimer.

### Q6. How do I write custom error messages? (ajv-i18n)

Error messages come from **`ajv-i18n`** — the official i18n package for ajv 8.x. The default English locale is built into ajv; for Chinese, call `ajvI18n.zhCN(ajvInstance)` and all keyword error messages switch to zh-CN. This tool bundles a **hand-patched zh-CN locale** that fills the ~15% gaps in the official package (e.g. `anyOf` / `oneOf` / `if-then-else` / `propertyNames` / `additionalProperties` / `dependencies` / `unevaluatedProperties`). Examples: `must be string` → `类型不匹配: 应为 string, 实际为 undefined`, `must match pattern "^[a-z]+$"` → `字符串必须匹配正则表达式: ^[a-z]+$`, `must have required property 'email'` → `缺少必填字段 email`. Switch languages with the `中文 / EN` toggle in the top banner. Coverage is transparently displayed as "Translation coverage: 92%" — community contributions to fill the remaining 8% are welcome via GitHub PR. For custom keywords in your own ajv projects, see https://ajv.js.org/i18n.html.

## J. Export Validation Reports (JSON / Markdown / HTML)

After running a validation, click any of the three export buttons at the bottom of the result panel — all generated **client-side via Blob + `URL.createObjectURL`** (no server processing):

- **JSON** — `validation-report.json`. Machine-readable for CI / pre-commit / pre-deploy gates. Includes the active Draft version, full error list (with instancePath, line, severity, message), and a content hash.
- **Markdown** — `validation-report.md`. Formatted for GitHub PR comments, GitLab MR threads, and Slack/Discord embeds. Renders tables and code blocks cleanly in markdown previews.
- **HTML** — `validation-report.html`. A single self-contained file with embedded syntax highlighting (highlight.js inline) and clickable anchor links back to each error. Useful for emailing postmortems or archiving in a wiki.

A privacy checkbox above the export buttons lets you choose whether the export file includes the Schema and Data (off by default — reports contain errors + locators only, no payload). All three formats preserve the full error context (instancePath, line number, zh-CN + EN message, suggested fix hint) so they're drop-in replacements for CI dashboards or PR comments.

## Related Dev Tools

JSON Schema validation is one step in your API / data contract workflow. These dlsome.top tools form a complete JSON toolchain:

- **[JSON to TypeScript Generator](/tools/json-to-typescript/)** — generate TypeScript `interface` / `type` from any JSON Schema (the natural next step after validation)
- **[YAML to JSON Converter](/tools/yaml-to-json/)** — convert YAML configs (OpenAPI / k8s / docker-compose) to JSON before Schema validation
- **[JSONPath Tester Online](/tools/json-path-tester/)** — query nested JSON with JSONPath expressions (debug invalid data after validation)
- **[JWT Decoder](/tools/jwt-decoder/)** — inspect JWT header/payload/signature (API contract debugging)
- **[JWT Inspector](/tools/jwt-inspector/)** — full JWT claim inspection + algorithm validation
- **[Cron Expression Parser](/tools/cron-parser/)** — parse and explain cron expressions in config files
- **[Claude Skills Template Gallery](/tools/claude-skills-gallery/)** — 50+ Anthropic Skills YAML templates for AI-powered API workflows
- **[dlsome.top Home](/)** — browse all developer tools in the dlsome.top ecosystem

---

## K. Data Sources & Disclaimer

This validator is built on **open-source, browser-bundled dependencies** — no runtime API calls:

- **[ajv 8.x](https://github.com/ajv-validator/ajv)** (MIT) — reference JSON Schema validator
- **[ajv-draft-04](https://github.com/ajv-validator/ajv-draft-04)** (MIT) — Draft 4 support for ajv 8.x
- **[ajv-formats](https://github.com/ajv-validator/ajv-formats)** (MIT) — `format` keyword (`email`, `uri`, `date-time`, etc.)
- **[ajv-i18n](https://github.com/ajv-validator/ajv-i18n)** (MIT) — 60+ locales, hand-patched zh-CN
- **[W3C JSON Schema spec](https://json-schema.org/)** — 5 draft meta-schemas, public domain
- **Preset schemas** — [SchemaStore.org](https://json.schemastore.org/) (MIT), OpenAPI petstore (Apache 2.0), JSONPlaceholder (public domain)

The ajv bundle is **~280 KB gzipped** (including all 5 draft meta-schemas + ajv-formats). The top banner shows the current Draft, AJV version, and bundle size for transparency. **Zero-network commitment** — your Schema and JSON data never leave the browser. Pricing/preset data is verified against official sources at the time of the data file's `lastUpdated` field. Last refresh: **2026-08-10**.

## L. References

- W3C JSON Schema Draft 2020-12: <https://json-schema.org/draft/2020-12/schema>
- W3C JSON Schema Draft 2019-09: <https://json-schema.org/draft/2019-09/schema>
- W3C JSON Schema Draft 7: <https://json-schema.org/draft-07/schema>
- ajv 8.x (reference implementation): <https://github.com/ajv-validator/ajv>
- ajv-i18n: <https://github.com/ajv-validator/ajv-i18n>
- OpenAPI 3.1 Specification: <https://spec.openapis.org/oas/v3.1.0>
- SchemaStore (preset source): <https://json.schemastore.org/>
- JSONPlaceholder demo API: <https://jsonplaceholder.typicode.com/>

---

*Last updated: 2026-08-10 · JSON Schema Validator · 5 W3C drafts · 10+ presets · zero-network commitment.*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Schema Validator",
  "alternateName": "JSON Schema 在线验证器",
  "description": "Free online JSON Schema validator — Draft 4/6/7/2019-09/2020-12. Bilingual errors (zh/EN), line numbers, JSON Pointer, tree view, 10+ presets, exportable reports. No signup.",
  "url": "https://dlsome.top/tools/json-schema-validator/",
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
    "5 JSON Schema Draft versions (Draft 4 / 6 / 7 / 2019-09 / 2020-12) side-by-side switcher",
    "Bilingual error messages (zh-CN + English) via ajv-i18n + hand-patched 15% keyword gaps",
    "Real-time error localization with line numbers + JSON Pointer paths (e.g. /users/2/address/0/city)",
    "Large Schema tree view with collapse/search + virtual scrolling for > 500 nodes",
    "10+ built-in presets (OpenAPI 3.0/3.1 petstore, GitHub issue, package.json, tsconfig.json, .eslintrc, docker-compose, GitLab CI, VS Code launch.json)",
    "Exportable validation reports in JSON / Markdown / HTML formats",
    "Zero network requests (browser-only via ajv 8.x ESM, no signup, no AI API calls, no analytics)"
  ]
}
</script>

<!-- JSON-LD: FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is JSON Schema and why use Draft 2020-12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON Schema is a declarative vocabulary that lets you annotate and validate JSON documents — describing the expected shape, types, required fields, value constraints, and structure of any JSON payload. It's the de-facto standard for API contracts (OpenAPI / Swagger), config files (package.json / tsconfig.json), and data pipeline schemas. There are five W3C-recognized drafts: Draft 4 (2013, legacy), Draft 6 (2017, added const), Draft 7 (2018, added if/then/else), Draft 2019-09 (2019, added unevaluatedProperties, removed numeric exclusiveMinimum/Maximum), and Draft 2020-12 (2020, the latest W3C standard — renamed definitions to $defs, fully adopted by OpenAPI 3.1). Use Draft 2020-12 for any new project — it has the cleanest semantics, best tooling support, and is the only Draft OpenAPI 3.1 accepts. This validator supports all five so you can validate legacy and modern schemas side-by-side."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert OpenAPI 3.0 to 3.1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAPI 3.1 fully adopts JSON Schema Draft 2020-12 (vs OpenAPI 3.0 which uses Draft 5 extended / Draft 7 superset). The two breaking changes are: Replace nullable: true with type: [\"string\", \"null\"] (3.0's nullable keyword was never part of JSON Schema proper); Use $ref with #/components/schemas/... the same way you would in any JSON Schema (no more example field restrictions — OpenAPI 3.1 also accepts JSON Schema examples). For tooling, Spectral by Stoplight can auto-migrate a 3.0 spec to 3.1, and openapi-typescript generates types from either version. This validator lets you paste both versions side-by-side to verify the migration produces valid Draft 2020-12 schema — try the OpenAPI 3.0 and 3.1 petstore presets in the chip row."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between Draft 7 and Draft 2020-12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There are five notable breaking changes from Draft 7 (2018) to Draft 2020-12 (current W3C standard): definitions → $defs — Draft 2020-12 renamed the in-schema definitions keyword to $defs for consistency with $ref / $id / $schema; exclusiveMinimum/Maximum array form — Draft 2019-09 already changed this from a boolean (\"exclusiveMinimum\": true) to an array (\"exclusiveMinimum\": [0, true]); Draft 2020-12 keeps the array form; $id replaces id — the keyword to identify a schema URI is now $id not id; items array form for tuples — Draft 2020-12 added prefixItems for tuple validation alongside the existing items keyword; if/then/else refinements — Draft 2020-12 added support for multiple if keywords and the dependentRequired keyword was renamed. This validator's Draft chip selector switches the active meta-schema on the fly — try pasting the same data into each Draft to see the differences. Read the full migration guide at https://json-schema.org/draft/2020-12/release-notes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate a large JSON Schema (1000+ lines) efficiently?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This validator handles large schemas with three progressive enhancement tiers: < 100 lines — full DOM render in < 50 ms; 100–500 lines — lazy details/summary folding with first render < 100 ms and expand < 30 ms; > 500 lines — virtual scrolling — only visible nodes are in the DOM at any time, with keyword highlighting (try email / $ref / enum) debounced at 200 ms. For schemas > 5,000 lines, a warning banner suggests splitting the schema into $ref-linked files (also a JSON Schema best practice). All rendering happens client-side via ajv 8.x — no network round-trip per scroll. The 10+ built-in presets (OpenAPI 3.0/3.1 petstore, GitHub issue, package.json, tsconfig.json) range from 50 to 3,000 lines — try them to see the full performance spectrum."
      }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data sent to a server? (privacy)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — zero network requests. This validator runs entirely in your browser via ajv 8.x bundled as an ESM module. Your Schema and JSON data never leave your device: no fetch(), no XMLHttpRequest, no analytics, no CDN call beyond the initial page load. The preset schema data (10+ built-ins) is loaded once from a same-origin static JSON file at page load. There is no signup, no cookie, no localStorage, and no AI API call. You can verify this in your browser DevTools — open the Network tab and validate a Schema; you'll see zero outbound requests. This makes the tool safe for validating production API contracts, customer PII payloads, and internal schema files. The full privacy / zero-network commitment is documented in the Data Sources & Disclaimer section."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write custom error messages? (ajv-i18n)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error messages come from ajv-i18n — the official i18n package for ajv 8.x. The default English locale is built into ajv; for Chinese, call ajvI18n.zhCN(ajvInstance) and all keyword error messages switch to zh-CN. This tool bundles a hand-patched zh-CN locale that fills the ~15% gaps in the official package (e.g. anyOf / oneOf / if-then-else / propertyNames / additionalProperties / dependencies / unevaluatedProperties). Examples: must be string → 类型不匹配:应为 string,实际为 undefined; must match pattern \"^[a-z]+$\" → 字符串必须匹配正则表达式: ^[a-z]+$; must have required property 'email' → 缺少必填字段 email. Switch languages with the 中文 / EN toggle in the top banner. Coverage is transparently displayed as \"Translation coverage: 92%\" — community contributions to fill the remaining 8% are welcome via GitHub PR. For custom keywords in your own ajv projects, see https://ajv.js.org/i18n.html."
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
  "name": "How to validate JSON against a JSON Schema online",
  "description": "Step-by-step guide to validate JSON against JSON Schema (Draft 4/6/7/2019-09/2020-12) using the dlsome.top JSON Schema Validator.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Select Draft version",
      "text": "Pick the JSON Schema Draft version using the chip selector at the top: Draft 4 (legacy), Draft 6, Draft 7, Draft 2019-09, or Draft 2020-12 (default — the W3C standard adopted by OpenAPI 3.1). The validator lazy-loads each meta-schema on first use."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Paste your Schema",
      "text": "Paste your JSON Schema in the left textarea (or pick a preset from the chip row — OpenAPI petstore 3.0/3.1, JSONPlaceholder users, GitHub issue, package.json, tsconfig.json, .eslintrc, docker-compose, GitLab CI, VS Code launch.json, or self-implemented simple schemas). The textarea supports line numbers and syntax highlighting."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Paste your JSON data",
      "text": "Paste the JSON document you want to validate in the right textarea. For preset selections, sample data auto-loads alongside the Schema so you can see a working example immediately."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Read the validation result",
      "text": "The right panel updates in real time. A green Valid card confirms the JSON matches the Schema; a red Invalid card lists each error with three locators — instancePath (JSON Pointer like /users/2/address/0/city), line number, and a bilingual message (zh-CN + English). Click any error row to auto-scroll the textarea to the failing line and flash-highlight it for 1 second."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Export the report",
      "text": "Click any of the three export buttons at the bottom — JSON (validation-report.json, machine-readable for CI), Markdown (validation-report.md, formatted for GitHub PR comments), or HTML (single-file validation-report.html with embedded syntax highlighting and clickable anchor links back to each error). All exports are generated client-side via Blob + URL.createObjectURL — no server processing."
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
    { "@type": "ListItem", "position": 3, "name": "JSON Schema Validator", "item": "https://dlsome.top/tools/json-schema-validator/" }
  ]
}
</script>
