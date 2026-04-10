import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "response",
	title: "Response",
	description:
		"The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.",
};

const seo: SEO = {
	title: "Response",
	description:
		"The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.",
	keywords: ["Svelte", "Response", "Markdown", "Svelte AI Elements"],
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
			name: "Response",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the response container",
				},
				{
					name: "content",
					type: "string",
					description: "Markdown content to render",
				},
				{
					name: "shikiTheme",
					type: "string",
					description: "Shiki theme for code syntax highlighting",
				},
				{
					name: "baseTheme",
					type: "string",
					default: "'shadcn'",
					description: "Base theme for markdown styling",
				},
				{
					name: "...restProps",
					type: "StreamdownProps",
					description: "All other Streamdown component props are supported",
				},
			],
		},
	],
};
