<script lang="ts">
	import { cn } from "$lib/utils";
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";
	import {
		ChainOfThoughtContext,
		setChainOfThoughtContext,
	} from "./chain-of-thought-context.svelte.js";
	import { untrack, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	// indexing

	interface ChainOfThoughtProps extends HTMLAttributes<HTMLDivElement> {
		open?: boolean;
		defaultOpen?: boolean;
		onOpenChange?: (open: boolean) => void;
		children: Snippet;
		class?: string;
	}

	let {
		open = $bindable(undefined),
		defaultOpen = false,
		onOpenChange,
		children,
		class: className,
		...restProps
	}: ChainOfThoughtProps = $props();

	// Create context instance with proper controllable state
	const context = new ChainOfThoughtContext({
		isOpen: open !== undefined ? open : untrack(() => defaultOpen),
		// svelte-ignore state_referenced_locally
		onOpenChange,
	});

	// Handle controlled mode synchronization
	$effect(() => {
		if (open !== undefined) {
			context.isOpen = open;
		}
	});

	// Set the context for child components
	setChainOfThoughtContext(context);
</script>

<Collapsible open={context.isOpen} class="w-full" onOpenChange={context.setIsOpen}>
	<div class={cn("w-full space-y-4", className)} {...restProps}>
		{@render children()}
	</div>
</Collapsible>
