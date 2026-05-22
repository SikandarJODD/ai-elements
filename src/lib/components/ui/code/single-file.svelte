<script lang="ts">
	import { TypeScript } from "$lib/components/icons";
	import { Svelte, Terminal, CSS, Markdown } from "$lib/components/icons";
	import * as Code from "$lib/components/ui/code";
	import type { CodeBlock } from "$lib/types/code";
	import CopyButton from "../copy-button/copy-button.svelte";
	import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
	import Button from "../button/button.svelte";
	import { untrack } from "svelte";

	type Props = {
		code: CodeBlock;
	};
	let { code }: Props = $props();
	let isExpanded = $state(untrack(() => code.isExpand));
	let updateIsExpanded = () => {
		isExpanded = !isExpanded;
	};
</script>

<div class="w-full">
	<div class="overflow-hidden rounded-lg border">
		<div
			class="flex items-center justify-between border-b border-border/70 py-1 pr-1 pl-4"
		>
			<div class="flex items-center gap-1.5">
				{#if code.lang === "svelte"}
					<Svelte />
				{:else if code.lang === "typescript"}
					<TypeScript />
				{:else if code.lang === "css"}
					<CSS />
				{:else if code.lang === "markdown"}
					<Markdown />
				{:else if code.lang === "bash"}
					<Terminal />
				{:else}
					<Svelte />
				{/if}
				<span class="font-mono text-sm text-primary">{code.name}</span>
			</div>
			<div class="flex items-center gap-1">
				{#if code.isExpand}
					<Button
						variant="ghost"
						size="sm"
						onclick={updateIsExpanded}
					>
						{#if isExpanded}
							Expand
						{:else}
							Collapse
						{/if}
					</Button>
				{/if}
				<CopyButton text={code.code} />
			</div>
		</div>
		{#if isExpanded}
			<Code.Overflow bind:collapsed={isExpanded}>
				<Code.Root
					lang={code.lang || "svelte"}
					class="w-full rounded-none border-none bg-secondary"
					code={code.code}
					highlight={code.highlight}
					hideLines={code.hideLines ?? false}
				>
					<!-- <Code.CopyButton /> -->
				</Code.Root>
			</Code.Overflow>
		{:else}
			<Code.Root
				lang={code.lang || "svelte"}
				class="w-full rounded-none border-none bg-background"
				code={code.code}
				highlight={code.highlight}
				hideLines={code.hideLines ?? false}
			></Code.Root>
		{/if}
	</div>
</div>
