---
title: "JSON to TypeScript Interface Generator"
slug: "json-to-typescript"
description: "Convert JSON to TypeScript interfaces instantly. Free, no signup, browser-based. Supports nested objects, optional fields, readonly, nullable fields, and union types."
tools: ["json", "typescript", "interface", "code-generator", "developer-tools", "api"]
---

# JSON to TypeScript Interface Generator

{{< json-to-typescript >}}

Convert JSON to TypeScript interfaces instantly, right in your browser. No signup, no upload, no tracking — just paste a JSON sample and get clean, idiomatic TypeScript interface or type-alias definitions. This **JSON to TypeScript interface** generator supports nested objects, arrays, optional fields, readonly modifiers, recursive references, and union types. Built for TypeScript developers who need fast, accurate type generation for API responses, configuration files, and test fixtures.

## What is JSON to TypeScript Interface Generator

The JSON to TypeScript Interface Generator is a browser-based utility that converts a JSON sample into clean, idiomatic TypeScript `interface` or `type` definitions in milliseconds. Every conversion runs 100% in the browser — there are no servers processing your data, no signups, no accounts, and no npm packages to install. You paste JSON on the left, copy TypeScript from the right.

### Core use cases

The tool covers the five scenarios TypeScript developers hit most often:

- **REST API responses** — paste a `fetch().then(r => r.json())` output or a curl response from GitHub, Stripe, Twilio, or any REST endpoint and get a typed client interface.
- **Configuration files** — type your `package.json`, `tsconfig.json`, or app config for compile-time safety in build scripts and CLI tools.
- **Test fixtures and mock data** — generate fixture types once, then reference them across Jest, Vitest, or Storybook stories.
- **OpenAPI / Swagger bootstrap** — paste any endpoint's sample response body from Swagger UI's "Try it out" to bootstrap a type-safe SDK client.
- **GraphQL response shapes** — paste a JSON payload from any GraphQL query (REST-style transport) and get the exact interface for your selection set.

### How it differs from alternatives

| Tool category | Trade-off |
|---|---|
| **QuickType** (13.8K ★, multi-language) | Generates TS / Go / C# / Java / Swift, but UI is heavy (~2MB+) and learning curve is steep. Best for multi-language code generation. |
| **`json-to-ts` npm package** (432 ★) | Recursive types handled well, but you must `npm install` and integrate it into a build step. No browser-only usage. |
| **transform.tools / jsonformatter.org / jsontotypescript.com** | Simple single-purpose converters with no toggle configuration, no SEO content depth, and limited FAQ coverage. |
| **This tool (dlsome.top)** | 100% browser, six configuration toggles, dark-mode editor, no tracking, no ads, comprehensive developer documentation. |

### Six configuration toggles

The toolbar below the input panel exposes six independent toggles:

1. **`interface` vs `type`** — emit `export interface Foo {}` (default) or `export type Foo = {};`.
2. **Make fields optional (`?`)** — append `?` to every property name. Useful for PATCH endpoints and partial updates.
3. **Make fields readonly** — prefix every property with `readonly`. Ideal for Redux store shapes and immutable view models.
4. **Include `\| null`** — append `| null` to non-null fields so you cover APIs that document `null` explicitly.
5. **Convert snake_case → camelCase** — rename keys like `user_id` to `userId` while keeping the JSON shape intact in your code.
6. **Root type name** — override the default `Root` with any PascalCase name (`GitHubUser`, `StripeCharge`, `PackageJson`).

### Five technical highlights

- **Nested objects auto-named** — `user.address` becomes `interface User` plus `interface UserAddress`, with the chain following PascalCase convention.
- **Empty arrays fall back to `unknown[]`** — never `never[]`, which would cause immediate type errors when you populate the array at runtime.
- **Mixed arrays become union types** — `[1, "x", true]` becomes `(number | string | boolean)[]`, preserving every observed primitive.
- **Special keys are quoted** — keys with spaces (`"foo bar"`) or reserved words (`delete`, `return`) get auto-quoted as `"foo bar": string;`.
- **Debounced output** — large inputs update the output panel with a ~150ms debounce so typing stays smooth even on multi-KB JSON.

## How to Use This Tool

The tool is designed for paste-and-go: open the page, paste your JSON, and copy the generated TypeScript. Follow these five steps:

1. **Paste your JSON** into the left input panel — or click **Sample** to load a GitHub user API response and see the tool in action.
2. **Toggle options** in the toolbar — choose `interface` or `type`, mark fields optional, readonly, or nullable, enable camelcase conversion, and rename the root type.
3. **Watch the output update** as you type or change toggles (debounced ~150ms for performance on large inputs).
4. **Copy** the TypeScript code to your clipboard, or **Download** it as a `.ts` file named after your root type (e.g. `GitHubUser.ts`).
5. **Paste into your project** — no build step, no `npm install`, no configuration required.

