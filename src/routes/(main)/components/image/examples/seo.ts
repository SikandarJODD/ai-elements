import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Image",
  description:
    "The Image component displays AI-generated images from base64 encoded data. It provides a simple way to render images with proper styling and accessibility features.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Image - Svelte AI Elements",
    description:
      "The Image component displays AI-generated images from base64 encoded data. It provides a simple way to render images with proper styling and accessibility features.",
    url: "https://ai-elements.vercel.app/components/image",
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
    title: "Image - Svelte AI Elements",
    description:
      "The Image component displays AI-generated images from base64 encoded data. It provides a simple way to render images with proper styling and accessibility features.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
