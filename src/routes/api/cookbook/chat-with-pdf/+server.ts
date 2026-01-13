import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

let defaultModel = "openai/gpt-5-nano";
// Chat with PDF using GPT-5-Nano
// More Info : https://openrouter.ai/openai/gpt-5-nano

export const POST: RequestHandler = async ({ request }) => {
	const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } = await request.json();

	// Require API key from user
	if (!apiKey) {
		return json(
			{
				error: "OpenRouter API key is required. Please add your API key to use this feature.",
			},
			{ status: 401 }
		);
	}

	const openrouter = createOpenRouter({
		apiKey: apiKey,
	});

	let result = streamText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant.` + `Response in 100 words.`,
		messages: await convertToModelMessages(messages),
	});
	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
};
