/* ==========================================================================
   AI Image Prompt Builder (aipb-*) — dlsome-top
   Self-contained vanilla JS. No CDN, no external fetch (data fetched from
   same-origin static JSON). PaperMod .dark class compatible. Hugo 0.158+
   verified.

   Zero-network promise:
     - All data is fetched once from /tools/ai-image-prompt-builder/data/prompts.json
       (same-origin static asset, NOT an AI API call).
     - No calls to Stable Diffusion / Midjourney / Flux / DALL-E.
     - All processing is browser-side.
   ========================================================================== */
(function () {
  'use strict';

  // === I18N (EN + ZH inline) ================================================
  const I18N = {
    en: {
      subject_label: 'Subject',
      subject_placeholder: 'describe the subject…',
      style_label: 'Style',
      lighting_label: 'Lighting',
      camera_label: 'Camera',
      post_label: 'Post-processing',
      ratio_label: 'Aspect Ratio',
      tokens_label: 'tokens (rough estimate)',
      copy: 'Copy',
      copy_prompt: 'Copy prompt',
      download: 'Download .txt',
      share: 'Share URL',
      templates_label: 'Templates',
      search_placeholder: 'Search templates…',
      all: 'All',
      negative_label: 'Negative Prompts',
      negative_disabled: '⚠️ DALL-E 3 / GPT Image does NOT support negative prompts — section disabled.',
      negative_count: (n) => `${n} selected`,
      select_all: 'Select all',
      clear_all: 'Clear all',
      custom_negative_placeholder: 'Add custom negative phrases (comma-separated)…',
      ratio_compat_warn: (model, ratio) => `Note: ${model} may not support ${ratio} on all checkpoints.`,
      disclaimer: '<strong>Reference only</strong> — this tool does NOT call any AI model API. All processing is browser-side; your prompt never leaves your device.',
      no_network: '<strong>Zero-network promise:</strong> this page makes zero calls to Stable Diffusion / Midjourney / Flux / DALL-E. The fetched JSON file is a same-origin static asset, not an AI service.',
      qg_ok: '✓ Quality Gate passed: all required fields complete.',
      qg_warn_subject: '⚠️ Subject is empty — using template default.',
      qg_warn_no_negative: 'ℹ️ No negative prompts selected — at least "anatomy + quality" recommended.',
      toast_copied: 'Prompt copied to clipboard',
      toast_copied_url: 'Share URL copied to clipboard',
      toast_no_subject: 'Subject is empty',
      toast_url_failed: 'Could not update share URL',
      empty_results: 'No templates match your search.',
      results_count: (n, total) => `Showing ${n} of ${total} templates`,
      model_warning_dalle: 'DALL-E 3 has no negative prompt support — section disabled.',
      model_warning_ratio: (model, ratio) => `${model} may not support ratio ${ratio} on all backends.`,
      field_subject_hint: 'Be specific — e.g. "red-haired young woman with freckles"',
      share_url_copied: 'Share URL with your exact prompt state copied to clipboard',
      qg_label: 'Quality Gate',
      token_approx: '(approx.)'
    },
    zh: {
      subject_label: '主体',
      subject_placeholder: '描述主体…',
      style_label: '风格',
      lighting_label: '光照',
      camera_label: '镜头',
      post_label: '后期',
      ratio_label: '比例',
      tokens_label: 'tokens (粗略估算)',
      copy: '复制',
      copy_prompt: '复制提示词',
      download: '下载 .txt',
      share: '分享 URL',
      templates_label: '模板',
      search_placeholder: '搜索模板…',
      all: '全部',
      negative_label: '负向词',
      negative_disabled: '⚠️ DALL-E 3 / GPT Image 不支持负向词 — 区域已禁用。',
      negative_count: (n) => `已选 ${n} 项`,
      select_all: '全选',
      clear_all: '清空',
      custom_negative_placeholder: '添加自定义负向词 (逗号分隔)…',
      ratio_compat_warn: (model, ratio) => '注意: ' + model + ' 的部分后端可能不支持 ' + ratio + '。',
      disclaimer: '<strong>仅供参考</strong> — 本工具<strong>不调用任何 AI 模型 API</strong>,所有处理均在浏览器端完成,您的提示词不会离开设备。',
      no_network: '<strong>零网络请求承诺:</strong> 本页面零调用 Stable Diffusion / Midjourney / Flux / DALL-E。JSON 文件仅是同源静态资源,不是 AI 服务。',
      qg_ok: '✓ 质量门通过: 所有必填字段完整。',
      qg_warn_subject: '⚠️ 主体为空 — 使用模板默认。',
      qg_warn_no_negative: 'ℹ️ 未选负向词 — 建议至少勾选 "解剖 + 画质"。',
      toast_copied: '提示词已复制到剪贴板',
      toast_copied_url: '分享链接已复制到剪贴板',
      toast_no_subject: '主体为空',
      toast_url_failed: '无法更新分享链接',
      empty_results: '没有匹配的模板。',
      results_count: (n, total) => `显示 ${n} / ${total} 个模板`,
      model_warning_dalle: 'DALL-E 3 不支持负向词 — 区域已禁用。',
      model_warning_ratio: (model, ratio) => model + ' 的部分后端可能不支持 ' + ratio + ' 比例。',
      field_subject_hint: '尽量具体 — 如 "红发雀斑年轻女性"',
      share_url_copied: '带您当前提示词状态的分享链接已复制',
      qg_label: '质量门',
      token_approx: '(约)'
    }
  };

  // === State (per tool instance) ============================================
  let state = {
    lang: 'en',
    data: null,
    activeTplId: null,
    activeCat: 'all',
    search: '',
    fields: {
      subject: '',
      style: [],
      lighting: [],
      camera: [],
      post: [],
      ratio: '1:1',
      custom_negative: ''
    },
    model: 'sd',
    negativeSelected: new Set(),
    weights: {}
  };

  // === Model syntax support =================================================
  const MODEL_SUPPORTS_NEGATIVE = {
    sd: true,
    mj: true,
    flux: true,
    dalle: false
  };

  // === Helpers =============================================================
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function t(key, ...args) {
    const v = I18N[state.lang][key];
    return typeof v === 'function' ? v(...args) : (v || key);
  }

  function estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  // === buildPrompt (核心算法)===============================================
  function buildPrompt() {
    const tpl = state.data.templates.find(x => x.id === state.activeTplId);
    if (!tpl) return { prompt: '', negative: '', negativeEnabled: MODEL_SUPPORTS_NEGATIVE[state.model] };

    const subject = (state.fields.subject || (state.lang === 'zh' ? tpl.fields.subject.default_zh : tpl.fields.subject.default_en) || '').trim();

    function joinChips(fieldKey) {
      const selected = state.fields[fieldKey] || [];
      if (selected.length === 0) return '';
      const opts = state.lang === 'zh' ? tpl.fields[fieldKey].options_zh : tpl.fields[fieldKey].options_en;
      return selected.map(s => opts.indexOf(s) >= 0 ? opts[opts.indexOf(s)] : s).join(', ');
    }

    const style = joinChips('style');
    const lighting = joinChips('lighting');
    const camera = joinChips('camera');
    const post = joinChips('post');
    const ratio = state.fields.ratio;

    let syntax = (tpl.model_syntax && tpl.model_syntax[state.model]) || '';
    let prompt = syntax
      .replace('{subject}', subject)
      .replace('{style}', style)
      .replace('{lighting}', lighting)
      .replace('{camera}', camera)
      .replace('{post}', post)
      .replace('{ratio}', ratio)
      .replace(/\s+/g, ' ')
      .trim();

    // Model-specific post-processing
    let negative = '';

    if (state.model === 'mj') {
      // Midjourney: append --ar and --v 6 if missing (already in template usually)
      if (!prompt.includes('--ar ') && ratio) {
        prompt += ' --ar ' + ratio;
      }
      // Build negative from --no list
      const negList = buildNegativeList();
      if (negList.length) {
        prompt += ' --no ' + negList.join(', ');
      }
    } else if (state.model === 'sd') {
      const negList = buildNegativeList();
      negative = negList.join(', ');
    } else if (state.model === 'flux') {
      const negList = buildNegativeList();
      negative = negList.join(', ');
      // Flux uses Avoid: prefix
      if (negative && !prompt.includes('Avoid:')) {
        prompt += '\n\nAvoid: ' + negative;
      }
    } else if (state.model === 'dalle') {
      // DALL-E 3 has no negative support — strip any Avoid / Negative lines from output
      prompt = prompt.replace(/\n\nAvoid:.*$/s, '').replace(/Avoid:.*$/s, '');
      negative = '';
    }

    // Clean up double commas / trailing spaces
    prompt = prompt
      .replace(/,\s*,/g, ',')
      .replace(/\s+,/g, ',')
      .replace(/,\s+/g, ', ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return {
      prompt,
      negative,
      negativeEnabled: MODEL_SUPPORTS_NEGATIVE[state.model]
    };
  }

  function buildNegativeList() {
    const list = [];
    state.negativeSelected.forEach(key => list.push(key));
    // Add custom negatives
    const custom = (state.fields.custom_negative || '').split(',').map(s => s.trim()).filter(Boolean);
    list.push(...custom);
    // Dedupe
    return Array.from(new Set(list));
  }

  // === Render ==============================================================
  function renderTemplates(root) {
    const grid = root.querySelector('[data-aipb-grid]');
    if (!grid) return;

    let list = state.data.templates;
    if (state.activeCat !== 'all') {
      list = list.filter(t => t.category === state.activeCat);
    }
    const q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(tpl => {
        const hay = [
          tpl.id,
          tpl.title_en, tpl.title_zh,
          tpl.description_en, tpl.description_zh,
          (tpl.tags_en || []).join(' '), (tpl.tags_zh || []).join(' ')
        ].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    if (list.length === 0) {
      grid.innerHTML = `<div class="aipb-empty">${escapeHtml(t('empty_results'))}</div>`;
      return;
    }

    grid.innerHTML = list.map(tpl => {
      const title = state.lang === 'zh' ? tpl.title_zh : tpl.title_en;
      const cat = state.data.categories.find(c => c.id === tpl.category);
      const catLabel = state.lang === 'zh' ? cat.label_zh : cat.label_en;
      const isActive = tpl.id === state.activeTplId;
      return `
        <button type="button" class="aipb-template-card${isActive ? ' active' : ''}" data-aipb-tpl="${tpl.id}">
          <span class="aipb-card-emoji">${escapeHtml(tpl.emoji)}</span>
          <h3 class="aipb-card-title">${escapeHtml(title)}</h3>
          <span class="aipb-card-cat" style="background:${cat.color}22;color:${cat.color}">${escapeHtml(catLabel)}</span>
        </button>`;
    }).join('');

    const count = root.querySelector('[data-aipb-count]');
    if (count) count.textContent = t('results_count', list.length, state.data.templates.length);
  }

  function renderCategoryBar(root) {
    const bar = root.querySelector('[data-aipb-catbar]');
    if (!bar) return;
    const counts = {};
    state.data.templates.forEach(t => { counts[t.category] = (counts[t.category] || 0) + 1; });
    let html = `<button type="button" class="aipb-cat${state.activeCat === 'all' ? ' active' : ''}" data-aipb-cat="all">${escapeHtml(t('all'))} <span class="aipb-cat-count">${state.data.templates.length}</span></button>`;
    for (const cat of state.data.categories) {
      const label = state.lang === 'zh' ? cat.label_zh : cat.label_en;
      const c = counts[cat.id] || 0;
      html += `<button type="button" class="aipb-cat${state.activeCat === cat.id ? ' active' : ''}" data-aipb-cat="${cat.id}" style="--cat-color:${cat.color}">${escapeHtml(cat.emoji)} ${escapeHtml(label)} <span class="aipb-cat-count">${c}</span></button>`;
    }
    bar.innerHTML = html;
  }

  function renderForm(root) {
    const tpl = state.data.templates.find(x => x.id === state.activeTplId);
    if (!tpl) return;

    const form = root.querySelector('[data-aipb-form]');
    if (!form) return;

    const subjDefault = state.lang === 'zh' ? tpl.fields.subject.default_zh : tpl.fields.subject.default_en;
    const subjPh = state.lang === 'zh' ? tpl.fields.subject.placeholder_zh : tpl.fields.subject.placeholder_en;

    function chipsHtml(fieldKey, labelKey) {
      const f = tpl.fields[fieldKey];
      if (!f || f.type !== 'multiselect') return '';
      const opts = state.lang === 'zh' ? f.options_zh : f.options_en;
      return `
        <div class="aipb-field">
          <label class="aipb-field-label">${escapeHtml(t(labelKey))}</label>
          <div class="aipb-chips" data-aipb-chips="${fieldKey}">
            ${opts.map(o => {
              const active = state.fields[fieldKey].indexOf(o) >= 0;
              return `<button type="button" class="aipb-chip${active ? ' active' : ''}" data-aipb-chip="${fieldKey}" data-aipb-value="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
            }).join('')}
          </div>
        </div>`;
    }

    function ratioHtml() {
      const compatible = tpl.ratio_compatible || state.data.ratios.map(r => r.id);
      return `
        <div class="aipb-field">
          <label class="aipb-field-label">${escapeHtml(t('ratio_label'))}</label>
          <div class="aipb-ratio-buttons">
            ${state.data.ratios.map(r => {
              const active = state.fields.ratio === r.id;
              const compat = compatible.indexOf(r.id) >= 0;
              return `<button type="button" class="aipb-ratio${active ? ' active' : ''}" data-aipb-ratio="${r.id}"${compat ? '' : ' title="ratio compatibility may vary"'}>
                <span class="aipb-ratio-icon">${r.id}</span>
                <span class="aipb-ratio-label">${escapeHtml(state.lang === 'zh' ? r.label_zh : r.label_en)}</span>
              </button>`;
            }).join('')}
          </div>
        </div>`;
    }

    form.innerHTML = `
      <div class="aipb-field">
        <label class="aipb-field-label">${escapeHtml(t('subject_label'))}</label>
        <input type="text" class="aipb-input" data-aipb-field="subject" placeholder="${escapeHtml(subjPh)}" value="${escapeHtml(state.fields.subject)}" />
        <small class="aipb-field-hint">${escapeHtml(t('field_subject_hint'))}</small>
      </div>
      ${chipsHtml('style', 'style_label')}
      ${chipsHtml('lighting', 'lighting_label')}
      ${chipsHtml('camera', 'camera_label')}
      ${chipsHtml('post', 'post_label')}
      ${ratioHtml()}
    `;
  }

  function renderNegative(root) {
    const wrap = root.querySelector('[data-aipb-negative]');
    if (!wrap) return;

    const enabled = MODEL_SUPPORTS_NEGATIVE[state.model];

    if (!enabled) {
      wrap.innerHTML = `
        <div class="aipb-negative-header">
          <h4 class="aipb-negative-title">${escapeHtml(t('negative_label'))}</h4>
        </div>
        <div class="aipb-neg-disabled-msg">${escapeHtml(t('negative_disabled'))}</div>
      `;
      return;
    }

    const total = state.negativeSelected.size;
    wrap.innerHTML = `
      <div class="aipb-negative-header">
        <h4 class="aipb-negative-title">${escapeHtml(t('negative_label'))}</h4>
        <span class="aipb-negative-count">${escapeHtml(t('negative_count', total))}</span>
      </div>
      <div class="aipb-neg-categories" data-aipb-neg-cats>
        ${state.data.negative_library_order.map(catId => {
          const items = state.data.negative_library[catId];
          const catLabel = state.lang === 'zh' ? state.data.negative_labels_zh[catId] : state.data.negative_labels_en[catId];
          const emoji = state.data.negative_emojis[catId] || '';
          const sel = items.filter(it => state.negativeSelected.has(it)).length;
          return `
            <div class="aipb-neg-cat">
              <div class="aipb-neg-cat-header">
                <span class="aipb-neg-cat-label">${emoji} ${escapeHtml(catLabel)}</span>
                <span class="aipb-neg-cat-count">${sel}/${items.length}</span>
              </div>
              <div class="aipb-neg-cat-items">
                ${items.map(it => {
                  const active = state.negativeSelected.has(it);
                  return `<button type="button" class="aipb-neg-item${active ? ' active' : ''}" data-aipb-neg-item="${escapeHtml(it)}">${escapeHtml(it)}</button>`;
                }).join('')}
              </div>
            </div>`;
        }).join('')}
      </div>
      <div class="aipb-neg-custom">
        <input type="text" class="aipb-input aipb-neg-custom-input" data-aipb-custom-negative placeholder="${escapeHtml(t('custom_negative_placeholder'))}" value="${escapeHtml(state.fields.custom_negative)}" />
      </div>
    `;
  }

  function renderOutput(root) {
    const result = buildPrompt();
    const out = root.querySelector('[data-aipb-output-text]');
    if (out) {
      // Highlight placeholders
      let html = escapeHtml(result.prompt);
      ['{subject}', '{style}', '{lighting}', '{camera}', '{post}', '{ratio}'].forEach(ph => {
        html = html.replace(new RegExp(ph.replace(/[{}]/g, '\\$&'), 'g'), `<span class="aipb-token-highlight">${ph}</span>`);
      });
      // Also highlight model-specific markers
      ['--ar', '--v 6', '--s ', '--stylize', '--no', '--style raw', 'Avoid:', 'Negative prompt:'].forEach(m => {
        if (html.indexOf(m) === -1) return;
        const safe = m.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
        html = html.split(safe).join(`<span class="aipb-token-highlight">${safe}</span>`);
      });
      out.innerHTML = html;
    }

    const tokenEl = root.querySelector('[data-aipb-token-count]');
    if (tokenEl) {
      const n = estimateTokens(result.prompt);
      tokenEl.innerHTML = `<strong>${n}</strong> ${escapeHtml(t('tokens_label'))}`;
    }

    // Quality gate
    const qg = root.querySelector('[data-aipb-qg]');
    if (qg) {
      const subjEmpty = !state.fields.subject.trim();
      const negEmpty = state.negativeSelected.size === 0 && !state.fields.custom_negative.trim();
      const model = state.data.models.find(m => m.id === state.model);
      const modelLabel = state.lang === 'zh' ? model.label_zh : model.label_en;
      let html = `<div class="aipb-success"><strong>${escapeHtml(t('qg_label'))}:</strong> ${escapeHtml(modelLabel)} · ${escapeHtml(result.prompt.length)} chars</div>`;
      if (subjEmpty) {
        html += `<div class="aipb-warn"><span class="aipb-warn-icon">⚠️</span>${escapeHtml(t('qg_warn_subject'))}</div>`;
      }
      if (negEmpty && MODEL_SUPPORTS_NEGATIVE[state.model]) {
        html += `<div class="aipb-warn"><span class="aipb-warn-icon">ℹ️</span>${escapeHtml(t('qg_warn_no_negative'))}</div>`;
      }
      qg.innerHTML = html;
    }
  }

  // === Wire events ==========================================================
  function wireEvents(root) {
    // Model tab click
    root.addEventListener('click', e => {
      const tab = e.target.closest('[data-aipb-model]');
      if (tab) {
        state.model = tab.getAttribute('data-aipb-model');
        root.querySelectorAll('[data-aipb-model]').forEach(b =>
          b.classList.toggle('active', b.getAttribute('data-aipb-model') === state.model));
        renderNegative(root);
        renderOutput(root);
        return;
      }

      const cat = e.target.closest('[data-aipb-cat]');
      if (cat) {
        state.activeCat = cat.getAttribute('data-aipb-cat');
        renderTemplates(root);
        return;
      }

      const tplCard = e.target.closest('[data-aipb-tpl]');
      if (tplCard) {
        state.activeTplId = tplCard.getAttribute('data-aipb-tpl');
        // Reset fields to template defaults (preserve ratio + custom_negative)
        const tpl = state.data.templates.find(x => x.id === state.activeTplId);
        if (tpl) {
          state.fields.subject = state.lang === 'zh' ? (tpl.fields.subject.default_zh || '') : (tpl.fields.subject.default_en || '');
          state.fields.style = [];
          state.fields.lighting = [];
          state.fields.camera = [];
          state.fields.post = [];
          // Auto-enable template default negative categories
          state.negativeSelected = new Set();
          if (tpl.negative_default) {
            tpl.negative_default.forEach(cat => {
              (state.data.negative_library[cat] || []).forEach(it => state.negativeSelected.add(it));
            });
          }
        }
        renderTemplates(root);
        renderForm(root);
        renderNegative(root);
        renderOutput(root);
        return;
      }

      const chip = e.target.closest('[data-aipb-chip]');
      if (chip) {
        const field = chip.getAttribute('data-aipb-chip');
        const value = chip.getAttribute('data-aipb-value');
        const arr = state.fields[field];
        const idx = arr.indexOf(value);
        if (idx >= 0) arr.splice(idx, 1); else arr.push(value);
        chip.classList.toggle('active');
        renderOutput(root);
        return;
      }

      const ratio = e.target.closest('[data-aipb-ratio]');
      if (ratio) {
        state.fields.ratio = ratio.getAttribute('data-aipb-ratio');
        renderForm(root);
        renderOutput(root);
        return;
      }

      const negItem = e.target.closest('[data-aipb-neg-item]');
      if (negItem) {
        const value = negItem.getAttribute('data-aipb-neg-item');
        if (state.negativeSelected.has(value)) state.negativeSelected.delete(value);
        else state.negativeSelected.add(value);
        renderNegative(root);
        renderOutput(root);
        return;
      }

      const action = e.target.closest('[data-aipb-action]');
      if (action) handleAction(root, action);
    });

    // Input events
    root.addEventListener('input', e => {
      if (e.target.matches('[data-aipb-search]')) {
        state.search = e.target.value;
        renderTemplates(root);
        return;
      }
      if (e.target.matches('[data-aipb-field="subject"]')) {
        state.fields.subject = e.target.value;
        renderOutput(root);
        return;
      }
      if (e.target.matches('[data-aipb-custom-negative]')) {
        state.fields.custom_negative = e.target.value;
        renderOutput(root);
        return;
      }
    });

    // Hash change → deep link
    window.addEventListener('hashchange', () => {
      parseHash(root);
    });
  }

  function handleAction(root, btn) {
    const action = btn.getAttribute('data-aipb-action');
    if (action === 'copy') {
      const result = buildPrompt();
      const fullPrompt = result.negativeEnabled && result.negative
        ? result.prompt + '\nNegative prompt: ' + result.negative
        : result.prompt;
      copyToClipboard(fullPrompt, t('toast_copied'));
      return;
    }
    if (action === 'download') {
      const result = buildPrompt();
      const fullPrompt = result.negativeEnabled && result.negative
        ? result.prompt + '\nNegative prompt: ' + result.negative
        : result.prompt;
      const fname = `${state.model}-${state.activeTplId || 'prompt'}-${Date.now()}.txt`;
      downloadFile(fname, fullPrompt);
      return;
    }
    if (action === 'share') {
      const hash = buildShareHash();
      try {
        history.replaceState(null, '', hash);
      } catch (e) { /* ignore */ }
      const url = window.location.origin + window.location.pathname + hash;
      copyToClipboard(url, t('share_url_copied'));
      return;
    }
  }

  function buildShareHash() {
    const params = new URLSearchParams({
      template: state.activeTplId || '',
      model: state.model,
      subject: state.fields.subject,
      style: state.fields.style.join('|'),
      lighting: state.fields.lighting.join('|'),
      camera: state.fields.camera.join('|'),
      post: state.fields.post.join('|'),
      ratio: state.fields.ratio,
      negative: Array.from(state.negativeSelected).join('|'),
      custom: state.fields.custom_negative
    });
    return '#prompt=' + params.toString();
  }

  function parseHash(root) {
    const m = window.location.hash.match(/prompt=([^&]+)/);
    if (!m) return;
    const params = new URLSearchParams(m[1]);
    const tplId = params.get('template');
    if (tplId && state.data.templates.find(t => t.id === tplId)) {
      state.activeTplId = tplId;
      state.model = params.get('model') || state.model;
      state.fields.subject = params.get('subject') || state.fields.subject;
      state.fields.style = (params.get('style') || '').split('|').filter(Boolean);
      state.fields.lighting = (params.get('lighting') || '').split('|').filter(Boolean);
      state.fields.camera = (params.get('camera') || '').split('|').filter(Boolean);
      state.fields.post = (params.get('post') || '').split('|').filter(Boolean);
      state.fields.ratio = params.get('ratio') || state.fields.ratio;
      state.fields.custom_negative = params.get('custom') || '';
      state.negativeSelected = new Set((params.get('negative') || '').split('|').filter(Boolean));
      renderAll(root);
    }
  }

  function renderAll(root) {
    renderCategoryBar(root);
    renderTemplates(root);
    renderForm(root);
    renderNegative(root);
    renderOutput(root);
    // Sync model tab active state
    root.querySelectorAll('[data-aipb-model]').forEach(b =>
      b.classList.toggle('active', b.getAttribute('data-aipb-model') === state.model));
  }

  // === Clipboard / download =================================================
  function copyToClipboard(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => toast(msg),
        () => fallbackCopy(text, msg)
      );
    } else {
      fallbackCopy(text, msg);
    }
  }

  function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast(msg); }
    catch (e) { /* silent */ }
    document.body.removeChild(ta);
  }

  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function toast(msg) {
    let el = document.querySelector('.aipb-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'aipb-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('aipb-toast-show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('aipb-toast-show'), 1800);
  }

  // === Init per tool instance ==============================================
  function initTool(root) {
    state.lang = root.getAttribute('data-aipb-lang') === 'zh' ? 'zh' : 'en';

    // Inject disclaimer text
    const disclaimer = root.querySelector('[data-aipb-disclaimer-text]');
    if (disclaimer) disclaimer.innerHTML = t('disclaimer') + '<br>' + t('no_network');

    // Initialize category order from data
    state.data.negative_library_order = Object.keys(state.data.negative_library);

    // Negative labels (EN + ZH)
    state.data.negative_labels_en = {
      anatomy: 'Anatomy',
      quality: 'Quality',
      face: 'Face',
      style: 'Style pollution',
      content: 'Content'
    };
    state.data.negative_labels_zh = {
      anatomy: '解剖学',
      quality: '画质',
      face: '面部',
      style: '风格污染',
      content: '内容'
    };
    state.data.negative_emojis = {
      anatomy: '🖐️',
      quality: '🎨',
      face: '👁️',
      style: '🌀',
      content: '🚫'
    };

    // Default first template
    if (!state.activeTplId && state.data.templates.length > 0) {
      state.activeTplId = state.data.templates[0].id;
      const tpl = state.data.templates[0];
      state.fields.subject = state.lang === 'zh' ? (tpl.fields.subject.default_zh || '') : (tpl.fields.subject.default_en || '');
      state.fields.ratio = '1:1';
      if (tpl.negative_default) {
        state.negativeSelected = new Set();
        tpl.negative_default.forEach(cat => {
          (state.data.negative_library[cat] || []).forEach(it => state.negativeSelected.add(it));
        });
      }
    }

    renderAll(root);
    wireEvents(root);
    parseHash(root);
  }

  // === Bootstrap ===========================================================
  function bootstrap() {
    document.querySelectorAll('[data-aipb-root]').forEach(root => {
      const dataUrl = root.getAttribute('data-aipb-data') || '/tools/ai-image-prompt-builder/data/prompts.json';
      fetch(dataUrl)
        .then(r => r.json())
        .then(data => {
          state.data = data;
          initTool(root);
        })
        .catch(e => {
          console.error('[aipb] data fetch failed', e);
          const wrap = root.querySelector('[data-aipb-output-text]');
          if (wrap) wrap.textContent = 'Failed to load prompt data. Please refresh.';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();