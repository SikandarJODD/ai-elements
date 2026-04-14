import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import ChatComplete from "./examples/chat-complete.svelte";
import ChatCompleteRaw from "./examples/chat-complete.svelte?raw";
import Highlight from "./examples/highlight.svelte";
import HighlightRaw from "./examples/highlight.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "prompt-suggestion",
	title: "Prompt Suggestion",
	description:
		"A component for implementing interactive prompt suggestions in AI interfaces, with both clickable suggestion buttons and highlight mode for matched text.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Prompt Suggestion",
	description:
		"A component for implementing interactive prompt suggestions in AI interfaces. The PromptSuggestion component offers two distinct modes: Normal Mode and Highlight Mode.",
	keywords: ["Svelte", "Prompt Suggestion", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Highlighted Prompt Suggestions",
		description:
			"Implement prompt suggestions with search term highlighting. It's perfect to showcase a list of related prompts.",
		preview: Highlight,
		code: {
			filename: "highlight.svelte",
			filecode: HighlightRaw,
			lang: "svelte",
		},
	},
	{
		name: "Complete Chat Interface",
		description:
			"Build a full-featured chat interface with dynamic prompt suggestions that switch between both modes.",
		preview: ChatComplete,
		code: {
			filename: "chat-complete.svelte",
			filecode: ChatCompleteRaw,
			lang: "svelte",
		},
	},
];

const promptSuggestionProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to display inside the suggestion button",
	},
	{
		name: "variant",
		type: '"default" | "destructive" | "outline" | "ghost"',
		description: "Visual variant of the button in normal mode or highlight mode",
	},
	{
		name: "size",
		type: '"default" | "sm" | "lg" | "icon"',
		description: "Button size in normal mode or highlight mode",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "highlight",
		type: "string | undefined",
		default: "undefined",
		description: "Enable highlight mode and highlight this text within string children",
	},
	{
		name: "ref",
		type: "HTMLElement | null",
		description: "Bindable reference to the rendered button element",
	},
	{
		name: "onclick",
		type: "(event: MouseEvent) => void",
		description: "Click handler for the suggestion button",
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Disable interaction with the suggestion button",
	},
	{
		name: "type",
		type: '"button" | "submit" | "reset"',
		default: '"button"',
		description: "Native button type",
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
			name: "PromptSuggestion",
			props: promptSuggestionProps,
		},
	],
};
