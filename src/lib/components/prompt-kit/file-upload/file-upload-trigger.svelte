<script lang="ts">
	import { getContext } from 'svelte';
	import type { FileUploadContext } from './file-upload-context.svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/utils';

	type Props = {
		asChild?: boolean;
		class?: string;
		children: Snippet;
		onclick?: (e: MouseEvent) => void;
		[key: string]: any;
	};

	let { asChild = false, class: className, children, onclick, ...restProps }: Props = $props();

	const context = getContext<FileUploadContext>('file-upload');

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		context?.inputRef?.click();
		onclick?.(e);
	}
</script>

{#if asChild}
	<div
		role="button"
		tabindex="0"
		class={className}
		onclick={handleClick}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handleClick(e as any);
			}
		}}
		{...restProps}
	>
		{@render children()}
	</div>
{:else}
	<button type="button" class={className} onclick={handleClick} {...restProps}>
		{@render children()}
	</button>
{/if}
