/* ==========================================================================
 * JSONPath Tester — Client-Side Tool (Main Thread)
 *
 * Three syntax engines: JSONPath / JSONata / JMESPath
 * Tree view with path highlight + lazy expand + localStorage history + share URL.
 *
 * Dependencies:
 *   - lib/jsonpath-plus.js (default-loaded, ~26KB)
 *   - lib/jsonata.js       (lazy on JSONata tab, ~78KB)
 *   - lib/jmespath.js      (lazy on JMESPath tab, ~23KB)
 *
 * Namespace: --jpt-* / .jpt-* / data-jpt-*
 * Zero network: 100% client-side, no external APIs, no analytics.
 * ========================================================================== */

import { JSONPath } from '../lib/jsonpath-plus.js';

/* ===== I18N strings (inline, no yaml — dlsome-top has no i18n/*.yaml) ===== */
const I18N = {
  en: {
    title: 'JSONPath Tester',
    subtitle: 'Test JSONPath / JSONata / JMESPath expressions with live preview, tree view, and shareable URL.',
    tabs: { jsonpath: 'JSONPath', jsonata: 'JSONata', jmespath: 'JMESPath' },
    syntaxHints: {
      jsonpath: 'Use `$` for root, e.g. `$.store.book[0].title`',
      jsonata: 'No `$` prefix needed, e.g. `store.book.title`',
      jmespath: 'No root prefix, e.g. `store.book[*].title`'
    },
    disclaimer: '100% client-side · zero network requests · no data uploaded · localStorage only',
    expressionLabel: 'Expression',
    expressionPlaceholder: 'Type your expression here…',
    jsonLabel: 'JSON Input',
    jsonPlaceholder: 'Paste your JSON here…',
    validate: 'Validate',
    format: 'Format',
    clear: 'Clear',
    presetsLabel: 'Presets',
    examplesLabel: 'Load Example',
    resultLabel: 'Result',
    matchLabel: 'matches',
    modeRaw: 'Raw JSON',
    modeTree: 'Tree View',
    modeCompact: 'Compact',
    historyLabel: 'History',
    historyEmpty: 'No history yet. Try a query to populate.',
    historyUnavailable: 'Browser privacy mode — history unavailable.',
    historyLoad: 'Load',
    historyClear: 'Clear all',
    shareLabel: 'Share / Export',
    shareGenerate: 'Generate Share URL',
    shareCopy: 'Copy URL',
    shareDownload: 'Download as .json',
    shareEmpty: 'Enter JSON + expression first.',
    shareTooLarge: 'JSON too large for URL share. Download as .json file instead.',
    shareCopied: 'Share URL copied to clipboard',
    errorJson: 'Invalid JSON',
    errorJsonpath: 'JSONPath Error',
    errorJsonata: 'JSONata Error',
    errorJmespath: 'JMESPath Error',
    errorWorker: 'Worker thread unavailable',
    showDetails: 'Show details',
    treeTooLarge: 'JSON too large ({nodes} nodes). Refine expression to narrow scope.',
    examples: { 'sample-store': 'Sample Store', 'user-profile': 'User Profile', 'api-response': 'API Response', 'shopify-order': 'Shopify Order' },
    presetNames: { 'recursive-descent': 'Recursive descent', 'wildcard': 'Wildcard', 'filter': 'Filter', 'slice': 'Slice', 'key-search': 'Recursive key' }
  },
  zh: {
    title: 'JSONPath 在线测试器',
    subtitle: '测试 JSONPath / JSONata / JMESPath 表达式,实时预览 + 树视图 + 可分享 URL。',
    tabs: { jsonpath: 'JSONPath', jsonata: 'JSONata', jmespath: 'JMESPath' },
    syntaxHints: {
      jsonpath: '使用 `$` 表示根,如 `$.store.book[0].title`',
      jsonata: '无需 `$` 前缀,如 `store.book.title`',
      jmespath: '无根符号,如 `store.book[*].title`'
    },
    disclaimer: '100% 客户端运行 · 零网络请求 · 不上传数据 · 仅用 localStorage',
    expressionLabel: '表达式',
    expressionPlaceholder: '输入表达式…',
    jsonLabel: 'JSON 输入',
    jsonPlaceholder: '粘贴 JSON…',
    validate: '验证',
    format: '格式化',
    clear: '清空',
    presetsLabel: '预设模式',
    examplesLabel: '加载示例',
    resultLabel: '结果',
    matchLabel: '匹配',
    modeRaw: '原始 JSON',
    modeTree: '树视图',
    modeCompact: '单行',
    historyLabel: '历史记录',
    historyEmpty: '暂无历史记录,执行查询后将出现。',
    historyUnavailable: '当前浏览器无痕模式,历史记录不可用。',
    historyLoad: '加载',
    historyClear: '清空全部',
    shareLabel: '分享 / 导出',
    shareGenerate: '生成分享 URL',
    shareCopy: '复制 URL',
    shareDownload: '下载 .json 文件',
    shareEmpty: '请先输入 JSON 和表达式。',
    shareTooLarge: 'JSON 过大,无法通过 URL 分享。请下载为 .json 文件。',
    shareCopied: '分享 URL 已复制到剪贴板',
    errorJson: 'JSON 解析错误',
    errorJsonpath: 'JSONPath 错误',
    errorJsonata: 'JSONata 错误',
    errorJmespath: 'JMESPath 错误',
    errorWorker: 'Worker 线程不可用',
    showDetails: '查看详情',
    treeTooLarge: 'JSON 过大 ({nodes} 节点)。请缩小表达式范围。',
    examples: { 'sample-store': '样例商店', 'user-profile': '用户档案', 'api-response': 'API 响应', 'shopify-order': 'Shopify 订单' },
    presetNames: { 'recursive-descent': '递归下降', 'wildcard': '通配符', 'filter': '过滤', 'slice': '切片', 'key-search': '按 key 递归' }
  }
};

