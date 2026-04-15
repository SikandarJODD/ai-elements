import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "markdown",
	title: "Markdown",
	description:
		"A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.",
	category: "utilities",
};

const seo: SEO = {
	title: "Markdown",
	description:
		"A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.",
	keywords: ["Svelte", "Markdown", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

export const data: ComponentDoc = {
	...meta,
	seo,
    preview: Preview,
    previewCode: {
        filename: "preview.svelte",
        filecode: PreviewRaw,
    }
};
