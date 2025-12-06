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
					url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
					mediaType: "image/jpeg",
					filename: "svelte-5-runes-demo.jpg",
				}}
			/>
			<MessageAttachment
				data={{
					type: "file",
					url: "",
					mediaType: "application/pdf",
					filename: "component-architecture.pdf",
				}}
			/>
			<MessageAttachment
				data={{
					type: "file",
					url: "",
					mediaType: "text/plain",
					filename: "notes.txt",
				}}
			/>
		</MessageAttachments>
		<MessageContent>
			Can you review these files and explain how the component architecture works?
		</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={`I've analyzed your files. Here's what I found:

## File Analysis

### 📷 svelte-5-runes-demo.jpg
A visual demonstration of the new runes syntax with code examples showing \`$state\` and \`$derived\` patterns.

### 📄 component-architecture.pdf
**Key Sections:**
- Component hierarchy diagram
- State management patterns
- Props flow documentation

### 📝 notes.txt
Contains quick reference notes for the implementation.

## Recommendations

1. Consider using \`$props\` for better type safety
2. The component structure follows best practices
3. State is properly encapsulated

Would you like me to explain any specific part in more detail?`}
			/>
		</MessageContent>
	</Message>
</div>
