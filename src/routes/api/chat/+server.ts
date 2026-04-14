import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, model }: { messages: UIMessage[]; model: string } = await request.json();

	let modelToUse = model.length > 0 ? model : defaultModel;
	let result = streamText({
		model: openrouter(modelToUse),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
};
