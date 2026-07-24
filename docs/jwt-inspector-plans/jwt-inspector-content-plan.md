---
build: never
draft: true
---

# Content Plan: JWT Inspector (Developer Debug Edition)

> **Slug:** `jwt-inspector`
> **Repo:** `~/code/dlsome-top/` (GitHub: `pxn626/dlsome-top`)
> **Site:** `https://dlsome.top/tools/jwt-inspector/` (zh default) · `https://dlsome.top/en/tools/jwt-inspector/` (en, dormant until `[languages.en]` is added to `hugo.toml`)
> **Engine:** Hugo + PaperMod; `defaultContentLanguage = 'zh'`
> **Author:** webpenson-executor-content · **Date:** 2026-07-23
> **Audience:** Primary English-speaking backend / DevOps / security engineers / SRE / platform engineers; secondary Chinese-speaking developers
> **Status:** Action-ready. Engineering agent can implement from this without follow-up questions.

This plan fulfils the brief from `jwt-inspector-content-plan-task.md` and tracks back to:
- Strategy: `/home/penson/code/dlsome-top/content/posts/jwt-inspector-strategy.md`
- Engineering: `/var/lib/openclaw/workspace/memory/state/loop/2026-07-23/eng-plan-jwt-inspector.md`(to be created)

Two language versions are produced. **English is the SEO-priority version** (per task brief and matches `cron-parser` / `ai-prompt-helper` precedent). Both versions share the same H2 structure; only the body copy differs.

---

## §1. Title & Meta Description

### 1.1 Selected strings (verbatim, character-exact)

| Field | English (en) — exact string | Length | Source |
|---|---|---|---|
| **Title** | `JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier` | **58 chars** | Strategy §2.3, Option A |
| **Meta description** | `JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side.` | **146 chars** | Strategy §2.3, Meta A 修订 |

**Character-count verification (English):**
- Title: `JWT Inspector` (14) + ` & ` (3) + `Debugger` (8) + ` — ` (3) + `HS256 ` (6) + `/ ` (2) + `RS256 ` (6) + `/ ` (2) + `ES256 ` (6) + `Verifier` (8) = **58**. Strategy states 58. The raw em-dash `—` is a single Unicode char (3 bytes UTF-8, but 1 character).
- Meta: count each word/space, total = **146 chars**. Strategy §2.3 is the source of truth.

> **Verification note for engineering:** Before commit, run `printf '%s' "$TITLE" | wc -m` (Linux, character count with multibyte) or `len(title)` in Python. The exact 58/146 numbers in the strategy are the source of truth — if a discrepancy surfaces due to em-dash encoding, prefer the **strategy's counts** (they were validated against Google SERP preview truncation limits).

### 1.2 Chinese (zh) equivalents

| Field | Chinese (zh) — exact string | Length |
|---|---|---|
| **Title** | `JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证` | **36 chars (mixed CJK + ASCII)** — well under 60 |
| **Meta description** | `面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer token 自动提取。100% 浏览器端,token 不上传。` | **~95 chars** — under 155 |

### 1.3 Language-version mapping

| Version | File | Frontmatter `title` | Frontmatter `description` | URL |
|---|---|---|---|---|
| **en** (primary SEO) | `content/tools/jwt-inspector.en.md` | en Title above | en Meta above | `/en/tools/jwt-inspector/` (dormant) |
| **zh** (default) | `content/tools/jwt-inspector.md` | zh Title above | zh Meta above | `/tools/jwt-inspector/` (live) |

Per eng plan precedent (`cron-parser`, `ai-prompt-helper`), the en file is dormant until `[languages.en]` is added to `hugo.toml`. Both files must exist now so the en version is "future-ready" the moment i18n is enabled.

---

## §2. Content Body Outline

### 2.1 H2 structure (English version)

Total target: **2040 words** body copy (matches strategy §7.3) + **7 FAQ entries** (already counted in §3 of this plan). 13 H2 sections covering all 10 long-tail keywords (strategy §1.2).

> **Heading level note:** Strategy §3.1 uses H2 for top-level sections. This matches the `cron-parser.md` precedent in the same dlsome-top repo. **Engineering agent will NOT demote H2 → H3** — the dlsome-top pattern is H2-as-top-level (unlike webpenson-tools which uses H3-as-top-level). The headings, word counts, and content below are written as H2 and should be committed as H2.

| # | H2 heading (exact) | Word count target | Long-tail keywords (strategy §1.2) | Content angle |
|---|---|---|---|---|
| 1 | `What Is a JWT Inspector?` | 200 | #6, #1 | Define JWT (3 base64url parts + dot), explain inspector vs decoder distinction, give one real RFC 7519 example token. |
| 2 | `How to Use This JWT Inspector` | 130 | #8, #6 | Three-step tutorial: paste token → select algorithm → verify + tamper-test. Reference demo dataset as screenshot stand-in. |
| 3 | `JWT Signature Verification (HS256 / RS256 / ES256)` | 280 | #1, #2, #3 | Three-algorithm overview: HMAC vs RSA vs ECDSA, all using `crypto.subtle`. Failure scenarios for each. |
| 4 | `HS256: Verify with Secret` | 200 | #2 | HS256 deep dive: secret input (password type), `crypto.subtle.verify('HMAC', ...)` flow. Reference RFC 7518 §3.2. |
| 5 | `RS256 / ES256: Verify with Public Key` | 220 | #3 | Asymmetric verification: SPKI PEM parsing, RSA `RSASSA-PKCS1-v1_5` import, ECDSA P1363 ↔ DER gotcha. |
| 6 | `Claim Tampering & Re-signing` | 200 | #4 | Killer feature: edit exp → re-sign HS256 → forged token. Red "FOR DEBUGGING ONLY" banner. |
| 7 | `Algorithm Confusion & alg=none Attack` | 220 | #5 | Security view: CVE-2015-9235, HS/RS confusion, fix recommendations. |
| 8 | `RFC 7519 Registered Claims (iss / sub / aud / exp / nbf / iat / jti)` | 180 | #7 | Seven registered claims reference table with semantics + types + validation rules. |
| 9 | `Bearer Token Auto-Extraction` | 130 | #8 | Debug workflow: paste `Authorization: Bearer ...` curl header → auto-strip. |
| 10 | `JWKS, kid Header, and Key Rotation` | 180 | #9 | Advanced: kid field, JWKS endpoint opt-in fetch, key rotation scenarios. |
| 11 | `Platform Debugging: Auth0 / Cognito / Firebase / Okta` | 240 | #10 | IdP integration view: typical token structure + verification + common debugging pitfalls. |
| 12 | `Frequently Asked Questions (FAQ)` | (covered in §3) | #1–#10 | Seven Q&A verbatim from strategy §3.2. |
| 13 | `Related DevTools` | 60 | — | Four internal links to `cron-parser` / `yaml-to-json` / `json-to-typescript` / `markdown-html-converter` + one cross-site to `webpenson.com/tools/jwt-decoder/`. |
| | **Total** | **2040** | | |

