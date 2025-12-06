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
		MessageActions,
		MessageAction,
	} from "$lib/components/ai-elements/new-message";
	import Copy from "@lucide/svelte/icons/copy";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDown from "@lucide/svelte/icons/thumbs-down";
	import { toast } from "svelte-sonner";

	let liked = $state(false);
	let disliked = $state(false);

	type Version = {
		id: string;
		content: string;
	};

	const versions: Version[] = [
		{
			id: "1",
			content: `## Option 1: Local State with \`$state\`

The simplest approach for component-local state:

\`\`\`svelte
\<script\>
  let count = $state(0);
\<\/script\>

\<button onclick={() => count++}\>
  Clicks: {count}
\<\/button\>
\`\`\`

✅ **Best for:** Simple counters, toggles, form inputs`,
		},
		{
			id: "2",
			content: `## Option 2: Computed Values with \`$derived\`

Perfect for values that depend on other state:

\`\`\`svelte
\<script\>
  let count = $state(0);
  let doubled = $derived(count * 2);
  let isEven = $derived(count % 2 === 0);
\<\/script\>

\<p\>Count: {count} | Doubled: {doubled}\</p\>
\<p\>{isEven ? 'Even' : 'Odd'}\</p\>
\`\`\`

✅ **Best for:** Calculations, filtering, formatting`,
		},
		{
			id: "3",
			content: `## Option 3: Svelte Class Pattern

Ideal for complex, reusable state:

\`\`\`typescript
// counter.svelte.ts
export class Counter {
  count = $state(0);
  doubled = $derived(this.count * 2);

  increment() { this.count++; }
  reset() { this.count = 0; }
}
\`\`\`

\`\`\`svelte
\<script\>
  import { Counter } from './counter.svelte.ts';
  let counter = new Counter();
\<\/script\>
\`\`\`

✅ **Best for:** Shared state, complex logic, testing`,
		},
	];

	function handleCopy() {
		toast.success("Copied current version!");
	}

	function handleRetry() {
		toast.info("Regenerating...");
	}
</script>

<div class="flex w-full flex-col gap-6">
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
				<MessageActions>
					<MessageAction tooltip="Regenerate" onclick={handleRetry}>
						<RefreshCcw class="size-4" />
					</MessageAction>
					<MessageAction
						tooltip={liked ? "Remove like" : "Like"}
						onclick={() => {
							liked = !liked;
							disliked = false;
						}}
					>
						<ThumbsUp class="size-4" fill={liked ? "currentColor" : "none"} />
					</MessageAction>
					<MessageAction
						tooltip={disliked ? "Remove dislike" : "Dislike"}
						onclick={() => {
							disliked = !disliked;
							liked = false;
						}}
					>
						<ThumbsDown class="size-4" fill={disliked ? "currentColor" : "none"} />
					</MessageAction>
					<MessageAction tooltip="Copy" onclick={handleCopy}>
						<Copy class="size-4" />
					</MessageAction>
				</MessageActions>
			</MessageToolbar>
		</MessageBranch>
	</Message>
</div>
