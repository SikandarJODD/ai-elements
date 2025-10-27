<script lang="ts">
	import * as Code from "$lib/components/ai-elements/code/index.js";

	// example of Svelte 5 code
	const code = `
  \<script lang="ts"\>

  let num = $state(0);

  \</script\>

  <div>
    <h1>Hello, World!</h1>
    <p>The number is {num}</p>
  </div>`;
</script>

<div class="w-full p-6">
	<Code.Root lang="typescript" class="w-full" {code} hideLines>
		<Code.CopyButton />
	</Code.Root>
</div>
