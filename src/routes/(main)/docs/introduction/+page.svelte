<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
</script>

<MetaTags
  title="Introduction - Svelte AI Elements"
  description="Svelte AI Elements is a curated set of Svelte components for building polished AI interfaces, from prompt inputs to streaming responses."
  openGraph={{
    title: "Introduction - Svelte AI Elements",
    description:
      "Svelte AI Elements is a curated set of Svelte components for building polished AI interfaces, from prompt inputs to streaming responses.",
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

<Sidebar.Inset class="px-4 md:px-6 py-8 md:py-12 lg:py-12">
  <!-- <div class="md:px-6 py-4 md:py-6"> -->
  <h1
    class="text-3xl md:text-4xl font-semibold md:font-bold leading-tight tracking-tight text-foreground"
  >
    Introduction
  </h1>

  <div class="mt-8 flex flex-col gap-6 md:gap-5">
    <p
      class="max-w-4xl text-base sm:text-lg md:text-lg leading-7 md:leading-8 text-muted-foreground"
    >
      <span class="text-primary">Svelte AI Elements</span> is a custom registy
      built on top of
      <a
        class="underline hover:text-primary text-primary underline-offset-2"
        href="https://shadcn-svelte.com"
        target="_blank"
        rel="noreferrer noopener">shadcn-svelte</a
      > to help you build AI-native applications faster.
    </p>

    <p
      class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground"
    >
      It provides a set of customizable, high-quality components build for AI
      applications like prompt input, messages, conversation, response and more.
    </p>

    <p
      class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground"
    >
        Svelte AI Elements is open source. Check out the code and contribute on <a
        class="underline hover:text-primary text-primary underline-offset-2"
        href="https://github.com/SikandarJODD/ai-elements"
        target="_blank"
        rel="noreferrer noopener">GitHub</a
      >.
    </p>
  </div>
  <!-- </div> -->
</Sidebar.Inset>
