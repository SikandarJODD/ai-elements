import KitMessageExample from "$lib/components/kit-examples/kit-message-example.svelte";
import kitMessageExampleRaw from "$lib/components/kit-examples/kit-message-example.svelte?raw";

import KitMessageMarkdownExample from "$lib/components/kit-examples/kit-message-markdown-example.svelte";
import kitMessageMarkdownExampleRaw from "$lib/components/kit-examples/kit-message-markdown-example.svelte?raw";

import KitMessageActionsExample from "$lib/components/kit-examples/kit-message-actions-example.svelte";
import kitMessageActionsExampleRaw from "$lib/components/kit-examples/kit-message-actions-example.svelte?raw";

const examples = {
  basic: {
    code: kitMessageExampleRaw,
    Component: KitMessageExample,
  },
  markdown: {
    code: kitMessageMarkdownExampleRaw,
    Component: KitMessageMarkdownExample,
  },
  withActions: {
    code: kitMessageActionsExampleRaw,
    Component: KitMessageActionsExample,
  },
};

export { examples };
