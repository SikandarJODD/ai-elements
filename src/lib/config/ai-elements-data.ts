export interface AIElementItem {
	name: string;
	slug: string;
	href: string;
	description: string;
	category: "docs" | "components" | "workflow" | "guides";
}

/**
 * Ordered list of all AI Elements pages for navigation
 * Order matches the sidebar navigation
 * Note: Branch component is currently commented out/disabled
 */
export const aiElementsData: AIElementItem[] = [
	// Getting Started (Docs)
	{
		name: "Introduction",
		slug: "introduction",
		href: "/docs/introduction",
		description: "Get started with Svelte AI Elements",
		category: "docs",
	},
	{
		name: "Installation",
		slug: "installation",
		href: "/docs/installation",
		description: "How to install and set up components",
		category: "docs",
	},

	// Components (alphabetically ordered as in sidebar)
	{
		name: "Actions",
		slug: "actions",
		href: "/components/actions",
		description: "Action buttons for AI responses",
		category: "components",
	},
	{
		name: "Artifact",
		slug: "artifact",
		href: "/components/artifact",
		description: "Display AI-generated artifacts and content",
		category: "components",
	},
	{
		name: "Chain of Thought",
		slug: "chain-of-thought",
		href: "/components/chain-of-thought",
		description: "Visualize AI reasoning steps",
		category: "components",
	},
	{
		name: "Checkpoint",
		slug: "checkpoint",
		href: "/components/checkpoint",
		description: "Mark progress points in conversations",
		category: "components",
	},
	{
		name: "Code Block",
		slug: "code",
		href: "/components/code",
		description: "Syntax highlighted code display",
		category: "components",
	},
	{
		name: "Confirmation",
		slug: "confirmation",
		href: "/components/confirmation",
		description: "User confirmation dialogs for AI actions",
		category: "components",
	},
	{
		name: "Context",
		slug: "context",
		href: "/components/context",
		description: "Display token usage and model metrics",
		category: "components",
	},
	{
		name: "Conversation",
		slug: "conversation",
		href: "/components/conversation",
		description: "Chat conversation container with scroll",
		category: "components",
	},
	{
		name: "Image",
		slug: "image",
		href: "/components/image",
		description: "Display AI-generated images",
		category: "components",
	},
	{
		name: "Inline Citation",
		slug: "inline-citation",
		href: "/components/inline-citation",
		description: "Reference citations within text",
		category: "components",
	},
	{
		name: "Loader",
		slug: "loader",
		href: "/components/loader",
		description: "Loading indicators for AI responses",
		category: "components",
	},
	{
		name: "Message",
		slug: "message",
		href: "/components/message",
		description: "Chat message with avatar and content",
		category: "components",
	},
	{
		name: "Message (New)",
		slug: "new-message",
		href: "/components/new-message",
		description: "Enhanced message component",
		category: "components",
	},
	{
		name: "Model Selector",
		slug: "model-selector",
		href: "/components/model-selector",
		description: "Searchable AI model selection",
		category: "components",
	},
	{
		name: "Open in Chat",
		slug: "open-in-chat",
		href: "/components/open-in-chat",
		description: "Share prompts to AI platforms",
		category: "components",
	},
	{
		name: "Plan",
		slug: "plan",
		href: "/components/plan",
		description: "Display AI planning and steps",
		category: "components",
	},
	{
		name: "Prompt Input",
		slug: "prompt-input",
		href: "/components/prompt-input",
		description: "Advanced prompt input with attachments",
		category: "components",
	},
	{
		name: "Queue",
		slug: "queue",
		href: "/components/queue",
		description: "Manage queued AI requests",
		category: "components",
	},
	{
		name: "Reasoning",
		slug: "reasoning",
		href: "/components/reasoning",
		description: "Display AI reasoning process",
		category: "components",
	},
	{
		name: "Response",
		slug: "response",
		href: "/components/response",
		description: "Structured AI response container",
		category: "components",
	},
	{
		name: "Shimmer",
		slug: "shimmer",
		href: "/components/shimmer",
		description: "Shimmer loading effect",
		category: "components",
	},
	{
		name: "Sources",
		slug: "sources",
		href: "/components/sources",
		description: "Display reference sources",
		category: "components",
	},
	{
		name: "Suggestion",
		slug: "suggestion",
		href: "/components/suggestion",
		description: "Interactive prompt suggestions",
		category: "components",
	},
	{
		name: "Task",
		slug: "task",
		href: "/components/task",
		description: "Display task progress and status",
		category: "components",
	},
	{
		name: "Tool",
		slug: "tool",
		href: "/components/tool",
		description: "Tool call visualization",
		category: "components",
	},
	{
		name: "Web Preview",
		slug: "web-preview",
		href: "/components/web-preview",
		description: "Preview web content inline",
		category: "components",
	},

	// Workflow Components
	{
		name: "Canvas",
		slug: "canvas",
		href: "/components/workflow/canvas",
		description: "Main container for workflow diagrams",
		category: "workflow",
	},
	{
		name: "Connection",
		slug: "connection",
		href: "/components/workflow/connection",
		description: "Connect workflow nodes",
		category: "workflow",
	},
	{
		name: "Controls",
		slug: "controls",
		href: "/components/workflow/controls",
		description: "Zoom and pan controls",
		category: "workflow",
	},
	{
		name: "Edge",
		slug: "edge",
		href: "/components/workflow/edge",
		description: "Edges between workflow nodes",
		category: "workflow",
	},
	{
		name: "Node",
		slug: "node",
		href: "/components/workflow/node",
		description: "Workflow node components",
		category: "workflow",
	},
	{
		name: "Panel",
		slug: "panel",
		href: "/components/workflow/panel",
		description: "Workflow side panels",
		category: "workflow",
	},
	{
		name: "Toolbar",
		slug: "toolbar",
		href: "/components/workflow/toolbar",
		description: "Workflow action toolbar",
		category: "workflow",
	},

	// Guides
	{
		name: "Basic Setup Guide",
		slug: "basic-setup",
		href: "/guides/basic-setup",
		description: "Complete setup guide for Svelte AI Elements",
		category: "guides",
	},
	{
		name: "Svelte 5 + AI SDK Integration",
		slug: "svelte-5-ai-sdk-integration",
		href: "/guides/svelte-5-ai-sdk-integration",
		description: "Master Svelte 5 runes with AI SDK",
		category: "guides",
	},
];

// Helper functions
export function getAIElementBySlug(slug: string): AIElementItem | undefined {
	return aiElementsData.find((item) => item.slug === slug);
}

export function getAIElementByHref(href: string): AIElementItem | undefined {
	return aiElementsData.find((item) => item.href === href);
}

export function getPrevNextBySlug(slug: string): {
	prev: AIElementItem | null;
	next: AIElementItem | null;
} {
	const currentIndex = aiElementsData.findIndex((item) => item.slug === slug);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: currentIndex > 0 ? aiElementsData[currentIndex - 1] : null,
		next: currentIndex < aiElementsData.length - 1 ? aiElementsData[currentIndex + 1] : null,
	};
}

export function getTotalCount(): number {
	return aiElementsData.length;
}

export function getCountByCategory(category: AIElementItem["category"]): number {
	return aiElementsData.filter((item) => item.category === category).length;
}
