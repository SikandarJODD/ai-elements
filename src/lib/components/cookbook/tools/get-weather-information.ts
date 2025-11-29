import { tool } from "ai";
import { z } from "zod";

/**
 * Weather Information tool - Get detailed weather with weekly forecast
 * Used in: render-visual-interface
 *
 * Returns structured weather data for UI rendering
 */
export const getWeatherInformation = tool({
	description: "show the weather in a given city to the user",
	inputSchema: z.object({
		city: z.string().describe("The city to get weather information for"),
	}),
	execute: async ({ city }: { city: string }) => {
		// In production, call a real weather API
		return {
			city,
			value: 24,
			unit: "celsius",
			weeklyForecast: [
				{ day: "Monday", value: 24 },
				{ day: "Tuesday", value: 25 },
				{ day: "Wednesday", value: 26 },
				{ day: "Thursday", value: 27 },
				{ day: "Friday", value: 28 },
				{ day: "Saturday", value: 29 },
				{ day: "Sunday", value: 30 },
			],
		};
	},
});
