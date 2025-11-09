<script lang="ts">
	import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
</script>

<div class="flex items-center justify-center p-8">
	<Shimmer content_length={35}>
		{#snippet children()}
			Hello, this is a shimmer effect!
		{/snippet}
	</Shimmer>
</div>
