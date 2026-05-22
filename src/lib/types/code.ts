import type { SupportedLanguage } from "$lib/components/ui/code/shiki";

export type CodeBlock = {
  name: string;
  code: string;
  lang?: SupportedLanguage;
  isExpand?: boolean;
  highlight?: (number | [number, number])[];
  hideLines?: boolean;
};