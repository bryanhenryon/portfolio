// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Site domain: enables the canonical / hreflang / og:url tags and the sitemap
  site: "https://bryanhenryon.com",
  integrations: [
    react(),
    // Generates /sitemap-index.xml, with FR ⇄ EN links between each page
    sitemap({
      // The legal notice pages are noindex, so they aren't submitted to Google
      filter: (page) => !/\/(mentions-legales|legal-notice)\/$/.test(page),
      i18n: {
        defaultLocale: "fr",
        // Same codes as the pages' hreflang tags (fr / en), so Google doesn't get
        // conflicting signals (en-GB would target British users only)
        locales: { fr: "fr", en: "en" },
      },
    }),
  ],
  // Fonts downloaded at build time and served from the site (no request to Google from
  // the visitor's browser: better for GDPR and faster). Used via <Font /> in BaseLayout.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      weights: ["400 800"],
      fallbacks: ["system-ui", "sans-serif"],
      // Optical size axis, used by the large headings (font-variation-settings "opsz" 96)
      options: { experimental: { variableAxis: { opsz: [[12, 96]] } } },
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument",
      styles: ["normal", "italic"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "DM Mono",
      cssVariable: "--font-dm-mono",
      weights: [400, 500],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: { prefixDefaultLocale: false }, // FR on "/", EN on "/en/"
  },
});
