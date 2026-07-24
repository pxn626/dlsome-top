---
build: never
draft: true
---

# Engineering Plan: JWT Inspector (Developer Debug Edition)

> **Slug:** `jwt-inspector`
> **Repo:** `~/code/dlsome-top/` (GitHub: `pxn626/dlsome-top`)
> **Site:** `https://dlsome.top/tools/jwt-inspector/` (独立品牌 AI + devtools · 与 `webpenson.com/tools/jwt-decoder/` 差异化)
> **Engine:** Hugo + PaperMod; `defaultContentLanguage = 'zh'`
> **Branch:** `feat/jwt-inspector` (strategy + content-plan: commit 1fd545f; **NEVER push to `main`**)
> **Author:** webpenson-executor-engineering · **Date:** 2026-07-23
> **Cluster siblings:** `cron-parser`, `yaml-to-json`, `json-to-typescript`, `markdown-html-converter`, `ai-prompt-helper`
> **Cross-site reference:** `webpenson-tools /tools/jwt-decoder/` (basic decoder; this tool = debug-grade inspector)
> **Status:** Pre-implementation engineering plan. Engineering agent implements from this document without follow-up questions.

---

## 0. Executive Summary & Decision Log

| # | Decision | Rationale |
|---|---|---|
| **D1** | Pure client-side tool. **Zero server endpoint, zero CDN, zero fetch, zero XHR, zero tracking.** All cryptographic operations via `window.crypto.subtle` (Web Crypto API). | Per strategy §0 红线 (secret/private-key 永不出浏览器内存). `crypto.subtle` is unavailable over `file://` and `http://`, so the tool **requires HTTPS or localhost** — Hugo site is already HTTPS. |
| **D2** | Three algorithm verification modes in one shortcode: **HS256** (HMAC-SHA-256, symmetric secret), **RS256** (RSASSA-PKCS1-v1_5 with SHA-256, asymmetric SPKI PEM public key), **ES256** (ECDSA P-256 with SHA-256, asymmetric SPKI PEM public key, **auto P1363 ↔ DER signature encoding**). | Strategy §6.1 + §6.4 specifies these three algorithms. PS256 / PS384 / PS512 / RS384 / RS512 / ES384 / ES512 are out of scope for v1.0.0 (post-launch §9 item 1). |
| **D3** | The shortcode handles **nine user-facing modules** in one IIFE: ① Header/Payload decode, ② HS256/RS256/ES256 signature verify, ③ Claim inspector with RFC 7519 registered-claim highlighting, ④ exp/nbf countdown ticker (setInterval), ⑤ Claim tamper editor + HS256 re-sign, ⑥ Algorithm confusion panel (alg=none warning + HS/RS confusion demo), ⑦ Bearer token auto-extraction, ⑧ Multi-algorithm parallel verify, ⑨ Optional JWKS kid lookup (opt-in fetch). | Strategy §6.1 lists all nine modules. They share state (parsed header/payload, decoded bytes) so a single IIFE keeps the bundle coherent and avoids cross-frame state passing. |
| **D4** | **New shortcode from scratch** — do NOT fork `webpenson-tools/layouts/shortcodes/jwt_tool.html`. Same author/operator but different brand. | Per task brief: "增加:secret/public-key 输入区、篡改模式切换按钮、算法对比面板、Bearer 提取". Forking would inherit the public-decoder UX and break brand consistency. |
| **D5** | All CSS, JS, fonts inline in the shortcode. **Zero external `<script src=…>`, zero `<link href="https://…">`**, zero CDN. Only PaperMod theme assets (same-origin). | Per task brief "红线" and strategy §6.6. |
| **D6** | CSS namespace `--jwt-*` / `.jwt-*`; JS data-attributes `data-jwt-*`; root element `class="jwt" data-jwt-root`. | Mirrors `cron-parser` namespace convention (`.crp*`); no collision with sibling tools. |
| **D7** | i18n: **en (full copy) + zh (placeholder strings, EN fallback)**. Both Hugo pages (`jwt-inspector.en.md` and `jwt-inspector.md`) use the same shortcode. The shortcode reads `.Page.Language.Lang` to pick the UI language. | Matches cron-parser precedent. zh UI can be progressive-enhanced later (post-launch). |
| **D8** | Branch discipline: commit to `feat/jwt-inspector`, **never push to `main`**; never merge to `main`; never force-push published commits. | Per AGENTS.md §"红线" and existing branch pattern (1fd545f is on `feat/jwt-inspector`). |
| **D9** | **Sensitive claim masking** — render values for claim names matching the case-insensitive blacklist `password`, `secret`, `api_key`, `apikey`, `token`, `credential`, `private_key`, `privateKey`, `access_token`, `refresh_token`, `client_secret` as `••••••••` with a "Reveal" toggle (per-claim, never persist). | Strategy §0 "差异化" + §6.1. Even with no upload, the user could accidentally screenshot a token with credentials. Masking is a UX safety net. |
| **D10** | Algorithm confusion detection runs in two modes: **A. Passive**: every decoded token's `alg` is checked against `['none','None','NONE','NUL']` → red ⚠ CVE-2015-9235 banner; **B. Active**: a separate panel lets user paste an RS256 public key + click "Test HS256 confusion" → tool attempts to verify the token using HS256 with the public key bytes as HMAC secret (mirror of the canonical attack). | Strategy §0, §1.4, §3.1 §7. The passive check is always-on; the active check is opt-in (needs a public key, so we never auto-run it). |
| **D11** | Tamper mode is gated behind a confirmation modal the first time per session: "FOR DEBUGGING / RED TEAM USE ONLY. Never tamper with tokens you do not own. Proceed?" | Strategy §3.1 §6. Explicitly avoid misuse. Once confirmed in a session, subsequent re-signs don't re-prompt. |
| **D12** | Multi-algorithm parallel verify (D3 §⑧) is only shown when the user has supplied **two or more secrets/keys**. Default render shows just the algorithm matching the token header; the "Compare with other algorithms" toggle expands the others. | Avoids noise. The cross-algorithm comparison is only useful when the user can actually verify with both — so gate the panel on key inputs being present. |
| **D13** | JWKS lookup (D3 §⑨) is opt-in: user pastes JWKS endpoint URL + clicks "Fetch" → tool does a one-time `fetch()` to that URL (not to dlsome.top or any third party) → caches parsed JWKS in module memory for the session → user picks a `kid` from a dropdown. **No auto-fetch on page load, no periodic refetch, no cookies, no localStorage persistence of JWKS response.** | Strategy §3.1 §10 + §6.1. JWKS response is public metadata, so fetch is acceptable; we just minimize blast radius. |
| **D14** | Expiration ticker uses `setInterval(updateCountdowns, 1000)` started once on init, cleared on `pagehide`. When the token is replaced, ticker keeps running but only updates visible cards (cards hidden via `[hidden]` are skipped). | Avoids leaked timers; one global ticker is more efficient than N per-card timers. |
| **D15** | No `extend_head.html` modification for this tool — JSON-LD + OG + Twitter meta tags live **inline in the markdown body** at the end of each content stub, mirroring `cron-parser.md` precedent. | Per task brief and content-plan §5.3. Modifying the global partial would affect every page on the site. |

---

## §1. Tool Architecture

### 1.1 User flow

```
┌──────────────────────────────────────────────────────────────────────┐
│ User opens https://dlsome.top/tools/jwt-inspector/                   │
│ (Hugo static page rendered by PaperMod, HTTPS-only)                  │
│                                                                      │
│  ┌─ {{< jwt-inspector >}} shortcode output ─────────────────────┐   │
│  │                                                              │   │
│  │  ┌─ Token input card ──────────────────────────────────┐    │   │
│  │  │ [ paste JWT or "Authorization: Bearer eyJ..."  ]   │    │   │
│  │  │ [ Load sample · Clear ]                             │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─ Decoded Header (auto) ──┐  ┌─ Decoded Payload (auto) ┐ │   │
│  │  │ { "alg": "HS256",        │  │ { "sub": "...",         │ │   │
│  │  │   "typ": "JWT",          │  │   "iat": 1753267200,    │ │   │
│  │  │   "kid": "k1" }          │  │   "exp": 1753270800,    │ │   │
│  │  │                          │  │   "expires in 23m 14s"  │ │   │
│  │  │ Signature                │  │                          │ │   │
│  │  │ 86 6f 4d ab 12 …         │  │ [ Edit any claim ↓ ]    │ │   │
│  │  └──────────────────────────┘  └──────────────────────────┘ │   │
│  │                                                              │   │
│  │  ┌─ Signature verification panel ──────────────────────┐    │   │
│  │  │ Algorithm:  (auto from header) [HS256 ▼]            │    │   │
│  │  │ Mode:  ● verify-secret   ○ verify-public-key        │    │   │
│  │  │ Secret:  [•••••••••••••  show/hide]                 │    │   │
│  │  │ [ Verify ]   ✓ valid since 2026-07-23 09:51 UTC     │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─ RFC 7519 Registered Claims ────────────────────────┐    │   │
│  │  │ iss  https://auth.example.com   ✓ valid            │    │   │
│  │  │ sub  user_abc123               ✓ valid            │    │   │
│  │  │ aud  https://api.example.com   ✓ matches          │    │   │
│  │  │ exp  1753270800 (in 23m 14s)   ✓ not expired      │    │   │
│  │  │ nbf  1753267200 (since 30m)    ✓ valid            │    │   │
│  │  │ iat  1753267200                ✓ reasonable        │    │   │
│  │  │ jti  abc-123-xyz               ✓ unique            │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─ Algorithm confusion / Security panel ──────────────┐    │   │
│  │  │ ⚠ alg=none detected?  ☐ none  ☐ HS/RS confusion    │    │   │
│  │  │ [ Test HS/RS confusion with public key ]            │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─ Tamper mode (HS256 only) ──────────────────────────┐    │   │
│  │  │ ⚠ FOR DEBUGGING / RED TEAM USE ONLY                 │    │   │
│  │  │ Edit claims → re-sign with same secret              │    │   │
│  │  │ [ I understand the risks · Enable tamper mode ]     │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                              │   │
│  │  ┌─ Optional: JWKS lookup ─────────────────────────────┐    │   │
│  │  │ JWKS URL: [ https://auth.example.com/.well-known/ ] │    │   │
│  │  │ kid:        [ k1 ▼ ]                                │    │   │
│  │  │ [ Fetch JWKS ]                                      │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              │ (only the JWKS panel may do fetch())
                              ▼
              User-provided JWKS endpoint (HTTPS, same-origin or 3rd-party
              public-key set published by user's IdP — NOT dlsome.top)
```

### 1.2 Components

| # | Component | Type | Location | Owner |
|---|---|---|---|---|
| 1 | Shortcode (HTML + inline CSS + inline JS) | Hugo template | `layouts/shortcodes/jwt-inspector.html` | engineering |
| 2 | zh content stub | Hugo markdown | `content/tools/jwt-inspector.md` | content |
| 3 | en content stub | Hugo markdown | `content/tools/jwt-inspector.en.md` | content |
| 4 | `extend_head.html` partial (NOT modified) | Hugo template | `themes/PaperMod/layouts/partials/extend_head.html` | untouched (D15) |
| 5 | OG image 1200×630 | Static asset | `static/og-images/jwt-inspector.png` | content |
| 6 | Tool screenshot 800×600 | Static asset | `static/screenshots/jwt-inspector.png` | content |
| 7 | Reverse internal links in siblings | Markdown edit | `content/tools/{cron-parser,yaml-to-json,markdown-html-converter}.md` §"Related" | content |

