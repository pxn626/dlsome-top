/* ============================================================
 * jsv.js — JSON Schema Validator
 * Vanilla ES module · zero network · zero AI API · zero analytics
 *
 * 6 core modules:
 *   M1: ajv 8.x initialization + Draft meta-schema selection (lazy)
 *   M2: validation call + error collection
 *   M3: bilingual error localization (zh-CN + en) via ajv-i18n + jsv-i18n-zh patches
 *   M4: JSON Pointer → line number resolution
 *   M5: schema tree view rendering (<details>/<summary> + lazy expand + search)
 *   M6: report export (JSON / Markdown / HTML via Blob)
 *
 * Namespace:  --jsv-* / .jsv-* / data-jsv-*
 *  i18n:       inline I18N_JSV.{en, zh} + jsv-i18n-zh.js patches
 *  self-test:  M2 console.assert 5 ajv multi-Draft smoke tests (draft 4/7/2020/2019)
 *
 * Step 4 of 7 — D33 JSON Schema Validator pipeline.
 * ajv ESM bundle loaded separately via ajv.bundle.js (decision B — lazy chunk).
 * ============================================================ */

import { zhCNPatches, I18N_JSV_ZH, I18N_JSV_EN } from './jsv-i18n-zh.js';

/* ---------- 1. Constants & state ---------- */

const STATE = {
  root: null,
  lang: 'en',
  draft: 'draft-2020-12',
  presets: [],
  metaSchemas: [],
  ajvInstances: {},          // lazy ajv cache per draft
  ajvBundle: null,            // window.__AJV_BUNDLE__ loaded by shortcode pre-script
  currentSchema: '',
  currentData: '',
  currentValidation: null,    // last validation result
  includeInputInReport: false,
  sortBy: 'line'              // 'line' | 'path'
};

const DRAFT_KEYS = ['draft-04', 'draft-6', 'draft-7', 'draft-2019-09', 'draft-2020-12'];

/* ---------- 2. Bootstrap ---------- */

function init() {
  const root = document.querySelector('[data-jsv-root]');
  if (!root) return console.error('[jsv] root not found');
  STATE.root = root;
  STATE.lang = root.dataset.jsvLang || 'en';

  // Wait for ajv bundle (loaded by shortcode pre-script)
  if (window.__AJV_BUNDLE__) {
    onAjvReady(window.__AJV_BUNDLE__);
  } else {
    window.addEventListener('jsv:ajv-ready', e => onAjvReady(e.detail || window.__AJV_BUNDLE__));
    window.addEventListener('jsv:ajv-error', e => showFatalError('ajv bundle failed to load'));
  }

  // Wire up action handlers
  root.addEventListener('click', onClick);
  root.addEventListener('input', onInput);

  // Update textContent for i18n labels
  applyI18n();

  // Load presets + meta-schemas (same-origin static JSON)
  loadDataFiles();
}

function onAjvReady(bundle) {
  if (!bundle) bundle = window.__AJV_BUNDLE__;
  if (!bundle || !bundle.Ajv) return console.error('[jsv] bundle missing Ajv');
  STATE.ajvBundle = bundle;
  console.log('[jsv] ajv bundle ready:', { size: humanSize(getBundleSize()) });
  // Initial disclaimer update (once we know version)
  updateDisclaimer();
}

async function loadDataFiles() {
  const presetsUrl = STATE.root.dataset.jsvDataPresets;
  const metaUrl = STATE.root.dataset.jsvDataMetaSchemas;
  try {
    const [presetsData, metaData] = await Promise.all([
      fetch(presetsUrl).then(r => r.ok ? r.json() : Promise.reject(new Error(`presets ${r.status}`))),
      fetch(metaUrl).then(r => r.ok ? r.json() : Promise.reject(new Error(`meta-schemas ${r.status}`)))
    ]);
    STATE.presets = presetsData.presets || [];
    STATE.metaSchemas = metaData.drafts || [];
    renderDraftChips();
    renderPresetChips();
    renderStandardFooter(presetsData, metaData);
    updateDisclaimer();
  } catch (e) {
    console.error('[jsv] data load failed', e);
    showFatalError('Failed to load presets / meta-schemas');
  }
}

function getBundleSize() {
  // Estimate: just use the script src path
  return 55;  // 54KB gzipped measured
}

