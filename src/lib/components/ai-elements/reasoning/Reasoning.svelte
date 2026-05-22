<script lang="ts">
	import { cn } from "$lib/utils";
	import { watch } from "runed";
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";
	import { ReasoningContext, setReasoningContext } from "./reasoning-context.svelte";

	interface Props {
		class?: string;
		isStreaming?: boolean;
		open?: boolean;
		defaultOpen?: boolean;
		onOpenChange?: (open: boolean) => void;
		duration?: number;
		children?: import("svelte").Snippet;
	}

	let {
		class: className = "",
		isStreaming = false,
		open = $bindable(),
		defaultOpen = true,
		onOpenChange,
		duration = $bindable(),
		children,
		...props
	}: Props = $props();

	let AUTO_CLOSE_DELAY = 1000;
	let MS_IN_S = 1000;

	// Create the reasoning context
	let reasoningContext = new ReasoningContext({
		isStreaming,
		isOpen: open ?? defaultOpen,
		duration: duration ?? 0,
	});

	// Set up controllable state for open
	let isOpen = $state(open ?? defaultOpen);
	let currentDuration = $state(duration ?? 0);
	let hasAutoClosed = $state(false);
	let startTime = $state<number | null>(null);

	// Sync external props to context and local state
	$effect(() => {
		reasoningContext.isStreaming = isStreaming;
	});

	$effect(() => {
		if (open !== undefined) {
			isOpen = open;
			reasoningContext.isOpen = open;
		}
	});

	$effect(() => {
		if (duration !== undefined) {
			currentDuration = duration;
			reasoningContext.duration = duration;
		}
	});

	// Track duration when streaming starts and ends
	watch(
		() => isStreaming,
		(isStreamingValue) => {
			if (isStreamingValue) {
				if (startTime === null) {
					startTime = Date.now();
				}
			} else if (startTime !== null) {
				let newDuration = Math.ceil((Date.now() - startTime) / MS_IN_S);
				currentDuration = newDuration;
				reasoningContext.duration = newDuration;
				if (duration !== undefined) {
					duration = newDuration;
				}
				startTime = null;
			}
		}
	);

	// Auto-open when streaming starts, auto-close when streaming ends (once only)
	watch(
		() => [isStreaming, isOpen, defaultOpen, hasAutoClosed] as const,
		([isStreamingValue, isOpenValue, defaultOpenValue, hasAutoClosedValue]) => {
			if (defaultOpenValue && !isStreamingValue && isOpenValue && !hasAutoClosedValue) {
				// Add a small delay before closing to allow user to see the content
				let timer = setTimeout(() => {
					handleOpenChange(false);
					hasAutoClosed = true;
				}, AUTO_CLOSE_DELAY);

				return () => clearTimeout(timer);
			}
		}
	);

	let handleOpenChange = (newOpen: boolean) => {
		isOpen = newOpen;
		reasoningContext.setIsOpen(newOpen);

		if (open !== undefined) {
			open = newOpen;
		}

		onOpenChange?.(newOpen);
	};

	// Set the context for child components
	setReasoningContext(reasoningContext);
</script>

<Collapsible
	class={cn("not-prose mb-4", className)}
	bind:open={isOpen}
	onOpenChange={handleOpenChange}
	{...props}
>
	{@render children?.()}
</Collapsible>
