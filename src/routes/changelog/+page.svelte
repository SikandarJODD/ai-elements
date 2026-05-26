<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { changelogEntries } from "./data";
</script>

<MetaTags
	title="Changelog | Svelte 5 Animations"
	description="Latest component additions, fixes, examples, and updates for Svelte 5 Animations."
	openGraph={{
		url: "https://sv-animations.vercel.app/changelog",
		title: "Changelog | Svelte 5 Animations",
		description:
			"Latest component additions, fixes, examples, and updates for Svelte 5 Animations.",
		siteName: "Svelte 5 Animations",
		images: [
			{
				url: "https://sv-animations.vercel.app/og.png",
				alt: "Svelte 5 Animations",
			},
		],
	}}
	twitter={{
		cardType: "summary_large_image",
		title: "Changelog | Svelte 5 Animations",
		description:
			"Latest component additions, fixes, examples, and updates for Svelte 5 Animations.",
		image: "https://sv-animations.vercel.app/og.png",
		imageAlt: "Svelte 5 Animations",
		site: "@Sikandar_Bhide",
		creator: "@Sikandar_Bhide",
	}}
/>

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
<div
	class="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
></div>
<section class="font-figtree min-h-[calc(100vh-4rem)] px-4 py-12 sm:py-16 relative">
	<div class="mx-auto w-full max-w-2xl">
		<header class="mb-10">
			<p
				class="text-muted-foreground mb-2 text-[11px] font-medium tracking-[0.18em] uppercase"
			>
				Updates
			</p>
			<h1 class="text-2xl font-semibold tracking-normal sm:text-3xl">Changelog</h1>
		</header>

		<div class="space-y-12">
			{#each changelogEntries as entry (entry.id)}
				{@const Entry = entry.component}
				<Entry />
			{/each}
		</div>
	</div>
</section>
