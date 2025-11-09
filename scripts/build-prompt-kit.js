#!/usr/bin/env node

/**
 * Build script for Prompt Kit registry
 *
 * Builds Prompt Kit components from prompt-kit.json to static/p/
 */

import { execSync } from "child_process";

console.log("📦 Building Prompt Kit registry to static/p...\n");

try {
	execSync("pnpm shadcn-svelte registry build prompt-kit.json -o static/p", {
		stdio: "inherit",
	});

	console.log("\n✅ Prompt Kit registry built successfully to static/p");
	console.log(
		"   Installation: npx shadcn-svelte@latest add https://ai-elements.vercel.app/p/<component-name>"
	);
} catch (error) {
	console.error("\n❌ Error building Prompt Kit registry:", error.message);
	process.exit(1);
}
