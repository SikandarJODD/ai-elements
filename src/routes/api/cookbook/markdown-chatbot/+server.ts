import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

const defaultModel = "z-ai/glm-4.5-air:free";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	const openrouter = createOpenRouter({
		apiKey: OPENROUTER_API_KEY,
	});

	const result = streamText({
		model: openrouter(defaultModel),
		system: `You are a helpful assistant that provides well-formatted markdown responses.

Use these formatting features when appropriate:
- **Bold** for emphasis
- *Italic* for subtle emphasis
- Code blocks with syntax highlighting for code snippets
- Bullet lists for multiple items
- Numbered lists for steps
- Headers for organizing long responses
- Tables when comparing data
- Blockquotes for important notes

Always format code with the correct language identifier (typescript, javascript, python, bash, etc).`,
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
};
