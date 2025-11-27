export type RecipeStatus = "available" | "coming-soon";

export interface Recipe {
	name: string;
	slug: string;
	description: string;
	tags: string[];
	status: RecipeStatus;
}

export const recipes: Recipe[] = [
	// Getting Started
	{
		name: "Getting Started",
		slug: "getting-started",
		description:
			"Build AI-powered Svelte apps in minutes. Installation, setup, and your first chat.",
		tags: ["introduction", "setup", "sveltekit"],
		status: "available",
	},
	// Text Generation
	{
		name: "Generate Text",
		slug: "generate-text",
		description: "Learn how to generate text using AI models with simple prompts",
		tags: ["text", "generation", "basics"],
		status: "available",
	},
	{
		name: "Stream Text",
		slug: "stream-text",
		description: "Stream text responses in real-time for better user experience",
		tags: ["text", "streaming", "real-time"],
		status: "available",
	},
	// Object Generation
	{
		name: "Generate Object",
		slug: "generate-object",
		description: "Generate structured data objects with type-safe schemas",
		tags: ["object", "generation", "structured-data"],
		status: "available",
	},
	{
		name: "Stream Object",
		slug: "stream-object",
		description: "Stream structured objects in real-time with progressive updates",
		tags: ["object", "streaming", "structured-data"],
		status: "available",
	},
	// Tools
	{
		name: "Call Tool",
		slug: "call-tool",
		description: "Enable AI to call custom tools and functions to perform actions",
		tags: ["tools", "function-calling", "zod"],
		status: "available",
	},
	{
		name: "Call Tool Multiple Steps",
		slug: "call-tool-multiple-steps",
		description: "Chain multiple tool calls where each step depends on the previous result",
		tags: ["tools", "multi-step", "chaining"],
		status: "available",
	},
	// Images & Documents
	{
		name: "Generate Image",
		slug: "generate-image",
		description: "Generate images from text prompts using AI image generation models",
		tags: ["images", "generation", "tools"],
		status: "available",
	},
	{
		name: "Chat with PDFs",
		slug: "chat-with-pdfs",
		description: "Build an AI assistant that can read and answer questions about PDF documents",
		tags: ["pdf", "chat", "documents"],
		status: "available",
	},
	// Advanced
	{
		name: "Send Custom Body",
		slug: "send-custom-body",
		description: "Send additional data alongside chat messages to your API endpoint",
		tags: ["custom-data", "personalization", "api"],
		status: "available",
	},
	{
		name: "Render Visual Interface",
		slug: "render-visual-interface",
		description: "Render custom UI components for different tool outputs",
		tags: ["ui-components", "interactive", "tools"],
		status: "available",
	},
	// Coming soon
	{
		name: "Generate Text with Chat Prompt",
		slug: "generate-text-with-chat-prompt",
		description:
			"Generate text using conversational chat prompts for more natural interactions",
		tags: ["text", "generation", "chat"],
		status: "coming-soon",
	},
	{
		name: "Stream Text with Chat Prompt",
		slug: "stream-text-with-chat-prompt",
		description: "Combine streaming with chat prompts for responsive conversational AI",
		tags: ["text", "streaming", "chat"],
		status: "coming-soon",
	},
	{
		name: "Markdown Chatbot",
		slug: "markdown-chatbot",
		description: "Create a chatbot that renders responses in beautiful markdown format",
		tags: ["markdown", "chat", "formatting"],
		status: "coming-soon",
	},
];

// Derived state using functions (Svelte 5 pattern)
export function getTotalRecipeCount(): number {
	return recipes.length;
}

export function getAvailableRecipeCount(): number {
	return recipes.filter((r) => r.status === "available").length;
}

export function getComingSoonRecipeCount(): number {
	return recipes.filter((r) => r.status === "coming-soon").length;
}

export function getUniqueTags(): string[] {
	const allTags = recipes.flatMap((r) => r.tags);
	return [...new Set(allTags)].sort();
}

export function getRecipesByTag(tag: string): Recipe[] {
	return recipes.filter((r) => r.tags.includes(tag));
}

export function getRecipesByStatus(status: RecipeStatus): Recipe[] {
	return recipes.filter((r) => r.status === status);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
	return recipes.find((r) => r.slug === slug);
}

export function filterRecipes(options: {
	tag?: string;
	status?: RecipeStatus;
	searchQuery?: string;
}): Recipe[] {
	let filtered = [...recipes];

	if (options.tag) {
		filtered = filtered.filter((r) => r.tags.includes(options.tag!));
	}

	if (options.status) {
		filtered = filtered.filter((r) => r.status === options.status);
	}

	if (options.searchQuery) {
		const query = options.searchQuery.toLowerCase();
		filtered = filtered.filter(
			(r) =>
				r.name.toLowerCase().includes(query) ||
				r.description.toLowerCase().includes(query) ||
				r.tags.some((tag) => tag.toLowerCase().includes(query))
		);
	}

	return filtered;
}
