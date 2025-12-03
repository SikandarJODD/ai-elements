<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		CopyMarkdownButton,
		OpenInMenu,
		CodeNameBlock,
		ComponentAPITable,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";

	// Main demo example
	import NewMessageExample from "$lib/components/examples/NewMessageExample.svelte";
	import newMessageExampleRaw from "$lib/components/examples/NewMessageExample.svelte?raw";

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/new-message/llms.txt`;

	// Component API Props Data
	const messageProps = [
		{
			name: "from",
			type: "'user' | 'assistant'",
			description: "The role of the message sender",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (MessageContent, MessageActions, etc.)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const messageContentProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to render (typically MessageResponse)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const messageResponseProps = [
		{
			name: "content",
			type: "string",
			description: "Markdown content to render with syntax highlighting",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const messageActionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "MessageAction components",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const messageActionProps = [
		{
			name: "tooltip",
			type: "string",
			description: "Tooltip text shown on hover",
		},
		{
			name: "label",
			type: "string",
			description: "Accessible label for the action",
		},
		{
			name: "onclick",
			type: "() => void",
			description: "Click handler function",
		},
	];

	const messageBranchProps = [
		{
			name: "defaultBranch",
			type: "number",
			default: "0",
			description: "Initial branch index to display",
		},
		{
			name: "children",
			type: "Snippet",
			description: "MessageBranchContent and MessageBranchSelector",
		},
	];

	const messageBranchContentProps = [
		{
			name: "content",
			type: "T[]",
			description: "Array of content items to render",
		},
		{
			name: "renderItem",
			type: "Snippet<[T, number]>",
			description: "Snippet to render each content item",
		},
	];

	const messageAttachmentProps = [
		{
			name: "name",
			type: "string",
			description: "File name to display",
		},
		{
			name: "type",
			type: "string",
			description: "MIME type (e.g., 'image/png', 'application/pdf')",
		},
		{
			name: "size",
			type: "number",
			description: "File size in bytes",
		},
		{
			name: "onRemove",
			type: "() => void",
			description: "Handler called when remove button is clicked",
		},
	];

	// ASCII Component Structure - Simple Tree
	const componentStructure = `Message
