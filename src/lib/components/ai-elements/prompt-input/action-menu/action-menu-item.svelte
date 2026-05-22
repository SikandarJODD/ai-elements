<script lang="ts">
	import { cn } from "$lib/utils";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
		onSelect?: (event: Event) => void;
	}

	let { class: className, children, onSelect, ...props }: Props = $props();
</script>

<DropdownMenu.Item class={cn(className)} {onSelect} {...props}>
	{#if children}
		{@render children()}
	{/if}
</DropdownMenu.Item>
