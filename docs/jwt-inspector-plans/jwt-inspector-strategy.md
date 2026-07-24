---
build: never
draft: true
---

# Strategy: JWT Inspector (Developer Debug Edition)

> **Slug:** `jwt-inspector`
> **Repo:** `~/code/dlsome-top/` (GitHub: `pxn626/dlsome-top`)
> **Site:** `https://dlsome.top/tools/jwt-inspector/` (独立品牌 AI + devtools · 不与 `webpenson.com/tools/jwt-decoder/` 重复)
> **Engine:** Hugo + PaperMod; defaultContentLanguage `zh`,工具页面双语言:`content/tools/jwt-inspector.md`(中文)+ `content/tools/jwt-inspector.en.md`(英文);策略稿件双份落地至 `content/posts/`(策略文档,不发布)
> **Target audience:** **后端 / DevOps / 安全工程师 / SRE / 平台工程师**(主)+ 全栈开发者(次)。**与 webpenson-tools 通用人群(初学者 / 站长 / 偶尔使用者)刻意区分**。
> **Workload:** P1 / 2 dev-day — 工具本体 webpenson-tools 已有(`layouts/shortcodes/jwt_tool.html`),本任务做的是**开发者调试视角差异化改写 + 内容深度 + SEO 资产扩展 + 签名验证算法库本地化**。
> **Author:** webpenson-strategy subagent · **Date:** 2026-07-23
> **Cluster siblings on same site(内链):** `ai-prompt-helper`(已上线)、`yaml-to-json`(已上线)、`json-to-typescript`(已上线)、`markdown-html-converter`(已上线)、`cron-parser`(已上线);跨站 link 目标:`webpenson.com/tools/jwt-decoder/`(兄弟站通用版)、`webpenson.com/tools/http-header-inspector/`(同品类调试工具)
> **Status:** Pre-implementation strategy. Content agent 收到本文后,无需追问即可直接产出 zh + en 双版本 markdown。

---

## 0. 🧠 战略依据 (Strategic Rationale · 3-Whys)

| 维度 | 结论 |
|---|---|
| **技术风险(中)** | 工程已 webpenson-tools 验证:`layouts/shortcodes/jwt_tool.html` 稳定运行。新增依赖:**本地签名验证算法库** —— 必选 `HMAC-SHA256/384/512`(纯 JS < 50 行,Web Crypto API 原生支持)、**`ECDSA P-256/384/521 + RSA-PSS / RSASSA-PKCS1-v1_5`**(`crypto.subtle` 原生支持,但 ECDSA 签名编码需要 P1363 ↔ DER 互转 ~80 行)。**不引入 `jsrsasign` 等第三方库**(违反 dlsome-top "zero-CDN" 强约束)。`crypto.subtle` 在 file:// 与 http:// 不可用,仅在 https:// 与 localhost 可用 —— **本工具强约束 https-only**(Hugo 站点已 https)。 |
| **业务价值(高)** | Head term `jwt debugger` 全球 6K–15K/mo,head term `jwt decoder` 全球 30K–80K/mo(高搜索量),head term `jwt signature verifier` 全球 2K–5K/mo(精准开发者 intent),head term `jwt claim tamper test` 全球 500–1.5K/mo(长尾细分,竞品几乎不做)。**配合 dlsome-top 现有"调试工具矩阵"**(cron-parser、http-header-inspector 即将上线),形成"协议调试三件套"。AdSense RPM 估算 $4–8(开发者 / 安全工程师流量价值高于一般 devtools)。 |
| **差异化定位(高)** | **核心差异化 — 五点:** ① **真实签名验证**(输入 HS256 secret / RS256 public key,**服务端拒收验证失败的 token**),竞品普遍只 decode 不 verify;② **Claims 篡改模拟**(改 exp / iat / nbf 后**自动重新签名** HS256,生成伪造 token 直接喂给 server-side 验证逻辑,做红队演练),竞品完全不提供;③ **算法对比视图**(同一 token 同时用 HS256 / RS256 / ES256 验证,展示 kid 协商 / 算法替换攻击 alg=none 的视角);④ **Bearer 智能提取**(粘贴 `Authorization: Bearer eyJ...` curl / fetch 块,自动剥离 header 取 JWT);⑤ **Debug console 风格真实负载视图**(解码后不只是彩色 JSON,还要显示每个 claim 的 RFC 7519 语义、exp/nbf/iat 的"还剩 X 秒"倒计时、敏感字段如 password_hash 自动遮蔽)。**webpenson-tools jwt-decoder = "普通用户能用的入门版";dlsome-top jwt-inspector = "**写 OAuth/Auth0/Cognito 的人会爱的开发者版**"。 |
| **关键前置条件** | ① 必须重写 shortcode(不是 fork webpenson-tools 版本),至少增加:secret/public-key 输入区、篡改模式切换按钮、算法对比面板、Bearer 提取;② 需要 `crypto.subtle` 全异步 API,UI 必须支持 async/await + 错误回显;③ 现有 webpenson-tools 站点已收录 `/tools/jwt-decoder/` 路径,dlsome-top 用新 slug `jwt-inspector`(**不是 jwt-decoder**),明确内部品牌差异化 + canonical 关系(见 §5.1);④ 红线:**绝不把 secret 发送到任何服务器**(全程本地),所有签名 / 验证均在 `crypto.subtle` 内完成。 |

---

## 1. SEO 关键词与长尾定位 (SEO Keywords & Long-tail Targeting)

### 1.1 主关键词 (Primary Keyword)

**`jwt inspector`**(字符数 14,exact match,放在 H1、Title、URL slug、Meta description 第一位)

> 备选: `jwt debugger`(字符数 13)— 月搜索量高(8K–18K),intent 与工具定位更贴切("调试"比"解码"更贴近开发者 workflow)。
>
> **最终策略:**
> - **页面主推词**:`jwt inspector`(品牌差异化用词,竞品大量使用 "decoder" "parser",dlsome-top 用 "inspector" 显式区分开发者调试视角)
> - **Title 同时包含三个词**:`JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier`(SERP 中 jwt inspector + jwt debugger + verifier 三 head term 都命中)
> - **Slug** 用 `jwt-inspector`(短、清晰、与 webpenson-tools `jwt-decoder` 通过 slug 立刻区分)

### 1.2 长尾关键词 (Long-tail,10 个,覆盖 PAA / 验证 / 攻击 / 算法 / 调试五类意图)

