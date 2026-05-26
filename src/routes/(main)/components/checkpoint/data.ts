import CheckpointIconSvelteRaw from "$lib/components/ai-elements/checkpoint/checkpoint-icon.svelte?raw";
import CheckpointTriggerSvelteRaw from "$lib/components/ai-elements/checkpoint/checkpoint-trigger.svelte?raw";
import CheckpointSvelteRaw from "$lib/components/ai-elements/checkpoint/checkpoint.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/checkpoint/index.ts?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { Example } from "$lib/types/example";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import DemoExample from "./examples/demo-example.svelte";
import DemoExampleRaw from "./examples/demo-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "checkpoint",
	title: "Checkpoint",
	description:
		"A simple component for marking conversation history points and restoring the chat to a previous state.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Checkpoint",
	description:
		"A simple component for marking conversation history points and restoring the chat to a previous state.",
	keywords: ["Svelte", "Checkpoint", "Component"],
};


const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "checkpoint-icon.svelte",
			code: CheckpointIconSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{ name: "checkpoint-trigger.svelte", code: CheckpointTriggerSvelteRaw, lang: "svelte" },
		{ name: "checkpoint.svelte", code: CheckpointSvelteRaw, lang: "svelte" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
	],
	folder_structure: `src/
└── lib/
    └── components/
        └── ai-elements/
            └── checkpoint/
                ├── checkpoint-icon.svelte
                ├── checkpoint-trigger.svelte
                ├── checkpoint.svelte
                └── index.ts`,
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
		preview_class:'min-h-100 items-start pt-15',
	},
	install_block,
	seo,
	props: [],
};
