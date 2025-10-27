<script lang="ts">
	import { setContext } from "svelte";
	import { createReasoningContext } from "./reasoning-context.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		isStreaming?: boolean;
	}

	let {
		children,
		class: className,
		open = $bindable(),
		onOpenChange,
		isStreaming = false,
		...rest
	}: Props = $props();

	const context = createReasoningContext(open, onOpenChange, isStreaming);
	setContext("reasoning", context);

	// Bind context state to open prop if controlled
	$effect(() => {
		if (open !== undefined) {
			context.setOpen(open);
		}
	});

	// Handle streaming auto-open/close
	$effect(() => {
		if (isStreaming && !context.wasAutoOpened) {
			context.setOpen(true);
			context.wasAutoOpened = true;
		}

		if (!isStreaming && context.wasAutoOpened) {
			context.setOpen(false);
			context.wasAutoOpened = false;
		}
	});
</script>

<div class={className} {...rest}>
	{@render children()}
</div>
