<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		CodeNameBlock,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/shimmer/llms.txt`;

	// Component API Props Data
	const shimmerProps = [
		{
			name: "children",
			type: "Snippet",
			required: true,
			description: "The text content to display with shimmer effect",
		},
		{
			name: "content_length",
			type: "number",
			default: "30",
			description: "The approximate length of the content for calculating shimmer spread",
		},
		{
			name: "as",
			type: "keyof HTMLElementTagNameMap",
			default: '"p"',
			description: "The HTML element to render as",
		},
		{
			name: "duration",
			type: "number",
			default: "2",
			description: "Animation duration in seconds",
		},
		{
			name: "spread",
			type: "number",
			default: "2",
			description: "Shimmer spread multiplier (higher = wider shimmer)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLElement>",
			description: "All other HTML element props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Shimmer</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				An animated text shimmer component for creating eye-catching loading states and
				progressive reveal effects.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Shimmer" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/shimmer.json`}
				is_jsrepo={true}
				blockname="shimmer"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
\<\/script\>

<Shimmer content_length={35}>
  {#snippet children()}
    Hello, this is a shimmer effect!
  {/snippet}
</Shimmer>`}
				/>
			</div>

			<!-- Custom Duration -->
			<Subheading>Custom Duration</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Control the animation speed with the <CodeSpan>duration</CodeSpan> prop:
			</p>

			<div class="mb-6">
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
\<\/script\>

<div class="flex gap-4">
  <Shimmer duration={1} content_length={23}>
    {#snippet children()}
      Fast shimmer animation
    {/snippet}
  </Shimmer>

  <Shimmer duration={4} content_length={23}>
    {#snippet children()}
      Slow shimmer animation
    {/snippet}
  </Shimmer>
</div>`}
				/>
			</div>

			<!-- Custom Spread -->
			<Subheading>Custom Spread</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				The <CodeSpan>spread</CodeSpan> prop controls the width of the shimmer effect:
			</p>

			<div class="mb-6">
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
\<\/script\>

<div class="flex flex-col gap-4">
  <Shimmer spread={1} content_length={21}>
    {#snippet children()}
      Narrow shimmer spread
    {/snippet}
  </Shimmer>

  <Shimmer spread={4} content_length={18}>
    {#snippet children()}
      Wide shimmer spread
    {/snippet}
  </Shimmer>
</div>`}
				/>
			</div>

			<!-- Different HTML Elements -->
			<Subheading>Different HTML Elements</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Use the <CodeSpan>as</CodeSpan> prop to render as different HTML elements:
			</p>

			<div class="mb-6">
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
\<\/script\>

<Shimmer as="h1" class="text-4xl font-bold" content_length={23}>
  {#snippet children()}
    Heading 1 with Shimmer
  {/snippet}
</Shimmer>

<Shimmer as="span" class="text-lg" content_length={19}>
  {#snippet children()}
    Inline shimmer text
  {/snippet}
</Shimmer>`}
				/>
			</div>

			<!-- AI Loading State -->
			<Subheading>AI Loading State</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Perfect for indicating AI processing states:
			</p>

			<div class="mb-6">
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";

  let isProcessing = $state(true);
\<\/script\>

{#if isProcessing}
  <div class="space-y-2">
    <Shimmer as="div" class="text-sm" content_length={27}>
      {#snippet children()}
        Analyzing your request...
      {/snippet}
    </Shimmer>

    <Shimmer as="div" class="text-sm" duration={1.5} content_length={23}>
      {#snippet children()}
        Processing with AI...
      {/snippet}
    </Shimmer>
  </div>
{/if}`}
				/>
			</div>

			<!-- With AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Use shimmer effect to indicate AI processing:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";

  const chat = new Chat();
\<\/script\>

<div>
  {#each chat.messages as message}
    <Message role={message.role}>
      <MessageContent>{message.content}</MessageContent>
    </Message>
  {/each}

  {#if chat.status === "submitted"}
    <Message role="assistant">
      <Shimmer content_length={30}>
        {#snippet children()}
          Thinking and processing...
        {/snippet}
      </Shimmer>
    </Message>
  {/if}
</div>`}
				/>
			</div>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<ComponentAPITable componentName="Shimmer" props={shimmerProps} class="mt-6" />
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