├── MessageAttachments
│   └── MessageAttachment
│
├── MessageContent
│   └── MessageResponse (markdown)
│
├── MessageBranch (for multiple versions)
│   ├── MessageBranchContent
│   └── MessageBranchSelector
│       ├── MessageBranchPrevious
│       ├── MessageBranchPage
│       └── MessageBranchNext
│
├── MessageToolbar
│   └── MessageActions
│       └── MessageAction (retry, like, copy...)`;
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Message</Subheading>

			<p class="!text-muted-foreground my-2 text-sm md:text-lg">
				A comprehensive suite of components for displaying chat messages, including message
				rendering, branching, actions, and markdown responses.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="New Message" {llmsTxtUrl} type="ai-elements" />
			</div>

			<!-- Main Demo -->
			<Subheading>Demo</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Full-featured example with attachments, branching, and actions.
			</p>
			<div data-toc-index={false}>
				<Playground code={newMessageExampleRaw}>
					<NewMessageExample />
				</Playground>
			</div>

			<!-- Basic Example -->
			<Subheading>Basic Usage</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Simple user and assistant messages with markdown content.
			</p>
			<div data-toc-index={false}>
				<Playground code={examples.basic.code}>
					<examples.basic.Component />
				</Playground>
			</div>

			<!-- Installation -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/new-message.json`}
				is_jsrepo={true}
				blockname="new-message"
			/>

			<!-- Features -->
			<Subheading>Features</Subheading>
			<ul class="text-muted-foreground mb-8 list-disc space-y-2 pl-6 text-sm">
				<li>
					Displays messages from both user and AI assistant with distinct styling and
					automatic alignment
				</li>
				<li>
					Minimalist flat design with user messages in secondary background and assistant
					messages full-width
				</li>
				<li>
					Response branching with navigation controls to switch between multiple AI
					versions
				</li>
				<li>File attachments display with file type icons, names, and sizes</li>
				<li>
					Action buttons with tooltips for common actions like copy, retry, like, dislike
				</li>
				<li>
					Built-in markdown rendering with syntax highlighting via <CodeSpan
						>svelte-streamdown</CodeSpan
					>
				</li>
				<li>Automatic dark/light theme support via <CodeSpan>mode-watcher</CodeSpan></li>
				<li>Svelte 5 runes with class-based context for state management</li>
			</ul>

			<!-- Component Structure -->
			<Subheading>Component Structure</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Visual representation of how components are composed together:
			</p>
			<div data-toc-index={false} class="mb-8 overflow-x-auto">
				<Code lang="text" code={componentStructure} />
			</div>

			<!-- With Attachments Example -->
			<Subheading>With Attachments</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Messages with file attachments like images and documents.
			</p>
			<div data-toc-index={false}>
				<Playground code={examples.withAttachments.code}>
					<examples.withAttachments.Component />
				</Playground>
			</div>

			<!-- With Branching Example -->
			<Subheading>With Branching</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Navigate between multiple AI response versions using branch selector.
			</p>
			<div data-toc-index={false}>
				<Playground code={examples.withBranching.code}>
					<examples.withBranching.Component />
				</Playground>
			</div>

			<!-- With Actions Example -->
			<Subheading>With Actions</Subheading>
			<p class="text-muted-foreground mb-4 text-sm">
				Action buttons for copy, regenerate, like, and dislike.
			</p>
			<div data-toc-index={false}>
				<Playground code={examples.withActions.code}>
					<examples.withActions.Component />
				</Playground>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Integrate with Vercel AI SDK v5's <CodeSpan>Chat</CodeSpan> class for real-time streaming
				responses.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import {
    Message,
    MessageContent,
    MessageResponse,
    MessageActions,
    MessageAction,
  } from "$lib/components/ai-elements/new-message";
  import Copy from "@lucide/svelte/icons/copy";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";

  let chat = new Chat({});

  function handleCopy(content: string) {
    navigator.clipboard.writeText(content);
  }
\<\/script\>

<div class="flex flex-col gap-4 p-4">
  {#each chat.messages as message (message.id)}
    <Message from={message.role}>
      <MessageContent>
        {#each message.parts as part, i (i)}
          {#if part.type === "text"}
            <MessageResponse content={part.text} />
          {/if}
        {/each}
      </MessageContent>
      {#if message.role === "assistant"}
        <MessageActions>
          <MessageAction tooltip="Regenerate" onclick={() => chat.reload()}>
            <RefreshCcw class="size-4" />
          </MessageAction>
          <MessageAction tooltip="Copy" onclick={() => handleCopy(message.content || "")}>
            <Copy class="size-4" />
          </MessageAction>
        </MessageActions>
      {/if}
    </Message>
  {/each}
</div>`}
				/>
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following route to your backend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="api/chat/+server.ts"
					lang="typescript"
					code={`import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<ComponentAPITable
				componentName="Message"
				props={messageProps}
				class="mt-6"
				id="message"
			/>

			<ComponentAPITable
				componentName="MessageContent"
				props={messageContentProps}
				id="message-content"
			/>

			<ComponentAPITable
				componentName="MessageResponse"
				props={messageResponseProps}
				id="message-response"
			/>

			<ComponentAPITable
				componentName="MessageActions"
				props={messageActionsProps}
				id="message-actions"
			/>

			<ComponentAPITable
				componentName="MessageAction"
				props={messageActionProps}
				id="message-action"
			/>

			<ComponentAPITable
				componentName="MessageBranch"
				props={messageBranchProps}
				id="message-branch"
			/>

			<ComponentAPITable
				componentName="MessageBranchContent"
				props={messageBranchContentProps}
				id="message-branch-content"
			/>

			<ComponentAPITable
				componentName="MessageAttachment"
				props={messageAttachmentProps}
				id="message-attachment"
			/>
		</main>

		<!-- TOC Sidebar -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
