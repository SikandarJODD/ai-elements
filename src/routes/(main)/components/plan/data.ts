import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "plan",
	title: "Plan",
	description:
		"A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
};

const seo: SEO = {
	title: "Plan",
	description:
		"A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
	keywords: ["Svelte", "Plan", "AI plans", "Svelte AI Elements"],
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
			name: "Plan",
			props: [
				{
					name: "isStreaming",
					type: "boolean",
					default: "false",
					description: "Whether the plan is in streaming state and shows shimmer effects",
				},
				{
					name: "defaultOpen",
					type: "boolean",
					default: "false",
					description: "Whether the plan is expanded by default",
				},
				{
					name: "open",
					type: "boolean",
					description: "Controlled open state",
				},
				{
					name: "onOpenChange",
					type: "(open: boolean) => void",
					description: "Callback when the open state changes",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Plan content, typically PlanHeader, PlanContent, and PlanFooter",
				},
			],
		},
		{
			name: "PlanTitle",
			props: [
				{
					name: "children",
					type: "Snippet",
					description:
						"Title content that automatically gets a shimmer effect while streaming",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply",
				},
			],
		},
		{
			name: "PlanDescription",
			props: [
				{
					name: "children",
					type: "Snippet",
					description:
						"Description content that automatically gets a shimmer effect while streaming",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply",
				},
			],
		},
		{
			name: "PlanContent",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Collapsible content for plan details",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply",
				},
			],
		},
	],
};
