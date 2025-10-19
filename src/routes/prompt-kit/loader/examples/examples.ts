import KitLoaderExample from "$lib/components/kit-examples/kit-loader-example.svelte";
import kitLoaderExampleRaw from "$lib/components/kit-examples/kit-loader-example.svelte?raw";

import KitLoaderSizeExample from "$lib/components/kit-examples/kit-loader-size-example.svelte";
import kitLoaderSizeExampleRaw from "$lib/components/kit-examples/kit-loader-size-example.svelte?raw";

const examples = {
  basic: {
    code: kitLoaderExampleRaw,
    Component: KitLoaderExample,
  },
  sizes: {
    code: kitLoaderSizeExampleRaw,
    Component: KitLoaderSizeExample,
  },
};

export { examples };
