<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/message";
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>What does the new message API cover?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={"`new-message` gives you role-aware layout, markdown rendering, attachments, branching, and action slots in one composable API."}
			/>
		</MessageContent>
	</Message>
</div>
