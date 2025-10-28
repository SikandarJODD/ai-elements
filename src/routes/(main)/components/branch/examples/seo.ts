import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Branch",
	description:
		"The Branch component manages multiple versions of AI messages, allowing users to navigate between different response branches. - Svelte AI Elements",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Branch - Svelte AI Elements",
		description:
			"The Branch component manages multiple versions of AI messages, allowing users to navigate between different response branches.",
		url: "https://ai-elements.vercel.app/components/actions",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Branch - Svelte AI Elements",
		description:
			"The Branch component manages multiple versions of AI messages, allowing users to navigate between different response branches.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
