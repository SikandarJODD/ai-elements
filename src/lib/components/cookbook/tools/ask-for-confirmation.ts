import { tool } from "ai";
import { z } from "zod";

/**
 * Ask for Confirmation tool - Client-side tool for user interaction
 * Used in: render-visual-interface
 *
 * This is a client-side tool without execute function
 * The client handles displaying confirmation UI and getting user response
 */
export const askForConfirmation = tool({
	description: "Ask the user for confirmation.",
	inputSchema: z.object({
		message: z.string().describe("The message to ask for confirmation."),
	}),
	outputSchema: z.string().describe("The user confirmation response."),
});
