<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { useCounter } from "../counter.svelte";

	let counter = useCounter();
</script>

<div class="rounded-md bg-yellow-800/10 p-4">
	<h3>Child Component 2</h3>
	<p>Counter is {counter.value}</p>
	<div>
		<Button onclick={() => counter.increment()}>Increment</Button>
		<Button onclick={() => counter.decrement()}>Decrement</Button>
	</div>
</div>

<style>
</style>
