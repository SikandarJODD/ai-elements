import { streamText, type UIMessage, convertToModelMessages, tool } from "ai";
import type { RequestHandler } from "./$types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { z } from "zod";

let defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, apiKey }: { messages: UIMessage[]; apiKey?: string } = await request.json();

	// Create OpenRouter instance
	let openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	// Override with user-provided API key if available
	if (apiKey) {
		openrouter = createOpenRouter({
			apiKey,
		});
	}

	const result = streamText({
		model: openrouter(defaultModel),
		system: "You are a helpful assistant with access to tools. Use the getCurrentDate tool when users ask about dates, time, or current information. You are also able to use the getTime tool to get the current time in a specific timezone. Think through your responses step by step.",
		messages: convertToModelMessages(messages),
		tools: {
			getTime: tool({
				description: "Get the current time in a specific timezone",
				inputSchema: z.object({
					timezone: z.string().describe("A valid IANA timezone, e.g. 'Europe/Paris'"),
				}),
				execute: async ({ timezone }) => {
					try {
						const now = new Date();
						const time = now.toLocaleString("en-US", {
							timeZone: timezone,
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							hour12: false,
						});

						return { time, timezone };
					} catch {
						return { error: "Invalid timezone format." };
					}
				},
			}),
			getCurrentDate: tool({
				description: "Get the current date and time with timezone information",
				inputSchema: z.object({}),
				execute: async () => {
					const now = new Date();
					return {
						timestamp: now.getTime(),
						iso: now.toISOString(),
						local: now.toLocaleString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							timeZoneName: "short",
						}),
						timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
						utc: now.toUTCString(),
					};
				},
			}),
		},
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: true,
	});
};
