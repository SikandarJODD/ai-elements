import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		// alias: {
		// 	"@/*": "./path/to/lib/*",
		// },
		prerender: {
			entries: ["/guides/basic-setup", "/guides/svelte-5-ai-sdk-integration"],
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
