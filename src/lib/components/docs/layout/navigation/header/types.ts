import type { Icon } from "@lucide/svelte";
import type { Component } from "svelte";

export type LinkItemType = {
	name: string;
	description?: string;
	icon?: typeof Icon | Component;
	href: string;
};

export type NavType = {
	name: string;
	description?: string;
	icon?: typeof Icon | Component;
	href: string;
	sub?: LinkItemType[];
};
