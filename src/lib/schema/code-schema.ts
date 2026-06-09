import type { SupportedLanguage } from "$lib/components/ai-elements/code/shiki";
import { z } from "zod";

export const supportedLanguages = [
	"bash",
	"diff",
	"javascript",
	"json",
	"svelte",
	"typescript",
	"python",
	"tsx",
	"jsx",
	"css",
	"text",
] satisfies SupportedLanguage[];

let codeSchema = z.object({
	code: z.array(
		z.object({
			language: z
				.enum(supportedLanguages)
				.describe("The programming language of the code block"),
			content: z.string().describe("The content of the code block"),
			title: z.string().describe("The title for the code block"),
			description: z.string().describe("The description for the code block"),
		})
	),
});

export type CodeSchema = z.infer<typeof codeSchema>;
export { codeSchema };
