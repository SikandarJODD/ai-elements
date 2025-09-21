import type { HTMLAttributes } from 'svelte/elements';
import GitHub from './github.svelte';
import TypeScript from './typescript.svelte';

export interface Props extends HTMLAttributes<SVGElement> {
	class?: string;
	width?: number;
	height?: number;
}

export { GitHub, TypeScript };
