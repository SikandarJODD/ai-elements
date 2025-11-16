import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "Primitives",
	description:
		"Fullstack building blocks for AI applications. Includes chat applications with streaming responses, tool calling with function execution, and more. Each primitive includes a UI component and an API route using the Vercel AI SDK. Easy to install with the shadcn registry.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "Primitives - Prompt Kit",
		description:
			"Fullstack building blocks for AI applications. Includes chat applications with streaming responses, tool calling with function execution, and more. Each primitive includes a UI component and an API route using the Vercel AI SDK. Easy to install with the shadcn registry.",
		url: "https://svelte-ai-elements.vercel.app/prompt-kit/primitives",
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
		title: "Primitives - Prompt Kit",
		description:
			"Fullstack building blocks for AI applications. Includes chat applications with streaming responses, tool calling with function execution, and more. Each primitive includes a UI component and an API route using the Vercel AI SDK. Easy to install with the shadcn registry.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - Primitives",
	},
};
