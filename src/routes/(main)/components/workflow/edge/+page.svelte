<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, CodeNameBlock } from "$lib/components/docs";
  import Installation from "$lib/components/docs/installation.svelte";
  import Playground from "$lib/components/docs/playground.svelte";
  import { examples } from "./examples";
  import { seo } from "./seo";
  import CodeSpan from "$lib/components/docs/code-span.svelte";
  import { PUBLIC_WEBSITE_URL } from "$env/static/public";

  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  let toc = new UseToc();
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Edge</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Edge</CodeSpan> component provides two pre-styled edge types for Svelte Flow
        canvases: <CodeSpan>Temporary</CodeSpan> for dashed temporary connections and
        <CodeSpan>Animated</CodeSpan> for connections with animated indicators.
      </p>

      <Playground code={examples.basic.code}>
        <examples.basic.Component />
      </Playground>

      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/edge.json`} />

      <Subheading>Usage</Subheading>

      <CodeNameBlock
        filename="edge-example.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import { Edge } from "$lib/components/ai-elements/workflow/edge";
  import type { Node, Edge as EdgeType } from "@xyflow/svelte";

  const edgeTypes = {
    temporary: Edge.Temporary,
    animated: Edge.Animated,
  };

  let nodes: Node[] = $state([]);
  let edges: EdgeType[] = $state([
    { id: 'e1', source: '1', target: '2', type: 'animated' }
  ]);
\</script\>

<Canvas bind:nodes bind:edges {edgeTypes} />`}
      />

      <Subheading>Features</Subheading>

      <ul class="space-y-2 my-4 text-sm sm:text-base">
        <li>• Two distinct edge types: Temporary and Animated</li>
        <li>• Temporary edges use dashed lines with ring color</li>
        <li>• Animated edges include a moving circle indicator</li>
        <li>• Automatic handle position calculation</li>
        <li>• Smart offset calculation based on handle type and position</li>
        <li>• Uses Bezier curves for smooth, natural-looking connections</li>
        <li>• Fully compatible with Svelte Flow's edge system</li>
        <li>• Type-safe implementation with TypeScript</li>
      </ul>

      <Subheading>Edge Types</Subheading>

      <div class="space-y-4 my-4">
        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-2">Edge.Temporary</p>
          <p class="text-sm text-muted-foreground">
            A dashed edge style for temporary or preview connections. Uses a simple Bezier path
            with a dashed stroke pattern.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-2">Edge.Animated</p>
          <p class="text-sm text-muted-foreground">
            A solid edge with an animated circle that moves along the path. The animation repeats
            indefinitely with a 2-second duration, providing visual feedback for active
            connections.
          </p>
        </div>
      </div>

      <Subheading>Props</Subheading>

      <p class="mb-4 text-sm">Both edge types accept standard Svelte Flow EdgeProps:</p>

      <div class="space-y-4 my-4">
        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">id</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">string</span> - Unique identifier for the edge.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">source</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">string</span> - ID of the source node.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">target</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">string</span> - ID of the target node.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">sourcePosition?</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">Position</span> - Position of the source handle (Left,
            Right, Top, Bottom).
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">targetPosition?</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">Position</span> - Position of the target handle (Left,
            Right, Top, Bottom).
          </p>
        </div>
      </div>
    </main>

    <Toc.Root toc={toc.current} />
  </div>
</Sidebar.Inset>
