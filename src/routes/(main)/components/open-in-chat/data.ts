import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "open-in-chat",
	title: "Open In Chat",
	description:
		"The OpenIn component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click.",
};

const seo: SEO = {
	title: "Open In Chat",
	description:
		"The OpenIn component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click.",
	keywords: ["Svelte", "Open In Chat", "AI chat", "Svelte AI Elements"],
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
			name: "OpenIn",
			props: [
				{
					name: "query",
					type: "string",
					description: "The prompt text to open in the selected chat provider",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components, typically OpenInTrigger and OpenInContent",
				},
			],
		},
		{
			name: "OpenInTrigger",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the trigger",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom trigger content",
				},
			],
		},
		{
			name: "OpenInContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the dropdown content",
				},
				{
					name: "align",
					type: "'start' | 'center' | 'end'",
					default: "'start'",
					description: "Alignment of the dropdown content",
				},
				{
					name: "preventScroll",
					type: "boolean",
					default: "true",
					description: "Whether to prevent scrolling while the dropdown is open",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Dropdown content, typically OpenInItem, OpenInLabel, and OpenInSeparator",
				},
			],
		},
		{
			name: "OpenInItem",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the item",
				},
				{
					name: "onclick",
					type: "() => void",
					description: "Click handler for the item",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Item content",
				},
			],
		},
		{
			name: "OpenInLabel",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the label",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Label content",
				},
			],
		},
		{
			name: "OpenInSeparator",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the separator",
				},
			],
		},
		{
			name: "OpenInChatGPT",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the ChatGPT menu item",
				},
			],
		},
		{
			name: "OpenInClaude",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the Claude menu item",
				},
			],
		},
		{
			name: "OpenInV0",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the V0 menu item",
				},
			],
		},
		{
			name: "OpenInScira",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the Scira menu item",
				},
			],
		},
		{
			name: "OpenInT3",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the T3 menu item",
				},
			],
		},
	],
};
