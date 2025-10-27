<script lang="ts">
	import { Loader } from "$lib/components/prompt-kit/loader";

	const variants = [
		"circular",
		"classic",
		"pulse",
		"pulse-dot",
		"dots",
		"typing",
		"wave",
		"bars",
		"terminal",
		"text-blink",
		"text-shimmer",
		"loading-dots",
	] as const;
</script>

<div class="flex w-full flex-col space-y-8 p-4">
	<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
		{#each variants as variant}
			<div class="flex flex-col items-center justify-center gap-2 p-4">
				<Loader {variant} />
				<span class="text-muted-foreground text-sm">{variant}</span>
			</div>
		{/each}
	</div>
</div>
