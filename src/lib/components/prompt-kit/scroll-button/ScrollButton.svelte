<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import { type ButtonSize, type ButtonVariant } from "$lib/components/ui/button/index.js";

	export type ScrollButtonProps = {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		ref?: HTMLElement | null;
		onclick?: (event: MouseEvent) => void;
	};
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import { getScrollContext } from "./scroll-context.svelte.js";

	let {
		class: className,
		variant = "outline",
		size = "sm",
		ref = $bindable(null),
		onclick,
		...restProps
	}: ScrollButtonProps = $props();

	const scrollContext = getScrollContext();
	const isAtBottom = $derived(scrollContext.isAtBottom);

	const handleClick = (event: MouseEvent) => {
		scrollContext.scrollToBottom();
		onclick?.(event);
	};
</script>

<Button
	bind:ref
	{variant}
	{size}
	class={cn(
		"h-10 w-10 rounded-full transition-all duration-150 ease-out",
		!isAtBottom
			? "translate-y-0 scale-100 opacity-100"
			: "pointer-events-none translate-y-4 scale-95 opacity-0",
		className
	)}
	onclick={handleClick}
>
	<ChevronDown class="h-5 w-5" />
</Button>
