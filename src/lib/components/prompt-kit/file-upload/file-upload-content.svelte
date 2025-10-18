<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { FileUploadContext } from './file-upload-context.svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/utils';

	type Props = {
		class?: string;
		children?: Snippet;
		[key: string]: any;
	};

	let { class: className, children, ...restProps }: Props = $props();

	const context = getContext<FileUploadContext>('file-upload');
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});

	const shouldRender = $derived(
		context?.isDragging && mounted && !context?.disabled
	);
</script>

{#if shouldRender}
	<div
		class={cn(
			'bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm',
			'animate-in fade-in-0 slide-in-from-bottom-10 zoom-in-90 duration-150',
			className
		)}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
