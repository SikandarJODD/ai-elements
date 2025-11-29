<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { fly } from "svelte/transition";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";

	let prompt = $state("What is Svelte JS?");
	let isLoading = $state(false);
	let response = $state("");

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!prompt.trim() || isLoading) return;

		isLoading = true;
		response = "";

		try {
			const res = await fetch("/api/cookbook/generate-text", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: prompt.trim() }),
			});

			let text = await res.text();
			response = text;
		} catch (error) {
			response = "Error generating text. Please try again.";
		} finally {
			isLoading = false;
		}
	}
</script>

<Card>
	<CardContent>
		<div class="space-y-4">
			<form onsubmit={handleSubmit} class="flex gap-2">
				<Input
					bind:value={prompt}
					placeholder="Enter your prompt..."
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

			{#if isLoading}
				<div class="rounded-lg border p-4">
					<div class="mb-3 flex items-center gap-2">
						<SparklesIcon class="text-primary size-4 animate-pulse" />
						<span class="text-muted-foreground text-xs">Generating response...</span>
					</div>
					<div class="space-y-2">
						<div class="bg-muted h-3 w-full animate-pulse rounded"></div>
						<div class="bg-muted h-3 w-11/12 animate-pulse rounded"></div>
						<div class="bg-muted h-3 w-4/5 animate-pulse rounded"></div>
						<div class="bg-muted h-3 w-3/4 animate-pulse rounded"></div>
					</div>
				</div>
			{/if}

			{#if response && !isLoading}
				<div in:fly={{ y: -20, delay: 50 }} class="rounded-lg border p-4">
					<p class="text-muted-foreground mb-2 text-xs font-medium">Response:</p>
					<p class="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>
