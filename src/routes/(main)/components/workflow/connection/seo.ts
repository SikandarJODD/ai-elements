import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Connection - Workflow Components",
  description:
    "A styled connection line for Svelte Flow canvases with animated bezier curves and circle indicators.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Connection - Workflow Components - Svelte AI Elements",
    description:
      "A styled connection line for Svelte Flow canvases with animated bezier curves and circle indicators.",
    url: "https://ai-elements.vercel.app/components/workflow/connection",
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
    title: "Connection - Workflow Components - Svelte AI Elements",
    description:
      "A styled connection line for React Flow canvases with animated bezier curves and circle indicators.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Svelte AI Elements Connection Component",
  },
};
