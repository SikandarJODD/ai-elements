<script lang="ts">
	import { tick } from "svelte";
	import { watch } from "runed";
	import * as Code from "./index";
	import type { CodeBlock as MagicCode } from "./index";
	import { CopyButton } from "$lib/components/ui/copy-button";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Svelte, TypeScript, Terminal } from "$lib/components/icons";

	type Props = {
		code: MagicCode[];
	};

	let { code }: Props = $props();
	const MAX_BODY_HEIGHT = 550;
	let selectedValue = $state("0");
	let codeBodyRef: HTMLDivElement | undefined = $state();
	let scrollAreaHeight = $state<number | undefined>();
	let safeSelectedValue = $derived.by(() => {
		if (code.length === 0) {
			return "";
		}

		const index = Number.parseInt(selectedValue, 10);
		return Number.isNaN(index) || index < 0 || index >= code.length ? "0" : selectedValue;
	});

	let selectedIndex = $derived.by(() => {
		const index = Number.parseInt(safeSelectedValue, 10);
		return Number.isNaN(index) ? -1 : index;
	});

	let selectedCode = $derived(
		selectedIndex >= 0 && selectedIndex < code.length ? code[selectedIndex] : undefined
	);

	function updateScrollAreaHeight() {
		if (!codeBodyRef) {
			scrollAreaHeight = undefined;
			return;
		}

		scrollAreaHeight = Math.min(codeBodyRef.scrollHeight, MAX_BODY_HEIGHT);
	}

	watch(
		() => codeBodyRef,
		(node) => {
			if (!node) return;

			const observer = new ResizeObserver(() => {
				updateScrollAreaHeight();
			});

			observer.observe(node);
			updateScrollAreaHeight();

			return () => observer.disconnect();
		}
	);

	watch(
		() => selectedCode?.filecode,
		() => {
			tick().then(() => {
				updateScrollAreaHeight();
			});
		}
	);
</script>

<div class="bg-background flex flex-col overflow-hidden rounded-md border">
	<div class="bg-background/80 flex shrink-0 items-center justify-between gap-3 border-b p-2">
		{#if selectedCode}
			<Select.Root
				type="single"
				value={safeSelectedValue}
				onValueChange={(value) => (selectedValue = value ?? "")}
			>
				<Select.Trigger
					size="sm"
					class="font-mono text-xs shadow-none sm:w-[18rem] sm:flex-none"
				>
					<div class="flex min-w-0 items-center gap-2">
						{#if selectedCode.lang === "svelte"}
							<Svelte class="size-3.5 shrink-0" />
						{:else if selectedCode.lang === "typescript"}
							<TypeScript class="size-3.5 shrink-0" />
						{:else}
							<Terminal class="size-3.5 shrink-0" />
						{/if}
						<span class="truncate">{selectedCode.filename || "Untitled"}</span>
					</div>
				</Select.Trigger>
				<Select.Content align="start" class="font-mono text-xs">
					{#each code as item, index (`${index}-${item.filename}`)}
						<Select.Item value={String(index)} label={item.filename || "Untitled"}>
							<div class="flex min-w-0 items-center gap-2">
								{#if item.lang === "svelte"}
									<Svelte class="size-3.5 shrink-0" />
								{:else if item.lang === "typescript"}
									<TypeScript class="size-3.5 shrink-0" />
								{:else}
									<Terminal class="size-3.5 shrink-0" />
								{/if}
								<span class="truncate">{item.filename || "Untitled"}</span>
							</div>
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<CopyButton
				text={selectedCode.filecode}
				size="icon"
				variant="ghost"
				class="size-8 shrink-0"
			/>
		{:else}
			<div class="text-muted-foreground flex h-8 items-center px-2 text-sm">No files</div>
		{/if}
	</div>

	{#if selectedCode}
		<ScrollArea
			orientation="both"
			class="w-full overflow-hidden"
			scrollbarXClasses="hidden"
			fade={false}
			style={scrollAreaHeight ? `height: ${scrollAreaHeight}px;` : undefined}
		>
			<div bind:this={codeBodyRef} data-code-overflow class="w-max min-w-full">
				<Code.Root
					lang={selectedCode.lang}
					class="bg-background w-full  rounded-none border-none"
					code={selectedCode.filecode}
					highlight={selectedCode.highlight}
					hideLines={false}
				/>
			</div>
		</ScrollArea>
	{:else}
		<div class="text-muted-foreground p-6 text-sm">No code available.</div>
	{/if}
</div>
