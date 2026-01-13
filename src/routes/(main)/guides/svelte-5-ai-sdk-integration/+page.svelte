<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import * as Icons from "$lib/components/icons";
	import {
		CodeNameBlock,
		CodeSpan,
		AiInstallCommand,
		Installation,
		Subheading,
		BasicSetupPrereq,
	} from "$lib/components/docs";
	import { Card } from "$lib/components/ui/card";
	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Action } from "$lib/components/ai-elements/action/index.js";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";

	let toc = new UseToc();
</script>

<MetaTags
	title="Svelte 5 + AI SDK Integration Guide"
	description="Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns, streaming responses, and beautiful UI components. Step-by-step tutorial."
	keywords={[
		"Svelte 5",
		"AI SDK",
		"Svelte AI Elements",
		"Svelte runes",
		"AI chat application",
		"Vercel AI SDK",
		"OpenRouter",
		"streaming AI",
		"reactive AI",
		"modern Svelte",
		"AI integration tutorial",
		"SvelteKit AI",
		"chat interface",
	]}
	canonical="https://svelte-ai-elements.vercel.app/guides/svelte-5-ai-sdk-integration"
	openGraph={{
		type: "article",
		title: "Svelte 5 + AI SDK Integration Guide",
		description:
			"Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns and streaming responses.",
		url: "https://svelte-ai-elements.vercel.app/guides/svelte-5-ai-sdk-integration",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/blog-og.png",
				width: 1200,
				height: 630,
				alt: "Svelte 5 + AI SDK Integration Guide",
				type: "image/png",
			},
		],
	}}
	twitter={{
		cardType: "summary_large_image",
		title: "Svelte 5 + AI SDK Integration Guide",
		description:
			"Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns and streaming responses.",
	}}
/>

