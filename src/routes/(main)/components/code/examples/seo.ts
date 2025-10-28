import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Code Block",
	description:
		"The CodeBlock component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Code Block - Svelte AI Elements",
		description:
			"The CodeBlock component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
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
		title: "Code Block - Svelte AI Elements",
		description:
			"The Code Block component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
