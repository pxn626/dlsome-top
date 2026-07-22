# YAML to JSON Converter — Content Plan

> **slug:** `yaml-to-json`
> **repo:** `/home/penson/code/dlsome-top`
> **branch:** `feat/yaml-to-json`
> **目标产物:** `content/tools/yaml-to-json.md`
> **关联文档:** [`STRATEGY.md`](./STRATEGY.md) · [`PLAN-ENGINEERING.md`](./PLAN-ENGINEERING.md)
> **风格参考:** `content/tools/json-to-typescript.md`(同站英文技术文档范本)
> **语言策略:** **英文为主**(跟随 json-to-typescript.md 范本,部署 i18n 前不再单独出 `/en/` 版)
> **规划撰写:** 2026-07-22
> **状态:** 待 content agent 实施

---

## 0. 顶层概览

| 维度 | 值 |
|---|---|
| **目标读者** | DevOps / SRE / Backend 工程师,CI/CD pipeline 作者,K8s / GitHub Actions / Docker Compose 用户 |
| **核心动作** | 把 YAML(配置 manifest)转成 JSON(可被下游工具消费) |
| **差异化叙事** | 双向转换 + 校验 + 格式化 + 4 大场景预设 + **YAML → JSON → TypeScript** 完整工作流 |
| **关键词锚点** | `yaml to json`, `yaml validator`, `yaml formatter`, `yaml to json kubernetes`, `convert yaml to json github actions`, `docker compose yaml to json` |
| **目标字数** | 2500-3200 英文单词(~14-16 KB markdown,跟 jtsc.md 19.8KB 相近但略紧凑) |
| **语气** | 直接、务实、可验证的开发者向英文;参考 jtsc.md "without fluff" 风格 |
| **对比锚点** | 跟 `json-to-typescript.md` 形成"配置 → 类型"完整链路闭环 |

---

## 1. 完整页面结构(Outline)

> Markdown 文档结构 + 每段目标长度 + H-tag 层级 + 内容要点。

```
content/tools/yaml-to-json.md
│
├─── YAML frontmatter (见 §5)
│
├─── H1: "YAML to JSON Converter"
│    └─── intro paragraph (130-180 词,SEO-dense)
│
├─── {{< yaml-to-json >}}  ← shortcode 调用(P0 唯一出口)
│
├─── ## 1. What is YAML to JSON Converter           (~180 词)
│    └─── ### 1.1 Core use cases (4 个场景 bullet)
│
├─── ## 2. How it differs from alternatives          (~220 词)
│    └─── comparison table (5-6 rows)
│
├─── ## 3. Configuration toggles (4 个)              (~180 词)
│    └─── numbered list,每个 toggle 一段
│
├─── ## 4. Four scene presets                        (~200 词)
│    └─── 4 个 H3 子节: Generic / Kubernetes / GitHub Actions / Docker Compose
│
├─── ## 5. Five technical highlights                  (~200 词)
│    └─── 5 个 bold-prefix bullets
│
├─── ## 6. How to Use This Tool                       (~150 词)
│    ├─── 5 步 ordered list
│    └─── ### 6.1 Keyboard shortcuts (5 个)
│
├─── ## 7. Conversion rules (YAML ↔ JSON)            (~200 词)
│    └─── type mapping table (10-12 rows)
│
├─── ## 8. Example use cases                          (~400 词,4 个完整场景)
│    ├─── ### 8.1 Kubernetes Pod manifest
│    ├─── ### 8.2 GitHub Actions workflow
│    ├─── ### 8.3 Docker Compose multi-service
│    └─── ### 8.4 Generic config + anchor/alias
│
├─── ## 9. YAML → JSON → TypeScript: Complete Configuration   (~280 词) ⭐ 杠杆点
│    └─── pipeline 4-step 描述 + 完整 YAML→JSON→TS 链示例
│
├─── ## 10. YAML to JSON vs. codebeautify and other online tools    (~220 词)
│    └─── comparison table
│
├─── ## 11. Frequently Asked Questions                (~600 词,6-8 个 Q&A)
│    ├─── ### 11.1 ... (8 个 H3)
│    └─── 最后一条必须链回 json-to-typescript
│
├─── ## 12. Related Tools                             (~120 词)
│    └─── bullet list (站内 + 跨站 webpenson-tools)
│
└─── <!-- JSON-LD scripts (WebApplication + FAQPage + HowTo) -->
     └─── 段尾 <script type="application/ld+json"> 三段
```

**节奏配比:**

- **过度段(避免页面过"百科"):** §1 + §2 = ~400 词,快速建立工具定位
- **核心段(技术深度):** §3 + §4 + §5 + §7 = ~780 词
- **操作段(用户实操):** §6 + §8 = ~550 词
- **生态段(SEO + 内部引流的杠杆):** §9 + §10 = ~500 词
- **信任段:** §11 (FAQ) + §12 (Related) = ~720 词

---

## 2. Section-by-Section Copy Direction(逐段文案要点 + sample)

> 每段给 3 个东西:**目标词数**、**关键句模板**(英文开头)、**写作要点**(中文注释)。

### 2.1 H1 + Intro Paragraph(130-180 词)

**目标词数:** 130-180 词
**关键词密度:** 前 200 词 `yaml to json` 出现 ≥ 3 次
**关键句模板(英文起始句):**

> "Convert **YAML to JSON** in your browser. No upload. No signup. No server."

**完整 sample draft:**

```markdown
# YAML to JSON Converter

{{< yaml-to-json >}}

Convert **YAML to JSON** instantly, right in your browser — no signup, no upload,
no tracking. Paste a Kubernetes manifest, GitHub Actions workflow, Docker Compose
file, or any YAML config into the left panel and get clean, formatted JSON on the
right. This YAML to JSON converter also runs the conversion **bidirectionally**
(JSON to YAML), validates YAML syntax with friendly error messages, and ships with
four built-in scene presets for the most common DevOps file types.

The tool runs 100% client-side: every byte you paste stays in your browser tab.
Open DevTools → Network and you'll see zero outbound requests during conversion.
This makes the converter safe for production manifests containing secrets, tokens,
internal service hostnames, and proprietary configuration. Whether you're debugging
a `kubectl apply` failure, generating a JSON body for an API call, or bootstrapping
TypeScript types for an OpenAPI spec, this **YAML ↔ JSON converter** gives you a
fast, deterministic, dependency-free workflow.

The same site hosts a [JSON to TypeScript Interface Generator](/tools/json-to-typescript/);
the two tools form a complete configuration-to-types pipeline (`YAML → JSON → TypeScript`)
that runs entirely in the browser. See §9 below for the full walkthrough.
```

**写作要点(给写手):**
- 第 1 句必须含主关键词 `YAML to JSON`(SERP 主词)
- 第 2 段首句强调 "100% client-side / no upload"(差异化卖点)
- 第 3 段建立跟 `json-to-typescript` 的内部链路(内链 §9)
- **不要**用 "best"、"ultimate"、"powerful" 这种空形容词
- 跟 jtsc.md intro 段同字数级别,保持站内节奏一致

---

### 2.2 `## What is YAML to JSON Converter`(~180 词)

**目标词数:** 150-200 词
**结构:** 1 段定义 + 1 个 bullet 列表(场景)

**关键句模板:**

> "The YAML to JSON Converter is a browser-based utility that parses any YAML 1.2 document and emits formatted JSON, with bidirectional support, validation, and four DevOps scene presets."

**写作要点:**
- 给出工具"是什么"的一句话定位(类似 jtsc.md "The JSON to TypeScript Interface Generator is a browser-based utility that...")
- 列出 4 个核心使用场景的 bullets:
  1. **Kubernetes manifests** — paste a `Deployment`, `Service`, `Ingress`, or full `kustomization.yaml`
  2. **GitHub Actions workflows** — convert `.github/workflows/*.yml` to JSON for inspection or templating
  3. **Docker Compose files** — round-trip `compose.yaml` ↔ JSON, including multi-file projects
  4. **Generic YAML configs** — Ansible playbooks, GitLab CI, Prometheus alert rules, any YAML 1.2 doc