### 1.3 Algorithm registry (inlined into the shortcode JS)

```js
const JWT_ALGS = {
  HS256: { type: 'hmac',   hash: 'SHA-256', keyFormat: 'raw',  verifyAlg: 'HMAC',                 sigEncoding: 'raw'     },
  HS384: { type: 'hmac',   hash: 'SHA-384', keyFormat: 'raw',  verifyAlg: 'HMAC',                 sigEncoding: 'raw'     },
  HS512: { type: 'hmac',   hash: 'SHA-512', keyFormat: 'raw',  verifyAlg: 'HMAC',                 sigEncoding: 'raw'     },
  RS256: { type: 'rsa',    hash: 'SHA-256', keyFormat: 'spki', verifyAlg: 'RSASSA-PKCS1-v1_5',     sigEncoding: 'raw'     },
  RS384: { type: 'rsa',    hash: 'SHA-384', keyFormat: 'spki', verifyAlg: 'RSASSA-PKCS1-v1_5',     sigEncoding: 'raw'     },
  RS512: { type: 'rsa',    hash: 'SHA-512', keyFormat: 'spki', verifyAlg: 'RSASSA-PKCS1-v1_5',     sigEncoding: 'raw'     },
  PS256: { type: 'rsa',    hash: 'SHA-256', keyFormat: 'spki', verifyAlg: 'RSA-PSS',               sigEncoding: 'raw'     },
  ES256: { type: 'ec',     hash: 'SHA-256', keyFormat: 'spki', verifyAlg: 'ECDSA', curve: 'P-256', sigEncoding: 'der-or-p1363' },
  ES384: { type: 'ec',     hash: 'SHA-384', keyFormat: 'spki', verifyAlg: 'ECDSA', curve: 'P-384', sigEncoding: 'der-or-p1363' },
  ES512: { type: 'ec',     hash: 'SHA-512', keyFormat: 'spki', verifyAlg: 'ECDSA', curve: 'P-521', sigEncoding: 'der-or-p1363' }
};
// v1.0.0 implements HS256, RS256, ES256 only (strategy §6.4). Others reserved
// for post-launch §9 item 1.
const JWT_ALGS_V1 = ['HS256', 'RS256', 'ES256'];
```

### 1.4 Sensitive claim blacklist (D9)

```js
const SENSITIVE_CLAIMS = [
  'password', 'passwd', 'pwd',
  'secret', 'client_secret',
  'api_key', 'apikey', 'api-key',
  'token', 'access_token', 'access-token', 'refresh_token', 'refresh-token',
  'credential', 'credentials',
  'private_key', 'privateKey', 'private-key',
  'session', 'session_id', 'session-id', 'sid'
];
```

Blacklist is **case-insensitive** and matched against the full claim name. Substring match (e.g., `user.password_hash`) is NOT masked — only exact name match. Rationale: substring matching would be surprising and could hide legitimate fields like `token_count`. Engineers can extend the blacklist in `JWT_SENSITIVE_OVERRIDES` if their domain needs more names.

### 1.5 Browser compatibility

| Browser | Min version | Notes |
|---|---|---|
| Chrome / Edge | 90+ | Full support |
| Firefox | 90+ | Full support |
| Safari (macOS / iOS) | 14+ | `crypto.subtle`, `TextEncoder`, `Intl.DateTimeFormat` all available |
| Mobile browsers | iOS 14+, Android Chrome 90+ | Responsive layout tested at 360px width |

**Hard requirement: HTTPS or `localhost`.** `crypto.subtle` is unavailable over `http://` (mixed content) and `file://`. The tool detects insecure context on init and shows a yellow warning banner: "JWT Inspector requires HTTPS (or localhost) for cryptographic operations. Decode-only mode is active."

---

## §2. Hugo Shortcode Spec

### 2.1 File: `layouts/shortcodes/jwt-inspector.html`

**Wrapper:** `<div class="jwt" id="jwt-tool" data-jwt-root data-jwt-lang="{{ $lang }}">` (mirrors cron-parser pattern).

**Structure (top-to-bottom render order):**

```
<div class="jwt" id="jwt-tool" data-jwt-root data-jwt-lang="en">
  <style>… CSS (~280 lines) …</style>

  <!-- ① Insecure-context warning (hidden by default; shown if !window.isSecureContext) -->
  <div class="jwt-card jwt-warn-card" data-jwt-insecure hidden>
    <strong>HTTPS required</strong> — cryptographic operations are disabled.
    Decode-only mode is active.
  </div>

  <!-- ② Token input card -->
  <div class="jwt-card jwt-input-card">
    <label for="jwt-token-input" class="jwt-label">JWT or Bearer header</label>
    <textarea id="jwt-token-input" class="jwt-textarea"
              placeholder="eyJhbGciOi… or full 'Authorization: Bearer eyJ…' header"
              spellcheck="false" autocomplete="off" rows="3"></textarea>
    <div class="jwt-input-actions">
      <button class="jwt-btn" data-jwt-action="sample">Load sample</button>
      <button class="jwt-btn" data-jwt-action="clear">Clear</button>
      <span class="jwt-input-hint" data-jwt-input-hint>Paste a JWT or a full Authorization header.</span>
    </div>
    <div class="jwt-error" data-jwt-input-error hidden></div>
  </div>

  <!-- ③ Decoded header + payload (hidden until token parses) -->
  <div data-jwt-decoded hidden>
    <div class="jwt-grid">
      <div class="jwt-card jwt-header-card">
        <div class="jwt-section-title">Decoded Header</div>
        <pre class="jwt-json" data-jwt-header-json></pre>
        <div class="jwt-section-sub">Signature (raw bytes)</div>
        <pre class="jwt-bytes" data-jwt-signature-bytes></pre>
      </div>
      <div class="jwt-card jwt-payload-card">
        <div class="jwt-section-title">Decoded Payload</div>
        <pre class="jwt-json" data-jwt-payload-json></pre>
        <div class="jwt-claims-actions">
          <button class="jwt-btn" data-jwt-action="enable-tamper" hidden>Enable tamper mode</button>
          <button class="jwt-btn" data-jwt-action="compare-algs" hidden>Compare with other algorithms</button>
        </div>
      </div>
    </div>

    <!-- ④ RFC 7519 registered-claim table -->
    <div class="jwt-card jwt-claims-card">
      <div class="jwt-section-title">RFC 7519 Registered Claims</div>
      <table class="jwt-claims-table">
        <thead><tr><th>Claim</th><th>Value</th><th>Status</th></tr></thead>
        <tbody data-jwt-claims-tbody></tbody>
      </table>
    </div>

    <!-- ⑤ Signature verification panel -->
    <div class="jwt-card jwt-verify-card">
      <div class="jwt-section-title">Signature Verification</div>
      <div class="jwt-verify-row">
        <label>Algorithm
          <select class="jwt-select" data-jwt-alg-select>
            <option value="HS256">HS256 (HMAC-SHA-256, symmetric)</option>
            <option value="RS256">RS256 (RSASSA-PKCS1-v1_5 + SHA-256, asymmetric)</option>
            <option value="ES256">ES256 (ECDSA P-256 + SHA-256, asymmetric)</option>
          </select>
        </label>
      </div>
      <div class="jwt-verify-row" data-jwt-secret-row>
        <label for="jwt-secret-input">Secret (HMAC, stays in browser memory)</label>
        <div class="jwt-secret-wrap">
          <input id="jwt-secret-input" type="password" class="jwt-input"
                 autocomplete="off" spellcheck="false" placeholder="shared secret">
          <button class="jwt-btn-small" data-jwt-action="toggle-secret" type="button">show</button>
        </div>
      </div>
      <div class="jwt-verify-row" data-jwt-pubkey-row hidden>
        <label for="jwt-pubkey-input">Public Key (SPKI PEM)</label>
        <textarea id="jwt-pubkey-input" class="jwt-textarea jwt-textarea-small"
                  spellcheck="false" autocomplete="off" rows="5"
                  placeholder="-----BEGIN PUBLIC KEY-----&#10;…base64…&#10;-----END PUBLIC KEY-----"></textarea>
      </div>
      <div class="jwt-verify-actions">
        <button class="jwt-btn-primary" data-jwt-action="verify">Verify</button>
        <span class="jwt-verify-result" data-jwt-verify-result></span>
      </div>
    </div>

    <!-- ⑥ Algorithm confusion / security panel -->
    <div class="jwt-card jwt-security-card">
      <div class="jwt-section-title">Security Checks</div>
      <ul class="jwt-checks" data-jwt-checks></ul>
      <div class="jwt-security-actions">
        <button class="jwt-btn" data-jwt-action="test-confusion" hidden>
          Test HS256/RS256 algorithm confusion (paste a public key above first)
        </button>
      </div>
    </div>

    <!-- ⑦ Tamper mode (gated behind confirmation per D11) -->
    <div class="jwt-card jwt-tamper-card" data-jwt-tamper hidden>
      <div class="jwt-warn-banner">⚠ FOR DEBUGGING / RED TEAM USE ONLY</div>
      <div class="jwt-section-title">Claim Tampering (HS256 only)</div>
      <div class="jwt-tamper-editor" data-jwt-tamper-editor></div>
      <div class="jwt-tamper-actions">
        <button class="jwt-btn-primary" data-jwt-action="resign">Re-sign & generate new JWT</button>
        <button class="jwt-btn" data-jwt-action="copy-tampered">Copy tampered JWT</button>
      </div>
      <pre class="jwt-tampered-output" data-jwt-tampered-output hidden></pre>
    </div>

    <!-- ⑧ Multi-algorithm parallel verify (shown when ≥2 keys supplied, D12) -->
    <div class="jwt-card jwt-compare-card" data-jwt-compare hidden>
      <div class="jwt-section-title">Multi-Algorithm Comparison</div>
      <div data-jwt-compare-results></div>
    </div>

    <!-- ⑨ JWKS kid lookup (opt-in, D13) -->
    <div class="jwt-card jwt-jwks-card">
      <div class="jwt-section-title">JWKS Endpoint (opt-in)</div>
      <div class="jwt-jwks-row">
        <label for="jwt-jwks-url">JWKS URL</label>
        <input id="jwt-jwks-url" class="jwt-input"
               placeholder="https://auth.example.com/.well-known/jwks.json">
        <button class="jwt-btn" data-jwt-action="fetch-jwks">Fetch</button>
      </div>
      <div class="jwt-jwks-row" data-jwt-jwks-kid-row hidden>
        <label for="jwt-jwks-kid">Key ID (kid)</label>
        <select id="jwt-jwks-kid" class="jwt-select" data-jwt-jwks-kid></select>
        <button class="jwt-btn" data-jwt-action="use-jwks-key">Use this key</button>
      </div>
      <div class="jwt-jwks-status" data-jwt-jwks-status></div>
    </div>
  </div>

  <script>… JS (~650 lines) …</script>
</div>
```

### 2.2 CSS (inline, ~280 lines)

