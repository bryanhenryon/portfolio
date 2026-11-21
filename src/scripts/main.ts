/* =========================================================
   Portfolio — interactions & animations (vanilla, no dependencies).
   The two React islands (copy email, local clock) live in
   src/components/react and hydrate on their own.
   ========================================================= */
import { $, $$ } from "./utils";
import { splitWords } from "./split";
import { runLoader } from "./loader";
import { langSwitch, takeLangSwitch } from "./lang";
import { cursor, magnetic, tilt } from "./pointer";
import { nav } from "./nav";
import { heroMotion, stickers } from "./hero";
import { counters, reveals, ribbons, stackCards, timeline } from "./scroll";

const restoreScroll = takeLangSwitch();
const heroTitle = $(".hero__title");

$$("[data-split]").forEach(splitWords);

cursor();
magnetic();
langSwitch();
heroMotion();
const startStickers = stickers();
ribbons();
tilt();
stackCards();
timeline();
counters();

runLoader(() => {
  restoreScroll?.();
  nav(); // after the scroll restore, so the jump doesn't hide the nav
  heroTitle.classList.add("is-split-in");
  startStickers?.();
  reveals();
}, restoreScroll !== null);