<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
		<article
			class="prose prose-gray dark:prose-invert max-w-none lg:col-span-3"
			bind:this={toc.ref}
		>
			<header class="mb-8 sm:mb-12">
				<h1
					data-toc-index={false}
					class="mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl"
				>
					Svelte 5 + AI SDK Integration Guide
				</h1>

				<div
					class="mb-8 rounded-r border-l-4 border-zinc-300 bg-zinc-50 py-3 pl-4 sm:mb-10 dark:border-zinc-600 dark:bg-zinc-900/50"
				>
					<p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
						Goal: Integrate Svelte AI Elements with Vercel AI SDK to build a streaming
						AI chat interface using OpenRouter models and shadcn-svelte
					</p>
				</div>
			</header>

			<!-- Prerequisites Section -->
			<BasicSetupPrereq />

			<!-- add small note to continue the project  -->
			<div
				class="mb-8 rounded-r border-l-4 border-zinc-300 bg-zinc-50 py-3 pl-4 sm:mb-10 dark:border-zinc-600 dark:bg-zinc-900/50"
			>
				<p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
					Note: Continue building the project by implementing the necessary components and
					logic as outlined in the guide.
				</p>
			</div>

			<section class="mb-10 sm:mb-12">
				<Subheading>File Structure & Backend API</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Create the backend API endpoint in <CodeSpan
						>src/routes/api/chat/+server.ts</CodeSpan
					>:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="+server.ts"
						lang="typescript"
						code={`import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { openrouter, defaultModel } from '$lib/ai-config';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { messages } : { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    messages: awaitconvertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
					/>
				</div>

				<p class="text-muted-foreground mt-6 leading-relaxed">
					This server endpoint handles incoming chat messages and streams AI responses
					back to the frontend using the AI SDK's streaming capabilities.
				</p>
			</section>

			<section class="mb-10 sm:mb-12">
				<Subheading>Frontend Chat Interface</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Build the chat interface in <CodeSpan>src/routes/+page.svelte</CodeSpan>
					using AI SDK's Svelte integration:
				</p>

				<!-- Add comment inside codeblock like this code is from vercel ai docs  -->

				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";

  let input = $state("");
  let chat = new Chat({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    chat.sendMessage({ text: input });
    input = "";
  }
\<\/script\>

<main class="p-4">
  <ul>
    {#each chat.messages as message, messageIndex (messageIndex)}
      <li>
        <div>{message.role}</div>
        <div>
          {#each message.parts as part, partIndex (partIndex)}
            {#if part.type === "text"}
              <div>{part.text}</div>
            {/if}
          {/each}
        </div>
      </li>
    {/each}
  </ul>
  <form onsubmit={handleSubmit}>
    <input bind:value={input} class='border rounded-md p-1' placeholder="Type your message..." />
    <button type="submit">Send</button>
  </form>
</main>`}
				/>

				<p class="text-muted-foreground mt-6 leading-relaxed">
					The <CodeSpan>Chat</CodeSpan> class from AI SDK automatically handles message state,
					streaming, and form submission, making it incredibly easy to build chat interfaces.
				</p>

				<!-- For more information visit official docs  -->
				<p class="text-muted-foreground mt-6 leading-relaxed">
					For more details, refer to the
					<a
						href="https://ai-sdk.dev/docs/getting-started/svelte#wire-up-the-ui"
						class="text-primary underline underline-offset-2"
						target="_blank"
						rel="noopener">official Vercel AI SDK Svelte documentation</a
					>.
				</p>
			</section>

			<section class="mb-10 sm:mb-12">
				<Subheading>Add Actions, Message, Prompt Input Component</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					To install the necessary components, run the following commands:
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="terminal"
						lang="bash"
						code={`bun x shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/action.json
bun x shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/message.json
bun x shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/conversation.json
bun x shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/response.json
bun x shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/prompt-input.json`}
					/>
				</div>

				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Enhance your chat interface with actions, messages, and a prompt input from
					Svelte AI Elements:
				</p>

				<CodeNameBlock
					filename="+page.svelte"
					highlight={[[18, 43]]}
					lang="svelte"
					code={`\<script lang="ts"\>
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
  import { Button } from "$lib/components/ui/button";

  // Svelte AI Elements components
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message/index.js";

  import { Actions, Action } from "$lib/components/ai-elements/action/index.js";

  import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";

  import { Response } from "$lib/components/ai-elements/response/index.js";

  import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    type ChatStatus,
  } from "$lib/components/ai-elements/prompt-input/index.js";

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

  // Watch for changes in chat status
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
\<\/script\>

<!--
  Structure:
  - Header : Title, New Chat Button, Dark/Light Mode Toggle
  - Chat Messages Container
  - Input Container
 -->

<main class="flex flex-col h-screen bg-background">
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
\<\/style>`}
				/>
			</section>

			<Card
				class="mb-8 border-zinc-200 bg-zinc-50/30 p-5 sm:mb-12 dark:border-zinc-700/40 dark:bg-zinc-800/30"
			>
				<div>
					<h3 class="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
						🎉 You're all set!
					</h3>
					<p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
						Your AI-powered Svelte app is ready with streaming responses and beautiful
						UI.
					</p>
				</div>

				<div class="flex flex-col gap-3 sm:flex-row">
					<Button
						href="/demo/one"
						target="_blank"
						rel="noopener"
						class="group gap-0 rounded-lg"
					>
						<svg
							class="mr-1.5 h-4 w-4 transition-transform group-hover:scale-110"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 22 22"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Try Live Demo
					</Button>

					<Button
						variant="secondary"
						class="group gap-0 rounded-lg"
						href="https://github.com/SikandarJODD/ai-elements/blob/master/src/routes/demo/one/%2Bpage.svelte"
						target="_blank"
						rel="noopener"
					>
						<svg
							class="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						View Source Code
					</Button>
				</div>
			</Card>

			<section class="mb-8 sm:mb-12">
				<Subheading>Free AI Models for Testing</Subheading>
				<p class="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
					Here are some free OpenRouter models you can use for testing and development:
				</p>

				<div class="grid gap-4 sm:grid-cols-2">
					<Card
						data-toc-index={false}
						class="border-zinc-200 bg-zinc-50/50 p-5 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/20 dark:hover:bg-zinc-800/30"
					>
						<div class="mb-4">
							<h4 class="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
								Fast & Efficient
							</h4>
							<p class="text-sm text-zinc-600 dark:text-zinc-400">
								Perfect for rapid prototyping and development
							</p>
						</div>
						<ul class="space-y-3">
							<li class="group flex items-center justify-between">
								<a
									href="https://openrouter.ai/models/x-ai/grok-4-fast:free"
									class="font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
									target="_blank"
									rel="noopener"
								>
									x-ai/grok-4-fast:free
								</a>
								<svg
									class="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-colors group-hover:text-zinc-600 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</li>
							<li class="group flex items-center justify-between">
								<a
									href="https://openrouter.ai/models/deepseek/deepseek-chat-v3.1:free"
									class="font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
									target="_blank"
									rel="noopener"
								>
									deepseek/deepseek-chat-v3.1:free
								</a>
								<svg
									class="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-colors group-hover:text-zinc-600 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</li>
							<li class="group flex items-center justify-between">
								<a
									href="https://openrouter.ai/models/z-ai/glm-4.5-air:free"
									class="font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
									target="_blank"
									rel="noopener"
								>
									z-ai/glm-4.5-air:free
								</a>
								<svg
									class="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-colors group-hover:text-zinc-600 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</li>
						</ul>
					</Card>

					<Card
						data-toc-index={false}
						class="border-zinc-200 bg-zinc-50/50 p-5 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/20 dark:hover:bg-zinc-800/30"
					>
						<div class="mb-4">
							<h4 class="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
								Specialized
							</h4>
							<p class="text-sm text-zinc-600 dark:text-zinc-400">
								Optimized for specific use cases
							</p>
						</div>
						<ul class="space-y-3">
							<li class="flex flex-col space-y-1.5">
								<div class="group flex items-center justify-between">
									<a
										href="https://openrouter.ai/models/qwen/qwen3-coder:free"
										class="font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
										target="_blank"
										rel="noopener"
									>
										qwen/qwen3-coder:free
									</a>
									<svg
										class="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-colors group-hover:text-zinc-600 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</div>
								<div class="flex items-center space-x-1">
									<svg
										class="h-3 w-3 text-zinc-500 dark:text-zinc-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									<span
										class="text-xs font-medium text-zinc-500 dark:text-zinc-400"
										>Code-focused</span
									>
								</div>
							</li>
							<li class="flex flex-col space-y-1.5">
								<div class="group flex items-center justify-between">
									<a
										href="https://openrouter.ai/models/moonshotai/kimi-k2:free"
										class="font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
										target="_blank"
										rel="noopener"
									>
										moonshotai/kimi-k2:free
									</a>
									<svg
										class="h-3.5 w-3.5 text-zinc-400 opacity-0 transition-colors group-hover:text-zinc-600 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</div>
								<div class="flex items-center space-x-1">
									<svg
										class="h-3 w-3 text-zinc-500 dark:text-zinc-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
										/>
									</svg>
									<span
										class="text-xs font-medium text-zinc-500 dark:text-zinc-400"
										>Long context</span
									>
								</div>
							</li>
						</ul>
					</Card>
				</div>
			</section>

			<section class="mb-8 sm:mb-12">
				<Subheading>Additional Resources</Subheading>
				<Card
					class="border-zinc-200 bg-zinc-50/30 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/10"
				>
					<div class="">
						<h3
							class="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
							data-toc-index={false}
						>
							Essential Links
						</h3>
						<p class="text-sm text-zinc-600 dark:text-zinc-400">
							Key resources to enhance your AI development journey
						</p>
					</div>
					<div class="grid gap-3 sm:grid-cols-1">
						<div class="space-y-3">
							<a
								data-toc-index={false}
								href="https://ai-sdk.dev/docs/getting-started/svelte"
								class="group flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/50 dark:bg-zinc-800/40 dark:hover:border-zinc-600/60 dark:hover:bg-zinc-800/60"
								target="_blank"
								rel="noopener"
							>
								<div>
									<h4
										class="mb-1 font-medium text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200"
									>
										Vercel AI SDK - Svelte Documentation
									</h4>
									<p class="text-sm text-zinc-600 dark:text-zinc-400">
										Official guide for Svelte integration
									</p>
								</div>
								<svg
									class="h-4 w-4 flex-shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</a>
							<a
								data-toc-index={false}
								href="https://openrouter.ai/models"
								class="group flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/50 dark:bg-zinc-800/40 dark:hover:border-zinc-600/60 dark:hover:bg-zinc-800/60"
								target="_blank"
								rel="noopener"
							>
								<div>
									<h4
										class="mb-1 font-medium text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200"
									>
										OpenRouter - AI Models
									</h4>
									<p class="text-sm text-zinc-600 dark:text-zinc-400">
										Access to multiple AI models with unified API
									</p>
								</div>
								<svg
									class="h-4 w-4 flex-shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</a>
						</div>
					</div>

					<div class="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700/50">
						<div class="space-y-2 text-center">
							<p class="text-sm text-zinc-600 dark:text-zinc-400">
								I hope this guide was helpful!
							</p>
							<p class="text-xs text-zinc-500 dark:text-zinc-500">
								Found any issues or have questions? Feel free to reach out to me:
								<a
									href="https://x.com/Sikandar_Bhide"
									target="_blank"
									rel="noopener"
									class="text-primary hover:underline hover:underline-offset-2"
								>
									@Sikandar_Bhide (Bhide Svelte)
								</a>
							</p>
						</div>
					</div>
				</Card>
			</section>

			<AiElementsPrevNext currentSlug="svelte-5-ai-sdk-integration" />
		</article>

		<!-- Table of Contents -->
		<aside class="order-first lg:order-last lg:col-span-1">
			<div class="sticky top-24 h-fit">
				<div class="lg:block">
					<div class="bg-muted/30 rounded-lg p-4 lg:p-6">
						<h3
							class="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase"
						>
							On this page
						</h3>
						<Toc.Root toc={toc.current} />
					</div>
				</div>
			</div>
		</aside>
	</div>
</div>
