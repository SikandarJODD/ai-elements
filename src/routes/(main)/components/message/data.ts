import ActionsMessageActionSvelteRaw from "$lib/components/ai-elements/message/actions/message-action.svelte?raw";
import ActionsMessageActionsSvelteRaw from "$lib/components/ai-elements/message/actions/message-actions.svelte?raw";
import ActionsMessageToolbarSvelteRaw from "$lib/components/ai-elements/message/actions/message-toolbar.svelte?raw";
import AttachmentsMessageAttachmentPreviewSvelteRaw from "$lib/components/ai-elements/message/attachments/message-attachment-preview.svelte?raw";
import AttachmentsMessageAttachmentSvelteRaw from "$lib/components/ai-elements/message/attachments/message-attachment.svelte?raw";
import AttachmentsMessageAttachmentsSvelteRaw from "$lib/components/ai-elements/message/attachments/message-attachments.svelte?raw";
import BranchingMessageBranchContentSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch-content.svelte?raw";
import BranchingMessageBranchNextSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch-next.svelte?raw";
import BranchingMessageBranchPageSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch-page.svelte?raw";
import BranchingMessageBranchPreviousSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch-previous.svelte?raw";
import BranchingMessageBranchSelectorSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch-selector.svelte?raw";
import BranchingMessageBranchSvelteRaw from "$lib/components/ai-elements/message/branching/message-branch.svelte?raw";
import ContextMessageContextSvelteTsRaw from "$lib/components/ai-elements/message/context/message-context.svelte.ts?raw";
import CoreMessageContentSvelteRaw from "$lib/components/ai-elements/message/core/message-content.svelte?raw";
import CoreMessageSvelteRaw from "$lib/components/ai-elements/message/core/message.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/message/index.ts?raw";
import ResponseMessageResponseSvelteRaw from "$lib/components/ai-elements/message/response/message-response.svelte?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import type { Example } from "$lib/types/example";
import Usage from "./examples/usage.svelte";
import UsageRaw from "./examples/usage.svelte?raw";
import FileAttachmentExample from "./examples/file-attachment-example.svelte";
import FileAttachmentExampleRaw from "./examples/file-attachment-example.svelte?raw";
import BranchExample from "./examples/branch-example.svelte";
import BranchExampleRaw from "./examples/branch-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "message",
	title: "Message",
	description:
		"Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Message",
	description:
		"Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.",
	keywords: ["Svelte", "Message", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "actions/message-action.svelte",
			code: ActionsMessageActionSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{
			name: "actions/message-actions.svelte",
			code: ActionsMessageActionsSvelteRaw,
			lang: "svelte",
		},
		{
			name: "actions/message-toolbar.svelte",
			code: ActionsMessageToolbarSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/message-attachment-preview.svelte",
			code: AttachmentsMessageAttachmentPreviewSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/message-attachment.svelte",
			code: AttachmentsMessageAttachmentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/message-attachments.svelte",
			code: AttachmentsMessageAttachmentsSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch-content.svelte",
			code: BranchingMessageBranchContentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch-next.svelte",
			code: BranchingMessageBranchNextSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch-page.svelte",
			code: BranchingMessageBranchPageSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch-previous.svelte",
			code: BranchingMessageBranchPreviousSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch-selector.svelte",
			code: BranchingMessageBranchSelectorSvelteRaw,
			lang: "svelte",
		},
		{
			name: "branching/message-branch.svelte",
			code: BranchingMessageBranchSvelteRaw,
			lang: "svelte",
		},
		{
			name: "context/message-context.svelte.ts",
			code: ContextMessageContextSvelteTsRaw,
			lang: "typescript",
		},
		{ name: "core/message-content.svelte", code: CoreMessageContentSvelteRaw, lang: "svelte" },
		{ name: "core/message.svelte", code: CoreMessageSvelteRaw, lang: "svelte" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
		{
			name: "response/message-response.svelte",
			code: ResponseMessageResponseSvelteRaw,
			lang: "svelte",
		},
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── message/
				├── actions/
				│   ├── message-action.svelte
				│   ├── message-actions.svelte
				│   └── message-toolbar.svelte
				├── attachments/
				│   ├── message-attachment-preview.svelte
				│   ├── message-attachment.svelte
				│   └── message-attachments.svelte
				├── branching/
				│   ├── message-branch-content.svelte
				│   ├── message-branch-next.svelte
				│   ├── message-branch-page.svelte
				│   ├── message-branch-previous.svelte
				│   ├── message-branch-selector.svelte
				│   └── message-branch.svelte
				├── context/
				│   └── message-context.svelte.ts
				├── core/
				│   ├── message-content.svelte
				│   └── message.svelte
				├── response/
				│   └── message-response.svelte
				└── index.ts`,
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

	return result.toUIMessageStreamResponse();
};
`;

let examples: Example[] = [
	{
		name: "File Attachment Example",
		preview: FileAttachmentExample,
		code: {
			name: "file-attachment-example.svelte",
			code: FileAttachmentExampleRaw,
			lang: "svelte",
		},
	},
	{
		name: "Branch Message Example",
		preview: BranchExample,
		code: {
			name: "branch-example.svelte",
			code: BranchExampleRaw,
			lang: "svelte",
		},
	},
	{
		name: "Usage with AI SDK",
		preview: Usage,
		code: [
			{
				name: "config/ai.ts",
				code: aiConfigRaw,
				lang: "typescript",
			},
			{
				name: "routes/api/message/route.ts",
				code: serverTsRaw,
				lang: "typescript",
			},
			{
				name: "+page.svelte",
				code: UsageRaw,
				lang: "svelte",
			},
		],
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
		preview_class: "max-h-140 overflow-y-auto",
		is_center: false,
		show_retry: false,
	},
	examples,
	install_block,
	seo,
	props: [],
};