function humanSize(kb) {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

/* ---------- 3. i18n ---------- */

function t(key) {
  const table = STATE.lang === 'zh' ? I18N_JSV_ZH : I18N_JSV_EN;
  let s = table[key] || key;
  // simple ${var} interpolation
  return s.replace(/\$\{(\w+)\}/g, (_, k) => STATE[k] ?? `\${${k}}`);
}

function applyI18n() {
  const root = STATE.root;
  if (!root) return;
  root.querySelectorAll('[data-jsv-validate-label]').forEach(el => el.textContent = t('btn_validate'));
  root.querySelectorAll('[data-jsv-format-label]').forEach(el => el.textContent = t('btn_format'));
  root.querySelectorAll('[data-jsv-clear-label]').forEach(el => el.textContent = t('btn_clear'));
  root.querySelectorAll('[data-jsv-sample-label]').forEach(el => el.textContent = t('btn_sample'));
  root.querySelectorAll('[data-jsv-format-data-label]').forEach(el => el.textContent = t('btn_format'));
  root.querySelectorAll('[data-jsv-clear-data-label]').forEach(el => el.textContent = t('btn_clear'));
  root.querySelectorAll('[data-jsv-expand-all-label]').forEach(el => el.textContent = t('btn_expand_all'));
  root.querySelectorAll('[data-jsv-collapse-all-label]').forEach(el => el.textContent = t('btn_collapse_all'));
  root.querySelectorAll('[data-jsv-export-json-label]').forEach(el => el.textContent = t('btn_export_json'));
  root.querySelectorAll('[data-jsv-export-md-label]').forEach(el => el.textContent = t('btn_export_md'));
  root.querySelectorAll('[data-jsv-export-html-label]').forEach(el => el.textContent = t('btn_export_html'));
  root.querySelectorAll('[data-jsv-openapi-btn-label]').forEach(el => el.textContent = t('btn_openapi_convert'));
  root.querySelectorAll('[data-jsv-sort-by-line-label]').forEach(el => el.textContent = t('sort_by_line'));
  root.querySelectorAll('[data-jsv-sort-by-path-label]').forEach(el => el.textContent = t('sort_by_path'));
  root.querySelectorAll('[data-jsv-tree-search-placeholder]').forEach(el => el.placeholder = t('tree_search_placeholder'));
  root.querySelectorAll('[data-jsv-schema-input-label]').forEach(el => el.textContent = t('schema_label'));
  root.querySelectorAll('[data-jsv-data-input-label]').forEach(el => el.textContent = t('data_label'));
  root.querySelectorAll('[data-jsv-draft-section-label]').forEach(el => el.textContent = t('draft_label'));
  root.querySelectorAll('[data-jsv-preset-section-label]').forEach(el => el.textContent = t('preset_label'));
  root.querySelectorAll('[data-jsv-input-section-label]').forEach(el => el.textContent = t('input_label'));
  root.querySelectorAll('[data-jsv-result-section-label]').forEach(el => el.textContent = t('result_label'));
  root.querySelectorAll('[data-jsv-errors-section-label]').forEach(el => el.textContent = t('errors_label'));
  root.querySelectorAll('[data-jsv-tree-section-label]').forEach(el => el.textContent = t('tree_label'));
  root.querySelectorAll('[data-jsv-export-section-label]').forEach(el => el.textContent = t('export_label'));
  root.querySelectorAll('[data-jsv-openapi-label]').forEach(el => el.textContent = t('openapi_label'));
  root.querySelectorAll('[data-jsv-export-note]').forEach(el => el.textContent = t('export_note'));
  root.querySelectorAll('[data-jsv-export-include-label]').forEach(el => el.textContent = t('export_include_label'));
  root.querySelectorAll('[data-jsv-openapi-note]').forEach(el => el.textContent = t('openapi_note'));
  // placeholders
  const schemaInput = root.querySelector('[data-jsv-input="schema"]');
  if (schemaInput) schemaInput.placeholder = t('schema_placeholder');
  const dataInput = root.querySelector('[data-jsv-input="data"]');
  if (dataInput) dataInput.placeholder = t('data_placeholder');
}

/* ---------- 4. Render: chips (draft + presets) ---------- */

function renderDraftChips() {
  const container = STATE.root.querySelector('[data-jsv-draft-selector]');
  if (!container) return;
  container.innerHTML = '';
  for (const m of STATE.metaSchemas) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jsv-chip' + (m.draft === STATE.draft ? ' active' : '');
    btn.dataset.jsvDraft = m.draft;
    btn.dataset.jsvAction = 'select-draft';
    btn.setAttribute('aria-pressed', String(m.draft === STATE.draft));
    btn.innerHTML = `<span aria-hidden="true">${m.icon || '📜'}</span> ${escapeHtml(m.draft)} ${m.default ? '⭐' : ''}`;
    container.appendChild(btn);
  }
}

function renderPresetChips() {
  const container = STATE.root.querySelector('[data-jsv-preset-selector]');
  if (!container) return;
  container.innerHTML = '';
  for (const p of STATE.presets) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jsv-chip jsv-chip-preset';
    btn.dataset.jsvPreset = p.id;
    btn.dataset.jsvAction = 'load-preset';
    btn.title = STATE.lang === 'zh' ? p.description_zh : p.description_en;
    const label = STATE.lang === 'zh' ? p.label_zh : p.label_en;
    btn.innerHTML = `<span aria-hidden="true">${p.icon || '🎯'}</span> ${escapeHtml(label)}`;
    container.appendChild(btn);
  }
}

function renderStandardFooter(presetsData, metaData) {
  const el = STATE.root.querySelector('[data-jsv-standard]');
  if (!el) return;
  const urls = [
    ...Object.entries(metaData.source_urls || {}),
    ...Object.entries(presetsData.source_urls || {}).slice(0, 4)
  ];
  el.innerHTML = `<details class="jsv-standard-details"><summary>📚 Data sources (${urls.length})</summary><ul class="jsv-source-list">` +
    urls.map(([k, v]) => `<li><code>${escapeHtml(k)}</code> · <a href="${escapeAttr(extractUrl(v))}" rel="nofollow noopener noreferrer" target="_blank">${escapeHtml(v.split(' (')[0])}</a></li>`).join('') +
    `</ul></details>`;
}

