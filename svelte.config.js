import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
	},
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
