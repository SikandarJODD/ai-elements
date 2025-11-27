import type { RequestHandler } from "@sveltejs/kit";
import {
	type InferUITools,
	type ToolSet,
	type UIDataTypes,
	type UIMessage,
	convertToModelMessages,
	stepCountIs,
	streamText,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import {
	getWeatherInformation,
	askForConfirmation,
	getLocationClient,
} from "$lib/components/cookbook/tools";

const tools = {
	getWeatherInformation,
	askForConfirmation,
	getLocation: getLocationClient,
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});
	const { messages }: { messages: ChatMessage[] } = await request.json();

	const result = streamText({
		model: openrouter(defaultModel),
		messages: convertToModelMessages(messages),
		tools,
		stopWhen: stepCountIs(5),
	});

	return result.toUIMessageStreamResponse();
};
