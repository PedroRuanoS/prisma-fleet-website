/* App — language state, hero variation tweaks, sweep transition, mount. */
const { useState: _aUseState, useEffect: _aUseEffect, useRef: _aUseRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split-light",
  "heroHeadline": "spreadsheet"
}/*EDITMODE-END*/;

const HERO_VARIANT_OPTS = [
  { value: "split-light", label: "Split · claro" },
  { value: "centered-navy", label: "Centrado · navy" },
  { value: "editorial-light", label: "Editorial" }
];
const HERO_HEADLINE_OPTS = [
  { value: "spreadsheet", label: "Folha de cálculo" },
  { value: "minutos", label: "Minutos" },
  { value: "chega", label: "Chega de Excel" }
];

function fireSweep() {
  const s = document.getElementById("sweep");
  if (!s) return;
  s.classList.remove("go");
  void s.offsetWidth;
  s.classList.add("go");
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = _aUseState(() => localStorage.getItem("pf_lang") || "pt");
  const [replayKey, setReplayKey] = _aUseState(0);

  _aUseEffect(() => { document.documentElement.lang = lang; localStorage.setItem("pf_lang", lang); }, [lang]);

  // Scroll-progress bar + magnetic buttons
  _aUseEffect(() => {
    const bar = document.getElementById("progress");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  _aUseEffect(() => { const id = setTimeout(() => window.initMagnetic(), 120); return () => clearTimeout(id); }, [lang, replayKey]);

  const setLang = (l) => {
    if (l === lang) return;
    fireSweep();
    setTimeout(() => { setLangState(l); setReplayKey((k) => k + 1); }, 300);
  };

  const c = window.CONTENT[lang];
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <window.Nav t={c} lang={lang} setLang={setLang} onNav={onNav} />
      <main>
        <window.Hero t={c} variant={t.heroVariant} headline={t.heroHeadline} replayKey={replayKey} key={t.heroVariant + lang + replayKey} />
        <window.Proof t={c} />
        <window.Problem t={c} />
        <window.SpreadsheetBreak t={c} />
        <window.Features t={c} />
        <window.HowItWorks t={c} />
        <window.Pricing t={c} />
        <window.Integrations t={c} />
        <window.Faq t={c} />
        <window.FinalCta t={c} />
      </main>
      <window.Footer t={c} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroVariant}
          options={HERO_VARIANT_OPTS}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakRadio label="Título" value={t.heroHeadline}
          options={HERO_HEADLINE_OPTS}
          onChange={(v) => setTweak("heroHeadline", v)} />
        <TweakSection label="Idioma" />
        <TweakRadio label="Language" value={lang} options={[{ value: "pt", label: "PT" }, { value: "en", label: "EN" }]}
          onChange={(v) => setLang(v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
