/* =========================================================
   Language switch between "/" (FR) and "/en/" (EN).
   Each language is its own static page. To keep the old in-place feel,
   the knob slides before navigating, and the other page opens at the
   same section without replaying the loader.
   ========================================================= */
import { $$, reduceMotion } from "./utils";

const KEY = "lang-switch";

interface SavedPosition { id: string; offset: number }

/** The section currently at the top of the viewport. */
function currentSection(): HTMLElement | undefined {
  const sections = $$("main section[id], footer");
  return sections.filter((s) => s.getBoundingClientRect().top <= innerHeight * 0.3).pop() ?? sections[0];
}

export function langSwitch() {
  const link = document.querySelector<HTMLAnchorElement>("#langToggle");
  if (!link) return;
  const pageLang = document.documentElement.lang;
  // Coming back with the Back button restores this page from the bfcache: put the knob back.
  addEventListener("pageshow", (e) => {
    if (e.persisted) document.documentElement.lang = pageLang;
  });
  link.addEventListener("click", (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let "open in new tab" work
    e.preventDefault();
    const section = currentSection();
    try {
      const saved: SavedPosition = { id: section?.id ?? "", offset: section?.getBoundingClientRect().top ?? 0 };
      sessionStorage.setItem(KEY, JSON.stringify(saved));
    } catch {}
    document.documentElement.lang = link.hreflang; // CSS slides the knob
    setTimeout(() => location.assign(link.href), reduceMotion ? 0 : 280);
  });
}

/**
 * If we arrived here through the language switch, returns a function that
 * restores the scroll position (to call once the page can scroll), else null.
 */
export function takeLangSwitch(): (() => void) | null {
  let saved: SavedPosition | null = null;
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (raw) saved = JSON.parse(raw) as SavedPosition;
  } catch {}
  if (!saved) return null;
  const { id, offset } = saved;
  return () => {
    const el = id ? document.getElementById(id) : document.querySelector("footer");
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - offset, behavior: "instant" });
  };
}
