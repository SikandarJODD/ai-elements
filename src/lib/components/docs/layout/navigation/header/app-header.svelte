<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { createScroll } from "$lib/hooks/use-scroll.svelte";
	import Logo from "$lib/svg/logo.svelte";
	import { cn } from "$lib/utils";
	import DesktopNav from "./desktop-nav.svelte";
	import MobileNav from "./mobile-nav.svelte";
	import { GitHubButton, getStars } from "$lib/components/ui/github-button";
	import { onMount } from "svelte";
	import { X } from "$lib/svg";
	import { LightSwitch } from "$lib/components/ui/light-switch";
	import { github_repo } from "$lib/config/repo";
	import { page } from "$app/state";
	import SearchNavigation from "$lib/components/docs/layout/navigation/search-navigation.svelte";

	let scroll = createScroll(100);
	let isComponentorDocsPage = $derived.by(() => {
		let path = page.url.pathname;
		return path.startsWith("/components") || path.startsWith("/docs") || path.startsWith("/primitives") || path.startsWith("/cookbook");
	});
	let stars = $state(200);
	const repo = { owner: github_repo.owner, repo: github_repo.name };
	onMount(async () => {
		stars = await getStars({ ...repo, fallback: 0 });
	});
</script>

<header
	class={cn(
		"sticky top-0 z-50 w-full border-b border-transparent",
		scroll.scrolled &&
			"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50",
		isComponentorDocsPage &&
			"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50"
	)}
>
	<nav
		class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4"
	>
		<div class="flex items-center gap-5">
			<a
				class="rounded-lg p-2 hover:bg-muted dark:hover:bg-muted/50"
				href="/"
			>
				<Logo class="h-4" />
			</a>
			<DesktopNav />
		</div>
		<div class="hidden items-center gap-1 md:flex">
			<SearchNavigation />
			<Button
				variant="ghost"
				size="icon"
				target="_blank"
				href="https://x.com/Sikandar_Bhide"
				rel="noopener noreferrer"
			>
				<X />
			</Button>
			<GitHubButton {repo} {stars} />
			<LightSwitch />
		</div>
		<MobileNav />
	</nav>
</header>
