<script lang="ts">
	import {
		Reasoning,
		ReasoningContent,
		ReasoningTrigger,
	} from "$lib/components/prompt-kit/reasoning";
	import { Button } from "$lib/components/ui/button";

	let reasoningText = $state("");
	let isStreaming = $state(false);

	// Simulated streaming function with markdown content
	async function simulateMarkdownStream() {
		const reasoning = `# Solving: Square Root of 144

## Step 1: Problem Analysis
I need to find a number that, when **multiplied by itself**, equals 144.

## Step 2: Testing Values
- \`10² = 100\` ❌ (too small)
- \`13² = 169\` ❌ (too large)
- \`12² = 144\` ✅ (perfect!)

## Step 3: Verification
\`\`\`
12 × 12 = 144 ✓
\`\`\`

> **Answer:** The square root of 144 is **12**.`;

		isStreaming = true;
		reasoningText = "";

		// Simulate character-by-character streaming
		for (let i = 0; i <= reasoning.length; i++) {
			reasoningText = reasoning.slice(0, i);
			await new Promise((resolve) => setTimeout(resolve, 20));
		}

		isStreaming = false;
	}

	function handleGenerateReasoning() {
		simulateMarkdownStream();
	}
</script>

<div class="flex w-full flex-col items-start gap-4">
	<Button variant="outline" size="sm" onclick={handleGenerateReasoning} disabled={isStreaming}>
		{isStreaming ? "Thinking..." : "Generate Reasoning"}
	</Button>

	<Reasoning {isStreaming}>
		<ReasoningTrigger>Show AI reasoning</ReasoningTrigger>
		<ReasoningContent
			markdown
			class="ml-2 border-l-2 border-l-slate-200 px-2 pb-1 dark:border-l-slate-700"
		>
			{reasoningText}
		</ReasoningContent>
	</Reasoning>
</div>
