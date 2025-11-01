import KitScrollButtonBasicExample from "$lib/components/kit-examples/kit-scroll-button-basic-example.svelte";
import kitScrollButtonBasicExampleRaw from "$lib/components/kit-examples/kit-scroll-button-basic-example.svelte?raw";

import KitScrollButtonCustomExample from "$lib/components/kit-examples/kit-scroll-button-custom-example.svelte";
import kitScrollButtonCustomExampleRaw from "$lib/components/kit-examples/kit-scroll-button-custom-example.svelte?raw";

const examples = {
	basic: {
		code: kitScrollButtonBasicExampleRaw,
		Component: KitScrollButtonBasicExample,
	},
	custom: {
		code: kitScrollButtonCustomExampleRaw,
		Component: KitScrollButtonCustomExample,
	},
};

export { examples };
