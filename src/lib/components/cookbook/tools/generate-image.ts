import { experimental_generateImage as generateImage, tool, type ImageModel } from 'ai';
import z from 'zod';

export const generateImageTool = tool({
	description: 'Generate an image',
	inputSchema: z.object({
		prompt: z.string().describe('The prompt to generate the image from')
	}),
	execute: async ({ prompt }) => {
		const { image } = await generateImage({
			model: 'openai/gpt-5-nano',
			prompt
		});
		// in production, save this image to blob storage and return a URL
		return { image: image.base64, prompt };
	}
});
