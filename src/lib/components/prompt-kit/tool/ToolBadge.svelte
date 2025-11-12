<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { ToolState } from "./types.js";

	let {
		state,
		class: className,
	}: {
		state: ToolState;
		class?: string;
	} = $props();

	let baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
</script>

{#if state === "input-streaming"}
	<span
		class={cn(
			baseClasses,
			"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
			className
		)}
	>
		Processing
	</span>
{:else if state === "input-available"}
	<span
		class={cn(
			baseClasses,
			"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
			className
		)}
	>
		Ready
	</span>
{:else if state === "output-available"}
	<span
		class={cn(
			baseClasses,
			"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
			className
		)}
	>
		Completed
	</span>
{:else if state === "output-error"}
	<span
		class={cn(
			baseClasses,
			"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
			className
		)}
	>
		Error
	</span>
{:else}
	<span
		class={cn(
			baseClasses,
			"bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
			className
		)}
	>
		Pending
	</span>
{/if}
