import type { CookbookPlaygroundPageData } from "$lib/components/code-preview";
import { createBlockCodeTree } from "$lib/components/code-preview";

import GenerateTextDemo from "../../cookbook/generate-text/demo/demo.svelte";
import generateTextPageRaw from "../../cookbook/generate-text/+page.svelte?raw";
import generateTextDemoRaw from "../../cookbook/generate-text/demo/demo.svelte?raw";
import generateTextDocsRaw from "../../cookbook/generate-text/docs.md?raw";
import generateTextServerRaw from "../../api/cookbook/generate-text/+server.ts?raw";
import aiConfigRaw from "../../../lib/config/ai-config.ts?raw";

export const pageData: CookbookPlaygroundPageData = {
	id: "generate-text",
	slug: "generate-text",
	title: "Generate Text",
	description:
		"Explore the live generate-text demo, the server endpoint behind it, and the supporting configuration in a single playground layout.",
	tags: ["text", "generation", "basics"],
	previewMode: "inline",
	previewTitle: "Live Preview",
	previewDescription: "This is the current generate-text demo mounted inline inside the playground shell.",
	previewComponent: GenerateTextDemo,
	previewHeight: 520,
	codeTree: createBlockCodeTree("generate-text-demo", [
		{
			id: "generate-text-demo",
			path: "src/routes/cookbook/generate-text/demo/demo.svelte",
			code: generateTextDemoRaw,
			lang: "svelte",
		},
		{
			id: "generate-text-server",
			path: "src/routes/api/cookbook/generate-text/+server.ts",
			code: generateTextServerRaw,
			lang: "typescript",
		},
		{
			id: "ai-config",
			path: "src/lib/config/ai-config.ts",
			code: aiConfigRaw,
			lang: "typescript",
		},
		{
			id: "generate-text-page",
			path: "src/routes/cookbook/generate-text/+page.svelte",
			code: generateTextPageRaw,
			lang: "svelte",
		},
		{
			id: "generate-text-docs",
			path: "src/routes/cookbook/generate-text/docs.md",
			code: generateTextDocsRaw,
			lang: "markdown",
		},
		{
			id: "generate-text-docs-link",
			path: "references/vercel-ai-sdk-generate-text",
			externalUrl: "https://sdk.vercel.ai/docs/ai-sdk-core/generating-text",
			externalLabel: "AI SDK generateText docs",
		},
	]),
};
