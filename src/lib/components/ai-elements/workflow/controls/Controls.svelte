<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { Controls as ControlsPrimitive, type ControlsProps } from "@xyflow/svelte";

	let { class: className, ...restProps }: ControlsProps = $props();
</script>

<ControlsPrimitive
	class={cn(
		"bg-card gap-px overflow-hidden rounded-md border p-1 shadow-none!",
		"[&>button]:hover:bg-secondary! [&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent!",
		className
	)}
	{...restProps}
/>
