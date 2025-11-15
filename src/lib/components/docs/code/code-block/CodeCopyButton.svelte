<script lang="ts">
	import { CopyButton } from "$lib/components/docs/code/copy-button/index.js";
	import { cn } from "$lib/utils/utils";
	import { useCodeCopyButton } from "./code.svelte.js";
	import type { CodeCopyButtonProps } from "./types.js";

	let {
		ref = $bindable(null),
		variant = "ghost",
		size = "icon",
		class: className,
		// Analytics props
		component,
		registry,
		source,
		...rest
	}: CodeCopyButtonProps = $props();

	const copyButton = useCodeCopyButton();
</script>

<CopyButton
	class={cn("absolute top-2 right-2", className)}
	text={copyButton.code}
	{variant}
	{size}
	{component}
	{registry}
	{source}
	{...rest}
/>
