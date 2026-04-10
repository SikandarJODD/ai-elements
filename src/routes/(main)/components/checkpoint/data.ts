import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "checkpoint",
	title: "Checkpoint",
	description:
		"A simple component for marking conversation history points and restoring the chat to a previous state.",
};

const seo: SEO = {
	title: "Checkpoint",
	description:
		"A simple component for marking conversation history points and restoring the chat to a previous state. Inspired by VSCode's Copilot checkpoint feature.",
	keywords: ["Svelte", "Checkpoint", "Conversation history", "Svelte AI Elements"],
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
			name: "Checkpoint",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components (CheckpointIcon, CheckpointTrigger)",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "CheckpointIcon",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the icon",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom icon content (overrides default icon)",
				},
				{
					name: "size",
					type: "number",
					default: "16",
					description: "Size of the icon in pixels",
				},
			],
		},
		{
			name: "CheckpointTrigger",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the button",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Button content",
				},
				{
					name: "variant",
					type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					default: "'ghost'",
					description: "Button variant style",
				},
				{
					name: "size",
					type: "'default' | 'sm' | 'lg' | 'icon'",
					default: "'sm'",
					description: "Button size",
				},
				{
					name: "tooltip",
					type: "string",
					description: "Optional tooltip text to display on hover",
				},
				{
					name: "onclick",
					type: "(e: MouseEvent) => void",
					description: "Click handler function",
				},
				{
					name: "disabled",
					type: "boolean",
					default: "false",
					description: "Whether the button is disabled",
				},
			],
		},
	],
};
