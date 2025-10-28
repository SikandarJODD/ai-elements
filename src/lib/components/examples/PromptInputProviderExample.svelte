<script lang="ts">
	import {
		PromptInputProvider,
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
		getPromptInputController,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input/index.js";
	import { Button } from "$lib/components/ui/button";

	// Component that uses the provider to control input externally
	function HeaderControls() {
		const controller = getPromptInputController();

		return {
			controller,
		};
	}

	let headerControls = $state<ReturnType<typeof HeaderControls> | null>(null);

	// Initialize after provider is set
	$effect(() => {
		try {
			headerControls = HeaderControls();
		} catch {
			// Provider not yet available
		}
	});

	function handleSubmit(message: PromptInputMessage): Promise<void> {
		console.log("Submitted:", message);
		// Simulate async submission
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("Submission complete!");
				resolve();
			}, 1000);
		});
	}

	function insertTemplate() {
		if (headerControls) {
			headerControls.controller.textInput.setInput("Please help me understand...");
		}
	}

	function clearAll() {
		if (headerControls) {
			headerControls.controller.textInput.clear();
			headerControls.controller.attachments.clear();
		}
	}
</script>

<div class="mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-3xl font-bold">PromptInput with Provider Example</h1>

	<PromptInputProvider initialInput="">
		<!-- External controls using provider -->
		<div class="bg-muted/50 mb-6 rounded-lg border p-4">
			<h3 class="mb-3 text-sm font-semibold">External Controls</h3>
			<div class="flex flex-wrap gap-2">
				<Button onclick={insertTemplate} size="sm" variant="outline">
					Insert Template
				</Button>
				<Button onclick={clearAll} size="sm" variant="outline">Clear All</Button>
				{#if headerControls}
					<div class="text-muted-foreground flex items-center gap-2 text-sm">
						<span>Files: {headerControls.controller.attachments.files.length}</span>
						<span>•</span>
						<span>
							Text: {headerControls.controller.textInput.value.length} chars
						</span>
					</div>
				{/if}
			</div>
			<p class="text-muted-foreground mt-3 text-xs">
				These buttons control the prompt input from outside using PromptInputProvider
			</p>
		</div>

		<!-- The actual prompt input -->
		<PromptInput globalDrop multiple onSubmit={handleSubmit}>
			<PromptInputBody>
				<PromptInputAttachments>
					{#snippet children(file)}
						<PromptInputAttachment data={file} />
					{/snippet}
				</PromptInputAttachments>
				<PromptInputTextarea />
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
				<PromptInputSubmit />
			</PromptInputToolbar>
		</PromptInput>
	</PromptInputProvider>

	<!-- Features explanation -->
	<div class="mt-8 space-y-4 text-sm">
		<div class="bg-card rounded-lg border p-4">
			<h4 class="mb-2 font-semibold">✅ New Features</h4>
			<ul class="text-muted-foreground ml-4 list-disc space-y-1">
				<li>
					<strong>PromptInputProvider:</strong> Global state management for external controls
				</li>
				<li>
					<strong>Async Submit Handling:</strong> Properly handles Promise-based submissions
				</li>
				<li>
					<strong>Error Recovery:</strong> Preserves data if submission fails
				</li>
				<li>
					<strong>Blob → Data URL:</strong> Converts blob URLs for API compatibility
				</li>
				<li>
					<strong>Grouped Attachments:</strong> Files and images rendered separately
				</li>
				<li>
					<strong>File Tooltips:</strong> Hover over file names to see full details
				</li>
			</ul>
		</div>
	</div>
</div>
