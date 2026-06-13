<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Button from "../controls/button.svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Trigger>
	{#snippet child({ props })}
		<Button class={className} {...props} {...restProps}>
			{#if children}
				{@render children()}
			{:else}
				<PlusIcon class="size-4" />
			{/if}
		</Button>
	{/snippet}
</DropdownMenu.Trigger>