- 提一句 "the conversion uses js-yaml under the hood"(技术信任锚点,不展开)

---

### 2.3 `## How it differs from alternatives`(~220 词)

**目标词数:** 200-260 词
**结构:** 一段 introduction + 比较表(5-6 行)

**关键句模板:**

> "Most YAML converters online fall into one of three categories: SEO-heavy single-purpose pages, developer-hostile ad-laden sites, or upload-required tools with file-size limits. This converter takes a different path."

**Sample table structure:**

```markdown
| Tool category | Trade-off |
|---|---|
| **codebeautify.org/yaml-to-json-converter** | SEO-old incumbent (DR ~70), but UI outdated, ads heavy, server-side processing | 
| **convertjson.com/yaml-to-json** | Exact-match keyword, but single feature, no validator, no formatter |
| **jsonformatter.org/yaml-to-json** | Sitemap benefit, but jQuery residue, no scene presets |
| **transform.tools/yaml-to-json** | Polished visual, but no DevOps depth, no error friendliness |
| **convertio.co/yaml-json** | Brand-strong, but requires upload (privacy risk for production manifests) |
| **This tool (dlsome.top)** | 100% browser, bidirectional, 4 scene presets, friendly error mapping, K8s/GitHub/Compose-aware |
```

**写作要点:**
- 每行必须有 1 个具体可验证的 trade-off(不要写 "less features")
- 不可漏掉本工具的 "100% browser" / "no upload" 卖点
- 表里至少 5 个竞品(含本工具共 6 行)
- 末尾可以加一句 "best for": DevOps engineers who need a fast, privacy-safe, K8s-aware YAML converter

---

### 2.4 `## Four configuration toggles`(~180 词)

**目标词数:** 160-200 词
**结构:** 4 段,每段一个 toggle

**Sample:**

```markdown
## Configuration toggles

The toolbar below the input panel exposes four independent configuration options.
Each toggle changes conversion behavior immediately — no "Apply" button needed:

1. **Direction (YAML → JSON / JSON → YAML)** — flip with a single click. The
   placeholder, output pane label, and download filename swap accordingly
   (`download.json` ↔ `download.yaml`). Multi-document YAML (`---` separated)
   converts to the first document by default.

2. **Indent (2 spaces / 4 spaces / Tab)** — controls the JSON output indentation
   (YAML default is 2 spaces; K8s convention is 2, Compose convention is 2).
   Changing the indent re-stringifies the output instantly.

3. **Validate YAML** (default: on) — runs YAML 1.2 syntax validation on every
   keystroke (debounced ~150ms). Successful parse → green checkmark `✓ Valid YAML`.
   Parse failure → red error strip with line number, column, and a friendly
   Chinese/English explanation. Disable this toggle to skip validation (useful
   when converting *known-bad* legacy YAML just to inspect structure).

4. **Sort keys alphabetically** — when enabled, JSON keys are emitted in
   alphabetical order (handy for `git diff` of config files). Default off
   preserves insertion order from the YAML document.
```

**写作要点:**
- 4 个 toggle 必须跟 PLAN-ENGINEERING §1.3 一一对应(direction / indent / validate / sortKeys)
- 每个 toggle 配 1 个实际使用场景(不只列功能)
- 验过的样式:bold toggle 名 + 默认值 + 何时关闭的明确说明

---

### 2.5 `## Four scene presets`(~200 词)

**目标词数:** 180-220 词
**结构:** 4 个 H3 子节(Generic / Kubernetes / GitHub Actions / Docker Compose)

**Sample 子节模板:**

```markdown
### Kubernetes preset

Select `Preset: Kubernetes` to load a built-in `Pod` manifest sample and enable
preset-aware validation. The preset checks for three required top-level keys
that every valid Kubernetes manifest must contain:

- `apiVersion` — e.g., `v1`, `apps/v1`, `networking.k8s.io/v1`
- `kind` — e.g., `Pod`, `Deployment`, `StatefulSet`, `Service`
- `metadata.name` — the resource name (required for `kubectl apply`)

Missing any of these triggers a yellow warning strip below the input panel:
"`⚠ Kubernetes preset: missing required 'kind'`". The validation is informational
only — you can still convert the YAML regardless. Use this preset when working
with `kubectl` output, `kustomize` patches, Helm chart `values.yaml`, or
ArgoCD application definitions.
```

**写作要点:**
- 每个 preset 给出 1)示例加载行为 2)校验规则 3)触发警告的条件 4)典型用例
- K8s preset 必含 `apiVersion` / `kind` / `metadata.name`
- GitHub Actions preset 必含 `name` / `on` / `jobs`
- Docker Compose preset 必含 `version` / `services`
- Generic preset = 仅基础 YAML 语法校验

---

### 2.6 `## Five technical highlights`(~200 词)

**目标词数:** 200-250 词
**结构:** 5 个 bold-prefix bullets

**Sample:**

```markdown
## Five technical highlights

- **100% browser-based, zero upload** — the YAML parser (js-yaml v4) is inlined
  inside the shortcode; no CDN, no fetch, no telemetry. A production manifest
  containing registry pull secrets, AWS access keys, or internal DNS names never
  leaves your tab. Verified by DevTools → Network showing zero requests on convert.

- **Bidirectional with anchor/alias preservation** — converting JSON back to YAML
  preserves the original `&anchor` / `*alias` references by default
  (`noRefs: false`). This is critical for Docker Compose and Kubernetes manifests
  that rely on YAML anchors to share config snippets across services.

- **Friendly error messages** — raw js-yaml errors like `bad indentation of a
  mapping entry` are translated to actionable feedback: `❌ Line 7: indentation
  error — check for mixed tabs/spaces or irregular indent`. The original
  technical message is folded inside `<details>` for debugging.

- **Four built-in presets with sample data** — Kubernetes Pod, GitHub Actions CI,
  Docker Compose multi-service, and Generic YAML. Click `Load Sample` to populate
  the input panel and see how the parser behaves for each file type without
  hunting for example files online.

- **Debounced conversion with size guard** — conversion runs on input + 150ms
  debounce so typing stays smooth. Inputs above 500,000 characters show a
  non-blocking warning and refuse to parse (prevents browser tab freeze on
  pasted 100MB files).
```

**写作要点:**
- 必须有 "100% browser" / "privacy" 反复 1-2 次(差异化卖点)
- 5 个 highlight 都要可验证(对应 PLAN-ENGINEERING §1 / §4 实际能力)
- 数字明确:`500,000 字符上限` / `150ms debounce` / `js-yaml v4`
- 提及 anchor/alias 保留(v4 关键决策点)

---

### 2.7 `## How to Use This Tool`(~150 词)

**目标词数:** 130-170 词
**结构:** 5 步 ordered list + 1 个 Keyboard shortcuts H3

**Sample 5-step:**

```markdown
## How to Use This Tool

The converter is designed for paste-and-go: open the page, paste your YAML,
and copy the JSON. Follow these five steps:

1. **Paste your YAML** into the left input panel — or click **Sample** to load
   a Kubernetes Pod, GitHub Actions CI, Docker Compose, or Generic demo.
2. **Pick a preset** (Kubernetes / GitHub Actions / Docker Compose / Generic)
   if your file matches a known DevOps type — preset validation will highlight
   missing required keys.
3. **Toggle options** — flip direction (JSON → YAML), adjust indent (2/4/Tab),
   enable sort-keys alphabetically for diff-friendly output.
4. **Watch the JSON update** as you type (debounced ~150ms for large inputs).
   The validation strip shows ✓ Valid YAML or a friendly error with line number.
5. **Copy** the output to clipboard, or **Download** as `.json` (or `.yaml` if
   you flipped direction). Filename includes the preset name to avoid collisions.
```

**Keyboard shortcuts sub-section:**(跟 jtsc.md 同步)

```markdown
### Keyboard shortcuts

- `Ctrl/⌘ + Enter` — trigger conversion immediately
- `Ctrl/⌘ + L` — load the active preset's sample YAML
- `Ctrl/⌘ + K` — clear both input and output panels
- `Tab` — insert a tab character in the input textarea (does not switch focus)
```

---

