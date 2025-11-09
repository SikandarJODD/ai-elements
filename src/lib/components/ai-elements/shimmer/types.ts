import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type ShimmerProps = HTMLAttributes<HTMLElement> & {
	children: Snippet;
	as?: keyof HTMLElementTagNameMap;
	duration?: number;
	spread?: number;
	content_length?: number;
};
