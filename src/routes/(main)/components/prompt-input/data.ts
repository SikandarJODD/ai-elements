import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";
import Preview from "./examples/preview.svelte";
import PreviewRaw from "./examples/preview.svelte?raw";
import AttachFileExample from "./examples/attach-file-example.svelte";
import AttachFileExampleRaw from "./examples/attach-file-example.svelte?raw";

import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";
import type { SEO } from "$lib/structure/seo";
import type { Example } from "$lib/structure/examples";
import Usage from "./examples/usage.svelte";
import UsageRaw from "./examples/usage.svelte?raw";
import ActionMenuExample from "./examples/action-menu-example.svelte";
import ActionMenuExampleRaw from "./examples/action-menu-example.svelte?raw";
import SelectModelExample from "./examples/select-model-example.svelte";
import SelectModelExampleRaw from "./examples/select-model-example.svelte?raw";
import ProviderSharedDraftExample from "./examples/provider-shared-draft-example.svelte";
import ProviderSharedDraftExampleRaw from "./examples/provider-shared-draft-example.svelte?raw";
import ProviderDraftSummaryRaw from "./examples/provider-draft-summary.svelte?raw";
import ProviderDraftActionsRaw from "./examples/provider-draft-actions.svelte?raw";
import ProviderPromptComposerRaw from "./examples/provider-prompt-composer.svelte?raw";

export const meta: ComponentMeta = {
	id: "prompt-input",
	title: "Prompt Input",
	description:
		"The Prompt Input component allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
	category: "utilities",
	badge: "new",
};

const seo: SEO = {
	title: "Prompt Input",
	description: "Learn how to implement Prompt Input Component with AI SDK",
	keywords: ["Svelte", "Prompt Input", "Svelte AI Elements"],
};

let serverTsFileRaw = `// Place it inside routes/api/chat/+server.ts

import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages }: { messages: UIMessage[] } = await request.json();

	let result = streamText({
		model: openrouter(defaultModel),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
};
`;

let serverTsFileRawWithModelSelection = `import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, model }: { messages: UIMessage[]; model: string } = await request.json();

	let modelToUse = model ? model : defaultModel;
	let result = streamText({
		model: openrouter(modelToUse),
		messages: await convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
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
		name: "Action Menu",
		preview: ActionMenuExample,
		code: {
			filename: "action-menu-example.svelte",
			filecode: ActionMenuExampleRaw,
			lang: "svelte",
			highlight: [[27, 40]],
		},
	},
	{
		name: "File Attachment",
		preview: AttachFileExample,
		code: {
			filename: "file-attachment-example.svelte",
			filecode: AttachFileExampleRaw,
			lang: "svelte",
			highlight: [[12, 16]],
		},
	},
	{
		name: "AI SDK Integration",
		preview: Usage,
		code: [
			{
				filename: "ai-sdk-usage.svelte",
				filecode: UsageRaw,
				lang: "svelte",
			},
			{
				filename: "api/chat/+server.ts",
				filecode: serverTsFileRaw,
				lang: "typescript",
			},
			{
				filename: "lib/config/ai.ts",
				filecode: aiConfigFile,
				lang: "typescript",
			},

		],
	},
	{
		name: "Model Selection + AI SDK Integration",
		preview: SelectModelExample,
		code: [
			{
				filename: "select-model-example.svelte",
				filecode: SelectModelExampleRaw,
				lang: "svelte",
			},
			{
				filename: "api/chat/+server.ts",
				filecode: serverTsFileRawWithModelSelection,
				lang: "typescript",
			},
			{
				filename: "lib/config/ai.ts",
				filecode: aiConfigFile,
				lang: "typescript",
			},
		],
	},
	{
		name: "Prompt Input Provider Example",
		preview: ProviderSharedDraftExample,
		code: [
			{
				filename: "provider-example.svelte",
				filecode: ProviderSharedDraftExampleRaw,
				lang: "svelte",
			},
			{
				filename: "draft-summary.svelte",
				filecode: ProviderDraftSummaryRaw,
				lang: "svelte",
			},
			{
				filename: "draft-actions.svelte",
				filecode: ProviderDraftActionsRaw,
				lang: "svelte",
			},
			{
				filename: "draft-input.svelte",
				filecode: ProviderPromptComposerRaw,
				lang: "svelte",
			},
		],
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: Preview,
	previewCode: {
		filename: "preview.svelte",
		filecode: PreviewRaw,
		lang: "svelte",
		isExpand: false,
	},
	seo,
	examples,
};
