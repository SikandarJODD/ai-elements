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
    desc: "TODO: Chain Of Thought.",
  },
  {
    id: "checkpoint",
    name: "Checkpoint",
    href: "/components/checkpoint",
    desc: "TODO: Checkpoint.",
  },
  {
    id: "confirmation",
    name: "Confirmation",
    href: "/components/confirmation",
    desc: "TODO: Confirmation.",
  },
  {
    id: "context",
    name: "Context",
    href: "/components/context",
    desc: "TODO: Context.",
  },
  {
    id: "conversation",
    name: "Conversation",
    href: "/components/conversation",
    desc: "TODO: Conversation.",
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
    desc: "TODO: Inline Citation.",
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
    desc: "TODO: Message.",
  },
  {
    id: "model-selector",
    name: "Model Selector",
    href: "/components/model-selector",
    desc: "TODO: Model Selector.",
  },
  {
    id: "open-in-chat",
    name: "Open In Chat",
    href: "/components/open-in-chat",
    desc: "TODO: Open In Chat.",
  },
  {
    id: "plan",
    name: "Plan",
    href: "/components/plan",
    desc: "TODO: Plan.",
  },
  {
    id: "prompt-input",
    name: "Prompt Input",
    href: "/components/prompt-input",
    desc: "TODO: Prompt Input.",
  },
  {
    id: "queue",
    name: "Queue",
    href: "/components/queue",
    desc: "TODO: Queue.",
  },
  {
    id: "reasoning",
    name: "Reasoning",
    href: "/components/reasoning",
    desc: "TODO: Reasoning.",
  },
  {
    id: "response",
    name: "Response",
    href: "/components/response",
    desc: "TODO: Response.",
  },
  {
    id: "shimmer",
    name: "Shimmer",
    href: "/components/shimmer",
    desc: "TODO: Shimmer.",
  },
  {
    id: "sources",
    name: "Sources",
    href: "/components/sources",
    desc: "TODO: Sources.",
  },
  {
    id: "task",
    name: "Task",
    href: "/components/task",
    desc: "TODO: Task.",
  },
  {
    id: "tool",
    name: "Tool",
    href: "/components/tool",
    desc: "TODO: Tool.",
  },
  {
    id: "web-preview",
    name: "Web Preview",
    href: "/components/web-preview",
    desc: "TODO: Web Preview.",
  },
  {
    id: "suggestion",
    name: "Suggestion",
    href: "/components/suggestion",
    desc: "TODO: Suggestion.",
  },
];

export { components };

let docsPages: DocPage[] = [
	{
		id: "docs",
		name: "Introduction",
		href: "/docs",
		desc: "Overview of Svelte Prompt Kit and its AI-focused component philosophy."
	},
	{
		id: "installation",
		name: "Installation",
		href: "/",
		desc: "Set up SvelteKit, initialize shadcn-svelte, and add your first Prompt Kit component."
	}
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
		next: index < items.length - 1 ? items[index + 1] : null
	};
}
