import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import IconSwap from "./examples/icon-swap.svelte";
import IconSwapRaw from "./examples/icon-swap.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithLoader from "./examples/with-loader.svelte";
import WithLoaderRaw from "./examples/with-loader.svelte?raw";
import WithSource from "./examples/with-source.svelte";
import WithSourceRaw from "./examples/with-source.svelte?raw";

export const meta: ComponentMeta = {
	id: "steps",
	title: "Steps",
	description:
		"Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Steps",
	description:
		"Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.",
	keywords: ["Svelte", "Steps", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "With Sources",
		description: 'You can use the "Source" component to display sources in the Steps block.',
		preview: WithSource,
		code: {
			filename: "with-source.svelte",
			filecode: WithSourceRaw,
			lang: "svelte",
		},
	},
	{
		name: "Custom Icons Swap and Bar",
		preview: IconSwap,
		code: {
			filename: "icon-swap.svelte",
			filecode: IconSwapRaw,
			lang: "svelte",
		},
	},
	{
		name: "Text Shimmer Loader",
		description:
			'You can use the "Loader" component to display a text shimmer loader in the Steps block.',
		preview: WithLoader,
		code: {
			filename: "with-loader.svelte",
			filecode: WithLoaderRaw,
			lang: "svelte",
		},
	},
];

const stepsProps = [
	{
		name: "defaultOpen",
		type: "boolean",
		default: "true",
		description: "Whether the Steps starts expanded",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components to render",
	},
];

const stepsTriggerProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Trigger content (label)",
	},
	{
		name: "leftIcon",
		type: "Snippet",
		description: "Optional left icon area; keeps width to avoid layout jump",
	},
	{
		name: "swapIconOnHover",
		type: "boolean",
		default: "true",
		description: "Swap leftIcon with chevron on hover",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
];

const stepsContentProps = [
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "bar",
		type: "Snippet",
		description: "Optional bar element rendered at the left",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Content to display in the steps",
	},
];

const stepsBarProps = [
	{
		name: "className",
		type: "string",
		default: '"bg-muted h-full w-[2px]"',
		description: "Classes for positioning and style",
	},
];

const stepsItemProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Row item content",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
		lang: "svelte",
	},
	props: [
		{
			name: "Steps",
			props: stepsProps,
		},
		{
			name: "StepsTrigger",
			props: stepsTriggerProps,
		},
		{
			name: "StepsContent",
			props: stepsContentProps,
		},
		{
			name: "StepsBar",
			props: stepsBarProps,
		},
		{
			name: "StepsItem",
			props: stepsItemProps,
		},
	],
};
