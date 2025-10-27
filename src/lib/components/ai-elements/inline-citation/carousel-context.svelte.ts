import { getContext, setContext } from "svelte";

const CAROUSEL_CONTEXT_KEY = Symbol("carousel-context");

export interface CarouselApi {
	scrollPrev: () => void;
	scrollNext: () => void;
	selectedScrollSnap: () => number;
	scrollSnapList: () => number[];
	on: (event: string, callback: () => void) => void;
	off?: (event: string, callback: () => void) => void;
}

export class CarouselContext {
	api = $state<CarouselApi | undefined>(undefined);

	setApi(newApi: CarouselApi | undefined) {
		this.api = newApi;
	}

	getApi() {
		return this.api;
	}
}

export function setCarouselContext(context: CarouselContext) {
	setContext(CAROUSEL_CONTEXT_KEY, context);
}

export function getCarouselContext(): CarouselContext | undefined {
	return getContext(CAROUSEL_CONTEXT_KEY);
}
