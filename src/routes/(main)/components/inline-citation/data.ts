import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "inline-citation",
	title: "Inline Citation",
	description:
		"The Inline Citation component provides a way to display citations inline with text content, similar to academic papers or research documents. It consists of a citation pill that shows detailed source information on hover, making it perfect for AI-generated content that needs to reference sources.",
};

const seo: SEO = {
	title: "Inline Citation",
	description:
		"The Inline Citation component provides a way to display citations inline with text content, similar to academic papers or research documents. It consists of a citation pill that shows detailed source information on hover, making it perfect for AI-generated content that needs to reference sources.",
	keywords: ["Svelte", "Inline Citation", "Citations", "Svelte AI Elements"],
};

const examples: Example[] = [];

export const data: ComponentDoc = {
	...meta,
	preview: Basic,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	examples,
	props: [
		{
			name: "InlineCitation",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the inline citation container",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Citation content, typically InlineCitationText and InlineCitationCard",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLSpanElement>",
					description: "All other span props are supported",
				},
			],
		},
		{
			name: "InlineCitationCard",
			props: [
				{
					name: "closeDelay",
					type: "number",
					default: "0",
					description: "Delay in milliseconds before closing the hover card",
				},
				{
					name: "openDelay",
					type: "number",
					default: "0",
					description: "Delay in milliseconds before opening the hover card",
				},
				{
					name: "open",
					type: "boolean",
					description: "Controls whether the card is open and is bindable",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Card content, typically InlineCitationCardTrigger and InlineCitationCardBody",
				},
			],
		},
		{
			name: "InlineCitationCardTrigger",
			props: [
				{
					name: "sources",
					type: "string[]",
					description: "Array of source URLs to display in the citation badge",
				},
				{
					name: "variant",
					type: "'default' | 'secondary' | 'destructive' | 'outline'",
					default: "'secondary'",
					description: "Badge variant style",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the badge",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom badge content",
				},
			],
		},
		{
			name: "InlineCitationCardBody",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the card body",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Card body content, typically InlineCitationCarousel",
				},
			],
		},
		{
			name: "InlineCitationCarousel",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the carousel",
				},
				{
					name: "opts",
					type: "object",
					description: "Embla carousel options",
				},
				{
					name: "plugins",
					type: "any[]",
					description: "Embla carousel plugins",
				},
				{
					name: "orientation",
					type: "'horizontal' | 'vertical'",
					default: "'horizontal'",
					description: "Carousel orientation",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Carousel content, typically header, content, and navigation controls",
				},
			],
		},
		{
			name: "InlineCitationCarouselHeader",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the carousel header",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Header content, typically index and navigation buttons",
				},
				{
					name: "...restProps",
					type: "HTMLAttributes<HTMLDivElement>",
					description: "All other div props are supported",
				},
			],
		},
		{
			name: "InlineCitationCarouselContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the carousel content",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Carousel items, usually InlineCitationCarouselItem components",
				},
			],
		},
		{
			name: "InlineCitationCarouselItem",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the carousel item",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Item content, typically InlineCitationSource and quote content",
				},
			],
		},
		{
			name: "InlineCitationCarouselNext",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the next button",
				},
				{
					name: "...restProps",
					type: "HTMLButtonAttributes",
					description: "All other button props are supported",
				},
			],
		},
		{
			name: "InlineCitationCarouselPrev",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the previous button",
				},
				{
					name: "...restProps",
					type: "HTMLButtonAttributes",
					description: "All other button props are supported",
				},
			],
		},
	],
};
