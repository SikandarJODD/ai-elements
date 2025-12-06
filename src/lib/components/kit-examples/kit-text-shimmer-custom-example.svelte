<script lang="ts">
	import { TextShimmer } from "$lib/components/prompt-kit/text-shimmer/index.js";
</script>

<div class="flex flex-col gap-4">
	<TextShimmer duration={2} spread={30}>
		Fast shimmer with wide spread
	</TextShimmer>

	<TextShimmer duration={6} spread={10}>
		Slow shimmer with narrow spread
	</TextShimmer>

	<TextShimmer as="h2" class="text-2xl font-bold">
		Heading with shimmer effect
	</TextShimmer>
</div>

