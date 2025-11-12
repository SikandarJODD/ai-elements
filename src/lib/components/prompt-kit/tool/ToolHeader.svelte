<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Settings from "@lucide/svelte/icons/settings";
	import XCircle from "@lucide/svelte/icons/x-circle";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import { Button } from "$lib/components/ui/button/index.js";
	import { CollapsibleTrigger } from "$lib/components/ui/collapsible/index.js";
	import ToolBadge from "./ToolBadge.svelte";
	import type { ToolPart } from "./types.js";
	import type { Component } from "svelte";
	import { getContext } from "svelte";

	let { class: className }: { class?: string } = $props();

	const toolPart = getContext<ToolPart>("toolPart");

	function getStateIcon(): Component {
		switch (toolPart.state) {
			case "input-streaming":
				return Loader2;
			case "input-available":
				return Settings;
			case "output-available":
				return CheckCircle2;
			case "output-error":
				return XCircle;
			default:
				return Settings;
		}
	}

	function getStateIconClass(): string {
		switch (toolPart.state) {
			case "input-streaming":
				return "h-4 w-4 animate-spin text-blue-500";
			case "input-available":
				return "h-4 w-4 text-orange-500";
			case "output-available":
				return "h-4 w-4 text-green-500";
			case "output-error":
				return "h-4 w-4 text-red-500";
			default:
				return "text-muted-foreground h-4 w-4";
		}
	}

	const StateIcon = $derived(getStateIcon());
	const stateIconClass = $derived(getStateIconClass());
</script>

<CollapsibleTrigger>
	{#snippet child({ props })}
		<Button
			{...props}
			variant="ghost"
			class={cn(
				"bg-background h-auto w-full justify-between rounded-b-none px-3 py-2 font-normal",
				className
			)}
		>
			<div class="flex items-center gap-2">
				<StateIcon class={stateIconClass} />
				<span class="font-mono text-sm font-medium">
					{toolPart.type}
				</span>
				<ToolBadge state={toolPart.state} />
			</div>
			<ChevronDown class="h-4 w-4" />
		</Button>
	{/snippet}
</CollapsibleTrigger>
