import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Scroll Button",
	description:
		"A floating button component that appears when users scroll up in chat containers, providing quick navigation back to the bottom with smooth scrolling behavior.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Scroll Button - Prompt Kit",
		description:
			"A floating button component that appears when users scroll up in chat containers, providing quick navigation back to the bottom with smooth scrolling behavior.",
		url: "https://ai-elements.vercel.app/prompt-kit/scroll-button",
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
		title: "Scroll Button - Prompt Kit",
		description:
			"A floating button component that appears when users scroll up in chat containers, providing quick navigation back to the bottom with smooth scrolling behavior.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Scroll Button Component",
	},
};