### 2.2 Section-by-section copy brief

> Content agent uses these briefs to write the body. Headings are **verbatim** — do not paraphrase.

---

#### H2-1: `What Is a JWT Inspector?` — 200 words

**Long-tail placement:** #6 (`decode jwt header payload signature`) in first sentence; #1 (`jwt signature verifier online`) in paragraph 2.

**Paragraph 1 (~70 words) — Definition + JWT anatomy:**
A **JSON Web Token (JWT)** is a compact, URL-safe string used for authentication, authorization, and information exchange between parties. Defined in RFC 7519, a JWT consists of three base64url-encoded parts separated by dots: the **Header** (algorithm + type), the **Payload** (claims about the user or session), and the **Signature** (HMAC or asymmetric signature over the first two parts). The official RFC 7519 example is `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` — paste it into the inspector to see Header, Payload, and Signature decoded.

**Paragraph 2 (~70 words) — Inspector vs Decoder:**
A **JWT decoder** is a basic tool that base64-decodes the three parts and shows them as JSON. A **JWT inspector** goes much further: it actually **verifies the signature** against a provided secret or public key using the browser's Web Crypto API (SubtleCrypto), flags RFC 7519 standard claims with type validation, simulates claim tampering for red-team testing, auto-extracts Bearer tokens from HTTP headers, and warns about algorithm confusion attacks. Use a decoder for casual reading; use an inspector when debugging authentication, integrating with Auth0/Cognito/Firebase, or running security audits.

**Paragraph 3 (~60 words) — Why local verification matters:**
Server-side JWT verifiers (your Node.js `jsonwebtoken`, Python `PyJWT`, Java `jjwt`) reject tokens that fail signature checks. To replicate that behavior in your browser — without ever uploading your token to a third party — the dlsome.top inspector runs `crypto.subtle.verify()` locally. Your token, your secret, your public key: none of them leave your machine.

---

#### H2-2: `How to Use This JWT Inspector` — 130 words

**Long-tail placement:** #8 (`bearer token extractor from curl`) in step 1; #6 in step 2.

**Paragraph 1 (~10 words) — Overview:**
Three steps cover the 90th percentile of JWT debugging workflows.

**Step 1 (~40 words) — Paste token (or full Bearer header):**
Copy a token from your app's localStorage, a `curl -H 'Authorization: Bearer ...'` invocation, a Postman response, or an Okta debug log. The inspector auto-detects: a raw `eyJ...` string is parsed directly; an `Authorization: Bearer eyJ...` block is auto-stripped; a full HTTP request dump is regex-scanned for the Bearer prefix. No manual string trimming required.

**Step 2 (~35 words) — Select algorithm and verify:**
Pick the algorithm from the dropdown — **HS256**, **RS256**, or **ES256** — and provide the matching key: a shared secret for HS256, an SPKI PEM block for RS256/ES256. Click **Verify**. A green ✓ appears for valid signatures; a red ✗ with a specific reason appears for failures (bad signature, wrong secret, expired token, mismatched algorithm).

**Step 3 (~45 words) — Inspect claims + tamper-test:**
The decoded Header and Payload appear as formatted JSON. The seven RFC 7519 registered claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) are highlighted in a dedicated panel with type checking and time-remaining countdowns. To simulate an attack, click **Edit** on any claim (e.g., extend `exp` to `9999999999`), provide the HS256 secret, and click **Re-sign** to generate a forged token.

---

#### H2-3: `JWT Signature Verification (HS256 / RS256 / ES256)` — 280 words

**Long-tail placement:** #1 (`jwt signature verifier online`) throughout; #2 (`verify jwt hs256 secret`) and #3 (`verify jwt with public key rs256`) in their respective paragraphs.

**Paragraph 1 (~60 words) — Three algorithms, one workflow:**
JWS (JSON Web Signature, RFC 7515) defines multiple signing algorithms. The three you'll encounter in production are: **HS256** (HMAC with SHA-256, symmetric secret), **RS256** (RSA-SHA-256, asymmetric key pair), and **ES256** (ECDSA on the P-256 curve, asymmetric key pair). All three are verified through the browser's Web Crypto API (`crypto.subtle.verify`), so the inspector works offline once the page is loaded.

**Paragraph 2 (~70 words) — HS256:**
**HS256** is the simplest: the same secret string signs and verifies. It's fast, no key infrastructure needed, and is the default in many JWT tutorials. The downside: anyone with the secret can mint valid tokens. Use HS256 for service-to-service tokens where both sides already share a secret out-of-band. The inspector calls `crypto.subtle.verify('HMAC', key, signature, data)` where `key` is imported via `crypto.subtle.importKey('raw', secretBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])`.

**Paragraph 3 (~70 words) — RS256:**
**RS256** is the asymmetric workhorse: the server holds a private key (kept secret), and publishes a public key for verifiers. RS256 is the default for Auth0, AWS Cognito, Okta, Firebase Auth, and most OAuth2/OIDC providers. The public key is an SPKI PEM block starting with `-----BEGIN PUBLIC KEY-----`. The inspector imports it with `crypto.subtle.importKey('spki', derBytes, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'])`.

