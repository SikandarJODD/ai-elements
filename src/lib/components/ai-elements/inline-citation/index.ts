// Main InlineCitation components
export { default as InlineCitation } from "./InlineCitation.svelte";
export { default as InlineCitationText } from "./InlineCitationText.svelte";

// HoverCard/Card components
export { default as InlineCitationCard } from "./InlineCitationCard.svelte";
export { default as InlineCitationCardTrigger } from "./InlineCitationCardTrigger.svelte";
export { default as InlineCitationCardBody } from "./InlineCitationCardBody.svelte";

// Carousel components
export { default as InlineCitationCarousel } from "./InlineCitationCarousel.svelte";
export { default as InlineCitationCarouselContent } from "./InlineCitationCarouselContent.svelte";
export { default as InlineCitationCarouselItem } from "./InlineCitationCarouselItem.svelte";
export { default as InlineCitationCarouselHeader } from "./InlineCitationCarouselHeader.svelte";

// Carousel navigation components
export { default as InlineCitationCarouselIndex } from "./InlineCitationCarouselIndex.svelte";
export { default as InlineCitationCarouselPrev } from "./InlineCitationCarouselPrev.svelte";
export { default as InlineCitationCarouselNext } from "./InlineCitationCarouselNext.svelte";

// Content components
export { default as InlineCitationSource } from "./InlineCitationSource.svelte";
export { default as InlineCitationQuote } from "./InlineCitationQuote.svelte";

// Context exports
export {
	CarouselContext,
	setCarouselContext,
	getCarouselContext,
	type CarouselApi,
} from "./carousel-context.svelte.js";
