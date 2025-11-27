import type { RequestHandler } from "./$types";
import { recipes } from "$lib/config/cookbook-data";

export const GET: RequestHandler = async () => {
	const availableRecipes = recipes.filter((r) => r.status === "available");

	let content = `# Svelte Cookbook - AI SDK Recipes

A collection of practical recipes for building AI-powered applications with SvelteKit and the Vercel AI SDK.

## Available Recipes

${availableRecipes
	.map(
		(r) => `### ${r.name}
- **Slug**: ${r.slug}
- **Description**: ${r.description}
- **Tags**: ${r.tags.join(", ")}
- **Documentation**: /cookbook/${r.slug}
- **llms.txt**: /cookbook/${r.slug}/llms.txt
`
	)
	.join("\n")}

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

