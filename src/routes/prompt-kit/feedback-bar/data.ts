import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithIcon from "./examples/with-icon.svelte";
import WithIconRaw from "./examples/with-icon.svelte?raw";

export const meta: ComponentMeta = {
	id: "feedback-bar",
	title: "Feedback Bar",
	description: "A component to collect user feedback on AI responses.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Feedback Bar",
	description: "A component to collect user feedback on AI responses.",
	keywords: ["Svelte", "Feedback Bar", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Icon",
		preview: WithIcon,
		code: {
			filename: "feedback-bar-with-icon.svelte",
			filecode: WithIconRaw,
		},
	},
];

// Component API Props Data
const feedbackBarProps = [
	{
		name: "title",
		type: "string",
		description: "Title text to display",
	},
	{
		name: "icon",
		type: "Snippet",
		description: "Custom icon snippet to display before the title",
	},
	{
		name: "onHelpful",
		type: "() => void",
		description: "Callback when helpful (thumbs up) button is clicked",
	},
	{
		name: "onNotHelpful",
		type: "() => void",
		description: "Callback when not helpful (thumbs down) button is clicked",
	},
	{
		name: "onClose",
		type: "() => void",
		description: "Callback when close button is clicked",
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

export const data: ComponentDoc = {
	...meta,
	seo,
	examples,
	preview: Preview,
	previewCode: {
		filename: "feedback-bar-preview.svelte",
		filecode: PreviewRaw,
	},
	props: [
		{
			name: "Feedback Bar",
			props: feedbackBarProps,
		},
	],
};
