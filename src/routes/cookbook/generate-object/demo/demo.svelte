<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";

	type Notification = {
		name: string;
		message: string;
		minutesAgo: number;
	};

	let isLoading = $state(false);
	let notifications = $state<Notification[]>([]);

	async function handleGenerate() {
		isLoading = true;
		notifications = [];

		try {
			const res = await fetch("/api/cookbook/generate-object", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: "New social media activity" }),
			});

			const data = await res.json();
			notifications = data.notifications;
		} catch (error) {
			console.error("Error:", error);
		} finally {
			isLoading = false;
		}
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<div>
			<p class="text-muted-foreground text-sm font-medium">Prompt:</p>
			<p class="mt-1 text-sm">Generate notifications for "New social media activity"</p>
		</div>

		<Button onclick={handleGenerate} disabled={isLoading} class="w-full">
			{isLoading ? "Generating..." : "Generate Notifications"}
		</Button>

		{#if notifications.length > 0}
			<div class="space-y-2">
				{#each notifications as notification}
					<div class="rounded-lg border p-3">
						<div class="flex items-center justify-between">
							<span class="font-medium">{notification.name}</span>
							<span class="text-muted-foreground text-xs">{notification.minutesAgo}m ago</span>
						</div>
						<p class="text-muted-foreground mt-1 text-sm">{notification.message}</p>
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>

