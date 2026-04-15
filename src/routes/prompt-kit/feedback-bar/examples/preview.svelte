<script lang="ts">
	import { FeedbackBar } from "$lib/components/prompt-kit/feedback-bar/index.js";

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
	title="Was this response helpful?"
	onHelpful={handleHelpful}
	onNotHelpful={handleNotHelpful}
	onClose={handleClose}
/>
