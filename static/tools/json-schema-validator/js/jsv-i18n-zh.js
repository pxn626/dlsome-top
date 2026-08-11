/* ============================================================
 * jsv-i18n-zh.js — zh-CN translation patches for ajv-i18n
 *
 * ajv-i18n (official) covers ~85% of ajv error keywords in zh-CN.
 * This module fills the remaining ~15% with hand-crafted translations
 * for keywords that ajv-i18n's zh-CN locale does not cover well, plus
 * our own UI string translations.
 *
 * Import from jsv.js: import { zhCNPatches, I18N_JSV } from './jsv-i18n-zh.js';
 *
 * License: dlsome-top MIT
 * Compatibility: ajv 8.x + ajv-i18n ^4.2.0
 * ============================================================ */

/**
 * zh-CN error message templates for ajv keywords.
 * Use ${param} syntax for parameter substitution; replaced at enrichError().
 */
export const zhCNPatches = {
  // Already covered by ajv-i18n zh, but we provide cleaner Chinese:
  required:        '缺少必填字段 "${missingProperty}"',
  type:            '类型不匹配:期望 "${type}"',  // + '实际为 undefined'
  enum:            '值必须为枚举之一:${allowedValues}',
  const:           '值必须等于常量 ${allowedValue}',
  multipleOf:      '数值必须为 ${multipleOf} 的整数倍',
  maximum:         '数值必须 ≤ ${limit}',
  minimum:         '数值必须 ≥ ${limit}',
  exclusiveMaximum:'数值必须 < ${limit}(Draft 4 数字形式)',
  exclusiveMinimum:'数值必须 > ${limit}(Draft 4 数字形式)',
  maxLength:       '字符串长度不能超过 ${limit}',
  minLength:       '字符串长度不能少于 ${limit}',
  pattern:         '字符串必须匹配正则表达式:${pattern}',
  maxItems:        '数组元素个数不能超过 ${limit}',
  minItems:        '数组元素个数不能少于 ${limit}',
  uniqueItems:     '数组元素必须唯一(索引 ${i} 和 ${j} 重复)',
  maxProperties:   '对象属性个数不能超过 ${limit}',
  minProperties:   '对象属性个数不能少于 ${limit}',
  dependencies:    '缺少依赖属性:${deps}',
  propertyNames:    '对象属性名必须匹配模式:${pattern}',
  format:          '值必须符合 "${format}" 格式',
  additionalProperties: '不允许额外的属性:"${additionalProperty}"',

  // ajv-i18n zh gap (~15%) — hand-patched
  anyOf:           '值不匹配 anyOf 中任何 schema',
  oneOf:           '值不匹配 oneOf 中任何 schema(必须恰好匹配一个)',
  not:             '值匹配了 not schema(不应该匹配)',
  if:              '条件分支验证失败(if)',
  then:            'then 分支验证失败',
  else:            'else 分支验证失败',
  $ref:            '引用解析失败:${ref}',
  $dynamicRef:     '动态引用解析失败:${ref}',
  prefixItems:     '数组前缀项不匹配(检查前 ${prefixItems?.length || 0} 项)',
  contains:        '数组必须至少包含 1 个匹配项',
  maxContains:     'contains 关键字最多匹配 ${limit} 次',
  minContains:     'contains 关键字至少匹配 ${limit} 次',
  unevaluatedProperties: '存在未求值的属性:"${unevaluatedProperty}"',
  unevaluatedItems: '存在未求值的数组项',
  dependentRequired:  '缺少依赖必填字段:${deps}',
  dependentSchemas:   '依赖 schema 验证失败:${deps}',
  // ajv-errors custom messages
  errorMessage:    '自定义错误:${params}'
};

/**
 * UI string table for zh-CN.
 * Mirrors I18N_JSV in jsv.js; merged at boot if lang=zh.
 */
