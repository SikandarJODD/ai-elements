import { experimental_generateImage as generateImage, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";

globalThis.AI_SDK_DEFAULT_PROVIDER = openai;

export const generateImageTool = tool({
	description: "Generate an image",
	inputSchema: z.object({
		prompt: z.string().describe("The prompt to generate the image from"),
	}),
	execute: async ({ prompt }) => {
		const { image } = await generateImage({
			model: openai.imageModel("dall-e-3"),
			prompt,
			maxImagesPerCall: 1,
		});
		// in production, save this image to blob storage and return a URL
		return { image: image.base64, prompt };
	},
});
