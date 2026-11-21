/* Pointer-driven effects: custom cursor, magnetic buttons, tilting bento tiles. */
import { $, $$, finePointer, lerp, mouse, reduceMotion } from "./utils";

export function cursor() {
  if (!finePointer) return;
  document.body.classList.add("has-cursor");
  const root = $(".cursor");
  const dot = $(".cursor__dot", root);
  const ring = $(".cursor__ring", root);
  const label = $(".cursor__label", root);
  let rx = mouse.x, ry = mouse.y;
  (function loop() {
    rx = lerp(rx, mouse.x, 0.2);
    ry = lerp(ry, mouse.y, 0.2);
    dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("pointerover", (e) => {
    const target = e.target as Element;
    const btn = target.closest<HTMLElement>("a, button");
    const labelled = btn ? (btn.dataset.cursor ? btn : null) : target.closest<HTMLElement>("[data-cursor]");
    root.classList.toggle("is-label", !!labelled);
    root.classList.toggle("is-hover", !!btn && !labelled);
    if (labelled) label.textContent = labelled.dataset.cursor ?? "";
  });
  document.documentElement.addEventListener("pointerleave", () => root.classList.add("is-hidden"));
  document.documentElement.addEventListener("pointerenter", () => root.classList.remove("is-hidden"));
}

export function magnetic() {
  if (!finePointer || reduceMotion) return;
  $$("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transition = "transform .15s ease-out";
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform .8s cubic-bezier(.34,1.56,.64,1)";
      el.style.transform = "";
    });
  });
}

export function tilt() {
  if (!finePointer || reduceMotion) return;
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (!card.classList.contains("in")) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });
}
