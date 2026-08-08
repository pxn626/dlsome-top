---
title: "AI Image Prompt Builder — SD/MJ/Flux/DALL-E Generator"
description: "Build AI image prompts for SD, MJ, Flux, DALL-E. 60 templates, model switcher, negative prompts. No signup."
slug: "ai-image-prompt-builder"
date: "2026-08-08T00:00:00+08:00"
draft: false
type: "page"
layout: "page"
translationKey: "ai_image_prompt_builder"
url: "/tools/ai-image-prompt-builder/"
tools:
  - "stable-diffusion"
  - "midjourney"
  - "flux"
  - "dall-e"
  - "ai-image-generation"
  - "prompt-engineering"
  - "negative-prompt"
  - "browser-tool"
  - "no-signup"
  - "free"
categories:
  - "AI Tools"
  - "Image Generation"
  - "Developer Tools"
tags:
  - "ai-image-prompt"
  - "midjourney-prompt"
  - "stable-diffusion-prompt"
  - "flux-prompt"
  - "dall-e-prompt"
  - "negative-prompt"
  - "prompt-template"
  - "image-generation"
  - "browser-tool"
  - "no-signup"
keywords:
  - "ai image prompt builder"
  - "midjourney prompt"
  - "stable diffusion prompt"
  - "flux prompt"
  - "dall-e prompt"
  - "negative prompt"
  - "prompt generator"
  - "ai prompt template"
og:
  title: "AI Image Prompt Builder — 60+ Templates for SD/MJ/Flux/DALL-E"
  description: "Build polished AI image prompts in one click. 60+ templates, multi-model syntax, negative prompts."
  image: "/tools/ai-image-prompt-builder/img/og.png"
  image_alt: "AI Image Prompt Builder with 60 templates and 4 model switcher"
  type: "website"
  url: "https://dlsome.top/tools/ai-image-prompt-builder/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "AI Image Prompt Builder — 60+ Templates"
  description: "SD/MJ/Flux/DALL-E prompts in one click. No signup."
  image: "/tools/ai-image-prompt-builder/img/og.png"
canonical: "https://dlsome.top/tools/ai-image-prompt-builder/"
schema:
  - "WebApplication"
  - "FAQPage"
  - "BreadcrumbList"
  - "HowTo"
outputs:
  - html
  - json
---

{{< ai-image-prompt-builder >}}

# AI Image Prompt Builder — SD / MJ / Flux / DALL-E Generator

## TL;DR

A free, browser-based prompt builder for **Stable Diffusion, Midjourney v6, Flux, and DALL-E 3**. Pick one of **60+ pre-built templates** across 6 categories (People / Landscapes / Products / Abstract / Logo / UI), customize the **5-dimension structure** (subject + style + lighting + camera + post), switch between model-specific syntax templates with one click, toggle from a **40+ phrase negative prompt library**, and pick from **6 aspect ratio presets**. The tool is **100% client-side — no API calls, no signup, no data leaving your browser**. Reference only — model behavior varies; always verify against the official documentation of your target model.

## What Is an AI Image Prompt?

### Definition

An **AI image prompt** is the text description that drives a generative model (Stable Diffusion / Midjourney / Flux / DALL-E). Unlike plain English, a well-structured prompt follows a 5-dimension pattern — **subject + style + lighting + camera + post-processing** — that consistently produces higher-quality outputs across all major models.

### Why Prompts Matter

The quality of the prompt is the single biggest factor in output quality. Two artists using the same model with the same hardware can produce dramatically different results based on prompt structure alone. Generic prompts ("a cat") produce generic results; structured prompts ("a tabby cat, studio lighting, 85mm lens, f/1.4 bokeh, 8K UHD") produce professional ones.

### The 4 Major Models Compared

