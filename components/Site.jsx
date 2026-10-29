'use client';
import { useLayoutEffect, useReducer, useRef } from 'react';
import SiteLogic from '../lib/site-logic';
import siteConfig from '../lib/site-config';
import SiteView from './SiteView';

function readProps() {
  const p = { ...siteConfig };
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.get('lang')) p.defaultLang = q.get('lang');
    if (q.get('theme')) p.defaultTheme = q.get('theme');
  } catch (e) {}
  return p;
}

// Replace every function in the view values with a stable wrapper that calls the latest version,
// so memoised sections can skip re-rendering without holding stale handlers.
function stabilize(v, host) {
  const latest = host.latest || (host.latest = new Map());
  const stable = host.stable || (host.stable = new Map());
  const walk = (x, path, depth) => {
    if (typeof x === 'function') {
      latest.set(path, x);
      let w = stable.get(path);
      if (!w) { w = (...args) => { const f = latest.get(path); return f ? f(...args) : undefined; }; stable.set(path, w); }
      return w;
    }
    if (!x || typeof x !== 'object' || depth > 6) return x;
    if (Array.isArray(x)) return x.map((y, i) => walk(y, path + '.' + i, depth + 1));
    if (Object.getPrototypeOf(x) !== Object.prototype) return x;
    const o = {};
    for (const k in x) o[k] = walk(x[k], path + '.' + k, depth + 1);
    return o;
  };
  return walk(v, 'v', 0);
}

export default function Site() {
  const [, rerender] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) {
    const logic = new SiteLogic(readProps());
    logic.__notify = rerender;
    ref.current = { logic, mounted: false, prev: logic.state };
  }
  const host = ref.current;
  const logic = host.logic;
  const renderedState = logic.state;
  const v = stabilize(logic.renderVals(), host);

  useLayoutEffect(() => {
    if (!host.mounted) {
      host.mounted = true;
      host.prev = renderedState;
      if (logic.componentDidMount) logic.componentDidMount();
    } else {
      const ps = host.prev;
      host.prev = renderedState;
      if (logic.componentDidUpdate && ps !== renderedState) logic.componentDidUpdate(logic.props, ps);
    }
  });

  useLayoutEffect(() => () => { if (logic.componentWillUnmount) logic.componentWillUnmount(); }, [logic]);

  return <SiteView v={v} />;
}
