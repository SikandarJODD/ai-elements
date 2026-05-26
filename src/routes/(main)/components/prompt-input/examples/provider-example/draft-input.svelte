<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";

	interface Props {
		onSubmit: (message: Message) => void | Promise<void>;
	}

	let { onSubmit }: Props = $props();
</script>

<PromptInput.Root class="w-xl" {onSubmit}>
	<PromptInput.Attachments>
		{#snippet children(file)}
			<PromptInput.Attachment data={file} />
		{/snippet}
	</PromptInput.Attachments>

	<PromptInput.Body>
		<PromptInput.Textarea placeholder="Write a prompt, paste an image, or drop a file" />
	</PromptInput.Body>

	<PromptInput.Toolbar>
		<PromptInput.ActionMenu>
			<PromptInput.ActionMenuTrigger />
			<PromptInput.ActionMenuContent>
				<PromptInput.ActionAddAttachments />
			</PromptInput.ActionMenuContent>
		</PromptInput.ActionMenu>

		<PromptInput.Submit />
	</PromptInput.Toolbar>
</PromptInput.Root>
