import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import AdvancedExample from "./examples/advanced-example.svelte";
import AdvancedExampleRaw from "./examples/advanced-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "chain-of-thought",
	title: "Chain of Thought",
	description:
		"A component to display the chain of thought for an AI model with optional actions.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Chain of Thought",
	description:
		"A component to display the chain of thought for an AI model with optional actions.",
	keywords: ["Svelte", "Chain of Thought", "Svelte Prompt Kit"],
};

const examples: Example[] = [
	{
		name: "Advance",
		preview: AdvancedExample,
		code: {
			filename: "Advance.svelte",
			filecode: AdvancedExampleRaw,
		},
	},
];

// Component API Props Data
const chainOfThoughtProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The ChainOfThoughtStep components to display",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

const chainOfThoughtStepProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The trigger and content components",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "isLast",
		type: "boolean",
		default: "false",
		description: "Whether this is the last step (hides connector line)",
	},
	{
		name: "open",
		type: "boolean",
		description: "Control the open state (makes component controlled)",
	},
	{
		name: "onOpenChange",
		type: "(open: boolean) => void",
		description: "Callback when open state changes",
	},
	{
		name: "...props",
		type: "CollapsibleRootProps",
		description: "Additional Collapsible component props from bits-ui",
	},
];

const chainOfThoughtTriggerProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The trigger text content",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "leftIcon",
		type: "Snippet",
		description: "Optional icon to display on the left side",
	},
	{
		name: "swapIconOnHover",
		type: "boolean",
		default: "true",
		description: "Whether to swap the left icon with chevron on hover",
	},
	{
		name: "...props",
		type: "CollapsibleTriggerProps",
		description: "Additional Collapsible trigger props from bits-ui",
	},
];

const chainOfThoughtContentProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The content items to display",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "CollapsibleContentProps",
		description: "Additional Collapsible content props from bits-ui",
	},
];

const chainOfThoughtItemProps = [
	{
		name: "children",
		type: "Snippet",
		description: "The item content",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "Additional HTML div props",
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "Preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "Chain Of Thought",
			props: chainOfThoughtProps,
		},
		{
			name: "Chain Of Thought Step",
			props: chainOfThoughtStepProps,
		},
		{
			name: "Chain Of Thought Trigger",
			props: chainOfThoughtTriggerProps,
		},
		{
			name: "Chain Of Thought Content",
			props: chainOfThoughtContentProps,
		},
		{
			name: "Chain Of Thought Item",
			props: chainOfThoughtItemProps,
		},
	],
};
