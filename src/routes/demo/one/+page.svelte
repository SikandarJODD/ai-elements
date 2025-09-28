<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";

  import {
    RefreshCcwIcon,
    ClipboardIcon,
    SunIcon,
    MoonIcon,
    PlusIcon,
  } from "@lucide/svelte";

  import { mode, toggleMode } from "mode-watcher";
  import { watch } from "runed";

  // Shadcn Svelte Components
  import Button from "$lib/components/ui/button/button.svelte";

  // Svelte AI Elements components
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message/index";

  import { Actions, Action } from "$lib/components/ai-elements/action/index";

  import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index";

  import { Response } from "$lib/components/ai-elements/response/index";

  import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    type ChatStatus,
  } from "$lib/components/ai-elements/prompt-input";

  let input_prompt = $state("");
  let chat = $derived(new Chat({}));
  let status = $state<ChatStatus>("idle");

  let handleSubmit = (message: PromptInputMessage, event: SubmitEvent) => {
    event.preventDefault();
    const textContent = message.text || "";
    if (textContent.trim() !== "" && status === "idle") {
      chat.sendMessage({ text: textContent });
    }

    // Clear the input field after submission
    input_prompt = "";
  };

  let retryMessage = () => {
    chat.regenerate();
  };

  let copyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
  };

  let startNewConversation = () => {
    // Create a new Chat instance to clear all messages
    chat = new Chat({});
  };

  watch(
    () => chat.status,
    () => {
      if (chat.status === "error") {
        status = "error";
      } else if (chat.status === "streaming") {
        status = "streaming";
      } else if (chat.status === "ready") {
        status = "idle";
      } else if (chat.status === "submitted") {
        status = "submitted";
      }
    }
  );
</script>

<svelte:head>
  <title>Svelte 5 + AI SDK Integration Demo</title>
  <meta
    name="description"
    content="A simple chat interface built with Svelte 5 and AI SDK using Svelte AI Elements."
  />
</svelte:head>

<!--
  Structure:
  - Header : Title, New Chat Button, Dark/Light Mode Toggle
  - Chat Messages Container
  - Input Container
 -->

<main class="flex flex-col h-[calc(100vh-5rem)] bg-background">
  <!-- Header -->
  <header class="bg-background border-b border-border px-6 h-16 shadow-sm">
    <div class="max-w-4xl mx-auto flex items-center justify-between h-full">
      <div>
        <h1 class="text-xl font-semibold text-foreground">
          Svelte 5 + AI SDK Integration
        </h1>
        <p class="text-xs text-muted-foreground">using Svelte AI Elements</p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onclick={startNewConversation}
          class="flex items-center gap-1"
        >
          <PlusIcon class="size-4" />
          New
        </Button>

        <Button variant="ghost" size="icon" onclick={toggleMode}>
          {#if mode.current === "dark"}
            <SunIcon class="size-4" />
          {:else}
            <MoonIcon class="size-4" />
          {/if}
        </Button>
      </div>
    </div>
  </header>

  <!-- Chat Messages Container -->
  <Conversation class="flex-1">
    <ConversationContent class="max-w-3xl mx-auto w-full px-4">
      {#if chat.messages.length === 0}
        <ConversationEmptyState
          title="Welcome! Svelte Devs"
          description="Start a conversation by typing a message below."
        >
          {#snippet icon()}
            <div class="text-3xl">👋</div>
          {/snippet}
        </ConversationEmptyState>
      {:else}
        <div class="space-y-4 py-4">
          {#each chat.messages as message, messageIndex (messageIndex)}
            <div class="group relative">
              <Message from={message.role}>
                <MessageContent>
                  {#each message.parts as part, partIndex (partIndex)}
                    {#if part.type === "text"}
                      {#if message.role === "assistant"}
                        <!-- Assistant Response with Streaming -->
                        <Response
                          content={part.text}
                          animation={{ enabled: true }}
                        />
                      {:else}
                        <!-- User Message -->
                        <div
                          class="prose prose-sm max-w-none dark:prose-invert"
                        >
                          {part.text}
                        </div>
                      {/if}
                    {/if}
                  {/each}
                </MessageContent>
              </Message>

              <!-- Retry and Copy Actions for Assistant Messages -->
              {#if message.role === "assistant"}
                <Actions
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Action label="Retry" tooltip="Retry" onclick={retryMessage}>
                    <RefreshCcwIcon class="size-4" />
                  </Action>
                  <Action
                    label="Copy"
                    tooltip="Copy"
                    onclick={() => {
                      copyMessage(
                        message.parts
                          .map((p) => (p.type === "text" ? p.text : ""))
                          .join("")
                      );
                    }}
                  >
                    <ClipboardIcon class="size-4" />
                  </Action>
                </Actions>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </ConversationContent>
    <ConversationScrollButton />
  </Conversation>

  <!-- Input Container -->
  <div class="bg-background px-6 py-4">
    <div class="max-w-3xl mx-auto flex justify-center">
      <div class="w-full max-w-2xl">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea bind:value={input_prompt} />
          </PromptInputBody>
          <PromptInputToolbar class="flex justify-end">
            <PromptInputSubmit {status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }

  :global(::-webkit-scrollbar) {
    width: 6px;
  }

  :global(::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(::-webkit-scrollbar-thumb) {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 3px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background-color: rgba(155, 155, 155, 0.7);
  }
</style>
