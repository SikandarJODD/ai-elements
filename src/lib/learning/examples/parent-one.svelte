<script lang="ts">
	import { createCounter } from "../counter.svelte";
	import ChildOne from "./child-one.svelte";
	import ChildTwo from "./child-two.svelte";

	let counter = createCounter(10);
</script>

<div class="rounded-md border bg-neutral-800/10 p-4">
	<h3>Parent Component 1</h3>
	Counter is {counter.value}

	<ChildOne />

	<!-- <ChildTwo /> -->
</div>
