<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/new-message";
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>How should I compose the new message primitives?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={`Use the primitives in layers:

- \`Message\` wraps the role-aware shell
- \`MessageContent\` renders a single response body
- \`MessageResponse\` adds markdown, code highlighting, mermaid, and math support

Add attachments, branching, or a toolbar only when you need them.`}
			/>
		</MessageContent>
	</Message>
</div>