/* ===== Engine cache (lazy-loaded) ===== */
const engineCache = {};

/* ===== Shortcut helpers ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

/* ===== Path helpers ===== */
function buildJsonPath(key, parentPath, isArrayIndex = false) {
  if (key === undefined || key === null) return parentPath || '$';
  const safe = typeof key === 'string' && !/^[a-zA-Z_$][\w$]*$/.test(key);
  if (safe) return `${parentPath}['${key.replace(/'/g, "\\'")}']`;
  if (isArrayIndex) return `${parentPath}[${key}]`;
  return `${parentPath}.${key}`;
}

function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

/* ===== JPT class — main controller ===== */
class JPT {
  constructor(root) {
    this.root = root;
    this.lang = root.dataset.jptLang || 'en';
    this.i18n = I18N[this.lang] || I18N.en;

    this.syntax = 'jsonpath';
    this.expression = '';
    this.jsonData = null;
    this.jsonString = '';
    this.result = null;
    this.resultType = 'array';
    this.resultMode = 'raw';
    this.matchCount = 0;
    this.pathIndex = {};
    this.matchedPaths = [];
    this.presets = [];
    this.examples = [];

    this.debounceTimer = null;
    this.worker = null;

    this.bindElements();
    this.applyI18n();
    this.bindEvents();
    this.loadStaticData();
    this.tryLoadFromUrl();
  }

