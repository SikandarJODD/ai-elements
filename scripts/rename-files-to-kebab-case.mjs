import fs from "node:fs/promises";
import path from "node:path";

const CODE_EXTENSIONS = new Set([
	".js",
	".mjs",
	".cjs",
	".ts",
	".mts",
	".cts",
	".svelte",
]);

const IGNORE_DIRECTORIES = new Set([".git", ".svelte-kit", "node_modules"]);
const RELATIVE_SPECIFIER_RE = /(['"])(\.{1,2}\/[^'"\\\r\n]+)\1/g;

function printUsage() {
	console.log(`Usage:
  node scripts/rename-files-to-kebab-case.mjs <folder> [--apply]

Examples:
  node scripts/rename-files-to-kebab-case.mjs src/lib/components/ai-elements
  node scripts/rename-files-to-kebab-case.mjs src/lib/components/ai-elements --apply
`);
}

function toKebabCase(value) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.replace(/[_\s]+/g, "-")
		.replace(/-+/g, "-")
		.toLowerCase();
}

function splitFileName(fileName) {
	if (fileName.startsWith(".")) {
		return { base: fileName, suffix: "" };
	}

	const firstDot = fileName.indexOf(".");

	if (firstDot === -1) {
		return { base: fileName, suffix: "" };
	}

	return {
		base: fileName.slice(0, firstDot),
		suffix: fileName.slice(firstDot),
	};
}

function normalizePath(filePath) {
	return path.resolve(filePath).toLowerCase();
}

function toPosix(filePath) {
	return filePath.split(path.sep).join("/");
}

function toRelativeSpecifier(fromDirectory, toFile) {
	const relativePath = toPosix(path.relative(fromDirectory, toFile));
	return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

function buildImportAliases(filePath) {
	const aliases = [filePath];

	if (filePath.endsWith(".svelte.ts")) {
		aliases.push(filePath.slice(0, -3) + ".js");
	} else if (filePath.endsWith(".ts")) {
		aliases.push(filePath.slice(0, -3) + ".js");
	} else if (filePath.endsWith(".mts")) {
		aliases.push(filePath.slice(0, -4) + ".mjs");
	} else if (filePath.endsWith(".cts")) {
		aliases.push(filePath.slice(0, -4) + ".cjs");
	}

	return aliases;
}

async function walkFiles(rootDirectory) {
	const files = [];
	const stack = [rootDirectory];

	while (stack.length > 0) {
		const currentDirectory = stack.pop();
		const entries = await fs.readdir(currentDirectory, { withFileTypes: true });

		for (const entry of entries) {
			const absolutePath = path.join(currentDirectory, entry.name);

			if (entry.isDirectory()) {
				if (!IGNORE_DIRECTORIES.has(entry.name)) {
					stack.push(absolutePath);
				}
				continue;
			}

			if (entry.isFile()) {
				files.push(absolutePath);
			}
		}
	}

	return files.sort((left, right) => left.localeCompare(right));
}

async function renameFileCaseSafe(oldPath, newPath) {
	if (normalizePath(oldPath) === normalizePath(newPath) && oldPath !== newPath) {
		const temporaryPath = path.join(
			path.dirname(oldPath),
			`.__rename_tmp__${Date.now()}_${Math.random().toString(36).slice(2)}${path.extname(oldPath)}`
		);

		await fs.rename(oldPath, temporaryPath);
		await fs.rename(temporaryPath, newPath);
		return;
	}

	await fs.rename(oldPath, newPath);
}

function createRenamePlan(filePaths) {
	const renames = [];

	for (const filePath of filePaths) {
		const fileName = path.basename(filePath);
		const { base, suffix } = splitFileName(fileName);
		const kebabBase = toKebabCase(base);

		if (!kebabBase || kebabBase === base) {
			continue;
		}

		renames.push({
			oldPath: filePath,
			newPath: path.join(path.dirname(filePath), `${kebabBase}${suffix}`),
		});
	}

	const collisions = new Map();

	for (const rename of renames) {
		const collisionKey = normalizePath(rename.newPath);
		const existing = collisions.get(collisionKey) ?? [];
		existing.push(rename.oldPath);
		collisions.set(collisionKey, existing);
	}

	const duplicateDestinations = [...collisions.entries()].filter(([, sources]) => sources.length > 1);

	if (duplicateDestinations.length > 0) {
		const message = duplicateDestinations
			.map(([, sources]) => sources.map((source) => `  - ${path.relative(process.cwd(), source)}`).join("\n"))
			.join("\n");
		throw new Error(`Multiple files would rename to the same destination:\n${message}`);
	}

	for (const rename of renames) {
		const destinationExists =
			normalizePath(rename.oldPath) !== normalizePath(rename.newPath) &&
			filePaths.some((filePath) => normalizePath(filePath) === normalizePath(rename.newPath));

		if (destinationExists) {
			throw new Error(
				`Cannot rename ${path.relative(process.cwd(), rename.oldPath)} because ${path.relative(process.cwd(), rename.newPath)} already exists.`
			);
		}
	}

	return renames.sort((left, right) => left.oldPath.localeCompare(right.oldPath));
}

function createAliasMap(renames) {
	const aliases = new Map();

	for (const rename of renames) {
		const oldAliases = buildImportAliases(rename.oldPath);
		const newAliases = buildImportAliases(rename.newPath);

		for (let index = 0; index < oldAliases.length; index += 1) {
			aliases.set(normalizePath(oldAliases[index]), newAliases[index]);
		}
	}

	return aliases;
}

async function findRewritePlan(rootDirectory, aliasMap) {
	const filePaths = await walkFiles(rootDirectory);
	const rewrites = [];

	for (const filePath of filePaths) {
		const extension = path.extname(filePath);

		if (!CODE_EXTENSIONS.has(extension)) {
			continue;
		}

		const originalContent = await fs.readFile(filePath, "utf8");
		let changed = false;

		const updatedContent = originalContent.replace(RELATIVE_SPECIFIER_RE, (match, quote, specifier) => {
			const resolvedSpecifier = path.resolve(path.dirname(filePath), specifier);
			const renamedTarget = aliasMap.get(normalizePath(resolvedSpecifier));

			if (!renamedTarget) {
				return match;
			}

			changed = true;
			return `${quote}${toRelativeSpecifier(path.dirname(filePath), renamedTarget)}${quote}`;
		});

		if (changed) {
			rewrites.push({
				filePath,
				content: updatedContent,
			});
		}
	}

	return rewrites.sort((left, right) => left.filePath.localeCompare(right.filePath));
}

async function main() {
	const argumentsList = process.argv.slice(2);

	if (argumentsList.length === 0 || argumentsList.includes("--help") || argumentsList.includes("-h")) {
		printUsage();
		process.exit(argumentsList.length === 0 ? 1 : 0);
	}

	const applyChanges = argumentsList.includes("--apply");
	const targetArgument = argumentsList.find((argument) => !argument.startsWith("--"));

	if (!targetArgument) {
		printUsage();
		process.exit(1);
	}

	const rootDirectory = process.cwd();
	const targetDirectory = path.resolve(rootDirectory, targetArgument);
	const targetStats = await fs.stat(targetDirectory).catch(() => null);

	if (!targetStats?.isDirectory()) {
		throw new Error(`Target folder does not exist or is not a directory: ${targetArgument}`);
	}

	const targetFiles = await walkFiles(targetDirectory);
	const renames = createRenamePlan(targetFiles);

	if (renames.length === 0) {
		console.log(`No file renames needed in ${path.relative(rootDirectory, targetDirectory)}.`);
		return;
	}

	const aliasMap = createAliasMap(renames);
	const rewrites = await findRewritePlan(rootDirectory, aliasMap);

	console.log(`${applyChanges ? "Applying" : "Dry run"} rename plan for ${path.relative(rootDirectory, targetDirectory)}\n`);

	for (const rename of renames) {
		console.log(`rename  ${path.relative(rootDirectory, rename.oldPath)} -> ${path.relative(rootDirectory, rename.newPath)}`);
	}

	if (rewrites.length > 0) {
		console.log("");
		for (const rewrite of rewrites) {
			console.log(`update  ${path.relative(rootDirectory, rewrite.filePath)}`);
		}
	}

	console.log("");
	console.log(`Summary: ${renames.length} file rename(s), ${rewrites.length} file update(s).`);

	if (!applyChanges) {
		console.log("Run again with --apply to perform the changes.");
		return;
	}

	for (const rename of renames) {
		await renameFileCaseSafe(rename.oldPath, rename.newPath);
	}

	const appliedRewrites = await findRewritePlan(rootDirectory, aliasMap);

	for (const rewrite of appliedRewrites) {
		await fs.writeFile(rewrite.filePath, rewrite.content, "utf8");
	}

	console.log("Rename complete.");
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
