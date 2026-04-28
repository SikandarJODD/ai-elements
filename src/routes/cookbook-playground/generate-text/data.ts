import type { CookbookPlaygroundPageData } from "$lib/components/code-preview";
import { createBlockCodeTree } from "$lib/components/code-preview";

import GenerateTextDemo from "../../cookbook/generate-text/demo/demo.svelte";

const configRaw = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const ai = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY
});
export let defaultModel = "z-ai/glm-4.5-air:free";
`;

let serverFileRaw=`import { generateText, type ModelMessage } from "ai";
import type { RequestHandler } from "./$types";
import { defaultModel, openrouter } from "$lib/config/ai-config";
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

let pageFileRaw = `<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import type { ModelMessage } from "ai";
	let value = $state("");
	let messages = $state<ModelMessage[]>([]);

	let handleSubmit = async () => {
		if (!value.trim()) return;
		messages = [...messages, { role: "user", content: value }];

		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages }),
		});

		const data = await response.json();
		value = "";
		messages = [...messages, ...data.messages];
	};
</script>

<div>
	<div class="flex flex-col gap-2 p-2">
		<Textarea
			bind:value
			placeholder="What is Life ?...Type Anything"
			onkeydown={(e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					handleSubmit();
				}
			}}
		/>
		<Button type="submit" class="self-end" onclick={handleSubmit}>Submit</Button>
	</div>
	<!-- Generate text messages -->
	<div class="mt-4">
		{#each messages as message}
			<div class="font-semibold">{message.role}:</div>
			<div>
				{#if typeof message.content === "string"}
					{message.content}
				{:else}
					{#each message.content as part}
						{#if part.type === "text"}
							{part.text}
						{/if}
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>
`;

export const pageData: CookbookPlaygroundPageData = {
	id: "generate-text",
	slug: "generate-text",
	title: "Generate Text",
	description:
		"Explore the live generate-text demo, the server endpoint behind it, and the supporting configuration in a single playground layout.",
	tags: ["text", "generation", "basics"],
	previewMode: "inline",
	previewTitle: "Live Preview",
	previewDescription: "This is the current generate-text demo mounted inline inside the playground shell.",
	previewComponent: GenerateTextDemo,
	previewHeight: 520,
	codeTree: createBlockCodeTree("generate-text-config", [
		{
			id: "generate-text-config",
			path: "src/lib/ai/config.ts",
			code: configRaw,
			lang: "typescript",
		},
		{
			id: "generate-text-page",
			path: "src/routes/+page.svelte",
			code: pageFileRaw,
			lang: "svelte",
		},
		{
			id: "generate-text-server",
			path: "src/routes/api/chat/+server.ts",
			code: serverFileRaw,
			lang: "typescript",
		},
	]),
};
