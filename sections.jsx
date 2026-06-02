/* Section components. Exports window.{Nav,Hero,Proof,Problem,Features,HowItWorks,Pricing,Integrations,Faq,FinalCta,Footer,Reveal} */
const { useEffect: _sUseEffect, useRef: _sUseRef, useState: _sUseState } = React;
const _sUseLayoutEffect = React.useLayoutEffect || React.useEffect;

/* Gate the hero entrance: add .anim before first paint so the from-hidden
   keyframes apply; if this never runs, base state is already visible. */
function useHeroEnter(ref) {
  _sUseLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.querySelectorAll('.hero-copy, .dash-enter').forEach((e) => e.classList.add('anim'));
  });
}

function Reveal({ children, className = "", as: Tag = "div", delay }) {
  const ref = _sUseRef(null);
  _sUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      el.classList.add("in");
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) show();
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  const dcls = delay ? ` d${delay}` : "";
  return <Tag ref={ref} className={`reveal${dcls} ${className}`.trim()}>{children}</Tag>;
}

/* ── NAV ─────────────────────────────────────────────── */
function Nav({ t, lang, setLang, onNav }) {
  const [scrolled, setScrolled] = _sUseState(false);
  const [open, setOpen] = _sUseState(false);
  _sUseEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (e, id) => { e.preventDefault(); setOpen(false); onNav(id); };
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a href="#top" onClick={(e) => go(e, "top")} aria-label="Prisma Fleet">
          <window.FleetWordmark animate={false} />
        </a>
        <div className={"nav-links" + (open ? " open" : "")}>
          <a className="nav-link" href="#funcionalidades" onClick={(e) => go(e, "funcionalidades")}>{t.nav.features}</a>
          <a className="nav-link" href="#como-funciona" onClick={(e) => go(e, "como-funciona")}>{t.nav.how}</a>
          <a className="nav-link" href="#clientes" onClick={(e) => go(e, "clientes")}>{t.nav.clients}</a>
          <a className="nav-link" href="#precos" onClick={(e) => go(e, "precos")}>{t.nav.pricing}</a>
          <div className="lang">
            <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a className="btn btn-primary btn-sm" href="#precos" onClick={(e) => go(e, "precos")}>{t.nav.demo}</a>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu"><window.Icon name="menu" className="ic" /></button>
      </div>
    </nav>
  );
}

/* ── HERO ────────────────────────────────────────────── */
function HeroHeadline({ h, headline }) {
  const strikeRef = _sUseRef(null);
  _sUseEffect(() => {
    if (headline !== "spreadsheet") return;
    const el = strikeRef.current;
    if (!el) return;
    const t = setTimeout(() => { el.style.setProperty("--sk", "1"); }, 950);
    return () => clearTimeout(t);
  }, [headline]);
  if (headline === "minutos")
    return <h1>{h.h1minutosA}<span className="uline" style={{ "--ul": 1 }}>{h.h1minutosEm}</span>{h.h1minutosB}</h1>;
  if (headline === "chega")
    return <h1>{h.h1chegaA}<span className="uline" style={{ "--ul": 1 }}>{h.h1chegaEm}</span>{h.h1chegaB}</h1>;
  return <h1>{h.h1pre}<span className="strike" ref={strikeRef}>{h.h1strike}</span>{h.h1post}</h1>;
}

function HeroText({ t, headline, dark, editorial }) {
  const h = t.hero;
  return (
    <div className={"hero-copy" + (editorial ? " editorial" : "")}>
      <div className="kicker hero-eyebrow">{h.kicker}</div>
      <HeroHeadline h={h} headline={headline} />
      <p className="hero-sub">{headline === "spreadsheet" ? h.sub : h.subAlt}</p>
      <div className="hero-cta">
        <a className="btn btn-primary btn-lg" href="#precos" data-mag="0.32">{h.ctaPrimary}<window.Icon name="arrow" className="arrow" style={{ width: 18, height: 18 }} /></a>
        <a className={"btn btn-ghost btn-lg" + (dark ? " on-dark" : "")} href="#funcionalidades">{h.ctaGhost}</a>
      </div>
      <div className="hero-trust">
        {h.trust.map((x, i) => <span key={i}><span className="dot"></span>{x}</span>)}
      </div>
    </div>
  );
}

