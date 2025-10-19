import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Markdown",
  description:
    "A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.",
  titleTemplate: "%s | Prompt Kit",
  openGraph: {
    title: "Markdown - Prompt Kit",
    description:
      "A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.",
    url: "https://ai-elements.vercel.app/prompt-kit/markdown",
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
    title: "Markdown - Prompt Kit",
    description:
      "A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Prompt Kit - Markdown Component",
  },
};
