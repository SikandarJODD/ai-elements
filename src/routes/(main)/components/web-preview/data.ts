import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "web-preview",
	title: "Web Preview",
	description:
		"The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code.",
};

const seo: SEO = {
	title: "Web Preview",
	description:
		"The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code.",
	keywords: ["Svelte", "Web Preview", "UI preview", "Svelte AI Elements"],
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
			name: "WebPreview",
			props: [
				{
					name: "defaultUrl",
					type: "string",
					default: '""',
					description: "Default URL to display in the preview",
				},
				{
					name: "onUrlChange",
					type: "(url: string) => void",
					description: "Callback function called when the URL changes",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the container",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Child components, typically WebPreviewNavigation and WebPreviewBody",
				},
			],
		},
		{
			name: "WebPreviewNavigation",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the navigation bar",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Navigation content, typically WebPreviewUrl and WebPreviewNavigationButton",
				},
			],
		},
		{
			name: "WebPreviewNavigationButton",
			props: [
				{
					name: "onclick",
					type: "(event: MouseEvent) => void",
					description: "Click handler for the button",
				},
				{
					name: "disabled",
					type: "boolean",
					description: "Whether the button is disabled",
				},
				{
					name: "tooltip",
					type: "string",
					description: "Tooltip text to display on hover",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Button content, typically an icon",
				},
			],
		},
		{
			name: "WebPreviewUrl",
			props: [
				{
					name: "value",
					type: "string",
					description: "Current URL value and is bindable",
				},
				{
					name: "onchange",
					type: "(event: Event) => void",
					description: "Change event handler",
				},
				{
					name: "onkeydown",
					type: "(event: KeyboardEvent) => void",
					description: "Keydown event handler used to update the preview URL",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the input",
				},
			],
		},
		{
			name: "WebPreviewBody",
			props: [
				{
					name: "src",
					type: "string",
					description: "URL to display in the iframe and overrides the context URL",
				},
				{
					name: "loading",
					type: "Snippet",
					description: "Loading state content to display",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the iframe",
				},
			],
		},
		{
			name: "WebPreviewConsole",
			props: [
				{
					name: "logs",
					type: "LogEntry[]",
					description: "Array of console log entries to display",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the console container",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Additional console content",
				},
			],
		},
	],
};