| # | Long-tail keyword | 意图 | 推荐落位 |
|---|---|---|---|
| 1 | `jwt signature verifier online` | 工具型 / 验证 | Title + Meta + intro + H2 §3 |
| 2 | `verify jwt hs256 secret` | 工具型 / HMAC | H2 §4 + FAQ Q2 |
| 3 | `verify jwt with public key rs256` | 工具型 / RSA | H2 §5 + FAQ Q3 |
| 4 | `jwt tamper test exp claim` | 攻击型 / 红队 | H2 §6 "Claim Tampering" + FAQ Q4 |
| 5 | `jwt algorithm confusion attack none alg` | 安全型 / CVE-2015-9235 | H2 §7 "Algorithm Confusion" + FAQ Q5 |
| 6 | `decode jwt header payload signature` | 信息型 / PAA | H2 §2 + FAQ Q1 |
| 7 | `jwt claims list rfc 7519` | 信息型 / 标准 | H2 §8 "RFC 7519 Registered Claims" |
| 8 | `bearer token extractor from curl` | 工具型 / 调试 | H2 §9 "Bearer Token Extraction" |
| 9 | `jwt kid header x5t verification` | 信息型 / JWKS | H2 §10 "JWKS & kid Header" |
| 10 | `jwt debugging auth0 cognito firebase` | 平台型 / 集成 | H2 §11 "Platform Debugging" |

### 1.3 搜索意图 (Target Search Intent)

- **主意图: Transactional / Tool**(占比 ~55%)— 用户想"在线验证 / 解码 / 篡改 JWT"(粘性高,搜索后立即操作)
- **副意图: Informational**(占比 ~30%)— 用户想"理解 JWT 结构 / RFC 7519 claims / 算法差异"(学习导向)
- **三意图: Diagnostic**(占比 ~10%)— 用户在排查"为什么我的 token 被服务器拒绝"(debugging 导向)
- **四意图: Security research**(占比 ~5%)— 用户在做渗透测试 / 红队演练,寻找"alg=none 攻击 / 篡改模拟"工具

### 1.4 竞争分析 — vs 主要竞品

| 对比项 | jwt.io (Auth0) | jwt-debugger (Red Hat) | jsonwebtoken (jwt.io 衍生)| **dlsome.top jwt-inspector** |
|---|---|---|---|---|
| Header + Payload 解码 | ✓ | ✓ | ✓ | ✓ |
| Signature 真实验证 (HS256) | ✓ | ✓ | ✓ | **✓(本地 `crypto.subtle`)** |
| Signature 真实验证 (RS256 / ES256) | ✓ | ✓ | ✓ | **✓(`crypto.subtle` + SPKI/PKCS8 解析)** |
| Claim 篡改 + 重签名 | ✗ | ✗ | ✗ | **✓(HS256 任意 claim 修改 + 自动重签)** |
| alg=none 攻击视角 | 隐藏 | 隐藏 | 隐藏 | **✓(显式警告 + 演示)** |
| 多算法同时验证 | ✗ | ✗ | ✗ | **✓(同一 token 并行 HS256/RS256/ES256)** |
| Bearer token 自动剥离 | ✗ | ✗ | ✗ | **✓(从 curl / fetch header 提取)** |
| RFC 7519 registered claims 解释 | 部分 | 部分 | 部分 | **✓(完整 7 个 registered claims 语义 + 自定义 claims 提示)** |
| 敏感字段自动遮蔽 (password / secret) | ✗ | ✗ | ✗ | **✓(黑名单字段名列表,UI 渲染时遮蔽)** |
| exp / nbf / iat 倒计时 | 部分 | ✗ | ✗ | **✓(实时 "expires in X min" 显示)** |
| 客户端处理(零上传)| ✓ | ✓ | ✓ | ✓(同) |
| 现代 UX / Dark mode | ✓ | 部分 | 部分 | **✓(PaperMod .dark 集成)** |
| 中文界面 | ✗ | ✗ | ✗ | **✓(zh + en 双语)** |
| 上次更新 | 持续 | 2018 停更 | 持续 | 2026-07 |

**结论:** jwt.io 是"JWT 工具的事实标准"(强 SEO 护城河,**不要正面竞争**)。dlsome-top 切的是 **claim 篡改 + 算法对比 + Bearer 提取 + 敏感字段遮蔽**这四个完全不同的细分市场 —— 这部分 jwt.io **完全不做**(出于安全考虑甚至主动屏蔽),jwt-debugger 已经停更。**这是真正的蓝海切入点**(尤其是红队 / 安全研究细分)。

---

## 2. 标题与元描述 (Title & Meta Description)

### 2.1 Title 选项

| 选项 | 内容 | 字符数 | 评估 |
|---|---|---|---|
| **A** | `JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier` | **58** | 三词命中 inspector + debugger + verifier,算法缩写堆叠,精准切开发者搜索意图 |
| **B** | `JWT Inspector — Decode, Verify, Tamper-Test Any Token` | **53** | 三动词直接,强调开发者 workflow(解码 → 验证 → 篡改),CTR 优化 |
| **C** | `JWT Debugger with Signature Verification & Claim Tampering` | **58** | 描述性,PAA 触发,但弱化品牌差异化 |

### 2.2 Meta Description 选项

| 选项 | 内容 | 字符数 |
|---|---|---|
| **A** | `JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer token auto-extraction. 100% client-side.` | **163** ⚠️ 略超 |
| **A 修订** | `JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side.` | **146** ✅ |
| **B** | `Debug any JWT: decode header & payload, verify HS256 / RS256 / ES256 signatures with secret or public key, simulate claim tampering (exp / iat / nbf). No upload.` | **169** ⚠️ 略超 |
| **B 修订** | `Debug any JWT: decode header & payload, verify HS256/RS256/ES256 with secret or public key, simulate claim tampering. No upload.` | **132** ✅ |

### 2.3 推荐选择 (Recommended)

**Title: A + Meta Description: A 修订**

理由:Title A 三词命中 + 算法堆叠,SERP 字符 58 完美(Google 截断 60 内);Meta A 修订版按"能力列表"组织,直接告诉搜索引擎和用户"这个工具能做什么" —— HS256 / RS256 / ES256、签名验证、claim 篡改、RFC 7519、Bearer 提取全部入 Meta,PAA / 验证 / 攻击 / 算法 / 调试五类长尾全部命中。字数 146 在 155 限制内。

---

## 3. 内容结构 (Content Structure — H2 Sections)

> **实现备注:** Hugo PaperMod 默认 H1 来自 frontmatter `title:`。Body 推荐使用 H2 作为主章节(SEO 友好),内部子节用 H3。本策略沿用 dlsome-top 现有 `cron-parser` 的 H2 习惯(11 节 + FAQ),与 webpenson-tools 的 H3-as-top-level 风格刻意区分。

### §3.1 H2 大纲(共 12 节,含 1 个 FAQ)

