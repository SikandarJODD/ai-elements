<script lang="ts">
	import {
		FileUpload,
		FileUploadContent,
		FileUploadTrigger,
	} from "$lib/components/prompt-kit/file-upload";
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { Button } from "$lib/components/ui/button";
	import { ArrowUp, Paperclip, Square, X } from "@lucide/svelte";

	let input = $state("");
	let isLoading = $state(false);
	let files = $state<File[]>([]);

	function handleFilesAdded(newFiles: File[]) {
		files = [...files, ...newFiles];
	}

	function handleSubmit() {
		if (input.trim() || files.length > 0) {
			isLoading = true;
			setTimeout(() => {
				isLoading = false;
				input = "";
				files = [];
			}, 2000);
		}
	}

	function handleValueChange(value: string) {
		input = value;
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
	}
</script>

<FileUpload onFilesAdded={handleFilesAdded} accept=".jpg,.jpeg,.png,.pdf,.docx">
	<PromptInput
		value={input}
		onValueChange={handleValueChange}
		{isLoading}
		onSubmit={handleSubmit}
		class="w-full max-w-xl"
	>
		{#if files.length > 0}
			<div class="grid grid-cols-2 gap-2 pb-2">
				{#each files as file, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="bg-secondary flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm"
						onclick={(e) => e.stopPropagation()}
					>
						<div class="flex items-center gap-2">
							<Paperclip class="size-4" />
							<span class="max-w-[80px] truncate text-sm">
								{file.name}
							</span>
						</div>
						<button
							onclick={() => removeFile(index)}
							class="hover:bg-secondary/50 rounded-full p-1"
						>
							<X class="size-4" />
						</button>
					</div>
				{/each}
			</div>
		{/if}

		<PromptInputTextarea placeholder="Type a message or drop files..." />

		<PromptInputActions class="flex items-center justify-between gap-2 pt-2">
			<PromptInputAction>
				{#snippet tooltip()}
					Attach files
				{/snippet}
				<FileUploadTrigger asChild>
					<div
						class="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
					>
						<Paperclip class="text-primary size-5" />
					</div>
				</FileUploadTrigger>
			</PromptInputAction>

			<PromptInputAction>
				{#snippet tooltip()}
					{isLoading ? "Stop generation" : "Send message"}
				{/snippet}
				<Button
					variant="default"
					size="icon"
					class="h-8 w-8 rounded-full"
					onclick={handleSubmit}
				>
					{#if isLoading}
						<Square class="size-5 fill-current" />
					{:else}
						<ArrowUp class="size-5" />
					{/if}
				</Button>
			</PromptInputAction>
		</PromptInputActions>
	</PromptInput>

	<FileUploadContent>
		<div class="flex min-h-[200px] w-full items-center justify-center backdrop-blur-sm">
			<div class="bg-background/90 m-4 w-full max-w-md rounded-lg border p-8 shadow-lg">
				<div class="mb-4 flex justify-center">
					<svg
						class="text-muted size-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-center text-base font-medium">Drop files to upload</h3>
				<p class="text-muted-foreground text-center text-sm">
					Release to add files to your message
				</p>
			</div>
		</div>
	</FileUploadContent>
</FileUpload>
