import KitCodeBlockBasicExample from "$lib/components/kit-examples/kit-code-block-basic-example.svelte";
import kitCodeBlockBasicExampleRaw from "$lib/components/kit-examples/kit-code-block-basic-example.svelte?raw";

import KitCodeBlockWithHeaderExample from "$lib/components/kit-examples/kit-code-block-with-header-example.svelte";
import kitCodeBlockWithHeaderExampleRaw from "$lib/components/kit-examples/kit-code-block-with-header-example.svelte?raw";

import KitCodeBlockPythonExample from "$lib/components/kit-examples/kit-code-block-python-example.svelte";
import kitCodeBlockPythonExampleRaw from "$lib/components/kit-examples/kit-code-block-python-example.svelte?raw";

import KitCodeBlockCssExample from "$lib/components/kit-examples/kit-code-block-css-example.svelte";
import kitCodeBlockCssExampleRaw from "$lib/components/kit-examples/kit-code-block-css-example.svelte?raw";

import KitCodeBlockThemeExample from "$lib/components/kit-examples/kit-code-block-theme-example.svelte";
import kitCodeBlockThemeExampleRaw from "$lib/components/kit-examples/kit-code-block-theme-example.svelte?raw";

const examples = {
  basic: {
    code: kitCodeBlockBasicExampleRaw,
    Component: KitCodeBlockBasicExample,
  },
  withHeader: {
    code: kitCodeBlockWithHeaderExampleRaw,
    Component: KitCodeBlockWithHeaderExample,
  },
  python: {
    code: kitCodeBlockPythonExampleRaw,
    Component: KitCodeBlockPythonExample,
  },
  css: {
    code: kitCodeBlockCssExampleRaw,
    Component: KitCodeBlockCssExample,
  },
  theme: {
    code: kitCodeBlockThemeExampleRaw,
    Component: KitCodeBlockThemeExample,
  },
};

export { examples };
