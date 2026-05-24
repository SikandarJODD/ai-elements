import IndexTsRaw from "$lib/components/ai-elements/task/index.ts?raw";
import TaskContentSvelteRaw from "$lib/components/ai-elements/task/task-content.svelte?raw";
import TaskItemFileSvelteRaw from "$lib/components/ai-elements/task/task-item-file.svelte?raw";
import TaskItemSvelteRaw from "$lib/components/ai-elements/task/task-item.svelte?raw";
import TaskTriggerSvelteRaw from "$lib/components/ai-elements/task/task-trigger.svelte?raw";
import TaskSvelteRaw from "$lib/components/ai-elements/task/task.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "task",
	title: "Task",
	description: "The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Task",
	description: "The Task component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking.",
	keywords: ["Svelte", "Task", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "task-content.svelte", code: TaskContentSvelteRaw, lang: "svelte", },
		{ name: "task-item-file.svelte", code: TaskItemFileSvelteRaw, lang: "svelte", },
		{ name: "task-item.svelte", code: TaskItemSvelteRaw, lang: "svelte", },
		{ name: "task-trigger.svelte", code: TaskTriggerSvelteRaw, lang: "svelte", },
		{ name: "task.svelte", code: TaskSvelteRaw, lang: "svelte", }
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
