import type { MetaTagsProps } from "svelte-meta-tags";
import SvelteIcon from "$lib/assets/svelte-ai-elements.png";
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
  },
  twitter: {
    creator: "@Sikandar_Bhide",
    site: "https://ai-elements.vercel.app",
    cardType: "summary_large_image",
    title: "Actions - Svelte AI Elements",
    description:
      "Pre-built actions to enhance user interactions and functionality in your Svelte applications.",
    image: SvelteIcon,
    imageAlt: "Twitter image alt",
  },
};
