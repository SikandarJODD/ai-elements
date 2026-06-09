<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type GridFillerProps = HTMLAttributes<HTMLDivElement> & {
		/**
		 * The number of items in the grid.
		 */
		totalItems: number;
		/**
		 * Number of columns for small screens.
		 */
		smColumns?: number;
		/**
		 * Number of columns for medium screens.
		 */
		mdColumns?: number;
		/**
		 * Number of columns for large screens.
		 */
		lgColumns?: number;
	};

	let {
		totalItems,
		smColumns = 2,
		mdColumns = 0,
		lgColumns = 0,
		class: className = "",
		...rest
	}: GridFillerProps = $props();

	let actualMdColumns = $derived(mdColumns ?? smColumns);
	let actualLgColumns = $derived(lgColumns ?? actualMdColumns);

	// We need enough iterations to cover the maximum possible remainder.
	// For N columns, the remainder can be at most N-1.
	let maxFillers = $derived(Math.max(smColumns, actualMdColumns, actualLgColumns) - 1);
</script>

{#each { length: maxFillers } as _, i}
	{@const neededSm = (smColumns - (totalItems % smColumns)) % smColumns}
	{@const neededMd = (actualMdColumns - (totalItems % actualMdColumns)) % actualMdColumns}
	{@const neededLg = (actualLgColumns - (totalItems % actualLgColumns)) % actualLgColumns}
	{@const showSm = i < neededSm ? "sm:block" : "sm:hidden"}
	{@const showMd = i < neededMd ? "md:block" : "md:hidden"}
	{@const showLg = i < neededLg ? "lg:block" : "lg:hidden"}

	<!-- {#if showSm === 'sm:hidden' && showMd === 'md:hidden' && showLg === 'lg:hidden'}
		<div></div>
	{/if} -->
	<div
		class={cn("pointer-events-none hidden", showSm, showMd, showLg, className)}
		{...rest}
	></div>
{/each}