### 2.8 `## Conversion rules`(~200 词)

**目标词数:** 180-240 词
**结构:** 1 段引子 + 类型映射表(10-12 行)

**Sample table:**

```markdown
## Conversion rules

The converter follows YAML 1.2 specification semantics and uses native
`JSON.stringify` for the forward direction and `js-yaml.dump` for the reverse.
The table below documents every value-to-type mapping:

| YAML value | JSON output | YAML output (round-trip) |
|---|---|---|
| `key: value` (string scalar) | `"key": "value"` | `key: value` (no quotes unless special chars) |
| `port: 8080` (int scalar) | `"port": 8080` | `port: 8080` (no `.0` suffix) |
| `ratio: 1.5` (float scalar) | `"ratio": 1.5` | `ratio: 1.5` |
| `enabled: true` (bool) | `"enabled": true` | `enabled: true` |
| `~` or `null` or `Null` | `null` | `~` (preferred) or `null` |
| `- one`  (sequence) | `["one"]` | `- one` |
| `[1, 2, 3]` (flow sequence) | `[1, 2, 3]` | `- 1\n- 2\n- 3` |
| `{a: 1, b: 2}` (flow mapping) | `{"a": 1, "b": 2}` | block mapping |
| `&anchor value` + `*anchor` (alias) | both resolve to same value | `&anchor value` reused as `*anchor` |
| `!!str 12345` (type tag) | `"12345"` (string) | `!!str 12345` (tag preserved) |
| `2026-07-22` (timestamp) | `"2026-07-22T00:00:00.000Z"` | `2026-07-22` (round-trip safe) |
| `---\ndoc2` (multi-doc) | first doc + warn "more docs in input, only first shown" | first doc + warning |

Special handling:

- **Comments (`# ...`)** are stripped during conversion (JSON has no comment syntax).
- **Empty YAML** parses to `null` and outputs as `null`.
- **Duplicate keys** trigger a parse error with line number.
- **Multi-document YAML (`---` separators)** converts only the first document and
  emits a warning strip. Use a dedicated `yaml-splitter` tool to handle n-doc files.
```

**写作要点:**
- 表格至少 10 行,覆盖字符串/数字/布尔/null/序列/映射/锚点/类型标签/时间戳
- 行必须可验证(对应 PLAN-ENGINEERING §1.1 功能)
- 末尾加 1 段 "Special handling" 说明边界

---

### 2.9 `## Example use cases`(~400 词)

**目标词数:** 380-460 词
**结构:** 4 个 H3 子节,每个含 1 个 YAML input code block + JSON output code block + 简要说明

**Sample 子节 1(Kubernetes Pod):**

````markdown
### Convert a Kubernetes Pod manifest to JSON

When debugging a `kubectl apply` failure or generating a JSON payload for a Helm
post-render hook, converting your YAML to JSON gives you a portable format that
works with any tooling (jq, curl, JSON Schema validators).

**Input YAML** (Kubernetes Pod):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
    tier: frontend
spec:
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - containerPort: 80
      resources:
        limits:
          memory: 128Mi
          cpu: "0.5"
```

**Output JSON** (indent: 2):

```json
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "nginx-pod",
    "labels": {
      "app": "web",
      "tier": "frontend"
    }
  },
  "spec": {
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:1.27",
        "ports": [{ "containerPort": 80 }],
        "resources": {
          "limits": {
            "memory": "128Mi",
            "cpu": "0.5"
          }
        }
      }
    ]
  }
}
```

The preset `Kubernetes` validates that `apiVersion`, `kind`, and `metadata.name`
are present before conversion. Flip direction to convert the JSON back to YAML
for a quick round-trip test.
````

**Sample 子节 2(GitHub Actions workflow):** (类似结构,workflow file)

**Sample 子节 3(Docker Compose):** (3-service 示例,展示 anchor 用法)

**Sample 子节 4(Generic + anchor/alias):**

````markdown
### Generic YAML with anchor and alias

YAML anchors (`&name`) and aliases (`*name`) let you define a config snippet
once and reuse it across the document. The converter preserves anchor semantics
in both directions:

**Input YAML**:

```yaml
defaults: &defaults
  adapter: postgres
  host: localhost
  port: 5432

development:
  <<: *defaults
  database: dev_db

test:
  <<: *defaults
  database: test_db
```

**Output JSON**:

```json
{
  "defaults": { "adapter": "postgres", "host": "localhost", "port": 5432 },
  "development": { "adapter": "postgres", "host": "localhost", "port": 5432, "database": "dev_db" },
  "test":      { "adapter": "postgres", "host": "localhost", "port": 5432, "database": "test_db" }
}
```

When the JSON output is converted back to YAML (toggle direction), the anchor
`&defaults` is regenerated and the `*defaults` alias is reused — the round-trip
is faithful, not lossy.
````

**写作要点:**
- 4 个示例分别覆盖 K8s、GitHub Actions、Docker Compose、Generic(任务强制要求)
- 至少 1 个示例展示 anchor/alias(STRATEGY §10 卖点的可验证证据)
- 代码块长度合理:K8s ~30 行,Compose ~20 行,Anchor ~15 行,GA ~25 行
- 每个示例加 2-3 句"为什么这个场景需要这个工具"

---

### 2.10 `## YAML → JSON → TypeScript: Complete Configuration Type Workflow` ⭐(~280 词)

> **杠杆点 — dlsome-top 站内独有叙事。** STRATEGY §10 的核心差异化卖点。

**目标词数:** 250-320 词
**结构:** 引子段 + 4 步编号 list + 端到端示例代码块

**完整 sample draft:**

````markdown
## YAML → JSON → TypeScript: Complete Configuration Type Workflow

Every backend engineer eventually faces this pipeline: you have a YAML config
file (Kubernetes manifest, OpenAPI spec, or Compose file), and you need
TypeScript types to consume it from a frontend or Node.js client. Most teams
hand-write these types — error-prone, drift-prone, and slow.

dlsome.top runs the full pipeline **in your browser, zero upload, three clicks**:

1. **Start with YAML** — paste your Kubernetes manifest, OpenAPI spec, or
   Helm `values.yaml` into the [YAML to JSON Converter](/tools/yaml-to-json/).
2. **Get JSON** — click Convert (or wait for the 150ms debounce). The JSON
   output is canonicalized: keys preserved, anchors resolved, types tagged.
3. **Generate TypeScript** — paste the JSON into the
   [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) on the
   same site. Choose `interface` vs `type`, mark fields optional/readonly,
   and rename the root type to your domain entity.
4. **Paste into your project** — ship typed clients, typed config loaders,
   and compile-time-safe Helm value consumers.

**End-to-end example** — K8s `Service` manifest to TypeScript:

```yaml
# Step 1 input
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080
```

```typescript
// Step 4 output (typed config loader)
import { Service } from './types/k8s';

const svc: Service = {
  apiVersion: 'v1',
  kind: 'Service',
  metadata: { name: 'api-service' },
  spec: {
    type: 'LoadBalancer',
    selector: { app: 'api' },
    ports: [{ port: 80, targetPort: 8080 }]
  }
};
```

This is the **differentiator**: no other site runs YAML → JSON → TypeScript as
a chained, browser-only, zero-upload workflow. Combine the two tools above and
you have a self-hosted alternative to QuickType + Swagger Codegen for most
practical frontend-to-backend type bootstrapping.
````

**写作要点:**
- 第 1 段给"为什么需要这条链路"的背景(backend engineer 痛点)
- 4 步编号每步 1 行,清晰可执行
- 完整示例:从 K8s `Service` 实际 YAML 出发,落到 TS `Service` interface 调用
- 第 2 段必须含 [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) 强内链
- 强调 "zero upload" / "browser-only"(隐私 + 工具差异化)
- 末尾提及 QuickType / Swagger Codegen 作为基准对比

---

### 2.11 `## YAML to JSON vs. codebeautify and other online tools`(~220 词)

**目标词数:** 200-260 词
**结构:** 1 段 + 比较表(6-7 行)

**Sample:**

