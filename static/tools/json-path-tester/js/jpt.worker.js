/* ==========================================================================
   JSONPath Tester — Worker Thread
   Handles large JSON parsing + multi-engine execution off the main thread.
   Files: static/tools/json-path-tester/js/jpt.worker.js
   Namespace: --jpt-* (paired with main thread jpt.js)
   ========================================================================== */

// Three engines imported as ESM relative to this file's location.
// Main thread can also import them; worker is for large data only.
let engineCache = {};

async function loadEngine(syntax) {
  if (engineCache[syntax]) return engineCache[syntax];

  if (syntax === 'jsonpath') {
    const mod = await import('../lib/jsonpath-plus.js');
    engineCache.jsonpath = mod.JSONPath;
    return mod.JSONPath;
  } else if (syntax === 'jsonata') {
    const mod = await import('../lib/jsonata.js');
    engineCache.jsonata = mod.default;
    return mod.default;
  } else if (syntax === 'jmespath') {
    const mod = await import('../lib/jmespath.js');
    engineCache.jmespath = mod.default;
    return mod.default;
  }
  throw new Error(`Unknown syntax: ${syntax}`);
}

/**
 * Run query in worker context.
 * Receives: { id, jsonString, expression, syntax }
 * Posts:    { id, ok: true, results, type, count } or { id, ok: false, error }
 */
self.onmessage = async (e) => {
  const { id, jsonString, expression, syntax } = e.data;
  try {
    const jsonData = JSON.parse(jsonString);
    const engine = await loadEngine(syntax);

    let result;
    if (syntax === 'jsonpath') {
      result = engine({ path: expression, json: jsonData });
    } else if (syntax === 'jsonata') {
      result = engine(expression).evaluate(jsonData);
    } else if (syntax === 'jmespath') {
      result = engine.search(jsonData, expression);
    } else {
      throw new Error(`Unknown syntax: ${syntax}`);
    }

    const type = Array.isArray(result) ? 'array' : typeof result;
    const count = Array.isArray(result) ? result.length : 1;

    self.postMessage({
      id,
      ok: true,
      results: result,
      type,
      count
    });
  } catch (err) {
    self.postMessage({
      id,
      ok: false,
      error: err && err.message ? err.message : String(err)
    });
  }
};

// Signal ready
self.postMessage({ ready: true });