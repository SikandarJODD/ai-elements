import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "loader",
	title: "Loader",
	description:
		"The Loader component provides a spinning animation to indicate loading states in your AI applications. It includes both a customizable wrapper component and the underlying icon for flexible usage.",
};

const seo: SEO = {
	title: "Loader",
	description:
		"The Loader component provides a spinning animation to indicate loading states in your AI applications. It includes both a customizable wrapper component and the underlying icon for flexible usage.",
	keywords: ["Svelte", "Loader", "Loading states", "Svelte AI Elements"],
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
			name: "Loader",
			props: [
				{
					name: "size",
					type: "number",
					default: "16",
					description: "Size of the loader icon in pixels",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the loader container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "LoaderIcon",
			props: [
				{
					name: "size",
					type: "number",
					default: "16",
					description: "Size of the loader icon in pixels",
				},
			],
		},
	],
};
