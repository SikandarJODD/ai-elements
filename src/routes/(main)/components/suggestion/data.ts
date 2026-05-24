import IndexTsRaw from "$lib/components/ai-elements/suggestion/index.ts?raw";
import SuggestionSvelteRaw from "$lib/components/ai-elements/suggestion/suggestion.svelte?raw";
import SuggestionsSvelteRaw from "$lib/components/ai-elements/suggestion/suggestions.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "suggestion",
	title: "Suggestion",
	description: "The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Suggestion",
	description: "The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
	keywords: ["Svelte", "Suggestion", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "suggestion.svelte", code: SuggestionSvelteRaw, lang: "svelte", },
		{ name: "suggestions.svelte", code: SuggestionsSvelteRaw, lang: "svelte", }
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