```markdown
## YAML to JSON vs. codebeautify and other online tools

The most common comparison queries for this converter pair it against three
long-established incumbents. The table below summarizes the trade-offs:

| Tool | Type | Pros | Cons | Best for |
|---|---|---|---|---|
| **dlsome.top YAML ↔ JSON** | Pure-frontend web tool | Zero deps, bidirectional, 4 DevOps presets, friendly errors, anchors preserved | YAML 1.2 only (no 1.1 schemas) | DevOps / K8s / CI-CD engineers |
| **codebeautify.org/yaml-to-json-converter** | Web (server-side) | High DR, large sitemap | Ads, UI dated, no validator, no JSON→YAML | Quick one-off, no signup needed |
| **convertjson.com/yaml-to-json** | Web | Exact keyword match | Single-direction, no error handling | Single-purpose conversion |
| **transform.tools/yaml-to-json** | Web | Polished UI, many transformers | Generic (not DevOps-aware), no YAML validation | Casual use |
| **convertio.co/yaml-json** | SaaS (upload) | Brand-strong, supports many formats | **Requires file upload** (privacy risk), 100MB limit | One-off batch conversion of public files |
| **jsonformatter.org/yaml-to-json** | Web subpage | Sitemap benefit | jQuery residue, no presets | Pure formatting after the fact |

If you need **DevOps-aware YAML parsing + bidirectional flow + zero-upload
privacy + anchor preservation**, this tool is the only one in the comparison
that hits all four. For multi-language codegen (Go, C#, Java from the same
JSON), QuickType remains the right pick — and you can pipe this tool's JSON
output into QuickType for that workflow.
```

**写作要点:**
- 5-6 个竞品 + 本工具 = 6-7 行
- 每个竞品 1 个具体 "Pros" + 1 个具体 "Cons"(避免 "limited features" 这种空话)
- 末尾 "best for" 句强差异化
- 提及 QuickType(承认竞品在多语言领域的优势 → 引导用户回流到本站做 YAML→JSON)

---

### 2.12 `## Frequently Asked Questions`(~600 词,6-8 个 Q&A)

**目标词数:** 550-700 词
**结构:** 8 个 H3 子节,每个 Q&A 60-90 词

> 最后一条 FAQ 必须链回 [JSON to TypeScript Interface Generator](/tools/json-to-typescript/)(STRATEGY §10 重叠 + 内链增强)。

**8 个 FAQ 列表与每条要点:**

#### 11.1 Is this YAML to JSON converter free? Do I need to sign up?
- **方向:** 跟 jtsc.md FAQ 1 对齐
- **要点:**
  - 100% free,无 signup,无 account,无 email 收集
  - 无月转换次数限制
  - Vanilla JS + 纯前端 + 无服务器成本 = 可以永远免费
  - 无广告、无付费墙
- **关键句:** "Yes, the YAML to JSON Converter is 100% free with no signup, no account, no usage limit, and no email collection. Open the page and start converting immediately."

#### 11.2 Is my YAML data sent to your servers?
- **方向:** 跟 jtsc.md FAQ 2 对齐
- **要点:**
  - 不上传,0 outbound request
  - js-yaml 内联在 shortcode,无 CDN
  - DevTools → Network 可验证
  - 包含 secret / token 的 YAML 也安全
- **关键句:** "No — your YAML never leaves your browser."

#### 11.3 What's the difference between YAML and JSON? When should I use each?
- **方向:** STRATEGY §5 信息型意图的落地
- **要点:**
  - YAML = 人类可读 + 注释 + anchor;JSON = 机器可读 + 严格 schema
  - YAML 用于:K8s、GitHub Actions、Compose(配置)
  - JSON 用于:API responses、`package.json`、TypeScript 类型生成
  - 本工具做 YAML↔JSON 桥接
- **关键句:** "YAML is human-first (comments, anchors, multi-doc), JSON is machine-first (strict types, universal API support)."

#### 11.4 Can it handle Kubernetes manifests, GitHub Actions, and Docker Compose?
- **方向:** STRATEGY §5 工具型意图的落地 + 章节 §4 引导
- **要点:**
  - 4 个 preset 内置:Generic / Kubernetes / GitHub Actions / Docker Compose
  - K8s 校验 `apiVersion` / `kind` / `metadata.name`
  - GA 校验 `name` / `on` / `jobs`
  - Compose 校验 `version` / `services`
- **关键句:** "Yes. Pick a preset from the toolbar and the validator flags missing required keys with a friendly warning."

#### 11.5 Does it preserve YAML anchors and aliases when converting to JSON?
- **方向:** js-yaml v4 vs v3 关键差异,跟 ENGINEERING §1.1B 一致
- **要点:**
  - 默认 `noRefs: false`,保留 `&anchor` / `*alias`
  - Docker Compose 跨 service 复用、K8s `kustomize` 共享片段常用
  - JSON 输出展开所有 alias(展开是 JSON 标准行为),YAML 输出保留引用
- **关键句:** "Yes — by default the converter preserves YAML anchors using `noRefs: false`, so `&default` and `*default` references round-trip faithfully."

#### 11.6 What happens if my YAML has a syntax error? Will I lose my work?
- **方向:** PLAN-ENGINEERING §1.4 友好错误
- **要点:**
  - 解析失败不丢失输入,只是不输出 JSON
  - 红色错误条 + 行号 + 列号 + 友好提示
  - 原始 js-yaml 错误可折叠在 `<details>` 里
  - 修复后立即继续转换
- **关键句:** "Your input is never lost on parse failure — the error strip shows line/column + a friendly message, and you can fix the YAML in place."

#### 11.7 Can I convert JSON back to YAML? Are there any gotchas?
- **方向:** 双向功能强项
- **要点:**
  - 工具栏 "Direction" 切换 YAML ↔ JSON
  - 反向默认 `lineWidth: -1`(K8s 长字符串不折行)
  - 反向会重新加引号到含特殊字符的 key
  - 反向不会从 JSON 还原 YAML 注释(注释不存于 JSON)
- **关键句:** "Yes — flip the direction toggle to convert JSON back to YAML. Note that YAML comments are lost going JSON → YAML (JSON has no comment syntax), but anchors and key order are preserved."

#### 11.8 How do I generate TypeScript types from my YAML config? ⭐⭐
- **方向:** STRATEGY §10 杠杆点 + 内链引流
- **要点:**
  - 完整链路:YAML → JSON → TypeScript
  - 用 [YAML to JSON Converter](/tools/yaml-to-json/) 拿到 JSON
  - 用 [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) 生成 TS interface
  - 可选 6 个 toggle:`type` vs `interface`、`optional`、`readonly`、`nullable`、camelcase、root name
  - 常见场景:OpenAPI spec、K8s `values.yaml`、Compose 文件 → 给前端 typed client
- **关键句:** "Paste your YAML into this tool, then take the JSON output and paste it into our [JSON to TypeScript Interface Generator](/tools/json-to-typescript/) — the two tools form a chained, browser-only YAML → JSON → TypeScript workflow."

**写作要点:**
- 8 个 H3 子节(跟 STRATEGY §7 一致)
- 每条 FAQ 必须包含 1 个可直接回答的句子(便于 Google featured snippets 提取)
- 最后一条 §11.8 必须内链 [JSON to TypeScript Interface Generator](/tools/json-to-typescript/)(重磅内链)
- 长度 60-90 词/条,8 条 = ~600 词
- FAQ 必须用 H3(`### Q1?`),不用 H4 — 跟 jtsc FAQ 结构一致

---

### 2.13 `## Related Tools`(~120 词)

**目标词数:** 100-140 词
**结构:** 1 段 intro + 6-7 项 bullet list

**完整 sample draft:**

