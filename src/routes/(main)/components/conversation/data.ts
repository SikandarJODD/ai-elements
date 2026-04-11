import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "conversation",
	title: "Conversation",
	description:
		"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
};

const seo: SEO = {
	title: "Conversation",
	description:
		"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
	keywords: ["Svelte", "Conversation", "Chat", "Svelte AI Elements"],
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
			name: "Conversation",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the conversation container",
				},
				{
					name: "initial",
					type: "ScrollBehavior",
					default: "'smooth'",
					description: "Scroll behavior for initial scroll to bottom ('auto' | 'smooth')",
				},
				{
					name: "resize",
					type: "ScrollBehavior",
					default: "'smooth'",
					description: "Scroll behavior when container resizes ('auto' | 'smooth')",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components (typically ConversationContent and ConversationScrollButton)",
				},
				{
					name: "ref",
					type: "HTMLDivElement",
					description: "Bindable reference to the conversation container element",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ConversationContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Message components to render in the conversation",
				},
				{
					name: "ref",
					type: "HTMLDivElement",
					description: "Bindable reference to the content container element",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ConversationEmptyState",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the empty state container",
				},
				{
					name: "title",
					type: "string",
					default: "'No messages yet'",
					description: "Title text to display in the empty state",
				},
				{
					name: "description",
					type: "string",
					default: "'Start a conversation to see messages here'",
					description: "Description text to display in the empty state",
				},
				{
					name: "icon",
					type: "Snippet",
					description: "Custom icon snippet to display above the title",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to replace the default empty state layout",
				},
				{
					name: "ref",
					type: "HTMLDivElement",
					description: "Bindable reference to the empty state container element",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ConversationScrollButton",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the scroll button",
				},
				{
					name: "onclick",
					type: "MouseEventHandler<HTMLButtonElement>",
					description: "Click handler for the scroll button",
				},
				{
					name: "...restProps",
					type: "ButtonProps",
					description: "All other Button component props are supported",
				},
			],
		},
	],
};
