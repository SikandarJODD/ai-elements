<script lang="ts">
	import CodeTreeNode from "./code-tree-node.svelte";
	import type { BlockCodeTree } from "./types";

	interface CodeTreeProps {
		codeTree: BlockCodeTree;
		activeFileId: string;
		openFolderIds: string[];
		onSelectFile: (fileId: string) => void;
		onToggleFolder: (folderId: string) => void;
		title?: string;
	}

	let {
		codeTree,
		activeFileId,
		openFolderIds,
		onSelectFile,
		onToggleFolder,
		title = "Files",
	}: CodeTreeProps = $props();
</script>

<div
	class="flex h-full min-h-0 flex-col bg-neutral-50 text-black [--color-background:var(--color-zinc-900)] [--color-foreground:white] [--color-muted:var(--color-zinc-800)] dark:bg-zinc-900/25 dark:text-white"
>
	<div class="text-muted-foreground border-b px-4 py-3 font-mono text-sm tracking-wider">
		{title}
	</div>

	<div class="min-h-0 flex-1 overflow-auto pl-2 pr-1.5 py-3">
		{#each codeTree.nodes as node (node.id)}
			<CodeTreeNode {node} {activeFileId} {openFolderIds} {onSelectFile} {onToggleFolder} />
		{/each}
	</div>
</div>