| # | H2 标题 | 描述 (2-3 句) |
|---|---|---|
| 1 | **What Is a JWT Inspector?** | 定义 JWT(三个 base64url 部分 + dot 分隔)与"inspector vs decoder"的差异 —— inspector 是开发者调试视角,decoder 只是普通用户解析视角。给出 1 个真实 example token(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` = RFC 7519 官方 example)。 |
| 2 | **How to Use This JWT Inspector** | 三步教程:① 粘贴 token(可粘贴完整 `Authorization: Bearer ...` 头)② 选验证模式(none / HS256 secret / RS256 public key)③ 看 decoded view + tamper-test 按钮。建议配 1 张截图(GIF/PNG)展示 debug console 风格 UI。 |
| 3 | **JWT Signature Verification (HS256 / RS256 / ES256)** | 核心差异化节。介绍三种算法的签名验证:`crypto.subtle.verify()` 异步调用流程,HMAC(对称 secret)、RSA(SPKI public key)、ECDSA(P1363 ↔ DER 编码转换)。每个算法 1 段 + 1 个失败场景示例。 |
| 4 | **HS256: Verify with Secret** | HS256 专属节。展示对称 secret 验证流程,secret 输入框(password type,本地仅存内存),验证成功/失败的视觉反馈。引用 RFC 7518 §3.2。 |
| 5 | **RS256 / ES256: Verify with Public Key** | 非对称节。展示 SPKI PEM 解析(`-----BEGIN PUBLIC KEY-----` 块),`crypto.subtle.importKey('spki', ...)` 流程。ECDSA 特别说明 P1363 vs DER signature encoding(开发者常见坑)。 |
| 6 | **Claim Tampering & Re-signing** | **杀手锏差异化**。展示篡改模拟:点击 "Edit exp" → 修改 Unix timestamp → 工具用输入的 secret 自动重签 → 生成"伪造 token"。明确标注 "FOR DEBUGGING / RED TEAM USE ONLY" 警告横幅。 |
| 7 | **Algorithm Confusion & `alg=none` Attack** | 安全视角节。展示 alg confusion 攻击原理(HS256 token 被服务器用 RS256 public key 当 secret 验证 → 签名绕过)。工具提供 "Force alg=none verify" 演示按钮,显式警告 CVE-2015-9235。 |
| 8 | **RFC 7519 Registered Claims (iss / sub / aud / exp / nbf / iat / jti)** | 7 个 registered claims 速查表:每个 claim 的语义 + 类型 + 示例值 + 验证规则(`exp` 已过期 → invalid;`nbf` 未到 → not yet valid;`aud` 不匹配 → wrong audience)。 |
| 9 | **Bearer Token Auto-Extraction** | 调试工作流节。粘贴 `Authorization: Bearer eyJ...` curl header / fetch request / Postman raw HTTP → 工具自动用 regex 剥离 Bearer prefix + 取 JWT,无需手动删字符串。 |
| 10 | **JWKS, kid Header, and Key Rotation** | 高级节。解释 `kid` (Key ID) header 字段,工具演示如何从 JWKS endpoint(如 `https://auth.example.com/.well-known/jwks.json`)拉公钥(注:仅当用户主动触发;**默认不发起外部请求**)。 |
| 11 | **Platform Debugging: Auth0 / Cognito / Firebase / Okta** | 集成视角节。每个 IdP 1 段:典型 token 结构 + 验证方式 + 常见调试误区(例:Auth0 RS256 vs HS256 切换需要 explicit `alg` in JWKS)。 |
| 12 | **Frequently Asked Questions (FAQ)** | 7 个 Q&A 完整对(下面 §3.2 verbatim)。 |
| 13 | **Related DevTools** | 内部链接集群 —— 引导到 `cron-parser`、`http-header-inspector`、`yaml-to-json`、`json-to-typescript`,以及 webpenson-tools 兄弟工具 `jwt-decoder`。 |

### §3.2 FAQ 完整文本 (7 Q&A,内容 agent 必须 verbatim 使用)

> 以下 Q&A 是 §4 JSON-LD FAQPage schema 的 verbatim 来源。内容 agent 不得修改文字,只能添加段落包装。

**Q1. What is the difference between a JWT decoder and a JWT inspector?**
A **JWT decoder** is a basic tool that base64url-decodes the three parts of a JSON Web Token (Header, Payload, Signature) and shows them as JSON. A **JWT inspector** goes further: it actually **verifies the signature** against a provided secret or public key, flags RFC 7519 standard claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`), simulates claim tampering for red-team testing, auto-extracts Bearer tokens from HTTP headers, and warns about algorithm confusion attacks (`alg=none`). Use a decoder for casual reading; use an inspector when you are debugging authentication, integrating with Auth0/Cognito/Firebase, or running security audits.

**Q2. How do I verify a JWT signed with HS256?**
HS256 (HMAC-SHA-256) is a symmetric algorithm: the same secret signs and verifies. To verify, paste your JWT into the inspector, select the **HS256** algorithm tab, enter the shared secret in the password field (it stays in your browser's memory and is never sent anywhere), and click **Verify**. The inspector calls `crypto.subtle.verify('HMAC', importedKey, signatureBytes, signedData)` and shows ✓ valid or ✗ invalid with the specific failure reason. If the JWT was signed with HS256 but the server rejects it, the secret is wrong or the algorithm in the JWT header is mismatched.

**Q3. How do I verify a JWT signed with RS256 or ES256?**
**RS256** (RSA-SHA-256) and **ES256** (ECDSA-P-256) are asymmetric: the server signs with a private key and publishes a public key for verification. To verify, paste your JWT, select **RS256** or **ES256**, and paste the **SPKI-formatted public key** (starts with `-----BEGIN PUBLIC KEY-----`, not `BEGIN RSA PUBLIC KEY` which is PKCS#1 and needs conversion). The inspector imports the key with `crypto.subtle.importKey('spki', keyBytes, { name: 'RSASSA-PKCS1-v1_5' }, false, ['verify'])` and verifies. **ECDSA gotcha:** JWS uses fixed-length P1363 signature encoding (R || S), but some libraries emit DER; the inspector auto-detects and converts.

**Q4. Can I test what happens if an attacker tampers with a JWT?**
Yes — that is the primary use case for the dlsome.top JWT Inspector's tamper mode. Click **Edit exp** (or any other claim), change the value (e.g., set `exp` to `9999999999` to simulate an immortal token), enter the signing secret in HS256 mode, and click **Re-sign**. The tool generates a new JWT with your modified claims and a valid signature — paste it into your server's verification endpoint to confirm your auth layer actually rejects it. **For debugging and red-team use only.** Never use this technique against systems you do not own.

**Q5. What is the `alg=none` algorithm confusion attack?**
CVE-2015-9235: some JWT libraries accept a token with `{"alg":"none"}` in the header and skip signature verification entirely. An attacker takes a legitimate token, changes the header `alg` to `none`, removes the signature part, and the server accepts it as valid. The dlsome.top inspector flags any token with `alg=none` with a red ⚠ badge and shows what the attack payload would look like. The fix: explicitly enforce an algorithm allow-list on your server (e.g., `[RS256]` only) and reject `none` and any algorithm not on the list. A related attack is **HS256/RS256 confusion**: the attacker takes an RS256 public key, signs a malicious token with HS256 using that public-key bytes as the HMAC secret, and a misconfigured server uses the same public key for both RSA-verify and HMAC-verify.

**Q6. What are the standard registered claims in RFC 7519?**
RFC 7519 defines seven registered claims, all three-letter abbreviations: **`iss`** (issuer — who issued the token, e.g., `https://auth.example.com`), **`sub`** (subject — who the token is about, typically a user ID), **`aud`** (audience — who the token is intended for, e.g., `https://api.example.com`), **`exp`** (expiration time — Unix timestamp, after which the token MUST be rejected), **`nbf`** (not before — Unix timestamp, the token is invalid before this time), **`iat`** (issued at — Unix timestamp of issuance, for token-age calculations), **`jti`** (JWT ID — unique identifier to prevent replay attacks). Custom claims are allowed and typically namespaced (`https://example.com/role`, `user_id`, etc.). The inspector highlights all seven registered claims in a dedicated panel with type checking and time-remaining countdowns for `exp` and `nbf`.

**Q7. Is it safe to paste my JWT into an online inspector?**
Only if the tool runs **100% client-side** in your browser (the dlsome.top JWT Inspector does — no token is ever sent to any server). Look for these indicators: ① the tool page loads with all JS inlined or from the same origin, no `<script src="https://cdn...">` external references; ② opening DevTools → Network tab while using the tool shows zero outbound POST/PUT requests carrying your token; ③ the site is served over HTTPS with HSTS, so even the page itself is not tampered with in transit. **Even with client-side tools, never paste production tokens with long-lived sessions or sensitive scopes** — use a fresh dev/staging token, or mint a new short-lived token (`exp` in 5 minutes) for debugging purposes.

---

## 4. JSON-LD Schema (4 个 Schema)

### §4.1 WebApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier",
  "alternateName": "dlsome.top JWT Inspector",
  "url": "https://dlsome.top/tools/jwt-inspector/",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "Security & Authentication Tool",
  "operatingSystem": "Any (browser-based, HTTPS required for crypto.subtle)",
  "browserRequirements": "Requires JavaScript. Requires HTML5. Requires Web Crypto API (crypto.subtle). Requires HTTPS or localhost.",
  "inLanguage": ["en", "zh"],
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free developer-grade JWT inspector and debugger. Decode JSON Web Tokens, verify HS256 / RS256 / ES256 signatures with real cryptographic validation (no token upload), simulate claim tampering for red-team testing, auto-extract Bearer tokens from HTTP headers, and flag algorithm confusion attacks (alg=none, HS/RS confusion). RFC 7519 compliant. 100% client-side, Web Crypto API based.",
  "softwareVersion": "1.0.0",
  "featureList": [
    "Decode JWT Header, Payload, and Signature as formatted JSON",
    "Verify HS256 (HMAC-SHA-256) signatures with a provided secret",
    "Verify RS256 (RSA-SHA-256) signatures with an SPKI public key",
    "Verify ES256 (ECDSA-P-256) signatures with an SPKI public key (auto P1363 ↔ DER)",
    "Edit any claim (exp / iat / nbf / sub / aud / iss) and auto re-sign for HS256",
    "Detect and warn about alg=none algorithm confusion attacks (CVE-2015-9235)",
    "Detect and warn about HS256 / RS256 algorithm confusion attacks",
    "Auto-extract Bearer token from Authorization header / curl / fetch / Postman raw HTTP",
    "Display RFC 7519 registered claims (iss / sub / aud / exp / nbf / iat / jti) with type validation",
    "Show exp / nbf countdown timers in real time",
    "Mask sensitive custom claims (password / secret / token / api_key) in the UI",
    "Side-by-side multi-algorithm verification (same token, HS256 vs RS256 vs ES256)",
    "JWKS endpoint support for kid-based key lookup (opt-in only, no auto-fetch)",
    "Mobile-friendly responsive layout",
    "Dark / light mode (PaperMod .dark class integration)",
    "No login, no registration, no telemetry, no token upload",
    "100% client-side execution via Web Crypto API (crypto.subtle)"
  ],
  "isBasedOn": [
    "https://datatracker.ietf.org/doc/html/rfc7519",
    "https://datatracker.ietf.org/doc/html/rfc7515",
    "https://datatracker.ietf.org/doc/html/rfc7518",
    "https://nvd.nist.gov/vuln/detail/CVE-2015-9235",
    "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/",
    "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto"
  ]
}
```

### §4.2 FAQPage Schema (verbatim 来自 §3.2)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between a JWT decoder and a JWT inspector?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A JWT decoder is a basic tool that base64url-decodes the three parts of a JSON Web Token (Header, Payload, Signature) and shows them as JSON. A JWT inspector goes further: it actually verifies the signature against a provided secret or public key, flags RFC 7519 standard claims (iss, sub, aud, exp, nbf, iat, jti), simulates claim tampering for red-team testing, auto-extracts Bearer tokens from HTTP headers, and warns about algorithm confusion attacks (alg=none). Use a decoder for casual reading; use an inspector when you are debugging authentication, integrating with Auth0/Cognito/Firebase, or running security audits."
      }
    },
    {
      "@type": "Question",
      "name": "How do I verify a JWT signed with HS256?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HS256 (HMAC-SHA-256) is a symmetric algorithm: the same secret signs and verifies. To verify, paste your JWT into the inspector, select the HS256 algorithm tab, enter the shared secret in the password field (it stays in your browser's memory and is never sent anywhere), and click Verify. The inspector calls crypto.subtle.verify('HMAC', importedKey, signatureBytes, signedData) and shows a checkmark for valid or an X for invalid with the specific failure reason. If the JWT was signed with HS256 but the server rejects it, the secret is wrong or the algorithm in the JWT header is mismatched."
      }
    },
    {
      "@type": "Question",
      "name": "How do I verify a JWT signed with RS256 or ES256?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RS256 (RSA-SHA-256) and ES256 (ECDSA-P-256) are asymmetric: the server signs with a private key and publishes a public key for verification. To verify, paste your JWT, select RS256 or ES256, and paste the SPKI-formatted public key (starts with -----BEGIN PUBLIC KEY-----, not BEGIN RSA PUBLIC KEY which is PKCS#1 and needs conversion). The inspector imports the key with crypto.subtle.importKey('spki', keyBytes, { name: 'RSASSA-PKCS1-v1_5' }, false, ['verify']) and verifies. ECDSA gotcha: JWS uses fixed-length P1363 signature encoding (R || S), but some libraries emit DER; the inspector auto-detects and converts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I test what happens if an attacker tampers with a JWT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — that is the primary use case for the dlsome.top JWT Inspector's tamper mode. Click Edit exp (or any other claim), change the value (e.g., set exp to 9999999999 to simulate an immortal token), enter the signing secret in HS256 mode, and click Re-sign. The tool generates a new JWT with your modified claims and a valid signature — paste it into your server's verification endpoint to confirm your auth layer actually rejects it. For debugging and red-team use only. Never use this technique against systems you do not own."
      }
    },
    {
      "@type": "Question",
      "name": "What is the alg=none algorithm confusion attack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CVE-2015-9235: some JWT libraries accept a token with {\"alg\":\"none\"} in the header and skip signature verification entirely. An attacker takes a legitimate token, changes the header alg to none, removes the signature part, and the server accepts it as valid. The dlsome.top inspector flags any token with alg=none with a red warning badge and shows what the attack payload would look like. The fix: explicitly enforce an algorithm allow-list on your server (e.g., [RS256] only) and reject none and any algorithm not on the list. A related attack is HS256/RS256 confusion: the attacker takes an RS256 public key, signs a malicious token with HS256 using that public-key bytes as the HMAC secret, and a misconfigured server uses the same public key for both RSA-verify and HMAC-verify."
      }
    },
    {
      "@type": "Question",
      "name": "What are the standard registered claims in RFC 7519?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RFC 7519 defines seven registered claims, all three-letter abbreviations: iss (issuer — who issued the token, e.g., https://auth.example.com), sub (subject — who the token is about, typically a user ID), aud (audience — who the token is intended for, e.g., https://api.example.com), exp (expiration time — Unix timestamp, after which the token MUST be rejected), nbf (not before — Unix timestamp, the token is invalid before this time), iat (issued at — Unix timestamp of issuance, for token-age calculations), jti (JWT ID — unique identifier to prevent replay attacks). Custom claims are allowed and typically namespaced (https://example.com/role, user_id, etc.). The inspector highlights all seven registered claims in a dedicated panel with type checking and time-remaining countdowns for exp and nbf."
      }
    },
    {
      "@type": "Question",
      "name": "Is it safe to paste my JWT into an online inspector?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only if the tool runs 100% client-side in your browser (the dlsome.top JWT Inspector does — no token is ever sent to any server). Look for these indicators: 1) the tool page loads with all JS inlined or from the same origin, no <script src=\"https://cdn...\"> external references; 2) opening DevTools Network tab while using the tool shows zero outbound POST/PUT requests carrying your token; 3) the site is served over HTTPS with HSTS, so even the page itself is not tampered with in transit. Even with client-side tools, never paste production tokens with long-lived sessions or sensitive scopes — use a fresh dev/staging token, or mint a new short-lived token (exp in 5 minutes) for debugging purposes."
      }
    }
  ]
}
```

