<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import type { PromptInputHeaderProps } from "./types.js";

	let { class: className, children, ...props }: PromptInputHeaderProps = $props();
</script>

<div class={cn("flex flex-wrap items-center gap-2 p-3", className)} {...props}>
	{#if children}
		{@render children()}
	{/if}
</div>
