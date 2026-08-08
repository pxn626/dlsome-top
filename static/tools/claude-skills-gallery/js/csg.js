/* ==========================================================================
   Claude Skills Template Gallery (csg-*) — dlsome-top
   Self-contained vanilla JS. No CDN, no fetch (data inline in HTML).
   ========================================================================== */
(function () {
  'use strict';

  // === I18N (EN + ZH inline) ================================================
  const I18N = {
    en: {
      browse: 'Browse',
      preview: 'Preview',
      composer: 'Composer',
      search_placeholder: 'Search skills…',
      all: 'All',
      view: 'View',
      copy: 'Copy',
      download: 'Download',
      share: 'Share',
      copy_md: 'Copy .skill.md',
      download_md: 'Download .skill.md',
      share_url: 'Share URL',
      validate: 'Validate',
      compose_copy: 'Copy',
      compose_download: 'Download .skill.md',
      example_invocation: 'Example invocation',
      standard_title: 'Skill schema (Anthropic)',
      standard_body: 'All templates follow the <strong>Anthropic Claude Skills v1.0</strong> framework: YAML frontmatter (<code>name</code> / <code>description</code> / optional <code>allowed-tools</code> / <code>version</code> / <code>license</code>) + Markdown body. See <a href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview" rel="nofollow noopener" target="_blank">official docs</a> for the full spec.',
      disclaimer: 'Reference only — Claude Skills framework is evolving; always verify against the latest Anthropic docs. No tracking, no server.',
      field_name: 'name',
      field_description: 'description',
      field_allowed_tools: 'allowed-tools (one per line)',
      field_version: 'version',
      field_license: 'license',
      hint_name: 'lowercase + hyphens, ≤64 chars',
      hint_description: 'When to use this skill, ≤1024 chars',
      hint_version: 'e.g. 1.0.0',
      hint_license: 'MIT, Apache-2.0, …',
      validation_ok: '✓ Valid Skill',
      validation_err: '✗ Validation failed',
      toast_copied: 'Copied to clipboard',
      toast_copied_md: '.skill.md copied to clipboard',
      toast_copied_url: 'Share URL copied to clipboard',
      toast_validation_ok: '✓ Valid Skill YAML',
      toast_validation_err: '✗ Fix errors before exporting',
      toast_no_skill: 'No skill selected',
      toast_url_failed: 'Could not update share URL',
      code_view: 'Code',
      split_view: 'Split',
      render_view: 'Preview',
      empty_results: 'No skills match your search.',
      results_count: (n, total) => `Showing ${n} of ${total} templates`,
      skill_label: 'Skill'
    },
    zh: {
      browse: '浏览',
      preview: '预览',
      composer: '创作',
      search_placeholder: '搜索模板…',
      all: '全部',
      view: '查看',
      copy: '复制',
      download: '下载',
      share: '分享',
      copy_md: '复制 .skill.md',
      download_md: '下载 .skill.md',
      share_url: '分享链接',
      validate: '校验',
      compose_copy: '复制',
      compose_download: '下载 .skill.md',
      example_invocation: '调用示例',
      standard_title: 'Skill 规范(Anthropic)',
      standard_body: '所有模板遵循 <strong>Anthropic Claude Skills v1.0</strong> 框架:YAML frontmatter(<code>name</code> / <code>description</code> / 可选 <code>allowed-tools</code> / <code>version</code> / <code>license</code>)+ Markdown 正文。完整规范参见 <a href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview" rel="nofollow noopener" target="_blank">官方文档</a>。',
      disclaimer: '仅供参考 —— Claude Skills 框架仍在快速迭代;请以最新 Anthropic 官方文档为准。零追踪,零上传。',
      field_name: 'name',
      field_description: 'description',
      field_allowed_tools: 'allowed-tools(每行一个)',
      field_version: 'version',
      field_license: 'license',
      hint_name: '小写 + 连字符,≤64 字符',
      hint_description: '何时使用此技能,≤1024 字符',
      hint_version: '如 1.0.0',
      hint_license: 'MIT、Apache-2.0 等',
      validation_ok: '✓ 技能合法',
      validation_err: '✗ 校验失败',
      toast_copied: '已复制到剪贴板',
      toast_copied_md: '.skill.md 已复制到剪贴板',
      toast_copied_url: '分享链接已复制到剪贴板',
      toast_validation_ok: '✓ Skill YAML 合法',
      toast_validation_err: '✗ 请先修正错误再导出',
      toast_no_skill: '未选择模板',
      toast_url_failed: '无法更新分享链接',
      code_view: '代码',
      split_view: '分屏',
      render_view: '预览',
      empty_results: '没有匹配的模板。',
      results_count: (n, total) => `显示 ${n} / ${total} 个模板`,
      skill_label: '技能'
    }
  };

  // === Mini YAML parser/serializer (flat key + list + multiline |) =========
  function parseYamlFrontmatter(yaml) {
    const result = {};
    const lines = yaml.split('\n');
    let i = 0;
    let currentKey = null;
    let currentList = null;
    let multilineBuffer = null;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === '' || trimmed.startsWith('#')) { i++; continue; }

      // Multiline scalar continuation
      if (multilineBuffer !== null) {
        if (line.startsWith('  ') || line.startsWith('\t')) {
          multilineBuffer += (multilineBuffer ? '\n' : '') + line.replace(/^  /, '');
          i++;
          continue;
        } else {
          result[currentKey] = multilineBuffer;
          multilineBuffer = null;
          currentKey = null;
        }
      }

      // List item
      if (trimmed.startsWith('- ')) {
        if (currentList) {
          const val = trimmed.slice(2).trim();
          currentList.push(val);
        }
        i++;
        continue;
      }

      // Key: value
      const m = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
      if (m) {
        const key = m[1];
        let val = m[2];

        // Empty value → maybe list below or multiline
        if (val === '' || val === '|' || val === '>') {
          currentKey = key;
          if (val === '|' || val === '>') {
            multilineBuffer = '';
          } else {
            currentList = [];
          }
        } else {
          // Strip surrounding quotes
          val = val.replace(/^["']|["']$/g, '');
          result[key] = val;
          currentKey = key;
          currentList = null;
        }
        i++;
        continue;
      }

      i++;
    }

    // Flush tail
    if (multilineBuffer !== null) result[currentKey] = multilineBuffer;
    if (currentList && currentKey) result[currentKey] = currentList;

    return result;
  }

  function buildYamlFrontmatter(obj) {
    const lines = ['---'];
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val === undefined || val === null || val === '') continue;

      if (Array.isArray(val)) {
        if (val.length === 0) continue;
        lines.push(`${key}:`);
        for (const item of val) {
          lines.push(`  - ${item}`);
        }
      } else if (typeof val === 'string' && (val.includes('\n') || val.length > 80)) {
        lines.push(`${key}: |`);
        for (const ln of val.split('\n')) {
          lines.push(`  ${ln}`);
        }
      } else {
        lines.push(`${key}: ${val}`);
      }
    }
    lines.push('---');
    return lines.join('\n');
  }

  // === Validation ===========================================================
  function validateSkillYaml(yamlStr) {
    const errors = [];
    const warnings = [];

    if (!yamlStr || !yamlStr.trim()) {
      errors.push('YAML is empty');
      return { valid: false, errors, warnings, data: {} };
    }

    let fmText = yamlStr;
    // Strip leading --- and trailing ---
    const fmMatch = yamlStr.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (fmMatch) {
      fmText = fmMatch[1];
    } else if (yamlStr.startsWith('---')) {
      // try without trailing ---
      const trimmed = yamlStr.replace(/^---\s*\n/, '').replace(/\n---\s*$/, '');
      fmText = trimmed.split('\n---')[0];
    }

    let data;
    try {
      data = parseYamlFrontmatter(fmText);
    } catch (e) {
      errors.push(`YAML parse error: ${e.message}`);
      return { valid: false, errors, warnings, data: {} };
    }

    // name: required, lowercase + hyphens, ≤64 chars
    if (!data.name) {
      errors.push('name is required');
    } else if (typeof data.name !== 'string') {
      errors.push('name must be a string');
    } else if (!/^[a-z0-9-]+$/.test(data.name)) {
      errors.push('name must be lowercase + hyphens only (a-z, 0-9, -)');
    } else if (data.name.length > 64) {
      errors.push('name must be ≤64 chars');
    }

    // description: required, ≤1024 chars
    if (!data.description) {
      errors.push('description is required');
    } else if (typeof data.description !== 'string') {
      errors.push('description must be a string');
    } else if (data.description.length > 1024) {
      errors.push('description must be ≤1024 chars');
    }

    // version: if present, semver-like
    if (data.version && typeof data.version === 'string') {
      if (!/^\d+\.\d+\.\d+/.test(data.version)) {
        warnings.push('version should follow semver (e.g. 1.0.0)');
      }
    }

    // license: optional, just warn if empty
    if (data['allowed-tools'] && !Array.isArray(data['allowed-tools']) && typeof data['allowed-tools'] === 'string') {
      // Allow comma-separated single-line form
      data['allowed-tools'] = data['allowed-tools'].split(',').map(s => s.trim()).filter(Boolean);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      data
    };
  }

  function composeSkillYamlFromForm(formData) {
    const fm = {
      name: formData.name,
      description: formData.description
    };
    if (formData.allowedTools && formData.allowedTools.length) {
      fm['allowed-tools'] = formData.allowedTools;
    }
    if (formData.version) fm.version = formData.version;
    if (formData.license) fm.license = formData.license;

    const fmYaml = buildYamlFrontmatter(fm);
    const body = `\n\n# ${formData.name || 'my-skill'}\n\n> TODO: Describe what this skill does and when to invoke it.\n\n## When invoked\n1. Read the relevant context.\n2. Apply the rules below.\n\n## Output format\n- Bullet list of results.\n`;
    return fmYaml + body;
  }

  // === Toast ================================================================
  function toast(msg) {
    let el = document.querySelector('.csg-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'csg-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('csg-toast-show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('csg-toast-show'), 1800);
  }

  // === Markdown render (mini) ==============================================
  function renderMarkdown(md) {
    if (!md) return '';
    let html = md;

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) =>
      `<pre><code>${escapeHtml(code)}</code></pre>`);

    // Headings
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold / italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Ordered list
    html = html.replace(/^(\d+)\. (.+)$/gm, '<oli>$2</oli>');
    html = html.replace(/(<oli>.*?<\/oli>\n?)+/gs, m => `<ol>${m.replace(/<oli>/g, '<li>').replace(/<\/oli>/g, '</li>')}</ol>`);

    // Unordered list
    html = html.replace(/^- (.+)$/gm, '<uli>$1</uli>');
    html = html.replace(/(<uli>.*?<\/uli>\n?)+/gs, m => `<ul>${m.replace(/<uli>/g, '<li>').replace(/<\/uli>/g, '</li>')}</ul>`);

    // Paragraphs
    html = html.split(/\n{2,}/).map(p => {
      if (p.startsWith('<')) return p;
      return `<p>${p}</p>`;
    }).join('\n');

    return html;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // === State ================================================================
  let state = {
    lang: 'en',
    activePanel: 'browse',
    activeCat: 'all',
    search: '',
    activeSkillId: null,
    previewView: 'split',
    composeData: {
      name: '',
      description: '',
      allowedTools: [],
      version: '',
      license: ''
    }
  };

  // === Init per tool instance ==============================================
  function initTool(root) {
    state.lang = root.getAttribute('data-csg-lang') === 'zh' ? 'zh' : 'en';
    const t = I18N[state.lang];

    // Inject labels
    root.querySelectorAll('[data-csg-tab]').forEach(btn => {
      const panel = btn.getAttribute('data-csg-tab');
      btn.textContent = t[panel] || panel;
    });

    // Toolbar inject (search + categories + view tabs + actions)
    injectToolbar(root);

    // Render static panels
    renderCards(root);
    renderPreview(root);
    renderComposer(root);

    // Wire global events
    wireEvents(root);

    // Parse hash → deep link
    const hash = window.location.hash;
    const m = hash.match(/skill=([a-z0-9-]+)/);
    if (m) {
      const skill = state.skills.find(s => s.id === m[1]);
      if (skill) {
        state.activeSkillId = skill.id;
        switchPanel(root, 'preview');
        renderPreview(root);
      }
    }
  }

  function injectToolbar(root) {
    const t = I18N[state.lang];

    // Browse toolbar
    const browseToolbar = root.querySelector('[data-csg-browse-toolbar]');
    if (browseToolbar && !browseToolbar.dataset.csgInjected) {
      browseToolbar.innerHTML = `
        <input type="search" class="csg-search" data-csg-search placeholder="${escapeHtml(t.search_placeholder)}" aria-label="search" />
        <div class="csg-category-bar" data-csg-catbar></div>
        <div class="csg-result-count" data-csg-count></div>
      `;
      browseToolbar.dataset.csgInjected = '1';
      renderCategoryBar(root);
      renderCount(root);
    }

    // Preview toolbar
    const previewToolbar = root.querySelector('[data-csg-preview-toolbar]');
    if (previewToolbar && !previewToolbar.dataset.csgInjected) {
      previewToolbar.innerHTML = `
        <select class="csg-select-skill" data-csg-skill-picker aria-label="select skill"></select>
        <div class="csg-view-tabs" role="tablist">
          <button type="button" class="csg-view-tab" data-csg-view="code">${t.code_view}</button>
          <button type="button" class="csg-view-tab active" data-csg-view="split">${t.split_view}</button>
          <button type="button" class="csg-view-tab" data-csg-view="render">${t.render_view}</button>
        </div>
        <div class="csg-actions">
          <button type="button" class="csg-btn" data-csg-action="copy">📋 ${t.copy}</button>
          <button type="button" class="csg-btn" data-csg-action="download">⬇ ${t.download_md}</button>
          <button type="button" class="csg-btn" data-csg-action="share">🔗 ${t.share_url}</button>
        </div>
      `;
      previewToolbar.dataset.csgInjected = '1';
      populateSkillPicker(root);
      applyPreviewView(root);
    }

    // Composer toolbar (just info labels in JS)
    // labels are in renderComposer()

    // Standard + disclaimer
    const standard = root.querySelector('[data-csg-standard]');
    if (standard) standard.innerHTML = `<h4>${escapeHtml(t.standard_title)}</h4><p>${t.standard_body}</p>`;
    const disclaimer = root.querySelector('[data-csg-disclaimer]');
    if (disclaimer) disclaimer.textContent = t.disclaimer;
  }

  function renderCategoryBar(root) {
    const bar = root.querySelector('[data-csg-catbar]');
    if (!bar) return;
    const t = I18N[state.lang];
    let html = `<button type="button" class="csg-cat active" data-csg-cat="all">${t.all}</button>`;
    for (const cat of state.categories) {
      const label = state.lang === 'zh' ? cat.label_zh : cat.label_en;
      html += `<button type="button" class="csg-cat" data-csg-cat="${cat.id}" style="--cat-color:${cat.color}">${cat.emoji} ${escapeHtml(label)}</button>`;
    }
    bar.innerHTML = html;
  }

  function renderCount(root) {
    const countEl = root.querySelector('[data-csg-count]');
    if (!countEl) return;
    const t = I18N[state.lang];
    const visible = getFilteredSkills();
    countEl.textContent = t.results_count(visible.length, state.skills.length);
  }

  function getFilteredSkills() {
    const q = state.search.trim().toLowerCase();
    return state.skills.filter(s => {
      if (state.activeCat !== 'all' && s.category !== state.activeCat) return false;
      if (!q) return true;
      const hay = [
        s.id, s.title_en, s.title_zh, s.description_en, s.description_zh,
        ...(s.tags_en || []), ...(s.tags_zh || [])
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  function renderCards(root) {
    const grid = root.querySelector('[data-csg-grid]');
    if (!grid) return;
    const visible = getFilteredSkills();
    if (visible.length === 0) {
      grid.innerHTML = `<div class="csg-empty">${escapeHtml(I18N[state.lang].empty_results)}</div>`;
      return;
    }
    grid.innerHTML = visible.map(s => {
      const title = state.lang === 'zh' ? s.title_zh : s.title_en;
      const desc = state.lang === 'zh' ? s.description_zh : s.description_en;
      const cat = state.categories.find(c => c.id === s.category);
      const catLabel = state.lang === 'zh' ? cat.label_zh : cat.label_en;
      const t = I18N[state.lang];
      return `
        <article class="csg-card" data-csg-id="${s.id}" data-csg-cat="${s.category}">
          <div class="csg-card-head">
            <span class="csg-card-emoji">${s.emoji}</span>
            <h3 class="csg-card-title">${escapeHtml(title)}</h3>
            <span class="csg-card-cat" style="background:${cat.color}22;color:${cat.color}">${escapeHtml(catLabel)}</span>
          </div>
          <p class="csg-card-desc">${escapeHtml(desc)}</p>
          <div class="csg-card-actions">
            <button type="button" class="csg-btn csg-btn-small" data-csg-action="view" data-csg-id="${s.id}">👁 ${t.view}</button>
            <button type="button" class="csg-btn csg-btn-small csg-btn-primary" data-csg-action="copy-card" data-csg-id="${s.id}">📋 ${t.copy}</button>
          </div>
        </article>`;
    }).join('');
    renderCount(root);
  }

  function populateSkillPicker(root) {
    const picker = root.querySelector('[data-csg-skill-picker]');
    if (!picker) return;
    picker.innerHTML = state.skills.map(s => {
      const title = state.lang === 'zh' ? s.title_zh : s.title_en;
      const cat = state.categories.find(c => c.id === s.category);
      return `<option value="${s.id}">${s.emoji} ${escapeHtml(title)} — ${escapeHtml(state.lang === 'zh' ? cat.label_zh : cat.label_en)}</option>`;
    }).join('');
    if (state.activeSkillId) picker.value = state.activeSkillId;
    else {
      state.activeSkillId = state.skills[0].id;
      picker.value = state.activeSkillId;
    }
  }

  function renderPreview(root) {
    const skill = state.skills.find(s => s.id === state.activeSkillId);
    if (!skill) return;
    const codeEl = root.querySelector('[data-csg-code]');
    const renderEl = root.querySelector('[data-csg-render]');
    const exEl = root.querySelector('[data-csg-example]');

    if (codeEl) codeEl.textContent = skill.yaml;

    if (renderEl) {
      const fmMatch = skill.yaml.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
      const body = fmMatch ? fmMatch[2] : skill.yaml;
      renderEl.innerHTML = renderMarkdown(body);
    }

    if (exEl) {
      const ex = state.lang === 'zh' ? skill.example_zh : skill.example_en;
      exEl.textContent = ex;
    }
  }

  function renderComposer(root) {
    const t = I18N[state.lang];
    const form = root.querySelector('[data-csg-compose]');
    if (!form) return;
    form.innerHTML = `
      <label>
        <span>${t.field_name} <span class="csg-req">*</span></span>
        <input type="text" data-csg-field="name" pattern="[a-z0-9-]+" maxlength="64" />
        <small class="csg-hint">${t.hint_name}</small>
      </label>
      <label>
        <span>${t.field_description} <span class="csg-req">*</span></span>
        <textarea data-csg-field="description" maxlength="1024" rows="6"></textarea>
        <small class="csg-hint">${t.hint_description}</small>
      </label>
      <label>
        <span>${t.field_allowed_tools}</span>
        <textarea data-csg-field="allowedTools" rows="3" placeholder="Read&#10;Grep&#10;Bash"></textarea>
      </label>
      <label>
        <span>${t.field_version}</span>
        <input type="text" data-csg-field="version" placeholder="${t.hint_version}" />
      </label>
      <label>
        <span>${t.field_license}</span>
        <input type="text" data-csg-field="license" placeholder="${t.hint_license}" />
      </label>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button type="button" class="csg-btn" data-csg-action="compose-validate">✓ ${t.validate}</button>
        <button type="button" class="csg-btn" data-csg-action="compose-copy">📋 ${t.compose_copy}</button>
        <button type="button" class="csg-btn csg-btn-primary" data-csg-action="compose-download">⬇ ${t.compose_download}</button>
      </div>
    `;

    const preview = root.querySelector('[data-csg-compose-preview]');
    if (preview) preview.textContent = '';

    const validation = root.querySelector('[data-csg-validation]');
    if (validation) validation.className = 'csg-validation';
  }

  function applyPreviewView(root) {
    const grid = root.querySelector('[data-csg-preview-grid]') || root.querySelector('[data-csg-preview-body]');
    if (!grid) return;
    grid.classList.remove('csg-view-code', 'csg-view-split', 'csg-view-render');
    grid.classList.add(`csg-view-${state.previewView}`);
    root.querySelectorAll('[data-csg-view]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-csg-view') === state.previewView);
    });
  }

  function switchPanel(root, panel) {
    state.activePanel = panel;
    root.querySelectorAll('[data-csg-tab]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-csg-tab') === panel);
    });
    root.querySelectorAll('[data-csg-panel]').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-csg-panel') === panel);
    });
  }

  function wireEvents(root) {
    // Tabs
    root.addEventListener('click', e => {
      const tabBtn = e.target.closest('[data-csg-tab]');
      if (tabBtn) switchPanel(root, tabBtn.getAttribute('data-csg-tab'));

      const catBtn = e.target.closest('[data-csg-cat]');
      if (catBtn) {
        state.activeCat = catBtn.getAttribute('data-csg-cat');
        root.querySelectorAll('[data-csg-cat]').forEach(b =>
          b.classList.toggle('active', b.getAttribute('data-csg-cat') === state.activeCat));
        renderCards(root);
      }

      const viewBtn = e.target.closest('[data-csg-view]');
      if (viewBtn) {
        state.previewView = viewBtn.getAttribute('data-csg-view');
        applyPreviewView(root);
      }

      const actionBtn = e.target.closest('[data-csg-action]');
      if (actionBtn) handleAction(root, actionBtn);

      const cardViewBtn = e.target.closest('[data-csg-action="view"]');
      if (cardViewBtn && cardViewBtn.dataset.csgId) {
        state.activeSkillId = cardViewBtn.dataset.csgId;
        switchPanel(root, 'preview');
        populateSkillPicker(root);
        renderPreview(root);
        applyPreviewView(root);
      }
    });

    // Search
    root.addEventListener('input', e => {
      if (e.target.matches('[data-csg-search]')) {
        state.search = e.target.value;
        renderCards(root);
      }
      if (e.target.matches('[data-csg-field]')) {
        const f = e.target.getAttribute('data-csg-field');
        let val = e.target.value;
        if (f === 'allowedTools') {
          val = val.split('\n').map(s => s.trim()).filter(Boolean);
        }
        state.composeData[f] = val;
        updateComposePreview(root);
      }
    });

    // Skill picker change
    root.addEventListener('change', e => {
      if (e.target.matches('[data-csg-skill-picker]')) {
        state.activeSkillId = e.target.value;
        renderPreview(root);
      }
    });

    // Hash change → deep link
    window.addEventListener('hashchange', () => {
      const m = window.location.hash.match(/skill=([a-z0-9-]+)/);
      if (m && state.skills.find(s => s.id === m[1])) {
        state.activeSkillId = m[1];
        populateSkillPicker(root);
        renderPreview(root);
        switchPanel(root, 'preview');
      }
    });
  }

  function handleAction(root, btn) {
    const action = btn.getAttribute('data-csg-action');
    const t = I18N[state.lang];

    if (action === 'view') {
      const id = btn.dataset.csgId;
      if (!id) return;
      state.activeSkillId = id;
      switchPanel(root, 'preview');
      populateSkillPicker(root);
      renderPreview(root);
      applyPreviewView(root);
      return;
    }

    if (action === 'copy-card') {
      const id = btn.dataset.csgId;
      const skill = state.skills.find(s => s.id === id);
      if (skill) {
        copyToClipboard(skill.yaml, t.toast_copied_md);
      }
      return;
    }

    if (action === 'copy') {
      const skill = state.skills.find(s => s.id === state.activeSkillId);
      if (!skill) { toast(t.toast_no_skill); return; }
      copyToClipboard(skill.yaml, t.toast_copied_md);
      return;
    }

    if (action === 'download') {
      const skill = state.skills.find(s => s.id === state.activeSkillId);
      if (!skill) { toast(t.toast_no_skill); return; }
      downloadFile(`${skill.id}.skill.md`, skill.yaml);
      return;
    }

    if (action === 'share') {
      const skill = state.skills.find(s => s.id === state.activeSkillId);
      if (!skill) { toast(t.toast_no_skill); return; }
      const url = `${window.location.origin}${window.location.pathname}#skill=${skill.id}`;
      try {
        history.replaceState(null, '', `#skill=${skill.id}`);
      } catch (e) { /* ignore */ }
      copyToClipboard(url, t.toast_copied_url);
      return;
    }

    if (action === 'compose-validate') {
      const yml = composeSkillYamlFromForm(state.composeData);
      const res = validateSkillYaml(yml);
      showValidation(root, res);
      if (res.valid) toast(t.toast_validation_ok); else toast(t.toast_validation_err);
      return;
    }

    if (action === 'compose-copy' || action === 'compose-download') {
      const yml = composeSkillYamlFromForm(state.composeData);
      const res = validateSkillYaml(yml);
      showValidation(root, res);
      if (!res.valid) { toast(t.toast_validation_err); return; }
      if (action === 'compose-copy') {
        copyToClipboard(yml, t.toast_copied_md);
      } else {
        const fname = (res.data.name || 'my-skill') + '.skill.md';
        downloadFile(fname, yml);
      }
      return;
    }
  }

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
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function showValidation(root, res) {
    const el = root.querySelector('[data-csg-validation]');
    if (!el) return;
    el.classList.add('csg-validation-show');
    if (res.valid && res.warnings.length === 0) {
      el.className = 'csg-validation csg-validation-show csg-validation-ok';
      el.innerHTML = `<strong>${escapeHtml(I18N[state.lang].validation_ok)}</strong>`;
    } else if (res.valid) {
      el.className = 'csg-validation csg-validation-show csg-validation-ok';
      el.innerHTML = `<strong>${escapeHtml(I18N[state.lang].validation_ok)}</strong><ul>${res.warnings.map(w => `<li>⚠ ${escapeHtml(w)}</li>`).join('')}</ul>`;
    } else {
      el.className = 'csg-validation csg-validation-show csg-validation-err';
      el.innerHTML = `<strong>${escapeHtml(I18N[state.lang].validation_err)}</strong><ul>${res.errors.map(e => `<li>✗ ${escapeHtml(e)}</li>`).join('')}</ul>`;
    }

    // Field-level invalid marking
    if (res.data) {
      root.querySelectorAll('[data-csg-field]').forEach(input => {
        const f = input.getAttribute('data-csg-field');
        let bad = false;
        if (f === 'name') bad = !res.data.name || !/^[a-z0-9-]+$/.test(res.data.name) || res.data.name.length > 64;
        if (f === 'description') bad = !res.data.description || res.data.description.length > 1024;
        input.classList.toggle('csg-field-invalid', bad);
      });
    }
  }

  function updateComposePreview(root) {
    const yml = composeSkillYamlFromForm(state.composeData);
    const preview = root.querySelector('[data-csg-compose-preview]');
    if (preview) preview.textContent = yml;
  }

  // === Bootstrap ===========================================================
  function bootstrap() {
    document.querySelectorAll('[data-csg-root]').forEach(root => {
      // Find inline data (or fetch from static)
      const dataEl = document.getElementById('csg-data');
      let data;
      if (dataEl) {
        try { data = JSON.parse(dataEl.textContent); }
        catch (e) { console.error('[csg] inline data parse failed', e); return; }
      } else {
        // Fallback: fetch from static path
        const basePath = root.getAttribute('data-csg-base') || '/tools/claude-skills-gallery/data/';
        fetch(basePath + 'skills.json')
          .then(r => r.json())
          .then(d => { state.categories = d.categories; state.skills = d.skills; initTool(root); })
          .catch(e => console.error('[csg] data fetch failed', e));
        return;
      }
      state.categories = data.categories;
      state.skills = data.skills;
      initTool(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();