<script lang="ts">
	import { getPrevNextBySlug } from "$lib/config/ai-elements-data";
	import PrevNext from "$lib/components/docs/prev-next.svelte";

	let { currentSlug }: { currentSlug: string } = $props();

	// Get previous and next items based on current slug
	let { prev, next } = $derived(getPrevNextBySlug(currentSlug));
</script>

<PrevNext {prev} {next} />
