import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import Markdown from "./examples/markdown.svelte";
import MarkdownRaw from "./examples/markdown.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "reasoning",
	title: "Reasoning",
	description:
		"A collapsible component for showing AI reasoning, explanations, or logic. You can control it manually or let it auto-close when the stream ends. Markdown is supported.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Reasoning",
	description:
		"A collapsible component for showing AI reasoning, explanations, or logic. You can control it manually or let it auto-close when the stream ends. Markdown is supported.",
	keywords: ["Svelte", "Reasoning", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "With Markdown",
		description:
			"Show rich formatting with markdown support for better structured reasoning content.",
		preview: Markdown,
		code: {
			filename: "markdown.svelte",
			filecode: MarkdownRaw,
			lang: "svelte",
		},
	},
];

const reasoningProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The content of the component",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "open",
		type: "boolean",
		description: "Control the open state and make the component controlled",
	},
	{
		name: "onOpenChange",
		type: "(open: boolean) => void",
		description: "Callback fired when the open state changes",
	},
	{
		name: "isStreaming",
		type: "boolean",
		default: "false",
		description: "Automatically opens while streaming and closes when streaming ends",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "Additional HTML div props",
	},
];

const reasoningTriggerProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The trigger label or content",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "onclick",
		type: "(event: MouseEvent) => void",
		description: "Optional click handler called after the toggle behavior",
	},
	{
		name: "...props",
		type: "HTMLButtonAttributes",
		description: "Additional HTML button props",
	},
];

const reasoningContentProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to render when you are not using the content prop",
	},
	{
		name: "content",
		type: "string",
		description: "String content used for streaming or markdown rendering",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes for the outer container",
	},
	{
		name: "contentClassName",
		type: "string",
		description: "Additional CSS classes for the inner content wrapper",
	},
	{
		name: "markdown",
		type: "boolean",
		default: "false",
		description: "Enable markdown rendering for the content prop",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "Additional HTML div props",
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
			name: "Reasoning",
			props: reasoningProps,
		},
		{
			name: "ReasoningTrigger",
			props: reasoningTriggerProps,
		},
		{
			name: "ReasoningContent",
			props: reasoningContentProps,
		},
	],
};