**Namespace:** all selectors scoped under `#jwt-tool` (mirrors cron-parser's `.crp` scoping). Custom properties use `--jwt-*` prefix. JS hooks use `data-jwt-*`.

**Tokens (`:root` inside `#jwt-tool`):**

```css
#jwt-tool {
  --jwt-bg:        #ffffff;
  --jwt-fg:        #0f172a;
  --jwt-muted:     #64748b;
  --jwt-border:    #e2e8f0;
  --jwt-card-bg:   #ffffff;
  --jwt-primary:   #2563eb;
  --jwt-primary-fg:#ffffff;
  --jwt-ok:        #15803d;       /* renamed from hhi "pass" to "ok" */
  --jwt-ok-bg:     #dcfce7;
  --jwt-warn:      #b45309;
  --jwt-warn-bg:   #fef3c7;
  --jwt-fail:      #b91c1c;
  --jwt-fail-bg:   #fee2e2;
  --jwt-mono:      ui-monospace, "SFMono-Regular", "Menlo", "Consolas", monospace;
}
@media (prefers-color-scheme: dark) {
  #jwt-tool {
    --jwt-bg:#0f172a; --jwt-fg:#e2e8f0; --jwt-muted:#94a3b8;
    --jwt-border:#334155; --jwt-card-bg:#1e293b;
    --jwt-ok-bg:#052e16; --jwt-warn-bg:#451a03; --jwt-fail-bg:#450a0a;
  }
}
/* PaperMod .dark compatibility (PaperMod toggles .dark on <html>) */
html.dark #jwt-tool {
  --jwt-bg:#0f172a; --jwt-fg:#e2e8f0; --jwt-muted:#94a3b8;
  --jwt-border:#334155; --jwt-card-bg:#1e293b;
  --jwt-ok-bg:#052e16; --jwt-warn-bg:#451a03; --jwt-fail-bg:#450a0a;
}
```

**Key class definitions:**

```css
#jwt-tool { max-width: 920px; margin: 24px auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; color: var(--jwt-fg); }
#jwt-tool .jwt-card { background: var(--jwt-card-bg); border: 1px solid var(--jwt-border); border-radius: 12px; padding: 18px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
#jwt-tool .jwt-label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 14px; color: var(--jwt-fg); }
#jwt-tool .jwt-textarea { width: 100%; padding: 10px 12px; border: 1px solid var(--jwt-border); border-radius: 8px; font-size: 14px; font-family: var(--jwt-mono); background: var(--jwt-bg); color: var(--jwt-fg); resize: vertical; min-height: 64px; }
#jwt-tool .jwt-textarea-small { min-height: 110px; font-size: 12px; }
#jwt-tool .jwt-input { width: 100%; padding: 10px 12px; border: 1px solid var(--jwt-border); border-radius: 8px; font-size: 14px; font-family: var(--jwt-mono); background: var(--jwt-bg); color: var(--jwt-fg); }
#jwt-tool .jwt-select { padding: 10px 12px; border: 1px solid var(--jwt-border); border-radius: 8px; font-size: 14px; background: var(--jwt-bg); color: var(--jwt-fg); }
#jwt-tool .jwt-btn { padding: 8px 14px; background: transparent; color: var(--jwt-fg); border: 1px solid var(--jwt-border); border-radius: 8px; cursor: pointer; font-size: 13px; }
#jwt-tool .jwt-btn:hover { background: var(--jwt-border); }
#jwt-tool .jwt-btn-primary { padding: 10px 18px; background: var(--jwt-primary); color: var(--jwt-primary-fg); border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
#jwt-tool .jwt-btn-primary:hover:not(:disabled) { background: #1d4ed8; }
#jwt-tool .jwt-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
#jwt-tool .jwt-btn-small { padding: 6px 10px; background: transparent; color: var(--jwt-muted); border: 1px solid var(--jwt-border); border-radius: 6px; cursor: pointer; font-size: 12px; }
#jwt-tool .jwt-section-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; }
#jwt-tool .jwt-section-sub { font-size: 12px; color: var(--jwt-muted); margin-top: 10px; margin-bottom: 4px; }
#jwt-tool .jwt-error { margin-top: 12px; padding: 10px 12px; background: var(--jwt-fail-bg); color: var(--jwt-fail); border-radius: 8px; font-size: 13px; }
#jwt-tool .jwt-warn-card { background: var(--jwt-warn-bg); border-color: #fbbf24; color: var(--jwt-warn); }
#jwt-tool .jwt-warn-banner { background: var(--jwt-fail-bg); color: var(--jwt-fail); padding: 10px 12px; border-radius: 8px; font-weight: 700; margin-bottom: 12px; font-size: 13px; }
#jwt-tool .jwt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 768px) { #jwt-tool .jwt-grid { grid-template-columns: 1fr; } }
#jwt-tool .jwt-json { background: var(--jwt-bg); border: 1px solid var(--jwt-border); border-radius: 6px; padding: 10px; font-family: var(--jwt-mono); font-size: 12.5px; overflow-x: auto; margin: 0; white-space: pre-wrap; word-break: break-word; max-height: 320px; overflow-y: auto; }
#jwt-tool .jwt-bytes { font-family: var(--jwt-mono); font-size: 11px; color: var(--jwt-muted); background: var(--jwt-bg); padding: 6px 8px; border-radius: 4px; margin: 0; word-break: break-all; }
#jwt-tool .jwt-input-actions { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
#jwt-tool .jwt-input-hint { font-size: 12px; color: var(--jwt-muted); margin-left: auto; }
#jwt-tool .jwt-claims-table { width: 100%; border-collapse: collapse; font-size: 13px; }
#jwt-tool .jwt-claims-table th, #jwt-tool .jwt-claims-table td { padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--jwt-border); }
#jwt-tool .jwt-claims-table th { font-weight: 600; color: var(--jwt-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
#jwt-tool .jwt-claims-table td.jwt-claim-name { font-family: var(--jwt-mono); font-weight: 600; width: 110px; }
#jwt-tool .jwt-claims-table td.jwt-claim-value { font-family: var(--jwt-mono); word-break: break-word; }
#jwt-tool .jwt-claims-table td.jwt-claim-status { width: 140px; }
#jwt-tool .jwt-claim-masked { color: var(--jwt-muted); font-style: italic; }
#jwt-tool .jwt-claim-reveal { background: transparent; border: 1px solid var(--jwt-border); border-radius: 4px; padding: 2px 6px; font-size: 11px; cursor: pointer; color: var(--jwt-muted); margin-left: 6px; }
#jwt-tool .jwt-claim-reveal:hover { background: var(--jwt-border); }
#jwt-tool .jwt-status-ok { color: var(--jwt-ok); }
#jwt-tool .jwt-status-warn { color: var(--jwt-warn); }
#jwt-tool .jwt-status-fail { color: var(--jwt-fail); }
#jwt-tool .jwt-verify-row { margin-bottom: 12px; }
#jwt-tool .jwt-verify-row label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 13px; }
#jwt-tool .jwt-secret-wrap { display: flex; gap: 6px; }
#jwt-tool .jwt-secret-wrap .jwt-input { flex: 1; }
#jwt-tool .jwt-verify-actions { display: flex; align-items: center; gap: 12px; margin-top: 12px; }
#jwt-tool .jwt-verify-result { font-family: var(--jwt-mono); font-size: 13px; }
#jwt-tool .jwt-checks { list-style: none; padding: 0; margin: 0; }
#jwt-tool .jwt-checks li { padding: 8px 0; border-bottom: 1px solid var(--jwt-border); font-size: 13px; }
#jwt-tool .jwt-checks li:last-child { border-bottom: none; }
#jwt-tool .jwt-check-icon { display: inline-block; width: 18px; font-weight: 700; }
#jwt-tool .jwt-tamper-editor { background: var(--jwt-bg); border: 1px solid var(--jwt-border); border-radius: 8px; padding: 12px; margin-bottom: 12px; font-family: var(--jwt-mono); font-size: 12.5px; }
#jwt-tool .jwt-tamper-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
#jwt-tool .jwt-tamper-row .jwt-tamper-key { font-weight: 700; min-width: 120px; }
#jwt-tool .jwt-tamper-row .jwt-tamper-input { flex: 1; padding: 6px 8px; border: 1px solid var(--jwt-border); border-radius: 4px; font-family: var(--jwt-mono); font-size: 12.5px; background: var(--jwt-bg); color: var(--jwt-fg); }
#jwt-tool .jwt-tampered-output { background: var(--jwt-bg); border: 1px solid var(--jwt-ok); border-radius: 8px; padding: 12px; font-family: var(--jwt-mono); font-size: 12px; word-break: break-all; max-height: 180px; overflow-y: auto; margin: 0; }
#jwt-tool .jwt-jwks-row { display: flex; gap: 8px; align-items: end; margin-bottom: 10px; }
#jwt-tool .jwt-jwks-row label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 13px; }
#jwt-tool .jwt-jwks-row .jwt-input { flex: 1; }
#jwt-tool .jwt-jwks-status { font-size: 12px; color: var(--jwt-muted); margin-top: 6px; }
#jwt-tool .jwt-banner-attack { background: var(--jwt-fail-bg); color: var(--jwt-fail); padding: 10px 12px; border-radius: 8px; margin-bottom: 12px; font-weight: 600; font-size: 13px; }
```

### 2.3 JS (inline IIFE, ~650 lines)

**Wrapper (mirrors cron-parser preamble):**

```js
<script>
(function () {
  'use strict';

  /* ============================================================
   * JWT Inspector — pure client-side IIFE
   *
   * No fetch (except user-initiated JWKS), no XHR, no CDN.
   * All crypto via crypto.subtle. All parsing in-browser.
   * ============================================================ */

  /* ---------- Constants ---------- */
  var JWT_ALGS = { /* … see §1.3 … */ };
  var JWT_ALGS_V1 = ['HS256', 'RS256', 'ES256'];
  var SENSITIVE_CLAIMS = [ /* … see §1.4 … */ ];
  var RFC7519_CLAIMS = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'];
  var I18N = { en: { … }, zh: { … } };

  /* ---------- DOM helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- base64url codec ---------- */
  function b64urlDecode(str) {
    var pad = str.length % 4 === 2 ? '==' : (str.length % 4 === 3 ? '=' : '');
    var b64 = str.replace(/-/g, '+').replace(/_/g, '/') + pad;
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function b64urlEncode(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
  function b64urlDecodeJson(str) {
    var bytes = b64urlDecode(str);
    return JSON.parse(new TextDecoder('utf-8').decode(bytes));
  }

  /* ---------- PEM → DER ---------- */
  function pemToDer(pem) {
    var b64 = pem.replace(/-----BEGIN [^-]+-----/g, '')
                 .replace(/-----END [^-]+-----/g, '')
                 .replace(/\s+/g, '');
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  /* ---------- P1363 ↔ DER (for ES256, §4.2) ---------- */
  function p1363ToDer(p1363, curveBytes) {
    curveBytes = curveBytes || 32;
    if (p1363.length !== curveBytes * 2) {
      throw new Error('P1363 signature length mismatch: expected ' + (curveBytes * 2) + ' got ' + p1363.length);
    }
    var r = p1363.slice(0, curveBytes);
    var s = p1363.slice(curveBytes, curveBytes * 2);
    // Strip leading zero padding for ASN.1 INTEGER
    function trim(buf) {
      var i = 0;
      while (i < buf.length - 1 && buf[i] === 0) i++;
      var sub = buf.slice(i);
      if (sub[0] & 0x80) { var p = new Uint8Array(sub.length + 1); p[0] = 0; p.set(sub, 1); return p; }
      return sub;
    }
    var rTrim = trim(r);
    var sTrim = trim(s);
    var seqLen = rTrim.length + sTrim.length + 4;
    var der = new Uint8Array(seqLen + 2);
    var o = 0;
    der[o++] = 0x30;
    der[o++] = 0x82; /* length-of-length marker (2 bytes) */
    der[o++] = (seqLen >> 8) & 0xff;
    der[o++] = seqLen & 0xff;
    der[o++] = 0x02;
    der[o++] = rTrim.length;
    der.set(rTrim, o); o += rTrim.length;
    der[o++] = 0x02;
    der[o++] = sTrim.length;
    der.set(sTrim, o);
    return der;
  }
  function derToP1363(der, curveBytes) {
    curveBytes = curveBytes || 32;
    if (der[0] !== 0x30) throw new Error('Not a DER SEQUENCE');
    // Skip tag + length (handle 0x30 0x82 … or 0x30 0xNN)
    var o = 1;
    if (der[o] & 0x80) o += 1 + (der[o] & 0x7f);
    else o += 1;
    if (der[o++] !== 0x02) throw new Error('Expected INTEGER r');
    var rLen = der[o++];
    var r = der.slice(o, o + rLen); o += rLen;
    if (der[o++] !== 0x02) throw new Error('Expected INTEGER s');
    var sLen = der[o++];
    var s = der.slice(o, o + sLen);
    // Left-pad to curveBytes
    function pad(buf, len) {
      if (buf.length === len) return buf;
      var p = new Uint8Array(len);
      p.set(buf, len - buf.length);
      return p;
    }
    return new Uint8Array([].concat(Array.from(pad(r, curveBytes)), Array.from(pad(s, curveBytes))));
  }

  /* ---------- Token parser ---------- */
  function parseToken(input) {
    var raw = extractJwt(input);
    if (!raw) return { error: 'Could not find a JWT in the input.' };
    var parts = raw.split('.');
    if (parts.length !== 3) return { error: 'JWT must have exactly 3 segments.' };
    try {
      var header = b64urlDecodeJson(parts[0]);
      var payload = b64urlDecodeJson(parts[1]);
      var sigBytes = b64urlDecode(parts[2]);
      return { raw: raw, header: header, payload: payload, signature: sigBytes,
               parts: { h: parts[0], p: parts[1], s: parts[2] } };
    } catch (e) {
      return { error: 'Failed to decode: ' + e.message };
    }
  }
  function extractJwt(input) {
    if (!input) return null;
    var s = String(input).trim();
    // 1. bare token
    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(s)) return s;
    // 2. Authorization header (Bearer / bearer / BEARER)
    var m = s.match(/(?:Bearer|bearer|BEARER)\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/);
    if (m) return m[1];
    // 3. any embedded 3-segment base64url
    m = s.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
    return m ? m[0] : null;
  }

  /* ---------- RFC 7519 claim validators ---------- */
  function validateClaims(payload) {
    var out = [];
    for (var i = 0; i < RFC7519_CLAIMS.length; i++) {
      var name = RFC7519_CLAIMS[i];
      var present = Object.prototype.hasOwnProperty.call(payload, name);
      if (!present) continue;
      var value = payload[name];
      var status = 'ok';
      var detail = '';
      if (name === 'exp' || name === 'nbf' || name === 'iat') {
        if (typeof value !== 'number') { status = 'fail'; detail = 'must be a number (Unix seconds)'; }
        else if (name === 'exp') {
          var now = Math.floor(Date.now() / 1000);
          status = (value > now) ? 'ok' : 'fail';
          detail = (value > now) ? ('expires in ' + humanDuration(value - now)) : ('expired ' + humanDuration(now - value) + ' ago');
        } else if (name === 'nbf') {
          var now2 = Math.floor(Date.now() / 1000);
          status = (value <= now2) ? 'ok' : 'fail';
          detail = (value <= now2) ? ('valid since ' + humanDuration(now2 - value)) : ('not valid for ' + humanDuration(value - now2));
        } else if (name === 'iat') {
          var now3 = Math.floor(Date.now() / 1000);
          var age = now3 - value;
          status = (age >= -60) ? 'ok' : 'warn';  /* future iat = clock skew, warn */
          detail = (age >= 0) ? ('issued ' + humanDuration(age) + ' ago') : ('issued in ' + humanDuration(-age) + ' (future)');
        }
      } else if (name === 'aud') {
        status = 'ok'; detail = 'present';
      } else {
        status = 'ok'; detail = 'present';
      }
      out.push({ name: name, value: value, status: status, detail: detail });
    }
    return out;
  }
  function humanDuration(sec) {
    if (sec < 60) return sec + 's';
    if (sec < 3600) return Math.floor(sec / 60) + 'm ' + (sec % 60) + 's';
    if (sec < 86400) return Math.floor(sec / 3600) + 'h ' + Math.floor((sec % 3600) / 60) + 'm';
    var d = Math.floor(sec / 86400);
    var h = Math.floor((sec % 86400) / 3600);
    return d + 'd ' + h + 'h';
  }

  /* ---------- Sensitive claim masking ---------- */
  function isSensitive(name) {
    var n = String(name).toLowerCase();
    for (var i = 0; i < SENSITIVE_CLAIMS.length; i++) {
      if (n === SENSITIVE_CLAIMS[i].toLowerCase()) return true;
    }
    return false;
  }

  /* ---------- Verifier: HS256 / RS256 / ES256 ---------- */
  async function verifyHS256(parsed, secret) {
    if (!secret) throw new Error('HS256 requires a secret');
    var data = new TextEncoder().encode(parsed.parts.h + '.' + parsed.parts.p);
    var key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    return await crypto.subtle.verify({ name: 'HMAC' }, key, parsed.signature, data);
  }
  async function verifyRS256(parsed, publicKeyPem) {
    if (!publicKeyPem) throw new Error('RS256 requires an SPKI public key');
    var spkiDer = pemToDer(publicKeyPem);
    var data = new TextEncoder().encode(parsed.parts.h + '.' + parsed.parts.p);
    var key = await crypto.subtle.importKey(
      'spki', spkiDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
    );
    return await crypto.subtle.verify({ name: 'RSASSA-PKCS1-v1_5' }, key, parsed.signature, data);
  }
  async function verifyES256(parsed, publicKeyPem) {
    if (!publicKeyPem) throw new Error('ES256 requires an SPKI public key');
    var spkiDer = pemToDer(publicKeyPem);
    var data = new TextEncoder().encode(parsed.parts.h + '.' + parsed.parts.p);
    var key = await crypto.subtle.importKey(
      'spki', spkiDer,
      { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']
    );
    /* Auto-detect: WebCrypto native verify accepts only DER; some libs emit
       raw P1363 (R||S) concatenation. Detect by ASN.1 SEQUENCE tag (0x30)
       as the first byte. */
    var sigInput = parsed.signature[0] === 0x30
      ? parsed.signature
      : p1363ToDer(parsed.signature, 32);
    return await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, sigInput, data);
  }

  /* ---------- Algorithm confusion attack simulator (D10.B) ---------- */
  async function testConfusion(parsed, publicKeyPem) {
    if (!publicKeyPem) throw new Error('Test requires an SPKI public key');
    /* HS256 with public-key-bytes as HMAC secret — mirrors the canonical
       algorithm-confusion attack vector */
    var pubKeyBytes = pemToDer(publicKeyPem);
    var pubKeyStr = b64urlEncode(pubKeyBytes);
    return await verifyHS256(parsed, pubKeyStr);
  }

  /* ---------- Re-signer (tamper mode, D11) ---------- */
  async function resignHS256(parsed, modifiedPayload, secret) {
    if (!secret) throw new Error('Re-sign requires a secret');
    var newPayloadB64 = (function () {
      var bytes = new TextEncoder().encode(JSON.stringify(modifiedPayload));
      return b64urlEncode(bytes);
    })();
    var data = new TextEncoder().encode(parsed.parts.h + '.' + newPayloadB64);
    var key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    var sigBuffer = await crypto.subtle.sign('HMAC', key, data);
    var sigB64 = b64urlEncode(new Uint8Array(sigBuffer));
    return parsed.parts.h + '.' + newPayloadB64 + '.' + sigB64;
  }

  /* ---------- JWKS fetcher (D13) ---------- */
  async function fetchJwks(url) {
    if (!/^https?:\/\//i.test(url)) throw new Error('JWKS URL must be http(s)');
    var resp = await fetch(url, { credentials: 'omit', cache: 'no-store' });
    if (!resp.ok) throw new Error('JWKS fetch failed: HTTP ' + resp.status);
    var json = await resp.json();
    if (!json || !Array.isArray(json.keys)) throw new Error('JWKS response missing "keys" array');
    return json.keys;
  }
  function pickJwksKey(keys, kid) {
    if (!kid) return keys[0];
    for (var i = 0; i < keys.length; i++) if (keys[i].kid === kid) return keys[i];
    return null;
  }
  function jwkToPem(jwk) {
    /* Build a minimal SPKI PEM from a JWK (kty=RSA or kty=EC, n/e or x/y).
       Engineering agent can use a compact hand-rolled ASN.1 builder or
       delegate to a sub-utility. For v1.0.0 the JWKS path is OPT-IN and
       documented as "advanced"; engineering can stub this with a clear
       "JWKS-to-PEM conversion not implemented in v1.0.0 — please paste the
       PEM directly" message if the helper is large. */
    throw new Error('JWKS-to-PEM helper: see §4.5');
  }

  /* ---------- Module state ---------- */
  var state = {
    parsed: null,
    tamperUnlocked: false,
    jwksCache: null,
    tickerHandle: null
  };

  /* ---------- Render: header / payload JSON with sensitive masking ---------- */
  function renderJsonCard(el, obj) {
    var masked = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (isSensitive(k)) masked[k] = '__MASKED__';
      else masked[k] = obj[k];
    }
    el.textContent = JSON.stringify(masked, null, 2);
  }
  function renderClaimsTable(tbody, claims) {
    var html = '';
    for (var i = 0; i < claims.length; i++) {
      var c = claims[i];
      var valHtml;
      if (isSensitive(c.name)) {
        valHtml = '<span class="jwt-claim-masked">••••••••</span>'
                + '<button class="jwt-claim-reveal" data-jwt-reveal="' + escapeHtml(c.name) + '">reveal</button>';
      } else if (typeof c.value === 'number') {
        valHtml = '<span>' + c.value + '</span> <span style="color:var(--jwt-muted);font-size:11px;">(' + humanDuration(Math.abs(Math.floor(Date.now() / 1000) - c.value)) + ')</span>';
      } else {
        valHtml = '<span>' + escapeHtml(String(c.value)) + '</span>';
      }
      html += '<tr data-jwt-claim="' + escapeHtml(c.name) + '">'
            + '<td class="jwt-claim-name">' + escapeHtml(c.name) + '</td>'
            + '<td class="jwt-claim-value">' + valHtml + '</td>'
            + '<td class="jwt-claim-status jwt-status-' + c.status + '">'
            + (c.detail ? escapeHtml(c.detail) : c.status)
            + '</td></tr>';
    }
    tbody.innerHTML = html;
  }
  function renderSecurityChecks(ul, parsed) {
    var html = '';
    var alg = String(parsed.header.alg || '');
    if (alg === 'none' || alg === 'None' || alg === 'NONE' || alg === 'NUL') {
      html += '<li><span class="jwt-check-icon jwt-status-fail">⚠</span> '
            + '<strong>alg=none detected</strong> — CVE-2015-9235: this token has no signature. '
            + 'Servers that accept this without an allow-list are vulnerable to forgery. '
            + '<a href="https://nvd.nist.gov/vuln/detail/CVE-2015-9235" target="_blank" rel="noopener">CVE-2015-9235</a>'
            + '</li>';
    } else if (alg === 'HS256' || alg === 'HS384' || alg === 'HS512') {
      html += '<li><span class="jwt-check-icon jwt-status-warn">⚠</span> '
            + '<strong>Symmetric algorithm (' + escapeHtml(alg) + ')</strong> — '
            + 'the secret is the only thing protecting this token. Ensure the secret is high-entropy '
            + 'and never leaks (e.g., to a public-key byte-array, which would enable HS/RS confusion attacks).'
            + '</li>';
    } else if (alg === 'RS256' || alg === 'RS384' || alg === 'RS512'
            || alg === 'ES256' || alg === 'ES384' || alg === 'ES512'
            || alg === 'PS256' || alg === 'PS384' || alg === 'PS512') {
      html += '<li><span class="jwt-check-icon jwt-status-ok">✓</span> '
            + '<strong>Asymmetric algorithm (' + escapeHtml(alg) + ')</strong> — '
            + 'verify with the issuer\'s public key. Beware of HS/RS confusion attacks: '
            + 'do not also verify HS256 with the same public-key bytes.'
            + '</li>';
    } else {
      html += '<li><span class="jwt-check-icon jwt-status-warn">⚠</span> '
            + '<strong>Unknown algorithm (' + escapeHtml(alg) + ')</strong> — '
            + 'this tool supports HS256 / RS256 / ES256 in v1.0.0.'
            + '</li>';
    }
    if (parsed.header.kid) {
      html += '<li><span class="jwt-check-icon jwt-status-ok">i</span> '
            + '<strong>kid header present</strong> — ' + escapeHtml(parsed.header.kid)
            + ' — use the JWKS panel to fetch the corresponding public key.'
            + '</li>';
    }
    ul.innerHTML = html;
  }
  function renderAlgSelect(select, parsed) {
    var detected = parsed.header.alg;
    var supported = ['HS256', 'RS256', 'ES256'];
    var html = '';
    for (var i = 0; i < supported.length; i++) {
      var sel = (detected === supported[i]) ? ' selected' : '';
      html += '<option value="' + supported[i] + '"' + sel + '>' + supported[i] + '</option>';
    }
    select.innerHTML = html;
  }

  /* ---------- Tamper editor render ---------- */
  function renderTamperEditor(editor, payload) {
    var html = '';
    var keys = Object.keys(payload);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = payload[k];
      var vStr = (typeof v === 'object') ? JSON.stringify(v) : String(v);
      html += '<div class="jwt-tamper-row">'
            + '<span class="jwt-tamper-key">' + escapeHtml(k) + '</span>'
            + '<input class="jwt-tamper-input" data-jwt-tamper-key="' + escapeHtml(k) + '" value="' + escapeHtml(vStr) + '">'
            + '</div>';
    }
    editor.innerHTML = html;
  }
  function readTamperEditor(editor, origPayload) {
    var inputs = $$('[data-jwt-tamper-key]', editor);
    var out = JSON.parse(JSON.stringify(origPayload));
    for (var i = 0; i < inputs.length; i++) {
      var k = inputs[i].getAttribute('data-jwt-tamper-key');
      var raw = inputs[i].value;
      /* Try to preserve original JSON type for objects/numbers/bools */
      if (typeof origPayload[k] === 'number') {
        var n = Number(raw);
        if (!Number.isNaN(n)) out[k] = n;
        else out[k] = raw;
      } else if (typeof origPayload[k] === 'boolean') {
        out[k] = (raw === 'true');
      } else if (typeof origPayload[k] === 'object' && origPayload[k] !== null) {
        try { out[k] = JSON.parse(raw); } catch (e) { out[k] = raw; }
      } else {
        out[k] = raw;
      }
    }
    return out;
  }

  /* ---------- Countdown ticker (D14) ---------- */
  function startTicker(root, parsed) {
    if (state.tickerHandle) clearInterval(state.tickerHandle);
    function tick() {
      var claims = validateClaims(parsed.payload);
      var expClaim = null, nbfClaim = null;
      for (var i = 0; i < claims.length; i++) {
        if (claims[i].name === 'exp') expClaim = claims[i];
        if (claims[i].name === 'nbf') nbfClaim = claims[i];
      }
      var tbody = $('[data-jwt-claims-tbody]', root);
      if (!tbody) return;
      var rows = $$('[data-jwt-claim]', tbody);
      for (var j = 0; j < rows.length; j++) {
        var name = rows[j].getAttribute('data-jwt-claim');
        var statusCell = rows[j].querySelector('.jwt-claim-status');
        if (name === 'exp' && expClaim) statusCell.textContent = expClaim.detail;
        if (name === 'nbf' && nbfClaim) statusCell.textContent = nbfClaim.detail;
      }
    }
    state.tickerHandle = setInterval(tick, 1000);
  }
  function stopTicker() {
    if (state.tickerHandle) clearInterval(state.tickerHandle);
    state.tickerHandle = null;
  }

  /* ---------- Sample token (RFC 7519 Appendix A.1) ---------- */
  var SAMPLE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  var SAMPLE_SECRET = 'your-256-bit-secret'; /* RFC 7519 Appendix A example secret (not the actual HMAC key) */

  /* ---------- Escape ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- copyToClipboard ---------- */
  function copyToClipboard(text, cb) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(cb, function () { fallbackCopy(text, cb); });
    } else {
      fallbackCopy(text, cb);
    }
  }
  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (e) { /* swallow */ }
    document.body.removeChild(ta);
  }

  /* ---------- i18n ---------- */
  function t(key, lang) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.en[key]) || key;
  }

  /* ---------- init(root) — main controller ---------- */
  function init(root) {
    var lang = root.getAttribute('data-jwt-lang') || 'en';

    /* Insecure-context warning */
    if (!window.isSecureContext) {
      $('[data-jwt-insecure]', root).hidden = false;
    }

    var tokenInput = $('#jwt-token-input', root);
    var decodedWrap = $('[data-jwt-decoded]', root);
    var headerJson = $('[data-jwt-header-json]', root);
    var payloadJson = $('[data-jwt-payload-json]', root);
    var sigBytes = $('[data-jwt-signature-bytes]', root);
    var claimsTbody = $('[data-jwt-claims-tbody]', root);
    var algSelect = $('[data-jwt-alg-select]', root);
    var secretInput = $('#jwt-secret-input', root);
    var pubKeyInput = $('#jwt-pubkey-input', root);
    var secretRow = $('[data-jwt-secret-row]', root);
    var pubKeyRow = $('[data-jwt-pubkey-row]', root);
    var verifyResult = $('[data-jwt-verify-result]', root);
    var checksUl = $('[data-jwt-checks]', root);
    var inputError = $('[data-jwt-input-error]', root);
    var tamperCard = $('[data-jwt-tamper]', root);
    var tamperEditor = $('[data-jwt-tamper-editor]', root);
    var tamperedOutput = $('[data-jwt-tampered-output]', root);
    var compareCard = $('[data-jwt-compare]', root);
    var compareResults = $('[data-jwt-compare-results]', root);
    var confusionBtn = $('[data-jwt-action="test-confusion"]', root);
    var tamperEnableBtn = $('[data-jwt-action="enable-tamper"]', root);
    var compareAlgsBtn = $('[data-jwt-action="compare-algs"]', root);

    /* Auto-decode on input (debounced) */
    var decodeTimer = null;
    function scheduleDecode() {
      if (decodeTimer) clearTimeout(decodeTimer);
      decodeTimer = setTimeout(decodeNow, 150);
    }
    function decodeNow() {
      var raw = tokenInput.value;
      inputError.hidden = true;
      inputError.textContent = '';
      if (!raw.trim()) {
        decodedWrap.hidden = true;
        state.parsed = null;
        stopTicker();
        return;
      }
      var parsed = parseToken(raw);
      if (parsed.error) {
        inputError.hidden = false;
        inputError.textContent = parsed.error;
        decodedWrap.hidden = true;
        state.parsed = null;
        stopTicker();
        return;
      }
      state.parsed = parsed;
      decodedWrap.hidden = false;
      renderJsonCard(headerJson, parsed.header);
      renderJsonCard(payloadJson, parsed.payload);
      sigBytes.textContent = parsed.signature.length === 0
        ? '(empty signature — alg=none)'
        : Array.from(parsed.signature).map(function (b) {
            return (b < 0x10 ? '0' : '') + b.toString(16);
          }).join(' ').match(/.{1,48}/g).join('\n');
      var claims = validateClaims(parsed.payload);
      renderClaimsTable(claimsTbody, claims);
      renderAlgSelect(algSelect, parsed);
      onAlgChange();
      renderSecurityChecks(checksUl, parsed);
      startTicker(root, parsed);
      tamperEnableBtn.hidden = !(parsed.header.alg === 'HS256' || parsed.header.alg === 'HS384' || parsed.header.alg === 'HS512');
    }

    function onAlgChange() {
      var alg = algSelect.value;
      if (alg === 'HS256' || alg === 'HS384' || alg === 'HS512') {
        secretRow.hidden = false;
        pubKeyRow.hidden = true;
      } else {
        secretRow.hidden = true;
        pubKeyRow.hidden = false;
      }
      compareAlgsBtn.hidden = !(secretInput.value || pubKeyInput.value);
      confusionBtn.hidden = !(pubKeyInput.value);
    }
    algSelect.addEventListener('change', onAlgChange);
    secretInput.addEventListener('input', onAlgChange);
    pubKeyInput.addEventListener('input', onAlgChange);

    tokenInput.addEventListener('input', scheduleDecode);

    /* Action: Verify */
    async function doVerify() {
      if (!state.parsed) return;
      var alg = algSelect.value;
      verifyResult.textContent = t('verifying', lang);
      verifyResult.className = 'jwt-verify-result';
      try {
        var ok;
        if (alg === 'HS256') ok = await verifyHS256(state.parsed, secretInput.value);
        else if (alg === 'RS256') ok = await verifyRS256(state.parsed, pubKeyInput.value);
        else if (alg === 'ES256') ok = await verifyES256(state.parsed, pubKeyInput.value);
        else throw new Error('Unsupported algorithm: ' + alg);
        if (ok) {
          verifyResult.textContent = '✓ valid';
          verifyResult.classList.add('jwt-status-ok');
        } else {
          verifyResult.textContent = '✗ invalid (signature does not match)';
          verifyResult.classList.add('jwt-status-fail');
        }
      } catch (e) {
        verifyResult.textContent = '✗ error: ' + e.message;
        verifyResult.classList.add('jwt-status-fail');
      }
    }
    /* Action: Test confusion */
    async function doTestConfusion() {
      if (!state.parsed || !pubKeyInput.value) return;
      try {
        var ok = await testConfusion(state.parsed, pubKeyInput.value);
        var msg = ok
          ? '⚠ VULNERABLE — the public key bytes, when used as HS256 HMAC secret, validate this token. The server is exposed to HS/RS algorithm confusion attacks.'
          : '✓ not vulnerable — HS256 with public-key bytes does NOT validate this token (good).';
        var banner = document.createElement('div');
        banner.className = 'jwt-banner-attack';
        banner.textContent = msg;
        confusionBtn.parentNode.insertBefore(banner, confusionBtn);
        setTimeout(function () { banner.remove(); }, 12000);
      } catch (e) {
        var banner2 = document.createElement('div');
        banner2.className = 'jwt-banner-attack';
        banner2.textContent = '✗ test failed: ' + e.message;
        confusionBtn.parentNode.insertBefore(banner2, confusionBtn);
      }
    }
    /* Action: Enable tamper mode (one-time confirmation per session, D11) */
    function doEnableTamper() {
      if (state.tamperUnlocked) {
        tamperCard.hidden = false;
        return;
      }
      var ok = window.confirm(
        'FOR DEBUGGING / RED TEAM USE ONLY.\n\n' +
        'You are about to enable claim tampering. You can edit any claim in the ' +
        'current JWT and re-sign it with the HS256 secret you provide.\n\n' +
        'Never tamper with tokens you do not own. Unauthorized use may violate ' +
        'computer-misuse laws in your jurisdiction.\n\n' +
        'Proceed?'
      );
      if (!ok) return;
      state.tamperUnlocked = true;
      tamperCard.hidden = false;
      renderTamperEditor(tamperEditor, state.parsed.payload);
    }
    /* Action: Re-sign (tamper) */
    async function doResign() {
      if (!state.parsed || !secretInput.value) {
        alert('Re-sign requires the HS256 secret in the verify panel.');
        return;
      }
      var modified = readTamperEditor(tamperEditor, state.parsed.payload);
      try {
        var newJwt = await resignHS256(state.parsed, modified, secretInput.value);
        tamperedOutput.hidden = false;
        tamperedOutput.textContent = newJwt;
      } catch (e) {
        tamperedOutput.hidden = false;
        tamperedOutput.textContent = 'Error: ' + e.message;
      }
    }
    function doCopyTampered() {
      if (tamperedOutput.textContent) {
        copyToClipboard(tamperedOutput.textContent, function () { /* silent ok */ });
      }
    }
    /* Action: Compare algorithms (D12) */
    async function doCompareAlgs() {
      if (!state.parsed) return;
      compareCard.hidden = false;
      compareResults.textContent = 'Running…';
      var results = [];
      if (secretInput.value) {
        try {
          var ok = await verifyHS256(state.parsed, secretInput.value);
          results.push({ alg: 'HS256', ok: ok });
        } catch (e) { results.push({ alg: 'HS256', error: e.message }); }
      }
      if (pubKeyInput.value) {
        try {
          var ok2 = await verifyRS256(state.parsed, pubKeyInput.value);
          results.push({ alg: 'RS256', ok: ok2 });
        } catch (e) { results.push({ alg: 'RS256', error: e.message }); }
        try {
          var ok3 = await verifyES256(state.parsed, pubKeyInput.value);
          results.push({ alg: 'ES256', ok: ok3 });
        } catch (e) { results.push({ alg: 'ES256', error: e.message }); }
      }
      var html = '<ul class="jwt-checks">';
      for (var i = 0; i < results.length; i++) {
        var r = results[i];
        var status = r.error ? ('✗ error: ' + escapeHtml(r.error)) : (r.ok ? '✓ valid' : '✗ invalid');
        var cls = r.error ? 'jwt-status-warn' : (r.ok ? 'jwt-status-ok' : 'jwt-status-fail');
        html += '<li><span class="jwt-check-icon ' + cls + '">' + (r.ok ? '✓' : '✗') + '</span> '
              + '<strong>' + r.alg + '</strong> ' + status + '</li>';
      }
      html += '</ul>';
      compareResults.innerHTML = html;
    }
    /* Action: Fetch JWKS */
    async function doFetchJwks() {
      var urlInput = $('#jwt-jwks-url', root);
      var statusEl = $('[data-jwt-jwks-status]', root);
      var kidRow = $('[data-jwt-jwks-kid-row]', root);
      var kidSelect = $('[data-jwt-jwks-kid]', root);
      try {
        statusEl.textContent = 'Fetching…';
        var keys = await fetchJwks(urlInput.value);
        state.jwksCache = keys;
        statusEl.textContent = '✓ Fetched ' + keys.length + ' key(s).';
        var html = '';
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          html += '<option value="' + escapeHtml(k.kid || ('key-' + i)) + '">' + escapeHtml(k.kid || ('key-' + i)) + ' (' + escapeHtml(k.kty || '?') + ')</option>';
        }
        kidSelect.innerHTML = html;
        kidRow.hidden = false;
      } catch (e) {
        statusEl.textContent = '✗ ' + e.message;
      }
    }
    /* Action: Use JWKS key */
    function doUseJwksKey() {
      var kidSelect = $('[data-jwt-jwks-kid]', root);
      var kid = kidSelect.value;
      var jwk = pickJwksKey(state.jwksCache, kid);
      if (!jwk) { alert('Key not found: ' + kid); return; }
      try {
        var pem = jwkToPem(jwk); /* see §4.5 */
        pubKeyInput.value = pem;
        algSelect.value = (jwk.kty === 'RSA') ? 'RS256' : 'ES256';
        onAlgChange();
      } catch (e) {
        alert('JWKS → PEM conversion: ' + e.message);
      }
    }

    /* Click delegation */
    root.addEventListener('click', function (e) {
      var target = e.target;
      if (!target) return;
      var act = target.closest && target.closest('[data-jwt-action]');
      if (!act) return;
      var a = act.getAttribute('data-jwt-action');
      if (a === 'sample') { tokenInput.value = SAMPLE_TOKEN; decodeNow(); }
      else if (a === 'clear') { tokenInput.value = ''; decodeNow(); }
      else if (a === 'toggle-secret') {
        var cur = secretInput.getAttribute('type') === 'password' ? 'text' : 'password';
        secretInput.setAttribute('type', cur);
        act.textContent = (cur === 'password') ? 'show' : 'hide';
      }
      else if (a === 'verify') { doVerify(); }
      else if (a === 'test-confusion') { doTestConfusion(); }
      else if (a === 'enable-tamper') { doEnableTamper(); }
      else if (a === 'resign') { doResign(); }
      else if (a === 'copy-tampered') { doCopyTampered(); }
      else if (a === 'compare-algs') { doCompareAlgs(); }
      else if (a === 'fetch-jwks') { doFetchJwks(); }
      else if (a === 'use-jwks-key') { doUseJwksKey(); }
    });

    /* Reveal handlers for masked claims (event delegation) */
    root.addEventListener('click', function (e) {
      var reveal = e.target.closest && e.target.closest('[data-jwt-reveal]');
      if (!reveal) return;
      var name = reveal.getAttribute('data-jwt-reveal');
      var valueCell = reveal.parentNode;
      var cur = valueCell.getAttribute('data-jwt-revealed');
      if (cur === 'true') {
        valueCell.innerHTML = '<span class="jwt-claim-masked">••••••••</span>'
          + '<button class="jwt-claim-reveal" data-jwt-reveal="' + escapeHtml(name) + '">reveal</button>';
      } else {
        var v = state.parsed && state.parsed.payload ? state.parsed.payload[name] : '';
        valueCell.innerHTML = '<span>' + escapeHtml(String(v)) + '</span>'
          + '<button class="jwt-claim-reveal" data-jwt-reveal="' + escapeHtml(name) + '" data-jwt-revealed="true">hide</button>';
      }
    });

    /* Cleanup ticker on page hide */
    window.addEventListener('pagehide', stopTicker);
  }

  /* ---------- Bootstrap ---------- */
  function bootstrap() {
    var roots = document.querySelectorAll('[data-jwt-root]');
    roots.forEach(function (r) { init(r); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
</script>
```

### 2.4 i18n strings (minimal placeholder)

```js
var I18N = {
  en: {
    verifying: 'Verifying…',
    copied: 'Copied!',
    label_token: 'JWT or Bearer header',
    placeholder: 'eyJhbGciOi… or full "Authorization: Bearer eyJ…" header',
    btn_sample: 'Load sample',
    btn_clear: 'Clear',
    btn_verify: 'Verify',
    btn_resign: 'Re-sign & generate new JWT',
    btn_fetch_jwks: 'Fetch',
    insecure_warning: 'JWT Inspector requires HTTPS (or localhost) for cryptographic operations. Decode-only mode is active.'
  },
  zh: {
    verifying: '验证中…',
    copied: '已复制!',
    label_token: 'JWT 或 Bearer 头',
    placeholder: 'eyJhbGciOi… 或完整 "Authorization: Bearer eyJ…" 头',
    btn_sample: '加载示例',
    btn_clear: '清空',
    btn_verify: '验证',
    btn_resign: '重新签名并生成新 JWT',
    btn_fetch_jwks: '获取',
    insecure_warning: 'JWT 检查器需要 HTTPS(或 localhost)才能执行加密操作。当前仅解码模式可用。'
  }
};
```

zh UI strings are progressive — engineering implements the framework; full Chinese copy can be filled in by the content agent in a follow-up edit if needed.

---

## §3. Frontmatter Template (reference)

> **This section is for context only.** The content-plan (`content/posts/jwt-inspector-content-plan.md` §4.1 and §4.2) is the source of truth for frontmatter. Engineering does NOT modify frontmatter — content agent fills the body. Reproduced here for engineering's awareness so the shortcode call works as expected:

### 3.1 `content/tools/jwt-inspector.md` (zh, default language)

```markdown
---
title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
description: "面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer token 自动提取。100% 浏览器端,token 不上传。"
slug: "jwt-inspector"
translationKey: "jwt_inspector"
url: "/tools/jwt-inspector/"
layout: "page"
date: 2026-07-23T00:00:00+08:00
draft: false
og:
  title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
  description: "面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer token 自动提取。100% 浏览器端,token 不上传。"
  image: "/og-images/jwt-inspector.png"
canonical: "https://dlsome.top/tools/jwt-inspector/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "BreadcrumbList"
  - "HowTo"
---

{{< jwt-inspector >}}

### 什么是 JWT 检查器?

[BODY — content agent fills per content-plan §2.2]

(11 个 H2 + 7 个 FAQ — content-plan §3.2 中文翻译)

<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "WebApplication", … }
</script>
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "FAQPage", … 7 Q&A 中文版 … }
</script>
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "BreadcrumbList", … }
</script>
<script type="application/ld+json">
{ "@context": "https://schema.org", "@type": "HowTo", … }
</script>

<meta property="og:type" content="website" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:url" content="https://dlsome.top/tools/jwt-inspector/" />
<meta property="og:image" content="/og-images/jwt-inspector.png" />
<meta property="og:locale" content="zh_CN" />
```

The en version (`jwt-inspector.en.md`) follows the same skeleton with English copy + English URL in canonical/JSON-LD. Engineering **must not modify either** — content agent owns the markdown.

---

## §4. Cryptographic Verification Logic

### 4.1 base64url codec (RFC 4648 §5)

```
input:  ASCII string [A-Za-z0-9_-]
output: Uint8Array (raw bytes)

1. Replace '-' with '+', '_' with '/'
2. Pad with '=' so length is multiple of 4
3. atob() to get binary string
4. Convert each charCode to Uint8Array byte
```

Reverse (encode):
```
1. bytes → binary string via String.fromCharCode
2. btoa() to base64
3. Strip trailing '='
4. Replace '+' with '-', '/' with '_'
```

### 4.2 PEM → DER conversion

```
input:  PEM string with header "-----BEGIN PUBLIC KEY-----" and footer
output: Uint8Array (DER bytes)

1. Strip header/footer lines via regex
2. Strip all whitespace (including newlines)
3. atob() the remaining base64
4. Convert to Uint8Array
```

The result is fed directly to `crypto.subtle.importKey('spki', der, …)`. This works for both RSA and EC public keys as long as the input is **SPKI-formatted** (starts with `BEGIN PUBLIC KEY`, not `BEGIN RSA PUBLIC KEY` which is PKCS#1).

### 4.3 ECDSA signature encoding: P1363 ↔ DER (the gotcha)

JWS (RFC 7515) uses fixed-length raw concatenation: **`r || s`** — for P-256, that's 32+32 = 64 bytes. Some libraries (e.g., older versions of `jsonwebtoken` for Node, `jose` for Python with default settings) emit ASN.1 DER instead, which is variable-length: `0x30 LLLL 0x02 LL r_bytes 0x02 LL s_bytes`.

WebCrypto's `crypto.subtle.verify('ECDSA', key, signature, data)` accepts **DER only**. So the shortcode must:

1. Check first byte of signature — `0x30` means already DER; anything else → assume P1363.
2. If P1363: convert to DER using `p1363ToDer()` (§2.3).
3. If DER: pass through as-is.
4. If conversion fails or length is wrong: surface a clear error to the user ("signature length mismatch — expected 64 bytes for ES256 P-256").

**Reverse (for completeness, though signing is not exposed in the UI):** DER → P1363 via `derToP1363()`. Used when displaying signatures in the raw bytes panel.

### 4.4 Algorithm confusion attack simulator (D10.B)

The canonical algorithm-confusion attack against RS256 misconfigurations:

```
attacker.publicKey = server's published RS256 public key (PEM bytes)
attacker.token = HS256(header, payload, secret=publicKeyBytes)
victim.server.verify(token) using publicKeyBytes as HMAC secret → ✓ passes
```

The tool simulates this defensively (D10.B):

```js
async function testConfusion(parsed, publicKeyPem) {
  var pubKeyBytes = pemToDer(publicKeyPem);
  var pubKeyStr = b64urlEncode(pubKeyBytes);
  return await verifyHS256(parsed, pubKeyStr);
}
```

If `testConfusion()` returns `true`, the user sees a red banner: "VULNERABLE — the public key bytes, when used as HS256 HMAC secret, validate this token. The server is exposed to HS/RS algorithm confusion attacks." The fix is the same as in strategy §3.2 Q5: enforce an explicit algorithm allow-list on the server.

### 4.5 JWKS → PEM helper (sub-task)

Converting a JWK to an SPKI PEM is non-trivial — for RSA you need an ASN.1 SubjectPublicKeyInfo wrapper around the `n`/`e` modulus/exponent; for EC you need the `x`/`y` coordinates wrapped in the EC OID.

For v1.0.0, engineering has two options:
- **Option A (recommended):** Implement a minimal JWK → PEM helper inline (~80 lines for RSA + ~120 lines for EC). Tests: known test vectors from RFC 7517 §4 and Auth0's public demo JWKS (`https://.auth0.com/.well-known/jwks.json`).
- **Option B (deferred):** Leave `jwkToPem()` throwing `Error('JWKS → PEM conversion: see §4.5')`. The "Use this key" button shows the error. Document as a v1.1 enhancement.

**Decision (D13 follow-up):** Implement **Option A**. The JWKS flow is opt-in but if it's broken, the JWKS panel becomes dead UI. Engineering implements both RSA (modulus → SPKI via `RSAPublicKey` ASN.1 wrapper) and EC (uncompressed point `0x04 || x || y` via `SubjectPublicKeyInfo` wrapper with EC OID).

**ASN.1 builders needed:**
- `Integer(n)` — ASN.1 INTEGER (used by RSA `n` and `e`)
- `BitString(buf)` — ASN.1 BIT STRING (used for the public-key bits wrapper)
- `Sequence(parts)` — ASN.1 SEQUENCE
- `SubjectPublicKeyInfo(algorithmOid, publicKeyBytes)` — full SPKI wrapper

OIDs needed:
- RSA: `1.2.840.113549.1.1.1` (`rsaEncryption`)
- EC P-256: `1.2.840.10045.2.1` + curve-specific `1.2.840.10045.3.1.7` (`prime256v1` / `P-256`)

This is the most non-trivial piece of code in the shortcode. Budget 100–150 lines for it.

### 4.6 Tamper re-sign (HS256 only)

```js
async function resignHS256(parsed, modifiedPayload, secret) {
  var newPayloadB64 = b64urlEncode(new TextEncoder().encode(JSON.stringify(modifiedPayload)));
  var data = new TextEncoder().encode(parsed.parts.h + '.' + newPayloadB64);
  var key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  var sigBuffer = await crypto.subtle.sign('HMAC', key, data);
  return parsed.parts.h + '.' + newPayloadB64 + '.' + b64urlEncode(new Uint8Array(sigBuffer));
}
```

**Restriction: HS256 / HS384 / HS512 only.** RS256 / ES256 re-sign is impossible client-side because the user only has the public key. The tamper editor is hidden when `header.alg` is `RS256` / `ES256`.

### 4.7 Bearer token extraction (regex)

```js
function extractJwt(input) {
  var s = String(input).trim();
  // 1. bare token
  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(s)) return s;
  // 2. Authorization header
  var m = s.match(/(?:Bearer|bearer|BEARER)\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/);
  if (m) return m[1];
  // 3. any embedded
  m = s.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
  return m ? m[0] : null;
}
```

Order matters: bare token check is cheapest, header check is the most specific for the common debugging case, embedded match is the fallback.

### 4.8 Sensitive claim masking

```js
function isSensitive(name) {
  var n = String(name).toLowerCase();
  for (var i = 0; i < SENSITIVE_CLAIMS.length; i++) {
    if (n === SENSITIVE_CLAIMS[i].toLowerCase()) return true;
  }
  return false;
}
```

Exact-name match (case-insensitive), not substring. `user.password_hash` is NOT masked (it's a derived value, not a password itself). User can extend via `JWT_SENSITIVE_OVERRIDES` array.

---

## §5. Hugo Build Integration

### 5.1 Pre-flight checks (before any commit)

```bash
cd ~/code/dlsome-top
git status                          # confirm clean (or only jwt-inspector.md changes)
git branch --show-current           # MUST be feat/jwt-inspector
git fetch origin
git log origin/main..HEAD --oneline # already 1fd545f on this branch
```

### 5.2 Add files

```bash
cd ~/code/dlsome-top
# 1. shortcode (engineering writes this — template is in §2)
git add layouts/shortcodes/jwt-inspector.html

# 2. content stubs (content agent writes these — template is in §3)
git add content/tools/jwt-inspector.md
git add content/tools/jwt-inspector.en.md

# 3. (optional) static assets — only if content agent provided them
# git add static/og-images/jwt-inspector.png
# git add static/screenshots/jwt-inspector.png
```

### 5.3 Build verification (mandatory before commit)

```bash
cd ~/code/dlsome-top
rm -f .hugo_build.lock              # clean lock if any
hugo --gc --minify --printPathWarnings 2>&1 | tee /tmp/hugo-build.log
```

**Pass criteria:**
- Exit code 0
- No template error (`executing "shortcode" at ...`)
- No broken internal links
- Output contains `tools/jwt-inspector/index.html`

**Expected pass/fail of build output:**

| Scenario | Expected |
|---|---|
| Shortcode has unclosed `<div>` | build fails at template parse |
| Frontmatter missing `description` | build succeeds but emits validation warning (not error) |
| Shortcode JS syntax error | Hugo does NOT lint inline JS — will only fail at browser runtime. Engineering must eyeball or run `node -c` on extracted snippet |

**Recommended JS validation (engineering self-check):**

```bash
# Extract inline JS and syntax-check (rough but catches typos)
sed -n '/<script>/,/<\/script>/p' layouts/shortcodes/jwt-inspector.html \
  | sed '1d;$d' > /tmp/jwt-inspector.js
node --check /tmp/jwt-inspector.js && echo "JS syntax OK"
```

### 5.4 Local serve test

```bash
cd ~/code/dlsome-top
hugo server -D --navigateToChanged
# open http://localhost:1313/tools/jwt-inspector/
# verify:
#   - input field renders, sample button loads RFC 7519 example token
#   - header + payload decoded correctly
#   - signature bytes render as hex
#   - claim table shows iss/sub/exp/etc with countdowns ticking every second
#   - sensitive fields (if any in test payload) render masked with reveal button
#   - alg=none detection shows red banner for fake test token
#   - tamper button triggers confirmation modal
#   - HS256 verify with correct secret shows ✓ valid
#   - HS256 verify with wrong secret shows ✗ invalid
#   - RS256 verify with sample RSA public key works (need test fixture)
#   - ES256 verify with sample EC public key works (need test fixture)
#   - HS/RS confusion test with public key shows appropriate warning
#   - Multi-algorithm compare panel renders when both secret and pubkey supplied
#   - DevTools console has zero errors
```

### 5.5 Extend_head / partial integration

**Decision: NOT modifying `themes/PaperMod/layouts/partials/extend_head.html`.**

Rationale (per D15):
- cron-parser precedent inlines JSON-LD in markdown body — same pattern here.
- Adding per-tool if-blocks to the global partial would touch every page on the site (out of scope, risky for SEO on unrelated pages).
- The task brief explicitly says "(or partial) **if needed**" — and it isn't needed.

If a future iteration wants reusable SEO infrastructure across all tool pages, that's a separate refactor task with its own acceptance review. **Do not touch it now.**

### 5.6 Commit discipline

**Single commit on `feat/jwt-inspector` branch:**

```bash
cd ~/code/dlsome-top
git add -A
git status                                # eyeball diff
git commit -m "feat(jwt-inspector): client-side JWT inspector shortcode

Engineering implementation:
- HS256/RS256/ES256 signature verification via Web Crypto API
- ECDSA P1363 <-> DER auto-conversion (ES256 signature encoding)
- HS256 claim tampering + re-signing (debugging/red-team)
- alg=none (CVE-2015-9235) and HS/RS confusion attack detection
- RFC 7519 registered claims highlighting + exp/nbf live countdown
- Sensitive claim masking (password/secret/api_key black-list)
- Bearer token auto-extraction (raw / Authorization header / embedded)
- Multi-algorithm parallel verify (compare HS256/RS256/ES256)
- Optional JWKS kid lookup with JWK -> SPKI PEM conversion
- Zero CDN, zero fetch (except user-initiated JWKS), zero tracking
- HTTPS-only (crypto.subtle unavailable over http://)
- i18n: en full + zh placeholder strings

verifier: PASS (0 P0, …)

Co-authored-by: webpenson-executor-engineering
Trigger: tool-team-loop-v2"
```

**Hard rules:**
- ✅ Branch name: `feat/jwt-inspector`
- ✅ Commit message prefix: `feat(jwt-inspector):`
- ✅ Never push to `main`
- ✅ Never amend published commits (force-push disabled)
- ❌ No "WIP" / "fix typo" rebases on already-pushed commits

### 5.7 Post-commit verification

```bash
# Verify the branch tip is exactly what we expect
git fetch origin
git log origin/main..origin/feat/jwt-inspector --oneline
# should show at least 2 commits: 1fd545f (strategy+content-plan) + new commit
```

Report PASS to main session. Then main session spawns:
- verifier agent (separate task)

### 5.8 What this plan does NOT cover (out of scope)

| Item | Why deferred |
|---|---|
| Deploying a server-side verify endpoint | Strategy §6 architecture is pure client-side; no server endpoint exists or is planned. |
| Adding `themes/PaperMod/layouts/partials/extend_head.html` modifications | D15 — not needed; JSON-LD inline in markdown body. |
| OG image `static/og-images/jwt-inspector.png` | Content agent responsibility (PNG generation). |
| Screenshot `static/screenshots/jwt-inspector.png` | Content agent responsibility. |
| HS384/HS512/RS384/RS512/PS256/ES384/ES512 algorithms | v1.0.0 ships HS256/RS256/ES256 only; others are post-launch §9 item 1. |
| JWE (encrypted JWT) decryption | Strategy §9 item 1. |
| PASETO conversion | Strategy §9 item 2. |
| Batch token verification | Strategy §9 item 3. |
| Public API endpoint | Strategy §9 item 5. |

---

## §6. File Manifest

### 6.1 Files created on `feat/jwt-inspector`

| # | Path | Type | Lines (approx) | Owner | Purpose |
|---|---|---|---|---|---|
| 1 | `layouts/shortcodes/jwt-inspector.html` | Hugo template | ~700 | engineering | The tool: HTML + inline CSS (~280) + inline JS (~650) |
| 2 | `content/tools/jwt-inspector.md` | Hugo markdown (zh) | ~250 | content | Chinese page: frontmatter + `{{< jwt-inspector >}}` + body + 4 JSON-LD + meta tags |
| 3 | `content/tools/jwt-inspector.en.md` | Hugo markdown (en) | ~250 | content | English page: same structure, English copy + EN URL in JSON-LD/canonical |
| 4 | `static/og-images/jwt-inspector.png` | PNG asset | 1200×630 | content | OG image (left: tool UI screenshot, right: "Free JWT Inspector" + 3 algorithm badges + logo) |
| 5 | `static/screenshots/jwt-inspector.png` | PNG asset | 800×600 | content | Tool screenshot used in §2 "How to Use" body section |

### 6.2 Files NOT created (deliberately)

| Path | Reason |
|---|---|
| `themes/PaperMod/layouts/partials/extend_head.html` | D15 — meta tags inline in markdown |
| `layouts/partials/jwt-inspector-head.html` | Not needed; everything lives in the shortcode |
| `functions/verify.js` (server-side endpoint) | D1 — pure client-side, no server endpoint |
| `static/lib/jwt-*.js` (third-party CDN) | D5 — zero CDN, zero external JS |
| `content/posts/jwt-inspector-eng-plan.md` is in `content/posts/` per task brief — NOT a published page, lives in posts as planning documentation | This file is engineering planning only; not exposed on the site |

### 6.3 Order of operations for engineering agent

1. `git checkout feat/jwt-inspector` (already done — branch tip is 1fd545f)
2. Write `layouts/shortcodes/jwt-inspector.html` per §2 (full spec above, ~700 lines)
3. Run `hugo --gc --minify` to confirm no template error (§5.3)
4. Run the JS syntax-check extract trick per §5.3
5. Spot-test in `hugo server` against §5.4 checklist
6. Report engineering PASS to main session (no commit yet — content agent still needs to add content files if they aren't already in the branch)
7. (If content agent already landed files) Run `hugo --gc --minify` again to confirm full site builds
8. Commit per §5.6 (single commit)
9. Report final engineering PASS

### 6.4 Order of operations for content agent

1. Wait for engineering to land the shortcode (or the file may already be in branch — check `git log`)
2. Write `content/tools/jwt-inspector.md` per content-plan §4.2 (Chinese)
3. Write `content/tools/jwt-inspector.en.md` per content-plan §4.1 (English)
4. Body content: use content-plan §2.2 verbatim (English); Chinese translation for the zh version
5. Run `hugo --gc --minify` to confirm both pages render
6. Generate OG image (1200×630) and tool screenshot (800×600) — place under `static/og-images/` and `static/screenshots/` respectively
7. Add reverse internal links in `content/tools/cron-parser.md`, `content/tools/yaml-to-json.md`, `content/tools/markdown-html-converter.md` per content-plan §6.3
8. Update `README.md` (site root) with the new tool entry — **out of scope of red lines, this is content/README update**
9. (If engineering already committed) Either amend engineering's commit OR push a separate content-only commit — content agent's call; recommend separate commit for clean diff

### 6.5 Order of operations for verifier agent

1. Run `hugo --gc --minify` from clean checkout — must exit 0
2. Inspect `public/tools/jwt-inspector/index.html` — must contain:
   - `<div id="jwt-tool" data-jwt-root`
   - All 4 JSON-LD scripts (WebApplication, FAQPage, BreadcrumbList, HowTo)
   - 7 FAQ entries (verbatim from strategy §3.2 for English; accurate Chinese translation for zh)
   - canonical link
   - OG + Twitter meta tags
3. Visually load the page in a browser (or `curl` the HTML and spot-check) — confirm:
   - Input field, sample button render
   - Click "Load sample" → RFC 7519 example token auto-decodes, header + payload panels populate
   - Live countdown ticker increments once per second for `exp` claim
   - HS256 verify with `your-256-bit-secret` shows ✓ valid (the RFC 7519 example uses this secret literally)
   - HS256 verify with any other secret shows ✗ invalid
   - Tamper mode confirmation modal appears, after consent tamper editor renders all claims editable
   - DevTools console has zero errors
4. Verify zero external CDN references (grep `src="http` and `href="https://` in the HTML — only allowed for PaperMod's own assets and same-origin links)
5. Verify `content/tools/cron-parser.md` and `content/tools/yaml-to-json.md` have new reverse links to `/tools/jwt-inspector/`
6. Report PASS / FAIL with concrete findings

---

## §7. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | User pastes a token over insecure context (http://) — `crypto.subtle` is undefined → silent failure | Medium | Medium (verify silently fails with confusing error) | §2.1 insecure-context warning banner shown on init when `!window.isSecureContext`. Tool still decodes in HTTP-only fallback mode. |
| R2 | ES256 signature length mismatch — user pastes a DER-encoded token of unexpected length | High | Medium (verify fails with cryptic WebCrypto error) | §4.3 auto-detect via first-byte 0x30; §4.3 surface clear "expected 64 bytes for ES256 P-256" error message. |
| R3 | HS/RS confusion test gives false negative — server uses different HMAC secret bytes (e.g., base64-decoded then stringified) | Medium | Low (test is heuristic, not authoritative) | §4.4 result banner explicitly says "vulnerable to HS/RS confusion attacks"; add note that this is one common attack vector, not exhaustive. |
| R4 | JWK → PEM helper has ASN.1 encoding bug → JWKS panel breaks for some keys | Medium | Low (JWKS is opt-in, panel can be deferred) | §4.5 Option A with test fixtures from RFC 7517 §4 + Auth0 demo JWKS. Unit-test JWK conversion offline before shipping. |
| R5 | `setInterval` ticker leaks if the shortcode is destroyed mid-page (e.g., Hugo re-render) | Low | Low (memory leak + minor perf hit) | `startTicker()` clears previous handle; `pagehide` clears on navigation. |
| R6 | Tamper mode used maliciously against third-party systems | Low | High (legal/ethical) | §2.1 confirmation modal (D11); prominent "FOR DEBUGGING / RED TEAM USE ONLY" banner; red warning on re-sign button. Cannot prevent technically; only mitigate socially. |
| R7 | User pastes a token with very long signature (e.g., RS512 512-byte signature) → raw-bytes panel overflows | Low | Low (cosmetic) | Max-height 320px on JSON panels + word-break: break-all on bytes panel. Long signatures wrap. |
| R8 | Inline JS in shortcode has typo / closure bug | Medium | Medium (tool breaks at runtime — Hugo build won't catch it) | §5.3 `node --check` trick; visual test in `hugo server`; spot-test RFC 7519 sample + a generated RS256 token. |
| R9 | Sensitive-claim regex matches something unexpected (e.g., `tokenCount` is masked when user doesn't want it) | Low | Low (cosmetic) | Exact-name match (case-insensitive); user can extend via `JWT_SENSITIVE_OVERRIDES`. |
| R10 | Two shortcode instances on one page (e.g., bilingual demo) collide on `id="jwt-tool"` | Low | Medium (duplicate DOM ids break CSS specificity + JS selectors) | Selector scoping: use `#jwt-tool` for CSS, `[data-jwt-root]` for JS root query. JS uses `$(sel, root)` rooted lookups. Multiple instances supported. |
| R11 | `navigator.clipboard.writeText` not available (insecure context) → Copy button silently fails | Low (tool is HTTPS-only) | Low | §2.3 `copyToClipboard()` falls back to `execCommand('copy')` on a hidden textarea. |
| R12 | User pastes a `BEGIN RSA PUBLIC KEY` (PKCS#1) instead of `BEGIN PUBLIC KEY` (SPKI) → RS256 import fails with confusing WebCrypto error | Medium | Low | §2.3 `pemToDer()` accepts both headers, but the PKCS#1 path requires an `RSAPublicKey` ASN.1 → SPKI wrapper. v1.0.0 ships SPKI-only; UI shows "BEGIN PUBLIC KEY" as the placeholder; error message on failure mentions "SPKI format required, not PKCS#1". |
| R13 | User pastes a malformed Authorization header (e.g., quoted JWT, broken whitespace) → regex miss | Low | Low | §4.7 regex tolerates extra whitespace via `\s+`; falls back to embedded 3-segment match. |

---

## §8. Acceptance Checklist (engineering side only)

This section is for engineering agent self-check before reporting PASS. Verifier has a separate checklist.

- [ ] Branch is `feat/jwt-inspector` (NOT `main`, NOT detached)
- [ ] `layouts/shortcodes/jwt-inspector.html` exists
- [ ] All CSS selectors prefixed with `#jwt-tool` or `.jwt-*`
- [ ] All JS data-attributes prefixed with `data-jwt-*`
- [ ] Root element is `<div class="jwt" id="jwt-tool" data-jwt-root data-jwt-lang="{{ $lang }}">`
- [ ] Zero `<script src="…">`, zero `<link href="https://…">` external references in the shortcode
- [ ] `hugo --gc --minify` exits 0
- [ ] `public/tools/jwt-inspector/index.html` is generated (after content stubs added)
- [ ] `node --check` on extracted inline JS passes (no syntax error)
- [ ] Sample token (RFC 7519 Appendix A.1) auto-decodes correctly on click
- [ ] HS256 verify with `your-256-bit-secret` (the RFC 7519 example secret) shows ✓ valid for the sample token
- [ ] HS256 verify with any other secret shows ✗ invalid
- [ ] exp countdown ticker updates at least once per second (visually verified)
- [ ] Sensitive claim (e.g., `password` in a test payload) renders as `••••••••` with reveal button
- [ ] alg=none detection: a fake token with `{"alg":"none"}` header triggers red CVE-2015-9235 banner
- [ ] HS/RS confusion test button (when public key is supplied) runs and shows appropriate pass/fail banner
- [ ] Tamper mode confirmation modal appears on first click; after consent, tamper editor renders
- [ ] Re-sign button produces a new JWT string when HS256 secret is provided
- [ ] JWKS fetch button (when URL supplied) loads JWKS and populates `kid` dropdown
- [ ] Multi-algorithm compare panel shows HS256+RS256+ES256 results when both secret and pubkey supplied
- [ ] Insecure-context warning banner shows when page loaded over `http://` (test via local `hugo server -p 8080 --bind 0.0.0.0` and access via http://host:8080/)
- [ ] No modifications to `themes/PaperMod/`, `hugo.toml`, or any other tool's content/shortcode file
- [ ] Single commit with `feat(jwt-inspector):` prefix on `feat/jwt-inspector` branch
- [ ] Commit NOT pushed to `main`
- [ ] `git log origin/main..origin/feat/jwt-inspector --oneline` shows at least 2 commits (1fd545f + new commit)

---

**End of Engineering Plan.**

> Content agent: implement §3 (frontmatter + body) per `content-plan §4.1/§4.2`. Verifier: cross-check §8 and the strategy §8 master checklist.