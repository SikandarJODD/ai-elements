import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";
import { PUBLIC_WEBSITE_URL } from "$env/static/public";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
	appName: "Svelte AI Elements",
	appUrl: PUBLIC_WEBSITE_URL,
});

// export const defaultModel = "z-ai/glm-4.5-air:free";
export let defaultModel = "z-ai/glm-4.5-air:free";
