import { streamText, type UIMessage, convertToModelMessages, tool } from "ai";
import type { RequestHandler } from "./$types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { z } from "zod";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } = await request.json();

	// Create OpenRouter instance
	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	// Override with user-provided API key if available
	if (apiKey) {
		openrouter = createOpenRouter({
			apiKey,
		});
	}

	const result = streamText({
		model: openrouter(defaultModel),
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
};