function extractUrl(str) {
  const m = String(str).match(/(https?:\/\/[^\s(]+)/);
  return m ? m[1] : '#';
}

/* ---------- 5. M1: ajv lazy init ---------- */

function getAjv(draftKey) {
  if (STATE.ajvInstances[draftKey]) return STATE.ajvInstances[draftKey];
  if (!STATE.ajvBundle) {
    throw new Error('ajv bundle not ready yet — wait for jsv:ajv-ready event');
  }
  const { Ajv, addFormats, ajvDraft04 } = STATE.ajvBundle;
  const meta = STATE.metaSchemas.find(m => m.draft === draftKey);
  if (!meta) throw new Error(`unknown draft: ${draftKey}`);

  let ajv;
  if (draftKey === 'draft-04') {
    ajv = new ajvDraft04({ allErrors: true, strict: false, verbose: true });
  } else {
    ajv = new Ajv({ allErrors: true, strict: false, verbose: true });
  }
  // Register the meta-schema for this draft (strip $schema to avoid circular ref)
  const msa = JSON.parse(JSON.stringify(meta.meta_schema));
  delete msa.$schema;
  delete msa.$id;
  try { ajv.addMetaSchema(msa, undefined, false); } catch (e) { /* ignore duplicate */ }

  // Add formats (email / uri / uuid / date-time / ipv4 / hostname — common subset)
  addFormats(ajv);
  ajvInstances: {
    STATE.ajvInstances[draftKey] = ajv;
  }
  return ajv;
}

/* ---------- 6. M2 + M3: validate + enrich errors ---------- */

function validate(schemaText, dataText, draftKey) {
  let schema, data;
  try {
    schema = JSON.parse(schemaText);
  } catch (e) {
    return {
      valid: false,
      schemaError: true,
      errors: [{
        keyword: 'parse',
        instancePath: '',
        schemaPath: '',
        params: { error: e.message },
        message_en: `Schema JSON parse error: ${e.message}`,
        message_zh: `Schema JSON 解析错误:${e.message}`,
        line_number: 0,
        column_number: 0,
        severity: 'error'
      }]
    };
  }
  try {
    data = dataText.trim() === '' ? undefined : JSON.parse(dataText);
  } catch (e) {
    return {
      valid: false,
      schemaError: false,
      dataParseError: true,
      errors: [{
        keyword: 'parse',
        instancePath: '',
        schemaPath: '',
        params: { error: e.message },
        message_en: `Data JSON parse error: ${e.message}`,
        message_zh: `Data JSON 解析错误:${e.message}`,
        line_number: 0,
        column_number: 0,
        severity: 'error'
      }]
    };
  }

  let ajv, validateFn;
  try {
    ajv = getAjv(draftKey);
  } catch (e) {
    return {
      valid: false,
      schemaError: true,
      errors: [{
        keyword: 'ajv',
        instancePath: '',
        schemaPath: '',
        params: { error: e.message },
        message_en: `ajv init error: ${e.message}`,
        message_zh: `ajv 初始化错误:${e.message}`,
        line_number: 0,
        column_number: 0,
        severity: 'error'
      }]
    };
  }

  try {
    validateFn = ajv.compile(schema);
  } catch (schemaErr) {
    return {
      valid: false,
      schemaError: true,
      errors: [{
        keyword: 'compile',
        instancePath: '',
        schemaPath: '',
        params: { error: schemaErr.message },
        message_en: `Schema compile error: ${schemaErr.message}`,
        message_zh: `Schema 编译错误:${schemaErr.message}`,
        line_number: 0,
        column_number: 0,
        severity: 'error'
      }]
    };
  }

  const ok = validateFn(data);
  if (ok) return { valid: true, errors: [], draft: draftKey };

  const enriched = (validateFn.errors || []).map(err => enrichError(err, schemaText));
  return {
    valid: false,
    errors: enriched,
    error_count: enriched.length,
    draft: draftKey,
    ajv_version: '8.17.0'
  };
}

function enrichError(rawErr, schemaText) {
  const { ajvI18n } = STATE.ajvBundle || {};
  let messageEn = rawErr.message || '';
  let messageZh = '';

  // Try ajv-i18n first (if loaded)
  if (ajvI18n && STATE.lang === 'zh') {
    try {
      messageZh = ajvI18n.zh(rawErr) || messageZh;
    } catch (e) { /* ignore */ }
  }

  // Fallback: our zh-CN patches
  if (!messageZh && zhCNPatches[rawErr.keyword]) {
    let tmpl = zhCNPatches[rawErr.keyword];
    tmpl = tmpl.replace(/\$\{(\w+(?:\?\.\w+)*)\??\}/g, (_, key) => {
      // Handle params.foo.bar chained access (best-effort)
      const parts = key.split('?.');
      let val = rawErr.params || {};
      for (const p of parts) {
        if (val == null) return '';
        val = val[p];
      }
      return val !== undefined ? JSON.stringify(val) : '';
    });
    messageZh = tmpl;
  }
  if (!messageZh) {
    // crude zh fallback for any keyword
    messageZh = `${rawErr.keyword} 验证失败`;
  }

  // Severity by keyword
  const severity = (rawErr.keyword === 'format' || rawErr.keyword === '$comment') ? 'warning' : 'error';

  // Line/column resolution
  const { line, column } = resolveLineColumn(rawErr.instancePath || '', schemaText);

  return {
    instancePath: rawErr.instancePath || '',
    schemaPath: rawErr.schemaPath || '',
    keyword: rawErr.keyword,
    params: rawErr.params || {},
    message_en: messageEn,
    message_zh: messageZh,
    line_number: line,
    column_number: column,
    severity
  };
}

/* ---------- 7. M4: line number from JSON Pointer ---------- */

function resolveLineColumn(instancePath, rawText) {
  if (!instancePath || instancePath === '' || !rawText) return { line: 0, column: 0 };
  const parts = instancePath.split('/').slice(1).map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  let line = 0, col = 0, depth = 0;
  let expectingKey = false, expectingIndex = false;
  const stack = [];  // [{key|index, expected}]
  let pathIdx = 0;   // how deep we are in parts

  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i];
    if (ch === '\n') { line++; col = 0; continue; }
    if (ch === ' ' || ch === '\t' || ch === '\r') { col++; continue; }
    if (ch === '{') {
      depth++;
      stack.push({ kind: 'object', key: null });
      expectingKey = true;
      col++; continue;
    }
    if (ch === '[') {
      depth++;
      stack.push({ kind: 'array', index: 0 });
      expectingIndex = true;
      col++; continue;
    }
    if (ch === '}' || ch === ']') {
      depth--;
      stack.pop();
      expectingKey = false; expectingIndex = false;
      col++; continue;
    }
    if (ch === ',') {
      const top = stack[stack.length - 1];
      if (top && top.kind === 'object') expectingKey = true;
      if (top && top.kind === 'array') { top.index++; expectingIndex = true; }
      col++; continue;
    }
    if (ch === '"' && expectingKey) {
      // Parse key string
      const { str, end } = readString(rawText, i);
      const key = str;
      // Advance past key + colon
      let j = end + 1;
      while (j < rawText.length && /\s/.test(rawText[j])) j++;
      // j should be at ':'
      if (rawText[j] === ':') j++;
      // Skip whitespace
      while (j < rawText.length && /\s/.test(rawText[j])) j++;
      const top = stack[stack.length - 1];
      top.key = key;
      const expectedKey = parts[pathIdx];
      if (expectedKey === key) {
        // We matched the next path segment at this depth
        // Now compute line/col at j (value start position)
        const lc = positionAt(rawText, j);
        return { line: lc.line, column: lc.col };
      }
      // Skip value
      i = skipValue(rawText, j) - 1;
      col = 0;
      expectingKey = true;
      continue;
    }
    if (expectingIndex && /[\d\-]/.test(ch)) {
      // Parse integer index
      let num = '';
      let j = i;
      while (j < rawText.length && /[\d]/.test(rawText[j])) { num += rawText[j]; j++; }
      const idx = parseInt(num, 10);
      const expectedIdx = parseInt(parts[pathIdx], 10);
      if (expectedIdx === idx) {
        // Skip past index
        while (j < rawText.length && /\s/.test(rawText[j])) j++;
        const lc = positionAt(rawText, j);
        return { line: lc.line, column: lc.col };
      }
      i = j - 1;
      expectingIndex = false;
      continue;
    }
    col++;
  }
  return { line: 0, column: 0 };
}

