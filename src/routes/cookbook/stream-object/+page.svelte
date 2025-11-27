<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/stream-object/llms.txt`;

	let serverCode = `import { streamObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis.")
    })
  )
});

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  const result = streamObject({
    model: openrouter("z-ai/glm-4.5-air:free"),
    schema: notificationSchema,
    prompt: "Generate 3 notifications for: " + prompt
  });

  return result.toTextStreamResponse();
};`;

	let clientCode = `<script lang="ts">
  import { experimental_useObject as useObject } from "@ai-sdk/svelte";
  import { z } from "zod";

  const schema = z.object({
    notifications: z.array(
      z.object({
        name: z.string(),
        message: z.string()
      })
    )
  });

  const { object, submit, isLoading } = useObject({
    api: "/api/cookbook/stream-object",
    schema
  });
<\/script>

<button onclick={() => submit({ prompt: "Weekend plans" })}>
  {$isLoading ? "Streaming..." : "Generate"}
</button>

{#if $object?.notifications}
  {#each $object.notifications as notification}
    {#if notification}
      <div>
        <strong>{notification.name ?? "..."}</strong>
        <p>{notification.message ?? "Loading..."}</p>
      </div>
    {/if}
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
				<OpenInMenu componentName="Stream Object" {llmsTxtUrl} type="ai-elements" />
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
			With <code class="text-foreground">generateObject</code>, users wait for the complete response.
			With <code class="text-foreground">streamObject</code>, they see data appearing progressively—names
			first, then messages, creating a much more responsive experience.
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
		<CodeNameBlock
			filename="+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[[16, 21]]}
		/>
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The <code class="text-foreground">useObject</code> hook handles streaming automatically. Note how
			we check for partial data with optional chaining since fields arrive progressively.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[[14, 17]]} />
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

