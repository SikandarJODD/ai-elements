<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CodeNameBlock, ComponentAPITable } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples";
	import { seo } from "./seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// Component API Props Data
	const actionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child Action components to render",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const actionProps = [
		{
			name: "tooltip",
			type: "string",
			description: "Tooltip text to display on hover",
		},
		{
			name: "label",
			type: "string",
			description:
				"Accessible label for screen readers (falls back to tooltip if not provided)",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Icon or content to render inside the button",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Size of the button",
		},
		{
			name: "onclick",
			type: "(event: MouseEvent) => void",
			description: "Click event handler",
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Whether the button is disabled",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes | HTMLAnchorAttributes",
			description: "All other button/anchor props are supported (href for links)",
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
			<Subheading class="md:text-3xl">Actions</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Action</CodeSpan> component provides a flexible row of action buttons for
				AI responses with common actions like retry, like, dislike, copy, and share.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`}
				is_jsrepo={true}
				blockname="action"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	 import { Actions, Action } from "$lib/components/ai-elements/action/index.js";
\<\/script\>

<Actions class="mt-2">
  <Action label="Like" tooltip="Like">
    <ThumbsUpIcon class="size-4" />
  </Action>
</Actions>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-6 text-sm leading-relaxed sm:text-base">
				Build a simple chat UI where the user can copy or regenerate the most recent
				message.
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
  import { Actions, Action } from "$lib/components/ai-elements/action/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import {
    Conversation,
    ConversationContent,
  } from "$lib/components/ai-elements/conversation/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";
  import { RefreshCcwIcon, CopyIcon } from "lucide-svelte";

  let input = $state("");
  let chat = new Chat({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (input.trim()) {
      chat.sendMessage({ text: input });
      input = "";
    }
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
  }

  function regenerateContent() {
    chat.regenerate();
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <Conversation>
      <ConversationContent>
        {#each chat.messages as message, messageIndex (messageIndex)}
          {#each message.parts as part, partIndex (partIndex)}
            {#if part.type === "text"}
              {@const isLastMessage = messageIndex === chat.messages.length - 1}

              <Message from={message.role}>
                <MessageContent>
                  <Response>{part.text}</Response>
                </MessageContent>
              </Message>

              {#if message.role === "assistant" && isLastMessage}
                <Actions>
                  <Action
                    onclick={regenerateContent}
                    label="Retry"
                    tooltip="Regenerate response"
                  >
                    <RefreshCcwIcon class="size-3" />
                  </Action>
                  <Action
                    onclick={() => handleCopy(part.text)}
                    label="Copy"
                    tooltip="Copy to clipboard"
                  >
                    <CopyIcon class="size-3" />
                  </Action>
                </Actions>
              {/if}
            {/if}
          {/each}
        {/each}
      </ConversationContent>
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
				<li>Row of composable action buttons with consistent styling</li>
				<li>Support for custom actions with tooltips</li>
				<li>State management for toggle actions (like, dislike, favorite)</li>
				<li>Keyboard accessible with proper ARIA labels</li>
				<li>Clipboard and Web Share API integration</li>
				<li>TypeScript support with proper type definitions</li>
				<li>Consistent with design system styling</li>
			</ul>

			<!-- Examples  -->
			<Subheading>Examples</Subheading>

			<Playground code={examples.messageAction.code}>
				<examples.messageAction.Component />
			</Playground>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Actions -->
			<ComponentAPITable
				componentName="Actions"
				props={actionsProps}
				class="mt-6"
				id="actions-props"
			/>

			<!-- Action -->
			<ComponentAPITable componentName="Action" props={actionProps} id="action-props" />
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
