<script lang="ts">
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { Button } from "$lib/components/ui/button/index.js";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import MicIcon from "@lucide/svelte/icons/mic";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import PlusIcon from "@lucide/svelte/icons/plus";

	let prompt = $state("");
	let isLoading = $state(false);

	function handleSubmit() {
		if (!prompt.trim()) return;

		isLoading = true;

		// Simulate API call
		console.log("Processing:", prompt);
		setTimeout(() => {
			prompt = "";
			isLoading = false;
		}, 1500);
	}
</script>

<div class="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5">
	<PromptInput
		{isLoading}
		value={prompt}
		onValueChange={(v) => (prompt = v)}
		onSubmit={handleSubmit}
		class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
	>
		<div class="flex flex-col">
			<PromptInputTextarea
				placeholder="Ask anything"
				class="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
			/>

			<PromptInputActions
				class="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3"
			>
				<div class="flex items-center gap-2">
					<PromptInputAction>
						{#snippet tooltip()}
							<p>Add a new action</p>
						{/snippet}
						<Button variant="outline" size="icon" class="size-9 rounded-full">
							<PlusIcon class="h-[18px] w-[18px]" />
						</Button>
					</PromptInputAction>

					<PromptInputAction>
						{#snippet tooltip()}
							<p>Search</p>
						{/snippet}
						<Button variant="outline" class="rounded-full">
							<GlobeIcon class="h-[18px] w-[18px]" />
							Search
						</Button>
					</PromptInputAction>

					<PromptInputAction>
						{#snippet tooltip()}
							<p>More actions</p>
						{/snippet}
						<Button variant="outline" size="icon" class="size-9 rounded-full">
							<MoreHorizontalIcon class="h-[18px] w-[18px]" />
						</Button>
					</PromptInputAction>
				</div>
				<div class="flex items-center gap-2">
					<PromptInputAction>
						{#snippet tooltip()}
							<p>Voice input</p>
						{/snippet}
						<Button variant="outline" size="icon" class="size-9 rounded-full">
							<MicIcon class="h-[18px] w-[18px]" />
						</Button>
					</PromptInputAction>

					<Button
						size="icon"
						disabled={!prompt.trim() || isLoading}
						onclick={handleSubmit}
						class="size-9 rounded-full"
					>
						{#if !isLoading}
							<ArrowUpIcon class="h-[18px] w-[18px]" />
						{:else}
							<span class="size-3 rounded-xs bg-white"></span>
						{/if}
					</Button>
				</div>
			</PromptInputActions>
		</div>
	</PromptInput>
</div>

