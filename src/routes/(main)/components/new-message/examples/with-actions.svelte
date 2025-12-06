<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
		MessageActions,
		MessageAction,
		MessageToolbar,
	} from "$lib/components/ai-elements/new-message";
	import Copy from "@lucide/svelte/icons/copy";
	import Check from "@lucide/svelte/icons/check";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDown from "@lucide/svelte/icons/thumbs-down";
	import { toast } from "svelte-sonner";

	let liked = $state(false);
	let disliked = $state(false);
	let copied = $state(false);

	const content = `## Svelte 5 Component Example

Here's a reactive greeting component using runes:

\`\`\`svelte
\<script lang="ts"\>
  let name = $state('World');
  let greeting = $derived('Hello, ' + name + '!');
\<\/script\>

\<div class="card"\>
  \<h1\>{greeting}\<\/h1\>
  \<input bind:value={name} placeholder="Enter name" /\>
\<\/div\>
\`\`\`

### Key Concepts

| Rune | Usage in Example |
|------|-----------------|
| \`$state\` | Reactive \`name\` variable |
| \`$derived\` | Auto-updating \`greeting\` |

This pattern is perfect for form inputs and dynamic content!`;

	function handleCopy() {
		navigator.clipboard.writeText(content);
		copied = true;
		toast.success("Copied to clipboard!");
		setTimeout(() => (copied = false), 2000);
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

<div class="flex w-full flex-col gap-6">
	<Message from="user">
		<MessageContent>Show me a Svelte 5 component with runes</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse {content} />
		</MessageContent>
		<MessageToolbar>
			<MessageActions>
				<MessageAction tooltip="Regenerate response" onclick={handleRetry}>
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
					{#if copied}
						<Check class="size-4" />
					{:else}
						<Copy class="size-4" />
					{/if}
				</MessageAction>
			</MessageActions>
		</MessageToolbar>
	</Message>
</div>
