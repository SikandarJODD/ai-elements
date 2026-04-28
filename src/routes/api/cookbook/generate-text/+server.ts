import { generateText, type ModelMessage } from "ai";
import type { RequestHandler } from "./$types";
import { defaultModel, openrouter } from "$lib/config/ai-config";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: ModelMessage[] } = await request.json();

	const { response } = await generateText({
		model: openrouter(defaultModel),
		messages,
		system: "Response should be short and concise.",
	});

	return json({ messages: response.messages });
};