```markdown
## Related Tools

If you're working with YAML, JSON, or TypeScript regularly, these tools
complement the converter:

- **[JSON to TypeScript Interface Generator](/tools/json-to-typescript/)** —
  Take the JSON output from this tool and generate TypeScript interfaces
  with 6 toggle options (`type` vs `interface`, optional, readonly, nullable,
  camelcase, root name).
- **[YAML Validator & Linter (webpenson.com)](https://www.webpenson.com/tools/yaml-validator/)** —
  Schema-aware YAML validation for CI pipelines.
- **[JSON Formatter (webpenson.com)](https://www.webpenson.com/tools/json-formatter/)** —
  Format, validate, and minify JSON. Useful post-step after YAML → JSON.
- **[Base64 Encoder (webpenson.com)](https://www.webpenson.com/tools/base64/)** —
  Encode/decode base64 strings, common for encoding `data:` URIs in YAML configs.
- **[Hash Generator (webpenson.com)](https://www.webpenson.com/tools/hash-generator/)** —
  MD5 / SHA-1 / SHA-256 / SHA-512. Verify YAML file checksums.
- **[JWT Decoder (webpenson.com)](https://www.webpenson.com/tools/jwt/)** —
  Decode JSON Web Tokens for auth flow debugging.
```

**写作要点:**
- 第 1 项站内:`[JSON to TypeScript Interface Generator](/tools/json-to-typescript/)`(强内链,STRATEGY §6D)
- 其余跨站 webpenson-tools(STRATEGY §6E)
- 至少 6 项 bullet
- 描述控制在 15-25 词/项
- 锚文本含目的关键词(不是 "click here")

---

### 2.14 段尾 JSON-LD `<script>` 块

> Hugo 模板自动注入或手动嵌入到 markdown 末尾。详见 §4。

---

## 3. 内部链接策略(Internal Linking)

### 3.1 站内强内链(必须做 + 优先级)

| # | 链接位置(目标页面) | 锚文本 | 期望引流方向 | 优先级 |
|---|---|---|---|---|
| **A** | `yaml-to-json.md` §2.13 Related Tools 第 1 项 | `JSON to TypeScript Interface Generator` | yaml-to-typescript → | ⭐⭐⭐ |
| **B** | `yaml-to-json.md` §2.9 K8s 示例结尾 | `JSON to TypeScript Interface Generator` | yaml-to-typescript → | ⭐⭐ |
| **C** | `yaml-to-json.md` §2.10 YAML→JSON→TS 引子段 | `JSON to TypeScript Interface Generator` | yaml-to-typescript → | ⭐⭐⭐ |
| **D** | `yaml-to-json.md` §2.12 FAQ 11.8 | `JSON to TypeScript Interface Generator` | yaml-to-typescript → | ⭐⭐⭐ |
| **E** | `yaml-to-json.md` §2.1 Intro 第 3 段 | `JSON to TypeScript Interface Generator` | yaml-to-typescript → | ⭐⭐ |
| **F** | `json-to-typescript.md` Related Tools | `YAML to JSON Converter` | → yaml-to-json | ⭐⭐⭐(任务指令 + STRATEGY §6A) |
| **G** | `json-to-typescript.md` §2 "Configuration files" 段落 | `YAML to JSON Converter` | → yaml-to-json | ⭐⭐(STRATEGY §6B) |
| **H** | `content/_index.md` 工具列表 | `YAML to JSON Converter` | → yaml-to-json | ⭐⭐(STRATEGY §6C,新增分类 `### 格式转换`) |

### 3.2 跨站内链(webpenson-tools 站)

> **判断:** STRATEGY §6E 已经定好 4 个链接,本页面 §2.13 Related Tools 已采用 4 个。

| # | 目标页面 | 锚文本 | 目的 |
|---|---|---|---|
| I | `https://www.webpenson.com/tools/yaml-validator/` | `YAML Validator & Linter` | 跨站工具矩阵补足 |
| J | `https://www.webpenson.com/tools/json-formatter/` | `JSON Formatter` | 跨站工具矩阵 |
| K | `https://www.webpenson.com/tools/base64/` | `Base64 Encoder` | 跨站工具矩阵 |
| L | `https://www.webpenson.com/tools/hash-generator/` | `Hash Generator` | 跨站工具矩阵 |
| M | `https://www.webpenson.com/tools/jwt/` | `JWT Decoder` | 跨站工具矩阵(auth 调试) |

**注意:** `webpenson-tools/content/tools/yaml-validator/` 当前**不存在**(STRATEGY §9 注明 webpenson-tools 无 YAML 工具),链接 I 待确认;如确实未上线,可替换为 `https://www.webpenson.com/tools/json-formatter/` + 在 §2.13 减少一项。

### 3.3 内链锚文本关键词矩阵

**目标锚文本(避免 "click here" / "read more"):**

| 锚文本 | 用在哪 | 关键词覆盖 |
|---|---|---|
| `JSON to TypeScript Interface Generator` | 站内强内链 × 4 处 | `JSON`, `TypeScript`, `Interface Generator` |
| `YAML to JSON Converter` | json-to-typescript.md 内的反向链 | `YAML to JSON`, `Converter` |
| `YAML Validator & Linter` | 相关工具区块 | `YAML Validator`, `linter` |
| `JSON Formatter` | 相关工具区块 | `JSON Formatter` |
| `Base64 Encoder` | 相关工具区块 | `Base64 Encoder` |
| `Hash Generator` | 相关工具区块 | `Hash Generator` |
| `JWT Decoder` | 相关工具区块 | `JWT Decoder` |

### 3.4 内链密度建议

- 站内:`/tools/json-to-typescript/` 至少出现 **4 次**(A、B、C、D、E 5 处,留 1 处弹性)
- 跨站(webpenson.com/tools):5-6 处总跨站链接,在 §2.13 Related Tools 集中放置
- 首页 `content/_index.md`:新增 `### 格式转换` 分类 + yaml-to-json + json-to-typescript 同时加入(避免新分类只有 1 项显得空)

---

## 4. JSON-LD 结构

> 共 3 段结构化数据:WebApplication(主)、FAQPage(强推)、HowTo(可选加分)。

### 4.1 WebApplication(主 schema,必须)

**插入位置:** markdown 末尾,FAQ 区块之后,Related Tools 区块之前(或之后都行,但 Related Tools 之内视觉更顺)。

