import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Chain of Thought",
  description:
    "The Chain Of Thought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. It helps users understand how AI arrives at conclusions. - Svelte AI Elements",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title:
      "Chain of Thought - Svelte AI Elements",
    description:
      "The Chain Of Thought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. - Svelte AI Elements",
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
    title: "Chain Of Thought - Svelte AI Elements",
    description:
      "The Chain Of Thought component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. - Svelte AI Elements",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