- **Stable Diffusion (SDXL / SD 1.5)** — open-source, comma-separated tokens, supports `(weight)` emphasis and a `Negative prompt:` field. Best for technical control and LoRA fine-tuning.
- **Midjourney v6** — natural-language friendly, supports `--ar` `--v` `--s` `--stylize` `--style raw` parameters. Best for artistic / cinematic output.
- **Flux (Pro / Dev)** — natural language with period-separated sentences. Best for photorealistic output and text rendering.
- **DALL-E 3 / GPT Image** — conversational, long descriptive sentences, **no negative prompts**. Best for accurate instruction following.

## The 60 Templates — 6 Categories

### 👤 People & Portraits (10 templates)

`studio-portrait` · `outdoor-portrait` · `fashion-editorial` · `vintage-portrait` · `cyberpunk-character` · `anime-character` · `chibi-style` · `elderly-portrait` · `children-portrait` · `silhouette`

### 🏔️ Landscapes (10 templates)

`mountain-mist` · `ocean-sunset` · `forest-foggy` · `desert-dunes` · `aurora-night` · `waterfall-flowing` · `city-skyline` · `rural-village` · `tropical-beach` · `snow-glacier`

### 📦 Products & E-commerce (10 templates)

`white-bg-product` · `lifestyle-product` · `food-photography` · `jewelry-macro` · `car-commercial` · `fashion-flatlay` · `tech-gadget` · `perfume-bottle` · `furniture-interior` · `apparel-model`

### 🎨 Abstract & Artistic (10 templates)

`geometric-pattern` · `fluid-art` · `fractal-art` · `generative-art` · `minimal-abstract` · `gradient-flow` · `op-art` · `cubist-style` · `surreal-collage` · `glitch-art`

### 🎯 Logo & Branding (10 templates)

`minimalist-logo` · `mascot-logo` · `wordmark-logo` · `emblem-logo` · `3d-logo` · `isometric-logo` · `vintage-logo` · `tech-logo` · `monogram` · `abstract-icon`

### 🖥️ UI / Wireframe (10 templates)

`app-screen-mockup` · `dashboard-ui` · `wireframe-lowfi` · `landing-page` · `dark-mode-ui` · `glassmorphism-ui` · `neumorphism-ui` · `mobile-app-icon` · `web-error-page` · `settings-panel`

## The Composer — Build Your Prompt

### Subject (text input)

Free-form text describing the main subject. Each template ships with a multilingual default subject and placeholder to start from. The Quality Gate warns when the subject is empty and falls back to the template default.

### Style chips (multiselect)

Pick from 4–8 style chips per template — options like `photorealistic`, `cinematic`, `anime`, `oil-painting`, `cyberpunk`, `watercolor`, `3D render`, `pixel art`. Each chip maps to a model-specific keyword in the syntax template.

### Lighting chips (multiselect)

Pick from `studio lighting`, `softbox`, `rim light`, `low-key`, `high-key`, `golden hour`, `volumetric`, `neon`, `overcast`. Lighting is critical for cinematic output — never skip it.

### Camera chips (multiselect)

Pick from `85mm lens`, `50mm prime`, `wide-angle`, `macro`, `fisheye`, `tilt-shift`, `aerial`, `f/1.4 bokeh`, `shallow depth of field`. The lens keyword often does more for cinematic output than any style keyword.

### Post-processing chips (multiselect)

Pick from `high detail`, `8K UHD`, `RAW photo`, `film grain`, `HDR`, `color graded`, `desaturated`. Controls the final output quality and aesthetic feel.

## Model Adapter — Switch Syntax Instantly

### Stable Diffusion (SDXL / SD 1.5)

Syntax: `{subject}, {style}, {lighting}, {camera}, {post}` joined by commas. Supports a `Negative prompt:` field appended at the end (one phrase per line).

### Midjourney v6

Syntax: natural language + `--ar <ratio> --v 6 --s 250 --style raw` parameters. Supports `--no <keyword>` for negative prompts. The aspect ratio is appended automatically.

### Flux (Pro / Dev)

Syntax: period-separated natural sentences. Supports `Avoid: <keyword>` for negative prompts. Flux Pro supports full negation; Flux Dev supports basic negation only.

