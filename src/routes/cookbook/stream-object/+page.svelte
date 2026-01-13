<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/stream-object/llms.txt`;

	let serverCode = `import { streamText, Output } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

// Define a schema for the notifications
const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis or links.")
    })
  )
});

export const POST: RequestHandler = async ({ request }) => {
  const { prompt }: { prompt: string } = await request.json();

  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter(defaultModel),
    output: Output.object({
      schema: notificationSchema,
    }),
    prompt: "Generate 3 notifications for a messages app in this context: " + prompt,
  });

  return result.toTextStreamResponse();
};`;

	let clientCode = `<script lang="ts">
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import SendIcon from "@lucide/svelte/icons/send";

  type PartialNotification = { name?: string; message?: string };
  type PartialNotificationObject = { notifications?: PartialNotification[] };

  let prompt = $state("Weekend plans");
  let loading = $state(false);
  let object = $state<PartialNotificationObject | null>(null);
  let partialJson = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    loading = true;
    object = null;
    partialJson = "";

    const response = await fetch("/api/stream-object", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt.trim() }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partialJson += decoder.decode(value, { stream: true });
      object = tryParsePartial(partialJson);
    }

    loading = false;
  }
<\/script>

<!-- Streaming JSON display -->
{#if partialJson}
  <div class="streaming-json">
    <span class="label">Streaming JSON</span>
    {#if loading}<span class="live">Live</span>{/if}
    <pre>{partialJson}</pre>
  </div>
{/if}

<!-- Loading skeleton -->
{#if loading && !object?.notifications?.length}
  <div class="flex items-center gap-2">
    <SparklesIcon class="size-4 animate-pulse" />
    <span>Generating notifications...</span>
  </div>
{/if}

<!-- Parsed notifications -->
{#if object?.notifications?.length}
  {#each object.notifications as notification}
    <div class="notification">
      <strong>{notification.name ?? "..."}</strong>
      <p>{notification.message ?? "Loading..."}</p>
    </div>
  {/each}
{/if}`;
</script>

<MetaTags
	title="Stream Object - Svelte Cookbook"
	description="Stream structured JSON objects progressively with real-time updates using the Vercel AI SDK."
	openGraph={{
		title: "Stream Object - Svelte Cookbook",
		description: "Stream structured JSON objects progressively with real-time updates.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/stream-object",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Stream Object</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Stream Object" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Streaming</Badge>
			<Badge variant="secondary">Structured Data</Badge>
			<Badge variant="secondary">Real-time</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Stream structured objects progressively as they're generated. Watch your UI update in
			real-time as each field arrives—perfect for complex data that takes time to generate.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Streaming vs. Waiting</h2>
		<p class="text-muted-foreground leading-relaxed">
			With <code class="text-foreground">generateObject</code>, users wait for the complete
			response. With <code class="text-foreground">streamObject</code>, they see data
			appearing progressively—names first, then messages, creating a much more responsive
			experience.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Use <code class="text-foreground">streamObject</code> instead of
			<code class="text-foreground">generateObject</code>. The key difference is
			<code class="text-foreground">toTextStreamResponse()</code> which streams chunks to the client.
		</p>
		<CodeNameBlock filename="+server.ts" lang="typescript" code={serverCode} />
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Use the <code class="text-foreground">ReadableStream</code> API to manually read chunks and
			parse partial JSON as it arrives. This gives you full control over the streaming experience.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/stream-object"
			target="_blank"
			variant="outline"
			class="gap-2"
		>
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
			View on GitHub
		</Button>
		<CookbookPrevNext currentSlug="stream-object" />
	</footer>
</article>