### Keyboard shortcuts

- `Ctrl/⌘ + Enter` — trigger conversion
- `Ctrl/⌘ + L` — load the sample JSON
- `Ctrl/⌘ + K` — clear both panels
- `Tab` — insert a tab character in the input textarea

## Type Inference Rules

The inference engine recursively walks your JSON tree and emits one `interface` per unique object shape. The table below documents every value-to-type mapping:

| JSON value | Inferred TypeScript type |
|---|---|
| `"text"` | `string` |
| `123`, `-1.5`, `0` | `number` |
| `true` / `false` | `boolean` |
| `null` | `null` (when the `nullable` toggle is on, otherwise omitted) |
| `[1, 2, 3]` | `number[]` |
| `[{a:1}, {a:2}]` | `Foo[]` (child interface with PascalCase name) |
| `[]` (empty array) | `unknown[]` |
| `[1, "x"]` (mixed) | `(number \| string)[]` |
| `{a:1, b:"y"}` | `interface Root { a: number; b: string; }` |
| Nested `{a:{b:{c:[1,2]}}}` | Multiple interfaces + arrays, PascalCase naming chain |
| ISO date `"2025-01-01T..."` | `string` (date detection slated for v2) |
| `"foo bar"` (key with space) | `"foo bar": string;` (safeKey auto-quoted) |
| `delete` (reserved word key) | `"delete": string;` (safeKey auto-quoted) |

The inference engine uses **recursive traversal with type deduplication**. Empty arrays safely degrade to `unknown[]` so runtime population never fails type-checking. Mixed arrays generate union types preserving every primitive observed. Nested objects generate named child interfaces following the parent key in PascalCase — for example, a top-level `user` with a nested `address` produces both `interface User` and `interface UserAddress`. Repeated object shapes across the tree are deduplicated so you get one interface per unique structure rather than dozens of duplicates.

## Example Use Cases

The five examples below cover the most common TypeScript workflows. Each example shows the JSON input, the toggle configuration, and the resulting TypeScript output.

### Generate Types from a REST API Response

When integrating a third-party API like GitHub, Stripe, or any REST endpoint, paste a real response from `curl` or `fetch().then(r => r.json())` to get a typed client. Toggle `optional` + `nullable` for fields the API documents as potentially missing, and rename the root to your domain entity (`GitHubUser`, `StripeCharge`).

**Example: GitHub User API response**

Input JSON:

```json
{
  "login": "octocat",
  "id": 1,
  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  "public_repos": 8,
  "followers": 9999,
  "created_at": "2011-01-25T18:44:36Z"
}
```

Generated TypeScript (toggles: optional=on, rootName=GitHubUser):

```typescript
export interface GitHubUser {
  login?: string;
  id?: number;
  avatar_url?: string;
  public_repos?: number;
  followers?: number;
  created_at?: string;
}
```

### Type a JSON Configuration File

Configuration files (`package.json`, `tsconfig.json`, custom app config) benefit from typed shapes for autocomplete and compile-time safety in build scripts. Paste the file contents, set the root name to match your config type (`PackageJson`, `TsConfig`, `AppConfig`), and use `readonly` since these values never mutate after load.

**Example: package.json structure**

Input JSON:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.0.0"
  }
}
```

Generated TypeScript (toggles: readonly=on, rootName=PackageJson):

```typescript
export interface PackageJson {
  readonly name?: string;
  readonly version?: string;
  readonly scripts?: PackageJsonScripts;
  readonly dependencies?: PackageJsonDependencies;
}

export interface PackageJsonScripts {
  readonly build?: string;
  readonly test?: string;
}

