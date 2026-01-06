import { generateText, Output } from "ai";
import { z } from "zod";
import { json } from "@sveltejs/kit";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	let { prompt }: { prompt: string } = await request.json();

	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	let { output } = await generateText({
		model: openrouter(defaultModel),
		system: `You generate three notifications for a messages app.`,
		prompt: prompt,
		output: Output.object({
			schema: z.object({
				notifications: z.array(
					z.object({
						name: z.string().describe("Name of a fictional person."),
						message: z.string().describe("Do not use emojis or links."),
						minutesAgo: z.number(),
					})
				),
			}),
		}),
	});

	return json(output);
	// return json(output.notifications);
};
