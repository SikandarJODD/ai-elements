import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "sources",
	title: "Sources",
	description:
		"The Sources component allows a user to view the sources or citations used to generate a response.",
};

const seo: SEO = {
	title: "Sources",
	description:
		"The Sources component allows a user to view the sources or citations used to generate a response.",
	keywords: ["Svelte", "Sources", "Citations", "Svelte AI Elements"],
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
			name: "Sources",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the sources container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components, typically SourcesTrigger and SourcesContent",
				},
				{
					name: "...restProps",
					type: "CollapsibleProps",
					description: "All other Collapsible component props are supported",
				},
			],
		},
		{
			name: "SourcesTrigger",
			props: [
				{
					name: "count",
					type: "number",
					description: "Number of sources to display in the trigger text",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the trigger button",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render instead of the default trigger text",
				},
				{
					name: "...restProps",
					type: "CollapsibleTriggerProps",
					description: "All other CollapsibleTrigger component props are supported",
				},
			],
		},
		{
			name: "SourcesContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Source components to display when expanded",
				},
				{
					name: "...restProps",
					type: "CollapsibleContentProps",
					description: "All other CollapsibleContent component props are supported",
				},
			],
		},
		{
			name: "Source",
			props: [
				{
					name: "href",
					type: "string",
					description: "URL of the source that opens in a new tab",
				},
				{
					name: "title",
					type: "string",
					description: "Title or name of the source to display",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the source link",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render instead of the default icon and title",
				},
				{
					name: "...restProps",
					type: "HTMLAnchorAttributes",
					description: "All other anchor element props are supported",
				},
			],
		},
	],
};
