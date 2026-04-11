import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "reasoning",
	title: "Reasoning",
	description:
		"The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
};

const seo: SEO = {
	title: "Reasoning",
	description:
		"The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
	keywords: ["Svelte", "Reasoning", "AI reasoning", "Svelte AI Elements"],
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
			name: "Reasoning",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the reasoning container",
				},
				{
					name: "isStreaming",
					type: "boolean",
					default: "false",
					description: "Whether the AI is currently streaming reasoning content",
				},
				{
					name: "open",
					type: "boolean",
					description: "Controlled state for whether the reasoning content is expanded",
				},
				{
					name: "defaultOpen",
					type: "boolean",
					default: "true",
					description: "Default open state when not controlled",
				},
				{
					name: "onOpenChange",
					type: "(open: boolean) => void",
					description: "Callback fired when the open state changes",
				},
				{
					name: "duration",
					type: "number",
					description: "Duration in seconds that the AI spent reasoning",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components, typically ReasoningTrigger and ReasoningContent",
				},
				{
					name: "...props",
					type: "CollapsibleProps",
					description: "All other Collapsible props are supported",
				},
			],
		},
		{
			name: "ReasoningTrigger",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the trigger button",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom trigger content",
				},
				{
					name: "...props",
					type: "CollapsibleTriggerProps",
					description: "All other CollapsibleTrigger props are supported",
				},
			],
		},
		{
			name: "ReasoningContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "The reasoning content to display when expanded",
				},
				{
					name: "...props",
					type: "CollapsibleContentProps",
					description: "All other CollapsibleContent props are supported",
				},
			],
		},
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
