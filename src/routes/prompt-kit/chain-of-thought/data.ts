import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";

export const meta: ComponentMeta = {
    id: "chain-of-thought",
    title: "Chain of Thought",
    description: "A component to display the chain of thought for an AI model with optional actions.",
    category: "utilities",
    badge: "new",
};

const seo: SEO = {
    title: "Chain of Thought",
    description: "A component to display the chain of thought for an AI model with optional actions.",
    keywords: ["Svelte", "Chain of Thought", "Svelte Prompt Kit"],
};

const examples: Example[] = [];

export const data: ComponentDoc = {
    ...meta,
    seo,
    examples,
};
