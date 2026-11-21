/* Hero: mouse-following blob, parallax shapes, spinning badge, throwable stickers. */
import { $, $$, clamp, finePointer, lerp, mouse, reduceMotion, scroll, watchVisibility } from "./utils";

export function heroMotion() {
  const hero = $(".hero");
  const blob = $("#mouseBlob");
  const shapes = $$(".shape", hero);
  const badge = document.querySelector<SVGElement>(".badge__text");
  let visible = true, bx = mouse.x, by = mouse.y, px = 0, py = 0, rot = 0;
  watchVisibility(hero, (v) => (visible = v));

  (function loop() {
    requestAnimationFrame(loop);
    if (!visible || reduceMotion) return;
    const r = hero.getBoundingClientRect();
    bx = lerp(bx, mouse.x - r.left, 0.06);
    by = lerp(by, mouse.y - r.top, 0.06);
    blob.style.transform = `translate3d(${bx}px, ${by}px, 0)`;

    px = lerp(px, mouse.x / innerWidth - 0.5, 0.08);
    py = lerp(py, mouse.y / innerHeight - 0.5, 0.08);
    shapes.forEach((s) => {
      const d = Number(s.dataset.depth);
      s.style.transform = `translate3d(${px * d}px, ${py * d + scrollY * d * -0.012}px, 0)`;
    });

    rot += 0.25 + Math.abs(scroll.vel) * 0.25;
    if (badge) badge.style.transform = `rotate(${rot}deg)`;
  })();
}

interface Sticker {
  el: HTMLElement;
  x: number; y: number; vx: number; vy: number;
  w: number; h: number;
  /** current / resting rotation, current / target scale */
  r: number; base: number; s: number; ts: number;
  drag: boolean; hidden: boolean;
}

/** Sets up the sticker physics and returns a function that pops them in. */
export function stickers(): (() => void) | undefined {
  const hero = $(".hero");
  const stage = document.querySelector<HTMLElement>("#stickers");
  if (!stage) return;
  let W = 0, H = 0, z = 10, visible = true;
  const items: Sticker[] = $$(".sticker", stage).map((el) => ({
    el, x: 0, y: 0, vx: 0, vy: 0, w: 0, h: 0,
    r: Number(el.dataset.r) || 0, base: Number(el.dataset.r) || 0, s: 0, ts: 0,
    drag: false, hidden: false,
  }));
  watchVisibility(hero, (v) => (visible = v));

  function place() {
    W = stage!.clientWidth;
    H = stage!.clientHeight;
    const mobile = W < 760;
    items.forEach((it) => {
      const fx = mobile ? it.el.dataset.mx : it.el.dataset.x;
      const fy = mobile ? it.el.dataset.my : it.el.dataset.y;
      it.hidden = fx === undefined || fy === undefined;
      it.el.style.display = it.hidden ? "none" : "";
      if (it.hidden) return;
      it.w = it.el.offsetWidth;
      it.h = it.el.offsetHeight;
      const dx = mobile ? 0 : Number(it.el.dataset.dx ?? 0);
      it.x = clamp(Number(fx) * W - it.w / 2 + dx, 0, W - it.w);
      it.y = clamp(Number(fy) * H - it.h / 2, 0, H - it.h);
      it.vx = it.vy = 0;
    });
  }

  // Dragging is mouse/trackpad only: on touch screens it hijacked the scroll.
  if (finePointer) items.forEach((it) => {
    const el = it.el;
    let offX = 0, offY = 0, lastX = 0, lastY = 0;
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      const r = stage.getBoundingClientRect();
      it.drag = true;
      it.ts = 1.12;
      offX = e.clientX - r.left - it.x;
      offY = e.clientY - r.top - it.y;
      lastX = e.clientX;
      lastY = e.clientY;
      el.style.zIndex = String(++z);
      el.classList.add("is-dragging");
    });
    el.addEventListener("pointermove", (e) => {
      if (!it.drag) return;
      const r = stage.getBoundingClientRect();
      it.x = clamp(e.clientX - r.left - offX, 0, W - it.w);
      it.y = clamp(e.clientY - r.top - offY, 0, H - it.h);
      it.vx = lerp(it.vx, e.clientX - lastX, 0.6);
      it.vy = lerp(it.vy, e.clientY - lastY, 0.6);
      lastX = e.clientX;
      lastY = e.clientY;
    });
    const release = () => {
      if (!it.drag) return;
      it.drag = false;
      it.ts = 1;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);
  });

  function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    items.forEach((it) => {
      if (it.hidden) return;
      if (!it.drag) {
        it.x += it.vx;
        it.y += it.vy;
        it.vx *= 0.94;
        it.vy *= 0.94;
        if (it.x < 0) { it.x = 0; it.vx *= -0.7; }
        if (it.x > W - it.w) { it.x = W - it.w; it.vx *= -0.7; }
        if (it.y < 0) { it.y = 0; it.vy *= -0.7; }
        if (it.y > H - it.h) { it.y = H - it.h; it.vy *= -0.7; }
      } else {
        it.vx *= 0.8;
        it.vy *= 0.8;
      }
      it.r = lerp(it.r, it.base + clamp(it.vx * 1.5, -30, 30), 0.12);
      it.s = lerp(it.s, it.ts, 0.15);
      it.el.style.transform = `translate3d(${it.x}px, ${it.y}px, 0) rotate(${it.r}deg) scale(${it.s})`;
    });
  }

  place();
  document.fonts?.ready.then(place);
  let t: number | undefined;
  addEventListener("resize", () => {
    clearTimeout(t);
    t = window.setTimeout(place, 200);
  });

  // pop in one by one after the loader
  return () => {
    items.forEach((it, i) => {
      setTimeout(() => {
        it.el.classList.add("is-placed");
        it.ts = 1;
      }, reduceMotion ? 0 : 900 + i * 140);
    });
    if (reduceMotion) items.forEach((it) => (it.s = 1));
    loop();
  };
}
