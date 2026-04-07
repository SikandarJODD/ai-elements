<script lang="ts">
	import { cn } from "$lib/utils";
	// import * as Select from "$lib/components/ui/select/index.js";

	interface Props {
		class?: string;
		placeholder?: string;
		value?: string;
	}

	let { class: className, placeholder, value, ...props }: Props = $props();
</script>

<!-- There is no Select Value in Shadcn Svelte so it convert into a div with placeholder content inside it -->
<div class={cn(className)} {...props}>
	{#if placeholder && !value}
		{placeholder}
	{/if}
	{#if value}
		{value}
	{/if}
</div>
<!-- <Select.Value class={cn(className)} {placeholder} {...props} /> -->
