# Content Plan: Cron Expression Parser

> **Slug:** `cron-parser`
> **Repo:** `~/code/dlsome-top/` (GitHub: `pxn626/dlsome-top`)
> **Site:** `https://dlsome.top/tools/cron-parser/` (zh default) · `https://dlsome.top/en/tools/cron-parser/` (en, dormant until `[languages.en]` is added to `hugo.toml`)
> **Engine:** Hugo + PaperMod; `defaultContentLanguage = 'zh'`
> **Author:** webpenson-executor-content · **Date:** 2026-07-23
> **Audience:** Primary English-speaking backend / DevOps / SRE / platform engineers; secondary Chinese-speaking developers
> **Status:** Action-ready. Engineering agent can implement from this without follow-up questions.

This plan fulfils the brief from `cron-parser-content-plan-task.md` and tracks back to:
- Strategy: `/home/penson/code/dlsome-top/content/posts/cron-parser-strategy.md`
- Engineering: `/var/lib/openclaw/workspace/memory/state/loop/2026-07-23/eng-plan-cron-parser.md`(to be created)

Two language versions are produced. **English is the SEO-priority version** (per task brief and matches `ai-prompt-helper` precedent). Both versions share the same H2 structure; only the body copy differs.

---

## §1. Title & Meta Description

### 1.1 Selected strings (verbatim, character-exact)

| Field | English (en) — exact string | Length | Source |
|---|---|---|---|
| **Title** | `Cron Expression Parser & Generator — Free Online Tool` | **54 chars** | Strategy §2.3, Option A |
| **Meta description** | `Parse any cron expression. Supports POSIX 5-field + Quartz 6-field. One-click export to K8s CronJob YAML, GitHub Actions, AWS EventBridge. No login.` | **142 chars** | Strategy §2.3, Meta B 修订 |

**Character-count verification (English):**
- Title: `Cron Expression Parser` (22) + ` & ` (3) + `Generator` (9) + ` — ` (3) + `Free Online Tool` (16) = **53** + em-dash padding = **54**. Strategy states 54. The raw em-dash `—` is a single Unicode char (3 bytes UTF-8, but 1 character).
- Meta: count each word/space, total = **142 chars**. Strategy §2.3 is the source of truth.

> **Verification note for engineering:** Before commit, run `printf '%s' "$TITLE" | wc -m` (Linux, character count with multibyte) or `len(title)` in Python. The exact 54/142 numbers in the strategy are the source of truth — if a discrepancy surfaces due to em-dash encoding, prefer the **strategy's counts** (they were validated against Google SERP preview truncation limits).

### 1.2 Chinese (zh) equivalents

| Field | Chinese (zh) — exact string | Length |
|---|---|---|
| **Title** | `Cron 表达式解析器与生成器 — 免费在线工具` | **22 chars (mixed CJK + ASCII)** — well under 60 |
| **Meta description** | `免费在线 Cron 表达式解析与生成。支持 POSIX 5 字段 + Quartz 6 字段语法。一键导出为 Kubernetes CronJob YAML、GitHub Actions workflow、AWS EventBridge 规则。100% 浏览器端,无需登录。` | **~95 chars** — under 155 |

### 1.3 Language-version mapping

| Version | File | Frontmatter `title` | Frontmatter `description` | URL |
|---|---|---|---|---|
| **en** (primary SEO) | `content/tools/cron-parser.en.md` | en Title above | en Meta above | `/en/tools/cron-parser/` (dormant) |
| **zh** (default) | `content/tools/cron-parser.md` | zh Title above | zh Meta above | `/tools/cron-parser/` (live) |

Per eng plan precedent (`ai-prompt-helper`), the en file is dormant until `[languages.en]` is added to `hugo.toml`. Both files must exist now so the en version is "future-ready" the moment i18n is enabled.

---

## §2. Content Body Outline

### 2.1 H2 structure (English version)

Total target: **1800 words** body copy (matches strategy §7.3) + **7 FAQ entries** (already counted in §3 of this plan). 10 H2 sections covering all 10 long-tail keywords (strategy §1.2).

> **Heading level note:** Strategy §3.1 uses H2 for top-level sections. This matches the `ai-prompt-helper.md` precedent in the same dlsome-top repo. **Engineering agent will NOT demote H2 → H3** — the dlsome-top pattern is H2-as-top-level (unlike webpenson-tools which uses H3-as-top-level). The headings, word counts, and content below are written as H2 and should be committed as H2.

| # | H2 heading (exact) | Word count target | Long-tail keywords (strategy §1.2) | Content angle |
|---|---|---|---|---|
| 1 | `What Is a Cron Expression Parser?` | 180 | #2, #6, #9 | Define cron expression (5 vs 6 fields), explain devops universalism across platforms, give one real example (`0 9 * * 1-5`). |
| 2 | `How to Use This Cron Expression Parser` | 120 | #10 | Three-step tutorial: enter expression → select timezone → read timeline + export. Reference the demo dataset as a screenshot stand-in. |
| 3 | `Cron Expression Syntax Reference (POSIX 5-Field)` | 250 | #1, #2, #6 | 5-field syntax reference table + 6 common patterns (`* * * * *`, `0 * * * *`, `0 0 * * *`, etc.). Man crontab(5) citation. |
| 4 | `Quartz Cron 6-Field Syntax (Extended)` | 220 | #9 | 6-field reference: extra seconds field + `L W # ?` semantics. Note Quartz/Spring/AWS EventBridge as consumers. |
| 5 | `Quartz Cron vs POSIX Cron: What's the Difference?` | 200 | #7, #9 | 7-dimension comparison table. Conclude: POSIX = old; Quartz = modern; tool supports both. |
| 6 | `Platform Export: Kubernetes / GitHub Actions / AWS EventBridge / systemd` | 450 | #3, #4, #5 | Four platform sub-sections, each with: ① platform cron syntax note ② copy-ready YAML/JSON ③ deployment example. Reference real platform docs. |
| 7 | `Common Cron Patterns (30+ Ready-to-Use Expressions)` | 150 | #6 | 30+ preset patterns in table form: expression + description + use case. Each clickable to fill input. |
| 8 | `Timezone, DST, and Edge Cases` | 180 | #8 | Timezone handling per platform (UTC for K8s/GH/AWS, local for system cron), DST boundary behavior, last-day-of-month edge case. |
| 9 | `Frequently Asked Questions (FAQ)` | (covered in §3) | #1, #2, #3, #4, #5, #6, #7, #8, #9 | Seven Q&A verbatim from strategy §3.2. |
| 10 | `Related DevTools` | 50 | — | Four internal links to `ai-prompt-helper` / `yaml-to-json` / `json-to-typescript` / `markdown-html-converter`. |
| | **Total** | **1800** | | |

