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
  const chatContainerRootProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Child components to render inside the container",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props",
    },
  ];

  const chatContainerContentProps = [
    {
      name: "children",
      type: "Snippet",
      description: "Child components to render inside the content container",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props",
    },
  ];

  const chatContainerScrollAnchorProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props",
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
      <Subheading class="md:text-3xl">Chat Container</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        A component for creating chat interfaces with intelligent auto-scrolling behavior, designed to provide a smooth experience in conversation interfaces.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Chat Container Basic -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="chat-container-basic">Chat Container Basic</h3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Streaming Text Example -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="streaming-text-example">Streaming Text Example</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        A chat container that demonstrates text streaming with automatic scrolling. Click the "Show Streaming" button to see a simulated streaming response with the smart auto-scroll behavior in action.
      </p>
      <Playground code={examples.streaming.code}>
        <div class="w-full flex justify-center">
          <examples.streaming.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-chat-container.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <p class="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The ChatContainer is built using three separate components that work together:
      </p>

      <!-- ChatContainerRoot -->
      <h3 class="text-base font-semibold mb-3 mt-6" id="chat-container-root">ChatContainerRoot</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The main container that provides auto-scrolling functionality using the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">use-stick-to-bottom</code> library.
      </p>
      <ComponentAPITable componentName="ChatContainerRoot" props={chatContainerRootProps} class="mt-4" id="chat-container-root-props" />

      <!-- ChatContainerContent -->
      <h3 class="text-base font-semibold mb-3 mt-6" id="chat-container-content">ChatContainerContent</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The content wrapper that should contain your messages.
      </p>
      <ComponentAPITable componentName="ChatContainerContent" props={chatContainerContentProps} id="chat-container-content-props" />

      <!-- ChatContainerScrollAnchor -->
      <h3 class="text-base font-semibold mb-3 mt-6" id="chat-container-scroll-anchor">ChatContainerScrollAnchor</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        An optional scroll anchor element that can be used for scroll targeting.
      </p>
      <ComponentAPITable componentName="ChatContainerScrollAnchor" props={chatContainerScrollAnchorProps} id="chat-container-scroll-anchor-props" />

      <!-- Auto-Scroll Behavior Section -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="auto-scroll-behavior">Auto-Scroll Behavior</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The component uses the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">use-stick-to-bottom</code> library to provide sophisticated auto-scrolling:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6 ml-4">
        <li><strong>Smooth Animations:</strong> Uses velocity-based spring animations for natural scrolling</li>
        <li><strong>Content Resizing:</strong> Automatically detects content changes using ResizeObserver API</li>
        <li><strong>User Control:</strong> Automatically disables sticky behavior when users scroll up</li>
        <li><strong>Mobile Support:</strong> Works seamlessly on touch devices</li>
        <li><strong>Performance:</strong> Zero dependencies and optimized for chat applications</li>
        <li><strong>Scroll Anchoring:</strong> Prevents content jumping when new content is added above the viewport</li>
      </ul>

      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Key behaviors:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground mb-6 ml-4">
        <li><strong>Stick to Bottom:</strong> Automatically scrolls to bottom when new content is added (if already at bottom)</li>
        <li><strong>Smart Scrolling:</strong> Only scrolls when user is at the bottom, preserves scroll position otherwise</li>
        <li><strong>Cancel on Scroll:</strong> User can scroll up to cancel auto-scrolling behavior</li>
        <li><strong>Resume Auto-Scroll:</strong> Returns to auto-scrolling when user scrolls back to bottom</li>
      </ul>

      <!-- Using with ScrollButton Section -->
      <h3 class="text-lg font-semibold mb-3 mt-8" id="using-with-scroll-button">Using with ScrollButton</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        The ChatContainer pairs perfectly with the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">ScrollButton</code> component. The ScrollButton automatically appears when the user scrolls up and disappears when at the bottom.
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
