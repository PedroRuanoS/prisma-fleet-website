/* Showpiece — the scroll-scrubbed "spreadsheet fractures" set-piece.
   As the section scrolls through the viewport (--p 0→1): a blue fracture
   crack draws across a faux spreadsheet grid, and the cells shatter apart
   and fade, revealing the clean message. The brand's anchor metaphor.
   Exports window.SpreadsheetBreak. */
const _spUseRef = React.useRef;

const _SP_POOL = [
  "=SOMA(B2:B47)", "€1.240,00", "#REF!", "=PROCV(A2;F:H;3)", "€980,50",
  "312,00", "#DIV/0!", "=B4*0,75", "€2.110", "RENDA 180€", "Via Verde",
  "-€84,20", "=SE(C7>0;C7;0)", "Uber", "Bolt", "€640,00", "#VALOR!",
  "Prio E", "0,00", "=B7-C7-D7", "€55,10", "IBAN PT50", "=MÉDIA(B:B)", "137"
];
const _SP_ERR = new Set(["#REF!", "#DIV/0!", "#VALOR!"]);

function SpreadsheetBreak({ t }) {
  const c = t.brk;
  const ref = _spUseRef(null);
  window.useScrollProgress(ref);

  const COLS = 8, ROWS = 6;
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      const idx = r * COLS + col;
      const txt = _SP_POOL[(idx * 5 + r * 3) % _SP_POOL.length];
      const seed = (idx * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      const rnd2 = ((idx * 4099 + 7919) % 233280) / 233280;
      const side = col < COLS / 2 ? -1 : 1;
      const dist = Math.abs(col - (COLS - 1) / 2) + Math.abs(r - (ROWS - 1) / 2);
      const dx = (side * (18 + rnd * 70) * (0.5 + dist / 8)).toFixed(1);
      const dy = ((rnd2 - 0.5) * 120).toFixed(1);
      const rot = ((rnd - 0.5) * 26).toFixed(1);
      cells.push({ txt, err: _SP_ERR.has(txt), dx, dy, rot });
    }
  }

  return (
    <section className="section section-navy sbreak" ref={ref}>
      <div className="sbreak-grid" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells.map((cell, i) => (
          <span key={i} className={"scell" + (cell.err ? " err" : "")}
            style={{ "--dx": cell.dx, "--dy": cell.dy, "--rot": cell.rot + "deg" }}>
            {cell.txt}
          </span>
        ))}
      </div>
      <svg className="sbreak-crack" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
        <path className="crack-glow" pathLength="1" d="M-30 90 L 250 175 L 400 110 L 540 285 L 700 200 L 845 395 L 980 320 L 1130 500 L 1240 560" />
        <path className="crack-core" pathLength="1" d="M-30 90 L 250 175 L 400 110 L 540 285 L 700 200 L 845 395 L 980 320 L 1130 500 L 1240 560" />
      </svg>
      <div className="wrap sbreak-copy">
        <window.Reveal>
          <div className="kicker on-dark center">{c.kicker}</div>
          <h2 className="section-title">{c.h1pre}<span className="uline" style={{ "--ul": 1 }}>{c.h1em}</span>{c.h1post}</h2>
          <p className="lede" style={{ margin: "20px auto 0", maxWidth: "62ch" }}>{c.sub}</p>
          <div className="sbreak-caption">{c.caption}</div>
          <div className="sbreak-closer">{c.closer}</div>
        </window.Reveal>
      </div>
    </section>
  );
}

window.SpreadsheetBreak = SpreadsheetBreak;
