<script lang="ts">
	import { Suggestion, Suggestions } from "$lib/components/ai-elements/suggestion/index.js";

	let suggestions = [
		"What are the latest trends in AI?",
		"How does machine learning work?",
		"Explain quantum computing",
		"Best practices for React development",
		"Tell me about TypeScript benefits",
		"How to optimize database queries?",
		"What is the difference between SQL and NoSQL?",
		"Explain cloud computing basics",
	];

	let handleSuggestionClick = (suggestion: string) => {
		console.log("Selected suggestion:", suggestion);
	};
</script>

<Suggestions scrollbarXClasses="hidden">
	{#each suggestions as suggestion (suggestion)}
		<Suggestion {suggestion} onclick={handleSuggestionClick} />
	{/each}
</Suggestions>
