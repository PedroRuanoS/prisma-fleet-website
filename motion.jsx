/* Cinematic motion toolkit. Exports window.{CountUp,TiltCard,useTilt,useMagnetic,useScrollProgress,initMagnetic}
   Honours prefers-reduced-motion and touch (no hover) by no-op'ing the parallax bits. */
const _mUseEffect = React.useEffect, _mUseRef = React.useRef;
const _mReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const _mNoHover = window.matchMedia('(hover: none)').matches;

/* ── Count-up numbers ─────────────────────────────────── */
function CountUp({ value, dur = 1500, className, style }) {
  const ref = _mUseRef(null);
  const done = _mUseRef(false);
  _mUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    const str = String(value);
    const m = str.match(/[\d\s.,]*\d/);
    if (!m || _mReduce) { el.textContent = str; return; }
    const numStr = m[0];
    const pre = str.slice(0, m.index);
    const post = str.slice(m.index + numStr.length);
    const hasSpace = /\s/.test(numStr);
    const target = parseInt(numStr.replace(/[\s.,]/g, ''), 10) || 0;
    const fmt = (n) => {
      let s = Math.round(n).toString();
      if (hasSpace) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
      return pre + s + post;
    };
    el.textContent = fmt(0);
    const ease = (x) => 1 - Math.pow(2, -10 * x);
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(p >= 1 ? target : target * ease(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) run();
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [value]);
  return <span ref={ref} className={className} style={style}>{value}</span>;
}

/* ── 3D parallax tilt + cursor spotlight var ──────────── */
function useTilt(ref, opts = {}) {
  _mUseEffect(() => {
    const el = ref.current;
    if (!el || _mReduce || _mNoHover) return;
    const max = opts.max ?? 9, scale = opts.scale ?? 1, persp = opts.perspective ?? 1000;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(${persp}px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${scale})`;
        el.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
      });
    };
    const leave = () => { cancelAnimationFrame(raf); el.style.transform = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); cancelAnimationFrame(raf); };
  }, []);
}

function TiltCard({ children, className = '', max = 8, scale = 1, glow = false }) {
  const ref = _mUseRef(null);
  useTilt(ref, { max, scale });
  return <div ref={ref} className={`tilt${glow ? ' tilt-glow' : ''} ${className}`.trim()}>{children}</div>;
}

/* ── Magnetic buttons (global initialiser) ────────────── */
function initMagnetic() {
  if (_mReduce || _mNoHover) return;
  document.querySelectorAll('[data-mag]').forEach((el) => {
    if (el.dataset.magOn) return;
    el.dataset.magOn = '1';
    const s = parseFloat(el.dataset.mag) || 0.3;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  });
}

/* ── Scroll-scrubbed progress (sets --p 0→1 on the el) ── */
function useScrollProgress(ref) {
  _mUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (_mReduce) { el.style.setProperty('--p', '1'); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.82, end = vh * 0.18;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
}

Object.assign(window, { CountUp, TiltCard, useTilt, useMagnetic: useTilt, useScrollProgress, initMagnetic });
