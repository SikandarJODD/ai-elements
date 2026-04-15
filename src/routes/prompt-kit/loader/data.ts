import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import LoaderSizesExample from "./examples/loader-sizes-example.svelte";
import LoaderSizesExampleRaw from "./examples/loader-sizes-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "loader",
	title: "Loader",
	description:
		"A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Loader",
	description:
		"A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.",
	keywords: ["Svelte", "Loader", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Size",
		preview: LoaderSizesExample,
		code: {
			filename: "loader-sizes-example.svelte",
			filecode: LoaderSizesExampleRaw,
			lang: "svelte",
		},
	},
];

const loaderProps = [
	{
		name: "variant",
		type: '"circular" | "classic" | "pulse" | "pulse-dot" | "dots" | "typing" | "wave" | "bars" | "terminal" | "text-blink" | "text-shimmer" | "loading-dots"',
		default: '"circular"',
		description: "The visual style of the loader",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		default: '"md"',
		description: "The size of the loader",
	},
	{
		name: "text",
		type: "string",
		description: "Text to display (for supported variants)",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
];
export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "loader-preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "Loader",
			props: loaderProps,
		},
	],
};
