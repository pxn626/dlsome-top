---
title: "JWT 检查器与调试器 — HS256 / RS256 / ES256 签名验证"
description: "面向开发者的 JWT 检查器。验证 HS256 / RS256 / ES256 签名,模拟 claim 篡改,解码 RFC 7519 头部与负载。Bearer token 自动提取。100% 浏览器端,token 不上传。"
slug: "jwt-inspector"
date: 2026-07-23T00:00:00+08:00
lastmod: 2026-07-24T00:00:00+00:00
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
  image_width: 1200
  image_height: 630
  type: "website"
  url: "https://dlsome.top/zh/tools/jwt-inspector/"
  site_name: "dlsome.top"
  locale: "zh_CN"
  locale_alternate: "en_US"
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
  - json
---

**安全声明:** 本工具 100% 在你的浏览器本地运行。JWT、secret、public key 都不会离开你的浏览器,所有加密操作通过 Web Crypto API(`crypto.subtle`)在客户端完成。无登录、无注册、无 telemetry、无服务器上传。

{{< jwt-inspector >}}

## 什么是 JWT 检查器?

[正文 — content-impl 阶段由 webpenson-executor-content 填充,严格按 strategy §3.1 中文翻译]

## 如何使用本 JWT 检查器

[正文 — 3 步教程:粘贴 → 选算法 → 验证 + 篡改测试]

## JWT 签名验证 (HS256 / RS256 / ES256)

[正文 — 三算法概览]

## HS256:用 Secret 验证

[正文 — HMAC-SHA-256 对称密钥验证详解]

## RS256 / ES256:用 Public Key 验证

[正文 — SPKI PEM 解析 + P1363 ↔ DER 编码转换]

## Claim 篡改与重签名

[正文 — **仅供调试 / 红队演练使用**,永远不要篡改非自有系统的 token]

## 算法混淆与 alg=none 攻击

[正文 — CVE-2015-9235 + HS/RS 混淆]

## RFC 7519 Registered Claims

[正文 — iss / sub / aud / exp / nbf / iat / jti 速查表]

## Bearer Token 自动提取

[正文 — 粘贴 curl / Postman 完整 HTTP 块,工具自动剥离 Authorization 头]

## JWKS、kid Header 与密钥轮换

[正文 — opt-in fetch JWKS endpoint]

## 平台调试 (Auth0 / Cognito / Firebase / Okta)

[正文 — 各 IdP 典型 token 结构 + 常见调试误区]

## 常见问题 (FAQ)

[正文 — 7 Q&A 中文译文,JSON-LD FAQPage 见 extend_head.html]

## 相关开发者工具

- **[Cron 表达式解析器](https://dlsome.top/tools/cron-parser/)** — 调试定时 token 刷新任务(`0 */6 * * *` 每 6 小时签发新 JWT)。
- **[YAML 转 JSON](https://dlsome.top/tools/yaml-to-json/)** — 将 Kubernetes ServiceAccount JWT 清单转为 JSON 用于 API 部署。
- **[JSON 转 TypeScript](https://dlsome.top/tools/json-to-typescript/)** — 为解码后的 JWT payload claims 生成 TypeScript 类型。
- **[Markdown 转 HTML](https://dlsome.top/tools/markdown-html-converter/)** — 为团队 wiki 渲染 JWT 调试运行手册。
- **[JWT 解码器](https://webpenson.com/tools/jwt-decoder/)** — 通用版(无签名验证,姊妹站点 webpenson.com)。