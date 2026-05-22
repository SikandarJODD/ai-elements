import type { Component } from "svelte";
import type { Example } from "./example";
import type { SEO } from "./seo";
import type { CodeBlock } from "./code";

export type ComponentBadge = "new" | "beta" | "updated" | "deprecated";

export type ComponentMeta = {
  id: string;
  title: string;
  description: string;
  category?: string;
  badge?: ComponentBadge;
};

export type PropDef = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description?: string;
};

export type PropsTable = {
  name?: string;
  desc?: string;
  props: PropDef[];
};

export type InstallComponentDocs = {
  install_code?: CodeBlock | CodeBlock[];
  tailwind?: CodeBlock;
  folder_structure?: string;
  packages?: string[];
  shadcn_components?: string[]; // button, card etc..
};

export type ComponentDoc = ComponentMeta & {
  preview?: Component;
  preview_code?: CodeBlock | CodeBlock[];
  preview_class?: string;
  install_block?: InstallComponentDocs;
  examples?: Example[];
  seo: SEO;
  props?: PropsTable[];
  folder_structure?: string;
};