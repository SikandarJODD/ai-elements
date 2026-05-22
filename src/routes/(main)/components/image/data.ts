import ImageSvelteRaw from "$lib/components/ai-elements/image/image.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/image/index.ts?raw";
import TypesTsRaw from "$lib/components/ai-elements/image/types.ts?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "image",
	title: "Image",
	description: "TODO: Image.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Image",
	description: "TODO: Image.",
	keywords: ["Svelte", "Image", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "image.svelte", code: ImageSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", },
		{ name: "types.ts", code: TypesTsRaw, lang: "typescript", }
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