### DALL-E 3 / GPT Image

Syntax: long descriptive sentences. **No negative prompt support** — the UI greys out the negative section when this model is selected, and the buildPrompt function strips any `Avoid:` or `Negative prompt:` lines from the output.

## Negative Prompts — Avoid Common Issues

### 5 Categories (40+ preset phrases)

- 🖐️ **Anatomy** (10): `extra fingers`, `mutated hands`, `poor anatomy`, `extra limbs`, `deformed`, `disfigured`, `bad proportions`, `missing fingers`, `extra digits`, `fused fingers`
- 🎨 **Quality** (8): `blurry`, `low quality`, `low resolution`, `pixelated`, `jpeg artifacts`, `noise`, `worst quality`, `compression artifacts`
- 👁️ **Face** (8): `bad eyes`, `crossed eyes`, `asymmetric eyes`, `bad mouth`, `extra teeth`, `deformed face`, `poorly drawn face`, `mutated face`
- 🌀 **Style pollution** (8): `cartoon when photorealistic`, `3d render when 2d`, `watermark`, `signature`, `text`, `logo overlay`, `username`, `website URL`
- 🚫 **Content** (8): `nsfw`, `violent`, `disturbing`, `celebrity likeness`, `political`, `religious symbol`, `weapon`, `drug`

### Custom negative input

Free-form comma-separated text input — your custom phrases are appended to the preset selection. The combined output is rendered into SD's `Negative prompt:` field, MJ's `--no` parameter, or Flux's `Avoid:` line. The Quality Gate recommends at least the `anatomy + quality` starter set.

## Aspect Ratio Presets

- **1:1 (Square)** — Instagram posts, profile pictures
- **16:9 (Widescreen)** — desktop wallpapers, YouTube thumbnails
- **9:16 (Portrait)** — TikTok / Instagram Stories
- **4:3 (Standard)** — classic photo format
- **3:2 (Photo)** — DSLR format
- **21:9 (Cinematic)** — ultrawide, movie scenes

