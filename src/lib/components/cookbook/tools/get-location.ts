import { tool } from 'ai';
import { z } from 'zod';

/**
 * Location tool - Get the user's current location
 * Used in: call-tool-multiple-steps
 * 
 * Server-side version that returns mock coordinates
 */
export const getLocation = tool({
	description: 'Get the location of the user',
	inputSchema: z.object({}),
	execute: async () => {
		// In production, use IP geolocation or other location service
		const location = { lat: 37.7749, lon: -122.4194 };
		return `Your location is at latitude ${location.lat} and longitude ${location.lon}`;
	}
});

/**
 * Client-side location tool - Requires user permission
 * Used in: render-visual-interface
 * 
 * This is a client-side tool without execute function
 * The client handles getting location via browser API
 */
export const getLocationClient = tool({
	description: 'Get the user location. Always ask for confirmation before using this tool.',
	inputSchema: z.object({})
});

