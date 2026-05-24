import IndexTsRaw from "$lib/components/ai-elements/plan/index.ts?raw";
import PlanActionSvelteRaw from "$lib/components/ai-elements/plan/plan-action.svelte?raw";
import PlanContentSvelteRaw from "$lib/components/ai-elements/plan/plan-content.svelte?raw";
import PlanContextSvelteTsRaw from "$lib/components/ai-elements/plan/plan-context.svelte.ts?raw";
import PlanDescriptionSvelteRaw from "$lib/components/ai-elements/plan/plan-description.svelte?raw";
import PlanFooterSvelteRaw from "$lib/components/ai-elements/plan/plan-footer.svelte?raw";
import PlanHeaderSvelteRaw from "$lib/components/ai-elements/plan/plan-header.svelte?raw";
import PlanTitleSvelteRaw from "$lib/components/ai-elements/plan/plan-title.svelte?raw";
import PlanTriggerSvelteRaw from "$lib/components/ai-elements/plan/plan-trigger.svelte?raw";
import PlanSvelteRaw from "$lib/components/ai-elements/plan/plan.svelte?raw";
import TypesTsRaw from "$lib/components/ai-elements/plan/types.ts?raw";

import type {
	ComponentDoc,
	ComponentMeta,
	InstallComponentDocs,
} from "$lib/types/structure";
import type { SEO } from "$lib/types/seo";
import Preview from "./examples/preview.svelte";
import PreviewCode from "./examples/preview.svelte?raw";

export const meta: ComponentMeta = {
	id: "plan",
	title: "Plan",
	description: "A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
	category: "ai-elements",
};

const seo: SEO = {
	title: "Plan",
	description: "A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
	keywords: ["Svelte", "Plan", "Component"],
};

const install_block: InstallComponentDocs = {
	packages: [],
	install_code: [
		{ name: "index.ts", code: IndexTsRaw, lang: "typescript", isExpand: true, },
		{ name: "plan-action.svelte", code: PlanActionSvelteRaw, lang: "svelte", },
		{ name: "plan-content.svelte", code: PlanContentSvelteRaw, lang: "svelte", },
		{ name: "plan-context.svelte.ts", code: PlanContextSvelteTsRaw, lang: "typescript", },
		{ name: "plan-description.svelte", code: PlanDescriptionSvelteRaw, lang: "svelte", },
		{ name: "plan-footer.svelte", code: PlanFooterSvelteRaw, lang: "svelte", },
		{ name: "plan-header.svelte", code: PlanHeaderSvelteRaw, lang: "svelte", },
		{ name: "plan-title.svelte", code: PlanTitleSvelteRaw, lang: "svelte", },
		{ name: "plan-trigger.svelte", code: PlanTriggerSvelteRaw, lang: "svelte", },
		{ name: "plan.svelte", code: PlanSvelteRaw, lang: "svelte", },
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
