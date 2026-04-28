<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import {
		CodeNameBlock,
		CodeSpan,
		AiInstallCommand,
		Installation,
		Subheading,
		BasicSetupPrereq,
	} from "$lib/components/docs";
	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	import { PMCommand } from "$lib/components/ui/pm-command";

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
			<header class="mb-10 sm:mb-12">
				<h1
					data-toc-index={false}
					class="mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl"
				>
					Svelte 5 + AI SDK Integration Guide
				</h1>
			</header>
			<section class="mb-10 sm:mb-12">
				<Subheading>Step 1: Install Required Components</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Let's install message and prompt input components.
				</p>

				<div class="mb-6 space-y-2">
					<PMCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/r/message.json`,
						]}
					/>
					<PMCommand
						command="execute"
						args={[
							"shadcn-svelte@latest",
							"add",
							`${PUBLIC_WEBSITE_URL}/r/prompt-input.json`,
						]}
					/>
				</div>
			</section>

			<section class="mb-10 sm:mb-12">
				<Subheading>Step 2: Create Server Endpoint</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Create the API endpoint in <CodeSpan>src/routes/api/chat/+server.ts</CodeSpan>
				</p>

				<div class="mb-6">
					<CodeNameBlock
						filename="+server.ts"
						lang="typescript"
						code={`import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { openrouter, defaultModel } from '$lib/ai/config';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { messages } : { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel), // we created inside basic setup guide
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
					/>
				</div>

				<p class="text-muted-foreground mt-6 leading-relaxed">
					This server endpoint handles incoming chat messages and streams AI responses
					back to the frontend using the AI SDK.
				</p>
			</section>

			<section class="mb-10 sm:mb-12">
				<Subheading>Step 3: Create Frontend Chat Interface</Subheading>
				<p class="mb-6 text-sm leading-relaxed sm:text-base">
					Build the chat interface inside <CodeSpan>src/routes/+page.svelte</CodeSpan>
					using AI SDK's Svelte:
				</p>
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import * as Message from "$lib/components/ai-elements/message";
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input";

	let chat = new Chat({});

	let handleSubmit = (message: PromptInputMessage) => {
		chat.sendMessage({ text: message.text });
	};
\<\/script\>

<div>
	<!-- Prompt Input -->
	<div class="max-w-xl">
		<PromptInput.Root onSubmit={handleSubmit}>
			<PromptInput.Body>
				<PromptInput.Textarea placeholder="Type your message..." />
			</PromptInput.Body>
			<PromptInput.Toolbar>
				<PromptInput.Submit status={chat.status} />
			</PromptInput.Toolbar>
		</PromptInput.Root>
	</div>
	<!-- Chat Messages -->
	<div class="mt-6 flex flex-col gap-4">
		{#each chat.messages as message}
			{#each message.parts as part}
				<Message.Root from={message.role}>
					{#if part.type === "text"}
						<Message.Content>
							<Message.Response content={part.text}></Message.Response>
						</Message.Content>
					{/if}
				</Message.Root>
			{/each}
		{/each}
	</div>
</div>
`}
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
