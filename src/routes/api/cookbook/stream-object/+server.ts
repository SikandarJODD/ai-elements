import { streamObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

// define a schema for the notifications
let notificationSchema = z.object({
	notifications: z.array(
		z.object({
			name: z.string().describe("Name of a fictional person."),
			message: z.string().describe("Message. Do not use emojis or links."),
		})
	),
});

export const POST: RequestHandler = async ({ request }) => {
	let { prompt }: { prompt: string } = await request.json();

	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	let result = streamObject({
		model: openrouter(defaultModel),
		schema: notificationSchema,
		prompt: `Generate 3 notifications for a messages app in this context:` + prompt,
	});

	return result.toTextStreamResponse();
};
