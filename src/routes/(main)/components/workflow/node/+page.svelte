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
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Node</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Node</CodeSpan> component provides a composable, Card-based node for Svelte
				Flow canvases. It includes support for connection handles, structured layouts, and consistent
				styling using shadcn/ui components.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/node.json`}
				is_jsrepo={true}
				blockname="workflow"
			/>

			<Subheading>Usage</Subheading>

			<CodeNameBlock
				filename="node-example.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import {
    Node,
    NodeHeader,
    NodeTitle,
    NodeDescription,
    NodeAction,
    NodeContent,
    NodeFooter,
  } from "$lib/components/ai-elements/workflow/node/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
\</script\>

<Node handles={{ target: true, source: true }}>
  <NodeHeader>
    <NodeTitle>Node Title</NodeTitle>
    <NodeDescription>Optional description</NodeDescription>
    <NodeAction>
      <Button>Action</Button>
    </NodeAction>
  </NodeHeader>
  <NodeContent>
    Main content goes here
  </NodeContent>
  <NodeFooter>
    Footer content
  </NodeFooter>
</Node>`}
			/>

			<Subheading>Features</Subheading>

			<ul class="my-4 space-y-2 text-sm sm:text-base">
				<li>• Built on shadcn/ui Card components for consistent styling</li>
				<li>• Automatic handle placement (left for target, right for source)</li>
				<li>
					• Composable sub-components (Header, Title, Description, Action, Content,
					Footer)
				</li>
				<li>• Semantic structure for organizing node information</li>
				<li>• Pre-styled sections with borders and backgrounds</li>
				<li>• Responsive sizing with fixed small width</li>
				<li>• Full TypeScript support with proper type definitions</li>
				<li>• Compatible with Svelte Flow's node system</li>
			</ul>

			<Subheading>Props</Subheading>

			<div class="my-4 space-y-6">
				<div>
					<p class="mb-3 font-semibold">&lt;Node /&gt;</p>
					<div class="space-y-3">
						<div class="border-primary border-l-2 pl-4">
							<p class="mb-1 font-mono text-sm font-semibold">handles</p>
							<p class="text-muted-foreground text-sm">
								<span class="font-mono text-xs"
									>{"{ target: boolean; source: boolean; }"}</span
								> - Configuration for connection handles. Target renders on the left,
								source on the right.
							</p>
						</div>

						<div class="border-primary border-l-2 pl-4">
							<p class="mb-1 font-mono text-sm font-semibold">className?</p>
							<p class="text-muted-foreground text-sm">
								<span class="font-mono text-xs">string</span> - Additional CSS classes
								to apply to the node.
							</p>
						</div>
					</div>
				</div>

				<div>
					<p class="mb-3 font-semibold">&lt;NodeHeader /&gt;</p>
					<div class="border-primary border-l-2 pl-4">
						<p class="mb-1 font-mono text-sm font-semibold">className?</p>
						<p class="text-muted-foreground text-sm">
							<span class="font-mono text-xs">string</span> - Additional CSS classes to
							apply to the header.
						</p>
					</div>
				</div>

				<div>
					<p class="mb-3 font-semibold">&lt;NodeContent /&gt;</p>
					<div class="border-primary border-l-2 pl-4">
						<p class="mb-1 font-mono text-sm font-semibold">className?</p>
						<p class="text-muted-foreground text-sm">
							<span class="font-mono text-xs">string</span> - Additional CSS classes to
							apply to the content.
						</p>
					</div>
				</div>

				<div>
					<p class="mb-3 font-semibold">&lt;NodeFooter /&gt;</p>
					<div class="border-primary border-l-2 pl-4">
						<p class="mb-1 font-mono text-sm font-semibold">className?</p>
						<p class="text-muted-foreground text-sm">
							<span class="font-mono text-xs">string</span> - Additional CSS classes to
							apply to the footer.
						</p>
					</div>
				</div>
			</div>

			<AiElementsPrevNext currentSlug="node" />
		</main>

		<Toc.Root toc={toc.current} />
	</div>
</Sidebar.Inset>