### §4.3 BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dlsome.top/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://dlsome.top/tools/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "JWT Inspector",
      "item": "https://dlsome.top/tools/jwt-inspector/"
    }
  ]
}
```

### §4.4 第四个 Schema: HowTo (核心操作步骤)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to inspect and verify a JSON Web Token",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Paste your JWT (or full Bearer header)",
      "text": "Copy a token from your application's localStorage, a curl Authorization header, or a Postman response. The inspector auto-detects: a raw eyJ... string is parsed as JWT; a 'Authorization: Bearer ...' block is auto-stripped to extract the JWT; a full HTTP request dump is scanned for the Bearer prefix."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Review the decoded Header and Payload",
      "text": "The inspector shows the header (alg, typ, kid) and payload (claims) as formatted JSON. RFC 7519 registered claims (iss / sub / aud / exp / nbf / iat / jti) are highlighted in a dedicated panel with type checking. The exp and nbf claims show real-time countdowns (e.g., 'expires in 23 min')."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Verify the signature",
      "text": "Select the algorithm (HS256 / RS256 / ES256) from the dropdown. For HS256, enter the shared secret. For RS256/ES256, paste the SPKI public key (PEM block starting with -----BEGIN PUBLIC KEY-----). Click Verify. The inspector uses crypto.subtle.verify() and shows a green checkmark for valid or a red X with the specific failure reason."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Optionally simulate claim tampering",
      "text": "Click Edit on any claim (exp / iat / nbf / sub / aud), change its value (e.g., extend exp to 9999999999), enter the HS256 secret, and click Re-sign. The tool generates a new JWT with the modified claims and a valid signature — useful for red-team exercises and verifying your server rejects forged tokens. A red warning banner reminds you this is for debugging only."
    }
  ]
}
```