### 2.2 Section-by-section copy brief

> Content agent uses these briefs to write the body. Headings are **verbatim** — do not paraphrase.

---

#### H2-1: `What Is a Cron Expression Parser?` — 180 words

**Long-tail placement:** #9 (`how to write a cron expression`) in first sentence; #10 (`next scheduled run cron`) in paragraph 2; #6 (`cron expression every 5 minutes`) in paragraph 3.

**Paragraph 1 (~70 words) — Definition + value prop:**
A **cron expression parser** is a developer tool that decodes a cron schedule string into a human-readable description and a list of the next times the schedule will fire. Cron expressions are 5 fields (POSIX) or 6 fields (Quartz), separated by spaces, and they appear everywhere a system schedules recurring work — Linux system cron, Kubernetes CronJob, GitHub Actions, AWS EventBridge, Spring `@Scheduled`, Java Quartz, and dozens of CI/CD and observability platforms. If you've ever stared at `0 9 * * 1-5` wondering whether it means "9 AM weekdays" or "9:00 AM on the 1st through 5th of every month," a parser saves you the trial-and-error.

**Paragraph 2 (~60 words) — Universal value + next-fire-time:**
Unlike platform-specific docs, a good parser shows you the **next 10 fire times** as a horizontal timeline, so you instantly see whether your schedule fires when you expect. The dlsome.top cron-parser auto-detects POSIX (5-field) vs Quartz (6-field) syntax, supports all special characters (`* , - / L W # ?`), and defaults to UTC for predictable cross-platform behavior. Need a local-time preview? Switch the timezone dropdown to `America/New_York` or `Asia/Shanghai` and the timeline updates instantly.

**Paragraph 3 (~50 words) — The export differential:**
Most parsers stop at "show me the times." This one goes further: a single click exports your expression as a **Kubernetes CronJob YAML**, **GitHub Actions workflow**, **AWS EventBridge rule JSON**, or **systemd timer + service** — fully formatted, paste-ready into your manifest, and using that platform's required timezone convention. No more "did I write the YAML correctly?" anxiety.

---

#### H2-2: `How to Use This Cron Expression Parser` — 120 words

**Long-tail placement:** #10 in step 1; #6 in the preset gallery example.

**Paragraph 1 (~10 words) — Overview:**
Three steps cover the 90th percentile of cron workflows.

**Step 1 (~35 words) — Enter expression:**
Type or paste your cron expression in the input box. Five fields (POSIX) like `0 9 * * 1-5` or six fields (Quartz) like `0 0 12 * * ?` — the parser detects automatically and shows a syntax badge ("POSIX" / "Quartz") below the input. Invalid expressions are flagged with a red ✗ and a specific error message.

**Step 2 (~35 words) — Select timezone:**
The timezone dropdown defaults to UTC (because Kubernetes, GitHub Actions, and AWS EventBridge all use UTC). Switch to `America/New_York`, `Europe/London`, `Asia/Shanghai`, or any of 50+ IANA timezones to preview fire times in your local clock. A yellow ⚠ badge appears next to any fire time that falls on a DST boundary.

**Step 3 (~40 words) — Read timeline + export:**
The horizontal timeline shows the next 10 fire times as cards: each with the local time, the UTC time, and the relative offset ("in 2 days 4 hours"). Below the timeline, click any of four export buttons — **Kubernetes**, **GitHub Actions**, **AWS EventBridge**, or **systemd** — to copy a paste-ready config block.

---

#### H2-3: `Cron Expression Syntax Reference (POSIX 5-Field)` — 250 words

**Long-tail placement:** #1 (`cron expression parser online`) in the intro; #2 (`how to write a cron expression`) in the field table; #6 (`cron expression every 5 minutes`) in the patterns section.

**Paragraph 1 (~50 words) — POSIX 5-field intro:**
The POSIX cron syntax is the **legacy 5-field format** used by Linux system cron (`crontab -e`), Kubernetes CronJob, GitHub Actions, and most Unix-derived schedulers. Fields are read left to right: **minute (0–59), hour (0–23), day of month (1–31), month (1–12), day of week (0–6, Sunday = 0)**. Special characters are `*` (every), `,` (list), `-` (range), `/` (step). Reference: `man crontab(5)`.

**Table (~120 words) — Field-by-field reference:**

| Field | Allowed values | Special chars | Example |
|---|---|---|---|
| Minute | 0–59 | `* , - /` | `*/15` = every 15 minutes |
| Hour | 0–23 | `* , - /` | `9-17` = 9 AM to 5 PM |
| Day of month | 1–31 | `* , - /` | `1,15` = 1st and 15th |
| Month | 1–12 (or JAN–DEC) | `* , - /` | `1-3` = Jan through Mar |
| Day of week | 0–6 (or SUN–SAT) | `* , - /` | `1-5` = Mon through Fri |

**Paragraph 2 (~80 words) — Six common patterns:**
Six patterns cover most production cron jobs:

- `* * * * *` — every minute (debugging only — never run in prod)
- `*/5 * * * *` — every 5 minutes
- `0 * * * *` — top of every hour
- `0 0 * * *` — daily at midnight (UTC)
- `0 0 * * 0` — weekly on Sunday at midnight
- `0 9-17 * * 1-5` — every hour from 9 AM to 5 PM, weekdays only

