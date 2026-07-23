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


{{< cron-parser >}}


# Cron 表达式解析器与生成器 — 免费在线工具

免费在线 Cron 表达式解析与生成工具,支持 POSIX 5 字段与 Quartz 6 字段语法,可显示未来 10 次触发时间的时间轴,并一键导出为可直接粘贴的 Kubernetes CronJob YAML、GitHub Actions workflow YAML、AWS EventBridge 规则 JSON 或 systemd timer 配置单元。所有运算 100% 在浏览器内完成 —— 无需登录、无需 API key、无服务端往返、无任何遥测上报。

如果你曾经盯着 `0 9 * * 1-5` 反复琢磨它是"每个工作日上午 9 点"还是"每月 1 到 5 日上午 9 点",这个工具能在不到一秒内给你答案,还能顺手生成对应平台的部署清单。

## 什么是 Cron 表达式解析器?

**cron 表达式解析器**是一种开发者工具,用于将 cron 调度字符串解码为人类可读的描述以及未来若干次触发时间的列表。Cron 表达式由 5 字段(POSIX)或 6 字段(Quartz)组成,以空格分隔,出现在所有需要周期性调度的系统中 —— Linux 系统 cron、Kubernetes CronJob、GitHub Actions、AWS EventBridge、Spring `@Scheduled`、Java Quartz,以及数十种 CI/CD 和可观测性平台。如果你曾经盯着 `0 9 * * 1-5` 不确定它到底是"每个工作日上午 9 点"还是"每月 1 到 5 日上午 9 点",解析器可以省去你反复试错的成本。

与平台专属文档不同,优秀的解析器会以**时间轴**形式展示未来 10 次触发时间,让你一眼判断调度是否符合预期。dlsome.top 的 cron 解析器可自动识别 POSIX(5 字段)和 Quartz(6 字段)两种语法,支持所有特殊字符(`* , - / L W # ?`),并默认使用 UTC(Coordinated Universal Time,协调世界时)以保证跨平台行为可预测。需要本地时间预览?只需把时区下拉框切换到 `America/New_York` 或 `Asia/Shanghai`,时间轴即刻刷新。

多数解析器止步于"展示触发时间"。本工具更进一步:点击一次即可导出为 **Kubernetes CronJob YAML**、**GitHub Actions workflow**、**AWS EventBridge 规则 JSON** 或 **systemd timer + service** —— 完整格式化、可直接粘贴到 manifest 中,并采用对应平台要求的时区约定。再也不用担心"我 YAML 写对了吗"。

## 如何使用本 Cron 表达式解析器

三步覆盖 90% 的 cron 使用场景。

**第 1 步 —— 输入表达式。** 在输入框中键入或粘贴你的 cron 表达式。5 字段(POSIX)如 `0 9 * * 1-5`,或 6 字段(Quartz)如 `0 0 12 * * ?` —— 解析器自动识别并在输入框下方显示语法徽章("POSIX" / "Quartz")。非法表达式会以红色 ✗ 加具体错误信息提示。

**第 2 步 —— 选择时区。** 时区下拉框默认为 UTC(Kubernetes、GitHub Actions、AWS EventBridge 均使用 UTC)。可切换到 `America/New_York`、`Europe/London`、`Asia/Shanghai` 或 50+ IANA(Internet Assigned Numbers Authority,IANA 时区数据库维护机构)时区中的任意一个,在本地时钟下预览触发时间。任何落在 DST(Daylight Saving Time,夏令时)切换点的触发时间会显示黄色 ⚠ 徽章。

**第 3 步 —— 查看时间轴并导出。** 水平时间轴以卡片形式展示未来 10 次触发时间,每张卡片包含本地时间、UTC 时间和相对偏移(如"2 天 4 小时后")。时间轴下方点击四个导出按钮中的任意一个 —— **Kubernetes**、**GitHub Actions**、**AWS EventBridge** 或 **systemd** —— 即可复制一份可直接粘贴的配置块。

