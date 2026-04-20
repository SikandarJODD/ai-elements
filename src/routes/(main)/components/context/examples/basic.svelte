<script lang="ts">
	import * as Context from "$lib/components/ai-elements/context/index.js";
</script>

<div class="flex items-center justify-center p-8">
	<Context.Root
		maxTokens={128_000}
		modelId="openai:gpt-5"
		usage={{
			inputTokens: 32_000,
			outputTokens: 8000,
			cachedInputTokens: 0,
			reasoningTokens: 0,
		}}
		usedTokens={40_000}
	>
		<Context.Trigger />
		<Context.Content>
			<Context.ContentHeader />
			<Context.ContentBody>
				<Context.InputUsage />
				<Context.OutputUsage />
				<Context.ReasoningUsage />
				<Context.CacheUsage />
			</Context.ContentBody>
			<Context.ContentFooter />
		</Context.Content>
	</Context.Root>
</div>
