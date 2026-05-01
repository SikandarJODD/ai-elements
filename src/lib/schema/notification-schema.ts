import { z } from "zod";

// Define and export a schema for structured output
export const notificationSchema = z.object({
	notifications: z.array(
		z.object({
			name: z.string().describe("Name of a fictional person."),
			message: z.string().describe("Do not use emojis or links."),
			minutesAgo: z.number(),
		})
	),
});
