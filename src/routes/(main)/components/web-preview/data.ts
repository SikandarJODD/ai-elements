import IndexTsRaw from "$lib/components/ai-elements/web-preview/index.ts?raw";
import WebPreviewBodySvelteRaw from "$lib/components/ai-elements/web-preview/web-preview-body.svelte?raw";
import WebPreviewConsoleSvelteRaw from "$lib/components/ai-elements/web-preview/web-preview-console.svelte?raw";
import WebPreviewContextSvelteTsRaw from "$lib/components/ai-elements/web-preview/web-preview-context.svelte.ts?raw";
import WebPreviewNavigationButtonSvelteRaw from "$lib/components/ai-elements/web-preview/web-preview-navigation-button.svelte?raw";
import WebPreviewNavigationSvelteRaw from "$lib/components/ai-elements/web-preview/web-preview-navigation.svelte?raw";
import WebPreviewUrlSvelteRaw from "$lib/components/ai-elements/web-preview/web-preview-url.svelte?raw";
import WebPreviewSvelteRaw from "$lib/components/ai-elements/web-preview/web-preview.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "web-preview",
	title: "Web Preview",
	description: "The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Web Preview",
	description: "The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code.",
	keywords: ["Svelte", "Web Preview", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "web-preview-body.svelte", code: WebPreviewBodySvelteRaw, lang: "svelte", },
		{ name: "web-preview-console.svelte", code: WebPreviewConsoleSvelteRaw, lang: "svelte", },
		{ name: "web-preview-context.svelte.ts", code: WebPreviewContextSvelteTsRaw, lang: "typescript", },
		{ name: "web-preview-navigation-button.svelte", code: WebPreviewNavigationButtonSvelteRaw, lang: "svelte", },
		{ name: "web-preview-navigation.svelte", code: WebPreviewNavigationSvelteRaw, lang: "svelte", },
		{ name: "web-preview-url.svelte", code: WebPreviewUrlSvelteRaw, lang: "svelte", },
		{ name: "web-preview.svelte", code: WebPreviewSvelteRaw, lang: "svelte", }
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── web-preview/
				├── index.ts
				├── web-preview-body.svelte
				├── web-preview-console.svelte
				├── web-preview-context.svelte.ts
				├── web-preview-navigation-button.svelte
				├── web-preview-navigation.svelte
				├── web-preview-url.svelte
				└── web-preview.svelte`,
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
