<script lang="ts">
	import { InputGroupButton } from "$lib/components/ui/input-group/index.js";
	import type { PromptInputButtonProps } from "./types.js";

	let {
		variant = "ghost",
		size = "icon-sm",
		children,
		...props
	}: PromptInputButtonProps = $props();
</script>

<InputGroupButton {variant} {size} {...props}>
	{#if children}
		{@render children()}
	{/if}
</InputGroupButton>
