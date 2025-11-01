import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } = await request.json();

	// Use custom API key if provided, otherwise use default
	const provider = apiKey
		? createOpenRouter({ apiKey })
		: createOpenRouter({
				apiKey: OPENROUTER_API_KEY || "",
			});

	const result = streamText({
		model: provider(defaultModel),
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: true,
		sendSources: true,
	});
};