## Cron 表达式语法参考(POSIX 5 字段)

POSIX cron 语法是**传统 5 字段格式**,被 Linux 系统 cron(`crontab -e`)、Kubernetes CronJob、GitHub Actions 及大多数 Unix 衍生调度器使用。字段从左到右依次为:**分钟(0-59)、小时(0-23)、日期(1-31)、月份(1-12)、星期(0-6,0 代表星期日)**。特殊字符包括 `*`(任意)、`,`(列表)、`-`(范围)、`/`(步长)。参考:`man crontab(5)`。

| 字段 | 取值范围 | 特殊字符 | 示例 |
|---|---|---|---|
| 分钟 | 0-59 | `* , - /` | `*/15` = 每 15 分钟 |
| 小时 | 0-23 | `* , - /` | `9-17` = 上午 9 点至下午 5 点 |
| 日期 | 1-31 | `* , - /` | `1,15` = 1 日和 15 日 |
| 月份 | 1-12(或 JAN-DEC) | `* , - /` | `1-3` = 1 月至 3 月 |
| 星期 | 0-6(或 SUN-SAT) | `* , - /` | `1-5` = 周一至周五 |

六种常见模式覆盖绝大多数生产 cron 任务:

- `* * * * *` —— 每分钟触发(仅用于调试,严禁生产环境运行)
- `*/5 * * * *` —— 每 5 分钟
- `0 * * * *` —— 每小时整点
- `0 0 * * *` —— 每天 UTC 00:00(午夜)
- `0 0 * * 0` —— 每周日 UTC 00:00
- `0 9-17 * * 1-5` —— 工作日 9 点至 17 点每小时

如需 Quartz 风格 6 字段语法(秒级精度 + `L W #` 支持),见下文。解析器自动识别你使用的模式。

## Quartz Cron 6 字段语法(扩展)

**Quartz cron 语法**在最前面增加一个**秒**字段(0-59),在末尾可选增加一个**年**字段,共 6 或 7 字段。它是 **Java Quartz**、**Spring `@Scheduled`**、**AWS EventBridge**、**cron4j**、**Hyperf** 等现代框架的事实标准 —— 任何需要秒级精度或高级日期选择器的场景都会用到它。参考:[Quartz CronTrigger 教程](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)。

| 字段 | 取值范围 | 特殊字符 | 示例 |
|---|---|---|---|
| 秒 | 0-59 | `* , - /` | `0/30` = 每 30 秒 |
| 分钟 | 0-59 | `* , - /` | `0` = 整分 |
| 小时 | 0-23 | `* , - /` | `9` = 上午 9 点 |
| 日期 | 1-31 | `* , - / L W ?` | `L` = 月末 |
| 月份 | 1-12 | `* , - /` | `*` = 任意月 |
| 星期 | 1-7(SUN=1)或 0-6 | `* , - / L # ?` | `6#3` = 第 3 个周五 |
| 年(可选) | 1970-2099 | `* , - /` | `2026` |

Quartz 在 POSIX 基础上额外支持四种特殊字符:

- **`L`(last,月末)** —— 日期字段中的 `L` 表示当月最后一天;星期字段中的 `7L` 表示当月最后一个周六;`L-3` 表示当月倒数第 3 天
- **`W`(weekday,最近工作日)** —— `15W` 表示离 15 日最近的工作日(周一至周五;若 15 日为周六则向前取周五,为周日则向后取周一)
- **`#`(第 N 个星期几)** —— `6#3` 表示当月第 3 个周五;仅在星期字段有效
- **`?`(无特定值)** —— AWS EventBridge 强制要求:日期或星期**必须**有一个设为 `?`,不能两个都设为 `*`

## Quartz Cron vs POSIX Cron:有什么区别?

两种语法都用于表达"何时触发",但在精度、特殊字符支持和适用平台三方面存在差异。下表汇总了 7 个最关键的区别 —— 选你最关心的那一行开始读即可。

