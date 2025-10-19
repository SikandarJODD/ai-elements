<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
</script>

<MetaTags
  title="Introduction - Prompt Kit"
  description="Prompt Kit is a set of customizable, high-quality Svelte components built for AI applications."
  openGraph={{
    title: "Introduction - Prompt Kit",
    description:
      "Prompt Kit is a set of customizable, high-quality Svelte components built for AI applications.",
    type: "website",
    url: "https://ai-elements.vercel.app/prompt-kit",
    images: [
      {
        url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
        width: 1200,
        height: 630,
        alt: "Svelte AI Elements - Prompt Kit",
        type: "image/png",
      },
    ],
  }}
/>

<Sidebar.Inset class="px-4 md:px-6 py-8 md:py-12 lg:py-12">
  <div class="mt-8 flex flex-col gap-6 max-w-3xl">
    <p
      class="text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground"
    >
      Prompt Kit is a set of customizable, high-quality components built for AI
      applications, making it easy to design chat experiences, AI agents,
      autonomous assistants, and more, quickly and beautifully.
    </p>

    <p class="text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground">
      Prompt Kit is built on top of <a
        class="underline hover:text-primary text-primary underline-offset-2"
        href="https://shadcn-svelte.com"
        target="_blank"
        rel="noreferrer noopener">shadcn-svelte</a
      > with the same design principles. But instead of helping you build a component
      library, it helps you build AI interfaces.
    </p>

    <p class="text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground">
      This project is a work in progress, and we're continuously improving and
      expanding the collection. We'd love to hear your feedback or see your
      contributions as it evolves!
    </p>

    <p class="text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground">
      Prompt Kit is open source. Check out the code and contribute on <a
        class="underline hover:text-primary text-primary underline-offset-2"
        href="https://github.com/SikandarJODD/ai-elements"
        target="_blank"
        rel="noreferrer noopener">GitHub</a
      >.
    </p>
  </div>
</Sidebar.Inset>
