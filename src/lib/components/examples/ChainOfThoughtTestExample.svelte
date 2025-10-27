<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtContent,
		ChainOfThoughtHeader,
		ChainOfThoughtStep,
	} from "$lib/components/ai-elements/chain-of-thought/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import UserIcon from "@lucide/svelte/icons/user";
	import CheckIcon from "@lucide/svelte/icons/check";
</script>

<div class="mx-auto max-w-2xl space-y-8 p-6">
	<h2 class="text-xl font-semibold">Chain of Thought Animation Test</h2>

	<ChainOfThought>
		<ChainOfThoughtHeader />
		<ChainOfThoughtContent>
			<ChainOfThoughtStep
				icon={SearchIcon}
				label="Step 1: Searching for information"
				status="complete"
				description="This should appear first"
			/>

			<ChainOfThoughtStep
				icon={UserIcon}
				label="Step 2: Analyzing data"
				status="complete"
				description="This should appear 120ms later"
			/>

			<ChainOfThoughtStep
				icon={CheckIcon}
				label="Step 3: Processing results"
				status="active"
				description="This should appear 240ms later"
			/>

			<ChainOfThoughtStep
				label="Step 4: Final conclusion"
				status="pending"
				description="This should appear 360ms later"
			/>
		</ChainOfThoughtContent>
	</ChainOfThought>

	<p class="text-muted-foreground text-sm">
		Click the "Chain of Thought" header to see the staggered animation. Each step should appear
		one by one with a 120ms delay between them.
	</p>
</div>
