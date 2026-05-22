<script lang="ts">
	import { cn } from "$lib/utils";
	import type { CodeBlock } from "$lib/types/code";
	import Root from "./code.svelte";
	import * as Select from "$lib/components/ui/select/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { CopyButton } from "$lib/components/ui/copy-button";
	import { mergeProps } from "bits-ui";
	import {
		CodeIcon,
		CSS,
		Markdown,
		Svelte,
		Terminal,
		TypeScript
	} from "$lib/components/icons";
	import { FolderIcon, FolderTreeIcon } from "@lucide/svelte";

	type Props = {
		code: CodeBlock[];
		folderPath?: string;
		folderStructure?: string;
	};

	type FileKind =
		| "svelte"
		| "typescript"
		| "css"
		| "markdown"
		| "bash"
		| "file";

	type TreeEntry = {
		id: string;
		name: string;
		depth: number;
		kind: "folder" | "file";
		fileKind?: FileKind;
	};

	type TreeNode = {
		name: string;
		kind: "folder" | "file";
		fileKind?: FileKind;
		children: Map<string, TreeNode>;
	};

	let { code, folderPath, folderStructure }: Props = $props();

	let selectedValue = $state("0");
	let selectedIndex = $derived.by(() => {
		if (code.length === 0) return 0;

		let index = Number(selectedValue);
		if (!Number.isFinite(index)) return 0;

		return Math.min(Math.max(index, 0), code.length - 1);
	});
	let selectedCode = $derived(code[selectedIndex] ?? code[0]);
	let folderEntries = $derived.by(() => {
		let parsedEntries = folderStructure
			? parseFolderStructure(folderStructure)
			: [];

		if (parsedEntries.length > 0) {
			return parsedEntries;
		}

		if (!folderPath) {
			return [];
		}

		return buildFolderEntries(folderPath, code);
	});

	const CONNECTOR_PREFIXES = [
		"\u251c\u2500\u2500 ",
		"\u2514\u2500\u2500 ",
		"|-- ",
		"`-- "
	];

	const INDENT_PREFIXES = ["\u2502   ", "    ", "|   "];

	function createNode(
		name: string,
		kind: TreeNode["kind"],
		fileKind?: FileKind
	): TreeNode {
		return {
			name,
			kind,
			fileKind,
			children: new Map()
		};
	}

	function normalizePath(path: string) {
		return path
			.split("/")
			.map((segment) => segment.trim())
			.filter(Boolean);
	}

	function inferFileKind(name: string, lang?: CodeBlock["lang"]): FileKind {
		if (lang === "svelte") return "svelte";
		if (lang === "typescript") return "typescript";
		if (lang === "css") return "css";
		if (lang === "markdown") return "markdown";
		if (lang === "bash") return "bash";

		let normalizedName = name.toLowerCase();

		if (normalizedName.endsWith(".svelte")) return "svelte";
		if (
			normalizedName.endsWith(".ts") ||
			normalizedName.endsWith(".tsx") ||
			normalizedName.endsWith(".js") ||
			normalizedName.endsWith(".jsx")
		) {
			return "typescript";
		}
		if (
			normalizedName.endsWith(".css") ||
			normalizedName.endsWith(".pcss")
		) {
			return "css";
		}
		if (normalizedName.endsWith(".md") || normalizedName.endsWith(".svx")) {
			return "markdown";
		}
		if (
			normalizedName.endsWith(".sh") ||
			normalizedName === "dockerfile" ||
			normalizedName.endsWith(".bash")
		) {
			return "bash";
		}

		return "file";
	}

	function getIconForKind(kind: FileKind) {
		if (kind === "svelte") return Svelte;
		if (kind === "typescript") return TypeScript;
		if (kind === "css") return CSS;
		if (kind === "markdown") return Markdown;
		if (kind === "bash") return Terminal;
		return CodeIcon;
	}

	function ensureFolderNode(root: TreeNode, segments: string[]) {
		let currentNode = root;

		for (let segment of segments) {
			let existingNode = currentNode.children.get(segment);

			if (!existingNode) {
				existingNode = createNode(segment, "folder");
				currentNode.children.set(segment, existingNode);
			}

			currentNode = existingNode;
		}

		return currentNode;
	}

	function flattenTree(root: TreeNode) {
		let entries: TreeEntry[] = [];

		function visit(node: TreeNode, depth: number) {
			if (node.name) {
				entries.push({
					id: `${node.kind}-${depth}-${entries.length}-${node.name}`,
					name: node.name,
					depth,
					kind: node.kind,
					fileKind: node.fileKind
				});
			}

			for (let child of node.children.values()) {
				visit(child, node.name ? depth + 1 : depth);
			}
		}

		visit(root, 0);

		return entries;
	}

	function buildFolderEntries(folderPathValue: string, files: CodeBlock[]) {
		let root = createNode("", "folder");
		let baseNode = ensureFolderNode(root, normalizePath(folderPathValue));

		for (let item of files) {
			let fileSegments = normalizePath(item.name);
			if (fileSegments.length === 0) continue;

			let currentNode = baseNode;

			for (let index = 0; index < fileSegments.length; index += 1) {
				let segment = fileSegments[index];
				let isLast = index === fileSegments.length - 1;
				let existingNode = currentNode.children.get(segment);

				if (!existingNode) {
					existingNode = createNode(
						segment,
						isLast ? "file" : "folder",
						isLast ? inferFileKind(segment, item.lang) : undefined
					);
					currentNode.children.set(segment, existingNode);
				}

				currentNode = existingNode;
			}
		}

		return flattenTree(root);
	}

	function parseFolderStructure(folderStructureValue: string) {
		let entries: TreeEntry[] = [];
		let lines = folderStructureValue
			.split(/\r?\n/)
			.map((line) => line.replace(/\t/g, "    ").trimEnd())
			.filter(Boolean);

		for (let line of lines) {
			let depth = 0;
			let remainingLine = line;

			while (true) {
				let matchedIndent = INDENT_PREFIXES.find((prefix) =>
					remainingLine.startsWith(prefix)
				);

				if (!matchedIndent) {
					break;
				}

				depth += 1;
				remainingLine = remainingLine.slice(matchedIndent.length);
			}

			let matchedConnector = CONNECTOR_PREFIXES.find((prefix) =>
				remainingLine.startsWith(prefix)
			);

			if (matchedConnector) {
				depth += 1;
				remainingLine = remainingLine.slice(matchedConnector.length);
			}

			let normalizedName = remainingLine.trim();
			if (!normalizedName) continue;

			let isFolder = normalizedName.endsWith("/");
			let name = isFolder ? normalizedName.slice(0, -1) : normalizedName;

			entries.push({
				id: `${isFolder ? "folder" : "file"}-${depth}-${entries.length}-${name}`,
				name,
				depth,
				kind: isFolder ? "folder" : "file",
				fileKind: isFolder ? undefined : inferFileKind(name)
			});
		}

		return entries;
	}
