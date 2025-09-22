<script lang="ts">
	import {
		Branch,
		BranchMessages,
		BranchNext,
		BranchPage,
		BranchPrevious,
		BranchSelector
	} from '$lib/components/ai-elements/branch/index';

	// Generate unique IDs
	const userMessages = [
		{
			id: 'user-1',
			content: 'What are the key strategies for optimizing React performance?'
		},
		{
			id: 'user-2',
			content: 'How can I improve the performance of my React application?'
		},
		{
			id: 'user-3',
			content: 'What performance optimization techniques should I use in React?'
		}
	];

	const assistantMessages = [
		{
			id: 'assistant-1',
			content: "Here's the first response to your question. This approach focuses on performance optimization."
		},
		{
			id: 'assistant-2',
			content: "Here's an alternative response. This approach emphasizes code readability and maintainability over pure performance."
		},
		{
			id: 'assistant-3',
			content: "And here's a third option. This balanced approach considers both performance and maintainability, making it suitable for most use cases."
		}
	];

	function handleBranchChange(branchIndex: number) {
		console.log('Branch changed to:', branchIndex);
	}
</script>

<div style="height: 300px;">
	<Branch defaultBranch={0} onBranchChange={handleBranchChange}>
		<BranchMessages children={[userBranch0, userBranch1, userBranch2]}>
		</BranchMessages>

		<BranchSelector from="user">
			<BranchPrevious />
			<BranchPage />
			<BranchNext />
		</BranchSelector>
	</Branch>

	<Branch defaultBranch={0} onBranchChange={handleBranchChange}>
		<BranchMessages children={[assistantBranch0, assistantBranch1, assistantBranch2]}>
		</BranchMessages>

		<BranchSelector from="assistant">
			<BranchPrevious />
			<BranchPage />
			<BranchNext />
		</BranchSelector>
	</Branch>
</div>

{#snippet userBranch0()}
	<div class="flex flex-col gap-2 items-end">
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-primary text-primary-foreground">
			<p>{userMessages[0].content}</p>
		</div>
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium">Hayden Bleasel</span>
			<img
				src="https://github.com/haydenbleasel.png"
				alt="Hayden Bleasel"
				class="w-8 h-8 rounded-full"
			/>
		</div>
	</div>
{/snippet}

{#snippet userBranch1()}
	<div class="flex flex-col gap-2 items-end">
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-primary text-primary-foreground">
			<p>{userMessages[1].content}</p>
		</div>
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium">Hayden Bleasel</span>
			<img
				src="https://github.com/haydenbleasel.png"
				alt="Hayden Bleasel"
				class="w-8 h-8 rounded-full"
			/>
		</div>
	</div>
{/snippet}

{#snippet userBranch2()}
	<div class="flex flex-col gap-2 items-end">
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-primary text-primary-foreground">
			<p>{userMessages[2].content}</p>
		</div>
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium">Hayden Bleasel</span>
			<img
				src="https://github.com/haydenbleasel.png"
				alt="Hayden Bleasel"
				class="w-8 h-8 rounded-full"
			/>
		</div>
	</div>
{/snippet}

{#snippet assistantBranch0()}
	<div class="flex flex-col gap-2 items-start">
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<img
				src="https://github.com/openai.png"
				alt="AI"
				class="w-8 h-8 rounded-full"
			/>
			<span class="text-sm font-medium">AI</span>
		</div>
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
			<p>{assistantMessages[0].content}</p>
		</div>
	</div>
{/snippet}

{#snippet assistantBranch1()}
	<div class="flex flex-col gap-2 items-start">
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<img
				src="https://github.com/openai.png"
				alt="AI"
				class="w-8 h-8 rounded-full"
			/>
			<span class="text-sm font-medium">AI</span>
		</div>
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
			<p>{assistantMessages[1].content}</p>
		</div>
	</div>
{/snippet}

{#snippet assistantBranch2()}
	<div class="flex flex-col gap-2 items-start">
		<!-- Message Avatar -->
		<div class="flex items-center gap-2">
			<img
				src="https://github.com/openai.png"
				alt="AI"
				class="w-8 h-8 rounded-full"
			/>
			<span class="text-sm font-medium">AI</span>
		</div>
		<!-- Message content -->
		<div class="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
			<p>{assistantMessages[2].content}</p>
		</div>
	</div>
{/snippet}
