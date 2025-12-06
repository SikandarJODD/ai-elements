import KitTextShimmerExample from "$lib/components/kit-examples/kit-text-shimmer-example.svelte";
import kitTextShimmerExampleRaw from "$lib/components/kit-examples/kit-text-shimmer-example.svelte?raw";

import KitTextShimmerCustomExample from "$lib/components/kit-examples/kit-text-shimmer-custom-example.svelte";
import kitTextShimmerCustomExampleRaw from "$lib/components/kit-examples/kit-text-shimmer-custom-example.svelte?raw";

const examples = {
	basic: {
		code: kitTextShimmerExampleRaw,
		Component: KitTextShimmerExample,
	},
	custom: {
		code: kitTextShimmerCustomExampleRaw,
		Component: KitTextShimmerCustomExample,
	},
};

export { examples };

