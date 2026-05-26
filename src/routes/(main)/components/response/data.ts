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
	description: "The Response component renders a Markdown response from a large language model. It uses Streamdown-Svelte under the hood to render the markdown.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Response",
	description: "The Response component renders a Markdown response from a large language model. It uses Streamdown-Svelte under the hood to render the markdown.",
	keywords: ["Svelte", "Response", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "response.svelte", code: ResponseSvelteRaw, lang: "svelte", }
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── response/
				├── index.ts
				└── response.svelte`,
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
		preview_class: 'max-h-120 overflow-auto',
	},
	install_block,
	seo,
	props: [],
};
