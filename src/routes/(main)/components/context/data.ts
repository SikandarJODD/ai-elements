import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import Usage from "./examples/usage.svelte";
import UsageRaw from "./examples/usage.svelte?raw";

export const meta: ComponentMeta = {
	id: "context",
	title: "Context",
	description:
		"The Context component provides a comprehensive view of AI model usage through a compound component system.",
};

const seo: SEO = {
	title: "Context",
	description:
		"The Context component provides a comprehensive view of AI model usage through a compound component system.",
	keywords: ["Svelte", "Context", "Token usage", "Svelte AI Elements"],
};

let serverUsageFile = `import { streamText, type UIMessage, convertToModelMessages } from "ai";
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

let aiConfigFile = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY,
});

export let defaultModel = "arcee-ai/trinity-large-preview:free";
`;

const examples: Example[] = [
	{
		name: "Usage with AI SDK",
		preview: Usage,
		code: [
			{
				filename: "usage.svelte",
				filecode: UsageRaw,
			},
			{
				filename: "api/chat/+server.ts",
				filecode: serverUsageFile,
				lang: "typescript",
			},
			{
				filename: "lib/config/ai.ts",
				filecode: aiConfigFile,
				lang: "typescript",
			},
		],
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: Basic,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	examples,
	props: [
		{
			name: "Context",
			props: [
				{
					name: "usedTokens",
					type: "number",
					description: "Number of tokens currently used",
				},
				{
					name: "maxTokens",
					type: "number",
					description: "Maximum number of tokens allowed",
				},
				{
					name: "usage",
					type: "LanguageModelUsage",
					description:
						"Detailed token usage breakdown (input, output, reasoning, cached)",
				},
				{
					name: "modelId",
					type: "string",
					description: "Model identifier for cost estimation",
				},
				{
					name: "closeDelay",
					type: "number",
					default: "0",
					description: "Delay in milliseconds before closing the hover card",
				},
				{
					name: "openDelay",
					type: "number",
					default: "0",
					description: "Delay in milliseconds before opening the hover card",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Child components (typically ContextTrigger and ContextContent)",
				},
			],
		},
		{
			name: "ContextTrigger",
			props: [
				{
					name: "variant",
					type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					default: "'ghost'",
					description: "Button variant style",
				},
				{
					name: "size",
					type: "'default' | 'sm' | 'lg' | 'icon'",
					description: "Button size",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Custom trigger content (defaults to percentage display with icon)",
				},
			],
		},
		{
			name: "ContextContent",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the content container",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Content to display in the hover card (typically header, body, footer)",
				},
			],
		},
		{
			name: "ContextContentHeader",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the header",
				},
				{
					name: "children",
					type: "Snippet",
					description:
						"Custom header content (defaults to percentage and token count display)",
				},
			],
		},
		{
			name: "ContextContentBody",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the body",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Body content (typically usage breakdown components)",
				},
			],
		},
		{
			name: "ContextContentFooter",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the footer",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom footer content (defaults to total cost display)",
				},
			],
		},
		{
			name: "ContextInputUsage",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the input usage display",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content for input token usage display",
				},
			],
		},
		{
			name: "ContextOutputUsage",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the output usage display",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content for output token usage display",
				},
			],
		},
		{
			name: "ContextReasoningUsage",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the reasoning usage display",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content for reasoning token usage display",
				},
			],
		},
		{
			name: "ContextCacheUsage",
			props: [
				{
					name: "class",
					type: "string",
					description: "Additional CSS classes to apply to the cache usage display",
				},
				{
					name: "children",
					type: "Snippet",
					description: "Custom content for cache token usage display",
				},
			],
		},
	],
};
