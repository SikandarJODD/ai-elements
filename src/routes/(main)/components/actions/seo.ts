import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Actions",
  description:
    "Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Actions - Svelte AI Elements",
    description:
      "Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
    url: "https://ai-elements.vercel.app/components/actions",
    type: "website",
    siteName: "Svelte AI Elements",
    images:[
      {
        url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
        width: 1200,
        height: 630,
        alt: "Svelte AI Elements",
      }
    ]
  },
  twitter: {
    creator: "@Sikandar_Bhide",
    site: "https://ai-elements.vercel.app",
    cardType: "summary_large_image",
    title: "Actions - Svelte AI Elements",
    description:
      "Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
    image: 'https://ai-elements.vercel.app/assets/svelte-ai-elements.png',
    imageAlt: "Twitter image alt",
  },
};
