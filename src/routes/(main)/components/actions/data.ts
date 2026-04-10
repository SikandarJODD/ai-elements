import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import MessageAction from "./examples/message-action.svelte";
import messageActionRaw from "./examples/message-action.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";

export const meta: ComponentMeta = {
	id: "action",
	title: "Actions",
	description:
		"Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Actions",
	description:
		"Learn how to create Actions in Svelte to enhance user interactions and functionality in your applications. Explore pre-built actions and how to implement them effectively.",
	keywords: ["Svelte", "Actions", "Svelte AI Elements"],
};

const examples: Example[] = [
    {
        name: "Message Action",
        preview: MessageAction,
        code: {
            filename: "message-action.svelte",
            filecode: messageActionRaw,
            lang: "svelte",
            isExpand: true,
        },
    }
];

export const data: ComponentDoc = {
	...meta,
    preview: Basic,
    previewCode:{
        filename: "basic.svelte",
        filecode: basicRaw,
        lang: "svelte",
        isExpand: true,
    },
	seo,
	examples,
};
