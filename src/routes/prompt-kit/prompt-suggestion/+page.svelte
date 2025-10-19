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
  const promptSuggestionProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Content to display in the suggestion button",
    },
    {
      name: "variant",
      type: '"default" | "destructive" | "outline" | "ghost"',
      default: '"outline"',
      description: "Visual variant of the button (normal mode) or 'ghost' (highlight mode)",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      default: '"lg"',
      description: "Size of the button (normal mode) or 'sm' (highlight mode)",
    },
    {
      name: "highlight",
      type: "string | undefined",
      default: "undefined",
      description: "When provided, enables highlight mode and highlights this text within children",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLButtonElement>",
      description: "All other button HTML attributes (including onclick)",
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
      <Subheading class="md:text-3xl">Prompt Suggestion</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        A component for implementing interactive prompt suggestions in AI interfaces. The PromptSuggestion component offers two distinct modes:
      </p>

      <ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6">
        <li><strong>Normal Mode:</strong> Renders clickable, pill-shaped buttons ideal for suggesting quick prompts in chat interfaces</li>
        <li><strong>Highlight Mode:</strong> Provides text highlighting to highlight a part of the suggestion</li>
      </ul>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic Usage -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="basic-usage">Basic Usage</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Display clickable prompt suggestions that users can select to populate an input field. You can easily use it with the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">PromptInput</code> component.
      </p>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Highlighted Prompt Suggestions -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="highlighted-prompt-suggestions">Highlighted Prompt Suggestions</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Implement prompt suggestions with search term highlighting. It's perfect to showcase a list of related prompts.
      </p>
      <Playground code={examples.highlight.code}>
        <div class="w-full flex justify-center">
          <examples.highlight.Component />
        </div>
      </Playground>

      <!-- Example 3: Complete Chat Interface -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="complete-chat-interface">Complete Chat Interface</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Build a full-featured chat interface with dynamic prompt suggestions that switch between both modes.
      </p>
      <Playground code={examples.chatComplete.code}>
        <div class="w-full flex justify-center">
          <examples.chatComplete.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-prompt-suggestion.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- PromptSuggestion -->
      <ComponentAPITable componentName="PromptSuggestion" props={promptSuggestionProps} class="mt-6" id="prompt-suggestion-props" />
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
