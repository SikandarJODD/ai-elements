<script lang="ts">
	import AiInstallCommand from "./ai-install-command.svelte";
	import { Subheading } from "$lib/components/docs";

	type Props = {
		specifier: string;
		is_jsrepo?: boolean;
		blockname?: string;
	};

	let { specifier, is_jsrepo = true, blockname }: Props = $props();
</script>

<Subheading>Installation</Subheading>
<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->

<AiInstallCommand command="execute" args={["shadcn-svelte@latest", "add", specifier]} />

{#if is_jsrepo}
	<p class="text-muted-foreground mt-4 text-sm">
		If you prefer using <a
			href="https://jsrepo.dev"
			target="_blank"
			rel="noopener noreferrer"
			class="text-foreground font-medium hover:underline">jsrepo</a
		>, please install via the command below:
	</p>
	<div class="mt-2">
		<AiInstallCommand
			command="execute"
			args={["jsrepo", "add", `@ai/elements/ai-elements/${blockname ?? specifier}`]}
		/>
	</div>
{/if}
