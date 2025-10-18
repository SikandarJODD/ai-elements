<script lang="ts">
	import {
		Steps,
		StepsBar,
		StepsContent,
		StepsItem,
		StepsTrigger
	} from '$lib/components/prompt-kit/steps';
	import { Hammer } from '@lucide/svelte';
</script>

<div class="space-y-4">
	<Steps defaultOpen>
		{#snippet children()}
			<StepsTrigger>
				{#snippet leftIcon()}
					<Hammer class="size-4" />
				{/snippet}
				{#snippet children()}
					Tool run: build index
				{/snippet}
			</StepsTrigger>
			<StepsContent>
				{#snippet bar()}
					<StepsBar class="mr-2 ml-1.5" />
				{/snippet}
				{#snippet children()}
					<div class="space-y-1">
						<StepsItem>Initializing build context</StepsItem>
						<StepsItem>Scanning 25 markdown files</StepsItem>
						<StepsItem>Generating embeddings (chunk size: 1,024)</StepsItem>
						<StepsItem>Index created</StepsItem>
					</div>
				{/snippet}
			</StepsContent>
		{/snippet}
	</Steps>
</div>
