import IndexTsRaw from "$lib/components/ai-elements/shimmer/index.ts?raw";
import ShimmerSvelteRaw from "$lib/components/ai-elements/shimmer/shimmer.svelte?raw";
import TypesTsRaw from "$lib/components/ai-elements/shimmer/types.ts?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "shimmer",
	title: "Shimmer",
	description:
		"An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Shimmer",
	description:
		"An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
	keywords: ["Svelte", "Shimmer", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true },
		{ name: "shimmer.svelte", code: ShimmerSvelteRaw, lang: "svelte" },
		{ name: "types.ts", code: TypesTsRaw, lang: "typescript" },
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── shimmer/
				├── index.ts
				├── shimmer.svelte
				└── types.ts`,
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
