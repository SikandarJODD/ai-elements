<script lang="ts">
	import { page } from "$app/state";
	import { recipes } from "$lib/config/cookbook";
	import { github_repo } from "$lib/config/repo";
	import { Button } from "$lib/components/ui/button";
	import { LightSwitch } from "$lib/components/ui/light-switch";
	import { Portal, PortalBackdrop } from "$lib/components/ui/portal";
	import { components, docsPages } from "$lib/registry/components";
	import { Github, X } from "$lib/svg";
	import { cn } from "$lib/utils";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import XIcon from "@lucide/svelte/icons/x";

	type SectionLink = {
		name: string;
		href: string;
	};

	type NavSection = {
		title: string;
		items: SectionLink[];
	};

	const primaryLinks: SectionLink[] = [
		{ name: "Home", href: "/" },
		{ name: "Components", href: "/components/chain-of-thought" },
		{ name: "Docs", href: "/docs" },
		{ name: "Cookbook", href: "/cookbook/getting-started" },
		{ name: "Changelog", href: "/changelog" },
	];

	const cookbookLinks = recipes.map((recipe) => ({
		name: recipe.name,
		href: `/cookbook/${recipe.slug}`,
	}));

	const navSections: NavSection[] = [
		{
			title: "Explore",
			items: primaryLinks,
		},
		{
			title: "Docs",
			items: docsPages.map((page) => ({
				name: page.name,
				href: page.href,
			})),
		},
		{
			title: "Components",
			items: components.map((component) => ({
				name: component.name,
				href: component.href,
			})),
		},
		{
			title: "Cookbook Recipes",
			items: cookbookLinks,
		},
	];

	let open = $state(false);
	let pathname = $derived(page.url.pathname);

	function closeMenu() {
		open = false;
	}

	function isActive(href: string) {
		return pathname === href;
	}
</script>

<div class="flex items-center gap-2 md:hidden">
	<LightSwitch />
	<Button
		aria-controls="mobile-menu"
		aria-expanded={open}
		aria-label="Toggle menu"
		class="md:hidden"
		onclick={() => (open = !open)}
		size="icon"
		variant="outline"
	>
		<div class={cn("transition-all", open ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
			<XIcon />
		</div>
		<div
			class={cn(
				"absolute transition-all",
				open ? "scale-0 opacity-0" : "scale-100 opacity-100"
			)}
		>
			<MenuIcon />
		</div>
	</Button>
	{#if open}
		<Portal class="top-14">
			<PortalBackdrop />
			<div
				class={cn(
					"size-full overflow-y-auto px-4 pb-28 pt-4",
					"ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97"
				)}
				data-slot={open ? "open" : "closed"}
				id="mobile-menu"
			>
				<div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
					{#each navSections as section (section.title)}
						<section>
							<h2 class="pb-2 text-sm font-semibold text-muted-foreground">
								{section.title}
							</h2>
							<div class="flex flex-col">
								{#each section.items as item (item.href)}
									<a
										class={cn(
											"border-b py-2 text-sm text-foreground transition-colors last:border-b-0 active:text-foreground/70",
											isActive(item.href) && "font-medium"
										)}
										href={item.href}
										onclick={closeMenu}
									>
										{item.name}
									</a>
								{/each}
							</div>
						</section>
					{/each}
				</div>

				<div class="fixed bottom-4 right-4 z-10 flex items-center gap-2">
					<Button
						aria-label="Open X profile"
						class="size-9 rounded-full shadow-md"
						href="https://x.com/Sikandar_Bhide"
						rel="noopener noreferrer"
						size="icon"
						target="_blank"
						variant="outline"
					>
						<X class="size-3.5" />
					</Button>
					<Button
						aria-label="Open GitHub repository"
						class="size-9 rounded-full shadow-md"
						href={github_repo.url}
						rel="noopener noreferrer"
						size="icon"
						target="_blank"
						variant="default"
					>
						<Github class="size-3.5" />
					</Button>
				</div>
			</div>
		</Portal>
	{/if}
</div>
