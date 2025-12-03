<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/new-message";
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>Hello! Can you tell me about Svelte 5?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={`Svelte 5 introduces **runes** - a powerful new reactivity system!

Key features include:
- \`$state\` for reactive variables
- \`$derived\` for computed values
- \`$props\` for component props
- \`$effect\` for side effects

Would you like to learn more about any of these?`}
			/>
		</MessageContent>
	</Message>
</div>
