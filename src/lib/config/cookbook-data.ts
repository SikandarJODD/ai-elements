export interface Recipe {
	name: string;
	slug: string;
	description: string;
	tags: string[];
	playground_url?: string;
}

export const recipes: Recipe[] = [
	{
		name: "Getting Started",
		slug: "getting-started",
		description:
			"Build AI-powered Svelte apps in minutes. Installation, setup, and your first chat.",
		tags: ["introduction", "setup", "sveltekit"],
	},
	{
		name: "Generate Text",
		slug: "generate-text",
		description: "Learn how to generate text using AI models with simple prompts",
		tags: ["text", "generation", "basics"],
		playground_url: "/cookbook-playground/generate-text",
	},
	{
		name: "Stream Text",
		slug: "stream-text",
		description: "Stream text responses in real-time for better user experience",
		tags: ["text", "streaming", "real-time"],
	},
	{
		name: "Generate Object",
		slug: "generate-object",
		description: "Generate structured data objects with type-safe schemas",
		tags: ["object", "generation", "structured-data"],
	},
	{
		name: "Stream Object",
		slug: "stream-object",
		description: "Stream structured objects in real-time with progressive updates",
		tags: ["object", "streaming", "structured-data"],
	},
	{
		name: "Call Tool",
		slug: "call-tool",
		description: "Enable AI to call custom tools and functions to perform actions",
		tags: ["tools", "function-calling", "zod"],
	},
	{
		name: "Call Tool Multiple Steps",
		slug: "call-tool-multiple-steps",
		description: "Chain multiple tool calls where each step depends on the previous result",
		tags: ["tools", "multi-step", "chaining"],
	},
	{
		name: "Chat with PDFs",
		slug: "chat-with-pdfs",
		description: "Build an AI assistant that can read and answer questions about PDF documents",
		tags: ["pdf", "chat", "documents"],
	},
	{
		name: "Send Custom Body",
		slug: "send-custom-body",
		description: "Send additional data alongside chat messages to your API endpoint",
		tags: ["custom-data", "personalization", "api"],
	},
	{
		name: "Render Visual Interface",
		slug: "render-visual-interface",
		description: "Render custom UI components for different tool outputs",
		tags: ["ui-components", "interactive", "tools"],
	},
	{
		name: "Generate Text with Chat Prompt",
		slug: "generate-text-with-chat-prompt",
		description:
			"Generate text using conversational chat prompts for more natural interactions",
		tags: ["text", "generation", "chat"],
	},
	{
		name: "Stream Text with Chat Prompt",
		slug: "stream-text-with-chat-prompt",
		description: "Combine streaming with chat prompts for responsive conversational AI",
		tags: ["text", "streaming", "chat"],
	},
	{
		name: "Markdown Chatbot",
		slug: "markdown-chatbot",
		description: "Create a chatbot that renders responses in beautiful markdown format",
		tags: ["markdown", "chat", "formatting"],
	},
];
