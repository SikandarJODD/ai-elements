import ActionMenuActionAddAttachmentsSvelteRaw from "$lib/components/ai-elements/prompt-input/action-menu/action-add-attachments.svelte?raw";
import ActionMenuActionMenuContentSvelteRaw from "$lib/components/ai-elements/prompt-input/action-menu/action-menu-content.svelte?raw";
import ActionMenuActionMenuItemSvelteRaw from "$lib/components/ai-elements/prompt-input/action-menu/action-menu-item.svelte?raw";
import ActionMenuActionMenuTriggerSvelteRaw from "$lib/components/ai-elements/prompt-input/action-menu/action-menu-trigger.svelte?raw";
import ActionMenuActionMenuSvelteRaw from "$lib/components/ai-elements/prompt-input/action-menu/action-menu.svelte?raw";
import AttachmentsAttachmentImagePreviewSvelteRaw from "$lib/components/ai-elements/prompt-input/attachments/attachment-image-preview.svelte?raw";
import AttachmentsAttachmentSvelteRaw from "$lib/components/ai-elements/prompt-input/attachments/attachment.svelte?raw";
import AttachmentsAttachmentsSvelteRaw from "$lib/components/ai-elements/prompt-input/attachments/attachments.svelte?raw";
import ContextAttachmentsSvelteTsRaw from "$lib/components/ai-elements/prompt-input/context/attachments.svelte.ts?raw";
import ContextProviderSvelteTsRaw from "$lib/components/ai-elements/prompt-input/context/provider.svelte.ts?raw";
import ContextTextRegistrationSvelteTsRaw from "$lib/components/ai-elements/prompt-input/context/text-registration.svelte.ts?raw";
import ContextTypesTsRaw from "$lib/components/ai-elements/prompt-input/context/types.ts?raw";
import ControlsButtonSvelteRaw from "$lib/components/ai-elements/prompt-input/controls/button.svelte?raw";
import ControlsSubmitSvelteRaw from "$lib/components/ai-elements/prompt-input/controls/submit.svelte?raw";
import ControlsTextareaSvelteRaw from "$lib/components/ai-elements/prompt-input/controls/textarea.svelte?raw";
import CoreProviderSvelteRaw from "$lib/components/ai-elements/prompt-input/core/provider.svelte?raw";
import CoreRootSvelteRaw from "$lib/components/ai-elements/prompt-input/core/root.svelte?raw";
import GuideMdRaw from "$lib/components/ai-elements/prompt-input/guide.md?raw";
import IndexTsRaw from "$lib/components/ai-elements/prompt-input/index.ts?raw";
import LayoutBodySvelteRaw from "$lib/components/ai-elements/prompt-input/layout/body.svelte?raw";
import LayoutHeaderSvelteRaw from "$lib/components/ai-elements/prompt-input/layout/header.svelte?raw";
import LayoutToolbarSvelteRaw from "$lib/components/ai-elements/prompt-input/layout/toolbar.svelte?raw";
import LayoutToolsSvelteRaw from "$lib/components/ai-elements/prompt-input/layout/tools.svelte?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import type { Example } from "$lib/types/example";
import ActionMenuExample from "./examples/action-menu-example.svelte";
import FileAttachmentExample from "./examples/file-attachment-example.svelte";
import Usage from "./examples/usage.svelte";
import ActionMenuExampleRaw from "./examples/action-menu-example.svelte?raw";
import FileAttachmentExampleRaw from "./examples/file-attachment-example.svelte?raw";
import UsageRaw from "./examples/usage.svelte?raw";
import ProviderExample from "./examples/provider-example/provider-example.svelte";
import ProviderExampleRaw from "./examples/provider-example/provider-example.svelte?raw";
import SelectModeExample from "./examples/select-mode-example.svelte";
import SelectModelExampleRaw from "./examples/select-mode-example.svelte?raw";

// Import All Provider Example Files with ?raw for code display in docs
import DraftActionsRaw from "./examples/provider-example/draft-actions.svelte?raw";
import DraftInputRaw from "./examples/provider-example/draft-input.svelte?raw";
import DraftSummaryRaw from "./examples/provider-example/draft-summary.svelte?raw";

