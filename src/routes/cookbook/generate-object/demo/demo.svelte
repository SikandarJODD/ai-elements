<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import SendIcon from "@lucide/svelte/icons/send";

	type Notification = {
		name: string;
		message: string;
		minutesAgo: number;
	};

	let prompt = $state("New social media activity");
	let isLoading = $state(false);
	let notifications = $state<Notification[]>([]);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!prompt.trim() || isLoading) return;

		isLoading = true;
		notifications = [];

		try {
			const res = await fetch("/api/cookbook/generate-object", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: prompt.trim() }),
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
		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input
				bind:value={prompt}
				placeholder="Enter a topic for notifications..."
				disabled={isLoading}
				class="flex-1"
			/>
			<Button type="submit" disabled={isLoading || !prompt.trim()} class="shrink-0">
				{#if isLoading}
					<LoaderIcon class="size-4 animate-spin" />
				{:else}
					<SendIcon class="size-4" />
				{/if}
			</Button>
		</form>

		<!-- Loading skeleton -->
		{#if isLoading}
			<div class="space-y-2">
				<div class="flex items-center gap-2 pb-1">
					<SparklesIcon class="text-primary size-4 animate-pulse" />
					<span class="text-muted-foreground text-xs">Generating notifications...</span>
				</div>
				{#each [1, 2, 3] as _, i}
					<div
						class="animate-in fade-in slide-in-from-bottom-1 rounded-lg border p-3"
						style="animation-delay: {i * 100}ms"
					>
						<div class="flex items-center justify-between">
							<div class="bg-muted h-4 w-24 animate-pulse rounded"></div>
							<div class="bg-muted h-3 w-12 animate-pulse rounded"></div>
						</div>
						<div class="bg-muted mt-2 h-3 w-48 animate-pulse rounded"></div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Generated notifications -->
		{#if notifications.length > 0 && !isLoading}
			<div class="space-y-2">
				{#each notifications as notification, i}
					<div
						class="animate-in fade-in slide-in-from-bottom-2 rounded-lg border p-3"
						style="animation-delay: {i * 100}ms"
					>
						<div class="flex items-center justify-between">
							<span class="font-medium">{notification.name}</span>
							<span class="text-muted-foreground text-xs"
								>{notification.minutesAgo}m ago</span
							>
						</div>
						<p class="text-muted-foreground mt-1 text-sm">{notification.message}</p>
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
