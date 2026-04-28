<script lang="ts">
	import type { BlockCodeNode } from "./types";
	import { cn } from "$lib/utils";
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
</script>

{#if node.type === "folder"}
	<div>
		<button
			type="button"
			class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
			onclick={() => onToggleFolder(node.id)}
		>
			<span class="flex w-4 shrink-0 items-center justify-center">
				<ChevronRight
					class={[
						"size-3.5 transition duration-150 ease-out",
						isOpen ? "rotate-90 text-foreground/80" : "text-foreground/60"
					]}
				/>
			</span>
			{#if isOpen}
				<FolderOpen class="size-3.5 text-foreground/80" />
			{:else}
				<Folder class="size-3.5 text-foreground/80" />
			{/if}
			<span class="truncate">{node.name}</span>
		</button>

		{#if isOpen}
			<div transition:slide={{ duration: 180 }} class="ml-4 border-l border-border/60 pl-1.5">
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
		class="flex items-center gap-1 rounded-md text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
	>
		<span class="w-4 shrink-0"></span>
		<FileCode2 class="size-3.5 shrink-0 text-sky-500" />
		<span class="min-w-0 flex-1 truncate py-1.5">{node.name}</span>
		<span class="mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-md">
			<ExternalLink class="size-3.5" />
		</span>
	</a>
{:else}
	<div
		class={cn(
			"flex items-center gap-1 rounded-md text-xs transition-colors",
			activeFileId === node.id
				? "bg-accent text-foreground shadow-sm"
				: "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
		)}
	>
		<button
			type="button"
			class="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left"
			onclick={() => onSelectFile(node.id)}
		>
			<span class="w-4 shrink-0"></span>
			<FileCode2 class="size-3.5 shrink-0 text-sky-500" />
			<span class="truncate">{node.name}</span>
		</button>

		{#if node.externalUrl}
			<a
				href={node.externalUrl}
				target="_blank"
				rel="noreferrer"
				aria-label={`Open ${node.externalLabel ?? node.name}`}
				class="mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
			>
				<ExternalLink class="size-3.5" />
			</a>
		{/if}
	</div>
{/if}
