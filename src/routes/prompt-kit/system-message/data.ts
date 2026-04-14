import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import FilledVariants from "./examples/filled-variants.svelte";
import FilledVariantsRaw from "./examples/filled-variants.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithCta from "./examples/with-cta.svelte";
import WithCtaRaw from "./examples/with-cta.svelte?raw";

export const meta: ComponentMeta = {
	id: "system-message",
	title: "System Message",
	description: "Display contextual information, warnings, or instructions in AI interfaces.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "System Message",
	description:
		"Display contextual information, warnings, or instructions in AI interfaces with customizable variants and call-to-action buttons.",
	keywords: ["Svelte", "System Message", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Filled Variants",
		description:
			'Use the "fill" prop to apply semantic background colors based on the variant. Different variants provide visual context for the message severity.',
		preview: FilledVariants,
		code: {
			filename: "filled-variants.svelte",
			filecode: FilledVariantsRaw,
			lang: "svelte",
		},
	},
	{
		name: "With CTA",
		description:
			'Add a call-to-action button using the "cta" prop. You can also provide a custom icon using the "icon" snippet.',
		preview: WithCta,
		code: {
			filename: "with-cta.svelte",
			filecode: WithCtaRaw,
			lang: "svelte",
		},
	},
];

const systemMessageProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content displayed inside the system message",
	},
	{
		name: "variant",
		type: '"action" | "warning" | "error"',
		default: '"action"',
		description: "Severity of the message, controlling text and icon styles",
	},
	{
		name: "fill",
		type: "boolean",
		default: "false",
		description: "When true, applies a semantic background color and hides the border",
	},
	{
		name: "icon",
		type: "Snippet",
		description: "Custom icon to display instead of the default severity icon",
	},
	{
		name: "isIconHidden",
		type: "boolean",
		default: "false",
		description: "Hides the icon entirely when set to true",
	},
	{
		name: "cta",
		type: "CTAConfig",
		description: "Configuration for the optional call-to-action button",
	},
	{
		name: "className",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const ctaConfigProps = [
	{
		name: "label",
		type: "string",
		description: "Text displayed inside the button",
	},
	{
		name: "onClick",
		type: "() => void",
		description: "Optional click handler",
	},
	{
		name: "variant",
		type: '"default" | "secondary" | "outline" | "ghost"',
		default: '"default"',
		description: 'Maps to button variants; "default" uses the default button style',
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
			name: "SystemMessage",
			props: systemMessageProps,
		},
		{
			name: "CTAConfig",
			desc: 'When "cta" is provided, SystemMessage renders a small Button next to the message content.',
			props: ctaConfigProps,
		},
	],
};
