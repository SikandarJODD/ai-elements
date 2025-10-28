<script lang="ts">
	import {
		Reasoning,
		ReasoningTrigger,
		ReasoningContent,
	} from "$lib/components/ai-elements/reasoning/index.js";

	import { onMount } from "svelte";
	import { watch } from "runed";
	import { marked } from "marked";

	let reasoningSteps = [
		"Let me think about this problem step by step.",
		"\n\nFirst, I need to understand what the user is asking for.",
		"\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.",
		"\n\nThis seems like a collapsible component with state management would be the right approach.",
	].join("");

	let content = $state("");
	let isStreaming = $state(false);
	let currentTokenIndex = $state(0);
	let tokens: string[] = $state([]);

	// Function to chunk text into fake tokens of 3-4 characters
	let chunkIntoTokens = (text: string): string[] => {
		let tokenList: string[] = [];
		let i = 0;
		while (i < text.length) {
			let chunkSize = Math.floor(Math.random() * 2) + 3; // Random size between 3-4
			tokenList.push(text.slice(i, i + chunkSize));
			i += chunkSize;
		}
		return tokenList;
	};

	// Initialize tokens and start streaming
	onMount(() => {
		let tokenizedSteps = chunkIntoTokens(reasoningSteps);
		tokens = tokenizedSteps;
		content = "";
		currentTokenIndex = 0;
		isStreaming = true;
	});

	// Handle streaming effect
	watch(
		[() => isStreaming, () => currentTokenIndex, () => tokens.length],
		([isStreamingValue, currentTokenIndexValue, tokensLength]) => {
			if (!isStreamingValue || currentTokenIndexValue >= tokensLength) {
				if (isStreamingValue) {
					isStreaming = false;
				}
				return;
			}

			let timer = setTimeout(() => {
				content = content + tokens[currentTokenIndexValue];
				currentTokenIndex = currentTokenIndexValue + 1;
			}, 25); // Faster interval since we're streaming smaller chunks

			return () => clearTimeout(timer);
		}
	);
</script>

<div class="w-full p-4" style="height: 300px;">
	<Reasoning class="w-full" {isStreaming}>
		<ReasoningTrigger />
		<ReasoningContent>{@html marked(content)}</ReasoningContent>
	</Reasoning>
</div>
