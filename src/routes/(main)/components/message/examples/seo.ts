import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Message",
	description:
		"The Message component displays a chat interface message from either a user or an AI. It includes an avatar, a name, and a message content.",
	titleTemplate: "%s | Svelte AI Elements",
	openGraph: {
		title: "Message - Svelte AI Elements",
		description:
			"The Message component displays a chat interface message from either a user or an AI. It includes an avatar, a name, and a message content.",
		url: "https://svelte-ai-elements.vercel.app//components/message",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
			},
		],
	},
	twitter: {
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app/",
		cardType: "summary_large_image",
		title: "Message - Svelte AI Elements",
		description:
			"The Message component displays a chat interface message from either a user or an AI. It includes an avatar, a name, and a message content.",
		image: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	},
};
