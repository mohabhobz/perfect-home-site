// Page logic: state, scroll-driven film, theme, language, album, form.
import { DCLogic } from './dc-logic';

export default class SiteLogic extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { p: 0, page: 0, y: 0, W: 1440, H: 900, onFilm: true, lang: null, theme: null, sysDark: true, aboutP: 0, secP: 0, secMax: 0, svcIdx: 0, sent: false, clIdx: 0, clTick: 0, clManual: false, albCat: 'all', albTick: 0, lb: -1, ldPhase: 0, menu: false };
    this.vids = [];
    this.scrubTick = () => this.scrubStep();
    this.clipDur = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4];
    this.clipRefs = this.clipDur.map((d, i) => (el) => { this.vids[i] = el; if (el) this.primeVid(el); });
    this.VID = {
      S1080: ["/media/video/c01a-d.mp4?v=2","/media/video/c01b-d.mp4?v=2","/media/video/c02a-d.mp4?v=2","/media/video/c02b-d.mp4?v=2","/media/video/c03a-d.mp4?v=2","/media/video/c03b-d.mp4?v=2","/media/video/c04a-d.mp4?v=2","/media/video/c04b-d.mp4?v=2","/media/video/c05a-d.mp4?v=2","/media/video/c05b-d.mp4?v=2","/media/video/c06a-d.mp4?v=2","/media/video/c06b-d.mp4?v=2","/media/video/c07a-d.mp4?v=2","/media/video/c07b-d.mp4?v=2","/media/video/c08a-d.mp4?v=2","/media/video/c08b-d.mp4?v=2","/media/video/c09a-d.mp4?v=2","/media/video/c09b-d.mp4?v=2","/media/video/c10a-d.mp4?v=2","/media/video/c10b-d.mp4?v=2","/media/video/c11a-d.mp4?v=2","/media/video/c11b-d.mp4?v=2"],
      SP: ["/media/video/c01a-m.mp4?v=2","/media/video/c01b-m.mp4?v=2","/media/video/c02a-m.mp4?v=2","/media/video/c02b-m.mp4?v=2","/media/video/c03a-m.mp4?v=2","/media/video/c03b-m.mp4?v=2","/media/video/c04a-m.mp4?v=2","/media/video/c04b-m.mp4?v=2","/media/video/c05a-m.mp4?v=2","/media/video/c05b-m.mp4?v=2","/media/video/c06a-m.mp4?v=2","/media/video/c06b-m.mp4?v=2","/media/video/c07a-m.mp4?v=2","/media/video/c07b-m.mp4?v=2","/media/video/c08a-m.mp4?v=2","/media/video/c08b-m.mp4?v=2","/media/video/c09a-m.mp4?v=2","/media/video/c09b-m.mp4?v=2","/media/video/c10a-m.mp4?v=2","/media/video/c10b-m.mp4?v=2","/media/video/c11a-m.mp4?v=2","/media/video/c11b-m.mp4?v=2"],
    };
    this.vtier = this.pickTier();
    this.clipRefs = this.clipDur.map((d, i) => (el) => { this.vids[i] = el; if (el) this.primeVid(el); });
    this.svcEls = [];
    this.film = null;
    this.about = null;
    this.sec = null;
    this.track = null;
    this.raf = 0;
    this.onScroll = this.onScroll.bind(this);
    this.setFilm = (el) => { this.film = el; };
    this.setAbout = (el) => { this.about = el; };
    this.setSec = (el) => { this.sec = el; };
    this.setTrack = (el) => { this.track = el; };
    this.setHome = (el) => { this.home = el; };
    this.svcRefs = [0, 1, 2, 3].map((i) => (el) => { this.svcEls[i] = el; });
    this.onSubmit = (ev) => { ev.preventDefault(); this.setState({ sent: true }); };
    this.albPick = {};
    this.ldEls = [];
    this.ldRef0 = (el) => { this.ldEls[0] = el; };
    this.ldRef1 = (el) => { this.ldEls[1] = el; };
    this.ldRef2 = (el) => { this.ldEls[2] = el; };
    this.onKey = (e) => {
      if (this.state.lb < 0) return;
      const n = this.albList ? this.albList.length : 0;
      const rtl = (this.state.lang ?? this.props.defaultLang ?? 'ar') !== 'en';
      if (e.key === 'Escape') this.setState({ lb: -1 });
      else if (e.key === 'ArrowRight') this.setState({ lb: (this.state.lb + (rtl ? -1 : 1) + n) % n });
      else if (e.key === 'ArrowLeft') this.setState({ lb: (this.state.lb + (rtl ? 1 : -1) + n) % n });
    };
    this.clVis = false;
    this.clT = 0;
    this.clSchedule = () => {
      clearTimeout(this.clT);
      if (this.state.clManual || !this.clVis) return;
      this.clT = setTimeout(() => this.setState((st) => ({ clIdx: (st.clIdx + 1) % 3, clTick: st.clTick + 1 }), this.clSchedule), 6000);
    };
    this.clPick = [0, 1, 2].map((i) => () => { clearTimeout(this.clT); if (this.state.clIdx !== i || !this.state.clManual) this.setState({ clIdx: i, clManual: true }); });
    this.clLeave = () => { if (this.state.clManual) this.setState((st) => ({ clManual: false, clTick: st.clTick + 1 }), this.clSchedule); };
    this.setProof = (el) => {
      if (!el || this.proofEl === el) return;
      this.proofEl = el;
      try {
        this.pio = new IntersectionObserver((es) => es.forEach((e) => {
          this.clVis = e.isIntersecting;
          if (e.isIntersecting) this.setState((st) => ({ clTick: st.clTick + 1 }), this.clSchedule);
          else clearTimeout(this.clT);
        }), { threshold: 0.35 });
        this.pio.observe(el);
      } catch (e) {}
    };
  }
  componentDidMount() {
    this.unlockVids = () => this.vids.forEach((v) => { if (v && !v.__primed) this.primeVid(v); });
    window.addEventListener('touchstart', this.unlockVids, { passive: true });
    window.addEventListener('pointerdown', this.unlockVids, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    window.addEventListener('keydown', this.onKey);
    try {
      this.mq = window.matchMedia('(prefers-color-scheme: dark)');
      this.onMq = () => this.setState({ sysDark: this.mq.matches });
      this.mq.addEventListener('change', this.onMq);
      this.setState({ sysDark: this.mq.matches });
    } catch (e) {}
    this.onScroll();
    this.loadClips();
    this.startLoader();
    try {
      this.io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute('data-in', ''); this.io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
      this.observe = () => document.querySelectorAll('.rv:not([data-in]), .rvimg:not([data-in])').forEach((el) => this.io.observe(el));
      setTimeout(this.observe, 300);
    } catch (e) {}
  }
  startLoader() {
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    try { window.scrollTo(0, 0); } catch (e) {}
    const cap = (pr, ms) => Promise.race([pr, new Promise((r) => setTimeout(r, ms))]);
    const once = (el, evs) => new Promise((r) => evs.forEach((ev) => el.addEventListener(ev, r, { once: true })));
    // Wait only for what the first screen needs: brand fonts, the logo and the first film frame.
    const items = [];
    document.querySelectorAll('[data-loader] img, a[href="#top"] img').forEach((im) => {
      if (!im.complete) items.push(cap(once(im, ['load', 'error']), 2500));
    });
    if (this.clip0) items.push(cap(this.clip0, 3500));
    if (document.fonts && document.fonts.ready) items.push(cap(document.fonts.ready, 2500));
    const total = Math.max(1, items.length);
    let done = 0;
    this.ldTarget = items.length ? 0.04 : 1;
    items.forEach((pr) => pr.then(() => { done += 1; this.ldTarget = Math.max(this.ldTarget, done / total); }));
    setTimeout(() => { this.ldTarget = 1; }, 4500);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minMs = reduce ? 300 : 1400;
    let cur = 0, last = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const seg = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
    const paint = (x) => {
      const d = [ease(seg(x, 0, 0.55)), ease(seg(x, 0.4, 0.78)), ease(seg(x, 0.62, 1))];
      this.ldEls.forEach((el, i) => {
        if (!el) return;
        let L = 400;
        try { L = el.getTotalLength() || 400; } catch (e) {}
        el.style.strokeDasharray = L + ' ' + L;
        el.style.strokeDashoffset = String(L * (1 - d[i]));
      });
    };
    const tick = (now) => {
      const dt = now - last; last = now;
      cur = Math.min(this.ldTarget, cur + dt / minMs);
      paint(cur);
      if (cur < 1) { this.ldRaf = requestAnimationFrame(tick); return; }
      this.setState({ ldPhase: 1 });
      this.ldT1 = setTimeout(() => this.setState({ ldPhase: 2 }), reduce ? 50 : 400);
      this.ldT2 = setTimeout(() => { this.setState({ ldPhase: 3 }); root.style.overflow = prevOverflow; }, reduce ? 100 : 700);
      this.ldT3 = setTimeout(() => this.setState({ ldPhase: 4 }), reduce ? 200 : 1300);
    };
    this.ldRaf = requestAnimationFrame(tick);
  }
  componentDidUpdate(pp, ps) {
    if (this.observe && (ps.lang !== this.state.lang || ps.theme !== this.state.theme || ps.albCat !== this.state.albCat)) setTimeout(this.observe, 50);
  }
  componentWillUnmount() {
    try { this.io.disconnect(); } catch (e) {}
    try { this.pio.disconnect(); } catch (e) {}
    clearTimeout(this.clT);
    cancelAnimationFrame(this.ldRaf);
    [this.ldT1, this.ldT2, this.ldT3].forEach((x) => clearTimeout(x));
    document.documentElement.style.overflow = '';
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    window.removeEventListener('keydown', this.onKey);
    try { this.mq.removeEventListener('change', this.onMq); } catch (e) {}
    cancelAnimationFrame(this.raf);
    cancelAnimationFrame(this.scrubRaf);
  }
  onScroll() {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      if (!this.film) return;
      const r = this.film.getBoundingClientRect();
      const H = window.innerHeight, W = document.documentElement.clientWidth || window.innerWidth;
      const span = r.height - H;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const max = Math.max(1, document.documentElement.scrollHeight - H);
      const y = window.scrollY;
      const page = Math.min(1, Math.max(0, y / max));
      this.scrub(p);
      let aboutP = 0, secP = 0, secMax = 0, svcIdx = this.state.svcIdx;
      if (this.about) { const a = this.about.getBoundingClientRect(); aboutP = Math.min(1, Math.max(0, (H - a.top) / (a.height * 0.9 + H * 0.2))); }
      if (this.sec) { const sr = this.sec.getBoundingClientRect(); const sp = sr.height - H; secP = sp > 0 ? Math.min(1, Math.max(0, -sr.top / sp)) : 0; }
      let homeP = 0;
      if (this.home) { const hr = this.home.getBoundingClientRect(); const hs = hr.height - H; homeP = hs > 0 ? Math.min(1, Math.max(0, -hr.top / hs)) : 0; }
      if (this.track) secMax = Math.max(0, this.track.scrollWidth - W);
      let best = 1e9;
      const svcTops = [];
      this.svcEls.forEach((el, i) => { if (!el) return; const b = el.getBoundingClientRect(); svcTops[i] = b.top; const d = Math.abs(b.top + Math.min(b.height, H) / 2 - H * 0.5); if (d < best) { best = d; svcIdx = i; } });
      this.setState({ p, page, y, W, H, onFilm: r.bottom > 80, aboutP, secP, secMax, svcIdx, svcTops, homeP, clipMax: Math.max(this.state.clipMax || 1, Math.min(this.clipDur.length - 1, this.activeClip(p) + 2)) });
    });
  }
  secs() { return [16, 24, 24, 6, 16]; }
  pickTier() {
    let W = 1440, H = 900, dpr = 1, slow = false;
    try {
      W = window.innerWidth; H = window.innerHeight; dpr = Math.min(3, window.devicePixelRatio || 1);
      const c = navigator.connection;
      slow = !!(c && (c.saveData || /(^|-)2g|3g/.test(c.effectiveType || '')));
    } catch (e) {}
    const hasS4 = !!(this.VID.S1440 && this.VID.S1440.length === 22);
    let t;
    if (W / H <= 0.6) {
      const need = Math.max(H, W * 16 / 9) * dpr;
      t = 'SP';
    } else {
      const need = Math.max(W, H * 16 / 9) * dpr;
      t = need > 2200 && hasS4 ? 'S1440' : 'S1080';
      if (slow) t = 'S1080';
    }
    return t;
  }
  clipUrls() {
    const ids = this.VID[this.vtier] || this.VID.S1080;
    return ids.map((id) => '' + id);
  }
  async fetchClip(url) {
    // Whole clip in memory: seeking never waits on the network. Kept in the Cache API so repeat visits load from disk.
    const C = 'ph-film-v1';
    let res = null, cache = null;
    try { cache = await caches.open(C); res = await cache.match(url); } catch (e) {}
    if (!res) {
      res = await fetch(url);
      if (!res.ok) throw new Error('clip ' + res.status);
      if (cache) { try { await cache.put(url, res.clone()); } catch (e) {} }
    }
    return URL.createObjectURL(await res.blob());
  }
  loadClips() {
    const urls = this.clipUrls();
    this.vsrc = new Array(urls.length).fill('');
    let next = 0;
    const run = async () => {
      while (next < urls.length) {
        const i = next++;
        let src = urls[i];
        try { src = await this.fetchClip(urls[i]); } catch (e) {}
        this.vsrc[i] = src;
        if (i === 0 && this.clip0Done) this.clip0Done();
        this.setState({ vtick: (this.state.vtick || 0) + 1 });
      }
    };
    this.clip0 = new Promise((r) => { this.clip0Done = r; });
    run(); run();
  }
  primeVid(v) {
    // Phones (iOS Safari especially) only decode frames for a seek after the video has played once.
    if (!v || v.__primed) return;
    v.__primed = true;
    try { v.muted = true; v.defaultMuted = true; v.playsInline = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', ''); } catch (e) {}
    const go = () => {
      try {
        const r = v.play();
        if (r && r.then) r.then(() => { v.pause(); this.curT = undefined; this.scrub(this.lastP || 0); }).catch(() => { v.__primed = false; });
        else v.pause();
      } catch (e) { v.__primed = false; }
    };
    if (v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, { once: true });
  }
  scrub(p) {
    this.lastP = p;
    const total = this.clipDur.reduce((a, b) => a + b, 0);
    this.tgtT = p * total;
    if (!this.scrubRaf) this.scrubRaf = requestAnimationFrame(this.scrubTick);
  }
  scrubStep() {
    this.scrubRaf = 0;
    const s = this.clipDur;
    const tgt = this.tgtT || 0;
    if (this.curT === undefined) this.curT = tgt;
    const diff = tgt - this.curT;
    this.curT = Math.abs(diff) < 0.004 ? tgt : this.curT + diff * 0.22;
    const t = this.curT;
    let acc = 0;
    s.forEach((d, i) => {
      const v = this.vids[i];
      const start = acc;
      acc += d;
      if (!v || v.readyState < 1 || v.seeking) return;
      const local = Math.min(d - 0.05, Math.max(0, t - start));
      const near = t >= start - 0.5 && t <= start + d + 0.5;
      const gap = Math.abs(v.currentTime - local);
      if (near ? gap > 1 / 60 : gap > 0.25) v.currentTime = local;
    });
    if (this.curT !== tgt) this.scrubRaf = requestAnimationFrame(this.scrubTick);
  }
  activeClip(p) {
    const s = this.clipDur, total = s.reduce((a, b) => a + b, 0), t = p * total;
    let acc = 0;
    for (let i = 0; i < s.length; i++) { acc += s[i]; if (t < acc) return i; }
    return s.length - 1;
  }
  mix(a, b, k) {
    const h = (x) => [1, 3, 5].map((o) => parseInt(x.slice(o, o + 2), 16));
    const A = h(a), B = h(b);
    return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',') + ')';
  }
  clamp(x) { return Math.min(1, Math.max(0, x)); }
  ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  layouts() {
    const side = 'clamp(110px, 9vw, 150px)';
    return [
      { head: 'top: 24%; right: ' + side + '; width: min(560px, 42vw);', sub: 'bottom: 16%; right: ' + side + '; width: min(400px, 32vw);', size: 'clamp(38px, 4.6vw, 70px)', align: 'start', tx: '0' },
      { head: 'top: 17%; left: 50%; width: min(900px, 78vw);', sub: 'bottom: 14%; left: ' + side + '; width: min(380px, 30vw);', size: 'clamp(40px, 5.4vw, 84px)', align: 'center', tx: '-50%' },
      { head: 'bottom: 15%; right: ' + side + '; width: min(620px, 46vw);', sub: 'top: 22%; left: ' + side + '; width: min(360px, 28vw);', size: 'clamp(38px, 4.8vw, 74px)', align: 'start', tx: '0' },
      { head: 'top: 26%; left: ' + side + '; width: min(520px, 40vw);', sub: 'top: calc(26% + clamp(150px, 16vw, 230px)); left: ' + side + '; width: min(380px, 30vw);', size: 'clamp(38px, 4.4vw, 66px)', align: 'start', tx: '0' },
      { head: 'top: 24%; right: ' + side + '; width: min(560px, 42vw);', sub: 'top: calc(24% + clamp(170px, 18vw, 260px)); right: ' + side + '; width: min(420px, 32vw);', size: 'clamp(38px, 4.6vw, 70px)', align: 'start', tx: '0' }
    ];
  }
  copy(lang) {
    const ar = {
      home: 'المساكن المتقنة — الرئيسية', navLabel: 'القائمة الرئيسية', filmLabel: 'من الفكرة إلى التسليم',
      nav: { services: 'الخدمات', sectors: 'القطاعات', about: 'من نحن', contact: 'تواصل معنا' },
      langSwitch: 'EN', langAria: 'View in English', langLabelFull: 'English', themeAria: 'تبديل الوضع الفاتح والداكن',
      cta: 'ابدأ مشروعك', ctaWork: 'استعرض أعمالنا', cue: 'مرّر للأسفل', tagline: 'نبني بإتقان منذ 2015',
      chapters: [
        { service: 'التصميم والتنفيذ', title: 'كل مشروع يبدأ بخط.', sub: 'تصاميم ثنائية وثلاثية الأبعاد للقصور والفلل والأبراج والفنادق والمولات، يرسمها الفريق نفسه الذي ينفّذها.' },
        { service: 'البنية التحتية', title: 'نبدأ من تحت الأرض.', sub: 'حفر وردم، وشبكات مياه وصرف وكهرباء، وتصريف سيول، ثم طرق ورصف وإنارة. أساس لا يُرى، ويحمل كل ما فوقه.' },
        { service: 'المقاولات العامة', title: 'يرتفع طابقاً بعد طابق.', sub: 'مبانٍ سكنية وتجارية وحكومية من العظم حتى التشطيب. الإشراف الهندسي؟ في كل مرحلة.' },
        { service: 'التوريد الخارجي', title: 'الخامة من مصدرها.', sub: 'أثاث وإضاءة وإكسسوارات من مصانع شريكة في تركيا والصين ومصر وكرواتيا، تُصنع وفق التصميم المعتمد لمشروعك.' },
        { service: 'التسليم والصيانة', title: 'نسلّمك المفتاح، ونبقى معك.', sub: 'تسليم مفتاح، ثم صيانة وقائية وتصحيحية وأنظمة ذكية تحافظ على قيمة المبنى بعد التسليم.' }
      ],
      about: { eyebrow: 'من نحن', title: 'جهة واحدة، من الفكرة حتى التسليم.', body: 'بيرفكت هوم شركة سعودية مقرّها الرياض، تجمع المقاولات والتصميم والتوريد والصيانة تحت سقف واحد. تتعامل مع فريق واحد مسؤول عن مشروعك، بدل التنسيق بين أكثر من مقاول.', alt: 'مهندس موقع يراجع المخططات أمام هيكل فيلا قيد الإنشاء', caption: 'إشراف هندسي في الموقع، في كل مرحلة' },
      stats: [ { value: '2015', label: 'سنة التأسيس' }, { value: '10+', label: 'سنوات من الخبرة' } ],
      album: { eyebrow: 'ألبوم الأعمال', title: 'شغلنا على أرض الواقع.', intro: 'مختارات من مشاريع نفّذناها للقطاعين الحكومي والخاص: مبانٍ وقصور، مجالس ومكاتب، واجهات وأجنحة معارض.', filterLabel: 'تصفية حسب القطاع', all: 'الكل', cats: { gov: 'حكومي', com: 'تجاري', res: 'سكني وقصور', fac: 'واجهات ومناطق خارجية', exh: 'معارض' }, close: 'إغلاق', prev: 'السابق', next: 'التالي', titles: { gov_hall: 'صالة بسقف زجاجي', gov_white: 'صالة استقبال', gov_baggage: 'خدمات الأمتعة', com_reception: 'استقبال وإدارة', com_lounge: 'صالة انتظار', com_office: 'مكاتب إدارية', com_biotic: 'متجر تجزئة', com_ajlan: 'متجر عجلان وإخوانه', res_majlis: 'مجلس رجال', res_gold: 'مجلس بسقف مذهّب', res_dining: 'صالة طعام', res_arches: 'مدخل بأقواس', fac_palace: 'قصر بطراز إسلامي', fac_classic: 'واجهة كلاسيكية', fac_modern: 'فيلا معاصرة', fac_palms: 'فيلا بفناء مائي', fac_contemp: 'مبنى سكني بمظلات', fac_court: 'تنسيق الحدائق', exh_taqnia: 'جناح تقنية', exh_ph: 'جناح المساكن المتقنة', exh_moe: 'جناح وزارة التعليم' } },
      loading: 'جارٍ تحميل الموقع',
      home2: { eyebrow: 'بعد التسليم', title: 'نسلّمك بيت تعيش فيه، مو مشروع تتابعه.', body: 'من أول مخطط لين آخر تشطيبة نتابع التفاصيل عنك، وبعد التسليم فريق الصيانة معك.', alt: 'أسرة سعودية في صالة بيتها بعد التسليم', c1k: 'المشروع', c1v: 'فيلا سكنية في الرياض', c2k: 'نسبة الإنجاز', c3k: 'من العظم', c3v: 'إلى التشطيب', c4k: 'المرحلة الحالية', c4v: 'التشطيب الداخلي', c4done: 'تم التسليم' },
      services: { eyebrow: 'الخدمات', title: 'أربع خدمات، مسؤولية واحدة.', intro: 'كل خدمة تعمل وحدها، وتعمل مع غيرها. تختار ما يحتاجه مشروعك، ونتولّى التنسيق بينها.', items: [
        { title: 'المقاولات العامة', alt: 'GENERAL CONTRACTING', body: 'البنية التحتية والمباني بأنواعها، من العظم حتى تسليم المفتاح.', tags: ['قصور وفلل', 'أبراج وعمائر', 'مولات', 'شبكات وطرق', 'مسطحات خضراء'] },
        { title: 'التصميم والتنفيذ', alt: 'DESIGN & BUILD', body: 'مخططات ثنائية وثلاثية الأبعاد ينفّذها الفريق نفسه، لتستلم المشروع كما رأيته في التصميم.', tags: ['تصميم 2D و3D', 'جبس وإنارة', 'واجهات ولاندسكيب', 'أثاث على المقاس'] },
        { title: 'الصيانة العامة', alt: 'FACILITY MAINTENANCE', body: 'خطط صيانة دورية وفرق جاهزة تحافظ على قيمة المبنى بعد التسليم.', tags: ['وقائية', 'تصحيحية', 'تجميلية', 'ترميم وتجديد', 'أنظمة ذكية'] },
        { title: 'التوريد الخارجي', alt: 'INTERNATIONAL SUPPLY', body: 'أثاث وإضاءة وإكسسوارات تُصنع وفق التصميم المعتمد لدى مصانع شريكة.', tags: ['تركيا', 'الصين', 'مصر', 'كرواتيا'] }
      ] },
      proof: { label: 'العملاء والاعتمادات', clientsLabel: 'من عملائنا', title: 'جهات وثقت بنا.', intro: 'نعمل مع جهات حكومية وشركات خاصة، من أجنحة المعارض إلى المتاجر والمكاتب.', clients: [ { name: 'تقنية', type: 'أجنحة المعارض', caption: 'جناح تقنية في المعرض', work: 'تصميم وتنفيذ وتركيب جناح المعرض، من الفكرة حتى التسليم في الموقع.' }, { name: 'وزارة التعليم', type: 'أجنحة المعارض', caption: 'جناح وزارة التعليم أثناء التركيب', work: 'تصميم وتنفيذ جناح الوزارة في المعرض.' }, { name: 'عجلان وإخوانه', type: 'المشاريع التجارية', caption: 'متجر عجلان وإخوانه', work: 'تصميم وتنفيذ المتجر بما يعكس هوية العلامة.' } ], creds: [ { k: 'الجودة', v: 'أنظمة جودة مطبّقة في كل مرحلة' }, { k: 'السجل التجاري', v: '7008464179' }, { k: 'سابقة الأعمال', v: 'منذ 2015 للقطاعين الحكومي والخاص' } ] },
      form: { title: 'اطلب عرض سعر', name: 'الاسم', phone: 'رقم الجوال', type: 'نوع المشروع', types: ['مقاولات عامة', 'تصميم وتنفيذ', 'صيانة', 'توريد خارجي', 'غير ذلك'], city: 'المدينة أو الحي', msg: 'نبذة عن المشروع', send: 'أرسل الطلب', sent: 'وصلنا طلبك، نتواصل معك قريباً' },
      sectors: { eyebrow: 'القطاعات', title: 'نفّذنا للقطاعين الحكومي والخاص.', hint: 'واصل التمرير لاستعراض القطاعات', items: [
        { title: 'مرافق ومبانٍ حكومية', body: 'صالات استقبال ومكاتب تنفيذية ومرافق خدمية، وفق اشتراطات الجودة والسلامة.' },
        { title: 'القصور والفلل الخاصة', body: 'مجالس وصالات طعام ومداخل بتشطيبات فاخرة: رخام مطعّم، وأسقف جبسية، وثريات كريستال.' },
        { title: 'المشاريع التجارية والمكتبية', body: 'متاجر ومقاهٍ ومكاتب مصمّمة لتعكس هوية كل علامة وتخدم عملها اليومي.' },
        { title: 'الواجهات والمناطق الخارجية', body: 'واجهات كلاسيكية ومعاصرة، وتنسيق حدائق ومداخل تمنح المبنى حضوره من النظرة الأولى.' },
        { title: 'أجنحة المعارض', body: 'تصميم وتنفيذ وتركيب أجنحة لجهات حكومية وخاصة، من الفكرة حتى التسليم في الموقع.' }
      ] },
      contact: { title1: 'عندك مشروع؟', title2: 'نبدأ من أول خط.', body: 'شاركنا فكرتك أو مخططاتك، ونرجع لك بتصوّر للتنفيذ والتكلفة والمدة.', primary: 'اطلب عرض سعر', whatsapp: 'تواصل عبر واتساب' },
      footer: { addressLabel: 'العنوان', address: 'الرياض، حي حطين، تقاطع طريق الإمام سعود بن فيصل مع طريق تركي الأول', contactLabel: 'التواصل', hours: 'السبت إلى الخميس، من 9 صباحًا إلى 5 مساءً', map: 'افتح في الخرائط', officialLabel: 'بيانات الشركة', crLabel: 'السجل التجاري', chamberLabel: 'عضوية الغرفة التجارية', top: 'العودة للأعلى', legal: '© شركة المساكن المتقنة للمقاولات', cr: 'سجل تجاري 7008464179', chamber: 'عضوية الغرفة التجارية 42631' }
    };
    const en = {
      home: 'Perfect Home — Home', navLabel: 'Main navigation', filmLabel: 'From idea to handover',
      nav: { services: 'Services', sectors: 'Sectors', about: 'About', contact: 'Contact' },
      langSwitch: 'ع', langAria: 'العرض بالعربية', langLabelFull: 'العربية', themeAria: 'Switch light and dark mode',
      cta: 'Start your project', ctaWork: 'See our work', cue: 'Scroll to build', tagline: 'Building with precision since 2015',
      chapters: [
        { service: 'Design & Build', title: 'Every project starts with a line.', sub: '2D and 3D design for palaces, villas, towers, hotels and malls, drawn by the same team that builds them.' },
        { service: 'Infrastructure', title: 'We start below ground.', sub: 'Excavation and backfill, water, sewage and power networks, flood drainage, then roads, paving and lighting. The part you never see carries everything above it.' },
        { service: 'General Contracting', title: 'Rising, floor by floor.', sub: 'Residential, commercial and government buildings, from shell to finish. Engineering supervision? At every stage.' },
        { service: 'International Supply', title: 'Sourced at the source.', sub: 'Furniture, lighting and accessories from partner factories in Türkiye, China, Egypt and Croatia, made to your approved design.' },
        { service: 'Handover & Maintenance', title: 'We hand over the keys. Then we stay.', sub: 'Turnkey delivery, followed by preventive, corrective and smart-system maintenance that protects the value of your building.' }
      ],
      about: { eyebrow: 'About', title: 'One partner, from first sketch to handover.', body: 'Perfect Home is a Saudi company based in Riyadh, bringing contracting, design, supply and maintenance under one roof. You work with one accountable team instead of coordinating several contractors.', alt: 'Site engineer reviewing drawings in front of a villa under construction', caption: 'Engineering supervision on site, at every stage' },
      stats: [ { value: '2015', label: 'Founded' }, { value: '10+', label: 'Years of experience' } ],
      album: { eyebrow: 'Project album', title: 'Our work, as built.', intro: 'A selection of projects delivered for public and private clients: buildings and palaces, majlis and offices, facades and exhibition stands.', filterLabel: 'Filter by sector', all: 'All', cats: { gov: 'Government', com: 'Commercial', res: 'Residential and palaces', fac: 'Facades and outdoors', exh: 'Exhibitions' }, close: 'Close', prev: 'Previous', next: 'Next', titles: { gov_hall: 'Skylit hall', gov_white: 'Reception hall', gov_baggage: 'Baggage services', com_reception: 'Reception and offices', com_lounge: 'Waiting lounge', com_office: 'Office floor', com_biotic: 'Retail store', com_ajlan: 'Ajlan & Bros store', res_majlis: 'Majlis', res_gold: 'Majlis with gilded ceiling', res_dining: 'Dining room', res_arches: 'Arched entrance', fac_palace: 'Palace in Islamic style', fac_classic: 'Classic facade', fac_modern: 'Contemporary villa', fac_palms: 'Villa with water court', fac_contemp: 'Residential building with shades', fac_court: 'Landscaping', exh_taqnia: 'Taqnia stand', exh_ph: 'Perfect Home stand', exh_moe: 'Ministry of Education stand' } },
      loading: 'Loading the site',
      home2: { eyebrow: 'After handover', title: 'A home to live in, not a project to chase.', body: 'From the first drawing to the last finish, we handle the details. After handover, our maintenance team stays with you.', alt: 'A Saudi family in their living room after handover', c1k: 'Project', c1v: 'Private villa, Riyadh', c2k: 'Progress', c3k: 'From shell', c3v: 'to finish', c4k: 'Current stage', c4v: 'Interior finishing', c4done: 'Handed over' },
      services: { eyebrow: 'Services', title: 'Four services. One point of accountability.', intro: 'Each service stands on its own and works with the others. Choose what your project needs, and we coordinate the rest.', items: [
        { title: 'General Contracting', alt: 'المقاولات العامة', body: 'Infrastructure and every type of building, from shell to turnkey.', tags: ['Palaces & villas', 'Towers & blocks', 'Malls', 'Networks & roads', 'Landscaping'] },
        { title: 'Design & Build', alt: 'التصميم والتنفيذ', body: '2D and 3D design delivered by the same team that builds it, so what you receive matches what you approved.', tags: ['2D & 3D design', 'Gypsum & lighting', 'Facades & landscape', 'Bespoke furniture'] },
        { title: 'Facility Maintenance', alt: 'الصيانة العامة', body: 'Scheduled maintenance plans and on-call teams that protect your building after handover.', tags: ['Preventive', 'Corrective', 'Cosmetic', 'Restoration', 'Smart systems'] },
        { title: 'International Supply', alt: 'التوريد الخارجي', body: 'Furniture, lighting and accessories made to your approved design by partner factories.', tags: ['Türkiye', 'China', 'Egypt', 'Croatia'] }
      ] },
      proof: { label: 'Clients and credentials', clientsLabel: 'Clients', title: 'Trusted by public and private clients.', intro: 'From exhibition stands to stores and offices, we deliver for government bodies and private companies.', clients: [ { name: 'Taqnia', type: 'Exhibition stands', caption: 'The Taqnia exhibition stand', work: 'Design, build and installation of the exhibition stand, through to on-site handover.' }, { name: 'Ministry of Education', type: 'Exhibition stands', caption: 'The Ministry of Education stand during installation', work: 'Design and build of the ministry stand.' }, { name: 'Ajlan & Bros', type: 'Commercial', caption: 'The Ajlan & Bros store', work: 'Store design and build that reflects the brand.' } ], creds: [ { k: 'Quality', v: 'Quality systems at every stage' }, { k: 'Commercial registration', v: '7008464179' }, { k: 'Track record', v: 'Public and private sector work since 2015' } ] },
      form: { title: 'Request a quote', name: 'Name', phone: 'Mobile number', type: 'Project type', types: ['General contracting', 'Design & build', 'Maintenance', 'International supply', 'Other'], city: 'City or district', msg: 'About the project', send: 'Send request', sent: 'Request received. We will be in touch shortly.' },
      sectors: { eyebrow: 'Sectors', title: 'Delivered for the public and private sectors.', hint: 'Keep scrolling to browse sectors', items: [
        { title: 'Government facilities', body: 'Reception halls, executive offices and service facilities, built to quality and safety requirements.' },
        { title: 'Private palaces & villas', body: 'Majlis, dining halls and entrances with inlaid marble, ornate gypsum ceilings and crystal chandeliers.' },
        { title: 'Commercial & office', body: 'Stores, cafés and offices designed around each brand and the way it works every day.' },
        { title: 'Facades & landscape', body: 'Classic and contemporary facades, gardens and entrances that give a building presence at first sight.' },
        { title: 'Exhibition stands', body: 'Design, build and installation of stands for government and private clients, through to on-site handover.' }
      ] },
      contact: { title1: 'Have a project in mind?', title2: 'Let us draw the first line.', body: 'Share your idea or drawings, and we will come back with a plan for scope, cost and timeline.', primary: 'Request a quote', whatsapp: 'Chat on WhatsApp' },
      footer: { addressLabel: 'Address', address: 'Hittin, Riyadh, at Imam Saud bin Faisal Rd and Turki Al-Awwal Rd', contactLabel: 'Contact', hours: 'Saturday to Thursday, 9 am to 5 pm', map: 'Open in Maps', officialLabel: 'Company details', crLabel: 'Commercial registration', chamberLabel: 'Chamber of Commerce', top: 'Back to top', legal: '© Perfect Housing Contracting Co.', cr: 'CR 7008464179', chamber: 'Chamber membership 42631' }
    };
    return lang === 'en' ? en : ar;
  }
  renderVals() {
    const C = (x) => this.clamp(x);
    const lang = this.state.lang ?? this.props.defaultLang ?? 'ar';
    const rtl = lang !== 'en';
    const pref = this.state.theme ?? this.props.defaultTheme ?? 'system';
    const dark = pref === 'system' ? this.state.sysDark : pref === 'dark';
    const t = this.copy(lang);
    const { p, W, H, y } = this.state;
    const th = dark
      ? { bg: '#000000', surface: '#0B0B0C', placeholder: '#141416', text: '#EDEAE3', muted: '#B7BBC1', faint: '#8E949B', line: 'rgba(237,234,227,0.12)', lineStrong: 'rgba(237,234,227,0.45)', accent: '#C9A45C', ctaBg: '#C9A45C', ctaText: '#0B0C0E' }
      : { bg: '#FFFFFF', surface: '#F5F5F3', placeholder: '#ECECEA', text: '#15171A', muted: '#474C53', faint: '#5F656C', line: 'rgba(21,23,26,0.12)', lineStrong: 'rgba(21,23,26,0.4)', accent: '#8A6A2E', ctaBg: '#15171A', ctaText: '#F4F4F1' };
    const font = rtl
      ? { body: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: "'Noto Kufi Arabic', sans-serif", alt: "'IBM Plex Sans Arabic', 'Outfit', sans-serif", lh: '1.35' }
      : { body: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: "'Outfit', system-ui, sans-serif", alt: "'Outfit', sans-serif", lh: '1.12' };

    // Logo flight: centre lockup -> header mark
    const q = C(y / (H * (this.props.logoFlight ?? 0.6)));
    const e = this.ease(q);
    const markRatio = 455.5 / 671, wordRatio = 240 / 770;
    const h0 = Math.min(H * 0.26, 230), h1 = 40;
    const mh = h0 + (h1 - h0) * e;
    const mw = mh * markRatio;
    const ww = mw * (770 / 455.5);
    const gap0 = h0 * 0.109;
    const total0 = h0 + gap0 + (h0 * markRatio * (770 / 455.5)) * wordRatio;
    const cx0 = W / 2, cy0 = H / 2 - total0 / 2 + h0 / 2;
    const off = Math.max(0, (W - 1360) / 2);
    const pad = Math.min(40, Math.max(16, W * 0.03));
    const cx1 = rtl ? W - off - pad - (h1 * markRatio) / 2 : off + pad + (h1 * markRatio) / 2;
    const cy1 = 36;
    const cx = cx0 + (cx1 - cx0) * e, cy = cy0 + (cy1 - cy0) * e;
    const logo = { x: Math.round(cx - ww / 2), y: Math.round(cy - mh / 2), h: mh.toFixed(1), ww: ww.toFixed(1), wx: 0, gap: (mh * 0.109).toFixed(1), wordOp: C(1 - q / 0.45).toFixed(3) };

    // Header builds around the landed logo
    const hb = C((q - 0.55) / 0.45);
    const onFilm = this.state.onFilm;
    const solid = !onFilm || !!this.state.menu;
    const hdr = {
      bg: this.state.menu ? th.bg : solid ? (dark ? 'rgba(0,0,0,0.82)' : 'rgba(255,255,255,0.86)') : 'rgba(0,0,0,' + (0.22 * hb).toFixed(3) + ')',
      line: solid ? th.line : 'rgba(237,234,227,' + (0.14 * hb).toFixed(3) + ')',
      blur: Math.round(18 * hb),
      text: solid ? th.text : '#EDEAE3',
      btnLine: solid ? th.line : 'rgba(237,234,227,0.22)',
      ctaBg: solid ? th.ctaBg : '#EDEAE3',
      ctaText: solid ? th.ctaText : '#0B0C0E',
      ctrlOp: C((q - 0.8) / 0.2).toFixed(3),
      ctrlTy: Math.round((1 - C((q - 0.8) / 0.2)) * 8),
      pe: hb > 0.5 ? 'auto' : 'none'
    };
    const navKeys = [['#services', t.nav.services], ['#sectors', t.nav.sectors], ['#about', t.nav.about], ['#contact', t.nav.contact]];
    const navItems = navKeys.map(([href, label], i) => {
      const o = C((q - 0.62 - i * 0.07) / 0.22);
      return { href, label, op: o.toFixed(3), ty: Math.round((1 - o) * 10) };
    });

    // Film
    const accent = this.mix('#B8BEC6', '#C9A45C', Math.min(1, p * 1.15));
    const s = this.secs();
    const srcs = ['/media/missing', '/media/missing', '/media/missing', '/media/missing', '/media/missing'];
    const L = this.layouts();
    const total = s.reduce((a, b) => a + b, 0);
    let acc = 0;
    let rail = { op: 0, label: '', lineW: 0, tx: 0 };
    const chapters = t.chapters.map((c, i) => {
      const start = acc / total, end = (acc + s[i]) / total;
      acc += s[i];
      const k = C((p - start) / (end - start));
      const last = i === s.length - 1;
      const active = p >= start && (p < end || last);
      const inStart = i === 0 ? 0.34 : 0.06;
      const hin = C((k - inStart) / 0.14);
      const hout = last ? 1 : C((0.95 - k) / 0.1);
      const sin = C((k - (inStart + 0.22)) / 0.14);
      const headOp = active ? Math.min(hin, hout) : 0;
      const passed = p >= end && !last;
      return {
        ...c,
        src: srcs[i],
        vidOp: active ? 1 : 0,
        headOp: headOp.toFixed(3),
        headBlur: ((1 - Math.min(hin, hout)) * 10).toFixed(1),
        headTy: Math.round((1 - hin) * 18 - (1 - hout) * 14),
        lineW: Math.round(12 + 28 * hin),
        isLast: last,
        subOp: sin.toFixed(3),
        subTy: Math.round((1 - sin) * 14),
        nodeTop: (start * 100).toFixed(2),
        nodeFill: passed || active ? accent : 'rgba(11,12,14,0.6)',
        nodeLine: passed || active ? accent : 'rgba(237,234,227,0.5)',
      };
    });
    const endOp = C((p - 0.93) / 0.05);
    const acl = this.activeClip(p);
    const tierIds = this.VID[this.vtier] || this.VID.S1080;
    const clips = this.clipDur.map((d, i) => ({
      src: (this.vsrc && this.vsrc[i]) || '', load: !!(this.vsrc && this.vsrc[i]), op: i <= acl ? 1 : 0,
      setRef: this.clipRefs[i]
    }));

    // Lower sections
    const IM = { about: '/media/unused/about_engineer.jpg?v=2', contact: '/media/unused/contact_cliff2.jpg?v=2', svc: ['/media/unused/svc_contracting.jpg?v=2', '/media/unused/svc_design_build.jpg?v=2', '/media/unused/svc_maintenance.jpg?v=2', '/media/unused/svc_supply.jpg?v=2'], sec: ['/media/unused/sector_government.jpg?v=2', '/media/unused/sector_palace.jpg?v=2', '/media/unused/sector_commercial.jpg?v=2', '/media/unused/sector_facades.jpg?v=2', '/media/unused/sector_exhibitions.jpg?v=2'] };
    const has = !!IM.about;
    const WP = {"about": {"640": "/media/img/about_640.webp?v=2", "1000": "/media/img/about_1000.webp?v=2", "1600": "/media/img/about_1600.webp?v=2", "2400": "/media/img/about_2400.webp?v=2"}, "contact": {"960": "/media/img/contact_960.webp?v=2", "1600": "/media/img/contact_1600.webp?v=2", "2560": "/media/img/contact_2560.webp?v=2"}, "home": {"960": "/media/img/home_960.webp?v=2", "1600": "/media/img/home_1600.webp?v=2", "2560": "/media/img/home_2560.webp?v=2"}, "sec_commercial": {"960": "/media/img/sec_commercial_960.webp?v=2", "1600": "/media/img/sec_commercial_1600.webp?v=2", "2560": "/media/img/sec_commercial_2560.webp?v=2"}, "sec_exhibitions": {"960": "/media/img/sec_exhibitions_960.webp?v=2", "1600": "/media/img/sec_exhibitions_1600.webp?v=2", "2560": "/media/img/sec_exhibitions_2560.webp?v=2"}, "sec_facades": {"960": "/media/img/sec_facades_960.webp?v=2", "1600": "/media/img/sec_facades_1600.webp?v=2", "2560": "/media/img/sec_facades_2560.webp?v=2"}, "sec_government": {"960": "/media/img/sec_government_960.webp?v=2", "1600": "/media/img/sec_government_1600.webp?v=2", "2560": "/media/img/sec_government_2560.webp?v=2"}, "sec_palace": {"960": "/media/img/sec_palace_960.webp?v=2", "1600": "/media/img/sec_palace_1600.webp?v=2", "2560": "/media/img/sec_palace_2560.webp?v=2"}, "svc_contracting": {"960": "/media/img/svc_contracting_960.webp?v=2", "1600": "/media/img/svc_contracting_1600.webp?v=2", "2560": "/media/img/svc_contracting_2560.webp?v=2"}, "svc_design_build": {"960": "/media/img/svc_design_build_960.webp?v=2", "1600": "/media/img/svc_design_build_1600.webp?v=2", "2560": "/media/img/svc_design_build_2560.webp?v=2"}, "svc_maintenance": {"960": "/media/img/svc_maintenance_960.webp?v=2", "1600": "/media/img/svc_maintenance_1600.webp?v=2", "2560": "/media/img/svc_maintenance_2560.webp?v=2"}, "svc_supply": {"960": "/media/img/svc_supply_960.webp?v=2", "1600": "/media/img/svc_supply_1600.webp?v=2", "2560": "/media/img/svc_supply_2560.webp?v=2"}};
    const ws = (k) => Object.keys(WP[k]).map((w) => '' + WP[k][w] + ' ' + w + 'w').join(', ');
    const w1 = (k) => '' + WP[k][k === 'about' ? '1600' : '1600'];
    const aP = this.state.aboutP;
    const words = t.about.title.split(' ');
    const aboutWords = words.map((w, i) => ({ w, op: (0.16 + 0.84 * C((aP * 1.6 - i / words.length) * 3)).toFixed(3) }));
    const si = this.state.svcIdx;
    const tops = this.state.svcTops || [];
    const svc = t.services.items.map((s, i) => {
      const nextTop = tops[i + 1];
      const cov = nextTop === undefined ? 0 : C((H - nextTop) / H);
      const ent = tops[i] === undefined ? 1 : C((H - tops[i]) / (H * 0.75));
      return {
      ...s,
      src: w1(['svc_contracting', 'svc_design_build', 'svc_maintenance', 'svc_supply'][i]), set: ws(['svc_contracting', 'svc_design_build', 'svc_maintenance', 'svc_supply'][i]), has: !!IM.svc[i], alt: s.title,
      depth: (1 - 0.06 * cov).toFixed(4),
      dim: (1 - 0.6 * cov).toFixed(3),
      txtOp: this.ease(ent).toFixed(3),
      txtTy: Math.round((1 - this.ease(ent)) * 32),
      scale: (1.08 - 0.08 * ent).toFixed(4),
      setRef: this.svcRefs[i]
    }; });
    const CW = {"exh_taqnia": {"960": "/media/album/exh_taqnia_960.webp?v=2", "1600": "/media/album/exh_taqnia_1600.webp?v=2", "2560": "/media/album/exh_taqnia_2560.webp?v=2"}, "exh_moe": {"960": "/media/album/exh_moe_960.webp?v=2", "1600": "/media/album/exh_moe_1600.webp?v=2", "2560": "/media/album/exh_moe_2560.webp?v=2"}, "com_ajlan": {"960": "/media/album/com_ajlan_960.webp?v=2", "1600": "/media/album/com_ajlan_1600.webp?v=2", "2560": "/media/album/com_ajlan_2560.webp?v=2"}};
    const CL = ['exh_taqnia', 'exh_moe', 'com_ajlan'].map((k) => '' + CW[k]['1600']);
    const CLS = ['exh_taqnia', 'exh_moe', 'com_ajlan'].map((k) => Object.keys(CW[k]).map((w) => '' + CW[k][w] + ' ' + w + 'w').join(', '));
    const OR = ['40% 45%', '60% 40%', '50% 60%'];
    const ci = this.state.clIdx, man = this.state.clManual;
    const proofClients = t.proof.clients.map((c, i) => {
      const on = i === ci;
      return {
        ...c, on, off: !on, img: CL[i], imgSet: CLS[i], origin: OR[i],
        alt: c.caption,
        pick: this.clPick[i],
        z: on ? 2 : 1,
        clip: on ? 'inset(0 0 0 0)' : (rtl ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'),
        play: on ? 'running' : 'paused',
        nameColor: on ? th.text : th.faint,
        typeColor: on ? th.accent : th.faint,
        rows: on ? '1fr' : '0fr',
        workOp: on ? 1 : 0,
        barFull: on && man ? 1 : 0,
        barAnim: on && !man ? (this.state.clTick % 2 ? 'phbarA' : 'phbarB') : 'none'
      };
    });
    const hP = this.state.homeP || 0;
    const hk = (a, b) => this.ease(C((hP - a) / (b - a)));
    const ti = hk(0.02, 0.22);
    const pct = Math.round(100 * hk(0.25, 0.8));
    const P = (x, vert, v) => ({ l: rtl ? x : 'auto', r: rtl ? 'auto' : x, t: vert === 'top' ? v : 'auto', b: vert === 'bottom' ? v : 'auto' });
    const cardDefs = [
      { k: t.home2.c1k, v: t.home2.c1v, a: 0.18, pos: P('30%', 'top', '15%') },
      { k: t.home2.c2k, v: pct + '%', ring: true, a: 0.26, pos: P('5%', 'top', '32%') },
      { k: t.home2.c3k, v: t.home2.c3v, thumbs: true, a: 0.4, pos: P('4%', 'bottom', '9%') },
      { k: t.home2.c4k, v: pct >= 100 ? t.home2.c4done : t.home2.c4v, a: 0.55, pos: P('47%', 'bottom', '12%') }
    ];
    const hl = {
      img: w1('home'), set: ws('home'), pos: '50% 60%', flip: rtl ? -1 : 1,
      scale: (1.1 - 0.1 * hk(0, 0.7)).toFixed(4),
      txtOp: ti.toFixed(3), txtTy: Math.round((1 - ti) * 28), txtBlur: ((1 - ti) * 8).toFixed(1),
      ringOff: (169.6 * (1 - pct / 100)).toFixed(1),
      t1: '' + WP.svc_contracting['960'], t2: '' + WP.about['640'],
      cards: cardDefs.map((c, i) => { const o = hk(c.a, c.a + 0.12); return { ring: false, thumbs: false, ...c, ...c.pos, cls: 'ph-c' + i, op: o.toFixed(3), ty: Math.round((1 - o) * 24), sc: (0.96 + 0.04 * o).toFixed(3), delay: i * 600 }; })
    };
    const AL = [
      ['fac', 'fac_palace', '/media/unused/fac_palace.jpg?v=2'], ['com', 'com_reception', '/media/unused/com_reception.jpg?v=2'], ['res', 'res_gold', '/media/unused/res_gold.jpg?v=2'],
      ['exh', 'exh_taqnia', '/media/unused/exh_taqnia.jpg?v=2'], ['gov', 'gov_hall', '/media/unused/gov_hall.jpg?v=2'], ['fac', 'fac_modern', '/media/unused/fac_modern.jpg?v=2'],
      ['res', 'res_majlis', '/media/unused/res_majlis.jpg?v=2'], ['com', 'com_office', '/media/unused/com_office.jpg?v=2'], ['fac', 'fac_classic', '/media/unused/fac_classic.jpg?v=2'],
      ['exh', 'exh_ph', '/media/unused/exh_ph.jpg?v=2'], ['gov', 'gov_white', '/media/unused/gov_white.jpg?v=2'], ['com', 'com_biotic', '/media/unused/com_biotic.jpg?v=2'],
      ['res', 'res_dining', '/media/unused/res_dining.jpg?v=2'], ['fac', 'fac_palms', '/media/unused/fac_palms.jpg?v=2'], ['com', 'com_lounge', '/media/unused/com_lounge.jpg?v=2'],
      ['exh', 'exh_moe', '/media/unused/exh_moe.jpg?v=2'], ['gov', 'gov_baggage', '/media/unused/gov_baggage.jpg?v=2'], ['fac', 'fac_contemp', '/media/unused/fac_contemp.jpg?v=2'],
      ['res', 'res_arches', '/media/unused/res_arches.jpg?v=2'], ['com', 'com_ajlan', '/media/unused/com_ajlan.jpg?v=2'], ['fac', 'fac_court', '/media/unused/fac_court.jpg?v=2']
    ];
    const ac = this.state.albCat;
    const AW = {"com_ajlan": {"960": "/media/album/com_ajlan_960.webp?v=2", "1600": "/media/album/com_ajlan_1600.webp?v=2", "2560": "/media/album/com_ajlan_2560.webp?v=2"}, "com_biotic": {"960": "/media/album/com_biotic_960.webp?v=2", "1600": "/media/album/com_biotic_1600.webp?v=2", "2560": "/media/album/com_biotic_2560.webp?v=2"}, "com_lounge": {"960": "/media/album/com_lounge_960.webp?v=2", "1600": "/media/album/com_lounge_1600.webp?v=2", "2560": "/media/album/com_lounge_2560.webp?v=2"}, "com_office": {"960": "/media/album/com_office_960.webp?v=2", "1600": "/media/album/com_office_1600.webp?v=2", "2560": "/media/album/com_office_2560.webp?v=2"}, "com_reception": {"960": "/media/album/com_reception_960.webp?v=2", "1600": "/media/album/com_reception_1600.webp?v=2", "2560": "/media/album/com_reception_2560.webp?v=2"}, "exh_moe": {"960": "/media/album/exh_moe_960.webp?v=2", "1600": "/media/album/exh_moe_1600.webp?v=2", "2560": "/media/album/exh_moe_2560.webp?v=2"}, "exh_ph": {"960": "/media/album/exh_ph_960.webp?v=2", "1600": "/media/album/exh_ph_1600.webp?v=2", "2560": "/media/album/exh_ph_2560.webp?v=2"}, "exh_taqnia": {"960": "/media/album/exh_taqnia_960.webp?v=2", "1600": "/media/album/exh_taqnia_1600.webp?v=2", "2560": "/media/album/exh_taqnia_2560.webp?v=2"}, "fac_classic": {"960": "/media/album/fac_classic_960.webp?v=2", "1600": "/media/album/fac_classic_1600.webp?v=2", "2560": "/media/album/fac_classic_2560.webp?v=2"}, "fac_contemp": {"1200": "/media/album/fac_contemp_1200.webp?v=2"}, "fac_court": {"960": "/media/album/fac_court_960.webp?v=2", "1600": "/media/album/fac_court_1600.webp?v=2", "2560": "/media/album/fac_court_2560.webp?v=2"}, "fac_modern": {"960": "/media/album/fac_modern_960.webp?v=2", "1600": "/media/album/fac_modern_1600.webp?v=2", "2560": "/media/album/fac_modern_2560.webp?v=2"}, "fac_palace": {"960": "/media/album/fac_palace_960.webp?v=2", "1600": "/media/album/fac_palace_1600.webp?v=2", "2560": "/media/album/fac_palace_2560.webp?v=2"}, "fac_palms": {"960": "/media/album/fac_palms_960.webp?v=2", "1600": "/media/album/fac_palms_1600.webp?v=2", "2560": "/media/album/fac_palms_2560.webp?v=2"}, "gov_baggage": {"960": "/media/album/gov_baggage_960.webp?v=2", "1600": "/media/album/gov_baggage_1600.webp?v=2", "2560": "/media/album/gov_baggage_2560.webp?v=2"}, "gov_hall": {"960": "/media/album/gov_hall_960.webp?v=2", "1600": "/media/album/gov_hall_1600.webp?v=2", "2560": "/media/album/gov_hall_2560.webp?v=2"}, "gov_white": {"960": "/media/album/gov_white_960.webp?v=2", "1600": "/media/album/gov_white_1600.webp?v=2", "2560": "/media/album/gov_white_2560.webp?v=2"}, "res_arches": {"960": "/media/album/res_arches_960.webp?v=2", "1600": "/media/album/res_arches_1600.webp?v=2", "2560": "/media/album/res_arches_2560.webp?v=2"}, "res_dining": {"960": "/media/album/res_dining_960.webp?v=2", "1600": "/media/album/res_dining_1600.webp?v=2", "2560": "/media/album/res_dining_2560.webp?v=2"}, "res_gold": {"1200": "/media/album/res_gold_1200.webp?v=2"}, "res_majlis": {"960": "/media/album/res_majlis_960.webp?v=2", "1600": "/media/album/res_majlis_1600.webp?v=2", "2560": "/media/album/res_majlis_2560.webp?v=2"}};
    const aset = (k) => Object.keys(AW[k]).map((w) => '' + AW[k][w] + ' ' + w + 'w').join(', ');
    const amid = (k) => '' + (AW[k]['1600'] || AW[k]['1200']);
    const abig = (k) => '' + (AW[k]['2560'] || AW[k]['1200']);
    const list = AL.filter((a) => ac === 'all' || a[0] === ac).map((a) => ({ cat: a[0], key: a[1], src: amid(a[1]), set: aset(a[1]), big: abig(a[1]) }));
    this.albList = list;
    const albItems = list.map((a, i) => ({
      src: a.src, set: a.set, title: t.album.titles[a.key], cat: t.album.cats[a.cat], cls: 'ph-a' + (i % 6), delay: Math.min(i, 8) * 60,
      open: () => this.setState({ lb: i })
    }));
    const catKeys = ['all', 'gov', 'com', 'res', 'fac', 'exh'];
    const albCats = catKeys.map((k) => {
      const on = k === ac;
      if (!this.albPick[k]) this.albPick[k] = () => { if (this.state.albCat !== k) this.setState((st) => ({ albCat: k, albTick: st.albTick + 1 })); };
      return { label: k === 'all' ? t.album.all : t.album.cats[k], n: k === 'all' ? AL.length : AL.filter((a) => a[0] === k).length, on, pick: this.albPick[k],
        fg: on ? th.text : th.faint, fw: on ? 700 : 400, line: on ? th.accent : 'transparent' };
    });
    const li = this.state.lb, ln = list.length;
    const cur = li >= 0 ? list[Math.min(li, ln - 1)] : null;
    const lb = {
      open: !!cur, src: cur ? cur.big : '', set: cur ? cur.set : '', title: cur ? t.album.titles[cur.key] : '', cat: cur ? t.album.cats[cur.cat] : '',
      pos: cur ? (li + 1) + ' / ' + ln : '',
      flip: rtl ? 1 : -1, flipN: rtl ? -1 : 1,
      close: () => this.setState({ lb: -1 }),
      stop: (e) => { e.stopPropagation(); },
      prev: (e) => { e.stopPropagation(); this.setState({ lb: (li - 1 + ln) % ln }); },
      next: (e) => { e.stopPropagation(); this.setState({ lb: (li + 1) % ln }); }
    };
    const alb = { items: albItems, cats: albCats, anim: this.state.albTick % 2 ? 'phaA' : 'phaB' };
    const sP = this.state.secP;
    const secShift = Math.round(sP * this.state.secMax) * (rtl ? 1 : -1);
    const sectors = t.sectors.items.map((w, i) => ({ ...w, src: w1(['sec_government', 'sec_palace', 'sec_commercial', 'sec_facades', 'sec_exhibitions'][i]), set: ws(['sec_government', 'sec_palace', 'sec_commercial', 'sec_facades', 'sec_exhibitions'][i]), has: !!IM.sec[i], scale: 1.08, par: Math.round((sP - i / 4) * (rtl ? 40 : -40)) }));
    return {
      aboutRef: this.setAbout, secRef: this.setSec, trackRef: this.setTrack,
      edge: 'max(clamp(24px, 5vw, 88px), calc((100vw - 1360px) / 2 + 40px))',
      originSide: rtl ? 'right' : 'left',
      ld: (() => { const ph = this.state.ldPhase; return { show: ph < 4, op: ph >= 3 ? 0 : 1, pe: ph >= 3 ? 'none' : 'auto', strokeOp: ph >= 1 ? 0 : 1, markOp: ph >= 1 ? 1 : 0, wordOp: ph >= 2 ? 1 : 0, wordTy: ph >= 2 ? 0 : 10, wordBlur: ph >= 2 ? 0 : 6 }; })(),
      ldRef0: this.ldRef0, ldRef1: this.ldRef1, ldRef2: this.ldRef2,
      hl, homeRef: this.setHome, alb, lb, vidFlip: rtl ? 1 : -1,
      proofClients, proofRef: this.setProof, clLeave: this.clLeave,
      img: { hasAbout: !!IM.about, hasContact: !!IM.contact, about: w1('about'), aboutSet: ws('about'), contact: w1('contact'), contactSet: ws('contact') },
      aboutWords,
      aboutLine: Math.round(30 + 70 * C(aP * 1.4)),
      aboutClip: (100 * (1 - this.ease(C(aP * 1.5)))).toFixed(1),
      aboutScale: (1.12 - 0.12 * C(aP)).toFixed(3),
      svc, svcActive: svc[si] || svc[0],
      sectors, secX: secShift, secPct: (sP * 100).toFixed(1), secVh: 360,
      contactScale: (1.06 - 0.06 * C((this.state.page - 0.85) / 0.15)).toFixed(3),
      formBtn: this.state.sent ? t.form.sent : t.form.send,
      onSubmit: this.onSubmit,
      t, th, hdr, font, accent, chapters, clips, navItems, logo, rail,
      lang, dir: rtl ? 'rtl' : 'ltr',
      isDark: dark, isLight: !dark,
      yes: true,
      filmRef: this.setFilm,
      filmVh: this.props.filmLength ?? 1100,
      pagePct: (this.state.page * 100).toFixed(2),
      introVeil: (0.55 * (1 - e)).toFixed(3),
      cueOp: C(1 - q / 0.3).toFixed(3),
      railOp: C((q - 0.7) / 0.3).toFixed(3),
      railPct: (p * 100).toFixed(2),
      scrimDir: rtl ? 'to left' : 'to right',
      followTop: 'min(calc(16vh + ' + (p * 44).toFixed(2) + 'vh), calc(100vh - 500px))',
      endOp: endOp.toFixed(3),
      endPe: endOp > 0.5 ? 'auto' : 'none',
      menuOpen: !!this.state.menu,
      menuAria: this.state.menu ? (rtl ? 'إغلاق القائمة' : 'Close menu') : (rtl ? 'فتح القائمة' : 'Open menu'),
      menuIcon: this.state.menu ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16',
      menuToggle: () => { const o = !this.state.menu; try { document.documentElement.style.overflow = o ? 'hidden' : ''; } catch (e) {} this.setState({ menu: o }); },
      menuClose: () => { try { document.documentElement.style.overflow = ''; } catch (e) {} this.setState({ menu: false }); },
      menuItems: navKeys.map(([href, label], i) => ({ href, label, delay: 60 + i * 60 })).concat([{ href: '#album', label: t.album.eyebrow, delay: 300 }]),
      themeLabel: dark ? (rtl ? 'الوضع الفاتح' : 'Light mode') : (rtl ? 'الوضع الداكن' : 'Dark mode'),
      toggleLang: () => this.setState({ lang: lang === 'en' ? 'ar' : 'en' }),
      toggleTheme: () => this.setState({ theme: dark ? 'light' : 'dark' })
    };
  }
}
