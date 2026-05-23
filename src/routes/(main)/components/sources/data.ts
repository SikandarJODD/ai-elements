import IndexTsRaw from "$lib/components/ai-elements/sources/index.ts?raw";
import SourceSvelteRaw from "$lib/components/ai-elements/sources/source.svelte?raw";
import SourcesContentSvelteRaw from "$lib/components/ai-elements/sources/sources-content.svelte?raw";
import SourcesTriggerSvelteRaw from "$lib/components/ai-elements/sources/sources-trigger.svelte?raw";
import SourcesSvelteRaw from "$lib/components/ai-elements/sources/sources.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "sources",
	title: "Sources",
	description: "TODO: Sources.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Sources",
	description: "TODO: Sources.",
	keywords: ["Svelte", "Sources", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "source.svelte", code: SourceSvelteRaw, lang: "svelte", },
		{ name: "sources-content.svelte", code: SourcesContentSvelteRaw, lang: "svelte", },
		{ name: "sources-trigger.svelte", code: SourcesTriggerSvelteRaw, lang: "svelte", },
		{ name: "sources.svelte", code: SourcesSvelteRaw, lang: "svelte", }
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
