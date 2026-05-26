import IndexTsRaw from "$lib/components/ai-elements/tool/index.ts?raw";
import ToolContentSvelteRaw from "$lib/components/ai-elements/tool/tool-content.svelte?raw";
import ToolContextSvelteTsRaw from "$lib/components/ai-elements/tool/tool-context.svelte.ts?raw";
import ToolHeaderSvelteRaw from "$lib/components/ai-elements/tool/tool-header.svelte?raw";
import ToolInputSvelteRaw from "$lib/components/ai-elements/tool/tool-input.svelte?raw";
import ToolOutputSvelteRaw from "$lib/components/ai-elements/tool/tool-output.svelte?raw";
import ToolSvelteRaw from "$lib/components/ai-elements/tool/tool.svelte?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "tool",
	title: "Tool",
	description: "The Tool component displays a collapsible interface for showing and hiding tool details from AI SDK tool parts.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Tool",
	description: "The Tool component displays a collapsible interface for showing and hiding tool details from AI SDK tool parts.",
	keywords: ["Svelte", "Tool", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "tool-content.svelte", code: ToolContentSvelteRaw, lang: "svelte", },
		{ name: "tool-context.svelte.ts", code: ToolContextSvelteTsRaw, lang: "typescript", },
		{ name: "tool-header.svelte", code: ToolHeaderSvelteRaw, lang: "svelte", },
		{ name: "tool-input.svelte", code: ToolInputSvelteRaw, lang: "svelte", },
		{ name: "tool-output.svelte", code: ToolOutputSvelteRaw, lang: "svelte", },
		{ name: "tool.svelte", code: ToolSvelteRaw, lang: "svelte", }
	],
	folder_structure: `src/
└── lib/
	└── components/
		└── ai-elements/
			└── tool/
				├── index.ts
				├── tool-content.svelte
				├── tool-context.svelte.ts
				├── tool-header.svelte
				├── tool-input.svelte
				├── tool-output.svelte
				└── tool.svelte`,
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