| 维度 | POSIX(5 字段) | Quartz(6 字段) |
|---|---|---|
| 字段数 | 5 | 6(或 7 含年份) |
| 秒级精度 | ✗(最低分钟) | ✓(`0/30 * * * * ?` = 每 30 秒) |
| 特殊字符 | `* , - /` | `* , - / L W # ?` |
| 星期编号 | 0-6(0 = 周日) | 1-7(1 = 周日)**或** 0-6(取决于实现) |
| 日期 vs 星期 | 两者都可为 `*`(交集语义) | 两者**必有一个**为 `?`(互斥) |
| 典型平台 | Linux cron、K8s CronJob、GitHub Actions | Java Quartz、Spring、AWS EventBridge、cron4j |
| 时区语义 | 平台相关(Linux cron 为本地,K8s/GH/AWS 为 UTC) | AWS 中始终 UTC;Spring 中为 JVM 默认时区 |

dlsome.top 解析器自动识别 5 或 6 字段并应用对应语义 —— 输入哪种语法都能立即工作。

## 平台导出:Kubernetes / GitHub Actions / AWS EventBridge / systemd

本节是导出能力的核心:为你最常部署 cron 调度的四个平台提供可直接粘贴的配置块。每个子节包含平台的 cron 语义说明、一段可直接复制使用的 YAML/JSON,以及通往官方文档的完整选项链接。

### Kubernetes CronJob

