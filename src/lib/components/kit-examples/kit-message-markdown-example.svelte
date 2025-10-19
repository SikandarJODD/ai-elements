<script lang="ts">
	import {
		Message,
		MessageAvatar,
		MessageContent
	} from '$lib/components/prompt-kit/message/index.js';
</script>

<div class="flex flex-col gap-8">
	<Message class="justify-start">
		<MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
		<MessageContent markdown class="bg-transparent p-0">
			Hello World! This message supports bold text, italics, and other Markdown features.
		</MessageContent>
	</Message>
</div>
