import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Image",
	description:
		"The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. Ideal for showing AI-generated images or user uploads in chat and AI apps.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Image - Prompt Kit",
		description:
			"The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. Ideal for showing AI-generated images or user uploads in chat and AI apps.",
		url: "https://ai-elements.vercel.app/prompt-kit/image",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Prompt Kit - Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Image - Prompt Kit",
		description:
			"The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. Ideal for showing AI-generated images or user uploads in chat and AI apps.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Image Component",
	},
};
