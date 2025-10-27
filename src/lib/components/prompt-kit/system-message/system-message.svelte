<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { AlertCircle, AlertTriangle, Info } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils/utils";
	import type { Component } from "svelte";

	const systemMessageVariants = tv({
		base: "flex flex-row items-center gap-3 rounded-[12px] border py-2 pr-2 pl-3",
		variants: {
			variant: {
				action: "text-zinc-700 dark:text-zinc-300",
				error: "text-red-700 dark:text-red-800",
				warning: "text-amber-700 dark:text-amber-700",
			},
			fill: {
				true: "bg-background",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "action",
				fill: true,
				class: "border-transparent bg-zinc-100 dark:bg-zinc-900",
			},
			{
				variant: "error",
				fill: true,
				class: "border-transparent bg-red-100 dark:bg-red-900/20",
			},
			{
				variant: "warning",
				fill: true,
				class: "border-transparent bg-amber-100 dark:bg-amber-900/20",
			},
			{
				variant: "action",
				fill: false,
				class: "border-zinc-200 dark:border-zinc-800",
			},
			{
				variant: "error",
				fill: false,
				class: "border-red-600 dark:border-red-900",
			},
			{
				variant: "warning",
				fill: false,
				class: "border-amber-600 dark:border-amber-900",
			},
		],
		defaultVariants: {
			variant: "action",
			fill: false,
		},
	});

	type Props = HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof systemMessageVariants> & {
			icon?: Snippet;
			isIconHidden?: boolean;
			cta?: {
				label: string;
				onClick?: () => void;
				variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
			};
			children: Snippet;
		};

	let {
		children,
		variant = "action",
		fill = false,
		icon,
		isIconHidden = false,
		cta,
		class: className,
		...props
	}: Props = $props();

	let getDefaultIcon = (): Component | null => {
		if (isIconHidden) return null;

		switch (variant) {
			case "error":
				return AlertCircle;
			case "warning":
				return AlertTriangle;
			default:
				return Info;
		}
	};

	let IconComponent = $derived(icon ? null : getDefaultIcon());
	let shouldShowIcon = $derived(!isIconHidden && (icon !== undefined || IconComponent !== null));
</script>

<div class={cn(systemMessageVariants({ variant, fill }), className)} {...props}>
	<div class="flex flex-1 flex-row items-center gap-3 leading-normal">
		{#if shouldShowIcon}
			<div class="flex h-[1lh] shrink-0 items-center justify-center self-start">
				{#if icon}
					{@render icon()}
				{:else if IconComponent}
					<IconComponent class="size-4" />
				{/if}
			</div>
		{/if}

		<div class="flex min-w-0 flex-1 items-center {shouldShowIcon ? 'gap-3' : 'gap-0'}">
			<div class="text-sm">
				{@render children()}
			</div>
		</div>
	</div>

	{#if cta}
		<Button variant={cta.variant || "default"} size="sm" onclick={cta.onClick}>
			{cta.label}
		</Button>
	{/if}
</div>
