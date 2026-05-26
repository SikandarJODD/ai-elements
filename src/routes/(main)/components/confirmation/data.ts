import ConfirmationAcceptedSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-accepted.svelte?raw";
import ConfirmationActionSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-action.svelte?raw";
import ConfirmationActionsSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-actions.svelte?raw";
import ConfirmationContextSvelteTsRaw from "$lib/components/ai-elements/confirmation/confirmation-context.svelte.ts?raw";
import ConfirmationRejectedSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-rejected.svelte?raw";
import ConfirmationRequestSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-request.svelte?raw";
import ConfirmationTitleSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation-title.svelte?raw";
import ConfirmationSvelteRaw from "$lib/components/ai-elements/confirmation/confirmation.svelte?raw";
import IndexTsRaw from "$lib/components/ai-elements/confirmation/index.ts?raw";

import type { ComponentDoc, ComponentMeta, InstallComponentDocs } from "$lib/types/structure";
import type { Example } from "$lib/types/example";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";
import DemoExample from "./examples/demo-example.svelte";
import DemoExampleRaw from "./examples/demo-example.svelte?raw";

export const meta: ComponentMeta = {
	id: "confirmation",
	title: "Confirmation",
	description:
		"An alert-based component for managing tool execution approval workflows with request, accept, and reject states.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Confirmation",
	description:
		"An alert-based component for managing tool execution approval workflows with request, accept, and reject states.",
	keywords: ["Svelte", "Confirmation", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{
			name: "confirmation-accepted.svelte",
			code: ConfirmationAcceptedSvelteRaw,
			lang: "svelte",
			isExpand: true,
		},
		{ name: "confirmation-action.svelte", code: ConfirmationActionSvelteRaw, lang: "svelte" },
		{ name: "confirmation-actions.svelte", code: ConfirmationActionsSvelteRaw, lang: "svelte" },
		{
			name: "confirmation-context.svelte.ts",
			code: ConfirmationContextSvelteTsRaw,
			lang: "typescript",
		},
		{
			name: "confirmation-rejected.svelte",
			code: ConfirmationRejectedSvelteRaw,
			lang: "svelte",
		},
		{ name: "confirmation-request.svelte", code: ConfirmationRequestSvelteRaw, lang: "svelte" },
		{ name: "confirmation-title.svelte", code: ConfirmationTitleSvelteRaw, lang: "svelte" },
		{ name: "confirmation.svelte", code: ConfirmationSvelteRaw, lang: "svelte" },
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript" },
	],
	folder_structure: `src/
└── lib/
    └── components/
        └── ai-elements/
            └── confirmation/
                ├── confirmation-accepted.svelte
                ├── confirmation-action.svelte
                ├── confirmation-actions.svelte
                ├── confirmation-context.svelte.ts
                ├── confirmation-rejected.svelte
                ├── confirmation-request.svelte
                ├── confirmation-title.svelte
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
	},
	install_block,
	seo,
	props: [],
};
