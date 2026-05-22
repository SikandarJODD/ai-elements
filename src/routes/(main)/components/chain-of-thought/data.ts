import ChainOfThoughtContentSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-content.svelte?raw";
import ChainOfThoughtContextSvelteTsRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-context.svelte.ts?raw";
import ChainOfThoughtHeaderSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-header.svelte?raw";
import ChainOfThoughtImageSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-image.svelte?raw";
import ChainOfThoughtSearchResultSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-search-result.svelte?raw";
import ChainOfThoughtSearchResultsSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-search-results.svelte?raw";
import ChainOfThoughtStepSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought-step.svelte?raw";
import ChainOfThoughtSvelteRaw from "$lib/components/ai-elements/chain-of-thought/chain-of-thought.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/chain-of-thought/index.ts?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { Example } from "$lib/types/example";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import DemoExample from "./examples/demo-example.svelte";
import DemoExampleRaw from "./examples/demo-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "chain-of-thought",
	title: "Chain Of Thought",
	description: "TODO: Chain Of Thought.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Chain Of Thought",
	description: "TODO: Chain Of Thought.",
	keywords: ["Svelte", "Chain Of Thought", "Component"],
};

const examples: Example[] = [
	{
		name: "Demo",
		preview: DemoExample,
		code: {
			name: "demo-example.svelte",
			code: DemoExampleRaw,
			lang: "svelte",
		},
	},
];

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "chain-of-thought-content.svelte", code: ChainOfThoughtContentSvelteRaw, lang: "svelte", isExpand: true, },
		{ name: "chain-of-thought-context.svelte.ts", code: ChainOfThoughtContextSvelteTsRaw, lang: "typescript", },
		{ name: "chain-of-thought-header.svelte", code: ChainOfThoughtHeaderSvelteRaw, lang: "svelte", },
		{ name: "chain-of-thought-image.svelte", code: ChainOfThoughtImageSvelteRaw, lang: "svelte", },
		{ name: "chain-of-thought-search-result.svelte", code: ChainOfThoughtSearchResultSvelteRaw, lang: "svelte", },
		{ name: "chain-of-thought-search-results.svelte", code: ChainOfThoughtSearchResultsSvelteRaw, lang: "svelte", },
		{ name: "chain-of-thought-step.svelte", code: ChainOfThoughtStepSvelteRaw, lang: "svelte", },
		{ name: "chain-of-thought.svelte", code: ChainOfThoughtSvelteRaw, lang: "svelte", },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", }
	],
	folder_structure: "src/\n`-- lib/\n    `-- components/\n        `-- ai-elements/\n            `-- chain-of-thought/\n                |-- chain-of-thought-content.svelte\n                |-- chain-of-thought-context.svelte.ts\n                |-- chain-of-thought-header.svelte\n                |-- chain-of-thought-image.svelte\n                |-- chain-of-thought-search-result.svelte\n                |-- chain-of-thought-search-results.svelte\n                |-- chain-of-thought-step.svelte\n                |-- chain-of-thought.svelte\n                `-- index.ts",
};

export const data: ComponentDoc = {
	...meta,
	preview: Preview,
	preview_code: {
		name: "preview.svelte",
		code: PreviewCode,
		lang: "svelte",
		hideLines: true,
	},
	install_block,
	examples,
	seo,
	props: [],
};
