<script lang="ts">
	import { ShineBorder } from "$lib/components/magic/shine-border";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { github_repo } from "$lib/config/repo";
	import { mode } from "mode-watcher";
</script>

<Card.Root class="relative gap-2 py-4 ring-0 dark:bg-card border">
	<ShineBorder shineColor={mode.current === "dark" ? ["#A07CFE", "#FE8FB5", "#FFBE7B"] : "black"} />
	<Card.Header class="px-4">
		<Card.Title class="text-sm">Support My Work</Card.Title>
		<Card.Description class="text-xs">
			It would help me build and maintain open-source projects for the
			Svelte community.
		</Card.Description>
	</Card.Header>
	<Card.Content class="mt-2 border-none px-4!">
		<Button
			class="w-full"
			size="sm"
			target="_blank"
			variant={mode.current === "dark" ? "secondary" : "outline"}
			href="https://github.com/sponsors/{github_repo.owner}"
		>
			GitHub Sponsors
		</Button>
	</Card.Content>
</Card.Root>