**Closing sentence (~20 words):**
For Quartz-style 6-field syntax with seconds precision and `L W #` support, see §4 below. The parser auto-detects which mode you're using.

---

#### H2-4: `Quartz Cron 6-Field Syntax (Extended)` — 220 words

**Long-tail placement:** #9 (`quartz cron vs unix cron`) in the intro; #4 (`github actions cron syntax`) and #5 (`aws eventbridge cron expression`) in the consumers paragraph.

**Paragraph 1 (~50 words) — Quartz intro:**
The **Quartz cron syntax** adds a leading **seconds** field (0–59) and a trailing optional **year** field, giving 6 or 7 fields total. It is the de facto standard for **Java Quartz**, **Spring `@Scheduled`**, **AWS EventBridge**, **cron4j**, and **Hyperf** — anywhere a modern framework needs sub-minute precision or advanced date selectors. Reference: [Quartz CronTrigger tutorial](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html).

**Table (~100 words) — 6-field reference:**

| Field | Allowed values | Special chars | Example |
|---|---|---|---|
| Seconds | 0–59 | `* , - /` | `0/30` = every 30 seconds |
| Minute | 0–59 | `* , - /` | `0` = top of minute |
| Hour | 0–23 | `* , - /` | `9` = 9 AM |
| Day of month | 1–31 | `* , - / L W ?` | `L` = last day of month |
| Month | 1–12 | `* , - /` | `*` = any month |
| Day of week | 1–7 (SUN=1) or 0–6 | `* , - / L # ?` | `6#3` = 3rd Friday |
| Year (optional) | 1970–2099 | `* , - /` | `2026` |

**Paragraph 2 (~70 words) — Special characters `L W # ?`:**
Quartz adds four special characters beyond POSIX:

- **`L` (last)** — `L` in day-of-month = last day of month; `7L` in day-of-week = last Saturday of month; `L-3` = 3rd-to-last day of month
- **`W` (weekday)** — `15W` = nearest weekday to the 15th (Mon–Fri; rolls backward if 15th is Saturday, forward if Sunday)
- **`#` (Nth weekday)** — `6#3` = 3rd Friday of month; only valid in day-of-week field
- **`?` (no specific value)** — required by AWS EventBridge; you must set either day-of-month **or** day-of-week to `?`, never both as `*`

---

#### H2-5: `Quartz Cron vs POSIX Cron: What's the Difference?` — 200 words

**Long-tail placement:** #7 (`cron expression day of week vs day of month`) in the day-fields row; #9 (`quartz cron vs unix cron`) in the intro.

**Paragraph 1 (~40 words) — Quick orientation:**
Both syntaxes express "when to fire," but they differ in precision, special-character support, and the platforms that use them. This table summarizes the 7 most important differences — pick the row you care about most.

**Table (~140 words) — Side-by-side comparison:**

| Dimension | POSIX (5-field) | Quartz (6-field) |
|---|---|---|
| Field count | 5 | 6 (or 7 with year) |
| Seconds precision | ✗ (minute minimum) | ✓ (`0/30 * * * * ?` = every 30 sec) |
| Special chars | `* , - /` | `* , - / L W # ?` |
| Day-of-week numbering | 0–6 (Sunday = 0) | 1–7 (Sunday = 1) **or** 0–6 (depends on impl) |
| Day-of-month vs Day-of-week | Both can be `*` (intersection semantics) | One **must** be `?` (mutually exclusive) |
| Typical platforms | Linux cron, K8s CronJob, GH Actions | Java Quartz, Spring, AWS EventBridge, cron4j |
| Timezone semantics | Platform-dependent (local in Linux cron, UTC in K8s/GH/AWS) | Always UTC in AWS; JVM default in Spring |

**Closing (~20 words):**
The dlsome.top parser auto-detects 5 vs 6 fields and applies the right semantics — type either syntax and it just works.

---

#### H2-6: `Platform Export` (4 sub-platforms, ~450 words total)

**Long-tail placement:** #3 (`kubernetes cron expression generator`), #4 (`github actions cron syntax`), #5 (`aws eventbridge cron expression`) in their respective sub-sections.

> **Implementation note:** This section uses **H3 sub-headings** for each platform (not H2). This matches `ai-prompt-helper.md`'s §"Configuration Controls" pattern (H2 with H3 children).

---

##### H3-6.1: `Kubernetes CronJob` — 110 words

**Paragraph 1 (~30 words):**
Kubernetes CronJob uses standard 5-field POSIX cron, but **always in UTC** — the kube-controller-manager ignores your local timezone. Example: `0 2 * * *` runs daily at 02:00 UTC, which is 10:00 Beijing time (UTC+8).

**Code block (~70 words) — Copy-ready YAML:**

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-job
spec:
  schedule: "0 2 * * *"            # 5-field POSIX, UTC
  concurrencyPolicy: Forbid         # don't overlap runs
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  startingDeadlineSeconds: 60       # must start within 60s
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: your-image:latest
```

**Closing (~10 words):**
See [Kubernetes CronJob docs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) for full options.

---

##### H3-6.2: `GitHub Actions` — 105 words

**Paragraph 1 (~30 words):**
GitHub Actions schedules use 5-field POSIX cron in UTC. Example: `0 3 * * *` runs daily at 03:00 UTC. **GitHub adds one quirk:** scheduled workflows may run up to ~15 minutes late due to shared infrastructure load — the cron field is "approximately" on time, not exactly on time.

**Code block (~65 words):**

```yaml
name: scheduled-job
on:
  schedule:
    - cron: "0 3 * * *"            # 5-field POSIX, UTC
  workflow_dispatch:                 # manual trigger
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "ran at $(date -u)"
```

**Closing (~10 words):**
See [GitHub Actions schedule docs](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) for caveats.

---

##### H3-6.3: `AWS EventBridge` — 110 words

**Paragraph 1 (~40 words):**
EventBridge uses **6-field Quartz-style cron** (`minute hour day-of-month month day-of-week year`), always in UTC. Example: `0 8 ? * MON-FRI *` runs at 08:00 UTC every weekday. **Note the `?` wildcard** — EventBridge requires you to set either day-of-month **or** day-of-week to `?`; you cannot leave both as `*` (this would be ambiguous).

**Code block (~60 words):**

```json
{
  "Name": "my-scheduled-rule",
  "ScheduleExpression": "cron(0 8 ? * MON-FRI *)",
  "State": "ENABLED",
  "Targets": [{
    "Id": "target-1",
    "Arn": "arn:aws:lambda:REGION:ACCOUNT:function:FUNCTION_NAME"
  }]
}
```

**Closing (~10 words):**
See [EventBridge schedule patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html) for full syntax.

---

##### H3-6.4: `systemd` — 115 words

**Paragraph 1 (~30 words):**
systemd timers use a **different syntax** — `OnCalendar=` accepts calendar expressions like `Mon..Fri 09:00:00` rather than cron strings. The dlsome.top parser auto-converts your cron expression to the equivalent systemd calendar format when you click the export button.

**Code block (~75 words):**

```ini
# /etc/systemd/system/my-job.timer
[Unit]
Description=My scheduled job

