<script lang="ts">
	let value = $state("");
	// object generation result
	let generation = $state();

	let loading = $state(false);

	// key down - API Call
	let generateObject = async (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			loading = true;
			let response = await fetch("/api/cookbook/generate-object", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: value,
				}),
			});
			value = "";
			let data = await response.json();
			generation = data.notifications;
			loading = false;
		}
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<h3 class="w-full max-w-md text-2xl font-bold">Generate Object</h3>
	<div class="flex w-full max-w-md flex-col gap-2">
		{#if loading}
			<div class="flex flex-col gap-1">
				<div class="font-semibold capitalize">Assistant:</div>
				<div class="flex items-center gap-2">
					<div
						class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
					></div>
					<span class="text-gray-500">Generating...</span>
				</div>
			</div>
		{:else}
			<div>
				<pre>
                    <code class="font-mono text-sm">
                        {JSON.stringify(generation, null, 2)}
                    </code>
                </pre>
			</div>
		{/if}
	</div>
	<div class="flex w-full max-w-md flex-col gap-1">
		<label for="prompt">Enter Prompt</label>
		<input
			type="text"
			bind:value
			onkeydown={generateObject}
			placeholder="Generate three notifications for a messages app."
			class="rounded-lg border border-gray-300 p-2"
		/>
	</div>
</div>
