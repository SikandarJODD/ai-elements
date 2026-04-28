export type CookbookPlaygroundStatus = "active" | "disabled";

export type CookbookPlaygroundNavItem = {
	title: string;
	slug: string;
	description: string;
	tags: string[];
	status: CookbookPlaygroundStatus;
};

export const cookbookPlaygroundItems: CookbookPlaygroundNavItem[] = [
	{
		title: "Basic Setup",
		slug: "basic-setup",
		description: "Bootstrap your app, OpenRouter config, and shared AI SDK setup.",
		tags: ["setup", "openrouter", "sveltekit"],
		status: "active",
	},
	{
		title: "Getting Started",
		slug: "getting-started",
		description: "Legacy onboarding recipe kept separate from the new setup-first flow.",
		tags: ["introduction", "setup", "sveltekit"],
		status: "disabled",
	},
	{
		title: "Generate Text",
		slug: "generate-text",
		description: "Generate text responses with a simple prompt and server endpoint.",
		tags: ["text", "generation", "basics"],
		status: "active",
	},
	{
		title: "Stream Text",
		slug: "stream-text",
		description: "Stream text responses for real-time conversational UIs.",
		tags: ["text", "streaming", "real-time"],
		status: "disabled",
	},
	{
		title: "Generate Text with Chat Prompt",
		slug: "generate-text-with-chat-prompt",
		description: "Use chat-style prompts for more contextual text generation.",
		tags: ["text", "generation", "chat"],
		status: "disabled",
	},
	{
		title: "Stream Text with Chat Prompt",
		slug: "stream-text-with-chat-prompt",
		description: "Combine streaming responses with chat prompt context.",
		tags: ["text", "streaming", "chat"],
		status: "disabled",
	},
	{
		title: "Generate Object",
		slug: "generate-object",
		description: "Generate structured objects from prompts with schema validation.",
		tags: ["object", "generation", "structured-data"],
		status: "disabled",
	},
	{
		title: "Stream Object",
		slug: "stream-object",
		description: "Stream structured objects with progressive updates.",
		tags: ["object", "streaming", "structured-data"],
		status: "disabled",
	},
	{
		title: "Call Tool",
		slug: "call-tool",
		description: "Let the model invoke custom tools and functions.",
		tags: ["tools", "function-calling", "zod"],
		status: "disabled",
	},
	{
		title: "Call Tool Multiple Steps",
		slug: "call-tool-multiple-steps",
		description: "Chain multi-step tool calls together in one recipe.",
		tags: ["tools", "multi-step", "chaining"],
		status: "disabled",
	},
	{
		title: "Generate Image",
		slug: "generate-image",
		description: "Generate images from text prompts with image-capable models.",
		tags: ["images", "generation", "tools"],
		status: "disabled",
	},
	{
		title: "Chat with PDFs",
		slug: "chat-with-pdfs",
		description: "Ask questions about uploaded PDF documents.",
		tags: ["pdf", "chat", "documents"],
		status: "disabled",
	},
	{
		title: "Send Custom Body",
		slug: "send-custom-body",
		description: "Send extra metadata along with chat messages.",
		tags: ["custom-data", "personalization", "api"],
		status: "disabled",
	},
	{
		title: "Render Visual Interface",
		slug: "render-visual-interface",
		description: "Render interactive visual responses from tool output.",
		tags: ["ui-components", "interactive", "tools"],
		status: "disabled",
	},
	{
		title: "Markdown Chatbot",
		slug: "markdown-chatbot",
		description: "Render rich markdown responses in a chat experience.",
		tags: ["markdown", "chat", "formatting"],
		status: "disabled",
	},
];

export function getCookbookPlaygroundHref(slug: string) {
	return `/cookbook-playground/${slug}`;
}

export function getCookbookPlaygroundItem(slug: string) {
	return cookbookPlaygroundItems.find((item) => item.slug === slug);
}
