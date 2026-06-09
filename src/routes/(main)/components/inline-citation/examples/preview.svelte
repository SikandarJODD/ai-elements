<script lang="ts">
	import * as InlineCitation from "$lib/components/ai-elements/inline-citation/index.js";

	// Example data
	const sources = [
		"https://example.com/article1",
		"https://docs.svelte.dev/introduction",
		"https://kit.svelte.dev/",
	];

	const sourceDetails = [
		{
			title: "Understanding Modern Web Development",
			url: "https://example.com/article1",
			description:
				"A comprehensive guide to building modern web applications with the latest frameworks and tools.",
		},
		{
			title: "Svelte Documentation",
			url: "https://docs.svelte.dev/introduction",
			description:
				"Official documentation for Svelte, the cybernetically enhanced web framework.",
		},
		{
			title: "SvelteKit Framework",
			url: "https://kit.svelte.dev/",
			description:
				"The fastest way to build svelte apps with routing, server-side rendering, and more.",
		},
	];

	const sampleQuotes = [
		"This approach significantly improves performance and developer experience.",
		"Svelte is a radical new approach to building user interfaces.",
		"SvelteKit provides everything you need to build a fast, production-ready web app.",
	];
</script>

<div class="space-y-8 p-8">
	<h1 class="text-2xl font-bold">Inline Citation Example</h1>

	<div class="space-y-4">
		<p class="text-zinc-500/80">
			Modern web development has evolved significantly over the past few years.
			<InlineCitation.Root>
				<InlineCitation.Text>
					New frameworks like Svelte offer better performance and developer experience
				</InlineCitation.Text>
				<InlineCitation.Card>
					<InlineCitation.CardTrigger {sources} />
					<InlineCitation.CardBody>
						<InlineCitation.Carousel>
							<InlineCitation.CarouselHeader>
								<InlineCitation.CarouselPrev />
								<InlineCitation.CarouselIndex />
								<InlineCitation.CarouselNext />
							</InlineCitation.CarouselHeader>
							<InlineCitation.CarouselContent>
								{#each sourceDetails as source, index}
									<InlineCitation.CarouselItem>
										<InlineCitation.Source
											title={source.title}
											url={source.url}
											description={source.description}
										/>
										{#if sampleQuotes[index]}
											<InlineCitation.Quote>
												{sampleQuotes[index]}
											</InlineCitation.Quote>
										{/if}
									</InlineCitation.CarouselItem>
								{/each}
							</InlineCitation.CarouselContent>
						</InlineCitation.Carousel>
					</InlineCitation.CardBody>
				</InlineCitation.Card>
			</InlineCitation.Root>
			compared to traditional approaches.
		</p>
	</div>
</div>
