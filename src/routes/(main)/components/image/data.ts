import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";

export const meta: ComponentMeta = {
	id: "image",
	title: "Image",
	description:
		"The Image component displays AI-generated images from base64 encoded data. It's designed to work seamlessly with the AI SDK's Experimental_GeneratedImage type and provides automatic styling with proper accessibility features.",
};

const seo: SEO = {
	title: "Image",
	description:
		"The Image component displays AI-generated images from base64 encoded data. It's designed to work seamlessly with the AI SDK's Experimental_GeneratedImage type and provides automatic styling with proper accessibility features.",
	keywords: ["Svelte", "Image", "AI generated images", "Svelte AI Elements"],
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
			name: "Image",
			props: [
				{
					name: "base64",
					type: "string",
					description: "Base64-encoded image data",
				},
				{
					name: "uint8Array",
					type: "Uint8Array",
					description: "Optional Uint8Array representation of the image data",
				},
				{
					name: "mediaType",
					type: "string",
					description: "MIME type of the image, such as image/png or image/jpeg",
				},
				{
					name: "alt",
					type: "string",
					description: "Alternative text for the image for accessibility",
				},
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the image",
				},
				{
					name: "ref",
					type: "HTMLImageElement | null",
					description: "Bindable reference to the underlying image element",
				},
				{
					name: "...restProps",
					type: "HTMLImgAttributes",
					description: "All other standard img element props are supported",
				},
			],
		},
	],
};
