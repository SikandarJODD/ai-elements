import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "chain-of-thought",
	title: "Chain of Thought",
	description:
		"The Chain Of Thought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators.",
};

const seo: SEO = {
	title: "Chain of Thought",
	description:
		"The Chain Of Thought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators.",
	keywords: ["Svelte", "Chain of Thought", "AI reasoning", "Svelte AI Elements"],
};

const examples: Example[] = [];

export const data: ComponentDoc = {
	...meta,
	preview: Basic,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	examples,
	props: [
		{
			name: "ChainOfThought",
			props: [
				{
					name: "open",
					type: "boolean",
					description: "Controls whether the chain of thought is expanded (bindable)",
				},
				{
					name: "defaultOpen",
					type: "boolean",
					default: "false",
					description: "Whether the chain of thought is expanded by default",
				},
				{
					name: "onOpenChange",
					type: "(open: boolean) => void",
					description: "Callback function called when the open state changes",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components (typically ChainOfThoughtHeader and ChainOfThoughtContent)",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ChainOfThoughtHeader",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the header trigger",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Custom content to render instead of the default 'Chain of Thought' text",
				},
			],
		},
		{
			name: "ChainOfThoughtContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Chain of thought steps and content to display when expanded",
				},
			],
		},
		{
			name: "ChainOfThoughtStep",
			props: [
				{
					name: "label",
					type: "string",
					description: "The main label/title for the step",
				},
				{
					name: "icon",
					type: "typeof Icon",
					description: "Lucide icon component to display for the step",
				},
				{
					name: "description",
					type: "string",
					description: "Optional description text for the step",
				},
				{
					name: "status",
					type: "'complete' | 'active' | 'pending'",
					default: "'complete'",
					description: "Visual status of the step",
				},
				{
					name: "delay",
					type: "number",
					description:
						"Custom animation delay in milliseconds (defaults to 150ms * step index)",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the step",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Additional content to display within the step",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ChainOfThoughtImage",
			props: [
				{
					name: "caption",
					type: "string",
					description: "Caption text to display below the image",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the image container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Image element or content to display",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ChainOfThoughtSearchResults",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the search results container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "ChainOfThoughtSearchResult components to display",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ChainOfThoughtSearchResult",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the search result badge",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Content to display in the search result badge",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLElement>",
					description: "All other Badge component props are supported",
				},
			],
		},
	],
};
