<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Portal, PortalBackdrop } from '$lib/components/ui/portal';
	import { cn } from '$lib/utils';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import LinkItem from './link-item.svelte';
	import { navs } from './nav-links';

	let open = $state(false);
</script>

<div class="md:hidden">
	<Button
		aria-controls="mobile-menu"
		aria-expanded={open}
		aria-label="Toggle menu"
		class="md:hidden"
		onclick={() => (open = !open)}
		size="icon"
		variant="outline"
	>
		<div class={cn('transition-all', open ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
			<XIcon />
		</div>
		<div
			class={cn('absolute transition-all', open ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}
		>
			<MenuIcon />
		</div>
	</Button>
	{#if open}
		<Portal class="top-14">
			<PortalBackdrop />
			<div
				class={cn(
					'size-full overflow-y-auto p-4',
					'ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97'
				)}
				data-slot={open ? 'open' : 'closed'}
			>
				<div class="flex w-full flex-col gap-y-2">
					<span class="text-sm">Product</span>
					<!-- {#each productLinks as link}
						<LinkItem class="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50" {...link} />
					{/each}
					<span class="text-sm">Company</span>
					{#each companyLinks as link}
						<LinkItem class="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50" {...link} />
					{/each}
					{#each companyLinks2 as link}
						<LinkItem class="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50" {...link} />
					{/each} -->
					{#each navs as nav}
						{#if nav.sub}
							{#each nav.sub as item}
								<LinkItem
									class="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
									{...item}
								/>
							{/each}
						{:else}
							<LinkItem class="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50" {...nav} />
						{/if}
					{/each}
				</div>
				<div class="mt-5 flex flex-col gap-2">
					<Button class="w-full" variant="outline">Sign In</Button>
					<Button class="w-full">Get Started</Button>
				</div>
			</div>
		</Portal>
	{/if}
</div>
