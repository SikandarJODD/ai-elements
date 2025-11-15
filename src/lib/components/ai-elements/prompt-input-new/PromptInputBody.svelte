<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { PromptInputBodyProps } from "./types.js";

	let { class: className, children, ...props }: PromptInputBodyProps = $props();
</script>

<div class={cn("contents", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>

