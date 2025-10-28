<script lang="ts">
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ArrowUp, Paperclip, Square, X } from "@lucide/svelte";

	let input = $state("");
	let isLoading = $state(false);
	let files = $state<File[]>([]);
	let uploadInputRef: HTMLInputElement | undefined = $state();

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

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const newFiles = Array.from(target.files);
			files = [...files, ...newFiles];
		}
	}

	function handleRemoveFile(index: number) {
		files = files.filter((_, i) => i !== index);
		if (uploadInputRef) {
			uploadInputRef.value = "";
		}
	}
</script>

<PromptInput
	value={input}
	onValueChange={handleValueChange}
	{isLoading}
	onSubmit={handleSubmit}
	class="w-full max-w-(--breakpoint-md)"
>
	{#if files.length > 0}
		<div class="flex flex-wrap gap-2 pb-2">
			{#each files as file, index}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
					onclick={(e) => e.stopPropagation()}
				>
					<Paperclip class="size-4" />
					<span class="max-w-[120px] truncate">{file.name}</span>
					<button
						onclick={() => handleRemoveFile(index)}
						class="hover:bg-secondary/50 rounded-full p-1"
					>
						<X class="size-4" />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<PromptInputTextarea placeholder="Ask me anything..." />

	<PromptInputActions class="flex items-center justify-between gap-2 pt-2">
		<PromptInputAction>
			{#snippet tooltip()}
				Attach files
			{/snippet}
			<label
				for="file-upload"
				class="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
			>
				<input
					type="file"
					multiple
					onchange={handleFileChange}
					class="hidden"
					id="file-upload"
					bind:this={uploadInputRef}
				/>
				<Paperclip class="text-primary size-5" />
			</label>
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
