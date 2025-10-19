<script lang="ts">
	import {
		Message,
		MessageAvatar,
		MessageContent,
		MessageActions,
		MessageAction
	} from '$lib/components/prompt-kit/message/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Copy, ThumbsUp, ThumbsDown } from '@lucide/svelte';

	function handleCopy() {
		console.log('Copy clicked');
	}

	function handleLike() {
		console.log('Like clicked');
	}

	function handleDislike() {
		console.log('Dislike clicked');
	}
</script>

<div class="flex flex-col gap-8">
	<Message class="justify-end">
		<MessageContent>Hello! How can I help you today?</MessageContent>
	</Message>

	<Message class="justify-start">
		<MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
		<div class="flex flex-col gap-2">
			<MessageContent class="bg-transparent p-0">
				I can help with a variety of tasks: answering questions, providing information, assisting
				with coding, generating creative content. What would you like help with today?
			</MessageContent>

			<MessageActions>
				<MessageAction>
					{#snippet tooltip()}
						Copy
					{/snippet}
					<Button variant="ghost" size="icon" class="h-8 w-8" onclick={handleCopy}>
						<Copy class="h-4 w-4" />
					</Button>
				</MessageAction>

				<MessageAction>
					{#snippet tooltip()}
						Like
					{/snippet}
					<Button variant="ghost" size="icon" class="h-8 w-8" onclick={handleLike}>
						<ThumbsUp class="h-4 w-4" />
					</Button>
				</MessageAction>

				<MessageAction>
					{#snippet tooltip()}
						Dislike
					{/snippet}
					<Button variant="ghost" size="icon" class="h-8 w-8" onclick={handleDislike}>
						<ThumbsDown class="h-4 w-4" />
					</Button>
				</MessageAction>
			</MessageActions>
		</div>
	</Message>
</div>
