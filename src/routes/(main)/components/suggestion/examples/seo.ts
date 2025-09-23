import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Suggestion",
  description:
    "The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Suggestion - Svelte AI Elements",
    description:
      "The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
    url: "https://ai-elements.vercel.app/components/suggestion",
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
    title: "Suggestion - Svelte AI Elements",
    description:
      "The Suggestion component displays a horizontal row of clickable suggestions for user interaction.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
