import KitSystemMessageExample from "$lib/components/kit-examples/kit-system-message-example.svelte";
import kitSystemMessageExampleRaw from "$lib/components/kit-examples/kit-system-message-example.svelte?raw";

import KitSystemMessageFilledVariantsExample from "$lib/components/kit-examples/kit-system-message-filled-variants-example.svelte";
import kitSystemMessageFilledVariantsExampleRaw from "$lib/components/kit-examples/kit-system-message-filled-variants-example.svelte?raw";

import KitSystemMessageCtaExample from "$lib/components/kit-examples/kit-system-message-cta-example.svelte";
import kitSystemMessageCtaExampleRaw from "$lib/components/kit-examples/kit-system-message-cta-example.svelte?raw";

const examples = {
	basic: {
		code: kitSystemMessageExampleRaw,
		Component: KitSystemMessageExample,
	},
	filledVariants: {
		code: kitSystemMessageFilledVariantsExampleRaw,
		Component: KitSystemMessageFilledVariantsExample,
	},
	withCta: {
		code: kitSystemMessageCtaExampleRaw,
		Component: KitSystemMessageCtaExample,
	},
};

export { examples };
