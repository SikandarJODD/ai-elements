<script lang="ts">
	import Message from "$lib/components/prompt-kit/message/Message.svelte";
	import { AlertTriangle } from "@lucide/svelte";

	let { error }: { error: Error } = $props();
</script>

<Message class="not-prose mx-auto flex w-full max-w-3xl flex-col items-start gap-2 px-2 md:px-10">
	<div class="group flex w-full flex-col items-start gap-0">
		<div
			class="text-primary flex min-w-0 flex-1 flex-row items-center gap-2 rounded-lg border-2 border-red-300 bg-red-300/20 px-2 py-1"
		>
			<AlertTriangle size={16} class="text-red-500" />
			<p class="text-red-500">{error.message}</p>
		</div>
	</div>
</Message>
