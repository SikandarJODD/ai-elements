<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import * as AspectRatio from '$lib/components/ui/aspect-ratio/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cn } from '$lib/utils.js';

	type PreviewImageProps = Omit<ComponentProps<typeof Dialog.Trigger>, 'children'> & {
		alt: string;
		src: string;
		title?: string;
		children?: Snippet;
	};

	let {
		ref = $bindable(null),
		class: className,
		alt,
		src,
		title,
		children,
		...restProps
	}: PreviewImageProps = $props();

	let aspectRatio = $state(1);

	const dialogTitle = $derived(title ?? alt);

	$effect(() => {
		src;
		aspectRatio = 1;
	});

	function handleImageLoad(event: Event) {
		const image = event.currentTarget as HTMLImageElement;

		if (!image.naturalWidth || !image.naturalHeight) {
			return;
		}

		aspectRatio = image.naturalWidth / image.naturalHeight;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger bind:ref class={cn(className)} {...restProps}>
		{@render children?.()}
	</Dialog.Trigger>

	<Dialog.Content
		class="gap-0 overflow-hidden border border-border/70 bg-background/95 p-3 sm:max-w-4xl"
	>
		<Dialog.Header class="sr-only">
			<Dialog.Title>{dialogTitle}</Dialog.Title>
			<Dialog.Description>Image preview for {dialogTitle}.</Dialog.Description>
		</Dialog.Header>

		<AspectRatio.Root class="overflow-hidden rounded-xl bg-muted/20" ratio={aspectRatio}>
			<img
				alt={alt}
				class="size-full object-contain"
				onload={handleImageLoad}
				src={src}
			/>
		</AspectRatio.Root>
	</Dialog.Content>
</Dialog.Root>
