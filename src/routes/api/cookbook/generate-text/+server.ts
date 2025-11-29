import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { prompt }: { prompt?: string } = await request.json().catch(() => ({}));

	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	const result = await generateText({
		model: openrouter(defaultModel),
		prompt: prompt || "What is Svelte JS? in 100 words",
		system: "You are a helpful assistant. Respond in 100 words.",
	});

	return new Response(result.text, {
		headers: { "Content-Type": "text/plain" },
	});
};
