import IndexTsRaw from "$lib/components/ai-elements/response/index.ts?raw";
import ResponseSvelteRaw from "$lib/components/ai-elements/response/response.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "response",
	title: "Response",
	description: "TODO: Response.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Response",
	description: "TODO: Response.",
	keywords: ["Svelte", "Response", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
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
