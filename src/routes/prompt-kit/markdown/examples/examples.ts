import KitMarkdownBasicExample from "$lib/components/kit-examples/kit-markdown-basic-example.svelte";
import kitMarkdownBasicExampleRaw from "$lib/components/kit-examples/kit-markdown-basic-example.svelte?raw";

import KitMarkdownCustomComponentsExample from "$lib/components/kit-examples/kit-markdown-custom-components-example.svelte";
import kitMarkdownCustomComponentsExampleRaw from "$lib/components/kit-examples/kit-markdown-custom-components-example.svelte?raw";

const examples = {
	basic: {
		code: kitMarkdownBasicExampleRaw,
		Component: KitMarkdownBasicExample,
	},
	customComponents: {
		code: kitMarkdownCustomComponentsExampleRaw,
		Component: KitMarkdownCustomComponentsExample,
	},
};

export { examples };
