import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "queue",
	title: "Queue",
	description:
		"A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.",
};

const seo: SEO = {
	title: "Queue",
	description:
		"A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.",
	keywords: ["Svelte", "Queue", "Task lists", "Svelte AI Elements"],
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
			name: "Queue",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "QueueSection",
			props: [
				{
					name: "defaultOpen",
					type: "boolean",
					default: "true",
					description: "Whether the section is open by default",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components",
				},
				{
					name: "...restProps",
					type: "CollapsibleProps",
					description: "All other Collapsible props are supported",
				},
			],
		},
		{
			name: "QueueItem",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components",
				},
				{
					name: "...restProps",
					type: "HTMLLiAttributes",
					description: "All other li props are supported",
				},
			],
		},
		{
			name: "QueueItemIndicator",
			props: [
				{
					name: "completed",
					type: "boolean",
					default: "false",
					description: "Whether the item is completed",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
				},
			],
		},
		{
			name: "QueueItemContent",
			props: [
				{
					name: "completed",
					type: "boolean",
					default: "false",
					description: "Whether the item is completed",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Content to display",
				},
			],
		},
	],
};