Kubernetes CronJob 使用标准 5 字段 POSIX cron,但**始终使用 UTC** —— kube-controller-manager 忽略本地时区。例如 `0 2 * * *` 表示每天 UTC 02:00 触发(对应北京时间 10:00)。

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-job
spec:
  schedule: "0 2 * * *"            # 5 字段 POSIX,UTC
  concurrencyPolicy: Forbid         # 不并发执行
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  startingDeadlineSeconds: 60       # 必须在 60 秒内开始
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: your-image:latest
```

完整选项见 [Kubernetes CronJob 文档](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)。生成 YAML 后,如果你的 CI 流水线消费 JSON 清单,可以[用 yaml-to-json 来回转换](https://dlsome.top/tools/yaml-to-json/)。

### GitHub Actions

GitHub Actions 定时任务使用 5 字段 POSIX cron,UTC 时区。例如 `0 3 * * *` 表示每天 UTC 03:00 触发。**GitHub 有个特殊点:** 由于共享基础设施负载,定时工作流可能延迟最多约 15 分钟运行 —— cron 字段是"大致准时",不是"精确准时"。

```yaml
name: scheduled-job
on:
  schedule:
    - cron: "0 3 * * *"            # 5 字段 POSIX,UTC
  workflow_dispatch:                 # 手动触发
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "ran at $(date -u)"
```

注意事项见 [GitHub Actions schedule 文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)。

### AWS EventBridge

EventBridge 使用 **6 字段 Quartz 风格**的 cron(`分钟 小时 日期 月份 星期 年份`),UTC 时区。例如 `0 8 ? * MON-FRI *` 表示每个工作日 UTC 08:00 触发。**注意 `?` 通配符** —— EventBridge 要求日期或星期**必须**有一个设为 `?`;两者都设为 `*` 是不允许的(会产生歧义)。

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

完整语法见 [EventBridge schedule patterns 文档](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html)。导出后,你可以通过 [json-to-typescript 为规则 payload 生成类型](https://dlsome.top/tools/json-to-typescript/),用于 IaC 代码库。

### systemd

systemd timer 使用**另一种语法** —— `OnCalendar=` 接受类似 `Mon..Fri 09:00:00` 的日历表达式,而不是 cron 字符串。dlsome.top 解析器在点击导出按钮时会自动将你的 cron 表达式转换为等价的 systemd 日历格式。

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

使用 `systemctl enable --now my-job.timer` 启用。完整日历规范见 `man systemd.time`。

## 常用 Cron 模式(30+ 即用型表达式)

30+ 经过生产检验的模式,点击预设库中的任意一行即可加载到解析器输入框。除非另行说明,所有时间均为 UTC。

| 表达式 | 描述 | 用途 |
|---|---|---|
| `* * * * *` | 每分钟 | 仅调试 |
| `*/5 * * * *` | 每 5 分钟 | 健康检查 |
| `*/15 * * * *` | 每 15 分钟 | 轻量任务 |
| `0 * * * *` | 每小时整点 | 批量任务 |
| `0 0 * * *` | 每天 UTC 00:00 | 夜间 ETL |
| `0 2 * * *` | 每天 UTC 02:00 | 数据库备份 |
| `0 3 * * 0` | 周日 UTC 03:00 | 周报 |
| `30 2 1 * *` | 每月 1 日 UTC 02:30 | 月度账单 |
| `0 0 1 1 *` | 1 月 1 日 UTC 00:00 | 年度任务 |
| `0 9-17 * * 1-5` | 工作日 9-17 点每小时 | Slack 提醒 |
| `0 0 * * 1-5` | 工作日 UTC 00:00 | 业务日报 |

没看到你的模式?这些只是起点,不是穷举 —— 解析器接受完整的 POSIX/Quartz 语法,你在 `crontab` 中能写的任何表达式都可以在这里使用。

## 时区、DST 与边界情况

Cron 时区处理因平台而异,是**"我的任务跑错时间"问题的头号根源**:

- **Linux 系统 cron**(`crontab -e`)—— 使用宿主机本地时区;DST 切换会影响触发时间
- **Kubernetes CronJob** —— 始终 UTC,与 pod 时区设置无关
- **GitHub Actions** —— 始终 UTC,大致准时
- **AWS EventBridge** —— 始终 UTC,`cron(...)` 包装器要求 UTC 字符串
- **Spring `@Scheduled`** —— JVM 默认时区,除非显式设置 `zone = "UTC"`
- **Java Quartz** —— 每个 trigger 可独立配置,默认 JVM 时区

**DST 春进日**(如美国"3 月第二个周日"),本地 02:00-03:00 这一小时不存在。调度在该小时的 cron 任务可能在本地 03:00 触发,也可能被完全跳过,取决于具体实现。**DST 秋退日**(如美国"11 月第一个周日"),本地 01:00-02:00 这一小时会出现两次,该小时的 cron 任务可能触发一次或两次。

Quartz 日期字段中的 `L` 字符表示"当月最后一天" —— `0 0 12 L * ?` 在 28 日(或闰年的 29 日、其他情况的 30 或 31 日)中午触发。这对"月末结算"类任务非常有用,无需每月修改 cron 字符串。

本工具默认使用 UTC 以对齐 Kubernetes / GitHub Actions / AWS 语义。切换时区下拉框可在任意 IANA 时区下预览触发时间 —— DST 边界点的触发时间会以黄色 ⚠ 徽章标记。

## 常见问题解答(FAQ)

### 如何编写一个 cron 表达式?

cron 表达式由 5 个字段(POSIX)或 6 个字段(Quartz)组成,以空格分隔。从左到右依次为:分钟(0-59)、小时(0-23)、日期(1-31)、月份(1-12)、星期(0-6,0 代表星期日)。例如 `0 9 * * 1-5` 表示每个工作日上午 9 点触发。特殊字符包括 `*`(任意)、`,`(列表)、`-`(范围)、`/`(步长)。Quartz 语法在最前面加一个秒字段(`0/30 * * * * ?` 表示每 30 秒触发一次)。

### cron 表达式中"星期"和"日期"字段有什么区别?

星期字段(第 5 个)仅在日期字段为 `*` 时生效;如果两个字段都被限制,大多数 cron 实现仅在两个条件**同时满足**时触发(交集),而 Quartz、AWS EventBridge 等则在任一条件满足时触发(并集,通过 `?` 控制)。这是"我的 cron 没触发"问题的第一大根源。不确定时,把其中一个设为 `*`,另一个设为你想要的目标。

### 如何编写 Kubernetes CronJob 调度?

Kubernetes CronJob 使用标准 5 字段 POSIX cron,但**始终使用 UTC**(kube-controller-manager 忽略本地时区)。例如 `0 2 * * *` 表示每天 UTC 02:00 触发(对应北京时间 10:00)。"每 5 分钟"用 `*/5 * * * *`。使用本工具的 Kubernetes 导出按钮可直接生成包含 `schedule` 字段、`restartPolicy` 和 `concurrencyPolicy` 的完整 CronJob YAML。

### 如何编写 GitHub Actions cron 调度?

GitHub Actions 使用标准 5 字段 POSIX cron,UTC 时区。例如 `0 3 * * *` 表示每天 UTC 03:00 触发。GitHub 有个特殊点:由于共享基础设施负载,定时工作流可能延迟最多约 15 分钟运行 —— cron 字段是"大致准时",不是"精确准时"。格式:`on: schedule: - cron: '0 3 * * *'`。使用本工具的 GitHub Actions 导出可直接复制对应的 YAML 块。

### 如何编写 AWS EventBridge cron 表达式?

EventBridge 使用 **6 字段 Quartz 风格**的 cron(`分钟 小时 日期 月份 星期 年份`),UTC 时区。例如 `0 8 ? * MON-FRI *` 表示每个工作日 UTC 08:00 触发。注意 `?` 通配符 —— EventBridge 要求日期或星期**必须**有一个设为 `?`,不能两个都设为 `*`(会产生歧义)。使用本工具的 AWS EventBridge 导出可直接生成包含 `ScheduleExpression` 的完整 rule JSON。

### 时区如何影响 cron 任务?

cron 的时区处理因平台而异。Linux 系统 cron(`crontab -e`)使用宿主机本地时区,因此 DST 切换会影响触发时间 —— `0 2 * * *` 在春进日可能本地时间 03:00 才触发。Kubernetes CronJob 始终使用 UTC,与 pod 时区无关。GitHub Actions 始终 UTC。AWS EventBridge 始终 UTC。Spring `@Scheduled` 使用 JVM 默认时区,除非显式设置 `zone = "..."`。本工具默认 UTC(对齐 K8s/GH Actions/AWS 语义),允许切换到任意 IANA 时区仅用于可视化 —— 导出字符串始终使用平台要求的时区。

### Quartz cron 和 Unix/POSIX cron 有什么区别?

POSIX cron(5 字段,Linux 系统 cron、Kubernetes、GitHub Actions 使用)是传统标准:分钟、小时、日期、月份、星期。Quartz cron(6 字段,Java Quartz、Spring、AWS EventBridge、cron4j 使用)在最前面加一个**秒**字段,并支持 `L`(月末)、`W`(最近工作日)、`#`(第 N 个星期几)、`?`(不指定)这些特殊字符。现代框架已大规模迁移到 Quartz 以支持秒级精度。本工具同时支持两种:输入 5 字段自动判别 POSIX,输入 6 字段自动判别 Quartz。

## 相关开发工具

dlsome.top 的 Cron 表达式解析器是"AI + 开发者工具"四件套中的一员。解析完调度并导出 Kubernetes YAML 后,可以继续在以下工具中流转:

- [AI Prompt Helper](https://dlsome.top/tools/ai-prompt-helper/) —— 为监控脚本、日志分析、告警工作流生成 prompt。
- [YAML to JSON](https://dlsome.top/tools/yaml-to-json/) —— 将 Kubernetes CronJob YAML 转换为 JSON,用于 API 部署。
- [JSON to TypeScript](https://dlsome.top/tools/json-to-typescript/) —— 为 cron 任务结果的 JSON payload 生成 TypeScript 类型。
- [Markdown HTML Converter](https://dlsome.top/tools/markdown-html-converter/) —— 将 cron 模式文档渲染为 HTML,用于团队 wiki。