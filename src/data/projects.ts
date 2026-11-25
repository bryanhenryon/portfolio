import type { DictKey } from "../i18n";

/* Translated texts live in src/i18n/. */
export interface Project {
  title: string;
  meta: DictKey;
  text: DictKey;
  tag: DictKey;
  /** Position / rotation of the floating tag over the visual */
  tagStyle: string;
  colors: [string, string];
  visual: "stancer" | "digitevent" | "handyamo";
  href: string;
}

export const projects: Project[] = [
  {
    title: "Stancer",
    meta: "p1Meta",
    text: "p1Text",
    tag: "p1Tag",
    tagStyle: "--r:-6deg;top:6%;right:-2%",
    colors: ["#b3cdff", "#ffc2bf"],
    visual: "stancer",
    href: "https://stancer.com",
  },
  {
    title: "Digitevent",
    meta: "p2Meta",
    text: "p2Text",
    tag: "p2Tag",
    tagStyle: "--r:-4deg;bottom:-7%;left:10%",
    colors: ["#c4b8ff", "#9df0cb"],
    visual: "digitevent",
    href: "https://www.digitevent.com",
  },
  {
    title: "Handyamo",
    meta: "p3Meta",
    text: "p3Text",
    tag: "p3Tag",
    tagStyle: "--r:5deg;top:4%;right:-2%",
    colors: ["#ffd6a5", "#ffb3d6"],
    visual: "handyamo",
    href: "https://www.handyamo.com",
  },
];
