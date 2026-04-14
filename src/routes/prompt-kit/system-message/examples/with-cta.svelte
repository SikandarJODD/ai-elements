<script lang="ts">
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import { SystemMessage } from "$lib/components/prompt-kit/system-message/index.js";
</script>

<div class="max-w-2xl">
	<SystemMessage
		variant="action"
		fill
		cta={{
			label: "Review policy",
			variant: "default",
		}}
	>
		{#snippet icon()}
			<ShieldCheck class="size-4 h-[1lh]" />
		{/snippet}
		This workspace enforces human review. Make sure a teammate signs off on the final response before
		sending it to the customer.
	</SystemMessage>
</div>