function Hero({ t, variant, headline, replayKey }) {
  const dark = variant === "centered-navy";
  const d = t.dash;
  const heroRef = _sUseRef(null);
  useHeroEnter(heroRef);
  if (variant === "centered-navy") {
    return (
      <header id="top" className="hero hero-navy" ref={heroRef}>
        <div className="hero-orb o1"></div>
        <div className="hero-orb o2"></div>
        <div className="wrap hero-center">
          <window.FleetWordmark color="#ffffff" prismaColor="rgba(255,255,255,0.75)" className="lg" replayKey={replayKey} key={replayKey} />
          <div style={{ height: 26 }}></div>
          <HeroText t={t} headline={headline} dark={true} />
          <div className="dash-enter" style={{ width: "min(680px, 100%)", marginTop: 56 }}>
            <window.TiltCard max={5}>
              <window.DashTile d={d} animateKey={replayKey + "-c"} />
            </window.TiltCard>
          </div>
        </div>
      </header>
    );
  }
  if (variant === "editorial-light") {
    return (
      <header id="top" className="hero hero-light hero-editorial" ref={heroRef}>
        <div className="hero-orb o1"></div>
        <div className="hero-orb o2"></div>
        <div className="wrap">
          <HeroText t={t} headline={headline} editorial={true} />
          <div className="hero-editorial-dash dash-enter">
            <window.TiltCard max={6}>
              <window.DashTile d={d} animateKey={replayKey + "-e"} />
            </window.TiltCard>
          </div>
        </div>
      </header>
    );
  }
  // split-light (default)
  return (
    <header id="top" className="hero hero-light" ref={heroRef}>
      <div className="hero-orb o1"></div>
      <div className="hero-orb o2"></div>
      <div className="wrap hero-grid">
        <HeroText t={t} headline={headline} />
        <div className="hero-visual dash-enter">
          <window.TiltCard className="dash-tilt" max={7}>
            <window.DashTile d={d} animateKey={replayKey + "-s"} />
          </window.TiltCard>
          <div className="dash-float" style={{ top: -16, right: 18 }}>
            <span style={{ color: "#00a86b", fontWeight: 700 }}>✓</span> {d.floatA}
          </div>
          <div className="dash-float" style={{ bottom: -14, left: -10 }}>
            <b style={{ color: "#2563eb" }}>{d.floatB}</b>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── SOCIAL PROOF ────────────────────────────────────── */
function Proof({ t }) {
  const p = t.proof;
  return (
    <section id="clientes" className="proof">
      <div className="wrap">
        <Reveal>
          <div className="proof-label">{p.labelPre}<b>{p.labelStrong}</b>{p.labelPost}</div>
          <div className="proof-logos">
            {p.logos.map((l, i) => (
              <span className="proof-logo" key={i}><span className="mk"></span>{l}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PROBLEM ─────────────────────────────────────────── */
function Problem({ t }) {
  const p = t.problem;
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">{p.kicker}</div>
          <h2 className="section-title">{p.title}</h2>
          <p className="lede">{p.lede}</p>
        </Reveal>
        <div className="stats">
          {p.stats.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="stat">
                <div className="stat-num"><window.CountUp value={s.num} /><span className="u">{s.unit}</span></div>
                <div className="stat-label">{s.label}</div>
                <p className="stat-desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.04em", color: "var(--faint)", marginTop: 26, textTransform: "uppercase" }}>{p.source}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FEATURES ────────────────────────────────────────── */
function Features({ t }) {
  const f = t.features;
  return (
    <section id="funcionalidades" className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">{f.kicker}</div>
          <h2 className="section-title">{f.title}</h2>
          <p className="lede">{f.lede}</p>
        </Reveal>
        <div className="feat-grid">
          {f.main.map((c, i) => (
            <Reveal key={i} delay={(i % 2) + 1}>
              <window.TiltCard className="feat" max={5}>
                <div className="feat-spot"></div>
                <div className="feat-ic"><window.Icon name={c.ic} /></div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <div className="feat-mono"><span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }}></span>{c.tag}</div>
              </window.TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="feat-mini">
          {f.mini.map((m, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <div className="mini"><b>{m.b}</b><span>{m.s}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ────────────────────────────────────── */
function HowItWorks({ t }) {
  const h = t.how;
  return (
    <section id="como-funciona" className="section section-navy">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker on-dark">{h.kicker}</div>
          <h2 className="section-title">{h.title}</h2>
          <p className="lede">{h.lede}</p>
        </Reveal>
        <div className="pipeline">
          <div className="pipeline-line" aria-hidden="true"><span className="pipeline-pulse"></span></div>
          {h.steps.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="step">
                <span className="step-bar"></span>
                <div className="num">0{i + 1}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <window.Icon name="chev" className="chev" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ─────────────────────────────────────────── */
function Pricing({ t }) {
  const p = t.pricing;
  return (
    <section id="precos" className="section">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="kicker center">{p.kicker}</div>
          <h2 className="section-title">{p.title}</h2>
          <p className="lede" style={{ margin: "18px auto 0" }}>{p.ledePre}<strong style={{ color: "var(--ink)" }}>{p.ledeStrong}</strong>{p.ledePost}</p>
        </Reveal>
        <div className="price-grid">
          {p.plans.map((pl, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className={"plan" + (pl.feature ? " feature" : "")}>
                {pl.feature && <span className="plan-badge">Popular</span>}
                <div className="plan-name">{pl.name}</div>
                <p className="plan-desc">{pl.desc}</p>
                <div className="plan-price">{pl.price}</div>
                <ul className="plan-list">
                  <li className="head">{pl.listHead}</li>
                  {pl.list.map((x, j) => <li key={j}><window.CheckMark className="ck" />{x}</li>)}
                </ul>
                <a className={"btn " + (pl.feature ? "btn-primary" : "btn-ghost")} href="#top">{p.cta}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── INTEGRATIONS ────────────────────────────────────── */
function Integrations({ t }) {
  const it = t.integrations;
  const live = [
    { src: "assets/uberlogo.png", alt: "Uber" },
    { src: "assets/boltlogo.png", alt: "Bolt" },
    { src: "assets/viaverdelogo.png", alt: "Via Verde" },
    { src: "assets/prio_energy.png", alt: "Prio" }
  ];
  const roadmap = [
    { src: "assets/galpsymbol.png", alt: "Galp" },
    { src: "assets/bpsymbol.png", alt: "BP" }
  ];
  return (
    <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="kicker center">{it.kicker}</div>
          <h2 className="section-title">{it.title}</h2>
          <p className="lede" style={{ margin: "18px auto 0" }}>{it.lede}</p>
        </Reveal>
        <Reveal>
          <div className="int-grid">
            {live.map((l, i) => <span className="int-pill" key={i}><img src={l.src} alt={l.alt} /></span>)}
            {roadmap.map((l, i) => <span className="int-pill roadmap" key={i}><img src={l.src} alt={l.alt} /><span className="rm">{it.roadmapLabel}</span></span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = _sUseState(false);
  const aRef = _sUseRef(null);
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}<span className="pm"><window.Icon name="plus" style={{ width: 22, height: 22 }} /></span>
      </button>
      <div className="faq-a" ref={aRef} style={{ maxHeight: open ? (aRef.current ? aRef.current.scrollHeight : 400) : 0 }}>
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  );
}
function Faq({ t }) {
  const f = t.faq;
  return (
    <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="kicker center">{f.kicker}</div>
          <h2 className="section-title">{f.title}</h2>
        </Reveal>
        <Reveal className="faq-list">
          {f.items.map((it, i) => <FaqItem key={i} q={it.q} a={it.a} />)}
        </Reveal>
      </div>
    </section>
  );
}

/* ── FINAL CTA ───────────────────────────────────────── */
function FinalCta({ t }) {
  const c = t.cta;
  return (
    <section className="section section-navy cta-final">
      <div className="wrap">
        <Reveal className="section-head center">
          <div className="kicker on-dark center">{c.kicker}</div>
          <h2 className="section-title">{c.title}</h2>
          <p className="lede">{c.lede}</p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href="#top" data-mag="0.32">{c.primary}<window.Icon name="arrow" className="arrow" style={{ width: 18, height: 18 }} /></a>
            <a className="btn btn-ghost btn-lg on-dark" href="#precos">{c.ghost}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────── */
function Footer({ t }) {
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <window.FleetWordmark color="#ffffff" prismaColor="rgba(255,255,255,0.6)" animate={false} />
            <p className="footer-tag">{f.tagPre}<span className="strike" style={{ "--sk": 1 }}>{f.tagStrike}</span>{f.tagPost}</p>
          </div>
          {f.cols.map((col, i) => (
            <div className="footer-col" key={i}>
              <h4>{col.h}</h4>
              {col.links.map((l, j) => <a href="#top" key={j}>{l}</a>)}
            </div>
          ))}
          <div className="footer-col">
            <h4>{f.contact}</h4>
            <a href={"mailto:" + f.email}>{f.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{f.rights}</span>
          <span>prismafleet.pt</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Reveal, Nav, Hero, Proof, Problem, Features, HowItWorks, Pricing, Integrations, Faq, FinalCta, Footer });
