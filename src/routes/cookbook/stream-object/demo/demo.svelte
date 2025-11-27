<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Experimental_StructuredObject as StructuredObject } from "@ai-sdk/svelte";
	import { z } from "zod";

	const notificationSchema = z.object({
		notifications: z.array(
			z.object({
				name: z.string(),
				message: z.string(),
			})
		),
	});

	const { object, submit, loading } = new StructuredObject({
		api: "/api/cookbook/stream-object",
		schema: notificationSchema,
	});
</script>

<Card>
	<CardContent class="space-y-4">
		<div>
			<p class="text-muted-foreground text-sm font-medium">Prompt:</p>
			<p class="mt-1 text-sm">Stream notifications for "Weekend plans"</p>
		</div>

		<Button
			onclick={() => submit({ prompt: "Weekend plans" })}
			disabled={loading}
			class="w-full"
		>
			{loading ? "Streaming..." : "Stream Notifications"}
		</Button>

		{#if object?.notifications}
			<div class="space-y-2">
				{#each object.notifications as notification}
					{#if notification}
						<div class="rounded-lg border p-3">
							<span class="font-medium">{notification.name ?? "..."}</span>
							<p class="text-muted-foreground mt-1 text-sm">
								{notification.message ?? "Loading..."}
							</p>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