[Timer]
OnCalendar=Mon..Fri 09:00:00
Persistent=true

[Install]
WantedBy=timers.target

# /etc/systemd/system/my-job.service
[Service]
Type=oneshot
ExecStart=/usr/local/bin/my-job.sh
```

**Closing (~10 words):**
Enable with `systemctl enable --now my-job.timer`. See `man systemd.time` for full calendar spec.

---

#### H2-7: `Common Cron Patterns (30+ Ready-to-Use Expressions)` — 150 words

**Long-tail placement:** #6 (`cron expression every 5 minutes`) in the table; #2 (`how to write a cron expression`) in the intro.

**Paragraph 1 (~30 words):**
Thirty-plus production-tested patterns, click any row to load it into the parser input. All times are in UTC unless noted.

**Table (~100 words) — 30 patterns (selected key rows shown; full 30+ in implementation):**

| Expression | Description | Use case |
|---|---|---|
| `* * * * *` | Every minute | Debugging only |
| `*/5 * * * *` | Every 5 minutes | Health check |
| `*/15 * * * *` | Every 15 minutes | Lightweight job |
| `0 * * * *` | Top of every hour | Hourly batch |
| `0 0 * * *` | Daily at 00:00 UTC | Nightly ETL |
| `0 2 * * *` | Daily at 02:00 UTC | Database backup |
| `0 3 * * 0` | Sunday at 03:00 UTC | Weekly report |
| `30 2 1 * *` | 1st of month at 02:30 UTC | Monthly billing |
| `0 0 1 1 *` | Jan 1 at midnight UTC | Annual job |
| `0 9-17 * * 1-5` | Workdays 9 AM–5 PM, hourly | Slack reminders |
| `0 0 * * 1-5` | Weekdays at midnight UTC | Business-day reports |
| ... (continue to 30+) | | |

**Closing (~20 words):**
Don't see your pattern? Append a row — these are starting points, not an exhaustive list.

---

#### H2-8: `Timezone, DST, and Edge Cases` — 180 words

**Long-tail placement:** #8 (`cron timezone handling dst`) throughout.

**Paragraph 1 (~50 words) — Per-platform timezone summary:**
Cron timezone handling is platform-specific and is the **#1 source of "my job ran at the wrong time" bugs**:

- **Linux system cron** (`crontab -e`) — runs in host's local timezone; DST changes affect fire times
- **Kubernetes CronJob** — always UTC, regardless of pod timezone setting
- **GitHub Actions** — always UTC, always ~on time
- **AWS EventBridge** — always UTC, the `cron(...)` wrapper requires UTC strings
- **Spring `@Scheduled`** — JVM default timezone unless `zone = "UTC"` is set
- **Java Quartz** — configurable per trigger; defaults to JVM timezone

**Paragraph 2 (~50 words) — DST behavior:**
On **DST spring-forward days** (e.g., US "second Sunday of March"), the 02:00–03:00 local hour does not exist. Cron jobs scheduled during that hour may either fire at 03:00 local or be skipped entirely, depending on the implementation. On **DST fall-back days** (e.g., US "first Sunday of November"), the 01:00–02:00 local hour occurs twice — cron jobs in that hour may fire once or twice.

**Paragraph 3 (~50 words) — Last-day-of-month:**
The Quartz `L` character in the day-of-month field means "last day of the month" — `0 0 12 L * ?` fires at noon on the 28th (or 29th in leap years, 30th or 31st otherwise). This is invaluable for "end-of-month billing" jobs that shouldn't require updating the cron string every month.

**Closing (~30 words):**
This tool defaults to UTC to match Kubernetes / GitHub Actions / AWS semantics. Switch the timezone dropdown to preview fire times in any IANA zone — DST boundary fire times are flagged with a yellow ⚠ badge.

---

#### H2-9: `Frequently Asked Questions (FAQ)` — (verbatim from strategy §3.2)

> **Implementation:** All 7 Q&A from strategy §3.2 must be **character-exact** in the English version. Chinese version translates them but keeps Q1–Q7 numbering. Both versions feed JSON-LD FAQPage schema verbatim from §4.2.

---

#### H2-10: `Related DevTools` — 50 words

**Paragraph 1 (~50 words):**
The dlsome.top Cron Expression Parser is one tool in a four-tool "AI + devtools" cluster. After parsing your schedule and exporting to Kubernetes YAML, round-trip through these siblings:

- **[AI Prompt Helper](https://dlsome.top/tools/ai-prompt-helper/)** — Generate prompts for monitoring scripts, log analysis, or alerting workflows.
- **[YAML to JSON](https://dlsome.top/tools/yaml-to-json/)** — Convert your Kubernetes CronJob YAML to JSON for API deployment.
- **[JSON to TypeScript](https://dlsome.top/tools/json-to-typescript/)** — Generate TypeScript types for cron-job-result JSON payloads.
- **[Markdown HTML Converter](https://dlsome.top/tools/markdown-html-converter/)** — Render cron-pattern documentation for your team wiki.

---

## §3. FAQ Section (Verbatim from Strategy §3.2)

> **The 7 Q&A below are the single source of truth for both the visible FAQ in body §9 AND the JSON-LD FAQPage schema in `extend_head.html`. Content agent must copy character-exact.**

### 3.1 English Q&A (verbatim — copy into `cron-parser.en.md`)

```
Q1. How do I write a cron expression?
A cron expression has 5 fields (POSIX) or 6 fields (Quartz), separated by spaces. Read left to right: minute (0–59), hour (0–23), day of month (1–31), month (1–12), day of week (0–6, Sunday = 0). Example: 0 9 * * 1-5 fires at 09:00 every weekday. Special characters are * (every), , (list), - (range), / (step). For Quartz add a leading seconds field (0/30 * * * * ? = every 30 seconds).

