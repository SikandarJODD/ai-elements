import ContextCacheUsageSvelteRaw from "$lib/components/ai-elements/context/context-cache-usage.svelte?raw";
import ContextContentBodySvelteRaw from "$lib/components/ai-elements/context/context-content-body.svelte?raw";
import ContextContentFooterSvelteRaw from "$lib/components/ai-elements/context/context-content-footer.svelte?raw";
import ContextContentHeaderSvelteRaw from "$lib/components/ai-elements/context/context-content-header.svelte?raw";
import ContextContentSvelteRaw from "$lib/components/ai-elements/context/context-content.svelte?raw";
import ContextContextSvelteTsRaw from "$lib/components/ai-elements/context/context-context.svelte.ts?raw";
import ContextIconSvelteRaw from "$lib/components/ai-elements/context/context-icon.svelte?raw";
import ContextInputUsageSvelteRaw from "$lib/components/ai-elements/context/context-input-usage.svelte?raw";
import ContextOutputUsageSvelteRaw from "$lib/components/ai-elements/context/context-output-usage.svelte?raw";
import ContextReasoningUsageSvelteRaw from "$lib/components/ai-elements/context/context-reasoning-usage.svelte?raw";
import ContextTriggerSvelteRaw from "$lib/components/ai-elements/context/context-trigger.svelte?raw";
import ContextSvelteRaw from "$lib/components/ai-elements/context/context.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/context/index.ts?raw";
import TokensWithCostSvelteRaw from "$lib/components/ai-elements/context/tokens-with-cost.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "context",
	title: "Context",
	description: "TODO: Context.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Context",
	description: "TODO: Context.",
	keywords: ["Svelte", "Context", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "context-cache-usage.svelte", code: ContextCacheUsageSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "context-content-body.svelte", code: ContextContentBodySvelteRaw, lang: "svelte", },
		{ name: "context-content-footer.svelte", code: ContextContentFooterSvelteRaw, lang: "svelte", },
		{ name: "context-content-header.svelte", code: ContextContentHeaderSvelteRaw, lang: "svelte", },
		{ name: "context-content.svelte", code: ContextContentSvelteRaw, lang: "svelte", },
		{ name: "context-context.svelte.ts", code: ContextContextSvelteTsRaw, lang: "typescript", },
		{ name: "context-icon.svelte", code: ContextIconSvelteRaw, lang: "svelte", },
		{ name: "context-input-usage.svelte", code: ContextInputUsageSvelteRaw, lang: "svelte", },
		{ name: "context-output-usage.svelte", code: ContextOutputUsageSvelteRaw, lang: "svelte", },
		{ name: "context-reasoning-usage.svelte", code: ContextReasoningUsageSvelteRaw, lang: "svelte", },
		{ name: "context-trigger.svelte", code: ContextTriggerSvelteRaw, lang: "svelte", },
		{ name: "context.svelte", code: ContextSvelteRaw, lang: "svelte", },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", },
		{ name: "tokens-with-cost.svelte", code: TokensWithCostSvelteRaw, lang: "svelte", }
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
