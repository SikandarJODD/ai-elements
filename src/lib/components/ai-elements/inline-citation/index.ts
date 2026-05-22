// Main InlineCitation components
export { default as InlineCitation } from "./inline-citation.svelte";
export { default as InlineCitationText } from "./inline-citation-text.svelte";

// HoverCard/Card components
export { default as InlineCitationCard } from "./inline-citation-card.svelte";
export { default as InlineCitationCardTrigger } from "./inline-citation-card-trigger.svelte";
export { default as InlineCitationCardBody } from "./inline-citation-card-body.svelte";

// Carousel components
export { default as InlineCitationCarousel } from "./inline-citation-carousel.svelte";
export { default as InlineCitationCarouselContent } from "./inline-citation-carousel-content.svelte";
export { default as InlineCitationCarouselItem } from "./inline-citation-carousel-item.svelte";
export { default as InlineCitationCarouselHeader } from "./inline-citation-carousel-header.svelte";

// Carousel navigation components
export { default as InlineCitationCarouselIndex } from "./inline-citation-carousel-index.svelte";
export { default as InlineCitationCarouselPrev } from "./inline-citation-carousel-prev.svelte";
export { default as InlineCitationCarouselNext } from "./inline-citation-carousel-next.svelte";

// Content components
export { default as InlineCitationSource } from "./inline-citation-source.svelte";
export { default as InlineCitationQuote } from "./inline-citation-quote.svelte";

// Context exports
export {
	CarouselContext,
	setCarouselContext,
	getCarouselContext,
	type CarouselApi,
} from "./carousel-context.svelte.js";
