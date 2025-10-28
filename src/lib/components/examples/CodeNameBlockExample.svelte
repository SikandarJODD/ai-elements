<script lang="ts">
	import { CodeNameBlock } from "$lib";

	const typescriptCode = `function addNumbers(a: number, b: number): number {
	return a + b;
}

const result = addNumbers(5, 3);
console.log(result); // 8`;

	const svelteCode = `<script lang="ts">
	let count = $state(0);

	function increment() {
		count++;
	}
<\/script>

<button onclick={increment}>
	Count: {count}
</button>`;

	const bashCode = `#!/bin/bash
echo "Hello, World!"
npm install
npm run dev`;
</script>

<div class="space-y-6 p-6">
	<h2 class="text-2xl font-bold">CodeNameBlock Examples</h2>

	<!-- TypeScript Example -->
	<div>
		<h3 class="mb-4 text-lg font-semibold">TypeScript File</h3>
		<CodeNameBlock filename="utils.ts" lang="typescript" code={typescriptCode} />
	</div>

	<!-- Svelte Example -->
	<div>
		<h3 class="mb-4 text-lg font-semibold">Svelte Component</h3>
		<CodeNameBlock filename="Counter.svelte" lang="svelte" code={svelteCode} />
	</div>

	<!-- Bash Example -->
	<div>
		<h3 class="mb-4 text-lg font-semibold">Shell Script</h3>
		<CodeNameBlock filename="setup.sh" lang="bash" code={bashCode} />
	</div>

	<!-- Default Example -->
	<div>
		<h3 class="mb-4 text-lg font-semibold">Generic Code File</h3>
		<CodeNameBlock
			filename="config.json"
			lang="json"
			code={'{"name": "example", "version": "1.0.0"}'}
		/>
	</div>
</div>
