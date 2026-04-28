import type { CookbookPlaygroundPageData } from "$lib/components/code-preview";
import { createBlockCodeTree } from "$lib/components/code-preview";

import aiConfigRaw from "../../../lib/config/ai-config.ts?raw";
import openRouterKeyStoreRaw from "../../../lib/config/open-router-key.svelte.ts?raw";
import basicSetupGuideRaw from "../../(main)/guides/basic-setup/+page.svelte?raw";
import basicSetupContentRaw from "../../(main)/guides/basic-setup/content.md?raw";

const envLocalRaw = `OPENROUTER_API_KEY=sk-or-v1-your-api-key-here`;

export const pageData: CookbookPlaygroundPageData = {
	id: "basic-setup",
	slug: "basic-setup",
	title: "Basic Setup",
	description:
		"Set up your project, environment variables, OpenRouter config, and shared AI SDK plumbing before moving into interactive cookbook recipes.",
	tags: ["setup", "openrouter", "sveltekit"],
	previewMode: "empty",
	previewTitle: "Preview",
	previewDescription: "No live preview for setup-only recipes. Use the file tree and code panes as the source of truth.",
	codeTree: createBlockCodeTree("env-local", [
		{
			id: "env-local",
			path: ".env.local",
			code: envLocalRaw,
			lang: "bash",
		},
		{
			id: "ai-config",
			path: "src/lib/config/ai-config.ts",
			code: aiConfigRaw,
			lang: "typescript",
		},
		{
			id: "openrouter-store",
			path: "src/lib/config/open-router-key.svelte.ts",
			code: openRouterKeyStoreRaw,
			lang: "typescript",
		},
		{
			id: "basic-setup-guide",
			path: "src/routes/(main)/guides/basic-setup/+page.svelte",
			code: basicSetupGuideRaw,
			lang: "svelte",
		},
		{
			id: "basic-setup-content",
			path: "src/routes/(main)/guides/basic-setup/content.md",
			code: basicSetupContentRaw,
			lang: "markdown",
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
