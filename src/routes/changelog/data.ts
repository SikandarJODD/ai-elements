import type { Component } from "svelte";
import May26_26 from "./content/May26-26.svelte";

export type ChangelogEntry = {
	id: string;
	component: Component;
};

export const changelogEntries: ChangelogEntry[] = [
	{
		id: "2026-05-26",
		component: May26_26,
	},
];
