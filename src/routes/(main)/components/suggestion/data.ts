import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import Preview from "./examples/preview.svelte";

export const meta: ComponentMeta = {
	id: "suggestion",
	title: "Suggestion",
	description:
		"The Suggestion component displays a horizontal row of clickable suggestions for user interaction."
};

const seo: SEO = {
	title: "Suggestion",
	description:
		"The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
	keywords: ["Svelte", "Suggestion", "Prompt suggestions", "Svelte AI Elements"],
};

export const data: ComponentDoc = {
	...meta,
	preview: Preview,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	props: [
		{
			name: "Suggestion",
			props: [
				{
					name: "suggestion",
					type: "string",
					description: "The suggestion text to display and pass to the onclick handler",
				},
				{
					name: "onclick",
					type: "(suggestion: string) => void",
					description:
						"Callback fired when the suggestion is clicked and receives the suggestion text",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render instead of the suggestion text",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the suggestion button",
				},
				{
					name: "variant",
					type: "ButtonProps['variant']",
					default: "'outline'",
					description: "Button variant style",
				},
				{
					name: "size",
					type: "ButtonProps['size']",
					default: "'sm'",
					description: "Button size",
				},
				{
					name: "...restProps",
					type: "ButtonProps",
					description: "All other Button component props are supported",
				},
			],
		},
		{
			name: "Suggestions",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Suggestion components to render in the scrollable container",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the suggestions container",
				},
				{
					name: "orientation",
					type: "'vertical' | 'horizontal' | 'both'",
					default: "'horizontal'",
					description: "Scroll direction for the suggestions container",
				},
				{
					name: "scrollbarXClasses",
					type: "string",
					description: "Custom CSS classes for the horizontal scrollbar",
				},
				{
					name: "scrollbarYClasses",
					type: "string",
					description: "Custom CSS classes for the vertical scrollbar",
				},
				{
					name: "...restProps",
					type: "ScrollAreaProps",
					description: "All other ScrollArea component props are supported",
				},
			],
		},
	],
};
