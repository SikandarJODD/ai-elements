import {
	convertToModelMessages,
	createGateway,
	type InferUITools,
	stepCountIs,
	streamText,
	type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";

import { generateImageTool } from "$lib/components/cookbook/tools/generate-image";
import type { RequestHandler } from "./$types";

const tools = {
	generateImageTool,
};

import { AI_GATEWAY_API_KEY } from "$env/static/private";

const gateway = createGateway({
	apiKey: AI_GATEWAY_API_KEY,
});

export type ChatTools = InferUITools<typeof tools>;

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	const result = streamText({
		model: gateway("openai/gpt-oss-20b"),
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools,
	});

	return result.toUIMessageStreamResponse();
};
