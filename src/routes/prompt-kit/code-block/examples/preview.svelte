<script lang="ts">
	import { CodeBlock, CodeBlockCode } from "$lib/components/prompt-kit/code-block";

	const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

// Call the function
const greeting = greet("World");
console.log(greeting);`;
</script>

<div class="w-full max-w-4xl">
	<CodeBlock>
		<CodeBlockCode {code} language="javascript" />
	</CodeBlock>
</div>
