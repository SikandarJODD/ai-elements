import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Artifact",
	description:
		"The Artifact component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Artifact - Svelte AI Elements",
		description:
			"The Artifact component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.",
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
		title: "Artifact - Svelte AI Elements",
		description:
			"The Artifact component provides a structured container for displaying generated content like code, documents, or other outputs with built-in header actions.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
