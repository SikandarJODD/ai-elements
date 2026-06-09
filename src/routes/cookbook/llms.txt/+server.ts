import type { RequestHandler } from "./$types";
import { recipes } from "$lib/config/cookbook";

const cookbookBaseUrl = "https://svelte-ai-elements.vercel.app/cookbook";

const allRecipes = [
	...recipes,
	{
		name: "Generate Image",
		slug: "generate-image",
		description: "Generate images from text prompts using AI image generation models",
		tags: ["images", "generation", "tools"],
	},
];

export const GET: RequestHandler = async () => {
	const recipeList = allRecipes
		.map(
			(recipe) =>
				`- ${recipe.name}: ${recipe.description}\n  Link: ${cookbookBaseUrl}/${recipe.slug}`
		)
		.join("\n\n");

	let content = `# Svelte Cookbook - AI SDK Recipes

A collection of practical recipes for building AI-powered applications with SvelteKit and the Vercel AI SDK.

## Recipes

${recipeList}

## Resources

- Vercel AI SDK: https://ai-sdk.dev
- SvelteKit: https://kit.svelte.dev
- OpenRouter: https://openrouter.ai
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
