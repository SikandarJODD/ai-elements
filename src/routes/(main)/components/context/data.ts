import ContextCacheUsageSvelteRaw from "$lib/components/ai-elements/context/context-cache-usage.svelte?raw";
import ContextContentBodySvelteRaw from "$lib/components/ai-elements/context/context-content-body.svelte?raw";
import ContextContentFooterSvelteRaw from "$lib/components/ai-elements/context/context-content-footer.svelte?raw";
import ContextContentHeaderSvelteRaw from "$lib/components/ai-elements/context/context-content-header.svelte?raw";
import ContextContentSvelteRaw from "$lib/components/ai-elements/context/context-content.svelte?raw";
import ContextContextSvelteTsRaw from "$lib/components/ai-elements/context/context-context.svelte.ts?raw";
import ContextIconSvelteRaw from "$lib/components/ai-elements/context/context-icon.svelte?raw";
import ContextInputUsageSvelteRaw from "$lib/components/ai-elements/context/context-input-usage.svelte?raw";
import ContextOutputUsageSvelteRaw from "$lib/components/ai-elements/context/context-output-usage.svelte?raw";
import ContextReasoningUsageSvelteRaw from "$lib/components/ai-elements/context/context-reasoning-usage.svelte?raw";
import ContextTriggerSvelteRaw from "$lib/components/ai-elements/context/context-trigger.svelte?raw";
import ContextSvelteRaw from "$lib/components/ai-elements/context/context.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/context/index.ts?raw";
import TokensWithCostSvelteRaw from "$lib/components/ai-elements/context/tokens-with-cost.svelte?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import Usage from "./examples/usage.svelte";
import UsageCode from "./examples/usage.svelte?raw";
import type { Example } from "$lib/types/example";

export const meta: ComponentMeta = {
	id: "context",
	title: "Context",
	description:
		"The Context component provides a comprehensive view of AI model usage through a compound component system.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Context",
	description:
		"The Context component provides a comprehensive view of AI model usage through a compound component system.",
	keywords: ["Svelte", "Context", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "context-cache-usage.svelte",
			code: ContextCacheUsageSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{ name: "context-content-body.svelte", code: ContextContentBodySvelteRaw, lang: "svelte" },
		{
			name: "context-content-footer.svelte",
			code: ContextContentFooterSvelteRaw,
			lang: "svelte",
		},
		{
			name: "context-content-header.svelte",
			code: ContextContentHeaderSvelteRaw,
			lang: "svelte",
		},
		{ name: "context-content.svelte", code: ContextContentSvelteRaw, lang: "svelte" },
		{ name: "context-context.svelte.ts", code: ContextContextSvelteTsRaw, lang: "typescript" },
		{ name: "context-icon.svelte", code: ContextIconSvelteRaw, lang: "svelte" },
		{ name: "context-input-usage.svelte", code: ContextInputUsageSvelteRaw, lang: "svelte" },
		{ name: "context-output-usage.svelte", code: ContextOutputUsageSvelteRaw, lang: "svelte" },
		{
			name: "context-reasoning-usage.svelte",
			code: ContextReasoningUsageSvelteRaw,
			lang: "svelte",
		},
		{ name: "context-trigger.svelte", code: ContextTriggerSvelteRaw, lang: "svelte" },
		{ name: "context.svelte", code: ContextSvelteRaw, lang: "svelte" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
		{ name: "tokens-with-cost.svelte", code: TokensWithCostSvelteRaw, lang: "svelte" },
	],
	folder_structure: "",
};

// Usage with AI SDK Example Code
let aiConfigRaw = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

export let defaultModel = "arcee-ai/trinity-large-preview:free";
`;

let serverTsRaw = `import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[];} = await request.json();

	let result = streamText({
		model: openrouter(defaultModel),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse({
		messageMetadata: ({ part }) => {
			if (part.type === "finish") {
				return {
					inputTokens: part.totalUsage.inputTokens,
					totalTokens: part.totalUsage.totalTokens,
					outputTokens: part.totalUsage.outputTokens,
					reasoningTokens: part.totalUsage.outputTokenDetails.reasoningTokens,
				};
			}
		},
	});
};
`;

let examples: Example[] = [
	{
		name: "Usage with AI SDK",
		preview: Usage,
		code: [
			{
				name: "usage.svelte",
				lang: "svelte",
				code: UsageCode,
			},
			{
				name: "config/ai.ts",
				lang: "typescript",
				code: aiConfigRaw,
			},
			{
				name: "api/context/+server.ts",
				lang: "typescript",
				code: serverTsRaw,
			},
		],
		description:
			"Example of using the Context component in an AI chatbot interface, displaying input, output, and reasoning token usage based on streaming responses from an AI model.",
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: {
		preview: Preview,
		code: {
			name: "preview.svelte",
			code: PreviewCode,
			lang: "svelte",
		},
	},
	examples,
	install_block,
	seo,
	props: [],
};
