import { generateText } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { text } = await generateText({
		model: openrouter(defaultModel),
		prompt: "What is Svelte JS? in 100 words",
	});

	return new Response(text);
};
