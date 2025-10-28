import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Toolbar - Workflow Components",
	description:
		"A positioned toolbar that attaches to nodes in Svelte Flow canvases with modern card styling and flexbox layout.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Toolbar - Workflow Components - Svelte AI Elements",
		description:
			"A positioned toolbar that attaches to nodes in Svelte Flow canvases with modern card styling and flexbox layout.",
		url: "https://ai-elements.vercel.app/components/workflow/toolbar",
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
		title: "Toolbar - Workflow Components - Svelte AI Elements",
		description:
			"A positioned toolbar that attaches to nodes in React Flow canvases with modern card styling and flexbox layout.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Svelte AI Elements Toolbar Component",
	},
};
