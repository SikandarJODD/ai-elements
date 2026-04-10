import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "task",
	title: "Task",
	description:
		"The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking.",
};

const seo: SEO = {
	title: "Task",
	description:
		"The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking.",
	keywords: ["Svelte", "Task", "Workflow progress", "Svelte AI Elements"],
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
			name: "Task",
			props: [
				{
					name: "open",
					type: "boolean",
					default: "true",
					description: "Controls whether the task is expanded or collapsed",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the task container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components, typically TaskTrigger and TaskContent",
				},
				{
					name: "...restProps",
					type: "CollapsibleProps",
					description: "All other Collapsible component props are supported",
				},
			],
		},
		{
			name: "TaskTrigger",
			props: [
				{
					name: "title",
					type: "string",
					description: "The title text to display in the trigger",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the trigger",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content to render instead of the default trigger layout",
				},
				{
					name: "...restProps",
					type: "CollapsibleTriggerProps",
					description: "All other CollapsibleTrigger component props are supported",
				},
			],
		},
		{
			name: "TaskContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Task items to display when expanded",
				},
				{
					name: "...restProps",
					type: "CollapsibleContentProps",
					description: "All other CollapsibleContent component props are supported",
				},
			],
		},
		{
			name: "TaskItem",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the task item",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Content of the task item",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "TaskItemFile",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the file badge",
				},
				{
					name: "children",
					type: "Snippet",
					description: "File name or content to display",
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
