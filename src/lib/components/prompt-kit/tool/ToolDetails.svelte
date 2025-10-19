<script lang="ts">
	import { getToolContext } from './tool-context.svelte.js';
	import { cn } from '$lib/utils/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className,
		...restProps
	}: {
		class?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const context = getToolContext();

	function formatValue(value: unknown): string {
		if (value === null) return 'null';
		if (value === undefined) return 'undefined';
		if (typeof value === 'string') return value;
		if (typeof value === 'object') {
			return JSON.stringify(value, null, 2);
		}
		return String(value);
	}

	const { input, output, state, toolCallId, errorText } = $derived(context.toolPart);
</script>

<div class={cn('bg-background space-y-3 p-3', className)} {...restProps}>
	{#if input && Object.keys(input).length > 0}
		<div>
			<h4 class="text-muted-foreground mb-2 text-sm font-medium">Input</h4>
			<div class="bg-background rounded border p-2 font-mono text-sm">
				{#each Object.entries(input) as [key, value]}
					<div class="mb-1">
						<span class="text-muted-foreground">{key}:</span>
						<span>{formatValue(value)}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if output}
		<div>
			<h4 class="text-muted-foreground mb-2 text-sm font-medium">Output</h4>
			<div class="bg-background max-h-60 overflow-auto rounded border p-2 font-mono text-sm">
				<pre class="whitespace-pre-wrap">{formatValue(output)}</pre>
			</div>
		</div>
	{/if}

	{#if state === 'output-error' && errorText}
		<div>
			<h4 class="mb-2 text-sm font-medium text-red-500">Error</h4>
			<div
				class="bg-background rounded border border-red-200 p-2 text-sm dark:border-red-950 dark:bg-red-900/20"
			>
				{errorText}
			</div>
		</div>
	{/if}

	{#if state === 'input-streaming'}
		<div class="text-muted-foreground text-sm">Processing tool call...</div>
	{/if}

	{#if toolCallId}
		<div class="text-muted-foreground border-t border-blue-200 pt-2 text-xs">
			<span class="font-mono">Call ID: {toolCallId}</span>
		</div>
	{/if}
</div>
