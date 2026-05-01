import { type UIMessage, convertToModelMessages, streamText } from "ai";
import type { RequestHandler } from "./$types";
import { defaultModel, openrouter } from "$lib/config/ai-config";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	let result = streamText({
		model: openrouter(defaultModel),
		system: "Please keep response short and concise.",
		messages: await convertToModelMessages(messages),
	});
	return result.toUIMessageStreamResponse();
};
