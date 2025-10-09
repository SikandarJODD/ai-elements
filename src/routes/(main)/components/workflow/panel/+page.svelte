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
      <Subheading class="md:text-3xl">Panel</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Panel</CodeSpan> component provides a positioned container for custom UI
        elements on Svelte Flow canvases. It includes modern card styling with backdrop blur and
        flexible positioning options.
      </p>

      <Playground code={examples.basic.code}>
        <examples.basic.Component />
      </Playground>

      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/panel.json`} />

      <Subheading>Usage</Subheading>

      <CodeNameBlock
        filename="panel-example.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Panel from "$lib/components/ai-elements/workflow/panel/panel.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([]);
  let edges: Edge[] = $state([]);
\</script\>

<Canvas bind:nodes bind:edges>
  <Panel position="top-left">
    <Button>Custom Action</Button>
  </Panel>
</Canvas>`}
      />

      <Subheading>Features</Subheading>

      <ul class="space-y-2 my-4 text-sm sm:text-base">
        <li>
          • Flexible positioning (top-left, top-right, bottom-left, bottom-right, top-center,
          bottom-center)
        </li>
        <li>• Rounded pill design with backdrop blur</li>
        <li>• Theme-aware card background</li>
        <li>• Flexbox layout for easy content alignment</li>
        <li>• Subtle drop shadow for depth</li>
        <li>• Full TypeScript support</li>
        <li>• Compatible with Svelte Flow's panel system</li>
      </ul>

      <Subheading>Props</Subheading>

      <div class="space-y-4 my-4">
        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">position?</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs"
              >'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' |
              'bottom-right'</span
            >
            - Position of the panel on the canvas.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">className?</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">string</span> - Additional CSS classes to apply to the
            panel.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">[...props]</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">ComponentProps&lt;typeof Panel&gt;</span> - Any other
            props from @xyflow/svelte Panel component.
          </p>
        </div>
      </div>

      <Subheading>Multiple Panels</Subheading>

      <CodeNameBlock
        filename="multi-panel.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Panel from "$lib/components/ai-elements/workflow/panel/panel.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([]);
  let edges: Edge[] = $state([]);
\</script\>

<Canvas bind:nodes bind:edges>
  <Panel position="top-left">
    <Button size="sm">Add Node</Button>
  </Panel>

  <Panel position="top-right">
    <Button size="sm" variant="outline">Settings</Button>
  </Panel>

  <Panel position="bottom-center">
    <p class="text-xs text-muted-foreground">Workflow Canvas</p>
  </Panel>
</Canvas>`}
      />
    </main>

   <Toc.Root toc={toc.current} />
  </div>
</Sidebar.Inset>
