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
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Toolbar</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Toolbar</CodeSpan> component provides a positioned toolbar that attaches
				to nodes in Svelte Flow canvases. It features modern card styling with backdrop blur
				and flexbox layout for action buttons and controls.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/toolbar.json`}
				is_jsrepo={true}
				blockname="workflow"
			/>

			<Subheading>Usage</Subheading>

			<CodeNameBlock
				filename="toolbar-example.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Node, NodeContent } from "$lib/components/ai-elements/workflow/node/index.js";
  import Toolbar from "$lib/components/ai-elements/workflow/toolbar/toolbar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
\</script\>

<Node>
  <NodeContent>...</NodeContent>
  <Toolbar>
    <Button size="sm" variant="ghost">Edit</Button>
    <Button size="sm" variant="ghost">Delete</Button>
  </Toolbar>
</Node>`}
			/>

			<Subheading>Features</Subheading>

			<ul class="my-4 space-y-2 text-sm sm:text-base">
				<li>• Attaches to any Svelte Flow node</li>
				<li>• Bottom positioning by default</li>
				<li>• Rounded card design with border</li>
				<li>• Theme-aware background styling</li>
				<li>• Flexbox layout with gap spacing</li>
				<li>• Full TypeScript support</li>
				<li>• Compatible with all Svelte Flow NodeToolbar features</li>
			</ul>

			<Subheading>Props</Subheading>

			<div class="my-4 space-y-4">
				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">className?</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">string</span> - Additional CSS classes to apply
						to the toolbar.
					</p>
				</div>

				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">[...props]</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs"
							>ComponentProps&lt;typeof NodeToolbar&gt;</span
						> - Any other props from @xyflow/svelte NodeToolbar component (position, offset,
						isVisible, etc.).
					</p>
				</div>
			</div>

			<Subheading>Custom Positioning</Subheading>

			<CodeNameBlock
				filename="custom-toolbar.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Node, NodeContent } from "$lib/components/ai-elements/workflow/node/index.js";
  import Toolbar from "$lib/components/ai-elements/workflow/toolbar/toolbar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
\</script\>

<Node>
  <NodeContent>Node Content</NodeContent>

  <!-- Toolbar positioned at the top -->
  <Toolbar position="top">
    <Button size="sm">Action 1</Button>
    <Button size="sm">Action 2</Button>
  </Toolbar>
</Node>`}
			/>

			<Subheading>With Icons</Subheading>

			<CodeNameBlock
				filename="toolbar-icons.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Node, NodeContent } from "$lib/components/ai-elements/workflow/node/index.js";
  import Toolbar from "$lib/components/ai-elements/workflow/toolbar/toolbar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Edit, Trash2, Copy } from "lucide-svelte";
\</script\>

<Node>
  <NodeContent>Node Content</NodeContent>

  <Toolbar>
    <Button size="sm" variant="ghost">
      <Edit class="h-4 w-4" />
    </Button>
    <Button size="sm" variant="ghost">
      <Copy class="h-4 w-4" />
    </Button>
    <Button size="sm" variant="ghost">
      <Trash2 class="h-4 w-4" />
    </Button>
  </Toolbar>
</Node>`}
			/>
		</main>

		<Toc.Root toc={toc.current} />
	</div>
</Sidebar.Inset>
