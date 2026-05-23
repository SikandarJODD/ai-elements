import IndexTsRaw from "$lib/components/ai-elements/reasoning/index.ts?raw";
import ReasoningContentSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning-content.svelte?raw";
import ReasoningContextSvelteTsRaw from "$lib/components/ai-elements/reasoning/reasoning-context.svelte.ts?raw";
import ReasoningTriggerSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning-trigger.svelte?raw";
import ReasoningSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning.svelte?raw";
import ResponseSvelteRaw from "$lib/components/ai-elements/reasoning/response.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "reasoning",
	title: "Reasoning",
	description: "TODO: Reasoning.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Reasoning",
	description: "TODO: Reasoning.",
	keywords: ["Svelte", "Reasoning", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "reasoning-content.svelte", code: ReasoningContentSvelteRaw, lang: "svelte", },
		{ name: "reasoning-context.svelte.ts", code: ReasoningContextSvelteTsRaw, lang: "typescript", },
		{ name: "reasoning-trigger.svelte", code: ReasoningTriggerSvelteRaw, lang: "svelte", },
		{ name: "reasoning.svelte", code: ReasoningSvelteRaw, lang: "svelte", },
		{ name: "response.svelte", code: ResponseSvelteRaw, lang: "svelte", }
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
