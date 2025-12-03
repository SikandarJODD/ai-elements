<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
		MessageActions,
		MessageAction,
	} from "$lib/components/ai-elements/new-message";
	import Copy from "@lucide/svelte/icons/copy";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDown from "@lucide/svelte/icons/thumbs-down";
	import { toast } from "svelte-sonner";

	let liked = $state(false);
	let disliked = $state(false);

	const content = `Here's a simple Svelte 5 component:

\`\`\`svelte
\<script lang="ts"\>
  let name = $state('World');
\<\/script\>

\<h1\>Hello {name}!\</h1\>
\<input bind:value={name} /\>
\`\`\`

This demonstrates the new \`$state\` rune for reactive variables.`;

	function handleCopy() {
		navigator.clipboard.writeText(content);
		toast.success("Copied to clipboard!");
	}

	function handleRetry() {
		toast.info("Regenerating response...");
	}

	function handleLike() {
		liked = !liked;
		disliked = false;
		if (liked) toast.success("Thanks for the feedback!");
	}

	function handleDislike() {
		disliked = !disliked;
		liked = false;
		if (disliked) toast.info("We'll improve based on your feedback");
	}
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>Show me a simple Svelte 5 example</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse {content} />
		</MessageContent>
		<MessageActions>
			<MessageAction tooltip="Regenerate" onclick={handleRetry}>
				<RefreshCcw class="size-4" />
			</MessageAction>
			<MessageAction tooltip={liked ? "Remove like" : "Like"} onclick={handleLike}>
				<ThumbsUp class="size-4" fill={liked ? "currentColor" : "none"} />
			</MessageAction>
			<MessageAction
				tooltip={disliked ? "Remove dislike" : "Dislike"}
				onclick={handleDislike}
			>
				<ThumbsDown class="size-4" fill={disliked ? "currentColor" : "none"} />
			</MessageAction>
			<MessageAction tooltip="Copy to clipboard" onclick={handleCopy}>
				<Copy class="size-4" />
			</MessageAction>
		</MessageActions>
	</Message>
</div>
