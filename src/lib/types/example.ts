import type { Component } from "svelte";
import type { CodeBlock } from "./code";

export type Example = {
  name: string;
  description?: string;
  preview: Component;
  code: CodeBlock | CodeBlock[];
  previewClass?: string;
};