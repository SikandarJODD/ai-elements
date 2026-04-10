import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "tool",
	title: "Tool",
	description:
		"The Tool component displays a collapsible interface for showing and hiding tool details from AI SDK tool parts.",
};

const seo: SEO = {
	title: "Tool",
	description:
		"The Tool component displays a collapsible interface for showing and hiding tool details from AI SDK tool parts.",
	keywords: ["Svelte", "Tool", "AI SDK", "Svelte AI Elements"],
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
			name: "Tool",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the tool container",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components, typically ToolHeader, ToolInput, ToolOutput, and ToolContent",
				},
				{
					name: "...restProps",
					type: "CollapsibleProps",
					description: "All other Collapsible component props are supported",
				},
			],
		},
		{
			name: "ToolHeader",
			props: [
				{
					name: "type",
					type: "string",
					description: "The name or type of the tool being executed",
				},
				{
					name: "state",
					type: "'input-streaming' | 'input-available' | 'output-available' | 'output-error'",
					description: "Current state of the tool execution",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the header",
				},
				{
					name: "...restProps",
					type: "CollapsibleTriggerProps",
					description: "All other CollapsibleTrigger component props are supported",
				},
			],
		},
		{
			name: "ToolInput",
			props: [
				{
					name: "input",
					type: "any",
					description: "The input parameters passed to the tool",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the input container",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ToolOutput",
			props: [
				{
					name: "output",
					type: "any",
					description: "The output result from the tool execution",
				},
				{
					name: "errorText",
					type: "string",
					description: "Error message to display if the tool execution failed",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the output container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render instead of the default output display",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "ToolContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to display in the collapsible area",
				},
				{
					name: "...restProps",
					type: "CollapsibleContentProps",
					description: "All other CollapsibleContent component props are supported",
				},
			],
		},
	],
};
