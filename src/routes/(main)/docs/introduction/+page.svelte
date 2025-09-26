<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
  title="Introduction - Svelte AI Elements"
  description="Svelte AI Elements is a custom registry built on top of shadcn-svelte to help you build AI-native Applications faster. It provides pre-built components like prompt input, messages, response ( svelte-streamdown) and more."
  openGraph={{
    title: "Introduction - Svelte AI Elements",
    description:
      "Svelte AI Elements is a custom registry built on top of shadcn-svelte to help you build AI-native Applications faster. It provides pre-built components like prompt input, messages, response ( svelte-streamdown) and more.",
    type: "website",
    url: "https://ai-elements.vercel.app/docs/introduction",
    images: [
      {
        url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
        width: 1200,
        height: 630,
        alt: "Svelte AI Elements",
        type: "image/png",
      },
    ],
  }}
/>

<div class="md:px-6 py-4 md:py-6">
  <h1 class="text-3xl font-bold">Svelte AI Elements</h1>
  <p class="mt-4 max-w-4xl text-lg md:text-xl text-muted-foreground">
    Svelte AI Elements is a custom registry built on top of <a
      class="underline hover:text-primary text-primary underline-offset-2"
      href="https://shadcn-svelte.com"
      target="_blank">shadcn-svelte</a
    >
    to help you build AI-native Applications faster. It provides pre-built components
    like prompt input, messages, response and more.
  </p>

  <p class="mt-4 max-w-4xl text-lg md:text-xl text-muted-foreground">
    you can install components via commands mentioned in the documentation.
  </p>
</div>
