import type { MetaTagsProps } from "svelte-meta-tags";

export let seo: MetaTagsProps = {
  title: "Open In Chat",
  description:
    "The OpenIn component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click.",
  titleTemplate: "%s | Svelte AI Elements",
  openGraph: {
    title: "Open In Chat - Svelte AI Elements",
    description:
      "The OpenIn component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click.",
    url: "https://ai-elements.vercel.app/components/open-in-chat",
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
    title: "Open In Chat - Svelte AI Elements",
    description:
      "The OpenIn component provides a dropdown menu that allows users to open queries in different AI chat platforms with a single click.",
    image: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
    imageAlt: "Twitter image alt",
  },
};
