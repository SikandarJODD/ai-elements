<script lang="ts">
	import { cn } from "$lib/utils";
	import CopyButton from "$lib/components/ai-elements/copy-button/copy-button.svelte";
	import { useCodeCopyButton } from "./code.svelte.js";
	import type { CodeCopyButtonProps } from "./types.js";

	let {
		ref = $bindable(null),
		variant = "ghost",
		size = "icon",
		class: className,
		...rest
	}: CodeCopyButtonProps = $props();

	const copyButton = useCodeCopyButton();
</script>

<CopyButton
	class={cn("absolute top-2 right-2", className)}
	text={copyButton.code}
	{variant}
	{size}
	{...rest}
/>
