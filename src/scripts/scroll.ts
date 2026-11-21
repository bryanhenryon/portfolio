/* Scroll-driven effects: ribbons, reveals, stacking cards, timeline, counters. */
import { $, $$, clamp, reduceMotion, scroll, watchVisibility } from "./utils";

/** Marquee that speeds up and reverses with the scroll. The markup already holds the list twice. */
export function ribbons() {
  $$(".ribbon__track").forEach((track) => {
    const dir = Number(track.dataset.dir) || 1;
    let x = 0, half = 0, visible = true;
    const measure = () => (half = track.scrollWidth / 2);
    measure();
    document.fonts?.ready.then(measure);
    addEventListener("resize", measure);
    watchVisibility(track.parentElement!, (v) => (visible = v));
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible || reduceMotion) return;
      const boost = clamp(Math.abs(scroll.vel) * 0.5, 0, 18);
      const sign = scroll.vel < -0.5 ? -1 : 1;
      x -= dir * sign * (0.8 + boost);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    })();
  });
}

/** Fades blocks in (staggered per parent) and plays split headings when they enter the viewport. */
export function reveals() {
  const groups = new Map<Element | null, number>();
  $$("[data-reveal]").forEach((el) => {
    const p = el.parentElement;
    const n = groups.get(p) ?? 0;
    groups.set(p, n + 1);
    el.style.setProperty("--delay", `${Math.min(n, 6) * 0.08}s`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add(e.target.matches("[data-split]") ? "is-split-in" : "in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$("[data-reveal], [data-split]:not(.hero__title)").forEach((el) => io.observe(el));
}

/** Work cards shrink and tilt as the next one slides over them. */
export function stackCards() {
  if (reduceMotion) return;
  const cards = $$(".pcard");
  function update() {
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
      const p = clamp(1 - gap / card.offsetHeight, 0, 1);
      card.style.transform = `scale(${1 - p * 0.07}) rotate(${p * (i % 2 ? 1.5 : -1.5)}deg)`;
      card.style.filter = `saturate(${1 - p * 0.35}) brightness(${1 - p * 0.05})`;
    });
  }
  addEventListener("scroll", update, { passive: true });
  update();
}

/** The process path draws itself as you scroll and lights up each step it reaches. */
export function timeline() {
  const tl = $("#timeline");
  const path = $<SVGPathElement>("#timelinePath");
  const steps = $$(".tstep", tl);
  function update() {
    const r = tl.getBoundingClientRect();
    const p = reduceMotion ? 1 : clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
    path.style.strokeDashoffset = String(1 - p);
    steps.forEach((s) => {
      const mid = (s.offsetTop + s.offsetHeight / 2) / tl.offsetHeight;
      s.classList.toggle("is-on", p >= mid - 0.02);
    });
  }
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

/** Numbers count up (ease-out) the first time they are seen. */
export function counters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count);
      io.unobserve(el);
      if (reduceMotion) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now(), dur = 1800;
      (function tick(now: number) {
        const t = clamp((now - start) / dur, 0, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 4))));
        if (t < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => io.observe(el));
}
