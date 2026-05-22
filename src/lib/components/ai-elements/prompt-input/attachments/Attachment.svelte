<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { getAttachmentsContext } from "../context/attachments.svelte.js";
	import type { PromptInputAttachment } from "../context/types.js";
	import AttachmentImagePreview from "./AttachmentImagePreview.svelte";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import XIcon from "@lucide/svelte/icons/x";

	interface Props {
		data: PromptInputAttachment;
		class?: string;
	}

	let { data, class: className, ...props }: Props = $props();

	let attachmentsContext = getAttachmentsContext();
	let displayUrl = $derived(data.previewUrl ?? data.remoteUrl);

	let mediaType = $derived(data.mediaType?.startsWith("image/") && displayUrl ? "image" : "file");
</script>

<div
	class={cn(
		"group relative rounded-md border",
		mediaType === "image" ? "size-16" : "h-8 w-auto max-w-full",
		className
	)}
	{...props}
>
	{#if mediaType === "image"}
		<AttachmentImagePreview {data} />
	{:else}
		<div
			class="text-muted-foreground flex size-full max-w-full cursor-pointer items-center justify-start gap-2 overflow-hidden px-2"
		>
			<PaperclipIcon class="size-4 shrink-0" />
			<Tooltip.Root delayDuration={400}>
				<Tooltip.Trigger class="min-w-0 flex-1">
					<h4 class="w-full truncate text-left text-sm font-medium">
						{data.filename || "Unknown file"}
					</h4>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<div class="text-xs">
						<h4
							class="max-w-60 overflow-hidden text-left text-sm font-semibold wrap-break-word whitespace-normal"
						>
							{data.filename || "Unknown file"}
						</h4>
						{#if data.mediaType}
							<div>{data.mediaType}</div>
						{/if}
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	{/if}
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger>
			{#snippet child({ props: tooltipTriggerProps })}
				<Button
					aria-label={mediaType === "image" ? "Remove image" : "Remove file"}
					class="absolute top-0.5 right-0.5 size-5 rounded-full opacity-0 group-hover:opacity-100"
					{...tooltipTriggerProps}
					onclick={(event) => {
						event.stopPropagation();
						attachmentsContext.remove(data.id);
					}}
					size="icon"
					type="button"
					variant="secondary"
				>
					<XIcon class="size-3" />
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			{mediaType === "image" ? "Remove image" : "Remove file"}
		</Tooltip.Content>
	</Tooltip.Root>
</div>
