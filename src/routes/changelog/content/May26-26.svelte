<script lang="ts">
	import ChangelogHighlight from "../changelog-highlight.svelte";
</script>

<article aria-labelledby="changelog-2026-05-26">
	<div class="mb-5 flex items-center gap-3">
		<h2 id="changelog-2026-05-26" class="text-base font-semibold whitespace-nowrap sm:text-lg">
			May 26, 2026
		</h2>
		<div class="bg-border h-px flex-1"></div>
	</div>

	<p class="text-foreground mb-6 text-sm leading-7 sm:text-[15px]">
		<ChangelogHighlight>Project cleanup and separation update</ChangelogHighlight>
		with refactored components and a new standalone home for Prompt Kit.
	</p>

	<div class="space-y-8">
		<section aria-labelledby="changelog-2026-05-26-refactored">
			<h3
				id="changelog-2026-05-26-refactored"
				class="text-muted-foreground mb-3 text-[11px] font-medium tracking-[0.16em] uppercase"
			>
				Refactored All Components
			</h3>

			<ul class="space-y-2.5 text-sm leading-7 sm:text-[15px]">
				<li class="grid grid-cols-[0.65rem_1fr] gap-2">
					<span
						aria-hidden="true"
						class="bg-muted-foreground/45 mt-[0.78em] size-1 rounded-full"
					></span>
					<span class="min-w-0"
						>Refactored the component set for a cleaner, more maintainable structure.</span
					>
				</li>

				<li class="grid grid-cols-[0.65rem_1fr] gap-2">
					<span
						aria-hidden="true"
						class="bg-muted-foreground/45 mt-[0.78em] size-1 rounded-full"
					></span>
					<span class="min-w-0">
						Improved consistency across the library to make future updates easier to
						ship.
					</span>
				</li>
			</ul>
		</section>

		<section aria-labelledby="changelog-2026-05-26-separated">
			<h3
				id="changelog-2026-05-26-separated"
				class="text-muted-foreground mb-3 text-[11px] font-medium tracking-[0.16em] uppercase"
			>
				Separated AI Elements and Prompt Kit
			</h3>

			<ul class="space-y-2.5 text-sm leading-7 sm:text-[15px]">
				<li class="grid grid-cols-[0.65rem_1fr] gap-2">
					<span
						aria-hidden="true"
						class="bg-muted-foreground/45 mt-[0.78em] size-1 rounded-full"
					></span>
					<span class="min-w-0"
						>AI Elements and Prompt Kit now live as separate projects.</span
					>
				</li>

				<li class="grid grid-cols-[0.65rem_1fr] gap-2">
					<span
						aria-hidden="true"
						class="bg-muted-foreground/45 mt-[0.78em] size-1 rounded-full"
					></span>
					<span class="min-w-0">
						Prompt Kit is now available at
						<a
							href="https://sv-prompt-kit.vercel.app"
							target="_blank"
							rel="noreferrer"
							class="font-medium text-blue-600 underline-offset-4 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
						>
							sv-prompt-kit.vercel.app
						</a>
						.
					</span>
				</li>
			</ul>
		</section>
	</div>
</article>
