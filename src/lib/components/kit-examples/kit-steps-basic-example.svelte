<script lang="ts">
	import { Steps, StepsContent, StepsItem, StepsTrigger } from "$lib/components/prompt-kit/steps";
</script>

<div class="min-w-sm space-y-4">
	<Steps defaultOpen>
		{#snippet children()}
			<StepsTrigger>
				{#snippet children()}
					Agent run: Summarize repository
				{/snippet}
			</StepsTrigger>
			<StepsContent>
				{#snippet children()}
					<div class="space-y-1">
						<StepsItem>Searching files in repo...</StepsItem>
						<StepsItem>Found 12 files (src, docs)</StepsItem>
						<StepsItem>Parsing markdown and code blocks</StepsItem>
						<StepsItem>Selecting tool: summarize</StepsItem>
						<StepsItem>Running summarize(tool) with top 5 files</StepsItem>
						<StepsItem class="text-foreground">Summary generated</StepsItem>
					</div>
				{/snippet}
			</StepsContent>
		{/snippet}
	</Steps>
</div>
