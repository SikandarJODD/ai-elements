import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Web Preview",
  description:
    "The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code. It is designed for documentation and demo purposes, allowing users to interact with live examples and view the underlying implementation.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Web Preview - Svelte AI Elements",
    description:
      "The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code. It is designed for documentation and demo purposes, allowing users to interact with live examples and view the underlying implementation.",
    url: "https://ai-elements.vercel.app/components/web-preview",
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
    title: "Web Preview - Svelte AI Elements",
    description:
      "The Web Preview component provides a flexible way to showcase the result of a generated UI component, along with its source code. It is designed for documentation and demo purposes, allowing users to interact with live examples and view the underlying implementation.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
