<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Plus } from "@lucide/svelte/icons";
	import PromptInputButton from "./PromptInputButton.svelte";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<DropdownMenu.Trigger>
	<PromptInputButton class={className} {...props}>
		{#if children}
			{@render children()}
		{:else}
			<Plus class="size-4" />
		{/if}
	</PromptInputButton>
</DropdownMenu.Trigger>
