<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { cn } from "$lib/utils";
	import type { MessageAttachmentData } from "../context/message-context.svelte.js";

	interface Props {
		data: MessageAttachmentData;
		class?: string;
	}

	let { data, class: className }: Props = $props();

	let ratio = $state(1);
	let src = $derived(data.url ?? "");
	let previewFrameStyle = $derived.by(() => {
		const safeRatio = ratio > 0 ? ratio : 1;

		if (safeRatio >= 1) {
			return `width: min(94vw, 1100px); max-width: min(94vw, 1100px); max-height: min(85vh, 900px); aspect-ratio: ${safeRatio};`;
		}

		return `height: min(85vh, 900px); max-width: min(94vw, 1100px); max-height: min(85vh, 900px); aspect-ratio: ${safeRatio};`;
	});

	function handleImageLoad(event: Event) {
		const image = event.currentTarget as HTMLImageElement;

		if (image.naturalWidth > 0 && image.naturalHeight > 0) {
			ratio = image.naturalWidth / image.naturalHeight;
		}
	}
</script>

<Dialog.Root>
	<Dialog.Trigger
		aria-label={`Preview ${data.filename || "image attachment"}`}
		class={cn("block size-full cursor-zoom-in overflow-hidden rounded-lg", className)}
		type="button"
	>
		<img
			alt={data.filename || "attachment"}
			class="size-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]"
			height={96}
			onload={handleImageLoad}
			{src}
			width={96}
		/>
	</Dialog.Trigger>

	<Dialog.Content
		class="flex w-auto max-w-none items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-none"
		showCloseButton={false}
	>
		<Dialog.Header class="sr-only">
			<Dialog.Title>{data.filename || "Image attachment"}</Dialog.Title>
			<Dialog.Description>Preview image attachment</Dialog.Description>
		</Dialog.Header>

		<div class="flex min-h-[40vh] w-[min(94vw,1100px)] items-center justify-center">
			<div
				class="flex items-center justify-center overflow-hidden rounded-2xl bg-black/95"
				style={previewFrameStyle}
			>
				<img
					alt={data.filename || "attachment preview"}
					class="size-full object-contain object-center"
					onload={handleImageLoad}
					{src}
				/>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
