<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";
	import DemoCode from "./demo/demo.svelte?raw";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { SingleFile } from "$lib/components/ui/code";
	import { CodeChip } from "$markdown";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-object/llms.txt`;

	let schemaCode = `import { z } from "zod";

// Define and export a schema for structured output
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Do not use emojis or links."),
      minutesAgo: z.number()
    })
  )
});`;

	let serverCode = `import { openrouter } from "$lib/config/ai";
import { generateText, Output } from "ai";
import { notificationSchema } from "$lib/schema/notification-schema";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	let { prompt }: { prompt: string } = await request.json();

	let result = await generateText({
		model: openrouter("openrouter/owl-alpha"),
		system: "You generate three notifications for a messages app.",
		prompt: prompt,
		output: Output.object({
			schema: notificationSchema,
		}),
	});

	return json(result.output);
	// return json(result.notifications);
};
`;

	let clientCode = DemoCode;
</script>

<MetaTags
	title="Generate Object - Svelte Cookbook"
	description="Generate structured JSON objects with type-safe Zod schemas using the Vercel AI SDK in SvelteKit."
	openGraph={{
		title: "Generate Object - Svelte Cookbook",
		description:
			"Generate structured JSON objects with type-safe Zod schemas using the Vercel AI SDK.",
		type: "article",
		url: "https://svelte-ai-elements.vercel.app/cookbook/generate-object",
	}}
/>

<article class="mx-auto px-4 py-8 md:px-6 md:py-10">
	<header class="mb-12">
		<div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
			<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Generate Object</h1>
			<CopyPageDropdown class="shrink-0" componentName="Generate Object" {llmsTxtUrl} />
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary">Structured Data</Badge>
			<Badge variant="secondary">Zod Schema</Badge>
			<Badge variant="secondary">Type-safe</Badge>
		</div>

		<p class="text-muted-foreground text-base leading-relaxed sm:text-lg">
			Generate structured JSON objects that conform to a Zod schema. Perfect for creating
			typed data like notifications, cards, or extracting structured information from AI
			responses.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="mb-3 text-3xl font-semibold">Demo</h2>
		<Demo />
	</section>

	<section class="mb-16">
		<h2 class="mb-3 text-3xl font-semibold">Step 1: Define Your Schema</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Start by defining a Zod schema. The <CodeChip>.describe()</CodeChip> method helps the AI understand
			what each field should contain.
		</p>
		<SingleFile
			code={{
				code: schemaCode,
				name: "schema.ts",
				lang: "typescript",
			}}
		/>
	</section>

	<section class="mb-16">
		<h2 class="mb-3 text-3xl font-semibold">Step 2: Create API Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			The api uses <CodeChip>generateText</CodeChip> with <CodeChip>Output.object()</CodeChip> to
			ensure the response adheres to our Zod schema. This allows us to receive fully typed data
			on the client.
		</p>
		<SingleFile
			code={{
				code: serverCode,
				name: "+server.ts",
				lang: "typescript",
				highlight: [
					[1, 3],
					[14, 16],
				],
			}}
		/>
	</section>

	<section class="mb-10">
		<h2 class="mb-3 text-3xl font-semibold">Step 3: Create Notification Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Let's build a simple Svelte component to display the generated notifications. This
			component will receive the structured data from our API.
		</p>
		<SingleFile
			code={{
				code: clientCode,
				name: "+page.svelte",
				lang: "svelte",
				highlight: [
					[27, 31],
					[62, 79],
				],
			}}
		/>
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
