import {
	type InferUITools,
	type ToolSet,
	type UIDataTypes,
	type UIMessage,
	convertToModelMessages,
	stepCountIs,
	streamText,
} from "ai";
import type { RequestHandler } from "./$types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { getLocation, getWeather } from "$lib/components/cookbook/tools";

const tools = {
	getLocation,
	getWeather,
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});
	const { messages }: { messages: ChatMessage[] } = await request.json();
	let result = streamText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant.` + `Response in 100 words.`,
		messages: await convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools,
	});
	return result.toUIMessageStreamResponse();
};
