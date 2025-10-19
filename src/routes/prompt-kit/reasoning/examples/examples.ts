import KitReasoningBasicExample from "$lib/components/kit-examples/kit-reasoning-basic-example.svelte";
import kitReasoningBasicExampleRaw from "$lib/components/kit-examples/kit-reasoning-basic-example.svelte?raw";

import KitReasoningMarkdownExample from "$lib/components/kit-examples/kit-reasoning-markdown-example.svelte";
import kitReasoningMarkdownExampleRaw from "$lib/components/kit-examples/kit-reasoning-markdown-example.svelte?raw";

const examples = {
  basic: {
    code: kitReasoningBasicExampleRaw,
    Component: KitReasoningBasicExample,
  },
  markdown: {
    code: kitReasoningMarkdownExampleRaw,
    Component: KitReasoningMarkdownExample,
  },
};

export { examples };
