<script lang="ts">
	import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		value?: string;
		onValueChange?: (value: string | undefined) => void;
		children?: import("svelte").Snippet;
	}

	let { value = $bindable(""), onValueChange, children, ...props }: Props = $props();
</script>

<Select.Root bind:value {onValueChange} type="single" {...props}>
	{#if children}
		{@render children()}
	{/if}
</Select.Root>
