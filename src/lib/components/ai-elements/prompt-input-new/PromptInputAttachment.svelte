<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { Paperclip, X } from "@lucide/svelte/icons";
	import { getPromptInputAttachments } from "./prompt-input-context.svelte.js";
	import type { PromptInputAttachmentProps } from "./types.js";

	let { data, class: className, ...props }: PromptInputAttachmentProps = $props();

	const attachments = getPromptInputAttachments();

	const mediaType = $derived(data.mediaType?.startsWith("image/") && data.url ? "image" : "file");
</script>

<div
	class={cn(
		"group relative rounded-md border",
		mediaType === "image" ? "h-14 w-14" : "h-8 w-auto max-w-full",
		className
	)}
	{...props}
>
	{#if mediaType === "image"}
		<img
			alt={data.filename || "attachment"}
			class="size-full rounded-md object-cover"
			height={56}
			src={data.url}
			width={56}
		/>
	{:else}
		<div
			class="text-muted-foreground flex size-full max-w-full cursor-pointer items-center justify-start gap-2 overflow-hidden px-2"
		>
			<Paperclip class="size-4 shrink-0" />
			<Tooltip.Root delayDuration={400}>
				<Tooltip.Trigger class="min-w-0 flex-1">
					<h4 class="w-full truncate text-left text-sm font-medium">
						{data.filename || "Unknown file"}
					</h4>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<div class="text-muted-foreground text-xs">
						<h4
							class="max-w-[240px] overflow-hidden text-left text-sm font-semibold break-words whitespace-normal"
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
	<Button
		aria-label="Remove attachment"
		class="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
		onclick={() => attachments.remove(data.id)}
		size="icon"
		type="button"
		variant="outline"
	>
		<X class="h-3 w-3" />
	</Button>
</div>
