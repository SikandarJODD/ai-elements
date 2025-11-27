import {
	convertToModelMessages,
	type InferUITools,
	stepCountIs,
	streamText,
	type UIMessage
} from 'ai';

import { generateImageTool } from '$lib/tools/generate-image';
import type { RequestHandler } from './$types';

const tools = {
	generateImageTool
};

export type ChatTools = InferUITools<typeof tools>;

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	const result = streamText({
		model: 'openai/gpt-4o',
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools
	});

	return result.toUIMessageStreamResponse();
};
