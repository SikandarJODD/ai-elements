<script lang="ts">
	import { cn } from "$lib/utils";
	import { type Icon as IconType } from "@lucide/svelte";
	import DotIcon from "@lucide/svelte/icons/dot";
	import { getChainOfThoughtContext } from "./chain-of-thought-context.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface ChainOfThoughtStepProps extends HTMLAttributes<HTMLDivElement> {
		icon?: typeof IconType;
		label: string;
		description?: string;
		status?: "complete" | "active" | "pending";
		children?: Snippet;
		class?: string;
		delay?: number;
	}

	let {
		icon: Icon = DotIcon,
		label,
		description,
		status = "complete",
		children,
		class: className,
		delay,
		...restProps
	}: ChainOfThoughtStepProps = $props();

	const context = getChainOfThoughtContext();
	let isVisible = $state(false);
	let element: HTMLDivElement;

	const statusStyles = {
		complete: "text-muted-foreground",
		active: "text-foreground",
		pending: "text-muted-foreground/50",
	};

	// Calculate step index based on DOM position
	function getStepIndex(): number {
		if (!element?.parentElement) return 0;
		const steps = Array.from(element.parentElement.querySelectorAll("[data-chain-step]"));
		return steps.indexOf(element);
	}

	// Handle animation when content opens/closes
	$effect(() => {
		if (context.isOpen) {
			const stepIndex = getStepIndex();
			const calculatedDelay = delay ?? stepIndex * 150; // 150ms between each step
			const timer = setTimeout(() => {
				isVisible = true;
			}, calculatedDelay);

			return () => clearTimeout(timer);
		} else {
			isVisible = false;
		}
	});
</script>

<div
	bind:this={element}
	data-chain-step
	class={cn(
		"flex gap-2 text-sm transition-all duration-500 ease-out",
		statusStyles[status],
		isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
		className
	)}
	{...restProps}
>
	<div class="relative mt-0.5">
		<Icon class="size-4" />
		<div class="bg-border absolute top-7 bottom-0 left-1/2 -mx-px w-px"></div>
	</div>
	<div class="flex-1 space-y-2">
		<div>{label}</div>
		{#if description}
			<div class="text-muted-foreground text-xs">{description}</div>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
