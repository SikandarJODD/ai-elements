<script lang="ts">
	interface Props {
		tokens?: number;
		costText?: string;
	}

	let { tokens, costText }: Props = $props();

	let tokensFormatted = $derived.by(() => {
		return tokens === undefined
			? "—"
			: new Intl.NumberFormat("en-US", {
					notation: "compact",
				}).format(tokens);
	});
</script>

<span>
	{tokensFormatted}
	{#if costText}
		<span class="text-muted-foreground ml-2">• {costText}</span>
	{/if}
</span>
