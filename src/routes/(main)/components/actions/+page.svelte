<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, CodeNameBlock } from "$lib/components/docs";
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
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Actions</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Action</CodeSpan> component provides a flexible row of action
        buttons for AI responses with common actions like retry, like, dislike, copy,
        and share.
      </p>

      <Playground code={examples.basic.code}>
        <examples.basic.Component />
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`} />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	 import { Actions, Action } from "$lib/components/ai-elements/action/index";
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

      <p class="mb-6 text-sm sm:text-base leading-relaxed">
        Build a simple chat UI where the user can copy or regenerate the most recent
        message.
      </p>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Add the following component to your frontend:
      </p>

      <div class="mb-6">
        <CodeNameBlock
          filename="+page.svelte"
          lang="svelte"
          code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import { Actions, Action } from "$lib/components/ai-elements/action/index";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index";
  import {
    Conversation,
    ConversationContent,
  } from "$lib/components/ai-elements/conversation/index";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index";
  import { Response } from "$lib/components/ai-elements/response/index";
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

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
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

      <ul class="list-disc list-inside space-y-2 mb-6 text-sm sm:text-base leading-relaxed">
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
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <!-- TOC Component -->
      <div>
        <h3 class="text-sm">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
