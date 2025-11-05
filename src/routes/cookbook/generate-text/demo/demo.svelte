<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { fly } from "svelte/transition";

	let isLoading = $state(false);
	let response = $state("");

	async function handleGenerate() {
		isLoading = true;
		response = "";

		try {
			const res = await fetch("/api/cookbook/generate-text", {
				method: "POST",
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
			<div>
				<p class="text-muted-foreground text-sm font-medium">Prompt:</p>
				<p class="mt-1 text-sm">What is Svelte JS? in 100 words</p>
			</div>

			<Button onclick={handleGenerate} disabled={isLoading} class="w-full">
				{isLoading ? "Thinking..." : "Generate Text"}
			</Button>

			{#if response}
				<div in:fly={{ y: -20, delay: 50 }} class="rounded-lg border p-4">
					<p class="text-muted-foreground mb-2 text-xs font-medium">Response:</p>
					<p class="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>
