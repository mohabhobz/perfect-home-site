// Helpers used by the generated section components.
// S: text value, A: attribute value (false/null removes it), AR: aria value, R: null-safe callback ref.
export const S = (x) => (x == null || x === false ? '' : x);
export const A = (x) => (x === false || x == null ? undefined : x === true ? '' : x);
export const AR = (x) => (x == null ? undefined : String(x));
const refCache = new WeakMap();
export const R = (fn) => {
  if (typeof fn !== 'function') return fn || undefined;
  let w = refCache.get(fn);
  if (!w) { w = (el) => { if (el) fn(el); }; refCache.set(fn, w); }
  return w;
};

// Deep comparison of the listed keys. Functions are kept stable by the host, so they compare by identity.
function eq(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) if (!eq(a[k], b[k])) return false;
  return true;
}
export const same = (a, b, keys) => keys.every((k) => eq(a[k], b[k]));
