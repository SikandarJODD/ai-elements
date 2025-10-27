import type { HTMLImgAttributes } from "svelte/elements";

export type Experimental_GeneratedImage = {
	base64: string;
	uint8Array?: Uint8Array;
	mediaType?: string;
};

export type ImageProps = Experimental_GeneratedImage &
	HTMLImgAttributes & {
		ref?: HTMLImageElement | null;
		class?: string;
	};