**完整 JSON-LD 模板:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YAML to JSON Converter",
  "alternateName": [
    "YAML JSON Converter",
    "YAML Validator",
    "YAML Formatter",
    "YAML Linter",
    "Online YAML to JSON"
  ],
  "url": "https://dlsome.top/tools/yaml-to-json/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "Format Converter",
  "operatingSystem": "Any (Browser-based)",
  "browserRequirements": "Requires JavaScript. Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free online YAML to JSON converter with validator & formatter. Supports Kubernetes manifests, GitHub Actions workflows, Docker Compose files. 100% browser-based, no upload.",
  "featureList": [
    "YAML to JSON conversion",
    "JSON to YAML conversion (bidirectional)",
    "YAML 1.2 syntax validator with friendly error messages",
    "YAML formatter / beautifier",
    "Four built-in presets: Kubernetes, GitHub Actions, Docker Compose, Generic",
    "Custom indent (2 spaces, 4 spaces, tab)",
    "Sort keys alphabetically option",
    "YAML anchor and alias preservation (noRefs: false)",
    "Copy to clipboard and download as .json / .yaml",
    "Mobile responsive (single-pane with view tabs)",
    "Dark mode (PaperMod .dark class compatible)",
    "Zero upload, zero tracking, 100% browser-side execution"
  ],
  "inLanguage": ["en"],
  "isAccessibleForFree": true,
  "keywords": "yaml to json, json to yaml, yaml validator, yaml formatter, kubernetes yaml, github actions yaml, docker compose yaml, devops"
}
</script>
```

### 4.2 FAQPage(强烈建议)

> 直接对应 §2.12 的 8 个 Q&A。

**完整 JSON-LD 模板:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this YAML to JSON converter free? Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the YAML to JSON Converter is 100% free with no signup, no account, no usage limit, and no email collection. Open the page and start converting immediately — there's no paywall, no 'X conversions per month' cap, and no premium tier hiding the toggle controls. The tool runs entirely in your browser via vanilla JavaScript and js-yaml v4 inlined inside the page, which is also why we can offer it free: there are no server costs per conversion."
      }
    },
    {
      "@type": "Question",
      "name": "Is my YAML data sent to your servers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — your YAML never leaves your browser. The js-yaml parser is inlined inside the page shortcode with no CDN dependency, no fetch() calls, and no analytics on input content. You can verify by opening DevTools → Network: paste any YAML, click Convert, and you'll see zero outbound requests. This makes the tool safe for production manifests containing Kubernetes secrets, GitHub Actions tokens, AWS access keys, and internal service hostnames. The page also works offline once loaded."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between YAML and JSON? When should I use each?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YAML is human-first: it supports comments, anchors, aliases, and multi-doc files. JSON is machine-first: strict types, universal API support, no comments. YAML is preferred for configuration files (Kubernetes manifests, GitHub Actions workflows, Docker Compose, Ansible playbooks, GitLab CI). JSON is preferred for API responses, package manifests, and TypeScript type generation. This converter bridges both formats so you can write YAML for humans and emit JSON for machines."
      }
    },
    {
      "@type": "Question",
      "name": "Can it handle Kubernetes manifests, GitHub Actions, and Docker Compose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The toolbar exposes four presets: Generic, Kubernetes, GitHub Actions, and Docker Compose. Selecting a preset loads a sample file and enables preset-aware validation. For Kubernetes, the preset checks that apiVersion, kind, and metadata.name are present. For GitHub Actions, it checks name, on, and jobs. For Docker Compose, it checks version and services. Missing required keys trigger a yellow warning strip below the input — conversion still proceeds."
      }
    },
    {
      "@type": "Question",
      "name": "Does it preserve YAML anchors and aliases when converting to JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — by default the converter preserves YAML anchors using noRefs: false, so &anchor and *alias references round-trip faithfully. JSON itself cannot store references (every reference is expanded to its full value), but the YAML output (when converting back) regenerates the anchor and reuses the alias. This is critical for Docker Compose files that share config across services and Kubernetes manifests that use kustomize-style fragment sharing."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my YAML has a syntax error? Will I lose my work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your input is never lost on parse failure. The error strip below the input shows line number, column number, and a friendly explanation that translates js-yaml's technical message into actionable feedback (for example, 'indentation error — check for mixed tabs/spaces' instead of 'bad indentation of a mapping entry'). The original technical message is folded inside a details element for debugging. You can fix the YAML in place and conversion resumes immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert JSON back to YAML? Are there any gotchas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — flip the Direction toggle in the toolbar to convert JSON back to YAML. The reverse converter uses jsyaml.dump with lineWidth: -1 so long strings (common in Kubernetes annotations) are not wrapped. Gotchas: (1) YAML comments are lost going JSON → YAML because JSON has no comment syntax; (2) JSON keys are emitted in input order, so sort-alphabetically is opt-in; (3) JSON numbers like 1.0 may emit as 1 in YAML if trailing zero is insignificant. Anchor and alias preservation works in both directions by default."
      }
    },
    {
      "@type": "Question",
      "name": "How do I generate TypeScript types from my YAML config?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the two-tool chain on dlsome.top. First, paste your Kubernetes manifest, OpenAPI spec, or Helm values.yaml into this YAML to JSON Converter and click Convert. Then take the JSON output and paste it into the JSON to TypeScript Interface Generator on the same site. Choose interface vs type, mark fields optional or readonly, and rename the root type to your domain entity (Service, Deployment, HelmValues). The result is a typed TypeScript file you can drop straight into a typed config loader or typed API client. The entire workflow runs in your browser — no upload, no signup, no QuickType CLI required."
      }
    }
  ]
}
</script>
```

### 4.3 HowTo(可选,加分项)

> 对应 §2.7 "How to Use This Tool" 的 5 步 + §2.10 YAML→JSON→TS 的 pipeline 4 步。可二选一,推荐 4 步 pipeline HowTo(更有商业价值)。

**完整 JSON-LD 模板:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to generate TypeScript types from a Kubernetes YAML manifest",
  "description": "Convert a Kubernetes YAML manifest into a typed TypeScript interface using the dlsome.top YAML → JSON → TypeScript pipeline. 100% browser-based, no upload.",
  "totalTime": "PT1M",
  "tool": [
    { "@type": "HowToTool", "name": "YAML to JSON Converter (dlsome.top)" },
    { "@type": "HowToTool", "name": "JSON to TypeScript Interface Generator (dlsome.top)" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Paste the Kubernetes YAML manifest",
      "text": "Open the YAML to JSON Converter at dlsome.top/tools/yaml-to-json/ and paste your Deployment, Service, or other Kubernetes manifest into the left input panel. Optionally select the 'Kubernetes' preset for validation that apiVersion, kind, and metadata.name are present."
    },
    {
      "@type": "HowToStep",
      "name": "Convert YAML to JSON",
      "text": "Click Convert (or wait for the 150ms debounce). The JSON output is canonicalized: keys preserved in order, anchors resolved to their expanded values, YAML 1.2 type tags respected. Copy the JSON output to your clipboard."
    },
    {
      "@type": "HowToStep",
      "name": "Generate TypeScript from the JSON",
      "text": "Open the JSON to TypeScript Interface Generator at dlsome.top/tools/json-to-typescript/. Paste the JSON into the left input panel. Toggle optional, readonly, or nullable based on your domain. Rename the root type to your Kubernetes entity (Service, Deployment, Pod, HelmValues)."
    },
    {
      "@type": "HowToStep",
      "name": "Copy the TypeScript into your project",
      "text": "Copy the generated interface from the right panel and paste it into your project's types/ directory. Use the typed config in your typed Kubernetes client, Helm value consumer, or OpenAPI SDK. The entire pipeline runs in your browser — zero upload, zero tracking."
    }
  ]
}
</script>
```

### 4.4 三段 JSON-LD 嵌入策略

| Schema | 是否嵌入 | 位置 | 验证要求 |
|---|---|---|---|
| WebApplication | ✅ **必须** | 文档末尾第一个 `<script>` | Google Rich Results Test 通过 |
| FAQPage | ✅ **强烈建议** | 文档末尾第二个 `<script>` | Google Rich Results Test 通过 + GSC 增强展示 |
| HowTo | ⚠️ 可选(推荐) | 文档末尾第三个 `<script>` | Google Rich Results Test 通过(若失败可移除) |

**Hugo 渲染注意:**
- Hugo 默认会把 markdown 里的 `<script>` 当 raw HTML 渲染,不会出错
- 如使用 `goldmark.renderer.withUnsafe = true`(Hugo 默认已开启),JSON-LD 内嵌没问题
- 测试方法:本地 `hugo server`,访问页面,View Source 查看 `<script type="application/ld+json">` 是否原样保留

---

## 5. og:meta 标签清单 + frontmatter 模板

### 5.1 完整 frontmatter 模板(直接复制)

```yaml
---
title: "YAML to JSON Converter — Free Online Validator & Formatter"
slug: "yaml-to-json"
description: "Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload."
date: 2026-07-22T00:00:00+08:00
draft: false
type: "page"
layout: "page"
translationKey: "yaml_to_json"
tools:
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
keywords:
  - "yaml to json"
  - "yaml validator"
  - "yaml formatter"
  - "yaml to json kubernetes"
  - "convert yaml to json github actions"
  - "docker compose yaml to json"
  - "online yaml to json converter"
  - "json to yaml online"
og:
  title: "YAML to JSON Converter — Free Online Validator & Formatter"
  description: "Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload."
  image: "/og-images/yaml-to-json.png"
  image_alt: "YAML to JSON Converter showing Kubernetes manifest input on left and formatted JSON output on right, with K8s/GitHub/Docker icons on the right panel"
  type: "website"
  url: "https://dlsome.top/tools/yaml-to-json/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "YAML to JSON Converter — Free Online Validator & Formatter"
  description: "Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload."
  image: "/og-images/yaml-to-json.png"
  image_alt: "YAML to JSON Converter showing Kubernetes manifest input on left and formatted JSON output on right"
