<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputTextarea,
		PromptInputFooter,
		PromptInputTools,
		PromptInputSubmit,
		PromptInputAttachments,
		PromptInputAttachment,
		PromptInputActionMenu,
		PromptInputActionMenuTrigger,
		PromptInputActionMenuContent,
		PromptInputActionAddAttachments,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";

	let status = $state<"submitted" | "streaming" | "ready" | "error">("ready");
	let messages = $state<PromptInputMessage[]>([]);

	const handleSubmit = async (message: PromptInputMessage, event: SubmitEvent) => {
		console.log("Submitted:", message);
		messages = [...messages, message];

		// Simulate API call
		status = "submitted";
		await new Promise((resolve) => setTimeout(resolve, 1000));
		status = "streaming";
		await new Promise((resolve) => setTimeout(resolve, 2000));
		status = "ready";
	};

	const handleError = (err: { code: string; message: string }) => {
		console.error("File error:", err);
	};
</script>

<div class="mx-auto max-w-2xl space-y-4 p-4">
	<h1 class="text-2xl font-bold">Prompt Input New - Advanced Example</h1>

	<!-- Messages Display -->
	{#if messages.length > 0}
		<div class="space-y-2 rounded-lg border p-4">
			<h2 class="font-semibold">Messages:</h2>
			{#each messages as msg, i}
				<div class="bg-muted rounded border-l-4 border-blue-500 p-3">
					<p class="text-sm"><strong>Message {i + 1}:</strong> {msg.text}</p>
					{#if msg.files.length > 0}
						<p class="text-muted-foreground text-xs">
							Files: {msg.files.map((f) => f.filename).join(", ")}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Prompt Input -->
	<PromptInput
		globalDrop
		multiple
		accept="image/*"
		maxFiles={5}
		maxFileSize={5 * 1024 * 1024}
		onError={handleError}
		onSubmit={handleSubmit}
	>
		<PromptInputBody>
			<PromptInputAttachments>
				{#snippet children(file)}
					<PromptInputAttachment data={file} />
				{/snippet}
			</PromptInputAttachments>
			<PromptInputTextarea
				placeholder="Type your message... (Drag & drop images, paste, or use the + menu)"
			/>
		</PromptInputBody>
		<PromptInputFooter>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
			</PromptInputTools>
			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>

	<!-- Features List -->
	<div class="text-muted-foreground space-y-1 text-sm">
		<p><strong>Features:</strong></p>
		<ul class="list-inside list-disc space-y-1">
			<li>✅ File attachments (drag & drop, paste, click)</li>
			<li>✅ Global drop zone (document-level)</li>
			<li>✅ Multiple file support with image previews</li>
			<li>✅ File validation (accept, maxFiles, maxFileSize)</li>
			<li>✅ Textarea auto-resize</li>
			<li>✅ Submit on Enter (Shift+Enter for newline)</li>
			<li>✅ IME composition handling</li>
			<li>✅ Backspace to remove last attachment when empty</li>
			<li>✅ Blob URL to Data URL conversion on submit</li>
			<li>✅ Status-aware submit button (ready/submitted/streaming/error)</li>
			<li>✅ Dual-mode operation (standalone or with provider)</li>
		</ul>
	</div>
</div>
