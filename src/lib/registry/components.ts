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
		desc: "Display step-by-step reasoning and collapsible thought processes in AI interfaces"
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
		href: "/docs/installation",
		desc: "Set up SvelteKit, initialize shadcn-svelte, and add your first Prompt Kit component."
	}
];

export { docsPages };

let primitivePages: DocPage[] = [
	{
		id: "full-chatbot",
		name: "Full Chatbot",
		href: "/primitives/full-chatbot",
		desc: "A full AI chatbot setup with UI, model config, and API route wiring."
	}
];

export { primitivePages };

let blockPages: DocPage[] = [
	{
		id: "blocks",
		name: "Blocks",
		href: "/blocks",
		desc: "Composable block-level examples built from Prompt Kit components."
	}
];

export { blockPages };

type NavigationItem = DocPage | Component;

function getNavigationItems(): NavigationItem[] {
	return [...docsPages, ...primitivePages, ...blockPages, ...components];
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
