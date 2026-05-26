<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils";

	const links = [
		{ label: "Home", href: "/" },
		{ label: "Components", href: "/components/chain-of-thought" },
		{ label: "Docs", href: "/docs" },
		{ label: "Cookbook", href: "/cookbook/getting-started" },
		{ label: "Changelog", href: "/changelog" },
	];

	const isActive = (href: string) => {
		const path = page.url.pathname;
		if (href === "/") return path === "/";
		return path === href || path.startsWith(`${href}/`);
	};
</script>

<div class="hidden items-center gap-1.5 md:flex">
	{#each links as link (link.href)}
		<a
			class={cn(
				"rounded-md px-2.5 relative py-1 text-sm transition-colors hover:bg-accent/60",
				isActive(link.href)
					? "bg-accent text-foreground"
					: "text-muted-foreground hover:text-foreground"
				// link.label === "Cookbook" && "bg-accent text-foreground"
			)}
			href={link.href}
		>
			<!-- {#if link.label === "Cookbook"}
				<span
					aria-hidden="true"
					class="absolute inset-e-0 top-0 size-2 rounded-full bg-muted-foreground outline-2 outline-background"
				></span>
			{/if} -->
			{link.label}
		</a>
	{/each}
</div>