export interface PackageJsonDependencies {
  readonly react?: string;
}
```

### Define Types for Test Fixtures and Mock Data

Test fixtures (Jest/Vitest mock data, Storybook stories) need consistent typing so your tests catch typos in property names. Generate the fixture type once, then reference it in your test helpers. Toggle `readonly` for immutable fixtures, and use the `camelcase` toggle if your fixture data uses `snake_case` keys.

**Example: Mock user fixture**

Input JSON:

```json
{
  "user_id": 42,
  "user_name": "alice",
  "is_admin": true,
  "permissions": ["read", "write", "delete"]
}
```

Generated TypeScript (toggles: camelcase=on, readonly=on, rootName=MockUser):

```typescript
export interface MockUser {
  readonly userId?: number;
  readonly userName?: string;
  readonly isAdmin?: boolean;
  readonly permissions?: string[];
}
```

### Bootstrap Types from an OpenAPI / Swagger Schema

When building a typed SDK client from an OpenAPI spec, paste a sample response body from any endpoint schema (e.g. from Swagger UI's "Try it out" → actual response). The generator produces the exact interface for that response shape. For multiple endpoints, generate each interface separately and merge them into a `types/api.ts` file. Toggle `nullable` for fields the schema marks as nullable.

**Example: Stripe charge response**

Input JSON:

```json
{
  "id": "ord_123",
  "amount": 4200,
  "currency": "usd",
  "status": "succeeded",
  "customer": {
    "id": "cus_abc",
    "email": "alice@example.com"
  },
  "metadata": {}
}
```

Generated TypeScript (toggles: nullable=on, rootName=StripeCharge):

```typescript
export interface StripeCharge {
  id?: string | null;
  amount?: number | null;
  currency?: string | null;
  status?: string | null;
  customer?: StripeChargeCustomer | null;
  metadata?: Record<string, never> | null;
}

export interface StripeChargeCustomer {
  id?: string | null;
  email?: string | null;
}
```

### Type a GraphQL Response Shape

GraphQL responses (when fetched as JSON via REST-style transport) can be typed by pasting the response payload. The generator handles nested selection sets, fragment spreads, and union types from GraphQL schema introspection. Rename the root to your query name (`GetUserQuery`, `SearchProductsQuery`) for clean code organization alongside your `.graphql` files.

**Example: GraphQL user query response**

Input JSON:

```json
{
  "data": {
    "user": {
      "id": "u_1",
      "name": "Bob",
      "posts": [
        { "id": "p_1", "title": "Hello", "publishedAt": "2025-01-15T00:00:00Z" },
        { "id": "p_2", "title": "World", "publishedAt": "2025-02-01T00:00:00Z" }
      ]
    }
  }
}
```

Generated TypeScript (toggles: rootName=GetUserQuery, nested interface chain):

```typescript
export interface GetUserQuery {
  data?: GetUserQueryData;
}

export interface GetUserQueryData {
  user?: GetUserQueryDataUser;
}

export interface GetUserQueryDataUser {
  id?: string;
  name?: string;
  posts?: GetUserQueryDataUserPost[];
}

