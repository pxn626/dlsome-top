---
title: "JWT Inspector & Debugger — HS256 / RS256 / ES256 Verifier"
description: "JWT inspector for developers. Verify HS256 / RS256 / ES256 signatures, tamper-test claims, decode RFC 7519 headers. Bearer auto-extract. Client-side."
slug: "jwt-inspector"
date: 2026-07-23T00:00:00+00:00
lastmod: 2026-07-24T00:00:00+00:00
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
  image_width: 1200
  image_height: 630
  type: "website"
  url: "https://dlsome.top/tools/jwt-inspector/"
  site_name: "dlsome.top"
  locale: "en_US"
  locale_alternate: "zh_CN"
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
  - json
---

**Security notice:** This tool runs 100% in your browser. JWT, secret, and public key never leave your machine — all cryptographic operations happen client-side via Web Crypto API (`crypto.subtle`). No login, no registration, no telemetry, no server upload.

{{< jwt-inspector >}}

## What Is a JWT Inspector?

[Body — to be filled by webpenson-executor-content in content-impl stage, per strategy §3.1]

## How to Use This JWT Inspector

[Body — 3-step tutorial: paste → select algorithm → verify + tamper-test]

## JWT Signature Verification (HS256 / RS256 / ES256)

[Body — three-algorithm overview]

## HS256: Verify with Secret

[Body — symmetric secret verification deep dive]

## RS256 / ES256: Verify with Public Key

[Body — SPKI PEM parsing + P1363 ↔ DER encoding]

## Claim Tampering & Re-signing

[Body — **FOR DEBUGGING / RED TEAM USE ONLY**, never tamper with tokens against systems you do not own]

## Algorithm Confusion & alg=none Attack

[Body — CVE-2015-9235 + HS/RS confusion]

## RFC 7519 Registered Claims

[Body — iss / sub / aud / exp / nbf / iat / jti reference table]

## Bearer Token Auto-Extraction

[Body — paste curl / Postman raw HTTP, tool auto-strips Authorization header]

## JWKS, kid Header, and Key Rotation

[Body — opt-in fetch JWKS endpoint, no auto-fetch]

## Platform Debugging (Auth0 / Cognito / Firebase / Okta)

[Body — IdP token structure + verification + common debugging pitfalls]

## Frequently Asked Questions (FAQ)

[Body — 7 Q&A verbatim from strategy §3.2, JSON-LD FAQPage in extend_head.html]

## Related DevTools

- **[Cron Expression Parser](https://dlsome.top/tools/cron-parser/)** — debug scheduled token refresh jobs (`0 */6 * * *` to mint a new JWT every 6 hours).
- **[YAML to JSON](https://dlsome.top/tools/yaml-to-json/)** — convert Kubernetes ServiceAccount JWT manifests to JSON for API deployment.
- **[JSON to TypeScript](https://dlsome.top/tools/json-to-typescript/)** — generate TypeScript types for decoded JWT payload claims.
- **[Markdown HTML Converter](https://dlsome.top/tools/markdown-html-converter/)** — render JWT debugging runbooks for your team wiki.
- **[JWT Decoder](https://webpenson.com/tools/jwt-decoder/)** — for casual decoding without verification (webpenson.com sister tool).