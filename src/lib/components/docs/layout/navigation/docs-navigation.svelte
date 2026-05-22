<script lang="ts">
	import NavButton from "./nav-button.svelte";
	export type DocNavLink = {
		title: string;
		href: string;
		desc?: string;
	};

	let {
		previous,
		next,
	}: {
		previous?: DocNavLink | null;
		next?: DocNavLink | null;
	} = $props();
</script>

<nav class="border-border mt-16 border-t pt-8">
	<div class="grid gap-4 sm:grid-cols-2">
		{#if previous}
			<NavButton label={previous.desc || "Previous"} {...previous} />
		{/if}

		{#if next}
			<NavButton
				label={next.desc || "Next"}
				align="right"
				forceSecondColumn={!previous}
				{...next}
			/>
		{/if}
	</div>
</nav>
