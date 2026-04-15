import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import MarkdownExample from "./examples/markdown.svelte";
import MarkdownExampleRaw from "./examples/markdown.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithActions from "./examples/with-actions.svelte";
import WithActionsRaw from "./examples/with-actions.svelte?raw";

export const meta: ComponentMeta = {
	id: "message",
	title: "Message",
	description:
		"A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Message",
	description:
		"A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.",
	keywords: ["Svelte", "Message", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Markdown",
		description:
			'The "markdown" prop enables rendering content as Markdown, perfect for rich text formatting in messages.',
		preview: MarkdownExample,
		code: {
			filename: "markdown.svelte",
			filecode: MarkdownExampleRaw,
			lang: "svelte",
		},
	},
	{
		name: "With Actions",
		description:
			'Use "MessageActions" and "MessageAction" to add interactive elements to your messages.',
		preview: WithActions,
		code: {
			filename: "with-actions.svelte",
			filecode: WithActionsRaw,
			lang: "svelte",
		},
	},
];

const messageProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components rendered inside the message container",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const messageAvatarProps = [
	{
		name: "src",
		type: "string",
		description: "URL of the avatar image",
	},
	{
		name: "alt",
		type: "string",
		description: "Alt text for the avatar image",
	},
	{
		name: "fallback",
		type: "string",
		description: "Text displayed if the image fails to load",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

const messageContentProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content rendered when not using the string-based markdown mode",
	},
	{
		name: "content",
		type: "string",
		description: 'String content rendered by the Markdown component when "markdown" is true',
	},
	{
		name: "markdown",
		type: "boolean",
		default: "false",
		description: "Whether to render the content as markdown",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const messageActionsProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components rendered inside the actions row",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const messageActionProps = [
	{
		name: "tooltip",
		type: "Snippet",
		description: "Content shown inside the tooltip",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child component that triggers the tooltip",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes for the tooltip content",
	},
	{
		name: "side",
		type: '"top" | "bottom" | "left" | "right"',
		default: '"top"',
		description: "Position of the tooltip relative to the trigger",
	},
	{
		name: "...props",
		type: "TooltipPrimitive.RootProps",
		description: "All other tooltip root props are supported",
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
			name: "Message",
			props: messageProps,
		},
		{
			name: "MessageAvatar",
			props: messageAvatarProps,
		},
		{
			name: "MessageContent",
			props: messageContentProps,
		},
		{
			name: "MessageActions",
			props: messageActionsProps,
		},
		{
			name: "MessageAction",
			props: messageActionProps,
		},
	],
};
