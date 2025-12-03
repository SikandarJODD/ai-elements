<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
		MessageAttachment,
		MessageAttachments,
	} from "$lib/components/ai-elements/new-message";
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageAttachments class="mb-2">
			<MessageAttachment
				data={{
					type: "file",
					url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
					mediaType: "image/jpeg",
					filename: "project-screenshot.png",
				}}
			/>
			<MessageAttachment
				data={{
					type: "file",
					url: "",
					mediaType: "application/pdf",
					filename: "requirements.pdf",
				}}
			/>
		</MessageAttachments>
		<MessageContent>Here are the project files. Can you review them?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={`I've reviewed your files:

**project-screenshot.png**
- Shows a clean UI layout
- Good use of spacing and typography

**requirements.pdf**
- Contains 5 user stories
- All acceptance criteria are clear

Would you like me to provide more detailed feedback?`}
			/>
		</MessageContent>
	</Message>
</div>
