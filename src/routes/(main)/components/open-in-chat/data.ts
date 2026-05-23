import ChatGptIconSvelteRaw from "$lib/components/ai-elements/open-in-chat/chat-gpt-icon.svelte?raw";
import ClaudeIconSvelteRaw from "$lib/components/ai-elements/open-in-chat/claude-icon.svelte?raw";
import GitHubIconSvelteRaw from "$lib/components/ai-elements/open-in-chat/git-hub-icon.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/open-in-chat/index.ts?raw";
import OpenInChatGptSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-chat-gpt.svelte?raw";
import OpenInClaudeSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-claude.svelte?raw";
import OpenInContentSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-content.svelte?raw";
import OpenInContextSvelteTsRaw from "$lib/components/ai-elements/open-in-chat/open-in-context.svelte.ts?raw";
import OpenInItemSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-item.svelte?raw";
import OpenInLabelSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-label.svelte?raw";
import OpenInSciraSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-scira.svelte?raw";
import OpenInSeparatorSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-separator.svelte?raw";
import OpenInT3SvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-t3.svelte?raw";
import OpenInTriggerSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-trigger.svelte?raw";
import OpenInV0SvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in-v0.svelte?raw";
import OpenInSvelteRaw from "$lib/components/ai-elements/open-in-chat/open-in.svelte?raw";
import SciraIconSvelteRaw from "$lib/components/ai-elements/open-in-chat/scira-icon.svelte?raw";
import V0IconSvelteRaw from "$lib/components/ai-elements/open-in-chat/v0-icon.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "open-in-chat",
	title: "Open In Chat",
	description: "TODO: Open In Chat.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Open In Chat",
	description: "TODO: Open In Chat.",
	keywords: ["Svelte", "Open In Chat", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "chat-gpt-icon.svelte", code: ChatGptIconSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "claude-icon.svelte", code: ClaudeIconSvelteRaw, lang: "svelte", },
		{ name: "git-hub-icon.svelte", code: GitHubIconSvelteRaw, lang: "svelte", },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", },
		{ name: "open-in-chat-gpt.svelte", code: OpenInChatGptSvelteRaw, lang: "svelte", },
		{ name: "open-in-claude.svelte", code: OpenInClaudeSvelteRaw, lang: "svelte", },
		{ name: "open-in-content.svelte", code: OpenInContentSvelteRaw, lang: "svelte", },
		{ name: "open-in-context.svelte.ts", code: OpenInContextSvelteTsRaw, lang: "typescript", },
		{ name: "open-in-item.svelte", code: OpenInItemSvelteRaw, lang: "svelte", },
		{ name: "open-in-label.svelte", code: OpenInLabelSvelteRaw, lang: "svelte", },
		{ name: "open-in-scira.svelte", code: OpenInSciraSvelteRaw, lang: "svelte", },
		{ name: "open-in-separator.svelte", code: OpenInSeparatorSvelteRaw, lang: "svelte", },
		{ name: "open-in-t3.svelte", code: OpenInT3SvelteRaw, lang: "svelte", },
		{ name: "open-in-trigger.svelte", code: OpenInTriggerSvelteRaw, lang: "svelte", },
		{ name: "open-in-v0.svelte", code: OpenInV0SvelteRaw, lang: "svelte", },
		{ name: "open-in.svelte", code: OpenInSvelteRaw, lang: "svelte", },
		{ name: "scira-icon.svelte", code: SciraIconSvelteRaw, lang: "svelte", },
		{ name: "v0-icon.svelte", code: V0IconSvelteRaw, lang: "svelte", }
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
	},
	install_block,
	seo,
	props: [],
};
