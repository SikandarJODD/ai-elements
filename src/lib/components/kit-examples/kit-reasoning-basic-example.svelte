<script lang="ts">
	import {
		Reasoning,
		ReasoningContent,
		ReasoningTrigger,
	} from "$lib/components/prompt-kit/reasoning";
	import { Button } from "$lib/components/ui/button";

	let reasoningText = $state("");
	let isStreaming = $state(false);

	// Simulated streaming function
	async function simulateReasoningStream() {
		const reasoning = `I calculated the best color balance for the image:

1. First, I analyzed the color of the car - a deep blue metallic finish
2. Then, I examined the color of the sky - overcast with neutral tones
3. Next, I considered the color of the grass - vibrant green in the foreground
4. I calculated the optimal white balance to enhance all elements
5. Applied selective color adjustments to maintain natural appearance
6. Final result: improved contrast and color harmony`;

		isStreaming = true;
		reasoningText = "";

		// Simulate character-by-character streaming
		for (let i = 0; i <= reasoning.length; i++) {
			reasoningText = reasoning.slice(0, i);
			await new Promise((resolve) => setTimeout(resolve, 30));
		}

		isStreaming = false;
	}

	function handleGenerateReasoning() {
		simulateReasoningStream();
	}
</script>

<div class="flex w-full flex-col items-start gap-4">
	<Button variant="outline" size="sm" onclick={handleGenerateReasoning} disabled={isStreaming}>
		{isStreaming ? "Generating..." : "Generate Reasoning"}
	</Button>

	<Reasoning {isStreaming}>
		<ReasoningTrigger>Show reasoning</ReasoningTrigger>
		<ReasoningContent
			class="ml-2 border-l-2 border-l-slate-200 px-2 pb-0 dark:border-l-slate-700"
		>
			{reasoningText}
		</ReasoningContent>
	</Reasoning>
</div>
