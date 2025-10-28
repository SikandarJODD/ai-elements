import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
	title: "File Upload",
	description:
		"A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.",
	titleTemplate: "%s | Prompt Kit",
	openGraph: {
		title: "File Upload - Prompt Kit",
		description:
			"A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.",
		url: "https://ai-elements.vercel.app/prompt-kit/file-upload",
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
		title: "File Upload - Prompt Kit",
		description:
			"A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.",
		image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Prompt Kit - File Upload Component",
	},
};
