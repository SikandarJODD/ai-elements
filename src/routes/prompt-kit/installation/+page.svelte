<script lang="ts">
  import { PUBLIC_WEBSITE_URL } from "$env/static/public";
  import { Installation } from "$lib/components/docs";
  import Code from "$lib/components/docs/code.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
  title="Installation - Prompt Kit"
  description="Learn how to install and set up Prompt Kit components in your SvelteKit project."
  openGraph={{
    title: "Installation - Prompt Kit",
    description:
      "Learn how to install and set up Prompt Kit components in your SvelteKit project.",
    type: "website",
    url: "https://ai-elements.vercel.app/prompt-kit/installation",
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
  <h1
    class="text-3xl md:text-4xl font-semibold md:font-bold leading-tight tracking-tight text-foreground mb-8"
  >
    Installation
  </h1>

  <div class="flex flex-col gap-8 max-w-3xl">
    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Prerequisites
      </h2>

      <p class="text-base leading-7 text-muted-foreground mb-4">
        Before installing, ensure you have the following:
      </p>

      <ul class="ml-6 list-disc space-y-2 text-base leading-7 text-muted-foreground">
        <li>
          <a
            href="https://nodejs.org/en/download/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-foreground underline-offset-2"
            >Node.js</a
          > version 18 or later
        </li>
        <li>
          <a
            href="https://svelte.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-foreground underline-offset-2"
            >Svelte</a
          > version 5 or later
        </li>
      </ul>
    </section>

    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Install shadcn-svelte
      </h2>

      <p class="text-base leading-7 text-muted-foreground mb-4">
        First, you'll need to install and configure shadcn-svelte in your
        project. Follow the installation guide at <a
          href="https://www.shadcn-svelte.com/docs/installation"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-foreground underline-offset-2"
          >shadcn-svelte documentation</a
        >.
      </p>

      <p class="text-base leading-7 text-muted-foreground">
        Once shadcn-svelte is set up, you can install prompt-kit components
        using the shadcn CLI.
      </p>
    </section>

    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Using the shadcn CLI
      </h2>

      <div class="mb-4">
        <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/[COMPONENT].json`}  is_jsrepo={false}/>
      </div>
    </section>

    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Usage
      </h2>

      <p class="text-base leading-7 text-muted-foreground mb-4">
        After installation, import and start using the components in your
        project:
      </p>

      <Code
        lang="typescript"
        code={`import { PromptInput } from "$lib/components/prompt-kit/prompt-input";`}
      />
    </section>
  </div>
</Sidebar.Inset>