  bindElements() {
    this.el = {
      syntaxTabs: $$('.jpt-syntax-tab', this.root),
      expressionInput: $('[data-jpt-input="expression"]', this.root),
      presetChips: $('[data-jpt-preset-chips]', this.root),
      jsonInput: $('[data-jpt-input="json"]', this.root),
      resultContent: $('[data-jpt-result-content]', this.root),
      matchCount: $('[data-jpt-match-count]', this.root),
      modeTabs: $$('.jpt-result-mode-tab', this.root),
      historyList: $('[data-jpt-history-list]', this.root),
      exampleChips: $('[data-jpt-example-chips]', this.root),
      shareUrl: $('[data-jpt-share-url]', this.root),
      shareStatus: $('[data-jpt-share-status]', this.root),
      disclaimer: $('[data-jpt-disclaimer-text]', this.root),
      syntaxHint: $('[data-jpt-syntax-hint]', this.root),
      toast: $('[data-jpt-toast]', this.root)
    };
  }

  applyI18n() {
    const t = this.i18n;
    this.root.classList.add(`jpt-syntax-${this.syntax}`);
    if (this.el.disclaimer) this.el.disclaimer.textContent = t.disclaimer;
    if (this.el.expressionInput) this.el.expressionInput.placeholder = t.expressionPlaceholder;
    if (this.el.jsonInput) this.el.jsonInput.placeholder = t.jsonPlaceholder;
    if (this.el.syntaxHint) this.el.syntaxHint.textContent = t.syntaxHints[this.syntax];

    $$('[data-jpt-i18n]', this.root).forEach(el => {
      const key = el.dataset.jptI18n;
      if (t[key]) el.textContent = t[key];
    });

    this.el.syntaxTabs.forEach(tab => {
      const s = tab.dataset.jptSyntax;
      if (t.tabs[s]) tab.textContent = t.tabs[s];
    });

    this.el.modeTabs.forEach(tab => {
      const m = tab.dataset.jptMode;
      if (t[`mode${m.charAt(0).toUpperCase() + m.slice(1)}`]) {
        tab.textContent = t[`mode${m.charAt(0).toUpperCase() + m.slice(1)}`];
      }
    });
  }

