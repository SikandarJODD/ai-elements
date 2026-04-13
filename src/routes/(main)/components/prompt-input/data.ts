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
import { openrouter, defaultModel } from "$lib/config/ai-config";
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
			}
		]
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
