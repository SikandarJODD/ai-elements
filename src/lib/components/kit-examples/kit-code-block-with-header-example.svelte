<script lang="ts">
	import {
		CodeBlock,
		CodeBlockCode,
		CodeBlockGroup,
	} from "$lib/components/prompt-kit/code-block";
	import { Button } from "$lib/components/ui/button";
	import { Check, Copy } from "@lucide/svelte";

	let copied = $state(false);

	const code = `<script lang="ts">
  let count = $state(0);

  function increment() {
    count++;
  }
<\/script>

<div>
  <p>You clicked {count} times</p>
  <button onclick={increment}>
    Click me
  </button>
</div>`;

	function handleCopy() {
		navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="w-full max-w-4xl">
	<CodeBlock>
		<CodeBlockGroup class="border-border border-b py-2 pr-2 pl-4">
			<div class="flex items-center gap-2">
				<div class="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
					Svelte
				</div>
				<span class="text-muted-foreground text-sm">counter.svelte</span>
			</div>
			<Button variant="ghost" size="icon" class="h-8 w-8" onclick={handleCopy}>
				{#if copied}
					<Check class="h-4 w-4 text-green-500" />
				{:else}
					<Copy class="h-4 w-4" />
				{/if}
			</Button>
		</CodeBlockGroup>
		<CodeBlockCode {code} language="svelte" />
	</CodeBlock>
</div>