export const I18N_JSV_ZH = {
  // Section labels
  draft_label:          'JSON Schema Draft',
  preset_label:         '内置 Schema Preset',
  input_label:          '输入 — Schema + 数据',
  result_label:         '验证结果',
  errors_label:         '错误列表',
  tree_label:           'Schema 树视图',
  export_label:         '导出验证报告',
  openapi_label:        'OpenAPI 3.0 → 3.1 Schema 转换',

  // Disclaimer / status
  disclaimer_loading:   '加载中…',
  disclaimer_default:   'JSON Schema Draft ${draft} · AJV v${version} · 包体积约 ${size} KB · 数据不上传服务器',
  result_empty:         '请粘贴 JSON Schema + 数据,然后点击"验证"。',
  result_valid:         '✓ 验证通过!JSON 数据符合 Schema(Draft ${draft})。',
  result_invalid:       '✗ 验证失败,共 ${count} 个错误。',
  result_schema_error:  '⚠ Schema 本身无效:${msg}',

  // Buttons
  btn_format:           '格式化',
  btn_clear:            '清空',
  btn_sample:           '示例数据',
  btn_validate:         '▶ 验证',
  btn_expand_all:       '全部展开',
  btn_collapse_all:     '全部折叠',
  btn_export_json:      '下载 JSON',
  btn_export_md:        '下载 Markdown',
  btn_export_html:      '下载 HTML',
  btn_openapi_convert:  '转换为 OpenAPI 3.1',

  // Sort
  sort_by_line:         '按行号',
  sort_by_path:         '按路径',

  // Inputs
  schema_placeholder:   '{ "type": "object", "properties": { "name": { "type": "string" } }, "required": ["name"] }',
  data_placeholder:     '{ "name": "Alice", "age": 30 }',
  schema_label:         'JSON Schema',
  data_label:           'JSON 数据',

  // Errors
  errors_severity_error:   '错误',
  errors_severity_warning: '警告',
  error_line_prefix:       '行 ${line}',
  error_path_prefix:       '路径',
  error_keyword_label:     '关键字',

  // Tree
  tree_search_placeholder: '搜索关键词(email、$ref、enum...)',
  tree_count_label:        '共 ${count} 个节点',
  tree_warning_large:      '⚠ Schema 过大(${count} 节点),建议用 $ref 拆分。仅渲染首层。',
  tree_node_root:          '根节点',

  // Export
  export_note:           '报告通过 Blob + URL.createObjectURL 在浏览器本地生成,不上传服务器。',
  export_include_label:  '报告中包含原始 Schema + JSON 输入(需手动勾选,隐私保护)',
  export_filename_prefix:'json-schema-validation-report',

  // OpenAPI
  openapi_note:          '将 Draft 7 / OpenAPI 3.0 schema 转换为 Draft 2020-12 / OpenAPI 3.1 兼容:definitions → $defs,nullable: true → type: ["…", "null"],exclusiveMinimum/Maximum 数字 → 数组形式。',
  openapi_no_changes:    '当前 schema 无需转换(已经是 Draft 2020-12)。',
  openapi_done:          '✓ 已转换为 OpenAPI 3.1(Draft 2020-12),共修改 ${count} 处。',

  // Lang toggle
  lang_toggle:           '中文 / EN',

  // Tree node type labels
  node_type_object:      'object',
  node_type_array:       'array',
  node_type_string:      'string',
  node_type_number:      'number',
  node_type_integer:     'integer',
  node_type_boolean:     'boolean',
  node_type_null:        'null',
};

/**
 * English UI string table.
 * Default — fallback when lang is en or unknown.
 */
export const I18N_JSV_EN = {
  draft_label:          'JSON Schema Draft',
  preset_label:         'Built-in Schema Presets',
  input_label:          'Input — Schema + Data',
  result_label:         'Validation Result',
  errors_label:         'Errors',
  tree_label:           'Schema Tree View',
  export_label:         'Export Validation Report',
  openapi_label:        'OpenAPI 3.0 → 3.1 Schema Converter',

  disclaimer_loading:   'Loading…',
  disclaimer_default:   'JSON Schema Draft ${draft} · AJV v${version} · Bundle ~${size} KB · 0 network calls',
  result_empty:         'Paste your JSON Schema + Data, then click Validate.',
  result_valid:         '✓ Valid! JSON data conforms to Schema (Draft ${draft}).',
  result_invalid:       '✗ Invalid — ${count} error(s) found.',
  result_schema_error:  '⚠ Schema itself is invalid: ${msg}',

  btn_format:           'Format',
  btn_clear:            'Clear',
  btn_sample:           'Load sample',
  btn_validate:         '▶ Validate',
  btn_expand_all:       'Expand all',
  btn_collapse_all:     'Collapse all',
  btn_export_json:      'Download JSON',
  btn_export_md:        'Download Markdown',
  btn_export_html:      'Download HTML',
  btn_openapi_convert:  'Convert to OpenAPI 3.1',

  sort_by_line:         'By line',
  sort_by_path:         'By path',

  schema_placeholder:   '{ "type": "object", "properties": { "name": { "type": "string" } }, "required": ["name"] }',
  data_placeholder:     '{ "name": "Alice", "age": 30 }',
  schema_label:         'JSON Schema',
  data_label:           'JSON Data',

  errors_severity_error:   'error',
  errors_severity_warning: 'warning',
  error_line_prefix:       'line ${line}',
  error_path_prefix:       'path',
  error_keyword_label:     'keyword',

  tree_search_placeholder: 'Search keyword (email, $ref, enum…)',
  tree_count_label:        '${count} nodes',
  tree_warning_large:      '⚠ Schema is very large (${count} nodes). Consider splitting with $ref. Only first level rendered.',
  tree_node_root:          'root',

  export_note:           'Reports generated client-side via Blob + URL.createObjectURL — no server processing.',
  export_include_label:  'Include original schema + JSON input in the report (privacy opt-in)',
  export_filename_prefix:'json-schema-validation-report',

  openapi_note:          'Convert Draft 7 / OpenAPI 3.0 schema to Draft 2020-12 / OpenAPI 3.1 compatible: definitions → $defs, nullable: true → type: ["…", "null"], exclusiveMinimum/Maximum number → array form.',
  openapi_no_changes:    'No conversion needed (already Draft 2020-12).',
  openapi_done:          '✓ Converted to OpenAPI 3.1 (Draft 2020-12), ${count} change(s) made.',

  lang_toggle:           '中文 / EN',

  node_type_object:      'object',
  node_type_array:       'array',
  node_type_string:      'string',
  node_type_number:      'number',
  node_type_integer:     'integer',
  node_type_boolean:     'boolean',
  node_type_null:        'null',
};