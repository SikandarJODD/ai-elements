import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$markdown: "src/lib/components/docs/markdown",
		},
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: "ctrl-shift",
			holdMode: true,
			showToggleButton: "always",
			toggleButtonPos: "bottom-right",
		},
	},
};

export default config;
