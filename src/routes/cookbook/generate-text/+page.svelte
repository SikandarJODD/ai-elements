<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { CopyMarkdownButton, OpenInMenu, CodeNameBlock } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import Demo from "./demo/demo.svelte";

	let llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/cookbook/generate-text/llms.txt`;

	let clientCode = `<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { fly } from "svelte/transition";

	let isLoading = $state(false);
	let response = $state("");

	async function handleGenerate() {
		isLoading = true;
		response = "";

		try {
			const res = await fetch("/api/cookbook/generate-text", {
				method: "POST",
			});

			let text = await res.text();
			response = text;
		} catch (error) {
			response = "Error generating text. Please try again.";
		} finally {
			isLoading = false;
		}
	}
<\/script>

<Card>
	<CardContent>
		<div class="space-y-4">
			<div>
				<p class="text-muted-foreground text-sm font-medium">Prompt:</p>
				<p class="mt-1 text-sm">What is Svelte JS? in 100 words</p>
			</div>

			<Button onclick={handleGenerate} disabled={isLoading} class="w-full">
				{isLoading ? "Thinking..." : "Generate Text"}
			</Button>

			{#if response}
				<div in:fly={{ y: -20, delay: 50 }} class="rounded-lg border p-4">
					<p class="text-muted-foreground mb-2 text-xs font-medium">Response:</p>
					<p class="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>`;

	let aiConfigCode = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

export const defaultModel = "z-ai/glm-4.5-air:free";`;

	let serverCode = `import { generateText } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { text } = await generateText({
		model: openrouter(defaultModel),
		prompt: "What is Svelte JS? in 100 words",
	});

	return new Response(text);
};`;
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
<article class="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6 flex items-start justify-between gap-4">
			<h1 class="text-4xl font-semibold tracking-tight md:text-4xl">Generate Text</h1>
			<div class="flex shrink-0 items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Generate Text" {llmsTxtUrl} type="ai-elements" />
			</div>
		</div>

		<div class="mb-6 flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="text-sm">Svelte</Badge>
			<Badge variant="secondary" class="text-sm">AI SDK</Badge>
			<Badge variant="secondary" class="text-sm">Text Generation</Badge>
		</div>

		<p class="text-muted-foreground text-lg leading-relaxed md:text-xl">
			Learn how to generate text using AI models with simple prompts in SvelteKit. This guide
			shows you how to create a complete text generation flow using the Vercel AI SDK.
		</p>
	</header>

	<!-- Introduction -->
	<section class="prose prose-neutral dark:prose-invert mb-12 max-w-none">
		<h2 class="mb-4 text-2xl font-semibold">Overview</h2>
		<p class="text-muted-foreground leading-relaxed">
			The <code class="text-foreground">generateText</code> function from the Vercel AI SDK allows
			you to generate text based on a prompt. This is useful for various scenarios such as answering
			questions, summarizing content, generating creative text, or building conversational interfaces.
		</p>
		<p class="text-muted-foreground leading-relaxed">
			In this recipe, we'll build a simple text generation feature in SvelteKit with a
			client-side component that makes requests to a server endpoint, which then uses the AI
			SDK to generate responses.
		</p>
	</section>

	<!-- Demo Section -->
	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Demo</h2>
		<div class="overflow-hidden">
			<div class="w-full overflow-auto">
				<Demo />
			</div>
		</div>
	</section>

	<!-- Client Section -->
	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">Client Component</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Now let's create a Svelte component that handles user interaction. This component uses
			Svelte 5's <code class="text-foreground">$state</code> rune for reactivity and makes a POST
			request to our API endpoint.
		</p>

		<div class="mb-4">
			<CodeNameBlock
				filename="+page.svelte"
				lang="svelte"
				code={clientCode}
				highlight={[[9, 25]]}
			/>
		</div>
	</section>

	<!-- AI Config Setup Section -->
	<section class="mb-16">
		<h2 class="mb-6 text-3xl font-semibold">AI Config Setup</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Before we start, let's set up the AI configuration. Create a centralized config file to
			manage your AI provider and model settings. This makes it easy to switch models or
			providers across your application.
		</p>

		<div class="mb-4">
			<CodeNameBlock
				filename="src/lib/config/ai-config.ts"
				lang="typescript"
				code={aiConfigCode}
			/>
		</div>

		<div class="bg-muted/50 mt-6 rounded-lg border p-4">
			<p class="text-muted-foreground text-sm leading-relaxed">
				<strong class="text-foreground">Note:</strong> Make sure to add your
				<code class="text-foreground">OPENROUTER_API_KEY</code>
				to your <code class="text-foreground">.env</code> file. You can get a free API key
				from
				<a
					href="https://openrouter.ai"
					target="_blank"
					rel="noopener noreferrer"
					class="text-foreground underline underline-offset-2 hover:no-underline"
					>OpenRouter</a
				>.
			</p>
		</div>
	</section>

	<!-- Server Section -->
	<section class="mb-10">
		<h2 class="mb-6 text-3xl font-semibold">Server Endpoint</h2>
		<p class="text-muted-foreground mb-6 leading-relaxed">
			Now let's create the server-side route handler that processes the request and generates
			text using the AI SDK. This endpoint receives the prompt from the client and returns the
			generated text.
		</p>

		<div class="mb-4">
			<CodeNameBlock
				filename="src/routes/api/completion/+server.ts"
				lang="typescript"
				code={serverCode}
			/>
		</div>
	</section>

	<!-- Recommendations -->
	<!-- <section class="mb-12">
		<h2 class="mb-6 text-3xl font-semibold">Recommendations</h2>
		<div class="overflow-hidden rounded-lg border">
			<table class="w-full">
				<thead class="bg-muted/50 border-b">
					<tr>
						<th class="px-4 py-3 text-left text-sm font-semibold">Title</th>
						<th class="px-4 py-3 text-left text-sm font-semibold">Tags</th>
					</tr>
				</thead>
				<tbody class="divide-y">
					<tr class="hover:bg-muted/30 transition-colors">
						<td class="px-4 py-3">
							<a
								href="/cookbook/stream-text"
								class="text-foreground font-medium hover:underline"
							>
								Stream Text
							</a>
						</td>
						<td class="px-4 py-3">
							<div class="flex flex-wrap gap-1.5">
								<Badge variant="secondary" class="text-xs">Streaming</Badge>
								<Badge variant="secondary" class="text-xs">Real-time</Badge>
							</div>
						</td>
					</tr>
					<tr class="hover:bg-muted/30 transition-colors">
						<td class="px-4 py-3">
							<a
								href="/cookbook/generate-object"
								class="text-foreground font-medium hover:underline"
							>
								Generate Object
							</a>
						</td>
						<td class="px-4 py-3">
							<div class="flex flex-wrap gap-1.5">
								<Badge variant="secondary" class="text-xs">Structured Data</Badge>
								<Badge variant="secondary" class="text-xs">JSON</Badge>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section> -->

	<!-- GitHub Link -->
	<footer class="">
		<Button
			href="https://github.com/SikandarJODD/ai-elements/tree/master/src/routes/cookbook/generate-text"
			target="_blank"
			rel="noopener noreferrer"
			variant="outline"
			class="gap-2"
		>
			<svg
				class="h-4 w-4"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
				/>
			</svg>
			View Example on GitHub
		</Button>
	</footer>
</article>
