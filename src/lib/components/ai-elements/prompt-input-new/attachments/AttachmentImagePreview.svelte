<script lang="ts">
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Dialog from "$lib/components/ui/dialog";
	import { getAttachmentsContext } from "../context/attachments.svelte.js";
	import { cn } from "$lib/utils";
	import type { FileWithId } from "../context/types.js";

	interface Props {
		data: FileWithId;
		class?: string;
	}

	let { data, class: className, ...props }: Props = $props();

	let attachments = getAttachmentsContext();
	let open = $state(false);
	let ratio = $state(1);
	let currentImageId = $state("");

	let imageFiles = $derived(
		attachments.files.filter((file) => file.mediaType?.startsWith("image/") && file.url)
	);

	let currentIndex = $derived.by(() => {
		let index = imageFiles.findIndex((file) => file.id === currentImageId);
		return index >= 0 ? index : 0;
	});

	let currentImage = $derived.by(() => {
		return imageFiles[currentIndex] ?? data;
	});

	function syncCurrentImage(id: string) {
		currentImageId = id;
		ratio = 1;
	}

	function handleImageLoad(event: Event) {
		let image = event.currentTarget as HTMLImageElement;
		if (image.naturalWidth > 0 && image.naturalHeight > 0) {
			ratio = image.naturalWidth / image.naturalHeight;
		}
	}

	function showPreviousImage() {
		if (imageFiles.length <= 1) return;
		let nextIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
		syncCurrentImage(imageFiles[nextIndex].id);
	}

	function showNextImage() {
		if (imageFiles.length <= 1) return;
		let nextIndex = (currentIndex + 1) % imageFiles.length;
		syncCurrentImage(imageFiles[nextIndex].id);
	}

	function handleDialogKeydown(event: KeyboardEvent) {
		if (!open) return;

		if (event.key === "ArrowLeft") {
			event.preventDefault();
			showPreviousImage();
		}

		if (event.key === "ArrowRight") {
			event.preventDefault();
			showNextImage();
		}
	}

	$effect(() => {
		if (!open) {
			currentImageId = data.id;
			ratio = 1;
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		aria-label={`Preview ${data.filename || "image attachment"}`}
		class={cn("block size-full cursor-zoom-in overflow-hidden rounded-md", className)}
		onclick={() => syncCurrentImage(data.id)}
		type="button"
		{...props}
	>
		<img
			alt={data.filename || "attachment"}
			class="size-full rounded-md object-cover transition-transform duration-200 group-hover:scale-[1.03]"
			height={56}
			onload={handleImageLoad}
			src={data.url}
			width={56}
		/>
	</Dialog.Trigger>

	<Dialog.Content
		class="w-[min(92vw,960px)] max-w-[min(92vw,960px)] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-[min(92vw,960px)]"
		onkeydown={handleDialogKeydown}
	>
		<div class="flex items-center justify-center">
			<div style:width="min(92vw, 960px)" style:max-height="min(80vh, 720px)">
				<AspectRatio.Root class="overflow-hidden rounded-2xl bg-black/95" ratio={ratio}>
					<img
						alt={currentImage.filename || "attachment preview"}
						class="size-full object-contain"
						onload={handleImageLoad}
						src={currentImage.url}
					/>
				</AspectRatio.Root>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
