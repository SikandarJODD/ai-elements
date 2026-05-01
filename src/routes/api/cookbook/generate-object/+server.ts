import { openrouter } from "$lib/config/ai-config";
import { generateText, Output } from "ai";
import type { RequestHandler } from "./$types";
import { notificationSchema } from "$lib/schema/notification-schema";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	let { prompt }: { prompt: string } = await request.json();

	let result = await generateText({
		model: openrouter("openrouter/owl-alpha"),
		system: "You generate three notifications for a messages app.",
		prompt: prompt,
		output: Output.object({
			schema: notificationSchema,
		}),
	});

	return json(result.output);
	// return json(result.notifications);
};
