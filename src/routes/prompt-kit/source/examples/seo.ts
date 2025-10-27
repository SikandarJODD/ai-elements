import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Source",
	description:
		"Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Source - Prompt Kit",
		description:
			"Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.",
		url: "https://ai-elements.vercel.app/prompt-kit/source",
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
		title: "Source - Prompt Kit",
		description:
			"Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Source Component",
	},
};