> **为什么用 HowTo?** 本工具确实是分步操作(粘贴 → 解码 → 验证 → 篡改),HowTo schema 能让 Google SERP 直接展示步骤编号,CTR 显著高于无结构化数据的页面。cron-parser 与 ai-prompt-helper 已用 HowTo,本工具沿用保持一致。

---

## 5. SEO 元素 (SEO Elements)

### 5.1 Canonical URL 与跨站策略

dlsome-top `/tools/jwt-inspector/` 与 webpenson-tools `/tools/jwt-decoder/` **slug 不同**(刻意差异化:`inspector` vs `decoder`)。**两者互相独立,不互设 canonical**(各自品牌独立)。各自的 canonical:

```html
<!-- dlsome.top 英文版 -->
<link rel="canonical" href="https://dlsome.top/tools/jwt-inspector/" />

<!-- dlsome.top 中文版 -->
<link rel="canonical" href="https://dlsome.top/zh/tools/jwt-inspector/" />

<!-- hreflang 三语标签 -->
<link rel="alternate" hreflang="en" href="https://dlsome.top/tools/jwt-inspector/" />
<link rel="alternate" hreflang="zh-Hans" href="https://dlsome.top/zh/tools/jwt-inspector/" />
<link rel="alternate" hreflang="x-default" href="https://dlsome.top/tools/jwt-inspector/" />
```

> **跨站协调建议(给 dlsome-top 主页 owner):** 在 dlsome-top 主页加一行 "由 webpenson.com 提供技术支持" 性质的 footer link(从 webpenson-tools 站点反过来 link 到 dlsome-top),有助于两个独立品牌互相引渡权重 + 解决潜在 Google "duplicate content across same operator" 疑虑。同时在 webpenson-tools 的 `/tools/jwt-decoder/` 页面 "Related Tools" 区块加一行 → "Need to verify signatures and test claim tampering? Try the developer-grade JWT Inspector on dlsome.top"。

### 5.2 Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier" />
<meta property="og:description" content="JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side." />
<meta property="og:url" content="https://dlsome.top/tools/jwt-inspector/" />
<meta property="og:site_name" content="dlsome.top" />
<meta property="og:image" content="https://dlsome.top/og-images/jwt-inspector.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="zh_CN" />
```

> **OG image 制作要求:** 1200×630 PNG,左半屏 debug console 风格 UI 截图(显示 decoded Header + Payload + Verify 按钮),右半屏大字 "Free JWT Inspector" + 三个算法徽章(HS256 / RS256 / ES256)+ 品牌 dlsome.top logo。Content agent 须生成对应图并放到 `/static/og-images/jwt-inspector.png`。

### 5.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@dlsometop" />
<meta name="twitter:creator" content="@dlsometop" />
<meta name="twitter:title" content="JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier" />
<meta name="twitter:description" content="Debug any JWT: decode header & payload, verify HS256/RS256/ES256 with secret or public key, simulate claim tampering. No upload." />
<meta name="twitter:image" content="https://dlsome.top/og-images/jwt-inspector.png" />
<meta name="twitter:image:alt" content="JWT Inspector debug console showing decoded header, payload, signature verification panel, and tamper-test controls" />
```

