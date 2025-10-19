import KitPromptInputExample from "$lib/components/kit-examples/kit-prompt-input-example.svelte";
import kitPromptInputExampleRaw from "$lib/components/kit-examples/kit-prompt-input-example.svelte?raw";

import KitPromptInputActionsExample from "$lib/components/kit-examples/kit-prompt-input-actions-example.svelte";
import kitPromptInputActionsExampleRaw from "$lib/components/kit-examples/kit-prompt-input-actions-example.svelte?raw";

const examples = {
  basic: {
    code: kitPromptInputExampleRaw,
    Component: KitPromptInputExample,
  },
  withActions: {
    code: kitPromptInputActionsExampleRaw,
    Component: KitPromptInputActionsExample,
  },
};

export { examples };
