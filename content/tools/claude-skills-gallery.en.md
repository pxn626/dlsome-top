---
title: "Claude Skills Template Gallery — 50+ Copy-Paste Skills for Claude Projects"
description: "Browse, preview, copy, and customize 50+ Claude Skills templates (YAML frontmatter + instructions). 5 categories: code / writing / data / SEO / general. Built on Anthropic Skills v1.0. No signup, browser-only."
slug: "claude-skills-gallery"
date: "2026-08-08T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "claude_skills_gallery"
url: "/tools/claude-skills-gallery/"
tools:
  - "claude"
  - "claude-skills"
  - "claude-code"
  - "anthropic"
  - "skills"
  - "skills-framework"
  - "yaml"
  - "prompt-engineering"
  - "developer-tools"
  - "ai-tools"
categories:
  - "AI Tools"
  - "Developer Tools"
  - "Claude Ecosystem"
tags:
  - "claude-skills"
  - "anthropic-skills"
  - "skills-framework"
  - "skills-yaml"
  - "claude-projects"
  - "claude-code"
  - "yaml-frontmatter"
  - "prompt-template"
keywords:
  - "claude skills template"
  - "anthropic skills"
  - "claude skills yaml"
  - "claude skills framework"
  - "claude code skills"
  - "skills schema"
  - "prompt template gallery"
og:
  title: "Claude Skills Template Gallery — 50+ Pre-built Skills"
  description: "Browse 50+ Claude Skills templates, preview the YAML, copy with one click, or build your own with the Composer."
  image: "/tools/claude-skills-gallery/img/og.png"
  image_alt: "Claude Skills Template Gallery — 5 categories, 50 templates"
  type: "website"
  url: "https://dlsome.top/tools/claude-skills-gallery/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "Claude Skills Template Gallery — 50+ Skills for Claude"
  description: "Browse / Preview / Copy / Compose. Built on Anthropic Skills v1.0. No signup."
  image: "/tools/claude-skills-gallery/img/og.png"
canonical: "https://dlsome.top/tools/claude-skills-gallery/"
outputs:
  - html
  - json
---

{{< claude-skills-gallery >}}

# Claude Skills Template Gallery — 50+ Skills for Claude Projects

