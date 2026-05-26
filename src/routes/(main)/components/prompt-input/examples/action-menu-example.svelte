<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import { Button } from "$lib/components/ui/button";
	import { Image, Lightbulb, Telescope } from "@lucide/svelte";

	function handleSubmit(message: Message) {
		console.log("message", message.text);
	}

	type Mode = "create-image" | "thinking" | "deep-research" | null;
	let mode: Mode = $state(null);
</script>

<div class="space-y-4">
	<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
		<!-- For Textarea -->
		<PromptInput.Body>
			<PromptInput.Textarea />
		</PromptInput.Body>

		<!-- Action Menu -->
		<PromptInput.Toolbar>
			<div class="flex items-center gap-1">
				<!-- Action Menu is dropdown menu wrapper, nothing complex -->
				<!-- You can use your dropdown here -->
				<PromptInput.ActionMenu>
					<PromptInput.ActionMenuTrigger />
					<PromptInput.ActionMenuContent class="min-w-50">
						<PromptInput.ActionMenuItem onSelect={() => (mode = "create-image")}>
							Create image
						</PromptInput.ActionMenuItem>
						<PromptInput.ActionMenuItem onSelect={() => (mode = "thinking")}>
							Thinking
						</PromptInput.ActionMenuItem>
						<PromptInput.ActionMenuItem onSelect={() => (mode = "deep-research")}>
							Deep research
						</PromptInput.ActionMenuItem>
					</PromptInput.ActionMenuContent>
				</PromptInput.ActionMenu>

				<!-- Showcase what is selected -->
				{#if mode === "create-image"}
					<Button size="sm" variant="outline" class="rounded-full font-normal">
						<Image strokeWidth={1.4} />
						Image</Button
					>
				{:else if mode === "thinking"}
					<Button size="sm" variant="outline" class="rounded-full font-normal">
						<Lightbulb strokeWidth={1.4} />
						Thinking
					</Button>
				{:else if mode === "deep-research"}
					<Button size="sm" variant="outline" class="rounded-full font-normal">
						<Telescope strokeWidth={1.4} />
						Deep Research
					</Button>
				{/if}
			</div>
			<PromptInput.Submit />
		</PromptInput.Toolbar>
	</PromptInput.Root>
</div>
