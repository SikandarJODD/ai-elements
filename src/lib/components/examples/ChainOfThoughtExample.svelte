<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtHeader,
		ChainOfThoughtContent,
		ChainOfThoughtStep,
		ChainOfThoughtSearchResults,
		ChainOfThoughtSearchResult,
		ChainOfThoughtImage
	} from '$lib/components/ai-elements/chain-of-thought/index.js';
	import { SearchIcon, BrainIcon, CheckIcon, CodeIcon } from '@lucide/svelte';

	let isOpen = $state(false);
</script>

<div class="max-w-2xl mx-auto p-6 space-y-6">
	<h1 class="text-2xl font-bold">Chain of Thought Example</h1>

	<!-- Basic Example -->
	<ChainOfThought defaultOpen={true}>
		<ChainOfThoughtHeader>
			Analyzing Code Conversion Request
		</ChainOfThoughtHeader>

		<ChainOfThoughtContent>
			<ChainOfThoughtStep
				icon={SearchIcon}
				label="Understanding the problem"
				description="Parsing React component structure and identifying key patterns"
				status="complete"
			/>

			<ChainOfThoughtStep
				icon={BrainIcon}
				label="Mapping React concepts to Svelte"
				description="Converting hooks, context, and component patterns"
				status="complete"
			>
				<ChainOfThoughtSearchResults>
					<ChainOfThoughtSearchResult>useControllableState → $state + $derived</ChainOfThoughtSearchResult>
					<ChainOfThoughtSearchResult>React.memo → Svelte automatic optimization</ChainOfThoughtSearchResult>
					<ChainOfThoughtSearchResult>createContext → setContext/getContext</ChainOfThoughtSearchResult>
				</ChainOfThoughtSearchResults>
			</ChainOfThoughtStep>

			<ChainOfThoughtStep
				icon={CodeIcon}
				label="Generating Svelte 5 components"
				description="Creating modern Svelte components with runes"
				status="complete"
			/>

			<ChainOfThoughtStep
				icon={CheckIcon}
				label="Adding TypeScript interfaces"
				description="Ensuring type safety and developer experience"
				status="active"
			/>
		</ChainOfThoughtContent>
	</ChainOfThought>

	<!-- Controlled Example -->
	<div class="space-y-4">
		<div class="flex items-center gap-4">
			<h2 class="text-lg font-semibold">Controlled Example</h2>
			<button
				class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
				onclick={() => isOpen = !isOpen}
			>
				{isOpen ? 'Close' : 'Open'} Chain of Thought
			</button>
		</div>

		<ChainOfThought bind:open={isOpen} onOpenChange={(open) => console.log('State changed:', open)}>
			<ChainOfThoughtHeader>
				Custom Controlled Chain of Thought
			</ChainOfThoughtHeader>

			<ChainOfThoughtContent>
				<ChainOfThoughtStep
					label="First step"
					description="This is controlled externally"
					status="complete"
				/>

				<ChainOfThoughtStep
					label="Second step"
					description="You can toggle this with the button above"
					status="pending"
				/>

				<ChainOfThoughtImage caption="Example of an image in chain of thought">
					<div class="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-semibold">
						Sample Image Placeholder
					</div>
				</ChainOfThoughtImage>
			</ChainOfThoughtContent>
		</ChainOfThought>
	</div>
</div>