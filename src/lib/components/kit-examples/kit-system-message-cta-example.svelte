<script lang="ts">
	import { SystemMessage } from '$lib/components/prompt-kit/system-message/index.js';
	import { ShieldCheck } from '@lucide/svelte';
</script>

<SystemMessage
	variant="action"
	fill
	cta={{
		label: 'Review policy',
		variant: 'default'
	}}
>
	{#snippet icon()}
		<ShieldCheck class="size-4 h-[1lh]" />
	{/snippet}
	This workspace enforces human review. Make sure a teammate signs off on the final response
	before sending it to the customer.
</SystemMessage>
