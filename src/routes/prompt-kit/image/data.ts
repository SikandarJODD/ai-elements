import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "image",
	title: "Image",
	description:
		"The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. It is ideal for showing AI-generated images or user uploads in chat and AI apps. Compatible with AI SDK v5 architecture.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Image",
	description:
		"The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. It is ideal for showing AI-generated images or user uploads in chat and AI apps. Compatible with AI SDK v5 architecture.",
	keywords: ["Svelte", "Image", "Svelte Prompt Kit"],
	titleTemplate: "%s | Svelte Prompt Kit",
};

const imageProps = [
	{
		name: "base64",
		type: "string",
		description: "Base64-encoded image data",
	},
	{
		name: "uint8Array",
		type: "Uint8Array",
		description: "Raw image data as Uint8Array",
	},
	{
		name: "mediaType",
		type: "string",
		default: "'image/png'",
		description: "MIME type of the image (e.g., 'image/jpeg')",
	},
	{
		name: "alt",
		type: "string",
		description: "Alternative text for accessibility (required)",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes",
	},
	{
		name: "...props",
		type: "ImgHTMLAttributes<HTMLImageElement>",
		description: "All standard HTML <img> attributes",
	},
];

export const data: ComponentDoc = {
	...meta,
	seo,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
		lang: "svelte",
	},
	props: [
		{
			name: "Image",
			props: imageProps,
		},
	],
};
