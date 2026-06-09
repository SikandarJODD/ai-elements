import InlineCitation from "./inline-citation.svelte";
import InlineCitationText from "./inline-citation-text.svelte";

// HoverCard/Card components
import InlineCitationCard from "./inline-citation-card.svelte";
import InlineCitationCardTrigger from "./inline-citation-card-trigger.svelte";
import InlineCitationCardBody from "./inline-citation-card-body.svelte";

// Carousel components
import InlineCitationCarousel from "./inline-citation-carousel.svelte";
import InlineCitationCarouselContent from "./inline-citation-carousel-content.svelte";
import InlineCitationCarouselItem from "./inline-citation-carousel-item.svelte";
import InlineCitationCarouselHeader from "./inline-citation-carousel-header.svelte";

// Carousel navigation components
import InlineCitationCarouselIndex from "./inline-citation-carousel-index.svelte";
import InlineCitationCarouselPrev from "./inline-citation-carousel-prev.svelte";
import InlineCitationCarouselNext from "./inline-citation-carousel-next.svelte";

// Content components
import InlineCitationSource from "./inline-citation-source.svelte";
import InlineCitationQuote from "./inline-citation-quote.svelte";

// Main exports
export {
	InlineCitation,
	InlineCitationText,
	InlineCitationCard,
	InlineCitationCardTrigger,
	InlineCitationCardBody,
	InlineCitationCarousel,
	InlineCitationCarouselContent,
	InlineCitationCarouselItem,
	InlineCitationCarouselHeader,
	InlineCitationCarouselIndex,
	InlineCitationCarouselPrev,
	InlineCitationCarouselNext,
	InlineCitationSource,
	InlineCitationQuote,
	//
	InlineCitation as Root,
	InlineCitationText as Text,
	InlineCitationCard as Card,
	InlineCitationCardTrigger as CardTrigger,
	InlineCitationCardBody as CardBody,
	InlineCitationCarousel as Carousel,
	InlineCitationCarouselContent as CarouselContent,
	InlineCitationCarouselItem as CarouselItem,
	InlineCitationCarouselHeader as CarouselHeader,
	InlineCitationCarouselIndex as CarouselIndex,
	InlineCitationCarouselPrev as CarouselPrev,
	InlineCitationCarouselNext as CarouselNext,
	InlineCitationSource as Source,
	InlineCitationQuote as Quote,
};

// Context exports
export {
	CarouselContext,
	setCarouselContext,
	getCarouselContext,
	type CarouselApi,
} from "./carousel-context.svelte.js";
