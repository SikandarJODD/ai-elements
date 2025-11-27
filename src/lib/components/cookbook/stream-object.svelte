<script lang="ts">
	import { Experimental_StructuredObject as StructuredObject } from "@ai-sdk/svelte";
	import { z } from "zod";

	import Button from "$lib/components/ui/button/button.svelte";

	let notificationSchema = z.object({
		notifications: z.array(
			z.object({
				name: z.string().describe("Name of a fictional person."),
				message: z.string().describe("Message. Do not use emojis or links."),
			})
		),
	});

	let obj = new StructuredObject({
		schema: notificationSchema,
		api: "/api/cookbook/stream-object",
	});

	// key down - API Call
	let streamObject = async () => {
		obj.submit("Messages during finals week.");
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<h3 class="w-full max-w-md text-2xl font-bold">Stream Object</h3>
	<div class="bg-secondary flex w-full max-w-md flex-col gap-2">
		{#if obj.object}
			{#each obj.object?.notifications as notification, index}
				<div>
					<p>{notification?.name}</p>
					<p>{notification?.message}</p>
				</div>
			{/each}
		{/if}
	</div>
	<div class="w-full max-w-md">
		<Button class="w-fit" onclick={streamObject}>Generate</Button>
	</div>
</div>
