import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "shimmer",
	title: "Shimmer",
	description:
		"An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
};

const seo: SEO = {
	title: "Shimmer",
	description:
		"An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
	keywords: ["Svelte", "Shimmer", "Loading states", "Svelte AI Elements"],
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
			name: "Shimmer",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "The text content to display with the shimmer effect",
				},
				{
					name: "content_length",
					type: "number",
					default: "30",
					description: "Approximate content length used to calculate shimmer spread",
				},
				{
					name: "as",
					type: "keyof HTMLElementTagNameMap",
					default: '"p"',
					description: "The HTML element to render as",
				},
				{
					name: "duration",
					type: "number",
					default: "2",
					description: "Animation duration in seconds",
				},
				{
					name: "spread",
					type: "number",
					default: "2",
					description: "Shimmer spread multiplier where higher means a wider shimmer",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLElement>",
					description: "All other HTML element props are supported",
				},
			],
		},
	],
};
