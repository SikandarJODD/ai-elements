import { tool } from 'ai';
import { z } from 'zod';

/**
 * Weather tool - Get current weather for a location
 * Used in: call-tool, call-tool-multiple-steps
 */
export const getWeather = tool({
	description: 'Get the weather for a location',
	inputSchema: z.object({
		city: z.string().describe('The city to get the weather for'),
		unit: z.enum(['C', 'F']).describe('The unit to display the temperature in')
	}),
	execute: async ({ city, unit }) => {
		// In production, call a real weather API
		const weather = {
			value: 24,
			description: 'Sunny'
		};

		return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
	}
});