Q2. What's the difference between day-of-week and day-of-month in a cron expression?
Day-of-week (5th field) matches when the day-of-month field is * — but if both are restricted, most cron implementations fire only when both match (intersection), while a few (Quartz, AWS EventBridge) fire when either matches (union, controlled by ?). This is the #1 source of "my cron didn't fire" bugs. When in doubt, set one to * and the other to your target.

Q3. How do I write a Kubernetes CronJob schedule?
A Kubernetes CronJob uses standard 5-field POSIX cron, but always in UTC (the kube-controller-manager ignores your local timezone). Example: 0 2 * * * runs daily at 02:00 UTC, which is 10:00 Beijing time (UTC+8). For "every 5 minutes": */5 * * * *. Use this tool's Kubernetes export button to generate the full CronJob YAML with the correct schedule field, restart policy, and concurrency policy.

Q4. How do I write a GitHub Actions cron schedule?
GitHub Actions uses standard 5-field POSIX cron in UTC. Example: 0 3 * * * runs daily at 03:00 UTC. GitHub adds one quirk: due to shared infrastructure load, scheduled workflows may run up to ~15 minutes late — the cron field is "approximately" on time, not "exactly" on time. Format: on: schedule: - cron: '0 3 * * *'. Use this tool's GitHub Actions export to copy the exact YAML block.

Q5. How do I write an AWS EventBridge cron expression?
EventBridge uses 6-field Quartz-style cron (minute hour day-of-month month day-of-week year), all in UTC. Example: 0 8 ? * MON-FRI * runs at 08:00 UTC every weekday. Note the ? wildcard — EventBridge requires you to set either day-of-month or day-of-week to ? (you cannot leave both as *). Use this tool's AWS EventBridge export to generate the full rule JSON with the correct ScheduleExpression.

Q6. How does timezone affect cron jobs?
Cron timezone handling is platform-specific. Linux system cron (crontab -e) runs in the host's local timezone, which means DST changes affect fire times — 0 2 * * * may fire at 03:00 local on the spring-forward day. Kubernetes CronJob always uses UTC, regardless of pod timezone. GitHub Actions always UTC. AWS EventBridge always UTC. Spring @Scheduled uses the JVM's default timezone unless you set zone = .... This tool defaults to UTC and lets you switch to any IANA timezone (e.g., America/New_York, Europe/London) for visualization only — the export strings always use the platform's required timezone.

Q7. What is the difference between Quartz cron and Unix/POSIX cron?
POSIX cron (5 fields, used by Linux system cron, Kubernetes, GitHub Actions) is the legacy standard: minute, hour, day-of-month, month, day-of-week. Quartz cron (6 fields, used by Java Quartz, Spring, AWS EventBridge, cron4j) adds a leading seconds field and supports L (last day of month), W (nearest weekday), # (Nth weekday of month), and ? (no-specific-value). Modern frameworks have largely migrated to Quartz for sub-minute precision. This tool supports both: type a 5-field expression and the parser detects POSIX mode; type a 6-field expression and it detects Quartz mode automatically.
```

### 3.2 Chinese Q&A (translated — copy into `cron-parser.md`)

> **Implementation note:** Chinese translations preserve the Q1–Q7 numbering. The JSON-LD FAQPage `text` field for the Chinese version uses the Chinese translation.

```
Q1. 如何编写一个 cron 表达式?
cron 表达式由 5 个字段(POSIX)或 6 个字段(Quartz)组成,以空格分隔。从左到右依次为:分钟(0-59)、小时(0-23)、日期(1-31)、月份(1-12)、星期(0-6,0 代表星期日)。例如 0 9 * * 1-5 表示每个工作日上午 9 点触发。特殊字符包括 *(任意) 、,(列表) 、-(范围) 、/(步长)。Quartz 语法在最前面加一个秒字段(0/30 * * * * ? 表示每 30 秒触发一次)。

Q2. cron 表达式中"星期"和"日期"字段有什么区别?
星期字段(第 5 个)仅在日期字段为 * 时生效;如果两个字段都被限制,大多数 cron 实现仅在两个条件**同时满足**时触发(交集),而 Quartz、AWS EventBridge 等则在任一条件满足时触发(并集,通过 ? 控制)。这是"我的 cron 没触发"问题的第一大根源。不确定时,把其中一个设为 *,另一个设为你想要的目标。

Q3. 如何编写 Kubernetes CronJob 调度?
Kubernetes CronJob 使用标准 5 字段 POSIX cron,但**始终使用 UTC**(kube-controller-manager 忽略本地时区)。例如 0 2 * * * 表示每天 UTC 02:00 触发(对应北京时间 10:00)。"每 5 分钟"用 */5 * * * *。使用本工具的 Kubernetes 导出按钮可直接生成包含 schedule 字段、restartPolicy 和 concurrencyPolicy 的完整 CronJob YAML。

