import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, model }: { messages: UIMessage[]; model: string } = await request.json();

	let modelToUse = model ? model : defaultModel;
	let result = streamText({
		model: openrouter(modelToUse),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		messageMetadata: ({ part }) => {
			if (part.type === "finish") {
				console.log("Total usage:", part.totalUsage);
				/*
Total usage: {
  inputTokens: 15,
  inputTokenDetails: { noCacheTokens: 15, cacheReadTokens: 0, cacheWriteTokens: 0 },
  outputTokens: 288,
  outputTokenDetails: { textTokens: 288, reasoningTokens: 0 },
  totalTokens: 303,
  reasoningTokens: 0,
  cachedInputTokens: 0
}

				 */
				return {
					inputTokens: part.totalUsage.inputTokens,
					totalTokens: part.totalUsage.totalTokens,
					outputTokens: part.totalUsage.outputTokens,
					reasoningTokens: part.totalUsage.outputTokenDetails.reasoningTokens,
				};
			}
		},
	});
};
