import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";
import WithDialog from "./examples/with-dialog.svelte";
import withDialogRaw from "./examples/with-dialog.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "model-selector",
	title: "Model Selector",
	description:
		"A searchable command palette for selecting AI models with provider logos and multi-provider support.",
};

const seo: SEO = {
	title: "Model Selector",
	description:
		"A searchable command palette for selecting AI models with provider logos and multi-provider support.",
	keywords: ["Svelte", "Model Selector", "AI models", "Svelte AI Elements"],
};

const examples: Example[] = [
	{
		name: "With Dialog",
		preview: WithDialog,
		code: {
			filename: "with-dialog.svelte",
			filecode: withDialogRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
];

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
			name: "ModelSelector",
			props: [
				{
					name: "open",
					type: "boolean",
					description: "Controlled open state and is bindable",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Selector content",
				},
			],
		},
		{
			name: "ModelSelectorDialog",
			props: [
				{
					name: "open",
					type: "boolean",
					description: "Controlled open state and is bindable",
				},
				{
					name: "title",
					type: "string",
					default: '"Model Selector"',
					description: "Dialog title",
				},
				{
					name: "description",
					type: "string",
					default: '"Search for a model"',
					description: "Dialog description",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Dialog content",
				},
			],
		},
		{
			name: "ModelSelectorLogo",
			props: [
				{
					name: "provider",
					type: "string",
					description: 'Provider slug, for example "openai" or "anthropic"',
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
				},
			],
		},
		{
			name: "ModelSelectorGroup",
			props: [
				{
					name: "heading",
					type: "string",
					description: "Group heading text",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Group items",
				},
			],
		},
		{
			name: "ModelSelectorItem",
			props: [
				{
					name: "value",
					type: "string",
					description: "Item value for search and selection",
				},
				{
					name: "onSelect",
					type: "() => void",
					description: "Callback when the item is selected",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Item content",
				},
			],
		},
	],
};
