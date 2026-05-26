<script lang="ts">
	import { cn } from "$lib/utils";
	import { getWebPreviewContext } from "./web-preview-context.svelte.js";

	let {
		value = $bindable(""),
		onchange,
		onkeydown,
		class: className,
		...restProps
	}: {
		value?: string;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		class?: string;
		[key: string]: any;
	} = $props();

	let context = getWebPreviewContext();

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			let target = event.target as HTMLInputElement;
			context.setUrl(target.value);
			if (value !== undefined) {
				value = target.value;
			}
		}
		onkeydown?.(event);
	}

	function handleChange(event: Event) {
		let target = event.target as HTMLInputElement;
		if (value !== undefined) {
			value = target.value;
		}
		onchange?.(event);
	}

	let displayValue = $derived.by(() => value ?? context.url);
</script>

<input
	class={cn(
		"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-8 flex-1 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	onchange={handleChange}
	onkeydown={handleKeyDown}
	placeholder="Enter URL..."
	value={displayValue}
	{...restProps}
/>