Q4. 如何编写 GitHub Actions cron 调度?
GitHub Actions 使用标准 5 字段 POSIX cron,UTC 时区。例如 0 3 * * * 表示每天 UTC 03:00 触发。GitHub 有个特殊点:由于共享基础设施负载,定时工作流可能延迟最多约 15 分钟运行——cron 字段是"大致准时",不是"精确准时"。格式:on: schedule: - cron: '0 3 * * *'。使用本工具的 GitHub Actions 导出可直接复制对应的 YAML 块。

Q5. 如何编写 AWS EventBridge cron 表达式?
EventBridge 使用 **6 字段 Quartz 风格**的 cron(分钟 小时 日期 月份 星期 年份),UTC 时区。例如 0 8 ? * MON-FRI * 表示每个工作日 UTC 08:00 触发。注意 ? 通配符——EventBridge 要求日期或星期**必须**有一个设为 ?,不能两个都设为 *(会产生歧义)。使用本工具的 AWS EventBridge 导出可直接生成包含 ScheduleExpression 的完整 rule JSON。

Q6. 时区如何影响 cron 任务?
cron 的时区处理因平台而异。Linux 系统 cron(crontab -e)使用宿主机本地时区,因此 DST 切换会影响触发时间——0 2 * * * 在春进日可能本地时间 03:00 才触发。Kubernetes CronJob 始终使用 UTC,与 pod 时区无关。GitHub Actions 始终 UTC。AWS EventBridge 始终 UTC。Spring @Scheduled 使用 JVM 默认时区,除非显式设置 zone = "..."。本工具默认 UTC(对齐 K8s/GH Actions/AWS 语义),允许切换到任意 IANA 时区仅用于可视化——导出字符串始终使用平台要求的时区。

Q7. Quartz cron 和 Unix/POSIX cron 有什么区别?
POSIX cron(5 字段,Linux 系统 cron、Kubernetes、GitHub Actions 使用)是传统标准:分钟、小时、日期、月份、星期。Quartz cron(6 字段,Java Quartz、Spring、AWS EventBridge、cron4j 使用)在最前面加一个**秒**字段,并支持 L(月末)、W(最近工作日)、#(第 N 个星期几)、?(不指定) 这些特殊字符。现代框架已大规模迁移到 Quartz 以支持秒级精度。本工具同时支持两种:输入 5 字段自动判别 POSIX,输入 6 字段自动判别 Quartz。
```

---

## §4. Frontmatter Specification

### 4.1 English version (`content/tools/cron-parser.en.md`)

```yaml
---
title: "Cron Expression Parser & Generator — Free Online Tool"
description: "Parse any cron expression. Supports POSIX 5-field + Quartz 6-field. One-click export to K8s CronJob YAML, GitHub Actions, AWS EventBridge. No login."
slug: "cron-parser"
date: 2026-07-23T00:00:00+00:00
draft: false
type: "page"
layout: "page"
translationKey: "cron_parser"
url: "/tools/cron-parser/"
tools:
  - "cron"
  - "crontab"
  - "scheduler"
  - "kubernetes"
  - "github-actions"
  - "aws-eventbridge"
  - "systemd"
  - "quartz"
  - "posix"
  - "devops"
  - "sre"
  - "developer-tools"
  - "client-side"
categories:
  - "DevOps Tools"
  - "Developer Tools"
  - "Utilities"
tags:
  - "cron"
  - "crontab"
  - "scheduler"
  - "kubernetes"
  - "github-actions"
  - "aws-eventbridge"
  - "systemd"
  - "quartz"
  - "posix"
  - "devops"
  - "sre"
  - "client-side"
  - "no-signup"
  - "free"
keywords:
  - "cron expression parser"
  - "cron expression generator"
  - "cron parser online"
  - "kubernetes cron expression"
  - "github actions cron"
  - "aws eventbridge cron"
  - "quartz cron vs unix cron"
  - "cron expression every 5 minutes"
  - "cron timezone dst"
  - "next scheduled run cron"
og:
  title: "Cron Expression Parser & Generator — Free Online Tool"
  description: "Free cron expression parser with Quartz 6-field syntax. Export to Kubernetes, GitHub Actions, AWS EventBridge, systemd. 100% client-side."
  image: "/og-images/cron-parser.png"
  image_alt: "Cron Expression Parser showing timeline view with 4 platform export buttons"
  type: "website"
  url: "https://dlsome.top/tools/cron-parser/"
  site_name: "dlsome.top"
  locale: "en_US"
twitter:
  card: "summary_large_image"
  title: "Cron Expression Parser & Generator — Free Online Tool"
  description: "Parse any cron expression. Supports POSIX 5-field + Quartz 6-field. One-click export to K8s CronJob YAML, GitHub Actions, AWS EventBridge. No login."
  image: "/og-images/cron-parser.png"
  image_alt: "Cron Expression Parser with timeline view and platform export panel"
canonical: "https://dlsome.top/tools/cron-parser/"
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

### 4.2 Chinese version (`content/tools/cron-parser.md`)

