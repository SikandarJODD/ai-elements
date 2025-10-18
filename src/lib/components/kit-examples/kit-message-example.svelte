<script lang="ts">
	import {
		Message,
		MessageAvatar,
		MessageContent
	} from '$lib/components/prompt-kit/message/index.js';
</script>

<div class="flex flex-col gap-8">
	<Message class="justify-end">
		<MessageContent>Hello! How can I help you today?</MessageContent>
	</Message>

	<Message class="justify-start">
		<MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
		<MessageContent markdown class="bg-transparent p-0">
			I can help with a variety of tasks: answering questions, providing information, assisting
			with coding, generating creative content. What would you like help with today?
		</MessageContent>
	</Message>
</div>
