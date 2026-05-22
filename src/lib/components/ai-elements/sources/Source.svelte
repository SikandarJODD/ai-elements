<script lang="ts">
	import { cn } from "$lib/utils";
	import BookIcon from "@lucide/svelte/icons/book";

	interface Props {
		class?: string;
		href?: string;
		title?: string;
		children?: any;
		[key: string]: any;
	}

	let { class: className = "", href, title, children, ...restProps }: Props = $props();
</script>

<a
	class={cn("flex items-center gap-2", className)}
	{href}
	rel="noreferrer"
	target="_blank"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<BookIcon class="h-4 w-4" />
		<span class="block font-medium">{title}</span>
	{/if}
</a>
