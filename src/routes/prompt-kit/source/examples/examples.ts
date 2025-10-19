import KitSourceBasicExample from "$lib/components/kit-examples/kit-source-basic-example.svelte";
import kitSourceBasicExampleRaw from "$lib/components/kit-examples/kit-source-basic-example.svelte?raw";

import KitSourceCustomExample from "$lib/components/kit-examples/kit-source-custom-example.svelte";
import kitSourceCustomExampleRaw from "$lib/components/kit-examples/kit-source-custom-example.svelte?raw";

const examples = {
  basic: {
    code: kitSourceBasicExampleRaw,
    Component: KitSourceBasicExample,
  },
  custom: {
    code: kitSourceCustomExampleRaw,
    Component: KitSourceCustomExample,
  },
};

export { examples };
