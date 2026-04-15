import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";

import Basic from "./examples/basic.svelte";
import BasicRaw from "./examples/basic.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import WithChat from "./examples/with-chat.svelte";
import WithChatRaw from "./examples/with-chat.svelte?raw";

export const meta: ComponentMeta = {
	id: "scroll-button",
	title: "Scroll Button",
	description:
		"A minimal floating button that appears when the user scrolls up, allowing them to jump back to the bottom of the chat.",
	category: "utilities",
};

const seo: SEO = {
	title: "Scroll Button",
	description:
		"A minimal floating button that appears when the user scrolls up, allowing them to jump back to the bottom of the chat.",
	keywords: ["Svelte", "Scroll Button", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const examples: Example[] = [
	{
		name: "Basic",
		preview: Basic,
		code: {
			filename: "basic.svelte",
			filecode: BasicRaw,
		},
	},
	{
		name: "Chat Messages",
		preview: WithChat,
		code: {
			filename: "with-chat.svelte",
			filecode: WithChatRaw,
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
	},
	examples,
};
