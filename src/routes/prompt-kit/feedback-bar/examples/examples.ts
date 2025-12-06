import KitFeedbackBarExample from "$lib/components/kit-examples/kit-feedback-bar-example.svelte";
import kitFeedbackBarExampleRaw from "$lib/components/kit-examples/kit-feedback-bar-example.svelte?raw";

import KitFeedbackBarIconExample from "$lib/components/kit-examples/kit-feedback-bar-icon-example.svelte";
import kitFeedbackBarIconExampleRaw from "$lib/components/kit-examples/kit-feedback-bar-icon-example.svelte?raw";

const examples = {
	basic: {
		code: kitFeedbackBarExampleRaw,
		Component: KitFeedbackBarExample,
	},
	withIcon: {
		code: kitFeedbackBarIconExampleRaw,
		Component: KitFeedbackBarIconExample,
	},
};

export { examples };
