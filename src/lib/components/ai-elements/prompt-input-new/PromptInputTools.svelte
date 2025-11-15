<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { PromptInputToolsProps } from "./types.js";

	let { class: className, children, ...props }: PromptInputToolsProps = $props();
</script>

<div class={cn("flex items-center gap-2", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>

