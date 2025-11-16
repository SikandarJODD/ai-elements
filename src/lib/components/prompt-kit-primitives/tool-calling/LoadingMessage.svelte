<script lang="ts">
	import Message from "$lib/components/prompt-kit/message/Message.svelte";
	import { DotsLoader } from "$lib/components/prompt-kit/loader";
</script>

<Message class="mx-auto flex w-full max-w-3xl flex-col items-start gap-2 px-2 md:px-10">
	<div class="group flex w-full flex-col gap-0">
		<div class="text-foreground prose w-full min-w-0 flex-1 rounded-lg bg-transparent p-0">
			<DotsLoader />
		</div>
	</div>
</Message>
