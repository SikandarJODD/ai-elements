import type { Snippet } from "svelte";
import type { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { WithChildren, WithoutChildren } from "bits-ui";

import type { ButtonSize, ButtonVariant } from "$lib/components/ui/button/index.js";

export type ButtonPropsWithoutHTML = WithChildren<{
	ref?: HTMLElement | null;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	onClickPromise?: (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => Promise<void>;
}>;

export type CopyButtonPropsWithoutHTML = WithChildren<
	Pick<ButtonPropsWithoutHTML, "size" | "variant"> & {
		ref?: HTMLButtonElement | null;
		text: string;
		icon?: Snippet<[]>;
		animationDuration?: number;
		disabled?: boolean;
		onCopy?: (status: UseClipboard["status"]) => void;
		// Analytics props
		component?: string;
		registry?: string;
		source?: string;
	}
>;
export type CopyButtonProps = CopyButtonPropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLButtonElement>>;
