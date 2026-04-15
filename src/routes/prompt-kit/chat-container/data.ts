import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import StreamingExample from "./examples/streaming-example.svelte";
import StreamingExampleRaw from "./examples/streaming-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "chat-container",
	title: "Chat Container",
	description:
		"A component for creating chat interfaces with intelligent auto-scrolling behavior, designed to provide a smooth experience in conversation interfaces.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Chat Container",
	description:
		"A component for creating chat interfaces with intelligent auto-scrolling behavior, designed to provide a smooth experience in conversation interfaces.",
	keywords: ["Svelte", "Chat Container", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};
// Component API Props Data
const chatContainerRootProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components to render inside the container",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props",
	},
];

const chatContainerContentProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components to render inside the content container",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props",
	},
];

const chatContainerScrollAnchorProps = [
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props",
	},
];
const examples: Example[] = [
	{
		name: "Streaming Example",
		preview: StreamingExample,
		code: {
			filename: "streaming-example.svelte",
			filecode: StreamingExampleRaw,
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "chat-container-preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "ChatContainer Root",
			props: chatContainerRootProps,
		},
		{
			name: "ChatContainer Content",
			props: chatContainerContentProps,
		},
		{
			name: "ChatContainer Scroll Anchor",
			props: chatContainerScrollAnchorProps,
		},
	],
};
