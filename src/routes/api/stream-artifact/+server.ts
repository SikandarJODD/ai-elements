import { streamText, Output } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";
import { codeSchema } from "$lib/schema/code-schema";

export const POST: RequestHandler = async ({ request }) => {
	let context = await request.json();
    console.log("Received context for code generation:", context);

	let result = streamText({
		model: openrouter(defaultModel),
		prompt: `Generate short code based on the following context: ` + context,
		output: Output.object({
			schema: codeSchema,
		}),
	});

	return result.toTextStreamResponse();
};
