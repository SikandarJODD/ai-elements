<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input";
	import type { Message } from "$lib/components/ai-elements/prompt-input";
	import DraftActions from "./provider-draft-actions.svelte";
	import DraftSummary from "./provider-draft-summary.svelte";
	import PromptComposer from "./provider-prompt-composer.svelte";

	type SubmittedDraft = {
		preview: string;
		attachmentCount: number;
	};

	let submittedDrafts = $state<SubmittedDraft[]>([]);

	function handleSubmit(message: Message) {
		let preview = message.text.trim().length > 0 ? message.text : "Attachment-only draft";

		submittedDrafts.push({
			preview,
			attachmentCount: message.attachments.length,
		});
	}
</script>

<PromptInput.Provider accept="image/*" multiple>
	<div class="space-y-4">
		<div class="space-y-2">
			<p class="text-muted-foreground text-sm">
				Provider is useful when sibling components need the same draft without prop
				drilling.
			</p>
			<DraftSummary />
		</div>

		<DraftActions />
		<PromptComposer onSubmit={handleSubmit} />

		{#if submittedDrafts.length > 0}
			<div class="max-w-xl space-y-2 rounded-xl border p-3">
				<p class="text-sm font-medium">Submitted drafts</p>
				<ul class="space-y-2 text-sm">
					{#each submittedDrafts as draft, draftIndex (draftIndex)}
						<li class="rounded-md border px-2 py-1">
							<div class="font-medium">{draft.preview}</div>
							<div class="text-muted-foreground text-xs">
								Attachments: {draft.attachmentCount}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</PromptInput.Provider>