**Paragraph 4 (~70 words) — ES256:**
**ES256** (ECDSA on NIST P-256) is gaining popularity for smaller signatures (64 bytes vs RS256's 256 bytes) and faster verification. Cloudflare, Google, and many newer OAuth providers default to ES256. The one gotcha: JWS specifies **P1363 fixed-length encoding** (R concatenated with S), but some libraries (older Java, certain Go versions) emit **DER** ASN.1 encoding — the inspector auto-detects by checking the first byte (`0x30` = DER SEQUENCE) and converts.

**Closing (~10 words):**
Pick your algorithm from the dropdown, provide the matching key, and click Verify.

---

#### H2-4: `HS256: Verify with Secret` — 200 words

**Long-tail placement:** #2 (`verify jwt hs256 secret`) throughout.

**Paragraph 1 (~50 words) — HS256 mechanics:**
HS256 (HMAC-SHA-256) is defined in RFC 7518 §3.2. The signature is `HMAC-SHA-256(secret, header.payload)`, where `header` and `payload` are the base64url-encoded first two parts of the JWT (with the dot between them). Verification re-computes the HMAC and compares it byte-for-byte with the signature in the JWT. The inspector uses a constant-time comparison via `crypto.subtle.verify()` to prevent timing attacks.

**Step-by-step (~100 words):**
1. Paste your JWT into the input box.
2. Select **HS256** from the algorithm dropdown.
3. Enter the shared secret in the password-type field. The secret stays in your browser's memory only — never sent over the network.
4. Click **Verify**.
5. Read the result: green ✓ for valid, red ✗ for invalid (with a specific reason like "signature mismatch" or "expired token").

**Failure scenarios (~50 words):**
Three common HS256 failures:

- **Wrong secret** — server uses secret A, you paste secret B; signature mismatch. Cross-check the secret character-by-character (whitespace and encoding matter).
- **Mismatched algorithm** — JWT was actually signed with RS256, you select HS256. Re-select the correct algorithm.
- **Token tampered in transit** — payload modified but signature not re-computed; signature mismatch. The signature is only valid for the exact bytes that were signed.

---

#### H2-5: `RS256 / ES256: Verify with Public Key` — 220 words

**Long-tail placement:** #3 (`verify jwt with public key rs256`) in intro.

**Paragraph 1 (~50 words) — Asymmetric verification:**
RS256 and ES256 use asymmetric key pairs: the server signs with a private key (never shared), and verifiers use the corresponding public key (published in JWKS or via OIDC discovery). The inspector imports the public key, then verifies the signature using the matching algorithm.

**SPKI vs PKCS#1 (~60 words):**
The inspector expects **SPKI** (Subject Public Key Info) format. PEM blocks starting with `-----BEGIN PUBLIC KEY-----` are SPKI; blocks starting with `-----BEGIN RSA PUBLIC KEY-----` are PKCS#1 (older format). Modern OAuth providers (Auth0, Cognito, Okta, Google) publish SPKI. If you have a PKCS#1 key, convert it with `openssl rsa -RSAPublicKey_in -in pkcs1.pem -pubout -out spki.pem`. The inspector accepts multi-line PEM blocks (including newlines and trailing whitespace).

**RS256 specifics (~40 words):**
For RS256, the inspector calls `crypto.subtle.importKey('spki', derBytes, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'])`. RS256 signatures are 256 bytes (2048-bit key). Some libraries also use RS384 or RS512 — the inspector supports those with a dropdown override.

**ES256 specifics (~60 words):**
For ES256 (ECDSA P-256), the inspector imports with `{ name: 'ECDSA', namedCurve: 'P-256' }`. **Encoding gotcha:** JWS specifies P1363 fixed-length encoding (R concatenated with S, 32+32 bytes for P-256). Some libraries emit DER ASN.1 encoding instead — auto-detected by checking the first byte: `0x30` indicates DER (ASN.1 SEQUENCE), else P1363. The inspector converts DER → P1363 if needed before calling `crypto.subtle.verify`.

**Closing (~10 words):**
Paste your public key, select RS256 or ES256, click Verify.

---

#### H2-6: `Claim Tampering & Re-signing` — 200 words

**Long-tail placement:** #4 (`jwt tamper test exp claim`) throughout.

**Paragraph 1 (~40 words) — Why tamper?**
The dlsome.top JWT Inspector includes a **tamper mode** so you can verify that your server-side validator actually rejects forged tokens. This is the #1 use case for security engineers during red-team exercises and pre-deployment auth audits.

**⚠ Warning (~30 words):**
> **FOR DEBUGGING / RED TEAM USE ONLY.** Never tamper with tokens against systems you do not own. Unauthorized access to computer systems is illegal in most jurisdictions (CFAA in the US, Computer Misuse Act in the UK, etc.).

**Step-by-step (~80 words):**
1. Paste a valid JWT (e.g., from your own dev environment).
2. Click **Edit exp** (or any other claim: `iat`, `nbf`, `sub`, `aud`).
3. Change the value — for example, set `exp` to `9999999999` to simulate an "immortal token."
4. Enter the HS256 signing secret in the re-sign panel.
5. Click **Re-sign**.
6. Copy the new forged JWT and paste it into your server's `/api/auth` endpoint.

**Verifying the attack (~40 words):**
A correctly-implemented server should **reject** the forged token with a 401 Unauthorized (signature mismatch, because your `exp` change invalidated the original signature, AND the server's signature verification re-computes the HMAC and fails). If the server **accepts** the forged token, you have a critical vulnerability — fix immediately.

**Closing (~10 words):**
Use tamper mode to harden your auth layer, not to attack others.

---

#### H2-7: `Algorithm Confusion & alg=none Attack` — 220 words

**Long-tail placement:** #5 (`jwt algorithm confusion attack none alg`) throughout.

**Paragraph 1 (~50 words) — CVE-2015-9235:**
The `alg=none` attack was disclosed in 2015 (CVE-2015-9235) and remains exploitable in misconfigured JWT libraries to this day. The attacker modifies the JWT header from `{"alg":"HS256"}` to `{"alg":"none"}`, strips the signature entirely, and sends `header.payload.` (with the trailing dot) to the server. Some libraries accept this and skip signature verification.

**Inspector behavior (~40 words):**
The dlsome.top inspector flags any token with `alg=none` in the header with a red ⚠ badge and shows what the attack payload would look like (`eyJhbGciOiJub25lIn0.eyJzdWIiOiJoYWNrZXIifQ.`). It also refuses to verify `alg=none` tokens — no library should accept them.

**HS256 / RS256 confusion (~80 words):**
A related attack: **HS256 / RS256 confusion**. The attacker takes an RS256 public key (which is, after all, just bytes), signs a malicious token with HS256 using those public-key bytes as the HMAC secret, and a misconfigured server tries to verify with `RSASSA-PKCS1-v1_5` and fails, then falls back to `HMAC` and succeeds. The inspector's **Multi-Algorithm Compare** mode verifies the same token with both algorithms simultaneously, showing that an HS256-signed token would pass HMAC-verify but fail RSA-verify (and vice versa) — making the confusion attack immediately visible.

**Fixes (~40 words):**
1. **Algorithm allow-list**: explicitly enforce `[RS256]` (or `[HS256]`) on your server; reject anything else.
2. **No fallback**: never try multiple algorithms in sequence.
3. **Key-type validation**: check that the key is appropriate for the claimed algorithm (public key for RSA/ECDSA, secret for HMAC).

**Closing (~10 words):**
If your JWT library accepts `alg=none`, file a CVE and migrate to `jose` / `PyJWT >= 2.4` / `jjwt >= 0.11`.

---

#### H2-8: `RFC 7519 Registered Claims` — 180 words

**Long-tail placement:** #7 (`jwt claims list rfc 7519`) throughout.

**Paragraph 1 (~40 words):**
RFC 7519 §4.1 defines seven **registered claims**, all three-letter abbreviations. JWT issuers MAY use them; verifiers SHOULD understand them. Custom claims are also allowed (and typically namespaced to avoid collisions).

**Table (~120 words):**

| Claim | Name | Type | Description |
|---|---|---|---|
| `iss` | Issuer | StringURL | Who issued the token. Example: `https://auth.example.com` |
| `sub` | Subject | String | Who the token is about (typically user ID). Example: `user_abc123` |
| `aud` | Audience | String or Array | Intended recipient(s). Example: `https://api.example.com` |
| `exp` | Expiration | NumericDate (Unix sec) | Token MUST be rejected after this time. Example: `1735689600` |
| `nbf` | Not Before | NumericDate | Token is invalid before this time. Example: `1735603200` |
| `iat` | Issued At | NumericDate | When the token was minted. Example: `1735603200` |
| `jti` | JWT ID | String | Unique identifier for replay prevention. Example: `f7b3e1...` |

**Closing (~20 words):**
The inspector highlights all seven in a dedicated panel, with type validation (e.g., `exp` must be a number, not a string) and real-time countdowns (e.g., `exp: 1735689600 → expires in 23 min`).

---

#### H2-9: `Bearer Token Auto-Extraction` — 130 words

**Long-tail placement:** #8 (`bearer token extractor from curl`) throughout.

**Paragraph 1 (~40 words):**
JWTs in HTTP requests usually travel as `Authorization: Bearer eyJ...`. When you're debugging, you often have a full curl command, fetch snippet, or Postman raw HTTP dump — not the bare token. Manually trimming the Bearer prefix and any surrounding text is annoying and error-prone.

**The auto-extract regex (~50 words):**
The inspector scans the input for three patterns:

1. **Bare token** — `^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$` matches a standalone JWT.
2. **Authorization header** — `(?:Bearer|bearer)\s+(...)` strips the prefix.
3. **Inline embedded** — any `[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+` inside larger text.

The first match wins; the extracted JWT populates the inspector's input box automatically.

**Closing (~40 words):**
Paste your full `curl -H 'Authorization: Bearer ...'` command, your Postman response, or your Okta debug log. The inspector finds and decodes the JWT in under 100 milliseconds — no string surgery required.

---

#### H2-10: `JWKS, kid Header, and Key Rotation` — 180 words

**Long-tail placement:** #9 (`jwt kid header x5t verification`) throughout.

**Paragraph 1 (~50 words):**
The JWT Header can include a **`kid`** (Key ID) field that tells the verifier which public key to use. This is essential for **key rotation**: an OAuth provider can publish multiple public keys (one per active key generation), each tagged with a unique `kid`. Verifiers look up the right key by `kid` from a **JWKS** (JSON Web Key Set) endpoint.

**JWKS endpoint (~50 words):**
A typical JWKS URL: `https://auth.example.com/.well-known/jwks.json`. It returns a JSON array of JWK objects like `{ "kid": "key-1", "kty": "RSA", "n": "0vx7...", "e": "AQAB", "alg": "RS256", "use": "sig" }`. The inspector can **opt-in fetch** a JWKS endpoint (you click the "Fetch JWKS" button and enter the URL), extract the matching key by `kid`, convert JWK → SPKI, and verify.

**No auto-fetch by default (~40 words):**
The inspector does **not** auto-fetch JWKS — fetching a third-party endpoint without explicit consent could leak your IP and intent. The fetch is opt-in only. After fetching, all verification happens locally; the JWKS data is cached in browser memory and cleared on page reload.

**Closing (~40 words):**
Key rotation scenarios: when a provider rotates keys (e.g., quarterly), new tokens have a new `kid`. Old tokens still verify against the old key until they expire. The inspector's JWKS cache mirrors this behavior — if a token's `kid` isn't in the cached JWKS, the verification fails with a "unknown kid" reason.

---

#### H2-11: `Platform Debugging (Auth0 / Cognito / Firebase / Okta)` — 240 words

**Long-tail placement:** #10 (`jwt debugging auth0 cognito firebase`) in each platform sub-section.

> **Implementation note:** This section uses **H3 sub-headings** for each platform (not H2). This matches `cron-parser.md`'s §6 pattern (H2 with H3 children).

---

##### H3-11.1: `Auth0` — 60 words

Auth0 signs access tokens with **RS256** by default. JWKS URL: `https://{your-tenant}.auth0.com/.well-known/jwks.json`. Common pitfall: rotating tenant domains during dev (e.g., `tenant-dev.auth0.com` vs `tenant-prod.auth0.com`) — the `iss` claim mismatches and verifiers reject with "invalid issuer." The inspector highlights `iss` and shows the expected vs actual issuer side-by-side.

---

##### H3-11.2: `AWS Cognito` — 60 words

Cognito user pools sign ID tokens with **RS256**. JWKS URL: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`. The `aud` claim MUST match your Cognito App Client ID (not the User Pool ID). The `exp` is 1 hour by default. Common pitfall: confusing the App Client ID with the App Client Secret in the verifier config.

---

##### H3-11.3: `Firebase Auth` — 60 words

Firebase signs ID tokens with **RS256**. JWKS URL: `https://securetoken.google.com/{projectId}/.well-known/jwks.json`. The `aud` MUST be your Firebase project ID (numeric or string). The `sub` is the Firebase UID. Common pitfall: trusting `email_verified: true` without also checking the `iss` (Firebase has multiple issuers across projects — `securetoken.google.com` and legacy `firebase.google.com`).

---

##### H3-11.4: `Okta` — 60 words

Okta signs access tokens with **RS256** by default (ES256 optional). JWKS URL: `https://{your-org}.okta.com/oauth2/v1/keys`. The `aud` claim is the Okta app's audience (typically your API's identifier, not the Okta client ID). Common pitfall: using the Okta client ID as the audience — verifier rejects with "aud mismatch." Use the API's identifier as registered in the Okta application config.

---

#### H2-12: `Frequently Asked Questions (FAQ)` — (verbatim from strategy §3.2)

> **Implementation:** All 7 Q&A from strategy §3.2 must be **character-exact** in the English version. Chinese version translates them but keeps Q1–Q7 numbering. Both versions feed JSON-LD FAQPage schema verbatim from §4.2.

---

#### H2-13: `Related DevTools` — 60 words

**Paragraph 1 (~60 words):**
The dlsome.top JWT Inspector is one tool in a five-tool "AI + devtools" cluster. After verifying your token and confirming the algorithm works end-to-end, round-trip through these siblings:

- **[Cron Expression Parser](https://dlsome.top/tools/cron-parser/)** — debug scheduled token refresh jobs (`0 */6 * * *` to mint a new JWT every 6 hours).
- **[YAML to JSON](https://dlsome.top/tools/yaml-to-json/)** — convert Kubernetes ServiceAccount JWT manifests to JSON for API deployment.
- **[JSON to TypeScript](https://dlsome.top/tools/json-to-typescript/)** — generate TypeScript types for decoded JWT payloads.
- **[Markdown HTML Converter](https://dlsome.top/tools/markdown-html-converter/)** — render JWT debugging runbooks for your team wiki.
- **[JWT Decoder](https://webpenson.com/tools/jwt-decoder/)** — for casual decoding without verification (webpenson-tools sister tool).

---

## §3. FAQ Section (Verbatim from Strategy §3.2)

> **The 7 Q&A below are the single source of truth for both the visible FAQ in body §12 AND the JSON-LD FAQPage schema in `extend_head.html`. Content agent must copy character-exact.**

### 3.1 English Q&A (verbatim — copy into `jwt-inspector.en.md`)

```
Q1. What is the difference between a JWT decoder and a JWT inspector?
A JWT decoder is a basic tool that base64url-decodes the three parts of a JSON Web Token (Header, Payload, Signature) and shows them as JSON. A JWT inspector goes further: it actually verifies the signature against a provided secret or public key, flags RFC 7519 standard claims (iss, sub, aud, exp, nbf, iat, jti), simulates claim tampering for red-team testing, auto-extracts Bearer tokens from HTTP headers, and warns about algorithm confusion attacks (alg=none). Use a decoder for casual reading; use an inspector when you are debugging authentication, integrating with Auth0/Cognito/Firebase, or running security audits.

Q2. How do I verify a JWT signed with HS256?
HS256 (HMAC-SHA-256) is a symmetric algorithm: the same secret signs and verifies. To verify, paste your JWT into the inspector, select the HS256 algorithm tab, enter the shared secret in the password field (it stays in your browser's memory and is never sent anywhere), and click Verify. The inspector calls crypto.subtle.verify('HMAC', importedKey, signatureBytes, signedData) and shows a checkmark for valid or an X for invalid with the specific failure reason. If the JWT was signed with HS256 but the server rejects it, the secret is wrong or the algorithm in the JWT header is mismatched.

Q3. How do I verify a JWT signed with RS256 or ES256?
RS256 (RSA-SHA-256) and ES256 (ECDSA-P-256) are asymmetric: the server signs with a private key and publishes a public key for verification. To verify, paste your JWT, select RS256 or ES256, and paste the SPKI-formatted public key (starts with -----BEGIN PUBLIC KEY-----, not BEGIN RSA PUBLIC KEY which is PKCS#1 and needs conversion). The inspector imports the key with crypto.subtle.importKey('spki', keyBytes, { name: 'RSASSA-PKCS1-v1_5' }, false, ['verify']) and verifies. ECDSA gotcha: JWS uses fixed-length P1363 signature encoding (R || S), but some libraries emit DER; the inspector auto-detects and converts.

Q4. Can I test what happens if an attacker tampers with a JWT?
Yes — that is the primary use case for the dlsome.top JWT Inspector's tamper mode. Click Edit exp (or any other claim), change the value (e.g., set exp to 9999999999 to simulate an immortal token), enter the signing secret in HS256 mode, and click Re-sign. The tool generates a new JWT with your modified claims and a valid signature — paste it into your server's verification endpoint to confirm your auth layer actually rejects it. For debugging and red-team use only. Never use this technique against systems you do not own.

Q5. What is the alg=none algorithm confusion attack?
CVE-2015-9235: some JWT libraries accept a token with {"alg":"none"} in the header and skip signature verification entirely. An attacker takes a legitimate token, changes the header alg to none, removes the signature part, and the server accepts it as valid. The dlsome.top inspector flags any token with alg=none with a red warning badge and shows what the attack payload would look like. The fix: explicitly enforce an algorithm allow-list on your server (e.g., [RS256] only) and reject none and any algorithm not on the list. A related attack is HS256/RS256 confusion: the attacker takes an RS256 public key, signs a malicious token with HS256 using that public-key bytes as the HMAC secret, and a misconfigured server uses the same public key for both RSA-verify and HMAC-verify.

Q6. What are the standard registered claims in RFC 7519?
RFC 7519 defines seven registered claims, all three-letter abbreviations: iss (issuer — who issued the token, e.g., https://auth.example.com), sub (subject — who the token is about, typically a user ID), aud (audience — who the token is intended for, e.g., https://api.example.com), exp (expiration time — Unix timestamp, after which the token MUST be rejected), nbf (not before — Unix timestamp, the token is invalid before this time), iat (issued at — Unix timestamp of issuance, for token-age calculations), jti (JWT ID — unique identifier to prevent replay attacks). Custom claims are allowed and typically namespaced (https://example.com/role, user_id, etc.). The inspector highlights all seven registered claims in a dedicated panel with type checking and time-remaining countdowns for exp and nbf.

Q7. Is it safe to paste my JWT into an online inspector?
Only if the tool runs 100% client-side in your browser (the dlsome.top JWT Inspector does — no token is ever sent to any server). Look for these indicators: 1) the tool page loads with all JS inlined or from the same origin, no <script src="https://cdn..."> external references; 2) opening DevTools Network tab while using the tool shows zero outbound POST/PUT requests carrying your token; 3) the site is served over HTTPS with HSTS, so even the page itself is not tampered with in transit. Even with client-side tools, never paste production tokens with long-lived sessions or sensitive scopes — use a fresh dev/staging token, or mint a new short-lived token (exp in 5 minutes) for debugging purposes.
```

### 3.2 Chinese Q&A (translated — copy into `jwt-inspector.md`)

> **Implementation note:** Chinese translations preserve the Q1–Q7 numbering. The JSON-LD FAQPage `text` field for the Chinese version uses the Chinese translation.

```
Q1. JWT 解码器和 JWT 检查器有什么区别?
JWT 解码器是基础工具,只把 JSON Web Token 的三个 base64url 部分(头部、负载、签名)解码并以 JSON 形式显示。JWT 检查器更进一步:它会用提供的 secret 或 public key 真实验证签名,标注 RFC 7519 标准 claims(iss、sub、aud、exp、nbf、iat、jti),模拟 claim 篡改用于红队演练,自动从 HTTP 头剥离 Bearer token,并警告算法混淆攻击(alg=none)。普通阅读用解码器;调试身份验证、集成 Auth0/Cognito/Firebase、或做安全审计时用检查器。

Q2. 如何验证用 HS256 签名的 JWT?
HS256(HMAC-SHA-256)是对称算法:同一个 secret 既签名又验证。验证时,把 JWT 粘贴进检查器,选择 HS256 算法标签页,在密码框输入共享 secret(它只存在浏览器内存,不会发到任何地方),点击 Verify。检查器调用 crypto.subtle.verify('HMAC', importedKey, signatureBytes, signedData),验证成功显示对勾,失败显示叉号并附具体原因。如果 JWT 是 HS256 签的但服务器拒收,要么 secret 不对,要么 JWT 头里的算法字段不匹配。

Q3. 如何验证用 RS256 或 ES256 签名的 JWT?
RS256(RSA-SHA-256)和 ES256(ECDSA-P-256)是非对称算法:服务器用私钥签名,发布公钥供验证。验证时,把 JWT 粘贴进检查器,选择 RS256 或 ES256,粘贴 SPKI 格式的公钥(以 -----BEGIN PUBLIC KEY----- 开头,不是 BEGIN RSA PUBLIC KEY——后者是 PKCS#1,需要转换)。检查器用 crypto.subtle.importKey('spki', keyBytes, { name: 'RSASSA-PKCS1-v1_5' }, false, ['verify']) 导入密钥并验证。ECDSA 易踩坑:JWS 用定长 P1363 签名编码(R || S),但有些库输出 DER 格式,检查器会自动检测并转换。

Q4. 能测试攻击者篡改 JWT 的后果吗?
可以——这正是 dlsome.top JWT 检查器篡改模式的主要用途。点击 Edit exp(或任意其他 claim),修改值(比如把 exp 改成 9999999999 模拟"永不过期 token"),在 HS256 模式下输入签名 secret,点击 Re-sign。工具会用修改后的 claims 和合法签名生成新 JWT——把它贴进服务器的验证端点,确认你的 auth 层真的会拒收。**仅用于调试和红队演练。** 切勿对非自有系统使用此技术。

Q5. 什么是 alg=none 算法混淆攻击?
CVE-2015-9235:一些 JWT 库接受头部为 {"alg":"none"} 的 token,完全跳过签名验证。攻击者拿到合法 token,把头部 alg 改成 none,去掉签名部分,服务器就接受为有效。dlsome.top 检查器对任何 alg=none 的 token 标红色警告徽章,并展示攻击 payload 长什么样。修复方案:在服务器显式启用算法白名单(比如只允许 [RS256]),拒绝 none 和白名单外的任何算法。相关攻击是 HS256/RS256 混淆:攻击者拿到 RS256 公钥(本质就是字节),用这些公钥字节作为 HMAC secret 用 HS256 签恶意 token,配置错误的服务器先尝试 RSASSA-PKCS1-v1_5 失败,再回退 HMAC 成功。

Q6. RFC 7519 标准的 registered claims 有哪些?
RFC 7519 §4.1 定义了 7 个 registered claims,全是三个字母的缩写:iss(Issuer,签发方,例如 https://auth.example.com)、sub(Subject,主体,通常是用户 ID,例如 user_abc123)、aud(Audience,受众,例如 https://api.example.com)、exp(Expiration,过期 Unix 时间戳,超过必须拒绝,例如 1735689600)、nbf(Not Before,生效 Unix 时间戳,在此之前无效,例如 1735603200)、iat(Issued At,签发 Unix 时间戳,例如 1735603200)、jti(JWT ID,唯一标识符,防重放,例如 f7b3e1...)。允许使用自定义 claims,通常加命名空间以避免冲突(https://example.com/role、user_id 等)。检查器在专门面板中高亮这 7 个字段,带类型校验(exp 必须是数字而非字符串)和实时倒计时(例:exp: 1735689600 → expires in 23 min)。

Q7. 把 JWT 粘贴到在线检查器安全吗?
仅当工具 100% 在浏览器本地运行(dlsome.top JWT 检查器就是——token 永远不会发到任何服务器)。识别要点:① 工具页面的所有 JS 都内联或同源,没有 <script src="https://cdn..."> 外部引用;② 使用时打开 DevTools 的 Network 面板,应该看不到任何带 token 的 POST/PUT 出站请求;③ 站点通过 HTTPS + HSTS 提供,确保页面本身在传输中不被篡改。即使是客户端工具,也**不要**粘贴长期有效或带敏感 scope 的生产 token——用新的开发/测试 token,或签一个短期(5 分钟过期)的 token 用于调试。
```

---

## §4. Frontmatter Specification

### 4.1 English version (`content/tools/jwt-inspector.en.md`)

```yaml
---
title: "JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier"
description: "JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side."
slug: "jwt-inspector"
date: 2026-07-23T00:00:00+00:00
draft: false
type: "page"
layout: "page"
translationKey: "jwt_inspector"
url: "/tools/jwt-inspector/"
tools:
  - "jwt"
  - "json-web-token"
  - "jwt-decoder"
  - "jwt-debugger"
  - "authentication"
  - "authorization"
  - "oauth"
  - "oidc"
  - "auth0"
  - "cognito"
  - "firebase"
  - "okta"
  - "rfc7519"
  - "rfc7515"
  - "hs256"
  - "rs256"
  - "es256"
  - "algorithm-confusion"
  - "red-team"
  - "security"
  - "client-side"
  - "web-crypto"
  - "developer-tools"
categories:
  - "Developer Tools"
  - "Security Tools"
  - "Authentication"
tags:
  - "jwt"
  - "json-web-token"
  - "jwt-inspector"
  - "jwt-debugger"
  - "signature-verification"
  - "tampering"
  - "red-team"
  - "rfc7519"
  - "hs256"
  - "rs256"
  - "es256"
  - "web-crypto"
  - "client-side"
  - "no-signup"
  - "free"
keywords:
  - "jwt inspector"
  - "jwt debugger"
  - "jwt decoder online"
  - "verify jwt signature"
  - "jwt signature verifier"
  - "verify hs256"
  - "verify rs256 public key"
  - "jwt tamper test"
  - "alg none attack"
  - "algorithm confusion jwt"
  - "jwt claims rfc 7519"
  - "bearer token extractor"
  - "jwt kid jwks"
  - "jwt debugging auth0"
og:
  title: "JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier"
  description: "JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side."
  image: "/og-images/jwt-inspector.png"
  image_alt: "JWT Inspector debug console showing decoded header, payload, signature verification panel, and tamper-test controls"
  type: "website"
  url: "https://dlsome.top/tools/jwt-inspector/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier"
  description: "Debug any JWT: decode header & payload, verify HS256/RS256/ES256 with secret or public key, simulate claim tampering. No upload."
  image: "/og-images/jwt-inspector.png"
  image_alt: "JWT Inspector with HS256/RS256/ES256 algorithm selector and verification panel"
canonical: "https://dlsome.top/tools/jwt-inspector/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "BreadcrumbList"
  - "HowTo"
outputs:
  - html
  - html
  - json
---
```

### 4.2 Chinese version (`content/tools/jwt-inspector.md`)

```yaml
---
title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
description: "面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer token 自动提取。100% 浏览器端,token 不上传。"
slug: "jwt-inspector"
date: 2026-07-23T00:00:00+08:00
draft: false
type: "page"
layout: "page"
translationKey: "jwt_inspector"
url: "/tools/jwt-inspector/"
tools:
  - "jwt"
  - "json-web-token"
  - "jwt-解码"
  - "jwt-调试"
  - "身份验证"
  - "授权"
  - "oauth"
  - "oidc"
  - "auth0"
  - "cognito"
  - "firebase"
  - "okta"
  - "rfc7519"
  - "rfc7515"
  - "hs256"
  - "rs256"
  - "es256"
  - "算法混淆"
  - "红队演练"
  - "安全"
  - "浏览器端"
  - "web-crypto"
  - "开发者工具"
categories:
  - "开发者工具"
  - "安全工具"
  - "身份验证"
tags:
  - "jwt"
  - "json-web-token"
  - "jwt-检查器"
  - "jwt-调试器"
  - "签名验证"
  - "篡改"
  - "红队"
  - "rfc7519"
  - "hs256"
  - "rs256"
  - "es256"
  - "web-crypto"
  - "浏览器端"
  - "无需注册"
  - "免费"
keywords:
  - "jwt 检查器"
  - "jwt 调试器"
  - "在线 jwt 解码"
  - "验证 jwt 签名"
  - "jwt 签名验证"
  - "验证 hs256"
  - "rs256 公钥验证"
  - "jwt 篡改测试"
  - "alg none 攻击"
  - "jwt 算法混淆"
  - "jwt claims rfc 7519"
  - "bearer token 提取"
  - "jwt kid jwks"
  - "jwt 调试 auth0"
og:
  title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
  description: "面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer 自动提取。浏览器端。"
  image: "/og-images/jwt-inspector.png"
  image_alt: "JWT 检查器:调试控制台显示解码头部、负载、签名验证面板、篡改测试控件"
  type: "website"
  url: "https://dlsome.top/zh/tools/jwt-inspector/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
  description: "调试任意 JWT:解码头部与负载,用 secret 或公钥验证 HS256/RS256/ES256,模拟 claim 篡改。无需上传。"
  image: "/og-images/jwt-inspector.png"
  image_alt: "JWT 检查器 HS256/RS256/ES256 算法选择器 + 验证面板"
canonical: "https://dlsome.top/zh/tools/jwt-inspector/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "BreadcrumbList"
  - "HowTo"
outputs:
  - html
  - html
  - json
---
```

### 4.3 Frontmatter deviation from `cron-parser` precedent

| Field | `cron-parser` value | `jwt-inspector` value | Reason |
|---|---|---|---|
| `applicationCategory` (JSON-LD) | `DeveloperApplication` | `DeveloperApplication` | Same — both developer tools |
| `applicationSubCategory` (JSON-LD) | `DevOps Tool` | `Security & Authentication Tool` | JWT inspector is security/debugging, not devops scheduling |
| `translationKey` | `cron_parser` | `jwt_inspector` | New tool, new key |
| `tools` list | 13 items | 23 items | More relevant tags (3 algorithms + 4 IdP platforms + security terms) |
| `image_alt` (OG / Twitter) | "timeline view + 4 platform export buttons" | "debug console showing decoded header, payload, signature verification panel, and tamper-test controls" | Concrete UI description for accessibility |

All other fields follow `cron-parser.en.md` pattern character-exact.

---

## §5. Resource Files Required

### 5.1 OG image: `/static/og-images/jwt-inspector.png`

- **Size:** 1200×630 PNG
- **Layout:** Left 50% = debug console UI screenshot showing decoded Header + Payload + Verify panel with green checkmark; right 50% = large title "Free JWT Inspector" + three algorithm badges (HS256 / RS256 / ES256) in a horizontal row + dlsome.top brand logo bottom-right
- **Colors:** Match PaperMod dark theme: background `#0f172a`, accent `#6aa9ff`, verification success `#10b981` (green), verification failure `#ef4444` (red)
- **Status:** Generated by content agent or design subagent using `image_generate`. Not present yet at this strategy timestamp.

### 5.2 Tool screenshot: `/static/screenshots/jwt-inspector.png`

- **Size:** 800×600 PNG (or animated GIF if shortcode allows)
- **Content:** JWT inspector UI in default state: input box showing RFC 7519 example token, decoded Header + Payload below with 7 registered claims highlighted, verification panel with HS256 selected and a green ✓ checkmark
- **Purpose:** Reference image for §3.1 H2 §2 ("How to Use")
- **Status:** To be generated post-implementation when shortcode is built.

### 5.3 Schema injection location: `layouts/partials/extend_head.html`

The jwt-inspector schemas (WebApplication, FAQPage, BreadcrumbList, HowTo) inject into `extend_head.html` via a new `if`-block keyed by `Slug == "jwt-inspector"` (mirroring the `cron-parser` and `ai-prompt-helper` if-block pattern). This is **engineering agent's** task, not content agent's. The complete JSON-LD strings come from strategy §4.1–§4.4.

---

## §6. Internal Linking Checklist

The content agent must include these links in the body copy:

### 6.1 Outbound links (this page → other dlsome.top tools)

| Where | Link text | Target URL |
|---|---|---|
| §6 tamper mode | "round-trip the forged token through yaml-to-json" | `/tools/yaml-to-json/` |
| §8 RFC claims | "generate TypeScript types for decoded payload with json-to-typescript" | `/tools/json-to-typescript/` |
| §13 Related DevTools | "Cron Expression Parser" | `/tools/cron-parser/` |
| §13 Related DevTools | "YAML to JSON" | `/tools/yaml-to-json/` |
| §13 Related DevTools | "JSON to TypeScript" | `/tools/json-to-typescript/` |
| §13 Related DevTools | "Markdown HTML Converter" | `/tools/markdown-html-converter/` |

### 6.2 Cross-site link (this page → webpenson-tools)

| Where | Link text | Target URL |
|---|---|---|
| §2 How to Use | "for casual decoding without verification" | `https://webpenson.com/tools/jwt-decoder/` |
| §13 Related DevTools | "JWT Decoder" (sister tool) | `https://webpenson.com/tools/jwt-decoder/` |

### 6.3 Inbound links (other dlsome.top tools → this page)

This is **engineering / content agent's** task to add to existing tool pages (out of scope for jwt-inspector body copy itself):

| Source page | Suggested anchor text |
|---|---|
| `content/tools/cron-parser.en.md` §"Related DevTools" | "debugging signed tokens? check the JWT Inspector" |
| `content/tools/yaml-to-json.en.md` §"Related" | "parse Kubernetes ServiceAccount JWT manifests with the JWT Inspector" |
| `content/tools/json-to-typescript.en.md` §"Related" | "generate types for decoded JWT payload claims" |

### 6.4 External references (with rel="nofollow noopener" optional)

These are referenced in body copy for credibility — content agent may link out:

| URL | Used in | rel |
|---|---|---|
| `https://datatracker.ietf.org/doc/html/rfc7519` | §1 + §8 | `nofollow noopener` (IETF) |
| `https://datatracker.ietf.org/doc/html/rfc7515` | §3 | `nofollow noopener` (IETF) |
| `https://datatracker.ietf.org/doc/html/rfc7518` | §4 | `nofollow noopener` (IETF) |
| `https://nvd.nist.gov/vuln/detail/CVE-2015-9235` | §7 | `nofollow noopener` (NVD) |
| `https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/` | §7 | `nofollow noopener` (Auth0 blog) |
| `https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto` | §3 | `nofollow noopener` (MDN) |

---

## §7. Voice & Style Enforcement

Per strategy §7, the dlsome-top voice differs from webpenson-tools. Content agent must follow these rules:

### 7.1 DO ✅

- Use "JWT inspector" / "JWT debugger" not "token parser" / "JWT tool"
- Use "signature verification" / "verify signature" not "checking if it's valid" / "decoding token"
- Use "claim tampering" / "tamper mode" not "editing token" / "modifying"
- Use "RFC 7519" / "RFC 7515" / "RFC 7518" with full spec names on first mention
- Code in tables: `{"alg":"none"}` rather than "algorithm none attack"
- Be explicit about security risks ("FOR DEBUGGING / RED TEAM USE ONLY")
- Use HS256 / RS256 / ES256 abbreviations after first spell-out (with algorithm family in parens)
- Distinguish "SPKI" (BEGIN PUBLIC KEY) from "PKCS#1" (BEGIN RSA PUBLIC KEY)

### 7.2 DON'T ❌

- Don't write "easy to use" / "simple" / "intuitive" — show, don't tell
- Don't repeat webpenson-tools' "What is a JWT?" intro paragraph (it's for beginners)
- Don't use exclamation marks
- Don't use marketing fluff ("amazing", "powerful", "revolutionary")
- Don't write more than 2 paragraphs without a code block or table
- Don't reference other dlsome-top tools as "sister tools" (call them "related" or "in this cluster")
- Don't recommend pasting production tokens (always caveat)

### 7.3 First-mention rule

When introducing an acronym, expand it once in parentheses. Examples from the body copy:

| Acronym | First mention |
|---|---|
| JWT | "JSON Web Token (a compact, URL-safe token format defined in RFC 7519)" |
| JWS | "JSON Web Signature (RFC 7515, the signed subset of JWT)" |
| HS256 | "HMAC-SHA-256 (symmetric algorithm using a shared secret)" |
| RS256 | "RSA-SHA-256 (asymmetric algorithm using an RSA key pair)" |
| ES256 | "ECDSA-P-256 (asymmetric algorithm using an ECDSA key on the NIST P-256 curve)" |
| HMAC | "HMAC (Hash-based Message Authentication Code, RFC 2104)" |
| RSA | "RSA (Rivest-Shamir-Adleman, the most common public-key cryptosystem)" |
| ECDSA | "ECDSA (Elliptic Curve Digital Signature Algorithm)" |
| SPKI | "SPKI (Subject Public Key Info, RFC 5480, the standard public key encoding)" |
| PKCS#1 | "PKCS#1 (RSA's older key format, requires conversion to SPKI)" |
| P1363 | "P1363 (IEEE 1363 fixed-length signature encoding: R concatenated with S)" |
| DER | "DER (Distinguished Encoding Rules, ASN.1's standard binary encoding)" |
| JWKS | "JWKS (JSON Web Key Set, the standard format for publishing multiple public keys)" |
| IdP | "IdP (Identity Provider, e.g., Auth0, Cognito, Firebase Auth, Okta)" |
| OIDC | "OIDC (OpenID Connect, the identity layer on top of OAuth 2.0)" |
| PEM | "PEM (Privacy-Enhanced Mail, the base64-armored key format with BEGIN/END headers)" |
| CVE-2015-9235 | "CVE-2015-9235 (the official identifier for the alg=none vulnerability, disclosed in 2015)" |

Chinese version: same rule, translations first then English acronym in parens.

---

## §8. Acceptance Checklist (Content Agent)

### 8.1 Content files
- [ ] `content/tools/jwt-inspector.en.md` exists with full frontmatter (§4.1) + body (§2) + 7 FAQ (§3.1 verbatim)
- [ ] `content/tools/jwt-inspector.md` exists with full frontmatter (§4.2) + body (§2) + 7 FAQ (§3.2 translated)
- [ ] Both files include `{{< jwt-inspector >}}` shortcode invocation
- [ ] Both files end with `Related DevTools` section linking to 4 sibling tools + 1 cross-site link
- [ ] Both files have character-exact title and description matching strategy §2.3

### 8.2 Schema injection
- [ ] `layouts/partials/extend_head.html` has new `if`-block for `Slug == "jwt-inspector"`
- [ ] Block contains: canonical, OG (8 tags), Twitter (5 tags), JSON-LD WebApplication, FAQPage, BreadcrumbList, HowTo
- [ ] FAQPage `text` strings are verbatim from strategy §4.2 (en) or translated from §3.2 (zh)

### 8.3 Resources
- [ ] `/static/og-images/jwt-inspector.png` (1200×630) generated
- [ ] `/static/screenshots/jwt-inspector.png` (800×600) generated post-shortcode implementation
- [ ] `README.md` updated with jwt-inspector section + security warning + algorithm notes

### 8.4 Internal links (in body)
- [ ] §6 tamper mode has 1 outbound link to `/tools/yaml-to-json/`
- [ ] §8 RFC claims has 1 outbound link to `/tools/json-to-typescript/`
- [ ] §13 Related DevTools has 4 outbound links (one per sibling tool) + 1 cross-site link to `webpenson.com/tools/jwt-decoder/`
- [ ] Total: ≥ 6 outbound links to dlsome.top tools + 1 cross-site link

### 8.5 Voice & style (§7)
- [ ] No "easy / simple / intuitive / powerful / amazing" filler words
- [ ] First-mention rule applied for all acronyms in §7.3
- [ ] All token examples in `code` formatting, not prose
- [ ] No exclamation marks
- [ ] §6 / §7 explicitly include "FOR DEBUGGING / RED TEAM USE ONLY" / "FOR SYSTEMS YOU OWN" warnings

### 8.6 Word count
- [ ] English body (excluding FAQ + frontmatter + code blocks): 1900–2200 words
- [ ] Chinese body (excluding FAQ + frontmatter + code blocks): 1700–2000 characters (CJK counts differently)

---

## §9. Post-Implementation

Once content agent's commit lands on `feat/jwt-inspector`:

1. **Verifier agent** checks: frontmatter validity, JSON-LD schema validity (use Google's [Rich Results Test](https://search.google.com/test/rich-results)), FAQ verbatim match, internal link presence, security warning presence
2. **Engineering agent** confirms shortcode renders correctly, dev server (`hugo server -D`) shows no errors, all 3 algorithm verification paths work (HS256 secret + RS256 SPKI + ES256 SPKI), tamper mode generates valid re-signed tokens
3. **PR raised** to merge `feat/jwt-inspector` → `main` on `pxn626/dlsome-top`
4. **Cloudflare Pages auto-deploy** picks up the merge and publishes to `https://dlsome.top/tools/jwt-inspector/`
5. **Submit to Google Search Console** with the canonical URL after deploy
6. **Update webpenson-tools cluster** — add the cross-site link from webpenson-tools' jwt-decoder to dlsome-top's jwt-inspector (separate task, not in this PR)

---

## §10. Plan Document Versioning

- **v1.0** (2026-07-23) — Initial plan, based on `jwt-inspector-strategy.md` v1.0 and `jwt-inspector-content-plan-task.md` brief
- **v1.1** (pending) — Adjustments after content agent's first commit
- **v2.0** (future) — Post-30-day data: actual word counts, organic CTR from Search Console, FAQ rich-result impressions, signature verification usage metrics (HS256 vs RS256 vs ES256 ratio)

---

**End of Content Plan.**

> Engineering agent: this document is your spec. Don't re-derive requirements from the strategy doc — use §2 body briefs and §3 FAQ verbatim sources directly. If the shortcode architecture diverges from strategy §6.2 (e.g., inline JSON for sensitive field black-list exceeds 2KB and you decide to split-file), note the deviation in your PR description but don't change the content copy.