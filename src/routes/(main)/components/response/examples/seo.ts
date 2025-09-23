import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Response",
  description:
    "The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Response - Svelte AI Elements",
    description:
      "The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.",
    url: "https://ai-elements.vercel.app/components/response",
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
    title: "Response - Svelte AI Elements",
    description:
      "The Response component renders a Markdown response from a large language model. It uses Streamdown under the hood to render the markdown.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
