<script lang="ts">
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button/index.js";
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "$lib/components/ui/collapsible/index.js";
	import { getWebPreviewContext, type LogEntry } from "./web-preview-context.svelte.js";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";

	let {
		logs = [],
		class: className,
		children,
		...restProps
	}: {
		logs?: LogEntry[];
		class?: string;
		children?: import("svelte").Snippet;
		[key: string]: any;
	} = $props();

	let context = getWebPreviewContext();

	// Generate unique IDs for each log entry using crypto.randomUUID()
	let logsWithIds = $derived.by(() =>
		logs.map((log) => ({
			...log,
			id: crypto.randomUUID(),
		}))
	);
</script>

<Collapsible
	class={cn("bg-muted/50 border-t font-mono text-sm", className)}
	onOpenChange={context.setConsoleOpen.bind(context)}
	open={context.consoleOpen}
	{...restProps}
>
	<CollapsibleTrigger>
		<Button
			class="hover:bg-muted/50 flex w-full items-center justify-between p-4 text-left font-medium"
			variant="ghost"
		>
			Console
			<ChevronDown
				class={cn(
					"h-4 w-4 transition-transform duration-200",
					context.consoleOpen && "rotate-180"
				)}
			/>
		</Button>
	</CollapsibleTrigger>
	<CollapsibleContent
		class={cn(
			"px-4 pb-4",
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in outline-none"
		)}
	>
		<div class="max-h-48 space-y-1 overflow-y-auto">
			{#if logsWithIds.length === 0}
				<p class="text-muted-foreground">No console output</p>
			{:else}
				{#each logsWithIds as log (log.id)}
					<div
						class={cn(
							"text-xs",
							log.level === "error" && "text-destructive",
							log.level === "warn" && "text-yellow-600",
							log.level === "log" && "text-foreground"
						)}
					>
						<span class="text-muted-foreground">
							{log.timestamp.toLocaleTimeString()}
						</span>
						{log.message}
					</div>
				{/each}
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</div>
	</CollapsibleContent>
</Collapsible>
