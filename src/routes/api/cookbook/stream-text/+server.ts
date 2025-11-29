import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	// Use custom API key if provided, otherwise use default
	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	let result = streamText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant.` + `Response in 100 words.`,
		messages: convertToModelMessages(messages),
	});
	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
};
