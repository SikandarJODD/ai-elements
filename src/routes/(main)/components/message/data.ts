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

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "message",
	title: "Message",
	description: "Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Message",
	description: "Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.",
	keywords: ["Svelte", "Message", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "actions/message-action.svelte", code: ActionsMessageActionSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "actions/message-actions.svelte", code: ActionsMessageActionsSvelteRaw, lang: "svelte", },
		{ name: "actions/message-toolbar.svelte", code: ActionsMessageToolbarSvelteRaw, lang: "svelte", },
		{ name: "attachments/message-attachment-preview.svelte", code: AttachmentsMessageAttachmentPreviewSvelteRaw, lang: "svelte", },
		{ name: "attachments/message-attachment.svelte", code: AttachmentsMessageAttachmentSvelteRaw, lang: "svelte", },
		{ name: "attachments/message-attachments.svelte", code: AttachmentsMessageAttachmentsSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch-content.svelte", code: BranchingMessageBranchContentSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch-next.svelte", code: BranchingMessageBranchNextSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch-page.svelte", code: BranchingMessageBranchPageSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch-previous.svelte", code: BranchingMessageBranchPreviousSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch-selector.svelte", code: BranchingMessageBranchSelectorSvelteRaw, lang: "svelte", },
		{ name: "branching/message-branch.svelte", code: BranchingMessageBranchSvelteRaw, lang: "svelte", },
		{ name: "context/message-context.svelte.ts", code: ContextMessageContextSvelteTsRaw, lang: "typescript", },
		{ name: "core/message-content.svelte", code: CoreMessageContentSvelteRaw, lang: "svelte", },
		{ name: "core/message.svelte", code: CoreMessageSvelteRaw, lang: "svelte", },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", },
		{ name: "response/message-response.svelte", code: ResponseMessageResponseSvelteRaw, lang: "svelte", }
	],
	folder_structure: "",
};

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

	install_block,
	seo,
	props: [],
};
