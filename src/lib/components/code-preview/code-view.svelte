<script lang="ts">
	import type { BlockCodeFile } from "./types";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
	import { scale } from "svelte/transition";
	import Button from "../ui/button/button.svelte";
	import Code from "$lib/components/ui/code/code.svelte";

	interface CodeViewProps {
		activeFile?: BlockCodeFile;
	}

	let { activeFile }: CodeViewProps = $props();

	let clipboard = new UseClipboard({ delay: 1500 });

	async function copyCode() {
		if (!activeFile) return;
		if (!activeFile.code) return;
		await clipboard.copy(activeFile.code);
	}
</script>

<div class="relative flex h-full min-h-0 flex-col">
	<div class="flex items-center justify-between gap-3 border-b py-1.5 pr-2 pl-4">
		<div class="min-w-0">
			<p class="text-foreground min-w-0 truncate font-mono text-sm">
				{activeFile?.name ?? "No file selected"}
			</p>
			{#if activeFile}
				<p class="text-muted-foreground truncate font-mono text-xs">
					{activeFile.path}
				</p>
			{/if}
		</div>

		<div class="flex items-center gap-1">
			{#if activeFile?.externalUrl}
				<Button
					class="h-8 gap-1.5 px-3 text-xs"
					variant="outline"
					size="sm"
					href={activeFile.externalUrl}
					target="_blank"
				>
					<ExternalLink class="size-3.5" />
					<span>{activeFile.externalLabel ?? "Open docs"}</span>
				</Button>
			{/if}

			{#if activeFile?.code}
				<Button
					class="h-8 w-8 shrink-0"
					variant="ghost"
					size="icon"
					type="button"
					onclick={copyCode}
				>
					{#if clipboard.status === "success"}
						<span in:scale>
							<Check class="!size-3.5 text-[#10B981]" />
						</span>
					{:else}
						<span in:scale>
							<Copy class="!size-3.5 opacity-50" />
						</span>
					{/if}
				</Button>
			{/if}
		</div>
	</div>

	<div class="min-h-0 flex-1">
		{#if activeFile?.code}
			<Code code={activeFile.code} lang={activeFile.lang} highlight={activeFile.highlight} />
		{:else if activeFile?.externalUrl}
			<div class="flex h-full min-h-[20rem] items-center justify-center px-6">
				<div class="max-w-md text-center">
					<p class="text-foreground text-sm font-medium">
						{activeFile.externalLabel ?? activeFile.name}
					</p>
					<p class="text-muted-foreground mt-2 text-sm leading-6">
						This file is referenced from its source instead of being duplicated here.
					</p>
					<div class="mt-4 flex justify-center">
						<Button
							href={activeFile.externalUrl}
							target="_blank"
							variant="outline"
							size="sm"
						>
							<ExternalLink class="size-3.5" />
							<span>Open component docs</span>
						</Button>
					</div>
				</div>
			</div>
		{:else}
			<div
				class="text-muted-foreground flex h-full min-h-[20rem] items-center justify-center px-6 text-sm"
			>
				No code files are available for this block yet.
			</div>
		{/if}
	</div>
</div>
