/* Shared helpers and live pointer / scroll state used by the effects. */
export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** querySelector for elements the markup guarantees to exist. */
export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/** Calls `cb` with the element's on-screen state, so rAF loops can idle when it is hidden. */
export const watchVisibility = (el: Element, cb: (visible: boolean) => void) =>
  new IntersectionObserver(([e]) => cb(e.isIntersecting)).observe(el);

export const mouse = { x: innerWidth * 0.7, y: innerHeight * 0.4 };
addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}, { passive: true });

/** Smoothed scroll velocity (used by the ribbons and the hero badge). */
export const scroll = { y: scrollY, vel: 0 };
(function trackScroll() {
  const y = scrollY;
  scroll.vel = lerp(scroll.vel, y - scroll.y, 0.2);
  scroll.y = y;
  requestAnimationFrame(trackScroll);
})();
