// Follows the best practices established in https://shiki.matsu.io/guide/best-performance
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { createHighlighterCore } from "shiki/core";

const bundledLanguages = {
  svelte: () => import("@shikijs/langs/svelte"),
  typescript: () => import("@shikijs/langs/typescript"),
  css: () => import("@shikijs/langs/css"),
  markdown: () => import("@shikijs/langs/markdown"),
  bash: () => import("@shikijs/langs/bash"),
  // javascript: () => import('@shikijs/langs/javascript'),
  // diff: () => import('@shikijs/langs/diff'),
  // json: () => import('@shikijs/langs/json'),
};

/** The languages configured for the highlighter (`text` is handled by Shiki without a bundled grammar). */
export type SupportedLanguage = keyof typeof bundledLanguages | "text";

/** A preloaded highlighter instance. */
export const highlighter = createHighlighterCore({
  themes: [
    import("@shikijs/themes/github-light-default"),
    import("@shikijs/themes/vesper"),
  ],
  langs: Object.entries(bundledLanguages).map(([_, lang]) => lang),
  engine: createJavaScriptRegexEngine(),
});