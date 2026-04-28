import type { CookbookPlaygroundPageData } from "$lib/components/code-preview";
import { createBlockCodeTree } from "$lib/components/code-preview";

import basicSetupGuideRaw from "../../(main)/guides/basic-setup/+page.svelte?raw";

const envLocalRaw = `OPENROUTER_API_KEY=sk-or-v1-your-api-key-here`;

const configRaw = `import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const ai = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY
});
export let defaultModel = "z-ai/glm-4.5-air:free";
`;
export const pageData: CookbookPlaygroundPageData = {
	id: "basic-setup",
	slug: "basic-setup",
	title: "Basic Setup",
	description:
		"Set up your project, environment variables, OpenRouter config, and shared AI SDK plumbing before moving into interactive cookbook recipes.",
	tags: ["setup", "openrouter", "sveltekit"],
	previewMode: "empty",
	previewTitle: "Preview",
	previewDescription:
		"No live preview for setup-only recipes. Use the file tree and code panes as the source of truth.",
	codeTree: createBlockCodeTree("env-local", [
		{
			id: "env-local",
			path: ".env.local",
			code: envLocalRaw,
			lang: "bash",
		},
		{
			id: "ai-config",
			path: "src/lib/config/ai.ts",
			code: configRaw,
			lang: "typescript",
		},
		{
			id: "basic-setup-guide",
			path: "src/routes/+page.svelte",
			code: basicSetupGuideRaw,
			lang: "svelte",
		},
		{
			id: "openrouter-keys-docs",
			path: "references/openrouter-keys",
			externalUrl: "https://openrouter.ai/keys",
			externalLabel: "OpenRouter keys",
		},
		{
			id: "ai-sdk-svelte-docs",
			path: "references/ai-sdk-svelte",
			externalUrl: "https://sdk.vercel.ai/docs/getting-started/svelte",
			externalLabel: "AI SDK for Svelte docs",
		},
	]),
};
