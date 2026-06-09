import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, model }: { messages: UIMessage[]; model?: string } = await request.json();

	let result = streamText({
		model: openrouter(model || defaultModel),
		messages: await convertToModelMessages(messages),
		system: "Response should be short and concise.",
	});

	return result.toUIMessageStreamResponse();
};
