<script lang="ts">
	import type { Guide } from "$lib/config/guides-data";
	import { cn } from "$lib/utils";
	import { Button } from "../../ui/button";

	type Props = Guide & {
		class?: string;
	};

	let {
		id,
		date,
		title,
		description,
		// author,
		class: className = "",
		...props
	}: Props = $props();
</script>

<a
	class={cn(
		"group bg-background text-muted-foreground hover:text-foreground w-full px-6 py-12 hover:cursor-pointer md:px-8",
		className
	)}
	{...props}
>
	<h3 class="text-foreground mb-3 line-clamp-2 text-lg font-medium md:text-xl">
		{title}
	</h3>
	<div class="mb-3 flex items-center gap-2">
		<!-- <span class="text-muted-foreground group-hover:text-foreground text-xs">
			{category}
		</span> -->
		<div class="bg-muted-foreground inline-flex size-1 rounded-full"></div>
		<span class="text-muted-foreground group-hover:text-foreground text-xs">
			{date}
		</span>
	</div>
	<p
		class="text-muted-foreground group-hover:text-foreground mb-8 line-clamp-3 text-sm tracking-wide"
	>
		{description}
	</p>
	<!-- <div class="flex items-center gap-1.5">
		by
		<span
			class="font-mono text-xs font-medium text-foreground/80 group-hover:text-foreground md:text-sm"
		>
			{author}
		</span>
	</div> -->
	<div>
		<Button variant="outline" size="sm" href="/guides/{id}">Read More</Button>
	</div>
</a>
