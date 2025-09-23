import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Tool",
  description:
    "The Tool component displays a collapsible interface for showing/hiding tool details. It is designed to take the ToolUIPart type from the AI SDK and display it in a collapsible interface.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Tool - Svelte AI Elements",
    description:
      "The Tool component displays a collapsible interface for showing/hiding tool details. It is designed to take the ToolUIPart type from the AI SDK and display it in a collapsible interface.",
    url: "https://ai-elements.vercel.app/components/tool",
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
    title: "Tool - Svelte AI Elements",
    description:
      "The Tool component displays a collapsible interface for showing/hiding tool details. It is designed to take the ToolUIPart type from the AI SDK and display it in a collapsible interface.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
