import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import Custom from "./examples/custom.svelte";
import CustomRaw from "./examples/custom.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "source",
	title: "Source",
	description:
		"Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Source",
	description:
		"Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.",
	keywords: ["Svelte", "Source", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Custom Source",
		description:
			"Customize the appearance and labels of the source components. You can use custom labels, numbers, or combine them with favicons.",
		preview: Custom,
		code: {
			filename: "custom.svelte",
			filecode: CustomRaw,
			lang: "svelte",
		},
	},
];

const sourceProps = [
	{
		name: "href",
		type: "string",
		description: "The URL of the source",
	},
	{
		name: "children",
		type: "Snippet",
		description: "The content to display",
	},
];

const sourceTriggerProps = [
	{
		name: "label",
		type: "string | number",
		description: "The label to display",
	},
	{
		name: "showFavicon",
		type: "boolean",
		default: "false",
		description: "Whether to show the favicon",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
];

const sourceContentProps = [
	{
		name: "title",
		type: "string",
		description: "The title to display",
	},
	{
		name: "description",
		type: "string",
		description: "The description to display",
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
		filename: "preview.svelte",
		filecode: PreviewRaw,
		lang: "svelte",
	},
	props: [
		{
			name: "Source",
			props: sourceProps,
		},
		{
			name: "SourceTrigger",
			props: sourceTriggerProps,
		},
		{
			name: "SourceContent",
			props: sourceContentProps,
		},
	],
};
