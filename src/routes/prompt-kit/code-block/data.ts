import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import ThemeExample from "./examples/theme-example.svelte";
import ThemeExampleRaw from "./examples/theme-example.svelte?raw";
import WithHeaderExample from "./examples/with-header-example.svelte";
import WithHeaderExampleRaw from "./examples/with-header-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "code-block",
	title: "Code Block",
	description:
		"A component for displaying code snippets with syntax highlighting and customizable styling.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Code Block",
	description:
		"A component for displaying code snippets with syntax highlighting and customizable styling.",
	keywords: ["Svelte", "Code Block", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Theme",
		preview: ThemeExample,
		code: {
			filename: "theme-example.svelte",
			filecode: ThemeExampleRaw,
		},
	},
	{
		name: "Header",
		preview: WithHeaderExample,
		code: {
			filename: "with-header-example.svelte",
			filecode: WithHeaderExampleRaw,
		},
	},
];

// Component API Props Data
const codeBlockProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components to render",
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

const codeBlockCodeProps = [
	{
		name: "code",
		type: "string",
		description: "The code to display and highlight",
	},
	{
		name: "language",
		type: "string",
		default: '"tsx"',
		description: "The language for syntax highlighting",
	},
	{
		name: "theme",
		type: "string",
		default: '"github-light"',
		description: "The theme for syntax highlighting",
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

const codeBlockGroupProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components to render",
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

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "code-block-preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "Code Block",
			props: codeBlockProps,
		},
		{
			name: "Code Block Code",
			props: codeBlockCodeProps,
		},
		{
			name: "Code Block Group",
			props: codeBlockGroupProps,
		},
	],
};