**Model behavior notes:** Midjourney supports all 6 ratios. SDXL supports 5 of 6 (some checkpoints don't render 21:9). Flux supports all 6. DALL-E 3 only supports 1:1 / 16:9 / 9:16 — the UI flags the unsupported ratio when DALL-E is selected.

## How to Use the Builder

### Step 1 — Pick a template

Click any **template card** in the left grid, or filter by category (`All` / `👤 People` / `🏔️ Landscapes` / `📦 Products` / `🎨 Abstract` / `🎯 Logo` / `🖥️ UI`). Use the search bar at the top of the templates section to find templates by keyword. Each card shows the template name, emoji, and category badge.

### Step 2 — Customize fields

The Composer form auto-loads the template's default subject + style / lighting / camera / post chips. Edit subject text, click chips to toggle options, click ratio buttons to switch aspect ratio. The right output updates live as you change any field — the Quality Gate panel below the output shows model info, character count, and any warnings (empty subject, no negative prompts, etc.).

### Step 3 — Choose target model

Click **SD / MJ / Flux / DALL-E** at the top. The right output updates to show that model's exact syntax, including model-specific parameters (`--ar`, `--v 6`, `Negative prompt:`, etc.). The Negative Prompts section auto-disables when you switch to DALL-E.

### Step 4 — Add negatives

In the **Negative Prompts** section, click any phrase to toggle. The 5 categories cover anatomy, quality, face, style pollution, and content. Custom phrases go in the input at the bottom of the negative section.

### Step 5 — Copy / Download / Share

- **📋 Copy** — copies the assembled prompt + negative section to your clipboard.
- **⬇ Download .txt** — saves as `<model>-<template>-<timestamp>.txt`.
- **🔗 Share URL** — encodes template ID + custom fields + model into URL hash (`#prompt=<template>&subject=<text>&model=<model>`). Opening the link restores the exact state client-side (no server).

## Prompt Engineering Best Practices

### The 5-Dimension Structure

Every good prompt has 5 dimensions: **subject** (what), **style** (how it looks), **lighting** (mood), **camera** (photographic angle/lens), **post** (final quality). Skipping any one produces generic output. The Composer enforces this structure across all 60 templates.

### Weight Syntax — SD vs MJ

- **Stable Diffusion:** `(keyword:1.3)` emphasis, `[keyword:0.7]` de-emphasis. Range 0.0–2.0.
- **Midjourney v6:** `keyword::2` emphasis; the slider caps at 1.5 for v6 (overweight produces artifacts).
- **Flux / DALL-E:** no weight syntax (natural language only).

### Common Mistakes

1. **Vague subjects** — "a person" vs "a young woman with red hair, freckles, blue eyes". Specifics win.
2. **Overloading** — 30+ keywords compete for attention; 8–15 is the sweet spot.
3. **Conflicting styles** — "photorealistic" + "oil painting" + "pixel art" produces chaos.
4. **Forgetting camera** — the lens keyword (`85mm f/1.4`) does more for cinematic output than any style keyword.
5. **Ignoring aspect ratio** — a portrait prompt on 16:9 looks stretched. Match ratio to subject.

### Iteration Workflow

Start with the template default → tweak subject → adjust 1–2 chips → generate → read the failure mode → add a negative prompt targeting that failure → repeat. 3 iterations usually gets you from generic to portfolio-grade.

## Worked Examples

### Example 1 — Studio Portrait (SD syntax)

Template: `studio-portrait`. Subject: "a young woman with red hair, freckles, blue eyes". Style: photorealistic. Lighting: studio softbox. Camera: 85mm f/1.4 bokeh. Post: 8K UHD, RAW photo. Negative: anatomy + quality.

Output:
```
a young woman with red hair, freckles, blue eyes, photorealistic, studio softbox, 85mm f/1.4 bokeh, 8K UHD, RAW photo
Negative prompt: extra fingers, mutated hands, poor anatomy, extra limbs, deformed, disfigured, bad proportions, missing fingers, extra digits, fused fingers, blurry, low quality, low resolution, pixelated, jpeg artifacts, noise, worst quality, compression artifacts
```

### Example 2 — Mountain Mist (MJ syntax)

Template: `mountain-mist`. Subject: "snow-capped peaks at dawn". Style: cinematic. Lighting: golden hour, volumetric. Camera: aerial wide-angle. Post: HDR, color graded. Ratio: 21:9.

Output:
```
snow-capped peaks at dawn, cinematic, golden hour, volumetric, aerial wide-angle, HDR, color graded --ar 21:9 --v 6 --s 250 --style raw --no extra fingers, mutated hands, poor anatomy, extra limbs, deformed, disfigured, bad proportions, missing fingers, extra digits, fused fingers, blurry, low quality
```

### Example 3 — Minimalist Logo (Flux syntax)

Template: `minimalist-logo`. Subject: "a coffee bean". Style: minimal abstract. Lighting: studio. Camera: macro. Post: high detail.

Output:
```
Minimalist logo of a coffee bean. Minimal abstract style. Studio lighting. Macro camera. High detail. White background.

Avoid: extra fingers, mutated hands, poor anatomy, extra limbs, deformed, disfigured, bad proportions, missing fingers, extra digits, fused fingers, blurry, low quality, low resolution, pixelated, jpeg artifacts, noise, worst quality, compression artifacts
```

### Example 4 — Dashboard UI (DALL-E syntax)

Template: `dashboard-ui`. Subject: "an analytics dashboard with 4 charts and a sidebar nav". Style: glassmorphism UI. Lighting: dark mode. Post: 8K.

Output:
```
A dashboard UI mockup of an analytics dashboard with 4 charts and a sidebar nav. Glassmorphism UI. Dark mode UI. Studio-quality 8K rendering. Front view.
```

### Example 5 — Share URL

Hash: `#prompt=portrait-studio&subject=cat&model=mj&style=cinematic&lighting=studio&ratio=16:9`

Opens the builder with: template `studio-portrait`, subject "cat", model Midjourney, style cinematic, lighting studio, ratio 16:9. Pure hash routing, no server.

## 5 Frequently Asked Questions

### Q1: How do I write a good AI image prompt?

Use the **5-dimension structure**: subject + style + lighting + camera + post-processing. Be specific (e.g., "young woman, red hair, freckles" not "person"). 8–15 keywords is the sweet spot — overloading causes attention competition. Each of the 60 templates in this builder enforces this structure, so pick one as a starting point and iterate.

### Q2: Where can I find AI image prompt templates?

This tool's **Templates** tab has 60+ ready-to-use prompts across 6 categories (People / Landscapes / Products / Abstract / Logo / UI). Click any card to load it as the active template, then customize the subject, style, lighting, camera, and post fields. No signup, no API call, all processing happens in your browser. The data file is a same-origin static asset — it does NOT touch any AI service.

### Q3: What's the difference between Midjourney and Stable Diffusion prompts?

**Syntax:** SD uses comma-separated tokens with `(weight)` emphasis plus a `Negative prompt:` field; MJ v6 uses natural language with `--ar --v --s --stylize` parameters. **Output style:** SD is technical-control friendly (LoRA / sampler / CFG); MJ is artistic / cinematic friendly. **Negative prompts:** SD supports full lists; MJ uses `--no <keyword>`. Switch the model tab in this builder to see the exact syntax each model produces.

### Q4: How do I choose the right style for my AI image?

Match style to use case: **photorealistic** for product photography and portraits; **cinematic** for narrative scenes; **anime** for character art; **oil-painting** for classical / portrait; **cyberpunk** for tech / neon scenes; **watercolor** for soft / illustrative. The Style chips in the Composer are pre-tagged per template — start there, then experiment with combinations. Avoid mixing 3+ conflicting styles (e.g., photorealistic + oil-painting + pixel art).

### Q5: What are negative prompts and how do I use them?

Negative prompts tell the model what to **avoid**. This tool ships 5 preset categories with 40+ phrases: **Anatomy** (extra fingers), **Quality** (blurry), **Face** (bad eyes), **Style pollution** (watermarks), **Content** (NSFW). SD uses the `Negative prompt:` field; MJ uses `--no <keyword>`; Flux uses `Avoid: <keyword>`; **DALL-E has no negative support** (the UI greys out the negative section when DALL-E is selected). A starter set of `Anatomy + Quality` covers 80% of common failures.

## Related Tools on dlsome.top

- [Claude Skills Template Gallery](/tools/claude-skills-gallery/) — 50+ Anthropic Skills YAML templates with Composer (use alongside AI image prompts for structured workflows)
- [AI Prompt Helper](/tools/ai-prompt-helper/) — multi-template text prompt builder with tone control (the text counterpart to this image prompt tool)
- [JSON to TypeScript](/tools/json-to-typescript/) — generate TypeScript interfaces from JSON configs (when exporting this tool's settings)
- [YAML to JSON](/tools/yaml-to-json/) — validate YAML templates you build with this tool
- [JWT Inspector](/tools/jwt-inspector/) — decode and verify JWTs (for API-key-related prompt workflows)
- [Cron Parser](/tools/cron-parser/) — parse cron expressions (for scheduled batch image generation)
- [dlsome.top Home](/) — browse all developer tools in the dlsome.top ecosystem

---

*Last updated: 2026-08-08 · AI Image Prompt Builder · 60 templates · 4 models · zero-network promise.*

<!-- JSON-LD: WebApplication -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Image Prompt Builder",
  "alternateName": "AI 图像提示词构造器",
  "description": "Build polished AI image prompts for Stable Diffusion, Midjourney, Flux, and DALL-E. 60+ templates, model syntax switcher, negative prompt library. Browser-only, no signup.",
  "url": "https://dlsome.top/tools/ai-image-prompt-builder/",
  "applicationCategory": "MultimediaApplication",
  "applicationSubCategory": "Image Generation Helper",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript. Modern browser (Chrome 90+, Firefox 90+, Safari 14+).",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": [
    "60+ prompt templates (portrait / landscape / product / abstract / logo / UI)",
    "Multi-model syntax switcher (SD / MJ / Flux / DALL-E)",
    "Negative prompt library with 5 categories (40+ phrases)",
    "Aspect ratio presets (1:1 / 16:9 / 9:16 / 4:3 / 3:2 / 21:9)",
    "Per-keyword weight control",
    "Copy / Download / Share URL export",
    "100% browser-only — zero AI API calls"
  ]
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
      "name": "How do I write a good AI image prompt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the 5-dimension structure: subject + style + lighting + camera + post-processing. Be specific (e.g., 'young woman, red hair, freckles' not 'person'). 8–15 keywords is the sweet spot — overloading causes attention competition. Each of the 60 templates in this builder enforces this structure, so pick one as a starting point and iterate."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I find AI image prompt templates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This tool's Templates tab has 60+ ready-to-use prompts across 6 categories (People / Landscapes / Products / Abstract / Logo / UI). Click any card to load it as the active template, then customize the subject, style, lighting, camera, and post fields. No signup, no API call, all processing happens in your browser. The data file is a same-origin static asset — it does NOT touch any AI service."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between Midjourney and Stable Diffusion prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Syntax: Stable Diffusion uses comma-separated tokens with (weight) emphasis plus a Negative prompt field. Midjourney v6 uses natural language with --ar --v --s --stylize parameters. Output style: SD is technical-control friendly (LoRA / sampler / CFG); MJ is artistic / cinematic friendly. Negative prompts: SD supports full lists; MJ uses --no <keyword>. Switch the model tab in this builder to see the exact syntax each model produces."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose the right style for my AI image?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Match style to use case: photorealistic for product photography and portraits; cinematic for narrative scenes; anime for character art; oil-painting for classical / portrait; cyberpunk for tech / neon scenes; watercolor for soft / illustrative. The Style chips in the Composer are pre-tagged per template — start there, then experiment with combinations. Avoid mixing 3+ conflicting styles."
      }
    },
    {
      "@type": "Question",
      "name": "What are negative prompts and how do I use them?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negative prompts tell the model what to avoid. This tool ships 5 preset categories with 40+ phrases: Anatomy (extra fingers), Quality (blurry), Face (bad eyes), Style pollution (watermarks), Content (NSFW). SD uses the Negative prompt: field; MJ uses --no <keyword>; Flux uses Avoid: <keyword>; DALL-E has no negative support (the UI greys out the negative section when DALL-E is selected). A starter set of Anatomy + Quality covers 80% of common failures."
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
  "name": "How to build an AI image prompt",
  "description": "Step-by-step guide to construct a polished prompt for Stable Diffusion, Midjourney, Flux, or DALL-E.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Choose a template",
      "text": "Pick from 6 categories (People, Landscapes, Products, Abstract, Logo, UI) — 60 templates available. Click any card to load it as the active template."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Customize subject + style + lighting + camera + post",
      "text": "Edit the subject text, select style/lighting/camera/post chips. The right preview updates live as you change any field."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Pick target model",
      "text": "Switch between Stable Diffusion, Midjourney, Flux, DALL-E tabs at the top — each model has its own syntax template (e.g., MJ adds --ar --v --s parameters; SD uses Negative prompt field)."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Add negative prompts",
      "text": "Toggle 5 categories (Anatomy, Quality, Face, Style pollution, Content) — 40+ preset negative phrases. Add custom phrases via the text input. DALL-E disables this section."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Export",
      "text": "Copy to clipboard, download as .txt file, or share via URL hash (#prompt=<template>&subject=<text>&model=<sd|mj|flux|dalle>). The share URL restores the exact state client-side without a server."
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
    { "@type": "ListItem", "position": 3, "name": "AI Image Prompt Builder", "item": "https://dlsome.top/tools/ai-image-prompt-builder/" }
  ]
}
</script>