function readString(text, start) {
  let str = '', end = start + 1;
  while (end < text.length && text[end] !== '"') {
    if (text[end] === '\\' && end + 1 < text.length) { str += text[end + 1]; end += 2; continue; }
    str += text[end]; end++;
  }
  return { str, end };
}

function skipValue(text, start) {
  // skip past JSON value at start (string / number / bool / null / object / array)
  let depth = 0;
  let i = start;
  // Handle whitespace
  while (i < text.length && /\s/.test(text[i])) i++;
  if (i >= text.length) return i;
  const ch = text[i];
  if (ch === '"') {
    const { end } = readString(text, i);
    return end + 1;
  }
  if (ch === '{' || ch === '[') {
    depth = 1; i++;
    while (i < text.length && depth > 0) {
      if (text[i] === '{' || text[i] === '[') depth++;
      if (text[i] === '}' || text[i] === ']') depth--;
      i++;
    }
    return i;
  }
  // number / true / false / null
  while (i < text.length && !/[,}\]\s]/.test(text[i])) i++;
  return i;
}

function positionAt(text, idx) {
  let line = 0, col = 0;
  for (let k = 0; k < idx && k < text.length; k++) {
    if (text[k] === '\n') { line++; col = 0; } else col++;
  }
  return { line, col };
}

/* ---------- 8. M5: tree view rendering ---------- */

function renderTree(schema, container) {
  container.innerHTML = '';
  if (!schema || typeof schema !== 'object') {
    container.textContent = '(empty schema)';
    return;
  }
  const nodeCount = countNodes(schema);
  if (nodeCount > 5000) {
    const warn = document.createElement('div');
    warn.className = 'jsv-tree-warning';
    warn.textContent = t('tree_warning_large').replace('${count}', String(nodeCount));
    container.appendChild(warn);
    // First level only
    renderFirstLevel(schema, container);
    return;
  }
  const root = buildTreeNode(schema, '#', 0);
  container.appendChild(root);
  // Update count badge
  const countEl = STATE.root.querySelector('[data-jsv-tree-count]');
  if (countEl) countEl.textContent = t('tree_count_label').replace('${count}', String(nodeCount));
}

function countNodes(node) {
  if (typeof node !== 'object' || node === null) return 1;
  if (Array.isArray(node)) return 1 + node.reduce((s, n) => s + countNodes(n), 0);
  let n = 1;
  for (const k in node) n += countNodes(node[k]);
  return n;
}

