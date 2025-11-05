export type RecipeStatus = "available" | "coming-soon";

export interface Recipe {
	name: string;
	slug: string;
	description: string;
	tags: string[];
	status: RecipeStatus;
}

export const recipes: Recipe[] = [
	// Available recipes
	{
		name: "Generate Text",
		slug: "generate-text",
		description: "Learn how to generate text using AI models with simple prompts",
		tags: ["text", "generation", "basics"],
		status: "available",
	},
	{
		name: "Generate Text with Chat Prompt",
		slug: "generate-text-with-chat-prompt",
		description:
			"Generate text using conversational chat prompts for more natural interactions",
		tags: ["text", "generation", "chat"],
		status: "coming-soon",
	},
	{
		name: "Stream Text",
		slug: "stream-text",
		description: "Stream text responses in real-time for better user experience",
		tags: ["text", "streaming", "real-time"],
		status: "coming-soon",
	},
	{
		name: "Stream Text with Chat Prompt",
		slug: "stream-text-with-chat-prompt",
		description: "Combine streaming with chat prompts for responsive conversational AI",
		tags: ["text", "streaming", "chat"],
		status: "coming-soon",
	},
	// Coming soon recipes
	{
		name: "Chat with PDFs",
		slug: "chat-with-pdfs",
		description: "Build an AI assistant that can read and answer questions about PDF documents",
		tags: ["pdf", "chat", "documents", "new"],
		status: "coming-soon",
	},
	{
		name: "Markdown Chatbot",
		slug: "markdown-chatbot",
		description: "Create a chatbot that renders responses in beautiful markdown format",
		tags: ["markdown", "chat", "formatting", "new"],
		status: "coming-soon",
	},
	{
		name: "Generate Object",
		slug: "generate-object",
		description: "Generate structured data objects with type-safe schemas",
		tags: ["object", "generation", "structured-data", "new"],
		status: "coming-soon",
	},
	{
		name: "Stream Object",
		slug: "stream-object",
		description: "Stream structured objects in real-time with progressive updates",
		tags: ["object", "streaming", "structured-data", "new"],
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
