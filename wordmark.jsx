/* FleetWordmark — ported from the live FleetWordmark.tsx.
   Skewed -12° "FLEET" vector paths + spaced Oswald "PRISMA" tag.
   Staggered rise + elastic E-stretch entrance. Exports window.FleetWordmark. */
const { useEffect: _fwUseEffect, useRef: _fwUseRef } = React;

const FWM = (() => {
  const STEM = 24, ARM = 24, MID_ARM = 22, MID_Y = 39, TRACK = 4, SKEW_DEG = 12, ANIM_MS = 1200, STRETCH = 2.0;
  const NAT_W = { F: 56, L: 52, E: 56, T: 62 };
  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
  const easeOutBack = (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const sub = (p, a, b) => clamp01((p - a) / (b - a));
  const pathF = (w) => { const midW = w * 0.78; return `M 0 0 L ${w} 0 L ${w} ${ARM} L ${STEM} ${ARM} L ${STEM} ${MID_Y} L ${midW} ${MID_Y} L ${midW} ${MID_Y + MID_ARM} L ${STEM} ${MID_Y + MID_ARM} L ${STEM} 100 L 0 100 Z`; };
  const pathL = (w) => `M 0 0 L ${STEM} 0 L ${STEM} ${100 - ARM} L ${w} ${100 - ARM} L ${w} 100 L 0 100 Z`;
  const pathE = (w) => { const naturalMid = NAT_W.E * 0.82; const midW = naturalMid + (w - NAT_W.E) * 0.92; return `M 0 0 L ${w} 0 L ${w} ${ARM} L ${STEM} ${ARM} L ${STEM} ${MID_Y} L ${midW} ${MID_Y} L ${midW} ${MID_Y + MID_ARM} L ${STEM} ${MID_Y + MID_ARM} L ${STEM} ${100 - ARM} L ${w} ${100 - ARM} L ${w} 100 L 0 100 Z`; };
  const pathT = (w) => { const sx = (w - STEM) / 2; return `M 0 0 L ${w} 0 L ${w} ${ARM} L ${sx + STEM} ${ARM} L ${sx + STEM} 100 L ${sx} 100 L ${sx} ${ARM} L 0 ${ARM} Z`; };
  const SKEW_BUF = Math.ceil(100 * Math.tan((SKEW_DEG * Math.PI) / 180)) + 2;
  const REST_XS = (() => { const xs = []; const widths = [NAT_W.F, NAT_W.L, NAT_W.E, NAT_W.E, NAT_W.T]; let cursor = 0; for (let i = 0; i < 5; i++) { xs.push(cursor); cursor += widths[i] + TRACK; } return xs; })();
  const REST_TOTAL_W = REST_XS[4] + NAT_W.T;
  const REST_PATHS = [pathF(NAT_W.F), pathL(NAT_W.L), pathE(NAT_W.E), pathE(NAT_W.E), pathT(NAT_W.T)];
  const ENTRY_START = [0.0, 0.04, 0.08, 0.12, 0.16];
  const ENTRY_DUR = 0.3;
  return { STEM, ARM, MID_ARM, MID_Y, TRACK, SKEW_DEG, ANIM_MS, STRETCH, NAT_W, easeOutCubic, easeOutBack, sub, pathE, SKEW_BUF, REST_XS, REST_TOTAL_W, REST_PATHS, ENTRY_START, ENTRY_DUR };
})();

function FleetWordmark({ color = '#1e3a5f', prismaColor = '#64748b', animate = true, showPrisma = true, className = '', replayKey }) {
  const prismaRef = _fwUseRef(null);
  const svgRef = _fwUseRef(null);
  const groupRefs = _fwUseRef([null, null, null, null, null]);
  const eRefs = _fwUseRef([null, null]);

  _fwUseEffect(() => {
    if (!animate) return;
    const renderAt = (progress) => {
      const stretchP = FWM.easeOutBack(FWM.sub(progress, 0.42, 0.95));
      const eW = FWM.NAT_W.E + FWM.NAT_W.E * (FWM.STRETCH - 1) * stretchP;
      const widths = [FWM.NAT_W.F, FWM.NAT_W.L, eW, eW, FWM.NAT_W.T];
      const xs = []; let cursor = 0;
      for (let i = 0; i < 5; i++) { xs.push(cursor); cursor += widths[i] + FWM.TRACK; }
      const totalW = cursor - FWM.TRACK;
      svgRef.current?.setAttribute('viewBox', `${-FWM.SKEW_BUF} -2 ${totalW + FWM.SKEW_BUF + 4} 104`);
      for (let i = 0; i < 5; i++) {
        const e = FWM.easeOutCubic(FWM.sub(progress, FWM.ENTRY_START[i], FWM.ENTRY_START[i] + FWM.ENTRY_DUR));
        const ty = (1 - e) * 14;
        const g = groupRefs.current[i];
        if (g) { g.setAttribute('transform', `translate(${xs[i]}, ${ty})`); g.setAttribute('opacity', String(e)); }
      }
      const eD = FWM.pathE(eW);
      eRefs.current[0]?.setAttribute('d', eD);
      eRefs.current[1]?.setAttribute('d', eD);
      const prismaP = FWM.easeOutCubic(FWM.sub(progress, 0, 0.25));
      const prisma = prismaRef.current;
      if (prisma) { prisma.style.opacity = String(prismaP * 0.85); prisma.style.transform = `translate3d(0, ${(1 - prismaP) * 8}px, 0)`; }
    };
    renderAt(0);
    let start = null, raf = 0;
    const step = (t) => { if (start == null) start = t; const p = Math.min((t - start) / FWM.ANIM_MS, 1); renderAt(p); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, replayKey]);

  const initialOpacity = animate ? 0 : 1;
  const initialTy = animate ? 14 : 0;
  const initialPrismaOpacity = animate ? 0 : 0.85;
  const initialPrismaTy = animate ? 8 : 0;

  return (
    <div className={`fwm ${className}`.trim()}>
      {showPrisma && (
        <div ref={prismaRef} className="fwm-prisma"
          style={{ opacity: initialPrismaOpacity, transform: `translate3d(0, ${initialPrismaTy}px, 0)`, color: prismaColor }}>
          PRISMA
        </div>
      )}
      <svg ref={svgRef} className="fwm-svg"
        viewBox={`${-FWM.SKEW_BUF} -2 ${FWM.REST_TOTAL_W + FWM.SKEW_BUF + 4} 104`}
        fill={color} preserveAspectRatio="xMidYMid meet" aria-label="FLEET">
        <g transform={`skewX(${-FWM.SKEW_DEG})`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} ref={(el) => { groupRefs.current[i] = el; }}
              transform={`translate(${FWM.REST_XS[i]}, ${initialTy})`} opacity={initialOpacity}>
              <path ref={i === 2 ? (el) => { eRefs.current[0] = el; } : i === 3 ? (el) => { eRefs.current[1] = el; } : undefined}
                d={FWM.REST_PATHS[i]} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

window.FleetWordmark = FleetWordmark;
