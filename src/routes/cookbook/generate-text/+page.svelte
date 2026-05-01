<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import * as Item from "$lib/components/ui/item/index.js";
	import { CopyPageDropdown, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";
	import CookbookPrevNext from "$lib/components/cookbook/cookbook-prev-next.svelte";

	import GenerateTextRaw from "./demo/demo.svelte?raw";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-text/llms.txt`;

	let clientCode = GenerateTextRaw;

	let aiConfigCode = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

export const defaultModel = "z-ai/glm-4.5-air:free";`;

	let serverCode = `import { generateText, type ModelMessage } from "ai";
import type { RequestHandler } from "./$types";
import { defaultModel, openrouter } from "$lib/config/ai";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: ModelMessage[] } = await request.json();

	const { response } = await generateText({
		model: openrouter(defaultModel),
		messages,
		system: "Response should be short and concise.",
	});

	return json({ messages: response.messages });
};
`;
</script>

<MetaTags
	title="Generate Text - Svelte Cookbook"
	description="Learn how to generate text using AI models with simple prompts in SvelteKit."
	openGraph={{
		title: "Generate Text - Svelte Cookbook",
		description: "Learn how to generate text using AI models with simple prompts in SvelteKit.",
		type: "article",
		url: "https://ai-elements.vercel.app/cookbook/generate-text",
	}}
/>

<!-- Blog-style layout -->
<article class="mx-auto px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight md:text-4xl">Generate Text</h1>
			<CopyPageDropdown
				class="shrink-0"
				componentName="Generate Text"
				{llmsTxtUrl}
				type="cookbook"
			/>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Svelte</Badge>
			<Badge variant="secondary" class="text-sm">AI SDK</Badge>
			<Badge variant="secondary" class="text-sm">Text Generation</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
			Learn how to generate text using Vercel AI SDK + OpenRouter in Sveltekit.
		</p>
	</header>
	<!-- Demo Section -->
	<section class="mb-12">
		<h2 class="mb-2 text-3xl font-semibold">Demo</h2>
		<div class="overflow-hidden">
			<div class="w-full overflow-auto rounded-lg border p-2">
				<Demo />
			</div>
		</div>
	</section>

	<!-- Client Section -->
	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Step 1: Create Prompt UI</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Let's start by building a simple Svelte component that allows users to input a prompt
			and submit it. When the user submits, we'll send the prompt to our SvelteKit API route
			to get the generated response.
		</p>

		<div class="mb-4">
			<CodeNameBlock
				filename="+page.svelte"
				lang="svelte"
				code={clientCode}
				highlight={[4, [14, 20]]}
			/>
		</div>
	</section>

	<!-- AI Config Setup Section -->
	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Step 2: AI Config Setup</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Set up a shared AI configuration first so your provider and model settings live in one
			place. That keeps your SvelteKit project easier to maintain and makes it simple to
			switch models or providers later.
		</p>

		<div class="mb-4">
			<CodeNameBlock filename="src/lib/config/ai.ts" lang="typescript" code={aiConfigCode} />
		</div>

		<Item.Root variant="muted" size="sm">
			<Item.Content>
				<Item.Title>Note</Item.Title>
				<Item.Description
					>Make sure to add your <span
						class="rounded-sm bg-yellow-500/20 px-1 font-mono text-yellow-500"
						>OPENROUTER_API_KEY</span
					> to your .env file.</Item.Description
				>
			</Item.Content>
			<Item.Actions>
				<Button
					variant="outline"
					size="sm"
					href="https://openrouter.ai"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit OpenRouter
				</Button>
			</Item.Actions>
		</Item.Root>
	</section>

	<!-- Server Section -->
	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Step 3: Create API Route</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Create a SvelteKit API route to handle the request and generate text with the AI SDK.
			This route receives the submitted messages, runs the model, and returns the generated
			response back to the page.
		</p>

		<div class="mb-4">
			<CodeNameBlock
				filename="src/routes/api/cookbook/generate-text/+server.ts"
				lang="typescript"
				code={serverCode}
			/>
		</div>
	</section>

	<!-- Previous / Next Navigation -->
	<CookbookPrevNext currentSlug="generate-text" />
</article>
