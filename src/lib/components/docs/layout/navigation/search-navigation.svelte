<script lang="ts">
	import Badge from "$lib/components/ui/spell/badge/badge.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Kbd from "$lib/components/ui/kbd/index.js";
	import {
		blockPages,
		components,
		docsPages,
		primitivePages
	} from "$lib/registry/components";
	import { type Component } from "$lib/registry/components";
	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	// For Now we would use Magic UI - Components, Later on we would update it
	let docs: Component[] = docsPages;
	let primitives: Component[] = primitivePages;
	let blocks: Component[] = blockPages;
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="mr-2 text-sm text-muted-foreground">
	<Button
		variant="ghost"
		size="sm"
		class="flex justify-between bg-secondary px-1.5 md:min-w-46 md:pr-1  dark:bg-muted/60"
		onclick={() => (open = true)}
	>
		<span class="hidden pl-1 md:block"> Search... </span>

		<Kbd.Group class="hidden gap-1 md:flex">
			<!-- <Kbd.Root>⌘</Kbd.Root> -->
			<Kbd.Root>Ctrl</Kbd.Root>
			<Kbd.Root>K</Kbd.Root>
		</Kbd.Group>
		<span class="lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="128"
				height="128"
				viewBox="0 0 24 24"
				fill="none"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				role="img"
				color="currentColor"
			>
				<path
					d="M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
				<path
					d="M10 3H14M3 10V14M6.5 21C4.567 21 3 19.433 3 17.5M17.5 3C19.433 3 21 4.567 21 6.5M3 6.5C3 4.567 4.567 3 6.5 3"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
		</span>
	</Button>
</div>

<Command.Dialog bind:open class="top-36">
	<Command.Input placeholder="Search components, documentation..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Documentation">
			{#each docs as doc (doc.id)}
				<Command.LinkItem
					value={doc.id}
					onclick={() => (open = false)}
					href={doc.href}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						role="img"
						color="currentColor"
					>
						<path
							d="M17.5055 2.01874C12.8289 2.83455 12 7.5 12 7.5V22C12 22 12.8867 17.1272 18.0004 16.5588C18.5493 16.4978 19 16.0576 19 15.5058V3.39309C19 2.5654 18.3216 1.87638 17.5055 2.01874Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M5.33333 5.00001C7.79379 4.99657 10.1685 5.88709 12 7.5V22C10.1685 20.3871 7.79379 19.4966 5.33333 19.5C3.77132 19.5 2.99032 19.5 2.64526 19.2792C2.4381 19.1466 2.35346 19.0619 2.22086 18.8547C2 18.5097 2 17.8941 2 16.6629V8.40322C2 6.97543 2 6.26154 2.54874 5.68286C3.09748 5.10418 3.65923 5.07432 4.78272 5.0146C4.965 5.00491 5.14858 5.00001 5.33333 5.00001Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M12 22.001C13.8315 20.3881 16.2062 19.4976 18.6667 19.501C20.2287 19.501 21.0097 19.501 21.3547 19.2802C21.5619 19.1476 21.6465 19.0629 21.7791 18.8558C22 18.5107 22 17.8951 22 16.6639V8.40424C22 6.97645 22 6.26256 21.4513 5.68388C20.9025 5.1052 20.1235 5.05972 19 5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
					{doc.name}</Command.LinkItem
				>
			{/each}
		</Command.Group>
		<Command.Group heading="Primitives">
			{#each primitives as primitive (primitive.id)}
				<Command.LinkItem
					value={primitive.id}
					onclick={() => (open = false)}
					href={primitive.href}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						role="img"
						color="currentColor"
					>
						<rect
							x="4"
							y="4"
							width="16"
							height="16"
							rx="3"
							stroke="currentColor"
							stroke-width="1.5"
						></rect>
						<path
							d="M8 8H16M8 12H13M8 16H11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
					</svg>
					{primitive.name}
				</Command.LinkItem>
			{/each}
		</Command.Group>
		<Command.Group heading="Blocks">
			{#each blocks as block (block.id)}
				<Command.LinkItem
					value={block.id}
					onclick={() => (open = false)}
					href={block.href}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						role="img"
						color="currentColor"
					>
						<path
							d="M4 7.5C4 6.11929 5.11929 5 6.5 5H10.5C11.8807 5 13 6.11929 13 7.5V10.5C13 11.8807 11.8807 13 10.5 13H6.5C5.11929 13 4 11.8807 4 10.5V7.5Z"
							stroke="currentColor"
							stroke-width="1.5"
						></path>
						<path
							d="M11 13.5C11 12.1193 12.1193 11 13.5 11H17.5C18.8807 11 20 12.1193 20 13.5V17.5C20 18.8807 18.8807 20 17.5 20H13.5C12.1193 20 11 18.8807 11 17.5V13.5Z"
							stroke="currentColor"
							stroke-width="1.5"
						></path>
						<path
							d="M14 6H18M16 4V8"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
					</svg>
					{block.name}
				</Command.LinkItem>
			{/each}
		</Command.Group>
		<Command.Group heading="Components">
			{#each components as component (component.id)}
				<Command.LinkItem
					value={component.id}
					onclick={() => (open = false)}
					href={component.href}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						role="img"
						color="currentColor"
					>
						<circle
							opacity="0.2"
							cx="12"
							cy="12"
							r="10"
							fill="currentColor"
						></circle>
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linejoin="round"
						></circle>
					</svg>
					{component.name}
				</Command.LinkItem>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
