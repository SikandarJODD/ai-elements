#!/usr/bin/env node

/**
 * Build script for AI Elements registry
 *
 * Builds AI Elements components from ai-elements.json to static/r/
 */

import { execSync } from "child_process";

console.log("📦 Building AI Elements registry to static/r...\n");

try {
	execSync("pnpm shadcn-svelte registry build ai-elements.json -o static/r", {
		stdio: "inherit",
	});

	console.log("\n✅ AI Elements registry built successfully to static/r");
	console.log(
		"   Installation: npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/<component-name>"
	);
} catch (error) {
	console.error("\n❌ Error building AI Elements registry:", error.message);
	process.exit(1);
}
