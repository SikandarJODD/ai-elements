import { watch } from "runed";
import { setContext, getContext } from "svelte";

const STICK_TO_BOTTOM_CONTEXT_KEY = Symbol("stick-to-bottom-context");

class StickToBottomContext {
	#element: HTMLElement | null = $state(null);
	#isAtBottom = $state(true);
	#resizeObserver: ResizeObserver | null = null;
	#mutationObserver: MutationObserver | null = null;
	#intersectionObserver: IntersectionObserver | null = null;
	#sentinel: HTMLElement | null = null;
	#userHasScrolled = $state(false);

	isAtBottom = $derived(this.#isAtBottom);

	// Debug method to help troubleshoot
	get debugInfo() {
		if (!this.#element) return null;
		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		return {
			scrollTop,
			scrollHeight,
			clientHeight,
			isAtBottom: this.#isAtBottom,
			userHasScrolled: this.#userHasScrolled,
			hasElement: !!this.#element,
			hasSentinel: !!this.#sentinel,
		};
	}

	constructor() {
		watch(
			() => this.#element,
			() => {
				if (this.#element) {
					this.#setupObservers();
					return () => this.#cleanup();
				}
			}
		);
	}

	setElement(element: HTMLElement) {
		this.#element = element;
	}

	scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
		if (!this.#element) return;

		this.#userHasScrolled = false; // Reset user scroll flag when programmatically scrolling
		this.#element.scrollTo({
			top: this.#element.scrollHeight,
			behavior,
		});
	};

	#handleScroll = () => {
		if (!this.#element) return;

		// Detect if user has scrolled up from bottom
		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 200; // Increased threshold for better UX
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		// Update the isAtBottom state based on scroll position
		this.#isAtBottom = isAtBottom;

		if (!isAtBottom) {
			this.#userHasScrolled = true;
		} else if (isAtBottom && this.#userHasScrolled) {
			// User scrolled back to bottom, reset flag
			this.#userHasScrolled = false;
		}
	};

	#setupObservers() {
		if (!this.#element) return;

		// Create and position sentinel element
		this.#createSentinel();

		// Setup intersection observer to detect if we're at bottom
		this.#intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				// Use intersection observer as a backup, but prioritize scroll-based detection
				if (entry.isIntersecting) {
					this.#isAtBottom = true;
					this.#userHasScrolled = false;
				}
			},
			{
				threshold: 0,
				root: this.#element,
			}
		);

		if (this.#sentinel) {
			this.#intersectionObserver.observe(this.#sentinel);
		}

		// Add scroll event listener to detect user scrolling
		this.#element.addEventListener("scroll", this.#handleScroll, {
			passive: true,
		});

		// Setup resize observer for smooth scrolling on resize
		this.#resizeObserver = new ResizeObserver(() => {
			// Check position after resize
			this.#checkScrollPosition();
			if (this.#isAtBottom && !this.#userHasScrolled) {
				this.scrollToBottom("auto");
			}
		});

		this.#resizeObserver.observe(this.#element);

		// Setup mutation observer for smooth scrolling on content changes
		this.#mutationObserver = new MutationObserver(() => {
			// Small delay to ensure DOM has updated
			requestAnimationFrame(() => {
				// Check if we should auto-scroll BEFORE updating the position
				// Only auto-scroll if user was at bottom and hasn't manually scrolled
				const shouldAutoScroll = this.#isAtBottom && !this.#userHasScrolled;

				// Now update the scroll position after content changes
				this.#checkScrollPosition();

				// Auto-scroll if conditions were met
				if (shouldAutoScroll) {
					this.scrollToBottom("smooth");
				}
			});
		});

		this.#mutationObserver.observe(this.#element, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		// Check initial state
		this.#checkScrollPosition();
	}

	#createSentinel() {
		if (!this.#element) return;

		this.#sentinel = document.createElement("div");
		this.#sentinel.style.height = "1px";
		this.#sentinel.style.width = "100%";
		this.#sentinel.style.pointerEvents = "none";
		this.#sentinel.style.opacity = "0";
		this.#sentinel.setAttribute("data-stick-to-bottom-sentinel", "");

		// Append to the end of the scrollable content, not positioned absolutely
		this.#element.appendChild(this.#sentinel);
	}

	#checkScrollPosition() {
		if (!this.#element) return;

		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 200; // Increased threshold for better UX
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		this.#isAtBottom = isAtBottom;
	}

	#cleanup() {
		this.#resizeObserver?.disconnect();
		this.#mutationObserver?.disconnect();
		this.#intersectionObserver?.disconnect();

		// Remove scroll event listener
		if (this.#element) {
			this.#element.removeEventListener("scroll", this.#handleScroll);
		}

		if (this.#sentinel && this.#element?.contains(this.#sentinel)) {
			this.#element.removeChild(this.#sentinel);
		}

		this.#resizeObserver = null;
		this.#mutationObserver = null;
		this.#intersectionObserver = null;
		this.#sentinel = null;
	}
}

export function setStickToBottomContext(): StickToBottomContext {
	const context = new StickToBottomContext();
	setContext(STICK_TO_BOTTOM_CONTEXT_KEY, context);
	return context;
}

export function getStickToBottomContext(): StickToBottomContext {
	const context = getContext<StickToBottomContext>(STICK_TO_BOTTOM_CONTEXT_KEY);
	if (!context) {
		throw new Error("StickToBottomContext must be used within a Conversation component");
	}
	return context;
}

export { StickToBottomContext };
