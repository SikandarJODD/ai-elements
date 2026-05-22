<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { cn } from "$lib/utils";
	import Paperclip from "@lucide/svelte/icons/paperclip";
	import X from "@lucide/svelte/icons/x";
	import type { HTMLAttributes } from "svelte/elements";
	import type { MessageAttachmentData } from "../context/message-context.svelte.js";
	import MessageAttachmentPreview from "./MessageAttachmentPreview.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		data: MessageAttachmentData;
		class?: string;
		onRemove?: () => void;
	}

	let { data, class: className, onRemove, ...restProps }: Props = $props();

	let filename = $derived(data.filename || "");
	let isImage = $derived(!!data.url && !!data.mediaType?.startsWith("image/"));
	let attachmentLabel = $derived(filename || (isImage ? "Image" : "Attachment"));

	function handleRemove(event: MouseEvent) {
		event.stopPropagation();
		onRemove?.();
	}
</script>

<div class={cn("group relative size-24 overflow-hidden rounded-lg", className)} {...restProps}>
	{#if isImage}
		<MessageAttachmentPreview {data} />
		{#if onRemove}
			<Button
				aria-label="Remove attachment"
				class="bg-background/80 hover:bg-background absolute top-2 right-2 z-10 size-6 rounded-full p-0 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 [&>svg]:size-3"
				onclick={handleRemove}
				type="button"
				variant="ghost"
			>
				<X />
				<span class="sr-only">Remove</span>
			</Button>
		{/if}
	{:else}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<div
							{...props}
							class="bg-muted text-muted-foreground flex size-full shrink-0 items-center justify-center rounded-lg"
						>
							<Paperclip class="size-4" />
						</div>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{attachmentLabel}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
		{#if onRemove}
			<Button
				aria-label="Remove attachment"
				class="hover:bg-accent absolute top-2 right-2 z-10 size-6 shrink-0 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100 [&>svg]:size-3"
				onclick={handleRemove}
				type="button"
				variant="ghost"
			>
				<X />
				<span class="sr-only">Remove</span>
			</Button>
		{/if}
	{/if}
</div>
