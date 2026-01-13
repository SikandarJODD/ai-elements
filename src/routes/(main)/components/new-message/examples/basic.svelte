<script lang="ts">
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "$lib/components/ai-elements/new-message";
</script>

<div class="flex w-full flex-col gap-4">
	<Message from="user">
		<MessageContent>How does Svelte 5 runes system work?</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse
				content={`# Svelte 5 Runes System

Svelte 5 introduces **runes** - special compiler directives that make reactivity explicit. Here are the core runes:

## Core Runes

| Rune | Purpose |
|------|---------|
| \`$state\` | Create reactive state |
| \`$derived\` | Compute derived values |
| \`$props\` | Declare component props |
| \`$effect\` | Handle side effects |

## Quick Example

\`\`\`svelte
\<script lang="ts"\>
  let count = $state(0);
  let doubled = $derived(count * 2);
\<\/script\>

<button onclick={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
\`\`\`

The key benefit is **explicit reactivity** - you always know what's reactive vs static.

Would you like to dive deeper into any specific rune?`}
			/>
		</MessageContent>
	</Message>
</div>