canonical: "https://dlsome.top/tools/yaml-to-json/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "HowTo"
---
```

### 5.2 og:* meta 标签完整清单

> 由 Hugo PaperMod 主题根据 `og:`, `twitter:`, `canonical` 等 frontmatter 字段自动生成。下面是生成后的 HTML 期望值。

**必备 og:* 标签(8 条):**

```html
<meta property="og:title" content="YAML to JSON Converter — Free Online Validator & Formatter">
<meta property="og:description" content="Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.">
<meta property="og:image" content="https://dlsome.top/og-images/yaml-to-json.png">
<meta property="og:image:alt" content="YAML to JSON Converter showing Kubernetes manifest input on left and formatted JSON output on right, with K8s/GitHub/Docker icons on the right panel">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://dlsome.top/tools/yaml-to-json/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="dlsome.top">
<meta property="og:locale" content="en_US">
```

**Twitter Card 标签(5 条):**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="YAML to JSON Converter — Free Online Validator & Formatter">
<meta name="twitter:description" content="Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.">
<meta name="twitter:image" content="https://dlsome.top/og-images/yaml-to-json.png">
<meta name="twitter:image:alt" content="YAML to JSON Converter showing Kubernetes manifest input on left and formatted JSON output on right">
<meta name="twitter:site" content="@dlsometop">
```

**标准 meta 标签(7 条):**

```html
<meta name="description" content="Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.">
<meta name="keywords" content="yaml to json, json to yaml, yaml validator, yaml formatter, yaml linter, kubernetes yaml, github actions yaml, docker compose yaml, devops, online yaml to json converter">
<meta name="author" content="dlsome.top">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="language" content="English">
<link rel="canonical" href="https://dlsome.top/tools/yaml-to-json/">
<meta name="theme-color" content="#0F172A">
```

**JSON-LD 嵌入(3 段):** 见 §4

### 5.3 标题字符数 / 描述字符数 validation

| 字段 | 内容 | 字符数 | 上限 | 状态 |
|---|---|---|---|---|
| `title` | `YAML to JSON Converter — Free Online Validator & Formatter` | 57 | 60 | ✅ |
| `description` | `Free YAML to JSON converter with validator & formatter. Convert K8s manifests, GitHub Actions, Docker Compose. 100% browser-based, no upload.` | 141 | 160 | ✅ |
| `og:title` | 同 `title` | 57 | 60 | ✅ |
| `og:description` | 同 `description` | 141 | 160 | ✅ |
| `twitter:title` | 同 `title` | 57 | 70 | ✅ |
| `twitter:description` | 同 `description` | 141 | 200 | ✅ |
| H1 | `YAML to JSON Converter` | 22 | — | ✅(短,但 H1 不限字符数) |

---

## 6. 相关工具推荐区块(完整内容)

> §2.13 已经在 §2.13 sample draft 中给出完整的 Related Tools 区块。本节聚焦**结构 + 锚文本 + 排序原则**。

### 6.1 推荐结构(顺序敏感)

**Related Tools 区块推荐布局:**

| 顺序 | 工具 | 类型 | 内/外站 | 优先级 |
|---|---|---|---|---|
| 1 | **JSON to TypeScript Interface Generator** | 站内 | `/tools/json-to-typescript/` | ⭐⭐⭐(核心组合,放第一) |
| 2 | YAML Validator & Linter | 跨站 | `webpenson.com/tools/yaml-validator/` | ⭐⭐ |
| 3 | JSON Formatter | 跨站 | `webpenson.com/tools/json-formatter/` | ⭐⭐(pipeline 后续步骤) |
| 4 | Base64 Encoder | 跨站 | `webpenson.com/tools/base64/` | ⭐ |
| 5 | Hash Generator | 跨站 | `webpenson.com/tools/hash-generator/` | ⭐ |
| 6 | JWT Decoder | 跨站 | `webpenson.com/tools/jwt/` | ⭐ |

### 6.2 锚文本规则

- ✅ 锚文本含目标关键词:`JSON to TypeScript Interface Generator`(命中 `TypeScript`, `Interface Generator`)
- ✅ 锚文本含目标关键词:`YAML Validator & Linter`(命中 `YAML Validator`, `Linter`)
- ❌ 不允许 `click here` / `read more` / `this tool`
- ❌ 不允许裸 URL:`https://www.webpenson.com/tools/json-formatter/` — 一律加 `[锚文本](URL)`

### 6.3 站内 vs 跨站比例

- **建议比例:** 1 站内 + 5 跨站 = 6 项(跟 jtsc.md Related Tools 比例一致)
- **不要:** 全是站内(显得生态单薄)
- **不要:** 全是跨站(站内 json-to-typescript 流量流失)

---

## 7. "YAML → JSON → TypeScript" 完整链路文案 ⭐⭐⭐

> **STRATEGY §10 重磅差异化卖点**,本工具的核心叙事杠杆点。

### 7.1 一句话定位(用于多场合复用)

**英文版:**

> **Run the full YAML → JSON → TypeScript pipeline in your browser — zero upload, zero signup, zero tracking.**

**变体:**

> **Two dlsome.top tools, one browser, zero data leaving your tab. Convert YAML configs to typed TypeScript in three clicks.**

### 7.2 4 步 pipeline 描述(§2.10 已经详写)

**精简版(用于工具间过渡、首页介绍):**

```
1. Paste your YAML → [YAML to JSON Converter]
2. Take the JSON output → [JSON to TypeScript Interface Generator]
3. Toggle: interface / type / optional / readonly / nullable / camelcase
4. Copy the generated TypeScript into your project
```

### 7.3 4 步内链锚点(用于其他页面反向引流)

**从 json-to-typescript.md 反向引流 YAML→JSON 工具链:**

```markdown
> Looking to start from YAML (Kubernetes manifest, OpenAPI spec, Helm values)?
> Use the **[YAML to JSON Converter](/tools/yaml-to-json/)** to convert the YAML
> to JSON first, then paste the result here. The two tools together form a
> complete YAML → JSON → TypeScript pipeline for configuration type bootstrapping.
```

### 7.4 数字承诺(用于页面 hero / OG 描述变体)

- **"100% browser"**(privacy)
- **"3 clicks"**(speed)
- **"4 presets"**(DevOps coverage)
- **"8 FAQs"**(trust,对应 Schema FAQPage)
- **"5 highlights"**(technical depth)
- **"zero upload"**(privacy)

### 7.5 不要在 pipeline 文案中做的事

- ❌ 写 "the best" / "the fastest" / "the most advanced"(空形容词)
- ❌ 强行 add sales pitch(如 "try our premium plan")(本工具免费,无 premium)
- ❌ 跟 QuickType / Swagger Codegen 强行对抗(承认它们在多语言领域更强)
- ❌ 承诺没实现的功能(如 "automatically generate Zod schema" — 这不是本工具范围)

---

## 8. 内容生产 checklist(给写手 / content agent)

### 8.1 文档创建

- [ ] 文件创建:`content/tools/yaml-to-json.md`
- [ ] frontmatter 完整 9 个 top-level keys(`title`, `slug`, `description`, `tools`, `categories`, `tags`, `keywords`, `og`, `twitter`, `canonical`, `schema`)
- [ ] title 字符数 ≤ 60(实测 57)
- [ ] description 字符数 ≤ 160(实测 141)
- [ ] H1 = "YAML to JSON Converter"
- [ ] 首段在 130-180 词内
- [ ] 主关键词 `yaml to json` 在前 200 词出现 ≥ 3 次

### 8.2 章节完整性

- [ ] §1 What is YAML to JSON Converter(180 词)
- [ ] §2 How it differs from alternatives(220 词,table 6 行)
- [ ] §3 Four configuration toggles(180 词)
- [ ] §4 Four scene presets(200 词,4 个 H3)
- [ ] §5 Five technical highlights(200 词,5 条)
- [ ] §6 How to Use(150 词 + Keyboard shortcuts 5 个)
- [ ] §7 Conversion rules(200 词,table 12 行)
- [ ] §8 Example use cases(400 词,4 个 H3 含完整 YAML/JSON 代码块)
- [ ] §9 YAML → JSON → TypeScript pipeline(280 词)⭐
- [ ] §10 YAML to JSON vs competitors(220 词,table 7 行)
- [ ] §11 FAQ(600 词,8 个 H3)
- [ ] §12 Related Tools(120 词,6 项 bullet)

### 8.3 内链完整性

