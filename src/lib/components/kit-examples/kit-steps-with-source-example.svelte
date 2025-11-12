<script lang="ts">
	import { Source, SourceContent, SourceTrigger } from "$lib/components/prompt-kit/source";
	import { Steps, StepsContent, StepsItem, StepsTrigger } from "$lib/components/prompt-kit/steps";
</script>

<div class="min-w-sm space-y-4">
	<Steps defaultOpen>
		{#snippet children()}
			<StepsTrigger>
				{#snippet children()}
					Web search: modern LLM UI patterns
				{/snippet}
			</StepsTrigger>
			<StepsContent>
				{#snippet children()}
					<div class="space-y-2">
						<StepsItem>Searching across curated sources...</StepsItem>
						<StepsItem>Top matches</StepsItem>
						<div class="flex flex-wrap gap-1.5">
							<Source href="https://prompt-kit.com/docs">
								<SourceTrigger label="prompt-kit.com/docs" showFavicon />
								<SourceContent
									title="Prompt Kit Docs"
									description="High-quality, accessible, and customizable components for AI interfaces."
								/>
							</Source>
							<Source href="https://github.com/ibelick/prompt-kit">
								<SourceTrigger label="github.com/ibelick/prompt-kit" showFavicon />
								<SourceContent
									title="prompt-kit on GitHub"
									description="Source code and issues for Prompt Kit."
								/>
							</Source>
						</div>
						<StepsItem>Extracting key sections and summarizing…</StepsItem>
					</div>
				{/snippet}
			</StepsContent>
		{/snippet}
	</Steps>
</div>
