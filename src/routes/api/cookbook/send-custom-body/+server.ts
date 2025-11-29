import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, name, age }: { messages: UIMessage[]; name: string; age: number } =
		await request.json();

	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	let result = streamText({
		model: openrouter(defaultModel),
		system: `You are talking to ${name} who is ${age} years old.
Personalize your responses based on their age and use their name naturally in conversation.
For example, give age-appropriate advice, use references they might understand, and be friendly.
Keep responses concise (under 50 words).`,
		messages: convertToModelMessages(messages),
	});
	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
};