### 5.4 内部链接建议 (Internal Linking Suggestions)

| 源页面 (Source) | 锚文本 | 目标页面 (Target) |
|---|---|---|
| `content/tools/cron-parser.en.md` §"Related DevTools" 区块 | "debugging signed tokens? check the **JWT Inspector**" | `/tools/jwt-inspector/` |
| `content/tools/yaml-to-json.en.md` §"Related" 区块 | "parse Kubernetes ServiceAccount JWT manifests with the **JWT Inspector**" | `/tools/jwt-inspector/` |
| `content/tools/json-to-typescript.en.md` §"Related" 区块 | "generate TypeScript types for decoded JWT payloads with **json-to-typescript**" | `/tools/json-to-typescript/`(反向 link) |
| `content/tools/markdown-html-converter.en.md` §"Related" 区块 | "render JWT debugging runbooks with the **markdown HTML converter**" | `/tools/markdown-html-converter/` |
| `/tools/` index page(若存在) | 卡片标题 "JWT Inspector" | `/tools/jwt-inspector/` |
| `jwt-inspector.md` §13 "Related DevTools" | 反向链接到 `cron-parser` / `yaml-to-json` / `json-to-typescript` / `markdown-html-converter` | 同上 |

**跨站反向链接(本页面 → webpenson-tools):**

- §2 "How to Use" 区块 → "for casual decoding without verification, see the lightweight jwt-decoder on webpenson.com"
- §13 "Related DevTools" → `/tools/jwt-decoder/`(跨站 link 到通用版)

**反向链接(本页面 → 其他页面):**

- §9 "Bearer Token Extraction" 区块可内联链接到 `cron-parser`(展示调试用 mock JWT)
- §11 "Platform Debugging" 区块强链接到 `yaml-to-json`(导出 JWKS YAML 给 K8s 用)
- §13 "Related DevTools" 区块 → 5 个站内 + 1 个跨站工具

