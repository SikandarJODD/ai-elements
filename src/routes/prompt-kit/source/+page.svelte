<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
  import Playground from "$lib/components/docs/playground.svelte";
  import { examples } from "./examples/examples";
  import { seo } from "./examples/seo";

  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  let toc = new UseToc();

  // Component API Props Data
  const sourceProps = [
    {
      name: "href",
      type: "string",
      description: "The URL of the source",
    },
    {
      name: "children",
      type: "Snippet",
      description: "The content to display",
    },
  ];

  const sourceTriggerProps = [
    {
      name: "label",
      type: "string | number",
      description: "The label to display",
    },
    {
      name: "showFavicon",
      type: "boolean",
      default: "false",
      description: "Whether to show the favicon",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const sourceContentProps = [
    {
      name: "title",
      type: "string",
      description: "The title to display",
    },
    {
      name: "description",
      type: "string",
      description: "The description to display",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0" bind:this={toc.ref}>
      <!-- Title -->
      <Subheading class="md:text-3xl">Source</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        Displays website sources used by AI-generated content, showing URL details, titles, and descriptions on hover.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic Source -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="basic-source">Basic Source</h3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Custom Source -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="custom-source">Custom Source</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Customize the appearance and labels of the source components. You can use custom labels, numbers, or combine them with favicons.
      </p>
      <Playground code={examples.custom.code}>
        <div class="w-full flex justify-center">
          <examples.custom.Component />
        </div>
      </Playground>

      <!-- Installation Section -->
      <Subheading>Installation</Subheading>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Copy and paste the following code into your project.
      </p>

      <div class="mb-6">
        <AiInstallCommand
          command="execute"
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-source.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- Source -->
      <ComponentAPITable componentName="Source" props={sourceProps} class="mt-6" id="source-props" />

      <!-- SourceTrigger -->
      <ComponentAPITable componentName="SourceTrigger" props={sourceTriggerProps} id="source-trigger-props" />

      <!-- SourceContent -->
      <ComponentAPITable componentName="SourceContent" props={sourceContentProps} id="source-content-props" />
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <div>
        <h3 class="text-sm font-semibold mb-4">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