- [ ] §2.1 Intro 第 3 段:内链 `[JSON to TypeScript Interface Generator](/tools/json-to-typescript/)` × 1
- [ ] §2.9 K8s 示例结尾:内链 × 1
- [ ] §2.9 Generic 示例结尾(可选):内链 × 1
- [ ] §2.10 Pipeline §9.4 段:内链 × 1
- [ ] §2.12 FAQ 11.8:内链 × 1(必须)
- [ ] §2.13 Related Tools 第 1 项:内链 × 1
- [ ] §3.1G-H 内链 json-to-typescript.md 反向链添加(由 subagent 跟进,不阻塞本页发布)
- [ ] 跨站(webpenson.com/tools):5 项,集中在 §2.13

### 8.4 SEO 元素

- [ ] JSON-LD WebApplication 嵌入
- [ ] JSON-LD FAQPage 嵌入(8 个 Q&A 全部对应 §2.12)
- [ ] JSON-LD HowTo 嵌入(4 步 pipeline)
- [ ] canonical URL = `https://dlsome.top/tools/yaml-to-json/`
- [ ] og:title / og:description / og:image(1200×630)齐备
- [ ] twitter:card = `summary_large_image`
- [ ] keywords frontmatter 8 个关键词完整
- [ ] h2 段落标题含目标词(例:`## Four configuration toggles` 中 "configuration toggles" 出现频率合理)

### 8.5 内容质量

- [ ] 整段无 "click here" / "read more" / "this tool"(指代模糊)
- [ ] 整段无 "best" / "ultimate" / "powerful"(无证据形容词)
- [ ] 整段无 emoji(em-dash `—` 可以用,`✓` `→` `★` 等小符号紧跟 jtsc.md)
- [ ] 代码块 fence 语言正确(`yaml`, `json`, `typescript`, `markdown`, `bash`)
- [ ] 内链 URL 拼写正确(`/tools/json-to-typescript/` 末尾 slash 跟 jtsc.md 一致)
- [ ] 跨站 URL 完整 `https://www.webpenson.com/tools/...`

### 8.6 Hugo 渲染测试

- [ ] `hugo --gc --minify` 无错误
- [ ] `{{</* yaml-to-json */>}}` shortcode 渲染正常
- [ ] `<script type="application/ld+json">` 三段在 View Source 中原样保留
- [ ] 所有 og:* meta 标签在 `<head>` 中渲染
- [ ] canonical `<link>` 在 `<head>` 中渲染
- [ ] 暗色模式 `.dark` 下 markdown 内容跟 jtsc.md 一致可读
- [ ] 移动端(<900px)单栏 + viewtabs 正常(只测试 shortcode;markdown 内容本身响应式)

---

## 9. 验收标准(Acceptance Criteria)

写完后必须满足:

| # | 标准 | 验证方式 |
|---|---|---|
| 1 | markdown 长度 12-16 KB | `wc -c content/tools/yaml-to-json.md` |
| 2 | 英文为主(>90% 段落) | 文本里代码块外中文字符 < 5% |
| 3 | 12 个 H2 + 必要 H3 | grep `^## \|^### ` |
| 4 | 4 个完整 YAML/JSON 代码块示例 | grep ` ```yaml ` + ` ```json ` |
| 5 | 5-6 个站内/跨站内链 | grep `\[.*\]\(.*\)` |
| 6 | 3 段 JSON-LD 嵌入 | grep `application/ld+json` |
| 7 | og:* 全部 8 条在 frontmatter | grep `og:` |
| 8 | 跟 jtsc.md 风格一致 | 抽样对比 H1 / intro / FAQ 风格 |
| 9 | YAML → JSON → TypeScript 杠杆点显著 | §2.10 段落存在 + 含跨工具内链 |
| 10 | 无中文 SEO 噪音 | 中文仅可出现于 JSON-LD `inLanguage` 等结构性字段 |

---

## 10. 附属:写作风格指南(参考 jtsc.md 的隐式规则)

> 写手(content agent)请遵循这套隐式规则,保证 dlsome-top 站内风格统一。

### 10.1 段落开头原则

- ✅ 直接以功能/动作开头:`The YAML to JSON Converter is a browser-based utility that...`
- ✅ 数字开头:`Four built-in presets...` / `Eight FAQs answer...`
- ✅ 命令式开头:`Paste your YAML into the left input panel.`
- ❌ 避免开头:`In today's world...` / `Have you ever needed to...` / `Let's explore...`

### 10.2 段落节奏

- 段落长度控制在 80-150 词
- 短句为主(平均 15-20 词/句)
- 长句只用于定义/规则表注释(jtsc.md 的 Type Inference Rules 表注释风格)

### 10.3 表格列宽

- 比较表:`| Tool | Pros | Cons | Best for |`(4 列,简洁)
- 映射表:`| YAML value | JSON output | YAML output |`(3 列)
- 不超过 4 列,避免长表格降低可读性

### 10.4 内联代码格式

- 文件名 / 配置名用反引号:`package.json` / `values.yaml`
- 命令、键名、TypeScript 关键字:`Ctrl/⌘ + Enter` / `&anchor` / `interface`
- 不在正文里用 `<code>` HTML(用 markdown 反引号)

### 10.5 FAQ 写作模板

每条 FAQ 严格遵循:

```
### 11.X [问题陈述,以问号或"?"结尾]?

[第一段:直接回答,1-2 句,含关键关键词]

[第二段:展开说明,80-100 词,可含 1 个具体技术细节或命令示例]

[第三段(可选):跨工具引用或下一步指引,30-50 词]
```

### 10.6 不允许的写法

- ❌ 花哨 emoji(只允许 `✓` `→` `❌` `⚠` 等功能性符号)
- ❌ 营销话术(`supercharge your workflow` / `unleash the power`)
- ❌ "we believe" / "we think" / "we hope"(直接说事实)
- ❌ "feel free to"(命令式替代:`Use it for ...`)
- ❌ 时间相对词(`recently` / `latest` / `new`)(改用具体日期:`as of 2026-07`)

---

## 11. 实施顺序建议(给执行 subagent)

按以下顺序产出内容,避免返工:

1. **先写 frontmatter(§5.1)** — 1 个 commit 单元
2. **写 §2.1 H1 + intro + §2.13 Related Tools** — 建立 SEO 锚点(最先被搜索引擎索引)
3. **写 §2.2-§2.7 工具基础说明** — 跟 shortcode 工程实现对齐
4. **写 §2.8 Example use cases + §2.10 Pipeline** — 4 个 YAML/JSON 代码块 + pipeline 链,可读性最强部分
5. **写 §2.9 Conversion rules + §2.11 comparison** — 表格式内容
6. **写 §2.12 FAQ** — 8 条,跟 shortcode 友好错误映射对齐
7. **最后写 JSON-LD §4 全部 3 段** — 跟内容最终对齐后写
8. **运行 §8 checklist + §9 验收标准** — 发布前最后一道关

---

## 12. 后续待办 / 不在本期范围

| # | 事项 | 优先级 | 处理方式 |
|---|---|---|---|
| 1 | json-to-typescript.md 反向内链(§3.1F-G) | P1 | 由 `engineering` subagent 在 yaml-to-json 上线后跟进(单独 subagent 任务) |
| 2 | content/_index.md 工具列表更新(§3.1H) | P1 | 同上,跟 F-G 一起 |
| 3 | webpenson-tools json-to-typescript.md 跨站内链 | P2 | 后续(STRATEGY §14 已注明) |
| 4 | og:image 设计(1200×630 PNG/JPG) | P1 | designer 任务,本工具上线必备 |
| 5 | 中文版 `/zh/tools/yaml-to-json/` | P3 | 二期,需要 i18n 架构跟上 |
| 6 | YAML ↔ TOML / YAML ↔ XML 工具 | P3 | 二期,跟 shortcode 架构预留扩展点(STRATEGY §14) |
| 7 | Schema Validator(YAML Schema 校验) | P3 | 二期 |

---

**PLAN-CONTENT.md 结束。**

执行入口建议:**起一个 content agent / 主 agent 直接写**,从 §11 步骤 1 开始。`STRATEGY.md` + `PLAN-ENGINEERING.md` + 本文档三件齐备即可开工。
