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
import type { RequestHandler } from './$types';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

const tools = {
	getLocation: tool({
		description: 'Get the location of the user',
		inputSchema: z.object({}),
		execute: async () => {
			const location = { lat: 37.7749, lon: -122.4194 };
			return `Your location is at latitude ${location.lat} and longitude ${location.lon}`;
		}
	}),
	getWeather: tool({
		description: 'Get the weather for a location',
		inputSchema: z.object({
			city: z.string().describe('The city to get the weather for'),
			unit: z.enum(['C', 'F']).describe('The unit to display the temperature in')
		}),
		execute: async ({ city, unit }) => {
			const weather = {
				value: 24,
				description: 'Sunny'
			};

			return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
		}
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
	let result = streamText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant.` + `Response in 100 words.`,
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools
	});
	return result.toUIMessageStreamResponse();
};
