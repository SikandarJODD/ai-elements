<script lang="ts">
	import { ThinkingBar } from "$lib/components/prompt-kit/thinking-bar/index.js";

	function handleStop() {
		console.log("Stop thinking and answer now");
	}

	function handleClick() {
		console.log("Thinking bar clicked");
	}
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<ThinkingBar text="Analyzing your question" onStop={handleStop} />

	<ThinkingBar
		text="Deep thinking in progress"
		stopLabel="Skip to answer"
		onStop={handleStop}
		onclick={handleClick}
	/>
</div>