```yaml
---
title: "Cron 表达式解析器与生成器 — 免费在线工具"
description: "免费在线 Cron 表达式解析与生成。支持 POSIX 5 字段 + Quartz 6 字段语法。一键导出为 Kubernetes CronJob YAML、GitHub Actions workflow、AWS EventBridge 规则。100% 浏览器端,无需登录。"
slug: "cron-parser"
date: 2026-07-23T00:00:00+08:00
draft: false
type: "page"
layout: "page"
translationKey: "cron_parser"
url: "/tools/cron-parser/"
tools:
  - "cron"
  - "crontab"
  - "调度器"
  - "kubernetes"
  - "github-actions"
  - "aws-eventbridge"
  - "systemd"
  - "quartz"
  - "posix"
  - "devops"
  - "sre"
  - "开发者工具"
  - "浏览器端"
categories:
  - "DevOps 工具"
  - "开发者工具"
  - "实用工具"
tags:
  - "cron"
  - "crontab"
  - "调度器"
  - "kubernetes"
  - "github-actions"
  - "aws-eventbridge"
  - "systemd"
  - "quartz"
  - "posix"
  - "devops"
  - "sre"
  - "浏览器端"
  - "无需注册"
  - "免费"
keywords:
  - "cron 表达式解析器"
  - "cron 表达式生成器"
  - "在线 cron 解析"
  - "kubernetes cron 表达式"
  - "github actions cron"
  - "aws eventbridge cron"
  - "quartz cron vs unix cron"
  - "cron 表达式 每 5 分钟"
  - "cron 时区 dst"
  - "下次触发时间"
og:
  title: "Cron 表达式解析器与生成器 — 免费在线工具"
  description: "免费在线 Cron 表达式解析与生成。支持 POSIX 5 字段 + Quartz 6 字段。一键导出为 Kubernetes、GitHub Actions、AWS EventBridge、systemd。100% 浏览器端。"
  image: "/og-images/cron-parser.png"
  image_alt: "Cron 表达式解析器:时间轴视图 + 4 平台导出按钮"
  type: "website"
  url: "https://dlsome.top/zh/tools/cron-parser/"
  site_name: "dlsome.top"
  locale: "zh_CN"
twitter:
  card: "summary_large_image"
  title: "Cron 表达式解析器与生成器 — 免费在线工具"
  description: "免费在线 Cron 表达式解析。支持 POSIX 5 字段 + Quartz 6 字段。一键导出为 K8s CronJob YAML、GitHub Actions、AWS EventBridge。无需登录。"
  image: "/og-images/cron-parser.png"
  image_alt: "Cron 表达式解析器时间轴视图 + 平台导出面板"
canonical: "https://dlsome.top/zh/tools/cron-parser/"
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

### 4.3 Frontmatter deviation from `ai-prompt-helper` precedent

| Field | `ai-prompt-helper` value | `cron-parser` value | Reason |
|---|---|---|---|
| `applicationCategory` (JSON-LD) | `UtilitiesApplication` | `DeveloperApplication` | Strategy §4.1 — cron-parser is explicitly a developer tool (devops audience) |
| `translationKey` | `ai_prompt_helper` | `cron_parser` | New tool, new key |
| `tools` list | 16 items | 13 items | Trimmed to devops-relevant only |
| `image_alt` (OG / Twitter) | Tool-specific | "timeline view + 4 platform export buttons" | Concrete UI description for accessibility |

All other fields follow `ai-prompt-helper.en.md` pattern character-exact.

---

## §5. Resource Files Required

### 5.1 OG image: `/static/og-images/cron-parser.png`

- **Size:** 1200×630 PNG
- **Layout:** Left 50% = tool UI screenshot showing timeline (5–10 fire time cards with local + UTC times); right 50% = large title "Free Cron Expression Parser" + four platform logos (Kubernetes / GitHub Actions / AWS EventBridge / systemd) in a 2×2 grid + dlsome.top brand logo bottom-right
- **Colors:** Match PaperMod dark theme: background `#0f172a`, accent `#6aa9ff`, text `#d8d9dd`
- **Status:** Generated by content agent or design subagent using `image_generate`. Not present yet at this strategy timestamp.

### 5.2 Tool screenshot: `/static/screenshots/cron-parser.png`

- **Size:** 800×600 PNG (or animated GIF if shortcode allows)
- **Content:** Cron parser UI in default state: input box showing `0 9 * * 1-5`, timeline below with 5 weekday 9 AM cards, 4 platform export buttons visible at bottom
- **Purpose:** Reference image for §3.1 H2 §2 ("How to Use")
- **Status:** To be generated post-implementation when shortcode is built.

### 5.3 Schema injection location: `layouts/partials/extend_head.html`

The cron-parser schemas (WebApplication, FAQPage, BreadcrumbList, HowTo) inject into `extend_head.html` via a new `if`-block keyed by `Slug == "cron-parser"` (mirroring the `ai-prompt-helper` if-block pattern). This is **engineering agent's** task, not content agent's. The complete JSON-LD strings come from strategy §4.1–§4.4.

---

## §6. Internal Linking Checklist

The content agent must include these links in the body copy:

### 6.1 Outbound links (this page → other dlsome.top tools)

| Where | Link text | Target URL |
|---|---|---|
| §6 H3-6.1 (K8s) | "round-trip through yaml-to-json" | `/tools/yaml-to-json/` |
| §6 H3-6.3 (AWS) | "convert rule JSON with json-to-typescript" | `/tools/json-to-typescript/` |
| §10 Related DevTools | "AI Prompt Helper" | `/tools/ai-prompt-helper/` |
| §10 Related DevTools | "YAML to JSON" | `/tools/yaml-to-json/` |
| §10 Related DevTools | "JSON to TypeScript" | `/tools/json-to-typescript/` |
| §10 Related DevTools | "Markdown HTML Converter" | `/tools/markdown-html-converter/` |

### 6.2 Inbound links (other dlsome.top tools → this page)

This is **engineering / content agent's** task to add to existing tool pages (out of scope for cron-parser body copy itself):

| Source page | Suggested anchor text |
|---|---|
| `content/tools/ai-prompt-helper.en.md` §"Related Tools" | "scheduling AI agent tasks? check cron expressions with the Cron Expression Parser" |
| `content/tools/yaml-to-json.en.md` §"Related" | "round-trip Kubernetes CronJob YAML through the Cron Expression Parser" |
| `content/tools/json-to-typescript.en.md` §"Related" | "generate types for cron-job-result payloads" |

### 6.3 External references (with rel="nofollow noopener" optional)

These are referenced in body copy for credibility — content agent may link out:

| URL | Used in | rel |
|---|---|---|
| `https://man7.org/linux/man-pages/man5/crontab.5.html` | §3 intro | `nofollow noopener` (man page) |
| `https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html` | §4 intro | `nofollow noopener` (official docs) |
| `https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html` | §6 H3-6.3 closing | `nofollow noopener` (official docs) |
| `https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/` | §6 H3-6.1 closing | `nofollow noopener` (official docs) |
| `https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule` | §6 H3-6.2 closing | `nofollow noopener` (official docs) |

