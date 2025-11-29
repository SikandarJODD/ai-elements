<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import SendIcon from "@lucide/svelte/icons/send";

	type PartialNotification = { name?: string; message?: string };
	type PartialNotificationObject = { notifications?: PartialNotification[] };

	let prompt = $state("Weekend plans");
	let loading = $state(false);
	let object = $state<PartialNotificationObject | null>(null);
	let partialJson = $state("");

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!prompt.trim() || loading) return;

		loading = true;
		object = null;
		partialJson = "";

		try {
			const response = await fetch("/api/cookbook/stream-object", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: prompt.trim() }),
			});

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) return;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				partialJson += chunk;

				// Try to parse the partial JSON
				try {
					const parsed = JSON.parse(partialJson);
					object = parsed;
				} catch {
					// JSON not complete yet, update partial display
					object = tryParsePartial(partialJson);
				}
			}

			// Final parse
			try {
				object = JSON.parse(partialJson);
			} catch {
				// Keep last parsed state
			}
		} finally {
			loading = false;
		}
	}

	function tryParsePartial(json: string): PartialNotificationObject | null {
		// Try to extract partial notifications from incomplete JSON
		const notifMatch = json.match(/"notifications"\s*:\s*\[/);
		if (!notifMatch) return null;

		const notifications: Array<{ name?: string; message?: string }> = [];
		const nameMatches = [...json.matchAll(/"name"\s*:\s*"([^"]*)"/g)];
		const messageMatches = [...json.matchAll(/"message"\s*:\s*"([^"]*)"/g)];

		for (let i = 0; i < Math.max(nameMatches.length, messageMatches.length); i++) {
			notifications.push({
				name: nameMatches[i]?.[1],
				message: messageMatches[i]?.[1],
			});
		}

		return notifications.length > 0 ? { notifications } : null;
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input
				bind:value={prompt}
				placeholder="Enter a topic for notifications..."
				disabled={loading}
				class="flex-1"
			/>
			<Button type="submit" disabled={loading || !prompt.trim()} class="shrink-0">
				{#if loading}
					<LoaderIcon class="size-4 animate-spin" />
				{:else}
					<SendIcon class="size-4" />
				{/if}
			</Button>
		</form>

		<!-- Streaming JSON display -->
		{#if partialJson}
			<div class="bg-muted/50 rounded-lg border p-3">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-muted-foreground text-xs font-medium">Streaming JSON</span>
					{#if loading}
						<span class="flex items-center gap-1 text-xs text-green-600">
							<span class="size-1.5 animate-pulse rounded-full bg-green-500"></span>
							Live
						</span>
					{/if}
				</div>
				<pre class="max-h-32 overflow-auto text-xs">{partialJson ||
						"Waiting for response..."}</pre>
			</div>
		{/if}

		<!-- Loading skeleton -->
		{#if loading && !object?.notifications?.length}
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
						<div class="bg-muted mb-2 h-4 w-24 animate-pulse rounded"></div>
						<div class="bg-muted h-3 w-48 animate-pulse rounded"></div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Parsed notifications -->
		{#if object?.notifications?.length}
			<div class="space-y-2">
				<span class="text-muted-foreground text-xs font-medium">Parsed Output</span>
				{#each object.notifications as notification, i}
					{#if notification}
						<div
							class="animate-in fade-in slide-in-from-bottom-2 rounded-lg border p-3"
							style="animation-delay: {i * 100}ms"
						>
							<div class="flex items-center gap-2">
								{#if loading && !notification.message}
									<LoaderIcon class="text-muted-foreground size-3 animate-spin" />
								{/if}
								<span class="font-medium">{notification.name ?? "..."}</span>
							</div>
							<p class="text-muted-foreground mt-1 text-sm">
								{#if notification.message}
									{notification.message}
								{:else}
									<span class="inline-flex items-center gap-1">
										<span class="bg-muted h-3 w-32 animate-pulse rounded"
										></span>
									</span>
								{/if}
							</p>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
