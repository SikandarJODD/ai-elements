<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Icons from "$lib/components/icons/index.js";
</script>

<MetaTags
	title="Svelte AI Elements"
	description="Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows."
	canonical="https://svelte-ai-elements.vercel.app/"
	openGraph={{
		url: "https://svelte-ai-elements.vercel.app/",
		title: "Svelte AI Elements",
		description:
			"Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows.",
		type: "website",
		siteName: "Svelte AI Elements",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
				type: "image/png",
			},
		],
	}}
	additionalLinkTags={[
		{
			rel: "icon",
			href: "https://svelte-ai-elements.vercel.app/favicon.svg",
		},
	]}
	twitter={{
		creator: "@Sikandar_Bhide",
		site: "https://svelte-ai-elements.vercel.app",
		cardType: "summary_large_image",
		title: "Svelte AI Elements",
		description:
			"Explore a variety of AI-powered components and features designed to enhance user interactions and streamline workflows.",
		image: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
		imageAlt: "Twitter image alt",
	}}
/>

<main class="overflow-hidden">
	<div class="absolute inset-0 isolate hidden contain-strict lg:block">
		<div
			class="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"
		></div>
		<div
			class="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"
		></div>
		<div
			class="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"
		></div>
	</div>
	<section>
		<div class="relative md:pt-24">
			<div
				class="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
			></div>
			<div class="mx-auto max-w-5xl px-6 md:px-6">
				<div class="sm:mx-auto lg:mt-0 lg:mr-auto">
					<h1
						class="mt-8 max-w-2xl font-geist-pixel-circle dark:font-geist-pixel-grid text-5xl font-medium text-balance md:text-6xl lg:mt-16"
					>
						Svelte AI Elements
					</h1>
					<p
						class="text-muted-foreground font-geist-pixel-square dark:font-geist-pixel-circle mt-8 max-w-2xl text-lg text-pretty"
					>
						Svelte AI Elements is a custom registry built on top of
						<a
							href="https://shadcn-svelte.com"
							target="_blank"
							class="text-primary underline underline-offset-2">shadcn-svelte</a
						>
						to help you build AI-native applications faster.
						<br /> It provides pre-built components like conversations, messages, prompt input,
						response and more.
					</p>

					<div class="mt-12 flex items-center gap-1 md:gap-3">
						<Button
							size="lg"
							class="h-10.5 rounded-full px-4 font-normal md:text-base"
							href="/docs"
						>
							Get Started
						</Button>
						<Button
							size="lg"
							variant="outline"
							href="https://github.com/sponsors/SikandarJODD"
							target="_blank"
							rel="noreferrer"
							class="font-geist-pixel-circle h-10.5 rounded-full px-4 font-normal md:text-base"
						>
							<span>
								<img
									src="https://github.com/SikandarJODD.png"
									alt="Bhide Svelte"
									class="size-5 rounded-full"
								/>
							</span>
							<!-- <Icons.GitHub class="mr-1 size-5" /> -->
							Support My Work
						</Button>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
