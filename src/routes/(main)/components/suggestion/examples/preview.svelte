<script lang="ts">
	import { Suggestion, Suggestions } from "$lib/components/ai-elements/suggestion";
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import { Button } from "$lib/components/ui/button";
	import {
		FileText,
		Lightbulb,
		ScanSearch,
		SquareChartGantt,
		X,
		type LucideIcon,
	} from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import { fade, fly } from "svelte/transition";

	type SuggestionItem = {
		id: string;
		title: string;
		icon: LucideIcon;
		sub: {
			id: string;
			title: string;
		}[];
	};
	let selected: SuggestionItem | null = $state(null);
	let suggestions: SuggestionItem[] = [
		{
			id: "1",
			title: "Analyze",
			icon: ScanSearch,
			sub: [
				{
					id: "1-1",
					title: "Analyze the growth of streaming services",
				},
				{
					id: "1-2",
					title: "Analyze the creator economy and estimate the market size in 2030",
				},
				{
					id: "1-3",
					title: "Analyze the attached contract",
				},
			],
		},
		{
			id: "2",
			title: "Learn",
			icon: Lightbulb,
			sub: [
				{
					id: "2-1",
					title: "what is difference between ROI and Profit",
				},
				{
					id: "2-2",
					title: "what is the ohm's law",
				},
				{
					id: "2-3",
					title: "what is the best way to learn svelte",
				},
			],
		},
		{
			id: "3",
			title: "Summarize",
			icon: FileText,
			sub: [
				{
					id: "3-1",
					title: "Summarize the latest news about AI in 2026",
				},
				{
					id: "3-2",
					title: "Summarize the attached research paper",
				},
				{
					id: "3-3",
					title: "Summarize the key points of the meeting notes",
				},
			],
		},
		{
			id: "4",
			title: "Generate",
			icon: SquareChartGantt,
			sub: [
				{
					id: "4-1",
					title: "Generate a marketing plan for a new product",
				},
				{
					id: "4-2",
					title: "Generate a creative story based on the given prompt",
				},
				{
					id: "4-3",
					title: "Generate a code snippet to solve a specific problem",
				},
			],
		},
	];

	let removeSelected = () => {
		selected = null;
	};

	let value = $state("");

	let updateValue = (newValue: string) => {
		value = newValue;
	};
	let handleSubmit = (content: Message) => {
		// Handle the prompt submission logic here
		console.log("Submitted content:", content);
		value = "";
	};
</script>

<div class="flex min-h-120 flex-col items-start justify-center gap-4">
	<div>
		<!-- Prompt Input -->
		<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
			<PromptInput.Body>
				<PromptInput.Textarea bind:value />
			</PromptInput.Body>
			<PromptInput.Toolbar class="justify-end">
				<PromptInput.Submit />
			</PromptInput.Toolbar>
		</PromptInput.Root>
	</div>
	<div class="max-w-xl h-40">
		{#if selected}
			{@const Icon = selected.icon}
			<div in:fade class="w-xl rounded-xl border p-2">
				<div class="mb-2 flex items-center justify-between">
					<div>
						<Button variant="secondary" size="sm">
							<Icon class="h-4 w-4" />
							{selected.title}
						</Button>
					</div>
					<div>
						<Button onclick={removeSelected} variant="secondary" size="icon-sm">
							<X class="h-4 w-4" />
						</Button>
					</div>
				</div>
				<!-- Sub-suggestions would be displayed here -->
				<div class="flex w-full flex-col items-start">
					{#each selected.sub as subItem}
						<button
							class="mb-1 w-full cursor-pointer border-b p-2 text-start last:border-none"
							onclick={() => updateValue(subItem.title)}
						>
							{subItem.title}
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<Suggestions>
				{#each suggestions as suggestion}
					{@const Icon = suggestion.icon}
					<Suggestion onclick={() => (selected = suggestion)}>
						<div class="flex items-center space-x-2">
							<Icon class="h-4 w-4" />
							<span>{suggestion.title}</span>
						</div>
					</Suggestion>
				{/each}
			</Suggestions>
		{/if}
	</div>
</div>
