import IndexTsRaw from "$lib/components/ai-elements/queue/index.ts?raw";
import QueueItemActionSvelteRaw from "$lib/components/ai-elements/queue/queue-item-action.svelte?raw";
import QueueItemActionsSvelteRaw from "$lib/components/ai-elements/queue/queue-item-actions.svelte?raw";
import QueueItemAttachmentSvelteRaw from "$lib/components/ai-elements/queue/queue-item-attachment.svelte?raw";
import QueueItemContentSvelteRaw from "$lib/components/ai-elements/queue/queue-item-content.svelte?raw";
import QueueItemDescriptionSvelteRaw from "$lib/components/ai-elements/queue/queue-item-description.svelte?raw";
import QueueItemFileSvelteRaw from "$lib/components/ai-elements/queue/queue-item-file.svelte?raw";
import QueueItemImageSvelteRaw from "$lib/components/ai-elements/queue/queue-item-image.svelte?raw";
import QueueItemIndicatorSvelteRaw from "$lib/components/ai-elements/queue/queue-item-indicator.svelte?raw";
import QueueItemSvelteRaw from "$lib/components/ai-elements/queue/queue-item.svelte?raw";
import QueueListSvelteRaw from "$lib/components/ai-elements/queue/queue-list.svelte?raw";
import QueueSectionContentSvelteRaw from "$lib/components/ai-elements/queue/queue-section-content.svelte?raw";
import QueueSectionLabelSvelteRaw from "$lib/components/ai-elements/queue/queue-section-label.svelte?raw";
import QueueSectionTriggerSvelteRaw from "$lib/components/ai-elements/queue/queue-section-trigger.svelte?raw";
import QueueSectionSvelteRaw from "$lib/components/ai-elements/queue/queue-section.svelte?raw";
import QueueSvelteRaw from "$lib/components/ai-elements/queue/queue.svelte?raw";
import TypesTsRaw from "$lib/components/ai-elements/queue/types.ts?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "queue",
	title: "Queue",
	description: "A comprehensive queue component system for displaying message lists, todos, and collapsible task sections in AI applications.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Queue",
	description: "A comprehensive queue component system for displaying message lists, todos, and collapsible task sections in AI applications.",
	keywords: ["Svelte", "Queue", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "queue-item-action.svelte", code: QueueItemActionSvelteRaw, lang: "svelte", },
		{ name: "queue-item-actions.svelte", code: QueueItemActionsSvelteRaw, lang: "svelte", },
		{ name: "queue-item-attachment.svelte", code: QueueItemAttachmentSvelteRaw, lang: "svelte", },
		{ name: "queue-item-content.svelte", code: QueueItemContentSvelteRaw, lang: "svelte", },
		{ name: "queue-item-description.svelte", code: QueueItemDescriptionSvelteRaw, lang: "svelte", },
		{ name: "queue-item-file.svelte", code: QueueItemFileSvelteRaw, lang: "svelte", },
		{ name: "queue-item-image.svelte", code: QueueItemImageSvelteRaw, lang: "svelte", },
		{ name: "queue-item-indicator.svelte", code: QueueItemIndicatorSvelteRaw, lang: "svelte", },
		{ name: "queue-item.svelte", code: QueueItemSvelteRaw, lang: "svelte", },
		{ name: "queue-list.svelte", code: QueueListSvelteRaw, lang: "svelte", },
		{ name: "queue-section-content.svelte", code: QueueSectionContentSvelteRaw, lang: "svelte", },
		{ name: "queue-section-label.svelte", code: QueueSectionLabelSvelteRaw, lang: "svelte", },
		{ name: "queue-section-trigger.svelte", code: QueueSectionTriggerSvelteRaw, lang: "svelte", },
		{ name: "queue-section.svelte", code: QueueSectionSvelteRaw, lang: "svelte", },
		{ name: "queue.svelte", code: QueueSvelteRaw, lang: "svelte", },
		{ name: "types.ts", code: TypesTsRaw, lang: "typescript", }
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
