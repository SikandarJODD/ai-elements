<script lang="ts">
	import { Image, type ImageProps } from "$lib/components/ai-elements/image/index.js";
	import { onMount } from "svelte";

	// Convert image URL to base64 string
	async function imageUrlToBase64(url: string): Promise<string> {
		try {
			// Fetch image from URL
			const response = await fetch(url);
			if (!response.ok) throw new Error("Failed to fetch image");

			// Convert to blob then to base64
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		} catch (error) {
			console.error("Error converting image:", error);
			throw error;
		}
	}

	// Demo image URL
	let demoSkyImage = "/assets/sky.jpg";

	// Example base64 image - a small 150x150 gradient image
	let exampleImage: ImageProps = $state({
		base64: "",
		mediaType: "image/png",
		uint8Array: new Uint8Array([]),
	});

	onMount(async () => {
		let base64Image = await imageUrlToBase64(demoSkyImage);
		// Remove the data URL prefix to get only the base64 string
		exampleImage.base64 = base64Image.split(",")[1];
	});
</script>

<div class="flex items-center justify-center p-6">
	<Image {...exampleImage} alt="Example generated image" class="aspect-square h-[150px] border" />
</div>
