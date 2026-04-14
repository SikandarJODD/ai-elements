<script lang="ts">
	import { PromptSuggestion } from "$lib/components/prompt-kit/prompt-suggestion";

	const searchTerm = "how to";

	const howToPrompts = [
		"How to create a Svelte component",
		"How to optimize website performance",
		"How to implement dark mode in a web app",
		"How to use CSS Grid effectively",
		"How to fetch data from an API in JavaScript",
		"How to build a REST API with Node.js",
		"How to deploy a SvelteKit application",
		"How to implement authentication in a web app",
	];
</script>

<div class="w-full space-y-2">
	<div class="w-full space-y-1">
		{#each howToPrompts as prompt (prompt)}
			<PromptSuggestion highlight={searchTerm}>
				{prompt}
			</PromptSuggestion>
		{/each}
	</div>
</div>