</script>

<div class="w-full overflow-hidden rounded-xl border bg-background">
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 py-2 pr-3 pl-1.5"
	>
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger size="sm" class="min-w-76">
				<span class="flex min-w-0 items-center gap-1.5">
					{#if selectedCode}
						{@const CurrentFileIcon = getIconForKind(
							inferFileKind(selectedCode.name, selectedCode.lang)
						)}
						<CurrentFileIcon class="size-4" />
					{/if}
					<span class="truncate font-mono text-[13px] text-primary">
						{selectedCode?.name ?? "No file selected"}
					</span>
				</span>
			</Select.Trigger>

			<Select.Content align="start" class="max-h-80 overflow-auto p-1">
				{#each code as item, index (`${item.name}-${index}`)}
					<Select.Item value={String(index)} class="gap-2 pr-9">
						{@const ItemIcon = getIconForKind(
							inferFileKind(item.name, item.lang)
						)}
						<ItemIcon class="size-4" />
						<span class="truncate font-mono text-sm"
							>{item.name}</span
						>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<div class="flex items-center gap-1">
			{#if folderEntries.length > 0}
				<Tooltip.Provider delayDuration={0}>
					<Tooltip.Root>
						<DropdownMenu.Root>
							<Tooltip.Trigger>
								{#snippet child({ props: tooltipProps })}
									<DropdownMenu.Trigger>
										{#snippet child({
											props: dropdownProps
										})}
											<Button
												{...mergeProps(
													tooltipProps,
													dropdownProps
												)}
												type="button"
												variant="secondary"
												size="icon-sm"
												class="relative text-muted-foreground"
												aria-label="Show folder structure"
											>
												<FolderTreeIcon
													class="size-4"
												/>
												<span
													aria-hidden="true"
													class="absolute inset-e-0 -top-0.5 -right-0.5 size-2 rounded-full dark:bg-emerald-400 bg-emerald-500 outline-2 outline-background"
												></span>
											</Button>
										{/snippet}
									</DropdownMenu.Trigger>
								{/snippet}
							</Tooltip.Trigger>

							<DropdownMenu.Content
								align="end"
								class="w-[min(24rem,calc(100vw-2rem))] p-0"
							>
								<div
									class="border-b border-border/70 px-3 py-2"
								>
									<p class="font-medium">Folder structure</p>
									{#if folderPath}
										<p
											class="truncate font-mono text-xs text-muted-foreground"
										>
											{folderPath}
										</p>
									{/if}
								</div>
								<div class="max-h-80 overflow-auto p-2">
									<div class="space-y-0.5">
										{#each folderEntries as entry (entry.id)}
											<div
												class={cn(
													"flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
													entry.kind === "folder"
														? "text-foreground"
														: "text-muted-foreground"
												)}
												style={`padding-left: ${entry.depth * 0.875 + 0.5}rem;`}
											>
												{#if entry.kind === "folder"}
													<FolderIcon
														class="size-4 shrink-0 text-amber-600 dark:text-amber-400"
													/>
												{:else}
													{@const EntryIcon =
														getIconForKind(
															entry.fileKind ??
																inferFileKind(
																	entry.name
																)
														)}
													<EntryIcon
														class="size-4 shrink-0"
													/>
												{/if}
												<span
													class="truncate font-mono text-xs sm:text-sm"
												>
													{entry.name}
												</span>
											</div>
										{/each}
									</div>
								</div>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<Tooltip.Content>Show folder structure</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}

			<CopyButton
				text={selectedCode?.code ?? ""}
				variant="ghost"
				size="icon-sm"
				class="text-muted-foreground"
				tabindex={0}
				aria-label="Copy code"
			/>
		</div>
	</div>

	<div class="relative max-h-140 min-h-60 w-full overflow-auto">
		<Root
			lang={selectedCode?.lang ?? "typescript"}
			class="w-full rounded-none border-none text-xs!"
			code={selectedCode?.code ?? ""}
			highlight={selectedCode?.highlight}
			hideLines={selectedCode?.hideLines ?? false}
		/>
	</div>
</div>
