import CarouselContextSvelteTsRaw from "$lib/components/ai-elements/inline-citation/carousel-context.svelte.ts?raw";
import IndexTsRaw from "$lib/components/ai-elements/inline-citation/index.ts?raw";
import InlineCitationCardBodySvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-card-body.svelte?raw";
import InlineCitationCardTriggerSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-card-trigger.svelte?raw";
import InlineCitationCardSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-card.svelte?raw";
import InlineCitationCarouselContentSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-content.svelte?raw";
import InlineCitationCarouselHeaderSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-header.svelte?raw";
import InlineCitationCarouselIndexSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-index.svelte?raw";
import InlineCitationCarouselItemSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-item.svelte?raw";
import InlineCitationCarouselNextSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-next.svelte?raw";
import InlineCitationCarouselPrevSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel-prev.svelte?raw";
import InlineCitationCarouselSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-carousel.svelte?raw";
import InlineCitationQuoteSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-quote.svelte?raw";
import InlineCitationSourceSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-source.svelte?raw";
import InlineCitationTextSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation-text.svelte?raw";
import InlineCitationSvelteRaw from "$lib/components/ai-elements/inline-citation/inline-citation.svelte?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "inline-citation",
	title: "Inline Citation",
	description:
		"The Inline Citation component provides a way to display citations inline with text content, similar to academic papers or research documents. It consists of a citation pill that shows detailed source information on hover, making it perfect for AI-generated content that needs to reference sources.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Inline Citation",
	description:
		"The Inline Citation component provides a way to display citations inline with text content, similar to academic papers or research documents.",
	keywords: ["Svelte", "Inline Citation", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "carousel-context.svelte.ts",
			code: CarouselContextSvelteTsRaw,
			lang: "typescript",
			isExpand: true,
		},
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
		{
			name: "inline-citation-card-body.svelte",
			code: InlineCitationCardBodySvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-card-trigger.svelte",
			code: InlineCitationCardTriggerSvelteRaw,
			lang: "svelte",
		},
		{ name: "inline-citation-card.svelte", code: InlineCitationCardSvelteRaw, lang: "svelte" },
		{
			name: "inline-citation-carousel-content.svelte",
			code: InlineCitationCarouselContentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel-header.svelte",
			code: InlineCitationCarouselHeaderSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel-index.svelte",
			code: InlineCitationCarouselIndexSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel-item.svelte",
			code: InlineCitationCarouselItemSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel-next.svelte",
			code: InlineCitationCarouselNextSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel-prev.svelte",
			code: InlineCitationCarouselPrevSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-carousel.svelte",
			code: InlineCitationCarouselSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-quote.svelte",
			code: InlineCitationQuoteSvelteRaw,
			lang: "svelte",
		},
		{
			name: "inline-citation-source.svelte",
			code: InlineCitationSourceSvelteRaw,
			lang: "svelte",
		},
		{ name: "inline-citation-text.svelte", code: InlineCitationTextSvelteRaw, lang: "svelte" },
		{ name: "inline-citation.svelte", code: InlineCitationSvelteRaw, lang: "svelte" },
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── inline-citation/
				├── carousel-context.svelte.ts
				├── index.ts
				├── inline-citation-card-body.svelte
				├── inline-citation-card-trigger.svelte
				├── inline-citation-card.svelte
				├── inline-citation-carousel-content.svelte
				├── inline-citation-carousel-header.svelte
				├── inline-citation-carousel-index.svelte
				├── inline-citation-carousel-item.svelte
				├── inline-citation-carousel-next.svelte
				├── inline-citation-carousel-prev.svelte
				├── inline-citation-carousel.svelte
				├── inline-citation-quote.svelte
				├── inline-citation-source.svelte
				├── inline-citation-text.svelte
				└── inline-citation.svelte`,
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
