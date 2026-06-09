import { tv, type VariantProps } from "tailwind-variants";
import Root from "./code.svelte";
import Overflow from "./code-overflow.svelte";
import CopyButton from "./code-copy-button.svelte";
import type { CodeCopyButtonProps, CodeRootProps } from "./types";
import SingleFile from "./single-file.svelte";
import MultipleFiles from "./multiple-files.svelte";
import MultipleSelectFiles from "./multiple-select-files.svelte";

export const codeVariants = tv({
	base: "not-prose relative h-full overflow-auto rounded-lg border",
	variants: {
		variant: {
			default: "border-border bg-background",
			secondary: "dark:bg-card/50 border-none bg-neutral-200/20",
		},
	},
});

export type CodeVariant = VariantProps<typeof codeVariants>["variant"];

export {
	Root,
	CopyButton,
	Overflow,
	SingleFile,
	MultipleFiles,
	MultipleSelectFiles,
	type CodeRootProps as RootProps,
	type CodeCopyButtonProps as CopyButtonProps,
};
