<script lang="ts">
  import { createCounter } from "../counter.svelte";
  import ChildTwo from "./child-two.svelte";

  let counter = createCounter(10);
</script>

<div class="border rounded-md bg-neutral-800/10 p-4">
  <h3>Parent Component 2</h3>
  Counter is {counter.value}

  <ChildTwo />
</div>
