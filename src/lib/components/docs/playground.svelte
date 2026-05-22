<script lang="ts">
	import type { Snippet } from "svelte";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Code from "$lib/components/docs/code/code-block/index.js";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import type { AnalyticsRegistry } from "$lib/utils/analytics.js";

	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

	type Props = {
		code: string;
		replay?: boolean;
		class?: string;
		children: Snippet<[]>;
		highlight?: (number | [number, number])[];
		// Analytics props
		component?: string;
		registry?: AnalyticsRegistry;
		source?: string;
		isExpand?: boolean;
	};

	let {
		children,
		code,
		class: className = undefined,
		replay = false,
		highlight = [],
		component,
		registry,
		isExpand = false,
		source = "copy_example",
	}: Props = $props();

	let remountCount = $state(0);

	let tab: "preview" | "code" = $state("preview");
</script>

<Tabs.Root bind:value={tab} class="mt-4 w-full">
	<Tabs.List>
		<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
		<Tabs.Trigger value="code">Code</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="preview" class="size-full">
		<div
			class={cn(
				"border-border relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border",
				className
			)}
		>
			{#if replay}
				<Button
					size="icon"
					variant="ghost"
					class="absolute top-3 right-3 z-10"
					onclick={() => remountCount++}
				>
					<RefreshCwIcon class="size-4" />
				</Button>
			{/if}
			{#key remountCount}
				<div class="flex h-full w-full items-center justify-center p-4 md:p-6">
					{@render children()}
				</div>
			{/key}
		</div>
	</Tabs.Content>
	<Tabs.Content value="code" class="w-full pb-4">
		<div
			class={cn("border-border relative flex min-h-100 w-full rounded-lg border", className)}
		>
			{#if isExpand}
				<!-- <Code.Overflow class="w-full data-[collapsed=true]:max-h-[380px]"> -->
				<Code.Root
					{highlight}
					lang="svelte"
					{code}
					class="no-scrollbar w-full border-none bg-transparent"
				>
					<Code.CopyButton
						variant="secondary"
						class="z-30"
						size="icon"
						aria-label={`Copy ${component}`}
						{component}
						{registry}
						{source}
					/>
				</Code.Root>
				<!-- </Code.Overflow> -->
			{:else}
				<Code.Overflow class="w-full data-[collapsed=true]:max-h-95">
					<Code.Root
						{highlight}
						lang="svelte"
						{code}
						class="no-scrollbar w-full border-none bg-transparent"
					>
						<Code.CopyButton
							variant="secondary"
							class="z-30"
							size="icon"
							aria-label={`Copy ${component}`}
							{component}
							{registry}
							{source}
						/>
					</Code.Root>
				</Code.Overflow>
			{/if}
		</div>
	</Tabs.Content>
</Tabs.Root>
