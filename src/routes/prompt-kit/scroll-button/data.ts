import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";

import Basic from "./examples/basic.svelte";
import BasicRaw from "./examples/basic.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithChat from "./examples/with-chat.svelte";
import WithChatRaw from "./examples/with-chat.svelte?raw";

export const meta: ComponentMeta = {
	id: "scroll-button",
	title: "Scroll Button",
	description:
		"A minimal floating button that appears when the user scrolls up, allowing them to jump back to the bottom of the chat.",
	category: "utilities",
};

const seo: SEO = {
	title: "Scroll Button",
	description:
		"A minimal floating button that appears when the user scrolls up, allowing them to jump back to the bottom of the chat.",
	keywords: ["Svelte", "Scroll Button", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Basic",
		preview: Basic,
		code: {
			filename: "basic.svelte",
			filecode: BasicRaw,
		},
	},
	{
		name: "Chat Messages",
		preview: WithChat,
		code: {
			filename: "with-chat.svelte",
			filecode: WithChatRaw,
		},
	},
];

// Component API Props Data
const scrollButtonProps = [
	{
		name: "variant",
		type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive"',
		default: '"outline"',
		description: "The visual style of the button",
	},
	{
		name: "size",
		type: '"default" | "sm" | "lg" | "icon"',
		default: '"sm"',
		description: "The size of the button",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes for custom styling",
	},
	{
		name: "ref",
		type: "HTMLElement | null",
		description: "Reference to the button element",
	},
	{
		name: "onclick",
		type: "(event: MouseEvent) => void",
		description: "Click event handler",
	},
];

const scrollContextFunctions = [
	{
		name: "setScrollContext()",
		type: "() => ScrollContext",
		description: "Creates and sets the scroll context. Must be called in a parent component.",
	},
	{
		name: "getScrollContext()",
		type: "() => ScrollContext",
		description: "Retrieves the scroll context. Used internally by ScrollButton.",
	},
	{
		name: "scrollContext.setElement()",
		type: "(element: HTMLElement | null) => void",
		description: "Sets the scrollable container element to monitor.",
	},
	{
		name: "scrollContext.scrollToBottom()",
		type: "(behavior?: ScrollBehavior) => void",
		description:
			"Scrolls the container to the bottom with optional behavior ('smooth' or 'instant').",
	},
	{
		name: "scrollContext.isAtBottom",
		type: "boolean",
		description: "Reactive state indicating if the container is scrolled to the bottom.",
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
	},
	examples,
	props: [
		{
			name: "Scroll Button",
			props: scrollButtonProps,
		},
		{
			name: "Scroll Context",
			props: scrollContextFunctions,
		},
	],
};
