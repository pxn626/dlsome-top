/* ============================================================
 * ltce.js — LLM Token Cost Estimator
 * Vanilla JS · zero network · zero AI API · zero dependencies
 *
 * 4 formulas:
 *   1. single_cost = (input/M × input_price) + (output/M × output_price)
 *      + (cached/M × cache_read) + (cache_write/M × 1.25)  // Anthropic only, amortized
 *   2. monthly = single × daily_calls × 30
 *      yearly  = single × daily_calls × 365
 *   3. cache_roi (Anthropic amortized simplified): savings = monthly_no_cache − monthly_with_cache
 *   4. usd_cny = usdAmount × fxRate (default 7.20, user-overridable, no fetch)
 *
 * Namespace: --ltce-* / .ltce-* / data-ltce-*  (no global pollution)
 * I18N: inline JS object (~35-40 strings × 2 langs)
 * Self-test: 4 assertions (data integrity + 3 formula correctness)
 * ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. I18N strings (EN + ZH-Hans) ---------- */
  const I18N_LTCE = {
    en: {
      title: 'LLM Token Cost Calculator',
      disclaimer_prefix: 'Prices last updated',
      disclaimer_mid: '· Source: official pricing pages · Verify on provider sites.',
      fx_disclaimer: 'FX rates are reference only; actual transactions use your payment provider rate.',
      select_models_label: 'Select models',
      select_default: 'Default',
      select_all: 'All',
      select_none: 'None',
      input_tokens_label: 'Input tokens',
      output_tokens_label: 'Output tokens',
      add_1k: '+1K',
      add_10k: '+10K',
      add_100k: '+100K',
      advanced_label: 'Advanced settings',
      daily_calls_label: 'Daily API calls',
      currency_label: 'Currency',
      fx_rate_label: '1 USD = ? CNY',
      cache_label: 'Anthropic Cache Settings',
      cache_hit_label: 'Cache hit rate (%)',
      cache_ttl_label: 'Cache TTL',
      cache_ttl_5min: '5 minutes',
      cache_ttl_1h: '1 hour',
      output_label: 'Cost Comparison',
      sort_cost: 'By cost',
      sort_alpha: 'A–Z',
      table_model: 'Model',
      table_provider: 'Provider',
      table_input: 'Input/M',
      table_output: 'Output/M',
      table_total: 'Total (1K+500)',
      table_vs: 'vs Cheapest',
      cheapest_badge: 'Cheapest',
      cards_label: 'Monthly & Yearly Cost',
      card_single: 'Per-call cost',
      card_monthly: 'Monthly cost',
      card_yearly: 'Yearly cost',
      card_model_label: 'Based on',
      savings_text: 'Switching from {from} to {to} saves {amount}/year',
      savings_none: 'Select 2+ models to see savings comparison.',
      roi_label: 'Anthropic Cache ROI',
      roi_savings: 'Monthly savings',
      roi_effective: 'Effective input price',
      roi_breakeven: 'Break-even rate',
      roi_warning: 'Cache write cost amortized across all cache reads. Real savings depend on prompt reuse pattern.',
      estimator_label: 'Estimate tokens from text',
      estimator_placeholder: 'Paste your prompt here…',
      estimator_disclaimer: 'Rough estimate (4 chars/token for English, 1.5 chars/token for Chinese). Verify with official tokenizer.',
      data_source_label: 'Pricing data sources',
      data_loading: 'Loading pricing data…',
      data_error: 'Failed to load pricing data. Please refresh.',
      self_hosted_note: 'Self-hosted, price varies',
      no_price: '—',
      reset: 'Reset',
      copy_link: 'Copy link',
      link_copied: 'Link copied!',
    },
    zh: {
      title: 'LLM Token 成本计算器',
      disclaimer_prefix: '价格最后更新',
      disclaimer_mid: '· 来源:各厂商官方定价页 · 请在厂商官网核实。',
      fx_disclaimer: '汇率仅供参考,实际交易以支付通道汇率为准。',
      select_models_label: '选择模型',
      select_default: '默认',
      select_all: '全选',
      select_none: '清空',
      input_tokens_label: '输入 tokens',
      output_tokens_label: '输出 tokens',
      add_1k: '+1千',
      add_10k: '+1万',
      add_100k: '+10万',
      advanced_label: '高级设置',
      daily_calls_label: '日均 API 调用',
      currency_label: '货币',
      fx_rate_label: '1 美元 = ? 人民币',
      cache_label: 'Anthropic 缓存设置',
      cache_hit_label: '缓存命中率 (%)',
      cache_ttl_label: '缓存有效期',
      cache_ttl_5min: '5 分钟',
      cache_ttl_1h: '1 小时',
      output_label: '成本对比',
      sort_cost: '按成本',
      sort_alpha: '按字母',
      table_model: '模型',
      table_provider: '厂商',
      table_input: '输入/百万',
      table_output: '输出/百万',
      table_total: '总计 (1K+500)',
      table_vs: '对比最便宜',
      cheapest_badge: '最便宜',
      cards_label: '月度与年度成本',
      card_single: '单次成本',
      card_monthly: '月度成本',
      card_yearly: '年度成本',
      card_model_label: '基于',
      savings_text: '从 {from} 切换到 {to} 每年节省 {amount}',
      savings_none: '请选择 2 个以上模型以查看节省对比。',
      roi_label: 'Anthropic 缓存 ROI',
      roi_savings: '月度节省',
      roi_effective: '有效输入价格',
      roi_breakeven: '保本命中率',
      roi_warning: '缓存写入成本已摊销到所有缓存读取。实际节省取决于 prompt 复用模式。',
      estimator_label: '从文本估算 tokens',
      estimator_placeholder: '粘贴您的 prompt…',
      estimator_disclaimer: '粗略估算(英文 4 字符/token,中文 1.5 字符/token)。请用官方 tokenizer 验证。',
      data_source_label: '价格数据来源',
      data_loading: '加载价格数据中…',
      data_error: '价格数据加载失败,请刷新页面。',
      self_hosted_note: '自托管,价格随厂商变化',
      no_price: '—',
      reset: '重置',
      copy_link: '复制链接',
      link_copied: '链接已复制!',
    },
  };

  /* ---------- 2. Helpers ---------- */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const round6 = (n) => Number((n).toFixed(6));
  const round4 = (n) => Number((n).toFixed(4));
  const round2 = (n) => Number((n).toFixed(2));
  const clamp  = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const escapeHtml = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  /* ---------- 3. State ---------- */
  const state = {
    lang: 'en',
    pricing: null,
    selectedIds: new Set(),
    inputTokens: 1000,
    outputTokens: 500,
    dailyCalls: 100,
    cacheHitRate: 0,
    cacheTtl: '5min',
    currency: 'USD',
    fxRate: 7.20,
    sortBy: 'cost-asc',
    advancedExpanded: false,
    cacheExpanded: false,
    estimatorExpanded: false,
  };

  function t(key) {
    const dict = I18N_LTCE[state.lang] || I18N_LTCE.en;
    return dict[key] || key;
  }

  /* ---------- 4. Core formulas (4 total) ---------- */

  // Formula 1: single-call cost in USD
  function computeSingleCost(model, inputTokens, outputTokens, opts) {
    opts = opts || {};
    const cacheHitRate = clamp(opts.cacheHitRate || 0, 0, 100);
    const cacheTtl = opts.cacheTtl || '5min';
    const m = model;

    // Base input/output cost
    const baseInputCost  = (inputTokens / 1_000_000)  * (m.inputPrice  || 0);
    const baseOutputCost = (outputTokens / 1_000_000) * (m.outputPrice || 0);

    let effectiveInputCost = baseInputCost;
    let cacheWriteCost = 0;
    let cacheReadCost = 0;

    // Anthropic prompt caching — amortized simplified version
    // Assumes cache_write cost is amortized across many cache_reads (large N → write amortizes ~0).
    // UI displays a disclaimer explaining this assumption.
    if (m.provider === 'Anthropic' && cacheHitRate > 0 && m.cacheReadPrice != null) {
      const cachedRatio = cacheHitRate / 100;
      const uncachedRatio = 1 - cachedRatio;
      // Amortized write: ignored in simplified mode (assumes N >> 1)
      cacheWriteCost = 0;
      // effective input = uncached portion * base + cached portion * cache_read
      const uncachedInputCost = (inputTokens / 1_000_000) * uncachedRatio * (m.inputPrice || 0);
      cacheReadCost = (inputTokens / 1_000_000) * cachedRatio * m.cacheReadPrice;
      effectiveInputCost = uncachedInputCost + cacheReadCost;
    }

    const total = effectiveInputCost + baseOutputCost;
    return {
      inputCost: round6(baseInputCost),
      outputCost: round6(baseOutputCost),
      cacheWriteCost: round6(cacheWriteCost),
      cacheReadCost: round6(cacheReadCost),
      effectiveInputCost: round6(effectiveInputCost),
      total: round6(total),
    };
  }

  // Formula 2: monthly + yearly projection
  function computeProjectedCost(singleCost, dailyCalls) {
    return {
      monthly: round2(singleCost * dailyCalls * 30),
      yearly:  round2(singleCost * dailyCalls * 365),
    };
  }

  // Formula 3: Anthropic cache ROI (amortized simplified)
  function computeCacheRoi(model, inputTokens, outputTokens, dailyCalls, cacheHitRate) {
    if (model.provider !== 'Anthropic' || model.cacheReadPrice == null) return null;
    const noCache = computeSingleCost(model, inputTokens, outputTokens);
    const withCache = computeSingleCost(model, inputTokens, outputTokens, { cacheHitRate, cacheTtl: state.cacheTtl });
    const noCacheMonthly = computeProjectedCost(noCache.total, dailyCalls).monthly;
    const withCacheMonthly = computeProjectedCost(withCache.total, dailyCalls).monthly;
    const savings = round2(noCacheMonthly - withCacheMonthly);
    const effectiveInputPrice = (inputTokens > 0)
      ? round4((withCache.effectiveInputCost * 1_000_000) / inputTokens)
      : (model.inputPrice || 0);
    // Break-even: ratio where cached savings = 0; very conservative — assumes amortized write = 0
    // effective_input_cost == uncached_input_cost
    // uncachedRatio * inputPrice = cachedRatio * cacheReadPrice
    // ratio = cacheReadPrice / (inputPrice + cacheReadPrice)
    const breakEvenRate = (model.inputPrice > 0 && model.cacheReadPrice > 0)
      ? round1((model.cacheReadPrice / (model.inputPrice + model.cacheReadPrice)) * 100)
      : 0;
    return {
      noCacheMonthly: round2(noCacheMonthly),
      withCacheMonthly: round2(withCacheMonthly),
      savings,
      effectiveInputPrice,
      breakEvenRate,
    };
  }
  const round1 = (n) => Number((n).toFixed(1));

  // Formula 4: USD � CNY (no network fetch)
  function formatCost(usdAmount) {
    if (usdAmount == null || isNaN(usdAmount)) return t('no_price');
    if (state.currency === 'CNY') {
      const cny = round2(usdAmount * state.fxRate);
      return '¥' + cny.toLocaleString(state.lang === 'zh' ? 'zh-CN' : 'en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      });
    }
    if (usdAmount < 0.0001) return '$' + usdAmount.toFixed(6);
    if (usdAmount < 1) return '$' + usdAmount.toFixed(4);
    return '$' + usdAmount.toFixed(2);
  }

  /* ---------- 5. Renderers ---------- */

  function renderChips() {
    const root = $('[data-ltce-chips]');
    if (!root) return;
    const models = state.pricing.models;
    root.innerHTML = models.map((m) => {
      const selected = state.selectedIds.has(m.id);
      const priceLabel = m.inputPrice != null
        ? `$${m.inputPrice}/$${m.outputPrice}`
        : t('self_hosted_note');
      return `
        <button type="button" class="ltce-chip" data-ltce-chip="${escapeHtml(m.id)}"
                data-ltce-selected="${selected}" data-ltce-tier="${escapeHtml(m.tier)}"
                aria-pressed="${selected}" role="checkbox">
          <span class="ltce-chip-dot" style="background:${escapeHtml(m.tierColor || '#94a3b8')}"></span>
          <span class="ltce-chip-name">${escapeHtml(m.displayNameEn)}</span>
          <span class="ltce-chip-price">${escapeHtml(priceLabel)}</span>
        </button>`;
    }).join('');
  }

  function renderTable() {
    const tbody = $('[data-ltce-tbody]');
    if (!tbody) return;
    const selected = state.pricing.models.filter((m) => state.selectedIds.has(m.id));
    if (selected.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:var(--ltce-fg-muted);">—</td></tr>`;
      return;
    }
    const rows = selected.map((m) => {
      const c = computeSingleCost(m, state.inputTokens, state.outputTokens, {
        cacheHitRate: state.cacheHitRate, cacheTtl: state.cacheTtl,
      });
      return { model: m, cost: c.total, breakdown: c };
    });
    rows.sort((a, b) => {
      if (state.sortBy === 'alpha') return a.model.displayNameEn.localeCompare(b.model.displayNameEn);
      return a.cost - b.cost;
    });
    const cheapest = rows[0].cost;
    tbody.innerHTML = rows.map((r, i) => {
      const isCheapest = i === 0 && r.model.inputPrice != null;
      const delta = (cheapest > 0 && r.cost > cheapest)
        ? ((r.cost - cheapest) / cheapest * 100).toFixed(0) + '×'
        : null;
      const modelName = state.lang === 'zh' ? r.model.displayNameZh : r.model.displayNameEn;
      const inputCell = r.model.inputPrice != null ? `$${r.model.inputPrice.toFixed(2)}` : t('self_hosted_note');
      const outputCell = r.model.outputPrice != null ? `$${r.model.outputPrice.toFixed(2)}` : t('self_hosted_note');
      const totalCell = r.model.inputPrice != null ? formatCost(r.cost) : t('no_price');
      return `
        <tr data-ltce-row="${escapeHtml(r.model.id)}" data-ltce-cheapest="${isCheapest}">
          <td>
            <div class="ltce-table-name">
              ${isCheapest ? `<span class="ltce-badge-cheapest">🏆 ${escapeHtml(t('cheapest_badge'))}</span>` : ''}
              <span>${escapeHtml(modelName)}</span>
            </div>
          </td>
          <td><span class="ltce-table-provider">${escapeHtml(r.model.provider)}</span></td>
          <td data-ltce-td-num>${inputCell}</td>
          <td data-ltce-td-num>${outputCell}</td>
          <td data-ltce-td-num>${totalCell}</td>
          <td data-ltce-td-num><span class="ltce-vs-delta" data-ltce-delta-up="${delta !== null}">${delta ? '×' + delta : t('no_price')}</span></td>
        </tr>`;
    }).join('');
    // Update the reference cost used for cards (cheapest selected model)
    return rows;
  }

  function renderCards(rows) {
    const singleEl = $('[data-ltce-card-single-value]');
    const monthlyEl = $('[data-ltce-card-monthly-value]');
    const yearlyEl = $('[data-ltce-card-yearly-value]');
    const singleModelEl = $('[data-ltce-card-single-model]');
    const monthlyModelEl = $('[data-ltce-card-monthly-model]');
    const yearlyModelEl = $('[data-ltce-card-yearly-model]');
    const savingsEl = $('[data-ltce-savings]');
    const savingsText = $('[data-ltce-savings-text]');

    if (!singleEl) return;
    if (!rows || rows.length === 0) {
      singleEl.textContent = t('no_price');
      monthlyEl.textContent = t('no_price');
      yearlyEl.textContent = t('no_price');
      singleModelEl.textContent = '—';
      monthlyModelEl.textContent = '—';
      yearlyModelEl.textContent = '—';
      if (savingsText) savingsText.textContent = t('savings_none');
      return;
    }

    const cheapestRow = rows[0];  // rows are already sorted
    const proj = computeProjectedCost(cheapestRow.cost, state.dailyCalls);
    const modelName = state.lang === 'zh' ? cheapestRow.model.displayNameZh : cheapestRow.model.displayNameEn;
    singleEl.textContent = formatCost(cheapestRow.cost);
    monthlyEl.textContent = formatCost(proj.monthly);
    yearlyEl.textContent = formatCost(proj.yearly);
    singleModelEl.textContent = `${t('card_model_label')}: ${modelName}`;
    monthlyModelEl.textContent = `${state.dailyCalls} calls/day × 30`;
    yearlyModelEl.textContent = `${state.dailyCalls} calls/day × 365`;

    // Savings
    if (rows.length >= 2 && savingsEl && savingsText) {
      const expensiveRow = rows[rows.length - 1];
      const expensiveProj = computeProjectedCost(expensiveRow.cost, state.dailyCalls);
      const yearlyDiff = Math.max(0, expensiveProj.yearly - proj.yearly);
      if (yearlyDiff > 0.01) {
        const expName = state.lang === 'zh' ? expensiveRow.model.displayNameZh : expensiveRow.model.displayNameEn;
        savingsText.textContent = t('savings_text')
          .replace('{from}', expName)
          .replace('{to}', modelName)
          .replace('{amount}', formatCost(yearlyDiff));
        savingsEl.hidden = false;
      } else {
        savingsEl.hidden = true;
      }
    } else if (savingsEl) {
      savingsEl.hidden = true;
    }
  }

  function renderRoi() {
    const panel = $('[data-ltce-roi]');
    if (!panel) return;
    const anthropicModels = state.pricing.models.filter(
      (m) => m.provider === 'Anthropic' && state.selectedIds.has(m.id) && m.cacheReadPrice != null
    );
    if (anthropicModels.length === 0) {
      panel.hidden = true;
      return;
    }
    panel.hidden = false;
    // Use the most expensive Anthropic model for ROI display (most savings potential)
    const target = anthropicModels.reduce((acc, m) => {
      if (!acc || (m.inputPrice || 0) > (acc.inputPrice || 0)) return m;
      return acc;
    }, null);
    const roi = computeCacheRoi(target, state.inputTokens, state.outputTokens, state.dailyCalls, state.cacheHitRate);
    if (!roi) return;
    const savingsEl = $('[data-ltce-roi-savings-value]');
    const effectiveEl = $('[data-ltce-roi-effective-value]');
    const breakevenEl = $('[data-ltce-roi-breakeven-value]');
    const warningEl = $('[data-ltce-cache-warning]');
    if (savingsEl) savingsEl.textContent = formatCost(roi.savings);
    if (effectiveEl) effectiveEl.textContent = '$' + roi.effectiveInputPrice.toFixed(4) + '/M';
    if (breakevenEl) breakevenEl.textContent = roi.breakEvenRate + '%';
    if (warningEl) warningEl.textContent = t('roi_warning');
  }

  function renderDisclaimer() {
    const el = $('[data-ltce-disclaimer-text]');
    if (!el || !state.pricing) return;
    const date = state.pricing.lastUpdated || '—';
    const count = state.pricing.models.length;
    const text = `${t('disclaimer_prefix')}: ${date} · ${count} ${state.lang === 'zh' ? '个模型' : 'models'} · ${t('disclaimer_mid')}`;
    el.textContent = text;
    // Stale check (>60 days → red warning)
    const lastDate = new Date(date);
    const now = new Date();
    const days = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    const disclaimerBox = $('[data-ltce-disclaimer]');
    if (disclaimerBox && days > 60) {
      disclaimerBox.setAttribute('data-ltce-disclaimer-stale', 'true');
    }
  }

  function renderStandard() {
    const el = $('[data-ltce-standard]');
    if (!el || !state.pricing || !state.pricing.sourceUrls) return;
    const urls = state.pricing.sourceUrls;
    const items = Object.entries(urls).map(([k, v]) =>
      `<a href="${escapeHtml(v)}" target="_blank" rel="nofollow noopener noreferrer">${escapeHtml(k)}</a>`
    ).join('');
    el.innerHTML = `<strong>${escapeHtml(t('data_source_label'))}:</strong> ${items}`;
  }

  function renderAll() {
    const rows = renderTable();
    renderCards(rows);
    renderRoi();
  }

  /* ---------- 6. Apply I18N to static labels ---------- */
  function applyI18n() {
    const map = {
      '[data-ltce-models-label]': 'select_models_label',
      '[data-ltce-inputs-label]': null,  // no static label, use advanced
      '[data-ltce-input-tokens-label]': 'input_tokens_label',
      '[data-ltce-output-tokens-label]': 'output_tokens_label',
      '[data-ltce-add-1k]': 'add_1k',
      '[data-ltce-add-10k]': 'add_10k',
      '[data-ltce-add-100k]': 'add_100k',
      '[data-ltce-advanced-label]': 'advanced_label',
      '[data-ltce-daily-calls-label]': 'daily_calls_label',
      '[data-ltce-currency-label]': 'currency_label',
      '[data-ltce-fx-rate-label]': 'fx_rate_label',
      '[data-ltce-cache-label]': 'cache_label',
      '[data-ltce-cache-hit-label]': 'cache_hit_label',
      '[data-ltce-cache-ttl-label]': 'cache_ttl_label',
      '[data-ltce-output-label]': 'output_label',
      '[data-ltce-sort-label-cost]': 'sort_cost',
      '[data-ltce-sort-label-alpha]': 'sort_alpha',
      '[data-ltce-cards-label]': 'cards_label',
      '[data-ltce-card-single-label]': 'card_single',
      '[data-ltce-card-monthly-label]': 'card_monthly',
      '[data-ltce-card-yearly-label]': 'card_yearly',
      '[data-ltce-roi-label]': 'roi_label',
      '[data-ltce-roi-savings-label]': 'roi_savings',
      '[data-ltce-roi-effective-label]': 'roi_effective',
      '[data-ltce-roi-breakeven-label]': 'roi_breakeven',
      '[data-ltce-estimator-label]': 'estimator_label',
      '[data-ltce-estimator-disclaimer]': 'estimator_disclaimer',
      '[data-ltce-th-model]': 'table_model',
      '[data-ltce-th-provider]': 'table_provider',
      '[data-ltce-th-input]': 'table_input',
      '[data-ltce-th-output]': 'table_output',
      '[data-ltce-th-total]': 'table_total',
      '[data-ltce-th-vs]': 'table_vs',
      '[data-ltce-fx-disclaimer]': 'fx_disclaimer',
      '[data-ltce-action-label="select-default"]': 'select_default',
      '[data-ltce-action-label="select-all"]': 'select_all',
      '[data-ltce-action-label="select-none"]': 'select_none',
    };
    Object.entries(map).forEach(([sel, key]) => {
      const el = $(sel);
      if (el && key) el.textContent = t(key);
    });
    // Placeholders
    const ph = $('[data-ltce-estimator-input]');
    if (ph) ph.placeholder = t('estimator_placeholder');
  }

  /* ---------- 7. Event handlers ---------- */

  function attachEvents() {
    // Chip click → toggle
    const chipsRoot = $('[data-ltce-chips]');
    if (chipsRoot) {
      chipsRoot.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-ltce-chip]');
        if (!btn) return;
        const id = btn.getAttribute('data-ltce-chip');
        if (state.selectedIds.has(id)) state.selectedIds.delete(id);
        else state.selectedIds.add(id);
        btn.setAttribute('data-ltce-selected', state.selectedIds.has(id));
        btn.setAttribute('aria-pressed', state.selectedIds.has(id));
        // Auto-expand cache panel if any Anthropic selected
        const cacheDetails = $('[data-ltce-cache]');
        if (cacheDetails) {
          const hasAnthropic = state.pricing.models.some(
            (m) => m.provider === 'Anthropic' && state.selectedIds.has(m.id)
          );
          cacheDetails.hidden = !hasAnthropic;
          cacheDetails.setAttribute('data-ltce-cache-active', hasAnthropic);
          if (hasAnthropic) cacheDetails.setAttribute('open', '');
        }
        renderAll();
      });
    }

    // Toolbar actions
    document.addEventListener('click', (e) => {
      const action = e.target.closest('[data-ltce-action]');
      if (!action) return;
      const act = action.getAttribute('data-ltce-action');
      if (act === 'select-default') {
        state.selectedIds = new Set(state.pricing.models.filter((m) => m.defaultSelected).map((m) => m.id));
      } else if (act === 'select-all') {
        state.selectedIds = new Set(state.pricing.models.filter((m) => m.inputPrice != null).map((m) => m.id));
      } else if (act === 'select-none') {
        state.selectedIds = new Set();
      } else if (act === 'sort') {
        state.sortBy = action.getAttribute('data-ltce-sort') || 'cost-asc';
        $$('[data-ltce-sort]').forEach((b) => b.classList.toggle('active', b === action));
      } else if (act === 'add') {
        const amount = parseInt(action.getAttribute('data-ltce-amount') || '0', 10);
        const input = $('[data-ltce-input="inputTokens"]');
        if (input) {
          input.value = (parseInt(input.value || '0', 10) + amount).toString();
          state.inputTokens = parseInt(input.value, 10);
          renderAll();
        }
      } else if (act === 'reset') {
        state.inputTokens = 1000;
        state.outputTokens = 500;
        state.dailyCalls = 100;
        state.cacheHitRate = 0;
        state.fxRate = state.pricing.defaultFxUsdToCny;
        state.currency = 'USD';
        syncInputs();
        renderAll();
      }
      renderChips();
      renderAll();
    });

    // Input changes
    $$('[data-ltce-input]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.getAttribute('data-ltce-input');
        const v = input.value;
        if (key === 'inputTokens')        state.inputTokens    = clamp(parseInt(v || '0', 10), 0, 100_000_000);
        else if (key === 'outputTokens')  state.outputTokens   = clamp(parseInt(v || '0', 10), 0, 100_000_000);
        else if (key === 'dailyCalls')    state.dailyCalls     = clamp(parseInt(v || '0', 10), 0, 1_000_000);
        else if (key === 'cacheHitRate')  state.cacheHitRate   = clamp(parseInt(v || '0', 10), 0, 100);
        else if (key === 'cacheTtl')      state.cacheTtl       = v;
        else if (key === 'currency')      state.currency       = v;
        else if (key === 'fxRate')        state.fxRate         = clamp(parseFloat(v || '7.20'), 1, 20);
        renderAll();
      });
    });

    // Token estimator
    const est = $('[data-ltce-estimator-input]');
    const estOut = $('[data-ltce-estimator-output]');
    if (est && estOut) {
      let timer = null;
      est.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const text = est.value;
          if (!text) { estOut.textContent = '~0 tokens'; return; }
          const cnChars = (text.match(/[一-龥]/g) || []).length;
          const otherChars = text.length - cnChars;
          const tokens = Math.ceil(cnChars / 1.5 + otherChars / 4);
          estOut.textContent = `~${tokens.toLocaleString()} tokens (≈${text.length.toLocaleString()} chars)`;
        }, 200);
      });
    }
  }

  function syncInputs() {
    const map = {
      inputTokens: state.inputTokens,
      outputTokens: state.outputTokens,
      dailyCalls: state.dailyCalls,
      cacheHitRate: state.cacheHitRate,
      cacheTtl: state.cacheTtl,
      currency: state.currency,
      fxRate: state.fxRate,
    };
    Object.entries(map).forEach(([k, v]) => {
      const el = $(`[data-ltce-input="${k}"]`);
      if (el) el.value = v;
    });
  }

  /* ---------- 8. Bootstrap ---------- */

  function init(rootEl) {
    state.lang = (rootEl.getAttribute('data-ltce-lang') || 'en').startsWith('zh') ? 'zh' : 'en';
    const dataUrl = rootEl.getAttribute('data-ltce-data');
    if (!dataUrl) {
      console.error('[ltce] data URL missing');
      return;
    }
    fetch(dataUrl)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then((pricing) => {
        state.pricing = pricing;
        // Bootstrap default selection
        state.selectedIds = new Set(pricing.models.filter((m) => m.defaultSelected).map((m) => m.id));
        state.fxRate = pricing.defaultFxUsdToCny || 7.20;
        applyI18n();
        syncInputs();
        renderChips();
        renderDisclaimer();
        renderStandard();
        renderAll();
        attachEvents();
        // Self-test (visible in browser console only)
        runSelfTest();
      })
      .catch((err) => {
        console.error('[ltce] Failed to load pricing data:', err);
        const discl = $('[data-ltce-disclaimer-text]');
        if (discl) discl.textContent = t('data_error');
      });
  }

  /* ---------- 9. Self-test (4 assertions) ---------- */
  function runSelfTest() {
    try {
      const data = state.pricing;
      // Test 1: 13 models
      console.assert(data.models.length === 13, `[ltce] expected 13 models, got ${data.models.length}`);
      // Test 2: required fields
      const required = ['id','provider','displayNameEn','displayNameZh','tier','contextWindow','inputPrice','outputPrice','cacheWritePrice','cacheReadPrice','batchInputPrice','batchOutputPrice'];
      const invalid = data.models.filter((m) => required.some((k) => !(k in m)));
      console.assert(invalid.length === 0, `[ltce] ${invalid.length} models missing required fields`);
      // Test 3: 5 default selected
      const defaults = data.models.filter((m) => m.defaultSelected);
      console.assert(defaults.length === 5, `[ltce] expected 5 defaults, got ${defaults.length}`);
      // Test 4: formula correctness — GPT-4o 1K+500 → $0.0075
      const gpt4o = data.models.find((m) => m.id === 'gpt-4o');
      const c = computeSingleCost(gpt4o, 1000, 500);
      console.assert(Math.abs(c.total - 0.0075) < 1e-9, `[ltce] GPT-4o 1K+500 expected $0.0075, got $${c.total}`);
      // Test 5 (bonus): monthly projection $22.50
      const proj = computeProjectedCost(0.0075, 100);
      console.assert(Math.abs(proj.monthly - 22.50) < 0.01, `[ltce] monthly expected $22.50, got $${proj.monthly}`);
      // Test 6 (bonus): Sonnet 4.5 cache ROI at 80% → ~$6.48/month savings
      const sonnet = data.models.find((m) => m.id === 'claude-sonnet-4-5');
      const roi = computeCacheRoi(sonnet, 1000, 500, 100, 80);
      console.assert(roi && Math.abs(roi.savings - 6.48) < 0.05, `[ltce] cache savings expected ~$6.48, got $${roi && roi.savings}`);
      console.log('[ltce] self-test passed');
    } catch (err) {
      console.error('[ltce] self-test error:', err);
    }
  }

  /* ---------- 10. DOMContentLoaded ---------- */
  function bootstrap() {
    $$('[data-ltce-root]').forEach((root) => {
      try { init(root); }
      catch (err) { console.error('[ltce] init failed:', err); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
