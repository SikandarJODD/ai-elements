export type BadgeType = "New" | "Updated" | "Beta";

export interface Component {
	id: string;
	name: string;
	href: string;
	badge?: BadgeType;
	desc?: string;
}

export interface DocPage {
	id: string;
	name: string;
	href: string;
	badge?: BadgeType;
	desc?: string;
}

let components: Component[] = [
	{
		id: "chain-of-thought",
		name: "Chain Of Thought",
		href: "/components/chain-of-thought",
		desc: "A collapsible component that visualizes AI reasoning steps with support for search results, images, and step-by-step progress indicators.",
	},
	{
		id: "checkpoint",
		name: "Checkpoint",
		href: "/components/checkpoint",
		desc: "A collapsible component that visualizes AI reasoning steps with support for search results, images, and step-by-step progress indicators.",
	},
	{
		id: "confirmation",
		name: "Confirmation",
		href: "/components/confirmation",
		desc: "An alert-based component for managing tool execution approval workflows with request, accept, and reject states.",
	},
	{
		id: "context",
		name: "Context",
		href: "/components/context",
		desc: "A compound component system for displaying AI model context window usage, token consumption, and cost estimation.",
	},
	{
		id: "conversation",
		name: "Conversation",
		href: "/components/conversation",
		desc: "Wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
	},
	{
		id: "image",
		name: "Image",
		href: "/components/image",
		desc: "TODO: Image.",
	},
	{
		id: "inline-citation",
		name: "Inline Citation",
		href: "/components/inline-citation",
		desc: "A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.",
	},
	{
		id: "loader",
		name: "Loader",
		href: "/components/loader",
		desc: "TODO: Loader.",
	},
	{
		id: "message",
		name: "Message",
		href: "/components/message",
		desc: "A comprehensive suite of components for displaying chat messages, including message rendering, branching, actions, and markdown responses.",
	},
	{
		id: "model-selector",
		name: "Model Selector",
		href: "/components/model-selector",
		desc: "A searchable command palette for selecting AI models in your chat interface.",
	},
	{
		id: "open-in-chat",
		name: "Open In Chat",
		href: "/components/open-in-chat",
		desc: "A dropdown menu for opening queries in various AI chat platforms including ChatGPT, Claude, T3, Scira, and v0.",
	},
	{
		id: "plan",
		name: "Plan",
		href: "/components/plan",
		desc: "A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animation",
	},
	{
		id: "prompt-input",
		name: "Prompt Input",
		href: "/components/prompt-input",
		desc: "Allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
	},
	{
		id: "queue",
		name: "Queue",
		href: "/components/queue",
		desc: "A comprehensive queue component system for displaying message lists, todos, and collapsible task sections in AI applications.",
	},
	{
		id: "reasoning",
		name: "Reasoning",
		href: "/components/reasoning",
		desc: "A collapsible component that displays AI reasoning content, automatically opening during streaming and closing when finished.",
	},
	// {
	// 	id: "response",
	// 	name: "Response",
	// 	href: "/components/response",
	// 	desc: "TODO: Response.",
	// },
	{
		id: "shimmer",
		name: "Shimmer",
		href: "/components/shimmer",
		desc: "An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
	},
	{
		id: "sources",
		name: "Sources",
		href: "/components/sources",
		desc: "A component that allows a user to view the sources or citations used to generate a response.",
	},
	{
		id: "suggestion",
		name: "Suggestion",
		href: "/components/suggestion",
		desc: "A suggestion component that displays a horizontal row of clickable suggestions for user interaction.",
	},
	{
		id: "task",
		name: "Task",
		href: "/components/task",
		desc: "A collapsible task list component for displaying AI workflow progress, with status indicators and optional descriptions.",
	},
	{
		id: "tool",
		name: "Tool",
		href: "/components/tool",
		desc: "A collapsible component for displaying tool invocation details in AI chatbot interfaces.",
	},
	{
		id: "web-preview",
		name: "Web Preview",
		href: "/components/web-preview",
		desc: "A composable component for previewing the result of a generated UI, with support for live examples and code display.",
	},
];

export { components };

let docsPages: DocPage[] = [
	{
		id: "docs",
		name: "Introduction",
		href: "/docs",
		desc: "Overview of Svelte AI Elements, its inspiration, and the project goal.",
	},
	{
		id: "installation",
		name: "Installation",
		href: "/docs/installation",
		desc: "Set up SvelteKit, initialize shadcn-svelte, and add your first Svelte AI Elements component.",
	},
];

export { docsPages };

// let primitivePages: DocPage[] = [
// 	{
// 		id: "full-chatbot",
// 		name: "Full Chatbot",
// 		href: "/primitives/full-chatbot",
// 		desc: "A full AI chatbot setup with UI, model config, and API route wiring."
// 	}
// ];

// export { primitivePages };

// let blockPages: DocPage[] = [
// 	{
// 		id: "blocks",
// 		name: "Blocks",
// 		href: "/blocks",
// 		desc: "Composable block-level examples built from Prompt Kit components."
// 	}
// ];

// export { blockPages };

type NavigationItem = DocPage | Component;

function getNavigationItems(): NavigationItem[] {
	// ...primitivePages, ...blockPages,
	return [...docsPages, ...components];
}

export function getPrevNext(id: string): {
	prev: NavigationItem | null;
	next: NavigationItem | null;
} {
	let items = getNavigationItems();
	let index = items.findIndex((item) => item.id === id);
	if (index === -1) return { prev: null, next: null };
	return {
		prev: index > 0 ? items[index - 1] : null,
		next: index < items.length - 1 ? items[index + 1] : null,
	};
}
