<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		open?: boolean;
		children?: import("svelte").Snippet;
	}

	let { open = $bindable(false), children, ...props }: Props = $props();
</script>

<DropdownMenu.Root bind:open {...props}>
	{#if children}
		{@render children()}
	{/if}
</DropdownMenu.Root>
