import KitThinkingBarExample from "$lib/components/kit-examples/kit-thinking-bar-example.svelte";
import kitThinkingBarExampleRaw from "$lib/components/kit-examples/kit-thinking-bar-example.svelte?raw";

import KitThinkingBarWithStopExample from "$lib/components/kit-examples/kit-thinking-bar-with-stop-example.svelte";
import kitThinkingBarWithStopExampleRaw from "$lib/components/kit-examples/kit-thinking-bar-with-stop-example.svelte?raw";

const examples = {
	basic: {
		code: kitThinkingBarExampleRaw,
		Component: KitThinkingBarExample,
	},
	withStop: {
		code: kitThinkingBarWithStopExampleRaw,
		Component: KitThinkingBarWithStopExample,
	},
};

export { examples };