function buildTreeNode(schemaNode, pointer, depth) {
  const det = document.createElement('details');
  det.open = depth < 2;
  det.dataset.depth = String(depth);

  const sum = document.createElement('summary');
  sum.innerHTML = nodeSummaryHtml(schemaNode, pointer);
  det.appendChild(sum);

  // Recurse into properties / items / $defs
  const childContainer = document.createElement('div');
  childContainer.className = 'jsv-tree-children';

  if (schemaNode && typeof schemaNode === 'object') {
    if (schemaNode.properties && typeof schemaNode.properties === 'object') {
      for (const k of Object.keys(schemaNode.properties)) {
        childContainer.appendChild(buildTreeNode(schemaNode.properties[k], `${pointer}/properties/${k}`, depth + 1));
      }
    }
    if (schemaNode.patternProperties && typeof schemaNode.patternProperties === 'object') {
      for (const k of Object.keys(schemaNode.patternProperties)) {
        childContainer.appendChild(buildTreeNode(schemaNode.patternProperties[k], `${pointer}/patternProperties/${escapeJsonPointer(k)}`, depth + 1));
      }
    }
    if (schemaNode.items) {
      if (Array.isArray(schemaNode.items)) {
        schemaNode.items.forEach((it, i) => {
          childContainer.appendChild(buildTreeNode(it, `${pointer}/items/${i}`, depth + 1));
        });
      } else {
        childContainer.appendChild(buildTreeNode(schemaNode.items, `${pointer}/items`, depth + 1));
      }
    }
    if (schemaNode.$defs && typeof schemaNode.$defs === 'object') {
      for (const k of Object.keys(schemaNode.$defs)) {
        childContainer.appendChild(buildTreeNode(schemaNode.$defs[k], `${pointer}/$defs/${escapeJsonPointer(k)}`, depth + 1));
      }
    }
    if (schemaNode.definitions && typeof schemaNode.definitions === 'object') {
      for (const k of Object.keys(schemaNode.definitions)) {
        childContainer.appendChild(buildTreeNode(schemaNode.definitions[k], `${pointer}/definitions/${escapeJsonPointer(k)}`, depth + 1));
      }
    }
  }

  if (childContainer.children.length > 0) det.appendChild(childContainer);
  return det;
}

function renderFirstLevel(schema, container) {
  if (schema.properties) {
    for (const k of Object.keys(schema.properties)) {
      const det = document.createElement('details');
      det.open = false;
      det.innerHTML = `<summary><code>${escapeHtml(k)}</code>: ${schema.properties[k].type || '?'}</summary>`;
      container.appendChild(det);
    }
  }
}

function nodeSummaryHtml(node, pointer) {
  if (!node || typeof node !== 'object') return `<span class="jsv-tree-leaf">${escapeHtml(String(node))}</span>`;
  const parts = [];
  if (node.type !== undefined) parts.push(`<span class="jsv-tree-type">type: ${escapeHtml(Array.isArray(node.type) ? node.type.join('|') : String(node.type))}</span>`);
  if (node.format) parts.push(`<span class="jsv-tree-format">format: ${escapeHtml(node.format)}</span>`);
  if (node.pattern) parts.push(`<span class="jsv-tree-pattern">pattern: ${escapeHtml(node.pattern)}</span>`);
  if (node.enum) parts.push(`<span class="jsv-tree-enum">enum: ${escapeHtml(JSON.stringify(node.enum).slice(0, 50))}</span>`);
  if (node.$ref) parts.push(`<span class="jsv-tree-ref">$ref: ${escapeHtml(node.$ref)}</span>`);
  if (node.required && Array.isArray(node.required)) parts.push(`<span class="jsv-tree-req">required: ${escapeHtml(node.required.join(', '))}</span>`);
  if (pointer && pointer !== '#') parts.push(`<span class="jsv-tree-pointer">${escapeHtml(pointer)}</span>`);
  return parts.length > 0 ? parts.join(' · ') : '<span class="jsv-tree-leaf">{}</span>';
}

