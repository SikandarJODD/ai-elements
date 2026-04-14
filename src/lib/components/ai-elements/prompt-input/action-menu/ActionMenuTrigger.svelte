<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Button from "../controls/Button.svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<DropdownMenu.Trigger>
	<Button class={className} {...props}>
		{#if children}
			{@render children()}
		{:else}
			<PlusIcon class="size-4" />
		{/if}
	</Button>
</DropdownMenu.Trigger>
