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
  const codeBlockProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Child components to render",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props are supported",
    },
  ];

  const codeBlockCodeProps = [
    {
      name: "code",
      type: "string",
      description: "The code to display and highlight",
    },
    {
      name: "language",
      type: "string",
      default: '"tsx"',
      description: "The language for syntax highlighting",
    },
    {
      name: "theme",
      type: "string",
      default: '"github-light"',
      description: "The theme for syntax highlighting",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props are supported",
    },
  ];

  const codeBlockGroupProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Child components to render",
    },
    {
      name: "class",
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
      <Subheading class="md:text-3xl">Code Block</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        A component for displaying code snippets with syntax highlighting and customizable styling using Shiki.
      </p>

      <!-- Light Mode Note -->
      <div class="my-4 rounded-lg border bg-muted/50 p-3.5">
        <p class="text-sm text-muted-foreground">
          <span class="font-medium text-foreground">💡 Tip:</span> The first three examples use the light theme by default. Switch to light mode to view them properly. The "Different Themes" example adapts to your current color mode.
        </p>
      </div>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic Code Block -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="basic-code-block">Basic Code Block</h3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Code Block with Header -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="code-block-with-header">Code Block with Header</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can use <code class="bg-muted px-1.5 py-0.5 rounded text-sm">CodeBlockGroup</code> to add a header with metadata and actions to your code blocks.
      </p>
      <Playground code={examples.withHeader.code}>
        <div class="w-full flex justify-center">
          <examples.withHeader.Component />
        </div>
      </Playground>

      <!-- Example 3: Different Languages -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="different-languages">Different Languages</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can highlight code in various languages by changing the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">language</code> prop.
      </p>

      <!-- Python Example -->
      <h3 class="text-base font-semibold mb-3 mt-6" id="python-example">Python Example</h3>
      <Playground code={examples.python.code}>
        <div class="w-full flex justify-center">
          <examples.python.Component />
        </div>
      </Playground>

      <!-- CSS Example -->
      <h3 class="text-base font-semibold mb-3 mt-6" id="css-example">CSS Example</h3>
      <Playground code={examples.css.code}>
        <div class="w-full flex justify-center">
          <examples.css.Component />
        </div>
      </Playground>

      <!-- Example 4: Different Themes -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="different-themes">Different Themes</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Shiki supports many popular themes. This example automatically switches between <code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-light</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-dark</code> based on your current color mode. Try toggling your theme to see the change!
      </p>
      <!-- <div class="mb-4 rounded-lg border bg-muted/50 p-3.5">
        <p class="text-sm text-muted-foreground">
          <span class="font-medium text-foreground">⚠️ Note:</span> You may notice that the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-dark</code> theme doesn't display as expected because styles are being overridden. This happens when using code blocks from both AI Elements and Prompt Kit components on the same page. To avoid style conflicts, prefer using code block components from only one library in your project.
        </p>
      </div> -->
      <Playground code={examples.theme.code}>
        <div class="w-full flex justify-center">
          <examples.theme.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-code-block.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- CodeBlock -->
      <ComponentAPITable componentName="CodeBlock" props={codeBlockProps} class="mt-6" id="code-block-props" />

      <!-- CodeBlockCode -->
      <ComponentAPITable componentName="CodeBlockCode" props={codeBlockCodeProps} id="code-block-code-props" />

      <!-- CodeBlockGroup -->
      <ComponentAPITable componentName="CodeBlockGroup" props={codeBlockGroupProps} id="code-block-group-props" />

      <!-- Usage with Markdown Section -->
      <h3 class="text-xl font-semibold mb-3 mt-8" id="usage-with-markdown">Usage with Markdown</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The <code class="bg-muted px-1.5 py-0.5 rounded text-sm">CodeBlock</code> component is used internally by the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">Markdown</code> component to render code blocks in markdown content. When used within the Markdown component, code blocks are automatically wrapped with the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">not-prose</code> class to prevent conflicts with prose styling.
      </p>

      <!-- Tailwind Typography Section -->
      <h3 class="text-xl font-semibold mb-3 mt-8" id="tailwind-typography">Tailwind Typography and not-prose</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The <code class="bg-muted px-1.5 py-0.5 rounded text-sm">CodeBlock</code> component includes the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">not-prose</code> class by default to prevent Tailwind Typography's prose styling from affecting code blocks. This is important when using the <a href="https://github.com/tailwindlabs/tailwindcss-typography" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">@tailwindcss/typography</a> plugin, which provides beautiful typography defaults but can interfere with code block styling.
      </p>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Since code blocks are styled with Shiki for syntax highlighting, they should not inherit Tailwind Typography styles. The <code class="bg-muted px-1.5 py-0.5 rounded text-sm">not-prose</code> class ensures that code blocks maintain their intended appearance regardless of the surrounding typography context.
      </p>

      <!-- Customizing Syntax Highlighting Section -->
      <h3 class="text-xl font-semibold mb-3 mt-8" id="customizing-syntax-highlighting">Customizing Syntax Highlighting</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The <code class="bg-muted px-1.5 py-0.5 rounded text-sm">CodeBlockCode</code> component uses <a href="https://shiki.matsu.io/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Shiki</a> for syntax highlighting. You can customize the theme by passing a different theme name to the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">theme</code> prop.
      </p>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Shiki supports many popular themes including:
      </p>
      <ul class="list-disc list-inside mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground space-y-1">
        <li><code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-light</code> (default)</li>
        <li><code class="bg-muted px-1.5 py-0.5 rounded text-sm">github-dark</code></li>
        <li><code class="bg-muted px-1.5 py-0.5 rounded text-sm">dracula</code></li>
        <li><code class="bg-muted px-1.5 py-0.5 rounded text-sm">nord</code></li>
        <li>and more</li>
      </ul>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        For a complete list of supported themes, refer to the <a href="https://github.com/shikijs/shiki/blob/main/docs/themes.md" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Shiki documentation</a>.
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
