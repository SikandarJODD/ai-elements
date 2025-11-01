import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Message",
	description:
		"A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Message - Prompt Kit",
		description:
			"A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit/message",
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
		title: "Message - Prompt Kit",
		description:
			"A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Message Component",
	},
};
