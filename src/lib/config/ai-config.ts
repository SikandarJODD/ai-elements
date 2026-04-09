import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
	appName: "Svelte AI Elements",
	appUrl: "http://localhost:5173",
});

// export const defaultModel = "z-ai/glm-4.5-air:free";
export let defaultModel = "arcee-ai/trinity-large-preview:free";
