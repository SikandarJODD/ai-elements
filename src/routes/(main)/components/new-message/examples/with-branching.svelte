<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
		MessageBranch,
		MessageBranchContent,
		MessageBranchSelector,
		MessageBranchPrevious,
		MessageBranchNext,
		MessageBranchPage,
		MessageToolbar,
	} from "$lib/components/ai-elements/new-message";

	type Version = {
		id: string;
		content: string;
	};

	const versions: Version[] = [
		{
			id: "1",
			content: `**Option 1: Use \`$state\` for local state**

\`\`\`svelte
\<script\>
  let count = $state(0);
\<\/script\>

\<button onclick={() => count++}\>
  Count: {count}
\<\/button\>
\`\`\`

This is the simplest approach for component-local state.`,
		},
		{
			id: "2",
			content: `**Option 2: Use \`$derived\` for computed values**

\`\`\`svelte
\<script\>
  let count = $state(0);
  let doubled = $derived(count * 2);
\<\/script\>

\<p\>Count: {count}, Doubled: {doubled}\</p\>
\`\`\`

Great for values that depend on other reactive state.`,
		},
		{
			id: "3",
			content: `**Option 3: Use Svelte Class pattern**

\`\`\`typescript
// counter.svelte.ts
export class Counter {
  count = $state(0);
  doubled = $derived(this.count * 2);

  increment() { this.count++; }
}
\`\`\`

Ideal for complex state management across components.`,
		},
	];
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>What's the best way to manage state in Svelte 5?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageBranch>
			<MessageBranchContent content={versions}>
				{#snippet renderItem(version)}
					<MessageContent>
						<MessageResponse content={version.content} />
					</MessageContent>
				{/snippet}
			</MessageBranchContent>
			<MessageToolbar>
				<MessageBranchSelector from="assistant">
					<MessageBranchPrevious />
					<MessageBranchPage />
					<MessageBranchNext />
				</MessageBranchSelector>
			</MessageToolbar>
		</MessageBranch>
	</Message>
</div>
