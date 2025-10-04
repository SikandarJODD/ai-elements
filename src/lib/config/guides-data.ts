export interface Guide {
  slug: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  tags?: string[];
}

export const guidesData: Guide[] = [
  {
    slug: "basic-setup",
    title: "Basic Setup Guide",
    description:
      "Complete setup guide for Svelte AI Elements. Install Svelte, configure shadcn-svelte, set up OpenRouter API, and integrate AI SDK in 10 minutes.",
    image: "/assets/basic_guide.png",
    tags: ["Setup", "Getting Started", "Installation", "Beginner", "Tutorial"],
  },
  {
    slug: "svelte-5-ai-sdk-integration",
    title: "Svelte 5 + AI SDK Integration",
    description:
      "Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns and streaming responses.",
    image: "/assets/svelte-ai-elements.png",
    demoUrl: "/demo/one",
    tags: ["Svelte 5", "AI SDK", "OpenRouter", "Streaming", "Chat"],
  },
  // Add more guides here as they are created
];
