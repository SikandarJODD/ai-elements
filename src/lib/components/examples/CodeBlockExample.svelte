<script lang="ts">
  import * as Code from "$lib/components/ai-elements/code/index";

  // simple console.log isnide code block
  const code = `
  console.log("Hello, World!");`;
</script>

<div class="w-full p-6">
  <Code.Root lang="typescript" class="w-full" {code} hideLines>
    <Code.CopyButton />
  </Code.Root>
</div>
