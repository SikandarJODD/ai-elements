import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Loader",
	description:
		"A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Loader - Prompt Kit",
		description:
			"A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit/loader",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Prompt Kit - Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app/",
		cardType: "summary_large_image",
		title: "Loader - Prompt Kit",
		description:
			"A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Loader Component",
	},
};
