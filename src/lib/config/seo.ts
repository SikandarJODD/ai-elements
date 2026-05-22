type SeoConfig = {
	title: string;
	description: string;
	title_template: string;
	site_name: string;
	url: string;
};
export let seo_config: SeoConfig = {
	title: "Svelte Prompt Kit",
	description: "A SvelteKit template for building and documenting Svelte components.",
	title_template: "%s | Svelte Prompt Kit",
	site_name: "Svelte Prompt Kit",
	url: "https://sv-prompt-kit.vercel.app",
};
