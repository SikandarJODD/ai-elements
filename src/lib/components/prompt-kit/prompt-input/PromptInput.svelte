<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { Tooltip as TooltipPrimitive } from "bits-ui";
	import {
		PromptInputClass,
		setPromptInputContext,
		type PromptInputSchema,
	} from "./prompt-input-context.svelte.js";
	import { untrack } from "svelte";
	import { watch } from "runed";

	let {
		class: className,
		isLoading = false,
		value,
		onValueChange,
		maxHeight = 240,
		onSubmit,
		children,
	}: PromptInputSchema & {
		class?: string;
		children: import("svelte").Snippet;
	} = $props();

	const contextInstance = new PromptInputClass({
		isLoading: untrack(() => isLoading),
		value: untrack(() => value),
		onValueChange: untrack(() => onValueChange),
		maxHeight: untrack(() => maxHeight),
		onSubmit: untrack(() => onSubmit),
		disabled: untrack(() => isLoading),
	});

	setPromptInputContext(contextInstance);

	// Sync props with context
	// $effect(() => {
	// 	contextInstance.isLoading = isLoading;
	// 	contextInstance.disabled = isLoading;
	// });
	watch(
		() => isLoading,
		() => {
			contextInstance.isLoading = isLoading;
			contextInstance.disabled = isLoading;
		}
	);

	watch(
		() => value,
		(newValue) => {
			if (newValue !== undefined) {
				contextInstance.value = newValue;
			}
		}
	);

	watch(
		() => onValueChange,
		(newValue) => {
			contextInstance.onValueChange = newValue;
		}
	);

	watch(
		() => maxHeight,
		() => {
			contextInstance.maxHeight = maxHeight;
		}
	);

	watch(
		() => onSubmit,
		() => {
			contextInstance.onSubmit = onSubmit;
		}
	);

	function handleClick() {
		contextInstance.textareaRef?.focus();
	}

	function handleKeyDown(e: KeyboardEvent) {
		// Only handle Enter key to focus textarea from wrapper
		// Don't intercept Space key as it prevents typing spaces in the textarea
		if (e.key === "Enter") {
			e.preventDefault();
			handleClick();
		}
	}
</script>

<TooltipPrimitive.Provider>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={cn(
			"border-input bg-background cursor-text rounded-3xl border p-2 shadow-xs",
			className
		)}
		onclick={handleClick}
		role="button"
		tabindex="-1"
	>
		<!-- onkeydown={handleKeyDown} -->
		{@render children()}
	</div>
</TooltipPrimitive.Provider>
