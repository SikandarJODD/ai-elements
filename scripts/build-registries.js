#!/usr/bin/env node

/**
 * Build script for creating separate registries for AI Elements and Prompt Kit
 *
 * This script:
 * 1. Reads the main registry.json file
 * 2. Splits components into AI Elements and Prompt Kit
 * 3. Builds AI Elements registry to static/r
 * 4. Builds Prompt Kit registry to static/p (with renamed components)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Read the main registry file
const registryPath = path.join(rootDir, "registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

// Separate AI Elements and Prompt Kit components
const aiElementsItems = [];
const promptKitItems = [];

registry.items.forEach((item) => {
	if (item.name.startsWith("prompt-kit-")) {
		// Remove 'prompt-kit-' prefix for Prompt Kit registry
		const newItem = { ...item };
		newItem.name = item.name.replace("prompt-kit-", "");
		promptKitItems.push(newItem);
	} else {
		aiElementsItems.push(item);
	}
});

// Create AI Elements registry
const aiElementsRegistry = {
	...registry,
	name: "Svelte AI Elements",
	homepage: "https://svelte-ai-elements.vercel.app",
	items: aiElementsItems,
};

// Create Prompt Kit registry
const promptKitRegistry = {
	$schema: "https://shadcn-svelte.com/schema/registry.json",
	name: "Prompt Kit",
	homepage: "https://svelte-ai-elements.vercel.app/prompt-kit",
	aliases: registry.aliases,
	items: promptKitItems,
};

// Write temporary registry files
const aiElementsRegistryPath = path.join(rootDir, "registry-ai-elements-temp.json");
const promptKitRegistryPath = path.join(rootDir, "registry-prompt-kit-temp.json");

fs.writeFileSync(aiElementsRegistryPath, JSON.stringify(aiElementsRegistry, null, "\t"));
fs.writeFileSync(promptKitRegistryPath, JSON.stringify(promptKitRegistry, null, "\t"));

console.log("✅ Split registry into AI Elements and Prompt Kit");
console.log(`   - AI Elements: ${aiElementsItems.length} components`);
console.log(`   - Prompt Kit: ${promptKitItems.length} components`);

// Build AI Elements registry to static/r
console.log("\n📦 Building AI Elements registry to static/r...");
try {
	// Backup original registry.json
	const registryBackupPath = path.join(rootDir, "registry-backup.json");
	fs.copyFileSync(registryPath, registryBackupPath);

	// Replace with AI Elements registry
	fs.copyFileSync(aiElementsRegistryPath, registryPath);

	// Build registry
	execSync("pnpm shadcn-svelte registry build", {
		cwd: rootDir,
		stdio: "inherit",
	});

	// Clean up any prompt-kit-* files from static/r (they shouldn't be there)
	const staticRDir = path.join(rootDir, "static", "r");
	const rFiles = fs.readdirSync(staticRDir);
	rFiles.forEach((file) => {
		if (file.startsWith("prompt-kit-")) {
			fs.unlinkSync(path.join(staticRDir, file));
		}
	});

	// Save AI Elements index.json for later restoration
	const aiElementsIndexPath = path.join(staticRDir, "index.json");
	const aiElementsIndexBackupPath = path.join(rootDir, "ai-elements-index-backup.json");
	fs.copyFileSync(aiElementsIndexPath, aiElementsIndexBackupPath);

	// Restore original registry
	fs.copyFileSync(registryBackupPath, registryPath);
	fs.unlinkSync(registryBackupPath);

	console.log("✅ AI Elements registry built successfully");
} catch (error) {
	console.error("❌ Error building AI Elements registry:", error.message);
	process.exit(1);
}

// Build Prompt Kit registry to static/p
console.log("\n📦 Building Prompt Kit registry to static/p...");
try {
	// Backup original registry.json
	const registryBackupPath = path.join(rootDir, "registry-backup.json");
	fs.copyFileSync(registryPath, registryBackupPath);

	// Replace with Prompt Kit registry
	fs.copyFileSync(promptKitRegistryPath, registryPath);

	// Build registry
	execSync("pnpm shadcn-svelte registry build", {
		cwd: rootDir,
		stdio: "inherit",
	});

	// Move built files from static/r to static/p
	const staticRDir = path.join(rootDir, "static", "r");
	const staticPDir = path.join(rootDir, "static", "p");

	// Create static/p directory if it doesn't exist
	if (!fs.existsSync(staticPDir)) {
		fs.mkdirSync(staticPDir, { recursive: true });
	}

	// Move only Prompt Kit files from static/r to static/p
	const files = fs.readdirSync(staticRDir);
	const promptKitComponentNames = promptKitItems.map((item) => item.name);

	files.forEach((file) => {
		const sourcePath = path.join(staticRDir, file);
		const destPath = path.join(staticPDir, file);
		const fileName = file.replace(".json", "");

		// Move index.json and files that match Prompt Kit component names
		if (file === "index.json" || promptKitComponentNames.includes(fileName)) {
			fs.renameSync(sourcePath, destPath);
		}
	});

	// Restore AI Elements index.json
	const aiElementsIndexBackupPath = path.join(rootDir, "ai-elements-index-backup.json");
	const aiElementsIndexPath = path.join(staticRDir, "index.json");
	fs.copyFileSync(aiElementsIndexBackupPath, aiElementsIndexPath);
	fs.unlinkSync(aiElementsIndexBackupPath);

	// Restore original registry
	fs.copyFileSync(registryBackupPath, registryPath);
	fs.unlinkSync(registryBackupPath);

	console.log("✅ Prompt Kit registry built successfully to static/p");
} catch (error) {
	console.error("❌ Error building Prompt Kit registry:", error.message);
	process.exit(1);
}

// Clean up temporary files
fs.unlinkSync(aiElementsRegistryPath);
fs.unlinkSync(promptKitRegistryPath);

console.log("\n✨ All registries built successfully!");
console.log("   - AI Elements: static/r");
console.log("   - Prompt Kit: static/p");

// Display component lists
console.log("\n📋 AI Elements Components (/r):");
aiElementsItems
	.map((item) => item.name)
	.sort()
	.forEach((name, index) => {
		console.log(`   ${(index + 1).toString().padStart(2, " ")}. ${name}`);
	});

console.log(`\n📋 Prompt Kit Components (/p):`);
promptKitItems
	.map((item) => item.name)
	.sort()
	.forEach((name, index) => {
		console.log(`   ${(index + 1).toString().padStart(2, " ")}. ${name}`);
	});

console.log("\n💡 Usage:");
console.log(
	"   AI Elements: npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/<component-name>"
);
console.log(
	"   Prompt Kit:  npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/p/<component-name>"
);