A free, browser-only gallery of **50+ Claude Skills** ready to paste into [Claude Projects](https://docs.claude.com/en/docs/projects/overview) or [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview). No signup. No API calls. No tracking.

## TL;DR

- **50 templates** across 5 categories (Code Engineering / Writing / Data / SEO / General Productivity)
- **One-click copy** — paste the YAML into any Claude Project
- **Share URL** — encode any skill in a `#skill=slug` hash, zero server
- **Composer** — build your own skill with live YAML validation
- **100% browser** — data stays local, no network requests

## What Are Claude Skills?

A **Claude Skill** is a reusable prompt package with YAML frontmatter + Markdown body, following the [Anthropic Skills v1.0](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) framework. Unlike a plain text prompt, a Skill has:

- **Structured name + description** so Claude knows when to invoke it
- **`allowed-tools`** so Claude knows which tools it may use
- **Version + license** for provenance and reuse
- **Example invocation** so you know how to call it

## The 5 Categories

| Category | Emoji | Count | Example Skills |
|---|---|---|---|
| **Code Engineering** | 🔍 | 10 | code-review, git-commit-message, sql-optimizer, regex-builder |
| **Writing & Content** | ✍️ | 10 | blog-outline, seo-meta, translation, proofreading |
| **Data Analysis** | 📊 | 10 | csv-profiler, json-analyzer, log-explainer, chart-recommender |
| **SEO & Webmaster** | 🔬 | 10 | meta-description-auditor, sitemap-qa, og-validator, schema-ld-generator |
| **General Productivity** | 📦 | 10 | meeting-summarizer, decision-matrix, rca-investigator, okr-drafter |

## How to Use the Gallery

### Step 1 — Browse

Click **Browse** (default tab). Use the category pills to filter by domain, or type a keyword in the search bar. Each card shows the skill name, one-line description, and category badge.

### Step 2 — Preview

Click **Preview** to open any skill. Use the **Code / Split / Preview** tabs to see:

- **Code** — raw YAML frontmatter + Markdown body
- **Split** — side-by-side YAML and rendered Markdown
- **Preview** — formatted Markdown output

### Step 3 — Copy / Download / Share

- **📋 Copy** — copies the full `.skill.md` content to your clipboard
- **⬇ Download** — saves it as `<slug>.skill.md`
- **🔗 Share URL** — encodes the skill ID in the URL hash (e.g. `#skill=code-review`)

### Step 4 — Paste into Claude

Open Claude Projects → create or open a project → paste the `.skill.md` content into the Skills panel. Done.

## How to Build Your Own

Click **Composer**. Fill in:

| Field | Required | Constraint |
|---|---|---|
| `name` | ✅ | lowercase + hyphens, ≤64 chars |
| `description` | ✅ | ≤1024 chars |
| `allowed-tools` | optional | one tool per line |
| `version` | optional | semver (e.g. 1.0.0) |
| `license` | optional | MIT, Apache-2.0, … |

Click **Validate** to check your YAML. When valid, **Copy** or **Download** the file.

## Claude Skills Schema Reference

Every skill follows this YAML frontmatter schema (Anthropic Skills v1.0):

```yaml
---
name: my-skill          # Required: unique slug, lowercase + hyphens
description: |          # Required: when to use this skill
  Use when the user asks about X.
  Skip if Y applies.
allowed-tools:           # Optional: list of permitted tools
  - Read
  - Bash
version: 1.0.0          # Optional: semver
license: MIT            # Optional
---

# My Skill

## When invoked
...

## Output format
...
```

## 5 Frequently Asked Questions

### Q1: What is a Claude Skill?

A Claude Skill is a reusable instruction package with YAML frontmatter + Markdown body, defined by Anthropic's Skills framework. It encodes when to invoke the skill, which tools Claude may use, and what output format to produce. Skills are stored as `.skill.md` files inside a Claude Project.

### Q2: How do I install a Skill in Claude Projects?

Open Claude Projects → Settings → Skills → click **Import** → paste the `.skill.md` content (or drag the downloaded file). The skill becomes available in the project's skill library. Alternatively, use the **Share URL** feature: open the gallery link with `#skill=<slug>`, copy the content, and paste into your project's skill panel.

### Q3: What's the difference between Claude Skills and Custom GPTs?

Claude Skills use Anthropic's native YAML + Markdown framework with tool restrictions, version fields, and a formal invocation model. Custom GPTs (OpenAI) use a visual builder with no standardized skill format and no tool restrictions comparable to Claude's `allowed-tools`. Skills are designed for developers; Custom GPTs target end-users.

### Q4: What fields are required in a Claude Skill's YAML?

Only two are required: **`name`** (lowercase slug, ≤64 chars) and **`description`** (when to invoke). Optional fields include `allowed-tools` (list), `version` (semver), and `license` (string). The Markdown body after the `---` separator is free-form and defines the skill's actual instructions.

### Q5: Can I share a Claude Skill between Projects?

Yes. Export by downloading the `.skill.md` file or using the **Share URL** hash. Import by pasting the content into any other Claude Project. There is no centralized shared skill library — skills live in individual projects. Use the Share URL hash (`#skill=<id>`) for zero-server sharing.

## Related Tools on dlsome.top

- [JSON-to-TypeScript Converter](/tools/json-to-typescript/) — generate TypeScript interfaces from JSON schemas
- [YAML-to-JSON Converter](/tools/yaml-to-json/) — validate and convert YAML to JSON
- [JWT Inspector](/tools/jwt-inspector/) — decode and verify JWTs (HS256/RS256/ES256)
- [Cron Parser](/tools/cron-parser/) — parse cron expressions across 4 platforms
- [AI Prompt Helper](/tools/ai-prompt-helper/) — build structured prompts with tone control
- [JSON Schema Validator](/tools/json-schema-validator/) — validate JSON against JSON Schema
- [JSONPath Tester](/tools/json-path-tester/) — test JSONPath / JSONata / JMESPath expressions with live tree view and path highlighting

---

*Last updated: 2026-08-11 · Claude Skills Template Gallery · Built on [Anthropic Skills v1.0](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Claude Skills Template Gallery",
  "description": "Browse, preview, copy, and customize 50+ Claude Skills templates for Anthropic Claude Projects and Claude Code.",
  "url": "https://dlsome.top/tools/claude-skills-gallery/",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>

<!-- JSON-LD: FAQPage (5 questions) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Claude Skill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Claude Skill is a reusable instruction package with YAML frontmatter (name, description, allowed-tools, version, license) plus a Markdown body defining when to invoke the skill and what output format to produce. Skills follow the Anthropic Skills v1.0 framework."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install a Skill in Claude Projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Claude Projects → Settings → Skills → Import → paste the .skill.md content. Alternatively, use the gallery's Share URL feature to encode a skill ID in a URL hash, then copy the content and paste it into your project's skill panel."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between Claude Skills and Custom GPTs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Skills use Anthropic's native YAML+Markdown framework with formal tool restrictions (allowed-tools), version fields, and a structured invocation model. Custom GPTs (OpenAI) use a visual builder without a standardized skill format or tool restriction model comparable to Claude's allowed-tools."
      }
    },
    {
      "@type": "Question",
      "name": "What YAML fields are required in a Claude Skill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only two fields are required: name (lowercase slug, ≤64 chars) and description (≤1024 chars). Optional fields include allowed-tools (list of tool names), version (semver string), and license (string). The Markdown body after the YAML frontmatter separator is free-form."
      }
    },
    {
      "@type": "Question",
      "name": "Can I share a Claude Skill between Projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Export by downloading the .skill.md file or using the Share URL hash (#skill=<id>). Import by pasting the content into any other Claude Project. There is no centralized shared library — skills live in individual projects."
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
  "name": "How to install a Claude Skill from the Gallery",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Browse by category",
      "text": "Open the Browse tab and filter by category (Code Engineering, Writing, Data, SEO, General) or search by keyword."
    },
    {
      "@type": "HowToStep",
      "name": "Preview the YAML",
      "text": "Click Preview, then use the Code or Split tab to inspect the YAML frontmatter and Markdown body of any skill."
    },
    {
      "@type": "HowToStep",
      "name": "Copy or Download",
      "text": "Click the Copy button to copy the full .skill.md to your clipboard, or Download to save it as a file."
    },
    {
      "@type": "HowToStep",
      "name": "Paste into Claude Projects",
      "text": "Open Claude Projects → Settings → Skills → Import → paste the content. The skill is now available in your project."
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
    { "@type": "ListItem", "position": 3, "name": "Claude Skills Gallery", "item": "https://dlsome.top/tools/claude-skills-gallery/" }
  ]
}
</script>
