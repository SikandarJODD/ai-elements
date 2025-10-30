import KitChainOfThoughtBasicExample from "$lib/components/kit-examples/kit-chain-of-thought-basic-example.svelte";
import kitChainOfThoughtBasicExampleRaw from "$lib/components/kit-examples/kit-chain-of-thought-basic-example.svelte?raw";

import KitChainOfThoughtAdvancedExample from "$lib/components/kit-examples/kit-chain-of-thought-advanced-example.svelte";
import kitChainOfThoughtAdvancedExampleRaw from "$lib/components/kit-examples/kit-chain-of-thought-advanced-example.svelte?raw";

const examples = {
	basic: {
		code: kitChainOfThoughtBasicExampleRaw,
		Component: KitChainOfThoughtBasicExample,
	},
	advanced: {
		code: kitChainOfThoughtAdvancedExampleRaw,
		Component: KitChainOfThoughtAdvancedExample,
	},
};

export { examples };

