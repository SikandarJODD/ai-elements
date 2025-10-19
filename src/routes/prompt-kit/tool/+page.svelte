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
  const toolProps = [
    {
      name: "toolPart",
      type: "ToolPart",
      description: "The tool invocation data to display",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Whether the tool details are expanded by default",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
  ];

  const toolPartProps = [
    {
      name: "type",
      type: "string",
      description: "The type of the tool",
    },
    {
      name: "state",
      type: "string",
      description: "The state of the tool (input-streaming, input-available, output-available, output-error)",
    },
    {
      name: "input",
      type: "Record<string, unknown>",
      description: "The input data to the tool",
    },
    {
      name: "output",
      type: "Record<string, unknown>",
      description: "The output data from the tool",
    },
    {
      name: "toolCallId",
      type: "string",
      description: "The tool call identifier",
    },
    {
      name: "errorText",
      type: "string",
      description: "The error text if the tool failed to execute",
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
      <Subheading class="md:text-3xl">Tool</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        Displays tool call details including input, output, status, and errors. Ideal for visualizing AI tool usage in chat UIs. Compatible with AI SDK v5 architecture.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic Tool -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="basic-tool">Basic Tool</h3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Tool States -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="tool-states">Tool States</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Show different states of tool execution: pending, running, completed, and error.
      </p>
      <Playground code={examples.states.code}>
        <div class="w-full flex justify-center">
          <examples.states.Component />
        </div>
      </Playground>

      <!-- Example 3: Tool States Compact -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="tool-states-compact">Tool States Compact</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        A more compact view showing different tool states in a streamlined layout.
      </p>
      <Playground code={examples.statesCompact.code}>
        <div class="w-full flex justify-center">
          <examples.statesCompact.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-tool.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- Tool -->
      <ComponentAPITable componentName="Tool" props={toolProps} class="mt-6" id="tool-props" />

      <!-- ToolPart -->
      <ComponentAPITable componentName="ToolPart" props={toolPartProps} id="tool-part-props" />
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
