<script lang="ts">
	import { TextShimmerLoader } from "$lib/components/prompt-kit/loader";
	import { Steps, StepsContent, StepsItem, StepsTrigger } from "$lib/components/prompt-kit/steps";
</script>

<div class="space-y-4">
	<Steps defaultOpen>
		{#snippet children()}
			<StepsTrigger>
				{#snippet children()}
					<TextShimmerLoader text="Ensuring all files are included" size="md" />
				{/snippet}
			</StepsTrigger>
			<StepsContent>
				{#snippet children()}
					<StepsItem>Planning next actions…</StepsItem>
					<StepsItem>Searching repository files…</StepsItem>
					<StepsItem>Parsing and extracting key sections…</StepsItem>
					<StepsItem>Ready to respond</StepsItem>
				{/snippet}
			</StepsContent>
		{/snippet}
	</Steps>
</div>
