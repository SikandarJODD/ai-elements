<script lang="ts">
	import * as Code from "$lib/components/ai-elements/code/index.js";

	let { ...rest }: Code.RootProps = $props();
</script>

<Code.Root {...rest}>
	<Code.CopyButton />
</Code.Root>
