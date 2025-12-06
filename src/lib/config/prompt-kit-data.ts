/**
 * Prompt Kit Navigation Data
 * Used for previous/next navigation across all prompt-kit pages
 */

export interface PromptKitItem {
	name: string;
	slug: string;
	href: string;
	description: string;
	category: "docs" | "primitives" | "blocks" | "components";
}

/**
 * Ordered list of all Prompt Kit pages for navigation
 * Order matches the sidebar navigation
 */
export const promptKitData: PromptKitItem[] = [
	// Getting Started
	{
		name: "Introduction",
		slug: "introduction",
		href: "/prompt-kit",
		description: "Get started with Prompt Kit for Svelte",
		category: "docs",
	},
	{
		name: "Installation",
		slug: "installation",
		href: "/prompt-kit/installation",
		description: "How to install and set up Prompt Kit components",
		category: "docs",
	},

	// Primitives
	{
		name: "Primitives",
		slug: "primitives",
		href: "/prompt-kit/primitives",
		description: "Core primitive components and patterns",
		category: "primitives",
	},

	// Blocks
	{
		name: "Blocks",
		slug: "blocks",
		href: "/prompt-kit/blocks",
		description: "Pre-built UI blocks for AI applications",
		category: "blocks",
	},

	// Components (alphabetically ordered as in sidebar)
	{
		name: "Chain of Thought",
		slug: "chain-of-thought",
		href: "/prompt-kit/chain-of-thought",
		description: "Display AI's step-by-step reasoning process",
		category: "components",
	},
	{
		name: "Chat Container",
		slug: "chat-container",
		href: "/prompt-kit/chat-container",
		description: "Complete chat container with scrolling and auto-scroll",
		category: "components",
	},
	{
		name: "Code Block",
		slug: "code-block",
		href: "/prompt-kit/code-block",
		description: "Syntax-highlighted code blocks with copy functionality",
		category: "components",
	},
	{
		name: "Feedback Bar",
		slug: "feedback-bar",
		href: "/prompt-kit/feedback-bar",
		description: "Feedback component with thumbs up/down buttons for AI responses",
		category: "components",
	},
	{
		name: "File Upload",
		slug: "file-upload",
		href: "/prompt-kit/file-upload",
		description: "File upload with preview and drag-and-drop support",
		category: "components",
	},
	{
		name: "Image",
		slug: "image",
		href: "/prompt-kit/image",
		description: "Image display component for AI responses",
		category: "components",
	},
	{
		name: "Loader",
		slug: "loader",
		href: "/prompt-kit/loader",
		description: "Loading indicators for AI responses",
		category: "components",
	},
	{
		name: "Markdown",
		slug: "markdown",
		href: "/prompt-kit/markdown",
		description: "Markdown rendering with streaming support",
		category: "components",
	},
	{
		name: "Message",
		slug: "message",
		href: "/prompt-kit/message",
		description: "Chat message display component",
		category: "components",
	},
	{
		name: "Prompt Input",
		slug: "prompt-input",
		href: "/prompt-kit/prompt-input",
		description: "AI chat input with rich features",
		category: "components",
	},
	{
		name: "Prompt Suggestion",
		slug: "prompt-suggestion",
		href: "/prompt-kit/prompt-suggestion",
		description: "Suggested prompts for user guidance",
		category: "components",
	},
	{
		name: "Reasoning",
		slug: "reasoning",
		href: "/prompt-kit/reasoning",
		description: "AI reasoning and thinking display",
		category: "components",
	},
	{
		name: "Scroll Button",
		slug: "scroll-button",
		href: "/prompt-kit/scroll-button",
		description: "Auto-scroll button for chat containers",
		category: "components",
	},
	{
		name: "Source",
		slug: "source",
		href: "/prompt-kit/source",
		description: "Source citation and reference display",
		category: "components",
	},
	{
		name: "Steps",
		slug: "steps",
		href: "/prompt-kit/steps",
		description: "Step-by-step progress indicators",
		category: "components",
	},
	{
		name: "System Message",
		slug: "system-message",
		href: "/prompt-kit/system-message",
		description: "System message display component",
		category: "components",
	},
	{
		name: "Text Shimmer",
		slug: "text-shimmer",
		href: "/prompt-kit/text-shimmer",
		description: "Text with animated shimmer effect for loading states",
		category: "components",
	},
	{
		name: "Thinking Bar",
		slug: "thinking-bar",
		href: "/prompt-kit/thinking-bar",
		description: "AI thinking state display with optional stop button",
		category: "components",
	},
	{
		name: "Tool",
		slug: "tool",
		href: "/prompt-kit/tool",
		description: "Tool usage and execution display",
		category: "components",
	},
];

// Helper functions
export function getPromptKitBySlug(slug: string): PromptKitItem | undefined {
	return promptKitData.find((item) => item.slug === slug);
}

export function getPrevNextBySlug(slug: string): {
	prev: PromptKitItem | null;
	next: PromptKitItem | null;
} {
	const currentIndex = promptKitData.findIndex((item) => item.slug === slug);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: currentIndex > 0 ? promptKitData[currentIndex - 1] : null,
		next: currentIndex < promptKitData.length - 1 ? promptKitData[currentIndex + 1] : null,
	};
}
