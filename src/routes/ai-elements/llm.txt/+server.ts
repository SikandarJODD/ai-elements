import type { RequestHandler } from "./$types";
import llmTxt from "./ai-elements-llm.md?raw";

export const GET: RequestHandler = async () => {
	return new Response(llmTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
