import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "code",
	title: "Code Block",
	description:
		"The CodeBlock component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
};

const seo: SEO = {
	title: "Code Block",
	description:
		"The CodeBlock component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
	keywords: ["Svelte", "Code Block", "Syntax Highlighting", "Svelte AI Elements"],
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
			name: "Code",
			props: [
				{
					name: "code",
					type: "string",
					description: "The code string to syntax highlight and display (required)",
				},
				{
					name: "lang",
					type: "SupportedLanguage",
					default: "'typescript'",
					description: "Programming language for syntax highlighting",
				},
				{
					name: "variant",
					type: "'default' | 'ghost'",
					default: "'default'",
					description: "Visual style variant of the code block",
				},
				{
					name: "hideLines",
					type: "boolean",
					default: "false",
					description: "Whether to hide line numbers",
				},
				{
					name: "highlight",
					type: "(number | [number, number])[]",
					default: "[]",
					description:
						"Array of line numbers or ranges to highlight (e.g., [1, [3, 5], 7])",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the code container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components (typically CodeCopyButton or CodeOverflow)",
				},
				{
					name: "ref",
					type: "HTMLDivElement",
					description: "Bindable reference to the code container element",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "CodeCopyButton",
			props: [
				{
					name: "variant",
					type: "ButtonProps['variant']",
					default: "'ghost'",
					description: "Button variant style",
				},
				{
					name: "size",
					type: "ButtonProps['size']",
					default: "'icon'",
					description: "Button size",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the copy button",
				},
				{
					name: "ref",
					type: "HTMLButtonElement",
					description: "Bindable reference to the button element",
				},
				{
					name: "...restProps",
					type: "CopyButtonProps",
					description: "All other CopyButton component props are supported",
				},
			],
		},
		{
			name: "CodeOverflow",
			props: [
				{
					name: "collapsed",
					type: "boolean",
					default: "true",
					description: "Whether the code block is collapsed (bindable)",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the overflow container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Code content to render with overflow control",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
	],
};
