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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/checkpoint/llms.txt`;

	// Component API Props Data
	const checkpointProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (CheckpointIcon, CheckpointTrigger)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const checkpointIconProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the icon",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom icon content (overrides default icon)",
		},
		{
			name: "size",
			type: "number",
			default: "16",
			description: "Size of the icon in pixels",
		},
	];

	const checkpointTriggerProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Button content",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Button variant style",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Button size",
		},
		{
			name: "tooltip",
			type: "string",
			description: "Optional tooltip text to display on hover",
		},
		{
			name: "onclick",
			type: "(e: MouseEvent) => void",
			description: "Click handler function",
		},
		{
			name: "disabled",
			type: "boolean",
			default: "false",
			description: "Whether the button is disabled",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Checkpoint</Subheading>
			<p class="!text-muted-foreground my-2 text-lg">
				A simple component for marking conversation history points and restoring the chat to
				a previous state.
			</p>

			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="checkpoint" {llmsTxtUrl} type="ai-elements" />
			</div>

			<!-- Preview -->
			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/checkpoint.json`}
				is_jsrepo={true}
				blockname="checkpoint"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<Code
				lang="svelte"
				code={`\<script lang="ts"\>
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
<\/script\>

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger onclick={() => handleRestore()}>
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>`}
			/>

			<!-- Examples -->
			<Subheading>Examples</Subheading>

			<h3 class="mb-4 text-lg font-semibold">With Tooltip</h3>
			<Code
				lang="svelte"
				code={`<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger
    tooltip="Restores workspace and chat to this point"
    onclick={() => handleRestore()}
  >
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>`}
			/>

			<h3 class="mt-6 mb-4 text-lg font-semibold">With Conversation</h3>
			<Code
				lang="svelte"
				code={`\<script lang="ts"\>
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
  import { Conversation, ConversationContent } from "$lib/components/ai-elements/conversation";
  import { Message, MessageContent } from "$lib/components/ai-elements/message";

  let messages = $state([...]);
  let checkpoints = $state([{ messageCount: 2, label: "Checkpoint 1" }]);

  function handleRestore(messageCount: number) {
    messages = messages.slice(0, messageCount);
  }
<\/script\>

<Conversation>
  <ConversationContent>
    {#each messages as message, index}
      <Message from={message.role}>
        <MessageContent>{message.content}</MessageContent>
      </Message>

      {#each checkpoints as checkpoint}
        {#if checkpoint.messageCount === index + 1}
          <Checkpoint>
            <CheckpointIcon />
            <CheckpointTrigger onclick={() => handleRestore(checkpoint.messageCount)}>
              Restore: {checkpoint.label}
            </CheckpointTrigger>
          </Checkpoint>
        {/if}
      {/each}
    {/each}
  </ConversationContent>
</Conversation>`}
			/>

			<h3 class="mt-6 mb-4 text-lg font-semibold">Custom Icon</h3>
			<Code
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Flag } from "@lucide-svelte/icons";
<\/script\>

<Checkpoint>
  <CheckpointIcon>
    <Flag class="size-4 text-blue-500" />
  </CheckpointIcon>
  <CheckpointTrigger onclick={() => handleRestore()}>
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>`}
			/>

			<!-- Component API -->
			<Subheading>Component API</Subheading>

			<ComponentAPITable componentName="Checkpoint" props={checkpointProps} />

			<ComponentAPITable componentName="CheckpointIcon" props={checkpointIconProps} />

			<ComponentAPITable componentName="CheckpointTrigger" props={checkpointTriggerProps} />

			<!-- Features -->
			<Subheading>Features</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>Simple flex layout with icon, trigger, and separator</li>
				<li>Visual separator line for clear conversation breaks</li>
				<li>Clickable restore button for reverting to checkpoint</li>
				<li>Customizable icon (defaults to BookmarkIcon)</li>
				<li>Optional tooltip for additional context</li>
				<li>Keyboard accessible with proper ARIA labels</li>
				<li>Responsive design that adapts to different screen sizes</li>
				<li>Seamless light/dark theme integration</li>
			</ul>

			<!-- Use Cases -->
			<Subheading>Use Cases</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>Conversation branching and exploration</li>
				<li>Undo functionality for chat history</li>
				<li>Version control for conversations</li>
				<li>Debugging conversation flows</li>
				<li>Enhanced user control over chat history</li>
			</ul>
		</main>

		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
