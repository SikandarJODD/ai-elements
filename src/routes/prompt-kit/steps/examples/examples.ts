import KitStepsBasicExample from "$lib/components/kit-examples/kit-steps-basic-example.svelte";
import kitStepsBasicExampleRaw from "$lib/components/kit-examples/kit-steps-basic-example.svelte?raw";

import KitStepsWithSourceExample from "$lib/components/kit-examples/kit-steps-with-source-example.svelte";
import kitStepsWithSourceExampleRaw from "$lib/components/kit-examples/kit-steps-with-source-example.svelte?raw";

import KitStepsIconSwapExample from "$lib/components/kit-examples/kit-steps-icon-swap-example.svelte";
import kitStepsIconSwapExampleRaw from "$lib/components/kit-examples/kit-steps-icon-swap-example.svelte?raw";

import KitStepsWithLoaderExample from "$lib/components/kit-examples/kit-steps-with-loader-example.svelte";
import kitStepsWithLoaderExampleRaw from "$lib/components/kit-examples/kit-steps-with-loader-example.svelte?raw";

const examples = {
  basic: {
    code: kitStepsBasicExampleRaw,
    Component: KitStepsBasicExample,
  },
  withSource: {
    code: kitStepsWithSourceExampleRaw,
    Component: KitStepsWithSourceExample,
  },
  iconSwap: {
    code: kitStepsIconSwapExampleRaw,
    Component: KitStepsIconSwapExample,
  },
  withLoader: {
    code: kitStepsWithLoaderExampleRaw,
    Component: KitStepsWithLoaderExample,
  },
};

export { examples };
