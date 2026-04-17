<script lang="ts">
	import {
		Message,
		MessageBranch,
		MessageBranchContent,
		MessageBranchNext,
		MessageBranchPage,
		MessageBranchPrevious,
		MessageBranchSelector,
		MessageContent,
		MessageToolbar,
	} from "$lib/components/ai-elements/message";

	const versions = [
		{
			id: "intro-short",
			content: `## Option 1

Keep it compact and composable. Use \`Message\` for layout, \`MessageContent\` for a single body, and \`MessageToolbar\` only when the message needs controls.`,
		},
		{
			id: "intro-branch",
			content: `## Option 2

Use branching only for assistant responses with multiple versions. Pass a \`versions\` array to \`MessageBranchContent\` and place the selector inside \`MessageToolbar\`.`,
		},
		{
			id: "intro-attachment",
			content: `## Option 3

Attachments stay separate from the message body. Render them with \`MessageAttachments\` and \`MessageAttachment\`, and image files automatically open in the built-in preview dialog.`,
		},
	];
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>Give me three short ways to introduce the component in docs.</MessageContent
		>
	</Message>

	<Message from="assistant">
		<MessageBranch>
			<MessageBranchContent {versions} />

			<MessageToolbar>
				<MessageBranchSelector>
					<MessageBranchPrevious />
					<MessageBranchPage />
					<MessageBranchNext />
				</MessageBranchSelector>
			</MessageToolbar>
		</MessageBranch>
	</Message>
</div>