  bindEvents() {
    this.el.syntaxTabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchSyntax(tab.dataset.jptSyntax));
    });

    this.el.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchMode(tab.dataset.jptMode));
    });

    if (this.el.expressionInput) {
      this.el.expressionInput.addEventListener('input', () => this.schedulePreview());
    }

    if (this.el.jsonInput) {
      this.el.jsonInput.addEventListener('input', () => this.schedulePreview());
    }

    const validateBtn = $('[data-jpt-action="validate"]', this.root);
    if (validateBtn) validateBtn.addEventListener('click', () => this.formatJson(true));

    const formatBtn = $('[data-jpt-action="format"]', this.root);
    if (formatBtn) formatBtn.addEventListener('click', () => this.formatJson(false));

    const clearBtn = $('[data-jpt-action="clear-json"]', this.root);
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearJson());

    const shareBtn = $('[data-jpt-action="share"]', this.root);
    if (shareBtn) shareBtn.addEventListener('click', () => this.generateShareUrl());

    const shareCopyBtn = $('[data-jpt-action="share-copy"]', this.root);
    if (shareCopyBtn) shareCopyBtn.addEventListener('click', () => this.copyShareUrl());

    const downloadBtn = $('[data-jpt-action="download"]', this.root);
    if (downloadBtn) downloadBtn.addEventListener('click', () => this.downloadAsFile());

    const clearHistoryBtn = $('[data-jpt-action="clear-history"]', this.root);
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => this.clearHistory());

    // History item click delegation
    if (this.el.historyList) {
      this.el.historyList.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-jpt-history-index]');
        if (btn) this.loadFromHistory(parseInt(btn.dataset.jptHistoryIndex, 10));
      });
    }
  }

  async loadStaticData() {
    try {
      const presetsUrl = this.root.dataset.jptDataPresets;
      const examplesUrl = this.root.dataset.jptDataExamples;
      if (presetsUrl) {
        const r = await fetch(presetsUrl);
        if (r.ok) {
          const data = await r.json();
          this.presets = data.presets || [];
          this.renderPresetChips();
        }
      }
      if (examplesUrl) {
        const r = await fetch(examplesUrl);
        if (r.ok) {
          const data = await r.json();
          this.examples = data.examples || [];
          this.renderExampleChips();
        }
      }
      this.renderHistory();
    } catch (err) {
      console.warn('[jpt] Failed to load static data:', err);
    }
  }

  renderPresetChips() {
    if (!this.el.presetChips) return;
    const t = this.i18n;
    this.el.presetChips.innerHTML = this.presets.map(p => {
      const label = this.lang === 'zh' ? p.label_zh : p.label_en;
      return `<button type="button" class="jpt-preset-chip" data-jpt-preset-id="${p.id}" title="${(p.description_en || '').replace(/"/g, '&quot;')} / ${(p.description_zh || '').replace(/"/g, '&quot;')}">${p.icon || '•'} ${label}</button>`;
    }).join('');
    this.el.presetChips.querySelectorAll('.jpt-preset-chip').forEach(chip => {
      chip.addEventListener('click', () => this.applyPreset(chip.dataset.jptPresetId));
    });
  }

  renderExampleChips() {
    if (!this.el.exampleChips) return;
    const t = this.i18n;
    this.el.exampleChips.innerHTML = this.examples.map(ex => {
      const label = this.lang === 'zh' ? ex.label_zh : ex.label_en;
      return `<button type="button" class="jpt-example-chip" data-jpt-example-id="${ex.id}">${label}</button>`;
    }).join('');
    this.el.exampleChips.querySelectorAll('.jpt-example-chip').forEach(chip => {
      chip.addEventListener('click', () => this.loadExample(chip.dataset.jptExampleId));
    });
  }

  applyPreset(presetId) {
    const preset = this.presets.find(p => p.id === presetId);
    if (!preset) return;
    const expr = preset.syntax[this.syntax];
    if (!expr) return;
    this.el.expressionInput.value = expr;
    this.schedulePreview();
    this.showToast(`${this.lang === 'zh' ? '已应用预设' : 'Preset applied'}: ${this.lang === 'zh' ? preset.label_zh : preset.label_en}`);
  }

  loadExample(exampleId) {
    const example = this.examples.find(e => e.id === exampleId);
    if (!example) return;
    const json = JSON.stringify(example.json, null, 2);
    this.el.jsonInput.value = json;
    // Apply first syntax expression as default
    const exprSet = example.expressions && example.expressions[this.syntax];
    if (exprSet) {
      const firstKey = Object.keys(exprSet)[0];
      if (firstKey) this.el.expressionInput.value = exprSet[firstKey];
    }
    this.schedulePreview();
    this.showToast(`${this.lang === 'zh' ? '已加载示例' : 'Loaded example'}: ${this.lang === 'zh' ? example.label_zh : example.label_en}`);
  }

  /* ===== Syntax switching ===== */
  async switchSyntax(syntax) {
    if (syntax === this.syntax) return;
    this.syntax = syntax;
    this.el.syntaxTabs.forEach(tab => {
      const isActive = tab.dataset.jptSyntax === syntax;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    // Update root class for color theming
    this.root.classList.remove('jpt-syntax-jsonpath', 'jpt-syntax-jsonata', 'jpt-syntax-jmespath');
    this.root.classList.add(`jpt-syntax-${syntax}`);
    if (this.el.syntaxHint) this.el.syntaxHint.textContent = this.i18n.syntaxHints[syntax];

    // Lazy-load engine if not yet loaded
    await this.loadEngine(syntax);
    this.schedulePreview();
  }

  switchMode(mode) {
    this.resultMode = mode;
    this.el.modeTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.jptMode === mode));
    this.renderResult();
  }

  async loadEngine(syntax) {
    if (syntax === 'jsonpath') {
      engineCache.jsonpath = JSONPath;
      return JSONPath;
    }
    if (engineCache[syntax]) return engineCache[syntax];
    try {
      if (syntax === 'jsonata') {
        const mod = await import('../lib/jsonata.js');
        engineCache.jsonata = mod.default;
      } else if (syntax === 'jmespath') {
        const mod = await import('../lib/jmespath.js');
        engineCache.jmespath = mod.default;
      }
      return engineCache[syntax];
    } catch (err) {
      this.showError(err.message, 'worker');
      throw err;
    }
  }

  /* ===== JSON parsing + validation ===== */
  parseJson() {
    const str = this.el.jsonInput.value.trim();
    if (!str) return { ok: true, data: null, size: 0 };
    try {
      const data = JSON.parse(str);
      return { ok: true, data, size: str.length };
    } catch (err) {
      const lineCol = this.enrichJsonError(err, str);
      return { ok: false, error: lineCol };
    }
  }

  enrichJsonError(err, raw) {
    const match = err.message.match(/position (\d+)/);
    if (!match) return err.message;
    const pos = parseInt(match[1], 10);
    let line = 0, col = 0;
    for (let i = 0; i < pos && i < raw.length; i++) {
      if (raw[i] === '\n') { line++; col = 0; } else { col++; }
    }
    return `${this.i18n.errorJson} (line ${line + 1}, col ${col + 1}): ${err.message}`;
  }

  formatJson(strict) {
    const str = this.el.jsonInput.value.trim();
    if (!str) return;
    try {
      const obj = JSON.parse(str);
      const formatted = JSON.stringify(obj, null, 2);
      this.el.jsonInput.value = formatted;
      if (!strict) this.showToast(this.lang === 'zh' ? '已格式化' : 'Formatted');
      this.schedulePreview();
    } catch (err) {
      this.showError(this.enrichJsonError(err, str), 'json');
    }
  }

  clearJson() {
    this.el.jsonInput.value = '';
    this.el.resultContent.innerHTML = '';
    this.el.matchCount.textContent = '';
    this.el.matchCount.classList.remove('zero');
  }

  /* ===== Debounce + execute ===== */
  schedulePreview() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.executePreview(), 250);
  }

  async executePreview() {
    const expression = this.el.expressionInput.value.trim();
    const jsonString = this.el.jsonInput.value;

    if (!expression || !jsonString.trim()) {
      this.el.resultContent.innerHTML = '';
      this.el.matchCount.textContent = '';
      this.el.matchCount.classList.add('zero');
      return;
    }

    // Parse JSON
    const parsed = this.parseJson();
    if (!parsed.ok) {
      this.showError(parsed.error, 'json');
      return;
    }
    this.jsonData = parsed.data;
    this.jsonString = jsonString;

    // Decide: worker or main thread
    const useWorker = parsed.size > 100 * 1024 && typeof Worker !== 'undefined';
    try {
      let result, type, count;
      if (useWorker) {
        ({ result, type, count } = await this.executeInWorker(expression, jsonString));
      } else {
        ({ result, type, count } = this.executeMain(expression, parsed.data));
      }
      this.result = result;
      this.resultType = type;
      this.matchCount = count;
      this.matchedPaths = this.extractPaths(result, parsed.data, expression);
      this.renderResult();
      this.saveHistory(expression);
    } catch (err) {
      const sourceKey = `error${this.syntax.charAt(0).toUpperCase() + this.syntax.slice(1)}`;
      this.showError(err.message, sourceKey.toLowerCase());
    }
  }

  executeMain(expression, jsonData) {
    let result;
    if (this.syntax === 'jsonpath') {
      result = JSONPath({ path: expression, json: jsonData });
    } else if (this.syntax === 'jsonata') {
      result = engineCache.jsonata(expression).evaluate(jsonData);
    } else if (this.syntax === 'jmespath') {
      result = engineCache.jmespath.search(jsonData, expression);
    }
    const type = Array.isArray(result) ? 'array' : typeof result;
    const count = Array.isArray(result) ? result.length : 1;
    return { result, type, count };
  }

  executeInWorker(expression, jsonString) {
    return new Promise((resolve, reject) => {
      try {
        const worker = new Worker(new URL('./jpt.worker.js', import.meta.url), { type: 'module' });
        const id = hashString(Date.now().toString() + Math.random().toString());
        worker.postMessage({ id, jsonString, expression, syntax: this.syntax });
        worker.onmessage = (e) => {
          worker.terminate();
          if (e.data.id !== id) return;
          if (e.data.ok) resolve({ result: e.data.results, type: e.data.type, count: e.data.count });
          else reject(new Error(e.data.error));
        };
        worker.onerror = (err) => {
          worker.terminate();
          reject(err);
        };
      } catch (err) {
        // Fallback to main thread
        const parsed = JSON.parse(jsonString);
        resolve(this.executeMain(expression, parsed));
      }
    });
  }

  /* ===== Path extraction for highlighting ===== */
  extractPaths(result, jsonData, expression) {
    if (this.syntax === 'jsonpath' && Array.isArray(result)) {
      try {
        const paths = JSONPath({ path: expression, json: jsonData, resultType: 'path' });
        return paths.slice(0, 500);
      } catch (e) {
        return [];
      }
    }
    // JSONata / JMESPath: walk JSON and find matches via deepEqual
    const paths = [];
    const targetArr = Array.isArray(result) ? result : [result];
    const walk = (node, path) => {
      if (paths.length >= 500) return;
      if (this.isMatch(node, targetArr)) paths.push(path);
      if (Array.isArray(node)) {
        node.forEach((item, i) => walk(item, `${path}[${i}]`));
      } else if (node && typeof node === 'object') {
        Object.keys(node).forEach(key => walk(node[key], `${path}.${key}`));
      }
    };
    walk(jsonData, '$');
    return paths;
  }

  isMatch(node, targetArr) {
    for (const t of targetArr) {
      if (JSON.stringify(node) === JSON.stringify(t)) return true;
    }
    return false;
  }

  /* ===== Result rendering ===== */
  renderResult() {
    const t = this.i18n;
    if (this.matchCount > 0) {
      this.el.matchCount.textContent = `${this.matchCount} ${t.matchLabel}`;
      this.el.matchCount.classList.remove('zero');
    } else {
      this.el.matchCount.textContent = `0 ${t.matchLabel}`;
      this.el.matchCount.classList.add('zero');
    }
    if (!this.result) {
      this.el.resultContent.innerHTML = '';
      return;
    }
    if (this.resultMode === 'tree') {
      this.el.resultContent.innerHTML = '';
      const treeRoot = this.buildTreeNode(this.jsonData, '$', 0);
      this.el.resultContent.appendChild(treeRoot);
      this.highlightMatches();
    } else if (this.resultMode === 'compact') {
      this.el.resultContent.innerHTML = `<pre class="jpt-result-mode-compact">${this.escapeHtml(JSON.stringify(this.result))}</pre>`;
    } else {
      this.el.resultContent.innerHTML = `<pre class="jpt-result-mode-raw">${this.escapeHtml(JSON.stringify(this.result, null, 2))}</pre>`;
    }
  }

  buildTreeNode(value, pointer, depth) {
    const details = document.createElement('details');
    details.open = depth < 3;
    details.dataset.jptPath = pointer;
    details.classList.add('jpt-tree-node');

    const summary = document.createElement('summary');
    const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value);
    const preview = Array.isArray(value) ? `[${value.length}]`
                  : (value && typeof value === 'object') ? `{${Object.keys(value).length}}`
                  : JSON.stringify(value);
    const isMatch = this.matchedPaths.includes(pointer);
    if (isMatch) details.classList.add('jpt-tree-match');

    summary.innerHTML = `
      <span class="jpt-tree-key">${this.escapeHtml(this.lastSegment(pointer))}</span>
      <span class="jpt-tree-type jpt-type-${type}">${type}</span>
      <span class="jpt-tree-preview">${this.escapeHtml(preview)}</span>
      ${isMatch ? '<span class="jpt-tree-match-badge">✓</span>' : ''}
    `;
    summary.addEventListener('click', (e) => {
      if (e.target.tagName === 'SUMMARY' || e.target.classList.contains('jpt-tree-key')) {
        if (navigator.clipboard) navigator.clipboard.writeText(pointer);
      }
    });
    details.appendChild(summary);

    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        details.appendChild(this.buildTreeNode(item, `${pointer}[${i}]`, depth + 1));
      });
    } else if (value && typeof value === 'object') {
      Object.keys(value).forEach(key => {
        details.appendChild(this.buildTreeNode(value[key], `${pointer}.${key}`, depth + 1));
      });
    }

    return details;
  }

  highlightMatches() {
    // Already done via classList during buildTreeNode. Could enhance here for virtual nodes.
  }

  lastSegment(pointer) {
    const m = pointer.match(/\[(\d+)\]$|\.([^.\[\]]+)$/);
    if (!m) return pointer;
    return m[1] !== undefined ? `[${m[1]}]` : m[2];
  }

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ===== Errors ===== */
  showError(message, source) {
    this.el.matchCount.textContent = '';
    this.el.matchCount.classList.add('zero');
    const t = this.i18n;
    const sourceLabel = t[`error${source ? source.charAt(0).toUpperCase() + source.slice(1) : 'Unknown'}`] || 'Error';
    this.el.resultContent.innerHTML = `
      <div class="jpt-error-card" role="alert">
        <span class="jpt-error-icon">❌</span>
        <div class="jpt-error-message">
          <strong>${sourceLabel}</strong>
          <p>${this.escapeHtml(message)}</p>
        </div>
      </div>
    `;
  }

  /* ===== History ===== */
  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('jpt:history') || '[]');
    } catch (e) {
      return [];
    }
  }

  saveHistory(expression) {
    try {
      const history = this.loadHistory();
      const entry = {
        syntax: this.syntax,
        expression: expression.slice(0, 200),
        jsonHash: hashString(this.jsonString.slice(0, 1000)),
        timestamp: Date.now()
      };
      const filtered = history.filter(h => !(h.syntax === entry.syntax && h.expression === entry.expression));
      filtered.unshift(entry);
      const trimmed = filtered.slice(0, 10);
      localStorage.setItem('jpt:history', JSON.stringify(trimmed));
      this.renderHistory();
    } catch (err) {
      console.warn('[jpt] localStorage unavailable:', err);
      const panel = $('[data-jpt-history-panel]', this.root);
      if (panel) {
        panel.classList.add('jpt-history-unavailable');
        panel.title = this.i18n.historyUnavailable;
      }
    }
  }

  renderHistory() {
    if (!this.el.historyList) return;
    const history = this.loadHistory();
    if (history.length === 0) {
      this.el.historyList.innerHTML = `<div class="jpt-history-empty">${this.i18n.historyEmpty}</div>`;
      return;
    }
    this.el.historyList.innerHTML = history.map((h, i) => {
      const date = new Date(h.timestamp).toLocaleString();
      return `<li class="jpt-history-item" data-jpt-history-index="${i}">
        <span class="jpt-history-syntax jpt-syntax-${h.syntax}">${h.syntax}</span>
        <code class="jpt-history-expr">${this.escapeHtml(h.expression)}</code>
        <span class="jpt-history-date">${date}</span>
        <button type="button" class="jpt-history-load" data-jpt-history-index="${i}">${this.i18n.historyLoad}</button>
      </li>`;
    }).join('');
  }

  loadFromHistory(index) {
    const history = this.loadHistory();
    const entry = history[index];
    if (!entry) return;
    this.switchSyntax(entry.syntax).then(() => {
      this.el.expressionInput.value = entry.expression;
      this.schedulePreview();
    });
  }

  clearHistory() {
    try {
      localStorage.removeItem('jpt:history');
      this.renderHistory();
      this.showToast(this.lang === 'zh' ? '历史已清空' : 'History cleared');
    } catch (e) {}
  }

  /* ===== Share URL ===== */
  generateShareUrl() {
    const expression = this.el.expressionInput.value.trim();
    const jsonString = this.el.jsonInput.value;
    if (!expression || !jsonString.trim()) {
      this.showToast(this.i18n.shareEmpty);
      return;
    }
    const payload = { j: jsonString, e: expression, s: this.syntax, v: '1' };
    const payloadStr = JSON.stringify(payload);
    if (payloadStr.length < 1800) {
      const encoded = btoa(unescape(encodeURIComponent(payloadStr)));
      const url = `${location.origin}${location.pathname}#data=${encoded}`;
      this.showShareUrl(url, encoded.length, 'base64');
    } else {
      // Fallback to download
      this.el.shareStatus.innerHTML = `<span class="jpt-share-size-red">${this.i18n.shareTooLarge}</span>`;
      this.el.shareUrl.value = '';
      const fb = $('[data-jpt-share-fallback]', this.root);
      if (fb) fb.style.display = 'block';
    }
  }

  showShareUrl(url, sizeBytes, method) {
    this.el.shareUrl.value = url;
    const sizeClass = sizeBytes < 1024 ? 'jpt-share-size-green' : (sizeBytes < 2048 ? 'jpt-share-size-yellow' : 'jpt-share-size-red');
    this.el.shareStatus.innerHTML = `<span class="${sizeClass}">${sizeBytes} bytes · ${method}</span>`;
  }

  async copyShareUrl() {
    const url = this.el.shareUrl.value;
    if (!url) {
      this.generateShareUrl();
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      this.showToast(this.i18n.shareCopied);
    } catch (e) {
      this.showToast('Copy failed — select URL manually');
    }
  }

  downloadAsFile() {
    const expression = this.el.expressionInput.value.trim();
    const jsonString = this.el.jsonInput.value;
    if (!jsonString.trim()) {
      this.showToast(this.i18n.shareEmpty);
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      parsed = jsonString;
    }
    const content = JSON.stringify({
      json: parsed,
      expression,
      syntax: this.syntax,
      tool: 'JSONPath Tester',
      exported_at: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jsonpath-tester-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  /* ===== Load from URL ===== */
  tryLoadFromUrl() {
    const hash = location.hash;
    const match = hash.match(/^#data=(.+)$/);
    if (!match) return;
    try {
      let encoded = match[1];
      let json;
      if (encoded.startsWith('gz:')) {
        // pako not bundled — fallback to base64
        encoded = encoded.slice(3);
      }
      json = decodeURIComponent(escape(atob(encoded)));
      const payload = JSON.parse(json);
      if (payload.j && payload.e) {
        this.el.jsonInput.value = payload.j;
        this.el.expressionInput.value = payload.e;
        if (payload.s) this.switchSyntax(payload.s).then(() => this.schedulePreview());
        else this.schedulePreview();
        this.showToast(this.lang === 'zh' ? '已从分享链接加载' : 'Loaded from share URL');
      }
    } catch (err) {
      console.warn('[jpt] Failed to load from URL hash:', err);
    }
  }

  /* ===== Toast ===== */
  showToast(message) {
    if (!this.el.toast) return;
    this.el.toast.textContent = message;
    this.el.toast.classList.add('show');
    setTimeout(() => this.el.toast.classList.remove('show'), 2200);
  }
}

/* ===== Bootstrap ===== */
function init() {
  const root = document.querySelector('[data-jpt-root]');
  if (root) {
    try {
      new JPT(root);
    } catch (err) {
      console.error('[jpt] Initialization failed:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}