import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Controls - Workflow Components",
	description:
		"Interactive zoom and fit view controls for Svelte Flow canvases with modern, themed design.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Controls - Workflow Components - Svelte AI Elements",
		description:
			"Interactive zoom and fit view controls for Svelte Flow canvases with modern, themed design.",
		url: "https://ai-elements.vercel.app/components/workflow/controls",
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
		title: "Controls - Workflow Components - Svelte AI Elements",
		description:
			"Interactive zoom and fit view controls for React Flow canvases with modern, themed design.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Controls Component",
	},
};
