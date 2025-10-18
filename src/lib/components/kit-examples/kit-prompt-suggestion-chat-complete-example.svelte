<script lang="ts">
	import {
		PromptInput,
		PromptInputActions,
		PromptInputTextarea
	} from '$lib/components/prompt-kit/prompt-input';
	import { PromptSuggestion } from '$lib/components/prompt-kit/prompt-suggestion';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUp, Brain } from '@lucide/svelte';

	let inputValue = $state('');
	let activeCategory = $state('');

	const suggestionGroups = [
		{
			label: 'Summary',
			highlight: 'Summarize',
			items: [
				'Summarize a document',
				'Summarize a video',
				'Summarize a podcast',
				'Summarize a book'
			]
		},
		{
			label: 'Code',
			highlight: 'Help me',
			items: [
				'Help me write Svelte components',
				'Help me debug code',
				'Help me learn Python',
				'Help me learn SQL'
			]
		},
		{
			label: 'Design',
			highlight: 'Design',
			items: [
				'Design a small logo',
				'Design a hero section',
				'Design a landing page',
				'Design a social media post'
			]
		},
		{
			label: 'Research',
			highlight: 'Research',
			items: [
				'Research the best practices for SEO',
				'Research the best running shoes',
				'Research the best restaurants in Paris',
				'Research the best AI tools'
			]
		}
	];

	function handleSend() {
		if (inputValue.trim()) {
			console.log('Sending:', inputValue);
			inputValue = '';
			activeCategory = '';
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function handlePromptInputValueChange(value: string) {
		inputValue = value;
		// Clear active category when typing something different
		if (value.trim() === '') {
			activeCategory = '';
		}
	}

	// Get suggestions based on active category
	const activeCategoryData = $derived(
		suggestionGroups.find((group) => group.label === activeCategory)
	);

	// Determine which suggestions to show
	const showCategorySuggestions = $derived(activeCategory !== '');
</script>

<div class="flex w-full flex-col space-y-4">
	<PromptInput
		class="border-input bg-background border shadow-xs"
		value={inputValue}
		onValueChange={handlePromptInputValueChange}
		onSubmit={handleSend}
	>
		<PromptInputTextarea
			placeholder="Ask anything..."
			class="min-h-[44px]"
			onkeydown={handleKeyDown}
		/>
		<PromptInputActions class="justify-end">
			<Button
				size="sm"
				class="h-9 w-9 rounded-full"
				onclick={handleSend}
				disabled={!inputValue.trim()}
			>
				<ArrowUp class="h-4 w-4" />
			</Button>
		</PromptInputActions>
	</PromptInput>

	<div class="relative flex w-full flex-col items-center justify-center space-y-2">
		<div class="absolute top-0 left-0 h-[70px] w-full">
			{#if showCategorySuggestions}
				<div class="flex w-full flex-col space-y-1">
					{#each activeCategoryData?.items ?? [] as suggestion (suggestion)}
						<PromptSuggestion
							highlight={activeCategoryData?.highlight}
							onclick={() => {
								inputValue = suggestion;
								// Optional: auto-send
								// handleSend()
							}}
						>
							{suggestion}
						</PromptSuggestion>
					{/each}
				</div>
			{:else}
				<div class="relative flex w-full flex-wrap items-stretch justify-start gap-2">
					{#each suggestionGroups as suggestion (suggestion.label)}
						<PromptSuggestion
							onclick={() => {
								activeCategory = suggestion.label;
								inputValue = ''; // Clear input when selecting a category
							}}
							class="capitalize"
						>
							<Brain class="mr-2 h-4 w-4" />
							{suggestion.label}
						</PromptSuggestion>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
