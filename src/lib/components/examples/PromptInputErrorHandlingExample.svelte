<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputTextarea,
		PromptInputToolbar,
		PromptInputTools,
		PromptInputSubmit,
		PromptInputAttachments,
		PromptInputAttachment,
		PromptInputActionMenu,
		PromptInputActionMenuTrigger,
		PromptInputActionMenuContent,
		PromptInputActionAddAttachments,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import XCircle from "@lucide/svelte/icons/x-circle";

	let status = $state<"idle" | "submitting" | "success" | "error">("idle");
	let errorMessage = $state<string>("");
	let successCount = $state(0);
	let shouldFail = $state(false); // Toggle to simulate failures

	async function handleSubmit(message: PromptInputMessage): Promise<void> {
		const hasContent = message.text?.trim() || message.files?.length;

		if (!hasContent) {
			return;
		}

		status = "submitting";
		errorMessage = "";

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		if (shouldFail) {
			// Simulate failure - attachments will NOT be cleared
			status = "error";
			errorMessage = "Network error: Failed to connect to server";
			throw new Error("Simulated submission failure");
		} else {
			// Success - attachments will be cleared automatically
			status = "success";
			successCount++;

			// Reset status after 2 seconds
			setTimeout(() => {
				status = "idle";
			}, 2000);
		}
	}

	function toggleFailMode() {
		shouldFail = !shouldFail;
		status = "idle";
		errorMessage = "";
	}
</script>

<div class="mx-auto max-w-3xl space-y-6 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Error Handling & Recovery Example</h1>
		<p class="text-muted-foreground">
			Demonstrates proper async error handling and data preservation on failure
		</p>
	</div>

	<!-- Status Display -->
	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium">Status:</span>
			{#if status === "idle"}
				<Badge variant="outline">Idle</Badge>
			{:else if status === "submitting"}
				<Badge variant="secondary">
					<div class="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
					Submitting...
				</Badge>
			{:else if status === "success"}
				<Badge variant="default" class="bg-green-600">
					<CheckCircle2 class="mr-1 h-3 w-3" />
					Success!
				</Badge>
			{:else if status === "error"}
				<Badge variant="destructive">
					<XCircle class="mr-1 h-3 w-3" />
					Failed
				</Badge>
			{/if}
		</div>

		<div class="text-muted-foreground text-sm">
			Successful submissions: <strong class="text-foreground">{successCount}</strong>
		</div>
	</div>

	<!-- Error Simulation Toggle -->
	<div class="bg-card rounded-lg border p-4">
		<div class="flex items-start gap-3">
			<AlertCircle class="text-muted-foreground mt-0.5 h-4 w-4" />
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<span class="text-sm">
						Simulate failure mode: <strong>{shouldFail ? "ON" : "OFF"}</strong>
					</span>
					<button
						class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1 text-xs"
						onclick={toggleFailMode}
					>
						{shouldFail ? "Disable" : "Enable"} Failures
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Error Message -->
	{#if errorMessage}
		<div class="border-destructive bg-destructive/10 rounded-lg border p-4">
			<div class="flex items-start gap-3">
				<XCircle class="text-destructive mt-0.5 h-4 w-4" />
				<div class="flex-1 space-y-2">
					<p class="text-destructive text-sm font-semibold">Submission Failed</p>
					<p class="text-muted-foreground text-xs">{errorMessage}</p>
					<p class="text-muted-foreground text-xs italic">
						ℹ️ Your message and attachments have been preserved. You can retry!
					</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Prompt Input -->
	<PromptInput globalDrop multiple onSubmit={handleSubmit}>
		<PromptInputBody>
			<PromptInputAttachments>
				{#snippet children(file)}
					<PromptInputAttachment data={file} />
				{/snippet}
			</PromptInputAttachments>
			<PromptInputTextarea
				placeholder="Try submitting with failure mode enabled to see error handling..."
			/>
		</PromptInputBody>
		<PromptInputToolbar>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
			</PromptInputTools>
			<PromptInputSubmit disabled={status === "submitting"} />
		</PromptInputToolbar>
	</PromptInput>

	<!-- Feature Explanation -->
	<div class="bg-card space-y-4 rounded-lg border p-4">
		<h4 class="text-sm font-semibold">✨ Key Features Demonstrated</h4>

		<div class="space-y-3 text-sm">
			<div class="flex gap-3">
				<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
				<div>
					<strong>Async Error Handling:</strong> If submission fails, your message and attachments
					are preserved
				</div>
			</div>

			<div class="flex gap-3">
				<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
				<div>
					<strong>Data Persistence:</strong> Try enabling "Fail Mode" and submitting - your
					data stays intact
				</div>
			</div>

			<div class="flex gap-3">
				<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
				<div>
					<strong>Retry Capability:</strong> Users can fix issues and retry without losing
					work
				</div>
			</div>

			<div class="flex gap-3">
				<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
				<div>
					<strong>Blob → Data URL:</strong> Attachments are automatically converted for API
					compatibility
				</div>
			</div>
		</div>

		<div class="bg-muted text-muted-foreground mt-4 rounded-md p-3 text-xs">
			<strong>Technical Note:</strong> The component handles both sync and async
			<code>onSubmit</code> functions. It only clears the input after successful completion, preventing
			data loss on network errors or validation failures.
		</div>
	</div>
</div>
