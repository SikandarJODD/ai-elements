<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils";

	const links = [
		{ label: "Home", href: "/" },
		{ label: "Components", href: "/components/chain-of-thought" },
		{ label: "Docs", href: "/docs" }
	];

	const isActive = (href: string) => {
		const path = page.url.pathname;
		if (href === "/") return path === "/";
		return path === href || path.startsWith(`${href}/`);
	};
</script>

<div class="hidden items-center gap-1 md:flex">
	{#each links as link (link.href)}
		<a
			class={cn(
				"rounded-md px-2.5 py-1 text-sm font-light transition-colors hover:bg-accent/60",
				isActive(link.href)
					? "bg-accent text-foreground"
					: "text-muted-foreground hover:text-foreground"
			)}
			href={link.href}
		>
			{link.label}
		</a>
	{/each}
</div>