### 5.5 其他技术 SEO

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="author" content="dlsome.top" />
<meta name="theme-color" content="#0f172a" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
```

---

## 6. 技术实现方案 (Technical Approach)

### 6.1 工具功能定义

**输入:** 一个 JWT string(可为裸 token,也可为完整 `Authorization: Bearer ...` 头,或完整 curl / fetch / HTTP 请求块)

**输出(分模块):**
1. **Decoded Header + Payload** — base64url 解码 → 格式化 JSON,带 syntax highlighting
2. **Signature verification panel** — 算法选择下拉(HS256 / RS256 / ES256)+ secret/key 输入框 + Verify 按钮 → ✓ / ✗ 反馈
3. **Claim inspector** — 7 个 RFC 7519 registered claims 高亮 + 自定义 claims 列表 + 敏感字段遮蔽
4. **Time-remaining countdown** — `exp` 和 `nbf` 实时倒计时(expires in X min / expired X min ago)
5. **Claim tamper editor** — Edit 按钮 + 重签名按钮(HS256 only)+ Re-sign 按钮
6. **Algorithm confusion panel** — alg=none 警告 + HS/RS confusion 演示按钮
7. **Bearer auto-extract** — 输入框接受任意含 JWT 的字符串,regex 自动剥离
8. **Multi-algorithm compare** — 同一 token 并行 HS256 + RS256 + ES256 验证结果并列展示
9. **JWKS kid lookup**(可选)— 用户点击 "Fetch JWKS" 输入 endpoint URL → 工具 fetch 公钥数组 → 按 kid 选择

### 6.2 架构(单组件,纯客户端)

```
┌─────────────────────────────────────────────────────┐
│  Client Browser (Hugo 静态页面, HTTPS only)          │
│  ┌───────────────────────────────────────────────┐  │
│  │ {{< jwt-inspector >}} shortcode (NEW, not fork) │  │
│  │ - HTML form (token input + algorithm select)  │  │
│  │ - 内联 CSS (~280 行)                           │  │
│  │ - 内联 JS (~650 行)                            │  │
│  │   └─ base64url decoder (URL-safe base64)      │  │
│  │   └─ Bearer token extractor (regex)           │  │
│  │   └─ RFC 7519 claim type validator             │  │
│  │   └─ crypto.subtle HMAC verify (HS256)         │  │
│  │   └─ crypto.subtle RSA verify (RS256)          │  │
│  │   └─ crypto.subtle ECDSA verify (ES256)        │  │
│  │       └─ P1363 ↔ DER converter (~80 行)        │  │
│  │   └─ crypto.subtle HMAC sign (re-sign)         │  │
│  │   └─ Algorithm confusion detector              │  │
│  │   └─ Multi-algorithm parallel verify           │  │
│  │   └─ Sensitive claim masker                    │  │
│  │   └─ exp/nbf countdown ticker (setInterval)    │  │
│  │   └─ Optional JWKS fetcher (opt-in fetch)      │  │
│  └───────────────────────────────────────────────┘  │
│  内嵌 assets:                                         │
│    - Sensitive field black-list JSON (~2KB)          │
│    - Algorithm registry JSON (~3KB)                  │
│    - 7 RFC 7519 registered claim specs (~2KB)        │
└─────────────────────────────────────────────────────┘
   │
   └─ 严格 HTTPS-only (crypto.subtle 不可用于 file:// / http://)
```

### 6.3 与 webpenson-tools 版本的差异化(关键)

| 能力 | webpenson-tools jwt-decoder | dlsome-top jwt-inspector |
|---|---|---|
| Header + Payload 解码 | ✓ | ✓ |
| Signature 真实验证 (HS256) | ✗ | **✓(`crypto.subtle.verify`)** |
| Signature 真实验证 (RS256) | ✗ | **✓(SPKI PEM 解析 + `crypto.subtle.importKey`)** |
| Signature 真实验证 (ES256) | ✗ | **✓(P1363 ↔ DER 自动转换)** |
| Claim 篡改 + 重签名 | ✗ | **✓(任意 claim 修改 + `crypto.subtle.sign`)** |
| alg=none 攻击警告 | ✗ | **✓(CVE-2015-9235 显式标注)** |
| HS256 / RS256 confusion 演示 | ✗ | **✓(并行验证 + 攻击 payload 展示)** |
| Bearer 自动剥离 | ✗ | **✓(regex from Authorization header / curl / Postman)** |
| 多算法同时验证 | ✗ | **✓(HS256 + RS256 + ES256 并排)** |
| 敏感字段遮蔽 | ✗ | **✓(password / secret / api_key 黑名单)** |
| exp / nbf 倒计时 | ✗ | **✓(实时 setInterval ticker)** |
| JWKS kid lookup | ✗ | **✓(opt-in fetch,默认不发起请求)** |
| 内容深度 | 4 节 + 2 FAQ | **13 节 + 7 FAQ + 4 JSON-LD schema** |
| 双语 | ✗(仅 ZH + 简化 EN)| **✓(完整 zh + en 双语)** |
| 域名 | webpenson.com | dlsome.top(独立品牌)|
| Slug | `jwt-decoder` | `jwt-inspector`(显式差异化)|

### 6.4 签名验证算法细节 (核心实现要点)

**HS256 验证流程:**
```javascript
async function verifyHS256(jwt, secret) {
  const [headerB64, payloadB64, signatureB64] = jwt.split('.');
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64urlDecode(signatureB64);
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  return await crypto.subtle.verify('HMAC', key, signature, data);
}
```

**RS256 验证流程:**
```javascript
async function verifyRS256(jwt, publicKeyPem) {
  const spkiDer = pemToDer(publicKeyPem); // strip PEM headers, base64 decode
  const [headerB64, payloadB64, signatureB64] = jwt.split('.');
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64urlDecode(signatureB64);
  const key = await crypto.subtle.importKey(
    'spki', spkiDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
  );
  return await crypto.subtle.verify(
    { name: 'RSASSA-PKCS1-v1_5' }, key, signature, data
  );
}
```

**ES256 验证流程(P1363 ↔ DER 关键转换):**
```javascript
async function verifyES256(jwt, publicKeyPem) {
  const spkiDer = pemToDer(publicKeyPem);
  const [headerB64, payloadB64, signatureB64] = jwt.split('.');
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sigRaw = base64urlDecode(signatureB64); // P1363: R || S (32+32 bytes for P-256)
  // Some libs emit DER instead — auto-detect by ASN.1 SEQUENCE tag (0x30)
  const sigDer = sigRaw[0] === 0x30 ? sigRaw : p1363ToDer(sigRaw);
  const key = await crypto.subtle.importKey(
    'spki', spkiDer,
    { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']
  );
  return await crypto.subtle.verify(
    { name: 'ECDSA', hash: 'SHA-256' }, key, sigDer, data
  );
}
```

**HS256 重签名流程(用于 tamper 模式):**
```javascript
async function resignHS256(originalJwt, modifiedPayload, secret) {
  const [headerB64] = originalJwt.split('.');
  const newPayloadB64 = base64urlEncode(JSON.stringify(modifiedPayload));
  const data = new TextEncoder().encode(`${headerB64}.${newPayloadB64}`);
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, data);
  return `${headerB64}.${newPayloadB64}.${base64urlEncodeBuffer(sigBuffer)}`;
}
```

**Bearer Token 正则提取:**
```javascript
function extractJwt(input) {
  // 1. 裸 token: 仅匹配三段 base64url
  const bareMatch = input.match(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
  if (bareMatch) return input.trim();
  // 2. Authorization header: Bearer / bearer
  const bearerMatch = input.match(/(?:Bearer|bearer)\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/);
  if (bearerMatch) return bearerMatch[1];
  // 3. 任意位置嵌入
  const inlineMatch = input.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
  return inlineMatch ? inlineMatch[0] : null;
}
```

### 6.5 文件交付清单

| 路径 | 类型 | 说明 |
|---|---|---|
| `content/tools/jwt-inspector.md` | 中文 markdown | Hugo 页面 + frontmatter + `{{< jwt-inspector >}}` shortcode 调用 |
| `content/tools/jwt-inspector.en.md` | 英文 markdown | 同上,英文版 |
| `layouts/shortcodes/jwt-inspector.html` | Hugo shortcode (NEW) | HTML 模板 + 内联 CSS + 内联 JS,**不 fork webpenson-tools 版,全新写** |
| `static/og-images/jwt-inspector.png` | 1200×630 PNG | OG image |
| `static/screenshots/jwt-inspector.png` | 800×600 PNG | §3.1 H2 §2 配图 |
| `layouts/partials/extend_head.html`(更新)| 模板部分 | 添加 jwt-inspector 的 OG / Twitter / canonical / JSON-LD 4 个 schema if-block |
| `README.md`(更新)| 说明文档 | 添加本工具的使用说明 + 算法安全提示 |

### 6.6 依赖与约束符合性

- ❌ 无第三方 CDN(无 jQuery / Bootstrap / Tailwind CDN / `jsrsasign` / `jwt-decode` 等)
- ❌ 无外部 JS 库(无 axios / lodash / moment.js)
- ✅ 所有加密操作走原生 `crypto.subtle` API(浏览器内置,零依赖)
- ✅ 所有 CSS / JS 内联在 shortcode,无外部 HTTP 请求(沿用 dlsome-top 强约束)
- ✅ 与 `cron-parser` / `ai-prompt-helper` 同架构,工程可复用 IIFE / dark mode 处理
- ✅ 强制 HTTPS-only(`crypto.subtle` 不可用于 file:// / http://)
- ✅ secret / private key 永不出浏览器内存,**红线**

---

## 7. 内容语音与风格 (Content Voice & Style)

### 7.1 风格定位

- **开发者术语优先** — 用 "JWT" 而不是 "token";用 "signature verification" 而不是 "checking if it's valid";用 "claim tampering" 而不是 "editing"
- **算法名优先全称 + 缩写** — 第一次出现"HMAC-SHA-256 (HS256)",之后只用 HS256;ECDSA / RSASSA 同样处理
- **代码 > 概念** — 表达"无签名验证"用 `{"alg":"none"}`,不用 "algorithm none attack"
- **诚实标注风险** — §6 / §7 必须说清 "FOR DEBUGGING / RED TEAM USE ONLY" + 攻击演示仅用于自有系统,这是工具信任的核心
- **禁止重复 webpenson-tools 版本的入门语气** — dlsome-top 是"开发者已经熟悉 JWT,只是想要更顺手的验证 + 篡改工具"姿态

### 7.2 目标阅读水平

- **Intermediate-Advanced**(CEFR B2-C1 区间)— Flesch Reading Ease 50-65
- 假设读者懂"JWT 是三个 base64 段"、"OAuth2 用 JWT",但不假设懂 "RS256 vs HS256 选型"、"alg confusion 攻击"
- 第一次出现较窄术语时给一句话括号解释(例: "ECDSA (Elliptic Curve Digital Signature Algorithm, used in ES256)")

### 7.3 章节字数分配 (主 body 1900-2200 词)

| 章节 | 估算词数 |
|---|---|
| §1 What Is a JWT Inspector? | 200 |
| §2 How to Use | 130 |
| §3 JWT Signature Verification (3 算法概述) | 280 |
| §4 HS256: Verify with Secret | 200 |
| §5 RS256 / ES256: Verify with Public Key | 220 |
| §6 Claim Tampering & Re-signing | 200 |
| §7 Algorithm Confusion & alg=none Attack | 220 |
| §8 RFC 7519 Registered Claims | 180 |
| §9 Bearer Token Auto-Extraction | 130 |
| §10 JWKS, kid Header, and Key Rotation | 180 |
| §11 Platform Debugging (Auth0 / Cognito / Firebase / Okta) | 240 |
| §12 FAQ | (含在主 body 内,不重复计)|
| §13 Related DevTools | 60 |
| **总计** | **2040** |

> 显著长于 webpenson-tools 版本(450 词左右)— 这是 dlsome-top 的核心差异化:深度内容 + 算法覆盖 + 安全视角。

### 7.4 双语版本处理

- `jwt-inspector.md`(中文)— 标题、副标题、章节标题、所有正文均为中文;FAQ 用中文翻译版本;JSON-LD FAQPage 的 `text` 字段使用中文译文
- `jwt-inspector.en.md`(英文)— 严格使用上面 §3.2 verbatim 英文 FAQ + §2 Title/Meta 英文版
- 所有英文版本 Q&A 必须 verbatim 复制 §3.2 文字(用于 §4.2 JSON-LD),content agent 不得擅自翻译或释义

---

## 8. ✅ 验收清单 (Acceptance Checklist)

Content agent 提交前必须确认以下全部通过:

### 8.1 内容完整性
- [ ] H1 来自 frontmatter `title:`,body 至少有 13 个 H2(包括 FAQ 节)
- [ ] §3.2 FAQ 7 个 Q&A 文字与本策略文件完全一致(英文版)
- [ ] 中文版 FAQ 用中文翻译,但 Q1-Q7 数量不变
- [ ] 双语 markdown 文件都包含 `{{< jwt-inspector >}}` shortcode 调用
- [ ] §3 / §4 / §5 三算法验证节覆盖 HS256 / RS256 / ES256(三个完整算法)
- [ ] §6 篡改节明确"FOR DEBUGGING / RED TEAM USE ONLY"警告横幅
- [ ] §7 算法混乱节显式提到 CVE-2015-9235
- [ ] §8 RFC 7519 claims 覆盖全部 7 个 registered claims

### 8.2 SEO 元素
- [ ] frontmatter `description:` 严格 146 字符(英文版),135 字符左右(中文版)
- [ ] frontmatter `title:` 严格 58 字符(英文版)
- [ ] canonical 链接正确(英文版 + 中文版各一个)
- [ ] hreflang 三语标签(en / zh-Hans / x-default)正确指向
- [ ] OG + Twitter Card 标签齐全(见 §5.2 / §5.3)
- [ ] 主页 owner 已确认跨站 link 协调方案(见 §5.1)

### 8.3 JSON-LD Schema
- [ ] 4 个 JSON-LD 脚本全部存在:WebApplication / FAQPage / BreadcrumbList / HowTo
- [ ] FAQPage 的 7 个 Q&A 与 §3.2 verbatim 一致(英文字符级一致,中文版用中文译文)
- [ ] BreadcrumbList 三层路径正确:Home > Tools > JWT Inspector
- [ ] HowTo 4 步操作(粘贴 → 解码 → 验证 → 篡改)顺序正确
- [ ] 所有 schema 内嵌在 `extend_head.html` 的 slug-specific if-block 里

### 8.4 技术依赖
- [ ] shortcode HTML 无外部 CDN 引用
- [ ] shortcode HTML 无 `<script src="...">` 外部引用
- [ ] HS256 验证用 `crypto.subtle.verify('HMAC', ...)` 而非自实现 HMAC
- [ ] RS256 验证用 `crypto.subtle.importKey('spki', ...)` 解析 SPKI PEM
- [ ] ES256 验证正确处理 P1363 ↔ DER 编码转换
- [ ] 篡改模式 `crypto.subtle.sign('HMAC', ...)` 能正确重签 HS256 token
- [ ] Bearer 提取正则覆盖裸 token / Authorization header / 嵌入三种情况
- [ ] 敏感字段遮蔽(password / secret / api_key / token / private_key)生效
- [ ] exp / nbf 倒计时 ticker 实时更新

### 8.5 内链
- [ ] §13 Related DevTools 区块包含指向 `cron-parser`、`yaml-to-json`、`json-to-typescript`、`markdown-html-converter` 的链接
- [ ] §13 跨站 link 到 `webpenson.com/tools/jwt-decoder/`(差异化声明)
- [ ] 反向内链:从 `cron-parser.md` / `yaml-to-json.md` 指向本页面
- [ ] 跨站 link:dlsome-top 主页 footer 加一行 → webpenson.com(由 webpenson.com 提供技术支持)

### 8.6 资源文件
- [ ] OG image `/static/og-images/jwt-inspector.png` (1200×630) 已生成
- [ ] 工具截图 `/static/screenshots/jwt-inspector.png` 已生成
- [ ] `README.md` 已添加本工具说明 + 算法安全提示

---

## 9. 📌 交付后的下一步建议 (Post-launch)

> 这些不在本次 2 dev-day 范围,留给后续迭代:

1. **JWE (Encrypted JWT) 支持** — 当前仅 JWS(签名)。JWE 用 JOSE 加密,需要 RSA-OAEP / ECDH-ES + AES-GCM,工具可扩展添加 "decrypt" 模式。
2. **PASETO 替代方案对比** — 业内对 JWT 的批评(过度灵活 → 容易被错配),PASETO 是平台绑定版本(更安全)。工具可添加 "Convert JWT to PASETO v4.local" 演示。
3. **批量 token 验证** — 上传 JSON 数组(每行一个 token),批量验证并输出表格报告(算法 / 验证结果 / exp 倒计时)。适合审计场景。
4. **JWT 测试向量库** — 内置 RFC 7519 附录 A 的官方测试 token(HS256 + RS256 + ES256 各 1 个)+ Google / Auth0 公开 demo token,点击即可加载。
5. **公开 API endpoint** — `POST /api/jwt/verify` (client-side fetch only) 返回 `{ valid, header, payload, exp_in_sec }`。**前提:不接收 secret / public key**(只解码 + 时间校验,签名验证仍在客户端)。
6. **博客内容支撑** — 5 篇配套博客:
   - "The JWT alg=none Vulnerability: 10 Years Later, Still Pwning Servers"
   - "HS256 vs RS256: When to Use Which (With Migration Checklist)"
   - "JWT Confusion Attacks: alg=none, HS/RS Confusion, and kid Injection"
   - "Debugging Auth0 Tokens: A Field Guide for Backend Engineers"
   - "Why We Built a Client-Side JWT Inspector (and You Shouldn't Trust Online Decoders)"

---

## 10. 📋 Strategy Document 版本控制

- **v1.0** (2026-07-23)— 初版,基于任务 brief `jwt-inspector-strategy-task.md` 直接产出
- **v1.1**(待)— 内容 agent 完成 §8 验收清单后,根据实际差异微调
- **v2.0**(未来)— 首批 30 天数据回填(Search Console 点击率、平均排名、长尾词覆盖、跨站 link 效果)

---

**End of Strategy Document.**

> Content agent: 本文档可作为 standalone spec 使用,无需追问。如有发现 frontmatter 字段冲突 / Hugo theme 限制 / 实际 sitemap 与 §4.3 不一致等问题,在产出文件末尾添加 `# Strategy deviation notes:` 章节并提交,**不要**自行调整本文档。