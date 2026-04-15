import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import Basic from "./examples/basic.svelte";
import BasicRaw from "./examples/basic.svelte?raw";
import StopExample from "./examples/stop-example.svelte";
import StopExampleRaw from "./examples/stop-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "thinking-bar",
	title: "Thinking Bar",
	description: "A component to display the thinking state of an AI model with optional actions.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Thinking Bar",
	description: "A component to display the thinking state of an AI model with optional actions.",
	keywords: ["Svelte", "Thinking Bar", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Stop Example",
		preview: StopExample,
		code: {
			filename: "stop-example.svelte",
			filecode: StopExampleRaw,
			lang: "svelte",
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Basic,
	previewCode: {
		filename: "basic-example.svelte",
		filecode: BasicRaw,
		lang: "svelte",
	},
	props: [
		{
			name: "Thinking bar",
			props: [
				{
					name: "text",
					type: "string",
					default: "'Thinking...'",
					description: "The text to display",
				},
				{
					name: "stopLabel",
					type: "string",
					default: "'Answer now'",
					description: "The label for the stop button",
				},
				{
					name: "onStop",
					type: "() => void",
					description: "Callback function when the stop button is clicked",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes",
					default: "''",
				},
				{
					name: "onclick",
					type: "() => void",
					description: "Callback function when the thinking bar is clicked",
				},
			],
		},
	],
};
