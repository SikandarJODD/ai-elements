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
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/conversation/llms.txt`;
	// Component API Props Data
	const conversationProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the conversation container",
		},
		{
			name: "initial",
			type: "ScrollBehavior",
			default: "'smooth'",
			description: "Scroll behavior for initial scroll to bottom ('auto' | 'smooth')",
		},
		{
			name: "resize",
			type: "ScrollBehavior",
			default: "'smooth'",
			description: "Scroll behavior when container resizes ('auto' | 'smooth')",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Child components (typically ConversationContent and ConversationScrollButton)",
		},
		{
			name: "ref",
			type: "HTMLDivElement",
			description: "Bindable reference to the conversation container element",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const conversationContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Message components to render in the conversation",
		},
		{
			name: "ref",
			type: "HTMLDivElement",
			description: "Bindable reference to the content container element",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const conversationEmptyStateProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the empty state container",
		},
		{
			name: "title",
			type: "string",
			default: "'No messages yet'",
			description: "Title text to display in the empty state",
		},
		{
			name: "description",
			type: "string",
			default: "'Start a conversation to see messages here'",
			description: "Description text to display in the empty state",
		},
		{
			name: "icon",
			type: "Snippet",
			description: "Custom icon snippet to display above the title",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to replace the default empty state layout",
		},
		{
			name: "ref",
			type: "HTMLDivElement",
			description: "Bindable reference to the empty state container element",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const conversationScrollButtonProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the scroll button",
		},
		{
			name: "onclick",
			type: "MouseEventHandler<HTMLButtonElement>",
			description: "Click handler for the scroll button",
		},
		{
			name: "...restProps",
			type: "ButtonProps",
			description: "All other Button component props are supported",
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
			<Subheading class="md:text-3xl">Conversation</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Conversation</CodeSpan> component wraps messages and automatically scrolls
				to the bottom. Also includes a scroll button that appears when not at the bottom.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Conversation" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<div class="dark-scrollbar h-96 w-full overflow-y-auto rounded-xl border">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/conversation.json`}
				is_jsrepo={true}
				blockname="conversation"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
\<\/script\>

<Conversation class="h-full">
  <ConversationContent>
    {#if visibleMessages.length === 0}
      <ConversationEmptyState
        description="Messages will appear here as the conversation progresses."
        title="Start a conversation"
      >
        {#snippet icon()}
          <MessageSquare class="size-6" />
        {/snippet}
      </ConversationEmptyState>
    {:else}
      {#each visibleMessages as messageData, index (messageData.key)}
        <Message from={index % 2 === 0 ? "user" : "assistant"}>
          <MessageContent>{messageData.value}</MessageContent>
          <MessageAvatar name={messageData.name} src={messageData.avatar} />
        </Message>
      {/each}
    {/if}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple conversational UI with <CodeSpan>Conversation</CodeSpan> and <CodeSpan
					>PromptInput</CodeSpan
				>:
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
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";
  import { MessageSquare } from "lucide-svelte";

  let input = $state("");
  let chat = new Chat({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (input.trim()) {
      chat.sendMessage({ text: input });
      input = "";
    }
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <Conversation>
      <ConversationContent>
        {#if chat.messages.length === 0}
          <ConversationEmptyState
            title="Start a conversation"
            description="Type a message below to begin chatting"
          >
            {#snippet icon()}
              <MessageSquare class="size-12" />
            {/snippet}
          </ConversationEmptyState>
        {:else}
          {#each chat.messages as message, messageIndex (messageIndex)}
            <Message from={message.role}>
              <MessageContent>
                {#each message.parts as part, partIndex (partIndex)}
                  {#if part.type === "text"}
                    <Response>{part.text}</Response>
                  {/if}
                {/each}
              </MessageContent>
            </Message>
          {/each}
        {/if}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <Input onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
      <PromptInputTextarea
        bind:value={input}
        placeholder="Say something..."
        class="pr-12"
      />
      <PromptInputSubmit
        status={chat.status === "streaming" ? "streaming" : "ready"}
        disabled={!input.trim()}
        class="absolute bottom-1 right-1"
      />
    </Input>
  </div>
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
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: "openai/gpt-4o", // or your preferred model
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed sm:text-base">
				<li>Automatic scrolling to the bottom when new messages are added</li>
				<li>Smooth scrolling behavior with configurable animation</li>
				<li>Scroll button that appears when not at the bottom</li>
				<li>Responsive design with customizable padding and spacing</li>
				<li>Flexible content layout with consistent message spacing</li>
				<li>Accessible with proper ARIA roles for screen readers</li>
				<li>Customizable styling through class prop</li>
				<li>Support for any number of child message components</li>
			</ul>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Conversation -->
			<ComponentAPITable
				componentName="Conversation"
				props={conversationProps}
				class="mt-6"
				id="conversation-props"
			/>

			<!-- ConversationContent -->
			<ComponentAPITable
				componentName="ConversationContent"
				props={conversationContentProps}
				id="conversation-content-props"
			/>

			<!-- ConversationEmptyState -->
			<ComponentAPITable
				componentName="ConversationEmptyState"
				props={conversationEmptyStateProps}
				id="conversation-empty-state-props"
			/>

			<!-- ConversationScrollButton -->
			<ComponentAPITable
				componentName="ConversationScrollButton"
				props={conversationScrollButtonProps}
				id="conversation-scroll-button-props"
			/>

			<AiElementsPrevNext currentSlug="conversation" />
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
