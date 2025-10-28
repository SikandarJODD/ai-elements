<script lang="ts">
	import { CodeBlock, CodeBlockCode } from "$lib/components/prompt-kit/code-block";

	const code = `def fibonacci(n):
    """Generate first n Fibonacci numbers."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Generate the first 10 Fibonacci numbers
print("First 10 Fibonacci numbers:")
for number in fibonacci(10):
    print(number)`;
</script>

<div class="w-full max-w-4xl">
	<CodeBlock>
		<CodeBlockCode {code} language="python" />
	</CodeBlock>
</div>
