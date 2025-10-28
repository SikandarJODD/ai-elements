import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Sources",
	description:
		"The Sources component allows a user to view the sources or citations used to generate a response.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Sources - Svelte AI Elements",
		description:
			"The Sources component allows a user to view the sources or citations used to generate a response.",
		url: "https://ai-elements.vercel.app/components/sources",
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
		title: "Sources - Svelte AI Elements",
		description:
			"The Sources component allows a user to view the sources or citations used to generate a response.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