export interface GetUserQueryDataUserPost {
  id?: string;
  title?: string;
  publishedAt?: string;
}
```

## JSON to TypeScript vs. QuickType and Other Tools

The most common comparison people make is between this tool and QuickType, since both convert JSON to TypeScript. The table below summarizes the trade-offs across the six most popular options:

| Tool | Type | Pros | Cons | Best for |
|---|---|---|---|---|
| **dlsome.top JSON to TS** | Pure frontend web tool | Zero dependencies, dark theme, 6 toggle configurations, 1500+ words SEO content | TypeScript only | Single TS project, paste-and-go |
| **QuickType** | Web + CLI + npm | 13.8K ★, multi-language (TS / Go / C# / Java / Swift), mature 7 years | Heavy UI (2MB+), steep learning curve | Multi-language code generation |
| **transform.tools** | Web tool | Polished UI, many transformers | No content depth, no FAQ, no use cases | Single quick conversion |
| **jsonformatter.org/json-to-typescript** | Web subpage | Large site, sitemap indexed | jQuery residue, no FAQ, no toggle config | One-off ad-hoc conversion |
| **json-to-ts (NPM)** | TypeScript library | 432 ★, recursive types, 53 professional issues | Requires `npm install`, no CLI web usage | Embedding into existing TS projects |
| **jsontotypescript.com / .app** | Web tool | Exact-match keyword domain | Minimal UI, no SEO content, poor accessibility | (Not recommended) |

If you only need **TypeScript single-language + zero-friction paste-and-go + flexible configuration**, this tool is the fastest-loading, most configurable browser-side option available today. QuickType remains the gold standard for multi-language scenarios where you need Go, C#, or Java output from the same JSON sample.

## Frequently Asked Questions

### Is this JSON to TypeScript converter free? Do I need to sign up?

Yes, the JSON to TypeScript interface generator is 100% free with no signup, no account, no usage limit, and no email collection. Open the page and start converting immediately — there's no paywall, no "X conversions per month" cap, and no premium tier hiding the toggle controls. The tool runs entirely in your browser via vanilla JavaScript, which is also why we can offer it free: there are no server costs per conversion. You'll see no ads interrupting the workflow either, just a clean dark-mode editor. Use it for open-source projects, client work, learning TypeScript, or any commercial purpose without restriction.

### Is my JSON data sent to your servers?

No — your JSON never leaves your browser. The conversion runs entirely via client-side JavaScript, with no `fetch()` calls, no analytics on input content, and no server uploads. You can verify this yourself by opening DevTools → Network tab: paste any JSON, click Convert, and you'll see zero outbound requests for the conversion logic. We use no third-party scripts, no CDN dependencies for the type inference engine, and no telemetry on what you paste. This makes the tool safe for sensitive API responses (auth tokens, internal endpoints, customer data) and works offline once the page is loaded.

### How are nested objects and arrays handled in JSON to TypeScript conversion?

Nested JSON objects are auto-inferred as separate named TypeScript interfaces using PascalCase naming: a top-level key `user` with nested object `address` produces `interface User` plus `interface UserAddress`. Arrays of objects generate a single interface for the element type, so `[{id:1}, {id:2}]` becomes `interface Foo { id: number; }` followed by `data: Foo[];`. Homogeneous arrays (all numbers, all strings) become `T[]`; mixed arrays like `[1, "x"]` produce union types `(number | string)[]`; empty arrays safely fall back to `unknown[]` to avoid `never[]` typing errors. Deep nesting is supported to 10+ levels via recursive inference.

### How do I make fields optional or readonly in the generated TypeScript?

Use the toolbar toggles below the input panel. Toggle **Make fields optional (`?`)** adds a question mark suffix to every property — useful for PATCH endpoints and partial updates. Toggle **Make fields readonly** prefixes every property with `readonly` — ideal for immutable state, Redux store shapes, and React props you never want mutated. Toggle **Include `| null` on every field** appends `| null` to non-null properties — covers real-world APIs where fields can be missing or explicitly null. You can combine all three for full safety: `readonly userId?: number | null;`. Each toggle triggers an immediate re-conversion of the output.

### What about arrays with mixed types in JSON?

The generator produces TypeScript union types for mixed-type arrays. The input `[1, "x", true]` becomes `(number | string | boolean)[]` — preserving every primitive type observed in the sample. For arrays containing different object shapes like `[{userId:1}, {orderId:2}]`, the current MVP generates an interface with optional fields (`userId?: number; orderId?: number;`); future versions may merge keys across array elements for stronger typing. Empty arrays `[]` always become `unknown[]` rather than `never[]` so you can still populate them at runtime without type errors. This handling mirrors how `json-to-ts` and `quicktype` resolve array heterogeneity.

### Can I use this for REST API responses and Swagger schemas?

Absolutely — this is the primary use case the tool was built for. Paste a sample response from `fetch().then(r => r.json())`, a curl output, or a Postman collection export, and you'll get an exact `interface` for your typed client. For OpenAPI / Swagger workflows, paste a sample response body from any endpoint's schema — the generated interface aligns with the JSON shape that endpoint actually returns. Toggle `optional` for fields that may be omitted, `nullable` for fields the API documents as nullable, and `readonly` for client-side view models. The `Root type name` input lets you set the interface to your domain entity (`UserProfile`, `OrderResponse`, etc.) for direct paste into your types file.

### Does it support recursive or self-referencing TypeScript types?

Basic recursion works when a JSON key directly references a named sub-interface — for example, a tree structure with `children: ChildNode[]` where `ChildNode` has its own `children` field produces a correct recursive interface (since `ChildNode` is declared once and referenced later). True self-referencing JSON Schema patterns like `{"$ref": "#"}` or polymorphic `oneOf`/`anyOf` are a known limitation slated for v2 — the current MVP treats `$ref` as a regular object key. For most practical use cases (tree views, linked lists, nested comments, organizational charts), the recursive output works correctly. If your input relies on `$ref` resolution, validate the output before pasting into production types.

## Related Tools

If you're working with JSON or TypeScript regularly, these tools complement this converter:

- **[Markdown ↔ HTML Converter](/tools/markdown-html-converter/)** — Convert Markdown to HTML and back, browser-based, free. Same `dlsome-top` site.
- **[JSON Formatter (webpenson.com)](https://www.webpenson.com/tools/json-formatter/)** — Format, validate, and beautify JSON online. Great pre-step before generating TypeScript types.
- **[JWT Decoder (webpenson.com)](https://www.webpenson.com/tools/jwt/)** — Decode and inspect JSON Web Tokens — useful for typing auth response payloads.
- **[Hash Generator (webpenson.com)](https://www.webpenson.com/tools/hash-generator/)** — MD5 / SHA-1 / SHA-256 / SHA-512 online.
- **[UUID Generator (webpenson.com)](https://www.webpenson.com/tools/uuid-generator/)** — Generate UUIDs (v1, v4, v7) for test fixtures and mock data.