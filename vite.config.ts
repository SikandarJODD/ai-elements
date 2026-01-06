import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	optimizeDeps: {
		force: false,
		exclude: ["@lucide/svelte"],
	},
	resolve: {
		dedupe: ["svelte"],
	},
	server: {
		fs: {
			strict: false,
		},
		watch: {
			ignored: ["**/node_modules/**", "**/.svelte-kit/**"],
		},
	},
	build: {
		cssCodeSplit: true,
		rollupOptions: {
			maxParallelFileOps: 2,
		},
	},
	// ssr: {
	// 	noExternal: ['shiki', '@shikijs/langs', '@shikijs/themes']
	// }
});
