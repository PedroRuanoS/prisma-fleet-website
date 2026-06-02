/* Shared components: filled icons + the rebuilt clean Dashboard tile.
   Exports window.Icon, window.DashTile, window.CheckMark. */
const { useEffect: _cUseEffect, useRef: _cUseRef, useState: _cUseState } = React;

function Icon({ name, className, style, width = 24, height = 24 }) {
  const paths = {
    settle: <path d="M4 3h16a1 1 0 0 1 1 1v17l-3-2-3 2-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1Zm3 5v2h10V8H7Zm0 4v2h7v-2H7Z" />,
    import: <path d="M12 2 7 8h3v6h4V8h3l-5-6ZM4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6v-4H4Z" />,
    driver: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 3a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 12 5Zm-4 9.5c0-1.8 2.7-2.7 4-2.7s4 .9 4 2.7V16H8v-1.5ZM10 19h4v1.5h-4V19Z" />,
    chart: <path d="M4 13h3v7H4v-7Zm6.5-9h3v16h-3V4ZM17 9h3v11h-3V9Z" />,
    check: <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />,
    arrow: <path d="M5 12h12l-5-5 1.4-1.4L21.8 12l-8.4 8.4L12 19l5-5H5v-2Z" />,
    chev: <path d="m9 6 6 6-6 6-1.4-1.4L12.2 12 7.6 7.4 9 6Z" />,
    plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />,
    menu: <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} width={width} height={height} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function CheckMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="18" height="18" aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" />
    </svg>
  );
}

function DashTile({ d, animateKey }) {
  const ref = _cUseRef(null);
  _cUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll('.dash-bar-fill');
    const run = () => { bars.forEach((b) => { const v = b.getAttribute('data-v'); b.style.setProperty('--v', '0'); requestAnimationFrame(() => requestAnimationFrame(() => b.style.setProperty('--v', v))); }); };
    const t = setTimeout(run, 350);
    return () => clearTimeout(t);
  }, [animateKey]);

  return (
    <div className="dash" ref={ref}>
      <div className="dash-top">
        <div className="t">{d.title}<small>{d.sub}</small></div>
        <span className="dash-chip"><span className="pulse"></span>{d.chip}</span>
      </div>
      <div className="dash-score">
        <div className="dash-score-head">{d.score}</div>
        <div className="dash-score-row">
          <div className="dash-score-num"><window.CountUp value="56" dur={1700} /></div>
          <div className="dash-bars">
            {d.bars.map(([label, v], i) => (
              <div className="dash-bar-row" key={i}>
                <span className="dash-bar-label">{label}</span>
                <span className="dash-bar-track"><span className="dash-bar-fill" data-v={v} style={{ '--v': 0 }}></span></span>
                <span className="dash-bar-val">{Math.round(v * 100)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dash-kpis">
        {d.kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="k-label">{k.l}</div>
            <div className={"k-val" + (k.blue ? " blue" : "")}><window.CountUp value={k.v} /></div>
            <div className="k-sub">{k.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Icon, CheckMark, DashTile });
