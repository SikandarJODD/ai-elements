import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Code Block",
	description:
		"A component for displaying code snippets with syntax highlighting and customizable styling using Shiki. Supports multiple languages and themes.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Code Block - Prompt Kit",
		description:
			"A component for displaying code snippets with syntax highlighting and customizable styling using Shiki. Supports multiple languages and themes.",
		url: "https://ai-elements.vercel.app/prompt-kit/code-block",
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
		title: "Code Block - Prompt Kit",
		description:
			"A component for displaying code snippets with syntax highlighting and customizable styling using Shiki. Supports multiple languages and themes.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Code Block Component",
	},
};
