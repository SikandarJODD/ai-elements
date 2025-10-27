import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Prompt Input",
	description: "An input field that allows users to enter and submit text to an AI model.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Prompt Input - Prompt Kit",
		description: "An input field that allows users to enter and submit text to an AI model.",
		url: "https://ai-elements.vercel.app/prompt-kit/prompt-input",
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
		title: "Prompt Input - Prompt Kit",
		description: "An input field that allows users to enter and submit text to an AI model.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit Component",
	},
};
