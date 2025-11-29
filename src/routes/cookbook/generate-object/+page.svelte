<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-object/llms.txt`;

	let schemaCode = `import { z } from "zod";

// Define a schema for structured output
const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Do not use emojis or links."),
      minutesAgo: z.number()
    })
  )
});`;

	let serverCode = `import { generateObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY
  });

  const result = await generateObject({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: "You generate three notifications for a messages app.",
    prompt: prompt,
    schema: z.object({
      notifications: z.array(
        z.object({
          name: z.string().describe("Name of a fictional person."),
          message: z.string().describe("Do not use emojis or links."),
          minutesAgo: z.number()
        })
      )
    })
  });

  return result.toJsonResponse();
};`;

	let clientCode = `<script lang="ts">
  type Notification = {
    name: string;
    message: string;
    minutesAgo: number;
  };

  let notifications = $state<Notification[]>([]);
  let isLoading = $state(false);

  async function handleGenerate() {
    isLoading = true;

    const res = await fetch("/api/cookbook/generate-object", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "New social media activity" })
    });

    const data = await res.json();
    notifications = data.notifications;
    isLoading = false;
  }
<\/script>

{#each notifications as notification}
  <div class="notification">
    <strong>{notification.name}</strong>
    <span>{notification.minutesAgo}m ago</span>
    <p>{notification.message}</p>
  </div>
{/each}`;
</script>

<MetaTags
	title="Generate Object - Svelte Cookbook"
	description="Generate structured JSON objects with type-safe Zod schemas using the Vercel AI SDK in SvelteKit."
	openGraph={{
		title: "Generate Object - Svelte Cookbook",
		description:
			"Generate structured JSON objects with type-safe Zod schemas using the Vercel AI SDK.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/generate-object",
	}}
/>

<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight">Generate Object</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Generate Object" {llmsTxtUrl} type="cookbook" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Structured Data</Badge>
			<Badge variant="secondary">Zod Schema</Badge>
			<Badge variant="secondary">Type-safe</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed">
			Generate structured JSON objects that conform to a Zod schema. Perfect for creating typed
			data like notifications, cards, or extracting structured information from AI responses.
		</p>
	</header>

	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Why Use generateObject?</h2>
		<p class="text-muted-foreground leading-relaxed">
			Unlike plain text generation, <code class="text-foreground">generateObject</code> ensures your
			AI responses match a specific structure. This means no more parsing JSON from text or handling
			malformed responses—you get type-safe data every time.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Define Your Schema</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Start by defining a Zod schema. The <code class="text-foreground">.describe()</code> method helps
			the AI understand what each field should contain.
		</p>
		<CodeNameBlock filename="schema.ts" lang="typescript" code={schemaCode} highlight={[[4, 10]]} />
	</section>

	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The server uses <code class="text-foreground">generateObject</code> with your schema. The
			<code class="text-foreground">toJsonResponse()</code> method returns properly formatted JSON.
		</p>
		<CodeNameBlock
			filename="+server.ts"
			lang="typescript"
			code={serverCode}
			highlight={[[13, 25]]}
		/>
	</section>

	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Fetch the structured data and render it with full type safety.
		</p>
		<CodeNameBlock filename="+page.svelte" lang="svelte" code={clientCode} highlight={[[12, 19]]} />
	</section>

	<footer>
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/generate-object"
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
		<CookbookPrevNext currentSlug="generate-object" />
	</footer>
</article>

