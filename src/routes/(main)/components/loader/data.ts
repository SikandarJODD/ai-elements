import IndexTsRaw from "$lib/components/ai-elements/loader/index.ts?raw";
import LoaderIconSvelteRaw from "$lib/components/ai-elements/loader/loader-icon.svelte?raw";
import LoaderSvelteRaw from "$lib/components/ai-elements/loader/loader.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "loader",
	title: "Loader",
	description: "The Loader component provides a spinning animation to indicate loading states in your AI applications.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Loader",
	description: "The Loader component provides a spinning animation to indicate loading states in your AI applications.",
	keywords: ["Svelte", "Loader", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "loader-icon.svelte", code: LoaderIconSvelteRaw, lang: "svelte", },
		{ name: "loader.svelte", code: LoaderSvelteRaw, lang: "svelte", }
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
