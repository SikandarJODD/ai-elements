<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<code class="rounded-sm bg-yellow-900/40 px-1 text-yellow-500">
	{@render children()}
</code>
