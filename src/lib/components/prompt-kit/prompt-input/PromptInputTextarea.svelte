<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import { getPromptInputContext } from "./prompt-input-context.svelte.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import { watch } from "runed";

	let {
		class: className,
		onkeydown,
		disableAutosize = false,
		...restProps
	}: HTMLTextareaAttributes & {
		disableAutosize?: boolean;
	} = $props();

	const context = getPromptInputContext();

	// Auto-resize functionality using watch from runed
	watch([() => context.value, () => context.maxHeight, () => disableAutosize], () => {
		if (disableAutosize) return;
		if (!context.textareaRef) return;

		if (context.textareaRef.scrollTop === 0) {
			context.textareaRef.style.height = "auto";
		}

		context.textareaRef.style.height =
			typeof context.maxHeight === "number"
				? `${Math.min(context.textareaRef.scrollHeight, context.maxHeight)}px`
				: `min(${context.textareaRef.scrollHeight}px, ${context.maxHeight})`;
	});

	function handleKeyDown(e: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			context.onSubmit?.();
		}
		onkeydown?.(e);
	}

	function handleInput(e: Event & { currentTarget: HTMLTextAreaElement }) {
		context.setValue(e.currentTarget.value);
	}
</script>

<Textarea
	bind:ref={context.textareaRef}
	value={context.value}
	oninput={handleInput}
	onkeydown={handleKeyDown}
	class={cn(
		"text-primary min-h-[44px] w-full resize-none border-none !bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
		className
	)}
	rows={1}
	disabled={context.disabled}
	{...restProps}
></Textarea>
