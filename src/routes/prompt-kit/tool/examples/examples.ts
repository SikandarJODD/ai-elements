import KitToolExample from "$lib/components/kit-examples/kit-tool-example.svelte";
import kitToolExampleRaw from "$lib/components/kit-examples/kit-tool-example.svelte?raw";

import KitToolStatesExample from "$lib/components/kit-examples/kit-tool-states-example.svelte";
import kitToolStatesExampleRaw from "$lib/components/kit-examples/kit-tool-states-example.svelte?raw";

import KitToolStatesCompactExample from "$lib/components/kit-examples/kit-tool-states-compact-example.svelte";
import kitToolStatesCompactExampleRaw from "$lib/components/kit-examples/kit-tool-states-compact-example.svelte?raw";

const examples = {
  basic: {
    code: kitToolExampleRaw,
    Component: KitToolExample,
  },
  states: {
    code: kitToolStatesExampleRaw,
    Component: KitToolStatesExample,
  },
  statesCompact: {
    code: kitToolStatesCompactExampleRaw,
    Component: KitToolStatesCompactExample,
  },
};

export { examples };
