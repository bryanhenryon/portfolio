import { fr } from "./fr";
import { en } from "./en";

export type { Dictionary, DictKey } from "./fr";

export const locales = {
  fr: { dict: fr, path: "/", legalPath: "/mentions-legales/", htmlLang: "fr", ogLocale: "fr_FR", timeLocale: "fr-FR" },
  en: { dict: en, path: "/en/", legalPath: "/en/legal-notice/", htmlLang: "en", ogLocale: "en_GB", timeLocale: "en-GB" },
} as const;

export type Lang = keyof typeof locales;

export const otherLang = (lang: Lang): Lang => (lang === "fr" ? "en" : "fr");

export const useTranslations = (lang: Lang) => locales[lang].dict;
