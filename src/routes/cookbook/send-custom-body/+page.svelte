<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/send-custom-body/llms.txt`;

	let clientCode = `<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let userName = $state("Alice");
  let userAge = $state(25);

  // The body object is sent with every request
  let chat = $derived(
    new Chat({
      transport: new DefaultChatTransport({
        api: "/api/cookbook/send-custom-body",
        body: {
          name: userName,
          age: userAge
        }
      })
    })
  );
<\/script>

<input bind:value={userName} placeholder="Name" />
<input type="number" bind:value={userAge} placeholder="Age" />`;

	let serverCode = `import { streamText, convertToModelMessages } from "ai";

export const POST = async ({ request }) => {
  // Destructure custom fields alongside messages
  const { messages, name, age } = await request.json();
  
  console.log("Custom data:", name, age);

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    // Use custom data to personalize the system prompt
    system: \`You are talking to \${name} who is \${age} years old.\`,
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
};`;
</script>

<MetaTags
	title="Send Custom Body - Svelte Cookbook"
	description="Send additional data alongside chat messages to your API endpoint."
	openGraph={{
		title: "Send Custom Body - Svelte Cookbook",
		description: "Send additional data alongside chat messages to your API endpoint.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/send-custom-body",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Send Custom Body</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Send Custom Body" {llmsTxtUrl} type="ai-elements" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Custom Data</Badge>
			<Badge variant="secondary">Personalization</Badge>
			<Badge variant="secondary">API</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Send additional data with every chat request. Perfect for user preferences, session
			info, or any custom parameters your API needs.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Use Cases</h2>
		<p class="text-muted-foreground leading-relaxed">
			Common scenarios include sending user IDs for personalization, API keys for different
			providers, theme preferences, or any application state that should influence the AI
			response.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<p class="text-muted-foreground mb-4 text-sm">Change the name and age, then send a message!</p>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The <code class="text-foreground">body</code> option accepts any object. When using
			<code class="text-foreground">$derived</code>, the chat transport updates reactively with new values.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[[12, 16]]} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Destructure your custom fields from the request body. Use them to personalize the
			system prompt or for any server-side logic.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} highlight={[[4, 5], [11, 12]]} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/send-custom-body"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="send-custom-body" />
	</footer>
</article>

