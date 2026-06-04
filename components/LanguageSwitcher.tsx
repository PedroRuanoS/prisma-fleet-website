"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { setLocale } from "@/lib/locale-actions";

type Anim = "toRight" | "toLeft" | "";

/** Re-trigger the full-screen navy sweep overlay (see #sweep in globals.css). */
function fireSweep() {
  const s = document.getElementById("sweep");
  if (!s) return;
  s.classList.remove("go");
  void s.offsetWidth; // force reflow so the animation can replay
  s.classList.add("go");
}

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [, startTransition] = useTransition();
  const [anim, setAnim] = useState<Anim>("");
  const [optimisticLocale, setOptimisticLocale] = useState<string | null>(null);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayLocale = optimisticLocale ?? currentLocale;

  useEffect(() => {
    return () => {
      if (animTimer.current) clearTimeout(animTimer.current);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, []);

  function handleSwitch(locale: "en" | "pt") {
    if (locale === displayLocale) return;

    const direction: Anim = locale === "pt" ? "toRight" : "toLeft";
    setOptimisticLocale(locale);
    setAnim(direction);
    fireSweep();

    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => setAnim(""), 400);

    // Defer the (async) locale change so the content swap lands while the
    // navy panel is covering the screen (sweepIn is fully covered ~495-605ms).
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      startTransition(async () => {
        await setLocale(locale);
      });
    }, 500);
  }

  const sliderClass = [
    "lang-slider",
    anim === "toRight" ? "lang-slide-to-right" : "",
    anim === "toLeft" ? "lang-slide-to-left" : "",
    anim === "" && displayLocale === "pt" ? "lang-at-pt" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      <span className={sliderClass} aria-hidden="true" />
      <button
        type="button"
        className={`lang-option${displayLocale === "en" ? " active" : ""}`}
        onClick={() => handleSwitch("en")}
        aria-pressed={displayLocale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-option${displayLocale === "pt" ? " active" : ""}`}
        onClick={() => handleSwitch("pt")}
        aria-pressed={displayLocale === "pt"}
      >
        PT
      </button>
    </div>
  );
}
