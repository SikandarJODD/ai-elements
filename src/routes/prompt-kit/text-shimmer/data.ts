import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import CustomExample from "./examples/custom-example.svelte";
import CustomExampleRaw from "./examples/custom-example.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "text-shimmer",
	title: "Text Shimmer",
	description: "A component to display the thinking state of an AI model with optional actions.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Text Shimmer",
	description: "A component to display the thinking state of an AI model with optional actions.",
	keywords: ["Svelte", "Text Shimmer", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
    {
        name: "Custom Text Shimmer",
        preview: CustomExample,
        code: {
            filename: "CustomExample.svelte",
            filecode: CustomExampleRaw,
            lang: "svelte",
        },
    }
];
const textShimmerProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to display with shimmer effect",
	},
	{
		name: "as",
		type: "keyof HTMLElementTagNameMap",
		default: '"span"',
		description: "HTML element to render as",
	},
	{
		name: "duration",
		type: "number",
		default: "4",
		description: "Animation duration in seconds",
	},
	{
		name: "spread",
		type: "number",
		default: "20",
		description: "Spread of shimmer highlight (5-45)",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLElement>",
		description: "All other element props are supported",
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
		lang: "svelte",
	},
	props: [
		{
			name: "Text Shimmer",
			props: textShimmerProps,
		},
	],
};
