import { type ModelMessage, generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { RequestHandler } from './$types';
import { OPENROUTER_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

// z-ai/glm-4.5-air:free
let defaultModel = 'tngtech/deepseek-r1t2-chimera:free';

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: ModelMessage[] } = await request.json();

	// Use custom API key if provided, otherwise use default
	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY
	});

	let text = await generateText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant.` + `Response in 100 words.`,
		messages: messages
	});
	return json(text.response.messages);
};
