import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import MessageAction from "./examples/message-action.svelte";
import messageActionRaw from "./examples/message-action.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";

export const meta: ComponentMeta = {
	id: "action",
	title: "Actions",
	description:
		"Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Actions",
	description:
		"Learn how to create Actions in Svelte to enhance user interactions and functionality in your applications. Explore pre-built actions and how to implement them effectively.",
	keywords: ["Svelte", "Actions", "Svelte AI Elements"],
};

const examples: Example[] = [
	{
		name: "Message Action",
		preview: MessageAction,
		code: {
			filename: "message-action.svelte",
			filecode: messageActionRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
];

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
			name: "Actions",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Child Action components to render",
				},
				{
					name: "class",
					type: "string",
					default: "''",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "Action",
			props: [
				{
					name: "tooltip",
					type: "string",
					description: "Tooltip text to display on hover",
				},
				{
					name: "label",
					type: "string",
					description:
						"Accessible label for screen readers (falls back to tooltip if not provided)",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Icon or content to render inside the button",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the button",
				},
				{
					name: "variant",
					type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					default: "'ghost'",
					description: "Visual style variant of the button",
				},
				{
					name: "size",
					type: "'default' | 'sm' | 'lg' | 'icon'",
					default: "'sm'",
					description: "Size of the button",
				},
				{
					name: "onclick",
					type: "(event: MouseEvent) => void",
					description: "Click event handler",
				},
				{
					name: "disabled",
					type: "boolean",
					description: "Whether the button is disabled",
				},
				{
					name: "...restProps",
					type: "HTMLButtonAttributes | HTMLAnchorAttributes",
					description: "All other button/anchor props are supported (href for links)",
				},
			],
		},
	],
};

