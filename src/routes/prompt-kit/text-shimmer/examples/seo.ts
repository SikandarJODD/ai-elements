import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Text Shimmer",
	description:
		"A text component with an animated shimmer effect, perfect for indicating AI thinking or loading states.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Text Shimmer - Prompt Kit",
		description:
			"A text component with an animated shimmer effect, perfect for indicating AI thinking or loading states.",
		url: "https://svelte-ai-elements.vercel.app/prompt-kit/text-shimmer",
		type: "website",
		siteName: "Prompt Kit - Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
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
		title: "Text Shimmer - Prompt Kit",
		description:
			"A text component with an animated shimmer effect, perfect for indicating AI thinking or loading states.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Text Shimmer Component",
	},
};

