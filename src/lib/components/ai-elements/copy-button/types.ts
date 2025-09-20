import type { Snippet } from "svelte";
import type { ButtonPropsWithoutHTML } from "$lib/components/ui/button/button.svelte";
import type { UseClipboard } from "$lib/hooks/use-clipboard.svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { WithChildren, WithoutChildren } from "bits-ui";

export type CopyButtonPropsWithoutHTML = WithChildren<
  Pick<ButtonPropsWithoutHTML, "size" | "variant"> & {
    ref?: HTMLButtonElement | null;
    text: string;
    icon?: Snippet<[]>;
    animationDuration?: number;
    disbled?: boolean;
    onCopy?: (status: UseClipboard["status"]) => void;
  }
>;

export type CopyButtonProps = CopyButtonPropsWithoutHTML &
  WithoutChildren<HTMLAttributes<HTMLButtonElement>>;
