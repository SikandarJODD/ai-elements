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
  const stepsProps = [
    {
      name: "defaultOpen",
      type: "boolean",
      default: "true",
      description: "Whether the Steps starts expanded",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "children",
      type: "Snippet",
      description: "Child components to render",
    },
  ];

  const stepsTriggerProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Trigger content (label)",
    },
    {
      name: "leftIcon",
      type: "Snippet",
      description: "Optional left icon area; keeps width to avoid layout jump",
    },
    {
      name: "swapIconOnHover",
      type: "boolean",
      default: "true",
      description: "Swap leftIcon with chevron on hover",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const stepsContentProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "bar",
      type: "Snippet",
      description: "Optional bar element rendered at the left",
    },
    {
      name: "children",
      type: "Snippet",
      description: "Content to display in the steps",
    },
  ];

  const stepsBarProps = [
    {
      name: "className",
      type: "string",
      default: "bg-muted h-full w-[2px]",
      description: "Classes for positioning and style",
    },
  ];

  const stepsItemProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Row item content",
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
      <Subheading class="md:text-3xl">Steps</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Steps basic -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="steps-basic">Steps basic</h3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Steps with sources -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="steps-with-sources">Steps with sources</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can use the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">Source</code> component to display sources in the Steps block.
      </p>
      <Playground code={examples.withSource.code}>
        <div class="w-full flex justify-center">
          <examples.withSource.Component />
        </div>
      </Playground>

      <!-- Example 3: Steps with custom icons swap and bar -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="steps-with-custom-icons">Steps with custom icons swap and bar</h3>
      <Playground code={examples.iconSwap.code}>
        <div class="w-full flex justify-center">
          <examples.iconSwap.Component />
        </div>
      </Playground>

      <!-- Example 4: Steps with Text Shimmer Loader -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="steps-with-loader">Steps with Text Shimmer Loader</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can use the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">Loader</code> component to display a text shimmer loader in the Steps block.
      </p>
      <Playground code={examples.withLoader.code}>
        <div class="w-full flex justify-center">
          <examples.withLoader.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-steps.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- Steps -->
      <ComponentAPITable componentName="Steps" props={stepsProps} class="mt-6" id="steps-props" />

      <!-- StepsTrigger -->
      <ComponentAPITable componentName="StepsTrigger" props={stepsTriggerProps} id="steps-trigger-props" />

      <!-- StepsContent -->
      <ComponentAPITable componentName="StepsContent" props={stepsContentProps} id="steps-content-props" />

      <!-- StepsBar -->
      <ComponentAPITable componentName="StepsBar" props={stepsBarProps} id="steps-bar-props" />

      <!-- StepsItem -->
      <ComponentAPITable componentName="StepsItem" props={stepsItemProps} id="steps-item-props" />
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
