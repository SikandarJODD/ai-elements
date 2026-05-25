<script lang="ts">
	import {
		Message,
		MessageAttachment,
		MessageAttachments,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/message";
</script>

<div class="flex w-2xl mx-auto flex-col gap-4">
	<Message from="user" class='w-full'>
		<MessageAttachments class="mb-2">
			<MessageAttachment
				data={{
					type: "file",
					url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=720&fit=crop",
					mediaType: "image/jpeg",
					filename: "dashboard-review.jpg",
				}}
			/>
			<MessageAttachment
				data={{
					type: "file",
					mediaType: "application/pdf",
					filename: "release-notes.pdf",
				}}
			/>
		</MessageAttachments>

		<MessageContent>Please review these files before we ship the new docs page.</MessageContent>
	</Message>

	<Message from="assistant" class='w-full'>
		<MessageContent>
			<MessageResponse
				content={`I can review both:

- Click the image tile to open the centered preview dialog
- Non-image files stay compact and tooltip-based
- You can add \`onRemove\` when attachments should be dismissible`}
			/>
		</MessageContent>
	</Message>
</div>
