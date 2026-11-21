/* Nav: reading progress, hide on scroll down, pill following the active section. */
import { $, $$ } from "./utils";

export function nav() {
  const navEl = $(".nav");
  const bar = $("#progress");
  const pill = $(".nav__pill");
  const links = $$<HTMLAnchorElement>(".nav__links a");
  let last = scrollY;

  addEventListener("scroll", () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    navEl.classList.toggle("is-hidden", y > last && y > 500);
    last = y;
  }, { passive: true });

  const setActive = (link: HTMLAnchorElement | null | undefined) => {
    links.forEach((l) => l.classList.toggle("is-active", l === link));
    if (!link) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
    pill.style.background = link.dataset.color ?? "";
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(links.find((l) => l.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => {
    const section = document.querySelector(l.getAttribute("href") ?? "");
    if (section) io.observe(section);
  });
  new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { threshold: 0.5 }).observe($(".hero"));
}
