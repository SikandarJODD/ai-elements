<script lang="ts">
	import type { BlockCodeNode } from "./types";
	import { cn } from "$lib/utils";
	import { CSS, Markdown, Svelte, Terminal, TypeScript } from "$lib/components/icons";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import FileCode2 from "@lucide/svelte/icons/file-code-2";
	import Folder from "@lucide/svelte/icons/folder";
	import FolderOpen from "@lucide/svelte/icons/folder-open";
	import CodeTreeNode from "./code-tree-node.svelte";
	import { slide } from "svelte/transition";

	interface CodeTreeNodeProps {
		node: BlockCodeNode;
		activeFileId: string;
		openFolderIds: string[];
		onSelectFile: (fileId: string) => void;
		onToggleFolder: (folderId: string) => void;
	}

	let { node, activeFileId, openFolderIds, onSelectFile, onToggleFolder }: CodeTreeNodeProps =
		$props();

	let isOpen = $derived(node.type === "folder" ? openFolderIds.includes(node.id) : false);
	let isExternalOnlyFile = $derived(
		node.type === "file" && Boolean(node.externalUrl) && !node.code
	);
	let fileIconKind = $derived.by(() => {
		if (node.type !== "file") {
			return "default";
		}

		const fileName = node.name.toLowerCase();

		if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
			return "typescript";
		}

		if (fileName.endsWith(".svelte")) {
			return "svelte";
		}

		if (fileName.endsWith(".css") || fileName.endsWith(".scss") || fileName.endsWith(".pcss")) {
			return "css";
		}

		if (fileName.endsWith(".md") || fileName.endsWith(".mdx")) {
			return "markdown";
		}

		if (fileName.endsWith(".bash")) {
			return "terminal";
		}

		return "default";
	});
</script>

{#if node.type === "folder"}
	<div>
		<button
			type="button"
			class="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex w-full items-center gap-1 rounded-md px-1 py-1.5 text-left text-xs transition-colors"
			onclick={() => onToggleFolder(node.id)}
		>
			<span class="flex w-4 shrink-0 items-center justify-center">
				<ChevronRight
					class={[
						"size-3.5 transition duration-150 ease-out",
						isOpen ? "text-foreground/80 rotate-90" : "text-foreground/60",
					]}
				/>
			</span>
			{#if isOpen}
				<FolderOpen class="text-foreground/80 size-3.5" />
			{:else}
				<Folder class="text-foreground/80 size-3.5" />
			{/if}
			<span class="truncate">{node.name}</span>
		</button>

		{#if isOpen}
			<div
				transition:slide={{ duration: 180 }}
				class="border-border/60 ml-2.5 border-l pl-1.5"
			>
				{#each node.children as child (child.id)}
					<CodeTreeNode
						node={child}
						{activeFileId}
						{openFolderIds}
						{onSelectFile}
						{onToggleFolder}
					/>
				{/each}
			</div>
		{/if}
	</div>
{:else if isExternalOnlyFile}
	<a
		href={node.externalUrl}
		target="_blank"
		rel="noreferrer"
		aria-label={`Open ${node.externalLabel ?? node.name}`}
		class="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex items-center gap-1 rounded-md text-xs transition-colors"
	>
		<!-- <span class="w-4 shrink-0"></span> -->
		{#if fileIconKind === "svelte"}
			<Svelte class="size-4 shrink-0" />
		{:else if fileIconKind === "typescript"}
			<TypeScript class="size-3.5 shrink-0" />
		{:else if fileIconKind === "css"}
			<CSS class="size-3.5 shrink-0" />
		{:else if fileIconKind === "markdown"}
			<Markdown class="size-3.5 shrink-0" />
		{:else if fileIconKind === "terminal"}
			<Terminal class="size-3.5 shrink-0" />
		{:else}
			<FileCode2 class="size-3.5 shrink-0 text-sky-500" />
		{/if}
		<span class="min-w-0 flex-1 truncate py-1.5">{node.name}</span>
		<span class="mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-md">
			<ExternalLink class="size-3.5" />
		</span>
	</a>
{:else}
	<div
		class={cn(
			"flex items-center gap-1 rounded-sm text-xs transition-colors",
			activeFileId === node.id
				? "bg-accent text-foreground shadow-sm"
				: "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
		)}
	>
		<button
			type="button"
			class="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-1.5 text-left"
			onclick={() => onSelectFile(node.id)}
		>
			<!-- <span class="w-4 shrink-0"></span> -->
			{#if fileIconKind === "svelte"}
				<Svelte class="size-4 shrink-0" />
			{:else if fileIconKind === "typescript"}
				<TypeScript class="size-3.5 shrink-0" />
			{:else if fileIconKind === "css"}
				<CSS class="size-3.5 shrink-0" />
			{:else if fileIconKind === "markdown"}
				<Markdown class="size-3.5 shrink-0" />
			{:else if fileIconKind === "terminal"}
				<Terminal class="size-3.5 shrink-0" />
			{:else}
				<FileCode2 class="size-3.5 shrink-0 text-sky-500" />
			{/if}
			<span class="truncate">{node.name}</span>
		</button>

		{#if node.externalUrl}
			<a
				href={node.externalUrl}
				target="_blank"
				rel="noreferrer"
				aria-label={`Open ${node.externalLabel ?? node.name}`}
				class="text-muted-foreground hover:bg-muted hover:text-foreground mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors"
			>
				<ExternalLink class="size-3.5" />
			</a>
		{/if}
	</div>
{/if}
