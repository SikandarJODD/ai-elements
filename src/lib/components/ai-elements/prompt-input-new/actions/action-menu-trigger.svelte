<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Button, { type ButtonProps } from "../controls/button.svelte";

	let { children, ...restProps }: ButtonProps = $props();
</script>

<DropdownMenu.Trigger>
	{#snippet child({ props })}
		<Button {...props} {...restProps}>
			{#if children}
				{@render children()}
			{:else}
				<PlusIcon class="size-4" />
			{/if}
		</Button>
	{/snippet}
</DropdownMenu.Trigger>
