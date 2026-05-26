import IndexTsRaw from "$lib/components/ai-elements/reasoning/index.ts?raw";
import ReasoningContentSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning-content.svelte?raw";
import ReasoningContextSvelteTsRaw from "$lib/components/ai-elements/reasoning/reasoning-context.svelte.ts?raw";
import ReasoningTriggerSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning-trigger.svelte?raw";
import ReasoningSvelteRaw from "$lib/components/ai-elements/reasoning/reasoning.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "reasoning",
	title: "Reasoning",
	description: "The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Reasoning",
	description: "The Reasoning component displays AI reasoning content, automatically opening during streaming and closing when finished.",
	keywords: ["Svelte", "Reasoning", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "reasoning-content.svelte", code: ReasoningContentSvelteRaw, lang: "svelte", },
		{ name: "reasoning-context.svelte.ts", code: ReasoningContextSvelteTsRaw, lang: "typescript", },
		{ name: "reasoning-trigger.svelte", code: ReasoningTriggerSvelteRaw, lang: "svelte", },
		{ name: "reasoning.svelte", code: ReasoningSvelteRaw, lang: "svelte", },
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── reasoning/
				├── index.ts
				├── reasoning-content.svelte
				├── reasoning-context.svelte.ts
				├── reasoning-trigger.svelte
				└── reasoning.svelte`,
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
