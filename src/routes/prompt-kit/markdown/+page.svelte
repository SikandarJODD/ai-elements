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
  const markdownProps = [
    {
      name: "content",
      type: "string",
      description: "Markdown content to render",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props are supported",
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
      <Subheading class="md:text-3xl">Markdown</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic Markdown -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="basic-markdown">Basic Markdown</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Render basic Markdown with support for bold, italics, lists, code blocks and more.
      </p>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Markdown with Custom Components -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="markdown-with-custom-components">Markdown with Custom Components</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can customize how different Markdown elements are rendered by providing custom components.
      </p>
      <Playground code={examples.customComponents.code}>
        <div class="w-full flex justify-center">
          <examples.customComponents.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-markdown.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- Markdown -->
      <ComponentAPITable componentName="Markdown" props={markdownProps} class="mt-6" id="markdown-props" />

      <!-- Supported Markdown Features Section -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="supported-markdown-features">Supported Markdown Features</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The Markdown component uses <code class="bg-muted px-1.5 py-0.5 rounded text-sm">svelte-streamdown</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-sm">remark-gfm</code> to support GitHub Flavored Markdown, which includes:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6">
        <li>Tables</li>
        <li>Strikethrough</li>
        <li>Tasklists</li>
        <li>Literal URLs</li>
        <li>Footnotes</li>
      </ul>
      <p class="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Additionally, the component includes built-in code block highlighting through syntax highlighting support.
      </p>

      <!-- Performance Optimization Section -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="performance-optimization">Performance Optimization</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The Markdown component employs advanced memoization techniques to optimize rendering performance, especially in streaming AI response scenarios. This approach is crucial when rendering chat interfaces where new tokens are continuously streamed.
      </p>

      <h3 class="text-base font-semibold mb-3 mt-6" id="how-memoization-works">How Memoization Works</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Our implementation:
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6 ml-4">
        <li>Splits Markdown content into discrete semantic blocks</li>
        <li>Memoizes each block individually</li>
        <li>Only re-renders blocks that have actually changed when new content arrives</li>
        <li>Preserves already rendered blocks to prevent unnecessary re-parsing and re-rendering</li>
      </ol>
      <p class="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
        This pattern significantly improves performance in chat applications by preventing the entire message history from re-rendering with each new token, which becomes increasingly important as conversations grow longer.
      </p>

      <!-- Styling with Tailwind Typography Section -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="styling-with-tailwind-typography">Styling with Tailwind Typography</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        For the best typography styling experience, we recommend using the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">@tailwindcss/typography</code> plugin. This plugin provides a set of <code class="bg-muted px-1.5 py-0.5 rounded text-sm">prose</code> classes that add beautiful typographic defaults to your markdown content.
      </p>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        When using the Markdown component with Tailwind Typography, you can apply the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">prose</code> class to get beautiful default styling.
      </p>
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
