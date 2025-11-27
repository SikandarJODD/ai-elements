import type { RequestHandler } from '@sveltejs/kit';
import {
	type InferUITools,
	type ToolSet,
	type UIDataTypes,
	type UIMessage,
	convertToModelMessages,
	stepCountIs,
	streamText,
	tool
} from 'ai';
import { z } from 'zod';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

const tools = {
	getWeatherInformation: tool({
		description: 'show the weather in a given city to the user',
		inputSchema: z.object({ city: z.string() }),
		execute: async ({}: { city: string }) => {
			return {
				value: 24,
				unit: 'celsius',
				weeklyForecast: [
					{ day: 'Monday', value: 24 },
					{ day: 'Tuesday', value: 25 },
					{ day: 'Wednesday', value: 26 },
					{ day: 'Thursday', value: 27 },
					{ day: 'Friday', value: 28 },
					{ day: 'Saturday', value: 29 },
					{ day: 'Sunday', value: 30 }
				]
			};
		}
	}),

	// client-side tool that starts user interaction:
	askForConfirmation: tool({
		description: 'Ask the user for confirmation.',
		inputSchema: z.object({
			message: z.string().describe('The message to ask for confirmation.')
		})
	}),
	// client-side tool that is automatically executed on the client:
	getLocation: tool({
		description: 'Get the user location. Always ask for confirmation before using this tool.',
		inputSchema: z.object({})
	})
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

let defaultModel = 'z-ai/glm-4.5-air:free';

export const POST: RequestHandler = async ({ request }) => {
	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY
	});
	const { messages }: { messages: ChatMessage[] } = await request.json();

	const result = streamText({
		model: openrouter(defaultModel),
		messages: convertToModelMessages(messages),
		tools,
		stopWhen: stepCountIs(5)
	});

	return result.toUIMessageStreamResponse();
};
