<script lang="ts">
  import * as Code from "$lib/components/ai-elements/code/index";

  // example of typescript code to add 2 numbers with types - function
  const code = `function addNumbers(a: number, b: number): number {
  return a + b;
}`;
</script>

<div class="w-full p-6">
  <Code.Root lang="typescript" class="w-full" {code} hideLines>
    <Code.CopyButton />
  </Code.Root>
</div>
