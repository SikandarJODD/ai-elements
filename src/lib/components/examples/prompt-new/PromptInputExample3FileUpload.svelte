<script lang="ts">
	import {
		PromptInput,
		PromptInputActionAddAttachments,
		PromptInputActionMenu,
		PromptInputActionMenuContent,
		PromptInputActionMenuTrigger,
		PromptInputAttachment,
		PromptInputAttachments,
		PromptInputBody,
		PromptInputFooter,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let errorMessage = $state<string>("");
	let submittedFiles = $state<string[]>([]);

	const handleSubmit = (message: PromptInputMessage) => {
		console.log("Files submitted:", message.files);
		submittedFiles = message.files.map((f) => f.filename || "Unknown file");
		status = "submitted";

		setTimeout(() => {
			status = "ready";
		}, 1000);
	};

	const handleError = (err: { code: string; message: string }) => {
		errorMessage = err.message;
		setTimeout(() => {
			errorMessage = "";
		}, 3000);
	};
</script>

<div class="mx-auto w-full max-w-2xl space-y-4">
	<div class="bg-card rounded-lg border p-4">
		<h3 class="mb-2 font-semibold">File Upload & Validation</h3>
		<p class="text-muted-foreground text-sm">
			Upload up to 3 image files (max 5MB each). Drag & drop anywhere or click the + button.
		</p>
	</div>

	{#if errorMessage}
		<div class="border-destructive bg-destructive/10 rounded-lg border p-4">
			<p class="text-destructive text-sm">{errorMessage}</p>
		</div>
	{/if}

	<PromptInput
		globalDrop
		multiple
		accept="image/*"
		maxFiles={3}
		maxFileSize={5 * 1024 * 1024}
		onSubmit={handleSubmit}
		onError={handleError}
	>
		<PromptInputAttachments>
			{#snippet children(file)}
				<PromptInputAttachment data={file} />
			{/snippet}
		</PromptInputAttachments>

		<PromptInputBody>
			<PromptInputTextarea placeholder="Describe your images or ask a question..." />
		</PromptInputBody>

		<PromptInputFooter>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments label="Add images (max 3)" />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
			</PromptInputTools>

			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>

	{#if submittedFiles.length > 0}
		<div class="bg-muted rounded-lg border p-4">
			<p class="mb-2 text-sm font-medium">Submitted files:</p>
			<ul class="list-inside list-disc space-y-1">
				{#each submittedFiles as file}
					<li class="text-sm">{file}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
