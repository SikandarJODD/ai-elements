<script lang="ts">
	import { FeedbackBar } from "$lib/components/prompt-kit/feedback-bar/index.js";
	import { Sparkles } from "@lucide/svelte";

	function handleHelpful() {
		console.log("Marked as helpful");
	}

	function handleNotHelpful() {
		console.log("Marked as not helpful");
	}

	function handleClose() {
		console.log("Feedback bar closed");
	}
</script>

<FeedbackBar
	title="Rate this AI response"
	onHelpful={handleHelpful}
	onNotHelpful={handleNotHelpful}
	onClose={handleClose}
>
	{#snippet icon()}
		<Sparkles class="text-primary size-4" />
	{/snippet}
</FeedbackBar>

