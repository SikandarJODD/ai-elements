<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { PromptInputFooterProps } from "./types.js";

	let { class: className, children, ...props }: PromptInputFooterProps = $props();
</script>

<div class={cn("flex items-center justify-between gap-2 p-3", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>
