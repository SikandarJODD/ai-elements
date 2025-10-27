<script lang="ts">
	import { Loader } from "$lib/components/prompt-kit/loader";
	import { Button } from "$lib/components/ui/button";

	let size = $state<"sm" | "md" | "lg">("md");

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

<div class="flex w-full flex-col">
	<div class="flex items-center justify-center gap-2 border-b py-2">
		<Button
			size="sm"
			variant={size === "sm" ? "default" : "outline"}
			onclick={() => (size = "sm")}
		>
			Small
		</Button>
		<Button
			size="sm"
			variant={size === "md" ? "default" : "outline"}
			onclick={() => (size = "md")}
		>
			Medium
		</Button>
		<Button
			size="sm"
			variant={size === "lg" ? "default" : "outline"}
			onclick={() => (size = "lg")}
		>
			Large
		</Button>
	</div>

	<div class="grid grid-cols-2 gap-8 p-4 sm:grid-cols-3 md:grid-cols-4">
		{#each variants as variant}
			<div class="flex flex-col items-center justify-center gap-2 p-4">
				<Loader {variant} {size} />
				<span class="text-muted-foreground text-sm">{variant}</span>
			</div>
		{/each}
	</div>
</div>
