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

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "prompt-input",
	title: "Prompt Input",
	description: "TODO: Prompt Input.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Prompt Input",
	description: "TODO: Prompt Input.",
	keywords: ["Svelte", "Prompt Input", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "action-menu/action-add-attachments.svelte", code: ActionMenuActionAddAttachmentsSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "action-menu/action-menu-content.svelte", code: ActionMenuActionMenuContentSvelteRaw, lang: "svelte", },
		{ name: "action-menu/action-menu-item.svelte", code: ActionMenuActionMenuItemSvelteRaw, lang: "svelte", },
		{ name: "action-menu/action-menu-trigger.svelte", code: ActionMenuActionMenuTriggerSvelteRaw, lang: "svelte", },
		{ name: "action-menu/action-menu.svelte", code: ActionMenuActionMenuSvelteRaw, lang: "svelte", },
		{ name: "attachments/attachment-image-preview.svelte", code: AttachmentsAttachmentImagePreviewSvelteRaw, lang: "svelte", },
		{ name: "attachments/attachment.svelte", code: AttachmentsAttachmentSvelteRaw, lang: "svelte", },
		{ name: "attachments/attachments.svelte", code: AttachmentsAttachmentsSvelteRaw, lang: "svelte", },
		{ name: "context/attachments.svelte.ts", code: ContextAttachmentsSvelteTsRaw, lang: "typescript", },
		{ name: "context/provider.svelte.ts", code: ContextProviderSvelteTsRaw, lang: "typescript", },
		{ name: "context/text-registration.svelte.ts", code: ContextTextRegistrationSvelteTsRaw, lang: "typescript", },
		{ name: "context/types.ts", code: ContextTypesTsRaw, lang: "typescript", },
		{ name: "controls/button.svelte", code: ControlsButtonSvelteRaw, lang: "svelte", },
		{ name: "controls/submit.svelte", code: ControlsSubmitSvelteRaw, lang: "svelte", },
		{ name: "controls/textarea.svelte", code: ControlsTextareaSvelteRaw, lang: "svelte", },
		{ name: "core/provider.svelte", code: CoreProviderSvelteRaw, lang: "svelte", },
		{ name: "core/root.svelte", code: CoreRootSvelteRaw, lang: "svelte", },
		{ name: "guide.md", code: GuideMdRaw, lang: "markdown", },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", },
		{ name: "layout/body.svelte", code: LayoutBodySvelteRaw, lang: "svelte", },
		{ name: "layout/header.svelte", code: LayoutHeaderSvelteRaw, lang: "svelte", },
		{ name: "layout/toolbar.svelte", code: LayoutToolbarSvelteRaw, lang: "svelte", },
		{ name: "layout/tools.svelte", code: LayoutToolsSvelteRaw, lang: "svelte", }
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
	},
	install_block,
	seo,
	props: [],
};
