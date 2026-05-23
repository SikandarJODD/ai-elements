import ConversationContentSvelteRaw from "$lib/components/ai-elements/conversation/conversation-content.svelte?raw";
import ConversationEmptyStateSvelteRaw from "$lib/components/ai-elements/conversation/conversation-empty-state.svelte?raw";
import ConversationScrollButtonSvelteRaw from "$lib/components/ai-elements/conversation/conversation-scroll-button.svelte?raw";
import ConversationSvelteRaw from "$lib/components/ai-elements/conversation/conversation.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/conversation/index.ts?raw";
import StickToBottomContextSvelteTsRaw from "$lib/components/ai-elements/conversation/stick-to-bottom-context.svelte.ts?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "conversation",
	title: "Conversation",
	description:
		"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Conversation",
	description:
		"The Conversation component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
	keywords: ["Svelte", "Conversation", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "conversation-content.svelte",
			code: ConversationContentSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{
			name: "conversation-empty-state.svelte",
			code: ConversationEmptyStateSvelteRaw,
			lang: "svelte",
		},
		{
			name: "conversation-scroll-button.svelte",
			code: ConversationScrollButtonSvelteRaw,
			lang: "svelte",
		},
		{ name: "conversation.svelte", code: ConversationSvelteRaw, lang: "svelte" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
		{
			name: "stick-to-bottom-context.svelte.ts",
			code: StickToBottomContextSvelteTsRaw,
			lang: "typescript",
		},
	],
	folder_structure: "",
};

export const data: ComponentDoc = {
	...meta,
	preview: {
		preview: Preview,
		code: {
			name: "preview.svelte",
			code: PreviewCode,
			lang: "svelte",
		},
		preview_class: "max-h-120 overflow-y-auto min-h-100 items-start",
	},
	install_block,
	seo,
	props: [],
};
