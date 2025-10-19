import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Tool",
  description:
    "Displays tool call details including input, output, status, and errors. Ideal for visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.",
  titleTemplate: "%s | Prompt Kit",
  openGraph: {
    title: "Tool - Prompt Kit",
    description:
      "Displays tool call details including input, output, status, and errors. Ideal for visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.",
    url: "https://ai-elements.vercel.app/prompt-kit/tool",
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
    title: "Tool - Prompt Kit",
    description:
      "Displays tool call details including input, output, status, and errors. Ideal for visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Prompt Kit - Tool Component",
  },
};
