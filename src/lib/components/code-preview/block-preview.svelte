<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ExternalLink from "@lucide/svelte/icons/external-link";
	import type { BlockShowcaseItem } from "./types";

	interface BlockPreviewProps {
		item: BlockShowcaseItem;
	}

	let { item }: BlockPreviewProps = $props();

	let PreviewComponent = $derived(item.previewComponent);
	let previewHeight = $derived(item.previewHeight ?? 420);
	let previewTitle = $derived(item.previewTitle ?? "Preview");
</script>

<div class="flex h-full min-h-0 flex-col">
	<div class="border-b px-4 py-3">
		<p class="text-foreground text-sm font-medium">{previewTitle}</p>
		<!-- <p class="text-muted-foreground mt-1 text-sm">{previewDescription}</p> -->
	</div>

	<div class="min-h-0 flex-1 overflow-auto">
		{#if item.previewMode === "empty"}
			<div class="flex h-full min-h-[20rem] items-center justify-center p-6">
				<div class="max-w-md text-center">
					<p class="text-foreground text-base font-medium">No live preview yet</p>
					<p class="text-muted-foreground mt-2 text-sm leading-6">
						{item.previewDescription ??
							"This setup-focused recipe uses the code and reference panes only."}
					</p>
				</div>
			</div>
		{:else if item.previewMode === "iframe" && item.previewHref}
			<iframe
				src={item.previewHref}
				title={`${item.title} preview`}
				class="h-full min-h-[20rem] w-full border-0"
				loading="lazy"
			></iframe>
		{:else if item.previewMode === "inline" && PreviewComponent}
			<div
				class="bg-background p-4"
				style={`min-height: ${previewHeight}px;`}
			>
				<PreviewComponent />
			</div>
		{:else}
			<div class="flex h-full min-h-[20rem] items-center justify-center p-6">
				<div class="max-w-md text-center">
					<p class="text-foreground text-base font-medium">Preview unavailable</p>
					<p class="text-muted-foreground mt-2 text-sm leading-6">
						This recipe does not have a preview renderer configured yet.
					</p>

					{#if item.previewHref}
						<div class="mt-4 flex justify-center">
							<Button href={item.previewHref} target="_blank" variant="outline" size="sm">
								<ExternalLink class="size-3.5" />
								<span>Open preview</span>
							</Button>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
