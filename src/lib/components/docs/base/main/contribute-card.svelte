<script lang="ts">
	import { github_repo } from "$lib/config/repo";
	import BugIcon from "@lucide/svelte/icons/bug";
	import LightbulbIcon from "@lucide/svelte/icons/lightbulb";
	let { class: className = "" }: { class?: string } = $props();
</script>

<div class={`mt-6 pt-6 ${className}`}>
	<h2 class="text-sm font-medium">Contribute</h2>

	<nav class="mt-3">
		<ul class="space-y-1.5">
			<li>
				<a
					class="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					href={`${github_repo.url}/issues/new?template=bug_report.md`}
					target="_blank"
					rel="noreferrer"
				>
					<BugIcon class="size-3.5 shrink-0" />
					<span>Report an issue</span>
				</a>
			</li>
			<li>
				<a
					class="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					href={`${github_repo.url}/issues/new?template=feature_request.md`}
					target="_blank"
					rel="noreferrer"
				>
					<LightbulbIcon class="size-3.5 shrink-0" />
					<span>Request a feature</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
