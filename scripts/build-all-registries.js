#!/usr/bin/env node

/**
 * Build all registries (AI Elements and Prompt Kit)
 *
 * Builds both registries in sequence
 */

import { execSync } from "child_process";

console.log("🚀 Building all registries...");
console.log("============================================================\n");

try {
	// Build AI Elements
	console.log("1️⃣  Building AI Elements registry...");
	execSync("node scripts/build-ai-elements.js", {
		stdio: "inherit",
	});

	console.log("\n============================================================\n");

	// Build Prompt Kit
	console.log("2️⃣  Building Prompt Kit registry...");
	execSync("node scripts/build-prompt-kit.js", {
		stdio: "inherit",
	});

	console.log("\n============================================================");
	console.log("✅ All registries built successfully!");
	console.log("\n📦 AI Elements: static/r/");
	console.log("📦 Prompt Kit: static/p/");
} catch (error) {
	console.error("\n❌ Error building registries:", error.message);
	process.exit(1);
}
