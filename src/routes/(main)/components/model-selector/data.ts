import IndexTsRaw from "$lib/components/ai-elements/model-selector/index.ts?raw";
import ModelSelectorContentSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-content.svelte?raw";
import ModelSelectorDialogSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-dialog.svelte?raw";
import ModelSelectorEmptySvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-empty.svelte?raw";
import ModelSelectorGroupSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-group.svelte?raw";
import ModelSelectorInputSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-input.svelte?raw";
import ModelSelectorItemSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-item.svelte?raw";
import ModelSelectorListSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-list.svelte?raw";
import ModelSelectorLogoGroupSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-logo-group.svelte?raw";
import ModelSelectorLogoSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-logo.svelte?raw";
import ModelSelectorNameSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-name.svelte?raw";
import ModelSelectorSeparatorSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-separator.svelte?raw";
import ModelSelectorShortcutSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-shortcut.svelte?raw";
import ModelSelectorTriggerSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector-trigger.svelte?raw";
import ModelSelectorSvelteRaw from "$lib/components/ai-elements/model-selector/model-selector.svelte?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "model-selector",
	title: "Model Selector",
	description: "A searchable command palette for selecting AI models in your chat interface.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Model Selector",
	description: "A searchable command palette for selecting AI models in your chat interface.",
	keywords: ["Svelte", "Model Selector", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true },
		{
			name: "model-selector-content.svelte",
			code: ModelSelectorContentSvelteRaw,
			lang: "svelte",
		},
		{
			name: "model-selector-dialog.svelte",
			code: ModelSelectorDialogSvelteRaw,
			lang: "svelte",
		},
		{ name: "model-selector-empty.svelte", code: ModelSelectorEmptySvelteRaw, lang: "svelte" },
		{ name: "model-selector-group.svelte", code: ModelSelectorGroupSvelteRaw, lang: "svelte" },
		{ name: "model-selector-input.svelte", code: ModelSelectorInputSvelteRaw, lang: "svelte" },
		{ name: "model-selector-item.svelte", code: ModelSelectorItemSvelteRaw, lang: "svelte" },
		{ name: "model-selector-list.svelte", code: ModelSelectorListSvelteRaw, lang: "svelte" },
		{
			name: "model-selector-logo-group.svelte",
			code: ModelSelectorLogoGroupSvelteRaw,
			lang: "svelte",
		},
		{ name: "model-selector-logo.svelte", code: ModelSelectorLogoSvelteRaw, lang: "svelte" },
		{ name: "model-selector-name.svelte", code: ModelSelectorNameSvelteRaw, lang: "svelte" },
		{
			name: "model-selector-separator.svelte",
			code: ModelSelectorSeparatorSvelteRaw,
			lang: "svelte",
		},
		{
			name: "model-selector-shortcut.svelte",
			code: ModelSelectorShortcutSvelteRaw,
			lang: "svelte",
		},
		{
			name: "model-selector-trigger.svelte",
			code: ModelSelectorTriggerSvelteRaw,
			lang: "svelte",
		},
		{ name: "model-selector.svelte", code: ModelSelectorSvelteRaw, lang: "svelte" },
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── model-selector/
				├── index.ts
				├── model-selector-content.svelte
				├── model-selector-dialog.svelte
				├── model-selector-empty.svelte
				├── model-selector-group.svelte
				├── model-selector-input.svelte
				├── model-selector-item.svelte
				├── model-selector-list.svelte
				├── model-selector-logo-group.svelte
				├── model-selector-logo.svelte
				├── model-selector-name.svelte
				├── model-selector-separator.svelte
				├── model-selector-shortcut.svelte
				├── model-selector-trigger.svelte
				└── model-selector.svelte`,
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
