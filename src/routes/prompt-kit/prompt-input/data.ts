import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithActions from "./examples/with-actions.svelte";
import WithActionsRaw from "./examples/with-actions.svelte?raw";

export const meta: ComponentMeta = {
	id: "prompt-input",
	title: "Prompt Input",
	description: "An input field that allows users to enter and submit text to an AI model.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Prompt Input",
	description: "An input field that allows users to enter and submit text to an AI model.",
	keywords: ["Svelte", "Prompt Input", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "With Actions",
		description: 'Use "PromptInputActions" to add actions with tooltips to the "PromptInput".',
		preview: WithActions,
		code: {
			filename: "with-actions.svelte",
			filecode: WithActionsRaw,
			lang: "svelte",
		},
	},
];

const promptInputProps = [
	{
		name: "isLoading",
		type: "boolean",
		default: "false",
		description: "Loading state of the input",
	},
	{
		name: "value",
		type: "string",
		default: '""',
		description: "Controlled value of the input",
	},
	{
		name: "onValueChange",
		type: "(value: string) => void",
		description: "Callback when the input value changes",
	},
	{
		name: "maxHeight",
		type: "number | string",
		default: "240",
		description: "Maximum height of the textarea",
	},
	{
		name: "onSubmit",
		type: "() => void",
		description: "Callback when the user submits the input",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components rendered inside the prompt input",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
];

const promptInputTextareaProps = [
	{
		name: "disableAutosize",
		type: "boolean",
		default: "false",
		description: "Disable automatic height adjustment",
	},
	{
		name: "onkeydown",
		type: "(event: KeyboardEvent) => void",
		description: "Keyboard event handler called after the built-in submit handling",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Disable the textarea through native textarea props",
	},
	{
		name: "...props",
		type: "HTMLTextareaAttributes",
		description: "All other native textarea props are supported",
	},
];

const promptInputActionsProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Child components rendered inside the actions row",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const promptInputActionProps = [
	{
		name: "tooltip",
		type: "Snippet",
		description: "Content shown inside the tooltip",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child component that triggers the tooltip",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes for the tooltip content",
	},
	{
		name: "side",
		type: '"top" | "bottom" | "left" | "right"',
		default: '"top"',
		description: "Position of the tooltip relative to the trigger",
	},
	{
		name: "...props",
		type: "Partial<TooltipPrimitive.RootProps>",
		description: "All other Bits UI tooltip root props are supported",
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
			name: "PromptInput",
			props: promptInputProps,
		},
		{
			name: "PromptInputTextarea",
			props: promptInputTextareaProps,
		},
		{
			name: "PromptInputActions",
			props: promptInputActionsProps,
		},
		{
			name: "PromptInputAction",
			props: promptInputActionProps,
		},
	],
};