export const meta: ComponentMeta = {
	id: "prompt-input",
	title: "Prompt Input",
	description:
		"The Prompt Input component allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Prompt Input",
	description:
		"The Prompt Input component allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
	keywords: ["Svelte", "Prompt Input", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "action-menu/action-add-attachments.svelte",
			code: ActionMenuActionAddAttachmentsSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{
			name: "action-menu/action-menu-content.svelte",
			code: ActionMenuActionMenuContentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "action-menu/action-menu-item.svelte",
			code: ActionMenuActionMenuItemSvelteRaw,
			lang: "svelte",
		},
		{
			name: "action-menu/action-menu-trigger.svelte",
			code: ActionMenuActionMenuTriggerSvelteRaw,
			lang: "svelte",
		},
		{
			name: "action-menu/action-menu.svelte",
			code: ActionMenuActionMenuSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/attachment-image-preview.svelte",
			code: AttachmentsAttachmentImagePreviewSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/attachment.svelte",
			code: AttachmentsAttachmentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "attachments/attachments.svelte",
			code: AttachmentsAttachmentsSvelteRaw,
			lang: "svelte",
		},
		{
			name: "context/attachments.svelte.ts",
			code: ContextAttachmentsSvelteTsRaw,
			lang: "typescript",
		},
		{
			name: "context/provider.svelte.ts",
			code: ContextProviderSvelteTsRaw,
			lang: "typescript",
		},
		{
			name: "context/text-registration.svelte.ts",
			code: ContextTextRegistrationSvelteTsRaw,
			lang: "typescript",
		},
		{ name: "context/types.ts", code: ContextTypesTsRaw, lang: "typescript" },
		{ name: "controls/button.svelte", code: ControlsButtonSvelteRaw, lang: "svelte" },
		{ name: "controls/submit.svelte", code: ControlsSubmitSvelteRaw, lang: "svelte" },
		{ name: "controls/textarea.svelte", code: ControlsTextareaSvelteRaw, lang: "svelte" },
		{ name: "core/provider.svelte", code: CoreProviderSvelteRaw, lang: "svelte" },
		{ name: "core/root.svelte", code: CoreRootSvelteRaw, lang: "svelte" },
		{ name: "guide.md", code: GuideMdRaw, lang: "markdown" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
		{ name: "layout/body.svelte", code: LayoutBodySvelteRaw, lang: "svelte" },
		{ name: "layout/header.svelte", code: LayoutHeaderSvelteRaw, lang: "svelte" },
		{ name: "layout/toolbar.svelte", code: LayoutToolbarSvelteRaw, lang: "svelte" },
		{ name: "layout/tools.svelte", code: LayoutToolsSvelteRaw, lang: "svelte" },
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── prompt-input/
				├── action-menu/
				│   ├── action-add-attachments.svelte
				│   ├── action-menu-content.svelte
				│   ├── action-menu-item.svelte
				│   ├── action-menu-trigger.svelte
				│   └── action-menu.svelte
				├── attachments/
				│   ├── attachment-image-preview.svelte
				│   ├── attachment.svelte
				│   └── attachments.svelte
				├── context/
				│   ├── attachments.svelte.ts
				│   ├── provider.svelte.ts
				│   ├── text-registration.svelte.ts
				│   └── types.ts
				├── controls/
				│   ├── button.svelte
				│   ├── submit.svelte
				│   └── textarea.svelte
				├── core/
				│   ├── provider.svelte
				│   └── root.svelte
				├── layout/
				│   ├── body.svelte
				│   ├── header.svelte
				│   ├── toolbar.svelte
				│   └── tools.svelte
				├── guide.md
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

// Simple Chat API
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

let modelSelectAPIRaw = `import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const { messages, model }: { messages: UIMessage[]; model?: string } = await request.json();

	let result = streamText({
		model: openrouter(model || defaultModel),
		messages: await convertToModelMessages(messages),
		system: "Response should be short and concise.",
	});

	return result.toUIMessageStreamResponse();
};
`;

let examples: Example[] = [
	{
		name: "Action Menu Example",
		preview: ActionMenuExample,
		code: {
			name: "action-menu-example.svelte",
			code: ActionMenuExampleRaw,
			lang: "svelte",
		},
	},
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
		name: "Usage with AI SDK",
		preview: Usage,
		code: [
			{
				name: "ai-config.ts",
				code: aiConfigRaw,
				lang: "typescript",
			},
			{
				name: "api/chat/+server.ts",
				code: serverTsRaw,
				lang: "typescript",
			},
			{
				name: "usage.svelte",
				code: UsageRaw,
				lang: "svelte",
			},
		],
	},
	{
		name: "Model Selecttion + AI SDK Integration Example",
		preview: SelectModeExample,
		code: [
			{
				name: "api/select-model/+server.ts",
				code: modelSelectAPIRaw,
				lang: "typescript",
			},
			{
				name: "model-select-example.svelte",
				code: SelectModelExampleRaw,
				lang: "svelte",
			},
			{
				name: "ai-config.ts",
				code: aiConfigRaw,
				lang: "typescript",
			},
		],
	},
	{
		name: "Prompt Input Provider Example",
		preview: ProviderExample,
		code: [
			{
				name: "provider-example.svelte",
				code: ProviderExampleRaw,
				lang: "svelte",
			},
			{
				name: "draft-actions.svelte",
				code: DraftActionsRaw,
				lang: "svelte",
			},
			{
				name: "draft-input.svelte",
				code: DraftInputRaw,
				lang: "svelte",
			},
			{
				name: "draft-summary.svelte",
				code: DraftSummaryRaw,
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
	},
	examples,
	install_block,
	seo,
	props: [],
};