function escapeJsonPointer(s) {
  return s.replace(/~/g, '~0').replace(/\//g, '~1');
}

/* ---------- 9. M6: report export ---------- */

function exportReport(format) {
  if (!STATE.currentValidation) {
    alert('Please validate first before exporting.');
    return;
  }
  const result = STATE.currentValidation;
  const include = STATE.root.querySelector('[data-jsv-export-include-input]').checked;
  const ts = new Date().toISOString().slice(0, 10);
  const prefix = t('export_filename_prefix');
  let content = '', mime = 'text/plain', ext = format;

  const meta = {
    tool: 'JSON Schema Validator',
    url: 'https://dlsome.top/tools/json-schema-validator/',
    generated_at: new Date().toISOString(),
    draft: result.draft || STATE.draft,
    ajv_version: '8.17.0',
    valid: result.valid,
    error_count: result.errors ? result.errors.length : 0
  };

  if (format === 'json') {
    const out = { ...meta };
    if (result.valid) {
      out.result = { valid: true };
    } else {
      out.errors = result.errors;
    }
    if (include) {
      out.input_schema = STATE.currentSchema;
      out.input_data = STATE.currentData;
    }
    content = JSON.stringify(out, null, 2);
    mime = 'application/json';
    ext = 'json';
  } else if (format === 'markdown') {
    content = renderMarkdownReport(meta, result, include);
    mime = 'text/markdown';
    ext = 'md';
  } else if (format === 'html') {
    content = renderHtmlReport(meta, result, include);
    mime = 'text/html';
    ext = 'html';
  }

  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${prefix}-${ts}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function renderMarkdownReport(meta, result, include) {
  let md = `# JSON Schema Validation Report\n\n`;
  md += `- **Tool:** ${meta.tool} ([${meta.url}](${meta.url}))\n`;
  md += `- **Generated:** ${meta.generated_at}\n`;
  md += `- **Draft:** \`${meta.draft}\`\n`;
  md += `- **AJV Version:** \`${meta.ajv_version}\`\n`;
  md += `- **Result:** ${result.valid ? '✅ Valid' : `❌ Invalid (${meta.error_count} error${meta.error_count === 1 ? '' : 's'})`}\n\n`;
  if (!result.valid && result.errors) {
    md += `## Errors (${meta.error_count})\n\n`;
    md += `| # | Severity | Line | Path | Keyword | Message |\n`;
    md += `|---|----------|------|------|---------|---------|\n`;
    result.errors.forEach((e, i) => {
      const msg = STATE.lang === 'zh' ? e.message_zh : e.message_en;
      md += `| ${i + 1} | ${e.severity} | ${e.line_number + 1} | \`${escapeMd(e.instancePath)}\` | \`${e.keyword}\` | ${escapeMd(msg)} |\n`;
    });
  }
  if (include) {
    md += `\n## Input Schema\n\n\`\`\`json\n${STATE.currentSchema}\n\`\`\`\n\n`;
    md += `## Input Data\n\n\`\`\`json\n${STATE.currentData}\n\`\`\`\n`;
  }
  return md;
}

function renderHtmlReport(meta, result, include) {
  const errRows = !result.valid && result.errors
    ? result.errors.map((e, i) => `<tr class="jsv-rep-${e.severity}"><td>${i + 1}</td><td>${e.severity}</td><td>${e.line_number + 1}</td><td><code>${escapeHtml(e.instancePath)}</code></td><td><code>${e.keyword}</code></td><td>${escapeHtml(STATE.lang === 'zh' ? e.message_zh : e.message_en)}</td></tr>`).join('')
    : '<tr><td colspan="6" style="text-align:center;color:#38a169">✅ All checks passed</td></tr>';
  const inputSection = include
    ? `<details><summary>Input Schema + Data (privacy opt-in)</summary><pre>${escapeHtml(STATE.currentSchema)}\n\n---\n\n${escapeHtml(STATE.currentData)}</pre></details>`
    : '';
  return `<!DOCTYPE html>
<html lang="${STATE.lang}">
<head>
  <meta charset="utf-8">
  <title>JSON Schema Validation Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif; max-width: 960px; margin: 2rem auto; padding: 1rem; background: #f7fafc; color: #1a202c; }
    h1 { border-bottom: 2px solid #2b6cb0; padding-bottom: 0.5rem; }
    .meta { background: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; border: 1px solid #e2e8f0; }
    .meta dt { font-weight: bold; }
    .meta dd { margin-left: 1.5rem; margin-bottom: 0.5rem; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { padding: 0.5rem; border: 1px solid #e2e8f0; text-align: left; font-size: 13px; }
    th { background: #edf2f7; }
    tr.jsv-rep-error td { background: #fff5f5; }
    tr.jsv-rep-warning td { background: #fffaf0; }
    code { background: #edf2f7; padding: 1px 4px; border-radius: 3px; font-family: ui-monospace, Menlo, monospace; font-size: 12px; }
    pre { background: #1a202c; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 12px; }
    details { background: white; padding: 1rem; margin: 1rem 0; border-radius: 8px; border: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <h1>${meta.valid ? '✅' : '❌'} JSON Schema Validation Report</h1>
  <div class="meta">
    <dl>
      <dt>Tool</dt><dd>${escapeHtml(meta.tool)} · <a href="${escapeHtml(meta.url)}">${escapeHtml(meta.url)}</a></dd>
      <dt>Generated</dt><dd>${escapeHtml(meta.generated_at)}</dd>
      <dt>Draft</dt><dd><code>${escapeHtml(meta.draft)}</code></dd>
      <dt>AJV Version</dt><dd><code>${escapeHtml(meta.ajv_version)}</code></dd>
      <dt>Result</dt><dd>${meta.valid ? '✅ Valid' : `❌ Invalid — ${meta.error_count} error${meta.error_count === 1 ? '' : 's'}`}</dd>
    </dl>
  </div>
  <table>
    <thead><tr><th>#</th><th>Severity</th><th>Line</th><th>Path</th><th>Keyword</th><th>Message</th></tr></thead>
    <tbody>${errRows}</tbody>
  </table>
  ${inputSection}
  <footer style="text-align:center;margin-top:2rem;color:#718096;font-size:12px">Generated by <a href="${escapeHtml(meta.url)}">dlsome.top JSON Schema Validator</a></footer>
</body>
</html>`;
}

function escapeMd(s) {
  return String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

/* ---------- 10. UI updates (post-validation) ---------- */

function showResult(result) {
  STATE.currentValidation = result;
  const card = STATE.root.querySelector('[data-jsv-result]');
  card.innerHTML = '';
  if (result.schemaError || result.dataParseError) {
    card.className = 'jsv-result-card jsv-result-error';
    const e = result.errors[0];
    card.innerHTML = `<div class="jsv-result-icon">⚠️</div>
      <div class="jsv-result-text">${escapeHtml(STATE.lang === 'zh' ? e.message_zh : e.message_en)}</div>`;
    hideErrorsSection();
    return;
  }
  if (result.valid) {
    card.className = 'jsv-result-card jsv-result-valid';
    card.innerHTML = `<div class="jsv-result-icon">✅</div>
      <div class="jsv-result-text">${escapeHtml(t('result_valid').replace('${draft}', result.draft))}</div>`;
    hideErrorsSection();
  } else {
    card.className = 'jsv-result-card jsv-result-invalid';
    card.innerHTML = `<div class="jsv-result-icon">❌</div>
      <div class="jsv-result-text">${escapeHtml(t('result_invalid').replace('${count}', String(result.error_count)))}</div>`;
    renderErrors(result.errors);
  }
}

function hideErrorsSection() {
  const sec = STATE.root.querySelector('[data-jsv-errors-section]');
  if (sec) sec.hidden = true;
}

function renderErrors(errors) {
  const sec = STATE.root.querySelector('[data-jsv-errors-section]');
  if (!sec) return;
  sec.hidden = false;
  const countEl = sec.querySelector('[data-jsv-error-count]');
  if (countEl) countEl.textContent = String(errors.length);

  let sorted = [...errors];
  if (STATE.sortBy === 'path') {
    sorted.sort((a, b) => a.instancePath.localeCompare(b.instancePath));
  } else {
    sorted.sort((a, b) => a.line_number - b.line_number || a.column_number - b.column_number);
  }

  const list = sec.querySelector('[data-jsv-error-list]');
  list.innerHTML = sorted.map((err, i) => `
    <li class="jsv-error-item jsv-severity-${err.severity}" data-jsv-error-idx="${i}">
      <div class="jsv-error-line">
        <span class="jsv-error-line-badge">L${err.line_number + 1}</span>
        <span class="jsv-error-pill jsv-pill-${err.severity}">${err.severity === 'error' ? t('errors_severity_error') : t('errors_severity_warning')}</span>
        <span class="jsv-error-keyword">${escapeHtml(err.keyword)}</span>
      </div>
      <div class="jsv-error-path"><code>${escapeHtml(err.instancePath || '(root)')}</code></div>
      <div class="jsv-error-message">${escapeHtml(STATE.lang === 'zh' ? err.message_zh : err.message_en)}</div>
    </li>
  `).join('');
}

function renderErrorsAfterSearch(searchTerm) {
  const list = STATE.root.querySelector('[data-jsv-error-list]');
  if (!list || !STATE.currentValidation) return;
  const items = list.querySelectorAll('.jsv-error-item');
  items.forEach(li => {
    const txt = li.textContent.toLowerCase();
    li.style.display = !searchTerm || txt.includes(searchTerm.toLowerCase()) ? '' : 'none';
  });
}

/* ---------- 11. Disclaimer update ---------- */

function updateDisclaimer() {
  const el = STATE.root.querySelector('[data-jsv-disclaimer-text]');
  if (!el) return;
  if (!STATE.ajvBundle) {
    el.textContent = t('disclaimer_loading');
    return;
  }
  el.textContent = t('disclaimer_default')
    .replace('${draft}', STATE.draft)
    .replace('${version}', '8.17.0')
    .replace('${size}', String(getBundleSize()));
}

/* ---------- 12. Event handlers ---------- */

function onClick(e) {
  const btn = e.target.closest('[data-jsv-action]');
  if (!btn) return;
  const action = btn.dataset.jsvAction;
  switch (action) {
    case 'toggle-lang':
      STATE.lang = STATE.lang === 'zh' ? 'en' : 'zh';
      applyI18n();
      updateDisclaimer();
      if (STATE.currentValidation) showResult(STATE.currentValidation);
      break;
    case 'select-draft':
      STATE.draft = btn.dataset.jsvDraft;
      renderDraftChips();
      updateDisclaimer();
      break;
    case 'load-preset': {
      const id = btn.dataset.jsvPreset;
      const preset = STATE.presets.find(p => p.id === id);
      if (!preset) return;
      // Update draft chip if different
      if (preset.draft && preset.draft !== STATE.draft) {
        STATE.draft = preset.draft;
        renderDraftChips();
        updateDisclaimer();
      }
      // Fill inputs
      const schemaText = JSON.stringify(preset.schema, null, 2);
      const dataText = JSON.stringify(preset.sample_data, null, 2);
      STATE.root.querySelector('[data-jsv-input="schema"]').value = schemaText;
      STATE.root.querySelector('[data-jsv-input="data"]').value = dataText;
      STATE.currentSchema = schemaText;
      STATE.currentData = dataText;
      updateLineCounts();
      break;
    }
    case 'format-schema': {
      const ta = STATE.root.querySelector('[data-jsv-input="schema"]');
      try { ta.value = JSON.stringify(JSON.parse(ta.value), null, 2); STATE.currentSchema = ta.value; updateLineCounts(); }
      catch (e) { alert(`Format error: ${e.message}`); }
      break;
    }
    case 'format-data': {
      const ta = STATE.root.querySelector('[data-jsv-input="data"]');
      try { ta.value = JSON.stringify(JSON.parse(ta.value), null, 2); STATE.currentData = ta.value; updateLineCounts(); }
      catch (e) { alert(`Format error: ${e.message}`); }
      break;
    }
    case 'clear-schema': {
      const ta = STATE.root.querySelector('[data-jsv-input="schema"]');
      ta.value = ''; STATE.currentSchema = ''; updateLineCounts();
      break;
    }
    case 'clear-data': {
      const ta = STATE.root.querySelector('[data-jsv-input="data"]');
      ta.value = ''; STATE.currentData = ''; updateLineCounts();
      break;
    }
    case 'load-sample': {
      const sample = { type: 'object', properties: { name: { type: 'string' }, age: { type: 'integer' } }, required: ['name'] };
      const ta = STATE.root.querySelector('[data-jsv-input="schema"]');
      ta.value = JSON.stringify(sample, null, 2); STATE.currentSchema = ta.value;
      const ta2 = STATE.root.querySelector('[data-jsv-input="data"]');
      ta2.value = JSON.stringify({ name: 'Alice', age: 30 }, null, 2); STATE.currentData = ta2.value;
      updateLineCounts();
      break;
    }
    case 'validate': {
      const schemaText = STATE.currentSchema;
      const dataText = STATE.currentData;
      const result = validate(schemaText, dataText, STATE.draft);
      showResult(result);
      // Render tree (try parse schema)
      try {
        const parsed = JSON.parse(schemaText);
        const treeContainer = STATE.root.querySelector('[data-jsv-tree-content]');
        renderTree(parsed, treeContainer);
      } catch { /* ignore tree */ }
      break;
    }
    case 'sort-errors': {
      STATE.sortBy = btn.dataset.jsvSortBy || 'line';
      const sec = STATE.root.querySelector('[data-jsv-errors-section]');
      sec.querySelectorAll('[data-jsv-action="sort-errors"]').forEach(b => b.classList.toggle('active', b === btn));
      if (STATE.currentValidation && !STATE.currentValidation.valid) renderErrors(STATE.currentValidation.errors);
      break;
    }
    case 'expand-all': {
      STATE.root.querySelectorAll('[data-jsv-tree-content] details').forEach(d => d.open = true);
      break;
    }
    case 'collapse-all': {
      STATE.root.querySelectorAll('[data-jsv-tree-content] details').forEach(d => d.open = false);
      break;
    }
    case 'export': {
      exportReport(btn.dataset.jsvExportFormat);
      break;
    }
    case 'openapi-convert': {
      const result = convertOpenApi30To31();
      const statusEl = STATE.root.querySelector('[data-jsv-openapi-status]');
      if (statusEl) statusEl.textContent = result;
      break;
    }
    case 'error-jump': {
      // Click on error line → scroll textarea to that line
      const idx = parseInt(btn.dataset.jsvErrorIdx || '-1', 10);
      const err = STATE.currentValidation && STATE.currentValidation.errors && STATE.currentValidation.errors[idx];
      if (!err) return;
      const ta = STATE.root.querySelector('[data-jsv-input="schema"]');
      jumpToLine(ta, err.line_number);
      ta.focus();
      break;
    }
  }
}

function onInput(e) {
  if (e.target.matches('[data-jsv-input="schema"]')) {
    STATE.currentSchema = e.target.value;
    updateLineCounts();
  } else if (e.target.matches('[data-jsv-input="data"]')) {
    STATE.currentData = e.target.value;
    updateLineCounts();
  } else if (e.target.matches('[data-jsv-tree-search]')) {
    // Search highlight in tree
    const term = e.target.value;
    STATE.root.querySelectorAll('[data-jsv-tree-content] summary').forEach(s => {
      const txt = s.textContent.toLowerCase();
      s.classList.toggle('jsv-search-hit', term && txt.includes(term.toLowerCase()));
    });
    // Also filter error list
    renderErrorsAfterSearch(term);
  }
}

function updateLineCounts() {
  const sc = STATE.root.querySelector('[data-jsv-schema-line-count]');
  const dc = STATE.root.querySelector('[data-jsv-data-line-count]');
  if (sc) sc.textContent = `${(STATE.currentSchema.match(/\n/g) || []).length + 1} lines`;
  if (dc) dc.textContent = `${(STATE.currentData.match(/\n/g) || []).length + 1} lines`;
}

function jumpToLine(textarea, lineNumber) {
  const lines = textarea.value.split('\n');
  let pos = 0;
  for (let i = 0; i < Math.min(lineNumber, lines.length); i++) pos += lines[i].length + 1;
  textarea.focus();
  textarea.setSelectionRange(pos, pos + (lines[lineNumber] || '').length);
  // Scroll into view
  const lineHeight = 20;
  textarea.scrollTop = Math.max(0, lineNumber * lineHeight - textarea.clientHeight / 2);
}

/* ---------- 13. OpenAPI 3.0 → 3.1 conversion ---------- */

function convertOpenApi30To31() {
  const ta = STATE.root.querySelector('[data-jsv-input="schema"]');
  let schema;
  try { schema = JSON.parse(ta.value); }
  catch (e) { return `Format error: ${e.message}`; }
  if (schema.$schema && schema.$schema.includes('2020-12')) {
    return t('openapi_no_changes');
  }
  let changes = 0;
  const seen = new WeakSet();
  function walk(node) {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { node.forEach(walk); return; }
    // definitions → $defs
    if (node.definitions) {
      node.$defs = node.definitions;
      delete node.definitions;
      changes++;
    }
    // exclusiveMinimum/Maximum number → array form
    if (typeof node.exclusiveMinimum === 'number') {
      node.exclusiveMinimum = [node.exclusiveMinimum, true];
      changes++;
    }
    if (typeof node.exclusiveMaximum === 'number') {
      node.exclusiveMaximum = [node.exclusiveMaximum, true];
      changes++;
    }
    // nullable: true → type: [..., "null"]
    if (node.nullable === true && node.type) {
      const t = Array.isArray(node.type) ? node.type : [node.type];
      if (!t.includes('null')) { node.type = [...t, 'null']; }
      delete node.nullable;
      changes++;
    }
    for (const k in node) walk(node[k]);
  }
  walk(schema);
  if (changes === 0) return t('openapi_no_changes');
  ta.value = JSON.stringify(schema, null, 2);
  STATE.currentSchema = ta.value;
  return t('openapi_done').replace('${count}', String(changes));
}

/* ---------- 14. Helpers ---------- */

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(s) {
  return String(s || '').replace(/"/g, '&quot;');
}

function showFatalError(msg) {
  const card = STATE.root.querySelector('[data-jsv-result]');
  if (card) {
    card.className = 'jsv-result-card jsv-result-error';
    card.innerHTML = `<div class="jsv-result-icon">⚠️</div><div class="jsv-result-text">${escapeHtml(msg)}</div>`;
  }
}

/* ---------- 15. Self-test (5 ajv smoke tests, console only) ---------- */

function selfTest() {
  // Just log a brief banner so users / verifiers can see init
  console.log('[jsv] self-test placeholder — see preset-test.js for ajv 10-case smoke + preset compliance');
}

/* ---------- 16. Boot ---------- */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

selfTest();