---

## §7. Voice & Style Enforcement

Per strategy §7, the dlsome-top voice differs from webpenson-tools. Content agent must follow these rules:

### 7.1 DO ✅

- Use "cron expression" not "scheduled task string"
- Use "fire time" / "fires" not "execution time" / "executes" (when referring to cron)
- Use "POSIX 5-field" / "Quartz 6-field" with parenthetical explanation on first mention
- Code in tables: `*/5 * * * *` rather than "every 5 minutes"
- Be explicit about platform differences (e.g., "Kubernetes uses UTC; system cron uses local")
- Use K8s, GH Actions, AWS abbreviations after first spell-out

### 7.2 DON'T ❌

- Don't write "easy to use" / "simple" / "intuitive" — show, don't tell
- Don't repeat webpenson-tools' "What is a Cron Expression?" intro paragraph (it's for beginners)
- Don't use exclamation marks
- Don't use marketing fluff ("amazing", "powerful", "revolutionary")
- Don't write more than 2 paragraphs without a code block or table
- Don't reference other dlsome-top tools as "sister tools" (call them "related" or "in this cluster")

### 7.3 First-mention rule

When introducing an acronym, expand it once in parentheses. Examples from the body copy:

| Acronym | First mention |
|---|---|
| POSIX | "POSIX (Portable Operating System Interface cron, the legacy 5-field standard)" |
| Quartz | "Quartz (a Java job-scheduling library that popularized 6-field cron)" |
| K8s | "Kubernetes (often abbreviated K8s)" |
| GH Actions | "GitHub Actions (often abbreviated GH Actions)" |
| AWS | "AWS EventBridge (Amazon's serverless event bus)" |
| UTC | "UTC (Coordinated Universal Time)" |
| DST | "DST (Daylight Saving Time)" |
| IANA | "IANA (Internet Assigned Numbers Authority, the timezone database maintainer)" |
| YAML | "YAML (YAML Ain't Markup Language, the human-readable data format)" |
| JSON | "JSON (JavaScript Object Notation)" |
| IANA | (see above) |

Chinese version: same rule, translations first then English acronym in parens.

---

## §8. Acceptance Checklist (Content Agent)

### 8.1 Content files
- [ ] `content/tools/cron-parser.en.md` exists with full frontmatter (§4.1) + body (§2) + 7 FAQ (§3.1 verbatim)
- [ ] `content/tools/cron-parser.md` exists with full frontmatter (§4.2) + body (§2) + 7 FAQ (§3.2 translated)
- [ ] Both files include `{{< cron-parser >}}` shortcode invocation
- [ ] Both files end with `Related DevTools` section linking to 4 sibling tools
- [ ] Both files have character-exact title and description matching strategy §2.3

### 8.2 Schema injection
- [ ] `layouts/partials/extend_head.html` has new `if`-block for `Slug == "cron-parser"`
- [ ] Block contains: canonical, OG (8 tags), Twitter (5 tags), JSON-LD WebApplication, FAQPage, BreadcrumbList, HowTo
- [ ] FAQPage `text` strings are verbatim from strategy §4.2 (en) or translated from §3.2 (zh)

### 8.3 Resources
- [ ] `/static/og-images/cron-parser.png` (1200×630) generated
- [ ] `/static/screenshots/cron-parser.png` (800×600) generated post-shortcode implementation
- [ ] `README.md` updated with cron-parser section + 4 platform export examples

### 8.4 Internal links (in body)
- [ ] §6 H3-6.1 has 1 outbound link to `/tools/yaml-to-json/`
- [ ] §6 H3-6.3 has 1 outbound link to `/tools/json-to-typescript/`
- [ ] §10 Related DevTools has 4 outbound links (one per sibling tool)
- [ ] Total: ≥ 6 outbound links to dlsome.top tools

### 8.5 Voice & style (§7)
- [ ] No "easy / simple / intuitive / powerful / amazing" filler words
- [ ] First-mention rule applied for all acronyms in §7.3
- [ ] All cron examples in `code` formatting, not prose
- [ ] No exclamation marks

### 8.6 Word count
- [ ] English body (excluding FAQ + frontmatter + code blocks): 1700–1900 words
- [ ] Chinese body (excluding FAQ + frontmatter + code blocks): 1500–1800 characters (CJK counts differently)

---

## §9. Post-Implementation

Once content agent's commit lands on `feat/cron-parser`:

1. **Verifier agent** checks: frontmatter validity, JSON-LD schema validity (use Google's [Rich Results Test](https://search.google.com/test/rich-results)), FAQ verbatim match, internal link presence
2. **Engineering agent** confirms shortcode renders correctly, dev server (`hugo server -D`) shows no errors, all 4 export buttons produce valid YAML/JSON
3. **PR raised** to merge `feat/cron-parser` → `main` on `pxn626/dlsome-top`
4. **Cloudflare Pages auto-deploy** picks up the merge and publishes to `https://dlsome.top/tools/cron-parser/`
5. **Submit to Google Search Console** with the canonical URL after deploy
6. **Update webpenson-tools cluster** — add the cross-site link from webpenson-tools' cron-parser to dlsome-top's cron-parser (separate cron task, not in this PR)

---

## §10. Plan Document Versioning

- **v1.0** (2026-07-23) — Initial plan, based on `cron-parser-strategy.md` v1.0 and `cron-parser-content-plan-task.md` brief
- **v1.1** (pending) — Adjustments after content agent's first commit
- **v2.0** (future) — Post-30-day data: actual word counts, organic CTR from Search Console, FAQ rich-result impressions

---

**End of Content Plan.**

> Engineering agent: this document is your spec. Don't re-derive requirements from the strategy doc — use §2 body briefs and §3 FAQ verbatim sources directly. If the shortcode architecture diverges from strategy §6.3 (e.g., inline JSON for presets exceeds 4KB and you decide to split-file), note the deviation in your PR description but don't change the content copy.